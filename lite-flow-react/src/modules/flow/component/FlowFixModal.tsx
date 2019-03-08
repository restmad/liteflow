import React, {Component} from 'react'
import {Form, Modal, Row, Button, Select} from 'antd'
import {Flow, FlowModel} from "../model/FlowModel";
import DagVersionFixShow from "./dagfix/DagVersionFixShow";
import {kernel} from "../../../common/utils/IOC";
import {FormComponentProps} from "antd/lib/form/Form";


export interface ModalProps extends FormComponentProps{
    flow: Flow;
    onCancel: any;
}


export interface ModalState {
    selectedVersionNo: number;
    versionNos: any;
}

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};

class FlowFixModal extends Component<ModalProps, ModalState> {

    private flowModel: FlowModel;

    constructor(props) {
        super(props);
        this.state = {
            selectedVersionNo: null,
            versionNos: []
        };
    }

    componentWillMount() {
        this.flowModel = kernel.get(FlowModel);
        const that = this;
        this.flowModel.fixGetLatestVersionNos(this.props.flow.id).then(result => {
            if (result.status == 0) {
                const versionNos = result.data;
                if (versionNos && versionNos.length > 0) {
                    const selectedVersionNo = versionNos[versionNos.length - 1];
                    that.setState({
                       selectedVersionNo: selectedVersionNo,
                       versionNos: versionNos
                    });
                }
            }
        });
    }

    render() {
        const {selectedVersionNo} = this.state;
        const height = document.body.clientHeight - 110;
        const width = document.body.clientWidth - 60;
        const modalOpts = {
            title: `${this.props.flow.name}-${selectedVersionNo}`,
            visible: true,
            maskClosable: false,
            width: width,
            style: {top: 10, height: height},
            footer: "",
            onCancel: this.props.onCancel
        };


        const fixDagProps = () => {
            return {
                flow: this.props.flow,
                height: height,
                firstTaskVersionNo: selectedVersionNo
            }
        }

        let dagView = [];
        if (selectedVersionNo && selectedVersionNo > 0) {
            dagView.push(<DagVersionFixShow {...fixDagProps()}></DagVersionFixShow>)
        }

        return (
            <Modal {...modalOpts}>
                <Row className={"container-row-block"}>
                    <Form layout={'inline'}  className={"float-right"}>
                        <Form.Item label="状态"  className={"margin-right5"} {...formItemLayout}>
                            {this.props.form.getFieldDecorator("status", {
                                rules: [
                                    {
                                        required: false,
                                        message: '不能为空'
                                    }
                                ]
                            })(<Select>
                            </Select>)}
                        </Form.Item>
                        <Button type='primary' htmlType='submit' className={"margin-right5"}>查询</Button>
                    </Form>
                </Row>
                <Row className={"container-row-block"}>
                    {dagView}
                </Row>
            </Modal>
        );
    }
}
export default Form.create()(FlowFixModal);