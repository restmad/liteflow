import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {UserSearchParam, User, UserModel} from "../model/UserModel";
import {FormComponentProps} from "antd/lib/form/Form";

export interface SearchProps extends FormComponentProps {
    userModel: UserModel;
}

class UserSearch extends Component<SearchProps, {}> {

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
                const data = {
                    ...this.props.form.getFieldsValue(),
                };
                this.props.userModel.query(data);
            })
        };

        return (<Row>
            <Form layout={'inline'} onSubmit={handleOk} className={"float-right"}>

                <Form.Item label='用户名' className={"margin-right5"}>
                        <span>
                        {this.props.form.getFieldDecorator('nameLike', {
                            initialValue: '',
                        })(
                            <Input/>
                        )}
                        </span>
                </Form.Item>
                <Form.Item label='邮箱' className={"margin-right5"}>
                        <span>
                        {this.props.form.getFieldDecorator('email', {
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

export default Form.create()(UserSearch);
