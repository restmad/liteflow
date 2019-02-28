package cn.lite.flow.console.web.controller.executor;

import cn.lite.flow.console.common.utils.ResponseUtils;
import cn.lite.flow.console.service.DirectExecutorService;
import cn.lite.flow.console.web.controller.BaseController;
import cn.lite.flow.executor.client.ExecutorJobRpcService;
import cn.lite.flow.executor.client.model.JobParam;
import cn.lite.flow.executor.model.basic.ExecutorJob;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @description: 执行者任务
 * @author: yueyunyue
 * @create: 2018-07-25
 **/
@RestController
@RequestMapping("executor/exeJob")
public class JobController extends BaseController {

    @Autowired
    private ExecutorJobRpcService executorJobRpcService;

    @Autowired
    private DirectExecutorService directExecutorService;

    /**
     * 列表
     *
     * @param pageNum       当前页码
     * @param pageSize      每页数量
     * @return
     */
    @RequestMapping(value = "list")
    public String list(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "applicationId", required = false) Long applicationId,
            @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize
    ) {
        JobParam param = new JobParam();
        param.setPageNum(pageNum);
        param.setPageSize(pageSize);
        List<ExecutorJob> jobs = executorJobRpcService.list(param);

        int total = 0;
        JSONArray datas = new JSONArray();
        if (CollectionUtils.isNotEmpty(jobs)) {
            total = executorJobRpcService.count(param);
            jobs.forEach(job -> {
                JSONObject obj = new JSONObject();
                obj.put("id", job.getId());
                obj.put("applicationId", job.getApplicationId());
                obj.put("status", job.getStatus());
                obj.put("msg", job.getMsg());
                obj.put("startTime", job.getStartTime());
                obj.put("endTime", job.getEndTime());
                obj.put("createTime", job.getCreateTime());
                obj.put("updateTime", job.getUpdateTime());
                datas.add(obj);
            });
        }
        return ResponseUtils.list(total, datas);
    }

    /**
     * 获取日志接口
     *
     * @param id            执行job id
     * @param offset        日志偏移量
     * @param length        要获取的字节长度
     * @return
     */
    @RequestMapping(value = "getLog")
    public String getLog(
            @RequestParam(value = "id") Long id,
            @RequestParam(value = "offset", required = false, defaultValue = "1") int offset,
            @RequestParam(value = "length", required = false, defaultValue = "1000") int length
    ) {
//        ExecutorJob executorJob = executorJobRpcService.getById(id);
//        if (executorJob == null) {
//            throw new ConsoleRuntimeException("没有获取到相关的执行任务");
//        }
//
//        ExecutorServer executor = executorServerService.getById(executorJob.getSourceId());
//        if (executor == null) {
//            throw new ConsoleRuntimeException("没有获取到该执行任务相关的执行者");
//        }
//
//        DirectIpHolder.setIp(executor.getIp());
//
//        RpcListResult<String> rpcListResult = executorJobRpcService.getLog(id, offset, length);
        JSONObject obj = new JSONObject();
//        if (rpcListResult != null && rpcListResult.getLength() > 0) {
//            obj.put("log", rpcListResult.getData());
//            obj.put("length", rpcListResult.getLength());
//        }
        return ResponseUtils.success(obj);
    }

    /**
     * kill 任务
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "kill")
    public String kill(@RequestParam(value = "id") long id) {
        directExecutorService.killJob(id);
        return ResponseUtils.success("操作成功");
    }
    /**
     * kill 任务
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "callback")
    public String callback(@RequestParam(value = "id") long id) {
        executorJobRpcService.callback(id);
        return ResponseUtils.success("操作成功");
    }
}
