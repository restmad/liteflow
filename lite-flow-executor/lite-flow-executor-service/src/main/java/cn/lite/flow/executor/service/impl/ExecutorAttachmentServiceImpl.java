package cn.lite.flow.executor.service.impl;

import cn.lite.flow.common.utils.DateUtils;
import cn.lite.flow.executor.dao.ExecutorAttachmentMapper;
import cn.lite.flow.executor.model.basic.ExecutorAttachment;
import cn.lite.flow.executor.model.query.ExecutorAttachmentQM;
import cn.lite.flow.executor.service.ExecutorAttachmentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @description: 附件相关
 * @author: yueyunyue
 * @create: 2019-01-17
 **/
@Service("executorAttachmentServiceImpl")
public class ExecutorAttachmentServiceImpl implements ExecutorAttachmentService {

    @Resource
    private ExecutorAttachmentMapper executorAttachmentMapper;

    @Override
    public void add(ExecutorAttachment attachment) {
        Date now = DateUtils.getNow();
        attachment.setCreateTime(now);
        executorAttachmentMapper.insert(attachment);
    }

    @Override
    public ExecutorAttachment getById(long id) {
        return executorAttachmentMapper.getById(id);
    }

    @Override
    public int update(ExecutorAttachment attachment) {
        return executorAttachmentMapper.update(attachment);
    }

    @Override
    public int count(ExecutorAttachmentQM queryModel) {
        return executorAttachmentMapper.count(queryModel);
    }

    @Override
    public List<ExecutorAttachment> list(ExecutorAttachmentQM queryModel) {
        return executorAttachmentMapper.findList(queryModel);
    }
}
