package cn.lite.flow.executor.model.consts;

import lombok.Getter;

/**
 * job类型
 */
@Getter
public enum ExecutorJobType {

    LITE_CONSOLE(1, "lite控制台提交");

    private int value;

    private String desc;

    ExecutorJobType(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }
    public static ExecutorJobType getType(int value) {
        for (ExecutorJobType status : ExecutorJobType.values()) {
            if (status.getValue() == value) {
                return status;
            }
        }
        return null;
    }
}
