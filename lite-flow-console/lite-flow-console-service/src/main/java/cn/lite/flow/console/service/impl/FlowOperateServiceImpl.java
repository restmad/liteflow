package cn.lite.flow.console.service.impl;

import cn.lite.flow.common.model.Tuple;
import cn.lite.flow.console.common.exception.ConsoleRuntimeException;
import cn.lite.flow.console.common.model.vo.DependencyVo;
import cn.lite.flow.console.common.utils.DagUtils;
import cn.lite.flow.console.model.basic.TaskDependency;
import cn.lite.flow.console.model.basic.TaskVersion;
import cn.lite.flow.console.service.FlowOperateService;
import cn.lite.flow.console.service.FlowService;
import cn.lite.flow.console.service.TaskVersionService;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedMap;
import java.util.stream.Collectors;

/**
 * @description: 任务流操作相关
 * @author: yueyunyue
 * @create: 2019-01-20
 **/
@Service("flowOperateServiceImpl")
public class FlowOperateServiceImpl implements FlowOperateService {

    @Autowired
    private FlowService flowService;

    @Autowired
    private TaskVersionService taskVersionService;

    private Tuple<List<List<TaskVersion>>, List<DependencyVo>> getLevelVersion(long flowId, long headTaskVersionNo) {
        List<TaskDependency> dependencies = flowService.getDependencies(flowId);
        if(CollectionUtils.isEmpty(dependencies)){
            throw new ConsoleRuntimeException("任务流没有任务");
        }
        List<Long> headTaskIds = DagUtils.getHeadTaskIds(dependencies, DagUtils.getTaskIds(dependencies));
        Long headTaskId = headTaskIds.get(0);

        List<Long> taskIds = DagUtils.getTaskIds(dependencies);
        List<List<Long>> taskIdLevelList = DagUtils.getTaskIdDagLevel(dependencies, taskIds);

        if (CollectionUtils.isEmpty(taskIdLevelList)) {
            return null;
        }
        Map<Long, Set<Long>> taskDependencyMap = DagUtils.getUpstreamDependencyMap(dependencies);
        List<DependencyVo> dependencyVos = Lists.newArrayList();
        TaskVersion taskVersion = taskVersionService.getTaskVersion(headTaskId, headTaskVersionNo);
        SortedMap<Integer, List<TaskVersion>> levelVersionMap = Maps.newTreeMap();

        this.dagDeepTravel(0, taskVersion, levelVersionMap, dependencyVos, taskDependencyMap);
        List<List<TaskVersion>> resultLevelVersions = Lists.newArrayList(levelVersionMap.values());
        if(levelVersionMap != null && levelVersionMap.size() > 0){
            for(Map.Entry<Integer, List<TaskVersion>> levelKV : levelVersionMap.entrySet()){
                resultLevelVersions.add(levelKV.getValue());
            }
        }
        return new Tuple<>(resultLevelVersions, dependencyVos);
    }

    /**
     * 深度遍历
     * @param level
     * @param taskVersion
     * @param levelVersionMap
     * @param dependencyVos
     * @param taskDependencyMap
     */
    private void dagDeepTravel(
            int level,
            TaskVersion taskVersion,
            SortedMap<Integer, List<TaskVersion>> levelVersionMap,
            List<DependencyVo> dependencyVos,
            Map<Long, Set<Long>> taskDependencyMap){

        Long taskId = taskVersion.getTaskId();
        Long taskVersionId = taskVersion.getId();

        Set<Long> downstreamTaskIdSet = taskDependencyMap.get(taskId);
        //没有下游直接退出
        if(CollectionUtils.isEmpty(downstreamTaskIdSet)){
            return;
        }
        List<Long> downstreamVersionIds = taskVersionService.getDownstreamVersionIds(taskVersion.getId());
        //下游任务版本没有找到
        if(CollectionUtils.isEmpty(downstreamVersionIds)){
            throw new ConsoleRuntimeException("任务%d下游缺失任务版本");
        }
        List<TaskVersion> taskVersions = taskVersionService.getByIds(downstreamVersionIds);
        List<TaskVersion> resultVersions = Lists.newArrayList();
        taskVersions.forEach(version -> {
            /**
             * 只要属于当前下游的版本
             */
            if(downstreamTaskIdSet.contains(version.getTaskId())){
                dependencyVos.add(new DependencyVo(version.getId(), taskVersionId));
                resultVersions.add(version);
            }
        });

        List<TaskVersion> levelTaskVersions = levelVersionMap.get(level);
        if(levelTaskVersions == null){
            levelTaskVersions = Lists.newArrayList();
            levelVersionMap.put(level, levelTaskVersions);
        }

        List<TaskVersion> nextLevelTaskVersions = Lists.newArrayList();
        for(TaskVersion version : resultVersions){
            boolean isExist = false;
            if(CollectionUtils.isNotEmpty(levelTaskVersions)){
                for(TaskVersion tv : levelTaskVersions){
                    if(tv.getId().longValue() == version.getId().longValue()){
                        isExist = true;
                    }
                }
                if(!isExist){
                    levelTaskVersions.add(version);
                    nextLevelTaskVersions.add(version);
                }
            }
        }
        if(CollectionUtils.isNotEmpty(nextLevelTaskVersions)){
            for(TaskVersion version : nextLevelTaskVersions){
                dagDeepTravel(level + 1, version, levelVersionMap, dependencyVos, taskDependencyMap);
            }
        }

    }


    @Override
    public Tuple<List<TaskVersion>, List<DependencyVo>> dagView(long flowId, long headTaskVersionNo) {

        Tuple<List<List<TaskVersion>>, List<DependencyVo>> result = this.getLevelVersion(flowId, headTaskVersionNo);
        List<List<TaskVersion>> resultList = result.getA();
        List<DependencyVo> dependencyVos = result.getB();
        List<TaskVersion> taskVersions = this.convert2TaskVersions(resultList);
        return new Tuple<>(taskVersions, dependencyVos);
    }

    private List<TaskVersion> convert2TaskVersions(List<List<TaskVersion>> resultList) {
        List<TaskVersion> taskVersions = Lists.newArrayList();
        resultList.forEach(taskVersions::addAll);
        return taskVersions;
    }

    @Override
    @Transactional("consoleTxManager")
    public void fix(long flowId, long headTaskVersionNo) {
        Tuple<List<List<TaskVersion>>, List<DependencyVo>> result = this.getLevelVersion(flowId, headTaskVersionNo);
        List<List<TaskVersion>> resultList = result.getA();
        for(List<TaskVersion> versions : resultList){
            for(TaskVersion taskVersion : versions){
                this.fixVersion(taskVersion);
            }
        }

    }

    @Override
    public void fixFromNode(long flowId, long headTaskVersionNo, long fixVersionId) {

        Tuple<List<List<TaskVersion>>, List<DependencyVo>> result = this.getLevelVersion(flowId, headTaskVersionNo);
        List<List<TaskVersion>> resultList = result.getA();
        List<DependencyVo> dependencyVos = result.getB();
        List<TaskVersion> taskVersions = this.convert2TaskVersions(resultList);
        Map<Long, TaskVersion> versionMap = taskVersions.stream().collect(Collectors.toMap(v -> v.getId(), v -> v));
        Map<Long, Set<Long>> downstreamMap = this.getDownstreamMap(dependencyVos);
        Set<Long> fixedVersionIdSet = Sets.newHashSet();

        this.dagDeepTravelFix(fixVersionId, versionMap, downstreamMap, fixedVersionIdSet);


    }

    /**
     * 深度dag遍历修复
     * @param versionId
     * @param versionMap
     * @param downstreamMap
     */
    private void dagDeepTravelFix(long versionId, Map<Long, TaskVersion> versionMap, Map<Long, Set<Long>> downstreamMap, Set<Long> fixedVersionIdSet ){

        TaskVersion taskVersion = versionMap.get(versionId);
        this.fixVersion(taskVersion);
        /**
         * 保存已经修复的
         */
        fixedVersionIdSet.add(versionId);
        Set<Long> downstreamVersionIdSet = downstreamMap.get(versionId);
        if(CollectionUtils.isNotEmpty(downstreamVersionIdSet)){
            for(Long id : downstreamVersionIdSet){
                /**
                 * 未修复的版本，继续修复
                 */
                if(!fixedVersionIdSet.contains(id)){
                    this.dagDeepTravelFix(id, versionMap, downstreamMap, fixedVersionIdSet);
                }
            }
        }

    }

    private Map<Long, Set<Long>> getDownstreamMap(List<DependencyVo> dependencyVos) {
        Map<Long, Set<Long>> downstreamMap = Maps.newHashMap();
        for(DependencyVo dependencyVo : dependencyVos){
            Long id = dependencyVo.getId();
            Long upstreamId = dependencyVo.getUpstreamId();
            Set<Long> idSet = downstreamMap.get(upstreamId);
            if(idSet == null){
                idSet = Sets.newHashSet();
                downstreamMap.put(upstreamId, idSet);
            }
            idSet.add(id);
        }
        return downstreamMap;
    }

    /**
     * 修复任务版本
     * @param taskVersion
     */
    private void fixVersion(TaskVersion taskVersion){
        if(taskVersion.isProcessing()){
            taskVersionService.kill(taskVersion.getId());
        }
        taskVersionService.fix(taskVersion.getId());
    }
}
