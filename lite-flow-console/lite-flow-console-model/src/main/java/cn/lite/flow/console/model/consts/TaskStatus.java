package cn.lite.flow.console.model.consts;

import lombok.Getter;

/**
 * 任务状态枚举常量
 */
@Getter
public enum TaskStatus {

    NEW(0, "新建"),

    ONLINE(1, "上线"),

    OFFLINE(-1, "下线");

    private int value;

    private String desc;

    TaskStatus(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    /**
     * 根据id或者媒体类型
     * @param id 媒体类型id
     * @return
     */
    public static TaskStatus getType(int id) {
        for (TaskStatus type : TaskStatus.values()) {
            if (type.getValue() == id) {
                return type;
            }
        }
        return null;
    }
}
