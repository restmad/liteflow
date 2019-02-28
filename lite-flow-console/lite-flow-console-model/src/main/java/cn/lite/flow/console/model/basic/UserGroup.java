package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 系统用户组
 */
@Data
@ToString
public class UserGroup implements Serializable {

    private Long id;

    private String name;                   //用户组名

    private String description;             //说明

    private Long userId;                    //创建者用户id

    private Date createTime;                //创建时间

    private Date updateTime;                //更新时间

}
