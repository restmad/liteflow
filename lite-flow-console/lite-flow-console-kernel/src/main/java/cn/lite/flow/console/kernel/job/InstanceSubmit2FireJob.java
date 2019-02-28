package cn.lite.flow.console.kernel.job;

import cn.lite.flow.common.job.basic.AbstractUnstatefullJob;
import cn.lite.flow.console.model.event.consts.Event;
import cn.lite.flow.console.model.event.model.ScheduleEvent;
import cn.lite.flow.console.service.queue.EventQueue;
import cn.lite.flow.console.service.TaskInstanceService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * @description: 初始化完成并且已经到达触发时间
 * @author: yueyunyue
 * @create: 2018-08-03
 **/
public class InstanceSubmit2FireJob extends AbstractUnstatefullJob {

    @Autowired
    private TaskInstanceService instanceService;

    @Override
    public void executeInternal() {
        List<Long> instanceIds = instanceService.listReady2SubmitInstance();
        if(CollectionUtils.isNotEmpty(instanceIds)){
            for(Long instanceId : instanceIds){
                ScheduleEvent scheduleEvent = ScheduleEvent.newInstance(Event.SUBMIT, instanceId);
                EventQueue.put(scheduleEvent);
            }
        }
    }
}
