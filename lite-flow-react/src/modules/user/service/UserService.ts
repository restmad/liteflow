import {request, requestPost, requestGet} from "../../../common/utils/Request";
import qs from "qs";
import userConfig from "../config/UserConfig";

export async function queryList(params) {
    return request(`${userConfig.urls.listUrl}?${qs.stringify(params)}`,{});
}

export async function create(params) {
    let paramNew = {};
    for(let p in params){
        let value = params[p];
        if((p == "roles") && value && value.length >  0){
            paramNew[p] = value.join(",");
        }else{
            paramNew[p] = value;
        }
    }
    return requestPost(userConfig.urls.addUrl, paramNew);
}

export async function update(params) {
    let paramNew = {};
    for(let p in params){
        let value = params[p];
        if((p == "roles") && value && value.length >  0){
            paramNew[p] = value.join(",");
        }else{
            paramNew[p] = value;
        }
    }
    return requestPost(userConfig.urls.updateUrl, paramNew);
}

export async function on(params) {
    return requestPost(userConfig.urls.onUrl, {id: params});
}

export async function off(params) {
    return requestPost(userConfig.urls.offUrl, {id: params});
}

export async function listRoles() {
    return requestGet(userConfig.urls.listAllRolesUrl, {});
}
export async function listUsers() {
    return requestGet(userConfig.urls.listUrl, {});
}
export async function listAllUsers() {
    return requestGet(userConfig.urls.listAllUsersUrl, {});
}

