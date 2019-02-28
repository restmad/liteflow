package cn.lite.flow.executor.client.model;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * @description: 提交任务实体
 * @author: yueyunyue
 * @create: 2019-01-13
 **/
@Data
@ToString
public class SubmitExecuteJob implements Serializable {

    @NotNull
    private Long instanceId;            //console任务实例id
    @NotNull
    private Long pluginId;              //插件id

    private String pluginConf;          //插件配置信息

}
