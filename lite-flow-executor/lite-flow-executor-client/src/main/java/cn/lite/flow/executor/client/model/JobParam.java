package cn.lite.flow.executor.client.model;

import cn.lite.flow.executor.client.base.BaseRpcListParam;
import lombok.Data;
import lombok.ToString;

/**
 * @description: 任务请求
 * @author: yueyunyue
 * @create: 2019-01-17
 **/
@Data
@ToString
public class JobParam extends BaseRpcListParam {

    private long sourceId;

    private long id;


}
