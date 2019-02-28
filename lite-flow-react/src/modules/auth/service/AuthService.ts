import {request, requestPost, requestGet} from "../../../common/utils/Request";
import qs from "qs";
import authConfig from "../config/AuthConfig";

export async function queryList(params) {
    return request(`${authConfig.urls.listUrl}?${qs.stringify(params)}`,{});
}

export async function create(params) {
    return requestPost(authConfig.urls.addUrl, params);
}

export async function update(params) {
    return requestPost(authConfig.urls.updateUrl, params);
}

export async function deleteAuth(id) {
    return requestPost(authConfig.urls.deleteUrl, {id: id});
}
