import {action, observable} from 'mobx';
import {provideSingleton} from "../../../common/utils/IOC";
import {create, remove, update, listAllGroups} from "../service/UserGroupService"
import {asyncAction} from "mobx-utils";
import BaseListModel from "../../../common/model/BaseListModel";
import userGroupConfig from "../config/UserGroupConfig";
import {notification} from 'antd';
import {User} from "../../user/model/UserModel";

export class UserGroupSearchParam {
    id?: number;
    nameLike?: String;
}

export class UserGroup {
    id: number;
    name: string;
    description ?: string;
    users ?: Array<User>
}

@provideSingleton(UserGroupModel)
export class UserGroupModel extends BaseListModel{

    @observable
    userGroups: Array<UserGroup> = [];

    @observable
    loading: boolean = false;

    constructor() {
        super();
        this.path = userGroupConfig.urls.listUrl;
    }

    @action
    queryCallBack(success: boolean, list: Array<any>): void {
        if (success) {
            this.userGroups = list as Array<UserGroup>;
        }
        this.loading = false;
    }

    @action
    query(searchParam: UserGroupSearchParam) {
        this.loading = true;
        this.queryData(searchParam);
    }

    @asyncAction
    * add(userGroup: UserGroup) {
        this.loading = true;
        const result = yield create(userGroup);
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
    * edit(userGroup: UserGroup) {
        this.loading = true;
        const result = yield update(userGroup);
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


    /**
     * 获取所有用户组
     */
    @asyncAction
    * listAllGroups(): any{
        const result = yield listAllGroups();
        return result.data;
    }
}
