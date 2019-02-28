import React, {Component} from 'react'
import {Form, Input, Modal, Select} from 'antd'
import {TaskVersion} from "../model/TaskVersionModel";
import {FormComponentProps} from "antd/lib/form/Form";

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};
export interface ModalProps extends FormComponentProps{
    taskVersion: TaskVersion;
    onOk: any;
    onCancel: any;
}

class TaskVersionModal extends Component<ModalProps> {
    render() {
        let isUpdate = false;
        if(this.props.taskVersion && this.props.taskVersion.id){
            isUpdate = true;
        }
        let taskVersionItem = this.props.taskVersion ? this.props.taskVersion : new TaskVersion;
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }
                const data = {
                    ...this.props.form.getFieldsValue(),
                    id: taskVersionItem.id ? taskVersionItem.id : ''
                };
                this.props.onOk(data)
            })
        };
        const modalOpts = {
                title: isUpdate ? '编辑任务流' : '添加任务流',
                visible: true,
                maskClosable: false,

                onOk: handleOk,
                onCancel: this.props.onCancel
            };


        return (<Modal {...modalOpts}>
        </Modal>);
    }
}

export default Form.create()(TaskVersionModal);