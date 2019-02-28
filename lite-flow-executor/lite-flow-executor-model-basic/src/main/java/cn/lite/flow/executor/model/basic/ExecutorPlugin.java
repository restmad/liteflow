package cn.lite.flow.executor.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 插件
 */
@Data
@ToString
public class ExecutorPlugin implements Serializable {

    private Long id;

    private String name;                //插件名称

    private Integer status;             //插件状态

    private String fieldConfig;         //插件参数定义

    private String config;              //参数配置

    private Long userId;                //创建者id

    private String description;         //插件描述

    private Long containerId;           //容器id

    private Date createTime;            //创建时间

    private Date updateTime;            //更新时间

}
