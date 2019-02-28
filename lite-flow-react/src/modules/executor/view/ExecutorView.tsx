import React, {Component} from 'react';
import {observer} from "mobx-react";
import {inject} from '../../../common/utils/IOC';
import {ExecutorModel, ExecutorSearchParam, Executor} from "../model/ExecutorModel";
import Search, {ExecutorSearchProps} from "../component/ExecutorSearch";
import {Row} from 'antd'
import {ExecutorList, ExecutorListProps} from "../component/ExecutorList";
import ExecutorOperation, {ExecutorOperProps} from "../component/ExecutorOperation";

@observer
export default class ExecutorView extends Component<{}, any> {

    @inject(ExecutorModel)
    private executorModel: ExecutorModel;

    constructor(props) {
        super(props);
    }

    componentWillMount(): void {
        this.executorModel.query({});
    }

    /**
     * 搜索参数
     * @returns {{user: any; onSearch: ((searchVo: ExecutorSearchParam) => any); onAdd: ((executor: Executor) => any)}}
     */
    getSearchProps(){
        let that = this;
        return {
            executorModel: that.executorModel
        };
    };

    getListProps(): ExecutorListProps {
        let that = this;
        return {
            dataSource: this.executorModel.executors,
            loading: this.executorModel.loading,
            pageConfig:this.executorModel.pageConfig,
            executorModel: that.executorModel
        };
    };

    getOperProps(){
        let that = this;
        return {
            executorModel: that.executorModel
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
                        <ExecutorOperation {...this.getOperProps()}/>
                    </Row>
                    <Row>
                        <ExecutorList {...this.getListProps()}/>
                    </Row>
                </Row>
            </Row>
        )
    }

}
