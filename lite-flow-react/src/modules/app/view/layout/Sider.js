import React from "react";
import config from "../../../../common/config/Config";
import Menus from "./Menu";
import styles from './main.less';

function Sider({
                   user,
                   menu,
                   siderFold,
                   darkTheme,
                   handleClickNavMenu,
                   location}) {
    const menusProps = {
        user,
        menu,
        siderFold,
        darkTheme,
        location,
        handleClickNavMenu
    };

    return (
        <div className={"sider-menu"}>
            <div className={styles.logo}>
                <img src={`${config.assertPrefix}${config.dashBoardLogo}`}/>
            </div>
            <Menus {...menusProps} />
        </div>
    )
}
export default Sider
