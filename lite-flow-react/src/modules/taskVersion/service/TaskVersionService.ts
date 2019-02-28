import {request, requestPost, requestGet} from "../../../common/utils/Request";
import qs from "qs";
import TaskConfig from "../config/TaskVersionConfig";

export async function queryList(params) {
    return request(`${TaskConfig.urls.listUrl}?${qs.stringify(params)}`,{});
}

export async function fixVersion(id) {
    return requestGet(TaskConfig.urls.fixUrl, {id: id});
}

export async function ignoreVersion(id) {
    return requestGet(TaskConfig.urls.ignoreUrl, {id: id});
}

export async function killVersion(id) {
    return requestGet(TaskConfig.urls.killUrl, {id: id});
}
export async function deepFixVersion(id) {
    return requestGet(TaskConfig.urls.deepFixUrl, {id: id});
}

export async function fixRangeVersion(param) {
    return requestPost(TaskConfig.urls.fixRangUrl, param);
}
