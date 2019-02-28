import React, {Component} from 'react';
import {Button, Popconfirm,Table} from 'antd';
import {UserGroup,UserGroupModel} from "../model/UserGroupModel";
import UserGroupModal from "./UserGroupModal";

export interface UserGroupListProps {
    dataSource: Array<UserGroup>;
    loading: boolean;
    pageConfig: any;
    userGroupModel: UserGroupModel;
}

export class UserGroupList extends Component<UserGroupListProps, {showModal, userGroup, allAuths}> {

    constructor(props) {
        super(props);
        this.state = {showModal: false, userGroup: new UserGroup(), allAuths: []}
    }

    showEditModal(){
        let that = this;
        that.setState({
            showModal: true
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
            userGroup: this.state.userGroup,
            allAuths: that.state.allAuths,
            onOk: function (userGroup: UserGroup) {
                that.props.userGroupModel.edit(userGroup);
                that.hideEditModal();
            },
            onCancel() {
                that.hideEditModal();
            }
        };
    }
    //删除事件
    handleDelete (rowData, e){
        this.props.userGroupModel.delete(rowData.id);
    }
    //编辑事件
    handleEdit (rowData, e){
        this.setState({userGroup : rowData})
        this.showEditModal();
    }

    render(){
        let columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },{
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },{
            title: '用户',
            dataIndex: 'users',
            key: 'users',
            render:(users, record, index) => {
                if(users && users.length > 0){
                    let userNames = [];
                    for(let val of users){
                        userNames .push(val.userName);
                    }
                    return userNames.join(",");
                }
                return "无";
            }
        },{
            title: '描述',
            dataIndex: 'description',
            key: 'description'
        }, {
            title: '创建人',
            dataIndex: 'user',
            key: 'user',
            render: (user, record, index) => {
                if(user){
                    return user.name;
                }
                return "";
            }
        }, {
            title: '操作',
            dataIndex: 'id',
            key: 'operateInstance',
            render:(text, record, index) => {
                return <div>
                    <Button type='ghost' size={"small"} className={"margin-right5"} onClick={e => this.handleEdit(record , e)}>
                        修改
                    </Button>
                    <Popconfirm title='确定删除吗？' onConfirm={e => this.handleDelete(record , e)}>
                        <Button type='ghost' size={"small"} >
                            删除
                        </Button>
                    </Popconfirm>
                </div>;
            }
        }];
        return (
            <div>
                <Table dataSource={this.props.dataSource}
                       columns={columns}
                       rowKey="id"
                       loading={this.props.loading}
                       pagination={this.props.pageConfig}/>
                {this.state.showModal ? <UserGroupModal {...this.getModalProps()}/> : ''}
            </div>
        );

    }

}

