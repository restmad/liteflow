import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {UserGroup, UserGroupModel} from "../model/UserGroupModel";
import {FormComponentProps} from "antd/lib/form/Form";
import UserGroupModal from "./UserGroupModal";

export interface UserGroupOperProps extends FormComponentProps {
    userGroupModel: UserGroupModel
}

class UserGroupOperation extends Component<UserGroupOperProps, {showModal}> {

    constructor(props) {
        super(props);
        this.state = {showModal: false}
    }

    showAddModal(){
        let that = this;
        that.setState({
            showModal: true
        });
    }

    hideAddModal(){
        this.setState({
            showModal: false
        });
    }
    getModalProps(){
        let that = this;
        return {
            userGroup: new UserGroup(),
            onOk: function (userGroup: UserGroup) {
                that.props.userGroupModel.add(userGroup);
                that.hideAddModal();
            },
            onCancel() {
                that.hideAddModal();
            }
        };
    };

    render() {
        return (<Row>
                <Button type='ghost' onClick={this.showAddModal.bind(this)}>添加</Button>
                {this.state.showModal ? <UserGroupModal {...this.getModalProps()}/> : ''}
            </Row>);
    }
}
export default Form.create()(UserGroupOperation);
