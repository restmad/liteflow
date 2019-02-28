package cn.lite.flow.executor.dao;

import cn.lite.flow.common.dao.basic.BaseMapper;
import cn.lite.flow.executor.model.basic.ExecutorJob;
import cn.lite.flow.executor.model.basic.ExecutorPlugin;
import cn.lite.flow.executor.model.query.ExecutorJobQM;
import cn.lite.flow.executor.model.query.ExecutorPluginQM;
import org.apache.ibatis.annotations.Param;

/**
 * 插件dao
 */
public interface ExecutorPluginMapper extends BaseMapper<ExecutorPlugin, ExecutorPluginQM> {

    /**
     * 按名称精确查询
     *
     * @param name
     * @return
     */
    ExecutorPlugin getByName(@Param("name") String name);
}