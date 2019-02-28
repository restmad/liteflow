package cn.lite.flow.console.service;

import cn.lite.flow.common.model.Tuple;
import cn.lite.flow.console.common.model.vo.DependencyVo;
import cn.lite.flow.console.model.basic.TaskVersion;

import java.util.List;

/**
 * 任务流操作相关
 * @author yueyunyue
 */
public interface FlowOperateService {

    /**
     * 获取任务流的某个版本的dag图
     * @param flowId
     * @param headTaskVersionNo
     * @return
     */
    Tuple<List<TaskVersion>, List<DependencyVo>> dagView(long flowId, long headTaskVersionNo);

    /**
     * 修复任务流
     * @param flowId
     * @param headTaskVersionNo
     */
    void fix(long flowId, long headTaskVersionNo);

    /**
     * 从某个节点开始修复
     * @param flowId
     * @param headTaskVersionNo
     * @param fixVersionId
     */
    void fixFromNode(long flowId, long headTaskVersionNo, long fixVersionId);






}
