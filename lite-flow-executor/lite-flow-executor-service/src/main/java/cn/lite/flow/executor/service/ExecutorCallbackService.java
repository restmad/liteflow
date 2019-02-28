package cn.lite.flow.executor.service;

import cn.lite.flow.common.service.basic.BaseService;
import cn.lite.flow.executor.model.basic.ExecutorCallback;
import cn.lite.flow.executor.model.query.ExecutorCallbackQM;

/**
 * @description: 回调
 * @author: yueyunyue
 * @create: 2018-09-13
 **/
public interface ExecutorCallbackService extends BaseService<ExecutorCallback, ExecutorCallbackQM> {

    /**
     * 回调
     * @param jobSourceId
     * @param jobStatus
     * @param msg
     * @return
     */
    boolean callback(long jobSourceId, int jobStatus, String msg);

    /**
     * callback回调
     * @param id
     * @return
     */
    boolean callbackById(long id);

    /**
     * 回调成功
     * @param id
     * @return
     */
    int callbackSuccess(long id);

}
