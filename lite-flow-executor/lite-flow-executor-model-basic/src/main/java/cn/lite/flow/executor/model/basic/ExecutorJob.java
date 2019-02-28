package cn.lite.flow.executor.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 任务
 */
@Data
@ToString
public class ExecutorJob implements Serializable {

    private Long id;

    private String applicationId;       //应用id

    private Long pluginId;              //插件id

    private Long executorServerId;      //执行者id

    private Long containerId;           //容器id

    private Integer status;             //状态

    private Long sourceId;              //任务来源id

    private String config;              //任务配置

    private String msg;                 //任务信息

    private Date startTime;             //开始时间

    private Date endTime;               //结束时间

    private Date createTime;            //创建时间

    private Date updateTime;            //更新时间

}
