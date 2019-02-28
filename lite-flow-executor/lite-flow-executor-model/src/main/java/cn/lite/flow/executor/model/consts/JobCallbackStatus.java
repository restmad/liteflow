package cn.lite.flow.executor.model.consts;

import lombok.Getter;

/**
 * job状态枚举常量
 */
@Getter
public enum JobCallbackStatus {

    NO_NEED(-1, "不需要回调"),

    WAITING(0, "等待回调"),

    DONE(1, "回调完成");

    private int value;

    private String desc;

    JobCallbackStatus(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public static JobCallbackStatus getType(int value) {
        for (JobCallbackStatus status : JobCallbackStatus.values()) {
            if (status.getValue() == value) {
                return status;
            }
        }
        return null;
    }
}
