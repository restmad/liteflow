import React, {Component} from 'react'
import {Form, Input, Modal, Select} from 'antd'
import {Flow} from "../model/FlowModel";
import {FormComponentProps} from "antd/lib/form/Form";

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};

const Option = Select.Option;

export interface ModalProps extends FormComponentProps{
    flow: Flow;
    onOk: any;
    onCancel: any;
}

class FlowModal extends Component<ModalProps> {
    render() {

        let isUpdate = false;
        if(this.props.flow && this.props.flow.id){
            isUpdate = true;
        }
        let flowItem = this.props.flow ? this.props.flow : new Flow;
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }
                const data = {
                    ...this.props.form.getFieldsValue(),
                    id: flowItem.id ? flowItem.id : ''
                };
                this.props.onOk(data)
            })
        };
        const FlowModalOpts = {
                title: isUpdate ? '编辑任务流' : '添加任务流',
                visible: true,
                maskClosable: false,
                onOk: handleOk,
                onCancel: this.props.onCancel,
                wrapClassName: 'vertical-center-FlowModal'
            };


        return (<Modal {...FlowModalOpts}>
            <Form layout={'horizontal'} >
                <Form.Item label='名称：' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('name', {
                        initialValue: flowItem.name,
                        rules: [
                            {
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Input disabled={isUpdate}/>)}
                </Form.Item>
                <Form.Item label='描述：' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('description', {
                        initialValue: flowItem.description,
                        rules: [
                            {
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Input.TextArea/>)}
                </Form.Item>
            </Form>
        </Modal>);
    }
}

export default Form.create()(FlowModal);