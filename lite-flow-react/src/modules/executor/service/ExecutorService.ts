import {request, requestPost, requestGet} from "../../../common/utils/Request";
import qs from "qs";
import executorConfig from "../config/ExecutorConfig";

export async function queryList(params) {
    return request(`${executorConfig.urls.listUrl}?${qs.stringify(params)}`,{});
}

export async function create(params) {
    return requestPost(executorConfig.urls.addUrl, params);
}

export async function update(params) {
    return requestPost(executorConfig.urls.updateUrl, params);
}

export async function onExecutor(id) {
    return requestPost(executorConfig.urls.onUrl, {id: id});
}

export async function offExecutor(id) {
    return requestPost(executorConfig.urls.offUrl, {id: id});
}