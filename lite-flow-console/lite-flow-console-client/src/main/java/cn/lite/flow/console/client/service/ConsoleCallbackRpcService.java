package cn.lite.flow.console.client.service;


/**
 * @description: 回调服务
 * @author: yueyunyue
 * @create: 2018-08-07
 **/
public interface ConsoleCallbackRpcService {

    /**
     * 成功
     * @param instanceId
     */
    void success(long instanceId);

    /**
     * 实例运行信息
     * @param instanceId
     * @param msg
     */
    void running(long instanceId, String msg) ;

    /**
     * 失败
     * @param instanceId
     * @param msg
     */
    void fail(long instanceId, String msg) ;

    /**
     * 任务被kill掉
     * @param instanceId
     * @param msg
     */
    void killed(long instanceId, String msg) ;

}
