package cn.lite.flow.console.model.consts;

import lombok.Getter;

/**
 * 任务版本最终类型
 */
@Getter
public enum TaskVersionFinalStatus {

    NEW(0, "新建"),

    SUCCESS(1, "成功"),

    FAIL(-1, "失败"),

    KILLED(-2, "已杀死");

    private int value;

    private String desc;

    TaskVersionFinalStatus(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    /**
     * 根据id
     *
     * @return
     */
    public static TaskVersionFinalStatus getType(int value) {

        for (TaskVersionFinalStatus type : TaskVersionFinalStatus.values()) {
            if (type.getValue() == value) {
                return type;
            }
        }
        return null;

    }
}
