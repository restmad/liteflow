package cn.lite.flow.console.service.queue;

import cn.lite.flow.console.common.election.MasterInfo;
import cn.lite.flow.console.model.event.model.ScheduleEvent;

import java.util.concurrent.LinkedBlockingQueue;

/**
 * @description: 事件队列
 * @author: yueyunyue
 * @create: 2018-08-06
 **/
public class EventQueue {

    private final static LinkedBlockingQueue<ScheduleEvent> QUEUE = new LinkedBlockingQueue<ScheduleEvent>();

    public static void put(ScheduleEvent event){
        //当前非主，调用主的服务
        if(MasterInfo.isMaster()){
            QUEUE.add(event);
        }
    }

    public static ScheduleEvent poll(){
        ScheduleEvent event = QUEUE.poll();
        return event;
    }

    public static void clear(){
        QUEUE.clear();
    }
}
