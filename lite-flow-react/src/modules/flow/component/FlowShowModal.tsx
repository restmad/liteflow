import React, {Component} from 'react'
import {Form, Modal} from 'antd'
import {FormComponentProps} from "antd/lib/form/Form";
import DagShow from "./dag/DagShow";
import {Flow, FlowModel} from "../model/FlowModel";
import {TaskModel} from "../../task/model/TaskModel";
import {kernel} from "../../../common/utils/IOC";


export interface ModalProps extends FormComponentProps {
    flowModel: FlowModel;
    flow: Flow;
    onCancel: any;
}

class FlowShowModal extends Component<ModalProps> {

    private taskModel: TaskModel;

    componentWillMount(){
        this.taskModel = kernel.get(TaskModel);
    }

    render() {

        let height = document.body.clientHeight  - 110;
        let width = document.body.clientWidth - 60;
        const modalOpts = {
            title: `任务流:${this.props.flow.name}`,
            visible: true,
            width: width,
            style: {top: 10, height: height},
            footer: "",
            onCancel: this.props.onCancel
        };

        let dagProps = () => {
            let that = this;
            return {
                data: this.props.flow,
                height: height,
                isFlow: true,
                getAllTask(){
                    return that.taskModel.getAllAuth();
                },
                getViewData(id){
                    return that.props.flowModel.viewDag(id);
                },
                updateLinks(id, links){
                    return that.props.flowModel.addOrUpdateLinks(id, links);
                }
            }
        }

        return (
        <Modal {...modalOpts}>
                <div>
                    <DagShow {...dagProps()}></DagShow>
                </div>
        </Modal>
        );
    }
}

export default Form.create()(FlowShowModal);