package cn.lite.flow.executor.kernel.service;

import cn.lite.flow.executor.model.basic.ExecutorJob;

/**
 * @description: 任务补偿
 * @author: yueyunyue
 * @create: 2019-01-22
 **/
public interface CompensateJobService {

    /**
     * 按照条件补偿任务
     * @param status
     */
    void compensateJobByStatus(int status);

    /**
     * 补偿某个任务
     * @param job
     */
    void compensateJob(ExecutorJob job);

}
