import React, {Component} from 'react';
import {observer} from "mobx-react";
import {inject} from '../../../common/utils/IOC';
import {PluginModel, PluginSearchParam, Plugin} from "../model/PluginModel";
import Search, {PluginSearchProps} from "../component/PluginSearch";
import {Row} from 'antd'
import {PluginList, PluginListProps} from "../component/PluginList";
import PluginOperation, {PluginOperProps} from "../component/PluginOperation";

@observer
export default class PluginView extends Component<{}, any> {

    @inject(PluginModel)
    private pluginModel: PluginModel;

    constructor(props) {
        super(props);
    }

    componentWillMount(): void {
        this.pluginModel.query({});
    }

    /**
     * 搜索参数
     * @returns {{user: any; onSearch: ((searchVo: PluginSearchParam) => any); onAdd: ((plugin: Plugin) => any)}}
     */
    getSearchProps(){
        let that = this;
        return {
            pluginModel: that.pluginModel
        };
    };

    getListProps(): PluginListProps {
        let that = this;
        return {
            dataSource: this.pluginModel.plugins,
            loading: this.pluginModel.loading,
            pageConfig:this.pluginModel.pageConfig,
            pluginModel: that.pluginModel
        };
    };

    getOperProps(){
        let that = this;
        return {
            pluginModel: that.pluginModel
        };
    };

    render() {
        return (
            <Row>
                <Row className={"container-row-block"}>
                    <Search {...this.getSearchProps()}/>
                 </Row>
                <Row className={"container-row-block"}>
                    <Row className={"op-btns-container"}>
                        <PluginOperation {...this.getOperProps()}/>
                    </Row>
                    <Row>
                        <PluginList {...this.getListProps()}/>
                    </Row>
                </Row>
            </Row>
        )
    }

}
