package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 任务
 */
@Data
@ToString
public class Task implements Serializable {

    private Long id;                                          //id

    private String name;                                      //名称

    private String cronExpression;                            //crontab表达式

    private Integer period;                                   //周期,详见TimeUnit

    private Integer status;                                   //状态

    private Integer version;                                  //任务版本，与TaskVersion没有关系

    private Integer isConcurrency;                            //任务是否可以并发

    private Integer executeStrategy;                          //当并发发生时的策略

    private Long pluginId;                                    //插件id

    private String pluginConf;                                //插件配置

    private Long userId;                                      //创建者

    private Integer isRetry;                                  //是否重试

    private String retryConf;                                 //重试配置

    private Integer maxRunTime;                               //最长运行时间(分)

    private String description;                               //任务描述

    private String alarmEmail;                                //报警邮箱

    private String alarmPhone;                                //报警电话

    private Date createTime;                                  //创建时间

    private Date updateTime;                                  //更新时间

}
