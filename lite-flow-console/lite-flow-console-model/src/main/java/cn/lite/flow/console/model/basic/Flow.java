package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 任务流
 */
@Data
@ToString
public class Flow implements Serializable {

    private Long id;

    private String name;                //任务名称

    private String description;         //任务描述

    private Long userId;                // 创建者id

    private Integer status;             // 任务流状态

    private Date createTime;            // 创建时间

    private Date updateTime;              //更新时间

}
