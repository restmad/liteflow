package cn.lite.flow.console.web.controller;

import cn.lite.flow.console.common.model.vo.SessionUser;
import cn.lite.flow.console.common.utils.SessionContext;
import cn.lite.flow.console.model.basic.User;
import cn.lite.flow.console.model.basic.UserGroup;
import cn.lite.flow.console.model.query.UserGroupQM;
import cn.lite.flow.console.model.query.UserQM;
import cn.lite.flow.console.service.UserGroupService;
import cn.lite.flow.console.service.UserService;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @description: 基础controller
 * @author: yueyunyue
 * @create: 2018-07-25
 **/
public class BaseController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserGroupService userGroupService;

    public SessionUser getUser() {
        return SessionContext.getUser();
    }


    /**
     * 根据用户id列表查找对应的用户名
     *
     * @param userIds   用户id列表
     * @return
     */
    public Map<Long, String> getUserName(List<Long> userIds) {
        if (CollectionUtils.isNotEmpty(userIds)) {
            UserQM userQM = new UserQM();
            userQM.setIds(userIds);
            List<User> userList = userService.list(userQM);

            if (CollectionUtils.isNotEmpty(userList)) {
                return userList.stream().collect(Collectors.toMap(User::getId, User::getUserName));
            }
        }
        return Collections.EMPTY_MAP;
    }

    /**
     * 根据用户组id列表查找对应的用户组名
     *
     * @param groupIds  用户组id列表
     * @return
     */
    public Map<Long, String> getGroupName(List<Long> groupIds) {
        if (CollectionUtils.isNotEmpty(groupIds)) {
            UserGroupQM userGroupQM = new UserGroupQM();
            userGroupQM.setIds(groupIds);
            List<UserGroup> userGroupList = userGroupService.list(userGroupQM);

            if (CollectionUtils.isNotEmpty(userGroupList)) {
                return userGroupList.stream().collect(Collectors.toMap(UserGroup::getId, UserGroup::getName));
            }
        }
        return Collections.EMPTY_MAP;
    }

    /**
     * 设置用户信息
     *
     * @param obj           目标对象
     * @param userId        用户id
     * @param userInfo      用户id和用户名对应信息
     */
    public void setUserInfo(JSONObject obj, Long userId, Map<Long, String> userInfo) {
        String userName = userInfo.get(userId);
        if (StringUtils.isNotBlank(userName)) {
            JSONObject userObj = new JSONObject();
            userObj.put("id", userId);
            userObj.put("name", userName);
            obj.put("user", userObj);
        }
    }


}
