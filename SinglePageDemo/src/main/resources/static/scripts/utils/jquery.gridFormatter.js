var AttributeCustomerCatalogFormatter = {
		editCellIconFormatter: function(cellvalue, rowObject, options){		
			return "<a href='javascript:void(0)' onclick=\"return AttributeCustomerManager.openAttributeCustomer("+options+")\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-edit.png'/></a>";
		},
		editCellDetailIconFormatter: function(cellvalue, rowObject, options){		
			return "<a href='javascript:void(0)' onclick=\"return AttributeCustomerManager.openAttributeDetailCustomer("+options+")\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-edit.png'/></a>";
		},
		viewCellDetailIconFormatter:function(cellvalue, rowObject, options){
			if(rowObject.valueType!=null || rowObject.valueType!=undefined){
				if(rowObject.valueType == 4 || rowObject.valueType == 5){
					return "<a href='javascript:void(0)' onclick=\"return AttributeCustomerManager.loadDetail("+rowObject.attributeId+")\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-view.png'/></a>";
				}
			}
		},
		statusFormat: function(cellvalue, rowObject, options){
			if(rowObject.status != null ||rowObject.status != undefined ){
				if(rowObject.status=="DELETED" ){
					return msgTamNgung;
				}else{
					return msgHoatDong;
				}
			}else{
				return "";
			}
		},
		valueTypeFormat:function(cellvalue, rowObject, options){
			if(rowObject.valueType!=null || rowObject.valueType != undefined){
				if(rowObject.valueType == 'CHARACTER'){
					return msgAttribute1;
				}else if(rowObject.valueType=='NUMBER'){
					return msgAttribute2;
				}else if(rowObject.valueType == 'DATE_TIME'){
					return msgAttribute3;
				}else if(rowObject.valueType == 'CHOICE'){
					return msgAttribute4;
				}else if(rowObject.valueType == 'MULTI_CHOICE'){
					return msgAttribute5;
				}else{
					return "";
				}
			}
		},
		objectFormat:function(cellvalue, rowObject, options){
			if(rowObject.tableName!=null || rowObject.tableName != undefined){
				if(rowObject.tableName == "CUSTOMER"){
					return msgTuyenErr11;
				}else if(rowObject.tableName=="STAFF"){
					return msgTuyenErr12;
				}else if(rowObject.tableName == "PRODUCT"){
					return msgTuyenErr13;
				}else{
					return "";
				}
			}
		},
		updateRownumWidthForJqGrid: function(parentId){	
			var pId = '';
			if(parentId!= null && parentId!= undefined){
				pId = parentId + ' ';
			}
			var lastValue=$(pId + '.datagrid-cell-rownumber').last().text().trim().length;
			if(lastValue > 0){
				var extWidth = 15;
				if(lastValue > 2){
					extWidth += (lastValue - 2) * 9;
				}  
				$(pId + '.datagrid-cell-rownumber').css('width',extWidth);
				$(pId + '.datagrid-header-rownumber').css('width',extWidth);
			}
		},
		/**
		 * resize numrow of grid
		 * lochp
		 */
		resizeNumRowOfGrid: function(parentSelector){
			if (parentSelector == null){
				parentSelector = '';
			}
			var pId = parentSelector + ' ';
			var lastValue=$(pId + '.datagrid-cell-rownumber').last().text().trim().length;
			if(lastValue > 0){
				var extWidth = 45;
				if(lastValue > 2){
					extWidth += (lastValue - 2) * 9 + 10;
				}  
				$(pId + '.datagrid-view1').css('width', extWidth);
				$(pId + '.datagrid-view1').children().css('width', extWidth);
				$(pId + '.datagrid-view1 .datagrid-header table.datagrid-htable').css('width', extWidth-1);
				$(pId + '.datagrid-view1 .datagrid-header table.datagrid-htable td').css('width', extWidth-1);
				$(pId + '.datagrid-view1 .datagrid-body-inner').css('width', extWidth);
				$(pId + '.datagrid-view1 .datagrid-body-inner table.datagrid-btable').css('width', extWidth-1);
				$(pId + '.datagrid-view1 .datagrid-body-inner table.datagrid-btable tr').css('width', extWidth-1);
				$(pId + '.datagrid-view1 .datagrid-body-inner table.datagrid-btable td').css('width', extWidth-1);
				$(pId + '.datagrid-view1 .datagrid-body-inner table.datagrid-btable td.datagrid-cell-rownumber').css('width', extWidth-1);
				$(pId + '.datagrid-view1 .datagrid-cell-rownumber').css('width',extWidth);
				$(pId + '.datagrid-view1 .datagrid-header-rownumber').css('width',extWidth);
				$(pId + '.datagrid-view2').css('position', extWidth);
				var tableSize =  parseFloat($(pId + '.datagrid-view1').css('width')) + parseFloat($(pId + '.datagrid-view2 .datagrid-header .datagrid-header-inner table.datagrid-htable').css('width'));
				$(pId + 'div.datagrid-wrap').css('width', tableSize + 1);
			}
		},
		selectSearchStyle2EasyUIDialog : function(value, rowData, rowIndex) {
			return "<a href='javascript:void(0)' onclick=\"CommonSearchEasyUI.getResultSearchStyle2EasyUIDialog("+ rowIndex + ");\">"+msgText5+"</a>";
		}
};
var CommonSearchFormatter = {
	selectCellIconFormatterEasyUIDialogEx2 : function(value, rowData, rowIndex) {
			return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultSeachStyle1EasyUIDialogEx2("+ rowIndex + ");\">"+msgText5+"</a>";
	},
	selectCellIconFormatterEasyUIDialog : function(value, rowData, rowIndex) {
		if(CommonSearch.divId != null && CommonSearch.divId != undefined){
			return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultSeachStyle1EasyUIDialog("+ rowIndex + ",\'"+ CommonSearch.divId + "\');\">"+msgText5+"</a>";
		}else{
			return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultSeachStyle1EasyUIDialog("+ rowIndex + ");\">"+msgText5+"</a>";
		}
	},
	selectCellIconFormatter: function(cellvalue, options, rowObject){
		return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultSeachStyle1("+ options.rowId +");\">"+msgText5+"</a>";
	},
	myCode: function(cellvalue, options, rowObject){
		if ($('.fancybox-inner #loai').val() ==4 ){
			return Utils.XSSEncode(rowObject.customerCode);
		}
		return Utils.XSSEncode(rowObject.staffCode);
	},
	myName: function(cellvalue, options, rowObject){
		if ($('.fancybox-inner #loai').val() ==4 ){
			return Utils.XSSEncode(rowObject.customerName);
		}
		return Utils.XSSEncode(rowObject.staffName);
	},
	selectCellIconFormatter_nvbh_1: function(cellvalue, options, rowObject){
		if ($('.fancybox-inner #loai').val() ==4 ){
			return "<input type=\"checkbox\" id=\"fgid_"+rowObject.id+"\" onclick=\"SuperviseCustomer.selectCheckbox("+rowObject.id+",'"+ Utils.XSSEncode(rowObject.customerCode)+"',"+ $('.fancybox-inner #loai').val()+")\"/>";
		}
		return "<input type=\"checkbox\" id=\"fgid_"+rowObject.id+"\" onclick=\"SuperviseCustomer.selectCheckbox("+rowObject.id+",'"+ Utils.XSSEncode(rowObject.staffCode)+"',"+ $('.fancybox-inner #loai').val()+")\"/>";
	},
	selectCellIconFormatterForCustomer:function(cellvalue, options, rowObject){
		var flag=false;
		if(DebitPayReport._lstCustomer!=null && DebitPayReport._lstCustomer!= undefined){
			if(DebitPayReport._lstCustomer.get(rowObject.shortCode)!=undefined && DebitPayReport._lstCustomer.get(rowObject.shortCode)!=null){
				flag=true;
			}
		}
		if(flag){
			return "<input checked='checked' type='checkbox' onclick=\"DebitPayReport.selectCustomer(this,\'"+Utils.XSSEncode(rowObject.shortCode)+"\');\">";
		}else{
			return "<input type='checkbox' onclick=\"DebitPayReport.selectCustomer(this,\'"+Utils.XSSEncode(rowObject.shortCode)+"\');\">";
		}
	},
	selectCellIconFormatterForStaff:function(cellvalue, options, rowObject){
		var flag=false;
		if(DebitPayReport._lstStaff!=null && DebitPayReport._lstStaff!= undefined){
			if(DebitPayReport._lstStaff.get(rowObject.staffCode)!=undefined && DebitPayReport._lstStaff.get(rowObject.staffCode)!=null){
				flag=true;
			}
		}
		if(flag){
			return "<input checked='checked' type='checkbox' onclick=\"DebitPayReport.selectStaff(this,\'"+Utils.XSSEncode(rowObject.staffCode)+"\');\">";
		}else{
			return "<input type='checkbox' onclick=\"DebitPayReport.selectStaff(this,\'"+Utils.XSSEncode(rowObject.staffCode)+"\');\">";
		}
	},
	selectCellIconFormatterForSupervisorStaff:function(cellvalue, options, rowObject){
		var flag=false;
		if(DebitPayReport._lstStaffOwner!=null && DebitPayReport._lstStaffOwner!= undefined){
			if(DebitPayReport._lstStaffOwner.get(rowObject.staffCode)!=undefined && DebitPayReport._lstStaffOwner.get(rowObject.staffCode)!=null){
				flag=true;
			}
		}
		if(flag){
			return "<input checked='checked' type='checkbox' onclick=\"DebitPayReport.selectSupervisorStaff(this,\'"+Utils.XSSEncode(rowObject.staffCode)+"\');\">";
		}else{
			return "<input type='checkbox' onclick=\"DebitPayReport.selectSupervisorStaff(this,\'"+Utils.XSSEncode(rowObject.staffCode)+"\');\">";
		}
	},
	selectCellIconFormatterForProduct:function(cellvalue, options, rowObject){
		var flag=false;
		if(DebitPayReport._lstProduct!=null && DebitPayReport._lstProduct!= undefined){
			if(DebitPayReport._lstProduct.get(rowObject.productCode)!=undefined && DebitPayReport._lstProduct.get(rowObject.productCode)!=null){
				flag=true;
			}
		}
		if(flag){
			return "<input checked='checked' type='checkbox' onclick=\"CRMReportDSPPTNH.selectProduct(this,\'"+Utils.XSSEncode(rowObject.productCode)+"\');\">";
		}else{
			return "<input type='checkbox' onclick=\"CRMReportDSPPTNH.selectProduct(this,\'"+Utils.XSSEncode(rowObject.productCode)+"\');\">";
		}
	},
	selectCellIconFormatterForSubCat:function(cellvalue, options, rowObject){
		var flag=false;
		if(DebitPayReport._lstSubCat!=null && DebitPayReport._lstSubCat!= undefined){
			if(DebitPayReport._lstSubCat.get(rowObject.productInfoCode)!=undefined && DebitPayReport._lstSubCat.get(rowObject.productInfoCode)!=null){
				flag=true;
			}
		}
		if(flag){
			return "<input checked='checked' type='checkbox' onclick=\"DebitPayReport.selectSubCat(this,\'"+Utils.XSSEncode(rowObject.productInfoCode)+"\');\">";
		}else{
			return "<input type='checkbox' onclick=\"DebitPayReport.selectSubCat(this,\'"+Utils.XSSEncode(rowObject.productInfoCode)+"\');\">";
		}
	},
	selectCellIconFormatter4: function(cellvalue, options, rowObject){
		return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultSeachStyle4("+ options.rowId +");\">"+msgText5+"</a>";
	},
	selectCellIconFormatterForDisplay: function(cellvalue, options, rowObject){
		var flag=false;
		if(ProgrammeDisplayCatalog._mapCheckSubCat!=null && ProgrammeDisplayCatalog._mapCheckSubCat!= undefined){
			if(ProgrammeDisplayCatalog._mapCheckSubCat.get(rowObject.id)!=undefined && ProgrammeDisplayCatalog._mapCheckSubCat.get(rowObject.id)!=null){
				flag=true;
			}
		}
		if(flag){
			return "<input checked='checked' type='checkbox' onclick='ProgrammeDisplayCatalog.selectSubCat(this,"+rowObject.id+");' class='cbCategoryProduct' value='"+ Utils.XSSEncode(rowObject.productInfoCode)+"'>";
		}else{
			return "<input type='checkbox' onclick='ProgrammeDisplayCatalog.selectSubCat(this,"+rowObject.id+");' class='cbCategoryProduct' value='"+ Utils.XSSEncode(rowObject.productInfoCode)+"'>";
		}
	},
	selectCell: function(cellvalue, options, rowObject){
		return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultSeachStyle2("+ options.rowId +");\">"+msgText5+"</a>";
	},
	statusFormat:function(cellvalue, options, rowObject){
		if(rowObject.cycleCountStatus == 'ONGOING'){
			return "Đang thực hiện";
		}else if(rowObject.cycleCountStatus == 'COMPLETED'){
			return "Hoàn thành";
		}else if(rowObject.cycleCountStatus == 'CANCELLED'){
			return "Hủy bỏ";
		}else{
			return "";
		}
	},
	selectCellDistrictIconFormatter: function(cellvalue, options, rowObject){
		return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultSeachStyleDistrict("+ options.rowId +");\">"+msgText5+"</a>";
	}
};
var CommonFormatter = {
	numberFormatter:function(cellValue, options, rowObject) {
		if(cellValue!=undefined && cellValue!=null){
			return formatCurrencyInterger(Utils.XSSEncode(cellValue));
		}
		return '';
	},
	dateTimeFormatter:function(cellValue, row, index) {
		if(cellValue!=undefined && cellValue!=null){	
			var val = $.datepicker.formatDate('dd/mm/yy', new Date(cellValue));
			return val;
		}
		return '';
	},
	dateTimeFormatterForSaleProduct:function(cellValue, row, index) {
		if(cellValue!=undefined && cellValue!=null){	
			var val = $.datepicker.formatDate('dd/mm/yy', new Date(cellValue));
			if (row.costNotVat != undefined && row.costNotVat == "1")
				return '<span style="color:#FF6600">' + val + '</span>';
			else return val;
		}
		return '';
	}
};
var PromotionCatalogFormatter = {
	viewCellIconFormatter: function(val,row){		
		if(row.type != null && (row.type.substring(0,2) == 'ZM' || row.type.substring(0,2) == 'ZT' || row.type.substring(0,2) == 'ZD'|| row.type.substring(0,2) == 'ZH')){
			return "<a href='/catalog/promotion/viewdetail?promotionId="+row.id+"&proType=2'><span style='cursor:pointer'><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-view.png' title = '"+msgXemChiTiet+"' /></span></a>";
		}else{
			return "<a href='/catalog/promotion/viewdetail?promotionId="+row.id+"&proType=1'><span style='cursor:pointer'><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-view.png' title = '"+msgXemChiTiet+"' /></span></a>";
		}
	},
	editProductFormatter: function(cellvalue, options, rowObject){
		var freeProduct = '';
		if(rowObject.freeProduct != null || rowObject.freeProduct != undefined){
			freeProduct = rowObject.freeProduct.productCode;
		}
		var productName = '';
		var productCode = '';
		if(rowObject.product != null || rowObject.product != undefined){
			productName = rowObject.product.productName;
			productCode = rowObject.product.productCode;
		}
		if(checkPermissionEdit()){
			var statusPromotion = 1;		
			if(rowObject.promotionProgram != null && rowObject.promotionProgram.status != null && rowObject.promotionProgram.status == "WAITING"){
				statusPromotion = 2;
			}
			if(statusPromotion == 2){
				return "<a href='javascript:void(0)' onclick=\"return PromotionCatalog.getSelectedProduct('"+ rowObject.id +"','"+ productCode +"','"+ productName +"','"+ rowObject.saleQty +"','"+ rowObject.saleAmt +"','"+ rowObject.discPer +"','"+ rowObject.discAmt +"','"+ freeProduct +"','"+ rowObject.freeQty +"','"+ rowObject.required +"');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-edit.png'/></a>";
			}else{
				return "";
			}
		}else{
			return "";
		}
	},
	delProductFormatter: function(cellvalue, options, rowObject){
		if(checkPermissionEdit()){
			var statusPromotion = 1;		
			if(rowObject.promotionProgram != null && rowObject.promotionProgram.status != null && rowObject.promotionProgram.status == "WAITING"){
				statusPromotion = 2;
			}
			if(statusPromotion == 2){
				return "<a href='javascript:void(0)' onclick=\"return PromotionCatalog.deleteProduct('"+ rowObject.id +"')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
			}else{
				return "";
			}
		}else{
			return "";
		}
	},
	editShopFormatter: function(cellvalue, options, rowObject){
		var shopCode = '';
		if(rowObject.shop == null ||rowObject.shop == undefined ){
			shopCode = '';
		}else{
			shopCode = rowObject.shop.shopCode;
		}
		var shopName = '';
		if(rowObject.shop == null ||rowObject.shop == undefined ){
			shopName = '';
		}else{
			shopName = rowObject.shop.shopName;
		}
		var status = 1;		
		if(rowObject.status != activeStatus){
			status = 0;
		}
		var value = 0;
		if(rowObject.objectApply != null || rowObject.objectApply != undefined){
			if(rowObject.objectApply == 'SHOP'){
				value = 1;
			}else if(rowObject.objectApply == 'SHOP_AND_CUSTOMER_TYPE'){
				value = 2;
			}else if(rowObject.objectApply == 'CUSTOMER'){
				value =3;
			}
		}
		if(checkPermissionEdit()){
			var statusPromotion = 1;		
			if(rowObject.promotionProgram != null && rowObject.promotionProgram.status != null&& rowObject.promotionProgram.status == "WAITING"){
				statusPromotion = 2;
			}
			if(statusPromotion == 2){
				return "<a href='javascript:void(0)' onclick=\"return PromotionCatalog.getSelectedShop('"+ rowObject.id +"','"+ shopCode +"','"+ shopName +"','"+ rowObject.quantityMax +"','"+status+"','"+value+"');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-edit.png'/></a>";
			}else{
				return "";
			}
		}else{
			return "";
		}
	},
	delShopFormatter: function(cellvalue, options, rowObject){
		if(checkPermissionEdit()){
			var statusPromotion = 1;		
			if(rowObject.promotionProgram != null && rowObject.promotionProgram.status != null && rowObject.promotionProgram.status == "WAITING"){
				statusPromotion = 2;
			}
			if(statusPromotion == 2){
				return "<a href='javascript:void(0)' onclick=\"return PromotionCatalog.deleteShop('"+ rowObject.id +"')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
			}else{
				return "";
			}
		}else{
			return "";
		}
	},
	viewShopFormatter:function(value, row, index){
		var value = 0;
		if(row.objectApply != null || row.objectApply != undefined){
			if(row.objectApply == 'SHOP'){
				value = 1;
			}else if(row.objectApply == 'SHOP_AND_CUSTOMER_TYPE'){
				value = 2;
			}else if(row.objectApply == 'CUSTOMER'){
				value =3;
			}
		}
		var status = 1;		
		if(row.status != activeStatus){
			status = 0;
		}
		if(value == 2 || value == 3){
			return "<a href='javascript:void(0)' onclick=\"return PromotionCatalog.getDetailGridUrl('"+ row.shop.id +"','"+value+"','"+ row.shop.shopName +"','"+status+"');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-view.png'/></a>";
		}else{
			return "";
		}
	},
	editCustomerFormatter: function(cellvalue, options, rowObject){
		if(checkPermissionEdit()){
			var statusPromotion = 1;		
			if(rowObject.promotionShopMap != null && rowObject.promotionShopMap.promotionProgram != null && rowObject.promotionShopMap.promotionProgram.status != null && rowObject.promotionShopMap.promotionProgram.status == "WAITING"){
				statusPromotion = 2;
			}
			if(statusPromotion == 2){
				return "<a href='javascript:void(0)' onclick=\"return PromotionCatalog.showDialogCustomerUpdate('"+ rowObject.id +"');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-edit.png'/></a>";
			}else{
				return "";
			}
		}else{
			return "";
		}
	},
	delCustomerFormatter: function(cellvalue, options, rowObject){
		if(checkPermissionEdit()){
			var statusPromotion = 1;		
			if(rowObject.promotionShopMap != null && rowObject.promotionShopMap.promotionProgram != null && rowObject.promotionShopMap.promotionProgram.status != null && rowObject.promotionShopMap.promotionProgram.status == "WAITING"){
				statusPromotion = 2;
			}
			if(statusPromotion == 2){
				return "<a href='javascript:void(0)' onclick=\"return PromotionCatalog.deleteCustomer('"+ rowObject.id +"')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
			}else{
				return "";
			}
		}else{
			return "";
		}
	},
	delCustomerTypeFormatter: function(cellvalue, options, rowObject){
		if(checkPermissionEdit()){
			var statusPromotion = 1;		
			if(rowObject.promotionShopMap != null && rowObject.promotionShopMap.promotionProgram != null && rowObject.promotionShopMap.promotionProgram.status != null && rowObject.promotionShopMap.promotionProgram.status == "WAITING"){
				statusPromotion = 2;
			}
			if(statusPromotion == 2){
				return "<a href='javascript:void(0)' onclick=\"return PromotionCatalog.deleteCustomerType('"+ rowObject.id +"')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
			}else{
				return "";
			}
		}else{
			return "";
		}
	},
	moneyFormat: function(cellvalue, options, rowObject){
		if(cellvalue != null ||cellvalue != undefined ){
			return formatCurrency(cellvalue);
		}else{
			return "";
		}
	},
	statusFormat: function(val,row){
		if(row.status != null ||row.status != undefined ){
			if(row.status == 'STOPPED' ){
				return msgTamNgung;
			}else if(row.status == 'RUNNING'){
				return msgHoatDong;
			}else{
				return msgDuThao;
			}
		}else{
			return "";
		}
	},
	actionTypeFormatter:function(cellvalue, options, rowObject){		
		if(rowObject.actionType == 'INSERT'){
			return msgText2;
		} else if(rowObject.actionType == 'UPDATE'){
			return msgText3;
		} else if(rowObject.actionType == 'DELETE'){
			return msgText4;
		}				
		return cellvalue;
	},
	editCellIconFormatter: function(cellvalue, options, rowObject){
		var actionId = 0;
		if(rowObject == undefined || rowObject == null ) {
			return "";
		}
		if(rowObject.id == null ||rowObject.id == undefined ){
			actionId = 0;
		}else{
			actionId = rowObject.id;
		}
		return "<a href='javascript:void(0)' onclick='return PromotionCatalog.viewActionAudit("+actionId+")'><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-view.png'/></a>";
	},
	typeFormat: function(val,row){
		if(row.type != null ||row.type != undefined ){
			var value = row.type +'-'+row.proFormat;
			return Utils.XSSEncode(value);
		}else{
			return "";
		}
	}
};