/**
 * Portfolito management customers.
 * @author tientv11, tulv2
 * @sine 05/05/2014
 */
var Customer = {
	_countType: null,
	//_loading: null,
	_xhrSave: null,
	_isShowDlg: false,
	_loading: true,
	_approve: null,
	_basicMode : true,
	_latLngMap : new Map(),
	_hiddenColumnCheckBox:false, //anhhpt: phat trien chuc nang duyet nhieu Khach Hang
	titleSaleGroup: null,
	msgCfmDelPos: null,
	_singleSelect:false,//anhhpt -- update: set default false: haupv3
	statusType:{ // anhhpt: defined bien enum cho combobox 'Trang thai'
		RUNNING:1,
		INACTIVE:0,
		DRAFT:2,
		REJECT:3
	},
	action:{
		REJECT_MULTI:3,
		APPROVE_MULTI:1,
		REMOVE_MULTI:-1
		
	},
	_WAITING : "WAITING",
	_REJECT : "REJECT",
	_COUNT_REJECT : new Map(),
	_COUNT_WAITING : new Map(),
	mapCheckRow : new Map(), //anhhpt: luu danh sach dong da check
	_isManager: null,
	resize: function() {
		var hSidebar3=$('#tree').height();
		var hSidebar1=$('.Content3Section').height();
		if(hSidebar3> 650) {
			$('.ReportTree2Section').css('height', 'auto');	
		} else {
			if(hSidebar3 <  hSidebar1) {
				if(hSidebar1 < 700) {
					$('.ReportTree2Section').height(hSidebar1-60);
				} else {
					$('.ReportTree2Section').height(650);
				}
			} else {
				if(hSidebar3 < 300) {
					$('.ReportTree2Section').height(300);
				} else {
					$('.ReportTree2Section').css('height', 'auto');	
				}
			}
		}
		var hSidebar2=$('.Sidebar1Section').height();
		if( hSidebar1 > hSidebar2 ) {
			$('.Content1Section').height(hSidebar1);
		}
		else $('.Content1Section').height(hSidebar2);
		return ;
	},
	importCustomer:function(){
		$('#importFrm').attr("action","/catalog/customer/import-excel");
		ReportsUtils.uploadExcel(function(){
			$("#searchCustomerGrid").datagrid("reload");
		});
	},
	getDataFilter : function(){
		//Tim kiem theo thuoc tinh dong - haupv3
		var arr1 = new Array();
		var arr2 = new Array();
		var arrMultiSize = new Array();
		if(Customer._basicMode == false){
			var i = 0;
			$('.attributeCls').each(function() {
				var objectId = '#' + $(this).attr('id');
				var type = $(objectId).attr('multiple');
				var idx = objectId.split('_')[1];
				if(Utils.isEmpty($('#attH_' + idx).val())){
					arr1[i] = " ";
				}else{
					arr1[i] = $('#attH_' + idx).val();
					
				}
				
				if (type != null && type != undefined && type == 'multiple') {
					if(!Utils.isEmpty($(objectId).combobox('getValues'))){
						arr2[i] = $(objectId).combobox('getValues');
						arrMultiSize[i] = $(objectId).combobox('getValues').length;
					}else{
						arr2[i] = " ";
						arrMultiSize[i] = 1;
					}
				} else {
					if(!Utils.isEmpty($(objectId).val())){
						arr2[i] = $(objectId).val();
						arrMultiSize[i] = 1;
					}else{
						arr2[i] = " ";
						arrMultiSize[i] = 1;
					}
				}
				if (arr2[i] == null || arr2[i] == '-1') {
					arr2[i] = " ";
					arrMultiSize[i] = 1;
				}
				i++;
			});		
		}
		var saleGroupId = null;
		try{
			saleGroupId = $('#saleGroupId').combo('getValue');
		}catch(e){
			
		}
		var dataModel = new Object();
		
		dataModel.lstAttIdArray = arr1.toString();
		dataModel.lstAttValueArray = arr2.toString();
		dataModel.lstMultiSizeArr = arrMultiSize.toString();
		if (saleGroupId != null && saleGroupId > 0){
			dataModel.saleGroupId = saleGroupId;
		}
		dataModel.customerCode = $('#cusCodeName').val();
		dataModel.customerName = $('#cusNamePhone').val();
		
		dataModel.cusStaffManager = $('#cusStaffManager').val();
		var lstCt = '';
		var tmpLt = $('#listCustomerTypeId').val();
		if(!Utils.isEmpty(tmpLt)){
			for(var i=0; i<tmpLt.length; i++){
				lstCt += tmpLt[i];
				if(i<tmpLt.length -1){
					lstCt += ",";
				}
			}
		}
		dataModel.listCustomerTypeId = lstCt;
		dataModel.status = $('#status').val();
		dataModel.address = $('#address').val();
		dataModel.seachForMap = false;
		return dataModel;
	},
	searchCustomer: function() {		
		Customer.mapCheckRow.clear();
		Customer.showColumnCheckBox(); //anhhpt: hien column check box
		var dataModel = Customer.getDataFilter();
		Customer.loadDataGrid(dataModel);
	},	
	exportExcel:function(){
		$('#errExcelMsg').html('').hide();
		$('#errMsg').html('').hide();
		$.messager.confirm(msgXacNhan, man_cus_msg_exp, function(r){
			if (r){
				$('.VinamilkTheme #divOverlay').show();
				var dataModel = Customer.getDataFilter();
				var url = "/catalog/customer/export-excel";
				ReportsUtils.exportExcel(dataModel, url, 'errExcelMsg', true);
			}
		});
 		return false;
 	},
 	approve: function(){
 		Customer._approve = Customer.action.APPROVE_MULTI;
 		Customer.updateCustomerInfo();
 	},
 	reject: function(){
 		Customer._approve = Customer.action.REJECT_MULTI;
 		Customer.updateCustomerInfo();
 	},
 	remove: function(){
 		Customer._approve = Customer.action.REMOVE_MULTI;
 		Customer.updateCustomerInfo();
 	},
 	getImportTemplate: function() {
		var params = new Object();
		var url = "/customer/get-import-template";
		CommonSearch.exportExcelData(params, url, 'errExcelMsg', true);
 	},
	showCustomerEdit: function(customerId){
		$('.VinamilkTheme #divOverlay').show();
		window.location.href = WEB_CONTEXT_PATH+'/catalog/customer/detail?customerId=' + customerId;
		return false;
	},
	viewBigMap : function() {
		var arrParam = new Object();
		arrParam.lat = $('#lat').val().trim();
		arrParam.lng = $('#lng').val().trim();
		if(Number(arrParam.lat) == -1 && Number(arrParam.lng) == -1){
			arrParam.lat = null;
			arrParam.lng = null;
		}
		ViettelMap.viewBigMap(arrParam, man_cus_map_pos_cus);
		$('.dialog-toolbar').css({'float':'right', 'background-color':'transparent'});
	},	
	updateCustomerInfo: function(){
		var dataModel=new Object();
		dataModel.error = false;
		if(Customer._approve == Customer.action.REJECT_MULTI || Customer._approve == Customer.action.REMOVE_MULTI){
			dataModel.customerId = $('#customerId').val().trim();
		}else{
			dataModel = ValidateUtils.validate('#errChangeCustomer','.customerChangeForm');
		}
		if(dataModel.error){			
			return false;
		}
		
		var msg = '';
		
		if(msg.length == 0){
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('customerCode', jsp_sale_product_makhachhang, Utils._CODE);
		}

		if(msg.length == 0){
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('customerName', catalog_customer_name, Utils._SAFE);
		}
		
		if(msg.length == 0){
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('address', SuperviseManageRouteCreate_customerAddress, Utils._SAFE);
		}		

		if(msg.length == 0){
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('mobilePhone', phone, Utils._SAFE);
		}	
		
		
		if(!isNullOrEmpty(msg)){
			$('#errChangeCustomer').html(msg).show();
//			Utils.showMessage(msg);//LamNH
			return false;
		}
		
		
		dataModel.customerCode = $('#customerCode').val().trim();
		
		dataModel.status = Customer._approve;
		if(Customer._approve==null){
			dataModel.status = $('#status').val().trim();
		}
		if ($('#customerType').val() != null && $('#customerType').val() != '' && parseInt($('#customerType').val()) >= -1){
			dataModel.customerTypeId = $('#customerType').val();
		}
		dataModel.address = $('#address').val().trim();
		dataModel.description = $('#description').val().trim();
		
		Utils.addOrSaveData(dataModel, "/catalog/customer/saveorupdate", Customer._xhrSave, 'errChangeCustomer',function(data){		
			if ($('#checkAdminRole').val() != null  && $('#checkAdminRole').val() == 'true'){
				
			}else{
				if (data.isCreate != null && data.isCreate == true){
					$('#notifyForSuperviser').html(msgNotifyForSuperviser).show();
//					Utils.showMessage(msgNotifyForSuperviser);//LamNH
				}
			}
			setTimeout(function(){
				if(Customer._approve==3){
					Customer.cancelCustomerInfo();
				}else if (Customer._approve === -1){
					gotoPage(WEB_CONTEXT_PATH+"/catalog/customer/info");
				}else{
					gotoPage(WEB_CONTEXT_PATH+"/catalog/customer/detail?customerId=" + data.customerId);
				}
					
			},2500);
			
		});	
	},
	/**
	 * Kiem tra xem da co khach hang voi ten, sdt nay chua
	 * @author haupv3
	 * @since 06/11/2014
	 * **/
	checkAvailableCustomer : function(){
		
		var customerId = $('#customerId').val();
		var params = new Object();
		params.customerName = $('#customerName').val();
		params.phoneNumber = $('#mobilePhone').val();
		var url = '/catalog/customer/check-cus-available';

		if(Utils.isEmpty(customerId)){
			Utils.getJSONDataByAjaxNotOverlay(params,url, function(data){
				if(data.isAvail == true || data.isAvail == 'true'){
					var msgT = confirm_avail_cus_in_sys + "</br>"; 
					msgT +="</br>";
					msgT += "<div style='max-height:250px;height: auto;overflow:auto'>";
					for(var i=0; i<data.lstCus.length; i++){
						var obj = data.lstCus[i];
						msgT += " <b>- "+catalog_customer_name+" :</b> "+ obj.customerName+" </br>";
						msgT += "<b>- "+routing_mobile_phone_number+" :</b> "+ obj.mobiphone+" </br>";
						msgT += "<b>- "+catalog_customer_address+" : </b>"+ obj.address+" </br>";
						msgT += "</br>";
					}
					msgT += "</div>";
					msgT += "<b>"+confirm_avail_create_new_and_ignoore +"</b>";
					$.messager.confirm(msgXacNhan, msgT, function(r){
						if (r){
							Customer.updateCustomerInfo();
						}
					});
				}else{
					Customer.updateCustomerInfo();
				}
			});

		}else{
			Customer.updateCustomerInfo();
		}
	},
	cancelCustomerInfo:function(){
 		window.location.href = WEB_CONTEXT_PATH+'/catalog/customer/info';
	},
	activeTab1:function(){
		Customer.hideTab();
		$('#tab1').addClass('Active');
		$('#content1').show();
	},
	activeTab2:function(){
		Customer.hideTab();
		$('#tab2').addClass('Active');
		$('#content2').show();
		$('#errChangeCustomer').hide();
	},
	hideTab:function(){
		$('#tab1').removeClass('Active');
		$('#tab2').removeClass('Active');
		$('#content1').hide();
		$('#content2').hide();
	},
	checkEmptyUrl: function(url){
		if(url==null || url == undefined || url == ''){
			return false;
		}
	},
	saveProperty: function() {
		var arr1 = [];
		var arr2 = [];
		var i = 0;
		$('.attributeCls').each(function() {
			var objectId = '#' + $(this).attr('id');
			var type = $(objectId).attr('multiple');
			var idx = objectId.split('_')[1];
			arr1[i] = $('#attH_' + idx).val();
			if (type != null && type != undefined && type == 'multiple') {
				arr2[i] = $(objectId).combobox('getValues');
			} else {
				arr2[i] = $(objectId).val();
			}
			if (arr2[i] == null || arr2[i] == '-1') {
				arr2[i] = '';
			}
			i++;
		});		
		var dataModel = new Object();
		dataModel.attValueArray = arr2;
		dataModel.attIdArray = arr1;
		dataModel.customerId = $('#customerId').val();
		Utils.addOrSaveData(dataModel, "/catalog/customer/saveproperty",
				Customer._xhrSave, 'errMsgProperty', function(data) {
				if(data.error != null && data.error == false){
					$('#successMsg').html(msgCommon1).show();
//					Utils.showMessage(msgCommon1);//LamNH
				} else {
					$('#errMsgProperty').html(data.errMsg).show();
//					Utils.showMessage(data.errMsg);//LamNH
				}
			}, null);
		return false;
	},
	deleteLocation:function(){
		if(ViettelMap._listOverlay != null && ViettelMap._listOverlay != undefined){
			$.messager.confirm(msgXacNhan, man_cus_com_del_position, function(r){
				if (r) {
					ViettelMap.clearOverlays();
					$('#lat').val('');
					$('#lng').val('');
				}
			});
		}
	},
	customerDelete: function(customerId){
		var dataModel = new Object();
		dataModel.customerId = customerId;
		$.messager.confirm(msgXacNhan, man_cus_com_del, function(r){
			if (r){
				Utils.addOrSaveData(dataModel, "/catalog/customer/delete", Customer._xhrSave, 'errMsgStaff',function(data){
					if(data.error != null && data.error == false){
						$('#deleteMsgCustomer').html(man_cus_msg_del_suc).show();
//						Utils.showMessage(man_cus_msg_del_suc);//LamNH
						setTimeout(function(){
							$('#deleteMsgCustomer').html('').hide();
//							Utils.hideMessage();//LamNH
						}, 3000);
						$('#searchCustomerGrid').datagrid('load');
					} else {
						$('#errMsgCustomer').html(man_cus_msg_del_fai + data.errMsg).show();
//						Utils.showMessage(man_cus_msg_del_fai + data.errMsg);//LamNH
					}
				},null,null, true);
			}
		});
	},
	/**
	 * Tai mau file import
	 * @author haupv3
	 * @since 16 July 2014
	 * **/
	downloadImportTemplate:function(){
		var url='/catalog/customer/export-template-for-import';

		if(CommonSearch._xhrReport != null){
			CommonSearch._xhrReport.abort();
			CommonSearch._xhrReport = null;
		}
		CommonSearch._xhrReport = $.ajax({
			type : "POST",
			url : url,
			dataType: "json",
			success : function(data) {
				hideLoadingIcon();	
				if(data.error && data.errMsg!= undefined){
					$('#'+ errMsg).html(Warehouse._xuatfileloi + escapeSpecialChar(data.errMsg)).show();
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						$('#'+ errMsg).html(Warehouse._khongcodulieu).show();
					} else{
//						window.location.href = data.view;
						//Begin anhdt10 - fix attt - dua ra acoutn dowload
						window.location.href =WEB_CONTEXT_PATH + "/commons/downloadFile?file="+data.view;
						//End anhdt10
						setTimeout(function(){ 
	                        CommonSearch.deleteFileExcelExport(data.view);
	                  },300000);
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorDivThrown) {				
			}
		});
		return false;
	},
	loadDataGrid:function(params, callbackSuccess){
		var titleEdit = '';
		if ($('#isManager').val() == 'false'){
			titleEdit = format(ACTION_INSERT, 'href="'+WEB_CONTEXT_PATH +'/catalog/customer/detail"');
		}
		var widthUnit = ($(window).width() - 0)/585;
		
		$('#searchCustomerGrid').datagrid({
			url : '/catalog/customer/search',
			scrollbarSize : 0,
			//queryParams:ValidateUtils.validate('#errMsg','.CustomerSearchForm'),
			queryParams: params,
//			fitColumns : false,
			fitColumns : false,
			singleSelect : Customer._singleSelect,
			pagination : true,
			rownumbers : true,	
			//anhhpt: phat trien chuc nang duyet nhieu Khac Hang
			selectOnCheck:true, //If set to true, clicking a checkbox will always select the row
			checkOnSelect:false, // If false, the checkbox is only checked/unchecked when the user clicks exactly on the checkbox.
			
			width: $('#boxBodyTable').width() - 10,
//			autoWidth: false,
			
			frozenColumns : [[
				//them column check box, chi hien ra khi chon 'Du Thao'
				{field:'id',hidden:Customer._hiddenColumnCheckBox,width : 20*widthUnit, checkbox:true},
				{field : 'idEdit',title : titleEdit,resizable : false,width : 25*widthUnit, align : 'center',
					formatter : function(value,row,index) {
						if ($('#isManager').val() == 'false' || isDmsLiteRole1){
							return format(ACTION_EDIT,'onclick="Customer.showCustomerEdit('+ Utils.XSSEncode(row.id)+ ')"');					
						}else{
							return format(ACTION_VIEW,'onclick="Customer.showCustomerEdit('+ Utils.XSSEncode(row.id)+ ')"');
						}
					}
				},
				{field : 'customerCode',title : jsp_sale_product_customer_code,width : 60*widthUnit,
					formatter : function(value, rowData) {
						if (rowData.customerCode != undefined && rowData.customerCode != null)
							return Utils.XSSEncode(rowData.customerCode);
						else
							return '';
					}	
				},
				{field : 'customerName',title :customerName,width : 95*widthUnit,
					formatter : function(value, rowData) {
						if (rowData.customerName != undefined && rowData.customerName != null)
							return Utils.XSSEncode(rowData.customerName);
						else
							return '';
					}	
				},
				{field : 'customerType',title : PromotionCatalog_typeClient ,width : 70*widthUnit,
					formatter : function(value, rowData) {
						if (rowData.channelTypeName != undefined && rowData.channelTypeName != null){
							return Utils.XSSEncode(rowData.channelTypeName);
						}else{
							return '';
						}
					}	
				},
				]],
				columns:[[
                    {field : 'address',title :msgTuyen3,width : 115*widthUnit,
                        formatter : function(value, rowData) {
                            if (rowData.address != undefined && rowData.address != null){
                                return Utils.XSSEncode(rowData.address);
                            }else{
                                return '';
                            }
                        }
                    },
				{field : 'mobiphone',title : phone,width : 65*widthUnit, align: 'right',
					formatter : function(value, rowData) {
						if (rowData.mobiphone != undefined && rowData.mobiphone != null){
							return Utils.XSSEncode(rowData.mobiphone);
						}else{
							return '';
						}
					}	
				},
				{field : 'status',title : msgTrangThai,width : 50*widthUnit, align : 'center', 
					formatter:function(	value, row,index) {	
						if(value == Customer.statusType.DRAFT){
							return msgDuThao;
						}else if(value == Customer.statusType.RUNNING){
							return msgHoatDong;
						}else if(value == Customer.statusType.INACTIVE){
							return msgTamNgung;
						}else{
							return 'Từ chối';
						}
					}
				},
				{field : 'staff',title : msgNhanVienPhuTrach,width : 80*widthUnit,resizable : false,
					formatter : function(value,row,index) {
						return Utils.XSSEncode(row.managerStaff);	
					}
				},
				{field : 'saleGroup',title : Customer.titleSaleGroup,width : 80*widthUnit,resizable : false,
					formatter : function(value,row,index) {
						return Utils.XSSEncode(row.saleGroupName);	
					}
				},
				]],
				onLoadSuccess : function(data) {
					Customer.resizeNumRowOfGrid('#searchCustomerContainerGrid');
					$('#searchCustomerGrid').datagrid('resize',{width:$('#searchCustomerContainerGrid').width()-10});
					var status = $('#status').val().trim();
					if(status==Customer.statusType.DRAFT || status==Customer.statusType.REJECT){
						$('#searchCustomerGrid').datagrid('hideColumn','customerCode');
					}else{
						$('#searchCustomerGrid').datagrid('showColumn','customerCode');
					}	
					$('input[name="id"]').each(function(){
						 var temp = Customer.mapCheckRow.get($(this).val());
			 			 if(temp!=null){
			 				 $(this).attr('checked','checked');
			 			 } 						 
					});
					 
					var length = 0;
			 	    $('input[name="id"]').each(function(){
			 	    	if($(this).is(':checked')){
			 	    		++length;
			 	    	}	    		
			 	    });	    	
			 	    if(data.rows.length==length){
			 	    	$('.datagrid-header-check input').attr('checked','checked');
			 	    }else{
						$('.datagrid-header-check input').removeAttr('checked');
			 	    }
			 	    if(data.rows == null || data.rows == undefined || data.rows.length == 0){
			 	    	$('.datagrid-header-check input').removeAttr('checked');
			 	    }
			 	    
			 	    var _status = $('#status').val();

			 	    if(Number(_status) == Customer.statusType.REJECT || Number(_status) == Customer.statusType.DRAFT){
			 	    	$('#btnFunctions').hide();
			 	    }else if(data.rows.length >0){
			 	    	$('#btnFunctions').show();
			 	    }
			 	    
			 	    if (callbackSuccess != null){
			 	    	callbackSuccess.call(this);
			 	    }
			 	    if (Customer._isManager != null && Customer._isManager){
			 	    	$('#btnFunctions').hide();
						$('#searchCustomerGrid').datagrid('hideColumn', 'id');
			 	    }
			 	    
			 	    //moi bo sung
			 	    if (data != null && data.posRes != null){
			 	    	$('#positionRes').html(data.posRes);
			 	    }
				},
				//anhhpt: set event for check box
				onCheck : function (rowIndex,rowData){				
					Customer.mapCheckRow.put(rowData.id,rowData);	
					if(rowData.status == Customer._WAITING){
						if(Utils.isEmpty(Customer._COUNT_WAITING.get(rowData.id))){
							Customer._COUNT_WAITING.put(rowData.id, rowData.id);
						}
					}

					if(rowData.status == Customer._REJECT){
						if(Utils.isEmpty(Customer._COUNT_REJECT.get(rowData.id))){
							Customer._COUNT_REJECT.put(rowData.id, rowData.id);
						}
					}
				},
				onUncheck:function(rowIndex,rowData){
					Customer.mapCheckRow.remove(rowData.id);
					if(rowData.status == Customer._WAITING){
						if(!Utils.isEmpty(Customer._COUNT_WAITING.get(rowData.id))){
							Customer._COUNT_WAITING.remove(rowData.id);
						}
					}
					
					if(rowData.status == Customer._REJECT){
						if(!Utils.isEmpty(Customer._COUNT_REJECT.get(rowData.id))){
							Customer._COUNT_REJECT.remove(rowData.id);
						}
					}
				},
				onCheckAll:function(rows){
					if($.isArray(rows)) {
				  		for(var i = 0; i < rows.length; i++) {				  	
				  			Customer.mapCheckRow.put(rows[i].id, rows[i]);
				  			
				  			if(rows[i].status == Customer._REJECT){
				  				if(Utils.isEmpty(Customer._COUNT_REJECT.get(rows[i].id))){
				  					Customer._COUNT_REJECT.put(rows[i].id, rows[i].id);
				  				}
				  			}else if(rows[i].status == Customer._WAITING){
								if(Utils.isEmpty(Customer._COUNT_WAITING.get(rows[i].id))){
									Customer._COUNT_WAITING.put(rows[i].id, rows[i].id);
								}
							}
				  		}
				  	}
				},
				onUncheckAll:function(rows){
					if($.isArray(rows)) {
				  		for(var i = 0; i < rows.length; i++) {
				  			Customer.mapCheckRow.remove(rows[i].id);
				  			
				  			if(rows[i].status == Customer._REJECT){
				  				if(!Utils.isEmpty(Customer._COUNT_REJECT.get(rows[i].id))){
				  					Customer._COUNT_REJECT.remove(rows[i].id);
				  				}
				  			}else if(rows[i].status == Customer._WAITING){
								if(!Utils.isEmpty(Customer._COUNT_WAITING.get(rows[i].id))){
									Customer._COUNT_WAITING.remove(rows[i].id);
								}
							}
				  		}
				  	}
				}
			});

	},
	loadCbx4SaleGroup: function(){
		var params = {};
		var url = '/commons/sale-group/get-list-sale-group';
		Utils.getJSONDataByAjax(params, url, function(data){
			$('#saleGroupId').combobox({
				data: Customer.processData(data),
				valueField: 'saleGroupId',
				textField: 'saleGroupName',
				filter: function(q, row){
					q = new String(q).toUpperCase();
					return row['saleGroupCode'].toUpperCase().indexOf(q) >= 0 || row['saleGroupName'].toUpperCase().indexOf(q) >= 0;
				},
				formatter: function(row){
					return '<span style="font-weight:bold">' + Utils.XSSEncode(row.saleGroupCode) + '</span><br/>' + '<span >' + Utils.XSSEncode(row.saleGroupName) + '</span>';
				},
				onLoadSuccess: function(){
					var row = $('#saleGroupId').combobox('getData');
					if(row != null && row.length > 0){
 						$('#saleGroupId').combobox('select', row[0].saleGroupId);
 					}else{
 						$('#saleGroupId').combobox('select', '');
 					}
				}
			});
		});
	},
	processData: function(data){
		if (data != null && data.length > 0){
			var lst = [];
			//if (data.length != 1){
				var o = {
					saleGroupId: -1,
					saleGroupCode: '--' +msgChonTat+ '--',
					saleGroupName: '--' +msgChonTat+ '--',
				};
				lst.push(o);
			//}
			for (var i=0, size = data.length; i< size; i++){
				var o = Customer.createObject4Sg(data[i]);
				lst.push(o);
			}
			return lst;
		}
		data = [];
		return data;
	},
	createObject4Sg: function(e){
		var o = {
				
		};
		if (e != null){
			o.saleGroupId = e.salegroupId;
			o.saleGroupCode = e.salegroupCode;
			o.saleGroupName = e.salegroupName;
		}
		return o;
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
			
		}
	},
	/*
	 * @auhtor: anhhpt:
	 * @since:22/09/2014
	 * @description : khi chon 'Du Thao' tu combobox, hien them colum check box
	 * @update: cho hien thi check box trong moi dieu kien
	 * @author: haupv3
	 * @since: 06/11/2014
	 * */
	showColumnCheckBox:function(){
		var status = $('#status').val().trim();
		Customer._hiddenColumnCheckBox = false; // hien column check box 	
		Customer._singleSelect = false;
		if(status==Customer.statusType.DRAFT || status==Customer.statusType.REJECT ){
			$('#selectClient').show();
			if (status==Customer.statusType.REJECT){
				$('#selectClient #btnReject').hide();
			}else{
				$('#selectClient #btnApprove').show();
				$('#selectClient #btnReject').show();
			}
		}else{
			$('#selectClient').hide();
		}	
	},
	/*
	 * @auhtor: anhhpt:
	 * @since:22/09/2014
	 * @description : duyet cac Khach Hang duoc chon tu check box
	 * 				: open mot dialog chua ma kh tu dong  
	 * */
	approveMultiClient:function(){			
		// kiem tra trong check list co chon chua 
		$('#errExcelMsg').html('');
		$('#errMsgGenCode').html('');
		$('#sucExcelMsg').html('');
//		Utils.hideMessage();//LamNH
		if(Number(Customer.mapCheckRow.keyArray.length) <= 0){
			$('#errExcelMsg').html(msgTuyenErr2).show();
//			Utils.showMessage(msgTuyenErr2);//LamNH
			return false;
		}
		
		Customer.openGenCodeDialog();			
	},
	/*
	 * @auhtor: anhhpt:
	 * @since:22/09/2014
	 * @description : tu choi cac Khach Hang duoc chon tu check box, chuyen status trong DB sang gia tri 3
	 * */
	rejectMultiClient:function(){	
		// kiem tra trong check list co chon chua 
		$('#errExcelMsg').html('');
		$('#errMsgGenCode').html('');
		$('#sucExcelMsg').html('');
//		Utils.hideMessage();//LamNH
		if(Number(Customer.mapCheckRow.keyArray.length) <= 0){
			$('#errExcelMsg').html(msgTuyenErr2).show();
//			Utils.showMessage(msgTuyenErr2);//LamNH
			return false;
		}
		
		var params = new Object();
		params.status = Customer.action.REJECT_MULTI;
		params.lstCustomerId = Customer.mapCheckRow.keyArray.toString();
 		Customer.updateMultiCustomerInfo(params);
	},
	removeMultiClient:function(){	
		// kiem tra trong check list co chon chua 
		$('#errExcelMsg').html('');
		$('#errMsgGenCode').html('');
		$('#sucExcelMsg').html('');
//		Utils.hideMessage();//LamNH
		if(Number(Customer.mapCheckRow.keyArray.length) <= 0){
			$('#errExcelMsg').html(msgTuyenErr2).show();
//			Utils.showMessage(msgTuyenErr2);//LamNH
			return false;
		}
		
		var params = new Object();
		params.status = Customer.action.REMOVE_MULTI;
		params.lstCustomerId = Customer.mapCheckRow.keyArray.toString();
 		Customer.updateMultiCustomerInfo(params);
	},
	/*
	 * @auhtor: anhhpt:
	 * @since:22/09/2014
	 * @description : cap nhat trang thai Khach Hang
	 * */
	updateMultiCustomerInfo:function(params){
		$('#sucExcelMsg').html('');		
		$('#errExcelMsg').html('');		
//		Utils.hideMessage();//LamNH	
		var message =null;
		if(params.status==Customer.action.APPROVE_MULTI){
			message=format(msgBanCoMuon,msgDuyetNhieuKhachHang);
		}else if(params.status == Customer.action.REJECT_MULTI){
			message=format(msgBanCoMuon,msgTuChoiNhieuKhachHang);
		}else if(params.status == Customer.action.REMOVE_MULTI){
			message=format(msgBanCoMuon,msgXoaNhieuKhachHang);
		}
		
		Utils.addOrSaveData(params,'/catalog/customer/approveRejectMultiCustomer', null, 'errMsg',function(data){							
			if(data.error == false){ // neu duyet thanh cong 
				$('#sucExcelMsg').html(data.successMsg).show();
//				Utils.showMessage(data.successMsg);//LamNH
				Customer.mapCheckRow.clear(); // initialize danh sach check box khach hang 
				Customer.searchCustomer();	
			}				
		
		},null,null,null,message,function(data){
			if (data.error == true) { // duyet co loi  	 
				$('#sucExcelMsg').html(data.errorMsg).show();
//				Utils.showMessage(data.successMsg);//LamNH
				Customer.mapCheckRow.clear(); // initialize danh sach check box khach hang 
				Customer.searchCustomer();	
			}	
		});		
		
		$('.easyui-dialog').dialog('close');
	},

	/*
	 * @auhtor: anhhpt
	 * @since:23/09/2014
	 * @description : display dialog ho tro duyet ma khach hang 
	 * */
	openGenCodeDialog:function(){
		$('#errMsgGenCode').html('');
		var params = new Object();
		params.maxLengthCode=50; // chi cho phep hien thi code moi toi da 50 ky tu 
		$('#genCodeEasyUIDialog').dialog({ 
			closed: false,  
			cache: false,  
			modal: true,
			width : 500,
			height: 170,
			onOpen: function(){
				$('#genCodeEasyUIDialog > .panel > .panel-body').css('overflow-x', 'hidden');						
				Utils.getJSONDataByAjax(params,'/catalog/customer/gencodecustomer',function(data){
					$('.easyui-dialog #genCustomerCode').val(data.gencode);
				}); 										
			}
		});
	},
	/*
	 * @auhtor: anhhpt
	 * @since:29/09/2014
	 * @description : validate code  
	 * */
	checkGenCodeCustomer:function(){				
		var str = $('.easyui-dialog #genCustomerCode').val();	
		
		// kiem tra 3 ky tu cuoi la so 
		var length = 3; // chi xu ly 3 so cuoi cung 
		var numberCode = str.substring(str.length-length,str.length);
		var array = numberCode.split('');
		var i = 0;
		for( i = 0 ; i < length ; i++){
			if( Number(array[i]) >=0 ){
				continue;				
			}else{
				break;
			}
		}
				
		if( i < length - 1 ){ // neu 3 ky tu cuoi khong co kieu so
			$('#errMsgGenCode').html(format(msgKyTuSo,3)).show();
//			Utils.showMessage(format(msgKyTuSo,3));//LamNH
			return false;
		}else{			
			var params = new Object();
			params.customerCode = str;
			
			// check ma Khach Hang da ton tai trong he thong 
			Utils.getJSONDataByAjax(params,'/catalog/customer/checkCustomerCode',function(data){				
				if(data.error =="true"){ // ma khach hang da co trong he thong 
					$('#errMsgGenCode').html(data.errMsg).show();
//					Utils.showMessage(data.errMsg);//LamNH
				}else{
					params.status =Customer.action.APPROVE_MULTI;
					params.lstCustomerId = Customer.mapCheckRow.keyArray.toString();
					params.beginNumberCodeCustomer = numberCode; 
					params.customerCode = str.substring(0,str.length-length);
					params.maxLengthCode = str.length; // ma khach hang khong duoc dai hon chuoi ban dau 
					Customer.updateMultiCustomerInfo(params);
				}					
			}); 					
		}
		
		return true;		
	},
	deletePosition: function(customerId){
		if (customerId != undefined && customerId != null && customerId > 0){
			var params = {};
			params.customerId = customerId;
			var url = '/catalog/customer/deleteCusPosition';
			Utils.addOrSaveData(params, url, null, null, function(data){
				if (data.customerId != undefined && data.customerId != null && data.customerId > 0){
					setTimeout(function(){
						Customer.showCustomerEdit(data.customerId);
					}, 500);					
				}
			}, null, null, null, msgConfirmDeletePosition);
		}
	},
	/**
	 * Pop up menu chuc nang
	 * @author haupv3
	 * @since 06/11/2014
	 * **/
	updateFunctions : function(type){
		
		if(Customer.mapCheckRow.valArray.length == 0){
			$('#errMsg').html(msgTuyenErr2).show();
//			Utils.showMessage(msgTuyenErr2);//LamNH
			return false;
		}else{
			
			if(type < 2){
				if(Customer._COUNT_WAITING.valArray.length >0){
					$('#errMsg').html(msgCustomerErr99+" "+Customer._COUNT_WAITING.valArray.length +" "+ msgCustomerErr100).show();
//					Utils.showMessage(msgCustomerErr99+" "+Customer._COUNT_WAITING.valArray.length +" "+ msgCustomerErr100);//LamNH
					return false;
				}else if(Customer._COUNT_REJECT.valArray.length >0){
					$('#errMsg').html(msgCustomerErr99+" "+Customer._COUNT_REJECT.valArray.length +" "+ msgCustomerErr105).show();
//					Utils.showMessage(msgCustomerErr99+" "+Customer._COUNT_REJECT.valArray.length +" "+ msgCustomerErr105);//LamNH
					return false;
				}
			}//else{

				var url = '/catalog/customer/excute-fuctions';
				var params = new Object();
				params.funcType = type;
				params.lstCusId = Customer.mapCheckRow.keyArray; 
				
				if(type <2){//hoat dong, tam ngung kh
					var msgConfirm = msgCustomerErr101 + " "+Customer.mapCheckRow.valArray.length + " "+msgCustomerErr103;
					if(type == 1){
						msgConfirm = msgCustomerErr102 + " "+Customer.mapCheckRow.valArray.length + " "+msgCustomerErr103;
					}

					Utils.addOrSaveData(params, url, null, null, function(data){
						if (!Utils.isEmpty(data.errMsg)){
							setTimeout(function(){
								$('#errMsg').html(data.errMsg).show();
//								Utils.showMessage(data.errMsg);//LamNH
							}, 5000);					
						}else{
							Customer.mapCheckRow.clear();
							$('#searchCustomerGrid').datagrid('load');
						}
					}, null, null, null, msgConfirm);
					
				}else{//doi loai khach hang
					var _cusType = $('#cusTypeEasyUIDialog #popListCustomerTypeId').val();
					
					if(Utils.isEmpty(_cusType) || Number(_cusType) < 0){
						$('#cusTypeEasyUIDialog #errMsg').html(pleaseChooseCustomerType).show();
					}else{
						params.customerTypeId = _cusType;
						Utils.addOrSaveData(params, url, null, null, function(data){
							if (!Utils.isEmpty(data.errMsg)){
								setTimeout(function(){
									$('#errMsg').html(data.errMsg).show();
//									Utils.showMessage(data.errMsg);//LamNH
								}, 5000);					
							}else{
								$('#cusTypeEasyUIDialog').dialog('close');
								Customer.mapCheckRow.clear();
								$('#searchCustomerGrid').datagrid('load');
								$('#successMsg').html(msgCommon1).show();
//								Utils.showMessage(msgCommon1);//LamNH
							}
						}, null, null, null, null);
					}
				}
			//}
		}

	},
	/**
	 * Xoa vi tri cac khach hang duoc chon
	 * @author haupv3
	 * @since: 24/06/2015
	 * **/
	deleteMultiCusPosition : function(){
		if(Customer.mapCheckRow.valArray.length == 0){
			Utils.showMessage(msgTuyenErr2);//LamNH
			return false;
		}else{
			var title = null;
			var msg = Customer.msgCfmDelPos;
			Utils.showMessageConfirm(title, msg, function(){
				var url = '/catalog/customer/clear-multi-cus-position';
				var params = new Object();
				params.lstCusId = Customer.mapCheckRow.keyArray; 
				Utils.addOrSaveData(params, url, null, null, function(data){
					if (!Utils.isEmpty(data.errMsg)){
						setTimeout(function(){
							Utils.showMessage(data.errMsg);//LamNH
						}, 5000);					
					}else{
						$('#searchCustomerGrid').datagrid('load');
						Customer.mapCheckRow.clear();
						Utils.showMessage(msgCommon1);//LamNH
					}
				}, null, null, null, null);
			});
		}
	},
	showDialogFunction : function(){
		if(Customer.mapCheckRow.valArray.length == 0){
			$('#errMsg').html(msgTuyenErr2).show();
			return false;
		}else{
			var msg = msgCustomerErr104 + " "+Customer.mapCheckRow.valArray.length + " "+msgCustomerErr103;
			
			$('#cusTypeEasyUIDialog #popMess').html(msg);
			$('#cusTypeEasyUIDialog').dialog('open');
		}
	},
	viewCustomerPosition : function(){
		setTimeout(function(){
			$('#errMsg').html("").hide();
		}, 5000);
		var dataModel = Customer.getDataFilter();
		dataModel.seachForMap = true;
		var url = '/catalog/customer/search';
		Utils.getJSONDataByAjax(dataModel, url, function(data){
			Customer._latLngMap.valArray.length = 0;
			if($('#mapType').val() != null && parseInt($('#mapType').val()) == 1){
    			ViettelMap.loadMapResource(function(){
        			ViettelMap.loadBigMap('bigMapChange',SuperviseManageRouteCreate._centerLat,SuperviseManageRouteCreate._centerLng,5,null);
        		});
			}
	 	    //ve marker
    		$('#divOverlay').hide();
			$('#cusPositionEasyUIDialog').dialog({
				closed: false,  
		        cache: false,
		        width: $(window).width(),
		        height: $(window).height(),
		        modal: true,
		        onOpen: function(){
	 	    		$('#bigMapChange').height($('#cusPositionEasyUIDialog').height());
		        	var lstType = $('#listCustomerTypeId').val();
		        	var mapUrl = new Map();
		        	mapUrl.valArray.length = 0;
		        	var cusCount = $('#cusLength').val();
		        	var count = 1;
		        	for(var i = 0; i< lstType.length; i++){
	        			if(Number(count) <= Number(cusCount)){
	        				count += 1;
	        			}else{
	        				count = 1;
	        			}
	        			urlImage = WEB_CONTEXT_PATH + '/resources/images/Mappin/cusType/'+count+'.png';
	        			mapUrl.put(lstType[i], urlImage);

		        	}
		        	
		        	if($('#mapType').val() != null && parseInt($('#mapType').val()) == 1){//google map
		        		ViettelMap.loadMapResource(function(){
		        			ViettelMap.clearOverlays();
		        			ViettelMap.loadBigMap('bigMapChange',SuperviseManageRouteCreate._centerLat,SuperviseManageRouteCreate._centerLng,5,null);
		        		});
		        		var zoomFull = 2;
		        		var latPan = 10.79418775;
		        		var lngPan = 106.65682978;
		        		var pointPan;
		        		setTimeout(function(){
		        			pointPan = new google.maps.LatLng(latPan, lngPan);
		        			if(data.rows != null && data.rows != undefined && data.rows.length > 0){
		        				var size = data.rows.length;
		        				for(var i=0; i < size; i++){//for(var i=0; i<Customer._latLngMap.valArray.length; i++){
						        	var cus = data.rows[i];//Customer._latLngMap.valArray[i];
						        	var lat = cus.lat;
						        	var lng = cus.lng;
						        	if(ViettelMap.isValidLatLng(lat, lng) && (lat != -1 && lng != -1)) {
						        		var pt = new google.maps.LatLng(lat, lng);
										var markerContent = '<span id="marker'+cus.id+'" style="position: relative; left: 30px; top: -10px; color: yellow" class="StaffPositionOridnalVisit"></span>';
										var map = ViettelMap._map;
										if(zoomFull == 1){
											map.setZoom(5);
										}else if(zoomFull == 2){
											map.setZoom(6);
										}else if(zoomFull == 3){
											map.setZoom(12);
										}else if(zoomFull == 4){
											map.setZoom(13);
										}
										var mapOptions = {
											zoomControl : true,
											zoomControlOptions : {
												position: google.maps.ControlPosition.RIGHT_CENTER
											},
											panControl : true,
											panControlOptions : {
												position: google.maps.ControlPosition.RIGHT_CENTER
											}
										};
										map.setOptions(mapOptions);
										marker = new google.maps.Marker({
										   position: pt,
									       map: map,
									       icon: mapUrl.get(cus.customerTypeId)//icon: mapUrl.get(cus.customerType.id)
									    });
									    marker.customerId = cus.id;
										marker.lat = cus.lat;
										marker.lng = cus.lng;
										marker.cusCode = cus.customerCode;
										marker.cusName = cus.customerName;
										marker.address = cus.address;
										marker.cusType = cus.channelTypeName;//marker.cusType = cus.customerType.channelTypeName;
										google.maps.event.addListener(marker, "click", function(evt) {
											var info="<strong>" + Utils.XSSEncode(this.cusCode) + "</strong> - <strong>" + Utils.XSSEncode(this.cusName) +"</strong>";
											
											if(this.address != null){
												info += "<br/>";
												info += SuperviseManageRouteCreate_customerAddress+": ";
												info += this.address;
											}
											info += "<br/>";
											info += PromotionCatalog_typeClient + " : ";
											info += this.cusType;
											
											var point = new google.maps.LatLng(this.lat, this.lng);
											if(ViettelMap._currentInfoWindow != null && ViettelMap._currentInfoWindow != undefined) {
												ViettelMap._currentInfoWindow.close();
											}
											var html = '<div style="margin-top: 5px; margin-bottom: 5px;">' + info + '</div>';
											ViettelMap.showInfoWindow(point, html, 200);
										});
						        	}
					        	}//end for loop
			        		}//end check valid
		        		}, 1500);
		        	}else{//viettel map
		        		if(ViettelMap._map!=null){//LOAD BAN DO
		        			ViettelMap.clearOverlays();
		        			if(ViettelMap._currentInfoWindow!=null){
		        				ViettelMap._currentInfoWindow.close(); //Đóng infowindow lại
		        			}
		        		}else{
		        			ViettelMap.loadMapResource(function(){
			        			ViettelMap.loadBigMap('bigMapChange',SuperviseManageRouteCreate._centerLat,SuperviseManageRouteCreate._centerLng,5,null);
			        		});
		        			var interval = window.setInterval( function() {//LOAD LAI BAN DO KHI CHUA CO
		        				if(ViettelMap._map!=null){
		        					ViettelMap.clearOverlays();
		        					if(ViettelMap._currentInfoWindow!=null)//Pop thông tin
		        						ViettelMap._currentInfoWindow.close(); //Đóng infowindow lại
		        					window.clearInterval(interval);
		        				}
		        			});
		        		}
		        		var zoomFull = 2;
		        		var latPan = 10.79418775;
		        		var lngPan = 106.65682978;
		        		var pointPan;
		        		setTimeout(function(){
		        			pointPan = new viettel.LatLng(latPan, lngPan);
		        			if(data.rows != null && data.rows != undefined && data.rows.length > 0){
		        				var size = data.rows.length;
		        				for(var i=0; i < size; i++){//for(var i=0; i<Customer._latLngMap.valArray.length; i++){
					        		var cus = data.rows[i];//Customer._latLngMap.valArray[i];
					        		var lat = cus.lat;
					        		var lng = cus.lng;
					        		if(ViettelMap.isValidLatLng(lat, lng) && (lat != -1 && lng != -1)) {
										var pt = new viettel.LatLng(lat, lng);
										var map = ViettelMap._map;
										//map.setCenter(pointPan);
										if(zoomFull == 1){
											map.setZoom(4);
										}else if(zoomFull == 2){
											map.setZoom(6);
										}else if(zoomFull == 3){
											map.setZoom(6);
										}else if(zoomFull == 4){
											map.setZoom(12);
										}
										var mapOptions = {
											zoomControl : true,
											zoomControlOptions : {
												position: viettel.ControlPosition.RIGHT_CENTER
											},
											panControl : true,
											panControlOptions : {
												position: viettel.ControlPosition.RIGHT_CENTER
											}
										};
										map.setOptions(mapOptions);
						        		var markerContent = '<span id="marker'+cus.id+'" style="position: inherit; top: -24px; left: 7px; z-index: 1000000;color:#fff;font-size:14px;font-weight:bold;" class="StaffPositionOridnalVisit"></span>';
										var marker = new viettel.LabelMarker({
											icon:{
												url :  mapUrl.get(cus.customerTypeId),//url :  mapUrl.get(cus.customerType.id),
											},
											position : pt,
											map : map,
											labelClass : "MarkerLabel",
											labelContent : markerContent,
											labelVisible : true,
											draggable : false,
											labelAnchor : new viettel.Point(25, 0)
										});
										marker.lat = lat;
										marker.lng = lng;
										$('#marker'+cus.id).parent().prev().css('z-index', 10);
										$('#marker'+cus.id).parent().prev().bind('click', cus, function(e) {
											var point = e.data;
											Customer.showDialogCustomerInfo(point);
										});
									    if(ViettelMap._listOverlay == null || ViettelMap._listOverlay == undefined) {
											ViettelMap._listOverlay = new Array();
											ViettelMap._listOverlay.push(marker);
										} else {
											ViettelMap._listOverlay.push(marker);
										}
					        		}//if lat, lng is valit
					        	}//end for
			        		}//end if not null
		        		}, 1500);
		        	}
		        },
		        onClose:function() {}
			});
		});
	},
	showDialogCustomerInfo: function(data) {
		
		if(ViettelMap._currentInfoWindow != null && ViettelMap._currentInfoWindow != undefined) {
			ViettelMap._currentInfoWindow.close();
		}
		if($('#mapType').val() != null && $('#mapType').val() == 0){
			var pt = new viettel.LatLng(data.lat, data.lng);
		}else{
			var pt = new google.maps.LatLng(data.lat, data.lng);
		}
		var info= "";
		if(data.customerCode != null){
			info += "<strong>" + Utils.XSSEncode(data.customerCode) + "</strong> - <strong>" + Utils.XSSEncode(data.customerName) + "</strong><br/>";
		}else{
			info += "<strong>" + Utils.XSSEncode(data.customerName) + "</strong><br/>";
		}
		
		info += SuperviseManageRouteCreate_customerAddress+": ";
		if(data.address != null){
			info += data.address;
		}
		
		info += "<br/>";
		info += PromotionCatalog_typeClient + " : ";
//		info += data.customerType.channelTypeName;
		info += data.channelTypeName;
		
		if($('#mapType').val() != null && $('#mapType').val() == 0){
			var infoWindow = new viettel.InfoWindow({
				content: info,
				maxWidth: 300,
				height:85,
				position: pt,
				zIndex:100000000
			});										
		}else{
			var infoWindow = new google.maps.InfoWindow({
				content: info,
				maxWidth: 300,
				height:85,
				position: pt,
				zIndex:100000000
			});
		}
		
		ViettelMap._currentInfoWindow = infoWindow;
		infoWindow.open(ViettelMap._map);
		
		ViettelMap._map.setCenter(pt);
		//$('.olPopup .olPopupContent').css('height','50');

	},
	CalculateDistance:function(i,k){
		var n,l,h;var j;var c;var e;var a;var m;
		var d=i.lat();
		var b=i.lng();
		var g=k.lat();
		var f=k.lng();
		j=d*(Math.PI/180);
		c=b*(Math.PI/180);
		e=g*(Math.PI/180);
		a=f*(Math.PI/180);
		n=b-f;m=n*(Math.PI/180);
		h=Math.sin(j)*Math.sin(e)+Math.cos(j)*Math.cos(e)*Math.cos(m);
		h=Math.acos(h);
		l=h*180/Math.PI;
		l=l*60*1.1515;
		l=l*1.609344*1000;
		return Math.round(l);
	},
	cal : function(s,e){
		lat1 = s.lat;
		lat2 = e.lat;
		lon1 = s.lng;
		lon2 = e.lng;
		var R = 6371;
		  var a = 
		     0.5 - Math.cos((lat2 - lat1) * Math.PI / 180)/2 + 
		     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
		     (1 - Math.cos((lon2 - lon1) * Math.PI / 180))/2;

	    return R * 2 * Math.asin(Math.sqrt(a));
	}
};