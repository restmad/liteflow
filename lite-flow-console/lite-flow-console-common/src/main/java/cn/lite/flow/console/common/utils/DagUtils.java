package cn.lite.flow.console.common.utils;

import cn.lite.flow.console.common.exception.ConsoleRuntimeException;
import cn.lite.flow.console.model.basic.TaskDependency;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import org.apache.commons.collections4.CollectionUtils;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedMap;

/**
 * @description: dag相关
 * @author: yueyunyue
 * @create: 2018-08-01
 **/
public class DagUtils {

    /**
     * 获取任务流的第一层
     * @param dependencies
     * @param taskIds
     * @return
     */
    public static List<Long> getHeadTaskIds(List<TaskDependency> dependencies, List<Long> taskIds){
        //没有上游的即为任务流第一层
        List<Long> headTaskIds = Lists.newArrayList();
        for (Long taskId : taskIds){
            boolean isHeadTask = true;
            for(TaskDependency dependency : dependencies) {
                if(dependency.getTaskId().longValue() == taskId.longValue()){
                    isHeadTask = false;
                    break;
                }
            }
            if(isHeadTask){
                headTaskIds.add(taskId);
            }
        }
        /**
         * 没有父节点说明有环存在
         */
        if(CollectionUtils.isEmpty(headTaskIds)){
            throw new ConsoleRuntimeException("任务流有环存在");
        }
        return headTaskIds;
    }

    /**
     * 遍历获取图的节点层级
     * @param dependencies
     * @param taskIds
     * @return
     */
    public static SortedMap<Integer, List<Long>> getDagLevel(List<TaskDependency> dependencies, List<Long> taskIds) {


        List<Long> headTaskIds = getHeadTaskIds(dependencies, taskIds);
        /**
         * 任务流第一层只能有一个
         */
        if(headTaskIds.size() > 1){
            throw new ConsoleRuntimeException("任务流的开始任务只能有一个");
        }

        Map<Long, Set<Long>> dowmstreamDependencyMap = getDownstreamDependencyMap(dependencies);

        /**
         * 从头节点开始，遍历图
         */
        SortedMap<Integer, List<Long>> levelMap = Maps.newTreeMap();
        Set<Long> allIdSet = Sets.newHashSet();  //记录所有遍历过的字段，避免多次处理
        headTaskIds.forEach(headTaskId -> {
            Set<Long> branchIdSet = Sets.newHashSet();
            deepTravelDag(headTaskId, 0, dowmstreamDependencyMap, branchIdSet, allIdSet, levelMap);
        });
        return levelMap;
    }

    /**
     * 获取id层级关系
     * @param dependencies
     * @param taskIds
     * @return
     */
    public static List<List<Long>> getTaskIdDagLevel(List<TaskDependency> dependencies, List<Long> taskIds) {
        List<List<Long>> levelIds = Lists.newArrayList();
        SortedMap<Integer, List<Long>> dagLevel = getDagLevel(dependencies, taskIds);

        if(dagLevel != null && dagLevel.size() > 0){
            for(Map.Entry<Integer, List<Long>> levelKV : dagLevel.entrySet()){
                levelIds.add(levelKV.getValue());
            }
        }

        return levelIds;
    }

    /**
     * 通过深度优先遍历算法，遍历dag图
     * @param taskId
     * @param level
     * @param dowmstreamDependencyMap
     * @param branchIdSet
     * @param allIdSet
     * @param levelMap
     */
    private static void deepTravelDag(
            long taskId,
            int level,
            Map<Long, Set<Long>> dowmstreamDependencyMap,
            Set<Long> branchIdSet,
            Set<Long> allIdSet,
            SortedMap<Integer, List<Long>> levelMap){

        //如果分支里包含id，说明有环存在
        if(branchIdSet.contains(taskId)){
            throw new ConsoleRuntimeException("任务流有环存在");
        }else{
            branchIdSet.add(taskId);
        }
        /**
         * 如果已经遍历过的节点就不再处理
         */
        if(allIdSet.contains(taskId)){
            return;
        }else{
            allIdSet.add(taskId);
        }
        /**
         * 将任务id添加到层级中
         */
        List<Long> currentLevelTasks = levelMap.get(level);
        if (currentLevelTasks == null) {
            currentLevelTasks = Lists.newArrayList();
            levelMap.put(level, currentLevelTasks);
        }
        currentLevelTasks.add(taskId);

        /**
         * 往下遍历子节点
         */
        int nextLevel = level + 1;
        Set<Long> downstreamIdSet = dowmstreamDependencyMap.get(taskId);
        if(CollectionUtils.isNotEmpty(downstreamIdSet)){
            for(Long downId : downstreamIdSet){
                /**
                 * 一个节点下边可能有多个分支，环一般存在于一个分支中，
                 * 所以每一个分支都有一个父节点遍历情况的副本，然后再往下遍历
                 */
                Set<Long> childBranchIdSet = Sets.newHashSet();
                childBranchIdSet.addAll(branchIdSet);
                //递归
                deepTravelDag(
                        downId,
                        nextLevel,
                        dowmstreamDependencyMap,
                        childBranchIdSet,
                        allIdSet,
                        levelMap);
            }
        }
    }

    /**
     * 通过依赖获取id
     * @param dependencies
     * @return
     */
    public static List<Long> getTaskIds(List<TaskDependency> dependencies){

        if(CollectionUtils.isEmpty(dependencies)){
            return null;
        }
        Set<Long> taskIdSet = Sets.newHashSet();
        dependencies.forEach(dependency -> {
            Long taskId = dependency.getTaskId();
            Long upstreamTaskId = dependency.getUpstreamTaskId();
                taskIdSet.add(taskId);
                taskIdSet.add(upstreamTaskId);
        });
        return Lists.newArrayList(taskIdSet);
    }


    /**
     * 获取任务的上游
     * @param dependencies
     * @return
     */
    public static Map<Long, Set<Long>> getUpstreamDependencyMap(List<TaskDependency> dependencies) {
        Map<Long, Set<Long>> dependencyMap = Maps.newHashMap();
        if(CollectionUtils.isNotEmpty(dependencies)){
            dependencies.forEach(dependency -> {
                Long taskId = dependency.getTaskId();
                Set<Long> upstreamSet = dependencyMap.get(taskId);
                if(upstreamSet == null){
                    upstreamSet = Sets.newHashSet();
                    dependencyMap.put(taskId, upstreamSet);
                }
                upstreamSet.add(dependency.getUpstreamTaskId());
            });
        }
        return dependencyMap;
    }

    /**
     * 获取任务的下游任务
     * @param dependencies
     * @return
     */
    public static Map<Long, Set<Long>> getDownstreamDependencyMap(List<TaskDependency> dependencies) {
        Map<Long, Set<Long>> dependencyMap = Maps.newHashMap();
        if(CollectionUtils.isNotEmpty(dependencies)){
            dependencies.forEach(dependency -> {
                Long taskId = dependency.getTaskId();
                Long upstreamTaskId = dependency.getUpstreamTaskId();
                Set<Long> downstreamIdSet = dependencyMap.get(upstreamTaskId);
                if(downstreamIdSet == null){
                    downstreamIdSet = Sets.newHashSet();
                    dependencyMap.put(upstreamTaskId, downstreamIdSet);
                }
                downstreamIdSet.add(taskId);
            });
        }
        return dependencyMap;
    }

}
