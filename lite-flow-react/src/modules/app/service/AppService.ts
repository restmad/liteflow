import {request, requestPost, requestGet} from "../../../common/utils/Request";
import appConfig from "../config/AppConfig";

export async function loginSubmit (params) {
    return requestPost(appConfig.urls.loginUrl, params);
}

export async function logoutSubmit () {
    return request(appConfig.urls.logoutUrl);
}
