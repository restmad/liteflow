import React, {Component} from 'react';
import {Button, Popconfirm,Table} from 'antd';
import {Role,RoleModel} from "../model/RoleModel";
import RoleModal from "./RoleModal";

export interface RoleListProps {
    dataSource: Array<Role>;
    loading: boolean;
    pageConfig: any;
    roleModel: RoleModel;
}

export class RoleList extends Component<RoleListProps, {showModal, role, allAuths}> {

    constructor(props) {
        super(props);
        this.state = {showModal: false, role: new Role(), allAuths: []}
    }

    showEditModal(){
        let that = this;
        this.props.roleModel.listAuths().then((data) => {
            that.setState({
                allAuths: data,
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
            role: this.state.role,
            allAuths: that.state.allAuths,
            onOk: function (role: Role) {
                that.props.roleModel.edit(role);
                that.hideEditModal();
            },
            onCancel() {
                that.hideEditModal();
            }
        };
    }
    //删除事件
    handleDelete (rowData, e){
        this.props.roleModel.delete(rowData.id);
    }
    //编辑事件
    handleEdit (rowData, e){
        this.setState({role : rowData})
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
            title: '描述',
            dataIndex: 'description',
            key: 'description'
        },{
            title: '权限',
            dataIndex: 'auths',
            key: 'auths',
            render:(auths, record, index) => {
                if(auths && auths.length > 0){
                    let authNames = [];
                    for(let val of auths){
                        authNames .push(val.name);
                    }
                    return authNames.join(",");
                }
                return "无";
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
                {this.state.showModal ? <RoleModal {...this.getModalProps()}/> : ''}
            </div>
        );

    }

}

