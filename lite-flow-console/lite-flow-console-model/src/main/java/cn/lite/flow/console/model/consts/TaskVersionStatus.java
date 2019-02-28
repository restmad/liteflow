package cn.lite.flow.console.model.consts;

import lombok.Getter;

/**
 * 任务版本类型
 */
@Getter
public enum TaskVersionStatus {

    INIT(1, "初始化"),

    READY(2, "就绪"),

    SUBMITTED(3, "提交"),

    RUNNING(4, "运行中"),

    SUCCESS(5, "成功"),

    FAIL(-1, "失败"),

    KILLED(-2, "已杀死"),

    DISABLE(-3, "无效");

    private int value;

    private String desc;

    TaskVersionStatus(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    /**
     * 根据id
     * @return
     */
    public static TaskVersionStatus getType(int value) {
        for (TaskVersionStatus type : TaskVersionStatus.values()) {
            if (type.getValue() == value) {
                return type;
            }
        }
        return null;


    }
}
