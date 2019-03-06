package cn.lite.flow.executor.client.base;

import lombok.Data;
import lombok.ToString;
import java.io.Serializable;

/**
 * 列表请求参数
 */
@Data
@ToString
public class BaseRpcListParam implements Serializable {

    private int pageNum;          //页数

    private int pageSize;         //每页数量


}
