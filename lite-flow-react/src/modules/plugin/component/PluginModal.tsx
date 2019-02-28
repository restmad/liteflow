import React, {Component} from 'react'
import {Form, Input, Modal, Select, Row, Col} from 'antd'
import {Plugin} from "../model/PluginModel";
import {ContainerModel} from "../../container/model/ContainerModel"
import {FormComponentProps} from "antd/lib/form/Form";
import {kernel} from "../../../common/utils/IOC"
import CommonUtils from "../../../common/utils/CommonUtils";

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

const modalWidth = 800;

export interface ModalProps extends FormComponentProps{
    plugin: Plugin;
    onOk: any;
    onCancel: any;
}

class PluginModal extends Component<ModalProps, {allContainers}> {

    constructor(props){
        super(props);
        this.state = {allContainers: []}
    }
    componentWillMount(){
        const that = this;
        const containerModel = kernel.get(ContainerModel);
        containerModel.listAllContainers().then(data => {
            if (data) {
                that.setState({
                    allContainers: data
                })
            }
        });
    }

    render() {

        let isUpdate = false;
        if(this.props.plugin && this.props.plugin.id){
            isUpdate = true;
        }
        let pluginItem = this.props.plugin ? this.props.plugin : new Plugin;
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }
                const data = {
                    ...this.props.form.getFieldsValue(),
                    id: pluginItem.id ? pluginItem.id : ''
                };
                this.props.onOk(data)
            })
        };
        const modalOpts = {
                title: isUpdate ? '编辑插件' : '添加插件',
                visible: true,
                maskClosable: false,
                width: modalWidth,
                onOk: handleOk,
                onCancel: this.props.onCancel
            };

        /**
         * 初始化option
         */
        let containerOptions = [];

        if (this.state.allContainers) {
            for(let val of this.state.allContainers){
                containerOptions.push(<option key={val.id + ""  }>{val.name}</option>);
            }
        }


        return (<Modal {...modalOpts}>
            <Form layout={'horizontal'} >
                <Row >
                    <Col span={12}>
                        <Form.Item label='名称：' hasFeedback {...formItemLayout}>
                            {this.props.form.getFieldDecorator('name', {
                                initialValue: CommonUtils.getStringValueFromModel("name", pluginItem, ""),
                                rules: [
                                    {
                                        required: true,
                                        message: '不能为空'
                                    }
                                ]
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label='容器' hasFeedback {...formItemLayout}>
                            {this.props.form.getFieldDecorator('containerId', {
                                initialValue: CommonUtils.getStringValueFromModel("containerId", pluginItem, ""),
                                rules: [
                                    {
                                        required: true,
                                        message: '不能为空'
                                    }
                                ]
                            })(<Select>
                                {containerOptions}
                            </Select>)}
                        </Form.Item>
                        <Form.Item label='描述：' hasFeedback {...formItemLayout}>
                            {this.props.form.getFieldDecorator('description', {
                                initialValue: CommonUtils.getStringValueFromModel("description", pluginItem, ""),
                                rules: [
                                    {
                                        required: false,
                                        message: '不能为空'
                                    }
                                ]
                            })(<Input.TextArea rows={6}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='参数' hasFeedback {...formItemLayout}>
                            {this.props.form.getFieldDecorator('fieldConfig', {
                                initialValue: CommonUtils.getStringValueFromModel("fieldConfig", pluginItem, ""),
                                rules: [
                                    {
                                        required: false,
                                        message: '不能为空'
                                    }
                                ]
                            })(<Input.TextArea rows={20}/>)}
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Modal>);
    }
}

export default Form.create()(PluginModal);