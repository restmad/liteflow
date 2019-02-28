package cn.lite.flow.console.model.basic;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

/**
 * 实体属性参数
 */
@Data
@ToString
public class ModelProperty {

    private Long id;               //自增id

    private Integer type;          //类型，详见PropertyType

    private Long modelId;          //属性所属实体的id

    private String name;           //属性名称,详见PropertyName

    private String value;          //属性值

    private Date createTime;       //创建时间

    private Date updateTime;       //更新时间



}
