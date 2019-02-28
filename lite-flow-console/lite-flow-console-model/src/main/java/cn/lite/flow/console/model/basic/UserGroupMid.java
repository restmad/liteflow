package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 系统用户和系统用户组对应关系表
 */
@Data
@ToString
public class UserGroupMid implements Serializable {

    private Long id;

    private Long userId;            //系统用户id

    private Long groupId;           //系统用户组id

    private Date createTime;        //创建时间
}
