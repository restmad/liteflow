package cn.lite.flow.executor.kernel.schedule;

import cn.lite.flow.executor.kernel.service.CompentsateJobService;
import cn.lite.flow.executor.model.consts.ExecutorJobStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * 启动是运行的任务
 * @author yueyunyue
 */
@Component
public class StartupJob implements CommandLineRunner {

    private final static Logger LOG = LoggerFactory.getLogger(StartupJob.class);

    @Autowired
    private CompentsateJobService compentsateJobService;

    @Override
    public void run(String... strings) throws Exception {
        try{
            /**
             * 补偿任务，补偿由于重启导致container丢失的情况
             * 1.新建任务直接创建container
             * 2.运行任务1）异步任务重建container 2）同步任务会由于executor重启会导致任务状态无法拿到，所以会设置为fail
             */
            compentsateJobService.compentsateJobByStatus(ExecutorJobStatus.NEW.getValue());

            compentsateJobService.compentsateJobByStatus(ExecutorJobStatus.RUNNING.getValue());
        }catch (Throwable e){
            LOG.error("compentsate job error", e);
        }
    }

}
