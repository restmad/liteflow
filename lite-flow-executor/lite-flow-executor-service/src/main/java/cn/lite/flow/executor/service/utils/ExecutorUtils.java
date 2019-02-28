package cn.lite.flow.executor.service.utils;

import cn.lite.flow.common.utils.SpringUtils;
import cn.lite.flow.executor.service.ExecutorContainerService;
import cn.lite.flow.executor.service.ExecutorJobService;
import cn.lite.flow.executor.service.ExecutorPluginService;
import cn.lite.flow.executor.service.ExecutorServerService;

/**
 * @description: job工具
 * @author: yueyunyue
 * @create: 2018-09-13
 **/
public class ExecutorUtils {
    /**
     * 获取job service
     * @return
     */
    public static ExecutorJobService getExecutorJobService(){
        ExecutorJobService executorJobService = (ExecutorJobService)SpringUtils.getBean("executorJobServiceImpl");
        return executorJobService;
    }

    /**
     * 获取container service
     * @return
     */
    public static ExecutorContainerService getExecutorContainerService(){
        ExecutorContainerService containerService = (ExecutorContainerService)SpringUtils.getBean("executorContainerServiceImpl");
        return containerService;
    }

    /**
     * 获取plugin service
     * @return
     */
    public static ExecutorPluginService getExecutorPluginService(){
        ExecutorPluginService containerService = (ExecutorPluginService)SpringUtils.getBean("executorPluginServiceImpl");
        return containerService;
    }
    /**
     * 获取server service
     * @return
     */
    public static ExecutorServerService getExecutorServerService(){
        ExecutorServerService containerService = (ExecutorServerService)SpringUtils.getBean("executorServerServiceImpl");
        return containerService;
    }


}
