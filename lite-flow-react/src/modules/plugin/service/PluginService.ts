import {request, requestPost, requestGet} from "../../../common/utils/Request";
import qs from "qs";
import pluginConfig from "../config/PluginConfig";

export async function queryList(params) {
    return request(`${pluginConfig.urls.listUrl}?${qs.stringify(params)}`,{});
}

export async function create(params) {
    let paramNew = {};
    for (let p in params) {
        let value = params[p];
        if (p == "container" && value) {
            paramNew["containerId"] = value;
        } else {
            paramNew[p] = value;
        }
    }
    return requestPost(pluginConfig.urls.addUrl, paramNew);
}

export async function update(params) {
    let paramNew = {};
    for (let p in params) {
        let value = params[p];
        if (p == "container" && value) {
            paramNew["containerId"] = value;
        } else {
            paramNew[p] = value;
        }
    }
    return requestPost(pluginConfig.urls.updateUrl, paramNew);
}

export async function onPlugin(id) {
    return requestPost(pluginConfig.urls.onUrl, {id: id});
}

export async function offPlugin(id) {
    return requestPost(pluginConfig.urls.offUrl, {id: id});
}
export async function listAllValidPlugin() {
    return requestGet(pluginConfig.urls.getAllValidPluginUrl, {});
}