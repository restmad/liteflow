import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import { User, UserModel} from "../model/UserModel";
import {FormComponentProps} from "antd/lib/form/Form";
import UserModal from "./UserModal";

export interface UserOperProps extends FormComponentProps {
    userModel: UserModel;
}

class UserOperation extends Component<UserOperProps, {showModal,  allRoles}> {

    constructor(props) {
        super(props);
        this.state = {showModal: false, allRoles: []}
    }


    showAddModal(){
        let that = this;
        this.props.userModel.listAllRoles().then((data) => {
            that.setState({
                allRoles: data,
                showModal: true
            });
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
            user: new User(),
            allRoles: that.state.allRoles,
            onOk: function (user: User) {
                that.props.userModel.add(user);
                that.hideAddModal();
            },
            onCancel() {
                that.hideAddModal();
            }
        };
    };

    render() {
        return (
            <Row>
                <Button type='ghost' onClick={this.showAddModal.bind(this)}>添加</Button>
                {this.state.showModal ? <UserModal {...this.getModalProps()}/> : ''}
            </Row>
        );
    }
}
export default Form.create()(UserOperation);
