package cn.lite.flow.console.model.basic;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 任务实例
 */
@Data
@ToString
public class TaskInstance implements Serializable {

    private Long id;                        //主键

    private Long taskId;                    //所属任务id

    private Long taskVersionId;             //所属任务版本id

    private Long taskVersionNo;             //任务版本冗余字段

    private Date logicRunTime;              //实例允许启动的时间点

    private Long pluginId;                  //插件id

    private String pluginConf;              //插件配置信息

    private Integer status;                 //数据版本状态

    private Date runStartTime;              //运行开始时间

    private Date runEndTime;                //运行结束时间

    private String msg;                     //状态运行消息
    
    private Long executorJobId;             //执行引擎job id

    private Date createTime;                //创建时间

    private Date updateTime;                //更新时间
    

    public static TaskInstance newInstanceByVersion(TaskVersion taskVersion){

        TaskInstance taskInstance = new TaskInstance();
        taskInstance.setTaskId(taskVersion.getTaskId());
        taskInstance.setTaskVersionId(taskVersion.getId());
        taskInstance.setTaskVersionNo(taskVersion.getVersionNo());
        return taskInstance;
    }


}
