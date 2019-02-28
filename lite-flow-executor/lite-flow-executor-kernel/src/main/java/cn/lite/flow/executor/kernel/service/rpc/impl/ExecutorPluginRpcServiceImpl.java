package cn.lite.flow.executor.kernel.service.rpc.impl;

import cn.lite.flow.common.model.consts.StatusType;
import cn.lite.flow.common.model.query.Page;
import cn.lite.flow.executor.client.ExecutorPluginRpcService;
import cn.lite.flow.executor.client.model.PluginParam;
import cn.lite.flow.executor.model.basic.ExecutorPlugin;
import cn.lite.flow.executor.model.query.ExecutorPluginQM;
import cn.lite.flow.executor.service.ExecutorPluginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @description:
 * @author: yueyunyue
 * @create: 2019-01-17
 **/
@Service("executorPluginRpcServiceImpl")
public class ExecutorPluginRpcServiceImpl implements ExecutorPluginRpcService {

    @Autowired
    private ExecutorPluginService pluginService;

    @Override
    public long add(ExecutorPlugin executorPlugin) {
        pluginService.add(executorPlugin);
        return executorPlugin.getId();
    }

    @Override
    public int update(ExecutorPlugin executorPlugin) {
        return pluginService.update(executorPlugin);
    }

    @Override
    public List<ExecutorPlugin> list(PluginParam pluginParam) {
        ExecutorPluginQM qm = getExecutorPluginQM(pluginParam);
        qm.addOrderDesc(ExecutorPluginQM.COL_ID);
        return pluginService.list(qm);
    }

    private ExecutorPluginQM getExecutorPluginQM(PluginParam pluginParam) {
        ExecutorPluginQM qm = new ExecutorPluginQM();
        qm.setPage(Page.getPageByPageNo(pluginParam.getPageNum(), pluginParam.getPageSize()));
        qm.setNameLike(pluginParam.getNameLike());
        return qm;
    }

    @Override
    public int count(PluginParam pluginParam) {
        ExecutorPluginQM qm = getExecutorPluginQM(pluginParam);
        return pluginService.count(qm);
    }

    @Override
    public ExecutorPlugin getById(long id) {
        return pluginService.getById(id);
    }

    @Override
    public List<ExecutorPlugin> listAllValid() {
        ExecutorPluginQM qm = new ExecutorPluginQM();
        qm.setStatus(StatusType.ON.getValue());
        return pluginService.list(qm);
    }
}
