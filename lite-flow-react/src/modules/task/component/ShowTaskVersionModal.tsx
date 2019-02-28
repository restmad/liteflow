import React, {Component} from 'react'
import {Form, Modal} from 'antd'
import {Task, TaskModel} from "../../task/model/TaskModel";
import {kernel} from "../../../common/utils/IOC";
import TaskView from "../../task/view/TaskView";
import TaskVersionView from "../../taskVersion/view/TaskVersionView";


export interface ModalProps {
    task: Task;
    onCancel: any;
}

class ShowTaskVersionModal extends Component<ModalProps> {

    private taskModel: TaskModel;

    componentWillMount(){
        this.taskModel = kernel.get(TaskModel);
    }

    render() {

        let height = document.body.clientHeight  - 110;
        let width = document.body.clientWidth - 60;
        const modalOpts = {
            title: `任务:${this.props.task.name}`,
            visible: true,
            width: width,
            maskClosable: false,
            style: {top: 10, height: height},
            footer: "",
            onCancel: this.props.onCancel
        };


        return (
        <Modal {...modalOpts}>
                <div>
                    <TaskVersionView taskId={this.props.task.id}/>
                </div>
        </Modal>
        );
    }
}

export default ShowTaskVersionModal;