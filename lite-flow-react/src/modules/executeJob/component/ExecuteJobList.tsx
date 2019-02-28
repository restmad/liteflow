import React, {Component} from 'react';
import {Button, Popconfirm,Table, Row, Col} from 'antd';
import {ExecuteJob,ExecuteJobModel} from "../model/ExecuteJobModel";
import CommonUtils from "../../../common/utils/CommonUtils";
import EnumUtils from "../../../common/utils/EnumUtils";

export interface ExecuteJobListProps {
    dataSource: Array<ExecuteJob>;
    loading: boolean;
    pageConfig: any;
    executeJobModel: ExecuteJobModel;
}

export class ExecuteJobList extends Component<ExecuteJobListProps, {showModal, executeJob}> {

    constructor(props) {
        super(props);
        this.state = {showModal: false, executeJob: new ExecuteJob()}
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
            executeJob: this.state.executeJob,
            onOk: function () {
                that.hideEditModal();
            },
            onCancel() {
                that.hideEditModal();
            }
        };
    }
    //下线事件
    handleOff(rowData, e){
        this.props.executeJobModel.off(rowData.id);
    }

    //回调
    handleCallback(rowData, e){
        this.props.executeJobModel.callback(rowData.id);
    }

    handleEdit (rowData, e){
        this.setState({executeJob : rowData})
        this.showEditModal();
    }

    render(){
        let columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },{
            title: 'applicationId',
            dataIndex: 'applicationId',
            key: 'applicationId'
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status, record, index) => {
                const statusStr = EnumUtils.getExeJobStatusName(status);
                return statusStr;
            }
        }, {
            title: '详细信息',
            dataIndex: 'infos',
            key: 'infos',
            render: (infos, record, index) => {
                const {status, callbackStatus,createTime, updateTime, startTime, endTime} = record;
                return  <Row className={"list-content-row"}>
                    <Row><Col className={"list-content-col-title"} span={12}>状态:</Col><Col className={"list-content-col-content"} span={12}>{EnumUtils.getExeJobStatusName(status)}</Col></Row>
                    <Row><Col className={"list-content-col-title"} span={12}>回调状态:</Col><Col className={"list-content-col-content"} span={12}>{EnumUtils.getExeJobCallbackStatusName(callbackStatus)}</Col></Row>
                    <Row><Col className={"list-content-col-title"} span={12}>开始时间:</Col><Col className={"list-content-col-content"} span={12}>{CommonUtils.dateFormat(startTime)}</Col></Row>
                    <Row><Col className={"list-content-col-title"} span={12}>开始时间:</Col><Col className={"list-content-col-content"} span={12}>{CommonUtils.dateFormat(startTime)}</Col></Row>
                    <Row><Col className={"list-content-col-title"} span={12}>结束时间:</Col><Col className={"list-content-col-content"} span={12}>{CommonUtils.dateFormat(endTime)}</Col></Row>
                    <Row><Col className={"list-content-col-title"} span={12}>创建时间:</Col><Col className={"list-content-col-content"} span={12}>{CommonUtils.dateFormat(createTime)}</Col></Row>
                    <Row><Col className={"list-content-col-title"} span={12}>更新时间:</Col><Col className={"list-content-col-content"} span={12}>{CommonUtils.dateFormat(updateTime)}</Col></Row>
                </Row>;
            }
        },{
            title: '信息',
            dataIndex: 'msg',
            key: 'msg'
        }, {
            title: '操作',
            dataIndex: 'id',
            key: 'operateInstance',
            render:(text, record, index) => {
                const {status} = record;
                let showKill = false;
                if(status == EnumUtils.exeJobStatusRunning){
                    showKill = true;
                }
                return <div>
                    <Button type='ghost' size={'small'} className={"margin-right5"} onClick={e => this.handleEdit(record , e)} >
                        查看
                    </Button>
                    <Button type='ghost' size={'small'} className={"margin-right5"} onClick={e => this.handleCallback(record , e)} >
                        回调
                    </Button>
                    {showKill ?
                    <Popconfirm title='确定kill吗？' onConfirm={e => this.handleOff(record , e)}>
                        <Button type='ghost' size={'small'}>
                            KILL
                        </Button>
                    </Popconfirm>
                        :
                        ""
                    }
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
            </div>
        );

    }

}

