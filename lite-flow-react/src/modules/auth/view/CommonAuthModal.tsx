import React, {Component} from 'react'
import {Form, Modal} from 'antd'
import {TaskModel} from "../../task/model/TaskModel";
import {kernel} from "../../../common/utils/IOC";
import AuthView from "./AuthView";

export interface ModalProps {
    model: any;
    targetType: number;
    onCancel: any;
}

class CommonAuthModal extends Component<ModalProps> {

    private taskModel: TaskModel;

    componentWillMount(){
        this.taskModel = kernel.get(TaskModel);
    }

    render() {

        let height = document.body.clientHeight  - 109;
        let width = document.body.clientWidth - 200;
        const modalOpts = {
            title: `${this.props.model.name}权限`,
            visible: true,
            maskClosable: false,
            width: width,
            style: {top: 10, height: height},
            footer: "",
            onCancel: this.props.onCancel
        };


        return (
        <Modal {...modalOpts}>
                <div>
                    <AuthView targetId={this.props.model.id} targetType={this.props.targetType}/>
                </div>
        </Modal>
        );
    }
}

export default CommonAuthModal;