package cn.lite.flow.console.model.basic;

import cn.lite.flow.console.model.consts.TaskVersionFinalStatus;
import cn.lite.flow.console.model.consts.TaskVersionStatus;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 任务版本
 */
@Data
@ToString
public class TaskVersion implements Serializable {

    private Long id;

    private Long versionNo;                                     //版本号

    private Long taskId;                                        //所属任务id

    private Integer status;                                     //数据版本状态

    private Integer finalStatus;                                //最终状态 cn.lite.flow.console.model.consts.TaskVersionFinalStatus

    private Integer retryNum;                                   //尝试次数,默认为0

    private Date createTime;                                    //创建时间

    private Date updateTime;                                    //更新时间


    /**
     * 获取一个新实例
     * @param taskId
     * @param taskVersionNo
     * @return
     */
    public static TaskVersion newInstance(Long taskId, Long taskVersionNo){

        TaskVersion taskVersion = new TaskVersion();
        taskVersion.setTaskId(taskId);
        taskVersion.setVersionNo(taskVersionNo);
        taskVersion.setStatus(TaskVersionStatus.INIT.getValue());
        taskVersion.setFinalStatus(TaskVersionFinalStatus.NEW.getValue());

        return taskVersion;
    }

    /**
     * 是否处理中
     * @return
     */
    public boolean isProcessing(){
        if(this.finalStatus == TaskVersionFinalStatus.NEW.getValue()){
            return true;
        }
        return false;
    }

}
