import React, {Component} from 'react'
import {Form, Input, Modal, Select} from 'antd'
import {FormComponentProps} from "antd/lib/form/Form";
import {kernel} from "../../../../common/utils/IOC"
import {TaskModel} from "../../../task/model/TaskModel";

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};

const Option = Select.Option;

export interface ModalProps extends FormComponentProps{
    task: any;
    onOk: any;
    onCancel: any;
    isUp: false;
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
                let taskIds = this.props.form.getFieldValue("taskIds");
                let tasks = [];
                const {allTasks} = this.state;
                for(let tid of taskIds){
                    for(let tk of allTasks){
                        if(tk.id == tid){
                            tasks.push(tk);
                            break;
                        }
                    }
                }
                this.props.onOk(this.props.task, tasks);
            })
        };
        const modalOpts = {
                title: this.props.isUp ? '添加上游' : '添加下游',
                visible: true,
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
                    {this.props.form.getFieldDecorator('taskIds', {
                        rules: [
                            {
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Select
                        filterOption={filterOption}
                        mode="multiple">
                        {taskAllOptions}
                    </Select>)}
                </Form.Item>
            </Form>
        </Modal>);
    }
}

export default Form.create()(TaskChooseModal);