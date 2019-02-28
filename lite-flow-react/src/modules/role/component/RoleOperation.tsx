import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {Role, RoleModel} from "../model/RoleModel";
import {FormComponentProps} from "antd/lib/form/Form";
import RoleModal from "./RoleModal";

export interface RoleOperProps extends FormComponentProps {
    roleModel: RoleModel
}

class RoleOperation extends Component<RoleOperProps, {showModal, allAuths}> {

    constructor(props) {
        super(props);
        this.state = {showModal: false, allAuths: []}
    }

    showAddModal(){
        let that = this;
        this.props.roleModel.listAuths().then((data) => {
            that.setState({
                allAuths: data,
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
            role: new Role(),
            allAuths: that.state.allAuths,
            onOk: function (role: Role) {
                that.props.roleModel.add(role);
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
                {this.state.showModal ? <RoleModal {...this.getModalProps()}/> : ''}
            </Row>);
    }
}
export default Form.create()(RoleOperation);
