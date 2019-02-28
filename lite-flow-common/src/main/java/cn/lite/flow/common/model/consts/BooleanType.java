package cn.lite.flow.common.model.consts;

import lombok.Getter;

/**
 * 任务的并发性
 */
@Getter
public enum BooleanType {

    FALSE(0, "否"),

    TRUE(1, "是");

    private int value;

    private String desc;

    BooleanType(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    /**
     * 根据id
     *
     * @return
     */
    public static BooleanType getType(int value) {
        for (BooleanType type : BooleanType.values()) {
            if (type.getValue() == value) {
                return type;
            }
        }
        return null;


    }
}
