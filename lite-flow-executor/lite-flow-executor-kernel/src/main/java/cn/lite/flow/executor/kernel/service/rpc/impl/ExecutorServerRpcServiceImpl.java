package cn.lite.flow.executor.kernel.service.rpc.impl;

import cn.lite.flow.common.model.query.Page;
import cn.lite.flow.executor.client.ExecutorServerRpcService;
import cn.lite.flow.executor.client.model.ServerParam;
import cn.lite.flow.executor.model.basic.ExecutorServer;
import cn.lite.flow.executor.model.query.ExecutorServerQM;
import cn.lite.flow.executor.service.ExecutorServerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @description: f执行者服务器相关
 * @author: yueyunyue
 * @create: 2019-01-17
 **/
@Service("executorServerRpcServiceImpl")
public class ExecutorServerRpcServiceImpl implements ExecutorServerRpcService {

    private final static Logger LOG = LoggerFactory.getLogger(ExecutorServerRpcServiceImpl.class);

    @Autowired
    private ExecutorServerService executorServerService;

    @Override
    public ExecutorServer getById(long id) {
        return executorServerService.getById(id);
    }

    @Override
    public Long add(ExecutorServer executor) {
        executorServerService.add(executor);
        return executor.getId();
    }

    @Override
    public int update(ExecutorServer executor) {
        return executorServerService.update(executor);
    }

    @Override
    public List<ExecutorServer> list(ServerParam serverParam) {
        ExecutorServerQM qm = getExecutorServerQM(serverParam);
        qm.addOrderDesc(ExecutorServerQM.COL_ID);
        return executorServerService.list(qm);
    }

    private ExecutorServerQM getExecutorServerQM(ServerParam serverParam) {
        ExecutorServerQM qm = new ExecutorServerQM();
        qm.setNameLike(serverParam.getNameLike());
        qm.setIp(serverParam.getIp());
        qm.setId(serverParam.getId());
        qm.setPage(Page.getPageByPageNo(serverParam.getPageNum(), serverParam.getPageSize()));
        return qm;
    }

    @Override
    public int count(ServerParam serverParam) {
        ExecutorServerQM qm = getExecutorServerQM(serverParam);
        return executorServerService.count(qm);
    }
}
