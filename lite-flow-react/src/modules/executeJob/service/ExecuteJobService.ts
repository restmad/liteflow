import {request, requestPost, requestGet} from "../../../common/utils/Request";
import qs from "qs";
import executeJobConfig from "../config/ExecuteJobConfig";

export async function queryList(params) {
    return request(`${executeJobConfig.urls.listUrl}?${qs.stringify(params)}`,{});
}

export async function create(params) {
    return requestPost(executeJobConfig.urls.addUrl, params);
}

export async function update(params) {
    return requestPost(executeJobConfig.urls.updateUrl, params);
}

export async function callbackJob(id) {
    return requestPost(executeJobConfig.urls.callbackUrl, {id: id});
}

export async function offJob(id) {
    return requestPost(executeJobConfig.urls.offUrl, {id: id});
}