package cn.lite.flow.executor.service.impl;

import cn.lite.flow.common.model.consts.StatusType;
import cn.lite.flow.common.utils.DateUtils;
import cn.lite.flow.executor.common.exception.ExecutorRuntimeException;
import cn.lite.flow.executor.dao.ExecutorPluginMapper;
import cn.lite.flow.executor.model.basic.ExecutorPlugin;
import cn.lite.flow.executor.model.query.ExecutorPluginQM;
import cn.lite.flow.executor.service.ExecutorContainerService;
import cn.lite.flow.executor.service.ExecutorPluginService;
import com.google.common.base.Preconditions;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @description: 插件
 * @author: yueyunyue
 * @create: 2018-09-13
 **/
@Service("executorPluginServiceImpl")
public class ExecutorPluginServiceImpl implements ExecutorPluginService {

    private static final Logger LOG = LoggerFactory.getLogger(ExecutorPluginServiceImpl.class);

    @Resource
    private ExecutorPluginMapper executorPluginMapper;

    @Resource
    private ExecutorContainerService executorContainerService;


    @Override
    public void add(ExecutorPlugin executorPlugin) {
        Preconditions.checkArgument(executorPlugin != null, "executorPlugin不能为空");
        Preconditions.checkArgument(StringUtils.isNotBlank(executorPlugin.getName()), "name不能为空");
        Preconditions.checkArgument(executorPlugin.getContainerId() != null, "containerId不能为空");


        ExecutorPlugin existModel = executorPluginMapper.getByName(executorPlugin.getName());
        if (existModel != null) {
            throw new ExecutorRuntimeException("该名称已经存在");
        }

        if (executorContainerService.getById(executorPlugin.getContainerId()) == null) {
            throw new ExecutorRuntimeException("该容器不存在");
        }

        Date now = DateUtils.getNow();
        executorPlugin.setCreateTime(now);
        executorPlugin.setStatus(StatusType.ON.getValue());
        try {
            executorPluginMapper.insert(executorPlugin);
        } catch (DuplicateKeyException e) {
            LOG.error("add executor container duplicate, name:{}", executorPlugin.getName());
            throw new ExecutorRuntimeException("该插件名称已经存在");
        }
    }

    @Override
    public ExecutorPlugin getById(long id) {
        return executorPluginMapper.getById(id);
    }

    @Override
    public int update(ExecutorPlugin executorPlugin) {

        Preconditions.checkArgument(executorPlugin != null, "executorPlugin不能为空");
        Preconditions.checkArgument(executorPlugin.getId() != null, "id不能为空");
        Preconditions.checkArgument(StringUtils.isNotBlank(executorPlugin.getName())
                || StringUtils.isNotBlank(executorPlugin.getFieldConfig())
                || StringUtils.isNotBlank(executorPlugin.getDescription())
                || executorPlugin.getContainerId() != null
                || executorPlugin.getStatus() != null,
                "[name, fieldConfig, description, containerId, status]至少有一个不能为空");

        if (executorPlugin.getContainerId() != null && executorContainerService.getById(executorPlugin.getContainerId()) == null) {
            throw new ExecutorRuntimeException("该容器不存在");
        }
        try {
            return executorPluginMapper.update(executorPlugin);
        } catch (DuplicateKeyException e) {
            LOG.error("update executor plugin duplicate, id:{}, name:{}", executorPlugin.getId(), executorPlugin.getName());
            throw new ExecutorRuntimeException("存在同名的插件");
        }
    }

    @Override
    public int count(ExecutorPluginQM queryModel) {
        return executorPluginMapper.count(queryModel);
    }

    @Override
    public List<ExecutorPlugin> list(ExecutorPluginQM queryModel) {
        return executorPluginMapper.findList(queryModel);
    }
}
