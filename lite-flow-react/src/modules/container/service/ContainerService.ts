import {request, requestPost, requestGet} from "../../../common/utils/Request";
import qs from "qs";
import containerConfig from "../config/ContainerConfig";

export async function queryList(params) {
    return request(`${containerConfig.urls.listUrl}?${qs.stringify(params)}`,{});
}

export async function create(params) {
    return requestPost(containerConfig.urls.addUrl, params);
}

export async function update(params) {
    return requestPost(containerConfig.urls.updateUrl, params);
}

export async function onContainer(id) {
    return requestPost(containerConfig.urls.onUrl, {id: id});
}

export async function offContainer(id) {
    return requestPost(containerConfig.urls.offUrl, {id: id});
}
export async function listAllValidContainer() {
    return requestPost(containerConfig.urls.listAllValidUrl, {});
}