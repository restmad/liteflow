import {action, computed, observable} from 'mobx';
import {provideSingleton} from "../../../common/utils/IOC";
import {notification} from 'antd';

export class SysInfo {
    isNavbar: boolean = false;
    darkTheme: boolean = true;
    siderFold: boolean = true;
    menuPopoverVisible: boolean = false;
    navOpenKeys: Array<any> = [];
}

export class Message{
    type:string;
    title:string;
    msg: string;
    duration: number;
    constructor(type: string, title: string, msg: string, duration: number = 5) {
        this.type = type;
        this.title = title;
        this.msg = msg;
        this.duration = duration;
    }
}

@provideSingleton(SysInfoModel)
export class SysInfoModel {
    sysInfo: SysInfo = observable.object(new SysInfo());
    @observable menu: Array<any> = [];


    @action
    switchMenuPopver(): void {
        this.sysInfo.menuPopoverVisible = !this.sysInfo.menuPopoverVisible;
    }

    @action
    switchSider(): void {
        this.sysInfo.siderFold = !this.sysInfo.siderFold;
    }

    @action
    switchTheme(): void {
        this.sysInfo.darkTheme = !this.sysInfo.darkTheme;
    }

    @action
    handleNavOpenKeys(openKeys): void {
        this.sysInfo.navOpenKeys = openKeys;
    }

    sendMessage(message:Message) {
        notification[message.type]({
            message: message.title,
            duration: message.duration,
            description: message.msg
        });
    }

}