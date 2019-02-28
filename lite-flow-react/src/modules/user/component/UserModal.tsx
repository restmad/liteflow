import React, {Component} from 'react'
import {Form, Input, Modal, Select, Radio} from 'antd'
import {User} from "../model/UserModel";
import {FormComponentProps} from "antd/lib/form/Form";
import CommonUtils from "../../../common/utils/CommonUtils";

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
    user: User;
    onOk: any;
    onCancel: any;
    allRoles: any;
}

class UserModal extends Component<ModalProps, any> {
    render() {
        let isUpdate = false;
        if(this.props.user && this.props.user.id){
            isUpdate = true;
        }

        let userObj = this.props.user ? this.props.user : new User;
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }
                const data = {
                    ...this.props.form.getFieldsValue(),
                    id: userObj.id ? userObj.id : ''
                };
                this.props.onOk(data)
            })
        };
        const modalOpts = {
                title: isUpdate ? '修改用户': '添加用户' ,
                visible: true,
                onOk: handleOk,
                onCancel: this.props.onCancel
            };
        /**
         * 初始化select
         * @type {Array}
         */
        let rolesAllOptions = [];
        let rolesDefaultValues = [];
        if(isUpdate && userObj.roles){
            rolesDefaultValues = userObj.roles.map(auth => auth.id + "");
        }

        if(this.props.allRoles){
            for(let val of this.props.allRoles){
                rolesAllOptions.push(<Option key={val.id} value={val.id + ""}>{val.name}</Option>);
            }
        }

        return (<Modal {...modalOpts}>
            <Form layout={'horizontal'} >
                <Form.Item label='用户名' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('name', {
                        initialValue: CommonUtils.getValueFromModel("name", userObj, ""),
                        rules: [
                            {
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label='手机号' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('mobile', {
                        initialValue: CommonUtils.getValueFromModel("mobile", userObj, ""),
                        rules: [
                            {
                                pattern: /^1[34578]\d{9}$/,
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label='邮箱' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('email', {
                        initialValue: CommonUtils.getValueFromModel("email", userObj, ""),
                        rules: [
                            {
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label='是否超管' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('isSuper', {
                        initialValue: CommonUtils.getValueFromModel("isSuper", userObj, 0),
                        rules: [
                            {
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Radio.Group>
                        <Radio value={0}>否</Radio>
                        <Radio value={1}>是</Radio>
                    </Radio.Group>)}
                </Form.Item>
                <Form.Item label='角色' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('roles', {
                        initialValue: rolesDefaultValues,
                        rules: [
                            {
                                required: false
                            }
                        ]
                    })(<Select
                        mode="multiple">
                        {rolesAllOptions}
                    </Select>)}
                </Form.Item>
            </Form>
        </Modal>);
    }
}

export default Form.create()(UserModal);