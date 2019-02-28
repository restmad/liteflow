package cn.lite.flow.console.kernel.job;

import cn.lite.flow.common.job.basic.AbstractUnstatefullJob;
import cn.lite.flow.common.model.query.Page;
import cn.lite.flow.common.utils.DateUtils;
import cn.lite.flow.console.model.basic.Task;
import cn.lite.flow.console.model.basic.TaskVersionDailyInit;
import cn.lite.flow.console.model.consts.TaskStatus;
import cn.lite.flow.console.model.query.TaskQM;
import cn.lite.flow.console.service.TaskService;
import cn.lite.flow.console.service.TaskVersionDailyInitService;
import com.google.common.collect.Lists;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

/**
 * @description: 初始化相关job
 * @author: yueyunyue
 * @create: 2018-07-30
 **/
public class TaskVersionDailyInitJob extends AbstractUnstatefullJob {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskVersionDailyInitService dailyInitService;

    private final static int PAGE_SIZE = 100;

    @Override
    public void executeInternal() {
        Date tomorrowDate = DateUtils.getTomorrowDate();
        long tomorrowLongDate = DateUtils.dateToLong(tomorrowDate);
        TaskQM taskQM = new TaskQM();
        taskQM.setStatus(TaskStatus.ONLINE.getValue());
        taskQM.addOrderAsc(TaskQM.COL_ID);

        List<Task> tasks = null;
        int pageNo = 1;
        do{
            List<TaskVersionDailyInit> dailyInits = Lists.newArrayList();
            taskQM.setPage(Page.getPageByPageNo(pageNo, PAGE_SIZE));
            tasks = taskService.list(taskQM);
            if(CollectionUtils.isEmpty(tasks)){
                break;
            }

            for(Task task : tasks){
                //已添加的，忽略
                TaskVersionDailyInit taskDailyInit = dailyInitService.getTaskDailyInit(task.getId(), tomorrowLongDate);
                if(taskDailyInit != null){
                    continue;
                }
                TaskVersionDailyInit dailyInit = new TaskVersionDailyInit();
                dailyInit.setDay(tomorrowLongDate);
                dailyInit.setTaskId(task.getId());
                dailyInits.add(dailyInit);
            }
            //批量添加
            dailyInitService.batchAdd(dailyInits);

            pageNo ++;

        }while (CollectionUtils.isNotEmpty(tasks));
    }
}
