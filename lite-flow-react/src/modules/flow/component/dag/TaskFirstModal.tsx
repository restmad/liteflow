import React, {Component} from 'react'
import {Form, Input, Modal, Select} from 'antd'
import {FormComponentProps} from "antd/lib/form/Form";
import {TaskModel} from "../../../task/model/TaskModel";
import {kernel} from "../../../../common/utils/IOC";

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
    onOk: any;
    onCancel: any;
}
const filterOption= (inputValue, option) => {
    if(option.props.children.indexOf(inputValue) > -1){
        return true;
    }
    return false;
};
class FirstTaskModal extends Component<ModalProps, {allTasks}> {

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

    onSearchSelect(value){
        const {allTasks} = this.state;
        if(allTasks && allTasks.length > 0){
            let tasks = allTasks.filter((d) => {
                if(d.name.indexOf(value) >= 0){
                    return true;
                }
                return false;
            });
            this.setState({allTasks: tasks })
        }

    }

    render() {
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }
                const {allTasks} = this.state;
                let taskId = this.props.form.getFieldValue("taskId");
                let task = null;
                    for(let tk of allTasks){
                        if(tk.id == taskId){
                            task = tk;
                            break;
                        }
                }
                this.props.onOk(task);
            })
        };
        const modalOpts = {
                title: '添加任务',
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
                    {this.props.form.getFieldDecorator('taskId', {
                        rules: [
                            {
                                required: true,
                                message: '不能为空'
                            }
                        ]
                    })(<Select
                        showSearch={true}
                        onSearch={this.onSearchSelect.bind(this)}
                        defaultActiveFirstOption={false}
                        filterOption={false}>
                        {taskAllOptions}
                    </Select>)}
                </Form.Item>
            </Form>
        </Modal>);
    }
}

export default Form.create()(FirstTaskModal);