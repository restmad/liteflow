import React from "react";
import {Badge, Icon, Menu} from "antd";
import styles from './main.less';

const SubMenu = Menu.SubMenu;

function Header({
                    user,
                    logout,
                    switchSider,
                    siderFold,
                    changeMessage,
                    massageNewCount}) {
    let handleClickMenu = e => e.key === 'logout' && logout();

    return (
        <div className={styles.header} >
            <div className={styles.siderbutton} key="switchSider" onClick={switchSider}>
                <Icon style={{color: 'rgb(101,119,141)'}} type={siderFold ? 'menu-unfold' : 'menu-fold'}/>
            </div>

            <Menu className='header-menu' mode='horizontal' onClick={handleClickMenu}>
                <SubMenu style={{
                    float: 'right'
                }} title={< span style={{color: '#65778d'}}> <Icon type='user'/> {user? user.name:'请登录'} </span>}>
                    {/*<Menu.Item key='editInfo'>*/}
                        {/*<a>修改资料</a>*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item key='logout'>
                        <a>注销</a>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}
export default Header;
