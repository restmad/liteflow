import React, {Component} from 'react'
import {Row, Col, Modal, List} from 'antd'
import {Task, TaskModel} from "../../task/model/TaskModel";
import {kernel} from "../../../common/utils/IOC";
import EnumUtils from "../../../common/utils/EnumUtils";

export interface ModalProps {
    task: Task;
    onCancel: any;
}

class TaskRelationModal extends Component<ModalProps, {upstream, downstream, flow}> {

    private taskModel: TaskModel;

    constructor(props){
        super(props);
        this.state = {
          flow: [],
          upstream: [],
          downstream: []
        };
    }

    componentWillMount(){
        const that = this;
        this.taskModel = kernel.get(TaskModel);
        this.taskModel.getRelation(this.props.task.id).then(data => {
           if(data){
               that.setState({
                   upstream: data.upstream,
                   downstream: data.downstream
               });
           }
        });
        this.taskModel.getRelatedFlow(this.props.task.id).then(data => {
           that.setState({
               flow: data
           });
        });
    }

    render() {

        let height = document.body.clientHeight  - 110;
        let width = document.body.clientWidth - 200;
        const modalOpts = {
            title: `任务血缘:${this.props.task.name}`,
            visible: true,
            maskClosable: false,
            width: width,
            style: {top: 10, height: height},
            footer: "",
            onCancel: this.props.onCancel
        };

        const {upstream, downstream, flow} = this.state;

        return (
            <Modal {...modalOpts}>
                <Row className={"margin-bottom10"}>
                    <Col span={10}>
                        <List
                            header={<div>上游</div>}
                            bordered
                            dataSource={upstream}
                            renderItem={item => (<List.Item><TaskRelationItem data={item}/></List.Item>)}
                        />
                    </Col>
                    <Col span={10} offset={4}>
                        <List
                            header={<div>下游</div>}
                            bordered
                            dataSource={downstream}
                            renderItem={item => (<List.Item><TaskRelationItem data={item}/></List.Item>)}
                        />

                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <List
                            header={<div>所属任务流</div>}
                            bordered
                            dataSource={flow}
                            renderItem={item => (<List.Item><FlowItem data={item}/></List.Item>)}
                        />
                    </Col>
                </Row>


            </Modal>
        );
    }
}


class TaskRelationItem extends Component<{data}> {
    render() {

        const {data} = this.props;

        return <Row style={{width: "100%"}}>
            <Col span={3}>
                {data.id}
            </Col>
            <Col span={6}>
                {data.name}
            </Col>
            <Col span={3} className={'task-status-' + data.status}>
                {EnumUtils.getStatusName(data.status)}
            </Col>
        </Row>;
    }
}

class FlowItem extends Component<{data}> {
    render() {

        const {data} = this.props;

        return <Row style={{width: "100%"}}>
            <Col span={3}>
                {data.id}
            </Col>
            <Col span={6}>
                {data.name}
            </Col>
            <Col span={3} className={'flow-status-' + data.status}>
                {EnumUtils.getStatusName(data.status)}
            </Col>
        </Row>;
    }
}


export default TaskRelationModal;