package cn.lite.flow.console.common.enums;

import lombok.Getter;

/**
 * 用户-用户组权限表对应源id的类型枚举
 */
@Getter
public enum SourceTypeEnum {

    SOURCE_TYPE_USER(1, "用户"),
    SOURCE_TYPE_USER_GROUP(2, "用户组");

    private Integer code;       //编码
    private String msg;         //说明

    SourceTypeEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    /**
     * 根据code查找对应的枚举类型
     *
     * @param code
     * @return
     */
    public static SourceTypeEnum findByCode(Integer code) {
        for (SourceTypeEnum value : SourceTypeEnum.values()) {
            if (value.getCode().equals(code)) {
                return value;
            }
        }
        return null;
    }
}
