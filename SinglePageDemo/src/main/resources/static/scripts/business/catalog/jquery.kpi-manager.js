/**
 *Quan ly chi tieu KPI cho Tuyen va Nhan vien 
 * @author tientv11
 * @sine 27/06/2014
 */
var KPIManger = {
	planType : {
		STAFF : 1,
		ROUTING : 2
	},
	_list_kpi : null,
	staffGroupId : null,
	pagePlanType : null,
	monthPlan : null,
	columns : new Array(),
	frozenColumns : new Array(),
	setColumn : function(field,title,align,width){
		if(align==undefined || align ==null){
			align = "right";
		}
		if(width==undefined || width ==null){
			width = 100;
		}
		var column = {
			field :field,
			title : title,
			align : align,
			width : width,
			singleSelect : true,
			formatter: function(value,row,index){
							
				if(row.footer!=undefined && row.footer !=null){
					if (value == 0){
						value = Utils.XSSEncode(value);
					}else{
						value = formatCurrency(Utils.XSSEncode(value));
					}
					return format('<span class="value-footer" style="font-weight:bold">{0}</span>',value);
				}
				if(value==0){
					value = "";
				}
				var HTML = '<input class="skuItem" onkeypress="NextAndPrevTextField(event,this,\'skuItem\')" type="text" class="InputTextStyle Value" value="{0}" index="{1}" id="kpiValue{2}{3}" onchange="KPIManger.showTotalAmount();"   style="text-align:right;width:95%;margin-bottom:0px" maxlength="8" />';
				return format(HTML,formatCurrency(value),index,field,index);
			}
		};		
		return column;
	},
	initData : function(isSearch){
		$('#errMsg').html('').show();
		
		var params = new Object();
		params.monthPlan = $('#searchMonth').val().trim();
		params.kpiType = KPIManger.pagePlanType; 
		var isPlanStaff = KPIManger.pagePlanType==KPIManger.planType.STAFF;
    	if(isPlanStaff){ 
    		params.codeName=$("#staffCode").val().trim();    			   	
		}else{ 
			params.codeName=$("#routingCode").val().trim();
		}
		KPIManger.monthPlan = params.monthPlan;		
	
		Utils.getJSONDataByAjax(params,'/kpi-manager/init-data',function(data){
			var listKpi = data.listKpi;
			KPIManger._list_kpi = data.listKpi;
			var listKpiPlan = data.listKpiPlan;
			var listStaff = data.listStaff;
			var listRouting = data.listRouting;
			
			var mapDataSource = new Map();
			
			KPIManger.columns =  new Array();
			KPIManger.frozenColumns = new Array();
			
			if(listKpi != null && listKpi != undefined){
				for(var i = 0 ;i < listKpi.length; ++i){
					var field = "kpi" + listKpi[i].id;
					var title = listKpi[i].kpiName;
					if($('#language').val() != null && $('#language').val() == 'en'){
						title = listKpi[i].kpiNameEn;
					}else {
						title = listKpi[i].kpiNameVi;
					}
					var column = KPIManger.setColumn(field,title, 'right', 160);
					column.kpiId = listKpi[i].id;
					column.decimalPlace = listKpi[i].decimalPlace;
					column.calcType = listKpi[i].calcType;
					KPIManger.frozenColumns.push(column);
				}
				
				
				if(listKpiPlan != null && listKpiPlan != undefined){
					for(var i = 0; i< listKpiPlan.length; ++i){
						var KEY = "kpi" + listKpiPlan[i].kpi.id;
						if(isPlanStaff){
							KEY +="st" + listKpiPlan[i].staff.id;				
						}else{
							KEY +="st" + listKpiPlan[i].routing.id;
						}
						mapDataSource.put(KEY,listKpiPlan[i].value);				
					}	
				}
				
			}
			
		
			var datasource = new Array();
			var footer = new Object();
			footer.isFooter = true;
			footer.footer = true;
			footer.staffCode = '';
			footer.staffName = '';
			footer.stt='';
			footer.month = DMSI18N.jsp_common_total;
			var size = 0;
			if(isPlanStaff){
				listStaff.push(footer);
				size = listStaff.length;
			}else{
				listRouting.push(footer);
				size = listRouting.length;
			}				
//			var footerObject = new Object();
			for(var i = 0; i< size; ++ i){				
				var obj = new Object();
				obj.stt = (i+1);
				if(isPlanStaff){					
					obj.objectId = listStaff[i].id;
					obj.objectCode = listStaff[i].staffCode;
					obj.objectName = listStaff[i].staffName;
					obj.footer = listStaff[i].footer;
					obj.isFooter = listStaff[i].isFooter;
				}else{
					obj.objectId = listRouting[i].id;
					obj.objectCode = listRouting[i].routingCode;
					obj.objectName = listRouting[i].routingName;
					obj.footer = listRouting[i].footer;
					obj.isFooter = listRouting[i].isFooter;
				}
				if(obj.footer==undefined){
					obj.stt = (i+1);
					obj.month = KPIManger.monthPlan;
				}else{
					obj.stt = '';
					obj.month = DMSI18N.jsp_common_total;
				}
				for(var j=0;j<KPIManger.frozenColumns.length;++j){
					var KEY = "kpi" + KPIManger.frozenColumns[j].kpiId;
					var decimalPlaceIndex = KPIManger.frozenColumns[j].decimalPlace;
					if(isPlanStaff){
						KEY += "st" + listStaff[i].id;
					}else{
						KEY += "st" + listRouting[i].id;
					}
					var field = KPIManger.frozenColumns[j].field;		
					var value = mapDataSource.get(KEY);
					if(StringUtils.isNullOrEmpty(value)){
						value = "0";
					}
					if (decimalPlaceIndex != null && decimalPlaceIndex >= 0){
						value = parseFloat(value).toFixed(decimalPlaceIndex);
					}
					eval(format('obj.{0} = {1};',field,value));
				}
				datasource.push(obj);
			}	

			$('#grid').datagrid({
				width : $(window).width() - 100,
				autoWidth: true,
				data : datasource,
				fitColumns : false,				
				scrollbarSize: 20,
				autoRowHeight : true,
				height: 400,
				showFooter : true,
//				view: bufferview,
//				view:scrollview,
				singleSelect : true,
				frozenColumns:[[
				     {field:'stt',title:jspCustomerAttributeSTT,width:30},
				     {field:'objectCode',title:isPlanStaff?DMSI18N.jsp_kpi_sale_staff_code:DMSI18N.jsp_common_route_code, width:160},
				     {field:'objectName',title:isPlanStaff?DMSI18N.jsp_common_sale_staff_1:DMSI18N.jsp_common_route_name, width:160},
				     {field:'month',rowspan:2, title: DMSI18N.jsp_common_month, width:80,align: 'center', 
				    	 formatter: function(value, row, index){
				    	 if (row.footer != undefined && row.footer ){
				    		return '<b>' + Utils.XSSEncode(value) + '</b>';
				    	 }else{
				    		 return Utils.XSSEncode(value);
				    	 }
				     }}
				]],
				columns:[KPIManger.frozenColumns],
                onLoadSuccess: function(data){
                	
                	$('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
                	Utils.bindFormatOnTextfieldInputCss('Value', Utils._TF_NUMBER);                	
                	KPIManger.showTotalAmount();
                	/*setTimeout(function(){
                		$('.skuItem').each(function(){
                			var value = $(this).val().trim();
                			if (!StringUtils.isNullOrEmpty(value)){
                				if (!isNaN(value)){
                					value = formatCurrency(value);
                					$(this).val(value);
                				}
                			}
                		});
                	}, 100);*/
                }
			});			
		});
		
	},
	/**
	 * @author tuannd20
	 * @returns {Boolean}
	 * @date 28/06/2014
	 */
	beforeImportExcel: function(){
		if(!previewImportExcelFile(document.getElementById("excelFile"))){
			return false;
		}
		$('#errExcelMsg').html('').hide();
		$('#successMsg').html('').hide();
		$('.VinamilkTheme #divOverlay').show();
		return true;
	},
	/**
	 * @author tuannd20
	 * @param responseText
	 * @param statusText
	 * @param xhr
	 * @param $form
	 * @date 28/06/2014
	 */
	afterImportExcelUpdate: function(responseText, statusText, xhr, $form){
		$('#excelFile').val('');
		$('#fakefilepc').val('');
		$('#productGrid1').datagrid('reload');
		$('.VinamilkTheme #divOverlay').hide();
		if (statusText == 'success') {
	    	$("#responseDiv").html(responseText);
	    	var token = $('#tokenValue').html();
			$('#token').val(Utils.XSSEncode(token));
			$('#transactionCode').val(Utils.XSSEncode($('#transactionCodeNew').html()));
	    	if($('#errorExcel').html().trim() == 'true' || $('#errorExcelMsg').html().trim().length > 0){
	    		$('#errExcelMsg').html($('#errorExcelMsg').html()).show();
	    	} else {
	    		//if($('#typeView').html().trim() == 'false'){
	    			var totalRow = parseInt($('#totalRow').html().trim());
	    			var numFail = parseInt($('#numFail').html().trim());
	    			var fileNameFail = $('#fileNameFail').html();
	    			var mes = format(DMSI18N.jsp_kpi_import_success_x_rows_fail_x_rows,totalRow - numFail,numFail);
	    			mes += '. ';
	    			if(numFail > 0){
//	    				$('#successMsg').html(mes + '<a style="color:#f00" href="'+ fileNameFail +'">'+DMSI18N.jsp_kpi_err_detail+'!</a>').show();
	    				$('#successMsg').html(mes + '<a href="'+WEB_CONTEXT_PATH +'/commons/downloadFile?file='+ fileNameFail +'">'+DMSI18N.jsp_kpi_err_detail+'</a>').show();
	    			} else {
	    				$('#successMsg').html(mes).show();
	    			}
	    			
	    			setTimeout(function(){$('#successMsg').html('').hide();}, 15000);
	    		//}
	    	}
	    }
	},
	/**
	 * @author tuannd20
	 * @date 28/06/2014
	 */
	exportExcelTemplate:function(){
		var url='/kpi-manager/kpi-rate/export-template';
		
		if(CommonSearch._xhrReport != null){
			CommonSearch._xhrReport.abort();
			CommonSearch._xhrReport = null;
		}
		$('#divOverlay_New').show();
		CommonSearch._xhrReport = $.ajax({
			type : "POST",
			url : url,
			dataType: "json",
			success : function(data) {
				data=Utils.XSSObject(data);
				hideLoadingIcon();	
				$('#divOverlay_New').hide();
				if(data.error && data.errMsg!= undefined){
					
					$('#'+ errMsg).html(format(DMSI18N.jsp_kpi_export_file_unccessfuly_error_x,escapeSpecialChar(data.errMsg))).show();
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						$('#'+ errMsg).html(DMSI18N.jsp_common_no_data).show();
					} else{
//						window.location.href = data.view;
						//Begin anhdt10 - fix attt - dua ra acoutn dowload
						window.location.href =WEB_CONTEXT_PATH + "/commons/downloadFile?file="+data.view;
						//End anhdt10
						setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
	                        CommonSearch.deleteFileExcelExport(data.view);
	                  },300000);
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorDivThrown) {
				$('#divOverlay_New').hide();
			}
		});
		return false;
	},
	showTotalAmount : function(){
		$('.skuItem').each(function(){
			var value = $(this).val();
			if (value != undefined && value != null && value !=''){
				value = Utils.returnMoneyValue(value);
				value = formatCurrency(value);
				$(this).val(value);
			}
		});
		var rows = $('#grid').datagrid('getRows');
		var size = rows.length-1;
		var kpiPlanData = new Array();
		for(var j =0 ;j<KPIManger.frozenColumns.length;++j){
			var row = new Object();
			var field = KPIManger.frozenColumns[j].field;
			var calcType = KPIManger.frozenColumns[j].calcType;
			var decimalPlace = KPIManger.frozenColumns[j].decimalPlace;
			var result = 0;
			for(var i =0 ;i<size;++i){				
				var dom_ = $(format('#kpiValue{0}{1}',field,i));
				var value = $(format('#kpiValue{0}{1}',field,i)).val().trim();
				if (value != undefined && value != null && value != ''){
					value = Utils.returnMoneyValue(value);
				}
				if(isNullOrEmpty(value)){
					value = 0;
				}else if(Number(value) >= 0){
					if (parseFloat(value) != 0){
						dom_.val(formatCurrency(parseFloat(value).toFixed(decimalPlace)));
					}else{
						dom_.val((parseFloat(value).toFixed(decimalPlace)));
					}
					result += Number(Utils.returnMoneyValue(value));
				}else if(Number(value) < 0){
					$('#errMsg').html(DMSI18N.jsp_common_input_positive_number).show();
				}else{
					$('#errMsg').html(DMSI18N.jsp_common_input_integer).show();
				}
			}
			if (calcType != null && calcType == CALC_TYPE.AVERAGE){
				result = result/size;
			}
			if(size>0){
				$('#grid').datagrid('getRows')[size][field] = result.toFixed(decimalPlace);	
			}
			
		}
		$('#grid').datagrid('updateRow',{index:size});
		$('#grid').datagrid('mergeCells',{index: size,field: stt_label,colspan:4});
		$('.datagrid-td-merged').css('font-weight','bold');
		$('#grid').datagrid('fixRowHeight',size);		
	},	
	/** Luu thong tin phan bo */
	saveGrid:function(mess){
		var rows = $('#grid').datagrid('getRows');
		var size = rows.length-1;
		var kpiPlanData = new Array();
		for(var i =0 ;i<size;++i){				
			for(var j =0 ;j<KPIManger.frozenColumns.length;++j){				
				var field = KPIManger.frozenColumns[j].field;
				var kpiId = KPIManger.frozenColumns[j].kpiId;
				var value = $(format('#kpiValue{0}{1}',field,i)).val().trim();
				if (value != null && value != undefined && value.trim() != ''){
					value = Utils.returnMoneyValue(value);
				}
				if(isNaN(value)){ // neu ko la so
					$('#errMsg').html(DMSI18N.jsp_common_input_integer).show();
					return false;
				}else if(isNullOrEmpty(value)){
					value = -1;
				}						
				
				
				var obj = new Object();
				obj.objectId = rows[i].objectId;
				obj.kpiId = kpiId;
				obj.value = Number(Utils.returnMoneyValue(value));
				/*if(obj.value==0){
					$('#errMsg').html(DMSI18N.jsp_kpi_allocate_value_must_greater_than_zero).show();
					$('#grid').datagrid('selectRow',i);
					$(format('#kpiValue{0}{1}',field,i)).focus();
					return false;
				}*/
				kpiPlanData.push(obj);
			}			
		}		
		
		
		
		var dataModel = {
				monthPlan : $('#dateCreate').val().trim(),
				planType : KPIManger.pagePlanType,
				kpiPlanData : kpiPlanData
		};
		dataModel[Utils.VAR_NAME] = "kpiPlanObjectVO";
		var saveData = getSimpleObject(dataModel);	
		
		$('#successMsg').html('').hide();
		$('#errMsg').html('').show();
		Utils.addOrSaveData(saveData, '/kpi-manager/save-data', null, 'errMsg',function(data){
			Utils.updateTokenForJSON(data);
			// if save errors
			if (isNullOrEmpty (data.successMsg) ){
				$('#errMsg').html(data.errMsg).show();
			} else { // success
				$('#successMsg').html(data.successMsg).show();
				KPIManger.initData(true);
			}
			
		},null,null,null,mess);	
	},	
	
	saveData : function(){
		$('.ErrorMsgStyle').html('').hide();
		var msg = '';
		msg = Utils.getMessageOfRequireCheck('dateCreate',DMSI18N.jsp_kpi_allocate_month);
		if(msg.length > 0){
			$('#errMsg').html(msg).show(); 
			return false;
		}
		var startMonth = $('#dateCreate').val().trim();
		var endMonth = DateUtils.getCurrentMonth();
		
		if(DateUtils.compareMonth(endMonth,startMonth) == 1){
			$('#errMsg').html(DMSI18N.jsp_kpi_only_allow_allocate_month_from_now_on).show();
			return false;
		}
		
		var rows = $('#grid').datagrid('getRows');
		if(rows.length==0){
			$('#errMsg').html(SuperviseManageRouteSetOrder_langNoDataToUpdate).show();
			return false;
		}else if (rows.length == 1){
			var rowIndex = rows[0];
			if (rowIndex.footer != undefined && rowIndex.footer == true){
				$('#errMsg').html(SuperviseManageRouteSetOrder_langNoDataToUpdate).show();
				return false;
			}
		}
		
		
		var createMonth = $('#dateCreate').val().trim();
		var searchMonth = $('#searchMonth').val().trim();
		if(searchMonth.length>0){
			if(searchMonth.length == 10){
				searchMonth = $('#searchMonth').val().split('/')[1]+'/'+$('#searchMonth').val().split('/')[2];
			}
		}
		if(createMonth.length>0){
			var MM = '';
			var yyyy = '';
			if($('#dateCreate').val().length == 7){
				MM = $('#dateCreate').val().split("/")[0];
				yyyy = $('#dateCreate').val().split("/")[1];	
			}else if($('#dateCreate').val().length == 10){
				MM = $('#dateCreate').val().split("/")[1];
				yyyy = $('#dateCreate').val().split("/")[2];
				createMonth = MM+'/'+yyyy;
			}		
		}
		var title = '';
		if(createMonth != searchMonth){
			KPIManger.saveGrid(DMSI18N.jsp_kpi_search_month_different_to_allocate_month_wanna_continue_allocate);							
		}else{
			KPIManger.saveGrid();	
		}		
		
		

	},
	resetData : function(){
		$('.skuItem').val('');
		$('.Value').val('');
		$('.value-footer').html('');
		$('#errMsg').html('').show();
	},
	uploadExcel : function(){
		ReportsUtils.uploadExcel(function(data){
			/** Import success */
			KPIManger.initData();
		});

	},
	importFile: function() {
		$('#errExcelMsg').html('').hide();
		$('#successMsg').html('').hide();
		var excelFile = $('#excelFile').val();
		if (excelFile == null || excelFile == undefined || excelFile == '') {
			$('#errExcelMsg').html(SuperviseManageRouteCreate_importExcel).show();
			/*var tmAZ = setTimeout(function(){
				$('#errExcelMsg').html('').hide();
				clearTimeout(tmAZ);
			}, 3000);*/
			return false;
		}
		var msg = kpiManager_confirmExcel;
		$.messager.confirm(msgXacNhan, msg, function(r){
				if (r){
					$('#importFrm').submit();
				} else {
					$('#excelFile').val('');
					$('#fakefilepc').val('');
				}
			});
	},
	/**
	 * @author haupv3
	 * @date 01/07/2014
	 */
	exportExcel:function(){
		$('#errExcelMsg').html('').hide();
		$('#errMsg').html('').hide();
		$.messager.confirm(msgXacNhan, DMSI18N.jsp_common_wanna_export_excel, function(r){
			if (r){
				var params = new Object();
				params.monthPlan = $('#searchMonth').val().trim();
				params.kpiType = KPIManger.pagePlanType; 
				KPIManger.monthPlan = params.monthPlan;	
				var isPlanStaff = KPIManger.pagePlanType==KPIManger.planType.STAFF;
		    		if(isPlanStaff){ 
		    			params.codeName=$("#staffCode").val().trim();    			   	
				}else{ 
					params.codeName=$("#routingCode").val().trim();
				}
				var lstCb = $('#cbMulti').val();
				if(!isNullOrEmpty(lstCb)){
					params.lstObjectCode = $('#cbMulti').val();
				}
				var url = "/kpi-manager/export";
				ReportsUtils.exportExcel(params, url, 'errExcelMsg', true);
			}
		});
 		return false;

	}
};
var CALC_TYPE = {
	SUM: 1,
	AVERAGE: 2
};