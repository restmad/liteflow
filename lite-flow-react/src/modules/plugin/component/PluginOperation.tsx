import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {Plugin, PluginModel} from "../model/PluginModel";
import {FormComponentProps} from "antd/lib/form/Form";
import PluginModal from "./PluginModal";

export interface PluginOperProps extends FormComponentProps {
    pluginModel: PluginModel
}

class PluginOperation extends Component<PluginOperProps, {showModal}> {

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
            plugin: new Plugin(),
            onOk: function (plugin: Plugin) {
                that.props.pluginModel.add(plugin);
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
                {this.state.showModal ? <PluginModal {...this.getModalProps()}/> : ''}
            </Row>);
    }
}
export default Form.create()(PluginOperation);
