package cn.lite.flow.console.web.controller.dashboard;

import cn.lite.flow.common.model.consts.StatusType;
import cn.lite.flow.console.common.utils.ResponseUtils;
import cn.lite.flow.console.common.utils.portal.CallableInfo;
import cn.lite.flow.console.common.utils.portal.PortalUtils;
import cn.lite.flow.console.model.consts.TaskVersionStatus;
import cn.lite.flow.console.service.FlowService;
import cn.lite.flow.console.service.TaskInstanceService;
import cn.lite.flow.console.service.TaskService;
import cn.lite.flow.console.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @description: 控制面板
 * @author: yueyunyue
 * @create: 2018-07-25
 **/
@RestController
@RequestMapping("console/dashboard")
public class DashboardController extends BaseController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private FlowService flowService;
    @Autowired
    private TaskInstanceService taskInstanceService;


    /**
     * 获取基本信息  任务总数     已上线任务数      任务流总数       已上线任务流总数
     *
     * @return
     */
    @RequestMapping(value = "baseInfo")
    public String baseInfo() {
        List<CallableInfo> callableInfos = new ArrayList<>(4);
        PortalUtils.submit(callableInfos, "tasks", () -> taskService.statisByStatus(null), 1000);
        PortalUtils.submit(callableInfos, "onlineTasks", () -> taskService.statisByStatus(StatusType.ON.getValue()), 1000);
        PortalUtils.submit(callableInfos, "flows", () -> flowService.statisByStatus(null), 1000);
        PortalUtils.submit(callableInfos, "onlineFlows", () -> flowService.statisByStatus(StatusType.ON.getValue()), 1000);
        return ResponseUtils.success(PortalUtils.getTaskResult(callableInfos));
    }

    /**
     * 运行情况
     *
     * @param startTime     起始时间
     * @param endTime       结束时间
     * @return
     */
    @RequestMapping(value = "runInfo")
    public String runInfo(
            @RequestParam(value = "startTime") String startTime,
            @RequestParam(value = "endTime") String endTime
    ) {
        List<CallableInfo> callableInfos = new ArrayList<>(4);
        PortalUtils.submit(callableInfos, "fail", () -> taskInstanceService.statis(startTime, endTime, TaskVersionStatus.FAIL.getValue()), 2000);
        PortalUtils.submit(callableInfos, "all", () -> taskInstanceService.statis(startTime, endTime, null), 2000);
        PortalUtils.submit(callableInfos, "running", () -> taskInstanceService.statis(startTime, endTime, TaskVersionStatus.RUNNING.getValue()), 2000);
        PortalUtils.submit(callableInfos, "ignore", () -> taskInstanceService.statis(startTime, endTime, TaskVersionStatus.SUCCESS.getValue()), 2000);
        return ResponseUtils.success(PortalUtils.getTaskResult(callableInfos));
    }
}
