import {request, requestPost, requestGet} from "../../../common/utils/Request";
import qs from "qs";
import TaskInstanceConfig from "../config/TaskInstanceConfig";

export async function queryList(params) {
    return request(`${TaskInstanceConfig.urls.listUrl}?${qs.stringify(params)}`,{});
}

export async function logInstance(id) {
    return requestGet(TaskInstanceConfig.urls.logUrl, {id: id});
}
export async function logVersion(id) {
    return requestGet(TaskInstanceConfig.urls.versionLogUrl, {id: id});
}

export async function onDependency(id) {
    return requestGet(TaskInstanceConfig.urls.onDependencyUrl, {id: id});
}

export async function offDependency(id) {
    return requestGet(TaskInstanceConfig.urls.offDependencyUrl, {id: id});
}

