import React, {Component} from 'react'
import {Form, Input, Modal, Select} from 'antd'
import {Role} from "../model/RoleModel";
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
    role: Role;
    onOk: any;
    onCancel: any;
    allAuths: any;
}

class RoleModal extends Component<ModalProps> {
    render() {

        let isUpdate = false;
        if(this.props.role && this.props.role.id){
            isUpdate = true;
        }
        let roleItem = this.props.role ? this.props.role : new Role;
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }
                const data = {
                    ...this.props.form.getFieldsValue(),
                    id: roleItem.id ? roleItem.id : ''
                };
                this.props.onOk(data)
            })
        };
        const modalOpts = {
                title: isUpdate ? '编辑角色' : '添加角色',
                visible: true,
                onOk: handleOk,
                onCancel: this.props.onCancel
            };
        /**
         * 编辑是初始化select
         * @type {Array}
         */
        let authsAllOptions = [];
        let authsDefaultValues = [];
        if(isUpdate && roleItem.auths){
            authsDefaultValues = roleItem.auths.map(auth => auth.id + "");
        }

        if(this.props.allAuths){
            for(let val of this.props.allAuths){
                authsAllOptions.push(<Option key={val.id}>{val.name}</Option>);
            }
        }


        return (<Modal {...modalOpts}>
            <Form layout={'horizontal'} >
                <Form.Item label='名称：' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('name', {
                        initialValue: roleItem.name,
                        rules: [
                            {
                                required: true,
                                message: '名称'
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label='描述：' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('description', {
                        initialValue: roleItem.description,
                        rules: [
                            {
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label='权限：' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('auths', {
                        initialValue: authsDefaultValues,
                        rules: [
                            {
                                required: false
                            }
                        ]
                    })(<Select
                        mode="multiple">
                        {authsAllOptions}
                    </Select>)}
                </Form.Item>
            </Form>
        </Modal>);
    }
}

export default Form.create()(RoleModal);