package cn.lite.flow.console.service;

/**
 * @description: 直接请求具体executor
 * @author: yueyunyue
 * @create: 2019-01-17
 **/
public interface DirectExecutorService {

    /**
     * kill 任务
     * @param id
     */
    void killJob(long id);

    /**
     * kill 但不回调
     * @param id
     */
    void killJob(long id, boolean isCallback);

    /**
     * 获取日志
     * @param executeJobId
     * @return
     */
    String getLog(long executeJobId);

}
