package cn.lite.flow.executor.kernel.conf;

import cn.lite.flow.common.model.consts.CommonConstants;
import cn.lite.flow.common.utils.IpUtils;
import cn.lite.flow.executor.common.exception.ExecutorRuntimeException;
import cn.lite.flow.executor.model.basic.ExecutorServer;
import cn.lite.flow.executor.service.ExecutorServerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @description: 服务信息
 * @author: yueyunyue
 * @create: 2019-01-17
 **/
@Component
public class ExecutorMetadata implements InitializingBean {

    private static final Logger LOG = LoggerFactory.getLogger(ExecutorMetadata.class);

    private static Long SERVER_ID;

    private static String SERVER_IP;

    @Autowired
    private ExecutorServerService executorServerService;

    @Value("${lite.flow.executor.isAutoRegisterToDB}")
    private boolean isAutoRegisterToDB;

    private static String EXECUTOR_WORKSPACE;

    private static String EXECUTOR_JOBS_PATH = "jobs";

    private static String EXECUTOR_JOB_PREFIX = "job-";

    private static String EXECUTOR_PLUGINS_PATH = "plugins";

    private static String EXECUTOR_LIB_PATH = "lib";

    @Override
    public void afterPropertiesSet() throws Exception {

        SERVER_IP = IpUtils.getIp();
        LOG.info("get local ip {}", SERVER_IP);
        ExecutorServer executorServer = executorServerService.getByIp(SERVER_IP);
        if(executorServer == null && isAutoRegisterToDB){
            executorServer = new ExecutorServer();
            executorServer.setIp(SERVER_IP);
            executorServer.setName(SERVER_IP);
            executorServer.setUserId(0l);
            executorServer.setDescription("自动注册");
            executorServerService.add(executorServer);
            LOG.info("executor is auto registered,ip:{}", SERVER_IP);
        }else {
            String errorMsg = "ip:" + SERVER_IP + " executor is not registered";
            throw new ExecutorRuntimeException(errorMsg);
        }
        SERVER_ID = executorServer.getId();

    }

    public static long getServerId() {
        return SERVER_ID;
    }

    public static String getServerIp() {
        return SERVER_IP;
    }

    /**
     * 设置executor运行的空间
     * @param workspace
     */
    @Value("${lite.flow.executor.workspace}")
    public void setExecutorWorkspace(String workspace){
        if(EXECUTOR_WORKSPACE == null){
            EXECUTOR_WORKSPACE = workspace;
        }
    }

    public static String getExecutorWorkspace() {
        return EXECUTOR_WORKSPACE;
    }

    /**
     * 获取任务的工作目录
     * @param jobId
     * @return
     */
    public static String getJobWorkspace(long jobId){
        StringBuilder sb = new StringBuilder();
        sb.append(EXECUTOR_WORKSPACE);
        sb.append(CommonConstants.FILE_SPLIT);
        sb.append(EXECUTOR_JOBS_PATH);
        sb.append(CommonConstants.FILE_SPLIT);
        sb.append(EXECUTOR_JOB_PREFIX);
        sb.append(jobId);
        return sb.toString();
    }
}
