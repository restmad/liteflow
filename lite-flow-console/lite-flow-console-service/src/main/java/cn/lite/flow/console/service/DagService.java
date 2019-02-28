package cn.lite.flow.console.service;

import cn.lite.flow.common.model.Tuple;
import cn.lite.flow.console.model.basic.Task;
import cn.lite.flow.console.model.basic.TaskDependency;

import java.util.List;
import java.util.SortedMap;

/**
 * @description: dag相关服务
 * @author: yueyunyue
 * @create: 2018-07-25
 **/
public interface DagService {


    Tuple<List<Task>, List<TaskDependency>> getFlowDagData(long flowId);


}
