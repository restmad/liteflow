import React, {Component} from 'react';
import {observer} from "mobx-react";
import {inject} from '../../../common/utils/IOC';
import {AuthModel} from "../model/AuthModel";
import Search from "../component/AuthSearch";
import {Row} from 'antd'
import {AuthList, AuthListProps} from "../component/AuthList";
import AuthOperation from "../component/AuthOperation";


export class AuthViewProps {
    targetId: number;
    targetType: number;
}


@observer
export default class AuthView extends Component<AuthViewProps, any> {

    @inject(AuthModel)
    private authModel: AuthModel;

    constructor(props) {
        super(props);
    }

    componentWillMount(): void {
        const {targetId, targetType} = this.props;
        let query = {};
        if(targetId && targetType){
            query["targetId"] = targetId;
            query["targetType"] = targetType;
        }

        this.authModel.query(query);
    }

    /**
     * 搜索参数
     * @returns {{user: any; onSearch: ((searchVo: AuthSearchParam) => any); onAdd: ((auth: Auth) => any)}}
     */
    getSearchProps(){
        let that = this;
        const {targetId, targetType} = this.props;
        return {
            authModel: that.authModel,
            targetId: targetId,
            targetType: targetType,

        };
    };

    getListProps(): AuthListProps {
        let that = this;
        const {targetId, targetType} = this.props;
        return {
            targetType: targetType,
            targetId: targetId,
            dataSource: this.authModel.auths,
            loading: this.authModel.loading,
            pageConfig:this.authModel.pageConfig,
            authModel: that.authModel
        };
    };

    getOperProps(){
        let that = this;
        const {targetId, targetType} = this.props;
        return {
            targetType: targetType,
            targetId: targetId,
            authModel: that.authModel
        };
    };

    render() {
        const dom = (<Row className={"container-row-block"}>
                <Search {...this.getSearchProps()}/>
            </Row>);
        return (
            <Row>
                {dom}
                <Row className={"container-row-block"}>
                    <Row className={"op-btns-container"}>
                        <AuthOperation {...this.getOperProps()}/>
                    </Row>
                    <Row>
                        <AuthList {...this.getListProps()}/>
                    </Row>
                </Row>
            </Row>
        )
    }

}
