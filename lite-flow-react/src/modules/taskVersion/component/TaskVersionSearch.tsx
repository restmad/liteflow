import React, {Component} from 'react'
import {Button, Form, Input, Select, Row} from 'antd'
import {TaskVersionSearchParam, TaskVersion, TaskVersionModel} from "../model/TaskVersionModel";
import {FormComponentProps} from "antd/lib/form/Form";
import {DomUtils} from "../../../common/utils/DomUtils";
import EnumUtils from "../../../common/utils/EnumUtils";

export interface TaskVersionSearchProps extends FormComponentProps {
    taskModel: TaskVersionModel,
}
const selectLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    },
    style: {
        width: 166
    }
};
class TaskVersionSearch extends Component<TaskVersionSearchProps, {}> {

    constructor(props) {
        super(props);
        this.state = {showModal: false}
    }
    /**
     * 获取周期
     * @returns {any[]}
     */
    getStatusOptions() {
        const status = EnumUtils.getTaskVersionStatusOptionArray();
        let options = DomUtils.getSelectOptionsWithAll(status);
        return options;
    }
    getFinalStatusOptions() {
        const status = EnumUtils.getTaskVersionFinalStatusOptionArray();
        let options = DomUtils.getSelectOptionsWithAll(status);
        return options;
    }

    render() {


        let finalStatusOptions = this.getFinalStatusOptions();
        let statusOptions = this.getStatusOptions();

        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }

                let data = new TaskVersionSearchParam();
                data.status = this.props.form.getFieldValue('status');
                data.finalStatus = this.props.form.getFieldValue("finalStatus");
                data.taskId = this.props.form.getFieldValue("taskId");
                this.props.taskModel.query(data);
            })
        };

        return (<Row>
            <Form layout={'inline'} onSubmit={handleOk} className={"float-right"}>
                <Form.Item label="状态"  className={"margin-right5"} {...selectLayout}>
                    {this.props.form.getFieldDecorator("status", {
                        rules: [
                            {
                                required: false,
                                message: '不能为空'
                            }
                        ]
                    })(<Select>
                        {statusOptions}
                    </Select>)}
                </Form.Item>
                <Form.Item label="最终状态"  className={"margin-right5"} {...selectLayout}>
                    {this.props.form.getFieldDecorator("finalStatus", {
                        rules: [
                            {
                                required: false,
                                message: '不能为空'
                            }
                        ]
                    })(<Select>
                        {finalStatusOptions}
                    </Select>)}
                </Form.Item>
                <Form.Item label='任务Id' className={"margin-right5"}>
                        <span>
                        {this.props.form.getFieldDecorator('taskId', {
                            initialValue: '',
                        })(
                            <Input/>
                        )}
                        </span>
                </Form.Item>
                <Button type='primary' htmlType='submit' className={"margin-right5"}>查询</Button>
            </Form>
        </Row>);
    }
}

export default Form.create()(TaskVersionSearch);
