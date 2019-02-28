package cn.lite.flow.console.kernel.job;

import cn.lite.flow.common.job.basic.AbstractUnstatefullJob;
import cn.lite.flow.console.common.election.MasterInfo;
import cn.lite.flow.console.model.event.consts.Event;
import cn.lite.flow.console.kernel.event.handler.EventHandler;
import cn.lite.flow.console.kernel.event.handler.EventHandlerFactory;
import cn.lite.flow.console.model.event.model.ScheduleEvent;
import cn.lite.flow.console.service.queue.EventQueue;
import org.apache.commons.lang3.time.StopWatch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @description: 事件消费job
 * @author: yueyunyue
 * @create: 2018-08-06
 **/

public class ConsumerEventQueueJob extends AbstractUnstatefullJob {

    private final static Logger LOG = LoggerFactory.getLogger(ConsumerEventQueueJob.class);

    @Override
    public void executeInternal() {
        ScheduleEvent event = null;
        do {
            try {
                event = EventQueue.poll();
                if(event == null){
                    break;
                }
                LOG.info("start handle event:" + event.toString());
                StopWatch stopWatch = new StopWatch();
                Event eventType = event.getEventType();
                EventHandler eventHandler = EventHandlerFactory.getHandler(eventType);
                if(MasterInfo.isMaster()){
                    eventHandler.handle(event);
                }else {
                    return;
                }
                LOG.info("finish handle event:" + event.toString() + ",it tasks " + stopWatch.getTime() + "ms");
            } catch (Throwable e) {
                LOG.error("event handle error:" + event.toString(), e);
            }

        } while (event != null);

    }
}
