package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

/**
 * 任务流以及任务依赖直接的中间表
 */
@Data
@ToString
public class FlowDependency {

    private Long id;

    private Long flowId;                //任务流id

    private Long taskDependencyId;      //任务依赖之间的id

    private Date createTime;             // 创建时间

}
