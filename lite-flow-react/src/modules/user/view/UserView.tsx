import React, {Component} from 'react';
import {observer} from "mobx-react";
import {inject, kernel} from '../../../common/utils/IOC';
import {UserList, ListProps} from "../component/UserList";
import {UserModel, UserSearchParam, User} from "../model/UserModel";
import UserSearch from "../component/UserSearch";
import {Row} from 'antd'
import UserOperation from "../component/UserOperation";

@observer
export default class UserView extends Component<{}, any> {

    @inject(UserModel)
    private userModel: UserModel;

    constructor() {
        super();
        this.state = {showModal: false, modalType: 'create', userItem: null}
    }

    componentWillMount(): void {
        this.userModel.query({});
    }


    getSearchProps(){
        let that = this;
        return {
            userModel: that.userModel
        };
    };
    getOperProps(){
        let that = this;
        return {
            userModel: that.userModel
        };
    };


    getListProps(): ListProps {
        let that = this;
        return {
            dataSource: this.userModel.users,
            loading: this.userModel.loading,
            pageConfig:this.userModel.pageConfig,
            userModel: that.userModel
        };
    };
    render() {
        return (
            <Row>
                 <Row className={"container-row-block"}>
                    <UserSearch {...this.getSearchProps()}/>
                 </Row>
                <Row className={"container-row-block"}>
                    <Row className={"op-btns-container"}>
                        <UserOperation {...this.getOperProps()}/>
                    </Row>
                    <Row>
                        <UserList {...this.getListProps()}/>
                    </Row>
                </Row>
            </Row>
        )
    }

}
