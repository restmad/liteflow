import React, {Component} from 'react';
import {observer} from "mobx-react";
import {inject} from '../../../common/utils/IOC';
import {FlowModel, FlowSearchParam, Flow} from "../model/FlowModel";
import Search, {FlowSearchProps} from "../component/FlowSearch";
import {Row} from 'antd'
import {FlowList, FlowListProps} from "../component/FlowList";
import FlowOperation, {FlowOperProps} from "../component/FlowOperation";

@observer
export default class FlowView extends Component<{}, any> {

    @inject(FlowModel)
    private flowModel: FlowModel;

    constructor(props) {
        super(props);
    }

    componentWillMount(): void {
        this.flowModel.query({});
    }

    /**
     * 搜索参数
     */
    getSearchProps(){
        let that = this;
        return {
            flowModel: that.flowModel
        };
    };

    getListProps(): FlowListProps {
        let that = this;
        return {
            dataSource: this.flowModel.flows,
            loading: this.flowModel.loading,
            pageConfig:this.flowModel.pageConfig,
            flowModel: that.flowModel
        };
    };

    getOperProps(){
        let that = this;
        return {
            flowModel: that.flowModel
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
                        <FlowOperation {...this.getOperProps()}/>
                    </Row>
                    <Row>
                        <FlowList {...this.getListProps()}/>
                    </Row>
                </Row>
            </Row>
        )
    }

}
