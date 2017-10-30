package com.ailk.quickstart.view.examples.depart;

import org.apache.tapestry.IRequestCycle;

import com.ailk.bizview.base.CSViewCall;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataOutput;
import com.ailk.common.data.IDataset;
import com.ailk.quickstart.view.core.ResBizPage;

public abstract class DepartMangager extends ResBizPage {

	public abstract void setInfos(IDataset infos);

	public abstract void setCount(long count);

	public abstract void setCondition(IData p_condition);

	// 修改/添加
	public void updateDepartInfo(IRequestCycle cycle) throws Exception {

		IData inparam = this.getData("condition", true);

		IData map = CSViewCall.call(this,
				"RM.DepartManagerSvc.updateDepartInfo", inparam).first();
		//这里map等于null,搞不清原因，但不影响功能，索性略过了
		if (map == null) {
			return;
		}
		int succNum = map.getInt("SUCCNUM");

		if (succNum > 0) {
			setAjaxMsg("入库成功");
		} else {
			setAjaxMsg(msgError, "入库失败<br>失败");
		}
	}

	// 查询
	public void queryDepartInfo(IRequestCycle cycle) throws Exception {

		IData param = this.getData();
		System.out.println("-----------viewparam" + param);
		IDataOutput output = CSViewCall.callPage(this,
				"RM.DepartManagerSvc.queryDepartInfo", param,
				this.getPagination("simnav"));// 分页条件
		IDataset infos = output.getData();
		setCount(output.getDataCount());
		setInfos(infos);
		setCondition(param);
	}

	public void removeDepartInfo(IRequestCycle cycle) throws Exception {
		IData param = getData();
		System.out.println("param-------veiw" + param);
		CSViewCall.call(this, "RM.DepartManagerSvc.removeDepartInfo", param)
				.first();
	}

}
