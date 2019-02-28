package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * @description: 系统用户
 * @author: yueyunyue
 * @create: 2018-07-15
 **/
@Data
@ToString
public class User implements Serializable {

    private Long id;

    private String userName;        //用户名

    private String email;           //邮箱

    private String phone;           //手机号

    private String password;        //密码

    private Integer status;         //状态

    private Integer isSuper;        //是否是超级管理员

    private Date createTime;        //创建时间

    private Date updateTime;        //更新时间


}
