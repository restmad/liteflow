package cn.lite.flow.console.service.impl;

import cn.lite.flow.common.model.Tuple;
import cn.lite.flow.console.common.exception.ConsoleRuntimeException;
import cn.lite.flow.console.common.utils.DagUtils;
import cn.lite.flow.console.model.basic.Task;
import cn.lite.flow.console.model.basic.TaskDependency;
import cn.lite.flow.console.service.DagService;
import cn.lite.flow.console.service.FlowDependencyService;
import cn.lite.flow.console.service.FlowDependencySnapshotService;
import cn.lite.flow.console.service.FlowService;
import cn.lite.flow.console.service.TaskService;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.SortedMap;

/**
 * @description: dag相关
 * @author: yueyunyue
 * @create: 2018-07-31
 **/
@Service("dagServiceImpl")
public class DagServiceImpl implements DagService {

    @Autowired
    private TaskService taskService;

    @Autowired
    private FlowService flowService;

    @Autowired
    private FlowDependencySnapshotService flowDependencySnapshotService;

    @Autowired
    private FlowDependencyService flowDependencyService;


    @Override
    public Tuple<List<Task>, List<TaskDependency>> getFlowDagData(long flowId) {
        List<TaskDependency> dependencies = flowService.getDependencies(flowId);
        if(CollectionUtils.isNotEmpty(dependencies)){
            List<Long> taskIds = DagUtils.getTaskIds(dependencies);
            List<Task> tasks = taskService.getByIds(taskIds);
            return new Tuple<>(tasks, dependencies);
        }
        return null;
    }
}
