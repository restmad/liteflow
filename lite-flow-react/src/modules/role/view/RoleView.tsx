import React, {Component} from 'react';
import {observer} from "mobx-react";
import {inject} from '../../../common/utils/IOC';
import {RoleModel, RoleSearchParam, Role} from "../model/RoleModel";
import Search, {RoleSearchProps} from "../component/RoleSearch";
import {Row} from 'antd'
import {RoleList, RoleListProps} from "../component/RoleList";
import RoleOperation, {RoleOperProps} from "../component/RoleOperation";

@observer
export default class RoleView extends Component<{}, any> {

    @inject(RoleModel)
    private roleModel: RoleModel;

    constructor(props) {
        super(props);
    }

    componentWillMount(): void {
        this.roleModel.query({});
    }

    /**
     * 搜索参数
     * @returns {{user: any; onSearch: ((searchVo: RoleSearchParam) => any); onAdd: ((role: Role) => any)}}
     */
    getSearchProps(){
        let that = this;
        return {
            roleModel: that.roleModel
        };
    };

    getListProps(): RoleListProps {
        let that = this;
        return {
            dataSource: this.roleModel.roles,
            loading: this.roleModel.loading,
            pageConfig:this.roleModel.pageConfig,
            roleModel: that.roleModel
        };
    };

    getOperProps(){
        let that = this;
        return {
            roleModel: that.roleModel
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
                        <RoleOperation {...this.getOperProps()}/>
                    </Row>
                    <Row>
                        <RoleList {...this.getListProps()}/>
                    </Row>
                </Row>
            </Row>
        )
    }

}
