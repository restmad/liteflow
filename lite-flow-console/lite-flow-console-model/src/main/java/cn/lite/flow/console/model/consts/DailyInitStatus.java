package cn.lite.flow.console.model.consts;

import lombok.Getter;

/**
 * 每天初始化的类型
 */
@Getter
public enum DailyInitStatus {


    NEW(0, "默认"),

    SUCCESS(1, "成功"),

    FAIL(-1, "失败"),

    DISABLE(-2, "无效")
    ;

    private int value;

    private String desc;


    DailyInitStatus(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    /**
     * 根据id
     *
     * @return
     */
    public static DailyInitStatus getType(int value) {
        for (DailyInitStatus type : DailyInitStatus.values()) {
            if (type.getValue() == value) {
                return type;
            }
        }
        return null;


    }
}
