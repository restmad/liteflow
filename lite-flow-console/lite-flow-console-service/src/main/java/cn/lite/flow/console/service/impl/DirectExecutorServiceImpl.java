package cn.lite.flow.console.service.impl;

import cn.lite.flow.common.dubbo.DirectIpHolder;
import cn.lite.flow.console.common.exception.ConsoleRuntimeException;
import cn.lite.flow.console.service.DirectExecutorService;
import cn.lite.flow.executor.client.ExecutorJobRpcService;
import cn.lite.flow.executor.client.ExecutorServerRpcService;
import cn.lite.flow.executor.model.basic.ExecutorJob;
import cn.lite.flow.executor.model.basic.ExecutorServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @description: 直接请求具体executor
 * @author: yueyunyue
 * @create: 2019-01-17
 **/
@Service("directExecutorServiceImpl")
public class DirectExecutorServiceImpl implements DirectExecutorService {

    private final static Logger LOG = LoggerFactory.getLogger(DirectExecutorServiceImpl.class);

    @Autowired
    private ExecutorJobRpcService executorJobRpcService;

    @Autowired
    private ExecutorServerRpcService executorServerRpcService;

    private ExecutorServer getExecutorServerOfJob(long jobId){
        ExecutorJob executorJob = executorJobRpcService.getById(jobId);
        if (executorJob == null) {
            throw new ConsoleRuntimeException("没有获取到相关的执行任务");
        }

        ExecutorServer executor = executorServerRpcService.getById(executorJob.getExecutorServerId());
        if (executor == null) {
            throw new ConsoleRuntimeException("没有获取到该执行任务相关的执行者");
        }
        return executor;
    }

    @Override
    public void killJob(long id) {

        this.killJob(id, true);

    }

    @Override
    public void killJob(long id, boolean isCallback) {
        ExecutorServer executor = getExecutorServerOfJob(id);
        try {
            DirectIpHolder.setIp(executor.getIp());
            executorJobRpcService.kill(id, isCallback);
        }finally {
            DirectIpHolder.remove();
        }
    }


    @Override
    public String getLog(long executeJobId) {
        ExecutorServer executor = getExecutorServerOfJob(executeJobId);
        try {
            DirectIpHolder.setIp(executor.getIp());
            String log = executorJobRpcService.getLog(executeJobId);
            return log;
        }finally {
            DirectIpHolder.remove();
        }
    }

}
