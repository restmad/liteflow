import React, {Component} from 'react';
import {Button, Popconfirm,Table, Row, Col} from 'antd';
import {User, UserModel} from "../model/UserModel";
import UserModal from "../component/UserModal";
import EnumUtils from "../../../common/utils/EnumUtils";

export interface ListProps {
    dataSource: Array<User>;
    loading: boolean;
    pageConfig:any;
    userModel: UserModel;
}

export class UserList extends Component<ListProps, {showModal, user, allRoles}> {
    constructor(props) {
        super(props);
        this.state = {showModal: false, user: new User(), allRoles: []}
    }

    showEditModal(){
        let that = this;
        this.props.userModel.listAllRoles().then((data) => {
            that.setState({
                allRoles: data,
                showModal: true
            });
        });
    }
    hideEditModal(){
        this.setState({
            showModal: false
        });
    }

    getModalProps(){
        let that = this;
        return {
            user: this.state.user,
            allRoles: that.state.allRoles,
            onOk: function (user: User) {
                that.props.userModel.edit(user);
                that.hideEditModal();
            },
            onCancel() {
                that.hideEditModal();
            }
        };
    };
    //启用
    handleOn = (rowData, e) => {
        this.props.userModel.on(rowData.id);
    }
    //禁用
    handleOff = (rowData, e) => {
        this.props.userModel.off(rowData.id);
    }
    //编辑事件
    handleEdit = (rowData, e) => {
        this.setState({user : rowData})
        this.showEditModal();
    }

    render() {
        let columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id'
            },{
                title: '用户名',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email'
            }, {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile'
            }, {
                title: '是否超管',
                dataIndex: 'isSuper',
                key: 'isSuper',
                render:(isSuper, record, index) => {
                    if(isSuper && isSuper == EnumUtils.trueInt){
                        return "是";
                    }
                    return "否";
                }
            }, {
                title: '角色',
                dataIndex: 'roles',
                key: 'roles',
                render:(roles, record, index) => {
                    if(roles && roles.length > 0){
                        let roleNames = [];
                        for(let val of roles){
                            roleNames .push(val.roleName);
                        }
                        return roleNames.join(",");
                    }
                    return "无";
                }
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => {
                    if(status == EnumUtils.trueInt){
                        return "启用";
                    }
                    return "禁用";
                }
            }, {
                title: '操作',
                dataIndex: 'id',
                key: 'operateInstance',
                render:(text, record, index) => {
                    let status = record.status;
                    let btn = null;
                    if (status == EnumUtils.trueInt) {
                        btn = (
                            <Popconfirm title='是否禁用？' onConfirm={e => this.handleOff(record, e)}>
                                <Button size={'small'} type='ghost'>
                                    禁用
                                </Button>
                            </Popconfirm>);
                    } else {
                        btn = (
                            <Popconfirm title='是否启用？' onConfirm={e => this.handleOn(record, e)}>
                                <Button size={'small'} type='ghost'>
                                    启用
                                </Button>
                            </Popconfirm>);
                    }
                    return <div>
                        <Button type='ghost' size={"small"} className={"margin-right5"} onClick={e => this.handleEdit(record , e)}>
                            修改
                        </Button>
                        {btn}
                    </div>;
                }
            }];
        return (
                <Row>
                    <Table dataSource={this.props.dataSource} columns={columns} rowKey="id" loading={this.props.loading}
                           pagination={this.props.pageConfig}/>
                    {this.state.showModal ? <UserModal {...this.getModalProps()}/> : ''}
                </Row>
        );
    }
};
