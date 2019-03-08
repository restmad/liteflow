import React, {Component} from 'react';
import {Button, Popconfirm, Table,  Row, Col} from 'antd';
import {Flow,FlowModel} from "../model/FlowModel";
import FlowModal from "./FlowModal";
import FlowShowModal from "./FlowShowModal";
import EnumUtils from "../../../common/utils/EnumUtils";
import CommonUtils from "../../../common/utils/CommonUtils";
import FlowTaskModal from "./FlowTaskModal";
import CommonAuthModal from "../../auth/view/CommonAuthModal";
import FlowFixModal from "./FlowFixModal";
export interface FlowListProps {
    dataSource: Array<Flow>;
    loading: boolean;
    pageConfig: any;
    flowModel: FlowModel;
}

export class FlowList extends Component<FlowListProps, {
    showModal,
    showDagModal,
    showFixDagModal,
    showTaskModal,
    showAuthModal,
    flow}> {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showTaskModal: false,
            showDagModal: false,
            showFixDagModal: false,
            showAuthModal: false,
            flow: new Flow()
        }
    }

    /**
     * 编辑
     */
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
            flow: this.state.flow,
            onOk: function (flow: Flow) {
                that.props.flowModel.edit(flow);
                that.hideEditModal();
            },
            onCancel() {
                that.hideEditModal();
            }
        };
    }

    /**
     * DAG
     */
    getDagModalProps(){
        let that = this;
        return {
            flow: this.state.flow,
            flowModel: that.props.flowModel,
            onCancel() {
                that.hideDagModal();
            }
        };
    }
    showDagModal(flow, e){
        let that = this;
        that.setState({
            showDagModal: true,
            flow: flow
        });
    }

    hideDagModal(){
        this.setState({
            showDagModal: false
        });
    }

    /**
     * FIX DAG
     */
    getFixDagModalProps(){
        let that = this;
        return {
            flow: this.state.flow,
            onCancel() {
                that.hideFixDagModal();
            }
        };
    }
    showFixDagModal(flow, e){
        let that = this;
        that.setState({
            showFixDagModal: true,
            flow: flow
        });
    }

    hideFixDagModal(){
        this.setState({
            showFixDagModal: false
        });
    }
    /**
     * 任务
     */
    getTaskModalProps(){
        let that = this;
        return {
            flow: this.state.flow,
            onCancel() {
                that.hideTaskModal();
            }
        };
    }
    showTaskModal(flow, e){
        let that = this;
        that.setState({
            showTaskModal: true,
            flow: flow
        });
    }
    hideTaskModal(){
        this.setState({
            showTaskModal: false
        });
    }
    /**
     * 权限
     */
    getAuthModalProps(){
        let that = this;
        return {
            model: this.state.flow,
            targetType: 2,
            onCancel() {
                that.hideAuthModal();
            }
        };
    }
    showAuthModal(flow, e){
        let that = this;
        that.setState({
            showAuthModal: true,
            flow: flow
        });
    }

    hideAuthModal(){
        this.setState({
            showAuthModal: false
        });
    }

    //上线
    handleOn(rowData, e) {
        this.props.flowModel.on(rowData.id);
    }
    //下线
    handleOff(rowData, e) {
        this.props.flowModel.off(rowData.id);
    }
    //编辑事件
    handleEdit (rowData, e){
        this.setState({flow : rowData})
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
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status, record, index) => {
                const statusStr = EnumUtils.getStatusName(status);
                return <b className={'flow-status-' + status}>{statusStr}</b>;
            }
        },{
            title: '描述',
            dataIndex: 'description',
            key: 'description'
        }, {
            title: '相关时间',
            dataIndex: 'times',
            key: 'times',
            render: (auths, record, index) => {
                const {createTime, updateTime} = record;
                return  <Row className={"list-content-row"}>
                    <Row><Col className={"list-content-col-title"} span={12}>创建时间:</Col><Col className={"list-content-col-content"} span={12}>{CommonUtils.dateFormat(createTime)}</Col></Row>
                    <Row><Col className={"list-content-col-title"} span={12}>更新时间:</Col><Col className={"list-content-col-content"} span={12}>{CommonUtils.dateFormat(updateTime)}</Col></Row>
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


            const {status} = record;
            let onlineOrOfflineBtn = ( <Popconfirm title='确定下线吗？'  onConfirm={e => this.handleOff(record, e)}>
                <Button  size={'small'}  className={"margin-right5"}  type='ghost'>
                    下线
                </Button>
            </Popconfirm>);

            if(status != EnumUtils.statusOnline){
                onlineOrOfflineBtn = ( <Popconfirm title='确定上线吗？' onConfirm={e => this.handleOn(record, e)}>
                    <Button  size={'small'}  className={"margin-right5"} type='ghost'>
                        上线
                    </Button>
                </Popconfirm>);
            }

            return <div className={"list-btn-container"}>
                <p>
                    <Button type='ghost' size={'small'} className={"margin-right5"} onClick={e => this.handleEdit(record , e)}>
                        修改
                    </Button>
                    <Button type='ghost' size={'small'} className={"margin-right5"} onClick={e => this.showTaskModal(record , e)}>
                        任务
                    </Button>
                    <Button type='ghost' size={'small'} className={"margin-right5"} onClick={e => this.showDagModal(record , e)}>
                        DAG
                    </Button>
                </p>
                <p>
                    {onlineOrOfflineBtn}
                    <Button type='ghost' size={'small'} className={"margin-right5"} onClick={e => this.showAuthModal(record , e)}>
                        权限
                    </Button>
                    <Button type='ghost' size={'small'} className={"margin-right5"} onClick={e => this.showFixDagModal(record , e)}>
                        修复
                    </Button>
                </p>
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
                {this.state.showModal ? <FlowModal {...this.getModalProps()}/> : ''}
                {this.state.showDagModal ? <FlowShowModal {...this.getDagModalProps()}/> : ''}
                {this.state.showTaskModal ? <FlowTaskModal {...this.getTaskModalProps()}/> : ''}
                {this.state.showAuthModal ? <CommonAuthModal {...this.getAuthModalProps()}/> : ''}
                {this.state.showFixDagModal ? <FlowFixModal {...this.getFixDagModalProps()}/> : ''}

            </div>
        );

    }

}

