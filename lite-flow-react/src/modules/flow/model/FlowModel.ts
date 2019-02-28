import {action, observable} from 'mobx';
import {provideSingleton} from "../../../common/utils/IOC";
import {asyncAction} from "mobx-utils";
import BaseListModel from "../../../common/model/BaseListModel";
import FlowConfig from "../config/FlowConfig";
import {notification} from 'antd';
import {
    create,
    remove,
    update,
    onFlow,
    offFlow,
    addOrUpdateFlowLinks,
    viewFlowDag
} from "../service/FlowService"

/**
 * 搜索的model
 */
export class FlowSearchParam {
    id?: number;
    nameLike?: String;
}

export class Flow {
    id: number;
    name: string;
    description ?: string;
}

@provideSingleton(FlowModel)
export class FlowModel extends BaseListModel{

    @observable
    flows: Array<Flow> = [];

    @observable
    loading: boolean = false;

    constructor() {
        super();
        this.path = FlowConfig.urls.listUrl;
    }

    @action
    queryCallBack(success: boolean, list: Array<any>): void {
        if (success) {
            this.flows = list as Array<Flow>;
        }
        this.loading = false;
    }

    @action
    query(searchParam: FlowSearchParam) {
        this.loading = true;
        this.queryData(searchParam);
    }

    @asyncAction
    * add(flow: Flow) {
        this.loading = true;
        const result = yield create(flow);
        if (result.status == 0) {
            notification["success"]({
                message: '成功',
                description: '操作成功',
            });

            this.refresh();
        }
        this.loading = false;
    }

    @asyncAction
    * edit(flow: Flow) {
        this.loading = true;
        const result = yield update(flow);
        if (result.status == 0) {
            notification["success"]({
                message: '成功',
                description: '操作成功',
            });
            this.refresh();
        }
        this.loading = false;
    }

    @asyncAction
    * delete(id: number) {
        this.loading = true;
        const result = yield remove(id);
        if (result.status == 0) {
            notification["success"]({
                message: '成功',
                description: '操作成功',
            });
            this.refresh();
        }
        this.loading = false;
    }
    @asyncAction
    * on(id: number) {
        this.loading = true;
        const result = yield onFlow(id);
        if (result.status == 0) {
            notification["success"]({
                message: '成功',
                description: result.data,
            });
            this.refresh();
        }
        this.loading = false;
    }
    @asyncAction
    * off(id: number) {
        this.loading = true;
        const result = yield offFlow(id);
        if (result.status == 0) {
            notification["success"]({
                message: '成功',
                description: result.data,
            });
            this.refresh();
        }
        this.loading = false;
    }

    @asyncAction
    * viewDag(id):any {
        const result = yield viewFlowDag(id);
        return result;
    }

    /**
     * 更新任务流的节点
     * @param id
     * @param links
     * @returns {any}
     */
    @asyncAction
    * addOrUpdateLinks(id, links):any {
        const result = yield addOrUpdateFlowLinks(id, links);
        return result;
    }
}
