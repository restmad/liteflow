package cn.lite.flow.console.model.consts;

import lombok.Getter;

/**
 *
 */
@Getter
public enum TaskDependencyType {


    DEFAULT(0, "无"),

    TIME_RANGE(1, "时间表达式");

    private int value;

    private String desc;


    TaskDependencyType(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    /**
     * 根据id
     *
     * @return
     */
    public static TaskDependencyType getType(int value) {
        for (TaskDependencyType type : TaskDependencyType.values()) {
            if (type.getValue() == value) {
                return type;
            }
        }
        return null;


    }
}
