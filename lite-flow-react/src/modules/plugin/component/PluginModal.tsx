import React, {Component} from 'react'
import {Form, Input, Modal, Select, Row, Col} from 'antd'
import {Plugin} from "../model/PluginModel";
import {ContainerModel} from "../../container/model/ContainerModel"
import {FormComponentProps} from "antd/lib/form/Form";
import {kernel} from "../../../common/utils/IOC"
import CommonUtils from "../../../common/utils/CommonUtils";
import {DynamicFormUtils} from "../../../common/utils/DynamicFormUtils";
import EnumUtils from "../../../common/utils/EnumUtils";

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

const modalWidth = 800;

const FIELD_CONFIG_MAP = "fieldConfigMap";

const FIELD_CONFIG = "fieldConfig";

const CONFIG = "config";

const CONFIG_PREFIX = CONFIG + ".";

const NAME = "name";

const LABEL = "label";

export interface ModalProps extends FormComponentProps{
    plugin: Plugin;
    onOk: any;
    onCancel: any;
}

class PluginModal extends Component<ModalProps, {allContainers, addedFieldConfigs, selectedFields}> {

    constructor(props){
        super(props);
        this.state = {
            allContainers: [],
            addedFieldConfigs: [],
            selectedFields: []
        }
    }
    componentWillMount(){
        const that = this;
        const containerModel = kernel.get(ContainerModel);
        containerModel.listAllContainers().then(data => {
            if (data && data.length > 1) {
                for(let container of data){
                    let containerFieldConfigs = container.fieldConfig;
                    if(containerFieldConfigs){
                        let formFieldMap = {};
                        for(let containerField of containerFieldConfigs ){
                            const name = containerField[NAME];
                            containerField[NAME] = CONFIG_PREFIX + name;
                            formFieldMap[name] = containerField;
                            container[FIELD_CONFIG_MAP] = formFieldMap;
                        }
                    }
                }
                console.log(data);
                that.setState({
                    allContainers: data
                })
            }
        });

        const plugin = this.props.plugin;
        if(plugin && plugin.config){
            const selectedOption = [];
            for(let configKey in plugin.config){
                selectedOption.push(configKey + "");
            }
            this.setState({selectedFields: selectedOption});
        }
    }

    render() {

        let isUpdate = false;
        if(this.props.plugin && this.props.plugin.id){
            isUpdate = true;
        }
        let pluginItem = this.props.plugin ? this.props.plugin : new Plugin();
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
                let config = data[CONFIG];
                if(config){
                    data[CONFIG] = JSON.stringify(config);
                }else{
                    data[CONFIG] = "";
                }

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
        const {selectedFields, addedFieldConfigs, allContainers} = this.state;

        let containerOptions = [];
        if (allContainers) {
            for(let container of allContainers){
                containerOptions.push(<option key={container.id + ""  }>{container.name}</option>);
            }
        }


        /**
         * containerFieldOption
         */
        let containerFieldOptions = [];
        let pluginAddedFieldConfig = [];

        let pluginConf = pluginItem.config;

        if (allContainers && pluginConf) {

            for(let container of allContainers){
                containerOptions.push(<option key={container.id + ""  }>{container.name}</option>);
                if(container.id == pluginItem.containerId){
                    const containerFieldConfigArray = container[FIELD_CONFIG];
                    if(containerFieldConfigArray && containerFieldConfigArray.length > 0){
                        for(let fcConfig of containerFieldConfigArray){
                            const name = fcConfig[NAME];
                            const lable = fcConfig[LABEL];

                            const fieldValue = CommonUtils.getValueFromModel(name, pluginConf, null);
                            if(fieldValue != null){
                                pluginAddedFieldConfig.push(fcConfig);
                            }
                            containerFieldOptions.push(<option key={name + ""  }>{lable}</option>);
                        }
                    }
                    break;
                }
            }
        }

        let dynamicDoms = [];
        const isDomEdit = isUpdate && pluginItem["status"] == EnumUtils.statusOnline;
        if(pluginAddedFieldConfig){
            for(let formField of pluginAddedFieldConfig){
                let dom = DynamicFormUtils.getComponent({
                    property: formField,
                    model: pluginConf,
                    isEdit: isDomEdit,
                    formParent: this
                });
                if(dom){
                    dynamicDoms.push(dom);
                }
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
                        <Form.Item label='容器参数' hasFeedback {...formItemLayout}>
                            {this.props.form.getFieldDecorator('containerFields', {
                                initialValue: selectedFields,
                                rules: [
                                    {
                                        required: false,
                                        message: '不能为空'
                                    }
                                ]
                            })(<Select>
                                {containerFieldOptions}
                            </Select>)}
                        </Form.Item>
                        {dynamicDoms}
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