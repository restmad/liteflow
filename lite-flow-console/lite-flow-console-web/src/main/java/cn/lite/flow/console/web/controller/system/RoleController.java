package cn.lite.flow.console.web.controller.system;

import cn.lite.flow.console.common.utils.ResponseUtils;
import cn.lite.flow.console.model.basic.MenuItem;
import cn.lite.flow.console.model.basic.Role;
import cn.lite.flow.console.model.query.MenuItemQM;
import cn.lite.flow.console.model.query.RoleQM;
import cn.lite.flow.console.service.MenuItemService;
import cn.lite.flow.console.service.RoleService;
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
 * @description: 角色相关
 * @author: yueyunyue
 * @create: 2018-07-25
 **/
@RestController
@RequestMapping("console/system/role")
public class RoleController extends BaseController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private MenuItemService menuItemService;

    /**
     * 角色列表接口
     *
     * @param roleNameLike      角色名
     * @param pageNum           当前页码
     * @param pageSize          每页数量
     * @return
     */
    @RequestMapping(value = "list")
    public String list(
            @RequestParam(value = "name", required = false) String roleNameLike,
            @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize
    ) {
        RoleQM roleQM = new RoleQM();
        roleQM.setRoleNameLike(roleNameLike);
        roleQM.setPage(pageNum, pageSize);
        roleQM.addOrderDesc(RoleQM.COL_UPDATE_TIME);

        List<Role> roleList = roleService.list(roleQM);

        int total = 0;
        JSONArray datas = new JSONArray();
        if (CollectionUtils.isNotEmpty(roleList)) {
            total = roleService.count(roleQM);

            List<Long> userIds = roleList.
                    stream().
                    map(Role::getUserId).
                    distinct().
                    collect(Collectors.toList());
            Map<Long, String> userInfo = getUserName(userIds);

            roleList.forEach(role -> {
                JSONObject obj = new JSONObject();
                obj.put("id", role.getId());
                obj.put("name", role.getRoleName());
                setUserInfo(obj, role.getUserId(), userInfo);
                obj.put("description", role.getDescription());
                obj.put("createTime", role.getCreateTime());
                obj.put("updateTime", role.getUpdateTime());
                obj.put("auths", menuItemService.getByRoleId(role.getId()));
                datas.add(obj);
            });
        }
        return ResponseUtils.list(total, datas);
    }

    /**
     * 添加角色
     *
     * @param roleName          角色名称
     * @param description       说明
     * @param authUrlIds        权限url id字符串 以英文半角逗号分隔
     * @return
     */
    @RequestMapping(value = "addOrUpdate")
    public String addOrUpdate(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "name") String roleName,
            @RequestParam(value = "description", required = false, defaultValue = "") String description,
            @RequestParam(value = "auths") String authUrlIds
    ) {
        RoleQM roleQM = new RoleQM();
        roleQM.setRoleName(roleName);
        List<Role> roleList = roleService.list(roleQM);
        if (CollectionUtils.isNotEmpty(roleList)) {
            if (id == null || !roleList.get(0).getId().equals(id)) {
                return ResponseUtils.error("该名称已经存在, 请修改后重试!");
            }
        }

        Role role = new Role();
        role.setId(id);
        role.setRoleName(roleName);
        role.setDescription(description);
        role.setUserId(getUser().getId());

        roleService.addOrUpdateAuthUrls(role, authUrlIds);

        return ResponseUtils.success("添加成功");
    }


    /**
     * 删除角色
     *
     * @param id    角色id
     * @return
     */
    @RequestMapping(value = "delete")
    public String delete(@RequestParam(value = "id") Long id) {
        roleService.deleteById(id);
        return ResponseUtils.success("删除成功");
    }

    /**
     * 获取所有的权限
     *
     * @return
     */
    @RequestMapping(value = "listAllAuths")
    public String listAllAuths() {
        List<MenuItem> menuItemList = menuItemService.list(new MenuItemQM());

        JSONArray datas = new JSONArray();
        if (CollectionUtils.isNotEmpty(menuItemList)) {
            menuItemList.forEach(o -> {
                JSONObject obj = new JSONObject();
                obj.put("id", o.getId());
                obj.put("name", o.getName());
                obj.put("url", o.getUrl());
                datas.add(obj);
            });
        }
        return ResponseUtils.success(datas);
    }

}
