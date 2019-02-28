package cn.lite.flow.console.model.query;

import cn.lite.flow.common.model.query.BaseQM;
import lombok.Data;
import lombok.ToString;

/**
 * 任务流查询模型
 */
@Data
@ToString
public class TaskVersionDailyInitQM extends BaseQM {

    private Long taskId;

    private Long day;

}
