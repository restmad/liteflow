package cn.lite.flow.console.web.controller.system;

import cn.lite.flow.common.model.consts.StatusType;
import cn.lite.flow.console.common.model.vo.SessionUser;
import cn.lite.flow.common.utils.CodecUtils;
import cn.lite.flow.console.common.consts.Constants;
import cn.lite.flow.console.common.exception.ConsoleRuntimeException;
import cn.lite.flow.console.common.utils.ResponseUtils;
import cn.lite.flow.console.model.basic.Role;
import cn.lite.flow.console.model.basic.User;
import cn.lite.flow.console.model.query.RoleQM;
import cn.lite.flow.console.model.query.UserQM;
import cn.lite.flow.console.service.RoleService;
import cn.lite.flow.console.service.UserGroupService;
import cn.lite.flow.console.service.UserService;
import cn.lite.flow.console.web.annotation.AuthCheckIgnore;
import cn.lite.flow.console.web.controller.BaseController;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @description: 任务相关
 * @author: yueyunyue
 * @create: 2018-07-25
 **/
@RestController
@RequestMapping("console/system/user")
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserGroupService userGroupService;

    @Autowired
    private RoleService roleService;

    /**
     * 用户列表
     *
     * @param userNameLike      按名称模糊查询
     * @param status            状态
     * @param pageNum           当前页码
     * @param pageSize          每页数量
     * @return
     */
    @RequestMapping(value = "list")
    public String list(
            @RequestParam(value = "nameLike", required = false) String userNameLike,
            @RequestParam(value = "email", required = false) String emailLike,
            @RequestParam(value = "status", required = false) Integer status,
            @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize
    ) {
        UserQM userQM = new UserQM();
        userQM.setUserNameLike(userNameLike);
        userQM.setEmailLike(emailLike);
        userQM.setStatus(status);
        userQM.setPage(pageNum, pageSize);
        userQM.addOrderDesc(UserQM.COL_UPDATE_TIME);

        List<User> userList = userService.list(userQM);

        JSONArray datas = new JSONArray();
        int total = 0;
        if (CollectionUtils.isNotEmpty(userList)) {
            total = userService.count(userQM);

            userList.forEach(user -> {
                JSONObject obj = new JSONObject();
                obj.put("id", user.getId());
                obj.put("name", user.getUserName());
                obj.put("email", user.getEmail());
                obj.put("mobile", user.getPhone());
                obj.put("status", user.getStatus());
                obj.put("userGroupList", userGroupService.getByUserId(user.getId()));
                obj.put("roles", roleService.getByUserId(user.getId()));
                obj.put("isSuper", user.getIsSuper());
                obj.put("createTime", user.getCreateTime());
                obj.put("updateTime", user.getUpdateTime());
                datas.add(obj);
            });
        }
        return ResponseUtils.list(total, datas);
    }

    /**
     * 获取所有的用户列表
     *
     * @return
     */
    @RequestMapping(value = "listAllUsers")
    @AuthCheckIgnore
    public String listAllUsers() {
        List<User> userList = userService.list(new UserQM());
        JSONArray datas = new JSONArray();
        if (CollectionUtils.isNotEmpty(userList)) {
            userList.forEach(user -> {
                JSONObject obj = new JSONObject();
                obj.put("id", user.getId());
                obj.put("name", user.getUserName());
                datas.add(obj);
            });
        }
        return ResponseUtils.success(datas);
    }

    /**
     * 添加 or 更新用户
     *
     * @param id            用户id        如果为空, 则是添加 否则更新
     * @param userName      用户名
     * @param phone         手机号
     * @param email         邮箱
     * @param roleIds       权限id字符串 以英文半角分隔
     * @return
     */
    @RequestMapping(value = "addOrUpdate")
    public String addOrUpdate(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "name") String userName,
            @RequestParam(value = "mobile") String phone,
            @RequestParam(value = "email") String email,
            @RequestParam(value = "isSuper") Integer isSuper,
            @RequestParam(value = "roles") String roleIds
    ) {
        UserQM userQM = new UserQM();
        userQM.setUserName(userName);
        List<User> userList = userService.list(userQM);
        if (CollectionUtils.isNotEmpty(userList)) {
            if (id == null || !userList.get(0).getId().equals(id)) {
                throw new ConsoleRuntimeException("该用户名已经存在,请修改后重试");
            }
        }

        User user = new User();
        user.setId(id);
        user.setUserName(userName);
        user.setPhone(phone);
        user.setEmail(email);
        user.setIsSuper(isSuper);
        userService.addOrUpdate(user, roleIds);
        return ResponseUtils.success("添加用户成功");
    }


    /**
     * 修改密码
     *
     * @param oldPassword       原始密码
     * @param password          新密码
     * @return
     */
    @RequestMapping(value = "editCurrentUser")
    public String editCurrentUser(
            @RequestParam(value = "oldPassword") String oldPassword,
            @RequestParam(value = "password") String password
    ) {
        SessionUser sessionUser = getUser();
        User user = userService.getById(sessionUser.getId());
        if (!CodecUtils.encodePassword(oldPassword).equals(user.getPassword())) {
            return ResponseUtils.error("原密码错误");
        }
        if (StringUtils.isBlank(password)) {
            return ResponseUtils.error("新密码不能为空");
        }

        User update = new User();
        update.setId(sessionUser.getId());
        update.setPassword(password);
        userService.update(update);
        return ResponseUtils.success("修改成功");
    }

    /**
     * 上线
     * @param id    用户id
     * @return
     */
    @RequestMapping(value = "online")
    public String online(@RequestParam(value = "id") Long id) {
        User user = new User();
        user.setId(id);
        user.setStatus(StatusType.ON.getValue());
        userService.update(user);
        return ResponseUtils.success("上线成功");
    }

    /**
     * 下线
     * @param id    用户id
     * @return
     */
    @RequestMapping(value = "offline")
    public String offline(@RequestParam(value = "id") Long id) {
        User user = new User();
        user.setId(id);
        user.setStatus(StatusType.OFF.getValue());
        userService.update(user);
        return ResponseUtils.success("下线成功");
    }

    /**
     * 获取所有角色
     * @return
     */
    @RequestMapping(value = "listAllRoles")
    public String listAllRoles() {
        List<Role> roleList = roleService.list(new RoleQM());

        JSONArray datas = new JSONArray();
        if (CollectionUtils.isNotEmpty(roleList)) {
            roleList.forEach(role -> {
                JSONObject obj = new JSONObject();
                obj.put("id", role.getId());
                obj.put("name", role.getRoleName());
                datas.add(obj);
            });
        }
        return ResponseUtils.success(datas);
    }
}
