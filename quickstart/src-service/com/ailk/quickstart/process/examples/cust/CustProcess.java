package com.ailk.quickstart.process.examples.cust;

import java.sql.PreparedStatement;

import com.ailk.biz.BizConstants;
import com.ailk.biz.process.BizProcess;
import com.ailk.common.data.IData;
import com.ailk.common.data.impl.DataMap;
import com.ailk.database.config.DBRouteCfg;
import com.ailk.database.dbconn.DBConnection;
import com.ailk.quickstart.bean.cust.CustBean;
import com.ailk.quickstart.bean.cust.CustDAO;
import com.ailk.service.bean.BeanManager;
import com.ailk.service.client.ServiceFactory;
import com.ailk.service.session.SessionManager;

/**
 * 后台进程示例，每个IProcess.start时，系统会单独分配一个线程来执行run()里的逻辑，支持超时设置setTimeout()
 * 
 * @author liaos
 *
 */
public class CustProcess extends BizProcess {

	private static final long serialVersionUID = 4132129097549825836L;

	/**
	 * 所有的业务逻辑都在这里处理
	 */
	public void run() throws Exception {
		//数据库操作
		CustBean bean = BeanManager.createBean(CustBean.class);
		IData cust = bean.queryCustById("123221312301", "3109022309365911");
		
		//设置SessionCache数据, 在QCS_CustMgrByName里可以通过CUST_INFO获取到SessionCache的数据
		getSessionCache().setAttribute("CUST_INFO", cust);
		
		getInput().put("VIP_ID", "123221312301");
		getInput().put("CUST_ID", "3109022309365911");
		bean.updateCustName(getInput());
		
		CustDAO dao = CustBean.createDAO(CustDAO.class, "0731");
		getInput().put("TRADE_ID", "3113010143224247");
		dao.executeUpdateByCodeCode("TF_B_TRADE_SVC", "UPD_TRADESVC_STARTDATE2", getInput());
		
		//服务调用
		ServiceFactory.call("http://127.0.0.1:8080/service", "QCS_CustMgrByName", createDataInput(getInput()), null, false, true);
		
		//独立事务,根据Process归属的子系统获取0731的连接,连接默认已setAutoCommit(true)
		String route = DBRouteCfg.getRoute(DBRouteCfg.getGroup(getGroup()), "0731");
		DBConnection conn = SessionManager.getInstance().getAsyncConnection(route);
		
		PreparedStatement stmt = conn.prepareStatement("UPDATE tf_b_trade_svc SET start_date = sysdate where trade_id=?");
		stmt.setString(1, "4413010143224300");
		stmt.executeUpdate();
		stmt.close();
		conn.commit(); //若不提交将自动回滚
		//conn.close(); //必须手动close
	}
	
	public static void main(String[] args) {
		IData input = new DataMap();
		
		//上下文数据,即Visit里的信息
		input.put(BizConstants.STAFF_ID,"SUPERUSR");
		input.put(BizConstants.STAFF_NAME,"SUPERUSR");
		input.put(BizConstants.SERIAL_NUMBER,"121212");
		input.put(BizConstants.STAFF_EPARCHY_CODE,"0731");
		input.put(BizConstants.STAFF_EPARCHY_NAME,"0731");
		input.put(BizConstants.LOGIN_EPARCHY_CODE,"0731");
		input.put(BizConstants.LOGIN_EPARCHY_NAME,"0731");
		input.put(BizConstants.ROUTE_EPARCHY_CODE,"0731");
		input.put(BizConstants.DEPART_ID,"xxxx");
		input.put(BizConstants.DEPART_CODE,"xxxx");
		input.put(BizConstants.DEPART_NAME,"xxxx");
		input.put(BizConstants.CITY_CODE,"xxxx");
		input.put(BizConstants.CITY_NAME,"xxxx");
		input.put(BizConstants.PROVINCE_CODE,"xxxx");
		input.put(BizConstants.IN_MODE_CODE,"0");
		input.put(BizConstants.REMOTE_ADDR,"xxxx");
		input.put(BizConstants.SUBSYS_CODE,"quickstart");
		
		//业务数据
		input.put("VIP_ID","1525");
		input.put("CUST_ID","9200013987207011");
		
		//创建Process对象，并设置归属组用来控制数据库连接的路由
		CustProcess process = new CustProcess();
		process.setGroup("quickstart");
		
		//显示执行结果
		boolean result = process.start(input);
		System.out.println("后台进程执行结果:[" + result + "][" + process.getResultInfo() + "]");
	}
}
