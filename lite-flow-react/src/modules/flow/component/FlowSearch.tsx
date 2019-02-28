import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {FlowSearchParam, Flow, FlowModel} from "../model/FlowModel";
import {FormComponentProps} from "antd/lib/form/Form";

export interface FlowSearchProps extends FormComponentProps {
    flowModel: FlowModel
}

class FlowSearch extends Component<FlowSearchProps, {}> {

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

                let data = new FlowSearchParam();
                data.nameLike = this.props.form.getFieldValue('name');
                data.id = this.props.form.getFieldValue("id");
                this.props.flowModel.query(data);
            })
        };

        return (<Row>
            <Form layout={'inline'} onSubmit={handleOk} className={"float-right"}>
                <Form.Item label='id' className={"margin-right5"}>
                        <span>
                        {this.props.form.getFieldDecorator('id', {
                            initialValue: '',
                        })(
                            <Input/>
                        )}
                        </span>
                </Form.Item>
                <Form.Item label='名称' className={"margin-right5"}>
                        <span>
                        {this.props.form.getFieldDecorator('name', {
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

export default Form.create()(FlowSearch);
