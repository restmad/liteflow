import React, {Component} from 'react'
import {Button, Form, Input, Select, Row} from 'antd'
import {Task, TaskModel} from "../model/TaskModel";
import {FormComponentProps} from "antd/lib/form/Form";
import {DomUtils} from "../../../common/utils/DomUtils";
import EnumUtils from "../../../common/utils/EnumUtils";

export interface TaskSearchProps extends FormComponentProps {
    taskModel: TaskModel
}

const selectLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    },
    style: {
        width: 130
    }
};

class TaskSearch extends Component<TaskSearchProps, {}> {

    constructor(props) {
        super(props);
        this.state = {showModal: false}
    }

    /**
     * 获取周期
     * @returns {any[]}
     */
    getPeriodOptions() {
        const periods = EnumUtils.getPeriodOptionArray();
        let options = DomUtils.getSelectOptionsWithAll(periods);
        return options;
    }
    getStatusOptions() {
        const periods = EnumUtils.getStatusOptionArray();
        let options = DomUtils.getSelectOptionsWithAll(periods);
        return options;
    }

    render() {

        let periodOptions = this.getPeriodOptions();
        let statusOptions = this.getStatusOptions();

        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }
                let data = this.props.form.getFieldsValue();
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
                <Form.Item label="周期"  className={"margin-right5"} {...selectLayout}>
                    {this.props.form.getFieldDecorator("period", {
                        rules: [
                            {
                                required: false,
                                message: '不能为空'
                            }
                        ]
                    })(<Select>
                        {periodOptions}
                    </Select>)}
                </Form.Item>

                <Form.Item label='名称' className={"margin-right5"}>
                        <span>
                        {this.props.form.getFieldDecorator('nameLike', {
                            initialValue: '',
                        })(
                            <Input/>
                        )}
                        </span>
                </Form.Item>
                <Form.Item label='id' className={"margin-right5"}>
                        <span>
                        {this.props.form.getFieldDecorator('id', {
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

export default Form.create()(TaskSearch);
