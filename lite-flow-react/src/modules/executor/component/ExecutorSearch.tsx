import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {ExecutorSearchParam, Executor, ExecutorModel} from "../model/ExecutorModel";
import {FormComponentProps} from "antd/lib/form/Form";

export interface ExecutorSearchProps extends FormComponentProps {
    executorModel: ExecutorModel
}

class ExecutorSearch extends Component<ExecutorSearchProps, {}> {

    constructor(props) {
        super(props);
    }


    render() {
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }
                let data = this.props.form.getFieldsValue();
                this.props.executorModel.query(data);
            })
        };

        return (<Row>
            <Form layout={'inline'} onSubmit={handleOk} className={"float-right"}>
                <Form.Item label='名称：' className={"margin-right5"}>
                        <span>
                        {this.props.form.getFieldDecorator('nameLike', {
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

export default Form.create()(ExecutorSearch);
