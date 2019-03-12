package cn.lite.flow.executor.kernel.job;

import cn.lite.flow.common.model.consts.CommonConstants;
import cn.lite.flow.executor.common.consts.Constants;
import cn.lite.flow.executor.common.utils.Props;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * @description: shell任务
 * @author: yueyunyue
 * @create: 2018-08-24
 **/
public class ShellProcessJob extends ProcessJob {

    public ShellProcessJob(long executorJobId, Props sysProps, Props jobProps, Logger log) {
        super(executorJobId, sysProps, jobProps, log);
    }

    @Override
    protected List<String> getCommandList(){
        StringBuilder paramBuild = new StringBuilder();
        String command = jobProps.getString(Constants.SHELL_COMMAND);
        paramBuild.append(command).append(CommonConstants.BLANK_SPACE);
        /**
         * 将参数打平成: -A A -B B -C C -D D便于传参
         */
        Map<String, String> paramMap = jobProps.getParamMap();
        if(paramMap != null){
            TreeMap<String, String> treeMap = new TreeMap<>(paramMap);
            for(Map.Entry<String, String> paramKV : treeMap.entrySet()){
                String key = paramKV.getKey();
                String value = paramKV.getValue();
                if(StringUtils.equals(Constants.SHELL_COMMAND, key)){
                    continue;
                }
                paramBuild.append(CommonConstants.LINE)
                        .append(key)
                        .append(CommonConstants.BLANK_SPACE)
                        .append(value)
                        .append(CommonConstants.BLANK_SPACE);

            }
        }
        String shellCommand = paramBuild.toString();
        this.logger.info("shell command:" + shellCommand);
        return Lists.newArrayList(shellCommand);
    }

}
