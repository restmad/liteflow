import React, {Component} from 'react';
import {observer} from "mobx-react";
import {inject} from '../../../common/utils/IOC';
import {UserGroupModel, UserGroupSearchParam, UserGroup} from "../model/UserGroupModel";
import Search, {UserGroupSearchProps} from "../component/UserGroupSearch";
import {Row} from 'antd'
import {UserGroupList, UserGroupListProps} from "../component/UserGroupList";
import UserGroupOperation, {UserGroupOperProps} from "../component/UserGroupOperation";

@observer
export default class UserGroupView extends Component<{}, any> {

    @inject(UserGroupModel)
    private userGroupModel: UserGroupModel;

    constructor(props) {
        super(props);
    }

    componentWillMount(): void {
        this.userGroupModel.query({});
    }

    /**
     * 搜索参数
     * @returns {{user: any; onSearch: ((searchVo: UserGroupSearchParam) => any); onAdd: ((userGroup: UserGroup) => any)}}
     */
    getSearchProps(){
        let that = this;
        return {
            userGroupModel: that.userGroupModel
        };
    };

    getListProps(): UserGroupListProps {
        let that = this;
        return {
            dataSource: this.userGroupModel.userGroups,
            loading: this.userGroupModel.loading,
            pageConfig:this.userGroupModel.pageConfig,
            userGroupModel: that.userGroupModel
        };
    };

    getOperProps(){
        let that = this;
        return {
            userGroupModel: that.userGroupModel
        };
    };

    render() {
        return (
            <Row>
                <Row className={"container-row-block"}>
                    <Search {...this.getSearchProps()}/>
                 </Row>
                <Row className={"container-row-block"}>
                    <Row className={"op-btns-container"}>
                        <UserGroupOperation {...this.getOperProps()}/>
                    </Row>
                    <Row>
                        <UserGroupList {...this.getListProps()}/>
                    </Row>
                </Row>
            </Row>
        )
    }

}
