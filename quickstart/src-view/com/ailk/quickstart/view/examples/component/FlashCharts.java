package com.ailk.quickstart.view.examples.component;

import org.apache.tapestry.IRequestCycle;

import com.ailk.biz.view.BizPage;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DatasetList;
import com.ailk.web.view.component.chart.ChartManager;
import com.ailk.web.view.component.chart.info.AreaChart;
import com.ailk.web.view.component.chart.info.BarChart;
import com.ailk.web.view.component.chart.info.ColumnChart;
import com.ailk.web.view.component.chart.info.ColumnLineChart;
import com.ailk.web.view.component.chart.info.DoughnutChart;
import com.ailk.web.view.component.chart.info.KeyValue;
import com.ailk.web.view.component.chart.info.LineChart;
import com.ailk.web.view.component.chart.info.PieChart;
import com.ailk.web.view.component.chart.info.StackedBarChart;
import com.ailk.web.view.component.chart.info.StackedColumnChart;

public abstract class FlashCharts extends BizPage {
	
	/** 饼状图 */
	public void getPieChart(IRequestCycle cycle) throws Exception {
		PieChart c = new PieChart();
		c.setHeight(300);//设置高度，建议与组件设置相同
		c.setWidth(500);//设置宽度，建议与组件设置相同
		c.setTitle("饼状图");//设置标题
//		c.setChart3D(false);

		//数据集
		IDataset dataset = getDataset();
//		IDataset dataset = getMutiDataset();
		ChartManager.createPieChart(cycle, c, dataset);

	}
	/** 环状图 */
	public void getDoughnutChart(IRequestCycle cycle) throws Exception {
		DoughnutChart c = new DoughnutChart();
		c.setHeight(300);//设置高度，建议与组件设置相同
		c.setWidth(500);//设置宽度，建议与组件设置相同
		c.setTitle("环状图");//设置标题
//		c.setChart3D(false);

		//数据集
		IDataset dataset = getDataset();
//		IDataset dataset = getMutiDataset();

		ChartManager.createDoughnutChart(cycle, c, dataset);

	}
	/** 区域图 */
	public void getAreaChart(IRequestCycle cycle) throws Exception {
		AreaChart chart = new AreaChart();
		chart.setTitle("区域图"); //设置标题
		chart.setHorizontalTitle("月份"); 
		chart.setVerticalTitle("产量"); 
		chart.setWidth(500);//设置宽度，建议与组件设置相同
		chart.setHeight(300);//设置高度，建议与组件设置相同

		//数据集
		IDataset dataset = getDataset();
//		IDataset dataset = getMutiDataset();
		
		ChartManager.createAreaChart(cycle, chart, dataset);
	}
	/** 条形图 */
	public void getBarChart(IRequestCycle cycle) throws Exception {
		
		BarChart barchart = new BarChart();
		barchart.setTitle("条形图"); //设置标题
		barchart.setHorizontalTitle("省市"); 
		barchart.setVerticalTitle("产量"); 
		barchart.setWidth(500);//设置宽度，建议与组件设置相同
		barchart.setHeight(300);//设置高度，建议与组件设置相同
		barchart.setChart3D(true);

		//数据集
		IDataset dataset = getDataset();
//		IDataset dataset = getMutiDataset();
		
		ChartManager.createBarChart(cycle, barchart, dataset);
	}
	/** 柱状图 */
	public void getColumnChart(IRequestCycle cycle) throws Exception {
		
		ColumnChart barchart = new ColumnChart();
		barchart.setTitle("柱状图"); //设置标题
		barchart.setHorizontalTitle("水果"); //设置横向标题
		barchart.setVerticalTitle("产量"); //设置纵向标题
		barchart.setWidth(500);//设置宽度，建议与组件设置相同
		barchart.setHeight(300);//设置高度，建议与组件设置相同
//		barchart.setChart3D(false);
		
		// 数据集
//		IDataset dataset = getDataset();
		IDataset dataset = getMutiDataset();
		
		ChartManager.createColumnChart(cycle, barchart,dataset);
	}
	/** 多曲线趋势图 */
	public void getLineChart(IRequestCycle cycle) throws Exception {
		
		//组件传递参数
		IData params = getData();
		System.out.println(params);
		LineChart lc = new LineChart();
		lc.setHeight(300);//设置高度，建议与组件设置相同
		lc.setWidth(500);//设置宽度，建议与组件设置相同
		lc.setTitle("多曲线趋势图");//设置标题
		lc.setHorizontalTitle("季度");//设置横向标题
		lc.setVerticalTitle("GDP");//设置纵向标题
		
//		IDataset dataset = getDataset();
		IDataset dataset =  getMutiDataset();

		ChartManager.createLineChart(cycle, lc, dataset);
	}
	/* 累积条形图 */
	public void getStackedBarChart(IRequestCycle cycle)throws Exception{
		
		StackedBarChart lc = new StackedBarChart();
		lc.setHeight(300);//设置高度，建议与组件设置相同
		lc.setWidth(500);//设置宽度，建议与组件设置相同
		lc.setTitle("累积条形图");//设置标题
		lc.setHorizontalTitle("Season");//设置横向标题
		lc.setVerticalTitle("GDP");//设置纵向标题
		
		IDataset dataset =  getMutiDataset();
		
		ChartManager.createStackedBarChart(cycle, lc, dataset);
	}
	
	/* 累积柱状图 */
	public void getStackedColumnChart(IRequestCycle cycle)throws Exception{
		StackedColumnChart lc = new StackedColumnChart();
		lc.setHeight(300);//设置高度，建议与组件设置相同
		lc.setWidth(500);//设置宽度，建议与组件设置相同
		lc.setTitle("累积柱状图");//设置标题
		lc.setHorizontalTitle("季度");//设置横向标题
		lc.setVerticalTitle("GDP");//设置纵向标题
//		lc.setChart3D(false);
		
		IDataset dataset = getMutiDataset();
		
		ChartManager.createStackedColumnChart(cycle, lc, dataset);
	}

	/* 柱状曲线结合图*/
	public void getColumnLineChart(IRequestCycle cycle)throws Exception{
		
		ColumnLineChart lc = new ColumnLineChart();
		lc.setHeight(300);//设置高度，建议与组件设置相同
		lc.setWidth(600);//设置宽度，建议与组件设置相同
		lc.setTitle("柱状曲线结合图");//设置标题
		lc.setHorizontalTitle("季度");//设置横向标题
		lc.setVerticalTitle("GDP");//设置纵向标题
//		lc.setChart3D(false);
		
		IDataset dataset = getMutiDataset();
		
		ChartManager.createColumnLineChart(cycle, lc, dataset);
	}
	//单纬度数据
	private IDataset getDataset(){
		IDataset dataset = new DatasetList();
		KeyValue kv1 = new KeyValue("湖北",400);
		KeyValue kv2 = new KeyValue("湖南",600);
		KeyValue kv3 = new KeyValue("河南",900);
		KeyValue kv4 = new KeyValue("河北",700);
		KeyValue kv5 = new KeyValue("山东",800);
		KeyValue kv6 = new KeyValue("山西",1050);
		KeyValue kv7 = new KeyValue("广东",900);
		KeyValue kv8 = new KeyValue("广西",700);
		
		dataset.add(kv1);dataset.add(kv2);
		dataset.add(kv3);dataset.add(kv4);
		dataset.add(kv5);dataset.add(kv6);
		dataset.add(kv7);dataset.add(kv8);

		return dataset;
	}
//	多纬度数据
	private IDataset getMutiDataset(){
		IDataset dataset = new DatasetList();
		KeyValue kv1 = new KeyValue("一季度", "湖北",400);
		KeyValue kv2 = new KeyValue("一季度", "湖南",600);
		KeyValue kv3 = new KeyValue("一季度", "河南",900);
		KeyValue kv4 = new KeyValue("一季度", "河北",700);
		KeyValue kv5 = new KeyValue("二季度", "湖北",800);
		KeyValue kv6 = new KeyValue("二季度", "湖南",1050);
		KeyValue kv7 = new KeyValue("二季度", "河南",900);
		KeyValue kv8 = new KeyValue("二季度", "河北",700);
		KeyValue kv9 = new KeyValue("三季度", "湖北",900);
		KeyValue kv10 = new KeyValue("三季度", "河南",1500);
		KeyValue kv11 = new KeyValue("三季度", "河北",1200);
		KeyValue kv12 = new KeyValue("三季度", "湖南",1000);
		KeyValue kv13 = new KeyValue("四季度", "湖北",600);
		KeyValue kv14 = new KeyValue("四季度", "湖南",700);
		KeyValue kv15 = new KeyValue("四季度", "河北",1300);
		KeyValue kv16 = new KeyValue("四季度", "河南",1000);
		
		dataset.add(kv1);dataset.add(kv2);
		dataset.add(kv3);dataset.add(kv4);
		dataset.add(kv5);dataset.add(kv6);
		dataset.add(kv7);dataset.add(kv8);
		dataset.add(kv9);dataset.add(kv10); 
		dataset.add(kv11);dataset.add(kv12);
		dataset.add(kv13);dataset.add(kv14);
		dataset.add(kv15);dataset.add(kv16);
		
		return dataset;
	}
}