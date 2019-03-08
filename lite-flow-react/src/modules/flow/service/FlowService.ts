import {request, requestPost, requestGet} from "../../../common/utils/Request";
import qs from "qs";
import FlowConfig from "../config/FlowConfig";

export async function queryList(params) {
    return request(`${FlowConfig.urls.listUrl}?${qs.stringify(params)}`,{});
}

export async function create(params) {
    return requestPost(FlowConfig.urls.addUrl, params);
}

export async function update(params) {
    return requestPost(FlowConfig.urls.updateUrl, params);
}

export async function remove(id) {
    return requestPost(FlowConfig.urls.deleteUrl, {id: id});
}
export async function viewFlowDag(id) {
    return requestGet(FlowConfig.urls.viewDagUrl, {id: id});
}
export async function addOrUpdateFlowLinks(id, links) {
    return requestPost(FlowConfig.urls.updateLinksUrl, {id: id, links: links});
}

export async function onFlow(id) {
    return requestPost(FlowConfig.urls.onUrl, {id: id});
}
export async function offFlow(id) {
    return requestPost(FlowConfig.urls.offUrl, {id: id});
}

/**
 * 任务流修复相关
 */
export async function fixViewFlowDag(id, versionNo) {
    return requestGet(FlowConfig.urls.fixDagViewUrl, {id: id, headTaskVersionNo: versionNo});
}

export async function fixGetLatestVersionNos(id) {
    return requestGet(FlowConfig.urls.fixGetLatestVersionUrl, {id: id});
}

export async function fixGetHeadTaskVersionNos(id, startTime, endTime) {
    return requestGet(FlowConfig.urls.fixGetHeadTaskVersionsUrl, {id: id, startTime: startTime, endTime: endTime});
}
export async function fixFlowFromNode(id, versionNo, versionId) {
    return requestGet(FlowConfig.urls.fixGetHeadTaskVersionsUrl, {id: id, headTaskVersionNo: versionNo, fixVersionId: versionId});
}
export async function fixFlowByVersion (id, versionNo) {
    return requestGet(FlowConfig.urls.fixFlowUrl, {id: id, headTaskVersionNo: versionNo});
}
