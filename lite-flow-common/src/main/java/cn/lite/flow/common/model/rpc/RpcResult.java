package cn.lite.flow.common.model.rpc;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Created by luya on 2018/11/15.
 */
@Data
@ToString
public class RpcResult<T> implements Serializable {

    protected boolean success;     //数据总量

    protected String msg;         //数据长度

    protected T data;             //返回结果
}
