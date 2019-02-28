package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 任务依赖关系.
 */
@Data
@ToString
public class TaskDependency implements Serializable {

    private Long id;                                              //主键

    private Long taskId;                                          //任务id

    private Long upstreamTaskId;                                  //上游任务id

    private Integer type;                                         //类型
    
    private String config;                                        //依赖配置信息
    
    private Integer status;                                       //当前状态
    
    private Date createTime;                                      //创建时间

    private Date updateTime;                                      //更新时间



}
