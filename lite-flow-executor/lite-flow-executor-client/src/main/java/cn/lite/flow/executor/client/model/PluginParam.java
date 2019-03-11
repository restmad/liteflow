package cn.lite.flow.executor.client.model;

import cn.lite.flow.executor.client.base.BaseRpcListParam;
import lombok.Data;
import lombok.ToString;

import java.util.List;

/**
 * @description: 插件请求
 * @author: yueyunyue
 * @create: 2019-01-17
 **/
@Data
@ToString
public class PluginParam extends BaseRpcListParam {

    private String nameLike;

}
