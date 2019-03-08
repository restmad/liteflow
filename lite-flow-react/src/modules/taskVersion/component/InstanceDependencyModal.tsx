import React, {Component} from 'react'
import {Popconfirm, Modal, Button, Row, Col, Table} from 'antd'
import {inject, kernel} from "../../../common/utils/IOC";
import {InstanceDependencyModel} from "../model/InstanceDependencyModel";
import {observer} from "mobx-react";
import {TaskInstance} from "../model/TaskInstanceModel";
import CommonUtils from "../../../common/utils/CommonUtils";
import EnumUtils from "../../../common/utils/EnumUtils";


export interface ModalProps {
    instance: TaskInstance;
    onCancel: any;
}

@observer
class InstanceDependencyModal extends Component<ModalProps> {

    @inject(InstanceDependencyModel)
    private dependencyModel: InstanceDependencyModel;

    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.dependencyModel.queryData({id: this.props.instance.id})
    }

    on(value,  e) {
        let that = this;
        this.dependencyModel.on(value.id);
    }

    off(value,  e) {
        let that = this;
        this.dependencyModel.off(value.id);
    }


    render() {

        let height = document.body.clientHeight  - 110;
        let width = document.body.clientWidth - 60;
        const modalOpts = {
            title: `实例依赖`,
            visible: true,
            width: width,
            style: {top: 10, height: height},
            footer: "",
            onCancel: this.props.onCancel
        };

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id'
            }, {
                title: '依赖任务id',
                dataIndex: 'upstreamTaskId',
                key: 'upstreamTaskId'
            }, {
                title: '依赖任务名称',
                dataIndex: 'upstreamTaskName',
                key: 'upstreamTaskName'
            }, {
                title: '依赖任务版本',
                dataIndex: 'upstreamTaskVersionNo',
                key: 'upstreamTaskVersionNo',
                render: (upstreamTaskVersion) => {
                    if(upstreamTaskVersion){
                        return  <Row className={"list-content-row"}>
                            <Row>
                                <Col className={"list-content-col-title"} span={12}>id:</Col>
                                <Col className={"list-content-col-content"} span={12}>{upstreamTaskVersion.id}</Col>
                            </Row>
                            <Row>
                                <Col className={"list-content-col-title"} span={12}>任务版本:</Col>
                                <Col className={"list-content-col-content"} span={12}>{upstreamTaskVersion.versionNo}</Col>
                            </Row>
                            <Row>
                                <Col className={"list-content-col-title"} span={12}>状态:</Col>
                                <Col className={"list-content-col-content"} span={12}>{EnumUtils.getTaskVersionStatusName(upstreamTaskVersion.status)}</Col>
                            </Row>
                            <Row>
                                <Col className={"list-content-col-title"} span={12}>最终状态:</Col>
                                <Col className={"list-content-col-content"} span={12}>{EnumUtils.getTaskVersionFinalStatusName(upstreamTaskVersion.finalStatus)}</Col>
                            </Row>
                            {
                                upstreamTaskVersion.msg ? <Row>
                                    <Col className={"list-content-col-title"} span={12}>异常信息:</Col>
                                    <Col className={"list-content-col-content"} span={12}>{upstreamTaskVersion.msg}</Col>
                                </Row> : ""
                            }

                        </Row>;
                    }
                    return "不存在";
                }
            }, {
                title: "关联状态",
                dataIndex: 'status',
                key: 'status',
                render: (status, row) => {
                    const {upstreamTaskVersion} = row;
                    if(!upstreamTaskVersion){
                        return <strong style={{color: "red"}}>任务版本不存在</strong>;
                    }
                    if(upstreamTaskVersion.finalStatus == EnumUtils.taskVersionFinalStatusFail){
                        return <strong style={{color: "red"}}>运行失败</strong>;
                    }

                    return "正常";
                }
            }, {
                title: "状态",
                dataIndex: 'status',
                key: 'status',
                render: (status) => {
                    if(status == EnumUtils.commonStatusOff){
                        return "无效";
                    }
                    return "有效";
                }
            }, {
                title: '相关时间',
                dataIndex: 'times',
                key: 'times',
                render: (modifiedTime, record, index) => {
                    const {createTime, updateTime} = record;
                    return  <Row className={"list-content-row"}>
                        <Row><Col className={"list-content-col-title"} span={12}>创建时间:</Col><Col className={"list-content-col-content"} span={12}>{CommonUtils.dateFormat(createTime)}</Col></Row>
                        <Row><Col className={"list-content-col-title"} span={12}>更新时间:</Col><Col className={"list-content-col-content"} span={12}>{CommonUtils.dateFormat(updateTime)}</Col></Row>
                    </Row>;
                }
            },{
                title: '操作',
                key: 'operate',
                render: (text, record, index) => {
                    let onBtn = (<Popconfirm title='是否设置为有效？' key={"onProp"}  onConfirm={e => this.on(record, e)}>
                        <Button type='ghost' size={"small"} key={"onBtn"}>
                            有效
                        </Button>
                    </Popconfirm>);

                    let offBtn = (<Popconfirm title='是否设置为无效？' key={"offProp"} onConfirm={e => this.off(record, e)}>
                        <Button type='ghost' size={"small"} key={"offBtn"}>
                            无效
                        </Button>
                    </Popconfirm>);

                    let buttons = [];
                    if(record.state == EnumUtils.commonStatusOff){
                        buttons.push(onBtn);
                    }else{
                        buttons.push(offBtn);
                    }
                    return <div style={{textAlign: "center"}}>
                        {buttons}
                    </div>;
                }
            }];
        return (
        <Modal {...modalOpts}>
                <div>
                    <Table dataSource={this.dependencyModel.dependencies}
                           columns={columns}
                           rowKey="id"
                           loading={this.dependencyModel.loading}
                           pagination={this.dependencyModel.pageConfig}/>
                </div>
        </Modal>
        );
    }
}

export default InstanceDependencyModal;