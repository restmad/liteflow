import React, {Component} from 'react';
import {observer} from "mobx-react";
import {inject} from '../../../common/utils/IOC';
import {TaskVersionModel, TaskVersionSearchParam, TaskVersion} from "../model/TaskVersionModel";
import Search, {TaskVersionSearchProps} from "../component/TaskVersionSearch";
import {Row} from 'antd'
import {TaskVersionList, TaskVersionListProps} from "../component/TaskVersionList";
import TaskVersionOperation, {TaskVersionOperProps} from "../component/TaskVersionOperation";

export interface TaskVersionProps {
    taskId ?: number;
}

@observer
export default class TaskVersionView extends Component<TaskVersionProps, any> {

    @inject(TaskVersionModel)
    private taskVersionModel: TaskVersionModel;

    constructor(props) {
        super(props);
    }

    componentWillMount(): void {
        let query = {};
        const {taskId} = this.props;
        if(taskId && taskId > 0){
            query = {taskId: taskId};
        }
        this.taskVersionModel.query(query);
    }

    /**
     * 搜索参数
     */
    getSearchProps(){
        let that = this;
        return {
            taskVersionModel: that.taskVersionModel
        };
    };

    getListProps(): TaskVersionListProps {
        let that = this;
        return {
            dataSource: this.taskVersionModel.taskVersions,
            loading: this.taskVersionModel.loading,
            pageConfig:this.taskVersionModel.pageConfig,
            taskVersionModel: that.taskVersionModel
        };
    };

    getOperProps(){
        let that = this;
        return {
            taskId: that.props.taskId,
            taskVersionModel: that.taskVersionModel
        };
    };

    render() {

        let dom = null;
        let opDom = null;
        const {taskId} = this.props;
        if(!taskId || taskId <= 0){
            dom = (<Row className={"container-row-block"}>
                <Search {...this.getSearchProps()}/>
            </Row>);
            opDom = (<Row className={"op-btns-container"}>
                <TaskVersionOperation {...this.getOperProps()}/>
            </Row>);
        }
        return (
            <Row>
                {dom}
                <Row className={"container-row-block"}>
                    {opDom}
                    <Row>
                        <TaskVersionList {...this.getListProps()}/>
                    </Row>
                </Row>
            </Row>
        )
    }

}
