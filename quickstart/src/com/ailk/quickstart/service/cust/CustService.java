package com.ailk.quickstart.service.cust;


import org.apache.log4j.Logger;

import com.ailk.biz.service.BizService;
import com.ailk.biz.service.route.BizRouteFactory;
import com.ailk.biz.service.route.impl.RouteByStaffId;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DataMap;
import com.ailk.common.data.impl.DatasetList;
import com.ailk.common.data.impl.Pagination;
import com.ailk.common.util.parser.ExcelConfig;
import com.ailk.common.util.parser.ImpExpUtil;
import com.ailk.jlcu.Engine;
import com.ailk.jlcu.util.Constant;
import com.ailk.quickstart.bean.cust.CustBean;
import com.ailk.service.bean.BeanManager;
import com.ailk.service.session.app.AppSession;

public class CustService extends BizService {
	
	private static final transient Logger log = Logger.getLogger(CustService.class);

	private static final long serialVersionUID = 1L;

	/**
	 * 设置默认路由,具体逻辑由业务确定
	 */
	@Override
	public void initialize(IData input) throws Exception {
		super.initialize(input);

		// 设置默认路由规则为CustRouteRule
		String defaultRouteId = BizRouteFactory.getRoute(RouteByStaffId.class, getVisit(), input);
		if (log.isDebugEnabled()) {
			log.debug("服务设置默认路由:" + defaultRouteId);
		}
		setRouteId(defaultRouteId);

		// 设置服务调用的方法拦截器,子类若不重载initialize方法将一直有效
		setMethodIntercept(CustServiceMethodIntercept.class.getName());
		
	}

	/**
	 * query custs
	 * 
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public IDataset queryCusts(IData data) throws Exception {
		CustBean bean = BeanManager.createBean(CustBean.class);
		
		//从上下文取数据库连接，执行SQL，并返回结果集
		//bean.queryCustByVipId("10020041225006468670");
		//Connection conn = AppSession.getSession().getConnection("sys");
		
		data.put("CUST_LOCK_KEY", "10020041225006468670");
		data.put("CUST_CACHE_KEY", "10020041225006468670");
		
		AppSession.getSession().lock(CustMgrLock.class, new Object[] {"CUST_LOCK_KEY", data});
		//SessionManager.getInstance().lock(CustMgrLock.class, new Object[] {"CUST_LOCK_KEY", data});
		
		CustMgrShareObject cmso = AppSession.getSession().getShareObject(CustMgrShareObject.class);
		cmso.test("CustMgrShareObject", data);
		/*CustMgrShareObject cmso = SessionManager.getInstance().getShareObject(CustMgrShareObject.class);
		cmso.test("CustMgrShareObject", data);*/
		
		/*SessionManager.getInstance().getAsyncConnection("crm1");
		Thread.sleep(30000);*/
		
		return bean.queryCustsByCustName(data.getString("CUST_NAME"), data.getString("CUST_ID"), getPagination());
	}
	
	/**
	 * 验证是否有权限,只需要注入权限编码即可
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public IDataset testPriv(IData data) throws Exception {
		return null;
	}

	/**
	 * 同步导入示例
	 * 
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public IDataset importCusts(IData data) throws Exception {
		IDataset dataset = new DatasetList();

		IData rs = new DataMap();

		String fileId = data.getString("FILE_ID");

		ImpExpUtil.getImpExpManager().getFileAction().setVisit(getVisit());

		IData array = ImpExpUtil.beginImport(null, fileId, ExcelConfig.getSheets("export/custmgr.xml"));
		IDataset[] suc = (IDataset[]) array.get("right");// 解析成功的数据
		IDataset[] err = (IDataset[]) array.get("error");// 解析失败的数据
		int sucCount = array.getInt("rightCount");// 解析成功的数据总条数
		int errCount = array.getInt("errorCount");// 解析失败的数据总条数

		// 将解析失败的数据返回到客户端
		String errorFileName = "导出失败数据.xls";

		IData params = new DataMap();
		params.put("posX", "0");
		params.put("posY", "0");
		params.put("ftpSite", "quickstart");// quickstart配置在wd_f_ftpacct.FTP_SITE
		params.put("filePath", "error");// 相对目录,相对于wd_f_ftpacct.ROOT_PATH

		// 将数据写入文件并返回文件ID
		String errFileId = ImpExpUtil.beginExport(null, params, errorFileName, err,
				ExcelConfig.getSheets("export/custmgr.xml"));

		// 获取文件下载的URL
		String url = ImpExpUtil.getDownloadPath(errFileId, errorFileName);

		rs.put("SUC_COUNT", sucCount);
		rs.put("ERR_COUNT", errCount);
		rs.put("ERR_URL", url);

		dataset.add(rs);
		return dataset;
	}

	/**
	 * 同步导出示例
	 * 
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public String exportCusts(IData data) throws Exception {
		IDataset custs = new DatasetList();

		// 根据实际情况设置分页参数
		Pagination pagin = new Pagination(1000);
		pagin.setFetchSize(500);// 设置ResultSet.setFetchSize();

		CustBean bean = BeanManager.createBean(CustBean.class);

		// 添加第一页数据,主要是初始化pagin.getCount()
		IDataset dataset = bean.exportStaticData(data, pagin);
		if (dataset != null) {
			custs.addAll(dataset);
		}

		// 添加下一页数据,直到next()返回false
		while (pagin.next()) {
			dataset = bean.exportStaticData(data, pagin);
			if (dataset != null) {
				custs.addAll(dataset);
			}
		}

		String fileName = data.getString("FILE_NAME", "");

		// 创建导出需要的固定参数
		IData params = new DataMap();
		params.put("posX", "0");
		params.put("posY", "0");
		params.put("ftpSite", "quickstart");// quickstart配置在wd_f_ftpacct.FTP_SITE
		params.put("filePath", "a/b/c");// 相对目录,相对于wd_f_ftpacct.ROOT_PATH

		// 设置文件处理上下文
		ImpExpUtil.getImpExpManager().getFileAction().setVisit(getVisit());

		// 将数据写入文件并返回文件ID
		String fileId = ImpExpUtil.beginExport(null, params, fileName, new IDataset[] { custs },
				ExcelConfig.getSheets("export/custmgr.xml"));

		// 获取文件下载的URL
		String url = ImpExpUtil.getDownloadPath(fileId, fileName);

		return url;
	}

	/**
	 * JLCU示例
	 * 
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public IDataset queryCustsByJlcu(IData data) throws Exception {
		Engine engine = com.ailk.jlcu.EngineFactory.createEngine();
		data.put(Constant.JLCU_NAME, "JLCU_CustList");
		IDataset result = (IDataset) engine.executeLCU(data);
		return result;
	}

	/**
	 * query cust
	 * 
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public IData queryCust(IData data) throws Exception {
		CustBean bean = BeanManager.createBean(CustBean.class);
		return bean.queryCustById(data.getString("VIP_ID"), data.getString("CUST_ID"));
	}

	/**
	 * query custs
	 * 
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public boolean editCust(IData data) throws Exception {
		CustBean bean = BeanManager.createBean(CustBean.class);
		return bean.updateCustName(data);
	}
}
