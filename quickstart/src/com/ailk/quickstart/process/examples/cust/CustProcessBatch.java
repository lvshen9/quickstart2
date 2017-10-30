/**
 * 
 */
package com.ailk.quickstart.process.examples.cust;


import com.ailk.biz.BizConstants;
import com.ailk.biz.process.BizProcess;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DataMap;
import com.ailk.common.data.impl.Pagination;
import com.ailk.database.dao.DAOManager;
import com.ailk.quickstart.bean.cust.CustDAO;

/**
 * 后台进程示例，每个IProcess.start时，系统会单独分配一个线程来执行run()里的逻辑，支持超时设置setTimeout()
 * 
 * @author liaos
 * 
 */
public class CustProcessBatch extends BizProcess {

	/**
	 * 所有的业务逻辑都在这里处理
	 */
	public void run() throws Exception {
		// 数据库操作
		CustDAO dao = DAOManager.createDAO(CustDAO.class, "cen1");

		System.out.println("begin select");
		
		Pagination p = new Pagination();
		p.setFetchSize(10000);
		IDataset dataset = dao
				.queryList(
						"select t.PACKAGE_ID,t.ELEMENT_TYPE_CODE,t.ELEMENT_ID,t.MAIN_TAG,t.DEFAULT_TAG,t.FORCE_TAG,t.ENABLE_TAG,t.START_ABSOLUTE_DATE,t.START_OFFSET,t.START_UNIT,t.END_ENABLE_TAG,t.END_ABSOLUTE_DATE,t.END_OFFSET,t.END_UNIT,t.CANCEL_TAG,t.CANCEL_ABSOLUTE_DATE,t.CANCEL_OFFSET,t.CANCEL_UNIT,t.START_DATE,t.END_DATE, 'asdfadfsad' as RSRV_STR5, t.rowid from td_b_package_element t Where Rownum <= 100000",
						new String[] {}, p);
		System.out.println("size = " + dataset.size());
		long s = System.currentTimeMillis();
		dao.update("td_b_package_element", dataset, new String[] { "RSRV_STR5" }, new String[] { "ROWID" }, 5000);
		System.out.println((System.currentTimeMillis() - s));
	}

	public static void main(String[] args) {
		IData input = new DataMap();

		// 上下文数据,即Visit里的信息
		input.put(BizConstants.STAFF_ID, "SUPERUSR");
		input.put(BizConstants.STAFF_NAME, "SUPERUSR");
		input.put(BizConstants.SERIAL_NUMBER, "121212");
		input.put(BizConstants.STAFF_EPARCHY_CODE, "0731");
		input.put(BizConstants.STAFF_EPARCHY_NAME, "0731");
		input.put(BizConstants.LOGIN_EPARCHY_CODE, "0731");
		input.put(BizConstants.LOGIN_EPARCHY_NAME, "0731");
		input.put(BizConstants.ROUTE_EPARCHY_CODE, "0731");
		input.put(BizConstants.DEPART_ID, "xxxx");
		input.put(BizConstants.DEPART_CODE, "xxxx");
		input.put(BizConstants.DEPART_NAME, "xxxx");
		input.put(BizConstants.CITY_CODE, "xxxx");
		input.put(BizConstants.CITY_NAME, "xxxx");
		input.put(BizConstants.PROVINCE_CODE, "xxxx");
		input.put(BizConstants.IN_MODE_CODE, "0");
		input.put(BizConstants.REMOTE_ADDR, "xxxx");
		input.put(BizConstants.SUBSYS_CODE, "quickstart");

		// 业务数据
		input.put("VIP_ID", "1525");
		input.put("CUST_ID", "9200013987207011");

		// 创建Process对象，并设置归属组用来控制数据库连接的路由
		CustProcessBatch process = new CustProcessBatch();
		process.setGroup("quickstart");

		// 显示执行结果
		boolean result = process.start(input);
		System.out.println("后台进程执行结果:[" + result + "][" + process.getResultInfo() + "]");
	}
}
