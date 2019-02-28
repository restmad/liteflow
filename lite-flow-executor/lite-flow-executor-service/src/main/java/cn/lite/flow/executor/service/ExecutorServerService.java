package cn.lite.flow.executor.service;

import cn.lite.flow.common.service.basic.BaseService;
import cn.lite.flow.executor.model.basic.ExecutorServer;
import cn.lite.flow.executor.model.query.ExecutorServerQM;

/**
 * @description: 执行插件
 * @author: yueyunyue
 * @create: 2018-09-13
 **/
public interface ExecutorServerService extends BaseService<ExecutorServer, ExecutorServerQM> {

    ExecutorServer getByIp(String ip);

}
