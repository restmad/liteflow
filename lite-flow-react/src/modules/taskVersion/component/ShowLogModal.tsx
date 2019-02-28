import React, {Component} from 'react'
import {Form, Modal} from 'antd'
import {kernel} from "../../../common/utils/IOC";
import {TaskInstanceModel} from "../model/TaskInstanceModel";


export interface ModalProps {
    model: any;
    type: string;
    onCancel: any;
}

class ShowInstanceModal extends Component<ModalProps, {log}> {

    constructor(props){
        super(props);
        this.state = {log: "empty"};
    }

    componentWillMount(){
        const that = this;
        const instanceModel = kernel.get(TaskInstanceModel);
        const {type, model} = this.props;
        if(type == 'taskVersion'){
            instanceModel.logVersion(model.id).then(data => {
                that.setState({
                    log: data
                });
            });
        }else{
            instanceModel.log(model.id).then(data => {
                that.setState({
                    log: data
                });
            });
        }

    }

    render() {

        let height = document.body.clientHeight  - 110;
        let width = document.body.clientWidth - 60;
        const modalOpts = {
            title: `Log`,
            visible: true,
            width: width,
            style: {top: 10, height: height},
            footer: "",
            onCancel: this.props.onCancel
        };

        const {log} = this.state;

        let logArray = [];
        const logDoms = [];
        if(log){
            logArray = log.split("\n");
            for(let logLine of logArray){
                logDoms.push((<p style={{marginBottom: 0}}>{logLine}</p>))
            }
        }

        return (
        <Modal {...modalOpts}>
                <div>
                    {logDoms}
                </div>
        </Modal>
        );
    }
}

export default ShowInstanceModal;