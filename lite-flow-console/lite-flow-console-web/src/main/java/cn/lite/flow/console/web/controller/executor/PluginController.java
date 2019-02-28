package cn.lite.flow.console.web.controller.executor;

import cn.lite.flow.common.model.consts.CommonConstants;
import cn.lite.flow.common.model.consts.StatusType;
import cn.lite.flow.console.common.utils.ResponseUtils;
import cn.lite.flow.console.web.controller.BaseController;
import cn.lite.flow.console.web.utils.ModelUtils;
import cn.lite.flow.executor.client.ExecutorContainerRpcService;
import cn.lite.flow.executor.client.ExecutorPluginRpcService;
import cn.lite.flow.executor.client.model.PluginParam;
import cn.lite.flow.executor.model.basic.ExecutorContainer;
import cn.lite.flow.executor.model.basic.ExecutorPlugin;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @description: 插件相关
 * @author: yueyunyue
 * @create: 2018-07-25
 **/
@RestController("executorPluginController")
@RequestMapping("executor/plugin")
public class PluginController extends BaseController {

    @Autowired
    private ExecutorPluginRpcService executorPluginRpcService;

    @Autowired
    private ExecutorContainerRpcService executorContainerRpcService;

    /**
     * 列表
     *
     * @param nameLike      按名称模糊查询
     * @param pageNum       当前页码
     * @param pageSize      每页数量
     * @return
     */
    @RequestMapping("list")
    public String list(
            @RequestParam(value = "nameLike", required = false) String nameLike,
            @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize
    ) {
        PluginParam param = new PluginParam();
        param.setNameLike(nameLike);
        param.setPageNum(pageNum);
        param.setPageSize(pageSize);

        List<ExecutorPlugin> plugins = executorPluginRpcService.list(param);

        int total = 0;
        JSONArray datas = new JSONArray();
        if (plugins != null && CollectionUtils.isNotEmpty(plugins)) {
            total = executorPluginRpcService.count(param);

            List<Long> userIds = plugins
                    .stream()
                    .map(ExecutorPlugin::getUserId)
                    .distinct()
                    .collect(Collectors.toList());

            Map<Long, String> userInfo = getUserName(userIds);

            plugins.stream().forEach(plugin -> {
                    JSONObject obj = ModelUtils.getPluginObj(plugin);
                    setUserInfo(obj, plugin.getUserId(), userInfo);
                    /**所属容器*/
                    ExecutorContainer executorContainer = executorContainerRpcService.getById(plugin.getContainerId());
                    if (executorContainer != null) {
                        JSONObject containerObj = new JSONObject();
                        containerObj.put("id", executorContainer.getId());
                        containerObj.put("name", executorContainer.getName());
                        obj.put("container", containerObj);
                    }
                    datas.add(obj);
                });
        }
        return ResponseUtils.list(total, datas);
    }

    /**
     * 编辑
     *
     * @param id
     * @param name          名称
     * @param fieldConfig   字段配置
     * @param description   说明
     * @param containerId   容器id
     * @return
     */
    @RequestMapping(value = "addOrUpdate")
    public String addOrUpdate(
            @RequestParam(value = "id") Long id,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "fieldConfig") String fieldConfig,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "containerId") Long containerId
    ) {
        ExecutorPlugin plugin = new ExecutorPlugin();
        plugin.setId(id);
        plugin.setName(name);
        plugin.setDescription(description);
        plugin.setContainerId(containerId);
        plugin.setUserId(getUser().getId());

        /**
         * 插件的参数不能与容器的参数相同
         */
        if(StringUtils.isNotEmpty(fieldConfig)){
            ExecutorContainer container = executorContainerRpcService.getById(containerId);
            String containerFieldConfig = container.getFieldConfig();
            if(StringUtils.isNotEmpty(containerFieldConfig)){
                JSONArray pluginFieldArray = JSONArray.parseArray(fieldConfig);

                if(pluginFieldArray != null && pluginFieldArray.size() > 0){
                    JSONArray containerFieldArray = JSONArray.parseArray(containerFieldConfig);
                    Set<String> containerFiledSet = Sets.newHashSet();
                    for(int i = 0; i < containerFieldArray.size(); i ++){
                        JSONObject fieldObj = containerFieldArray.getJSONObject(i);
                        String fieldName = fieldObj.getString(CommonConstants.PARAM_NAME);
                        containerFiledSet.add(fieldName);
                    }
                    for(int i = 0; i < pluginFieldArray.size(); i ++){
                        JSONObject fieldObj = pluginFieldArray.getJSONObject(i);
                        String fieldName = fieldObj.getString(CommonConstants.PARAM_NAME);
                        if(containerFiledSet.contains(fieldName)){
                            return ResponseUtils.error("参数" + fieldName + "与容器中参数重复");
                        }
                    }
                }
            }
        }else{
            fieldConfig = "";
        }
        plugin.setFieldConfig(fieldConfig);

        if (id == null) {
            executorPluginRpcService.add(plugin);
        } else {
            executorPluginRpcService.update(plugin);
        }
        return ResponseUtils.success("操作成功");
    }

    /**
     * 上线
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "online")
    public String online(@RequestParam(value = "id") Long id) {
        ExecutorPlugin executorPlugin = new ExecutorPlugin();
        executorPlugin.setId(id);
        executorPlugin.setStatus(StatusType.ON.getValue());

        executorPluginRpcService.update(executorPlugin);
        return ResponseUtils.success("发布成功");
    }

    /**
     * 下线
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "offline")
    public String offline(@RequestParam(value = "id") Long id) {
        ExecutorPlugin executorPlugin = new ExecutorPlugin();
        executorPlugin.setId(id);
        executorPlugin.setStatus(StatusType.OFF.getValue());

        executorPluginRpcService.update(executorPlugin);
        return ResponseUtils.success("下线成功");
    }


}
