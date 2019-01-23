/**
 * Phan quyen ban san pham.
 * @author lamnh6
 * @sine Jul 08 2015
 */
var ShareProduct = {
	_xhrSave : null,
	_xhrDel: null,	
	_mapSelectedProduct : null,
	confirmMessage: null,
	isInitPage: true,
	isClearAllChecked: null,
	t1: null,
	t2: null,
	t3: null,
	t4: null,
	getParam : function(){
		var params = new Object();
		var categoryStr = '';
		var brandStr = '';
		var arr = $('#category').val();
		if (arr == null) arr = [];
		var n = arr.length;
		for (var i = 0; i < n; i++) {
			if (i != 0) categoryStr += ',';
			categoryStr += arr[i];
		}
		var arr1 = $('#brand').val();
		if (arr1 == null) arr1 = [];
		var n = arr1.length;
		for (var i = 0; i < n; i++) {
			if (i != 0) brandStr += ',';
			brandStr += arr1[i];
		}
		params.categoryStr = categoryStr;
		params.brandStr = brandStr;
		params.staffGroupId = $('#staffGroup').combobox('getValue');
		params.saleStaffId = $('#saleStaff').combobox('getValue');
		params.decentral = $('#decentral').val();
		return params;
	},
	searchProduct: function() {
		ShareProduct._mapSelectedProduct = new Map();
		ShareProduct.isClearAllChecked = true;
		var params = ShareProduct.getParam();
		var url = '/catalog/share-product/search?' + $.param(params,true);
		$('#productGrid').datagrid({url: url} );
		$('.datagrid-row td div input').each(function(){
		    $(this).removeAttr("checked");
		});
		return false;
	},
	getDataComboboxForStaffGroup : function(lstStaffGroup){
		var data = new Array();
		if (lstStaffGroup != null && lstStaffGroup.length > 1){
			var obj = new Object();
			obj.id = -1;
			obj.staffGroupName = msgChonTat;
			obj.staffGroupCode = msgChonTat;
			obj.displayText = msgChonTat; 
			obj.searchText = unicodeToEnglish(msgChonTat);
			obj.searchText = msgChonTat.toUpperCase();
			data.push(obj);
		}
		$.each (lstStaffGroup, function (i) {
			var result = lstStaffGroup[i] ;
			var obj = new Object();
			obj.id = result.id;
			obj.staffGroupName = result.staffGroupName;
			obj.staffGroupCode = result.staffGroupCode;
			obj.displayText = result.staffGroupCode + ' - ' + result.staffGroupName; 
			obj.searchText = unicodeToEnglish(result.staffGroupCode + result.staffGroupName);
			obj.searchText = obj.searchText.toUpperCase();
			data.push(obj);
		});
		return data;
	},
	getDataComboboxForSaleStaff : function(lstSaleStaff){
		var data = new Array();		
		$.each (lstSaleStaff, function (i) {
			var result = lstSaleStaff[i] ;
			var obj = new Object();
			obj.id = result.id;
			obj.staffName = result.staffName;
			obj.staffCode = result.staffCode;
			obj.displayText = result.staffCode + ' - ' + result.staffName; 
			obj.searchText = unicodeToEnglish(result.staffCode + result.staffName);
			obj.searchText = obj.searchText.toUpperCase();
			data.push(obj);
		});
		return data;
	},
	getStaffGroupByAjax : function(){
		ShareProduct._xhrSave = $.ajax({
			type : "GET",
			url : "/catalog/share-product/get-list-staff-group",
			dataType: "json",
			success : function(result) {
				$('#staffGroup').combobox({
					//width:145,
					data:ShareProduct.getDataComboboxForStaffGroup(result.lstStaffGroup),
					valueField: 'id',
					textField: 'staffGroupName',
					formatter: function(row) {
						return '<span style="font-weight:bold">' + Utils.XSSEncode(row.staffGroupCode) + '</span><br/>' + '<span >' + Utils.XSSEncode(row.staffGroupName) + '</span>';
					},
					filter: function(q, row){
						q = new String(q).toUpperCase();
						var opts = $(this).combobox('options');
						return (row['staffGroupCode'].toUpperCase().indexOf(unicodeToEnglish(q))>=0 || row['staffGroupName'].toUpperCase().indexOf(unicodeToEnglish(q))>=0);
					},
					onSelect: function(rec){
	 					var staffGroupId = $('#staffGroup').combobox('getValue');
	 					$.ajax({
	 						type : "GET",
	 						url : "/catalog/share-product/get-list-sale-staff?staffGroupId="+staffGroupId,
	 						dataType: "json",
	 						success : function(result) {
	 							$('#saleStaff').combobox({
	 								//width:145,
	 								data:ShareProduct.getDataComboboxForSaleStaff(result.lstSaleStaff),
	 								valueField: 'id',
	 								textField: 'staffName',
	 								formatter: function(row) {
	 									if(row != null && row != undefined ){
	 										return '<span style="font-weight:bold">' + Utils.XSSEncode(row.staffCode) + '</span><br/>' + '<span >' + Utils.XSSEncode(row.staffName) + '</span>';
	 									}
	 								},
	 								filter: function(q, row){
	 									q = new String(q).toUpperCase();
	 									var opts = $(this).combobox('options');
	 									return row['searchText'].indexOf(unicodeToEnglish(q))>=0;
	 								},
	 				 				onLoadSuccess:function(row){
	 				 					if(row != null && row.length > 0){
	 				 						$('#saleStaff').combobox('select', row[0].id);
	 				 					}else{
	 				 						$('#saleStaff').combobox('select', '');
	 				 					}
//	 				 					$('#productGrid').datagrid({url: url} );
	 				 					if (ShareProduct.isInitPage){
	 				 						ShareProduct.isInitPage = false;
	 				 						var dataModel = ShareProduct.getParam();
		 				 					var _url = '/catalog/share-product/search?' + $.param(dataModel,true);
	 				 						ShareProduct.initGrid(_url);
	 				 					}
	 				 				}
	 							});
	 						},
	 						error:function(XMLHttpRequest, textStatus, errorDivThrown) {
	 							ShareProduct._xhrSave = null;
	 						}
	 					});
	 				},
	 				onLoadSuccess:function(row){
	 					if(row != null && row.length > 0){
	 						$('#staffGroup').combobox('select', row[0].id);
	 						if (row.length == 1){
	 							disableCombo('staffGroup');
	 						}
	 					}
	 				}
				});
				
			},
			error:function(XMLHttpRequest, textStatus, errorDivThrown) {
				ShareProduct._xhrSave = null;
			}
			
		});
	},
	getSaleStaffByAjax : function(){
		var params = {
				
		};
		if ($('#isSupervisor').val() == 'true'){
			params.staffGroupId = $('#staffGroupChooseId').val().trim();
		}
		var url = "/catalog/share-product/get-list-sale-staff";
		var placeholderchooseStaff = ' <s:text name="jsp.report.sale.in.month.cbxNVBHTitle.new"> '
		Utils.getJSONDataByAjax(params, url, function(data){
			$("#chooseSaleStaff").kendoMultiSelect({
				  dataSource: ShareProduct.getDataComboboxForSaleStaff(data.lstSaleStaff),
				  dataValueField: "id",
				  dataTextField: "displayText",
				  placeholder: placeholderchooseStaff,
//				  itemTemplate: kendo.template('#: staffCode# - #: staffName#'),
				  filter: "contains"
			});
		});
	},
	initGrid: function(url){
		var _url = '';
		if (StringUtils.isNullOrEmpty(url)){
			_url = "/catalog/share-product/search";
		}else{
			_url = url;
		}
		$('#productGrid').datagrid({
			url : _url,
			autoRowHeight : false,
			/*rownumbers : true, 		*/
			checkOnSelect :true,
			scrollbarSize:20,
			pageSize:50,
			autoWidth: true,
			/*view: bufferview,*/
			idField:'productId',
//	 		singleSelect:true,
//	 		queryParams:params,
	        fitColumns : true,
	        showFooter : true,
	        width : $(window).width()-50,
	        height: 300,
		    columns:[[
				{field : 'No', title : jspCustomerAttributeSTT, width: 10, align : 'center',
					formatter:function(	value, row, index) {	
						return index +1;
					}	
				},
				{field : 'productCode', title : ShareProduct.t1, width: 40, align : 'left',
					formatter:function(	value, row,index) {	
						return Utils.XSSEncode(value);
					}	
				},
				{field : 'productName', title : ShareProduct.t2, width: 100,
					formatter:function(	value, row,index) {	
//						return Utils.XSSEncode(value);
						return '<span title="'+Utils.XSSEncode(value)+'" >' +StringUtils.getSubStringFromFirst(Utils.XSSEncode(value)) + '</span>';
					}	
				},
				{field : 'category', title : ShareProduct.t3, width: 50, align : 'left',
					formatter:function(	value, row,index) {	
						return Utils.XSSEncode(value);
					}	
				},
				{field : 'brand', title: ShareProduct.t4, width:50, align:'left',
					formatter:function(	value, row,index) {	
						return Utils.XSSEncode(value);
					}	
				},
				{ field: "productId", checkbox:true, width: 50, align : 'center'
				}
		    ]],	
		    onLoadSuccess :function(data){
//		    	setTimout(function(){
		    		if (ShareProduct.isClearAllChecked != null && ShareProduct.isClearAllChecked){
			    		ShareProduct.isClearAllChecked = false;
			    		$('td[field=productId] .datagrid-header-check [type=checkbox]').attr('checked', false);
				    	$('#productGrid').datagrid('clearChecked');
			    	}
			    	
			    	var rows = $('#productGrid').datagrid('getRows');
			    	if (rows != null && rows.length > 0){
			    		for (var i=0, size = rows.length; i< size; i++){
			    			var r = rows[i];
			    			if (r != null && r.config == 1){
			    				if (ShareProduct._mapSelectedProduct == null){
			    					ShareProduct._mapSelectedProduct = new Map();
			    				}
			    				ShareProduct._mapSelectedProduct.put(r.productId, r);
			    			}
			    		}
			    	}
			    	
			    	$('[type=checkbox]').attr('checked', false);
			    	if (ShareProduct._mapSelectedProduct == null){
						ShareProduct._mapSelectedProduct = new Map();
					}else{
						$('input[name="productId"]').each(function(){
							 var temp = ShareProduct._mapSelectedProduct.get($(this).val());
				 			 if(temp!=null){
				 				 $(this).attr('checked','checked');
				 			 } 						 
						});
					}
//		    	}, 100);
		    },
		    onCheck : function (rowIndex,rowData){	
		    	if (ShareProduct._mapSelectedProduct != null){
		    		ShareProduct._mapSelectedProduct.put(rowData.productId, rowData);
		    	}
			},
			onUncheck : function (rowIndex,rowData){	
				if (ShareProduct._mapSelectedProduct != null){
					ShareProduct._mapSelectedProduct.remove(rowData.productId);  		
		    	}
			},
			onCheckAll : function (rows){	
				if (ShareProduct._mapSelectedProduct != null){
					if($.isArray(rows)) {
						for (var i=0, size = rows.length; i< size; i++){
							var rowData = rows[i];
							ShareProduct._mapSelectedProduct.put(rowData.productId, rowData);
						}
					}
		    	}
			},
			onUncheckAll : function (rows){
				if (ShareProduct._mapSelectedProduct != null){
					if($.isArray(rows)) {
						for (var i=0, size = rows.length; i< size; i++){
							var rowData = rows[i];
							ShareProduct._mapSelectedProduct.remove(rowData.productId);
						}
					}
		    	}
			},
			method : 'GET'
	 	});
	},
	shareProduct : function(){
		var title = null;
		var message = ShareProduct.confirmMessage;
		Utils.showMessageConfirm(title, message, function(){
			ShareProduct.processShareProduct();
		});
	},
	processShareProduct: function(){
		var msg = '';
		$('#errMsg').html('').hide();
//		var saleStaffId = $('#chooseSaleStaff').combobox('getValue');
		var multiselect = $("#chooseSaleStaff").data("kendoMultiSelect");
		var lstSaleStaff = multiselect.value();
		
		if(lstSaleStaff != null && lstSaleStaff.length  == 0){
			msg = format(msgErr_required_field,msgPhanQuyen) ;
		}
		var lstProductId = new Array();
		var isCheckAll = $('#checkAll').is(':checked');
		$('.datagrid-row td div input').each(function(){
			if($(this).attr("checked") == "checked"){
				lstProductId.push($(this).val());
			}else{
				
			}
		});
		if(lstProductId.length == 0 && isCheckAll == false){
			msg = format(msgErr_no_select_data,msgPhanQuyen0) ;
		}
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
//		dataModel.saleStaffId = saleStaffId;
		dataModel.lstSaleStaff = lstSaleStaff;
		dataModel.lstProductId = lstProductId;
		dataModel.isCheckAll = isCheckAll;
		Utils.addOrSaveData(dataModel, "/catalog/share-product/share", ShareProduct._xhrSave, 'errMsg',function(data){
			$('#successMsg').html(msgCommon1).show();
			var tm = setTimeout(function(){
				$('#successMsg').html('').hide();
				clearTimeout(tm); 
			}, 3000);
//			$('#productGrid').datagrid('reload');
			ShareProduct.searchProduct();
		});
		return false;
	}
};