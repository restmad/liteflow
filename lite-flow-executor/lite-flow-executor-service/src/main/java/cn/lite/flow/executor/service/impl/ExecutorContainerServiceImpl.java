package cn.lite.flow.executor.service.impl;

import cn.lite.flow.common.model.consts.StatusType;
import cn.lite.flow.executor.common.exception.ExecutorRuntimeException;
import cn.lite.flow.executor.dao.ExecutorContainerMapper;
import cn.lite.flow.executor.model.basic.ExecutorContainer;
import cn.lite.flow.executor.model.query.ExecutorContainerQM;
import cn.lite.flow.executor.service.ExecutorContainerService;
import com.google.common.base.Preconditions;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @description: 容器
 * @author: yueyunyue
 * @create: 2018-09-13
 **/
@Service("executorContainerServiceImpl")
public class ExecutorContainerServiceImpl implements ExecutorContainerService {

    private static final Logger LOG = LoggerFactory.getLogger(ExecutorContainerServiceImpl.class);

    @Autowired
    private ExecutorContainerMapper executorContainerMapper;

    @Override
    public void add(ExecutorContainer container) throws ExecutorRuntimeException{
        Preconditions.checkArgument(container != null, "model不能为空");
        Preconditions.checkArgument(StringUtils.isNotBlank(container.getName()), "name不能为空");

        ExecutorContainer existContainer = executorContainerMapper.getByName(container.getName());
        if (existContainer != null) {
            throw new ExecutorRuntimeException("该容器名称已经存在");
        }

        container.setStatus(StatusType.ON.getValue());
        try {
            executorContainerMapper.insert(container);
        } catch (DuplicateKeyException e) {
            LOG.error("add executor container duplicate, name:{}", container.getName());
            throw new ExecutorRuntimeException("已经存在同名的执行容器");
        }
    }

    @Override
    public ExecutorContainer getById(long id) {
        return executorContainerMapper.getById(id);
    }

    @Override
    public int update(ExecutorContainer container) throws ExecutorRuntimeException{
        Preconditions.checkArgument(container != null, "model不能为空");
        Preconditions.checkArgument(container.getId() != null, "id不能为空");
        Preconditions.checkArgument(
                StringUtils.isNotBlank(container.getName())
                || StringUtils.isNotBlank(container.getFieldConfig())
                || container.getStatus() != null,
                "[name, fieldConfig, envFieldConfig, status至少有一个不能为空]");

        try {
           return executorContainerMapper.update(container);
        } catch (DuplicateKeyException e) {
            LOG.error("update executor container duplicate, id:{}, name:{}", container.getId(), container.getName());
            throw new ExecutorRuntimeException("已经存在同名的执行容器");
        }
    }

    @Override
    public int count(ExecutorContainerQM queryModel) {
        return executorContainerMapper.count(queryModel);
    }

    @Override
    public List<ExecutorContainer> list(ExecutorContainerQM queryModel) {
        return executorContainerMapper.findList(queryModel);
    }

}
