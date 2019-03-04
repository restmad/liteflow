package cn.lite.flow.console.kernel.event.handler;

import cn.lite.flow.console.model.event.model.ScheduleEvent;
import cn.lite.flow.console.model.basic.TaskInstance;
import cn.lite.flow.console.model.basic.TaskVersion;
import cn.lite.flow.console.model.consts.TaskVersionStatus;
import cn.lite.flow.console.service.TaskInstanceService;
import cn.lite.flow.console.service.TaskVersionService;
import cn.lite.flow.executor.client.ExecutorJobRpcService;
import cn.lite.flow.executor.client.model.SubmitExecuteJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

/**
 * @description: 提交
 * @author: yueyunyue
 * @create: 2018-07-30
 **/
public class SubmitEventHandler implements EventHandler{

    private final static Logger LOG = LoggerFactory.getLogger(SubmitEventHandler.class);

    @Autowired
    private TaskInstanceService instanceService;

    @Autowired
    private TaskVersionService versionService;

    @Autowired
    private ExecutorJobRpcService jobRpcService;

    @Override
    @Transactional("consoleTxManager")
    public boolean handle(ScheduleEvent event) {

        Long instanceId = event.getEventTargetId();
        TaskInstance taskInstance = instanceService.getById(instanceId);
        if(taskInstance.getStatus() != TaskVersionStatus.READY.getValue()){
            LOG.info("instance({}) status is not ready", instanceId);
            return false;
        }
        String msg = "已提交";

        /**
         * 任务添加到executor
         */
        SubmitExecuteJob submitExecuteJob = new SubmitExecuteJob();
        submitExecuteJob.setInstanceId(taskInstance.getId());
        submitExecuteJob.setPluginId(taskInstance.getPluginId());
        submitExecuteJob.setPluginConf(taskInstance.getPluginConf());
        Long executorId = jobRpcService.submitJob(submitExecuteJob);

        /**
         * 更新实例
         */
        TaskInstance instanceUpdate = new TaskInstance();
        instanceUpdate.setId(instanceId);
        instanceUpdate.setExecutorJobId(executorId);
        instanceUpdate.setStatus(TaskVersionStatus.SUBMITTED.getValue());
        instanceUpdate.setMsg(msg);
        instanceService.updateWithStatus(instanceUpdate, TaskVersionStatus.READY.getValue());
        /**
         * 更新任务版本
         */
        TaskVersion versionUpdate = new TaskVersion();
        versionUpdate.setId(taskInstance.getTaskVersionId());
        versionUpdate.setStatus(TaskVersionStatus.SUBMITTED.getValue());
        versionService.updateWithStatus(versionUpdate, TaskVersionStatus.READY.getValue());

        return true;
    }
}
