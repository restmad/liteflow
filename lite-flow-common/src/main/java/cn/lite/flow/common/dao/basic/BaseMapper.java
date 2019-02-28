package cn.lite.flow.common.dao.basic;

import java.util.List;

/**
 * 基础的dao
 */
public interface BaseMapper<M, Q> {

    /**
     * 添加数据
     * @param model
     */
    long insert(M model);
    /**
     * 通过id获取数据
     * @param id
     * @return
     */
    M getById(long id);

    /**
     * 更新数据
     * @param model
     */
    int update(M model);

    /**
     * 获取数量
     * @param queryModel
     * @return
     */
    int count(Q queryModel);

    /**
     * 获取列表数据
     * @param queryModel
     * @return
     */
    List<M> findList(Q queryModel);



}
