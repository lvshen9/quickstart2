/**
 * 
 */
package com.ailk.quickstart.view.examples.cust;

import org.apache.tapestry.IRequestCycle;

import com.ailk.biz.view.BizPage;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataInput;
import com.ailk.common.data.IDataOutput;
import com.ailk.common.data.IDataset;
import com.ailk.service.client.ServiceFactory;
import com.ailk.web.util.BaseUtil;

/**
 * 客户管理示例
 * @author yifur
 */
public abstract class CustMgr extends BizPage {

	public abstract void setCusts(IDataset custs);
	public abstract void setCondition(IData condition);
	public abstract void setEdit(IData edit);
	public abstract void setCustsCount(long count);
	
	
	/**
	 * 搜索建议组件设置搜索数据集
	 * 
	 * @param cycle
	 * @throws Exception
	 */
	public void initCustNames(IRequestCycle cycle) throws Exception {
		
		IDataInput input = createDataInput("custnav");
		if (log.isDebugEnabled()) {
			log.debug("会话信息" + input.getHead());
		}
		
		input.getData().put("STAFF_ID", "ITFWC003");
		input.getData().put("PASSWORD", "lc");
		
		IDataOutput custs = ServiceFactory.call("SYS_Security_GetStaffInfo", input);
		System.out.println(">>>>>>>>>>>>>."+custs.getData());
		//如果需要通过拼音首字母搜索则: BaseUtil.buildSearchData(custs.getData(), "CUST_NAME")
		setAjax(BaseUtil.buildSearchData(custs.getData(), "CUST_NAME"));
		
	}

	/**
	 * 模糊查询
	 * 
	 * @param cycle
	 * @throws Exception
	 */
	public void queryCusts(IRequestCycle cycle) throws Exception {
		IDataInput input = createDataInput();
		
		if (log.isDebugEnabled()) {
			log.debug("会话信息" + input.getHead());
		}
		
		IDataOutput custs = ServiceFactory.call("QCS_CustMgrByName", input, getPagination());
		
		setCusts(custs.getData());
		setCustsCount(custs.getDataCount());
	}

	/**
	 * 根据ID查询
	 * 
	 * @param cycle
	 * @throws Exception
	 */
	public void queryCust(IRequestCycle cycle) throws Exception {
		IDataOutput custs = ServiceFactory.call("QCS_CustMgrById", createDataInput());
		setEdit(custs.getData().getData(0));
	}

	/**
	 * 编辑表单
	 * 
	 * @param cycle
	 * @throws Exception
	 */
	public void editCust(IRequestCycle cycle) throws Exception {
		IDataOutput custs = ServiceFactory.call("TCS_CustMgrEdit", createDataInput());
		setAjax(custs.getData());
	}
	
	/**
	 * 同步导入示例,根据上传的文件ID获取数据
	 * 
	 * @param cycle
	 * @throws Exception
	 */
	public void importDataByFile(IRequestCycle cycle) throws Exception {
		IData rs = ServiceFactory.call("QCS_CustMgrForImport", createDataInput()).getData().getData(0);
		setAjax(rs);
	}

	/**
	 * 同步导出,根据生成的文件ID生成下载的URL地址
	 * 
	 * @param cycle
	 * @throws Exception
	 */
	public void exportDataToFile(IRequestCycle cycle) throws Exception {
		IDataInput input = createDataInput();
		input.getData().put("FILE_NAME", "静态参数列表.xls");
		
		IDataset custs = ServiceFactory.call("QCS_CustMgrForExport", input).getData();
		
		String url = (String) custs.get(0);
		setAjax("url", url);
	}
	
	
	/**
	 * 权限验证示例
	 * @param cycle
	 * @throws Exception
	 */
	public void hasOperPriv(IRequestCycle cycle) throws Exception {
		IDataOutput custs = ServiceFactory.call("TCS_CustMgrEdit", createDataInput());
		setAjax(custs.getData());
	}
	
}
