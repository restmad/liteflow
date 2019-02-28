package cn.lite.flow.console.kernel.event.handler;

import cn.lite.flow.common.utils.ExceptionUtils;
import cn.lite.flow.common.utils.DateUtils;
import cn.lite.flow.console.model.basic.Task;
import cn.lite.flow.console.model.consts.TaskStatus;
import cn.lite.flow.console.model.event.model.ScheduleEvent;
import cn.lite.flow.console.model.basic.TaskVersionDailyInit;
import cn.lite.flow.console.service.TaskService;
import cn.lite.flow.console.service.TaskVersionDailyInitService;
import cn.lite.flow.console.service.TaskVersionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * @description: 上线
 * @author: yueyunyue
 * @create: 2018-07-30
 **/
public class DailyInitEventHandler implements EventHandler{

    private final static Logger LOG = LoggerFactory.getLogger(DailyInitEventHandler.class);

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskVersionService versionService;

    @Autowired
    private TaskVersionDailyInitService dailyInitService;

    @Override
    @Transactional("consoleTxManager")
    public boolean handle(ScheduleEvent event) {
        Long eventTargetId = event.getEventTargetId();
        TaskVersionDailyInit dailyInit = dailyInitService.getById(eventTargetId);

        Long taskId = dailyInit.getTaskId();
        Task task = taskService.getById(taskId);
        if(task.getStatus() != TaskStatus.ONLINE.getValue()){
            dailyInitService.disableDailyInit(dailyInit.getId());
        }
        try{
            /**
             * 计算次日的任务版本
             */
            Date initDay = DateUtils.longToDate(dailyInit.getDay());
            Date startTime = DateUtils.getStartTimeOfDay(initDay);
            Date endTime = DateUtils.getEndTimeOfDay(initDay);
            versionService.calVersionAndInstanceWithDependency(taskId, startTime, endTime);
            dailyInitService.successDailyInit(dailyInit.getId());
            LOG.info("daily init for task({}) of day({}) list", task, dailyInit.getDay());
            return false;
        }catch (Throwable e){
            dailyInitService.failDailyInit(dailyInit.getId(), ExceptionUtils.collectStackMsg(e));
            LOG.error("dailyinit handler error:" + eventTargetId, e);
        }
        return true;
    }
}
