package cn.lite.flow.common.job.basic;

import org.apache.commons.lang3.time.StopWatch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * @description: 无状态抽象任务
 * @author: yueyunyue
 * @create: 2018-08-03
 **/
public abstract class AbstractUnstatefullJob {

    public final Logger LOG = LoggerFactory.getLogger(this.getClass());

    private AtomicBoolean isRunning = new AtomicBoolean(false);

    public void execute(){
        try {
            if(isRunning.get()){
                return;
            }
            isRunning.set(true);
            StopWatch stopWatch = new StopWatch();
            stopWatch.start();
            LOG.info("job start");
            executeInternal();
            LOG.info("job finished, takes {} ms", stopWatch.getTime());
        } catch (Exception e) {
            LOG.error("run error", e);
        }finally{
            isRunning.set(false);
        }
    }

    public abstract void executeInternal();

}
