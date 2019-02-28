import React, {Component} from 'react';
import {observer} from "mobx-react";
import {inject} from '../../../common/utils/IOC';
import {TaskInstanceModel} from "../model/TaskInstanceModel";
import {Row} from 'antd'
import {TaskInstanceList, TaskInstanceListProps} from "../component/TaskInstacneList";

export interface TaskInstanceProps {
    taskVersionId : number;
}

@observer
export default class TaskInstanceView extends Component<TaskInstanceProps, any> {

    @inject(TaskInstanceModel)
    private taskInstanceModel: TaskInstanceModel;

    constructor(props) {
        super(props);
    }

    componentWillMount(): void {
        let query = {};
        const {taskVersionId} = this.props;
        if(taskVersionId && taskVersionId > 0){
            query = {taskVersionId: taskVersionId};
        }
        this.taskInstanceModel.query(query);
    }

    /**
     * 搜索参数
     */
    getSearchProps(){
        let that = this;
        return {
            taskInstanceModel: that.taskInstanceModel
        };
    };

    getListProps(): TaskInstanceListProps {
        let that = this;
        return {
            dataSource: this.taskInstanceModel.taskInstances,
            loading: this.taskInstanceModel.loading,
            pageConfig:this.taskInstanceModel.pageConfig,
            taskInstanceModel: this.taskInstanceModel
        };
    };

    render() {

        let dom = null;
        let opDom = null;
        return (
            <Row>
                {dom}
                <Row className={"container-row-block"}>
                    {opDom}
                    <Row>
                        <TaskInstanceList {...this.getListProps()}/>
                    </Row>
                </Row>
            </Row>
        )
    }

}
