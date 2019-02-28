import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Row} from 'antd'
import {UserGroupSearchParam, UserGroup, UserGroupModel} from "../model/UserGroupModel";
import {FormComponentProps} from "antd/lib/form/Form";

export interface UserGroupSearchProps extends FormComponentProps {
    userGroupModel: UserGroupModel
}

class UserGroupSearch extends Component<UserGroupSearchProps> {

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

                let data = new UserGroupSearchParam();
                data.nameLike = this.props.form.getFieldValue('name');
                this.props.userGroupModel.query(data);
            })
        };

        return (<Row>
            <Form layout={'inline'} onSubmit={handleOk} className={"float-right"}>
                <Form.Item label='名称：' className={"margin-right5"}>
                        <span>
                        {this.props.form.getFieldDecorator('name', {
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

export default Form.create()(UserGroupSearch);
