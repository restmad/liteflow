package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

/**
 * 菜单项
 */
@Data
@ToString
public class MenuItem {

    private Long id;

    private Long menuId;        //菜单id

    private String name;        //名称

    private String url;         //菜单对应的url

    private Integer orderNum;   //排序字段
}
