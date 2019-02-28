package cn.lite.flow.console.kernel.event.handler;

import cn.lite.flow.console.model.event.model.ScheduleEvent;

/**
 * @description: 事件处理器
 * @author: yueyunyue
 * @create: 2018-07-27
 **/
public interface EventHandler {
    /**
     * 处理事件
     * @param event
     * @return
     */
    boolean handle(ScheduleEvent event);

}
