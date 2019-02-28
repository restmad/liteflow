package cn.lite.flow.console.model.event.consts;

import lombok.Getter;
/**
 * 事件类型
 */
@Getter
public enum Event {

    INIT(1, "初始化", "dailyInitEventHandler"),

    READY(2, "准备状态", "readyEventHandler"),

    SUBMIT(3, "提交", "submitEventHandler");

    private int value;

    private String desc;

    private String handlerBean;

    Event(int value, String desc, String handlerBean) {
        this.value = value;
        this.desc = desc;
        this.handlerBean = handlerBean;
    }

    /**
     * 根据id
     *
     * @return
     */
    public static Event getType(int value) {

        for (Event type : Event.values()) {
            if (type.getValue() == value) {
                return type;
            }
        }
        return null;
    }
}
