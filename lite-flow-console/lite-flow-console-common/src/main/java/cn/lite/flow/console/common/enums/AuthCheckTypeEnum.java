package cn.lite.flow.console.common.enums;

import lombok.Getter;

/**
 * 校验类型
 */
@Getter
public enum AuthCheckTypeEnum {

    AUTH_CHECK_TASK(1, "task"),

    AUTH_CHECK_FLOW(2, "flow"),

    AUTH_CHECK_TASK_VERSION(3, "taskVersion")
    ;

    private Integer code;           //编码

    private String msg;             //说明

    AuthCheckTypeEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
