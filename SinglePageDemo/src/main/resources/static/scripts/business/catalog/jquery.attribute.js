/**
   Quan ly danh muc thuoc tinh
 * @author tientv11
 * @sine 05/05/2014
 * 
 * @update Quan ly danh muc, thuoc tinh, huong vi
 * @author haupv3
 * @since 21 July 2014
 */
var Attribute = {
		_xhrSave:null,
		_listObject:null,
		_listObjectPop:null,
		_isShowDlg: false,
		_mapValueType : new Map(),
		searchAttribute:function(){
			var attributeCode = $('#attCode').val().trim();
			var attributeName = $('#attName').val().trim();
			var valueType= $('#valueType').val().trim();
			var status = $('#status').val().trim();
			var dataModel = new Object();
			dataModel.attributeCode = attributeCode;
			dataModel.attributeName = attributeName;
			dataModel.valueType = valueType;
			dataModel.status = status;
			dataModel.lstTableName = Attribute._listObject;
			$('#attValueDiv').hide();
			$('#searchAttGrid').datagrid('load',dataModel);
		},
		openAttributeCustomer : function(rowId) {//point
			$('#popupAttribute #successMsg').html('').hide();
			$('#popupAttributeDetail #successMsg').html('').hide();
			$('#errMsgPop').html('').hide();
			$('#attValueDiv').hide();
			setSelectBoxValue('statusPop',1);
			setTextboxValue('attributeCodePop','');
			setTextboxValue('attributeNamePop','');
			setTextboxValue('notePop','');
			setSelectBoxValue('valueTypePop',1);
			$("#objectPop").dropdownchecklist("refresh");
			$("#objectPop").dropdownchecklist("enable");
			$('#objectPop').val('ALL');
			$('#id').val(0);
			disabled('statusPop');
			var rows = null;
			if(rowId!=undefined && rowId!=null && rowId>=0){
				rows = $('#searchAttGrid').datagrid('getRows')[rowId];
				var vl = Attribute._mapValueType.get(rows.valueType);
				setSelectBoxValue('valueTypePop',vl);
				
			}
			$('#popupAttribute').dialog({
				closed : false,
				cache : false,
				modal : true,
				width : 700,
				height : 300,
				onOpen: function(){	
					$('.ui-dropdownchecklist-selector').removeClass('ui-state-active');
					var width1=$('#attributeCodePop').width();
					$('.combo').attr('style','width: '+(width1+9)+'px !important;');
					$('#valueTypePopArrow').css('background','#eee !important');
					Attribute._isShowDlg = true;
					if(rows!=null){
						enable('statusPop');
						disabled('attributeCodePop');
						disabled('valueTypePop');
						disabled('objectPop');
						$('#valueTypePopDiv').addClass('BoxDisSelect');
						$('#id').val(rows.id);
						setTextboxValue('attributeCodePop',rows.attributeCode);
						setTextboxValue('attributeNamePop', Utils.XSSDeEncode(rows.attributeName));
						//setSelectBoxValue('valueTypePop',rows.valueType);
						if(rows.note!=null){
							setSelectBoxValue('notePop', Utils.XSSDeEncode(rows.note));
						}
						//set lại giá trị select và disable
						/*$('#objectPop').val(rows.tableName);
						$("#objectPop").dropdownchecklist("refresh");
						$("#objectPop").dropdownchecklist("disable");*/
						if(rows.status == 'RUNNING')
							setSelectBoxValue('statusPop',1);
						else
						setSelectBoxValue('statusPop',-1);
						$('#attributeNamePop').focus();
						
					}else{
						//set lại giá trị select và disable
						$('#attributeCodePop').focus();
						$("#objectPop").dropdownchecklist("refresh");
						$('#valueTypePopDiv').removeClass('BoxDisSelect');
					}
				},
			 	onBeforeClose: function() {
					var curIdFocus = $('#cur_focus').val();
					$('#'+ curIdFocus).focus();
					Attribute._isShowDlg = false;
		        },
		        onClose : function(){
		        	$('.easyui-dialog #attributeCodePop').val('');
		        	$('.easyui-dialog #attributeNamePop').val('');
		        	$('.easyui-dialog #valueTypePop').val(-1);
		        	$('.easyui-dialog #valueTypePop').change();
		        	$('.easyui-dialog #statusPop').val(1);
		        	$('.easyui-dialog #statusPop').change();
		        	$('.easyui-dialog #notePop').val('');
		        	$('.easyui-dialog #errMsgPop').hide();
		        	enable('attributeCodePop');
		        	enable('valueTypePop');
		        	enable('objectPop');
		        	$("#objectPop").dropdownchecklist("close");//close selectbox
					
		        }
			});
		},
		saveAttributeCustomer: function(){
			$('#errMsgPop').html('').hide();
			var msg = '';
			if (msg.length == 0) {
				// jspCustomerAttributeCode = Mã thuộc tính
				msg = ValidateUtils.getMessageOfRequireCheck('attributeCodePop', jspCustomerAttributeCode);
			}
			if(msg.length ==0){
				// jspCustomerAttributeCode = Mã thuộc tính
				msg = ValidateUtils.getMessageOfSpecialCharactersValidate('attributeCodePop', jspCustomerAttributeCode,Utils._CODE);
			}
			if (msg.length == 0) {
				//jspCustomerAttributeName = Tên thuộc tính
				msg = ValidateUtils.getMessageOfRequireCheck('attributeNamePop', jspCustomerAttributeName);
			}
			if (msg.length == 0 & $('#objectPop').val()==null) {
				// jspCustomerAttributeChuaChonGTDoiTuong = Bạn chưa chọn giá trị cho trường Đối tượng.
				msg = jspCustomerAttributeChuaChonGTDoiTuong ;
			}
			if (Attribute._listObjectPop=="ALL") {
				// jspCustomerAttributeKhongDoiTuong = Không có Đối tượng nào được chọn.
				msg = jspCustomerAttributeKhongDoiTuong ;
			}
			if(msg.length > 0){
				$('#errMsgPop').html(msg).show();
				return false;
			}
			
			var dataModel = new Object();
			dataModel.attributeId = $('#id').val();
			dataModel.attributeCodePop = $('#attributeCodePop').val().trim();
			dataModel.attributeNamePop = $('#attributeNamePop').val().trim();
			dataModel.valueTypePop = $('#valueTypePop').val().trim();
			dataModel.statusPop = $('#statusPop').val().trim();
			dataModel.notePop = $('#notePop').val().trim();
			dataModel.lstTableNamePop = Attribute._listObjectPop;
			Utils.addOrSaveData(dataModel, "/catalog/customer/save-or-update-attribute", Attribute._xhrSave, 'errMsgPop', function(data){
				$('#popupAttribute #successMsg').html(jspCustomerAttributeLuuThanhCong).show();
				var tm = setTimeout(function(){
					$('#popupAttribute').dialog('close'); 
					$("#searchAttGrid").datagrid("reload");
					clearTimeout(tm);
				}, 1500);
			},null,'#popupAttribute',null,null,function(data){
				if(data.error != undefined  && data.error && data.errMsg != undefined){
					$('#errMsgPop').html(data.errMsg).show();
				}
			});
			return false;
		},
		viewAttributeValue:function(attributeId){
			$('#attValueDiv').show();
			$('#attributeIdCur').val(attributeId);
			var params = new Object();
			params.attributeId = attributeId;
			$('#attValueDiv').show();
			$('#searchValGrid').datagrid({
				url:'/catalog/customer/search-attribute-value',
				pageList : [10, 20, 30],
				autoRowHeight : true,
				rownumbers : true,
				checkOnSelect : true,
				selectOnCheck : false,
				pagination : true,
				queryParams : params,
				pageSize : 10,
				fitColumns:true,
				scrollbarSize:0,
				width : 550,
				columns:[[
				    {field:'valCode', title: jspCustomerAttributeMaGT, sortable : false, resizable : false, width: 75, align : 'left',
				    	formatter : function(value, rowData) {
							if (rowData.attributeDetailCode != undefined && rowData.attributeDetailCode != null)
								{return Utils.XSSEncode(rowData.attributeDetailCode);}
							else
								{return '';}
						}
				    },
				    {field:'valName', title: jspCustomerAttributeTenGT, sortable : false, resizable : false, width: 150, align : 'left',
				    	formatter : function(value, rowData) {
							if (rowData.attributeDetailName != undefined && rowData.attributeDetailName != null)
								{return Utils.XSSEncode(rowData.attributeDetailName);}
							else
								{return '';}
						}
				    },
				    {field:'valStatus', title:msgTrangThai, sortable : false, resizable : false, width: 50, align : 'left',
				    	formatter : function(value, rowData) {
				    		var status = rowData.status;
							if (status != undefined && status != null){
								if(status=='RUNNING') {
									return msgHoatDong;
								} else {
									return msgTamNgung;
								}
							} else {return '';}
						}
				    },
				    {field : 'edit', title : '<a  href="javascript:void(0)" onclick="return Attribute.showAttributeValueDlg();' +
				    		'"><img width="15" height="15" src="' + WEB_CONTEXT_PATH + '/resources/images/icon_add.png"/></a>',
				    	align : 'center', width: 25, sortable : false, resizable : false,
				    	formatter :function(value, row, index) { 
							return "<a href='javascript:void(0)' onclick='return Attribute.showAttributeValueDlg("+
								index +");'><span style='cursor:pointer'><img width='15' height='15' src='" + WEB_CONTEXT_PATH + "/resources/images/icon-edit.png'/></span></a>";
						}
				    },
				]],
				onLoadSuccess :function(data){	    	
					$('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
					   updateRownumWidthForJqGrid('#searchValGrid');
			 }
			});
			$('.datagrid-body').css('overflow', 'hidden');
		},
		showAttributeValueDlg : function(rowId) {
			$('#popupAttribute #successMsg').html('').hide();
			$('#popupAttributeDetail #successMsg').html('').hide();
			$('#errMsgDetailPop').html('').hide();
			setTextboxValue('attributeDetailCodePop','');
			setTextboxValue('attributeDetailNamePop','');
			setSelectBoxValue('statusDetailPop',1);
			var rows = null;
			if(rowId!=undefined && rowId!=null && rowId>=0){
				rows = $('#searchValGrid').datagrid('getRows')[rowId];
			}
			$('#popupAttributeDetail').dialog({
				closed : false,
				cache : false,
				modal : true,
				width : 700,
				height : 230,
				singleSelect : true,
				onOpen: function(){	
					Attribute._isShowDlg = true;					
					if(rows!=null){
						enable('statusDetailPop');
						disabled('attributeDetailCodePop');
						$('#idDetail').val(rows.id);
						setTextboxValue('attributeDetailCodePop',rows.attributeDetailCode);
						setTextboxValue('attributeDetailNamePop',rows.attributeDetailName);
						if(rows.status == 'RUNNING')
							setSelectBoxValue('statusDetailPop',1);
						else
							setSelectBoxValue('statusDetailPop',-1);
						$('#attributeDetailNamePop').focus();
					}else{
						$('#idDetail').val(0);
						$('#attributeDetailCodePop').focus();
						disabled('statusDetailPop');
					}
				},
			 	onBeforeClose: function() {
					var curIdFocus = $('#cur_focus').val();
					$('#'+ curIdFocus).focus();
					Attribute._isShowDlg = false;
		        },
		        onClose : function(){
		        	$('.easyui-dialog #attributeDetailCodePop').val('');
		        	$('.easyui-dialog #attributeDetailNamePop').val('');
		        	$('.easyui-dialog #statusDetailPop').val(1);
		        	$('.easyui-dialog #statusDetailPop').change();
		        	enable('attributeDetailCodePop');
		        }
			});
		},
		saveAttributeDetail : function(){
			var msg = '';
			if(msg.length == 0){
				var attributeDetailCode = $('#attributeDetailCodePop').val().trim();
				if(attributeDetailCode == null || attributeDetailCode == undefined || attributeDetailCode.length == 0){
					// jspCustomerAttributeMaGTChuaNhap = Mã giá trị chưa được nhập!
					msg = jspCustomerAttributeMaGTChuaNhap ;
				}
			}
			if(msg.length == 0){
				var attributeDetailName = $('#attributeDetailNamePop').val().trim();
				if(attributeDetailName == null || attributeDetailName == undefined || attributeDetailName.length == 0){
					// jspCustomerAttributeTenGTChuaNhap = Tên giá trị chưa được nhập!
					msg = jspCustomerAttributeTenGTChuaNhap ;
				}
			}
			if (msg.length == 0) {
				msg = ValidateUtils.getMessageOfRequireCheck('attributeDetailCodePop', jspCustomerAttributeMaGT);
			}
			if(msg.length ==0){
				msg = ValidateUtils.getMessageOfSpecialCharactersValidate('attributeDetailCodePop', jspCustomerAttributeMaGT,Utils._NAME);
			}
			if (msg.length == 0) {
				msg = ValidateUtils.getMessageOfRequireCheck('attributeDetailNamePop', jspCustomerAttributeTenGT);
			}
			if (msg.length == 0) {
				msg = ValidateUtils.getMessageOfRequireCheck('attributeDetailNamePop', jspCustomerAttributeTenGT);
			}
			if (msg.length == 0) {
				var val = $('#attributeDetailNamePop').val();
				if (/[<>/\,]/g.test(val) == true){
					msg = jspCustomerAttributeTenGT + " " + msgTenDanhMucKTDB;
				}
			}
			if(msg.length > 0){
				$('#errMsgDetailPop').html(msg).show();
				return false;
			}
			var dataModel = new Object();
			dataModel.attributeDetailId = $('#idDetail').val().trim();
			dataModel.attributeId = $('#attributeIdCur').val().trim();
			dataModel.attributeDetailCode = $('#attributeDetailCodePop').val().trim();
			dataModel.attributeDetailName = $('#attributeDetailNamePop').val().trim();
			dataModel.status = $('#statusDetailPop').val();
			Utils.addOrSaveData(dataModel,"/catalog/customer/save-attributedetail",null,"errMsgDetailPop",function(data){
				//jspCustomerAttributeGTThuocTinhLuuThanhCong = Giá trị thuộc tính đã được lưu thành công
				$('#popupAttributeDetail #successMsg').html(jspCustomerAttributeGTThuocTinhLuuThanhCong).show();
				var tm = setTimeout(function(){
					$('#popupAttributeDetail').dialog('close'); 
					$("#searchValGrid").datagrid("reload");
					clearTimeout(tm);
				}, 1500);
			});
			return false;
		}
};

/**
 * QL danh muc thuoc tinh, huong vi ..
 * @author haupv3
 * @since 21 July 2014
 * **/
var CatalogType = {
	UNIT : 0,
	CAT : 1,
    SUB_CAT : 2,
    BRAND : 3,
    FLAVOUR : 4,
    PACKING : 5,
    CUSTOMER_TYPE : 6,
    ALBUM : 7,
    IMPORT_STOCK : 8,
    EXPORT_STOCK : 9,
    LIST_OF_PROBLEMS : 10,
    ORDER_TYPE : 11,
    DONG_CUA : 'DONGCUA',
    DIEM_BAN: 'DIEMBAN',
    Z_CAT : 'Z',
    catType : null,
    parseValue: function(value){
    	if(value.trim() == 0){
    		return CatalogType.UNIT;
    	} else if(value.trim() == 1){
    		return CatalogType.CAT;
    	} else if(value.trim() == 2){
    		return CatalogType.SUB_CAT;
    	} else if(value.trim() == 3){
    		return CatalogType.BRAND;
    	} else if(value.trim() == 4){
    		return CatalogType.FLAVOUR;
    	} else if(value.trim() == 5){
    		return CatalogType.PACKING;
    	} else if(value.trim() == 6){
    		return CatalogType.CUSTOMER_TYPE;
    	} else if(value.trim() == 7){
    		return CatalogType.ALBUM;
    	} else if(value.trim() == 8){
    		return CatalogType.IMPORT_STOCK;
    	} else if(value.trim() == 9){
    		return CatalogType.EXPORT_STOCK;
    	} else if(value.trim() == 10){
    		return CatalogType.LIST_OF_PROBLEMS;
    	} else if(value.trim() == 11){
    		return CatalogType.ORDER_TYPE;
    	}
    	return -2;
    }
};

var DefinedType = {
		SYSTEM : 1,
		USER : 2,
	    parseValue: function(value){
	    	if(value.trim() == 1){
	    		return DefinedType.SYSTEM;
	    	} else if(value.trim() == 2){
	    		return DefinedType.USER;
	    	}
	    	return -2;
	    }
	};
var ShopCatManage = {
	isEdit:false,
	poplbName:null,
	oldCode : null,
	cateType : null,
	orPopLbName :null,
	/**
	 * load grid danh muc
	 * **/
	loadCatGrid:function(params){
		var cptype = $('#catType').val().trim();
		
		var addIcon = '<a title="'+ShopCatManage.gridBtTtAdd+'" href="javascript:void(0)" onclick="ShopCatManage.showDialogAddOrEdit()" >' +
    	'<img width="15" height="15" src="' + WEB_CONTEXT_PATH + '/resources/images/icon_add.png"/></a>';
		
		var gridTt = ShopCatManage.gridTtCatCode;
		switch(Number(cptype)){
			case CatalogType.UNIT:
				gridTt = ShopCatManage.gridTtUnit;
				break;	
			case CatalogType.SUB_CAT:
				gridTt = ShopCatManage.gridTtSubCatCode;
				break;
			case CatalogType.BRAND:
				gridTt = ShopCatManage.gridTtBrand;
				break;
			case CatalogType.FLAVOUR:
				gridTt = ShopCatManage.gridTtFlavour;
				break;
			case CatalogType.PACKING:
				gridTt = ShopCatManage.gridTtPackage;	
				break;
			case CatalogType.CUSTOMER_TYPE:
				gridTt = ShopCatManage.gridTtCustomerType;
				break;
			case CatalogType.ALBUM:
				gridTt = ShopCatManage.gridTtAlbum;
				break;
			case CatalogType.IMPORT_STOCK:
				gridTt = ShopCatManage.gridTtImportStock;
				break;
			case CatalogType.EXPORT_STOCK:
				gridTt = ShopCatManage.gridTtExportStock;
				break;
			case CatalogType.LIST_OF_PROBLEMS:
				gridTt = ShopCatManage.gridTtProblemsListGtt;
				break;
		}
		
		if(Number(cptype) != CatalogType.SUB_CAT){
			ShopCatManage.poplbName = gridTt;
			ShopCatManage.orPopLbName = gridTt;
		}else{
			ShopCatManage.poplbName = ShopCatManage.gridTtSubCatCode;
			ShopCatManage.orPopLbName = ShopCatManage.gridTtSubCatCode;
		}
					
		if(Number(cptype) == CatalogType.ORDER_TYPE){
			$('#divCatalog').hide();
			$('#divExtend').show();
			$('#divOverlay').hide();
		}else{
			$('#divCatalog').show();
			$('#divExtend').hide();
			$('#dg').datagrid({

				url : '/config/loadShopCat',
				rownumbers : true,
				queryParams : params,
				singleSelect : true,
				fitColumns : true,
				pageSize : 20,
				width : $(window).width() - 350,
				pageList : [ 20, 30, 40 ],
				height : 'auto',
				scrollbarSize : 0,
				pagination : true,
				pageNumber : 1,
				nowrap : false,
				autoRowHeight : true,
				columns : [[
					{ field : 'catCode', title : ShopCatManage.gridTtCode, width : 100, align : 'left', sortable : false, resizable : false,
						formatter : function(value, row, index) {
							return Utils.XSSEncode(row.code);
						}
					},
					{	field : 'catName', title : ShopCatManage.poplbName, width : 150, align : 'left', sortable : false, resizable : false,
						formatter : function(value, row, index) {
							return Utils.XSSEncode(row.name);
						}
					},
					{	field : 'parentCatName', title : ShopCatManage.gridTtParentCat, hidden:true, width : 150, align : 'left', sortable : false, resizable : false,
						formatter : function(value, row, index) {
							return Utils.XSSEncode(row.parentName);
						}
					},
					{	field : 'catDescript', title : ShopCatManage.gridTtDescript, width : 200, align : 'left', sortable : false, resizable : false,
						formatter : function(value, row, index) {
							return Utils.XSSEncode(row.description);
						}
					},
				    {field:'edit', title: addIcon,
				    	width: 50, align: 'center',sortable:false,resizable:false,
				    	formatter: function(val, row, index) {
				    		var strFunc = '<a href="javascript:void(0)" title="'+ Utils.XSSEncode(ShopCatManage.gridBtTtChange) +'" onclick="ShopCatManage.showDialogAddOrEdit('+ index + ');">'+
			    			'<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png"/></a>';
				    		if(Number(cptype) != CatalogType.UNIT && Number(cptype) != CatalogType.CUSTOMER_TYPE 
				    				&& Number(cptype) != CatalogType.LIST_OF_PROBLEMS){
				    			if(Number(cptype) == CatalogType.ALBUM){
				    				if(row.type != null && row.type != undefined && Number(row.type) == DefinedType.USER){
				    					strFunc += '<a href="javascript:void(0)" title="'+Utils.XSSEncode(msgText4) +'"style="margin-left:2px" onclick="ShopCatManage.deleteRow('+ index + ');">'+
					    				'<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_delete.png"/></a>';
				    				}
				    			}else if(Number(cptype) == CatalogType.CAT){
				    				if(row.code != CatalogType.Z_CAT){
					    				strFunc += '<a href="javascript:void(0)" title="'+Utils.XSSEncode(msgText4) +'"style="margin-left:2px" onclick="ShopCatManage.deleteRow('+ index + ');">'+
					    				'<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_delete.png"/></a>';
				    				}
				    			}else{
				    				strFunc += '<a href="javascript:void(0)" title="'+Utils.XSSEncode(msgText4)+'"style="margin-left:2px" onclick="ShopCatManage.deleteRow('+ index + ');">'+
				    				'<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_delete.png"/></a>';			    				
				    			}
				    		}
				    		
				    		return strFunc;
				    	}
				    }
				]],
				onLoadSuccess:function(data){
					$('#errExcelMsg').html('').hide();
//					Utils.hideMessage();//LamNH
					var catType = $('#catType').val().trim();
					if(Number(catType) != CatalogType.SUB_CAT){
						if(Number(catType) == CatalogType.CUSTOMER_TYPE || Number(catType) == CatalogType.ALBUM){
							$('#dg').datagrid("hideColumn","catDescript");
						}else{
							$('#dg').datagrid("showColumn","catDescript");
						}
						$('#dg').datagrid("hideColumn","parentCatName"); 
					}else{
						$('#dg').datagrid("showColumn","parentCatName");
					}

					if(Number(catType) == CatalogType.LIST_OF_PROBLEMS){
						$('#dg').datagrid("hideColumn","catDescript");
					}else{
						$('#dg').datagrid("showColumn","catDescript");
					}
					
					$('#shopCatEasyUIDialog #popCatType').val(catType);
					//fill popup combo cat
					if(data.lstCat != null){
						$('#shopCatEasyUIDialog #popupParentCat').empty().change();
						for(var i=0; i<data.lstCat.length; i++){
							var obj = new Object();
							obj = data.lstCat[i];
							$('#shopCatEasyUIDialog #popupParentCat').append($('<option>', {
							    value: obj.id,
							    select:obj.id,
							    id: 'select-'+ obj.id,
							    text: obj.productInfoName
							}));
						}
						$('#shopCatEasyUIDialog #popupParentCat').change();
					}
					$('#divOverlay').hide();
					setTimeout(function(){
						$('#pdCodeName').focus();
					}, 500);
				}
			});
		}
		
		
	},
	
	showDialogAddOrEdit:function(index){
		$('#errExcelMsg').html('').hide();
		$('#successMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		$('#errMsgPopup').html('').hide();
		$('#shopCatEasyUIDialog #errMsg').html('').hide();
		
		ShopCatManage.changeLbText();
		var catType = $('#catType').val().trim();
		var data = null;
		ShopCatManage.cateType = catType;
		
		setTimeout(function(){
			if($('#shopCatEasyUIDialog #catCode').prop('disabled') == false){
				$('#shopCatEasyUIDialog #catCode').focus();
			}else{
				$('#shopCatEasyUIDialog #catName').focus();
			}
		}, 500);
		
		if(index == undefined){
			$('#shopCatEasyUIDialog #catCode').val('');
			$('#shopCatEasyUIDialog #catName').val('');
			$('#shopCatEasyUIDialog #catDescript').val('');

			$('#shopCatEasyUIDialog #catCode').removeAttr('disabled');
			$('#shopCatEasyUIDialog #catName').removeAttr('disabled');
	
			ShopCatManage.isEdit = false;
			ShopCatManage.oldCode = null;
			ShopCatManage.cateType = null;
			$('#hideCatCode').val('');
		}else{
			data = $('#dg').datagrid('getRows')[index];
			ShopCatManage.oldCode = data.code;
			$('#hideCatCode').val(Utils.XSSEncode(data.code));
			$('#shopCatEasyUIDialog #catCode').val(Utils.XSSEncode(data.code));
			$('#shopCatEasyUIDialog #catName').val(Utils.XSSDeEncode(data.name));
			$('#shopCatEasyUIDialog #catDescript').val(Utils.XSSDeEncode(Utils.XSSEncode(data.description)));
			
			ShopCatManage.cateType = data.code;
			
			if(Number(catType) == CatalogType.ALBUM){
				if(data.code == CatalogType.DONG_CUA || data.code == CatalogType.DIEM_BAN){
					$('#shopCatEasyUIDialog #catCode').attr('disabled','disalbled');
				}else{
					$('#shopCatEasyUIDialog #catCode').removeAttr('disabled');
				}
			}else if(Number(catType) == CatalogType.CAT){
				if(data.code == CatalogType.Z_CAT){
					$('#shopCatEasyUIDialog #catCode').attr('disabled','disalbled');
					$('#shopCatEasyUIDialog #catName').attr('disabled','disalbled');
				}else{
					$('#shopCatEasyUIDialog #catCode').removeAttr('disabled');
					$('#shopCatEasyUIDialog #catName').removeAttr('disabled');
				}
			}else if(Number(catType) == CatalogType.LIST_OF_PROBLEMS){
				$('#shopCatEasyUIDialog #catCode').attr('disabled','disalbled');
			}else if(Number(catType) == CatalogType.UNIT){
				$('#shopCatEasyUIDialog #catCode').attr('disabled','disalbled');
			}else{
				$('#shopCatEasyUIDialog #catCode').removeAttr('disabled');
				$('#shopCatEasyUIDialog #catName').removeAttr('disabled');
			}
			
			ShopCatManage.isEdit = true;
			$('#shopCatEasyUIDialog #popupParentCat').val(data.parentId).change();
			
		}
		$('#shopCatEasyUIDialog #lblPopCatName').html(ShopCatManage.poplbName);
		
		if(Number(catType) != CatalogType.SUB_CAT){
			$('#shopCatEasyUIDialog #coverCbParentCat').hide();
		}else{
			$('#shopCatEasyUIDialog #coverCbParentCat').show();
		}
		if(Number(catType) == CatalogType.CUSTOMER_TYPE || Number(catType) == CatalogType.ALBUM || Number(catType) == CatalogType.LIST_OF_PROBLEMS){
			$('#divDescription').hide();
		}else{
			$('#divDescription').show();
		}
		
		$('#shopCatEasyUIDialog #catCode').focus();
		$('#shopCatEasyUIDialog').dialog('open');	
	},
	saveShopCatManage:function(){
		ShopCatManage.changeLbText(CatalogType.UNIT);
		$('#errMsgPopup').hide();
		var data = new Object();
		var msg = '';
		var catCode = $('#shopCatEasyUIDialog #catCode').val().trim();
		var cbType = $('#catType').val().trim();
		
	
		if( (ShopCatManage.cateType == CatalogType.DONG_CUA || ShopCatManage.cateType == CatalogType.DIEM_BAN
				|| Number(cbType) == CatalogType.LIST_OF_PROBLEMS || ShopCatManage.cateType == CatalogType.Z_CAT
				|| Number(cbType) == CatalogType.UNIT
				) && ShopCatManage.isEdit == true ){
			
			//anhhpt:neu ma dvt luc dau khac voi ma dvt moi --> khong cho luu
			if(!isNullOrEmpty(catCode) && !isNullOrEmpty($('#hideCatCode').val()) && catCode.toUpperCase()!= $('#hideCatCode').val().trim().toUpperCase()){
				$('#errMsgPopup').html(msgKhongTheLuu).show();
				return false;
			}
			catCode = $('#hideCatCode').val();
		}
		
		var catName = $('#shopCatEasyUIDialog #catName').val().trim();
		var catDescript = $('#shopCatEasyUIDialog #catDescript').val().trim();
		var type = $('#shopCatEasyUIDialog #popCatType').val().trim();
		
		
		if(Number(cbType) == CatalogType.SUB_CAT){
			var parentCatId = $('#shopCatEasyUIDialog #popupParentCat').val().trim();
		}else{
			var parentCatId = 0;
		}

		if(isNullOrEmpty(msg)){
			msg = ValidateUtils.getMessageOfRequireCheck('catCode',ShopCatManage.gridTtCode,false,20);
		}
		if(isNullOrEmpty(msg)){
			msg = Utils.getMessageOfSpecialCharactersValidate('catCode', catCode ,Utils._CODE);
		}
		
		if(isNullOrEmpty(msg)){
			msg = ValidateUtils.getMessageOfRequireCheck('catName',ShopCatManage.poplbName,false,500);
		}
		
		if(isNullOrEmpty(msg)){
			//neu la: Nganh hang, nganh hang con, nhan hieu, huong vi, dong goi, loai KH thi validate them dau ","
			if(Number(cbType) == CatalogType.CAT || Number(cbType) == CatalogType.SUB_CAT || Number(cbType) == CatalogType.BRAND
					|| Number(cbType) == CatalogType.FLAVOUR || Number(cbType) == CatalogType.PACKING 
					|| Number(cbType) == CatalogType.CUSTOMER_TYPE || Number(cbType) == CatalogType.UNIT){
				if (/[<>/\,]/g.test(catName) == true){
					msg = ShopCatManage.orPopLbName + " " + msgTenDanhMucKTDB;
				}
			}else{//Cac danh muc con lai validate 4 ky tu dac biet cho ATTT
				if (/[<>/\\]/g.test(catName) == true){
					msg = ShopCatManage.orPopLbName + " " + msgTenDanhMucKTDB;
				}				
			}
		}
		
		setTimeout(function(){
			$('#shopCatEasyUIDialog #errMsg').hide();
		},5000);
		if(!isNullOrEmpty(msg)){
			$('#shopCatEasyUIDialog #errMsg').html(msg).show();
			return false;
		}
		
		var _inportExportType = 0;
		if(Number(cbType) == CatalogType.IMPORT_STOCK || Number(cbType) == CatalogType.EXPORT_STOCK){
			_inportExportType = $('#cbWhType').val();
		}
		
		data.oldCatCode = ShopCatManage.oldCode;
		data.catCode = catCode;
		data.catName = catName;
		data.catDescript = catDescript;
		data.type = type;
		data.isEdit = ShopCatManage.isEdit;
		data.parentCatId = parentCatId;
		data.inportExportType = _inportExportType;
		
		Utils.addOrSaveData(data, '/config/save-shop-cat', null, 'serverErrors',function(data){
			Utils.updateTokenForJSON(data);
			$('#errExcelMsg').html('').hide();
//			Utils.hideMessage();//LamNH
			$('#successMsg').html(CompanyConfig.langSaveSuccess).show();
//			Utils.showMessage(CompanyConfig.langSaveSuccess);//LamNH
			$('#shopCatEasyUIDialog').dialog('close');
			setTimeout(function(){$('#successMsg').html('').hide();}, 5000);
			setTimeout(function(){$('#sucExcelMsg').html('').hide();}, 5000);
				$('#dg').datagrid('reload');
		},null,null, null, null, function(data){
			if(!isNullOrEmpty(data.errMsg)){
				$('#shopCatEasyUIDialog #errMsg').html(data.errMsg).show();
				return false;
			}
		});
	},
	searchCat:function(){			
		var params = new Object();
		params.type = $('#catType').val().trim();
		params.pdCodeName = $('#pdCodeName').val().trim();
		params.inportExportType = $('#cbWhType').val();
		ShopCatManage.loadCatGrid(params);
	},
	deleteRow:function(index){
		var data = $('#dg').datagrid('getRows')[index];
		var tmType = $('#catType').val().trim();
		var dataModel = new Object();
		dataModel.catCode = data.code;
		dataModel.type = tmType;
		Utils.addOrSaveData(dataModel, '/config/delete-shop-cat', null, 'serverErrors',function(data){
			Utils.updateTokenForJSON(data);
			$('#errExcelMsg').html('').hide();
//			Utils.hideMessage();//LamNH
			$('#successMsg').html(CompanyConfig.langSaveSuccess).show();
//			Utils.showMessage(CompanyConfig.langSaveSuccess);//LamNH
			setTimeout(function(){$('#successMsg').html('').hide();}, 3000);
			setTimeout(function(){
				$('#sucExcelMsg').html('').hide();
//				Utils.hideMessage();//LamNH
			}, 3000);
			//Neu page con it hon 2 row se chuyen ve trang truoc
			if($('#dg').datagrid('getRows').length < 2){
				$('#dg').datagrid('options').pageNumber = $('#dg').datagrid('options').pageNumber -1 ;
				$('.pagination-num').val($('#dg').datagrid('options').pageNumber);
			}
			$('#dg').datagrid('reload');
		},null,null, null, ShopCatManage.gridConfirmDel, function(data){
			$('#errExcelMsg').html(data.errMsg).show();
//			Utils.showMessage(data.errMsg);//LamNH
		});
		
	}, 
	changeLbText:function(forgridTT){
		var cptype = $('#catType').val().trim();
		
		var gridTt = ShopCatManage.gridTtCatCode;
		switch(Number(cptype)){
			case CatalogType.UNIT:
				gridTt = ShopCatManage.gridTtUnit;
				break;	
			case CatalogType.SUB_CAT:
				gridTt = ShopCatManage.gridTtSubCatCode;
				break;
			case CatalogType.BRAND:
				gridTt = ShopCatManage.gridTtBrand;
				break;
			case CatalogType.FLAVOUR:
				gridTt = ShopCatManage.gridTtFlavour;
				break;
			case CatalogType.PACKING:
				gridTt = ShopCatManage.gridTtPackage;	
				break;
			case CatalogType.CUSTOMER_TYPE:
				gridTt = ShopCatManage.gridTtCustomerType;
				break;
			case CatalogType.ALBUM:
				gridTt = ShopCatManage.gridTtAlbum;
				break;
			case CatalogType.IMPORT_STOCK:
				gridTt = ShopCatManage.gridTtImportStock;
				break;
			case CatalogType.EXPORT_STOCK:
				gridTt = ShopCatManage.gridTtExportStock;
				break;
			case CatalogType.LIST_OF_PROBLEMS:
				gridTt = ShopCatManage.gridTtProblemsListGtt;
				break;				
		}
		
		if(isNullOrEmpty(forgridTT)){
			if(Number(cptype) != CatalogType.SUB_CAT){
				ShopCatManage.poplbName = gridTt + '<span class="ReqiureStyle"> *</span>';
			}else{
				ShopCatManage.poplbName = ShopCatManage.gridTtSubCatCode+ '<span class="ReqiureStyle"> *</span>';
			}
		}else{
			ShopCatManage.poplbName = gridTt; 
		}
		ShopCatManage.orPopLbName = gridTt;
		$('.panel-title').first().html(ShopCatManage.thongTin + ' ' + gridTt);
	},
	loadCatalogTree : function(url){
		loadDataForTree(url);
		$('#tree').bind("loaded.jstree", function(event, data){
			if(dmsVersion == DmsVersion.BASIC){
				$('#tree').jstree('select_node', '#6');
			}else{
				$('#tree').jstree('select_node', '#0');
			}
		});
		$('#tree').bind("select_node.jstree", function (event, data) {	
			$('#pdCodeName').val('');
			var id = data.rslt.obj.attr("id");
			if(id!= null && id!= undefined && id.length > 0){
				ShopCatManage.showCatalogForm(id);
			}
	    });
		$('#tree').bind("open_node.jstree", function (event, data) {
	    });
	},
	showCatalogForm: function(id){
		$('#catType').val(id);
		$('#divOverlay').show();
		var params = new Object();
		params.type = id;
		ShopCatManage.loadCatGrid(params);
		if(Number(id) == CatalogType.IMPORT_STOCK || Number(id) == CatalogType.EXPORT_STOCK){
			$('#whTypeCover').show();
			$('#lbWhType').show();
			$('#btSearch').css('margin-left','-161px');
			$('#cbWhType').val(0).change();
		}else{
			$('#whTypeCover').hide();
			$('#lbWhType').hide();
			$('#btSearch').css('margin-left','-260px');
		}
	},
	saveContent : function(){
		var dataModel = new Object();
		dataModel.advertisementContent = $('#advertisementContent').val().trim();
		Utils.addOrSaveData(dataModel, "/config/save-advertisement-content",ShopCatManage._xhrSave, 'errMsg', function(data) {
			if(data.error != null && data.error == false){
				$('#successMsg').html(msgCommon1).show();
			} else {
				$('#errMsg').html(data.errMsg).show();
			}
		}, null);
 		return false;
	}
};
