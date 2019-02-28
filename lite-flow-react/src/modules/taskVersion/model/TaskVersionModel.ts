import {action, observable} from 'mobx';
import {provideSingleton} from "../../../common/utils/IOC";
import {fixVersion, ignoreVersion, killVersion, fixRangeVersion, deepFixVersion} from "../service/TaskVersionService"
import {asyncAction} from "mobx-utils";
import BaseListModel from "../../../common/model/BaseListModel";
import TaskVersionConfig from "../config/TaskVersionConfig";
import {notification} from 'antd';

export class TaskVersionSearchParam {
    taskId?: number;
    status?: number;
    finalStatus?: number;
}

export class TaskVersion {
    id: number;
    versionNo: number;
    taskId: number;
    taskName: String;
    status: number;
    finalStatus: number;
    retryNum: number;
    msg ?: string;
    createTime ?: number;
    updateTime ?: number;
}

@provideSingleton(TaskVersionModel)
export class TaskVersionModel extends BaseListModel{

    @observable
    taskVersions: Array<TaskVersion> = [];

    @observable
    loading: boolean = false;

    constructor() {
        super();
        this.path = TaskVersionConfig.urls.listUrl;
    }

    @action
    queryCallBack(success: boolean, list: Array<any>): void {
        if (success) {
            this.taskVersions = list as Array<TaskVersion>;
        }
        this.loading = false;
    }

    @action
    query(searchParam: TaskVersionSearchParam) {
        this.loading = true;
        this.queryData(searchParam);
    }

    @asyncAction
    * fix(id: number) {
        this.loading = true;
        const result = yield fixVersion(id);
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
    * deepFix(id: number) {
        this.loading = true;
        const result = yield deepFixVersion(id);
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
    * ignore(id: number) {
        this.loading = true;
        const result = yield ignoreVersion(id);
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
    * kill(id: number) {
        this.loading = true;
        const result = yield killVersion(id);
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
    * fixRange(data) {
        this.loading = true;
        const result = yield fixRangeVersion(data);
        if (result.status == 0) {
            notification["success"]({
                message: '成功',
                description: '操作成功',
            });
            this.refresh();
        }
        this.loading = false;
    }

}
