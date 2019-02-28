package cn.lite.flow.executor.dao;

import cn.lite.flow.common.dao.basic.BaseMapper;
import cn.lite.flow.executor.model.basic.ExecutorContainer;
import cn.lite.flow.executor.model.basic.ExecutorJob;
import cn.lite.flow.executor.model.query.ExecutorContainerQM;
import cn.lite.flow.executor.model.query.ExecutorJobQM;
import org.apache.ibatis.annotations.Param;

/**
 * 容器dao
 */
public interface ExecutorContainerMapper extends BaseMapper<ExecutorContainer, ExecutorContainerQM> {

    /**
     * 按照名称查询
     *
     * @param name
     * @return
     */
    ExecutorContainer getByName(@Param("name") String name);
}