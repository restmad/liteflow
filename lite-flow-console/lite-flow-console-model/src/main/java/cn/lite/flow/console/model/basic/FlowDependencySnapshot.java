package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;
/**
 * 任务流中，任务依赖的快照
 * 用来记录已下线的集合的任务依赖
 */
@Data
@ToString
public class FlowDependencySnapshot implements Serializable {

    private Long id;                  //主键

    private Long flowId;              //集合id

    private Long taskId;              //任务id

    private Long upstreamTaskId;      //上游任务id

    private Integer type;             //偏移量

    private String conf;              //依赖配置信息

    private Date createTime;          //创建时间


    /**
     * 转化成TaskDependency
     * @param flowDependencySnapshot
     * @return
     */
    public static TaskDependency snapshot2TaskDependency(FlowDependencySnapshot flowDependencySnapshot){

        TaskDependency taskDependency = new TaskDependency();
        taskDependency.setTaskId(flowDependencySnapshot.getTaskId());
        taskDependency.setUpstreamTaskId(flowDependencySnapshot.getUpstreamTaskId());
        taskDependency.setType(flowDependencySnapshot.getType());
        taskDependency.setConfig(flowDependencySnapshot.getConf());
        return taskDependency;
    }

    /**
     * 转化
     * @param dependency
     * @return
     */
    public static FlowDependencySnapshot taskDependency2snapshot(TaskDependency dependency){
        FlowDependencySnapshot snapshot = new FlowDependencySnapshot();
        snapshot.setTaskId(dependency.getTaskId());
        snapshot.setUpstreamTaskId(dependency.getUpstreamTaskId());
        snapshot.setType(dependency.getType());
        snapshot.setConf(dependency.getConfig());
        return snapshot;
    }

}
