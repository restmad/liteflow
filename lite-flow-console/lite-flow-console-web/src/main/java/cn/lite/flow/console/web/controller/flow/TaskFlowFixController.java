package cn.lite.flow.console.web.controller.flow;

import cn.lite.flow.common.model.query.Page;
import cn.lite.flow.common.utils.DateUtils;
import cn.lite.flow.console.common.consts.TimeUnit;
import cn.lite.flow.console.common.utils.QuartzUtils;
import cn.lite.flow.console.common.utils.ResponseUtils;
import cn.lite.flow.console.common.utils.TaskVersionUtils;
import cn.lite.flow.console.model.basic.Task;
import cn.lite.flow.console.model.basic.TaskVersion;
import cn.lite.flow.console.model.query.TaskVersionQM;
import cn.lite.flow.console.service.FlowService;
import cn.lite.flow.console.service.TaskService;
import cn.lite.flow.console.service.TaskVersionService;
import cn.lite.flow.console.web.controller.BaseController;
import com.alibaba.fastjson.JSONArray;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Date;
import java.util.List;
/**
 * @description: 任务流相关
 * @author: yueyunyue
 * @create: 2018-07-25
 **/
@RestController
@RequestMapping("console/flow/fix")
public class TaskFlowFixController extends BaseController {

    @Autowired
    private FlowService flowService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskVersionService taskVersionService;

    /**
     * 获取任务头最近的任务版本
     */
    @RequestMapping(value = "getLatestVersion")
    public String getLatestVersion(
               @RequestParam(value = "flowId") long flowId) {

        JSONArray datas = new JSONArray();
        Long headTaskId = flowService.getHeadTask(flowId);
        if(headTaskId == null){
            return ResponseUtils.error("无任务版本");
        }

        TaskVersionQM qm = new TaskVersionQM();
        qm.setTaskId(headTaskId);
        qm.addOrderDesc(TaskVersionQM.COL_VERSION_NO);
        qm.setPage(Page.getDefaultPage());

        List<TaskVersion> versions = taskVersionService.list(qm);

        if(CollectionUtils.isNotEmpty(versions)){
            for(int i = versions.size() - 1; i >=0; i --){
                datas.add(versions.get(i).getVersionNo());
            }
        }
        return ResponseUtils.success(datas);
    }


    /**
     * 获取任务头任务的任务版本
     */
    @RequestMapping(value = "getHeadTaskVersions")
    public String getFirstTaskVersions(
               @RequestParam(value = "flowId") long flowId,
               @RequestParam(value = "startTime") String  startTime,
               @RequestParam(value = "endTime") String endTime) {

        Date start = DateUtils.formatToDateTime(startTime);
        Date end = DateUtils.formatToDateTime(endTime);
        if(end.before(start)){
            return ResponseUtils.error("开始时间应该小于结束时间");
        }

        JSONArray datas = new JSONArray();
        Long headTaskId = flowService.getHeadTask(flowId);
        if(headTaskId == null){
            return ResponseUtils.error("无任务版本");
        }

        Task task = taskService.getById(headTaskId);
        TimeUnit timeUnit = TimeUnit.getType(task.getPeriod());
        //计算时间区间运行时间
        List<Date> taskRunTimes = QuartzUtils.getRunDateTimes(QuartzUtils.completeCrontab(task.getCronExpression()), start, end);
        if (CollectionUtils.isEmpty(taskRunTimes)) {
            return ResponseUtils.error("无任务版本");
        }
        taskRunTimes.forEach(runTime -> {
            Long taskVersionNo = TaskVersionUtils.getTaskVersion(runTime, timeUnit);
            datas.add(taskVersionNo);
        });
        return ResponseUtils.success(datas);
    }


}
