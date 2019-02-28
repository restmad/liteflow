import {request, requestPost, requestGet} from "../../../common/utils/Request";
import qs from "qs";
import userGroupConfig from "../config/UserGroupConfig";

export async function queryList(params) {
    return request(`${userGroupConfig.urls.listUrl}?${qs.stringify(params)}`,{});
}

export async function listAllGroups() {
    return request(userGroupConfig.urls.listAllGroupsUrl,{});
}

export async function create(params) {
    let paramNew = {};
    for (let p in params) {
        let value = params[p];
        if (p == "users" && value && value.length > 0) {
            paramNew[p] = value.join(",");
        } else {
            paramNew[p] = value;
        }
    }
    return requestPost(userGroupConfig.urls.addUrl, paramNew);
}

export async function update(params) {
    let paramNew = {};
    for (let p in params) {
        let value = params[p];
        if (p == "users" && value && value.length > 0) {
            paramNew[p] = value.join(",");
        } else {
            paramNew[p] = value;
        }
    }
    return requestPost(userGroupConfig.urls.updateUrl, paramNew);
}

export async function remove(id) {
    return requestPost(userGroupConfig.urls.deleteUrl, {id: id});
}
