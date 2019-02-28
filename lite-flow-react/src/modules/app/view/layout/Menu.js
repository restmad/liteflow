import React from "react";
import {Icon, Menu} from "antd";
import {Link} from "react-router";

const arrayContains = function(array,key) {
    for (let i in array) {
        if (array[i] == key) return true;
    }
    return false;
}

const getMenus = function (topMenuKeys, menuArray, siderFold) {
    return menuArray.map(item => {
        if (item.children && item.children.length > 0) {
            return (
                <Menu.SubMenu key={item.key} title={<span>{(item.icon && item.icon != "") ? <Icon
                    type={item.icon}/> : ''}{siderFold && arrayContains(topMenuKeys, item.key) ? '' : item.name}</span>}>
                    {getMenus(topMenuKeys,item.children, siderFold)}
                </Menu.SubMenu>
            )
        } else {
            return (
                <Menu.Item key={item.key} path={item.url}>
                    <Link to={item.url}>
                        {(item.icon && item.icon != "") ? <Icon type={item.icon} /> : ''}
                        {siderFold && arrayContains(topMenuKeys, item.key) ? "" : item.name}
                    </Link>
                    <span>
                    {/*<Link to={item.url}>
                        {item.icon ? <Icon type={item.icon}/> : ''}
                        {siderFold && arrayContains(topMenuKeys,item.key) > 0 ? '' : item.name}
                    </Link>*/}
                    </span>
                </Menu.Item>
            )
        }
    })
};


function getPathArray(menuArray, field, value) {
    for (let item of menuArray) {
        if (field == 'url' && item.url && item.url == value) {
            return [item];
        }
        if (field == 'name' && item.name == value) {
            return [item];
        }
        if (item.children && item.children.length > 0) {
            let subResult = getPathArray(item.children, field, value);
            if (subResult && subResult.length > 0) {
                return [item].concat(subResult);
            }
        }
    }
    return [];
}
function Menus({menu, siderFold, darkTheme, location, isNavbar}) {
    let topMenuKeys = menu.map(item => item.key);
    let menuItems = getMenus(topMenuKeys, menu, siderFold);

    let pathNames = getPathArray(menu, 'url', location.pathname);

    if (pathNames == null || pathNames.length == 0) {
        pathNames = getPathArray('name', 'Dashboard');
    }
    let selectedNode = pathNames.map(item => item.key);
    return (
        <Menu
            inlineCollapsed={siderFold}
            mode={'inline'}
            theme={darkTheme ? 'dark' : 'light'}
            defaultOpenKeys={isNavbar ? menuItems.map(item => item.key) : []}
            defaultSelectedKeys={selectedNode}>
            {menuItems}
        </Menu>
    )
}

export default Menus
