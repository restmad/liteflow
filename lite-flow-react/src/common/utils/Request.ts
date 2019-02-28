import fetch from "isomorphic-fetch";
import Config from "../config/Config";
import qs from "qs";

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    throw error;
}

var app;

export function appContainer(appParam) {
    app = appParam;
}

function sendMessage(message) {
    if (app) {
        app.sendMessage(message);
    }
}

function sendNotLogin() {
    sendMessage({type: 'error', title: '登录超时', msg: '用户登录超时，请重新登录'});
}

export function generateUrl(url) {
    let prefix = "";
    if(Config.prefix && Config.prefix.length > 0){
        prefix = '/' + Config.prefix;
    }
    let newUrl = url.startsWith("http") ? url : prefix + url;
    return newUrl;
}

export async function request(url, options?: any){
    return requestMain(url, options, true);
}

export async function requestMain(url, reqParams?: any, isShowMsg ?: boolean) {
    let newUrl = generateUrl(url);
    const response = await fetch(newUrl, reqParams);

    let result = {status: -1};

    try {
        checkStatus(response);

        const data = await response.json();

        if (data) {
            if (data.status != 0) {
                if (data.data == 'NOT_LOGIN') {
                    if(isShowMsg){
                        sendNotLogin();
                    }
                } else {
                    sendMessage({type: 'error', title: '操作失败', msg: `${data.data}`, duration: 0})
                }
            } else {
                result = data;
            }
        } else {
            const error = new Error("json解析错误");
            throw error;
        }

    } catch (error) {
        sendMessage({type: 'error', title: '操作失败', msg: `服务器内部异常:${error ? error : ''}`, duration: 0});
    }

    return result;
}

/**
 * post请求
 * @param url
 * @param param
 * @returns {Promise<void>}
 */
export async function requestPost(url, params?: any) {

    return request(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: params ? qs.stringify(params) : "",
    });

}

/**
 * get请求
 * @param url
 * @param params
 * @returns {Promise<{status: number}>}
 */
export async function requestGet(url, params?: any) {
    let reqUrl = url;
    if (params) {
        reqUrl += "?" + qs.stringify(params);
        return request(reqUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
    }

}
export async function requestGetNoShowMsg(url, params?: any) {
    let reqUrl = url;
    if (params) {
        reqUrl += "?" + qs.stringify(params);
        return requestMain(reqUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'X-Requested-With': 'XMLHttpRequest'
            }
        }, false);
    }

}
