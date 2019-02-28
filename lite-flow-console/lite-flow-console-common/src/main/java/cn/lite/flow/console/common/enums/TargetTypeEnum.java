package cn.lite.flow.console.common.enums;

import lombok.Getter;

/**
 * 用户和用户组权限目标id类型枚举
 */
@Getter
public enum TargetTypeEnum {

    TARGET_TYPE_TASK(1, "任务"),
    TARGET_TYPE_FLOW(2, "任务流");

    private Integer code;   //编码
    private String msg;     //说明

    TargetTypeEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
