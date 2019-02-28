package cn.lite.flow.console.kernel.event.handler;

import cn.lite.flow.common.utils.SpringUtils;
import cn.lite.flow.console.model.event.consts.Event;

/**
 * @description: 事件处理工厂
 * @author: yueyunyue
 * @create: 2018-07-30
 **/
public class EventHandlerFactory {

    /**
     * 根据事件获取事件处理器
     * @param event
     * @return
     */
    public static EventHandler getHandler(Event event){
        EventHandler eventHandler = (EventHandler)SpringUtils.getBean(event.getHandlerBean());
        if(eventHandler == null){
            throw new IllegalArgumentException("there is no handler of " + event);
        }
        return eventHandler;
    }


}
