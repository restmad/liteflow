package cn.lite.flow.console.model.basic;

import lombok.Data;
import lombok.ToString;

import java.util.List;

/**
 * 菜单
 */
@Data
@ToString
public class Menu {

    private Long id;

    private String name;                    //名称

    private String icon;                    //icon;

    private String description;             //说明

    private Integer orderNum;               //排序

    private List<MenuItem> menuItemList;    //子菜单列表

}
