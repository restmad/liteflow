import React, {Component} from 'react'
import {Form, Input, Modal, Select, Radio, DatePicker} from 'antd'
import {FormComponentProps} from "antd/lib/form/Form";
import {kernel} from "../../../common/utils/IOC"
import {TaskModel} from "../../task/model/TaskModel";
import Moment from "moment/moment";

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};
const COMMON_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

const disabledTime = (current) => {
    let tomorrow = Moment().add(1,"day");
    return current && current.isAfter(tomorrow);
}

const Option = Select.Option;

export interface ModalProps extends FormComponentProps{
    onOk: any;
    onCancel: any;
}
const filterOption= (inputValue, option) => {
    if(option.props.children.indexOf(inputValue) > -1){
        return true;
    }
    return false;
};
class TaskChooseModal extends Component<ModalProps, {allTasks}> {

    constructor(props){
        super(props);
        this.state = {allTasks: []};
    }

    componentWillMount(){
        const that = this;
       const taskModel = kernel.get(TaskModel);
       taskModel.getAllAuth().then(data => {
           that.setState({allTasks : data});
       });
    }

    render() {
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }
                const data = {
                    ...this.props.form.getFieldsValue()
                };
                let startTime = data["startTime"];
                data["startTime"] = startTime.format(COMMON_TIME_FORMAT);

                let endTime = data["endTime"];
                data["endTime"] = endTime.format(COMMON_TIME_FORMAT);

                this.props.onOk(data);
            })
        };
        const modalOpts = {
                title:  '修复任务',
                visible: true,
                maskClosable: false,
                onOk: handleOk,
                onCancel: this.props.onCancel
            };
        /**
         * 编辑是初始化select
         * @type {Array}
         */
        let taskAllOptions = [];
        const {allTasks} = this.state;
        if(allTasks){
            for(let val of allTasks){
                taskAllOptions.push(<Option key={val.id} value={val.id + ""}>{val.name}</Option>);
            }
        }



        return (<Modal {...modalOpts}>
            <Form layout={'horizontal'} >
                <Form.Item label='任务' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('taskId', {
                        rules: [
                            {
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Select
                        filterOption={filterOption}>
                        {taskAllOptions}
                    </Select>)}
                </Form.Item>
                <Form.Item  label='开始时间' hasFeedback {...formItemLayout} >
                    {this.props.form.getFieldDecorator('startTime', {
                        initialValue: "",
                        rules: [
                            {
                                required: true,
                                message: "不能为空"
                            }
                        ]
                    })(<DatePicker showTime
                                   format={COMMON_TIME_FORMAT}
                                   style={{ width: 200 }}>
                    </DatePicker>)}
                </Form.Item>
                <Form.Item  label='结束时间' hasFeedback {...formItemLayout}>
                    {this.props.form.getFieldDecorator('endTime', {
                        initialValue: "",
                        rules: [
                            {
                                required: true,
                                message: "不能为空"
                            }
                        ]
                    })(<DatePicker showTime
                                   disabledDate={disabledTime}
                                   style={{ width: 200 }}
                                   format={COMMON_TIME_FORMAT}>

                    </DatePicker>)}
                </Form.Item>
                {/*<Form.Item label='触发下游任务' hasFeedback {...formItemLayout}>*/}
                    {/*{this.props.form.getFieldDecorator('fixDownstream', {*/}
                        {/*initialValue: 0,*/}
                        {/*rules: [*/}
                            {/*{*/}
                                {/*required: true,*/}
                                {/*message: '不能为空'*/}
                            {/*}*/}
                        {/*]*/}
                    {/*})(<Radio.Group>*/}
                        {/*<Radio value={0}>不触发</Radio>*/}
                        {/*<Radio value={1}>触发</Radio>*/}
                    {/*</Radio.Group>)}*/}
                {/*</Form.Item>*/}
            </Form>
        </Modal>);
    }
}

export default Form.create()(TaskChooseModal);