var ManageRouteCreateFormatter = {
	getStaffSale : function(cellValue, rowObject, index) {
		if(rowObject.staffCode == null || rowObject.staffCode == 'null')
    		rowObject.staffCode = "";
    	if(rowObject.staffName == null || rowObject.stafName == 'null')
    		rowObject.staffName = "";
    	if(rowObject.staffCode != "" && rowObject.staffName != "")
    		return rowObject.staffCode + ' - ' + rowObject.staffName ;
    	return "";
	},
	setOrderRoute:function(v,r,i){
		return "<a href='/superviseshop/manageroute-order/info?routingId="+r.routingId+"' title=\'"+jspValidate3+"\'><img width='16' height='16' src='" + WEB_CONTEXT_PATH + "/resources/images/icon_mapedit.png'/></a>";
	},
	assignRoute:function(v,r,i){
		return "<a href='/superviseshop/manageroute-assign/info?routingId="+r.routingId+"' title=\'"+jspValidate4+"\'><img width='16' height='16' src='" + WEB_CONTEXT_PATH + "/resources/images/icon_addTBHV.png'/></a>";
	},
	deleteRoute : function(cellValue, rowObject,index) {
		return "<a href='javascript:void(0)' onclick=\"return SuperviseManageRouteCreate.deleteRouting("+ rowObject.routingId +",\'"+rowObject.routingCode+"\')\"><img width='16' height='16' src='" + WEB_CONTEXT_PATH + "/resources/images/icon_delete.png'/></a>";
	},
	editRoute : function(cellValue, rowObject,index) {
		return "<a href='javascript:void(0)' onclick=\"return SuperviseManageRouteCreate.viewSelecetNodeTree("+rowObject.routingId+")\"><img width='16' height='16' src='" + WEB_CONTEXT_PATH + "/resources/images/icon_edit.png'/></a>";
	},
	checkCustomerDialog : function(value, rowData, rowIndex) {
		var param = '\''+ rowData.shortCode +'\',' + rowData.id +',\''+ rowData.customerCode +'\',\'' 
		+ rowData.customerName +'\',\'' + rowData.address +'\','+ rowData.lat +',' + rowData.lng ;
		var obj = SuperviseManageRouteCreate._mapCustomerDialog.get(rowData.shortCode);
		if(obj == null) {
			return '<input type="checkbox" id="'+rowData.shortCode +'" onchange="SuperviseManageRouteCreate.changeCheckBoxCustomerDialog(this.checked ,'+param+')"/>';
		} else{
			return '<input checked="checked" type="checkbox"  id="'+rowData.shortCode +'" onchange="SuperviseManageRouteCreate.changeCheckBoxCustomerDialog(this.checked ,'+param+')"/>';
		}
	}
};
var ManageSalePlanFormatter = {
	getTrain : function(cellValue, options, rowObject) {
	   	if(cellValue == 'GO'){
	   		return "<img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-datach.png' />";
	   	}
	   	return '';
	}
};
var ManageRouteAssign = {
	editCellIconFormatter : function(cellValue, options, rowObject) {
		return "<a title="+msgFormatter8+" href='/superviseshop/manageroute-assign/routing-detail?routeId="+rowObject.routingId+"'><span style='cursor:pointer'><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-edit.png'/></span></a>";
	},
	statusStaffFormatter :function(value, rowData, rowIndex){
		if(value == activeStatus){
			return msgHoatDong;
		} else if(value == stoppedStatus){
			return msgTamNgung;
		} 
		return '';
	},
	editStaffInRouting: function(value, rowData, rowIndex) {
		var fromDate = '';
		var toDate = '';
		var status = 1;
		if(rowData.fromDate != null && rowData.fromDate != '') fromDate = $.datepicker.formatDate('dd/mm/yy', new Date(rowData.fromDate));
		if(rowData.toDate != null && rowData.toDate != '') toDate = $.datepicker.formatDate('dd/mm/yy', new Date(rowData.toDate));
		if(rowData.status == stoppedStatus) status =0 ;
		var param = rowData.id+','+rowData.staff.id + ',\''+ fromDate+ '\',\''+ toDate+'\','+status;
		return '<a href="javascript:void(0)" onclick="SuperviseManageRouteAssign.editStaff('+param+')"><img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_edit.png" width="15" height="16"></a>';
	},
	deleteStaffInRouting : function(value, rowData, rowIndex) {
		return '<a href="javascript:void(0)" onclick="SuperviseManageRouteAssign.deleteStaff('+ rowData.id+')"><img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_delete.png" width="15" height="16"></a>';
	},
	checkDate  : function(value, rowData, rowIndex) {
		if(value =='GO') {
			return '<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_check.png"/>';
		}
		return '';
	},
	checkDateInt  : function(value, rowData, rowIndex) {
		if(value != undefined && value == 1 ) {
			return '<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_check.png"/>';
		}
		return '';
	},
	formatStartWeek :function(value, rowData, rowIndex) {
		var date = new Date(sysDateFromDB);
		if(value != undefined && value != null) {
			return  getFirstDayOfWeek(value,date.getFullYear());
		}
		return '';
	}
};
var VisitPlanFormatter ={
	showMap:function(cellValue, options, rowObject){
		return "<span style='cursor:pointer' onclick=\"return VisitResult.showMap("+"'"+ rowObject.staffCode +"'"+");\"><img src=\"' + WEB_CONTEXT_PATH + '/resources/images/xembando.png\" /></span>";
	}
};
var SellerPositionFormatter ={
	getSellerPositionDetail:function(cellValue, options, rowObject){
		if(rowObject.hasPosition=='1'){
			return "<a href='javascript:void(0);' onclick=\"return SellerPosition.getSellerPositionDetail('"+ rowObject.staffId + "','" + rowObject.staffCode + "','" + rowObject.staffName + "','" + rowObject.shopCode + "',"+ rowObject.objectType +");\">"+cellValue+"</a>";
		}else{
			return cellValue;
		}
	},
	getSellerType : function(cellValue, options, rowObject) {
	   	if(cellValue == "1"){
	   		return "NVBH";
	   	}else 	if(cellValue == "5"){
	   		return "GSNPP";
	   	}else 	if(cellValue == "7"){
	   		return "TBHV";
	   	}
	   	return "";
	}
};