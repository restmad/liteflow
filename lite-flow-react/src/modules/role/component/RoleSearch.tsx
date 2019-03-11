import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {Role, RoleModel} from "../model/RoleModel";
import {FormComponentProps} from "antd/lib/form/Form";

export interface RoleSearchProps extends FormComponentProps {
    roleModel: RoleModel
}

class RoleSearch extends Component<RoleSearchProps, {}> {

    constructor(props) {
        super(props);
        this.state = {showModal: false, allAuths: []}
    }


    render() {
        let handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFields((errors) => {
                if (errors) {
                    return
                }

                const data = {
                    ...this.props.form.getFieldsValue(),
                };
                this.props.roleModel.query(data);
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

export default Form.create()(RoleSearch);
