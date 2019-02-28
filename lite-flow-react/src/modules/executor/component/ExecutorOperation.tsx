import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {ExecutorSearchParam, Executor, ExecutorModel} from "../model/ExecutorModel";
import {FormComponentProps} from "antd/lib/form/Form";
import ExecutorModal from "./ExecutorModal";

export interface ExecutorOperProps extends FormComponentProps {
    executorModel: ExecutorModel
}

class ExecutorOperation extends Component<ExecutorOperProps, {showModal}> {

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
            executor: new Executor(),
            onOk: function (executor: Executor) {
                that.props.executorModel.add(executor);
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
                {this.state.showModal ? <ExecutorModal {...this.getModalProps()}/> : ''}
            </Row>);
    }
}
export default Form.create()(ExecutorOperation);
