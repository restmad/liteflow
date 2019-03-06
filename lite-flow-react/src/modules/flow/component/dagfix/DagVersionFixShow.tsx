import React, {Component} from 'react';
import {Row, Col, notification, Input, Button, Popconfirm} from 'antd'
import * as dagreD3 from 'dagre-d3/dist/dagre-d3'
import d3 from 'd3';
import './dag.less';
import * as ReactDOM from 'react-dom';
import EnumUtils from "../../../../common/utils/EnumUtils";
import CommonUtils from "../../../../common/utils/CommonUtils";


/**
 * 获取鼠标位置
 * @returns {{x: any; y: any}}
 */
const getMousePosition = () => {
    let e = window.event;
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    let x = e["pageX"] || e["clientX"] + scrollX;
    let y = e["pageY"] || e["clientY"] + scrollY;
    return {'x': x, 'y': y};
}

export interface DagFixProps {
    height: number;          //宽度
    data: any;               //数据
    getViewData: any;        //获取图表的方法
    updateLinks?: any;       //更新任务流连接
}

/***
 * 验证任务是否正确
 * @param dagDatas
 * @returns {boolean}
 */
const checkDatas = (dagDatas) => {
    if (!dagDatas || !dagDatas["nodes"]) {
        return false;
    }
    return true;
}

/**
 * 获取点击事件
 * @param isPreventDefault
 * @returns {Event | undefined}
 */
const getEvent = (isPreventDefault) => {
    const event = window.event;
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    return event;

};

/**
 * 任务流修复
 */
class DagVersionFixShow extends Component<DagFixProps, any> {

    private dagData: any = {};

    private linkData: any = {};

    private nodeId: Number = 0;

    constructor(pros) {
        super(pros);
        this.state = {
            labelTop: 0,
            labelLeft: 0,
            //node右键菜单
            showMenu: false,
            nodeTop: 0,
            nodeLeft: 0,
            //node编辑上下游
            showTaskChooseModal: false,
            isUp: false,
            //任务详情
            detailTop: 0,
            detailLeft: 0,
            showDetail: false
        };
    }

    componentDidMount() {
        this.getDataAndRender();
    }

    /**
     * 获取数据并画图
     */
    getDataAndRender() {
        let that = this;
        let id = this.props.data.id;
        this.props.getViewData(id).then((result) => {
            let dagDataNew = that.shuffleAndArrange(result.data);
            that.renderDag(dagDataNew);
        });
    }

    /**
     * 隐藏窗口
     */
    hideAllWindow = () => {
        this.setState({showMenu: false, showDetail: false, showLabelMenu: false})
    }

    /**
     * 添加上游
     * @param id
     */
    onAddUpStream = () => {
        let that = this;
        that.setState({
            showTaskChooseModal: true,
            isUp: true
        });
        this.hideAllWindow();
    }
    /**
     * 添加下游
     */
    onAddDownStream = () => {
        let that = this;
        that.setState({
            showTaskChooseModal: true,
            isUp: false
        })
        this.hideAllWindow();
    }

    /**
     * 清洗并整理数据，避免展示的时候出现交叉线
     */
    shuffleAndArrange = (dagDatas) => {
        if (!checkDatas(dagDatas)) {
            return null;
        }
        let nodes = dagDatas["nodes"];
        let links = dagDatas["links"];
        if (nodes && nodes.length > 0) {
            this.setState({haveNode: true});
        } else {
            this.setState({haveNode: false});
        }
        let nodesNew = [];
        /**
         * 去除掉任何没有关联的任务
         */
        for (let node of nodes) {
            let nodeId = node.id;
            for (let link of links) {
                let taskId = link.taskId;
                let upstreamId = link.upstreamTaskId;
                if (nodeId == taskId || nodeId == upstreamId) {
                    nodesNew.push(node);
                    break;
                }
            }
        }

        let dagDatasNew = {
            nodes: nodesNew,
            links: links
        };
        this.dagData = dagDatasNew;


        return dagDatasNew;
    }
    /**
     * 渲染dag图
     */
    renderDag = (dagData) => {
        let that = this;
        if (!checkDatas(dagData)) {
            return;
        }
        let nodes = dagData["nodes"];
        let links = dagData["links"];
        // 获取dom节点
        const svgDOMNode = ReactDOM.findDOMNode(this.refs.dag);
        const svg = d3.select(svgDOMNode);

        svg.selectAll("*").remove();

        let inner = svg.append("g");
        const renderDag = new dagreD3.render();

        //创建graph对象
        let conf = {
            labelpos: "l",
            nodesep: 70,
            ranksep: 50,
            marginx: 20,
            marginy: 20
        };
        let g = new dagreD3.graphlib.Graph()
            .setGraph(conf);
        //添加节点
        for (let node of nodes) {
            g.setNode(node.id, {
                label: node.name,
                width: 266,
                class: "dag-node-" + node.status
            });

        }

        // 添加节点关系
        if (links && links.length > 0) {
            for (let link of links) {
                g.setEdge(link.upstreamTaskId, link.taskId, {
                    label: link.config ? "range" : "none",
                    labelStyle: 'width: 25px;height: 25px;text-align: center;line-height: 25px;'
                });

            }
        }


        //每个node添加radus
        g.nodes().forEach(function (v) {
            let node = g.node(v);
            //每个节点
            node.rx = node.ry = 5;
        });


        // render画布
        renderDag(inner, g);

        // 放大缩小、拖拽
        let zoom = d3.behavior.zoom().on("zoom", function () {
            inner.attr("transform", "translate(" + d3.event.translate + ")" +
                "scale(" + d3.event.scale + ")");
        });
        svg.call(zoom);


        /**
         * 右键处理
         */
        svg.selectAll("g.node").on("contextmenu", function (id) {
            const event = getEvent(true);
            let btnCode = event["button"];
            if (btnCode != 2) {
                return;
            }
            let position = getMousePosition();

            that.nodeId = id;    //设置节点id

            that.setState({
                showDetail: false,//隐藏详情
                showMenu: true,
                nodeTop: position["y"],
                nodeLeft: position["x"]
            });

        });
        /**
         * 鼠标移动到node节点时
         */
        svg.selectAll("g.node").on("mouseenter", function (id) {
            const position = getMousePosition();

            that.nodeId = id;    //设置节点id

            that.setState({
                showDetail: true,
                detailTop: position["y"],
                detailLeft: position["x"]
            });

        });
        /**
         * 鼠标移出
         */
        svg.selectAll("g.node").on("mouseleave", function (id) {
            that.setState({
                showDetail: false
            });
        });
        svg.on("click", function () {
            let e = window.event;
            let btnCode = e["button"];
            if (btnCode == 0) {
                that.hideAllWindow();
            }
        });

        //画布居中
        let svgWidth = svg.attr("width") ? svg.attr("width") : svg.style("width");
        let psIndex = svgWidth.indexOf("px");
        if (psIndex >= 0) {
            svgWidth = svgWidth.substring(0, psIndex);
        }
        const initialScale = 0.8;
        zoom
            .translate([(parseInt(svgWidth) - g.graph().width * initialScale) / 2, 20])
            .scale(initialScale)
            .event(svg);
        svg.attr('height', g.graph().height * initialScale + 40);
    }

    /**
     * 通过任务id获取任务数据
     * @param id
     * @returns {any}
     */
    getTaskById = (id) => {
        let tasks = this.dagData["nodes"];
        let current = null;
        if (tasks) {
            for (let task of tasks) {
                if (task.id == id) {
                    current = task;
                    break;
                }
            }
        }
        return current;
    }

    showLinkConfModal = () => {
        this.setState({showLinkConfigModal: true});
    }


    /**
     * 删除link
     */
    onDeleteLink = () => {
        let dagData = this.dagData;
        let linkData = this.linkData;
        let nodes = dagData["nodes"];
        let links = dagData["links"];
        let linksNew = [];
        for (let lk of links) {
            if (lk.taskId == linkData.taskId
                && lk.upstreamTaskId == linkData.upstreamTaskId) {
                console.log(`delete link ${lk.upstreamTaskId}->${lk.taskId}`);
            } else {
                linksNew.push(lk);

            }
        }
        dagData["links"] = linksNew;
        this.hideAllWindow();
        let dagDataNew = this.shuffleAndArrange(dagData);
        this.renderDag(dagDataNew);
    }
    /**
     * 删除任务
     */
    onDeleteTask = () => {
        let taskId = this.nodeId;
        let dagData = this.dagData;
        let nodes = dagData["nodes"];
        let links = dagData["links"];

        let nodesNew = [];
        if (nodes && nodes.length > 0) {
            nodesNew = nodes.filter((d) => {
                if (d.id == taskId) {
                    return false;
                } else {
                    return true;
                }
            });
        }

        let linksNew = [];
        if (links && links.length > 0) {
            linksNew = links.filter((d) => {
                if (d.taskId == taskId || d.upstreamTaskId == taskId) {
                    return false;
                } else {
                    return true;
                }
            });
        }

        let dagDataNew = this.shuffleAndArrange({nodes: nodesNew, links: linksNew});
        this.renderDag(dagDataNew);
        this.hideAllWindow();
    }

    /**
     * 提交任务流
     * @returns {any}
     */
    submitFlow() {
        let that = this;
        let dagData = this.dagData;
        let links = dagData["links"];
        console.dir(links);
        if (!links || links.length == 0) {
            return;
        }
        let resultLinks = links.map((d) => {
            return {
                taskId: d.taskId,
                upstreamTaskId: d.upstreamTaskId,
                config: d.config
            }
        });
        //添加排重
        let linkDataSet = {};
        let linksData = [];
        for (let lk of resultLinks) {
            let key = lk.taskId + "-" + lk.upstreamTaskId;
            if (!linkDataSet[key]) {
                linksData.push(lk);
                linkDataSet[key] = true;
            } else {
                console.log(key);
            }
        }

        console.log(linksData);
        const linkJson = JSON.stringify(linksData);

        this.props.updateLinks(this.props.data.id, linkJson)
            .then((result) => {
                if (result.status == 0) {
                    notification["success"]({
                        message: '成功',
                        description: '操作成功',
                    });
                    that.getDataAndRender();
                } else {
                    notification["error"]({
                        message: "异常",
                        duration: 0,
                        description: result.data
                    });
                }
            });

    }

    showFirstTask = () => {
        let that = this;
        that.setState({
            showFirstModal: true
        })
    }

    /**
     * kill掉任务版本
     * @returns {any}
     */
    killVersion(){

    }

    /**
     * kill掉任务版本
     * @returns {any}
     */
    ignoreVersion(){

    }

    render() {

        const killBtn = (<div key={"kill-versionBtn"}>
            <Popconfirm title={"是否KIll当前任务？"} key={"killVersionPop"}
                        onConfirm={this.killVersion.bind(this)}>
                <Button key={"killVersionBtn"}>KIll当前任务</Button>
            </Popconfirm>
        </div>);
        const ingnoreBtn = (<div key={"ignore-versionBtn"}>
            <Popconfirm title={"是否当前任务置为成功？"} key={"ingoreVersionPop"}
                        onConfirm={this.ignoreVersion.bind(this)}>
                <Button key={"successVersionBtn"}>当前任务置为成功</Button>
            </Popconfirm>
        </div>);


        const currentTask = this.getTaskById(this.nodeId);
        //按钮添加
        let topBtns = [];
        //有节点显示“提交”
        //没有节点显示“添加任务”
        if (this.state.haveNode) {
            topBtns.push(<div>
                <Popconfirm title={"确认提交？"} onConfirm={this.submitFlow.bind(this)}>
                    <Button size={"large"} type={"primary"} icon={"to-top"}>提交</Button>
                </Popconfirm>
            </div>);
        } else {
            topBtns.push(<div>
                <Button size={"large"} type={"primary"} icon={"plus"} onClick={this.showFirstTask}>添加任务</Button>
            </div>);
        }

        return (
            <div className={"dag-container"} key={"dagContainer"}
                 style={{width: "100%", height: this.props.height, margin: "0 auto"}}>
                <svg ref={"dag"} style={{width: "100%", height: "100%"}}></svg>
                     <div className={"top-menu-container"}>
                        {topBtns}
                    </div> : ""

                {this.state.showMenu?
                    <div className={"menu-container"} key={"menu1Container"}
                         style={{top: this.state.nodeTop, left: this.state.nodeLeft}}>
                        <div>
                            <Button onClick={this.onAddUpStream}>添加上游</Button>
                        </div>
                        <div>
                            <Button onClick={this.onAddDownStream}>添加下游</Button>
                        </div>
                        <div>
                            <Popconfirm title={"是否删除任务？"} onConfirm={this.onDeleteTask}>
                                <Button>删除任务</Button>
                            </Popconfirm>
                        </div>
                    </div> : ""}
                {this.state.showLabelMenu  ?
                    <div className={"menu-container"} key={"menu2Container"}
                         style={{top: this.state.labelTop, left: this.state.labelLeft}}>
                        <div>
                            <Button onClick={this.showLinkConfModal}>编辑依赖关系</Button>
                        </div>
                        <div>
                            <Popconfirm title={"是否删除关联？"} onConfirm={this.onDeleteLink}>
                                <Button>删除关联</Button>
                            </Popconfirm>
                        </div>
                    </div> : ""}
                {this.state.showDetail ?
                    <div className={"detail-container"}
                         style={{top: this.state.detailTop, left: this.state.detailLeft}}>
                        <p><strong>id:&nbsp;</strong>{currentTask.id}</p>
                        <p><strong>名称:&nbsp;</strong>{currentTask.name}</p>
                        <p><strong>状态:&nbsp;</strong>{EnumUtils.getStatusName(currentTask.status)}</p>
                        <p><strong>时间粒度:&nbsp;</strong>{EnumUtils.getPeriodName(currentTask.period)}</p>
                        <p><strong>时间规则:&nbsp;</strong>{currentTask.cronExpression}</p>
                        <p><strong>创建人:&nbsp;</strong>{currentTask.user ? currentTask.user.name : ""}</p>
                        <p><strong>描述:&nbsp;</strong>{currentTask.description}</p>
                        <p><strong>创建时间:&nbsp;</strong>{CommonUtils.dateFormat(currentTask.createTime)}</p>
                        <p><strong>更新时间:&nbsp;</strong>{CommonUtils.dateFormat(currentTask.updateTime)}</p>
                    </div> : ""}
            </div>
        )
    }

}


export default DagVersionFixShow;