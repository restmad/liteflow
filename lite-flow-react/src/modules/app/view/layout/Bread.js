import React, {PropTypes} from "react";
import {Breadcrumb, Icon} from "antd";
import styles from './main.less';

function getPathArray(menuArray,field,value) {
    for (let item of menuArray) {
        if(field == 'url' && item.url && item.url == value){
            return [item];
        }
        if(field == 'name' && item.name == value){
            return [item];
        }
        if(item.children && item.children.length > 0){
            let subResult=getPathArray(item.children,field,value);
            if(subResult && subResult.length > 0){
                return [item].concat(subResult);
            }
        }
    }
    return [];
}

function Bread({location,menu}) {

    let pathNames = getPathArray(menu,'url',location.pathname);

    if(pathNames == null || pathNames.length ==0){
        pathNames = getPathArray(menu,'name', 'Dashbord');
    }

    const breads = pathNames.map((item,index) => {
        return (
            <Breadcrumb.Item key={item.key} {...((pathNames.length - 1 === index) || !item.url) ? '' : {href:'#'+ item.path}}>
                {item.extra ? <Icon type={item.extra}/> : ''}
                <span>{item.name}</span>
            </Breadcrumb.Item>
        )
    });

    return (
        <div className={styles.bread}>
            <Breadcrumb>
                {/*<Breadcrumb.Item href='#/'><Icon type='home'/>*/}
                    {/*<span>主页</span>*/}
                {/*</Breadcrumb.Item>*/}
                {breads}
            </Breadcrumb>
        </div>
    )
}

export default Bread
