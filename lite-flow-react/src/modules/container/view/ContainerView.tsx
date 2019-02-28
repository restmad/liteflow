import React, {Component} from 'react';
import {observer} from "mobx-react";
import {inject} from '../../../common/utils/IOC';
import {ContainerModel, ContainerSearchParam, Container} from "../model/ContainerModel";
import Search, {ContainerSearchProps} from "../component/ContainerSearch";
import {Row} from 'antd'
import {ContainerList, ContainerListProps} from "../component/ContainerList";
import ContainerOperation, {ContainerOperProps} from "../component/ContainerOperation";

@observer
export default class ContainerView extends Component<{}, any> {

    @inject(ContainerModel)
    private containerModel: ContainerModel;

    constructor(props) {
        super(props);
    }

    componentWillMount(): void {
        this.containerModel.query({});
    }

    /**
     * 搜索参数
     * @returns {{user: any; onSearch: ((searchVo: ContainerSearchParam) => any); onAdd: ((container: Container) => any)}}
     */
    getSearchProps(){
        let that = this;
        return {
            containerModel: that.containerModel
        };
    };

    getListProps(): ContainerListProps {
        let that = this;
        return {
            dataSource: this.containerModel.containers,
            loading: this.containerModel.loading,
            pageConfig:this.containerModel.pageConfig,
            containerModel: that.containerModel
        };
    };

    getOperProps(){
        let that = this;
        return {
            containerModel: that.containerModel
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
                        <ContainerOperation {...this.getOperProps()}/>
                    </Row>
                    <Row>
                        <ContainerList {...this.getListProps()}/>
                    </Row>
                </Row>
            </Row>
        )
    }

}
