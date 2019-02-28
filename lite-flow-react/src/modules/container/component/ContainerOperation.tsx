import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {ContainerSearchParam, Container, ContainerModel} from "../model/ContainerModel";
import {FormComponentProps} from "antd/lib/form/Form";
import ContainerModal from "./ContainerModal";

export interface ContainerOperProps extends FormComponentProps {
    containerModel: ContainerModel
}

class ContainerOperation extends Component<ContainerOperProps, {showModal}> {

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
            container: new Container(),
            onOk: function (container: Container) {
                that.props.containerModel.add(container);
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
                {this.state.showModal ? <ContainerModal {...this.getModalProps()}/> : ''}
            </Row>);
    }
}
export default Form.create()(ContainerOperation);
