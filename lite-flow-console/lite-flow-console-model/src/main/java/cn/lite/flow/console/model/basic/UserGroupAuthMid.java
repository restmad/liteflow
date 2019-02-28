package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户和用户组对应的功能权限关系
 */
@Data
@ToString
public class UserGroupAuthMid implements Serializable {

    private Long id;

    private Long sourceId;          //源id

    private Integer sourceType;     //源类型

    private Long targetId;          //目标id

    private Integer targetType;     //目的类型

    private Integer hasEditAuth;    //是否拥有编辑权限  1-是 0-否

    private Integer hasExecuteAuth; //是否拥有执行权限  1-是 0-否

    private Long userId;            //创建者id

    private Date createTime;        //创建时间

    private Date updateTime;        //更新时间
}
