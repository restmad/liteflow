package cn.lite.flow.executor.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 回调记录
 */
@Data
@ToString
public class ExecutorCallback implements Serializable {

    private Long id;

    private Long jobId;                 //插件id

    private Long jobSourceId;           //任务来源id

    private Long executorServerId;      //执行者id

    private Integer jobStatus;          //任务状态

    private String jobMsg;              //任务信息

    private Integer status;             //回调状态

    private Date createTime;            //创建时间

    private Date updateTime;            //更新时间

}
