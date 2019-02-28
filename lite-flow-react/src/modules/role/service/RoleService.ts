import {request, requestPost, requestGet} from "../../../common/utils/Request";
import qs from "qs";
import roleConfig from "../config/RoleConfig";

export async function queryList(params) {
    return request(`${roleConfig.urls.listUrl}?${qs.stringify(params)}`,{});
}

export async function create(params) {
    let paramNew = {};
    for(let p in params){
        let value = params[p];
        if(p == "auths" && value && value.length >  0){
            paramNew[p] = value.join(",");
        }else{
            paramNew[p] = value;
        }
    }

    return requestPost(roleConfig.urls.addUrl, paramNew);
}

export async function update(params) {
    let paramNew = {};
    for(let p in params){
        let value = params[p];
        if(p == "auths" && value && value.length >  0){
            paramNew[p] = value.join(",");
        }else{
            paramNew[p] = value;
        }
    }
    return requestPost(roleConfig.urls.updateUrl, paramNew);
}

export async function remove(params) {
    return requestPost(roleConfig.urls.deleteUrl, {id: params});
}

export async function listAllAuths(){
    return request(roleConfig.urls.listAllAuthsUrl);
}
