import React, {Component} from 'react';
import classnames from 'classnames'
import {inject} from "../../../common/utils/IOC";
import {observer} from "mobx-react";
import {withRouter} from 'react-router';

import Sider from './layout/Sider';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Bread from './layout/Bread';
import styles from "./layout/main.less";

import {SysInfoModel} from "../model/SysInfoModel";
import {SysUserModel} from "../model/SysUserModel";

interface IProps {
    location: any;
    router:any
}


@observer
class App extends Component<IProps, any> {

    @inject(SysInfoModel)
    private sysInfoModel: SysInfoModel;

    @inject(SysUserModel)
    private sysUserModel: SysUserModel;

    render() {
        let that = this;
        let sysUser = this.sysUserModel.sysUser;
        let sysInfo = this.sysInfoModel.sysInfo;

        const headerProps = {
            user:sysUser,
            siderFold:sysInfo.siderFold,
            location:this.props.location,
            isNavbar:sysInfo.isNavbar,
            menuPopoverVisible:sysInfo.menuPopoverVisible,
            massageNewCount:0,
            switchMenuPopover () {
                that.sysInfoModel.switchMenuPopver();
            },
            logout () {
                that.sysUserModel.logout(that.props.router);
            },
            switchSider () {
                that.sysInfoModel.switchSider();
            },
            changeMessage () {

            },
            queryLimitNewCount () {

            }
        };


        const siderProps = {
            user: sysUser,
            menu: sysUser.menus,
            siderFold: sysInfo.siderFold,
            darkTheme: sysInfo.darkTheme,
            location: this.props.location,
            changeTheme () {
                that.sysInfoModel.switchTheme();
            },
            handleClickNavMenu(e){
                let path = e.item.props.path;
                if(path){
                }
            }
        };


        const breadProps = {
            menu: this.sysUserModel.sysUser.menus,
            location: this.props.location,
        };
        return (
            <div>
                <div
                    className={classnames(styles.layout, {[styles.fold]: sysInfo.isNavbar ? false : sysInfo.siderFold}, {[styles.withnavbar]: sysInfo.isNavbar})}>
                    <aside className={classnames(styles.sider, {[styles.light]: !sysInfo.darkTheme})}>
                        <Sider {...siderProps} />
                    </aside>
                    <div className={styles.main}>
                        <Header {...headerProps} />
                        <Bread {...breadProps}/>
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <div className="content-inner">
                                {this.props.children}
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(App);