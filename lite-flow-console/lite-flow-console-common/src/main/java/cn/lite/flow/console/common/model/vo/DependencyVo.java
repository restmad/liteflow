package cn.lite.flow.console.common.model.vo;

import lombok.Data;
import lombok.ToString;

/**
 * @description: 依赖vo
 * @author: yueyunyue
 * @create: 2019-01-20
 **/
@Data
@ToString
public class DependencyVo {

    private Long id;

    private Long upstreamId;

    public DependencyVo(long id, long upstreamId){
        this.id = id;
        this.upstreamId = upstreamId;
    }

}
