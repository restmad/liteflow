package cn.lite.flow.executor.model.consts;

import lombok.Getter;

/**
 * job状态枚举常量
 */
@Getter
public enum ExecutorJobStatus {

    NEW(0, "新建"),

    RUNNING(1, "运行中"),

    SUCCESS(2, "成功"),

    KILLED(-2, "kill"),

    FAIL(-1, "失败");

    private int value;

    private String desc;

    ExecutorJobStatus(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }
    public static ExecutorJobStatus getType(int value) {
        for (ExecutorJobStatus status : ExecutorJobStatus.values()) {
            if (status.getValue() == value) {
                return status;
            }
        }
        return null;
    }
}
