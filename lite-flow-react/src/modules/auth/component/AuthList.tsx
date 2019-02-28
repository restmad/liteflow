import React, {Component} from 'react';
import {Button, Popconfirm,Table, Row, Col} from 'antd';
import {Auth,AuthModel} from "../model/AuthModel";
import AuthModal from "./AuthModal";
import EnumUtils from "../../../common/utils/EnumUtils";

export interface AuthListProps {
    dataSource: Array<Auth>;
    loading: boolean;
    targetId : number;
    targetType : number;
    pageConfig: any;
    authModel: AuthModel;
}

export class AuthList extends Component<AuthListProps, {showModal, auth}> {

    constructor(props) {
        super(props);
        this.state = {showModal: false, auth: new Auth()}
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
            auth: this.state.auth,
            targetType: this.props.targetType,
            targetId: this.props.targetId,
            onOk: function (auth: Auth) {
                that.props.authModel.edit(auth);
                that.hideEditModal();
            },
            onCancel() {
                that.hideEditModal();
            }
        };
    }
    //编辑事件
    handleEdit (rowData, e){
        this.setState({auth : rowData})
        this.showEditModal();
    }
    handleDelete (rowData, e){
        this.props.authModel.delete(rowData.id);
    }

    render(){
        let columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },{
            title: '名称',
            dataIndex: 'sourceName',
            key: 'sourceName'
        },{
            title: '类型',
            dataIndex: "sourceType",
            key: 'sourceType',
            render: (sourceType, record, index) => {

                if(sourceType == 2){
                    return "用户组";
                }
                return "用户";
            }
        }, {
            title: '编辑权限',
            dataIndex: 'hasEditAuth',
            key: 'hasEditAuth',
            render: (editAuth, record, index) => {
                let hasEdit = false;
                if(editAuth && editAuth == 1){
                    hasEdit = true;
                }
                return  <Row className={"list-content-row"}>
                    {hasEdit ? "是" : "否"}
                </Row>;
            }
        }, {
            title: '执行权限',
            dataIndex: 'hasExecuteAuth',
            key: 'hasExecuteAuth',
            render: (exeAuth, record, index) => {
                let hasExecute = false;
                if(exeAuth && exeAuth == 1){
                    hasExecute = true;
                }
                return  <Row className={"list-content-row"}>
                        {hasExecute ? "是" : "否"}
                </Row>;
            }
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
                    <Button size={'small'}  type='ghost' className={"margin-right5"} onClick={e => this.handleEdit(record , e)}>
                        修改
                    </Button>
                    <Popconfirm title='确定删除？' onConfirm={e => this.handleDelete(record , e)}>
                        <Button type='ghost'  size={'small'} >
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
                {this.state.showModal ? <AuthModal {...this.getModalProps()}/> : ''}
            </div>
        );

    }

}

