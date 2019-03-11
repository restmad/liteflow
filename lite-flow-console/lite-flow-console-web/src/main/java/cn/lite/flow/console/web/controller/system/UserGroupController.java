package cn.lite.flow.console.web.controller.system;

import cn.lite.flow.console.common.utils.ResponseUtils;
import cn.lite.flow.console.model.basic.UserGroup;
import cn.lite.flow.console.model.query.UserGroupQM;
import cn.lite.flow.console.service.UserGroupService;
import cn.lite.flow.console.service.UserService;
import cn.lite.flow.console.web.annotation.AuthCheckIgnore;
import cn.lite.flow.console.web.controller.BaseController;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @description: 用户组相关
 * @author: yueyunyue
 * @create: 2018-07-25
 **/
@RestController
@RequestMapping("console/system/ugroup")
public class UserGroupController extends BaseController {

    @Autowired
    private UserGroupService userGroupService;
    @Autowired
    private UserService userService;

    /**
     * 用户组列表
     *
     * @param groupNameLike     用户组名称模糊查询
     * @param status            状态
     * @param pageNum           当前页码
     * @param pageSize          每页数量
     * @return
     */
    @RequestMapping(value = "list")
    public String list(
            @RequestParam(value = "nameLike", required = false) String groupNameLike,
            @RequestParam(value = "status", required = false) Integer status,
            @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize
    ) {
        UserGroupQM userGroupQM = new UserGroupQM();
        userGroupQM.setNameLike(groupNameLike);
        userGroupQM.setStatus(status);
        userGroupQM.setPage(pageNum, pageSize);
        userGroupQM.addOrderDesc(UserGroupQM.COL_UPDATE_TIME);

        List<UserGroup> userGroupList = userGroupService.list(userGroupQM);

        int total = 0;
        JSONArray datas = new JSONArray();
        if (CollectionUtils.isNotEmpty(userGroupList)) {
            total = userGroupService.count(userGroupQM);

            List<Long> userIds = userGroupList.
                    stream().
                    map(UserGroup::getUserId).
                    distinct().collect(Collectors.toList());

            userGroupList.forEach(userGroup -> {
                JSONObject obj = new JSONObject();
                obj.put("id", userGroup.getId());
                obj.put("name", userGroup.getName());
                Map<Long, String> userInfo = getUserName(userIds);
                setUserInfo(obj, userGroup.getUserId(), userInfo);
                obj.put("description", userGroup.getDescription());
                obj.put("users", userService.getByGroupId(userGroup.getId()));
                obj.put("createTime", userGroup.getCreateTime());
                obj.put("updateTime", userGroup.getUpdateTime());
                datas.add(obj);
            });
        }
        return ResponseUtils.list(total, datas);
    }

    /**
     * 获取所有的用户组
     *
     * @return
     */
    @RequestMapping(value = "listAllUserGroups")
    @AuthCheckIgnore
    public String listAllUserGroups() {
        List<UserGroup> userGroupList = userGroupService.list(new UserGroupQM());
        JSONArray datas = new JSONArray();
        if (CollectionUtils.isNotEmpty(userGroupList)) {
            userGroupList.forEach(userGroup -> {
                JSONObject obj = new JSONObject();
                obj.put("name", userGroup.getName());
                obj.put("id", userGroup.getId());
                datas.add(obj);
            });
        }
        return ResponseUtils.success(datas);
    }

    /**
     * 添加 or 更新用户组
     *
     * @param groupName     用户组名
     * @param description   说明
     * @return
     */
    @RequestMapping(value = "addOrUpdate")
    public String add(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "name") String groupName,
            @RequestParam(value = "description", required = false, defaultValue = "") String description,
            @RequestParam(value = "users", required = false) String users
    ) {
        UserGroupQM queryModel = new UserGroupQM();
        queryModel.setName(groupName);
        List<UserGroup> userGroupList = userGroupService.list(queryModel);
        if (CollectionUtils.isNotEmpty(userGroupList)) {
            if (id == null || !userGroupList.get(0).getId().equals(id)) {
                return ResponseUtils.error("该名称已经存在,请修改后重试");
            }
        }

        UserGroup userGroup = new UserGroup();
        userGroup.setId(id);
        userGroup.setName(groupName);
        userGroup.setUserId(getUser().getId());
        userGroup.setDescription(description);
        userGroup.setUserId(getUser().getId());
        userGroupService.addOrUpdate(userGroup, users);
        return ResponseUtils.success("操作成功");
    }

    /**
     * 删除用户组
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "delete")
    public String delete(@RequestParam(value = "id") Long id) {
        userGroupService.delete(id);
        return ResponseUtils.success("操作成功");
    }

}
