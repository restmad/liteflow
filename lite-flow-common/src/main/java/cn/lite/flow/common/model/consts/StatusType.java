package cn.lite.flow.common.model.consts;

/**
 * 状态枚举常量
 */
public enum StatusType {

    NEW(0, "新建"),

    ON(1, "有效"),

    OFF(-1, "无效");

    private int value;

    private String desc;

    StatusType(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public String getDesc() {
        return desc;
    }

    public int getValue() {
        return value;
    }

    /**
     * 根据id或者媒体类型
     * @param id 媒体类型id
     * @return
     */
    public static StatusType getType(int id) {
        for (StatusType mediaType : StatusType.values()) {
            if (mediaType.getValue() == id) {
                return mediaType;
            }
        }
        return null;
    }
}
