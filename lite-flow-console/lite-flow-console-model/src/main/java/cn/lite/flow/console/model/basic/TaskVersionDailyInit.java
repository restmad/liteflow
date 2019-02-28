package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

/**
 * @description: 任务版本每天生成的model
 * @author: yueyunyue
 * @create: 2018-08-06
 **/
@Data
@ToString
public class TaskVersionDailyInit {

    private Long id;

    private Long taskId;                                      //任务id

    private Long day;                                         //哪一天

    private Integer status;                                   //状态

    private String msg;                                       //信息

    private Date createTime;                                  //创建时间

    private Date updateTime;                                  //更新时间




}
