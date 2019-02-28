import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import { TaskVersion, TaskVersionModel} from "../model/TaskVersionModel";
import {FormComponentProps} from "antd/lib/form/Form";
import FixModal from "./FixModal";

export interface TaskVersionOperProps extends FormComponentProps {
    taskVersionModel: TaskVersionModel;
    taskId ?: number;
}

class TaskVersionOperation extends Component<TaskVersionOperProps, {showModal}> {

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
            taskVersion: new TaskVersion(),
            onOk: function (data) {
                that.props.taskVersionModel.fixRange(data);
                that.hideAddModal();
            },
            onCancel() {
                that.hideAddModal();
            }
        };
    };

    render() {
        return (<Row>
                <Button type='ghost'  className={"margin-right5"}  onClick={this.showAddModal.bind(this)}>修复</Button>
                {this.state.showModal ? <FixModal {...this.getModalProps()}/> : ''}
            </Row>);
    }
}
export default Form.create()(TaskVersionOperation);
