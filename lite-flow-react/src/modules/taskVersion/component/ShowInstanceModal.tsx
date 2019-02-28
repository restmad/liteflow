import React, {Component} from 'react'
import {Form, Modal} from 'antd'
import {TaskModel} from "../../task/model/TaskModel";
import {kernel} from "../../../common/utils/IOC";
import {TaskVersion} from "../model/TaskVersionModel";
import {TaskVersionListProps} from "./TaskVersionList";
import {TaskInstanceModel} from "../model/TaskInstanceModel";
import {TaskInstanceList, TaskInstanceListProps} from "./TaskInstacneList";
import TaskInstanceView from "../view/TaskInstanceView";


export interface ModalProps {
    taskVersion: TaskVersion;
    onCancel: any;
}

class ShowInstanceModal extends Component<ModalProps> {

    constructor(props){
        super(props);
    }

    render() {

        let height = document.body.clientHeight  - 110;
        let width = document.body.clientWidth - 60;
        const modalOpts = {
            title: `实例信息`,
            visible: true,
            width: width,
            maskClosable: false,
            style: {top: 10, height: height},
            footer: "",
            onCancel: this.props.onCancel
        };


        const {taskVersion} = this.props;
        return (
        <Modal {...modalOpts}>
                <div>
                    <TaskInstanceView taskVersionId={taskVersion.id}/>
                </div>
        </Modal>
        );
    }
}

export default ShowInstanceModal;