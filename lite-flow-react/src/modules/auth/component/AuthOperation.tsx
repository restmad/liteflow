import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {Auth, AuthModel} from "../model/AuthModel";
import {FormComponentProps} from "antd/lib/form/Form";
import AuthModal from "./AuthModal";

export interface AuthOperProps extends FormComponentProps {
    authModel: AuthModel;
    targetId: number;
    targetType: number;
}

class AuthOperation extends Component<AuthOperProps, {showModal}> {

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
            auth: new Auth(),
            targetId: this.props.targetId,
            targetType: this.props.targetType,
            onOk: function (auth: Auth) {
                that.props.authModel.add(auth);
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
                {this.state.showModal ? <AuthModal {...this.getModalProps()}/> : ''}
            </Row>);
    }
}
export default Form.create()(AuthOperation);
