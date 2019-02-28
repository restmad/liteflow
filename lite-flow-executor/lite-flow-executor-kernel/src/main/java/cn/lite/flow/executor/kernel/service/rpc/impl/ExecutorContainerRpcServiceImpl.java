package cn.lite.flow.executor.kernel.service.rpc.impl;

import cn.lite.flow.common.model.consts.StatusType;
import cn.lite.flow.common.model.query.Page;
import cn.lite.flow.executor.client.ExecutorContainerRpcService;
import cn.lite.flow.executor.client.model.ContainerParam;
import cn.lite.flow.executor.model.basic.ExecutorContainer;
import cn.lite.flow.executor.model.query.ExecutorContainerQM;
import cn.lite.flow.executor.service.ExecutorContainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @description:
 * @author: yueyunyue
 * @create: 2019-01-17
 **/
@Service("executorContainerRpcServiceImpl")
public class ExecutorContainerRpcServiceImpl implements ExecutorContainerRpcService {

    @Autowired
    private ExecutorContainerService executorContainerService;

    @Override
    public ExecutorContainer getById(long id) {
        return executorContainerService.getById(id);
    }

    @Override
    public Long add(ExecutorContainer container) {
        executorContainerService.add(container);
        return container.getId();
    }

    @Override
    public int update(ExecutorContainer container) {
        return executorContainerService.update(container);
    }

    @Override
    public List<ExecutorContainer> list(ContainerParam containerParam) {
        ExecutorContainerQM qm = getExecutorContainerQM(containerParam);
        qm.addOrderDesc(ExecutorContainerQM.COL_ID);
        return executorContainerService.list(qm);
    }

    private ExecutorContainerQM getExecutorContainerQM(ContainerParam containerParam) {
        ExecutorContainerQM qm = new ExecutorContainerQM();
        qm.setPage(Page.getPageByPageNo(containerParam.getPageNum(), containerParam.getPageSize()));
        return qm;
    }

    @Override
    public int count(ContainerParam containerParam) {
        ExecutorContainerQM qm = getExecutorContainerQM(containerParam);
        return executorContainerService.count(qm);
    }

    @Override
    public List<ExecutorContainer> listAllValid() {
        ExecutorContainerQM qm = new ExecutorContainerQM();
        qm.setStatus(StatusType.ON.getValue());
        qm.addOrderDesc(ExecutorContainerQM.COL_ID);
        return executorContainerService.list(qm);
    }
}
