package cn.lite.flow.console.common.enums;

import lombok.Getter;

/**
 * 操作类型
 */
@Getter
public enum OperateTypeEnum {

    OPERATE_TYPE_EDIT(1, "edit"),

    OPERATE_TYPE_EXECUTE(2, "execute")
    ;
    private Integer code;           //编码

    private String msg;             //说明

    OperateTypeEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
