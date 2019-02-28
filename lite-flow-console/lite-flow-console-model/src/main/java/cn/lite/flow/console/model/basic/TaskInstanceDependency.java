package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 实例依赖关系.
 */
@Data
@ToString
public class TaskInstanceDependency implements Serializable {

    private Long id;

    private Long instanceId;                                    //实例id

    private Long upstreamTaskId;                                //依赖上游的id

    private Long upstreamTaskVersionNo;                         //依赖上游的任务版本

    private Integer status;                                     //状态

    private Date createTime;                                    //创建时间

    private Date updateTime;                                    //更新时间

    /**
     * 获取一个实例
     * @param instanceId
     * @param upstreamTaskId
     * @param upstreamTaskVersionNo
     * @return
     */
    public static TaskInstanceDependency newInstance(Long instanceId, Long upstreamTaskId, Long upstreamTaskVersionNo){
        TaskInstanceDependency instanceDependency = new TaskInstanceDependency();
        instanceDependency.setInstanceId(instanceId);
        instanceDependency.setUpstreamTaskId(upstreamTaskId);
        instanceDependency.setUpstreamTaskVersionNo(upstreamTaskVersionNo);
        return instanceDependency;

    }

}
