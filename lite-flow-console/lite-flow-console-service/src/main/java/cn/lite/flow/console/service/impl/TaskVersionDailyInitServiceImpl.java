package cn.lite.flow.console.service.impl;

import cn.lite.flow.common.utils.DateUtils;
import cn.lite.flow.console.dao.mapper.TaskVersionDailyInitMapper;
import cn.lite.flow.console.model.basic.TaskVersionDailyInit;
import cn.lite.flow.console.model.consts.DailyInitStatus;
import cn.lite.flow.console.model.consts.TaskVersionStatus;
import cn.lite.flow.console.model.query.TaskVersionDailyInitQM;
import cn.lite.flow.console.service.TaskVersionDailyInitService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @description: dailyinit相关
 * @author: yueyunyue
 * @create: 2018-08-07
 **/
@Service("taskVersionDailyInitServiceImpl")
public class TaskVersionDailyInitServiceImpl implements TaskVersionDailyInitService {

    @Autowired
    private TaskVersionDailyInitMapper taskVersionDailyInitMapper;

    @Override
    public void batchAdd(List<TaskVersionDailyInit> dailyInits) {
        if(CollectionUtils.isEmpty(dailyInits)){
            return;
        }
        Date now = DateUtils.getNow();
        dailyInits.forEach(dailyInit -> {
            dailyInit.setCreateTime(now);
            dailyInit.setStatus(DailyInitStatus.NEW.getValue());
        });
        taskVersionDailyInitMapper.batchInsert(dailyInits);
    }

    @Override
    public TaskVersionDailyInit getTaskDailyInit(long taskId, long day) {
        TaskVersionDailyInitQM queryModel = new TaskVersionDailyInitQM();
        queryModel.setTaskId(taskId);
        queryModel.setDay(day);
        List<TaskVersionDailyInit> dailyInits = taskVersionDailyInitMapper.findList(queryModel);
        if(CollectionUtils.isNotEmpty(dailyInits)){
            return dailyInits.get(0);
        }
        return null;
    }

    @Override
    public void disableDailyInit(long id) {
        TaskVersionDailyInit dailyInit = new TaskVersionDailyInit();
        dailyInit.setId(id);
        dailyInit.setStatus(DailyInitStatus.DISABLE.getValue());
        this.update(dailyInit);
    }

    @Override
    public void enableDailyInit(long id) {
        TaskVersionDailyInit dailyInit = new TaskVersionDailyInit();
        dailyInit.setId(id);
        dailyInit.setStatus(DailyInitStatus.NEW.getValue());
        this.update(dailyInit);
    }

    @Override
    public void disableDailyInit(long taskId, long day) {
        TaskVersionDailyInit taskDailyInit = getTaskDailyInit(taskId, day);
        if(taskDailyInit == null){
            return;
        }
        disableDailyInit(taskDailyInit.getTaskId());
    }

    @Override
    public void enableDailyInit(long taskId, long day) {
        TaskVersionDailyInit taskDailyInit = getTaskDailyInit(taskId, day);
        if(taskDailyInit == null){
            return;
        }
        enableDailyInit(taskDailyInit.getId());
    }

    @Override
    public void successDailyInit(long id) {
        TaskVersionDailyInit dailyInit = new TaskVersionDailyInit();
        dailyInit.setId(id);
        dailyInit.setStatus(DailyInitStatus.SUCCESS.getValue());
        this.update(dailyInit);
    }

    @Override
    public void failDailyInit(long id, String msg) {
        TaskVersionDailyInit dailyInit = new TaskVersionDailyInit();
        dailyInit.setId(id);
        dailyInit.setStatus(DailyInitStatus.FAIL.getValue());
        dailyInit.setMsg(msg);
        this.update(dailyInit);
    }

    @Override
    public void add(TaskVersionDailyInit dailyInit) {
        Date now = DateUtils.getNow();
        dailyInit.setCreateTime(now);
        taskVersionDailyInitMapper.insert(dailyInit);
    }

    @Override
    public TaskVersionDailyInit getById(long id) {
        return taskVersionDailyInitMapper.getById(id);
    }

    @Override
    public int update(TaskVersionDailyInit dailyInit) {
        return taskVersionDailyInitMapper.update(dailyInit);
    }

    @Override
    public int count(TaskVersionDailyInitQM queryModel) {
        return taskVersionDailyInitMapper.count(queryModel);
    }

    @Override
    public List<TaskVersionDailyInit> list(TaskVersionDailyInitQM queryModel) {
        return taskVersionDailyInitMapper.findList(queryModel);
    }
}
