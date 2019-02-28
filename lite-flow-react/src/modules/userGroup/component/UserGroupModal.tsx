import React, {Component} from 'react'
import {Form, Input, Modal, Select} from 'antd'
import {UserGroup} from "../model/UserGroupModel";
import {FormComponentProps} from "antd/lib/form/Form";
import {UserModel} from "../../user/model/UserModel";
import {kernel} from "../../../common/utils/IOC";
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
    userGroup: UserGroup;
    onOk: any;
    onCancel: any;
}

class UserGroupModal extends Component<ModalProps, {users}> {

    constructor(props){
        super(props);
        this.state = {allUsers: []};
    }

    componentWillMount(){
        const that = this;
        const userModel = kernel.get(UserModel);
        userModel.listAllUsers().then(data => {
            if (data) {
                that.setState({
                    allUsers: data
                })
            }
        });
    }

    render() {

        let isUpdate = false;
        if(this.props.userGroup && this.props.userGroup.id){
            isUpdate = true;
        }
        let userGroupObj = this.props.userGroup ? this.props.userGroup : new UserGroup;
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }
                const data = {
                    ...this.props.form.getFieldsValue(),
                    id: userGroupObj.id ? userGroupObj.id : ''
                };
                this.props.onOk(data)
            })
        };
        const modalOpts = {
                title: isUpdate ? '编辑用户组' : '添加用户组',
                visible: true,
                onOk: handleOk,
                onCancel: this.props.onCancel
            };
        /**
         * 初始化option
         */
        let userOptions = [];
        let selectedIds = [];
        if(isUpdate && userGroupObj.users){
            selectedIds = userGroupObj.users.map(auth => auth.id + "");
        }

        if(this.state.allUsers){
            for(let val of this.state.allUsers){
                userOptions.push(<Option key={val.id}>{val.userName}</Option>);
            }
        }


        return (<Modal {...modalOpts}>
            <Form layout={'horizontal'} >
                <Form.Item label='名称' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('name', {
                        initialValue: CommonUtils.getStringValueFromModel("name", userGroupObj, ""),
                        rules: [
                            {
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label='用户' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('users', {
                        initialValue: selectedIds,
                        rules: [
                            {
                                required: false
                            }
                        ]
                    })(<Select
                        mode="multiple">
                        {userOptions}
                    </Select>)}
                </Form.Item>
                <Form.Item label='描述' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('description', {
                        initialValue: CommonUtils.getStringValueFromModel("description", userGroupObj, ""),
                        rules: [
                            {
                                required: false,
                                message: '不能为空'
                            }
                        ]
                    })(<Input.TextArea/>)}
                </Form.Item>
            </Form>
        </Modal>);
    }
}

export default Form.create()(UserGroupModal);