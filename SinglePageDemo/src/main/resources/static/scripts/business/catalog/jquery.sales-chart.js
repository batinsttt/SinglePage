/*script biểu đồ bán hàng*/
/**
 * @author: lochp
 */
var SalesChart = {
	_page: 0,
	_max: 10,
	_totalPage: null,
	getParams: function(){
		var params = {};
		params.fromDateStr = $('#fromDate').val();
		params.toDateStr = $('#toDate').val();
		params.page = SalesChart._page;
		params.max = SalesChart._max;
		try{
			var kCbx = $('#chooseTypeSales').data('kendoComboBox');
			if (kCbx != undefined && kCbx != null){
				params.salesChartType = kCbx.value();
			}
		}catch(e){
			
		}
		return params;
	},
	loadSalesInfo: function(){
		SalesChart._page = 0;
		var dataModel = SalesChart.getParams();
		var url = '/saleschart/getSalesInfo';
		Utils.addOrSaveData(dataModel, url, null, null, function(data){
			$('#ulSaleInfo').html('');
			var sumAmount = 0;
			if (data != null && data.listSales != null && data.listSales.length > 0){
				for (var i=0, size = data.listSales.length; i< size; i++){
					var indexData = data.listSales[i];
					if (indexData.sales != null && indexData.sales > 0){
						sumAmount += parseFloat(indexData.sales);
					}
				}
				if (sumAmount >= 0){
					SalesChart.fillInfoToDiv(data.listSales);
					SalesChart.fillInfoToChart();
					$('#errExcelMsg').html('').hide();
					$('#divId').show();
				}else{
					$('#divId').hide();
					$('#errExcelMsg').html(msgNoDataToShow).show();
				}
			}
		}, null, null, null, null, null, null, false);
	},
	fillInfoToDiv: function(listSalesInfo){
		var html ='';
		if (listSalesInfo != undefined && listSalesInfo != null && listSalesInfo.length > 0){
			for (var i=0, size = listSalesInfo.length; i< size; i++){
				var data = listSalesInfo[i];
				html += '<li class="liChartClass" style="width:250px;height:95px;">';
				if (data.staffGroupName != null && data.staffGroupName != ''){
					html += '<p  class="" style="text-align: center;"  title="'+data.staffGroupName+'"> <label class="labelTitleGroupClass" title="'+data.staffGroupName+'">'
								+StringUtils.getSubStringFromFirst(data.staffGroupName, 15)+'</label></p>';
				}else{
					html += '<p style="text-align: center;margin-top: 12px;"> <label class="labelTitleGroupClass">'
							+'</label></p>';
				}
				html += '<p class="pInfoSalesChartClass" >';
				html += '<label class="labelDetailGroupClass">'+msgDoanhSoChart+'</label>';
				html += '<label class="labelValueGroupClass" style="">'+formatCurrency(data.sales) +'</label>';
				html += '</p><p  class="pInfoSalesChartClass" >';
				html += '<label class="labelDetailGroupClass">'+msgSanLuongChart+'</label>';
				html += '<label class="labelValueGroupClass"  style="">'+formatCurrency(data.quantity)+'</label>';
				if (data.salesChartType != undefined && (data.salesChartType == 2 || data.salesChartType == 3 
						|| data.salesChartType == 4 || data.salesChartType == 5 || data.salesChartType == 6)){
					
				}else{
					html += '</p><p  class="pInfoSalesChartClass" >';
					html += '<label class="labelDetailGroupClass">'+msgSoKhachHangChart+'</label>';
					html += '<label class="labelValueGroupClass"  style="">'+formatCurrency(data.customerCount)+'</label>';
				}
				
				html += '</p>';
				html += '</li>';
//				html += '<br>';
			}
			$('#ulSaleInfo').append(html);
		}
	},
	fillInfoToChart: function(){
		var dataModel = SalesChart.getParams();
		var url = '/saleschart/getStaffSalesInfo';
		Utils.addOrSaveData(dataModel, url, null, null, function(_data){
			if (_data != null && _data.chart != null){
				var _chart = _data.chart;
				/*if (_chart.data != null && _chart.data.length > 0){
					for (var i=0, size = _chart.data.length; i< size; i++){
						
					}
				}*/
				var dataChart = google.visualization.arrayToDataTable(_chart.data);
				var options = { 
					    title : _chart.chartTitle,
					    vAxis: {title: _chart.vAxisTitle, viewWindow: {min: 0}, 
					    		/*textStyle: {color: "#0c886d"},*/ minorGridlines:{color: "#0c886d"}},
					    hAxis: {title: _chart.hAxisTitle, /*textStyle: {color: "#0c886d"}, */
					    	minorGridlines: {color: "#0c886d"}},
					    seriesType: "bars",
					    series: {5: {type: "line"}},
					    tooltip: {showColorCode: true, textStyle: {color: "#0c886d"}},
					    candlestick: {fallingColor: {fill: "#0c886d", stroke: "#0c886d"}}
//					    backgroundColor: {fill: "#0c886d"}
					  };
				var chart = new google.visualization.ComboChart(document.getElementById('chartDivId'));
				 chart.draw(dataChart, options);
				 if (_data.totalPage != null && _data.totalPage > 1){
					 $('#nextBackDivId').show();
					 if (_data.currentPage != null){
						 $('#currentPage').html(_data.currentPage+1);
					 }else{
						 $('#currentPage').html('');
					 }
					 if (_data.totalPage != null){
						 $('#totalPage').html(_data.totalPage);
					 }else{
						 $('#totalPage').html('');
					 }
				 }else{
					 $('#nextBackDivId').hide();
				 }
				 $('#chartDivId').children().first().children().children().children().first().next().next().next().html('');
			}
		}, null, null, null, null, null, null, false);
	},
	loadChart: function(direct){
		if(direct != null && direct == DirectPage.NEXT){
			SalesChart._page++;
			var totalCurrentPage = $('#totalPage').html();
			if (totalCurrentPage != null && totalCurrentPage != '' && parseInt(totalCurrentPage) > SalesChart._page){
				SalesChart.fillInfoToChart();
			}else{
				SalesChart._page--;
			}
		}else if(direct != null && direct == DirectPage.BACK){
			SalesChart._page--;
			if (SalesChart._page >= 0){
				SalesChart.fillInfoToChart();
			}else{
				SalesChart._page++;
			}
		}
	}
};
var DirectPage = {
	NEXT: 1,
	BACK: 0
};