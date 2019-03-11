package cn.lite.flow.executor.kernel.schedule;

import cn.lite.flow.common.job.basic.AbstractUnstatefullJob;
import cn.lite.flow.executor.kernel.conf.ExecutorMetadata;
import cn.lite.flow.executor.model.basic.ExecutorCallback;
import cn.lite.flow.executor.model.consts.JobCallbackStatus;
import cn.lite.flow.executor.model.query.ExecutorCallbackQM;
import cn.lite.flow.executor.model.query.ExecutorJobQM;
import cn.lite.flow.executor.service.ExecutorCallbackService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


/**
 * @description: 处理回调任务，只是一个补偿
 * @author: yueyunyue
 * @create: 2019-01-17
 **/
public class CallbackFireJob extends AbstractUnstatefullJob {

    @Autowired
    private ExecutorCallbackService executorCallbackService;

    private final static int PAGE_SIZE = 100;

    @Override
    public void executeInternal() {

        ExecutorCallbackQM qm = new ExecutorCallbackQM();
        /**
         * 添加执行者id
         */
        qm.setExecutorServerId(ExecutorMetadata.getServerId());

        qm.setStatus(JobCallbackStatus.WAITING.getValue());
        int pageNo = 1;
        qm.addOrderAsc(ExecutorJobQM.COL_ID);

        List<ExecutorCallback> executorCallbacks = null;
        do{
            qm.setPage(pageNo, PAGE_SIZE);
            executorCallbacks = executorCallbackService.list(qm);
            if(CollectionUtils.isNotEmpty(executorCallbacks)){
                executorCallbacks.stream().forEach(callback -> {
                    try {
                        executorCallbackService.callbackById(callback.getId());
                    }catch (Throwable e){
                        LOG.error("callback job error,id:" + callback.getId(), e);
                    }
                });
            }
            pageNo ++;
        }while (CollectionUtils.isNotEmpty(executorCallbacks));


    }


}
