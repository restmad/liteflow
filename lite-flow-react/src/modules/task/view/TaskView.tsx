import React, {Component} from 'react';
import {observer} from "mobx-react";
import {inject} from '../../../common/utils/IOC';
import {TaskModel, TaskSearchParam, Task} from "../model/TaskModel";
import Search, {TaskSearchProps} from "../component/TaskSearch";
import {Row} from 'antd'
import {TaskList, TaskListProps} from "../component/TaskList";
import TaskOperation, {TaskOperProps} from "../component/TaskOperation";

@observer
export default class TaskView extends Component<any, any> {

    @inject(TaskModel)
    private taskModel: TaskModel;

    constructor(props) {
        super(props);
    }

    componentWillMount(): void {
        let query = {};
        const {flowId} = this.props;
        if(flowId && flowId > 0){
            query = {flowId: flowId};
        }
        this.taskModel.query(query);
    }

    /**
     * 搜索参数
     */
    getSearchProps(){
        let that = this;
        return {
            taskModel: that.taskModel
        };
    };

    getListProps(): TaskListProps {
        let that = this;
        return {
            dataSource: this.taskModel.tasks,
            loading: this.taskModel.loading,
            pageConfig:this.taskModel.pageConfig,
            taskModel: that.taskModel
        };
    };

    getOperProps(){
        let that = this;
        return {
            taskModel: that.taskModel
        };
    };

    render() {

        let dom = null;
        let opDom = null;

        const {flowId} = this.props;

        if(!flowId || flowId <= 0){
            dom = (<Row className={"container-row-block"}>
                <Search {...this.getSearchProps()}/>
            </Row>);
            opDom = ( <Row className={"op-btns-container"}>
                <TaskOperation {...this.getOperProps()}/>
            </Row>);
        }

        return (
            <Row>
                {dom}
                <Row className={"container-row-block"}>
                    {opDom}
                    <Row>
                        <TaskList {...this.getListProps()}/>
                    </Row>
                </Row>
            </Row>
        )
    }

}
