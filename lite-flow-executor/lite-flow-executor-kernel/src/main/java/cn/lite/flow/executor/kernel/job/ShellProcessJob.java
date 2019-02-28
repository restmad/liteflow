package cn.lite.flow.executor.kernel.job;

import cn.lite.flow.executor.common.consts.Constants;
import cn.lite.flow.executor.common.utils.Props;
import com.google.common.collect.Lists;
import org.slf4j.Logger;

import java.util.List;

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
        String command = jobProps.getString(Constants.SHELL_COMMAND);
        return Lists.newArrayList(command);
    }

}
