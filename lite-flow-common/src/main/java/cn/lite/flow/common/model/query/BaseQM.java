package cn.lite.flow.common.model.query;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;


/**
 * 基础的查询模型
 */
@Data
@ToString
public class BaseQM implements Serializable {

	private Long id;                                  //id

	private List<Long> ids;                           //ids

	private Boolean isDesc;                           //是不是降序

	private Page page;                                //分页

	private Integer status;                           //状态

	private OrderByOperation orderByOperation;        //order by 相关操作，支持多个字段

	public static final int DEFAULT_PAGE_SIZE = 10;	  //默认每页数量

	public static final String COL_ID = "id";

	public static final String COL_UPDATE_TIME = "update_time";

	public static final String COL_CREATE_TIME = "create_time";

	/**
	 * 添加排序
	 * @param orderColumn
	 */
	public void addOrderAsc(String orderColumn){

		if(orderByOperation == null){
			orderByOperation = new OrderByOperation();
		}

		orderByOperation.addOrderItem(orderColumn, OrderByOperation.ORDER_OPERATOR_ASC);
	}

	public void addOrderDesc(String orderColumn){

		if(orderByOperation == null){
			orderByOperation = new OrderByOperation();
		}

		orderByOperation.addOrderItem(orderColumn, OrderByOperation.ORDER_OPERATOR_DESC);
	}

    /**
     * 根据页码和每页数量  设置分页查询参数
     *
     * @param pageNum       页码
     * @param pageSize      每页数量
     */
	public void setPage(int pageNum, int pageSize) {
        this.setPage(Page.getPageByPageNo(pageNum, pageSize));
	}

}
