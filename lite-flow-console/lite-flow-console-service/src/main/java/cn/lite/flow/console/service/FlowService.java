package cn.lite.flow.console.service;

import cn.lite.flow.common.model.Tuple;
import cn.lite.flow.common.service.basic.BaseService;
import cn.lite.flow.console.model.basic.Flow;
import cn.lite.flow.console.model.basic.TaskDependency;
import cn.lite.flow.console.model.query.FlowQM;

import java.util.List;
import java.util.Set;

/**
 * 任务流相关
 * @author yueyunyue
 */
public interface FlowService extends BaseService<Flow, FlowQM> {

    /**
     * 获取任务流第一个任务
     * @param flowId
     * @return
     */
    Long getHeadTask(long flowId);
    /**
     * 批量获取
     * @param flowIds
     * @return
     */
    List<Flow> getByIds(List<Long> flowIds);

    /**
     * 获取任务流的依赖
     * @param flowId
     * @return
     */
    List<TaskDependency> getDependencies(long flowId);
    /**
     * 获取任务流的任务
     * @param flowId
     * @return
     */
    List<Long> getTaskIds(long flowId);

    /**
     * 上线
     * @param flowId
     * @return
     */
    Tuple<Boolean, List<String>> online(long flowId);

    /**
     * 下线
     * @param flowId
     * @return
     */
    Tuple<Boolean, List<String>> offline(long flowId);

    /**
     * 添加或者更新任务依赖
     *
     * @param flowId            任务流id
     * @param dependencies      依赖
     */
    void addOrUpdateDependencies(long flowId, List<TaskDependency> dependencies);

    /**
     * 统计处于某状态的任务流总数
     *
     * @param status    任务流状态   如果为null, 则统计所有
     * @return
     */
    int statisByStatus(Integer status);

    /**
     * 获取任务所属上线的任务流
     * @param taskId
     * @return
     */
    Set<Long> getOnlineFlowIdSet(Long taskId);
    /**
     * 获取任务所属未上线的任务流，包括新建、 下线
     * @param taskId
     * @return
     */
    Set<Long> getUnOnlineFlowIdSet(Long taskId);

    /**
     * 获取任务所属任务流
     * @param taskId
     * @return
     */
    Set<Long> getFlowIdSetByTask(long taskId);




}
