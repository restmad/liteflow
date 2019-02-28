package cn.lite.flow.executor.model.basic;

import lombok.Data;
import lombok.ToString;
import java.io.Serializable;
import java.util.Date;

/**
 * 附件
 */
@Data
@ToString
public class ExecutorAttachment implements Serializable {

    private Long id;

    private String name;                //名称

    private Integer type;               //类型

    private String content;             //插件需要实现的参数

    private Long userId;                //创建者id

    private Integer status;             //附件状态

    private Date createTime;            //创建时间

    private Date updateTime;            //更新时间



}
