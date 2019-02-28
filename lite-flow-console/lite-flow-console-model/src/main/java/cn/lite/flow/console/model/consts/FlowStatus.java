package cn.lite.flow.console.model.consts;

import lombok.Getter;

/**
 * 任务流状态枚举常量
 */
@Getter
public enum FlowStatus {

    NEW(0, "新建"),

    ONLINE(1, "上线"),

    OFFLINE(-1, "下线");

    private int value;

    private String desc;

    FlowStatus(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public static FlowStatus getType(int value) {
        for (FlowStatus status : FlowStatus.values()) {
            if (status.getValue() == value) {
                return status;
            }
        }
        return null;
    }
}
