import React, {Component} from 'react'
import {Form, Input, Modal, Select, Row, Col, Radio} from 'antd'
import {Auth} from "../model/AuthModel";
import {FormComponentProps} from "antd/lib/form/Form";
import {kernel} from "../../../common/utils/IOC"
import CommonUtils from "../../../common/utils/CommonUtils";
import {UserModel} from "../../user/model/UserModel";
import {UserGroupModel} from "../../userGroup/model/UserGroupModel";

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};

export interface ModalProps extends FormComponentProps{
    auth: Auth;
    onOk: any;
    targetType: number;
    targetId: number;
    onCancel: any;
}

class AuthModal extends Component<ModalProps, {users, groups, sourceType}> {

    constructor(props) {
        super(props);
        this.state = {users: [], groups: [], sourceType: 1}
    }

    componentWillMount(){
        const that = this;
        const userModel = kernel.get(UserModel);
        userModel.listAllUsers().then(data => {
            if (data) {
                that.setState({
                    users: data
                })
            }
        });
        const userGroupModel = kernel.get(UserGroupModel);
        userGroupModel.listAllGroups().then(data => {
            if (data) {
                that.setState({
                    groups: data
                })
            }
        });
    }


    /**
     * 类型
     * @param object
     */
    onTypeChange(object) {
        this.setState({
            sourceType: object.target.value
        });
    }
    render() {

        let isUpdate = false;
        if(this.props.auth && this.props.auth.id){
            isUpdate = true;
        }
        let authObj = this.props.auth ? this.props.auth : new Auth;
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }
                const data = {
                    ...this.props.form.getFieldsValue(),
                    targetType: this.props.targetType,
                    targetId: this.props.targetId,
                    id: authObj.id ? authObj.id : ''
                };
                this.props.onOk(data)
            })
        };
        const modalOpts = {
                title: isUpdate ? '编辑权限' : '添加权限',
                visible: true,
                maskClosable: false,
                onOk: handleOk,
                onCancel: this.props.onCancel
        };

        const {users, groups, sourceType} = this.state;
        let array = users;
        let sourceTypeName = "用户";
        if(sourceType == 2){
            sourceTypeName = "用户组";
            array = groups;
        }
        const options = [];
        if(array && array.length > 0){
            if(sourceType == 1) {
                for (let item of array) {
                    options.push(<Select.Option key={"" + item.id}
                                                value={"" + item.id}>{item.name}</Select.Option>);
                }
            } else {
                for (let item of array) {
                    options.push(<Select.Option key={"" + item.id}
                                                value={"" + item.id}>{item.name}</Select.Option>);
                }
            }
        }
        const selectDom = <Form.Item label={sourceTypeName} hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator("sourceId", {
                initialValue: CommonUtils.getStringValueFromModel("sourceId", authObj, ""),
                rules: [
                    {
                        required: true,
                        message: '不能为空'
                    }
                ]
            })(<Select disabled={isUpdate}>
                {options}
            </Select>)}
        </Form.Item>;


        return (<Modal {...modalOpts}>
            <Form layout={'horizontal'} >
                <Form.Item label='类型' {...formItemLayout} help={"权限类型"}>
                    {this.props.form.getFieldDecorator('sourceType', {
                        initialValue: CommonUtils.getValueFromModel("sourceType", authObj, 1),
                        rules: [
                            {
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Radio.Group onChange={this.onTypeChange.bind(this)} disabled={isUpdate}>
                        <Radio value={1}>用户</Radio>
                        <Radio value={2}>用户组</Radio>
                    </Radio.Group>)}
                </Form.Item>
                {selectDom}
                <Form.Item label='执行权限' {...formItemLayout}>
                    {this.props.form.getFieldDecorator('hasExecuteAuth', {
                        initialValue: CommonUtils.getValueFromModel("hasExecuteAuth", authObj, 0),
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
                <Form.Item label='编辑权限' {...formItemLayout}>
                    {this.props.form.getFieldDecorator('hasEditAuth', {
                        initialValue: CommonUtils.getValueFromModel("hasEditAuth", authObj, 0),
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
            </Form>
        </Modal>);
    }
}

export default Form.create()(AuthModal);