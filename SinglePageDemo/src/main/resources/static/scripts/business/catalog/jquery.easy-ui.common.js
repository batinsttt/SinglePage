var EasyUiCommon = {//
	editIndex :undefined,
	editIndexDetail :undefined,
	_xhrDel : null,
	_xhrSave : null,
	_mapCheckProduct: new Map(),
	_mapNewDataSubGrid1: new Map(),
	_mapNewDataSubGrid2: new Map(),
	_lstProductData: new Map(),
	_lstProduct : null,
	inputId:null,
	field:null,
	type:null,
	apParamCode:null,
	productCode : '',
	productName : null,
	_lstSize :null,
	pCode: '',
	pName: '',
	pCodeRep: '',
	pQuantity: 0,
	REQUIRE_PRODUCT: 1,
	QUANTITY_PRODUCT: 2,
	AMOUNT_PRODUCT: 3,
	DETAIL_PRODUCT: 4,
	AUTOCOMPLETE_ONE: 1,
	AUTOCOMPLETE_MUL: 2,
	isMulti:null,
	typeChange:0,
	indexDeleted:[],
	_lstProductSelected:[],
	_mapProductOnSecondDialog: new Map(),
	_mapProductCodeStr1: new Map(),
	_mapProductCodeStr2: new Map(),
	_lstProductExpand:[],
	_lstProductOnChange:[],
	hasChange:false,
	isExceptZ:false,
	codeByGroup:'',
	lstFreeProduct: new Map(),
	_mapFreeQuantity:new Map(),
	lstProductForZV22:new Map(),
	lstLamNH:new Map(),
	lstGroupId:new Map(),
	_mapInfomationPromotion: null,
	endEditing : function(gridId,field){
		if (EasyUiCommon.editIndex == undefined){
			return true;
		} 
		if(gridId != null && gridId != undefined){
			if ($('#'+gridId).datagrid('validateRow', EasyUiCommon.editIndex)){  
				$('#'+gridId).datagrid('endEdit', EasyUiCommon.editIndex);  
				EasyUiCommon.editIndex = undefined;  
				return true;  
			}else{
				return false;
			}
		}else{
			return true;
		}
	},
	endEditingDetail : function(gridId,field){
		if (EasyUiCommon.editIndexDetail == undefined){
			return true;
		} 
		if(gridId != null && gridId != undefined){
			if ($('#'+gridId).datagrid('validateRow', EasyUiCommon.editIndexDetail)){ 
				$('#'+gridId).datagrid('endEdit', EasyUiCommon.editIndexDetail);  
				EasyUiCommon.editIndexDetail = undefined;  
				return true;  
			}else{
				return false;
			}
		}else{
			return true;
		}
	},
	appendRowOnGrid:function(gridId){
		var type = $('#apParamCode').val().trim();
		$('#grid').datagrid('selectRow',0);
		var data = $('#grid').datagrid('getRows');
		if(type == 'ZV01' ){
			if(data[data.length-1].productCode != null && data[data.length-1].productCode.length > 0
				|| data[data.length-1].quantity != null && data[data.length-1].quantity.length > 0
				|| data[data.length-1].discountPercent != null && data[data.length-1].discountPercent.length > 0 ){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV02' ){
			if(data[data.length-1].productCode != null && data[data.length-1].productCode.length > 0
				|| data[data.length-1].quantity != null && data[data.length-1].quantity.length > 0
				|| data[data.length-1].discountAmount != null && data[data.length-1].discountAmount.length > 0){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV04' ){
			if(data[data.length-1].productCode != null && data[data.length-1].productCode.length > 0
				|| data[data.length-1].amount != null && data[data.length-1].amount.length > 0
				|| data[data.length-1].discountPercent != null && data[data.length-1].discountPercent.length > 0){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV05' ){
			if(data[data.length-1].productCode != null && data[data.length-1].productCode.length > 0
				|| data[data.length-1].amount != null && data[data.length-1].amount.length > 0
				|| data[data.length-1].discountAmount != null && data[data.length-1].discountAmount.length > 0){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV03' ){
			if(data[data.length-1].productCode != null && data[data.length-1].productCode.length > 0
				|| data[data.length-1].quantity != null && data[data.length-1].quantity.length > 0){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV06' ){
			if(data[data.length-1].productCode != null && data[data.length-1].productCode.length > 0
				|| data[data.length-1].amount != null && data[data.length-1].amount.length > 0){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV07' ){
			if(data[data.length-1].quantity != null && data[data.length-1].quantity.length > 0
				|| data[data.length-1].discountPercent != null && data[data.length-1].discountPercent.length > 0
				|| EasyUiCommon._mapProductCodeStr1.get(data.length-1) == ''){
				$('#'+gridId).datagrid('appendRow',{});
				data = $('#grid').datagrid('getRows');
				EasyUiCommon._mapProductCodeStr1.put(data.length-1,EasyUiCommon._mapProductCodeStr1.get(0));
				EasyUiCommon._mapNewDataSubGrid1.put(Number(data.length-1),EasyUiCommon._mapNewDataSubGrid1.get(0));
			}
		}else if(type == 'ZV08' ){
			if(data[data.length-1].quantity != null && data[data.length-1].quantity.length > 0
				|| data[data.length-1].discountAmount != null && data[data.length-1].discountAmount.length > 0
				|| EasyUiCommon._mapProductCodeStr1.get(data.length-1) == ''){
				$('#'+gridId).datagrid('appendRow',{});
				data = $('#grid').datagrid('getRows');
				EasyUiCommon._mapProductCodeStr1.put(data.length-1,EasyUiCommon._mapProductCodeStr1.get(0));
				EasyUiCommon._mapNewDataSubGrid1.put(data.length-1,EasyUiCommon._mapNewDataSubGrid1.get(0));
			}
		}else if(type == 'ZV10' ){
			if(data[data.length-1].amount != null && data[data.length-1].amount.length > 0
				|| data[data.length-1].discountPercent != null && data[data.length-1].discountPercent > 0
				|| EasyUiCommon._mapProductCodeStr1.get(data.length-1) == ''){
				
				
				$('#'+gridId).datagrid('appendRow',{});
				data = $('#grid').datagrid('getRows');
			/*	EasyUiCommon.stylerOnRow(data.length-1,EasyUiCommon._mapNewDataSubGrid1.get(0).productCode,type,null);
				EasyUiCommon._mapProductCodeStr1.put(data.length-1,EasyUiCommon._mapProductCodeStr1.get(0));
				EasyUiCommon._mapNewDataSubGrid1.put(data.length-1,EasyUiCommon._mapNewDataSubGrid1.get(0));
			*/	
				
				//anhhpt: luu gia tri cot san pham mua voi index moi 
				/*
				 * @desciption: cach hien thi thong tin tren dong 
				 * @params : 
				 * 	index : index dong 
				 *  value : gia tri 
				 *  type : ZV01,..., ZV20
				 *  isMulti: true --> cot thu 3 / false, null : cot 1  
				 * @return : text + 'img'  	 
				 * */
				var result = EasyUiCommon.stylerOnRow(data.length-1,EasyUiCommon._mapNewDataSubGrid1.get(0).productCode,type,null);
				
				EasyUiCommon._mapProductCodeStr1.put(data.length-1,result);
				EasyUiCommon._mapNewDataSubGrid1.put(data.length-1,EasyUiCommon._mapNewDataSubGrid1.get(0));
				
			}
		}else if(type == 'ZV11' ){
			if(data[data.length-1].amount != null && data[data.length-1].amount.length > 0
				|| data[data.length-1].discountAmount != null && data[data.length-1].discountAmount.length > 0
				|| EasyUiCommon._mapProductCodeStr1.get(data.length-1) == ''){
				$('#'+gridId).datagrid('appendRow',{});
				data = $('#grid').datagrid('getRows');
				EasyUiCommon._mapProductCodeStr1.put(data.length-1,EasyUiCommon._mapProductCodeStr1.get(0));
				EasyUiCommon._mapNewDataSubGrid1.put(data.length-1,EasyUiCommon._mapNewDataSubGrid1.get(0));
			}
		}else if(type == 'ZV09' ){
			if(data[data.length-1].quantity != null && data[data.length-1].quantity.length > 0
				||EasyUiCommon._mapProductCodeStr1.get(data.length-1) == ''
				||data.length <= EasyUiCommon._mapProductCodeStr2.keyArray.length){

				var firstRow = $('#grid').datagrid('getRows')[0];
				
				$('#'+gridId).datagrid('appendRow',{
					productCodeStr:firstRow.productCodeStr
				});
				
				data = $('#grid').datagrid('getRows');
				
				//lay danh sach san pham mua mac dinh
				EasyUiCommon._mapProductCodeStr1.put(data.length-1,EasyUiCommon._mapProductCodeStr1.get(0));
				EasyUiCommon._mapNewDataSubGrid1.put(data.length-1,EasyUiCommon._mapNewDataSubGrid1.get(0));
				
				//anhhpt:update lai datagrid -->important: cap nhat lai index cho san pham mua 
				var data = new Array();
        		var rows = $('#grid').datagrid('getRows');
        		for(var i = 0 ; i < rows.length ; i++){
        			var row = rows[i];
       				data.push(row);
        		}
        		
        		EasyUiCommon._mapNewDataSubGrid1 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid1);
        		EasyUiCommon._mapProductCodeStr1 = EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr1);
        		EasyUiCommon._mapNewDataSubGrid2 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid2);
        		EasyUiCommon._mapProductCodeStr2 = EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr2);       		
        		$('#grid').datagrid('loadData',data); // update lai data grid
			}
		}else if(type == 'ZV12' ){
			if(data[data.length-1].amount != null && data[data.length-1].amount.length > 0
				||EasyUiCommon._mapProductCodeStr1.get(data.length-1) == ''
				||data.length <= EasyUiCommon._mapProductCodeStr2.keyArray.length){
				$('#'+gridId).datagrid('appendRow',{});
				data = $('#grid').datagrid('getRows');
				EasyUiCommon._mapProductCodeStr1.put(data.length-1,EasyUiCommon._mapProductCodeStr1.get(0));
				EasyUiCommon._mapNewDataSubGrid1.put(data.length-1,EasyUiCommon._mapNewDataSubGrid1.get(0));
				EasyUiCommon._mapNewDataSubGrid2.put(data.length-1,new Array());
			}
		}else if(type == 'ZV15' ){
			if(data.length <= EasyUiCommon._mapProductCodeStr1.keyArray.length
				||data.length <= EasyUiCommon._mapProductCodeStr2.keyArray.length){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV18' ){
			if(data.length <= EasyUiCommon._mapProductCodeStr1.keyArray.length
				||data.length <= EasyUiCommon._mapProductCodeStr2.keyArray.length){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV13' || type == 'ZV16' ){
			if(data[data.length-1].discountPercent != null && data[data.length-1].discountPercent.length > 0
				||data.length <= EasyUiCommon._mapProductCodeStr1.keyArray.length){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV14' || type == 'ZV17' ){
			if(data[data.length-1].discountAmount != null && data[data.length-1].discountAmount.length > 0
				||data.length <= EasyUiCommon._mapProductCodeStr1.keyArray.length){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV19' ){
			if(data[data.length-1].amount != null && data[data.length-1].amount.length > 0
				|| data[data.length-1].discountPercent != null && data[data.length-1].discountPercent.length > 0){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV20' ){
			if(data[data.length-1].amount != null && data[data.length-1].amount.length > 0
				|| data[data.length-1].discountAmount != null && data[data.length-1].discountAmount.length > 0){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV21' ){
			if(data[data.length-1].amount != null && data[data.length-1].amount.length > 0
				||data.length <= EasyUiCommon._mapProductCodeStr1.keyArray.length){
				$('#'+gridId).datagrid('appendRow',{});
			}
		}else if(type == 'ZV22' ){
			if(data[data.length-1].quantity != null && data[data.length-1].quantity.length > 0
				||EasyUiCommon._mapProductCodeStr1.get(data.length-1) == ''
				||data.length <= EasyUiCommon._mapProductCodeStr2.keyArray.length){
				$('#'+gridId).datagrid('appendRow',{});
				data = $('#grid').datagrid('getRows');
				EasyUiCommon._mapProductCodeStr1.put(data.length-1,EasyUiCommon._mapProductCodeStr1.get(0));
				EasyUiCommon._mapNewDataSubGrid1.put(data.length-1,EasyUiCommon._mapNewDataSubGrid1.get(0));
				EasyUiCommon._mapNewDataSubGrid2.put(data.length-1,new Array());
			}
		}
		$('#grid').datagrid('selectRow',$('#grid').datagrid('getRows').length-1);
	},
	loadCommonDataGrid:function(type,permission){
		EasyUiCommon.indexDeleted = [];
		EasyUiCommon._mapNewDataSubGrid1 = new Map();
		EasyUiCommon._mapNewDataSubGrid2 = new Map();		
		EasyUiCommon._mapProductCodeStr1 = new Map();
		EasyUiCommon._mapProductCodeStr2 = new Map();
		var urlComboGrid = '';
		var url = '';
		if(type == 'ZV01'){
			url = PromotionCatalog.getGridZV01Url($('#promotionId').val().trim(),type);
			EasyUiCommon.dataGrid01020405('grid',url,'productCode','productName','quantity','discountPercent',msgMaSanPham,msgTenSanPham,msgSoLuongMua,msgPhanTramKMTien,urlComboGrid,type,permission);
		}else if(type == 'ZV02'){
			url = PromotionCatalog.getGridZV01Url($('#promotionId').val().trim(),type);
			EasyUiCommon.dataGrid01020405('grid',url,'productCode','productName','quantity','discountAmount',msgMaSanPham,msgTenSanPham,msgSoLuongMua,msgTongTienKM,urlComboGrid,type,permission);
		}else if(type == 'ZV04'){
			url = PromotionCatalog.getGridZV01Url($('#promotionId').val().trim(),type);
			EasyUiCommon.dataGrid01020405('grid',url,'productCode','productName','amount','discountPercent',msgMaSanPham,msgTenSanPham,msgTongTienMua,msgPhanTramKMTien,urlComboGrid,type,permission);
		}else if(type == 'ZV05'){
			url = PromotionCatalog.getGridZV01Url($('#promotionId').val().trim(),type);
			EasyUiCommon.dataGrid01020405('grid',url,'productCode','productName','amount','discountAmount',msgMaSanPham,msgTenSanPham,msgTongTienMua,msgTongTienKM,urlComboGrid,type,permission);
		}else if(type == 'ZV03'){
			url = PromotionCatalog.getGridZV03Url($('#promotionId').val().trim(),type);
			EasyUiCommon.dataGrid0306('grid',url,'productCode','productName','quantity','freeProductCodeStr',msgMaSanPham,msgTenSanPham,msgSoLuongMua,msgSanPhamKM,urlComboGrid,type,'saleQty',msgSoLuong,permission);
		}else if(type == 'ZV06'){
			url = PromotionCatalog.getGridZV03Url($('#promotionId').val().trim(),type);
			EasyUiCommon.dataGrid0306('grid',url,'productCode','productName','amount','freeProductCodeStr',msgMaSanPham,msgTenSanPham,msgTongTienMua,msgSanPhamKM,urlComboGrid,type,'saleQty',msgSoLuong,permission);
		}else if(type == 'ZV07'){
			url = PromotionCatalog.getGridZV07Url($('#promotionId').val().trim(),type);
//			EasyUiCommon.dataGrid07081011('grid',url,'quantity','discountPercent',msgSoLuongMua,msgPhanTramKMTien,urlComboGrid,type,permission);
			PromotionZV07.dataGrid07('grid',url,'quantity','discountPercent',msgSoLuongMua,msgPhanTramKMTien,urlComboGrid,type,permission);
		}else if(type == 'ZV08'){
			url = PromotionCatalog.getGridZV07Url($('#promotionId').val().trim(),type);
		//	EasyUiCommon.dataGrid07081011('grid',url,'quantity','discountAmount',msgSoLuongMua,msgTongTienKM,urlComboGrid,type,permission);
			PromotionZV08.dataGrid08('grid',url,'quantity','discountAmount',msgSoLuongMua,msgTongTienKM,urlComboGrid,type,permission);
		}else if(type == 'ZV10'){
			url = PromotionCatalog.getGridZV07Url($('#promotionId').val().trim(),type);
			EasyUiCommon.dataGrid07081011('grid',url,'amount','discountPercent',msgTongTienMua,msgPhanTramKMTien,urlComboGrid,type,permission);
		}else if(type == 'ZV11'){
			url = PromotionCatalog.getGridZV07Url($('#promotionId').val().trim(),type);
			PromotionZV11.dataGrid11('grid',url,'amount','discountAmount',msgTongTienMua,msgTongTienKM,urlComboGrid,type,permission);
		}else if(type == 'ZV09'){
			url = PromotionCatalog.getGridZV09Url($('#promotionId').val().trim(),type);
			EasyUiCommon.dataGrid0912('grid',url,'quantity',msgSoLuongMua,urlComboGrid,type,permission);
		}else if(type == 'ZV12'){
			url = PromotionCatalog.getGridZV09Url($('#promotionId').val().trim(),type);
		//	EasyUiCommon.dataGrid0912('grid',url,'amount',msgTongTienMua,urlComboGrid,type,permission);
			PromotionZV12.dataGrid12('grid',url,'amount',msgTongTienMua,urlComboGrid,type,permission);
		}else if(type == 'ZV15'){
			url = PromotionCatalog.getGridZV09Url($('#promotionId').val().trim(),type);
			PromotionZV15.dataGrid1518('grid',url,urlComboGrid,type,permission);
		}else if(type == 'ZV18'){
			url = PromotionCatalog.getGridZV09Url($('#promotionId').val().trim(),type);
			PromotionZV18.dataGrid1518('grid',url,urlComboGrid,type,permission);
			//PromotionZV18.loadDataGrid('grid',url,urlComboGrid,type,permission);
		}else if(type == 'ZV13'){
			url = PromotionCatalog.getGridZV13Url($('#promotionId').val().trim(),type);
		//	EasyUiCommon.dataGrid13141617('grid',url,'discountPercent',msgPhanTramKMTien,urlComboGrid,type,'quantity',msgSoLuong,permission);
			PromotionZV13.dataGrid13('grid',url,'discountPercent',msgPhanTramKMTien,urlComboGrid,type,'quantity',msgSoLuong,permission);
		}else if(type == 'ZV14'){
			url = PromotionCatalog.getGridZV13Url($('#promotionId').val().trim(),type);
			//EasyUiCommon.dataGrid13141617('grid',url,'discountAmount',msgTongTienKM,urlComboGrid,type,'quantity',msgSoLuong,permission);
			PromotionZV14.dataGrid14('grid',url,'discountAmount',msgTongTienKM,urlComboGrid,type,'quantity',msgSoLuong,permission);
		}else if(type == 'ZV16'){
			url = PromotionCatalog.getGridZV13Url($('#promotionId').val().trim(),type);
			PromotionZV16.dataGrid13141617('grid',url,'discountPercent',msgPhanTramKMTien,urlComboGrid,type,'amount',msgTongTienMua,permission);
		}else if(type == 'ZV17'){
			url = PromotionCatalog.getGridZV13Url($('#promotionId').val().trim(),type);
			PromotionZV17.dataGrid13141617('grid',url,'discountAmount',msgTongTienKM,urlComboGrid,type,'amount',msgTongTienMua,permission);
		}else if(type == 'ZV19'){
			url = PromotionCatalog.getGridZV19Url($('#promotionId').val().trim(),type);
			EasyUiCommon.dataGrid1920('grid',url,'amount','discountPercent',msgTongTienMua,msgPhanTramKMTien,urlComboGrid,type,permission);
		}else if(type == 'ZV20'){
			url = PromotionCatalog.getGridZV19Url($('#promotionId').val().trim(),type);
			EasyUiCommon.dataGrid1920('grid',url,'amount','discountAmount',msgTongTienMua,msgTongTienKM,urlComboGrid,type,permission);
		}else if(type == 'ZV21'){
			url = PromotionCatalog.getGridZV21Url($('#promotionId').val().trim(),type);
			PromotionZV21.dataGrid21('grid',url,'amount','freeProductCodeStr',msgTongTienMua,msgSanPhamKM,urlComboGrid,type,'quantity',msgSoLuongKM,permission);
		}else if(type == 'ZV22'){
			url = PromotionCatalog.getGridZV22Url($('#promotionId').val().trim(),type);
			EasyUiCommon.dataGrid22('grid',url,'quantity',msgSoLuongMua,'quantityFree',msgSoLuongKM,urlComboGrid,type,permission);
		}
	},
	changeCommonGrid :function(type,permission){
		$('#divOverlay').show();
		$('#errMsgProduct').html('').hide();
		$('#errExcelMsg').html('').hide();
		if(type=='ZV10'){//haupv3
			$('#grid').datagrid('acceptChanges');
			var rows =  $('#grid').datagrid('getRows');
			
			if(rows.length == 1){
				  if(Utils.isEmpty(rows[0].amount)
					&& Utils.isEmpty(rows[0].discountPercent) ) {
					  
				  }
			}else{
				for(var i=0; i<rows.length; i++){
				  if(
				    Utils.isEmpty(rows[i].amount)
				    && Utils.isEmpty(rows[i].discountPercent) ) {
				      $('#grid').datagrid('deleteRow', i);
				  }
				}
			}
			
			$('#grid').datagrid('selectRow',$('#grid').datagrid('getRows').length-1);
		}
		
		if(type=='ZV06'){//haupv3
			$('#grid').datagrid('acceptChanges');
			var rows =  $('#grid').datagrid('getRows');
			
			if(rows.length == 1){
				  if(Utils.isEmpty(rows[0].amount)
					&& Utils.isEmpty(rows[0].discountPercent) ) {
					  
				  }
			}else{
				for(var i=0; i<rows.length; i++){
				  if(
				    Utils.isEmpty(rows[i].amount) ) {
				      $('#grid').datagrid('deleteRow', i);
				  }
				}
			}
			
			$('#grid').datagrid('selectRow',$('#grid').datagrid('getRows').length-1);
		}
		
		if(type=='ZV03'){//haupv3
			$('#grid').datagrid('acceptChanges');
			var rows =  $('#grid').datagrid('getRows');
			
			if(rows.length == 1){
				  if(Utils.isEmpty(rows[0].quantity)
					) {
					  
				  }
			}else{
				for(var i=0; i<rows.length; i++){
				  if(
				    Utils.isEmpty(rows[i].quantity) ) {
				      $('#grid').datagrid('deleteRow', i);
				  }
				}
			}
			
			$('#grid').datagrid('selectRow',$('#grid').datagrid('getRows').length-1);
		}
		
		
		if(type=='ZV09'){//haupv3
			$('#grid').datagrid('acceptChanges');
			var objHeader = $('#grid').datagrid('getData').rows;
			
			if(objHeader.length == 1){
				  if(Utils.isEmpty(objHeader[0].quantity)
					 ) {
					  
				  }
			}else{
				for(var i=0; i<objHeader.length; i++){
				  if(Utils.isEmpty(objHeader[i].quantity)) {
				      $('#grid').datagrid('deleteRow', i);
				  }
				}
			}
			
			$('#grid').datagrid('selectRow',$('#grid').datagrid('getRows').length-1);
		}
		
		
		if(type=='ZV11'){ //anhhpt: neu la ZV11 thi goi js cho promotion ZV11
			PromotionZV11.changeCommonGrid(type,permission);
			return true;
		}
		
		if(type=='ZV12'){ //anhhpt: neu la ZV12 thi goi js cho promotion ZV12
			PromotionZV12.changeCommonGrid(type,permission);
			return true;
		}
		
		if(type=='ZV15'){ //haupv: neu la ZV15 thi goi js cho promotion ZV15
			PromotionZV15.changeCommonGrid(type,permission);
			return true;
		}
		
		if(type=='ZV18'){ //haupv: neu la ZV18 thi goi js cho promotion ZV18
			PromotionZV18.changeCommonGrid(type,permission);
			return true;
		}
		
		if(type=='ZV16'){ //haupv: neu la ZV16 thi goi js cho promotion ZV16
			PromotionZV16.changeCommonGrid(type,permission);
			return true;
		}
		
		if(type=='ZV17'){ //haupv: neu la ZV17 thi goi js cho promotion ZV17
			PromotionZV17.changeCommonGrid(type,permission);
			return true;
		}
		
		if(type=='ZV13'){ //anhhpt: neu la ZV13 thi goi js cho promotion ZV13
			PromotionZV13.changeCommonGrid(type,permission);
			return true;
		}
		
		if(type=='ZV14'){ //anhhpt: neu la ZV14 thi goi js cho promotion ZV14
			PromotionZV14.changeCommonGrid(type,permission);
			return true;
		}
		
		if(type=='ZV08'){ //anhhpt: neu la ZV14 thi goi js cho promotion ZV14
			PromotionZV08.changeCommonGrid(type,permission);
			return true;
		}
		
		if(type=='ZV21'){ //haupv: neu la ZV21 thi goi js cho promotion ZV21
			PromotionZV21.changeCommonGrid(type,permission);
			return true;
		}
		
		if(type=='ZV07'){ //lamnh6
			PromotionZV07.changeCommonGrid(type,permission);
			return true;
		}
		
		
		var lstString1 = new Array();
		var lstString2 = new Array();
		var lstString3 = new Array();
		var lstString4 = new Array();
		var lstNumber = [];
		var lstCode = [];
		var errMsg = '';
		var row1 =  $('#grid').datagrid('getRows');
		var row2 =  $('#grid').datagrid('getRows');
		var size = row1.length;
		$('#grid').datagrid('acceptChanges');
		if(row1 != null && row1 != undefined && row2 != null && row2 != undefined){
			for(var i=0 ;i<row1.length-1;i++){
				for(var j= i+1;j<row2.length;j++){
					var amount = row1[i].amount;
					var amount1 = row2[j].amount;
					var productCode = row1[i].productCode;
					var productCode1 = row2[j].productCode;
					var quantity = row1[i].quantity;
					var quantity1 = row2[j].quantity;
					if(type == 'ZV01' || type == 'ZV02' || type == 'ZV03'){
						if(quantity == quantity1 && productCode == productCode1){
							$('#grid').datagrid('selectRow', j);
							//errMsg = eval(format('\''+msgCommon13+'\';',productCode));
							errMsg = msgMaSanPham + ' '+productCode + ' '+msgLoi5;
						}
					}
					if(type == 'ZV04' || type == 'ZV05' || type == 'ZV06'){
						if(amount == amount1 && productCode == productCode1){
							//errMsg = eval(format('\''+msgCommon13+'\';',productCode));
							$('#grid').datagrid('selectRow', j);
							errMsg = msgMaSanPham + ' ' + productCode + ' '+ msgLoi5;
						}
					}
					if(type == 'ZV19' || type == 'ZV20'){
						if(amount == amount1){
							errMsg = eval(format('\''+msgCommon13+'\';',productCode));
							
						}
					}
				}
			}
		}

		if(errMsg.length > 0){
			$('#divOverlay').hide();
			$('#errExcelMsg').html(errMsg).show();
			return false;
		}
		

		// bo cai nay ra $.inArray(str,EasyUiCommon.indexDeleted) == -1, vi khi xoa da load lai index cua grid roi
		//////DETAIL FOR SUBGRID
		for(var i= 0;i<size;i++){
//			var indexDetailErr = 0;
			//var str = i.toString();
			if(type == 'ZV03' || type == 'ZV06'){
				var sizeDetail = 0;
				if(/*($.inArray(str,EasyUiCommon.indexDeleted) == -1) &&*/ (EasyUiCommon._mapNewDataSubGrid1.get(i) != null)){
					sizeDetail = EasyUiCommon._mapNewDataSubGrid1.get(i).length;
					if(sizeDetail > 0){
						lstString2.push(sizeDetail);
					}
					for(var k = 0;k<sizeDetail;k++){
						var objDetail = EasyUiCommon._mapNewDataSubGrid1.get(i);
						var a2 = [];
						if(objDetail[k].productCode == '' || objDetail[k].productCode == undefined){
							objDetail[k].productCode = 0;
						}
						a2.push(objDetail[k].productCode);
						if(objDetail[k].quantity == '' || objDetail[k].quantity == undefined){
							objDetail[k].quantity = 0;
						}
						a2.push(objDetail[k].quantity);
						lstString3.push(a2);
					}
				}
			}else if(type == 'ZV07' || type == 'ZV08' || type == 'ZV10' || type == 'ZV11' ){
				var sizeDetail = 0;
				if(/*($.inArray(str,EasyUiCommon.indexDeleted) == -1) &&*/ 
						(EasyUiCommon._mapNewDataSubGrid1.get(i) != null)){
					sizeDetail = EasyUiCommon._mapNewDataSubGrid1.get(i).length;
					if(sizeDetail > 0){
						lstString2.push(sizeDetail);
					}
					for(var k = 0;k<sizeDetail;k++){
						var objDetail = EasyUiCommon._mapNewDataSubGrid1.get(i);
						var a2 = [];
						if(objDetail[k].productCode == '' || objDetail[k].productCode == undefined){
							objDetail[k].productCode = 0;
						}
						a2.push(objDetail[k].productCode);
						if(objDetail[k].required == '' || objDetail[k].required == undefined){
							objDetail[k].required = 0;
						}
						a2.push(objDetail[k].required);
						lstString3.push(a2);
					}
				}
			}else if(type == 'ZV09' || type == 'ZV12' || type == 'ZV15' /*|| type == 'ZV18'*/ || type == 'ZV22'){
				var sizeDetail1 = 0;
				var sizeDetail2 = 0;
				if(/*($.inArray(str,EasyUiCommon.indexDeleted) == -1) &&*/ EasyUiCommon._mapNewDataSubGrid1.get(i) != null && EasyUiCommon._mapNewDataSubGrid2.get(i) != null){
					sizeDetail1 = EasyUiCommon._mapNewDataSubGrid1.get(i).length;
					sizeDetail2 = EasyUiCommon._mapNewDataSubGrid2.get(i).length;
					var sizeIndex = [];
					if(sizeDetail1 > 0 && sizeDetail2 > 0){
						sizeIndex.push(sizeDetail1);
						sizeIndex.push(sizeDetail2);
					}else{
						sizeIndex.push(0);
						sizeIndex.push(0);
					}
					lstString2.push(sizeIndex);
					for(var k = 0;k<sizeDetail1;k++){
						var objDetail = EasyUiCommon._mapNewDataSubGrid1.get(i);
						var a2 = [];
						if(objDetail[k].productCode == '' || objDetail[k].productCode == undefined){
							objDetail[k].productCode = 0;
						}
						if(type == 'ZV15' /*|| type == 'ZV18'*/){
							if(i == 0){
								lstCode.push(objDetail[k].productCode.trim());
							}else{
								if(lstCode.indexOf(objDetail[k].productCode.trim()) == -1){
									$('#errMsgProduct').html(msgLoi4).show();
									break;
								}
							}
						}
						a2.push(objDetail[k].productCode);
						if(type == 'ZV09' || type == 'ZV12' || type == 'ZV22'){
							if(objDetail[k].required == '' || objDetail[k].required == undefined){
								objDetail[k].required = 0;
							}
							a2.push(objDetail[k].required);
						}else if(type == 'ZV15'){
							if(objDetail[k].quantity == '' || objDetail[k].quantity == undefined){
								objDetail[k].quantity = 0;
							}
							a2.push(objDetail[k].quantity);
						}/*else if(type == 'ZV18'){
							if(objDetail[k].amount == '' || objDetail[k].amount == undefined){
								objDetail[k].amount = 0;
							}
							a2.push(objDetail[k].amount);
						}*/
						lstString3.push(a2);
					}
					for(var j = 0;j<sizeDetail2;j++){
						var objDetail = EasyUiCommon._mapNewDataSubGrid2.get(i);
						var a2 = [];
						if(objDetail[j].productCode == '' || objDetail[j].productCode == undefined){
							objDetail[j].productCode = 0;
						}
						a2.push(objDetail[j].productCode);
						if(objDetail[j].quantity == '' || objDetail[j].quantity == undefined){
							objDetail[j].quantity = 0;
						}
						a2.push(objDetail[j].quantity);
						lstString4.push(a2);
					}
				}
			}else if(type == 'ZV13' || type == 'ZV14' || type == 'ZV16' || type == 'ZV17' ){
				var sizeDetail = 0;
				if(/*($.inArray(str,EasyUiCommon.indexDeleted) == -1) &&*/ (EasyUiCommon._mapNewDataSubGrid1.get(i) != null)){
					sizeDetail = EasyUiCommon._mapNewDataSubGrid1.get(i).length;
					if(lstString2.length > 0 && (lstString2.indexOf(sizeDetail) == -1 || lstString2.indexOf(parseInt(sizeDetail)) == -1)){
						$('#errMsgProduct').html(msgLoi4).show();
						break;
					}
					if(sizeDetail > 0){
						lstString2.push(sizeDetail);
					}
					for(var k = 0;k<sizeDetail;k++){
						var objDetail = EasyUiCommon._mapNewDataSubGrid1.get(i);
						var a2 = [];
						if(objDetail[k].productCode == '' || objDetail[k].productCode == undefined){
							objDetail[k].productCode = 0;
						}
						if(i == 0){
							lstCode.push(objDetail[k].productCode.trim());
						}else{
							if(lstCode.indexOf(objDetail[k].productCode.trim()) == -1){
								$('#errMsgProduct').html(msgLoi4).show();
								break;
							}
						}
						a2.push(objDetail[k].productCode.trim());
						if(type == 'ZV13' || type == 'ZV14'){
							if(objDetail[k].quantity == '' || objDetail[k].quantity == undefined){
								objDetail[k].quantity = 0;
							}
							a2.push(objDetail[k].quantity);
						}else{
							if(objDetail[k].amount == '' || objDetail[k].amount == undefined){
								objDetail[k].amount = 0;
							}
							a2.push(objDetail[k].amount);
						} 				
						lstString3.push(a2);
					}
					var boughtProductSize = lstString2[i];
					for(var k=0; k < ((lstString3.length)/boughtProductSize-1);k++){
						var countProductQuantity = 0;
						for(var l = 0; l < boughtProductSize; l++)
							if(lstString3[i*boughtProductSize + l][0] == lstString3[k*boughtProductSize + l][0]
								&& lstString3[i*boughtProductSize + l][1] == lstString3[k*boughtProductSize + l][1]){
								countProductQuantity++;
							}
						if(countProductQuantity == boughtProductSize){
							if(boughtProductSize == 1)
								$('#errMsgProduct').html(msgMaSanPham +' '+ lstString3[i][0] +' '+ msgLoi5).show();
							else{
								var errMsgProductQuantityExits = msgLoi6;
								for(var l = 0; l < lstCode.length-1; l++)
									errMsgProductQuantityExits = errMsgProductQuantityExits.concat(lstCode[l]).concat(', ');
								errMsgProductQuantityExits = errMsgProductQuantityExits.concat(lstCode[l]).concat(msgLoi7);
								$('#errMsgProduct').html(errMsgProductQuantityExits).show();
							}
							break;
						}
					}
				}
			}else if(type == 'ZV21'){
				var sizeDetail = 0;
				if(/*($.inArray(str,EasyUiCommon.indexDeleted) == -1) &&*/ EasyUiCommon._mapNewDataSubGrid1.get(i) != null){
					sizeDetail = EasyUiCommon._mapNewDataSubGrid1.get(i).length;
					if(sizeDetail > 0){
						lstString2.push(sizeDetail);
					}
					for(var k = 0;k<sizeDetail;k++){
						var objDetail = EasyUiCommon._mapNewDataSubGrid1.get(i);
						var a2 = [];
						if(objDetail[k].productCode == '' || objDetail[k].productCode == undefined){
							objDetail[k].productCode = 0;
						}
						a2.push(objDetail[k].productCode);
						if(objDetail[k].quantity == '' || objDetail[k].quantity == undefined){
							objDetail[k].quantity = 0;
						}
						a2.push(objDetail[k].quantity);
						lstString3.push(a2);
					}
				}
			}
		}
		
		//////HEADER FOR GRID
		if($('#errMsgProduct').html() != '' && $('#errMsgProduct').html().length > 0 ){
			$('#divOverlay').hide();
			return false;
		}
		var indexErr = 0;
		var indexConfirm = 0;
		var isConfirm = false;
		var objHeader = $('#grid').datagrid('getData').rows;
		for(var i= 0;i<size;i++){
			//var str = i.toString();
			if(i == 0){
				$('#grid').datagrid('acceptChanges');
				EasyUiCommon.formatLabelAfterChange(type);
			}
			if($('#errMsgProduct').html() == '' || $('#errMsgProduct').html().length == 0 ){
				indexErr = i +1;
				if(type == 'ZV01' || type == 'ZV02' || type == 'ZV04' || type == 'ZV05'){
					//if($.inArray(str,EasyUiCommon.indexDeleted) == -1){
						if(objHeader[i].productCode != '' && objHeader[i].productCode != undefined ){
							var numExist = 0;
							if(lstString1.indexOf(objHeader[i].productCode) > -1){
								numExist = 1;
							}
							lstString1.push(objHeader[i].productCode);
							if(type == 'ZV01'){
								if(numExist == 1){
/*									if(lstString2.indexOf(parseInt(objHeader[i].quantity)) > -1 || lstString2.indexOf(objHeader[i].quantity) > -1){
										numExist = 2;
									}*/
									
									var gridRows = $('#grid').datagrid('getData').rows;
									for(var jg =0; jg<gridRows.length; jg++){
										if(jg != i){
											if(objHeader[i].productCode == gridRows[jg].productCode){
												if(Number(gridRows[jg].quantity) == Number(objHeader[i].quantity)){
													numExist = 2;
												}
											}
										}
									}
								}
								if(numExist == 2){
									$('#grid').datagrid('selectRow', i);
									$('#errMsgProduct').html(msgMaSanPham+objHeader[i].productCode+msgLoi5).show();
								}
								lstString2.push(objHeader[i].quantity);
								lstString3.push(objHeader[i].discountPercent);
								if(objHeader[i].quantity == ''|| objHeader[i].quantity == undefined || objHeader[i].quantity <= 0){
									$('#errMsgProduct').html(msgLoi8+' ' + indexErr+' '+msgLoi9).show();
								}
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent <= 0){
									$('#errMsgProduct').html(msgLoi13+' ' + indexErr+' '+msgLoi9).show();
								}
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent > 100){
									$('#errMsgProduct').html(msgLoi13+' ' + indexErr+' '+msgLoi14).show();
								}
							}else if(type == 'ZV02'){
								if(numExist == 1){
									/*if( (lstString2.indexOf(parseInt(objHeader[i].quantity)) > -1 || lstString2.indexOf(objHeader[i].quantity) > -1) 
											&& (lstString1[i] == objHeader[i].productCode) ){
										numExist = 2;
									}*/
									$('#grid').datagrid('acceptChanges');
									var gridRows = $('#grid').datagrid('getData').rows;
									for(var jg =0; jg<gridRows.length; jg++){
										if(jg != i){
											if(objHeader[i].productCode == gridRows[jg].productCode){
												if(Number(gridRows[jg].quantity) == Number(objHeader[i].quantity)){
													numExist = 2;
												}
											}
										}
									}
									
								}
								if(numExist == 2){
									$('#grid').datagrid('selectRow', i);
									$('#errMsgProduct').html(msgMaSanPham +objHeader[i].productCode+ msgLoi5).show();
								}
								lstString2.push(objHeader[i].quantity);
								if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") > -1){
									lstString3.push(objHeader[i].discountAmount);
								}else if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") == -1){
									lstString3.push(objHeader[i].discountAmount);
								}
								if(objHeader[i].quantity == ''|| objHeader[i].quantity == undefined || objHeader[i].quantity <= 0){
									$('#errMsgProduct').html(msgLoi8+' ' + indexErr+' '+ msgLoi9).show();
								}
								if(objHeader[i].discountAmount == ''|| objHeader[i].discountAmount == undefined || objHeader[i].discountAmount <= 0){
									$('#errMsgProduct').html(msgLoi10+' ' + indexErr+' '+ msgLoi9).show();
								}
							}else if(type == 'ZV04'){
								if(numExist == 1){
									if(lstString2.indexOf(parseInt(objHeader[i].amount)) > -1 || lstString2.indexOf(objHeader[i].amount) > -1){
										/*
										 * (A) check product
										 * @modified by tuannd20
										 * @date 25/07/2014
										 */
										for (var j=0;j<i;j++){
											if (objHeader[j].productCode !== undefined && objHeader[j].productCode !== null
												&& objHeader[j].productCode.trim() === objHeader[i].productCode.trim()
												&& Number(objHeader[j].amount) === Number(objHeader[i].amount)){
												numExist = 2;
												break;
											}
										}
									}
								}
								if(numExist == 2){
									$('#grid').datagrid('selectRow', i);
									$('#errMsgProduct').html(msgMaSanPham +objHeader[i].productCode+ msgLoi11).show();
								}
								lstString2.push(objHeader[i].amount);
								lstString3.push(objHeader[i].discountPercent);
								if(objHeader[i].amount == ''|| objHeader[i].amount == undefined || objHeader[i].amount <= 0){
									$('#errMsgProduct').html(msgLoi12+' ' + indexErr+' '+ msgLoi9).show();
								}
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent <= 0){
									$('#errMsgProduct').html(msgLoi13+' ' + indexErr+' '+ msgLoi9).show();
								}
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent > 100){
									$('#errMsgProduct').html(msgLoi13+' ' + indexErr+' '+ msgLoi14).show();
								}
							}else if(type == 'ZV05'){
								if(numExist == 1){
/*									if(lstString2.indexOf(parseInt(objHeader[i].amount)) > -1 || lstString2.indexOf(objHeader[i].amount) > -1){
										numExist = 2;
									}*/
									
									var gridRows = $('#grid').datagrid('getData').rows;
									for(var jg =0; jg<gridRows.length; jg++){
										if(jg != i){
											if(objHeader[i].productCode == gridRows[jg].productCode){
												if(Number(gridRows[jg].amount) == Number(objHeader[i].amount)){
													numExist = 2;
												}
											}
										}
									}
								}
								if(numExist == 2){
									$('#grid').datagrid('selectRow', i);
									$('#errMsgProduct').html(msgMaSanPham +objHeader[i].productCode+ msgLoi11).show();
								}
								lstString2.push(objHeader[i].amount);
								if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") > -1){
									lstString3.push(objHeader[i].discountAmount);
								}else if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") == -1){
									lstString3.push(objHeader[i].discountAmount);
								}
								if(objHeader[i].amount == ''|| objHeader[i].amount == undefined || objHeader[i].amount <= 0){
									$('#errMsgProduct').html(msgLoi12 + indexErr+ msgLoi9).show();
								}
								if(objHeader[i].discountAmount == ''|| objHeader[i].discountAmount == undefined || objHeader[i].discountAmount <= 0){
									$('#errMsgProduct').html(msgLoi10 + indexErr+ msgLoi9).show();
								}
								if(objHeader[i].amount != '' &&  objHeader[i].discountAmount != '' && parseInt(objHeader[i].amount) < parseInt(objHeader[i].discountAmount)){
									isConfirm = true;
									indexConfirm = indexErr;
								}
							}
						}else{
							if(type == 'ZV01'){
								if((objHeader[i].quantity != '' && objHeader[i].quantity > 0) || (objHeader[i].discountPercent != '' && objHeader[i].discountPercent > 0)){
									$('#errMsgProduct').html(msgLoi15+ indexErr).show();
								}
							}else if(type == 'ZV02'){
								if((objHeader[i].quantity != '' && objHeader[i].quantity > 0) || (objHeader[i].discountAmount != '' && objHeader[i].discountAmount > 0)){
									$('#errMsgProduct').html(msgLoi15+ indexErr).show();
								}
							}else if(type == 'ZV04'){
								if((objHeader[i].quantity != '' && objHeader[i].quantity > 0) || (objHeader[i].discountPercent != '' && objHeader[i].discountPercent > 0)){
									$('#errMsgProduct').html(msgLoi15+ indexErr).show();
								}
							}else if(type == 'ZV05'){
								if((objHeader[i].amount != '' && objHeader[i].amount > 0) || (objHeader[i].discountAmount != '' && objHeader[i].discountAmount > 0)){
									$('#errMsgProduct').html(msgLoi15+ indexErr).show();
								}
							}
						}
					//}
				}else if(type == 'ZV03' || type == 'ZV06'){
					
/*					if(($.inArray(str,EasyUiCommon.indexDeleted) == -1)
						&& (EasyUiCommon._mapNewDataSubGrid1.get(i) != null)
						){*/
						
						if(objHeader[i].productCode != '' && objHeader[i].productCode != undefined ){
							var a1= [];
							a1.push(objHeader[i].productCode);
							if(type == 'ZV03'){
								a1.push(objHeader[i].quantity);
								if(objHeader[i].quantity == ''|| objHeader[i].quantity == undefined || objHeader[i].quantity <= 0){
									$('#errMsgProduct').html(msgLoi8+' ' + indexErr+' ' +msgLoi9).show();
								}
								if(EasyUiCommon._mapProductCodeStr1.get(i) == null || EasyUiCommon._mapProductCodeStr1.get(i).length == 0){
									$('#errMsgProduct').html(msgLoi17+' ' + indexErr).show();
								}
							}else if(type == 'ZV06'){
								a1.push(objHeader[i].amount);
								if(objHeader[i].amount == ''|| objHeader[i].amount == undefined || objHeader[i].amount <= 0){
									$('#errMsgProduct').html(msgLoi12+' ' + indexErr+' ' +msgLoi9).show();
								}
								if(EasyUiCommon._mapProductCodeStr1.get(i) == null || EasyUiCommon._mapProductCodeStr1.get(i).length == 0){
									$('#errMsgProduct').html(msgLoi17+' ' + indexErr).show();
								}
							}
							lstString1.push(a1);
						}else{
							if(type == 'ZV03'){
								if((objHeader[i].quantity != '' && objHeader[i].quantity > 0) || (EasyUiCommon._mapProductCodeStr1.get(i) != null && EasyUiCommon._mapProductCodeStr1.get(i).length > 0)){
									$('#errMsgProduct').html(msgLoi15+ indexErr).show();
								}
							}else if(type == 'ZV06'){
								if((objHeader[i].amount != '' && objHeader[i].amount > 0) || (EasyUiCommon._mapProductCodeStr1.get(i) != null && EasyUiCommon._mapProductCodeStr1.get(i).length > 0)){
									$('#errMsgProduct').html(msgLoi15+' ' + indexErr).show();
								}
							}
						}
					//}//point
				
				
				
				}else if(type == 'ZV07' || type == 'ZV08' ||type == 'ZV10' || type == 'ZV11'){
					if(/*($.inArray(str,EasyUiCommon.indexDeleted) == -1) &&*/ (EasyUiCommon._mapNewDataSubGrid1.get(i) != null)){
						if(EasyUiCommon._mapNewDataSubGrid1.get(i) != null && EasyUiCommon._mapNewDataSubGrid1.get(i).length > 0){
							var a1= [];
							if(type == 'ZV07'){
								var numExist = 0;
								if(lstNumber.indexOf(parseInt(objHeader[i].quantity)) > -1 || lstNumber.indexOf(objHeader[i].quantity) > -1){
									numExist = 1;
								}
								if(numExist == 1){
									$('#errMsgProduct').html(msgLoi8+' '+ indexErr+ ' '+msgLoi18).show();
								}
								lstNumber.push(objHeader[i].quantity);
								a1.push(objHeader[i].quantity);
								a1.push(objHeader[i].discountPercent);
								if(objHeader[i].quantity == ''|| objHeader[i].quantity == undefined || objHeader[i].quantity <= 0){
									$('#errMsgProduct').html(msgLoi8+' '+ indexErr+' ' +msgLoi9).show();
								}
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent <= 0){
									$('#errMsgProduct').html(msgLoi13+' '+ indexErr+ ' '+msgLoi9).show();
								}
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent > 100){
									$('#errMsgProduct').html(msgLoi13+' ' + indexErr+' '+msgLoi14).show();
								}
							}else if(type == 'ZV08'){
								var numExist = 0;
								if(lstNumber.indexOf(parseInt(objHeader[i].quantity)) > -1 || lstNumber.indexOf(objHeader[i].quantity) > -1){
									numExist = 1;
								}
								if(numExist == 1){
									$('#errMsgProduct').html(msgLoi8+ ' '+ indexErr+' '+msgLoi18).show();
								}
								lstNumber.push(objHeader[i].quantity);
								a1.push(objHeader[i].quantity);
								if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") > -1){
									a1.push(objHeader[i].discountAmount.split('.')[0]);
								}else if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") == -1){
									a1.push(objHeader[i].discountAmount);
								}
								if(objHeader[i].quantity == ''|| objHeader[i].quantity == undefined || objHeader[i].quantity <= 0){
									$('#errMsgProduct').html(msgLoi8+' '+ indexErr+' '+msgLoi9).show();
								}
								if(objHeader[i].discountAmount == ''|| objHeader[i].discountAmount == undefined || objHeader[i].discountAmount <= 0){
									$('#errMsgProduct').html(msgLoi10+' '+ indexErr+' '+msgLoi9).show();
								}
							}else if(type == 'ZV10'){
								var numExist = 0;
								if(lstNumber.indexOf(parseInt(objHeader[i].amount)) > -1 || lstNumber.indexOf(objHeader[i].amount) > -1){
									numExist = 1;
								}
								if(numExist == 1){
									$('#errMsgProduct').html(msgLoi12+' '+ indexErr+' '+msgLoi18).show();
								}
								lstNumber.push(objHeader[i].amount);
								a1.push(objHeader[i].amount);
								a1.push(objHeader[i].discountPercent);
								if(objHeader[i].amount == ''|| objHeader[i].amount == undefined || objHeader[i].amount <= 0){
									$('#errMsgProduct').html(msgLoi12+' '+ indexErr+' '+msgLoi9).show();
								}
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent <= 0){
									$('#errMsgProduct').html(msgLoi13+' '+ indexErr+' '+msgLoi9).show();
								}
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent > 100){
									$('#errMsgProduct').html(msgLoi13+' ' + indexErr+' '+msgLoi14).show();
								}
							}else if(type == 'ZV11'){
								var numExist = 0;
								if(lstNumber.indexOf(parseInt(objHeader[i].amount)) > -1 || lstNumber.indexOf(objHeader[i].amount) > -1){
									numExist = 1;
								}
								if(numExist == 1){
									$('#errMsgProduct').html(msgLoi12+' '+ indexErr+' '+msgLoi18).show();
								}
								lstNumber.push(objHeader[i].amount);
								a1.push(objHeader[i].amount);
								if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") > -1){
									a1.push(objHeader[i].discountAmount.split('.')[0]);
								}else if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") == -1){
									a1.push(objHeader[i].discountAmount);
								}
								if(objHeader[i].amount == ''|| objHeader[i].amount == undefined || objHeader[i].amount <= 0){
									$('#errMsgProduct').html(msgLoi12+ ' '+ indexErr+ ' '+msgLoi9).show();
								}
								if(objHeader[i].discountAmount == ''|| objHeader[i].discountAmount == undefined || objHeader[i].discountAmount <= 0){
									$('#errMsgProduct').html(msgLoi10+ ' '+ indexErr+ ' '+msgLoi9).show();
								}
							}
							lstString1.push(a1);
						}else{
							if(type == 'ZV07'){
								if((objHeader[i].quantity != '' && objHeader[i].quantity > 0) || (objHeader[i].discountPercent != '' && objHeader[i].discountPercent > 0)){
									$('#errMsgProduct').html(msgLoi15 + " "+ indexErr).show();
								}
							}else if(type == 'ZV08'){
								if((objHeader[i].quantity != '' && objHeader[i].quantity > 0) || (objHeader[i].discountAmount != '' && objHeader[i].discountAmount > 0)){
									$('#errMsgProduct').html(msgLoi15 + " "+ indexErr).show();
								}
							}else if(type == 'ZV10'){
								if((objHeader[i].amount != '' && objHeader[i].amount > 0) || (objHeader[i].discountPercent != '' && objHeader[i].discountPercent > 0)){
									$('#errMsgProduct').html(msgLoi15 + " "+ indexErr).show();
								}
							}else if(type == 'ZV11'){
								if((objHeader[i].amount != '' && objHeader[i].amount > 0) || (objHeader[i].discountAmount != '' && objHeader[i].discountAmount > 0)){
									$('#errMsgProduct').html(msgLoi15 + " "+ indexErr).show();
								}
							}
						}
					}
				}else if(type == 'ZV09' || type == 'ZV12' ||type == 'ZV15' /*|| type == 'ZV18'*/ || type == 'ZV22'){
					if(/*($.inArray(str,EasyUiCommon.indexDeleted) == -1) &&*/ EasyUiCommon._mapNewDataSubGrid1.get(i) != null && EasyUiCommon._mapNewDataSubGrid2.get(i) != null){
						if(EasyUiCommon._mapNewDataSubGrid1.get(i) != null && EasyUiCommon._mapNewDataSubGrid1.get(i).length > 0){
							var a1= [];
							if(type == 'ZV09' || type == 'ZV22'){
								var numExist = 0;
								
								if(!Utils.isEmpty(objHeader[i].quantity)){
									if(lstNumber.indexOf(parseInt(objHeader[i].quantity)) > -1 || lstNumber.indexOf(objHeader[i].quantity.toString()) > -1){
										numExist = 1;
									}
								
									if(numExist == 1){
										$('#errMsgProduct').html(msgLoi8+ indexErr+msgLoi18).show();
									}
									lstNumber.push(objHeader[i].quantity);
									a1.push(objHeader[i].quantity);
									if(objHeader[i].quantity == ''|| objHeader[i].quantity == undefined || objHeader[i].quantity <= 0){
										$('#errMsgProduct').html(msgLoi8+ indexErr+msgLoi9).show();
									}
									if(EasyUiCommon._mapNewDataSubGrid2.get(i) == null || EasyUiCommon._mapNewDataSubGrid2.get(i).length == 0){
										$('#errMsgProduct').html(msgLoi17+ indexErr).show();
									}
								}else{
									if(type == 'ZV09'){
										$('#errMsgProduct').html(msgLoi20).show();
									}
								}
							}else if(type == 'ZV12'){
								var numExist = 0;
								if(lstNumber.indexOf(parseInt(objHeader[i].amount)) > -1 || lstNumber.indexOf(objHeader[i].amount) > -1){
									numExist = 1;
								}
								if(numExist == 1){
									$('#errMsgProduct').html(msgLoi12+ indexErr+msgLoi18).show();
								}
								lstNumber.push(objHeader[i].amount);
								a1.push(objHeader[i].amount);
								if(objHeader[i].amount == ''|| objHeader[i].amount == undefined || objHeader[i].amount <= 0){
									$('#errMsgProduct').html(msgLoi12+ indexErr+msgLoi9).show();
								}
								if(EasyUiCommon._mapNewDataSubGrid2.get(i) == null || EasyUiCommon._mapNewDataSubGrid2.get(i).length == 0){
									$('#errMsgProduct').html(msgLoi17 + ' ' + indexErr).show();
								}
							}else if(type == 'ZV15'){
								if(EasyUiCommon._mapNewDataSubGrid2.get(i) == null || EasyUiCommon._mapNewDataSubGrid2.get(i).length == 0){
									$('#errMsgProduct').html(msgLoi17 + ' ' + indexErr).show();
								}
							}else if(type == 'ZV18'){
								if(EasyUiCommon._mapNewDataSubGrid2.get(i) == null || EasyUiCommon._mapNewDataSubGrid2.get(i).length == 0){
									$('#errMsgProduct').html(msgLoi17 + ' ' + indexErr).show();
								}
							}
							lstString1.push(a1);
						}else{
							if(type == 'ZV09' || type == 'ZV22'){
								if((objHeader[i].quantity != '' && objHeader[i].quantity > 0) || (EasyUiCommon._mapNewDataSubGrid2.get(i) != null && EasyUiCommon._mapNewDataSubGrid2.get(i).length > 0)){
									$('#errMsgProduct').html(msgLoi15 + " "+ indexErr).show();
								}
							}else if(type == 'ZV12'){
								if((objHeader[i].amount != '' && objHeader[i].amount > 0) || (EasyUiCommon._mapNewDataSubGrid2.get(i) != null && EasyUiCommon._mapNewDataSubGrid2.get(i).length > 0)){
									$('#errMsgProduct').html(msgLoi15 + " "+ indexErr).show();
								}
							}else if(type == 'ZV15'){
								if(EasyUiCommon._mapNewDataSubGrid2.get(i) != null && EasyUiCommon._mapNewDataSubGrid2.get(i).length > 0){
									$('#errMsgProduct').html(msgLoi15 + " "+ indexErr).show();
								}
							}/*else if(type == 'ZV18'){
								if(EasyUiCommon._mapNewDataSubGrid2.get(i) != null && EasyUiCommon._mapNewDataSubGrid2.get(i).length > 0){
									$('#errMsgProduct').html(msgLoi15 + " "+ indexErr).show();
								}
							}*/
						}
					}else /*if($.inArray(str,EasyUiCommon.indexDeleted) == -1)*/{
						if(EasyUiCommon._mapNewDataSubGrid1.get(i) == null){
							$('#errMsgProduct').html(msgLoi15 + " "+ indexErr).show();
						}else if(EasyUiCommon._mapNewDataSubGrid2.get(i) == null){
							$('#errMsgProduct').html(msgLoi17 + ' ' + indexErr).show();
						}
					}
				}else if(type == 'ZV13' || type == 'ZV14' ||type == 'ZV16' || type == 'ZV17'){
					if(/*($.inArray(str,EasyUiCommon.indexDeleted) == -1) &&*/ (EasyUiCommon._mapNewDataSubGrid1.get(i) != null)){
						if(EasyUiCommon._mapNewDataSubGrid1.get(i) != null && EasyUiCommon._mapNewDataSubGrid1.get(i).length > 0){
							var a1= [];
							if(type == 'ZV13'){
								a1.push(objHeader[i].discountPercent);
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent <= 0){
									$('#errMsgProduct').html(msgLoi13+' '+ indexErr+msgLoi9).show();
								}
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent > 100){
									$('#errMsgProduct').html(msgLoi13+' ' + indexErr+msgLoi14).show();
								}
							}else if(type == 'ZV14'){
								if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") > -1){
									a1.push(objHeader[i].discountAmount.split('.')[0]);
								}else if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") == -1){
									a1.push(objHeader[i].discountAmount);
								}
								if(objHeader[i].discountAmount == ''|| objHeader[i].discountAmount == undefined || objHeader[i].discountAmount <= 0){
									$('#errMsgProduct').html(msgLoi10+ indexErr+msgLoi9).show();
								}
							}else if(type == 'ZV16'){
								a1.push(objHeader[i].discountPercent);
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent <= 0){
									$('#errMsgProduct').html(msgLoi13+' '+ indexErr+msgLoi9).show();
								}
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent > 100){
									$('#errMsgProduct').html(msgLoi13+' ' + indexErr+msgLoi14).show();
								}
							}else if(type == 'ZV17'){
								if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") > -1){
									a1.push(objHeader[i].discountAmount.split('.')[0]);
								}else if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") == -1){
									a1.push(objHeader[i].discountAmount);
								}
								if(objHeader[i].discountAmount == ''|| objHeader[i].discountAmount == undefined || objHeader[i].discountAmount <= 0){
									$('#errMsgProduct').html(msgLoi10+ indexErr+msgLoi9).show();
								}
							}
							lstString1.push(a1);
						}else{
							if(type == 'ZV13'){
								if(objHeader[i].discountPercent != '' && objHeader[i].discountPercent > 0){
									$('#errMsgProduct').html(msgLoi15+ indexErr).show();
								}
							}else if(type == 'ZV14'){
								if(objHeader[i].discountAmount != '' && objHeader[i].discountAmount > 0){
									$('#errMsgProduct').html(msgLoi15+ indexErr).show();
								}
							}else if(type == 'ZV16'){
								if(objHeader[i].discountPercent != '' && objHeader[i].discountPercent > 0){
									$('#errMsgProduct').html(msgLoi15+ indexErr).show();
								}
							}else if(type == 'ZV17'){
								if(objHeader[i].discountAmount != '' && objHeader[i].discountAmount > 0){
									$('#errMsgProduct').html(msgLoi15+ indexErr).show();
								}
							}
						}
					}
				}else if(type == 'ZV19' || type == 'ZV20'){
					//if($.inArray(str,EasyUiCommon.indexDeleted) == -1){
						if(objHeader[i].amount != '' && objHeader[i].amount > 0){
							lstString1.push(objHeader[i].amount);
							if(type == 'ZV19'){
								lstString2.push(objHeader[i].discountPercent);
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent <= 0){
									$('#errMsgProduct').html(msgLoi13+' ' + indexErr+' ' +msgLoi9).show();
								}
								if(objHeader[i].discountPercent == ''|| objHeader[i].discountPercent == undefined || objHeader[i].discountPercent > 100){
									$('#errMsgProduct').html(msgLoi13+' ' + indexErr+' ' +msgLoi14).show();
								}
							}else if(type == 'ZV20'){
								if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") > -1){
									lstString2.push(objHeader[i].discountAmount);
								}else if(objHeader[i].discountAmount != null && objHeader[i].discountAmount.toString().indexOf(".") == -1){
									lstString2.push(objHeader[i].discountAmount);
								}
								if(objHeader[i].amount == ''|| objHeader[i].amount == undefined || objHeader[i].amount <= 0){
									$('#errMsgProduct').html(msgLoi12+' ' + indexErr+' ' +msgLoi9).show();
								}
								if(objHeader[i].discountAmount == ''|| objHeader[i].discountAmount == undefined || objHeader[i].discountAmount <= 0){
									$('#errMsgProduct').html(msgLoi10+' ' + indexErr+' ' +msgLoi9).show();
								}
								if(objHeader[i].amount != '' &&  objHeader[i].discountAmount != '' && parseInt(objHeader[i].amount) < parseInt(objHeader[i].discountAmount)){
									isConfirm = true;
									indexConfirm = indexErr;
								}
							}
						}else{
							if(type == 'ZV19'){
								if(objHeader[i].discountPercent != '' && objHeader[i].discountPercent > 0){
									$('#errMsgProduct').html(msgLoi16+ indexErr).show();
								}
							}else if(type == 'ZV20'){
								if(objHeader[i].discountAmount != '' && objHeader[i].discountAmount > 0){
									$('#errMsgProduct').html(msgLoi16+ indexErr).show();
								}
							}
						}
					//}
				}else if(type == 'ZV21'){
					if(/*($.inArray(str,EasyUiCommon.indexDeleted) == -1) &&*/ (EasyUiCommon._mapNewDataSubGrid1.get(i) != null)){
						if(objHeader[i].amount != '' && objHeader[i].amount > 0){
							lstString1.push(objHeader[i].amount);
							if(EasyUiCommon._mapNewDataSubGrid1.get(i) == null || EasyUiCommon._mapNewDataSubGrid1.get(i).length == 0){
								$('#errMsgProduct').html(msgLoi17+ indexErr).show();
							}
						}else{
							if(EasyUiCommon._mapNewDataSubGrid1.get(i) != null && EasyUiCommon._mapNewDataSubGrid1.get(i).length > 0){
								$('#errMsgProduct').html(msgLoi16+ indexErr).show();
							}
						}
					}
				}
			}
		}
		if($('#errMsgProduct').html() != '' && $('#errMsgProduct').html().length > 0 ){
			$('#grid').datagrid('selectRow',indexErr - 1);
			$('#divOverlay').hide();
			return false;
		}
		var dataModel = new Object();		
		dataModel.promotionId = $('#promotionId').val().trim();
		dataModel.lstString1 = lstString1;
		dataModel.lstString2 = lstString2;
		dataModel.lstString3 = lstString3;
		
		if(type == 'ZV09' ||type == 'ZV12' ||type == 'ZV15' /*||type == 'ZV18'*/ ||type == 'ZV22'){
			dataModel.lstString4 = lstString4;
		}
		$('#divOverlay').hide();
		if(isConfirm){
			$.messager.confirm(msgXacNhan, msgLoi29+indexConfirm+msgLoi30, function(r){
				if (r){
					Utils.saveData(dataModel, "/catalog/promotion/change-common-data-grid", EasyUiCommon._xhrSave, 'errMsgProduct',function(data){
//						EasyUiCommon.loadCommonDataGrid(type,permission);
						PromotionCatalog.loadProduct();
					});
				}
			});	
		}else{
			Utils.addOrSaveData(dataModel, '/catalog/promotion/change-common-data-grid', EasyUiCommon._xhrSave,'errMsgProduct', function(data){
//				EasyUiCommon.loadCommonDataGrid(type,permission);
				PromotionCatalog.loadProduct();
			});
		}
		return false;
	},
	reloadNewDataForSubGrid: function(gridId, gridIndex,gridDetailId){
		var size = $('#'+gridId).datagrid('getRows').length;
		for(var m = 0;m<size;m++){
			$('#'+gridId).datagrid('collapseRow',m);
			$('#'+gridId).datagrid('expandRow',m);
		}
		EasyUiCommon.loadLocalDataForSubGrid(gridDetailId,gridIndex);		
	},
	loadLocalDataForSubGrid: function(gridDetailId,gridIndex){
		var newData = {};
		if(gridDetailId != undefined){
			if(gridDetailId.substring(0,3) == 'ddv'){
				newData = EasyUiCommon._mapNewDataSubGrid1.get(gridIndex);
			}else{
				newData = EasyUiCommon._mapNewDataSubGrid2.get(gridIndex);
			}
		}else{
			newData = EasyUiCommon._mapNewDataSubGrid1.get(gridIndex);
		}
		if(newData!= undefined && newData!= null && newData.length > 0){
			for(var i=0;i<newData.length;i++){
				var numRow = $('#'+gridDetailId).datagrid('getRows').length;
				$('#'+gridDetailId).datagrid('insertRow',{index: numRow-1, row:newData[i]});
			}
		}
	},
	clearTmpRowInSubGrid: function(datagridView){
		$('.datagrid-row-detail .datagrid-view'+ datagridView +' .datagrid-body table tbody').each(function(){
			var arrSubChild = $(this).children();
			var rowIndex = -1;
			arrSubChild.each(function(){
			    if(!$(this).hasClass('datagrid-row') || $(this).attr('id').split('-')[3]!=datagridView || $(this).attr('datagrid-row-index')== rowIndex){
			        $(this).remove();
			    } else {
			        rowIndex = $(this).attr('datagrid-row-index');
			    }    
			});
		});		
		
	},
	updateRownumWidthForJqGridEX1:function(parentId,colReduceWidth){	
		var pId = '';
		if(parentId!= null && parentId!= undefined){
			pId = parentId + ' ';
		}
		var lastValue=$(pId + '.datagrid-cell-rownumber').last().text().trim().length;
		var widthSTT = $('.easyui-dialog .datagrid-cell-rownumber').width();
		var s = $('.easyui-dialog .datagrid-header-row td[field='+colReduceWidth+'] div').width();
		if(EasyUiCommon._lstSize != null && EasyUiCommon._lstSize != undefined){ 
			s = EasyUiCommon._lstSize[0];
		}
		if(lastValue > 0){
			var extWidth = 25;
			if(lastValue > 2){
				extWidth += (lastValue - 2) * 9;
			}
			var value = extWidth - widthSTT;
			s = s - value;
			$(pId + '.datagrid-cell-rownumber').css('width',extWidth);
			$(pId + '.datagrid-header-rownumber').css('width',extWidth);
			$(parentId + ' .datagrid-row').each(function(){
				$(parentId + ' .datagrid-header-row td[field='+colReduceWidth+'] div').width(s);
				$(parentId + ' .datagrid-row td[field='+colReduceWidth+'] div').width(s);
			});
			
		}
	},
	loadAutoCompleteForProduct: function(filter){	//filter: desObj, pType, type	
		var desObj = filter.desObj;
		var template = '';
		var gridDetailId = '';
		if(filter.gridId != null && filter.gridId != undefined){
			gridDetailId = filter.gridId;
		}
		if(filter.pType == EasyUiCommon.REQUIRE_PRODUCT){
			template = '<h3 style="float:left">${productCode}</h3><span style="float:right"><label style="font-size:10px;font-style:italic">BB mua:</label><input style="margin-top:7px" type="checkbox"/></span></br><p>${productName}</p>';
		} else if(filter.pType == EasyUiCommon.QUANTITY_PRODUCT){
			template = '<h3 style="float:left">${productCode}</h3><span style="float:right"><label style="font-size:10px;font-style:italic">SL mua:</label><input style="float:right !important;width:30px" class="InputTextStyle " type="text"/></span></br><p>${productName}</p>';
		} else if(filter.pType == EasyUiCommon.AMOUNT_PRODUCT){
			template = '<h3 style="float:left">${productCode}</h3><span style="float:right"><label style="font-size:10px;font-style:italic">TT mua:</label><input style="float:right !important;width:30px" class="InputTextStyle " type="text"/></span></br><p>${productName}</p>';
		} else if(filter.pType == EasyUiCommon.DETAIL_PRODUCT){
			template = '<h3 style="float:left">${productCode}</h3></br><p>${productName}</p>';
		}
		if(desObj != null && desObj != undefined){
			desObj.kendoAutoComplete({	 
				highlightFirst: true,
                filter: "startswith",
                placeholder: msgNhapSP,
                separator: ", ",
                dataSource: {
                    type: "json",
                    serverFiltering: true,
                    serverPaging: true,
                    pageSize: 20,
                    transport: {
                        read:WEB_CONTEXT_PATH+ "/catalog/product/autocomplete?isExceptZCat=true"
                    }
                },
                dataTextField: "productCode",
                template: template,
                change: function(e){        
            		var value = this.element.val();
            		var arrVal = value.split(',');
            		var fVal = '';
            		if(filter.type == EasyUiCommon.AUTOCOMPLETE_MUL && filter.pType == EasyUiCommon.REQUIRE_PRODUCT){
            			if(arrVal!= null && arrVal.length  > 0){
            				for(var i=0;i<arrVal.length;i++){
            					if(arrVal[i] != undefined){
            						var fSubVal = arrVal[i].trim().replace(/\*/g,'');
            						if(pCodeRep!= null && fSubVal == pCode && fVal.indexOf(fSubVal) == -1){
            							fVal += pCodeRep + ', ';
            						} else if(arrVal[i].trim().length > 0 && fVal.indexOf(fSubVal) == -1) {
            							fVal += arrVal[i].trim() + ', ';
            						}
            					}
            				}
            				if(gridDetailId != ''){
            					EasyUiCommon.appendRowKendo(gridDetailId,filter.pType,filter.index);
            				}
            				this.element.val(fVal);
            			}
            		} else if(filter.type == EasyUiCommon.AUTOCOMPLETE_MUL && (filter.pType == EasyUiCommon.QUANTITY_PRODUCT || filter.pType == EasyUiCommon.AMOUNT_PRODUCT)){
            			if(arrVal!= null && arrVal.length  > 0){
            				for(var i=0;i<arrVal.length;i++){
            					if(arrVal[i] != undefined){
            						var fSubVal = arrVal[i].replace(/\(|\)/g,' ').trim().split(' ')[0];                    			
            						if(pCodeRep!= null && fSubVal == pCode && fVal.indexOf(fSubVal) == -1){
            							fVal += pCodeRep + ', ';
            						} else if(arrVal[i].trim().length > 0 && fVal.indexOf(fSubVal) == -1) {
            							if(arrVal[i].trim().indexOf("(") > -1 && arrVal[i].trim().indexOf(")") > -1){
            								fVal += arrVal[i].trim() + ', ';
            							}
            						}
            					}
            				}
            				if(gridDetailId != ''){
            					EasyUiCommon.appendRowKendo(gridDetailId,filter.pType,filter.index);
            				}
        					this.element.val(fVal);
            			}
            		} else{
            			if (pCode != undefined && pCode != null) {
	            			this.element.val(pCode);
	            			var ce = this.element.parent().parent().parent().parent().parent().parent().parent().parent().children().first().next().children().children().children().children().children().children();
	            			ce.val(pName);
	            			ce.attr('disabled','disabled');
            			} else {
            				var ccode = $("#grid").datagrid("getRows")[EasyUiCommon.editIndex].productCode;
            				this.element.val(ccode);
	            			var ce = this.element.parent().parent().parent().parent().parent().parent().parent().parent().children().first().next().children().children().children().children().children().children();
	            			//ce.val(pName);
	            			ce.attr('disabled','disabled');
            			}
            		}
                },
                dataBound: function(e) {
                	$(window).bind('keyup', function(evt){
                		if(evt.keyCode == 17){
                			if(filter.type == EasyUiCommon.AUTOCOMPLETE_MUL && filter.pType == EasyUiCommon.REQUIRE_PRODUCT){
                				var chkItem =  $('.k-state-focused input[type=checkbox]');
                    			if(chkItem.is(':checked')){
                    				chkItem.removeAttr('checked');
                    			} else {
                    				chkItem.attr('checked','checked');
                    			}
                			} else if(filter.type == EasyUiCommon.AUTOCOMPLETE_MUL && (filter.pType == EasyUiCommon.QUANTITY_PRODUCT || filter.pType == EasyUiCommon.AMOUNT_PRODUCT)){
                				setTimeout(function(){
                					$('.k-state-focused input').focus();
                				},500);
                			}
                		}
                	});  
                },
                close: function(e){
                	$(window).unbind('keyup');
                },
                select: function(e){
                	pCode = $('.k-state-focused h3').html();
                	pName = $('.k-state-focused p').html();
                	pCodeRep = null;
                	if(filter.type == EasyUiCommon.AUTOCOMPLETE_MUL && filter.pType == EasyUiCommon.REQUIRE_PRODUCT){
                		if($('.k-state-focused input[type=checkbox]').is(':checked')){
                			EasyUiCommon.pQuantity = 1;
                    		pCodeRep = pCode + '*';
                    	}else{
                    		EasyUiCommon.pQuantity = 0;
                    	}
                	} else if(filter.type == EasyUiCommon.AUTOCOMPLETE_MUL && (filter.pType == EasyUiCommon.QUANTITY_PRODUCT || filter.pType == EasyUiCommon.AMOUNT_PRODUCT)){
                		pCode = e.item.children().first().html();
                		var numProduct = $(e.item.children()[1]).children().last().val().trim();
                		if(numProduct.length == 0){
                			numProduct = 0;
                		}
                		EasyUiCommon.pQuantity = numProduct;
                		pCodeRep = pCode + '(' + numProduct + ')';
                	} else{
                		pCode = e.item.children().first().text();
                    	pName = e.item.children().last().text();
                	} 
                }                
            });
			setTimeout(function(){
				desObj.css('width',desObj.parent().width());
				desObj.css({'height':'20px', 'padding':'0'});
				desObj.parent().css({'padding':'0','height':'24px'});
			},100);
		}
	},
	appendRowKendo:function(gridDetailId,type,index){
		var row = {};
		var i = $('#'+gridDetailId).datagrid('getRows').length-1; 
		$('#'+gridDetailId).datagrid('deleteRow', i); 
		if(type == EasyUiCommon.REQUIRE_PRODUCT){
			row = {productCode:pCode,
					productName:pName,
					required:EasyUiCommon.pQuantity};    			
		}else if(type == EasyUiCommon.QUANTITY_PRODUCT){
			row = {productCode:pCode,
					productName:pName,
					quantity:EasyUiCommon.pQuantity}; 
		}else if(type == EasyUiCommon.AMOUNT_PRODUCT){
			row = {productCode:pCode,
					productName:pName,
					amount:EasyUiCommon.pQuantity}; 
		}
		if(pCode != '' && pCode != null && pCode != undefined){
			var size = 0;
			var productCode = '';
			var isExist = false;
			if(gridDetailId.substring(0,3) == 'ddv'){
				if(EasyUiCommon._mapNewDataSubGrid1.size() > 0){
					size = EasyUiCommon._mapNewDataSubGrid1.get(index).length;
					for(var count = 0;count< size;count++){
						productCode = EasyUiCommon._mapNewDataSubGrid1.get(index)[count].productCode;
						if(pCode == productCode){
							isExist = true;
						}
					}
				}
			}else{
				if(EasyUiCommon._mapNewDataSubGrid2.size() > 0){
					size = EasyUiCommon._mapNewDataSubGrid2.get(index).length;
					for(var count = 0;count< size;count++){
						productCode = EasyUiCommon._mapNewDataSubGrid2.get(index)[count].productCode;
						if(pCode == productCode){
							isExist = true;
						}
					}
				}
			}
			if(!isExist){
				$('#'+gridDetailId).datagrid('appendRow',row);
				if(gridDetailId.substring(0,3) == 'ddv'){
					var arrValues = EasyUiCommon._mapNewDataSubGrid1.get(index);
					if(arrValues == undefined || arrValues == null || arrValues.length == 0){
						arrValues = new Array();
					}
					arrValues.push(row);
					EasyUiCommon._mapNewDataSubGrid1.put(Number(index),arrValues);
				}else{
					var arrValues = EasyUiCommon._mapNewDataSubGrid2.get(index);
					if(arrValues == undefined || arrValues == null || arrValues.length == 0){
						arrValues = new Array();
					}
					arrValues.push(row);
					EasyUiCommon._mapNewDataSubGrid2.put(index,arrValues);
				}
			}
		}
		$('#'+gridDetailId).datagrid('appendRow',{});
		setTimeout(function(){
			$('#'+gridDetailId).datagrid('resize');
			$('#grid').datagrid('resize');
		},500);
	},
	formatValueWithDecimal: function(value, numDecimal){
		value = Utils.XSSEncode(value);
		if (value != null && parseFloat(value) > 0){
			value = parseFloat(value).toFixed(numDecimal);
		}
		return value;
	},
	dataGrid01020405 : function(gridId,url,field1,field2,field3,field4,title1,title2,title3,title4,urlComboGrid,type,permission){
		var numDigit3 = 0;
		if(type == 'ZV04' || type == 'ZV05'){
			numDigit3 = numFloat;
		}
		var numDigit4 = 0;
		if(type == 'ZV01' || type == 'ZV04'){
			numDigit4 = 2;
		}else if(type == 'ZV02' || type == 'ZV05'){
			numDigit4 = numFloat;
		}
		var _field1 = 'productCode';
		var _field2 = 'productName';
		var _title1 = msgMaSanPham;
		var _title2 = msgTenSanPham;
		if(field1 != null && field1 != undefined){
			_field1 = field1;
		}
		if(field2 != null && field2 != undefined){
			_field2 = field2;
		}
		if(title1 != null && title1 != undefined){
			_title1 = title1;
		}
		if(title2 != null && title2 != undefined){
			_title2 = title2;
		}
		var addRow = '';
		if(permission == 'true'){
			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>"; 
		}
		if(field3 != null && field3 != undefined && field4 != null && field4 != undefined ){
			$('#'+gridId).datagrid({
				url : url,
				pageList  : [10,20,30],
				width:$('.GridSection').width() -20,
				height:'auto',
				scrollbarSize : 18,
				rownumbers:true,
				autoRowHeight: true,
				columns:[[  
			          {field: _field1,title: _title1, width:200,align:'left',sortable : false,resizable : false,
			        	  editor:{
				        	  type:'text'
			          	  },
			          	formatter:function(value){
				    		return Utils.XSSEncode(value);	
				    	}
			          },
			          {field: _field2,title: _title2, width:300,align:'left',sortable : false,resizable : false,
			        	  editor:{
				        	  type:'text'
			          	  },
			          	  styler: function(value,row,index){
 							  return 'font-size:14;font-weight:bold';
			          	  },
			          	  formatter:function(value){
				    		return Utils.XSSEncode(value);	
			          	  }
			          },
			          {field: field3,title: title3, width:150,align:'right',sortable : false,resizable : false,
			        	  editor:{ 
								type:'numberbox',
					    		options:{
				    				precision:numDigit3,
				    				groupSeparator: ',',
				    				decimalSeparator: '.',
				    				max : 9999999999.99999
					    		}
				    		}, 
				    		formatter:function(value){
				    			value = EasyUiCommon.formatValueWithDecimal(value, numDigit3);
					    		return formatCurrency(Utils.XSSEncode(value));
					    	}
			          },
			          {field: field4,title: title4, width:150,align:'right',sortable : false,resizable : false,
			        	  editor:{ 
								type:'numberbox',
					    		options:{
					    			precision:numDigit4,
				    				groupSeparator: ',',
				    				decimalSeparator: '.',
				    				max : 9999999999.99999
					    		}
				    		}, 
				    		formatter:function(value){
				    			value = EasyUiCommon.formatValueWithDecimal(value, numDigit4);
					    		return formatCurrency(Utils.XSSEncode(value));	
					    	}
			          },
			          {field: 'remove',title:addRow, width:50,align:'center',sortable : false,resizable : false,
			        	  formatter: function(value,row,index){
			        		  if(permission == 'true'){
			        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
			        		  }else{
			        			  return '';
			        		  }
			        	  }
			          },
			          ]],
			      onSelect:function(index,row){
			    	  if(permission == 'true'){
		    			  if (EasyUiCommon.endEditing(gridId)){
		    				  $('#'+gridId).datagrid('beginEdit', index);  
		    				  EasyUiCommon.editIndex = index;
		    				  $('#'+gridId).datagrid('resize');
		    			  }
			        	  var ed = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: _field1});
			        	  var ed2 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: _field2});
			        	  var ed3 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field3});
			        	  var ed4 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field4});
			        	  if(ed != null && ed != undefined){
		        			  $(ed2.target).attr('disabled','disabled');
		        			  var filter = {};
		        			  filter.desObj = $(ed.target);
		        			  filter.type = EasyUiCommon.AUTOCOMPLETE_MUL;
		        			  filter.pType = EasyUiCommon.DETAIL_PRODUCT;
		        			  pCode = null;
		        			  EasyUiCommon.loadAutoCompleteForProduct(filter);
			        	  }
			        	  $(ed3.target).attr('maxlength',15);
			        	  $(ed4.target).attr('maxlength',15);
			        	  if(ed3 != null && ed3 != undefined){
			        		  $(ed3.target).bind('keyup',function(event){
			        			  if(event.keyCode == keyCodes.ENTER){	
			        				  EasyUiCommon.appendRowOnGrid(gridId);
			        			  }
			        		  });
			        	  }
			        	  if(ed4 != null && ed4 != undefined){
			        		  if(type == 'ZV02' || type == 'ZV05'){
			        			  if(numFloat > 0){
			        				  EasyUiCommon.bindFormatOnTextfield($(ed4.target),Utils._TF_NUMBER_DOT);
			        			  }else{
			        				  EasyUiCommon.bindFormatOnTextfield($(ed4.target));
			        			  }
			        		  }
			        		  $(ed4.target).bind('keyup',function(event){
			        			  if(event.keyCode == keyCodes.ENTER){		
			        				  EasyUiCommon.appendRowOnGrid(gridId);
			        			  }
			        		  });
			        	  }
//			        	  Utils.bindFormatOnTextfieldInputCss('#'+field4,'validatebox-text',Utils._TF_NUMBER_DOT);
		        	  }
			      },
		          method : 'GET',
		          onLoadSuccess:function(){
		        	  $('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
		        	  if(permission == 'true'){
		        		  $('#'+gridId).datagrid('appendRow',{});
		        	  }
		        	  $('#'+gridId).datagrid('resize');
		          }
			});
		}
	},
	dataGrid0306 : function(gridId,url,field1,field2,field3,field4,title1,title2,title3,title4,urlComboGrid,type,fieldDetail,titleDetail,permission){
		var numDigit3 = 0;
		if(type == 'ZV06'){
			numDigit3 = numFloat;
		}
		var _field1 = 'productCode';
		var _field2 = 'productName';
		var _title1 = msgMaSanPham;
		var _title2 = msgTenSanPham;
		if(field1 != null && field1 != undefined){
			_field1 = field1;
		}
		if(field2 != null && field2 != undefined){
			_field2 = field2;
		}
		if(title1 != null && title1 != undefined){
			_title1 = title1;
		}
		if(title2 != null && title2 != undefined){
			_title2 = title2;
		}
		var addRow = '';
		if(permission == 'true'){
			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
		}
		if(field3 != null && field3 != undefined && field4 != null && field4 != undefined ){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				scrollbarSize : 0,
				rownumbers:true,
				autoRowHeight: true,
				columns:[[  
				{field: _field1,title: _title1, width:200,align:'left',sortable : false,resizable : false,
					  editor:{
						  type:'text'
					  },formatter:function(value, row, index){
						  return Utils.XSSEncode(value);
					  }
				},
				{field: _field2,title: _title2, width:200,align:'left',sortable : false,resizable : false,
					  editor:{
			        	  type:'text'
		          	  },
		          	  styler: function(value,row,index){
						  return 'font-size:14;font-weight:bold';
		          	  },formatter:function(value, row, index){
						  return Utils.XSSEncode(value);
					  }
				},
				{field: field3,title: title3, width:100,align:'right',sortable : false,resizable : false,
					editor:{ 
						type:'numberbox',
			    		options:{
			    			precision:numDigit3,
		    				groupSeparator: ',',
		    				decimalSeparator: '.',
		    				max : 9999999999.99999
			    		}
		    		}, 
		    		formatter:function(value){
		    			value = EasyUiCommon.formatValueWithDecimal(value, numDigit3);
			    		return formatCurrency(Utils.XSSEncode(value));	
			    	}
				},
				{field: field4,title: title4, width:300,align:'left',sortable : false,resizable : false,
					formatter: function(value,row,index){
						return EasyUiCommon.stylerOnRow(index,value,type);
					}
				},
				{field: 'remove',title:addRow, width:50,align:'center',sortable : false,resizable : false,
					formatter: function(value,row,index){
	        		  if(permission == 'true'){
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
	        		  }else{
	        			  return '';
	        		  }
	        	  }
				}
	            ]],
	            onSelect:function(index,row){
	            	$('#divDialogSearch').hide();
	            	if(permission == 'true'){
	        		  if (EasyUiCommon.endEditing(gridId)){  
	        			  $('#'+gridId).datagrid('beginEdit', index);  
	        			  EasyUiCommon.editIndex = index;
	        			  $('#'+gridId).datagrid('resize');
	        		  } 
	        		  EasyUiCommon.formatLabelAfterChange(type);
		        	  var ed = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: _field1});
		        	  var ed2 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: _field2});
		        	  if(ed != null && ed != undefined){
		        		  $(ed2.target).attr('disabled','disabled');
	        			  var filter = {};
	        			  filter.desObj = $(ed.target);
	        			  filter.type = EasyUiCommon.AUTOCOMPLETE_MUL;
	        			  filter.pType = EasyUiCommon.DETAIL_PRODUCT;
	        			  pCode = null;
	        			  EasyUiCommon.loadAutoCompleteForProduct(filter);
		        	  }
		        	  var ed3 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field3});
		        	  var ed4 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field4});
		        	  if(ed3 != null && ed3 != undefined){
		        		  $(ed3.target).bind('keyup',function(event){
		        			  if(event.keyCode == keyCodes.ENTER){		   				
		        				  EasyUiCommon.appendRowOnGrid(gridId);
		        			  }
		        		  });
		        		  $(ed3.target).attr('maxlength',15);
		        	  }
		        	  if(ed4 != null && ed4 != undefined){
		        		  $(ed4.target).bind('focus',function(event){
		        			  EasyUiCommon.showGridDialog(index,'saleQty',msgSoLuong,'numberbox',false);
		        		  });
		        		  $(ed4.target).attr('maxlength',15);
		        	  }
	            	}
	            },
				method : 'GET',
	            onLoadSuccess:function(){
	            	$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
            		EasyUiCommon.loadDataOnGridSuccess(gridId,type);
	            	$('#'+gridId).datagrid('resize');
	            	var dom = $('#promotionStatus');
	            	if (dom != undefined && dom != null && dom.val() != null && dom.val() == 1){
	            		var rows = $('#'+gridId).datagrid('getRows');
	            		if (rows != null && rows.length > 0){
	            			$('#'+gridId).datagrid('deleteRow', rows.length -1 );
	            		}
	            	}
	            }
			});
		}
	},
	dataGrid07081011 : function(gridId,url,field2,field3,title2,title3,urlComboGrid,type,permission){
		var _field1 = 'productCodeStr';
		var _title1 = msgSanPhamMua;
		var addRow = '';
		if(permission == 'true'){
			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
		}
		if(field2 != null && field2 != undefined && field3 != null && field3 != undefined ){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width: $('.GridSection').width() -20,
				scrollbarSize : 0,
				rownumbers:true,
				autoRowHeight: true,
				columns:[[  
				{field: _field1,title: _title1, width:200,align:'left',sortable : false,resizable : false,
					  formatter: function(value,row,index){
						  
						  	/*
							 * @params : 
							 * 	index : index dong 
							 *  value : gia tri 
							 *  type : ZV01,..., ZV20
							 *  isMulti: true --> cot thu 3 (sp or amount khuyen mai) / false, null : cot 1 (san pham mua)  
							 *  @return : text + 'img'  						 
							 * */	
						  var result  = EasyUiCommon.stylerOnRow(index,value,type,false);
						  if(!isNullOrEmpty(value)){
							  var oldData = EasyUiCommon._mapProductCodeStr1.get(index);
							  if(oldData==undefined || oldData==null){
								  EasyUiCommon._mapProductCodeStr1.put(index,result);  
							  }						  
						  }
						  
						  return result;
					  }
				},
				{field: field2,title: title2, width:200,align:'left',sortable : false,resizable : false,
					editor:{ 
						type:'numberbox',
			    		options:{
			    			precision:numFloat,
				    		groupSeparator: ',',
				    		decimalSeparator: '.',
				    		max : 9999999999.99999
			    		}
		    		}, 
		    		formatter:function(value){
		    			value = EasyUiCommon.formatValueWithDecimal(value, numFloat);
		    			return formatCurrency(Utils.XSSEncode(value));	
			    	}
				},
				{field: field3,title: title3, width:100,align:'left',sortable : false,resizable : false,
					editor:{ 
						type:'numberbox',
			    		options:{
			    			groupSeparator: ',',
			    			decimalSeparator: '.',
			    			precision: 2,
			    			max : 9999999999.99999
			    		}
		    		}, 
		    		formatter:function(value){
		    			if(!Utils.isEmpty(value)){
		    				return Number((Number(value)).toFixed(2));
					}else{
						return "";
					}
			    	}
				},
				{field: 'remove',title:addRow, width:50,align:'center',sortable : false,resizable : false,
					formatter: function(value,row,index){
	        		  if(permission == 'true'){
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
	        		  }else{
	        			  return '';
	        		  }
	        	  }
				},
	            ]],
	            onSelect:function(index,row){
	            	$('#divDialogSearch').hide();
	            	if(permission == 'true'){
		        		  if (EasyUiCommon.endEditing(gridId)){  
		        			  $('#'+gridId).datagrid('beginEdit', index);  
		        			  EasyUiCommon.editIndex = index;  
		        			  $('#'+gridId).datagrid('resize');
		        		  } 
		        		  EasyUiCommon.formatLabelAfterChange(type);
			        	  var ed = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: _field1});
			        	  if(ed != null && ed != undefined){
			        		  $(ed.target).bind('focus',function(event){
			        			  EasyUiCommon.showGridDialog(index,'required',msgBatBuocMua,'checkbox',false);
			        		  });
			        	  }
			        	  var ed2 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field2});
			        	  var ed3 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field3});
			        	  if(ed2 != null && ed2 != undefined){
			        		  $(ed2.target).bind('keyup',function(event){
			        			  if(event.keyCode == keyCodes.ENTER){		   				
			        				  EasyUiCommon.appendRowOnGrid(gridId);
			        			  }
			        		  });
			        	  }
			        	  if(ed3 != null && ed3 != undefined){
			        		  if(type == 'ZV08' || type == 'ZV11'){
			        			  EasyUiCommon.bindFormatOnTextfield($(ed3.target));
			        		  }
			        		  $(ed3.target).bind('keyup',function(event){
			        			  if(event.keyCode == keyCodes.ENTER){		   				
			        				  EasyUiCommon.appendRowOnGrid(gridId);
			        			  }
			        		  });
			        	  }
	            	}
	            },
				method : 'GET',
	            onLoadSuccess:function(data){
	            	$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
            		//EasyUiCommon.loadDataOnGridSuccess(gridId,type);
	            	//$('#'+gridId).datagrid('resize');
	            	
	            	
	            	// load danh sach san pham mua vao EasyUiCommon._mapNewDataSubGrid1
	            	if(data.listBuyProduct != undefined && data.listBuyProduct.length > 0){
	            		var listBuyProduct = data.listBuyProduct;
	            		
	            		for(var i = 0 ; i < listBuyProduct.length ; i ++){
	            			var listProduct  = listBuyProduct[i];
	            			var rowProduct =new Array();
	            			for(var index = 0 ; index < listProduct.length ; index++){
	            				var product = listProduct[index];
	            				
	            				var productBuy = new Object();
	            				productBuy.required = product.required;
	            				productBuy.productCode = product.productCode;
	            				productBuy.productName = product.productName;
	            				
	            				rowProduct.push(productBuy);
	            			}
	            			EasyUiCommon._mapNewDataSubGrid1.put(Number(i),rowProduct);
	            		}
	            	}
	            	
	            	
	            	var rows = $('#'+gridId).datagrid('getRows');
	            	if( rows <= 1){
	            		/*
	            		 * @description: load du lieu tren datagrid chuong trinh khuyen mai, co xu li appendRow dong trong
	            		 * @params : 
	            		 * 			gridId : id cua data grid
	            		 * 			apParamCode: ZV01,...,ZV20	
	            		 * */            		
	            		EasyUiCommon.loadDataOnGridSuccess(gridId,type);
	            	}
	            	        		
	        		/*
	        		 * @description : the hien du kieu len datagrid chuong trinh khuyen mai cho 
	        		 * 				  column san pham mua : EasyUiCommon._mapProductCodeStr1 
	        		 * 			   va column ( san pham or tien khuyen mai ) : EasyUiCommon._mapProductCodeStr2  
	        		 * @params : 
	        		 * 			type : ZV01,...,ZV20 
	        		 * */
	        		EasyUiCommon.formatLabelAfterChange(type);
	            }
			});
		}
	},
	dataGrid0912 : function(gridId,url,field,title,urlComboGrid,type,permission){
		var addRow = '';
		if(permission == 'true'){
			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
		}
		if(field != null && field != undefined){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				fitColumns:true,
				rownumbers:true,
				scrollbarSize : 0,
				autoRowHeight: true,
				columns:[[  
				{field: 'productCodeStr',title: msgSanPhamMua, width:200,align:'left',sortable : false,resizable : false,
					  formatter: function(value,row,index){
						  //return EasyUiCommon.stylerOnRow(index,value,type);
						  var result  = EasyUiCommon.stylerOnRow(index,value,type,false);
						  if(!isNullOrEmpty(value)){
							  var oldData = EasyUiCommon._mapProductCodeStr1.get(index);
							  if(oldData==undefined || oldData==null){
								  EasyUiCommon._mapProductCodeStr1.put(Number(index),result);  
							  }						  
						  }
						  
						  return result;
					  }
				},
				{field: field,title: title, width:100,align:'right',sortable : false,resizable : false,
					editor:{ 
						type:'numberbox',
			    		options:{
			    			groupSeparator: ',',
			    			max : 9999999999.99999
			    		}
		    		}, 
		    		formatter:function(value){
			    		return formatCurrency(Utils.XSSEncode(value));	
			    	}
				},
				{field: 'freeProductCodeStr',title: msgSanPhamKM, width:200,align:'left',sortable : false,resizable : false,
					  formatter: function(value,row,index){
						  //return EasyUiCommon.stylerOnRow(index,value,type,true);
						  var result  = EasyUiCommon.stylerOnRow(index,value,type,true);
						  if(!isNullOrEmpty(value)){
							  var oldData = EasyUiCommon._mapProductCodeStr2.get(index);
							  if(oldData==undefined || oldData==null){
								  EasyUiCommon._mapProductCodeStr2.put(Number(index),result);  
							  }						  
						  }
						  
						  return result;
					  }
				},
				{field: 'remove',title:addRow, width:50,align:'center',sortable : false,resizable : false,
					formatter: function(value,row,index){
		        		  if(permission == 'true'){
		        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('"+index+"',true)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
		        		  }else{
		        			  return '';
		        		  }
		        	  }
				},
	            ]],
	            onSelect : function (index,row){
	            	$('#divDialogSearch').hide();
	            	if(permission == 'true'){
	        		    if (EasyUiCommon.endEditing(gridId)){  
	            			$('#'+gridId).datagrid('beginEdit', index);  
	            			EasyUiCommon.editIndex = index; 
	            			$('#'+gridId).datagrid('resize');
	            		}  
	        		    EasyUiCommon.formatLabelAfterChange(type);
	            		var ed2 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field});
	            		if(ed2 != null && ed2 != undefined){
	            			$(ed2.target).bind('keyup',function(event){
		        			    if(event.keyCode == keyCodes.ENTER){		   				
		        			    	EasyUiCommon.appendRowOnGrid(gridId);
		        			    }
		        		    });
	            		}
	    				//$('.datagrid-body td[field="freeProductCodeStr"] div').css('position', 'relative');
	    				//$('.datagrid-body td[field="productCodeStr"] div').css('position', 'relative');
	            	}
	            } ,
				method : 'GET',
	            onLoadSuccess:function(data){
	            	$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
	            	//EasyUiCommon.loadDataOnGridSuccess(gridId,type);
    				$('.datagrid-body td[field="freeProductCodeStr"] div').css('position', 'relative');
    				$('.datagrid-body td[field="productCodeStr"] div').css('position', 'relative');
	            	$('#'+gridId).datagrid('resize');
	            	
	            	// load danh sach san pham mua vao PromotionZV11._mapNewDataSubGrid1
	            	if(data.listBuyProduct != undefined && data.listBuyProduct.length > 0){
	            		var listBuyProduct = data.listBuyProduct;	            		
	            		for(var i = 0 ; i < listBuyProduct.length ; i ++){
	            			var listProduct  = listBuyProduct[i];
	            			var rowProduct =new Array();
	            			for(var index = 0 ; index < listProduct.length ; index++){
	            				var product = listProduct[index];
	            				
	            				var productBuy = new Object();
	            				productBuy.required = product.required;
	            				productBuy.productCode = product.productCode;
	            				productBuy.productName = product.productName;
	            				
	            				rowProduct.push(productBuy);
	            			}
	            			EasyUiCommon._mapNewDataSubGrid1.put(Number(i),rowProduct);
	            		}
	            	}
	            	  
	            	// load danh sach san pham duoc khuyen mai vao PromotionZV11._mapNewDataSubGrid2
	            	if(data.listProductPromotion != undefined && data.listProductPromotion.length > 0){
	            		var listProductPromotion = data.listProductPromotion;	            		
	            		for(var i = 0 ; i < listProductPromotion.length ; i ++){
	            			var listProduct  = listProductPromotion[i];
	            			var rowProduct =new Array();
	            			for(var index = 0 ; index < listProduct.length ; index++){
	            				var product = listProduct[index];
	            				
	            				var productBuy = new Object();
	            				productBuy.quantity = product.quantity;
	            				productBuy.productCode = product.productCode;
	            				productBuy.productName = product.productName;
	            				
	            				rowProduct.push(productBuy);
	            			}
	            			EasyUiCommon._mapNewDataSubGrid2.put(i,rowProduct);
	            		}
	            	}
	            	
	          		if(EasyUiCommon._mapProductCodeStr1.valArray.length == 0){
	        			$('#'+gridId).datagrid('appendRow',{});
	        		}	
	            	  	        
	        		/*
	        		 * @description : the hien du kieu len datagrid chuong trinh khuyen mai cho 
	        		 * 				  column san pham mua : PromotionZV11._mapProductCodeStr1 
	        		 * 			   va column ( san pham or tien khuyen mai ) : PromotionZV11._mapProductCodeStr2  
	        		 * @params : 
	        		 * 			type : ZV01,...,ZV20 
	        		 * */
	        		EasyUiCommon.formatLabelAfterChange(type);
	            	
	            },
	            onAfterEdit: function(rowIndex, rowData, changes){
	            	//$('.datagrid-body td[field="freeProductCodeStr"] div').css('position', 'relative');
    				//$('.datagrid-body td[field="productCodeStr"] div').css('position', 'relative');
	            }
			});
		}
	},
	dataGrid1518 : function(gridId,url,urlComboGrid,type,permission){
		var addRow = '';
		if(permission == 'true'){
			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
		}
		$('#'+gridId).datagrid({
			url : url,
			total:100,
			width: $('.GridSection').width() -20,
			scrollbarSize : 0,
			rownumbers:true,
			autoRowHeight: true,
			columns:[[  
			{field: 'productCodeStr',title: msgSanPhamMua, width:200,align:'left',sortable : false,resizable : false,
				  formatter: function(value,row,index){
					  return EasyUiCommon.stylerOnRow(index,value,type);
				  }
			},
			{field: 'freeProductCodeStr',title: msgSanPhamKM, width:200,align:'left',sortable : false,resizable : false,
				  formatter: function(value,row,index){
					  return EasyUiCommon.stylerOnRow(index,value,type,true);
				  }
			},
			{field: 'hiddenField', hidden:true,
				editor:{
					type:'text'
				},
				formatter:function(value, row, index){
					return Utils.XSSEncode(value);
				}
			},
			{field: 'remove',title:addRow, width:50,align:'center',sortable : false,resizable : false,
				formatter: function(value,row,index){
	        		  if(permission == 'true'){
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
	        		  }else{
	        			  return '';
	        		  }
	        	  }
			},
            ]],
            onSelect : function (index,row){ 
            	$('#divDialogSearch').hide();
            	if(permission == 'true'){
        		    if (EasyUiCommon.endEditing(gridId)){  
            			$('#'+gridId).datagrid('beginEdit', index);  
            			EasyUiCommon.editIndex = index; 
            			$('#'+gridId).datagrid('resize');
            		}  
        		    EasyUiCommon.formatLabelAfterChange(type);
            		var ed = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: 'productCodeStr'});
            		if(ed != null && ed != undefined){
            			if(type != null && type == 'ZV15'){
            				$(ed.target).bind('focus',function(event){
            					EasyUiCommon.showGridDialog(index,'saleQty',msgSoLuong,'numberbox',false);
	            			});
            			}else{
            				$(ed.target).bind('focus',function(event){
            					EasyUiCommon.showGridDialog(index,'amount',msgTongTienMua,'numberbox',false);
            				});
            			}
            		}
            		var ed2 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: 'freeProductCodeStr'});
            		if(ed2 != null && ed2 != undefined){
            			$(ed2.target).bind('focus',function(event){
            				EasyUiCommon.showGridDialog(index,'saleQty',msgSoLuong,'numberbox',true);
            			});
            		}
            	}
            } ,
			method : 'GET',
            onLoadSuccess:function(){
            	$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
//            	if(permission == 'true'){
            		EasyUiCommon.loadDataOnGridSuccess(gridId,type);
//            	}
        		$('#'+gridId).datagrid('resize');
            }
		});
	},	
	dataGrid13141617 : function(gridId,url,field2,title2,urlComboGrid,type,fieldDetail,titleDetail,permission){
		var addRow = '';
		if(permission == 'true'){
			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
		}
		var _field1 = 'productCodeStr';
		var _title1 = msgSanPhamMua;
		if(field2 != null && field2 != undefined){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				scrollbarSize : 18,
				rownumbers:true,
				autoRowHeight: true,
				columns:[[  
				{field: _field1,title: _title1, width:200,align:'left',sortable : false,resizable : false,
					  formatter: function(value,row,index){
						  return EasyUiCommon.stylerOnRow(index,value,type);
					  }
				},
				{field: field2,title: title2, width:200,align:'left',sortable : false,resizable : false,
					editor:{ 
						type:'numberbox',
			    		options:{
			    			precision:numFloat,
			    			groupSeparator: ',',
			    			decimalSeparator: '.',
			    			max : 9999999999.99999
			    		}
		    		}, 
		    		formatter:function(value){
		    			value = EasyUiCommon.formatValueWithDecimal(value, numFloat);
			    		return formatCurrency(Utils.XSSEncode(value));	
			    	}
				},
				{field: 'remove',title:addRow, width:50,align:'center',sortable : false,resizable : false,
					formatter: function(value,row,index){
	        		  if(permission == 'true'){
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
	        		  }else{
	        			  return '';
	        		  }
	        	  }
				},
	            ]],
	            onSelect:function(index,row){
	            	$('#divDialogSearch').hide();
	            	if(permission == 'true'){
		        		  if (EasyUiCommon.endEditing(gridId)){  
		        			  $('#'+gridId).datagrid('beginEdit', index);  
		        			  EasyUiCommon.editIndex = index; 
		        			  $('#'+gridId).datagrid('resize');
		        		  } 
		        		  EasyUiCommon.formatLabelAfterChange(type);
			        	  var ed = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: _field1});
			        	  if(ed != null && ed != undefined){
//			        		  $(ed.target).focusToEnd();
			        		  EasyUiCommon.eventWhenPressTAB('numberItem');
			        		  if(type == 'ZV13' || type == 'ZV14'){
			        			  $(ed.target).bind('focus',function(event){
			        				  EasyUiCommon.showGridDialog(index,'saleQty',msgSoLuong,'numberbox',false);
			        			  });
			        		  }else if(type == 'ZV16' || type == 'ZV17'){
			        			  $(ed.target).bind('focus',function(event){
			        				  EasyUiCommon.showGridDialog(index,'amount',msgTongTienMua,'numberbox',false);
			        			  });
			        		  }
			        	  }
			        	  var ed2 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field2});
			        	  if(ed2 != null && ed2 != undefined){
			        		  if(type == 'ZV14' || type == 'ZV17'){
			        			  EasyUiCommon.bindFormatOnTextfield($(ed2.target));
			        		  }
			        		  $(ed2.target).bind('keyup',function(event){
			        			  if(event.keyCode == keyCodes.ENTER){		   				
			        				  EasyUiCommon.appendRowOnGrid(gridId);
			        			  }
			        		  });
			        	  }
	            	}
	            },
				method : 'GET',
	            onLoadSuccess:function(){
	            	$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
//	            	if(permission == 'true'){
	            		EasyUiCommon.loadDataOnGridSuccess(gridId,type);
//	            	}
	        		$('#'+gridId).datagrid('resize');
	            }
			});
		}
	},
	dataGrid1920 : function(gridId,url,field1,field2,title1,title2,urlComboGrid,type,permission){
		var numDigit3 = numFloat;
		var numDigit4 = 2;
		if(type == 'ZV20'){
			numDigit4 = numFloat;
		}
		var addRow = '';
		if(permission == 'true'){
			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
		}
		if(field1 != null && field1 != undefined && field2 != null && field2 != undefined){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				//height:'auto',
				rownumbers:true,
				scrollbarSize : 18,
				autoRowHeight: true,
				columns:[[  
				{field: field1,title: title1, width:200,align:'left',sortable : false,resizable : false,
					editor:{ 
						type:'numberbox',
			    		options:{
			    			precision:numDigit3,
			    			groupSeparator: ',',
			    			decimalSeparator: '.',
			    			max : 9999999999.99999
			    		}
		    		}, 
		    		formatter:function(value){
		    			value = EasyUiCommon.formatValueWithDecimal(value, numDigit3);
			    		return formatCurrency(Utils.XSSEncode(value));	
			    	}
				},
				{field: field2,title: title2, width:200,align:'left',sortable : false,resizable : false,
					editor:{ 
						type:'numberbox',
			    		options:{
			    			precision:numDigit4,
			    			groupSeparator: ',',
			    			decimalSeparator: '.',
			    			max : 9999999999.99999
			    		}
		    		}, 
		    		formatter:function(value){
			    		return formatCurrency(Utils.XSSEncode(value));	
			    	}
				},
				{field: 'remove',title:addRow, width:50,align:'center',sortable : false,resizable : false,
					formatter: function(value,row,index){
	        		  if(permission == 'true'){
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
	        		  }else{
	        			  return '';
	        		  }
	        	  }},
	            ]],
	            onSelect : function (index,row){
	            	if(permission == 'true'){
		        		  if (EasyUiCommon.endEditing(gridId)){  
		        			  $('#'+gridId).datagrid('beginEdit', index);  
		        			  EasyUiCommon.editIndex = index;  
		        			  $('#'+gridId).datagrid('resize');
		        		  } 
			        	  var ed = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field1});
			        	  if(ed != null && ed != undefined){
			        		  $(ed.target).bind('keyup',function(event){
			        			  if(event.keyCode == keyCodes.ENTER){		   				
			        				  EasyUiCommon.appendRowOnGrid(gridId);
			        			  }
			        		  });
			        	  }
			        	  var ed2 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field2});
			        	  if(ed2 != null && ed2 != undefined){
//			        		  if(type == 'ZV20'){
//			        			  EasyUiCommon.bindFormatOnTextfield($(ed2.target));
//			        		  }
			        		  $(ed2.target).bind('keyup',function(event){
			        			  if(event.keyCode == keyCodes.ENTER){		   				
			        				  EasyUiCommon.appendRowOnGrid(gridId);
			        			  }
			        		  });
			        	  }
			        	  $(ed.target).attr('maxlength',15);
			        	  $(ed2.target).attr('maxlength',15);
	            	}
	            },
				method : 'GET',
	            onLoadSuccess:function(){
	            	$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
	            	if(permission == 'true'){
	            		$('#'+gridId).datagrid('appendRow',{});
	            	}
	            	$('#'+gridId).datagrid('resize');
	            }
			});
		}
	},
	dataGrid21 : function(gridId,url,field1,field2,title1,title2,urlComboGrid,type,fieldDetail,titleDetail,permission){
		var addRow = '';
		if(permission == 'true'){
			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
		}
		if(field1 != null && field1 != undefined && field2 != null && field2 != undefined){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				scrollbarSize : 18,
				rownumbers:true,
				autoRowHeight: true,
				columns:[[  
				{field: field1,title: title1, width:200,align:'left',sortable : false,resizable : false,
					editor:{ 
						type:'numberbox',
			    		options:{
			    			groupSeparator: ',',
			    			max : 9999999999.99999
			    		}
		    		}, 
		    		formatter:function(value){
			    		return formatCurrency(Utils.XSSEncode(value));	
			    	}
				},
				{field: field2,title: title2, width:200,align:'left',sortable : false,resizable : false,
					  formatter: function(value,row,index){
						  return EasyUiCommon.stylerOnRow(index,value,type);
					  }
				},
				{field: 'remove',title:addRow, width:50,align:'center',sortable : false,resizable : false,
					formatter: function(value,row,index){
	        		  if(permission == 'true'){
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
	        		  }else{
	        			  return '';
	        		  }
	        	  }},
	            ]],
	            onSelect : function (index,row){ 
	            	$('#divDialogSearch').hide();
	            	if(permission == 'true'){
	        		  if (EasyUiCommon.endEditing(gridId)){  
	        			  $('#'+gridId).datagrid('beginEdit', index);  
	        			  EasyUiCommon.editIndex = index; 
	        			  $('#'+gridId).datagrid('resize');
	        		  }  
	        		  EasyUiCommon.formatLabelAfterChange(type);
		        	  var ed = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field1});
		        	  if(ed != null && ed != undefined){
		        		  $(ed.target).focusToEnd();
		        		  $(ed.target).bind('keyup',function(event){
		        			  if(event.keyCode == keyCodes.ENTER){		   				
		        				  EasyUiCommon.appendRowOnGrid(gridId);
		        			  }
		        		  });
		        	  }
		        	  var ed2 = $('#'+gridId).datagrid('getEditor', {index:EasyUiCommon.editIndex,field: field2});
		        	  if(ed2 != null && ed2 != undefined){
		        		  $(ed2.target).bind('focus',function(event){
	        				  EasyUiCommon.showGridDialog(index,'saleQty',msgSoLuong,'numberbox',false);
	        			  });
		        	  }
	            	}
	            } ,
				method : 'GET',
	            onLoadSuccess:function(){
	            	$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
//	            	if(permission == 'true'){
	            		EasyUiCommon.loadDataOnGridSuccess(gridId,type);
//	            	}
	        		$('#'+gridId).datagrid('resize');
	            }
			});
		}
	},
	dataGrid22 : function(gridId,url,field,title,fieldFree,titleFree,urlComboGrid,type,permission){
		var addRow = '';
		if(permission == 'true'){
			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
		}
		if(field != null && field != undefined && fieldFree != null && fieldFree != undefined){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				fitColumns:true,
				rownumbers:true,
				scrollbarSize : 0,
				autoRowHeight: true,
				columns:[[  
				{field: 'productCodeStr',title: msgSanPhamMua, width:200,align:'left',sortable : false,resizable : false,
					  formatter: function(value,row,index){
						  return EasyUiCommon.stylerOnRow(index,value,type);
					  }
				},
				{field: field,title: title, width:50,align:'right',sortable : false,resizable : false,
					editor:{ 
						type:'numberbox',
			    		options:{
			    			groupSeparator: ',',
			    			max : 9999999999.99999
			    		}
		    		}, 
		    		formatter:function(value){
			    		return formatCurrency(Utils.XSSEncode(value));	
			    	}
				},
				{field: 'freeProductCodeStr',title: msgSanPhamKM, width:200,align:'left',sortable : false,resizable : false,
					  formatter: function(value,row,index){
						  return EasyUiCommon.stylerOnRow(index,value,type,true);
					  }
				},
				{field: fieldFree,title: titleFree, width:50,align:'right',sortable : false,resizable : false,
//					editor:{ 
//						type:'numberbox',
//			    		options:{
//			    			groupSeparator: ','
//			    		}
//		    		}, 
		    		formatter:function(value,row,index){
		    			if(row != null && row.freeProductCodeStr != undefined){
		    				var inx = EasyUiCommon._mapFreeQuantity.get(index);
		    				if(inx == null || inx == undefined){
		    					inx = EasyUiCommon.cssForNumberBoxForZV22(row.freeProductCodeStr);
		    					EasyUiCommon._mapFreeQuantity.put(index,inx);
		    				}		    				
		    				return inx
		    			}
			    	}
				},
				{field: 'remove',title:addRow, width:50,align:'center',sortable : false,resizable : false,
					formatter: function(value,row,index){
		        		  if(permission == 'true'){
		        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('"+index+"',true)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
		        		  }else{
		        			  return '';
		        		  }
		        	  }
				},
	            ]],
	            onSelect : function (index,row){
	            	$('#divDialogSearch').hide();
	            	if(permission == 'true'){
	        		    if (EasyUiCommon.endEditing(gridId)){  
	            			$('#'+gridId).datagrid('beginEdit', index);  
	            			EasyUiCommon.editIndex = index; 
	            			$('#'+gridId).datagrid('resize');
	            		}  
	        		    EasyUiCommon.formatLabelAfterChange(type);
	            	}
	            } ,
				method : 'GET',
	            onLoadSuccess:function(data){
	            	$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
            		EasyUiCommon.loadDataOnGridSuccess(gridId,type);
            		var size = data.rows.length;
            		var groupId = '';
            		if(data.lstGroupId.length > 0){
            			groupId = data.lstGroupId[0].id;
            		}
            		for(var i = 0; i <size ;i++){
            			var rowId = data.rows[i].freeProductId;
            			if(rowId != null && rowId != undefined){
            				var lstProductId = rowId.split(",");
            				var lstGroup = [];
            				for(var j = 0; j <lstProductId.length ; j++){
            					var productId = lstProductId[j].trim();
            					var id = productId+'_'+groupId;
            					lstGroup.push(id);
            				}
            				EasyUiCommon.lstGroupId.put(i,lstGroup);
            			}
            		}
            		$('#'+gridId).datagrid('resize');
	            }
			});
		}
	},
	showGridAutocomplete : function(gridId,indexGrid,inputId,_comboGridField3,_comboGridTitle3,type,apParamCode,inputValue,isTwoDetail) {
		$('#indexDialog').val(indexGrid);
		EasyUiCommon.inputId = inputId;
		EasyUiCommon.field = _comboGridField3;
		EasyUiCommon.title = _comboGridTitle3;
		EasyUiCommon.type = type;
		EasyUiCommon.apParamCode = apParamCode;
		EasyUiCommon.isMulti = isTwoDetail;
		if(inputValue == undefined){
			inputValue = '';
		}
		$('#errMsgUIDialog').html('').hide();
		$('#searchGrid').datagrid({
			url : WEB_CONTEXT_PATH +'/catalog/product/search-product?status=1&isExceptZCat=true&isPriceValid=true&productCode='+inputValue+'&lstProductCode='+EasyUiCommon._lstProductSelected,
		//	autoRowHeight : false,
			view: bufferview,
			pageSize:10,  
			rownumbers : true, 
			height: 150,
			fitColumns:true,
			singleSelect:true,
			autoRowHeight: true,
			queryParams:{
		 	},
		 	scrollbarSize : 18,
			width : ($('#gridDialog').width()),
		    columns:[[  
		        {field:'productCode',title:msgMaSanPham,align:'left', width:150, sortable : false,resizable : false,fixed:true, formatter: function(value, rowData, rowIndex){
					return Utils.XSSEncode(value);
				}},  
		        {field:'productName',title:msgTenSanPham,align:'left', width:250, sortable : false,resizable : false,fixed:true, formatter: function(value, rowData, rowIndex){
					return Utils.XSSEncode(value);
				}},
		        {field: EasyUiCommon.field,title: EasyUiCommon.title, width:100,align:'left',sortable : false,resizable : false,fixed:true,
		        	editor:{
		        		type:EasyUiCommon.type
		        	},
	            	formatter:function(value,row){
	            		if(type == 'checkbox'){
	            			return '<input class="checkItem" type="checkbox" id="'+EasyUiCommon.field+'_'+row.id+'" onkeypress="EasyUiCommon.eventOnTextField(event,this,\'checkItem\',\'searchGrid\')"/>';
	            		}else{
	            			return '<input class="numberItem" id="'+EasyUiCommon.field+'_'+row.id+'" onfocus="return Utils.bindFormatOnTextfield(\''+_comboGridField3+'_'+row.id+'\',Utils._TF_NUMBER,null);" onkeypress="EasyUiCommon.eventOnTextField(event,this,\'numberItem\',\'searchGrid\')"/>';
	            		}
	            	}},
		        {field :'id',hidden : true},
		    ]],
		    onLoadSuccess :function(){
		    	$('#searchGrid').datagrid('selectRow', 0);
		    	$('.datagrid-pager').html('').hide();
		    	$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
		    	var originalSize = $('.datagrid-header-row td[field=productCode] div').width();
		    	if(originalSize != null && originalSize != undefined){
		    		EasyUiCommon._lstSize.push(originalSize);
		    	}
	    		$(window).bind('keyup',function(event){
	    			if(event.keyCode == keyCodes.ENTER){
	    				var fVal = '';
	    				var data = $('#searchGrid').datagrid('getSelected');
	    				var arrVal = $(EasyUiCommon.inputId).val().split(",");
	    				if(EasyUiCommon.type == 'checkbox'){
							if(arrVal!= null && arrVal.length  > 0){
								for(var i=0;i<arrVal.length;i++){
									if(arrVal[i] != undefined){
										if(arrVal[i].trim() != '' && arrVal[i].trim().length >= 6){
											fVal += arrVal[i].trim() + ', ';
										}else{
											if(fVal.indexOf(data.productCode) == -1){
												arrVal[i] = '';
												arrVal[i] += data.productCode;
												var required = 0;
												if($('#'+EasyUiCommon.field+'_'+data.id).is(":checked")){
													arrVal[i] += "*";
													required = 1;
												}else{
													required = 0;	
												}
												fVal += arrVal[i].trim() + ', ';
												var row = {};
												row = {productCode:data.productCode,
														productName:data.productName,
														required:required
												}; 
												EasyUiCommon._lstProductSelected.push(data.productCode);
												if(EasyUiCommon.isMulti){
													var arrValues = EasyUiCommon._mapNewDataSubGrid2.get(Number($('#indexDialog').val()));
													if(arrValues == undefined || arrValues == null || arrValues.length == 0){
														arrValues = new Array();
													}
													arrValues.push(row);
													EasyUiCommon._mapNewDataSubGrid2.put(Number($('#indexDialog').val()),arrValues);
												}else{
													var arrValues = EasyUiCommon._mapNewDataSubGrid1.get(Number($('#indexDialog').val()));
													if(arrValues == undefined || arrValues == null || arrValues.length == 0){
														arrValues = new Array();
													}
													arrValues.push(row);
													EasyUiCommon._mapNewDataSubGrid1.put(Number($('#indexDialog').val()),arrValues);
												}
											}
										}
									}
								}
							}
	    				}else{
							if(arrVal!= null && arrVal.length  > 0){
								for(var i=0;i<arrVal.length;i++){
									if(arrVal[i] != undefined){
										if(arrVal[i].trim().indexOf("(") > -1 && arrVal[i].trim().indexOf(")") > -1){
											fVal += arrVal[i].trim() + ', ';
										}else{
											if(fVal.indexOf(data.productCode) == -1){
												arrVal[i] = '';
												arrVal[i] += data.productCode;
												arrVal[i] += "("+$('#'+EasyUiCommon.field+'_'+data.id).val()+")";
												fVal += arrVal[i].trim() + ', ';
												var row = {};
												if(EasyUiCommon.field == 'saleQty'){
													row = {productCode:data.productCode,
															productName:data.productName,
															quantity:$('#'+EasyUiCommon.field+'_'+data.id).val()
													}; 
												}else{
													row = {productCode:data.productCode,
															productName:data.productName,
															amount:$('#'+EasyUiCommon.field+'_'+data.id).val()
													};
												}
												EasyUiCommon._lstProductSelected.push(data.productCode);
												if(EasyUiCommon.isMulti){
													var arrValues = EasyUiCommon._mapNewDataSubGrid2.get(Number($('#indexDialog').val()));
													if(arrValues == undefined || arrValues == null || arrValues.length == 0){
														arrValues = new Array();
													}
													arrValues.push(row);
													EasyUiCommon._mapNewDataSubGrid2.put(Nmuber($('#indexDialog').val()),arrValues);
												}else{
													var arrValues = EasyUiCommon._mapNewDataSubGrid1.get(Nmuber($('#indexDialog').val()));
													if(arrValues == undefined || arrValues == null || arrValues.length == 0){
														arrValues = new Array();
													}
													arrValues.push(row);
													EasyUiCommon._mapNewDataSubGrid1.put(Number($('#indexDialog').val()),arrValues);
												}
											}
										}
									}
								}
							}
	    				}
	    				$(EasyUiCommon.inputId).val(fVal);
	    				$(EasyUiCommon.inputId).focusToEnd();
	    				$('#divDialogSearch').hide();
	    				return false;
	    			}else if(event.keyCode == keyCodes.ESCAPE){
	    				$(EasyUiCommon.inputId).focusToEnd();
	    				$('#divDialogSearch').hide();
	    				return false;
	    			}
	    		});
		    }
		});  
		return false;
	},
	showGridDialog:function(gridIndex,_comboGridField3,_comboGridTitle3,type,isTwoDetail,isPromotionProduct){
		EasyUiCommon.isExceptZ = !isPromotionProduct;
		$('#indexDialog').val(gridIndex);
		$('#errMsgUIDialogUpdate').html('').hide();
		EasyUiCommon.isMulti = isTwoDetail;
		var title = '';
		if(_comboGridField3 == 'saleQty'){
			EasyUiCommon.typeChange = EasyUiCommon.QUANTITY_PRODUCT;
		}else if(_comboGridField3 == 'amount'){
			EasyUiCommon.typeChange = EasyUiCommon.AMOUNT_PRODUCT;
		}else if(_comboGridField3 == 'required'){
			EasyUiCommon.typeChange = EasyUiCommon.REQUIRE_PRODUCT;
		}
		if($('#isAllowEditProPgram').val() == 'true'){
			if($('#promotionStatus').val() != '' && $('#promotionStatus').val().trim() == 2){
				title = '<a href="javascript:void(0);" onclick="EasyUiCommon.showTreeGridDialog('+isPromotionProduct+');"><img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-add.png"></a>';
			}else{
				$('#btnChange').hide();
			}
		}else{
			$('#btnChange').hide();
		}
		$('#productDialogUpdate').dialog({  
	        title: msgThongTinSPKM,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        onOpen: function(){
	        	EasyUiCommon._lstProductOnChange = [];
	        	EasyUiCommon.hasChange = false;
	        	$('.k-list-container').each(function(){
            	    $(this).removeAttr('id');
            	});
	        	$('.easyui-dialog #searchGridUpdate').datagrid({
					url : WEB_CONTEXT_PATH +'/catalog/product/search-product?status=1&isExceptZCat=true&isPriceValid=true&productCode=ksjjslfkjadskfj',
					autoRowHeight : false,
					pageSize:10,  
					rownumbers : true, 
					height: 160,
					fitColumns:true,
					queryParams:{
				 	},
					width : ($('.easyui-dialog #gridDialogUpdate').width()),
				    columns:[[  
				        {field:'productCode',title:msgMaSanPham,align:'left', width:100, sortable : false,resizable : false,fixed:true,
				        	editor:{
				        		type:'text'
				        	},
				        	formatter:function(value,row,index){
				        		if(value != null && value != undefined && value.length > 0){
				        			return '<input id="productCode_'+index+'" value="'+Utils.XSSEncode(value)+'" disabled="disabled" style="width:75px"/>';
				        		}else{
				        			return '<input id="productCode_'+index+'" style="width:75px" />';
				        		}
				        	}
				        },  
				        {field:'productName',title:msgTenSanPham,align:'left', width:230, sortable : false,resizable : false,fixed:true, formatter: function(value, rowData, rowIndex){
							return Utils.XSSEncode(value);
						}
				        },
				        {field: _comboGridField3,title: _comboGridTitle3, width:80,align:'left',sortable : false,resizable : false,fixed:true,
				        	editor:{
				        		type:type
				        	},
			            	formatter:function(value,row,index){
			            		if(type == 'checkbox'){
			            			if(row.required == 1){
			            				return '<input class="checkDialog" type="checkbox" checked="checked"/>';
			            			}else{			            				
								return '<input class="checkDialog" type="checkbox" />';	
							}
			            		}else{
			            			if(_comboGridField3 == 'amount'){
			            				return '<input id="numberItem_'+index+'" maxlength="22" value="'+row.amount+'" style="width:70px;" class="numberDialog" onkeypress="NextAndPrevTextField(event,this,\'numberDialog\')" onfocus="return Utils.bindFormatOnTextfield(\'numberItem_'+index+'\','+Utils._TF_NUMBER+');"/>';
			            			}else{
			            				return '<input id="numberItem_'+index+'" maxlength="22" value="'+row.quantity+'" style="width:70px;" class="numberDialog" onkeypress="NextAndPrevTextField(event,this,\'numberDialog\')" onfocus="return Utils.bindFormatOnTextfield(\'numberItem_'+index+'\','+Utils._TF_NUMBER+');"/>';
			            			}
			            		}
			            	}
				        },
				        {field: 'remove',title:title, width:50,align:'center',sortable : false,resizable : false,
							formatter: function(value,row,index){
								if($('#isAllowEditProPgram').val() == 'true'){
									if($('#promotionStatus').val() != '' && $('#promotionStatus').val().trim() == 2){
										return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnDialog('.easyui-dialog #searchGridUpdate','" + index + "','"+isTwoDetail+"')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></a>";
									}
								}
							}
						},
				    ]],
				    onLoadSuccess :function(dataGrid){
				    	var newData = {};
				    	if(isTwoDetail){
				    		newData = EasyUiCommon._mapNewDataSubGrid2.get(gridIndex);
				    	}else{
				    		newData = EasyUiCommon._mapNewDataSubGrid1.get(gridIndex);
				    	}
			    		if(newData!= undefined && newData!= null && newData.length > 0){
			    			for(var i=0;i<newData.length;i++){
			    				$('.easyui-dialog #searchGridUpdate').datagrid('insertRow',{index: i, row:newData[i]});
			    			}
			    		}
				    	$('.datagrid-pager').html('').hide();
				    	$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
				    	var originalSize = $('.easyui-dialog .datagrid-header-row td[field=productCode] div').width();
				    	if(originalSize != null && originalSize != undefined){
				    		EasyUiCommon._lstSize.push(originalSize);
				    	}
				    	if(newData!= undefined && newData!= null && newData.length > 0){
				    		EasyUiCommon.insertRowOnDialog(newData.length);
				    	}else{
				    		EasyUiCommon.insertRowOnDialog(0);
				    	}
				    	if(_comboGridField3 == 'required'){
				    		$('.checkDialog').each(function(){
				    			$(this).focus();
				    			return false;
				    		});
				    	}else{
				    		$('.numberDialog').each(function(){
				    			$(this).focusToEnd();
				    			return false;
				    		});
				    	}
				    	if(EasyUiCommon._mapInfomationPromotion==undefined || EasyUiCommon._mapInfomationPromotion==null){
				    		EasyUiCommon._mapInfomationPromotion = new Map();
				    	}
				    	if(dataGrid.rows!=undefined && dataGrid.rows!=null && dataGrid.rows.length>0){
				    		for(var i=0; i<dataGrid.rows.length; i++){
				    			EasyUiCommon._mapInfomationPromotion.put(dataGrid.rows[i].productCode.trim(), dataGrid.rows[i]);
				    		}
				    	}
				    	
				    	EasyUiCommon.updateRownumWidthForJqGridEX1('.easyui-dialog #gridDialog','productCode');
				    }
				});  
	        },
	        onBeforeClose: function() {
	        },
	        onClose : function(){
	        	if(!EasyUiCommon.hasChange){
	        		for(var i = 0; i < EasyUiCommon._lstProductOnChange.length ; i++){
	        			if(EasyUiCommon.isMulti){
	        				for(var j = 0;j < EasyUiCommon._mapNewDataSubGrid2.get(gridIndex).length ; j++){
	        					if(EasyUiCommon._lstProductOnChange[i] == EasyUiCommon._mapNewDataSubGrid2.get(gridIndex)[j].productCode){
	        						EasyUiCommon._mapNewDataSubGrid2.get(gridIndex).splice(j);
	        					}
	        				}
	        			}else{
	        				for(var j = 0;j < EasyUiCommon._mapNewDataSubGrid1.get(gridIndex).length ; j++){
	        					if(EasyUiCommon._lstProductOnChange[i] == EasyUiCommon._mapNewDataSubGrid1.get(gridIndex)[j].productCode){
	        						EasyUiCommon._mapNewDataSubGrid1.get(gridIndex).splice(j);
	        					}
	        				}
	        			}
	        		}
	        	}
	        	EasyUiCommon._mapCheckProduct = new Map();
	        	$('#gridDialogUpdate').html('<table id="searchGridUpdate" class="easyui-datagrid"></table><div class="Clear"></div>');
	        }
	    });
		return false;
	},
	autocompleteOnDialog:function(inputId,index){
		var gridIndex = $('#indexDialog').val();
		var template = '<h3 style="float:left">${productCode}</h3></br><p>${productName}</p>';
		inputId.kendoAutoComplete({	 
			highlightFirst: true,
            filter: "startswith",
            placeholder: msgNhapSP,
            dataSource: {
                type: "json",
                serverFiltering: true,
                serverPaging: true,
                pageSize: 20,
                transport: {
                    read: WEB_CONTEXT_PATH+"/catalog/product/autocomplete?isExceptZCat="+EasyUiCommon.isExceptZ
                }
            },
            dataTextField: "productCode",
            template: template,
            change: function(e){
            	if (pCode == undefined || pCode == null) {
            		pCode = "";pName="";
            	}
        		this.element.val(pCode);
        		this.element.parent().parent().parent().parent().children().first().next().children().html(pName);
        		var row = {};
        		if(EasyUiCommon.typeChange == EasyUiCommon.QUANTITY_PRODUCT){
        			row = {
        					productCode : pCode,
        					productName : pName,
        					quantity : 0
        			};
        		}else if(EasyUiCommon.typeChange == EasyUiCommon.AMOUNT_PRODUCT){
        			row = {
        					productCode : pCode,
        					productName : pName,
        					amount : 0
        			};
        		}else{
        			row = {
        					productCode : pCode,
        					productName : pName,
        					required : 0
        			};
        		}
        		if(EasyUiCommon.isMulti){
        			var isExist = false;
        			if(EasyUiCommon._mapNewDataSubGrid2.get(gridIndex) != null){
        				for(var i = 0;i < EasyUiCommon._mapNewDataSubGrid2.get(gridIndex).length ; i++){
        					if(pCode == EasyUiCommon._mapNewDataSubGrid2.get(gridIndex)[i].productCode){
        						isExist = true;
        						break;
        					}
        				}
        			}
        			if(!isExist){
        				if(EasyUiCommon._mapNewDataSubGrid2.get(gridIndex) != null){
        					//EasyUiCommon._mapNewDataSubGrid2.get(gridIndex).push(row);
        					
          					//haupv: chi cho phep insert lan dau, cac lan sau update lai mang
        					var arr = EasyUiCommon._mapNewDataSubGrid2.valArray[gridIndex];
        					if(!Utils.isEmpty(arr[index])){
        						
        						EasyUiCommon._mapNewDataSubGrid2.get(gridIndex)[index] = row;
    
        					}else{
        						EasyUiCommon._mapNewDataSubGrid2.get(gridIndex).push(row);
        					}
        					
        				}else{
        					var arrValue = new Array();
        					arrValue.push(row);
        					EasyUiCommon._mapNewDataSubGrid2.put(gridIndex,arrValue);
        				}				
        			}
        		}else{
        			var isExist = false;
        			if(EasyUiCommon._mapNewDataSubGrid1.get(gridIndex) != null){
        				for(var i = 0;i < EasyUiCommon._mapNewDataSubGrid1.get(gridIndex).length ; i++){
        					if(pCode == EasyUiCommon._mapNewDataSubGrid1.get(gridIndex)[i].productCode){
        						isExist = true;
        						break;
        					}
        				}
        			}
        			if(!isExist){
        				if(EasyUiCommon._mapNewDataSubGrid1.get(gridIndex) != null){
        					
          					//haupv: chi cho phep insert lan dau, cac lan sau update lai mang
        					var arr = EasyUiCommon._mapNewDataSubGrid1.valArray[gridIndex];
        					if(!Utils.isEmpty(arr[index])){
        						
        						EasyUiCommon._mapNewDataSubGrid1.get(gridIndex)[index] = row;
    
        					}else{
        						EasyUiCommon._mapNewDataSubGrid1.get(gridIndex).push(row);
        					}
        					
        				}else{
        					var arrValue = new Array();
        					arrValue.push(row);
        					EasyUiCommon._mapNewDataSubGrid1.put(Number(gridIndex),arrValue);
        				}
        			}
        		}
        		if (pCode.length > 0 && EasyUiCommon._lstProductOnChange.indexOf(pCode) < 0) {
        			EasyUiCommon._lstProductOnChange.push(pCode);
        		}
            },
            dataBound: function(e) {
            	var rs = $('#searchGridUpdate').datagrid('getRows');
            	var lstTmp = [];
            	for (var i = 0, sz = rs.length; i < sz; i++) {
            		if (rs[i].productCode != undefined && rs[i].productCode != null
            				&& rs[i].productCode.length > 0) {
            			lstTmp.push(rs[i].productCode);
            		}
            	}
            	rs = null;
            	for (i = 0, sz = EasyUiCommon._lstProductOnChange.length; i < sz; i++) {
            		lstTmp.push(EasyUiCommon._lstProductOnChange[i]);
            	}
    			var lst1 = e.sender.dataSource._data;
    			for (i = 0, sz = lst1.length; i < sz; i++) {
    				if (lst1[i] != undefined && lst1[i] != null
    						&& lstTmp.indexOf(lst1[i].productCode) > -1) {
    					lst1.splice(i, 1);
    					sz--;
    					i--;
    				}
    			}
            },
            close: function(e){
            	$(window).unbind('keyup');	
            },
            open: function(e) {
    			var text = inputId.attr('id')+'-list';
    			$('#'+text).css('width','350px');
    			
    			inputId.parent().css('padding','0px !important');	
            },
            select: function(e){
            	pCode = e.item.children().first().text();
            	pName = e.item.children().last().text();
            	var lstIndex = [];
        		$('.easyui-dialog .k-autocomplete').each(function(){
        			lstIndex.push($(this).children().first().attr('id').split("_")[1]);
            	});
        		var hasNewRow = true;
        		for(var i = 0 ; i < lstIndex.length ; i++){
        			if(parseInt(lstIndex[i]) == index + 1){
        				hasNewRow = false;
        				break;
        			}
        		}
        		if(hasNewRow){
        			EasyUiCommon.insertRowOnDialog(index+1);
        		}
            }                
        });
	},
	changeQuantity:function(){
		EasyUiCommon.hasChange = true;
		$('#errMsgUIDialogUpdate').html('').hide();
		var gridIndex = Number($('#indexDialog').val());
		var ed = null;
		var type = $('#apParamCode').val().trim();
		if(type == 'ZV03' || type == 'ZV06'){
			ed = $('#grid').datagrid('getEditor', {index:gridIndex,field: 'productCode'});
		}else if(type == 'ZV07' || type == 'ZV08'){
			ed = $('#grid').datagrid('getEditor', {index:gridIndex,field: 'quantity'});
		}else if(type == 'ZV10' || type == 'ZV11'){
			ed = $('#grid').datagrid('getEditor', {index:gridIndex,field: 'amount'});
		}else if(type == 'ZV09'|| type == 'ZV22'){
			ed = $('#grid').datagrid('getEditor', {index:gridIndex,field: 'quantity'});
		}else if(type == 'ZV12'){
			ed = $('#grid').datagrid('getEditor', {index:gridIndex,field: 'amount'});
		}else if(type == 'ZV15' || type == 'ZV18'){
			ed = $('#grid').datagrid('getEditor', {index:gridIndex,field: 'hiddenField'});
		}else if(type == 'ZV13' || type == 'ZV16'){
			ed = $('#grid').datagrid('getEditor', {index:gridIndex,field: 'discountPercent'});
		}else if(type == 'ZV14' || type == 'ZV17'){
			ed = $('#grid').datagrid('getEditor', {index:gridIndex,field: 'discountAmount'});
		}else if(type == 'ZV21'){
			ed = $('#grid').datagrid('getEditor', {index:gridIndex,field: 'amount'});
		}
		if(ed != null && ed != undefined){
			EasyUiCommon.inputId = ed.target;
			var lstProductCode = '';
			var first = true;
			var isErr = false;
			var num = 0;
			var lstStrExist = [];
			if(EasyUiCommon.typeChange == EasyUiCommon.REQUIRE_PRODUCT){
				$('.checkDialog').each(function(){
					if($('#productCode_'+num).val() != ''&& $('#productCode_'+num).val().length > 0 && $(this).parent().parent().parent().children().first().next().children().text() != ''){
						if(lstStrExist.indexOf($('#productCode_'+num).val().trim()) > -1){
							isErr = true;
							$('#errMsgUIDialogUpdate').html(msgLoi22).show();
							return false;
						}
						lstStrExist.push($('#productCode_'+num).val().trim());
					}
					num++;
				});
			}else{
				$('.numberDialog').each(function(){
					if($('#productCode_'+num).val() != ''&& $('#productCode_'+num).val().length > 0 && $(this).parent().parent().parent().children().first().next().children().text() != ''){
						if(lstStrExist.indexOf($('#productCode_'+num).val().trim()) > -1){
							isErr = true;
							$('#errMsgUIDialogUpdate').html(msgLoi22).show();
							return false;
						}
						lstStrExist.push($('#productCode_'+num).val().trim());
					}
					num++;
				});
			}
			num = 0;
			if(EasyUiCommon.typeChange == EasyUiCommon.REQUIRE_PRODUCT){
				$('.checkDialog').each(function(){
					if($('#productCode_'+num).val() != ''&& $('#productCode_'+num).val().length > 0 /*&& $(this).parent().parent().parent().children().first().next().children().text() != ''*/){
						var required = 0;
						if(!first){
							lstProductCode += ','; 
						}
						lstProductCode += $('#productCode_'+num).val();
						if($(this).is(":checked")){
							lstProductCode += "*";
							required = 1;
						}else{
							required = 0;
						}
						var row = {};
						row = {
								productCode:$('#productCode_'+num).val(),
								productName:$(this).parent().parent().parent().children().first().next().children().text(),
								required:required
						};
						var arrValues = null;
						if(!first){
							if(EasyUiCommon.isMulti){
								arrValues = EasyUiCommon._mapNewDataSubGrid2.get(gridIndex);
							}else{
								arrValues = EasyUiCommon._mapNewDataSubGrid1.get(gridIndex);
							}
						}else{
							arrValues = new Array();
						}
						arrValues.push(row);
						if(EasyUiCommon.isMulti){
							EasyUiCommon._mapNewDataSubGrid2.put(gridIndex,arrValues);					
						}else{
							for(var i = 0;i < EasyUiCommon._mapNewDataSubGrid1.keyArray.length;i++){
								if(EasyUiCommon._mapNewDataSubGrid1.get(i).length > 0){
									EasyUiCommon._mapNewDataSubGrid1.put(Number(i),arrValues);
								}
							}
						}
						first = false;
					}
					num++;
				});
			}else{
				$('.numberDialog').each(function(){
					if($('#productCode_'+num).val() != ''&& $('#productCode_'+num).val().length > 0 && $(this).parent().parent().parent().children().first().next().children().text() != ''){
						if(this.value != '' && this.value > 0){
							if(!first){
								lstProductCode += ','; 
							}
							lstProductCode += $('#productCode_'+num).val();
							lstProductCode += "(" +this.value+ ")";
							var row = {};
							if(EasyUiCommon.typeChange == EasyUiCommon.QUANTITY_PRODUCT){
								row = {
										productCode:$('#productCode_'+num).val(),
										productName:$(this).parent().parent().parent().children().first().next().children().text(),
										quantity:this.value
								}; 
							}else if(EasyUiCommon.typeChange == EasyUiCommon.AMOUNT_PRODUCT){
								row = {
										productCode:$('#productCode_'+num).val(),
										productName:$(this).parent().parent().parent().children().first().next().children().text(),
										amount:this.value
								}; 
							}
							var arrValues = null;
							if(!first){
								if(EasyUiCommon.isMulti){
									arrValues = EasyUiCommon._mapNewDataSubGrid2.get(gridIndex);
								}else{
									arrValues = EasyUiCommon._mapNewDataSubGrid1.get(gridIndex);
								}
							}else{
								arrValues = new Array();
							}
							arrValues.push(row);
							if(EasyUiCommon.isMulti){
								EasyUiCommon._mapNewDataSubGrid2.put(gridIndex,arrValues);					
							}else{
								EasyUiCommon._mapNewDataSubGrid1.put(Number(gridIndex),arrValues);
							}
							first = false;
						}else{
							isErr = true;
							$('#errMsgUIDialogUpdate').html(msgLoi28).show();
							return false;
						}
					}
					num++;
				});
				if(EasyUiCommon.isMulti){
					if(EasyUiCommon._mapNewDataSubGrid2.get(gridIndex) == null || EasyUiCommon._mapNewDataSubGrid2.get(gridIndex).length == 0){
						isErr = true;
						$('#errMsgUIDialogUpdate').html(msgLoi19).show();
						return false;
					}
				}else{
					if(EasyUiCommon._mapNewDataSubGrid1.get(gridIndex) == null || EasyUiCommon._mapNewDataSubGrid1.get(gridIndex).length == 0){
						isErr = true;
						$('#errMsgUIDialogUpdate').html(msgLoi19).show();
						return false;
					}
				}
			}
			if(!isErr){
				if(EasyUiCommon.isMulti){
					lstProductCode = EasyUiCommon.stylerOnRow(gridIndex,lstProductCode,type,true);
					EasyUiCommon._mapProductCodeStr2.put(gridIndex,lstProductCode);
					if(type == 'ZV09' || type == 'ZV12'){
						$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().last().prev().children().html(lstProductCode);
					}else{
						$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().last().prev().prev().children().html(lstProductCode);
					}
				}else{
					lstProductCode = EasyUiCommon.stylerOnRow(gridIndex,lstProductCode,type);
					EasyUiCommon._mapProductCodeStr1.put(gridIndex,lstProductCode);
					if(type == 'ZV03' || type == 'ZV06'){
						$(ed.target).parent().parent().parent().parent().parent().parent().parent().parent().children().last().prev().children().html(lstProductCode);
					}else if(type == 'ZV07' || type == 'ZV08' || type == 'ZV09' || type == 'ZV10' || type == 'ZV11' || type == 'ZV12' || type == 'ZV22'){
						for(var i = 0;i < EasyUiCommon._mapNewDataSubGrid1.keyArray.length;i++){
							if(EasyUiCommon._mapNewDataSubGrid1.get(i).length > 0){
								$('#grid').datagrid('beginEdit',i);
								if(type == 'ZV07' || type == 'ZV08'){
									ed = $('#grid').datagrid('getEditor', {index:i,field: 'quantity'});
								}else if(type == 'ZV10' || type == 'ZV11'){
									ed = $('#grid').datagrid('getEditor', {index:i,field: 'amount'});
								}else if(type == 'ZV09' || type == 'ZV22'){
									ed = $('#grid').datagrid('getEditor', {index:i,field: 'quantity'});
								}else if(type == 'ZV12'){
									ed = $('#grid').datagrid('getEditor', {index:i,field: 'amount'});
								}
								
								$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().first().children().html(lstProductCode);
							}
						}
						for(var i = 0; i < EasyUiCommon._mapProductCodeStr1.keyArray.length ; i++){
							EasyUiCommon._mapProductCodeStr1.put(parseInt(EasyUiCommon._mapProductCodeStr1.keyArray[i]),lstProductCode);
						}
						//haupv3:test
						
						if(type != 'ZV09'){
							EasyUiCommon._mapProductCodeStr1.put(Number(gridIndex),lstProductCode);
						}
						if(type == 'ZV09'){
							
						
							var isNullProductBuy= true; 
							
							var rows = $("#searchGridUpdate").datagrid('getRows');			
							for(var i = 0 ; i < rows.length && isNullProductBuy ; i++){
								var producCode = $('#productCode_'+i).val();
								if(!isNullOrEmpty(producCode)){
									isNullProductBuy = false;
								}
							}
						
							
							if(isNullProductBuy){ // neu danh sach san pham mua khong co sp
								EasyUiCommon._mapProductCodeStr1.clear();
								EasyUiCommon._mapNewDataSubGrid1.clear();
								EasyUiCommon._mapProductCodeStr2.clear();
								EasyUiCommon._mapNewDataSubGrid2.clear();
								EasyUiCommon.codeByGroup ='';
								$('#errMsgUIDialogUpdate').html(msgLoi19).show();
								return false;
								//$('#grid').datagrid('loadData',new Array());
							}else{ // neu co chon san pham mua tu dialog
								EasyUiCommon._mapNewDataSubGrid1 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid1);
								EasyUiCommon._mapProductCodeStr1 = EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr1);
								EasyUiCommon._mapNewDataSubGrid2 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid2);
								EasyUiCommon._mapProductCodeStr2 = EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr2);
								
								var data = new Array();
				        		var rows = $('#grid').datagrid('getRows');
				        		for(var i = 0 ; i < rows.length ; i++){
				        			var row = rows[i];
				        			if(/*!isNullOrEmpty(row.amount) || */
				        			   !isNullOrEmpty(EasyUiCommon._mapProductCodeStr2.get(i))||
				        			   !isNullOrEmpty(EasyUiCommon._mapProductCodeStr1.get(i))){
				        				
				        				if(!isNullOrEmpty(EasyUiCommon._mapProductCodeStr2.get(i))){
				        					row.freeProductCodeStr = EasyUiCommon._mapProductCodeStr2.get(i);
				        					
				        				}
				        				
				        				if(!isNullOrEmpty(EasyUiCommon._mapProductCodeStr1.get(i))){
				        					row.productCodeStr = EasyUiCommon._mapProductCodeStr1.get(i);
				        				}
				        				data.push(row);
				        			}	       			
				        		}
				        		$('#grid').datagrid('loadData',data); // update lai data grid
						
							}
						}
					}else if(type == 'ZV15' || type == 'ZV18'){
						$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().first().children().html(lstProductCode);
					}else if(type == 'ZV13' || type == 'ZV16'){
						$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().first().children().html(lstProductCode);
					}else if(type == 'ZV14' || type == 'ZV17'){
						$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().first().children().html(lstProductCode);
					}else if(type == 'ZV21'){
						$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().first().next().children().html(lstProductCode);
					}
				}
				$('#productDialogUpdate').dialog('close');
			}
		}else{
			$('#productDialogUpdate').dialog('close');
		}
	},
	autocompleteOnTextbox:function(event,value,gridId,index,inputId,type,typeAutocomplete,isTwoDetail){
		if(isTwoDetail == null || isTwoDetail == undefined){
			isTwoDetail = false;
		}
		var keyChar = String.fromCharCode(event.which);
		var namePattern = /^[A-Za-z0-9]*$/ ;
		if(namePattern.test(keyChar)){
			  $('#divDialogSearch').show();
			  var left = inputId.position().left;
			  var top = inputId.position().top;
			  var height_box = inputId.height();
			  left = left+$('.GridSection').position().left;
			  top = top+ height_box + $('.GridSection').position().top;
			  $('#productEasyUIDialog').css({'left':left,'top':top});
			  $('#typeProductValue').val(0);
			  var inputValue = '';
			  if(value == null || value == undefined){
				  value = '';
			  }
			  inputValue =  value + keyChar;
			  var size = inputValue.split(",").length;
			  if(size > 0){
				  inputValue = inputValue.split(",")[size-1];
			  }
			  if(typeAutocomplete == EasyUiCommon.QUANTITY_PRODUCT){
				  EasyUiCommon.showGridAutocomplete(gridId,index,inputId,'saleQty',msgSoLuongMua,'numberbox',type,inputValue.trim(),isTwoDetail);
			  }else if(typeAutocomplete == EasyUiCommon.AMOUNT_PRODUCT){
				  EasyUiCommon.showGridAutocomplete(gridId,index,inputId,'amount',msgTongTienMua,'numberbox',type,inputValue.trim(),isTwoDetail);
			  }else if(typeAutocomplete == EasyUiCommon.REQUIRE_PRODUCT){
				  EasyUiCommon.showGridAutocomplete(gridId,index,inputId,'required',msgBatBuocMua,'checkbox',type,inputValue.trim(),isTwoDetail);
			  }
		}
	},
	loadDataOnGridSuccess:function(gridId,apParamCode){
		$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
		var size = $('#'+gridId).datagrid('getRows').length; 
    	if(size == 0){
    		if($('#isAllowEditProPgram').val() == 'true'){
    			$('#'+gridId).datagrid('appendRow',{});
    		}
    	}else{
    		if($('#isAllowEditProPgram').val() == 'true'){
    			$('#'+gridId).datagrid('appendRow',{});
    		}
    		if(apParamCode ==  'ZV07' || apParamCode ==  'ZV08' || apParamCode ==  'ZV10' || apParamCode ==  'ZV11' || apParamCode ==  'ZV09' || apParamCode ==  'ZV12' || apParamCode ==  'ZV22'){
    			size = $('#'+gridId).datagrid('getRows').length;
    		}
    		for(var i = 0;i<size;i++){
    			var codeStr = '';
    			var nameStr = '';
    			var freeCodeStr = '';
    			var freeNameStr = '';
    			if(apParamCode ==  'ZV03' || apParamCode ==  'ZV06'){
    				codeStr = $('#'+gridId).datagrid('getRows')[i].freeProductCodeStr;
    				nameStr = $('#'+gridId).datagrid('getRows')[i].freeProductNameStr;
    				EasyUiCommon.putDataForMap(codeStr, nameStr, EasyUiCommon.QUANTITY_PRODUCT, EasyUiCommon._mapNewDataSubGrid1, i);
    			}else if(apParamCode ==  'ZV07' || apParamCode ==  'ZV08' || apParamCode ==  'ZV10' || apParamCode ==  'ZV11'){
    				codeStr = $('#'+gridId).datagrid('getRows')[i].productCodeStr;
    				nameStr = $('#'+gridId).datagrid('getRows')[i].productNameStr;
    				EasyUiCommon.putDataForMap(codeStr, nameStr, EasyUiCommon.REQUIRE_PRODUCT, EasyUiCommon._mapNewDataSubGrid1, i);
    			}else if(apParamCode ==  'ZV09' || apParamCode ==  'ZV12' || apParamCode ==  'ZV22'){
    				codeStr = $('#'+gridId).datagrid('getRows')[i].productCodeStr;
    				nameStr = $('#'+gridId).datagrid('getRows')[i].productNameStr;
    				freeCodeStr = $('#'+gridId).datagrid('getRows')[i].freeProductCodeStr;
    				freeNameStr = $('#'+gridId).datagrid('getRows')[i].freeProductNameStr;
    				EasyUiCommon.putDataForMap(codeStr, nameStr, EasyUiCommon.REQUIRE_PRODUCT, EasyUiCommon._mapNewDataSubGrid1, i);
    				EasyUiCommon.putDataForMap(freeCodeStr, freeNameStr, EasyUiCommon.QUANTITY_PRODUCT, EasyUiCommon._mapNewDataSubGrid2, i,true);
    			}else if(apParamCode ==  'ZV15' || apParamCode ==  'ZV18'){
    				codeStr = $('#'+gridId).datagrid('getRows')[i].productCodeStr;
    				nameStr = $('#'+gridId).datagrid('getRows')[i].productNameStr;
    				freeCodeStr = $('#'+gridId).datagrid('getRows')[i].freeProductCodeStr;
    				freeNameStr = $('#'+gridId).datagrid('getRows')[i].freeProductNameStr;
    				if(apParamCode ==  'ZV15'){
    					EasyUiCommon.putDataForMap(codeStr, nameStr, EasyUiCommon.QUANTITY_PRODUCT, EasyUiCommon._mapNewDataSubGrid1, i);
    				}else{
    					EasyUiCommon.putDataForMap(codeStr, nameStr, EasyUiCommon.AMOUNT_PRODUCT, EasyUiCommon._mapNewDataSubGrid1, i);
    				}
    				EasyUiCommon.putDataForMap(freeCodeStr, freeNameStr, EasyUiCommon.QUANTITY_PRODUCT, EasyUiCommon._mapNewDataSubGrid2, i,true);
    			}else if(apParamCode ==  'ZV13' || apParamCode ==  'ZV14' || apParamCode ==  'ZV16' || apParamCode ==  'ZV17'){
    				codeStr = $('#'+gridId).datagrid('getRows')[i].productCodeStr;
    				nameStr = $('#'+gridId).datagrid('getRows')[i].productNameStr;
    				if(apParamCode ==  'ZV13' || apParamCode ==  'ZV14'){
    					EasyUiCommon.putDataForMap(codeStr, nameStr, EasyUiCommon.QUANTITY_PRODUCT, EasyUiCommon._mapNewDataSubGrid1, i);
    				}else{
    					EasyUiCommon.putDataForMap(codeStr, nameStr, EasyUiCommon.AMOUNT_PRODUCT, EasyUiCommon._mapNewDataSubGrid1, i);
    				}
    			}else if(apParamCode ==  'ZV21'){
    				codeStr = $('#'+gridId).datagrid('getRows')[i].freeProductCodeStr;
    				nameStr = $('#'+gridId).datagrid('getRows')[i].freeProductNameStr;
    				EasyUiCommon.putDataForMap(codeStr, nameStr, EasyUiCommon.QUANTITY_PRODUCT, EasyUiCommon._mapNewDataSubGrid1, i);
    			} 
    		}
    	}
    	if($('#activePermission').val() == 'false'){//trungtm6
    		$("#divDetailCommon td[field='remove'] a").hide();
    		$("#divDetailCommon td[field='productCodeStr'] a").hide();
    		$("#divDetailCommon td[field='freeProductCodeStr'] a").hide();
    	}
	},
	insertRowOnDialog:function(index){
		var row = {};
		if(EasyUiCommon.typeChange == EasyUiCommon.QUANTITY_PRODUCT){
			row = {
					productCode : '',
					productName : '',
					quantity : '',
			};
		}else if(EasyUiCommon.typeChange == EasyUiCommon.AMOUNT_PRODUCT){
			row = {
					productCode : '',
					productName : '',
					amount : '',
			};
		}else {
			row = {
					productCode : '',
					productName : '',
					required : 0,
			};
		}
		$('.easyui-dialog #searchGridUpdate').datagrid('insertRow',{index: index, row:row});
		EasyUiCommon.autocompleteOnDialog($('#productCode_'+index),index);
	},
	eventOnTextField:function(e,selector,clazz,gridId){	
		var index = $('input.'+clazz).index(selector);	
		if((e.keyCode == keyCodes.ARROW_DOWN) ){	
			++index;
			var nextSelector = $('input.'+clazz).eq(index);
			if($(nextSelector).hasClass(clazz)){				
				setTimeout(function(){
					$('input.'+clazz).eq(index).focus();
				}, 30);
			}
		}else if(e.keyCode == keyCodes.ARROW_UP ){
			--index;
			var nextSelector = $('input.'+clazz).eq(index);
			if($(nextSelector).hasClass(clazz)){	
				setTimeout(function(){
					$('input.'+clazz).eq(index).focus();
				}, 30);
			}			
		}
		if(gridId != null && gridId != undefined){
			$('#'+gridId).datagrid('selectRow',index);
		}
	},
	eventWhenPressTAB:function(clazz){
		$(window).bind('keyup', function(evt){
    		if(evt.keyCode == keyCodes.TAB){
    			$('.'+clazz).each(function(){
    				$(this).focus();
    				return false;
    			});
    		}
	  });
	},
	putDataForMap:function(codeStr,nameStr,typeAutocomplete,_lstProductData,index,isTwoDetail){
		var type = $('#apParamCode').val().trim();
		var lstProductCode = '';
		if(codeStr != undefined && codeStr != ''){
			if(isTwoDetail != undefined && isTwoDetail){
				lstProductCode = EasyUiCommon.stylerOnRow(index,codeStr,type,true);
				EasyUiCommon._mapProductCodeStr2.put(index,lstProductCode);
			}else{
				lstProductCode = EasyUiCommon.stylerOnRow(index,codeStr,type);
				EasyUiCommon._mapProductCodeStr1.put(index,lstProductCode);
				EasyUiCommon.productCode = lstProductCode;
			}
			var arrLst = codeStr.split(",");
			var arrLstName = nameStr.split(",");
			for(var k = 0;k < arrLst.length ;k++){
				var row = {};
				if(typeAutocomplete ==  EasyUiCommon.QUANTITY_PRODUCT){
					var x = arrLst[k].indexOf("(");
					var y = arrLst[k].indexOf(")");
					row = {productCode:arrLst[k].substring(0,x),
							productName:arrLstName[k],
							quantity:arrLst[k].substring(x+1,y)
					};
				}else if(typeAutocomplete ==  EasyUiCommon.AMOUNT_PRODUCT){
					var x = arrLst[k].indexOf("(");
					var y = arrLst[k].indexOf(")");
					row = {productCode:arrLst[k].substring(0,x),
							productName:arrLstName[k],
							amount:arrLst[k].substring(x+1,y)
					};
				}else if(typeAutocomplete ==  EasyUiCommon.REQUIRE_PRODUCT){
					var required = 0;
					var productCode = '';
					if(arrLst[k].indexOf("*") == -1){
						required = 0;
						productCode = arrLst[k]; 
					}else{
						required = 1;
						productCode = arrLst[k].split("*")[0];
					}
					row = {productCode:productCode,
							productName:arrLstName[k],
							required:required
					};
				}
				EasyUiCommon._lstProductSelected.push(row.productCode);
				var arrValues = _lstProductData.get(index);
				if(arrValues == undefined || arrValues == null || arrValues.length == 0){
					arrValues = new Array();
				}
				arrValues.push(row);
				_lstProductData.put(index,arrValues);
			}
		}else{
			if(type == 'ZV07' || type == 'ZV08' || type == 'ZV09' || type == 'ZV10' || type == 'ZV11' || type == 'ZV12' || type == 'ZV22'){
				if(isTwoDetail == undefined || !isTwoDetail){
					if(EasyUiCommon._mapProductCodeStr1.keyArray.length > 0){
						lstProductCode = EasyUiCommon.stylerOnRow(index,EasyUiCommon.codeByGroup,type);
						EasyUiCommon._mapProductCodeStr1.put(index,lstProductCode);
					} 
					if(_lstProductData.keyArray.length > 0){
						_lstProductData.put(index,_lstProductData.get(0));
					}
				}else{
					_lstProductData.put(index,new Array());
				}
			}else{
				var arrValues = new Array();
				_lstProductData.put(index,arrValues);
			}
		}
	},
	removeRowOnDialog:function(gridId,index,isTwoDetail){
		var tmp = new Map();
    	$.messager.confirm(msgXacNhan, msgCommon2, function(r){
			if (r){
				var codeTmp = $("#productCode_"+index).val().trim();
				$('#'+gridId).datagrid('deleteRow', index);
				var size = $('#'+gridId).datagrid('getRows').length; 
            	if(size == 0){
            		$('#'+gridId).datagrid('appendRow',{});
            	} else {
            		if(isTwoDetail == 'true'){
            			tmp = EasyUiCommon._mapNewDataSubGrid2.get(Number($('#indexDialog').val()));
            			if(tmp != null){
            				tmp.splice(index,1);
            			}
            			EasyUiCommon.putValueOnRemove(tmp);
            			EasyUiCommon._mapNewDataSubGrid2.put(Number($('#indexDialog').val()),tmp);
            		}else{
            			tmp = EasyUiCommon._mapNewDataSubGrid1.get(Number($('#indexDialog').val()));
            			if(tmp != null){
            				tmp.splice(index,1);
            			}
            			EasyUiCommon.putValueOnRemove(tmp);
            			EasyUiCommon._mapNewDataSubGrid1.put(Number($('#indexDialog').val()),tmp);
            		}
            		var idx = EasyUiCommon._lstProductOnChange.indexOf(codeTmp);
            		if (idx > -1) {
            			EasyUiCommon._lstProductOnChange.splice(idx, 1);
            		}
            	}
            	$('#'+gridId).datagrid('reload');
            	$('.k-list-container').each(function(){
            	    $(this).removeAttr('id');
            	});
			}
    	});
    },
    putValueOnRemove:function(tmp){
    	var i = 0;
		if(EasyUiCommon.typeChange == EasyUiCommon.QUANTITY_PRODUCT){
			$('.numberDialog').each(function(){
				if(tmp != null && tmp[i] != undefined){
					tmp[i].quantity = this.value;
				}
				i++;
			});
		}else if(EasyUiCommon.typeChange == EasyUiCommon.AMOUNT_PRODUCT){
			$('.numberDialog').each(function(){
				if(tmp != null && tmp[i] != undefined){
					tmp[i].amount = this.value;
				}
				i++;
			});
		}else if(EasyUiCommon.typeChange == EasyUiCommon.REQUIRE_PRODUCT){
			$('.checkDialog').each(function(){
				if(tmp != null && tmp[i] != undefined){
					if($(this).is(":checked")){
						tmp[i].required = 1;
					}else{
						tmp[i].required = 0;
					}
				}
				i++;
			});
		}
    },
    removeRowOnGrid:function(index,isTwoDetail){
    	var type = $('#apParamCode').val().trim();
    	var tmp = new Map();
    	$('#errMsgProduct').html('').hide();
    	if(type == 'ZV01' || type == 'ZV02' ||type == 'ZV04' ||type == 'ZV05' ||type == 'ZV03' ||type == 'ZV06'){
			rows = $('#grid').datagrid('getRows');
			if(rows.length > 0){
				if(rows.length == 1){
					return;
				}
				if(rows[index].productCode == undefined || rows[index].productCode == null || rows[index].productCode == ''){
					return;
				}
			}
		}
    	$.messager.confirm(msgXacNhan, msgCommon2, function(r){
			if (r){
				$('#grid').datagrid('acceptChanges'); //anhhpt:them vo
				
				$('#grid').datagrid('deleteRow', index);
/*				var obj = new Object();
				obj.amount = '';
				obj.discountAmount = '';
				obj.discountPercent = '';
				obj.freeProductCodeStr = '';
				obj.freeProductId = '';
				obj.freeProductNameStr = '';
				obj.pgDetailId = '';
				obj.pgDetailIdStr = '';
				obj.productCode = '';
				obj.productCodeStr = '';
				obj.productId = '';
				obj.productName = '';
				obj.productNameStr = '';
				obj.quantity = '';
				obj.required = '';
				$('#grid').datagrid('getRows').splice(index, 0, obj);*/
				EasyUiCommon.indexDeleted.push(index);
				var size = $('#grid').datagrid('getRows').length; 
            	if(size == 0){
            		if(type != 'ZV09'){
            			EasyUiCommon.appendRowOnGrid('grid');
            		}else{
            			//$('#grid').datagrid('appendRow',{});
            		}
            	} else {
            		if(!(type == 'ZV01' || type == 'ZV02' ||type == 'ZV04' ||type == 'ZV05' ||type == 'ZV19' ||type == 'ZV20')){
            			
            			if(type != 'ZV10'){
            				
            				
            					
	    	            			if(isTwoDetail){
	    	            				tmp = EasyUiCommon._mapNewDataSubGrid2.get(index);
	    	            				if(tmp != null){
	    	//            					tmp.splice(0);
	    	            					EasyUiCommon._mapNewDataSubGrid2.put(Number(index),new Array());
	    	            				}
	    	            				EasyUiCommon._mapProductCodeStr2.put(Number(index),"");
	    	            			}
	    	            			tmp = EasyUiCommon._mapNewDataSubGrid1.get(index);
	    	            			if(tmp != null){
	    	//            				tmp.splice(0);
	    	            				EasyUiCommon._mapNewDataSubGrid1.put(Number(index),new Array());
	    	            			}
	    	            			EasyUiCommon._mapProductCodeStr1.put(Number(index),"");
            				
            				

	            			
            			}else{
                			/*
            				 * @author:anhhpt
            				 * @function : EasyUiCommon.ajustIndexCode
            				 * @description : do index trong map EasyUiCommon._mapProductCodeStr1 va _mapProductCodeStr2 [indexRow, data] de load len datagrid khong dung 
            				 *  khi delete 1 dong tren data grid man hinh, nen chinh lai 
            				 *  @params : 
            				 *  	mapData : EasyUiCommon._mapProductCodeStr1 hoac _mapProductCodeStr2
            				 *  	type: ZV01,...,ZV20
            				 * 	 	isTwoDetail: 
            				 *						true --> xu li cho san pham / tien khuyen mai
            				 *						false/ null --> xu li cho san pham mua
            				 * */
                			if(isTwoDetail){ // anhhpt: neu la xoa luon san pham khuyen mai
                				EasyUiCommon._mapProductCodeStr2.remove(index);
                				EasyUiCommon._mapNewDataSubGrid2.remove(index);
                				EasyUiCommon._mapNewDataSubGrid2 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid2);         		
                        		EasyUiCommon._mapProductCodeStr2 = EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr2,type,true);
                			}
                			
                			// anhhpt: neu la xoa san pham
                			EasyUiCommon._mapNewDataSubGrid1.remove(index);
                        	EasyUiCommon._mapProductCodeStr1.remove(index);
                    		EasyUiCommon._mapNewDataSubGrid1 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid1);
                        	EasyUiCommon._mapProductCodeStr1= EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr1,type,false);
            			}
            			
            		}
            	}
            	
            	
				if(type == 'ZV09'){
					
					
					EasyUiCommon.indexDeleted.push(index);
					var size = $('#grid').datagrid('getRows').length; 
					
					if(size==0){
						EasyUiCommon.codeByGroup = '';
					}
					

	            			if(isTwoDetail){ // anhhpt: neu la xoa luon san pham khuyen mai
	            				EasyUiCommon._mapProductCodeStr2.remove(Number(index));
	            				EasyUiCommon._mapNewDataSubGrid2.remove(Number(index));
	            				//if(size >0){
	            					EasyUiCommon._mapNewDataSubGrid2 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid2);         		
	            					EasyUiCommon._mapProductCodeStr2 = EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr2);
	            				//}
	            			}
	            			
	            			// anhhpt: neu la xoa san pham
	            			EasyUiCommon._mapNewDataSubGrid1.remove(Number(index));
	            			EasyUiCommon._mapProductCodeStr1.remove(Number(index));
	            			//if(size >0){
	            				EasyUiCommon._mapNewDataSubGrid1 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid1);
	            				EasyUiCommon._mapProductCodeStr1= EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr1);
	            			//}

	       //     	}
	            	//anhhpt:update lai index -->important
	        		var data = new Array();
	        		var rows = $('#grid').datagrid('getRows');
	        		for(var i = 0 ; i < rows.length ; i++){
	        			var row = rows[i];
	        			if(!isNullOrEmpty(row.quantity)|| !isNullOrEmpty(EasyUiCommon._mapProductCodeStr2.get(i))){
	        				if(!isNullOrEmpty(EasyUiCommon._mapProductCodeStr2.get(i))){
	        					row.freeProductCodeStr = EasyUiCommon._mapProductCodeStr2.get(i);
	        					row.productCodeStr = EasyUiCommon._mapProductCodeStr1.get(i);
	        				}
	        				
	        				data.push(row);
	        			}else{
	        				EasyUiCommon._mapNewDataSubGrid1.remove(i);
	        				EasyUiCommon._mapProductCodeStr1.remove(i);
	        				EasyUiCommon._mapNewDataSubGrid2.remove(i);
	        				EasyUiCommon._mapProductCodeStr2.remove(i);
	        			}
	       			
	        		}
	        		//if(size >0){
	        			EasyUiCommon._mapNewDataSubGrid1 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid1);
	        			EasyUiCommon._mapProductCodeStr1 = EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr1);
	        			EasyUiCommon._mapNewDataSubGrid2 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid2);
	        			EasyUiCommon._mapProductCodeStr2 = EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr2);
	        		//}
	        		
	        		if(data.length > 0){
	        			$('#grid').datagrid('loadData',data); // update lai data grid
	        		}else{
	        			$('#grid').datagrid('appendRow',{});
	        		}
					
					
				}
            	
            	
            	if(type != 'ZV10'){
            		
            		if(type != 'ZV09'){
		            	var rs = $('#grid').datagrid('getRows');
		            	var r = rs[rs.length-1];
		            	if (r.productCode == null || r.productCode.length == 0) {
		            		rs.splice(rs.length-1,1);
		            	}
		            	EasyUiCommon._mapNewDataSubGrid1 = new Map();
		            	$('#grid').datagrid("loadData", rs);
            		}
            	}else{
                	//anhhpt: kiem tra dong cuoi cung
            		//      + Neu khong co du lieu thi delete dong cuoi, neu khong thi bi loi javascript
            		//		+ Neu co du lieu thi khong delete
         		    var size = $('#grid').datagrid('getRows').length;
         		    var rowLast = $('#grid').datagrid('getRows')[size - 1];      		    
         		    var columName = $('#grid').datagrid('getColumnFields')[1]; //lay ten colum 2st
         		    
         		    var value = null;
         		    if(columName=="amount"){
         		    	value = rowLast.amount;
         		    }else if(columName=="quantity"){
         		    	value = rowLast.quantity;
         		    }
         		    
         		   var rs = $('#grid').datagrid('getRows');
	               var r = rs[rs.length-1];
         		         		    	
     		    	if(value!=undefined && isNullOrEmpty(value)) {
     		    		rs.splice(rs.length-1,1);
     		    		
     		    		if(isTwoDetail){ // anhhpt: neu la xoa luon san pham khuyen mai
            				EasyUiCommon._mapProductCodeStr2.remove(size-1);
            				EasyUiCommon._mapNewDataSubGrid2.remove(size-1);
            				EasyUiCommon._mapNewDataSubGrid2 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid2);         		
                    		EasyUiCommon._mapProductCodeStr2 = EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr2,type,true);
            			}
            			
            			// anhhpt: neu la xoa san pham
            			EasyUiCommon._mapNewDataSubGrid1.remove(size-1);
                    	EasyUiCommon._mapProductCodeStr1.remove(size-1);
                		EasyUiCommon._mapNewDataSubGrid1 = EasyUiCommon.ajustIndex(EasyUiCommon._mapNewDataSubGrid1);
                    	EasyUiCommon._mapProductCodeStr1= EasyUiCommon.ajustIndexCode(EasyUiCommon._mapProductCodeStr1,type,false);

     		    	}
         		    
         		    EasyUiCommon.formatLabelAfterChange(type);
         			$('#grid').datagrid("loadData", rs); 
            	}
			}
    	});
    },
    cssForNumberBox:function(value){
    	var lstStr = '';
    	if($('#apParamCode').val() == 'ZV22'){
    		for(var k = 0;k<value.split(",").length;k++){
    			if(lstStr != ''){
    				lstStr += ", ";
    			}
    			var x = value.split(",")[k].indexOf("(");
    			if(value.split(",")[k].substring(0,x) != ''){
    				lstStr += value.split(",")[k].substring(0,x);
    			}
    		}
    		if(lstStr != '' && lstStr.split(",").length > 3){
    			var len = lstStr.split(",")[0].length + lstStr.split(",")[1].length +lstStr.split(",")[2].length;
    			lstStr = lstStr.substring(0,len+2) + " , <strong>...</strong>";
    		}
    	}else{
    		for(var k = 0;k<value.split(",").length;k++){
    			if(lstStr != ''){
    				lstStr += ", ";
    			}
    			var x = value.split(",")[k].indexOf("(");
    			var y = value.split(",")[k].indexOf(")");
    			if(value.split(",")[k].substring(0,x) != ''){
    				lstStr += value.split(",")[k].substring(0,x) + "(<span style='color:red'>" + EasyUiCommon.formatCurrency(value.split(",")[k].substring(x+1,y)) + "</span>)";
    			}
    		}
    		if(lstStr != '' && lstStr.split(",").length > 3){
    			var len = lstStr.split(",")[0].length + lstStr.split(",")[1].length +lstStr.split(",")[2].length;
    			lstStr = lstStr.substring(0,len+2) + " , <strong>...</strong>";
    		}
    	}
	    return lstStr;
    },
    cssForCheckBox:function(value){
    	var lstStr = '';
	    for(var k = 0;k<value.split(",").length;k++){
		   if(lstStr != ''){
			   lstStr += ", ";
		   }
		   if(value.split(",")[k].indexOf("*") > -1){
			   x = value.split(",")[k].indexOf("*");
			   if(value.split(",")[k].substring(0,x) != ''){
				   lstStr += value.split(",")[k].substring(0,x) + "<span style='color:red'>*</span>";
			   }
		   }else{
			   lstStr += value.split(",")[k];
		   }
	    }
	    if(lstStr != '' && lstStr.split(",").length > 3){
			var len = lstStr.split(",")[0].length + lstStr.split(",")[1].length +lstStr.split(",")[2].length;
			lstStr = lstStr.substring(0,len+2) + " , <strong>...</strong>";
		}
	    return lstStr;
    },
    loadProductTreeGrid:function(param,isPromotionProduct){
		$('#loadingDialog').show();
		if(param == null || param == undefined || param == ''){
			param = '&code=&name=&type=&parentId=&typeObject=2&isPromotionProduct='+isPromotionProduct;
		}
		var title = msgSoLuong;
		var typeBox = 'numberbox';
		if(EasyUiCommon.typeChange == EasyUiCommon.QUANTITY_PRODUCT){
			title = msgSoLuong;
			typeBox = 'numberbox';
		}else if(EasyUiCommon.typeChange == EasyUiCommon.AMOUNT_PRODUCT){
			title = msgTongTien;
			typeBox = 'numberbox';
		}else if(EasyUiCommon.typeChange == EasyUiCommon.REQUIRE_PRODUCT){
			title = msgBatBuocMua;
			typeBox = 'checkbox';
		}
		var field = 'quantity';
		var index = -1;
		var checkAllField = '<input type="checkbox" id="ckProductAll" name="ckProductAll" onclick="return EasyUiCommon.onchangeCheckboxAllProductNode(this);" />';
		$('.easyui-dialog #treeGrid').treegrid({  
			url:  WEB_CONTEXT_PATH +'/rest/catalog/product/tree-grid/0.json?id='+$('#promotionId').val()+'&shopId='+$('#shopIdLogin').val() + param,
			width:($('.easyui-dialog #treeGridContainer').width()-20),  
			height:400,  
			idField: 'id',  
			treeField: 'text',
			method:'GET',
			checkOnSelect:false,
			singleSelect:false,
			rownumbers:true,
			columns:[[  
	          {field:'text',title:msgMaSanPham,resizable:false,width:380, formatter: function(value, row, index){
	        	  return value;
	          }},
	          {field: field,title: title, width:180,align:'center',sortable : false,resizable : false,fixed:true,
	        	  editor:{
	        		  type : typeBox
	        	  },
	        	  formatter:function(value,row){
	        		  if(row.attributes != undefined && row.attributes.productTreeVO != undefined && row.attributes.productTreeVO.type == 'PRODUCT'){
		        		  if(typeBox == 'numberbox'){
		        			  return '<input style="width:140px" class="numberSecondDialog" id="quantity_'+row.id+'" onfocus="return Utils.bindFormatOnTextfield(\'quantity_'+row.id+'\',Utils._TF_NUMBER,null);" onkeypress="NextAndPrevTextField(event,this,\'numberSecondDialog\')"/>';
		        		  }else{
		        			  return '<input style="width:140px" type="checkbox" class="checkSecondDialog" id="quantity_'+row.id+'" onkeypress="NextAndPrevTextField(event,this,\'checkSecondDialog\')"/>';
		        		  }
	        		  }
	        	  }
	          },
//	          {field: 'ck',checkbox:true, formatter: function(value, row, index){
//        		  return Utils.XSSEncode(value);
//	          }},
	          {field:'checkNodeProductVO',title:checkAllField,resizable:false,width:50, align:'center', formatter: function(value, row, node){
	        	  index ++;
	        	  if(row.attributes != undefined && row.attributes.productTreeVO != undefined && row.attributes.productTreeVO.type == 'PRODUCT'){
	        		  return '<input type="checkbox" id="ckProduct_'+row.id+'" name="ckProduct" onclick="return EasyUiCommon.onchangeCheckboxProductNode(this, '+row.attributes.productTreeVO.id+', \''+row.attributes.productTreeVO.name + '\', \'' + row.attributes.productTreeVO.code +'\');" />';
	        	  }
	          }}
	          ]],
            onLoadSuccess:function(row, data){
            	index = -1;
            	$('.easyui-dialog .datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
            	$('#loadingDialog').hide();
            	setTimeout(function(){
            		CommonSearchEasyUI.fitEasyDialog();
        	  	},1000);
            	$('.numberSecondDialog').each(function(){
//            		EasyUiCommon.hideCheckBoxOnTree(this);
	        	    $(this).bind('keyup',function(event){
	        	        if(event.keyCode == keyCodes.ENTER){
	        	        	EasyUiCommon.selectOnSecondDialog();
	        	        }
	        	    });
	        	});
            	$('.checkSecondDialog').each(function(){
//	        	    EasyUiCommon.hideCheckBoxOnTree(this);
	        	});
//            	$('.easyui-dialog #treeGrid').treegrid('expandAll');
            	var rs = $('#searchGridUpdate').datagrid('getRows');
            	var lstTmp = [];
            	for (var i = 0, sz = rs.length; i < sz; i++) {
            		if (rs[i].productCode != undefined && rs[i].productCode != null
            				&& rs[i].productCode.length > 0) {
            			lstTmp.push(rs[i].productCode);
            		}
            	}
            	for (i = 0, sz = EasyUiCommon._lstProductOnChange.length; i < sz; i++) {
            		lstTmp.push(EasyUiCommon._lstProductOnChange[i]);
            	}
            	if(data.rows!=undefined && data.rows!=null && EasyUiCommon._mapInfomationPromotion!=null && EasyUiCommon._mapInfomationPromotion.size()>0){
            		for(var i=0; i<data.rows.length; i++){
            			var node = data.rows[i];
            			if(node.attributes!=undefined && node.attributes!=null && node.attributes.productTreeVO!=undefined && node.attributes.productTreeVO!=null){
            				var productVO = node.attributes.productTreeVO;
            				if(typeNodeProduct.parseValue(productVO.type)===typeNodeProduct.PRODUCT){
            					var code = productVO.code; 
        						//var item = EasyUiCommon._mapInfomationPromotion.get(code);
        						if(/*item != undefined && */code !=null && code.length > 0){
        							//$('#quantity_'+node.id).val(item.quantity);
        							/*if($('#ckProduct_'+node.id).length > 0 && !$('#ckProduct_'+node.id)[0].checked){
        								//$('#ckProduct_'+node.id).click();
        								$('.easyui-dialog #treeGrid').treegrid('remove', node.id);
        							}*/
        							if($('#ckProduct_'+node.id).length > 0 && lstTmp.indexOf(code) > -1){
        								$('.easyui-dialog #treeGrid').treegrid('remove', node.id);
        							}
        						}
            				}
            			}
            		}
            	}
            	setTimeout(function(){
            		$("input[name='ckProductAll']").attr('checked',false);
            	}, 10);        		
        		$('.easyui-dialog #treeGrid').treegrid('unselectAll');
            },
            onExpand:function(row){
            	var type = 0;
            	if(row.attributes != undefined && row.attributes.productTreeVO != undefined){
            		type = row.attributes.productTreeVO.type;
            	}
            	var param = '&code=&name=&typeObject=2&parentId='+row.id+'&type='+row.attributes.productTreeVO.type+'&isPromotionProduct='+isPromotionProduct;
            	setTimeout(function(){
            		Utils.getJSON('/rest/catalog/product/tree-grid/0.json?id='+$('#promotionId').val()+'&shopId='+$('#shopIdLogin').val() + param,function(data){
	            		var isExist = false;
	            		for(var i = 0; i < data.rows.length ; i++){
	            			if(EasyUiCommon._lstProductExpand.indexOf(data.rows[i].id) > -1){
	            				isExist = true;
	            				break;
	            			}else{
	            				EasyUiCommon._lstProductExpand.push(data.rows[i].id);
	            			}
	            		}
	            		if(!isExist){
            				$('#treeGrid').treegrid('append',{
            					parent: row.id,  
            					data: data.rows
            				});
	            		}
	        		});
            	},500);
            },
            onCollapse:function(row){
            },
            onCheck:function(row){
//        		var arr = row.attributes.productTreeVO.listChildren;
//        		EasyUiCommon.recursionCheck(arr,true);
            	if(row.attributes != undefined && row.attributes.productTreeVO != undefined && row.attributes.productTreeVO.type == 'PRODUCT'){
            		 var id = row.attributes.productTreeVO.id;
            		 var code = row.attributes.productTreeVO.code;
            		 var name = row.attributes.productTreeVO.name;
            		 var insRow = {
    					 productCode:code,
    					 productName:name,
    					 quantity:$('#quantity_'+ id).val()
        			 };  
            		 var array = new Array();
            		 array.push(insRow);
            		 EasyUiCommon._mapProductOnSecondDialog.put(id,array);
            	}
		    },
		    onUncheck:function(row){
//		    	var arr = row.attributes.productTreeVO.listChildren;
//		    	EasyUiCommon.recursionUnCheck(arr);
		    	var id = 0;
		    	if(row.attributes != undefined && row.attributes.productTreeVO != undefined){
		    		id = row.attributes.productTreeVO.id;
		    	}
		    	EasyUiCommon._mapProductOnSecondDialog.remove(id);
		    },
		    onCheckAll:function(rows){
		    	for(var i = 0;i<rows.length;i++){
		    		var row = rows[i];
		    		var id = 0;
			    	if(row.attributes != undefined && row.attributes.productTreeVO != undefined){
			    		id = row.attributes.productTreeVO.id;
			    	}
		    		var code = row.attributes.productTreeVO.code;
		    		var name = row.attributes.productTreeVO.name;
	           		var insRow = {
	       					productCode:code,
	       					productName:name,
	       					quantity:$('#quantity_'+ id).val()
	           			};  
	           		var array = new Array();
	           		array.push(insRow);
	           		EasyUiCommon._mapProductOnSecondDialog.put(id,array);
		    	}
		    },
		    onUncheckAll:function(rows){
		    	for(var i = 0;i<rows.length;i++){
		    		var row = rows[i];
		    		var id = 0;
			    	if(row.attributes != undefined && row.attributes.productTreeVO != undefined){
			    		id = row.attributes.productTreeVO.id;
			    	}
		    		EasyUiCommon._mapProductOnSecondDialog.remove(id);
		    	}
		    },
		});
	},
	///@author hunglm16; @since JULY 14,2014; @description OnchangCheckBoxProduct
	onchangeCheckboxProductNode: function(cbx, id, name, code){
		if($(cbx)[0].checked){
			var insRow = {
					 productCode:code,
					 productName:name,
					 quantity:$('#quantity_'+ id).val()
			};  
			var array = new Array();
			array.push(insRow);
			EasyUiCommon._mapProductOnSecondDialog.put(id,array);
			 
			var cbxArr = $("input[name='ckProduct']");
			if(cbxArr!=undefined && cbxArr!=null && cbxArr.length>0){
				var flag = true;
				for(var j=0; j<cbxArr.length; j++){
					if(!$(cbxArr[j])[0].checked){
						flag = false;
						break;
					}
				}
//				if(!flag){
//					$("input[name='ckProductAll']").attr('checked',true);
//				}
				$("input[name='ckProductAll']").attr('checked',flag);
			}
		}else{
			$("input[name='ckProductAll']").attr('checked',false);
	    	EasyUiCommon._mapProductOnSecondDialog.remove(id);
		}
	},
	///@author hunglm16; @since JULY 14,2014; @description OnchangCheckBoxProduct : checkAll
	onchangeCheckboxAllProductNode: function(cbx){
		if($(cbx)[0].checked){
			var rows = $('.easyui-dialog #treeGrid').treegrid('getData');
			$("input[name='ckProduct']").attr('checked',true);
			for(var i = 0;i<rows.length;i++){
	    		var row = rows[i];
	    		if(row.attributes != undefined && row.attributes.productTreeVO != undefined && row.attributes.productTreeVO.type == 'PRODUCT'){
		    		id = row.attributes.productTreeVO.id;
		    		var code = row.attributes.productTreeVO.code;
		    		var name = row.attributes.productTreeVO.name;
	           		var insRow = {
	       					productCode:code,
	       					productName:name,
	       					quantity:$('#quantity_'+ id).val()
	           			};  
	           		var array = new Array();
	           		array.push(insRow);
	           		EasyUiCommon._mapProductOnSecondDialog.put(id,array);
	    		}
	    	}
		}else{
			$("input[name='ckProduct']").attr('checked',false);
			var rows = $('#treeGrid').treegrid('getData');
			for(var i = 0;i<rows.length;i++){
	    		var row = rows[i];
	    		if(row.attributes != undefined && row.attributes.productTreeVO != undefined && row.attributes.productTreeVO.type == 'PRODUCT'){
		    		id = row.attributes.productTreeVO.id;
		    		EasyUiCommon._mapProductOnSecondDialog.remove(id);
		    	}
	    	}
		}
	},
	
	hideCheckBoxOnTree:function(input){
		var html = $(input).parent().parent().parent().parent().parent().parent().parent().parent().parent().children();
	    var htmlCat = html;
	    htmlCat = html.parent().parent().parent().parent().parent().parent().children();
	    var size = html.length;
	    var sizeCat = htmlCat.length;
	    for(var i = 0; i < size ; i++){
	    	if(i > 0){
	    		html = html.next();
	    	}
	    	html = html.first();
	    	var id = html.attr('id');
	    	if(id != undefined){
	    		var htmlSub = html;
	    		htmlSub.children().last().children().html('');
	    	}
	    }
	    for(var i = 0; i < sizeCat ; i++){
	    	if(i > 0){
	    		htmlCat = htmlCat.next();
	    	}
	    	htmlCat = htmlCat.first();
	    	var id = htmlCat.attr('id');
	    	if(id != undefined){
	    		var htmlCat1 = htmlCat;
	    		htmlCat1.children().last().children().html('');
	    	}
	    }
	},
	recursionCheck:function(arr,isHasTextBox){
		var size = 0;
		if(arr != null && arr != undefined){
			size = arr.length;
		}
		var lstArr = [];
		if(size == 0){
			return;
		}else{
			for(var i=0;i<size;i++){
				if(i < size){
					if(arr[i].type != 'PRODUCT'){
						$('.easyui-dialog #treeGrid').treegrid('select',arr[i].id);
						lstArr = arr[i].listChildren;
						EasyUiCommon.recursionCheck(lstArr,true);
					}else{
						if(isHasTextBox){
							if(i == 0){
								$('#quantity_'+arr[i].id).focus();
							}
						}
						$('.easyui-dialog #treeGrid').treegrid('select',arr[i].id);
					}
				}
			}
		}
	},
	recursionUnCheck:function(arr){
		var size = 0;
		if(arr != null && arr != undefined){
			size = arr.length;
		}
		var lstArr = [];
		if(size == 0){
			return;
		}else{
			for(var i=0;i<size;i++){
				if(i < size){
					if(arr[i].type != 'PRODUCT'){
						$('.easyui-dialog #treeGrid').treegrid('unselect',arr[i].id);
						lstArr = arr[i].listChildren;
						EasyUiCommon.recursionUnCheck(lstArr);
					}else{
						$('.easyui-dialog #treeGrid').treegrid('unselect',arr[i].id);
					}
				}
			}
		}
	},
	showTreeGridDialog:function(isPromotionProduct){
		$('#dialogProduct').dialog({  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        position: 'middle',
	        center: true, 
	        onOpen: function(){
	        	$('#errMsgProductDlg').html('').hide();
	        	EasyUiCommon._lstProductExpand = [];
	        	EasyUiCommon._mapProductOnSecondDialog = new Map();
	        	$('#productCodeDlg').focus();
	        	$('#productCodeDlg').val('');
	        	$('#productNameDlg').val('');
	        	$('#btnSeachProductTree').unbind('click');
	        	$('#btnSeachProductTree').bind('click',function(){
	        		EasyUiCommon._lstProductExpand = [];
            		var param = '&code='+encodeChar($('.easyui-dialog #productCodeDlg').val().trim())+'&name='+$('.easyui-dialog #productNameDlg').val().trim()+'&type=&parentId=&typeObject=2&isPromotionProduct='+isPromotionProduct;
        			EasyUiCommon.loadProductTreeGrid(param,isPromotionProduct);
        		});
            	$('#productCodeDlg,#productNameDlg').each(function(){
	        	    $(this).bind('keyup',function(event){
	        	        if(event.keyCode == keyCodes.ENTER){
	        	        	EasyUiCommon._lstProductExpand = [];
	        	        	var param = '&code='+encodeChar($('.easyui-dialog #productCodeDlg').val().trim())+'&name='+$('.easyui-dialog #productNameDlg').val().trim()+'&type=&parentId=&typeObject=2&isPromotionProduct='+isPromotionProduct;
	            			EasyUiCommon.loadProductTreeGrid(param,isPromotionProduct);
	        	        }
	        	    });
	        	});
        		EasyUiCommon.loadProductTreeGrid(null,isPromotionProduct);
	        },
	        onBeforeClose: function() {
	        },
	        onClose : function(){
	        	$('#divProductContainer').hide();
	        }
	    });
	},
	selectOnSecondDialog:function(){
		$('#errMsgProductDlg').html('').hide();
		var msg = '';
		var newData = {};
    	if(EasyUiCommon.isMulti){
    		newData = EasyUiCommon._mapNewDataSubGrid2.get(Number($('#indexDialog').val()));
    	}else{
    		newData = EasyUiCommon._mapNewDataSubGrid1.get(Number($('#indexDialog').val()));
    	}
		var size = 0;
		if(newData!= undefined && newData!= null && newData.length > 0){
			size = newData.length;
		}
		var newDataOnSecondDialog = EasyUiCommon._mapProductOnSecondDialog.keyArray;
		var isErr = false;
		var id = 0;
		var lstArr = new Array();
		$('.easyui-dialog #searchGridUpdate').datagrid('deleteRow',size);
		if(newDataOnSecondDialog.length == 0){
			msg = msgLoi19;
		}else{
			for(var i=size;i< size + newDataOnSecondDialog.length;i++){
				if(!isErr){
					var obj = EasyUiCommon._mapProductOnSecondDialog.get(newDataOnSecondDialog[i-size])[0];
					/*
					 * (M)
					 * - validate product only (has check box)
					 * - check if product is selected first
					 * @modified by tuannd20
					 * @date 25/07/2014
					 */
					if ($('input:checkbox[name=ckProduct][id$=' + newDataOnSecondDialog[i-size] + ']').length === 0){
						continue;
					}
					if(EasyUiCommon.typeChange == EasyUiCommon.QUANTITY_PRODUCT){
						if ($('input:checkbox[name=ckProduct][id$=' + newDataOnSecondDialog[i-size] + ']').is(':checked')){							
							if($('#quantity_'+newDataOnSecondDialog[i-size]).val() != '' && $('#quantity_'+newDataOnSecondDialog[i-size]).val() != undefined && $('#quantity_'+newDataOnSecondDialog[i-size]).val().trim() > 0){
								obj.quantity = $('#quantity_'+newDataOnSecondDialog[i-size]).val().trim();
							}else{
								msg = msgLoi20;
								isErr = true;
								id = newDataOnSecondDialog[i-size];
								break;
							}
						}
					}else if(EasyUiCommon.typeChange == EasyUiCommon.AMOUNT_PRODUCT){							
						if($('#quantity_'+newDataOnSecondDialog[i-size]).val() != '' && $('#quantity_'+newDataOnSecondDialog[i-size]).val() != undefined && $('#quantity_'+newDataOnSecondDialog[i-size]).val().trim() > 0){
							obj.amount = $('#quantity_'+newDataOnSecondDialog[i-size]).val().trim();
						}else{
							msg = msgLoi21;
							isErr = true;
							id = newDataOnSecondDialog[i-size];
							break;
						}
					}else if(EasyUiCommon.typeChange == EasyUiCommon.REQUIRE_PRODUCT){
						if($('#quantity_'+newDataOnSecondDialog[i-size]).is(":checked")){
							obj.required = 1;
						}else{
							obj.required = 0;
						}
					}
					lstArr.push(obj);
				}
			}
		}
		if(msg.length > 0){
			$('#errMsgProductDlg').html(msg).show();
			EasyUiCommon.insertRowOnDialog(size);
			$('#quantity_'+id).focus();
		}else{
			for(var i = size; i< size + lstArr.length ; i++){
				$('.easyui-dialog #searchGridUpdate').datagrid('insertRow',{index: i, row:lstArr[i-size]});
				var arrValues = null;
				if(EasyUiCommon.isMulti){
					arrValues = EasyUiCommon._mapNewDataSubGrid2.get(Number($('#indexDialog').val()));
				}else{
					arrValues = EasyUiCommon._mapNewDataSubGrid1.get(Number($('#indexDialog').val()));
				}
				if(arrValues == undefined || arrValues == null || arrValues.length == 0){
					arrValues = new Array();
				}
				arrValues.push(lstArr[i-size]);
				if(EasyUiCommon.isMulti){
					EasyUiCommon._mapNewDataSubGrid2.put(Number($('#indexDialog').val()),arrValues);
				}else{
					EasyUiCommon._mapNewDataSubGrid1.put(Number($('#indexDialog').val()),arrValues);
				}
				var codeTmp = lstArr[i-size].productCode;
				if (EasyUiCommon._lstProductOnChange.indexOf(codeTmp) < 0) {
					EasyUiCommon._lstProductOnChange.push(codeTmp);
				}
			}
			if(EasyUiCommon.typeChange == EasyUiCommon.REQUIRE_PRODUCT){
				$('.checkDialog').each(function(){
					$(this).focus();
				});
			}else{
				$('.numberDialog').each(function(){
					$(this).focusToEnd();
				});
			}
			if(EasyUiCommon.isMulti){
				EasyUiCommon.insertRowOnDialog(EasyUiCommon._mapNewDataSubGrid2.get(Number($('#indexDialog').val())).length);
			}else{
				EasyUiCommon.insertRowOnDialog(EasyUiCommon._mapNewDataSubGrid1.get(Number($('#indexDialog').val())).length);
			}
			$('#dialogProduct').dialog('close'); 
		}
	},
	stylerOnRow:function(index,value,type,isMulti){
		var text = '<span style="color:white">.</span>';
		var img = '';
		var left = 0;
		if(type == 'ZV03' || type == 'ZV06'){
			left = $('.datagrid-view .datagrid-view2').width() - 118;
			img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,true)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			if(value != '' && value != null && value != undefined){
				return EasyUiCommon.cssForNumberBox(Utils.XSSEncode(value)) + img;
			}
		}else if(type == 'ZV07' || type == 'ZV08'|| type == 'ZV10'|| type == 'ZV11'){
			left = $('.datagrid-view .datagrid-view2').children().first().children().children().children().children().children().first().children().width() - 18;
			img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','required',msgBatBuocMua,'checkbox',false,false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			if(value != '' && value != null && value != undefined){
				EasyUiCommon.codeByGroup = value;
				return EasyUiCommon.cssForCheckBox(Utils.XSSEncode(value)) + img;
			}
			if(EasyUiCommon.codeByGroup != ''){
				return EasyUiCommon.cssForCheckBox(EasyUiCommon.codeByGroup) + img;
			}
		}else if(type == 'ZV09' || type == 'ZV12'){
/*			if(isMulti != null && isMulti != undefined && isMulti){
//				left = $('.datagrid-view .datagrid-view2').width() - 118;
				var right = 10;
				$('.datagrid-body td[field="freeProductCodeStr"] div').css('position', 'relative');
				$('.datagrid-body td[field="productCodeStr"] div').css('position', 'relative');
				img = "<a style=\"position: absolute; right: "+right+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',true,true)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				if(value != '' && value != null && value != undefined){
					return EasyUiCommon.cssForNumberBox(Utils.XSSEncode(value)) + img;
				}
			}else{
				$('.datagrid-body td[field="freeProductCodeStr"] div').css('position', 'relative');
				$('.datagrid-body td[field="productCodeStr"] div').css('position', 'relative');
//				left = $('.datagrid-view .datagrid-view2').children().first().children().children().children().children().children().first().children().width() - 18;
				var right = 10;
				img = "<a style=\"position: absolute; right: "+right+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','required',msgBatBuocMua,'checkbox',false,false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				if(value != '' && value != null && value != undefined){
					EasyUiCommon.codeByGroup = value;
					return EasyUiCommon.cssForCheckBox(value) + img;
				}
				if(EasyUiCommon.codeByGroup != ''){
					return EasyUiCommon.cssForCheckBox(EasyUiCommon.codeByGroup) + img;
				}
			}*/
			
		
			if(isMulti != null && isMulti != undefined && isMulti){
			//	left = $('.datagrid-view .datagrid-view2').width() - 130;
				left = $('.GridSection').width() - 191;
				img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',true,true)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				if(value != '' && value != null && value != undefined){
					return EasyUiCommon.cssForNumberBox(Utils.XSSEncode(value)) + img;
				}
			}else{			
				left = $('.datagrid-view .datagrid-view2').children().first().children().children().children().children().children().first().children().width() - 18;
				img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','required',msgBatBuocMua,'checkbox',false,false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				if(value != '' && value != null && value != undefined){
					EasyUiCommon.codeByGroup = value;
					return EasyUiCommon.cssForCheckBox(Utils.XSSEncode(value)) + img;
				}
				if(EasyUiCommon.codeByGroup != ''){
					return EasyUiCommon.cssForCheckBox(EasyUiCommon.codeByGroup) + img;
				}
			}

			//return text + img;
			
		}else if(type == 'ZV15' || type == 'ZV18'){
			if(isMulti != null && isMulti != undefined && isMulti){
				left = $('.datagrid-view .datagrid-view2').width() - 168;
				img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',true,true)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			}else{
				left = $('.datagrid-view .datagrid-view2').children().first().children().children().children().children().children().first().children().width() - 18;
				if(type == 'ZV15'){
					img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				}else{
					img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','amount',msgTongTienMua,'numberbox',false,false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				}
			}
			if(value != '' && value != null && value != undefined){
				return EasyUiCommon.cssForNumberBox(value) + img;
			}
		}else if(type == 'ZV13' || type == 'ZV14'|| type == 'ZV16'|| type == 'ZV17'){
			left = $('.datagrid-view .datagrid-view2').children().first().children().children().children().children().children().first().children().width() - 18;
			if(type == 'ZV13' || type == 'ZV14'){
				img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			}else{
				img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','amount',msgTongTienMua,'numberbox',false,false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			}
			if(value != '' && value != null && value != undefined){
				return EasyUiCommon.cssForNumberBox(Utils.XSSEncode(value)) + img;
			}
		}else if(type == 'ZV21'){
			left = $('.datagrid-view .datagrid-view2').width() - 178;
			img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,true)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			if(value != '' && value != null && value != undefined){
				return EasyUiCommon.cssForNumberBox(Utils.XSSEncode(value)) + img;
			}
		}else if(type == 'ZV22'){
			if(isMulti != null && isMulti != undefined && isMulti){
				left = $('.datagrid-view .datagrid-view2').width() - 270;
				if($('#isAllowEditProPgram').val() == 'true'){
					if($('#promotionStatus').val() != '' && $('#promotionStatus').val().trim() == 2){
						img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.openFreeProductDialog('" + index + "');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
					}
				}
				if(value != '' && value != null && value != undefined){
					return EasyUiCommon.cssForTextBoxForZV22(value) + img;
				}
			}else{
				left = $('.datagrid-view .datagrid-view2').children().first().children().children().children().children().children().first().children().width() - 18;
				img = "<a style=\"position: absolute; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','required',msgBatBuocMua,'checkbox',false,false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				if(value != '' && value != null && value != undefined){
					EasyUiCommon.codeByGroup = value;
					return EasyUiCommon.cssForCheckBox(value) + img;
				}
				if(EasyUiCommon.codeByGroup != ''){
					return EasyUiCommon.cssForCheckBox(EasyUiCommon.codeByGroup) + img;
				}
			}
		}
		return text + img;
	},
	formatLabelAfterChange:function(type){
		var count = 0;
		for(var x = 0; x < EasyUiCommon._mapProductCodeStr1.keyArray.length ; x++){
			if(EasyUiCommon._mapProductCodeStr1.get(x) != null
					&& EasyUiCommon._mapProductCodeStr1.get(x) != '' && EasyUiCommon._mapProductCodeStr1.get(x).length > 0){
				var html = $('.datagrid-view2 .datagrid-body table tbody').children();
				var indexValue = EasyUiCommon._mapProductCodeStr1.keyArray[x];
				for(var y = 0;y <= count ; y++){
					if(y > 0 ){
						html = html.next();
					}
				}
				if(type == 'ZV03' || type == 'ZV06'){
					html.first().children().last().prev().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}else if(type == 'ZV07' || type == 'ZV08' || type == 'ZV09' || type == 'ZV10' || type == 'ZV11' || type == 'ZV12'){
					html.first().children().first().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}else if(type == 'ZV15' || type == 'ZV18'){
					html.first().children().first().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}else if(type == 'ZV13' || type == 'ZV16'){
					html.first().children().first().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}else if(type == 'ZV14' || type == 'ZV17'){
					html.first().children().first().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}else if(type == 'ZV21'){
					html.first().children().first().next().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}else if(type == 'ZV22'){
					html.first().children().first().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}
				count++;
			}
		}
		var count = 0;
		for(var x = 0; x < EasyUiCommon._mapProductCodeStr2.keyArray.length ; x++){
			if(!isNullOrEmpty(EasyUiCommon._mapProductCodeStr2.get(x))&& EasyUiCommon._mapProductCodeStr2.get(x).length > 0){
				var html = $('.datagrid-view2 .datagrid-body table tbody').children();
				var indexValue = EasyUiCommon._mapProductCodeStr2.keyArray[x];
				for(var y = 0;y <= count ; y++){
					if(y > 0){
						html = html.next();
					}
				}
				if(type == 'ZV09' || type == 'ZV12'){
					html.first().children().last().prev().children().html(EasyUiCommon._mapProductCodeStr2.get(indexValue));
				}else if(type == 'ZV05' || type == 'ZV18'){
					html.first().children().last().prev().prev().children().html(EasyUiCommon._mapProductCodeStr2.get(indexValue));
				}else if(type == 'ZV22'){
					html.first().children().last().prev().prev().children().html(EasyUiCommon._mapProductCodeStr2.get(indexValue));
					html.first().children().last().prev().children().html(EasyUiCommon._mapFreeQuantity.get(indexValue));
				}
				count++;
			}
		}
	},
	formatCurrency:function(num) {
		if(num == undefined || num == null) {
			return '';
		}
		num = num.toString().split('.');
		var ints = num[0].split('').reverse();
		for (var out=[],len=ints.length,i=0; i < len; i++) {
			if (i > 0 && (i % 3) === 0){
				out.push('.');	
			}
			out.push(ints[i]);
		}
		out = out.reverse() && out.join('');
		return out;
	},
	getListFreeProduct:function(){
		var lstSelectId = [];
		var lstAllSelectId = [];
		var url = '/catalog/promotion/getListFreeProduct?groupProductCode='+$('#groupProductCodeDlg').val().trim()+'&productCode='+$('#freeProductCodeDlg').val().trim()+'&productName='+$('#freeProductNameDlg').val().trim();
    	$('.easyui-dialog #gridFreeProduct').datagrid({
			  url:url,
  		  	  pageList  : [10,20,30],
  			  width: 750,
  			  pageSize : 10,
  			  checkOnSelect :true,
  			  height:'auto',
  			  scrollbarSize : 0,
  			  pagination:true,
  			  pageNumber:1,
  			  fitColumns:true,
  			  method : 'GET',
  			  rownumbers: true,
  			  columns:[[
  			    {field: 'productCode', title: msgMaSanPham, width: 70, sortable:false,resizable:false, align: 'left'
  			    },
  				{field: 'productName', title: msgTenSanPham, width: 150, sortable:false,resizable:false, align: 'left'
  			    },
  			    {field: 'productGroupCode', title: msgMaNhomSP, width: 150, sortable:false,resizable:false, align: 'left'
  			    },
  			    {field: 'productId',title: '<a><input type="checkbox" id="checkHeader" class="clsHeader" onchange="EasyUiCommon.checkHeader();"/></a>', width:50,align:'center',sortable : false,resizable : false,
  			    	formatter:function(value,row,index){
  			    		return "<input type='checkbox' id='"+row.productId+"_"+row.groupId+"' class='clsCheckBox' onchange=\"EasyUiCommon.checkRow('"+row.productId+"_"+row.groupId+"');\" />";
  			    	}
  			    },			  
  			  ]],
  			  onLoadSuccess:function(data){
  				  	EasyUiCommon.lstLamNH = new Map();
  			      	var easyDiv = '#gridFreeProductContainer ';
  			    	$(easyDiv+'.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
  			    	var size = data.rows.length;
  			    	for(var i = 0; i < size ; i++){
  			    		var id = data.rows[i].productId+'_'+data.rows[i].groupId;
  			    		EasyUiCommon.lstLamNH.put(id,data.rows[i]);
  			    	}
  			    	$('.clsCheckBox').each(function(){
  			    		var id = $(this).attr('id');
  			    		if(EasyUiCommon.lstGroupId.get(Number($('#indexDialog').val())) != null && EasyUiCommon.lstGroupId.get(Number($('#indexDialog').val())) != undefined){
		    				for(var i = 0; i < EasyUiCommon.lstGroupId.get(Number($('#indexDialog').val())).length ; i++){
		    					if(id == EasyUiCommon.lstGroupId.get(Number($('#indexDialog').val()))[i]){
		    						$('#'+id).attr('checked',true);
		    						EasyUiCommon.checkRow(id);
		    					}
		    				}
  			    		}
//  			    		else{
//  			    			if(EasyUiCommon.lstFreeProduct.get(id) != null && EasyUiCommon.lstFreeProduct.get(id) != undefined){
//  			    				$('#'+id).attr('checked',true);
//  			    				EasyUiCommon.checkRow(id);
//  			    			}
//  			    		}
  			    	});
  		    		updateRownumWidthForDataGrid('#gridFreeProduct');
  		    		$(window).resize();
  		      }
		});
	},
	checkHeader:function(){
		if($('#checkHeader').is(':checked')){
			$('.clsCheckBox').each(function(){
				$(this).attr('checked',true);
				EasyUiCommon.checkRow($(this));
			});
		}else{
			$('.clsCheckBox').each(function(){
				$(this).attr('checked',false);
				EasyUiCommon.checkRow($(this));
			});
		}
	},
	checkRow:function(id){
		if($('#'+id).is(':checked')){
			EasyUiCommon.lstFreeProduct.put(id,EasyUiCommon.lstLamNH.get(id));
		}else{
			EasyUiCommon.lstFreeProduct.remove(id);
		}
		var count = 0;
		$('.clsCheckBox').each(function(){
			var id = $(this).attr('id');
			if($('#'+id).is(':checked')){
				count++;
			}
		});
		if(EasyUiCommon.lstLamNH.keyArray.length == count){
			$('#checkHeader').attr('checked',true);
		}else{
			$('#checkHeader').attr('checked',false);
		}
	},
	openFreeProductDialog:function(gridIndex){
		$('#indexDialog').val(gridIndex);
		$('#errMsgFreeProductDlg').html('').hide();
//		EasyUiCommon.lstFreeProduct = new Map();
		$('#freeProductCodeDlg').val('');
		$('#freeProductNameDlg').val('');
		$('#groupProductCodeDlg').val('');
		$('#freeProductCodeDlg').focus();
		$('#dialogFreeProduct').dialog({  
	        title: msgThongTinSPKM,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        onOpen: function(){
	        	if(EasyUiCommon._mapNewDataSubGrid2.get(gridIndex) != null && EasyUiCommon._mapNewDataSubGrid2.get(gridIndex) != undefined && EasyUiCommon._mapNewDataSubGrid2.get(gridIndex).length > 0){
	        		$('#freeQuantityDlg').val(EasyUiCommon._mapNewDataSubGrid2.get(gridIndex)[0].quantity);
	        	}
	        	$('#freeProductCodeDlg,#freeProductNameDlg,#groupProductCodeDlg').bind('keyup',function(event){
	        		if(event.keyCode == keyCodes.ENTER){
	        			EasyUiCommon.getListFreeProduct();
	        		}
	        	});
	        	$('#btnSeachFreeProduct').bind('click',function(){
        			EasyUiCommon.getListFreeProduct();
	        	});
	        	EasyUiCommon.getListFreeProduct();
	        },
	        onBeforeClose: function() {
	        },
	        onClose : function(){
	        	EasyUiCommon.lstFreeProduct = new Map();
	        }
	    });
		return false;
	},
	changeQuantityForZV22:function(){
		$('#errMsgFreeProductDlg').html('').hide();
		var gridIndex = Number($('#indexDialog').val());
		var msg = '';
		var lstProductCode = '';
		var first = true;
		var isErr = false;
		var num = 0;
		var ed = $('#grid').datagrid('getEditor', {index:gridIndex,field: 'quantity'});
		var type = $('#apParamCode').val().trim();
		if(EasyUiCommon.lstFreeProduct != null && EasyUiCommon.lstFreeProduct.keyArray != null && EasyUiCommon.lstFreeProduct.keyArray.length == 0){
			msg = msgLoi24;
		}
		if(msg.length == 0){
			if($('#freeQuantityDlg').val() == '' || $('#freeQuantityDlg').val() == 0){
				msg = msgLoi25;
			}
			if(isNaN($('#freeQuantityDlg').val())){
				msg = msgLoi26;
				$('#freeQuantityDlg').focus();
			}
			if($('#freeQuantityDlg').val() < 0){
				msg = msgLoi27;
				$('#freeQuantityDlg').focus();
			}
		}
		if(msg != '' && msg.length > 0){
			$('#errMsgFreeProductDlg').html(msg).show();
			return false;
		}
		var size = EasyUiCommon.lstFreeProduct.keyArray.length;
		var lstExist = [];
		for(var i = 0 ; i < size ; i++){
			var obj = EasyUiCommon.lstFreeProduct.get(EasyUiCommon.lstFreeProduct.keyArray[i]);
			if(lstExist.length > 0 && lstExist.indexOf(obj.productGroupCode) == -1){
				$('#errMsgFreeProductDlg').html(msgLoi23).show();
				return false;
			}
			lstExist.push(obj.productGroupCode);
		}
		for(var i = 0 ; i < size ; i++){
			if(!first){
				lstProductCode += ','; 
			}
			var obj = EasyUiCommon.lstFreeProduct.get(EasyUiCommon.lstFreeProduct.keyArray[i]);
			lstProductCode += obj.productCode;
			var row = {};
			row = {
					productCode:obj.productCode,
					productName:obj.productName,
					quantity:$('#freeQuantityDlg').val()
			}; 
			var arrValues = null;
			if(!first){
				arrValues = EasyUiCommon._mapNewDataSubGrid2.get(gridIndex);
			}else{
				arrValues = new Array();
			}
			arrValues.push(row);
			EasyUiCommon._mapNewDataSubGrid2.put(gridIndex,arrValues);	
			EasyUiCommon.lstGroupId.put(gridIndex,arrValues);
			first = false;
		}
		$('#dialogFreeProduct').dialog('close');
		$('#successMsgProduct').html(msgCommon3).show();
		setTimeout(function() {
			 $('#successMsgProduct').html('').hide();
		 },3000);
		lstProductCode = EasyUiCommon.stylerOnRow(gridIndex,lstProductCode,type,true);
		EasyUiCommon._mapProductCodeStr2.put(gridIndex,lstProductCode);
		EasyUiCommon._mapFreeQuantity.put(gridIndex,$('#freeQuantityDlg').val());
		$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().last().prev().prev().children().html(lstProductCode);
		$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().last().prev().children().html($('#freeQuantityDlg').val());
	},
	cssForNumberBoxForZV22:function(value){
		var str = value;
		var x = str.split(",")[0].indexOf("(");
		var y = str.split(",")[0].indexOf(")");
		if(str.split(",")[0].substring(0,x) != ''){
			return EasyUiCommon.formatCurrency(str.split(",")[0].substring(x+1,y));
		}else{
			return str;
		}
    },
    cssForTextBoxForZV22:function(value){
    	if(value != null && value != '' && value.indexOf("(") > -1){
    		var lstStr = '';
    		for(var k = 0;k<value.split(",").length;k++){
    			if(lstStr != ''){
    				lstStr += ", ";
    			}
    			var x = value.split(",")[k].indexOf("(");
    			if(value.split(",")[k].substring(0,x) != ''){
    				lstStr += value.split(",")[k].substring(0,x);
    			}
    		}
    		if(lstStr != '' && lstStr.split(",").length > 3){
    			var len = lstStr.split(",")[0].length + lstStr.split(",")[1].length +lstStr.split(",")[2].length;
    			lstStr = lstStr.substring(0,len+2) + " , <strong>...</strong>";
    		}
    		return lstStr;
    	}else{
    		if(value.split(",").length > 3){
    			var len = value.split(",")[0].length + value.split(",")[1].length +value.split(",")[2].length;
    			value = value.substring(0,len+2) + " , <strong>...</strong>";
			} 
    		return value;
    	}
    },
    bindFormatOnTextfield: function(input, formatType){
		var reg = /[^0-9]/;
		var regAll = /[^0-9]/g;
		switch (formatType) {
		case Utils._TF_A_Z:
			reg = /[^A-Z]/;
			regAll = /[^A-Za-z]/g; 
			break;
		case Utils._TF_NUMBER_DOT:
			reg = /[^0-9.]/;
			regAll = /[^0-9.]/g; 
			break;
		case Utils._TF_NUMBER:
			reg = /[^0-9]/;
			regAll = /[^0-9]/g; 
			break;
		case Utils._TF_NUMBER_COMMA:
			reg = /[^0-9,]/;
			regAll = /[^0-9,]/g; 
			break;
		case Utils._TF_NUMBER_SIGN:
			reg = /[^0-9-]/;
			regAll = /[^0-9-]/g; 
			break;
		case Utils._TF_NUMBER_CONVFACT:
			reg = /[^0-9\/]/;
			regAll = /[^0-9\/]/g; 
			break;
		case Utils._TF_NUMBER_COMMA_AND_DOT:
			reg = /[^0-9.,]/;
			regAll = /[^0-9.,]/g; 
			break;
		default:
			break;
		}
		input.bind('keyup', function(e){
			var code;
			if (!e) var e = window.event;
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			if(code == keyCodes.CTRL){
				Utils._CTRL_PRESS = false;
			}
			if(code == keyCodes.SHIFT) {
				Utils._SHIFT_PRESS = false;
			}
		});
		input.bind('keydown', function(e){
			var code;
			if (!e) var e = window.event;
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character =(code == null || code == undefined)? fromKeyCode(32).split(' ')[0]:fromKeyCode(code).split(' ')[0];			
			if ((code >=96 && code <= 105) || (code>=48 && code<=57) || code==null || code==0 || code== keyCodes.BACK_SPACE || 
					code == keyCodes.TAB || code==keyCodes.ENTER || code==keyCodes.ESCAPE || code == keyCodes.DELETE ||
					(Utils._SHIFT_PRESS && code == keyCodes.HOME) || code == keyCodes.SHIFT || code == keyCodes.HOME || code == keyCodes.END ||
					code==keyCodes.CTRL || code == keyCodes.ARROW_LEFT || code == keyCodes.ARROW_RIGHT || code == keyCodes.ARROW_UP || code == keyCodes.ARROW_DOWN ||
					(Utils._CTRL_PRESS && (character  == 'v' || character  == 'V'))){
				if(code == keyCodes.CTRL){
					Utils._CTRL_PRESS = true;
				}
				if(code == keyCodes.SHIFT) {
					Utils._SHIFT_PRESS = true;
				}
				return true;
			} else if (reg.test(character) || (Utils._SHIFT_PRESS && !/[^0-9]/.test(character))) {
				return false;
			}else{
				return true;
			}
		});
		input.bind('paste', function(){			
			var tmAZ = setTimeout(function(){
				input.val(input.val().replace(regAll,''));
				clearTimeout(tmAZ);
			},200);
		});
	},
	/*
	 * @author:anhhpt
	 * @description : do index trong map EasyUiCommon._mapNewDataSubGrid1 va _mapNewDataSubGrid2 [indexRow, data] de load len datagrid khong dung 
	 *  khi delete 1 dong tren data grid man hinh, nen chinh lai 
	 * */
	ajustIndex:function(mapData){
		var result = new Map();
		var key = mapData.keyArray;
		var index = 0;		
		
		for(var i = 0 ; i < key.length ; i ++){		
			var data = mapData.get(key[i]);
			
			result.put(index,data);
			index++;
		}
		return result;
	},
	/*
	 * @author:anhhpt
	 * @description : do index trong map EasyUiCommon._mapProductCodeStr1 va _mapProductCodeStr2 [indexRow, data] de load len datagrid khong dung 
	 *  khi delete 1 dong tren data grid man hinh, nen chinh lai 
	 *  @params : 
	 *  	mapData : EasyUiCommon._mapProductCodeStr1 hoac _mapProductCodeStr2
	 * */
	ajustIndexCode:function(mapData){
		var result = new Map();		
		mapData = EasyUiCommon.ajustIndex(mapData); // hieu chinh lai index dung voi tren data grid chuong trinh khuyen mai
		var key = mapData.keyArray;	
		
		for(var i = 0 ; i < key.length ; i ++){		
			
			//lay danh sach ten san pham mua
			var text = mapData.get(key[i]);				
			
			var strCodeProduct = text.substring(0,text.indexOf("EasyUiCommon.showGridDialog("));
			var strShowDialog =  text.substring(text.indexOf("EasyUiCommon.showGridDialog("),text.length);
			var str = strShowDialog.split(",");
			
			var strFinal = strCodeProduct + "EasyUiCommon.showGridDialog('" + key[i] +"'" ;
			for(var index=1 ; index < str.length ; index++){
				strFinal += ","+str[index];
			}
			
			// remplace "return EasyUiCommon.showGridDialog('0','saleQty',msgSoLuong,'numberbox',true,true,true)" by index;
			
			result.put(i,strFinal);
		}

		return result;
	}
};
