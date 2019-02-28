import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {TaskSearchParam, Task, TaskModel} from "../model/TaskModel";
import {FormComponentProps} from "antd/lib/form/Form";
import TaskModal from "./TaskModal";

export interface TaskOperProps extends FormComponentProps {
    taskModel: TaskModel
}

class TaskOperation extends Component<TaskOperProps, {showModal}> {

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
            task: new Task(),
            onOk: function (task: Task) {
                that.props.taskModel.add(task);
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
                {this.state.showModal ? <TaskModal {...this.getModalProps()}/> : ''}
            </Row>);
    }
}
export default Form.create()(TaskOperation);
