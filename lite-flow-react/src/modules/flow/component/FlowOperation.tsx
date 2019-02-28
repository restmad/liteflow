import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {FlowSearchParam, Flow, FlowModel} from "../model/FlowModel";
import {FormComponentProps} from "antd/lib/form/Form";
import FlowModal from "./FlowModal";

export interface FlowOperProps extends FormComponentProps {
    flowModel: FlowModel
}

class FlowOperation extends Component<FlowOperProps, {showModal}> {

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
            flow: new Flow(),
            onOk: function (flow: Flow) {
                that.props.flowModel.add(flow);
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
                {this.state.showModal ? <FlowModal {...this.getModalProps()}/> : ''}
            </Row>);
    }
}
export default Form.create()(FlowOperation);
