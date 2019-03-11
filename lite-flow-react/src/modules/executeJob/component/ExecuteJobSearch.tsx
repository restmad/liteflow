import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import { ExecuteJobModel} from "../model/ExecuteJobModel";
import {FormComponentProps} from "antd/lib/form/Form";

export interface ExecuteJobSearchProps extends FormComponentProps {
    executeJobModel: ExecuteJobModel
}

class ExecuteJobSearch extends Component<ExecuteJobSearchProps, {}> {

    constructor(props) {
        super(props);
        this.state = {showModal: false}
    }


    render() {
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }

                let data = this.props.form.getFieldsValue();
                this.props.executeJobModel.query(data);
            })
        };

        return (<Row>
            <Form layout={'inline'} onSubmit={handleOk} className={"float-right"}>
                <Form.Item label='instanceId' className={"margin-right5"}>
                        <span>
                        {this.props.form.getFieldDecorator('instanceId', {
                            initialValue: '',
                        })(
                            <Input/>
                        )}
                        </span>
                </Form.Item>
                <Form.Item label='applicationId' className={"margin-right5"}>
                    <span>
                        {this.props.form.getFieldDecorator('applicationId', {
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

export default Form.create()(ExecuteJobSearch);
