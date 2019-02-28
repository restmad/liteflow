package cn.lite.flow.console.model.consts;

import lombok.Getter;

/**
 * 并发策略
 */
@Getter
public enum ExecuteStrategy {

    IGNORE(1, "忽略"),

    WAIT(2, "等待");

    private int value;

    private String desc;

    ExecuteStrategy(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public static ExecuteStrategy getType(int value) {
        for (ExecuteStrategy status : ExecuteStrategy.values()) {
            if (status.getValue() == value) {
                return status;
            }
        }
        return null;
    }

}
