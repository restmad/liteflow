import React, {Component} from 'react'
import {Button, Form, Icon, Input, Radio, Row} from "antd";
import Config from "../../../../common/config/Config";
import styles from "./login.less";
import {FormComponentProps} from "antd/lib/form/Form";

export interface ModalProps extends FormComponentProps{
    onOk: any;
    loading:boolean;
}

class LoginForm extends Component<ModalProps, any> {
    render() {
        let that = this;
        function handleOk () {
            that.props.form.validateFieldsAndScroll((errors, values) => {
                if (errors) {
                    return
                }
                that.props.onOk(values.username, values.password);
            })
        }

        return (
            <div className={styles.form}>
                <div className={styles.logo}>
                    <img src={`${Config.assertPrefix}${Config.logoSrc}`} style={{width: 180}}/>
                </div>
                <form>
                    <Form.Item hasFeedback>
                        {that.props.form.getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: '用户名不能为空'
                                }
                            ]
                        })(<Input addonBefore={<Icon type="user" />} size='large' onPressEnter={handleOk} placeholder='用户名'/>)}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {that.props.form.getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '密码不能为空'
                                }
                            ]
                        })(<Input addonBefore={<Icon type="lock" />}  size='large' type='password' onPressEnter={handleOk} placeholder='密码'/>)}
                    </Form.Item>
                    <Row>
                        <Button type='primary' size='large' onClick={handleOk} loading={this.props.loading}>
                            登录
                        </Button>
                    </Row>
                </form>
            </div>
        );
    }
}

export default Form.create()(LoginForm);