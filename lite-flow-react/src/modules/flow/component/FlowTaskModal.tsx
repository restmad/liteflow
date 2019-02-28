import React, {Component} from 'react'
import {Form, Modal} from 'antd'
import {FormComponentProps} from "antd/lib/form/Form";
import DagShow from "./dag/DagShow";
import {Flow, FlowModel} from "../model/FlowModel";
import {TaskModel} from "../../task/model/TaskModel";
import {kernel} from "../../../common/utils/IOC";
import TaskView from "../../task/view/TaskView";


export interface ModalProps {
    flow: Flow;
    onCancel: any;
}

class FlowTaskModal extends Component<ModalProps> {

    private taskModel: TaskModel;

    componentWillMount(){
        this.taskModel = kernel.get(TaskModel);
    }

    render() {

        let height = document.body.clientHeight  - 120;
        let width = document.body.clientWidth - 60;
        const modalOpts = {
            title: `任务流:${this.props.flow.name}`,
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
                    <TaskView flowId={this.props.flow.id}/>
                </div>
        </Modal>
        );
    }
}

export default FlowTaskModal;