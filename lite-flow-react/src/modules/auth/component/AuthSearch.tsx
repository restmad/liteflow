import React, {Component} from 'react'
import {Button, Form, Input, Select, Row} from 'antd'
import {AuthModel} from "../model/AuthModel";
import {FormComponentProps} from "antd/lib/form/Form";

export interface AuthSearchProps extends FormComponentProps {
    authModel: AuthModel,
    targetId: number,
    targetType: number,
}

const formItemLayout = {
    labelCol: {
        span: 10
    },
    wrapperCol: {
        span: 14
    },
    style: {
        width: 130
    }
};

class AuthSearch extends Component<AuthSearchProps, {}> {

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

                let data = {};
                const {targetId, targetType} = this.props;
                data["targetId"] = targetId;
                data["targetType"] = targetType;
                data["sourceType"] = this.props.form.getFieldValue('sourceType');
                this.props.authModel.query(data);
            })
        };

        return (<Row>
            <Form layout={'inline'} onSubmit={handleOk} className={"float-right"}>
                <Form.Item label="类型" {...formItemLayout}>
                    {this.props.form.getFieldDecorator("sourceType", {
                    })(<Select>
                        <Select.Option key={"type-all"} value={""}>全部</Select.Option>
                        <Select.Option key={"type-user"} value={"1"}>用户</Select.Option>
                        <Select.Option key={"type-group"} value={"2"}>用户组</Select.Option>
                    </Select>)}
                </Form.Item>
                <Button type='primary' htmlType='submit' className={"margin-right5"}>查询</Button>
            </Form>
        </Row>);
    }
}

export default Form.create()(AuthSearch);
