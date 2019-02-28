import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {ContainerSearchParam, Container, ContainerModel} from "../model/ContainerModel";
import {FormComponentProps} from "antd/lib/form/Form";

export interface ContainerSearchProps extends FormComponentProps {
    containerModel: ContainerModel
}

class ContainerSearch extends Component<ContainerSearchProps, {}> {

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

                let data = new ContainerSearchParam();
                data.nameLike = this.props.form.getFieldValue('name');
                this.props.containerModel.query(data);
            })
        };

        return (<Row>
            <Form layout={'inline'} onSubmit={handleOk} className={"float-right"}>
                <Form.Item label='名称：' className={"margin-right5"}>
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

export default Form.create()(ContainerSearch);
