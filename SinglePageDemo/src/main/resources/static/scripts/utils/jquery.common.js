var CommonSearchUnitTree = {
	_currentSearchCallback : null,
	params : null,
	_mapCheckProduct:new Map(),
	_xhrReport:null,
	_listCustomer:null,
	searchNVBHUnitTreeDialog : function(callback, params,url, callbackSelect, callbackLoadSuccess) {
// 		if(arrParam == undefined || arrParam ==null) {
//			var arrParam = new Array();
// 		}
// 		var hasStaffType = false;
// 		for(var i = 0; i < arrParam.length; ++i){
// 			if(arrParam[i].name == "staffType"){
// 				hasStaffType = true;
// 				break;
// 			}
// 		}
// 		if(hasStaffType == false){
// 			var param = new Object();
// 			param.name = 'staffType';
// 			//dandt: staffType cua NVBHGTDT 
// 			param.value = 12; //Ca NVBH Va VanSale
// 	 		arrParam.push(param);	
// 		}
 		
		CommonSearchUnitTree.openSearchStyle2EasyUIMutilSelectDialog(msgFormatter9, msgFormatter10, jspValidate5,url,
				callback,"staffCode", "staffName", params, callbackSelect, callbackLoadSuccess);
		return false;

	},
	openSearchStyle2EasyUIMutilSelectDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, params, callbackSelect, callbackLoadSuccess){
		CommonSearchUnitTree.params = null;
		CommonSearchUnitTree._currentSearchCallback = null;
		CommonSearchUnitTree._mapMutilSelect = new Map();
		var html = $('#searchStyle2EasyUIDialogDiv').html();
		$('#searchStyle2EasyUIDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 616,
	        height :'auto',
	        onOpen: function(){
	        	$('#searchStyle2EasyUICode').val('');
				$('#searchStyle2EasyUIName').val('');
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				//end <reset tabindex>
				$('#searchStyle2EasyUICode').focus();
				$('#searchStyle2EasyUIUrl').val(url);
				$('#searchStyle2EasyUICodeText').val(codeFieldText);
				$('#searchStyle2EasyUINameText').val(nameFieldText);
				CommonSearchUnitTree._currentSearchCallback = callback;
				CommonSearchUnitTree.params = params;
				CommonSearchUnitTree._isOpenDialog = true;
				
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				
				$('#seachStyle2EasyUICodeLabel').html(codeText);
				$('#seachStyle2EasyUINameLabel').html(nameText);
				//Utils.bindAutoSearchForEasyUiDlg(); 
				Utils.bindAutoButtonEx('#searchStyle2EasyUIDialog','btnSearchStyle2EasyUI');
				$('#searchStyle2EasyUIGrid').show();
				
//				params.staffType// thuoc tinh nay dinh nghia de hien thi datagrid phu hop
//				if(params.staffType==3){
					$('#searchStyle2EasyUIGrid').datagrid({
						url : url,
						autoRowHeight : true,
						rownumbers : true, 
						checkOnSelect :true,
						singleSelect: true,
						pagination:true,
						pageNumber: 1,
						pageSize:10,
						scrollbarSize : 0,
						fitColumns:true,
						queryParams:params,
						pageList  : [10,20,30],
						width : ($('#searchStyle2EasyUIContainerGrid').width()),
					    columns:[[  
					        {field:codeField,title:codeText,align:'left', width:150, sortable : false,resizable : false, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},  
					        {field:nameField,title:nameText,align:'left', width:400, sortable : false,resizable : false, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},  
					        {field:'id',checkbox:true, align:'center',sortable : false,resizable : false},
					    ]],
					    onSelect : function(rowIndex, rowData) {
					    	if (callbackSelect != null){
					    		callbackSelect.call(this, rowIndex, rowData);
					    	}else{
					    		var selectedId = rowData['id'];
						    	CommonSearchUnitTree._mapMutilSelect.put(selectedId, rowData);
					    	}
					    },
					    onUnselect : function(rowIndex, rowData) {
					    	var selectedId = rowData['id'];
					    	CommonSearchUnitTree._mapMutilSelect.remove(selectedId);
					    },
					    onSelectAll : function(rows) {
					    	if($.isArray(rows)) {
					    		for(var i = 0; i < rows.length; i++) {
					    			var row = rows[i];
					    			var selectedId = row['id'];
							    	CommonSearchUnitTree._mapMutilSelect.put(selectedId, row);
					    		}
					    	}
					    },
					    onUnselectAll : function(rows) {
					    	if($.isArray(rows)) {
					    		for(var i = 0; i < rows.length; i++) {
					    			var row = rows[i];
					    			var selectedId = row['id'];
							    	CommonSearchUnitTree._mapMutilSelect.remove(selectedId);
					    		}
					    	}
					    },
					    onBeforeLoad:function(){
					    	
					    	$('#searchStyle2EasyUIGrid').datagrid('options').singleSelect = (params.staffType == 2);
					    	if(params.staffType == 2){
					    		$('#searchStyle2EasyUIContainerGrid .datagrid-header-check input[type=checkbox]').hide();
					    	}
					    },
					    onLoadSuccess :function(){
					    	
					    	Utils.bindAutoButtonEx('.easyui-dialog','btnSearchStyle2EasyUI');
					    	var easyDiv = '#searchStyle2EasyUIContainerGrid ';
					    	$(easyDiv+'.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
					    	var exitsAll = false;
				    		var runner = 0;
				    		$(easyDiv+'input:checkbox[name=id]').each(function() {
				    			var selectedId = this.value;
				    			if(CommonSearchUnitTree._mapMutilSelect.get(selectedId) != null || CommonSearchUnitTree._mapMutilSelect.get(selectedId) != undefined) {
				    				exitsAll = true;
				    				$('#searchStyle2EasyUIGrid').datagrid('selectRow',runner);
				    			} 
				    			runner ++; 
				    		});
				    		if (exitsAll==false){
				    			$(easyDiv+'td[field=id] .datagrid-header-check input:checkbox').attr('checked', false);
				    			
					    	}
					    	
					    	tabindex = 1;
				    		$('#searchStyle2EasyUIDialog input,#searchStyle2EasyUIDialog select,#searchStyle2EasyUIDialog button').each(function () {
					    		if (this.type != 'hidden') {
						    	    $(this).attr("tabindex", '');
									tabindex++;
					    		}
							});
				    		updateRownumWidthForDataGrid('#searchStyle2EasyUIContainerGrid');
				    		setTimeout(function(){
				    			CommonSearchUnitTree.fitEasyDialog('searchStyle2EasyUIDialog');
				    		},1000);
				    		if (callbackLoadSuccess != null){
				    			callbackLoadSuccess.call(this);
				    		}
					    }
					}); 
				$('#btnSearchStyle2EasyUI').unbind('click');
				$('#btnSearchStyle2EasyUI').bind('click',function(event) {
					var code = $('#searchStyle2EasyUICode').val().trim();
					var name = $('#searchStyle2EasyUIName').val().trim();
					params.staffCode=code;
					params.staffName=name;
					$('#searchStyle2EasyUIGrid').datagrid('load',params);
					$('#searchStyle2EasyUICode').focus();
				});
				$('#btnSearchStyle2EasyUIUpdate').show();
				$('#btnSearchStyle2EasyUIClose').hide();
				$('#btnSearchStyle2EasyUIUpdate').unbind('click');
				$('#btnSearchStyle2EasyUIUpdate').bind('click', function(event) {
					$('#errMsgSearchStyle2EasyUI').html('').hide();
        			if(CommonSearchUnitTree._mapMutilSelect == null || CommonSearchUnitTree._mapMutilSelect.size() <= 0) {
    	        		if (codeFieldText == 'shopCode'){
    	        			$('#errMsgSearchStyle2EasyUI').html('Bạn chưa chọn đơn vị nào. Yêu cầu chọn').show();
    	        		}else if(codeFieldText == 'staffCode'){
    	        			$('#errMsgSearchStyle2EasyUI').html('Bạn chưa chọn nhân viên nào. Yêu cầu chọn').show();
    	        		}else if(codeFieldText == 'productCode'){
    	        			$('#errMsgSearchStyle2EasyUI').html('Bạn chưa chọn sản phẩm nào. Yêu cầu chọn').show();
    	        		}else{
    	        			$('#errMsgSearchStyle2EasyUI').html('Bạn chưa chọn mục nào. Yêu cầu chọn').show();
    	        		}
    	        		return false;
    	        	}
    	        	if (CommonSearchUnitTree._currentSearchCallback != null) {
    	        		CommonSearchUnitTree._currentSearchCallback.call(this, CommonSearchUnitTree._mapMutilSelect.valArray);
    	    			$('#searchStyle2EasyUIDialog').dialog('close');
    	    			CommonSearchUnitTree._mapMutilSelect=null;
    	    		}
				});
	        },
	        onClose : function(){
	        },
	        onDestroy :function() {
	        	var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				CommonSearchUnitTree._currentSearchCallback = null;
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();			
	        }
	    });
		return false;
	},
	getSearchStyleEasyUIGridUrl : function(url,arrParam) {
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date(sysDateFromDB);
		var curTime = curDate.getTime();
		searchUrl+= '?curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		return searchUrl;
	},
	fitEasyDialog:function(objectId){
		if(objectId!=undefined && objectId!=null && objectId!=''){
			objectId="#"+objectId;
		}else objectId=".easyui-dialog";
		$(objectId).each(function(){
			try{
				if($(this).parent().css('display')!='none'){
					var hDialog=parseInt($(this).parent().height());
					var hWindow=parseInt($(window).height());
					if(hDialog>=hWindow){//dialog dài hơn window
						$(this).parent().css('top',0);
					}else{
						var distant=hWindow-hDialog;
						distant=distant/2+document.documentElement.scrollTop;
						$(this).parent().css('top',distant);
						
					}
				}
			}catch(e){}
		});
	}
};
var LanguageMethodObject = {
	swithLanguage: function(lang){
		if (!StringUtils.isNullOrEmpty(lang)){
			var url = '/languageWithNewMethod';
			var params = {
				lang: lang	
			};
			Utils.addOrSaveData(params, url, null, null, function(data){
				if (data != null && data.isOk != null && data.isOk){
					location.reload();
				}
			});
		}
	}
};