/*
 * JavaScript file created by Rockstarapps Concatenation
*/

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.attribute.js
 */
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
			var lstCt = '';
			var tmpLt = $('#object').val();
			if(!Utils.isEmpty(tmpLt)){
				for(var i=0; i<tmpLt.length; i++){
					lstCt += tmpLt[i];
					if(i<tmpLt.length -1){
						lstCt += ",";
					}
				}
			}
			dataModel.lstTableName = lstCt;
			$('#attValueDiv').hide();
			$('#searchAttGrid').datagrid('load',dataModel);
		},
		openAttributeCustomer : function(rowId) {//point
//			$('#popupAttribute').dialog('destroy');
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
				height : 360,
				top	: 30,
				onOpen: function(){
					$('.ui-dropdownchecklist-selector').removeClass('ui-state-active');
					var width1=$('#attributeCodePop').width();
					$('.combo').attr('style','width: '+(width1+9)+'px !important;');
					Attribute._isShowDlg = true;
					if(rows!=null){
						enable('statusPop');
						disabled('attributeCodePop');
						disabled('valueTypePop');
//						$('#objectPopDiv button').attr('disabled','disabled');
						$('#objectPopDiv').addClass('cursorAdd');
						
						$('#valueTypePopDiv').addClass('BoxDisSelect');
						$('#id').val(rows.id);
						setTextboxValue('attributeCodePop',rows.attributeCode);
						setTextboxValue('attributeNamePop', Utils.XSSDeEncode(rows.attributeName));
						//setSelectBoxValue('valueTypePop',rows.valueType);
						if(rows.note!=null){
							setSelectBoxValue('notePop', Utils.XSSDeEncode(rows.note));
						}
						//set lại giá trị select và disable
						$('#objectPop').multipleSelect("refresh");
						
						setSelectBoxValue('objectPop',rows.tableName);
						$('#objectPop').multipleSelect({
							setSelects: rows.tableName,
							width: '100%',
						});
						$('#objectPop').multipleSelect("disable");
						$('#objectPopArrow').addClass('disableBackground');
						//$("#objectPop").dropdownchecklist("refresh");
//						$("#objectPop").dropdownchecklist("disable");
						if(rows.status == 'RUNNING')
							setSelectBoxValue('statusPop',1);
						else
						setSelectBoxValue('statusPop',-1);
						$('#attributeNamePop').focus();

					}else{
						
						$('#attributeCodePop').focus();
						$('#objectPop').multipleSelect("enable");
						$('#objectPop').multipleSelect("refresh");
						$('#objectPop').multipleSelect({
						    width: '100%'
						});
//						$('#objectPop').val('ALL');
						//set lại giá trị select và disable
						
//						$('#objectPop').multipleSelect({
//							selectAll: true,
//						    checkAll : true,
//						    width: '100%',
//						});
//						$('#objectPop').multipleSelect("destroy");
//						$("#objectPop").dropdownchecklist("refresh");
						$('#valueTypePopDiv').removeClass('BoxDisSelect');
						$('#objectPop').removeClass('disabled');
						$('#objectPopArrow').removeClass('disableBackground');
						
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
			if(msg.length == 0){
				//jspCustomerAttributeName = Tên thuộc tính
				msg = ValidateUtils.getMessageOfSpecialCharactersValidate('attributeNamePop', jspCustomerAttributeName, Utils._NAME);
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
//			dataModel.lstTableNamePop = Attribute._listObjectPop;
			var lstCt = '';
			var tmpLt = $('#objectPop').val();
			if(!Utils.isEmpty(tmpLt)){
				for(var i=0; i<tmpLt.length; i++){
					lstCt += tmpLt[i];
					if(i<tmpLt.length -1){
						lstCt += ",";
					}
				}
			}
			dataModel.lstTableNamePop = lstCt;
			
			
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
				rownumbers : false,
				checkOnSelect : true,
				selectOnCheck : false,
				pagination : true,
				queryParams : params,
				pageSize : 10,
				fitColumns:true,
				scrollbarSize:0,
				width : 550,
				columns:[[
					{
						field:'rownum', 
						title: msgSTT, 
						width: 25,
						align: 'center',
						formatter:function(value,rowData,index){
                    return (index+1);
                	}
					},
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
				    {field : 'edit', title : msgCommonThaoTac,
				    	align : 'center', width: 25, sortable : false, resizable : false,
				    	formatter :function(value, row, index) {
							return "<a href='javascript:void(0)' onclick='return Attribute.showAttributeValueDlg("+
								index +");'><span style='cursor:pointer'><img width='15' height='15' src='" + WEB_CONTEXT_PATH + "/resources/images/edit.svg'/></span></a>";
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
				top : 30,
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
		$('#divOverlay_New').hide();
		
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
				/*rownumbers : true,*/
				queryParams : params,
				pageList : [10, 20, 30],
				singleSelect : true,
				fitColumns : true,
				pageSize : 10,
				width : $('#boxShopCAtManage').width(),
				/*pageList : [ 20, 30, 40 ],*/
				height : 'auto',
				scrollbarSize : 0,
				pagination : true,
				pageNumber : 1,
				nowrap : false,
				autoRowHeight : true,
				columns : [[
                    {field:'rownum', title: msgSTT, width: 40,align: 'center',formatter:function(value,row,index){
                    	var page = document.getElementsByClassName('pagination-num')[0].value;
                    	return (page != 0 ? (page*10-10 +index +1) : index +1);
                        }},
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
				    {field:'edit', title: msgCommonThaoTac,
				    	width: 70, align: 'center',sortable:false,resizable:false,
				    	formatter: function(val, row, index) {
				    		var strFunc = '<a href="javascript:void(0)" title="'+ Utils.XSSEncode(ShopCatManage.gridBtTtChange) +'" onclick="ShopCatManage.showDialogAddOrEdit('+ index + ');">'+
			    			'<img src="' + WEB_CONTEXT_PATH + '/resources/images/edit.svg"/></a>';
				    		var tempContent = strFunc;
				    		if(Number(cptype) != CatalogType.UNIT && Number(cptype) != CatalogType.CUSTOMER_TYPE
				    				&& Number(cptype) != CatalogType.LIST_OF_PROBLEMS){
				    			if(Number(cptype) == CatalogType.ALBUM){
				    				if(row.type != null && row.type != undefined && Number(row.type) == DefinedType.USER){
				    					strFunc += '<a href="javascript:void(0)" title="'+Utils.XSSEncode(msgText4) +'"style="margin-left:2px" onclick="ShopCatManage.deleteRow('+ index + ');">'+
					    				'<img style="margin-left: 10px;" src="' + WEB_CONTEXT_PATH + '/resources/images/delete_black.svg"/></a>';
				    				}
				    			}else if(Number(cptype) == CatalogType.CAT){
				    				if(row.code != CatalogType.Z_CAT){
					    				strFunc += '<a href="javascript:void(0)" title="'+Utils.XSSEncode(msgText4) +'"style="margin-left:2px" onclick="ShopCatManage.deleteRow('+ index + ');">'+
					    				'<img style="margin-left: 10px;" src="' + WEB_CONTEXT_PATH + '/resources/images/delete_black.svg"/></a>';
				    				}
				    			}else{
				    				strFunc += '<a href="javascript:void(0)" title="'+Utils.XSSEncode(msgText4)+'"style="margin-left:2px" onclick="ShopCatManage.deleteRow('+ index + ');">'+
				    				'<img style="margin-left: 10px;" src="' + WEB_CONTEXT_PATH + '/resources/images/delete_black.svg"/></a>';
				    			}
				    		}
				    		if(strFunc === tempContent) {
				    			strFunc += '<a href="javascript:void(0)" title="'+Utils.XSSEncode(msgText4)+'"style="margin-left:2px; visibility: hidden;" >'+
			    				'<img style="margin-left: 10px;" src="' + WEB_CONTEXT_PATH + '/resources/images/delete_black.svg"/></a>';
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
						$('#shopCatEasyUIDialog #popupParentCat').css("opacity", "");
						$('#shopCatEasyUIDialog #popupParentCat').css("height", "");
						$('.CustomStyleSelectBoxInner').remove();
						$('.CustomStyleSelectBox ').remove();
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
		$('.window').css({top:"150"});

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
		$('#shopCatEasyUIDialog').closest('.panel-htop').find('.panel-title').first().html(ShopCatManage.thongTin + ' ' + gridTt);
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

/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.attribute.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.customer.js
 */
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
		dataModel.customerCode = $('#cusCodeName').val().trim();
		dataModel.customerName = $('#cusNamePhone').val().trim();

		dataModel.cusStaffManager = $('#cusStaffManager').val().trim();
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
		Customer._COUNT_REJECT = new Map();
		Customer._COUNT_WAITING = new Map();
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
		$('#divOverlay_New').show();
		$('.combo-panel').children('.combobox-item').attr('id', '');
//		window.location.href = '/catalog/customer/detail?customerId=' + customerId;
		$.ajax({
			type : 'GET',
			url : '/catalog/customer/detail?customerId=' + customerId,			
			dataType : "html",
			success : function(data) {
				$('#content').html(data);
				$('#divOverlay_New').hide();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$('#divOverlay_New').hide();
			}
		});
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
//			$('#divOverlay_New').hide();
			return false;
		}
		$('#divOverlay_New').show();

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
		$.ajaxSetup({contentType:"application/x-www-form-urlencoded; charset=utf-8"});
		Utils.addOrSaveData(dataModel, "/catalog/customer/saveorupdate", Customer._xhrSave, 'errChangeCustomer',function(data){
			if ($('#checkAdminRole').val() != null  && $('#checkAdminRole').val() == 'true'){

			}else{
				if (data.isCreate != null && data.isCreate == true){
					$('#notifyForSuperviser').html(msgNotifyForSuperviser).show();
//					Utils.showMessage(msgNotifyForSuperviser);//LamNH
				}
			}
			$('#divOverlay_New').hide();
			setTimeout(function(){
				var params = new Object();
				if(Customer._approve==3){
					Customer.cancelCustomerInfo();
				}else if (Customer._approve === -1){
//					gotoPage("/catalog/customer/info");
					$("#viewBigMap").remove();
					Utils.getHtmlDataByAjax(params, '/catalog/customer/info',function(data) {
//						$('#divOverlay_New').hide();
						$("#content").html(data).show();
					}, null, 'POST');
					return false;
				}else{
//					gotoPage("/catalog/customer/detail?customerId=" + data.customerId);
					$("#viewBigMap").remove();
					Utils.getHtmlDataByAjax(params, '/catalog/customer/detail?customerId=' + data.customerId,function(data) {
						$("#content").html(data).show();
//						$('#divOverlay_New').hide();
					}, null, 'POST');
					return false;
				}

			},100);

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
				var arrCus = [];
				var size = $(objectId).next('span').children('input').val().split(",").length;
				for (var t = 0; t < size; t++) {
					arrCus[t] = $(objectId).next('span').children('.textbox-value').eq(t).val();
				}
				arr2[i] = arrCus;
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
//			Utils.updateTokenForJSON(data);
				if(data.error != null && data.error == false){
					$('#successMsgProperty').html(msgCommon1).show();
					setTimeout(function(){$('#successMsgProperty').html('').hide();},1500);
//					Utils.showMessage(msgCommon1);//LamNH
				} else {
					$('#errMsgProperty').html(data.errorMsg).show();
					setTimeout(function(){$('#errMsgProperty').html('').hide();},2000);
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
		$('#divOverlay_New').show();
		CommonSearch._xhrReport = $.ajax({
			type : "POST",
			url : url,
			dataType: "json",
			success : function(data) {
				hideLoadingIcon();
				$('#divOverlay_New').hide();
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
				$('#divOverlay_New').hide();
			}
		});
		return false;
	},
	loadDataGrid:function(params, callbackSuccess){
		$('#divOverlay_New').hide();
		var titleEdit = '';
		if ($('#isManager').val() == 'false'){
			titleEdit = format(ACTION_INSERT, 'href="'+WEB_CONTEXT_PATH +'/catalog/customer/detail"');
		}
		var widthUnit = ($(window).width() - 0)/585;
		var customCheck = '<label class="el-checkbox el-checkbox-lg"> <input type="checkbox" id="checkedId" /><span class="el-checkbox-style el-lebel"></span></label>';
		var idt = 110;
		$('#searchCustomerGrid').datagrid({
			url : '/catalog/customer/search',
			scrollbarSize : 0,
			pageList : [10, 20, 30],
			//queryParams:ValidateUtils.validate('#errMsg','.CustomerSearchForm'),
			queryParams: params,
			fitColumns : false,
			singleSelect : Customer._singleSelect,
			pagination : true,
//			 rownumbers : true,
			//anhhpt: phat trien chuc nang duyet nhieu Khac Hang
			selectOnCheck:true, //If set to true, clicking a checkbox will always select the row
			checkOnSelect:false, // If false, the checkbox is only checked/unchecked when the user clicks exactly on the checkbox.
			autoRowHeight : true,
			width: $('#boxBodyTable').width(),
//			autoWidth: false,

				columns:[[
                    {field:'id', width: 100, align: 'center', checkbox:true},
                    
//                    { field: "id", title: customCheck, width: 60, align : 'right', checkbox:false,
//      				  formatter:function(value,row,index){
//      					var customCheck = '<label class="el-checkbox el-checkbox-lg"> <input type="checkbox" name ="id" value="'+ Utils.XSSEncode(row.id)+'" /><span class="el-checkbox-style el-lebel"></span></label>';
//
//      					  return customCheck;
//      				  }
//      			  },
                    
                    {field:'rownum', title: msgSTT, width: 50,align: 'center',formatter:function(value,row,index){
                    	var page = document.getElementsByClassName('pagination-num')[0].value;
                            return (page != 0 ? (page*10-10 +index +1) : index +1);
                        }},
                    {field : 'customerCode',title : jsp_sale_product_customer_code,width : 50*widthUnit,
                        formatter : function(value, rowData) {
                            if (rowData.customerCode != undefined && rowData.customerCode != null)
                                return Utils.XSSEncode(rowData.customerCode);
                            else
                                return '';
                        }
                    },
                    {field : 'customerName',title :customerName,width : 60*widthUnit,
                        formatter : function(value, rowData) {
                            if (rowData.customerName != undefined && rowData.customerName != null)
                                return Utils.XSSEncode(rowData.customerName);
                            else
                                return '';
                        }
                    },
                    {field : 'customerType',title : PromotionCatalog_typeClient ,width : 65*widthUnit,
                        formatter : function(value, rowData) {
                            if (rowData.channelTypeName != undefined && rowData.channelTypeName != null){
                                return Utils.XSSEncode(rowData.channelTypeName);
                            }else{
                                return '';
                            }
                        }
                    },
				{field : 'address',title :msgTuyen3,width : 90*widthUnit,
					formatter : function(value, rowData) {
						if (rowData.address != undefined && rowData.address != null){
							return Utils.XSSEncode(rowData.address);
						}else{
							return '';
						}
					}
				},
				{field : 'mobiphone',title : phone,width : 55*widthUnit, align: 'right',
					formatter : function(value, rowData) {
						if (rowData.mobiphone != undefined && rowData.mobiphone != null){
							return Utils.XSSEncode(rowData.mobiphone);
						}else{
							return '';
						}
					}
				},
				{field : 'status',title : msgTrangThai,width : 50*widthUnit, align : 'center',
//					formatter:function(	value, row,index) {
//						if(value == Customer.statusType.DRAFT){
//							return msgDuThao;
//						}else if(value == Customer.statusType.RUNNING){
//							return msgHoatDong;
//						}else if(value == Customer.statusType.INACTIVE){
//							return msgTamNgung;
//						}else{
//							return 'Từ chối';
//						}
//					}
//					{field : 'status',title : msgTrangThai,width : 50*widthUnit, align : 'center',
                    formatter:function(    value, row,index) {    
                        var result='';
                        var style = '';
                        if(value == Customer.statusType.DRAFT){
                            result = msgDuThao;
                            style = 'statusDuThao';
                        }else if(value == Customer.statusType.RUNNING){
                            result =  msgHoatDong;
                            style = 'statusHoatDong';
                        }else if(value == Customer.statusType.INACTIVE){
                            result =  msgTamNgung;
                            style = 'statusTamNgung';
                        }else{
                            result =  'Từ chối';
                            style = 'statusKhongHoatDong';
                        }
                        return '<b class="'+style+'">'+ Utils.XSSEncode(result) + '</b>';
                    }
				},
				{field : 'staff',title : msgNhanVienPhuTrach,width : 100*widthUnit,resizable : false,
					formatter : function(value,row,index) {
						return Utils.XSSEncode(row.managerStaff);
					}
				},
				{field : 'saleGroup',title : Customer.titleSaleGroup,width : 60*widthUnit,resizable : false,
					formatter : function(value,row,index) {
						return Utils.XSSEncode(row.saleGroupName);
					}
				},
				{field : 'idEdit',resizable : false,width : 25*widthUnit, align : 'center',
					formatter : function(value,row,index) {
						idt ++;
						if ($('#isManager').val() == 'false' || isDmsLiteRole1){
							return format(ACTION_EDIT,'onclick="Customer.showCustomerEdit('+ Utils.XSSEncode(row.id)+ ')" tabindex="'+idt+'"');
						}else{
							return format(ACTION_VIEW,'onclick="Customer.showCustomerEdit('+ Utils.XSSEncode(row.id)+ ')" tabindex="'+idt+'"');
						}
					}

				},
				]],
				onLoadSuccess : function(data) {
					idt = 110;
					Customer.resizeNumRowOfGrid('#searchCustomerContainerGrid');
					$('#searchCustomerGrid').datagrid('resize',{width:$('#boxBodyTable').width()-10});
					var status = $('#status').val().trim();
					if(status==Customer.statusType.DRAFT || status==Customer.statusType.REJECT){
						$('#searchCustomerGrid').datagrid('hideColumn','customerCode');
					}else{
						$('#searchCustomerGrid').datagrid('showColumn','customerCode');
					}
					
					// Add tabindex for checkbox bootstrap
					var id = 110;
					$('.datagrid-cell-check input[name="id"]').each(function () {
						id++;
							$(this).wrap('<label class="el-checkbox el-checkbox-lg"></label>');
							$(this).after('<span class="el-checkbox-style el-lebel" tabindex="'+id+'"></span></label>');
					  });
					if($('.datagrid-header-check').find('label.el-checkbox').length == 0){
						$('.datagrid-header-check input[type=checkbox]').each(function () {
							$(this).wrap('<label class="el-checkbox el-checkbox-lg"></label>');
							$(this).after('<span class="el-checkbox-style el-lebel" tabindex="109"></span></label>');
					  });
					};
					// Add tabindex for footer table
					if($('.datagrid-pager').find('a.l-btn').length > 0){	
			    		$('.datagrid-pager').find('a.l-btn').eq(0).attr('tabindex',1910);
			    		$('.datagrid-pager').find('a.l-btn').eq(1).attr('tabindex',1911);
			    		$('.datagrid-pager').find('input').attr('tabindex',1912);
			    		$('.datagrid-pager').find('a.l-btn').eq(2).attr('tabindex',1913);
			    		$('.datagrid-pager').find('a.l-btn').eq(3).attr('tabindex',1914);
			    		$('.datagrid-pager').find('a.l-btn').eq(4).attr('tabindex',1915);
//			    		$('.datagrid-pager td').each(function () {
//			    			$(this).attr('tabindex',idfooter);
//			    			idfooter ++;
//			    		 });
			    	};	
			    	// Set event keypress space for checkbox
			    	$('#searchCustomerContainerGrid label').keypress(function(event) {
			 		    var keycode = (event.keyCode ? event.keyCode : event.which);
			 		    if (keycode == 32) {
			 		    	  $(this).click();
			 		    }   
			 		});
			    	
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
					$('#datagrid-row-r1-2-'+rowIndex+'').addClass('datagrid-row-selected-custom');
					Customer.mapCheckRow.put(rowData.id,rowData);
					
					if(rowData.status == Customer.statusType.DRAFT){
						if(Utils.isEmpty(Customer._COUNT_WAITING.get(rowData.id))){
							Customer._COUNT_WAITING.put(rowData.id, rowData.id);
						}
					}

					if(rowData.status == Customer.statusType.REJECT){
						if(Utils.isEmpty(Customer._COUNT_REJECT.get(rowData.id))){
							Customer._COUNT_REJECT.put(rowData.id, rowData.id);
						}
					}
					
				},
					onUncheck:function(rowIndex,rowData){
						$('#datagrid-row-r1-2-'+rowIndex+'').removeClass('datagrid-row-selected-custom');
					Customer.mapCheckRow.remove(rowData.id);
					if(rowData.status == Customer.statusType.DRAFT){
						if(!Utils.isEmpty(Customer._COUNT_WAITING.get(rowData.id))){
							Customer._COUNT_WAITING.remove(rowData.id);
						}
					}
					
					if(rowData.status == Customer.statusType.REJECT){
						if(!Utils.isEmpty(Customer._COUNT_REJECT.get(rowData.id))){
							Customer._COUNT_REJECT.remove(rowData.id);
						}
					}
				},
				onCheckAll:function(rows){
					$('.datagrid-header-check label').addClass('checkBoxHeaderselected-custom');
					if($.isArray(rows)) {
				  		for(var i = 0; i < rows.length; i++) {
				  			$('#datagrid-row-r1-2-'+i+'').addClass('datagrid-row-selected-custom');
				  			Customer.mapCheckRow.put(rows[i].id, rows[i]);

				  			if(rows[i].status == Customer.statusType.REJECT){
				  				if(Utils.isEmpty(Customer._COUNT_REJECT.get(rows[i].id))){
				  					Customer._COUNT_REJECT.put(rows[i].id, rows[i].id);
				  				}
				  			}else if(rows[i].status == Customer.statusType.DRAFT){
								if(Utils.isEmpty(Customer._COUNT_WAITING.get(rows[i].id))){
									Customer._COUNT_WAITING.put(rows[i].id, rows[i].id);
								}
							}
				  		}
				  	}
				},
				onUncheckAll:function(rows){
					$('.datagrid-header-check label').removeClass('checkBoxHeaderselected-custom');
					if($.isArray(rows)) {
				  		for(var i = 0; i < rows.length; i++) {
				  			$('#datagrid-row-r1-2-'+i+'').removeClass('datagrid-row-selected-custom');
				  			Customer.mapCheckRow.remove(rows[i].id);

				  			if(rows[i].status == Customer.statusType.REJECT){
				  				if(!Utils.isEmpty(Customer._COUNT_REJECT.get(rows[i].id))){
				  					Customer._COUNT_REJECT.remove(rows[i].id);
				  				}
				  			}else if(rows[i].status == Customer.statusType.DRAFT){
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
					saleGroupCode: '',
					saleGroupName: msgChonTat,
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
		$('#divOverlay_New').hide();
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
			setTimeout(function(){
				$('#errMsg').hide();
			}, 5000);
			return false;
		}else{

			if(type < 2){
				if(Customer._COUNT_WAITING.valArray.length >0){
					$('#errMsg').html(msgCustomerErr99+" "+Customer._COUNT_WAITING.valArray.length +" "+ msgCustomerErr100).show();
//					Utils.showMessage(msgCustomerErr99+" "+Customer._COUNT_WAITING.valArray.length +" "+ msgCustomerErr100);//LamNH
					setTimeout(function(){
						$('#errMsg').html("").hide();
					}, 10000);
					return false;
				}else if(Customer._COUNT_REJECT.valArray.length >0){
					$('#errMsg').html(msgCustomerErr99+" "+Customer._COUNT_REJECT.valArray.length +" "+ msgCustomerErr105).show();
//					Utils.showMessage(msgCustomerErr99+" "+Customer._COUNT_REJECT.valArray.length +" "+ msgCustomerErr105);//LamNH
					setTimeout(function(){						
						$('#errMsg').html("").hide();
					}, 10000);	
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
			//Utils.showMessage(msgTuyenErr2);//LamNH
			$('#errMsg').html(msgTuyenErr2).show();
			setTimeout(function(){
				$('#errMsg').hide();
			}, 5000);
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
			setTimeout(function(){
				$('#errMsg').hide();
			}, 5000);
			return false;
		}else{
			var msg = msgCustomerErr104 + " "+Customer.mapCheckRow.valArray.length + " "+msgCustomerErr103;
			var widthUnit = ($(window).width() - 0)/585;
			$('#cusTypeEasyUIDialog #popMess').html(msg);
			$('#cusTypeEasyUIDialog').dialog('open', 'center');
//			$('#mydialog').dialog('option', 'position', 'center');
//			$('#cusTypeEasyUIDialog').dialog();
//			$('#cusTypeEasyUIDialog').dialog('mymove',{
//			    left:  30*widthUnit,
//			    top: 30*widthUnit
//			});
//			$('.window').css({position:"absolute"});
//			$('.window').css({center: true});
//			$('#cusTypeEasyUIDialog').parent().position({my:'center',of:event,collison:'fit'});
					
		}
	},
	showDetailCustomer: function(){
		$.ajaxSetup({'cache':true});
		$('#divOverlay_New').show();
//		var params = new Object();
//		Utils.getHtmlDataByAjax(params, '/catalog/customer/detail',function(data) {
//			
//			$("#content").html(data).show();
//			$('#divOverlay').hide();
//		}, null, 'POST');
//		return false;
		$.ajax({
			type : 'GET',
			url : '/catalog/customer/detail',			
			dataType : "html",
			success : function(data) {
				$('#content').html(data);
				$('#divOverlay_New').hide();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$('#divOverlay_New').hide();
			}
		});
	},
//	cancelCustomerInfo:function(){
// 		$('#divOverlay').show();
//		$.ajax({
//			type : 'GET',
//			url : '/catalog/customer/info',			
//			dataType : "html",
//			success : function(data) {
//				$('#content').html(data);
//				$('#divOverlay').hide();
//			},
//			error:function(XMLHttpRequest, textStatus, errorThrown) {
//				$('#divOverlay').hide();
//			}
//		});
//	},
//	cancelCustomerInfo:function(){
//		$('#divOverlay').show();
//		var params = new Object();
//		Utils.getHtmlDataByAjax(params, '/catalog/customer/info',function(data) {
//			$("#content").html(data).show();
//			$('#divOverlay').hide();
//		}, null, 'POST');
//		return false;
//	},
	cancelCustomerInfo:function(){
 		window.location.href =WEB_CONTEXT_PATH+ '/catalog/customer/info';
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
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.customer.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.product.js
 */
/**
 * Product manager.
 * @author tulv2
 * @sine 20/05/2014
 */
var Product = {
	_xhrSave : null,
	_xhrDel: null,
	countArray:null,
	indexPrice : 1000,
	_basicMode : true,
	mapPrice : new Map(),
	mapPricePackage : new Map(),
	_zCat : "Z",
	hideTabs: function() {
		$('#tab1').removeClass('Active');
		$('#tab2').removeClass('Active');
		$('#tab3').removeClass('Active');
		$('#content1').hide();
		$('#content2').hide();
		$('#content3').hide();
		$('.ErrorMsgStyle').hide();
		$('.SuccessMsgStyle').hide();
//		Utils.hideMessage();//LamNH
	},
	activeTab1: function() {
		Product.hideTabs();
		$('#tab1').addClass('Active');
		$('#content1').show();
	},
	activeTab2: function() {
		Product.hideTabs();
		$('#tab2').addClass('Active');
		$('#content2').show();
		Product.loadImage();
	},
	activeTab3: function() {
		Product.hideTabs();
		$('#tab3').addClass('Active');
		$('#content3').show();
	},
			
	showDetailProduct: function(){
		$('#divOverlay').show();
//		window.location.href = '/catalog/product/view-product?productId=0';
		$.ajax({
			type : 'GET',
			url : WEB_CONTEXT_PATH +'/catalog/product/view-product?productId=0',			
			dataType : "html",
			success : function(data) {
				$('#content').html(data);
				$('#divOverlay').hide();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$('#divOverlay').hide();
			}
		});
	},	
	
	ViewProduct: function(){
		$('#divOverlay').show();
		var url = $(this).attr("href");
		$.ajax({
			type : 'GET',
			url : url,			
			dataType : "html",
			success : function(data) {
				$('#content').html(data);
				$('#divOverlay').hide();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$('#divOverlay').hide();
			}
		});
		return false;
	},	
	searchProduct: function() {
		var params = new Object();
		var categoryStr = '';
		var arr = $('#category').val();
		if (arr == null) arr = [];
//		if (arr.length > 0 && arr[0] == '-1') arr.splice(0, 1);
		var n = arr.length;
		for (var i = 0; i < n; i++) {
			if (i != 0) categoryStr += '-';
			categoryStr += arr[i];
		}
		params.productCode = $('#productCode').val().trim();
		params.productName = $('#productName').val().trim();
		params.categoryStr = categoryStr;
		params.statusValue = $('#status').val();

		//Tim kiem theo thuoc tinh dong - haupv3
		var arr1 = new Array();
		var arr2 = new Array();
		var arrMultiSize = new Array();
		if(Product._basicMode == false){
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

		params.lstAttIdArray = arr1.toString();
		params.lstAttValueArray = arr2.toString();
		params.lstMultiSizeArr = arrMultiSize.toString();

		$('#productGrid1').datagrid('load', params);
		return false;
	},
	fillCategories: function() {
		$.ajax({
			url: '/catalog/product/get-category',
			method: 'GET',
			success: function(rs) {
				if (rs.error != undefined && !rs.error) {
					var lstCategory = rs.rows;
					$('#category').removeAttr('disabled');
					var html = '';
					if(lstCategory.length > 0){
//						html += '<option value="-1" >--' + msgAll + '--</option>';
						/*html += '<option value="ALL">--' + msgAll + '--</option>';*/
						html += '<option value="OTHERS"  >'+notBelongToCategory+'</option>';
						for(var i=0; i < lstCategory.length; i++){
							html += '<option value="'+ Utils.XSSEncode(lstCategory[i].productInfoCode) +'">' +
								Utils.XSSEncode(lstCategory[i].productInfoCode) + ' - ' +
								Utils.XSSEncode(lstCategory[i].productInfoName) + '</option>';
						}
						$('#category').html(html);
						$('#category').change();
						$('#ddcl-category').remove();
						$('#ddcl-category-ddw').remove();
						/*$('#category').dropdownchecklist({
							emptyText:msgsChonNganhHang,
							firstItemChecksAll: true,
							maxDropHeight: 350
						});*/
						$('#category').multipleSelect({
                            emptyText:msgsChonNganhHang,
                            width: '100%',
                            placeholder: msgsChonNganhHang
                        });
					} else {
						$('#category').html('');
						$('#category').attr('disabled','disabled');
						$('#category').dropdownchecklist({
							emptyText:'-------------------',
							firstItemChecksAll: true,
							maxDropHeight: 350
						});
					}
					$('.ui-dropdownchecklist-text').css({"padding-left":"5px"});
					var w = $('#productCode').width() - 24;
					$('.CatSelectDiv .ui-dropdownchecklist-selector').css('width', w+'px');
					$('.CatSelectDiv #ddcl-category-ddw').css('width', (w + 33)+'px');
					$('.CatSelectDiv .MySelectBoxClass').css('width', $('#productCode').width()+ 'px');
				}
			}
		});
	},
	importExcel: function() {
		ReportsUtils.uploadExcel(function(){
			$('#productGrid1').datagrid('reload');
		});
	},
	exportExcel: function() {
		$('#errExcelMsg').html('').hide();
		$('#errMsg').html('').hide();
		$('#sucExcelMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		$.messager.confirm(msgXacNhan, msgQuestionExport, function(r){
			if (r){//point
				var params = new Object();
				var categoryStr = '';
				var arr = $('#category').val();
				if (arr == null) arr = [];
				if (arr.length > 0 && arr[0] == '-1') arr.splice(0, 1);
				var n = arr.length;
				for (var i = 0; i < n; i++) {
					if (i != 0) categoryStr += '-';
					categoryStr += arr[i];
				}
				params.productCode = $('#productCode').val().trim();
				params.productName = $('#productName').val().trim();
				params.categoryStr = categoryStr;
				params.statusValue = $('#status').val();
				//Tim kiem theo thuoc tinh dong - haupv3
				var arr1 = new Array();
				var arr2 = new Array();
				var arrMultiSize = new Array();
				if(Product._basicMode == false){
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

				params.lstAttIdArray = arr1.toString();
				params.lstAttValueArray = arr2.toString();
				params.lstMultiSizeArr = arrMultiSize.toString();

				var url = "/catalog/product/export-excel";
				CommonBusiness.exportExcelData(params, url, 'errExcelMsg', true);
			}
		});
 		return false;
	},
	beforeImportExcel: function(){
		if(!previewImportExcelFile(document.getElementById("excelFile"))){
			return false;
		}
		$('#errExcelMsg').html('').hide();
		$('#sucExcelMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		$('.VinamilkTheme #divOverlay').show();
		$('#divOverlay_New').show();
		return true;
	},
	afterImportExcelUpdate: function(responseText, statusText, xhr, $form){
		$('#excelFile').val('');
		$('#fakefilepc').val('');
		$('#productGrid1').datagrid('reload');
		$('.VinamilkTheme #divOverlay').hide();
		$('#divOverlay_New').hide();
		if (statusText == 'success') {
			Product.fillCategories();
	    	$("#responseDiv").html(responseText);
	    	var token = $('#tokenValue').html();
//	    	$('#tokenImportantValue').val(token);
			$('#token').val(token);
	    	if($('#errorExcel').html().trim() == 'true' || $('#errorExcelMsg').html().trim().length > 0){
	    		$('#errExcelMsg').html($('#errorExcelMsg').html()).show();
//	    		Utils.showMessage($('#errorExcelMsg').html());//LamNH
	    	} else {
	    		if($('#typeView').html().trim() == 'false'){
	    			var totalRow = parseInt($('#totalRow').html().trim());
	    			var numFail = parseInt($('#numFail').html().trim());
	    			var fileNameFail = $('#fileNameFail').html();
	    			var numSuccess =  totalRow - numFail ;
	    			//var mes = 'Nhập thành công ' + (totalRow - numFail) + ' dòng, thất bại ' + numFail + ' dòng. ';
	    			var mes = format(msgErr_result_import_excel, numSuccess , numFail);
	    			if(numFail > 0){
	    				mes += msgsXemChiTietLoi + '!';
	    				$('#sucExcelMsg').html('<a style="color:#f00" href="'+ fileNameFail +'">' +
	    						mes + '</a>').show();
//	    				Utils.showMessage('<a style="color:#f00" href="'+ fileNameFail +'">' +
//	    						mes + '</a>');//LamNH
	    			} else {
	    				$('#sucExcelMsg').html(mes).show();
//	    				Utils.showMessage(mes);//LamNH
	    			}

	    			setTimeout(function(){
						$('#sucExcelMsg').html('').hide();
//						Utils.hideMessage();//LamNH
					},15000);
	    		}
	    	}
	    }
	},
	showViewScreen: function(productId) {
		$('.VinamilkTheme #divOverlay').show();
		hrefPost('/catalog/product/view-product?productId=' + productId, {allowed:false});
		return false;
	},
	loadImage:function(seq,error, errMsg){
		$('#divOverlay').show();
		var productId = $("#productId").val().trim();
		var data = new Object();
		data.productId = productId;
		var kData = $.param(data, true);
		if (CKEDITOR.instances['description'] != null){
			CKEDITOR.instances['description'].destroy(true);
		}
		$.ajax({
			type : "POST",
			url : "/catalog/product/image",
			data : (kData),
			dataType: "html",
			success : function(data) {
				setTimeout(function(){
					$('#divOverlay').hide();
					$('#pageDown').show();
				 	if(Math.floor($('#numPage').val()/8) < 1){
						$('#pageDown').hide();
					}
				}, 500);
				$("#divImageProduct").html(data).show();
				if($('#language').val() != undefined && $('#language').val() == 'en'){
					editor = CKEDITOR.replace('description',{
						language : $('#language').val()
					});
				}else{
					editor = CKEDITOR.replace('description');
				}
				$('.cke_dialog_ui_hbox_last').css('padding', '5px');
				$('#divMI').css({'padding-left':0,'padding-right':0});
				var w = $('#divMI').width() - 310;
				if (w > 0) {
					$('#divMI').css({'padding-left':w/2,'padding-right':w/2});
				}
				if(seq!=undefined && seq!=null){
					if(error){
						$('#errMsgUpload').html(seq).show();
//						Utils.showMessage(seq);//LamNH
					}else{
						$('#successMsgUpload').html(seq).show();
//						Utils.showMessage(seq);//LamNH
					}
				}
				if (errMsg != undefined && errMsg != null){
					$('#errMsgUpload').html(errMsg).show();
//					Utils.showMessage(errMsg);//LamNH
				}
				Product.countArray = new Map();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH + '/check-session',
					dataType : "json",
					success : function(data) {
						if($('#language').val() != undefined && $('#language').val() == 'en'){
							editor = CKEDITOR.replace('description',{
								language : $('#language').val()
							});
						}else{
							editor = CKEDITOR.replace('description');
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
//						window.location.href = WEB_CONTEXT_PATH + '/home' ;
						Product.activeTab1();
					}
				});
			}
		});
		return false;
	},

	getListMediaItem:function(type){
		if(type == 0){
			if($('#numIndex').val() != null && parseInt($('#numIndex').val()) > 0){
				$('#numIndex').val(parseInt($('#numIndex').val())-1);
				if($('#numIndex').val() == 0){
					$('#pageUp').hide();
				}
			}
			$('#pageDown').show();
		}else{
			$('#numIndex').val(parseInt($('#numIndex').val())+1);
			if(($('#numIndex').val() == Math.floor($('#numPage').val()/8))||
					(parseInt($('#numIndex').val())+1 == Math.floor($('#numPage').val()/8)&&$('#numPage').val()%8==0)){
				$('#pageDown').hide();
			}
			$('#pageUp').show();
		}
		$.ajax({
			type : "POST",
			url : "/catalog/product/getlistmediaitem",
			data : ({productId:$('#productId').val(),numIndex:$('#numIndex').val()}),
			dataType: "html",
			success : function(data) {
				$('#divMI').html(data);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH + '/check-session',
					dataType : "json",
					success : function(data) {
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href = WEB_CONTEXT_PATH + '/home' ;
					}
				});
			}
		});
	},

	changeProductDescription:function(){
		var msg = '';
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
//			Utils.showMessage(errMsg);//LamNH
			return false;
		}
		$('#divOverlay_New').show();
		var dataModel = new Object();
		dataModel.productId = $('#productId').val();
		dataModel.introductionId = $('#introductionId').val();
		dataModel.description = CKEDITOR.instances['description'].getData();
		Utils.addOrSaveData(dataModel, "/catalog/product/change-product-description", Product._xhrSave, null,null);
		$('#divOverlay_New').hide();
		return false;
	},

	changeProductImage:function(productId){
		$('#errMsgUpload').html('').hide();
		Utils.hideMessage();//LamNH
		var msg = '';
		var size = parseInt($('#totalImage').val().trim()) + Product.countArray.size();
		if( size>20){
			msg = format(msgsFileUploadMax, 20);
		}
		if(msg.length==0 && $('#fileQueue').html().length>0 && Product.countArray.size()==0){
			msg = msgsNoImageChoose;
		}
		if(msg.length>0){
			$('#errMsgUpload').html(msg).show();
//			Utils.showMessage(errMsg);//LamNH
			return false;
		}
		$('#divOverlay').show();
		$('#imageFile').uploadifySettings('scriptData',{
			'productId':productId,
			'currentUser':currentUser,
			'langOfSession': langOfSession
		});
		if($('#videoMsg').html() != "" && parseInt($('#mediaType').val()) == 1){
			$('#videoMsg').html(msgsOnlyOneFileVideo).show();
		}
		$('#imageFile').uploadifyUpload();
		if($('#fileQueue').html() == "" || parseInt($('#successUpload').val().trim()) == 1){
			$('#importFrm').submit();
		}
		return false;
	},
	uploadVideo:function(){
		$('#importFrm').submit();
		return true;
	},
	beforeImportItem: function(){
		if(!Product.previewImportFile(document.getElementById("videoFile"),1)){
			$('#errorValue').val(1);
			$('#divOverlay').hide();
			return false;
		}
		$('#videoMsg').html('').hide();
		return true;
	},
	afterImportItem: function(responseText, statusText, xhr, $form){
		responseText = responseText.substring(5);
		responseText = responseText.substring(0, responseText.length - 6);
		eval("var obj="+responseText);
		var msg = '';
		var error = true;
		if(obj.status!=null && obj.status==2){
			 msg = format(msgsUploadFileTooLarge, 10);
		}else{

			if($('#countFail').val() <= 0){
				error = false;
			}
			if(obj.status == 1){
				//msg = "Tải thành công "+ $('#countSuccess').val() +" hình ảnh,tải thất bại "+ $('#countFail').val() +" hình ảnh và 1 video";
				msg = format(msgsThongBaoKQImport2_1, $('#countSuccess').val(), $('#countFail').val());
				if (!StringUtils.isNullOrEmpty(obj.errMsg)){
					$('#errMsgUpload').html(obj.errMsg).show();
//					Utils.showMessage(obj.errMsg);//LamNH
					error = true;
					Product.loadImage(obj.errMsg, error);
				}
			}else {
				msg = format(msgsThongBaoKQImport3_1, $('#countSuccess').val(), $('#countFail').val());
				Product.loadImage(msg,error);
			}
		}
		$('#divOverlay').hide();
	},
	previewImportFile:function (fileObj,type){
		if(type == 0){
			if (fileObj.value != '') {
				if (!/(\.jpg|\.png)$/i.test(fileObj.value)) {
					$('#errMsgUpload').html(msgsFileKhongHopLe).show();
//					Utils.showMessage(msgsFileKhongHopLe);//LamNH
					fileObj.value = '';
					fileObj.focus();
					$('#errorValue').val(1);
					return false;
				} else {
					$('#errorValue').val(0);
					$('#errMsgUpload').html('').hide();
					Utils.hideMessage();//LamNH
				}
			}else{
				$('#errMsgUpload').html(msgsNoFileChoose1).show();
//				Utils.showMessage(msgsNoFileChoose1);//LamNH
				$('#successUpload').val(1);
				return false;
			}
		}else{
			if (fileObj.value != '') {
				if (!/(\.mp4|\.avi|\.flv)$/i.test(fileObj.value)) {
					$('#errMsgUpload').html(msgsFileNotRightType).show();
//					Utils.showMessage(msgsFileNotRightType);//LamNH
					fileObj.value = '';
					fileObj.focus();
					$('#errorValue').val(1);
					return false;
				} else if(fileObj.files[0].size > 10485760){//>10M
					$('#errMsgUpload').html(format(msgsUploadFileTooLarge, 10)).show();
//					Utils.showMessage(format(msgsUploadFileTooLarge, 10));//LamNH
					fileObj.value = '';
					fileObj.focus();
					$('#errorValue').val(1);
					return false;
				} else{
					$('#errorValue').val(0);
					$('#videoMsg').html(fileObj.value).show();
				}
			}else{
				$('#errMsgUpload').html(msgsNoFileChoose1).show();
//				Utils.showMessage(msgsNoFileChoose1);//LamNH
				$('#errorValue').val(1);
				return false;
			}
		}
		return true;
	},

	deleteMediaItem: function(){
		var dataModel = new Object();
		dataModel.mediaItemId = $('#mediaItemId').val();
		$.messager.confirm(msgXacNhan, msgsConfirmDelete1, function(r){
			if (r){
				Utils.saveData(dataModel, "/catalog/product/remove-media-item", Product._xhrDel, null,function(data){
					Product.loadImage();
				},null,null,true);
			}
		});
		return false;
	},

	liveUpdateImageForProduct:function (object,mediaType,mediaItemId,checkPermission){
		$('#mediaItemId').val(mediaItemId);
		if(mediaType == 0){
			$('#player').html('').hide();
			$('#imageBox').show();
			var orgSrc = object.attr('data');
			var source = imgServerPath+orgSrc;
			$('#imageBox').html('<img width="715" height="551" alt="" src="'+source+'" />');
			if (checkPermission == 1) {
				$('#imageBox').append('<a class="Sprite1 HideText DeleteLinkStyle" onclick="return Product.deleteMediaItem();" href="javascript:void(0)">' + msgText4 +'</a>');
			}
		}else{
			$('#player').show();
			$('#imageBox').hide();
			var orgSrc = object.attr('data');
			var source = imgServerPath+orgSrc;
			if(orgSrc.substring(orgSrc.length - 3,orgSrc.length) == 'avi'){
				$('#player').html('<a class="media" href="'+source+'"></a>');
				$('.media').media({width:715, height:551, autoplay: true});
			}else{
				flowplayer("player", WEB_CONTEXT_PATH + "/resources/scripts/plugins/flowplayer-3.2.16/flowplayer/flowplayer-3.2.16.swf",{
					plugins: {
						audio: {
							url: WEB_CONTEXT_PATH + '/resources/scripts/plugins/flowplayer-3.2.16/flowplayer/audio/flowplayer.audio-3.2.10.swf'
						}
					},
					clip: {
						url: source,
						autoPlay: true,
						autoBuffering: true
					},
					play: {
						replayLabel: msgsXemlai
					}
				});
			}
		}
		var w = $('.GeneralMIn.MediaPlayerSection').width();
		w = w + w * .15;
		$('#videoBox #player').width(w);
		$('#videoBox #player .media').width(w);
		$('#videoBox #player object').width(w);
	},
	exportExcelTemplate:function(){
		var url='/catalog/product/export-template-excel-product';
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
				hideLoadingIcon();
				$('#divOverlay_New').hide();
				if(data.error && data.errMsg!= undefined){
					$('#'+ errMsg).html(msgsThongBaoKQImport3 + escapeSpecialChar(data.errMsg)).show();
//					Utils.showMessage(msgsThongBaoKQImport3 + escapeSpecialChar(data.errMsg));//LamNH
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						$('#'+ errMsg).html(msgsThongBaoKQImport2).show();
//						Utils.showMessage(msgsThongBaoKQImport2);//LamNH
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
	changeProduct : function(){
		$('#errMsgTab1').html("").hide();
		$('#sucMsgTab1').html("").hide();
		$('#successMsgDelete').html("").hide();
		Utils.hideMessage();//LamNH
 		var message = "";
 		var flag = false;
 		$('.requirements').each(function(){
 			if (this.value == undefined || this.value == null || this.value == ""){
 				flag = true;
 			}
 		});
 		if (flag){
 			$('#errMsgTab1').html(msgTuyen11+'<span class="ReqiureStyle">(*)</span>').show();
// 			Utils.showMessage(msgTuyen11+'<span class="ReqiureStyle">(*)</span>');//LamNH
 			return false;
 		}
		if(message.length == 0){
			message = Utils.getMessageOfSpecialCharactersValidate('productCode',msgMaSanPham,Utils._CODE);
		}
		if(message.length == 0){
//			if(/[<>\\/?]/g.test($('#productName').val()) == true ){
			if(/[<>]/g.test($('#productName').val()) == true ){
				message = msgTenSpKhongDcChua;
			}
		}
		if(message.length == 0){
			if($('#convfact').val() != '' && Number($('#convfact').val()) <= 0){
				message = msgTuyen13;
			}
		}
 		if (message != ''){
 			$('#errMsgTab1').html(message).show();
// 			Utils.showMessage(message);//LamNH
 			return false;
 		}
 		
 		$('#divOverlay_New').show();
 		
 		var dataModel = new Object();
 		dataModel.productId = $('#productId').val();
 		dataModel.productCode = $('#productCode').val().trim();
 		dataModel.productName = $('#productName').val().trim();
 		dataModel.catCode = $('#catCode').val();
 		dataModel.subCatCode = $('#subCatCode').val();
 		dataModel.brandCode = $('#brandCode').val();
 		dataModel.packingCode = $('#packingCode').val();
 		dataModel.flavourCode = $('#flavourCode').val();
 		dataModel.convfact = $('#convfact').val();
 		dataModel.uom1Code = $('#uom1Code').val();
 		dataModel.uom2Code = $('#uom2Code').val();
 		dataModel.grossWeight = $('#grossWeight').val();
 		dataModel.volumn = $('#volumn').val();
 		dataModel.netWeight = $('#netWeight').val();
 		dataModel.expiryDate = $('#expiryDate').val();
 		dataModel.expiryType = $('#expiryType').val();
 		dataModel.vat = $('#vat').val();
 		dataModel.status = $('#status').val();
 		var length = $('#priceGrid').datagrid('getRows').length;
 		for(var i = 0; i <= length ; i++){
 			$('#priceGrid').datagrid('selectRow',i);
 		}

 		$('#productName').focus();
 		var rows = $('#priceGrid').datagrid('getChanges');
 		var priceList = new Array(); // gia le
 		var pricePackageList = new Array(); // gia thung
 		var customerTypeList = new Array();
 		var idList = new Array();
 		var customerTypeId = 0;
 		var flag = false;
 		var isHavePriceCompany = true;
 		var isHavePriceType = false;

 		var pdCat = $('#catCode').val();
 		var isZCat = false;
 		var isCompanyPrice = false;
 		if(!Utils.isEmpty(pdCat)){
 			if(pdCat == Product._zCat){
 				isZCat = true;
 			}
 		}


 		var hasChange = false;
 		for(var i = 0; i < rows.length ; i++){
 			hasChange = true;
 			if(rows[i].customerType != null){
 				customerTypeId = rows[i].customerType.id;
 				if((rows[i].price != '' && rows[i].price != null && rows[i].price != undefined)
 	 				||(rows[i].pricePackage != '' && rows[i].pricePackage != null && rows[i].pricePackage != undefined)){
 					isHavePriceType = true;
 				}
 			}else{
 				customerTypeId = 0;
 				isCompanyPrice = true;
 				if((rows[i].price == '' || rows[i].price == null || rows[i].price == undefined)
 					&&(rows[i].pricePackage == '' || rows[i].pricePackage == null || rows[i].pricePackage == undefined)){
 					flag = true;
 					isHavePriceCompany = false;
 				}
 			}

 			//anhhpt: kiem tra gia thung > gia le
 			if( !isNullOrEmpty(rows[i].price) && !isNullOrEmpty(rows[i].pricePackage) &&
 				Number(rows[i].price) > Number(rows[i].pricePackage)){
 				var msg = format(msgComapareValue,i18n.price_retail_info.toLowerCase(),msgGiaThung.toLowerCase());
 				$('#errMsgTab1').html(msg).show();
// 				Utils.showMessage(msg);//LamNH
 				$('#divOverlay_New').hide();
 				return false;
 			}


 			priceList.push(rows[i].price);
 			pricePackageList.push(rows[i].pricePackage);

 			var rowType = "";
 			if(rows[i].customerType == null){
 				rowType = msgTuyen10;
 			}else{
 				rowType = rows[i].customerType.channelTypeName;
 			}

 			if(rows[i].price != null && rows[i].price != ""){
 				if((Number(rows[i].price) == 0)){
 	 				if(isZCat == false){
 	 					$('#errMsgTab1').html(msgPriceAtLine + " " + rowType +" "+msgMustBeGreaterThanZero).show();
// 	 					Utils.showMessage(msgPriceAtLine + " " + rowType +" "+msgMustBeGreaterThanZero);//LamNH
 	 					$('#divOverlay_New').hide();
 	 					return false;
 	 				}
 				}

 			}

 			if(rows[i].pricePackage != null && rows[i].pricePackage != ""){
 				if((Number(rows[i].pricePackage) == 0)){
 	 				if(isZCat == false){
 	 					$('#errMsgTab1').html(msgPriceAtLine + " " + rowType +" "+msgMustBeGreaterThanZero).show();
// 	 					Utils.showMessage(msgPriceAtLine + " " + rowType +" "+msgMustBeGreaterThanZero);//LamNH
 	 					$('#divOverlay_New').hide();
 	 					return false;
 	 				}
 				}

 			}

// 			if( (Number(rows[i].price != Number(Product.mapPrice.get(i)))) ||
// 					(Number(rows[i].pricePackage != Number(Product.mapPricePackage.get(i)))) )
// 					{
 						if(!isNullOrEmpty(customerTypeId)){
 							customerTypeList.push(customerTypeId);
 						}else{
 							customerTypeList.push("0");
 						}
// 					}

 			idList.push(rows[i].id);
 		}

 		if(isHavePriceType && !isHavePriceCompany && flag){
 			$('#errMsgTab1').html(msgTuyen12).show();
// 			Utils.showMessage(msgTuyen12);//LamNH
 			$('#divOverlay_New').hide();
 			return false;
 		}
 		dataModel.priceList = priceList;
 		dataModel.pricePackageList = pricePackageList;
 		dataModel.customerTypeList = customerTypeList;
 		dataModel.idList = idList;
		Utils.addOrSaveData(dataModel, "/catalog/product/change-product", Product._xhrSave, 'errMsgTab1',function(data){
			$('#sucMsgTab1').html(msgCommon1).show();
//			Utils.showMessage(msgCommon1);//LamNH
//			var tm = setTimeout(function(){
//				$('#sucMsgTab1').html('').hide();
//				Utils.hideMessage();//LamNH
//				clearTimeout(tm);
//			}, 10000);
			
//			Edit load ajax for content SinhTV
			var params = new Object();
			Utils.getHtmlDataByAjaxNotOverlay(params, '/catalog/product/view-product?productId='+data.productId, function(data) {
				$('#sucMsgTab1').html('').hide();
				$("#content").html(data).show();
			}, null, 'POST');
			
//			window.location.href = '/catalog/product/view-product?productId='+data.productId;
		});
		$('#divOverlay_New').show();
		return false;
	},
	viewPriceHistory:function(customerTypeId,customerTypeName,productId){
		$('#viewDiv').css('visibility','visible');
		$('#viewDialog').dialog('open');
		//START
		$('.window').css({top:"30"});
		//END
		$('#applyType').html(customerTypeName);
		var url = Product.getPriceHistoryUrl(customerTypeId, customerTypeName,productId);
		$("#gridDialog").datagrid({
			  url:url,
		  	  pageList  : [10,20,30],
			  width: 500,
			  pageSize : 10,
			  height:'auto',
			  scrollbarSize : 0,
			  pagination:true,
			  pageNumber:1,
			  fitColumns:true,
			  method : 'GET',
			  rownumbers: true,
			  columns:[[
			    {field: 'price', title: msgGiaLe, width: 200, sortable:false,resizable:false, align: 'left',
			    	formatter:function(value, row, index){
			    		if(!Utils.isEmpty(value)){
			    			return formatFloatValue(Utils.XSSEncode(value),numFloat);
			    		}
			    		return value;
			    	}
			    },
			    {field: 'pricePackage', title: msgGiaThung, width: 200, sortable:false,resizable:false, align: 'left',
			    	formatter:function(value, row, index){
			    		if(!Utils.isEmpty(value)){
			    			return formatFloatValue(Utils.XSSEncode(value),numFloat);
			    		}
			    		return value;
			    	}
			    },
				{field: 'fromDate', title: msgTuNgay, width: 150, sortable:false,resizable:false, align: 'center',
		        	  formatter:function(value, row, index) {
		        		  if(row.fromDate!=null){
//	        			  		var date = moment(row.fromDate);
//		   						var d = new Date(date.parseZone().format());
//		   						return $.datepicker.formatDate('dd/mm/yy', d);
		        			  return DateUtils.formatDateTime(Utils.XSSEncode(row.fromDate));
		        		  }
			          }
			    },
			    {field: 'toDate', title: msgDenNgay, width: 150, sortable:false,resizable:false, align: 'center',
		        	  formatter:function(value, row, index) {
		        		  if(row.toDate!=null){
//		        			  	var date = moment(row.toDate);
//	   							var d = new Date(date.parseZone().format());
//		   						return $.datepicker.formatDate('dd/mm/yy', d);
		        			  return DateUtils.formatDateTime(Utils.XSSEncode(row.toDate));
		        		  }
			          }
			    },
			  ]],
			  onLoadSuccess:function(){
			      	var easyDiv = '#gridDialogContainer ';
			    	$(easyDiv+'.datagrid-header-rownumber').html(stt_label);
		    		updateRownumWidthForDataGrid('#gridDialog');
		    		$(window).resize();
			  }
		});
		return false;
	},
	getPriceHistoryUrl:function(customerTypeId, customerTypeName,productId){
		return WEB_CONTEXT_PATH + "/catalog/product/price-history?&customerTypeName="+ encodeChar(customerTypeName)
				+ "&customerTypeId=" + customerTypeId
				+ "&productId=" + productId;
	},
	saveProperty: function() {
		$('#divOverlay_New').show();
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
		dataModel.productId = $('#productId').val();
		Utils.addOrSaveData(dataModel, "/catalog/product/product-saveproperty",
				Customer._xhrSave, 'errMsgProperty', function(data) {
				if(data.error != null && data.error == false){
					$('#successMsg').html(msgCommon1).show();
//					Utils.showMessage(msgCommon1);//LamNH
				} else {
					$('#errMsgProperty').html(data.errMsg).show();
//					Utils.showMessage(data.errMsg);//LamNH
				}
			}, null);
		$('#divOverlay_New').hide();
		return false;
	},
	removePrice : function(customerTypeId,productId){
		$.messager.confirm(msgXacNhan, xoaGia, function(r){
			if (r){
				var dataModel = new Object();
				dataModel.customerTypeId = customerTypeId;
				dataModel.productId = productId;
				Utils.addOrSaveData(dataModel, "/catalog/product/remove-price",Product._xhrSave, 'errMsgProperty', function(data) {
					if(data.error != null && data.error == false){
						$('#successMsgDelete').html(msgStopPrice).show();
					} else {
						$('#errMsgProperty').html(data.errMsg).show();
					}
					var tm = setTimeout(function(){
						$("#priceGrid").datagrid("reload");
						clearTimeout(tm);
					}, 1500);
					
//					window.location.href = '/catalog/product/view-product?productId='+data.productId;
					
//					var params = new Object();
//					Utils.getHtmlDataByAjax(params, '/catalog/product/view-product?productId='+data.productId, function(data) {
//						$("#content").html(data).show();
//					}, null, 'POST');
//					return false;
					
				}, null);
			}
		});
 		return false;
	}
};

/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.product.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.staff.js
 */
/**
   Quan ly danh muc nhan vien
 * @author tientv11
 * @sine 05/05/2014
 */
var Staff = {
	_xhrSave : null,
	_staffSearch:new Object(),
	searchStaff: function(){
		$('#errMsg').html('').hide();
		Staff._staffSearch.staffCode= $('#staffCode').val().trim();
		Staff._staffSearch.staffName= $('#staffName').val().trim();
		Staff._staffSearch.status= $('#status').val().trim();
		$('#gridStaff').datagrid('load',Staff._staffSearch);
		return false;
	},
	importExcel: function () {
        $('#importFrm').attr("action","/catalog/staff/import-excel?token="+$('#token').val());
        $('#importFrm').submit();
        return false;
    },
	saveOrUpdate:function(){
		var msg = '';
		$('#errMsg').hide();
		msg = ValidateUtils.getMessageOfRequireCheck('staffCode', jspKho_MaNV);
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('staffCode', jspKho_MaNV, Utils._CODE);
		}
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfRequireCheck('staffName', jspKho_TenNV);
		}
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('staffName', jspKho_TenNV, Utils._NAME);
		}
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfRequireCheck('gender', Staff_gender, true);
		}
		var startDate = $('#startDate').val().trim();
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfInvalidFormatDate('startDate', 'Ngày bắt đầu làm việc');
		}

		var s = $('#education').val().trim();
		if (msg.length == 0 && s.length > 50) {
			msg = 'Trình độ chỉ được nhập tối đa 50 ký tự';
			$('#education').focus();
		}

		var cmnd = $('#idNo').val().trim();
		if (cmnd.length > 0 && msg.length == 0 && !/\d/.test(cmnd)) {
			msg = 'CMND chỉ chứa các giá trị số.';
			$('#idNo').focus();
		}
		if (msg.length == 0 && cmnd.length > 40) {
			msg = 'CMND chỉ được nhập tối đa 40 ký tự';
			$('#idNo').focus();
		}
		var idNoDate = $('#idNoDate').val().trim();
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfInvalidFormatDate('idNoDate', 'Ngày cấp');
		}
		s = $('#idNoPlace').val().trim();
		if (msg.length == 0 && s.length > 250) {
			msg = 'Nơi cấp chỉ được nhập tối đa 250 ký tự';
			$('#idNoPlace').focus();
		}
		s = $('#position').val().trim();
		if (msg.length == 0 && s.length > 50) {
			msg = 'Vị trí chức danh chỉ được nhập tối đa 50 ký tự';
			$('#position').focus();
		}

		s = $('#houseNumber').val().trim();
		if (msg.length == 0 && s.length > 50) {
			msg = 'Số nhà chỉ được nhập tối đa 50 ký tự';
			$('#houseNumber').focus();
		}

		s = $('#street').val().trim();
		if (msg.length == 0 && s.length > 100) {
			msg = 'Nơi cấp chỉ được nhập tối đa 100 ký tự';
			$('#street').focus();
		}

		// dia ban
		var tr = $('#area').combotree('tree');
		var n = tr.tree('getSelected');
		if (msg.length == 0 && n == null) {
			msg = 'Bạn chưa chọn giá trị cho trường Địa bàn';
		}
		if (msg.length == 0 && n.attributes.area.type != 'WARD') {
			msg = 'Địa bàn phải chọn đến cấp phường/xã';
		}
		var mobi = $('#mobilePhone').val().trim();
		if (mobi.length > 0 && msg.length == 0 && !/\d/.test(mobi)) {
			msg = 'Số di động chỉ chứa các giá trị số.';
			$('#mobilePhone').focus();
		}
		if (msg.length == 0 && mobi.length > 20) {
			msg = 'Số di động chỉ được nhập tối đa 20 ký tự';
			$('#mobilePhone').focus();
		}
		var phone = $('#phone').val().trim();
		if (phone.length > 0 && msg.length == 0 && !/\d/.test(phone)) {
			msg = 'Số cố định chỉ chứa các giá trị số.';
			$('#phone').focus();
		}
		if (msg.length == 0 && phone.length > 20) {
			msg = 'Số cố định chỉ được nhập tối đa 20 ký tự';
			$('#phone').focus();
		}
		// email
		var email = $('#email').val().trim();
		if (email.length > 0 && msg.length == 0) {
			msg = ValidateUtils.getMessageOfInvalidEmailFormat('email', 'Email');
		}
		if (msg.length == 0 && email.length > 50) {
			msg = 'Số cố định chỉ được nhập tối đa 50 ký tự';
			$('#email').focus();
		}
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfRequireCheck('staffType', 'Chức vụ', true);
		}
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfRequireCheck('status', msgTrangThai, true);
		}

		if (msg.length > 0) {
			$('#errMsg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
		dataModel.id = $('#staffId').val().trim();
		var staffCode = $('#staffCode').val().trim();
		dataModel.staffCode = staffCode;
		dataModel.staffName = $('#staffName').val().trim();
		dataModel.gender = $('#gender').val().trim();
		dataModel.startWorkingDate = startDate;
		dataModel.education = $('#education').val().trim();
		dataModel.idNumber = cmnd;
		dataModel.idNoDate = idNoDate;
		dataModel.idNoPlace = $('#idNoPlace').val().trim();
		dataModel.position = $('#position').val().trim();
		dataModel.houseNumber = $('#houseNumber').val().trim();
		dataModel.street = $('#street').val().trim();
		dataModel.areaId = n.id;
		dataModel.mobilePhone = mobi;
		dataModel.phone = phone;
		dataModel.email = email;
		dataModel.staffType = $('#staffType').val().trim();
		dataModel.status = $('#status').val().trim();
		$.messager.confirm(msgXacNhan, 'Bạn có muốn lưu thông tin nhân viên?', function(r){
			if (r) {
				Utils.saveData(dataModel, '/catalog/staff/save-or-update', Staff._xhrSave, 'errMsg',
					function(data) {
						if (!data.error) {
							$('#staffCode').attr('disabled', 'disabled');
							$('#staffCode').val(staffCode.toUpperCase());
							$('#staffName').focus();
							history.pushState('', '', '/catalog/distributor/staff/detail?id=' + data.id);
							$('#staffId').val(data.id);
							$('#sucMsg').html(msgCommon1).show();
							setTimeout(function() {$('#sucMsg').hide();}, 3000);
						}
				}, 'loading2', '');
			}
		});
		return false;
	}
};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.staff.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.mcp-catalog.js
 */
var MCPCatalog = {
		_mapMultiSelectSub:null,
		_mapMultiSelect:null,
		_xhrSave : null,
		_xhrSearch : null,
		parentsId:null,
		searchFilter:null,
		selectNodeTree:-1,
		isRefresh:false,
		isUpdate:false,
		_idSearch:null,
		_shopCodeSearch:null,
		_mcpCodeSearch:null,
		_nextRoutingCode:null,
		_mcpShopIdSearch:null,
		_mcpId:null,
		_lstRoutingCode: new Map(),
		_idCus:null,//dung khi thay doi 1 kh vao mcp khac
		_mcpIdSelect:-1,
		_title:'',
		_shopCodeExcel:null,
		flag : true,
		search: function(mcpId,isNotSearch) {
			var msg = '';
			$('#errMsg').html('').hide();
			$('#errExcelMsg').html('').hide();
			var node = $('#tree').tree('getSelected');
			if (mcpId == null || mcpId == undefined) {
				if (node != null && node.id != null) {
					mcpId = node.id;
				} else {
					mcpId = 0 ;
				}
			} else {
				$('#infoCustomer').html(msgTuyen1);
			}
			var shopCode = MCPCatalog._mcpShopIdSearch;
			var customerCode = $('#customerCode').val().trim();
			var customerName = $('#customerName').val().trim();
			var status = $('#status').val();
			if(msg.length > 0){
				$('#errMsg').html(msg).show();
				return false;
			}
			var houseNumberOrStreet = '';
			var areaId = '';
			var groupId = 0;
			if($('#chooseGroup').val() != "" && $('#chooseGroup').val().length > 0){
				groupId = $('#chooseGroup').val();
			}
			$('#grid').datagrid('load',{page : 1,groupId:groupId, shopId: $('#shopIdLogin').val(), isNotSearch: isNotSearch,mcpId : mcpId,customerCode: customerCode, customerName: Utils.XSSEncode(customerName, false), status: status, houseNumberOrStreet: houseNumberOrStreet, areaId: areaId });
			if($('#supervisorUser').val() == 'true' && mcpId > 0){
				MCPCatalog._title = '<a href="javascript:void(0);" onclick="return MCPCatalog.openAddCusInMCPPopup();"><img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_add.png"/></a>';
				$('#btnInsert').css('visibility', 'visible');
				$(".datagrid-htable td[field='edit'] .datagrid-cell").html(MCPCatalog._title);
			}else{
				$('#btnInsert').css('visibility', 'hidden');
				$(".datagrid-htable td[field='edit'] .datagrid-cell").html('');
			}
		},

		//ham tim kiem theo cay MCP
		searchMCPTree: function(shopCode) {
			$('#errMsg').html('').hide();
			if (shopCode != null && shopCode != undefined && shopCode != ""){
				MCPCatalog.loadAreaTree(null,shopCode);
				MCPCatalog._shopCodeExcel = shopCode;
			} else {
				$('#errMsg').html(msgTuyenErr1).show();
				return false;
			}
		},

		//ham mo dialog Chuyen KH vao MCPID
		openChangeCusInMCPPopup:function(idCus){
			$('#errMsg').html('').hide();
			$('#errExcelMsg').html('').hide();
			if(idCus!= undefined){
				MCPCatalog._idCus = idCus;
			}else{
				if(MCPCatalog._mapMutilSelect == null || MCPCatalog._mapMutilSelect.size() <= 0){
					$('#errMsg').html(msgTuyenErr2).show();
					return false;
				}
			}
			$('#changeCusInMCPPopupDIV').css('visibility','visible');
			$('#errMsgPopup3').hide();
			var html = $('#changeCusInMCPPopup').html();
			$('#changeCusInMCPPopup').dialog({
				closed: false,
		        cache: false,
		        modal: true,
		        position: 'middle',
		        center: true,
				onOpen: function(){
		        	$('.easyui-dialog #mcpidCBX').customStyle();
		        	var groupId = 0;
		        	if($('#chooseGroup').val() != "" && $('#chooseGroup').val().length > 0){
		        		groupId = $('#chooseGroup').val();
		        	}
		        	Utils.getJSON('/rest/catalog/get-list-routing/'+ $('#shopIdLogin').val() +'/'+ groupId +'/list.json', function(data){
		        		var arrHtml = new Array();
		        		for(var i=0;i<data.length;i++){
		        			arrHtml.push('<option value="'+ data[i].value +'">'+ Utils.XSSEncode(data[i].name) +'</option>');
		        		}
		        		$('#mcpidCBX').html($('#mcpidCBX').html()+arrHtml.join(""));
		        		$('#mcpidCBX').change();
		        	});
		        },
				onClose : function(){
					MCPCatalog._idCus = null;
					$('#changeCusInMCPPopup').html(html);
					$('#changeCusInMCPPopupDIV').css('visibility','hidden');
		        }
			});
			return false;
		},
		//ham add KH vao MCP (tren popup chuyen kh vao mcpid)
		insertCusToMCP:function(){
			var dataModel = new Object();
			if(MCPCatalog._idCus != null){
				dataModel.lstCusId = MCPCatalog._idCus;
			}else{
				if(MCPCatalog._mapMutilSelect == null || MCPCatalog._mapMutilSelect.size() <= 0) {
					$('#errMsgPopup3').html(msgTuyenErr2).show();
	        		return false;
	        	}
				var mapKey = MCPCatalog._mapMutilSelect.keyArray;
				var mapValue = MCPCatalog._mapMutilSelect.valArray;
				dataModel.lstCusId = mapValue;
			}
			var mcpidCBX = $('#mcpidCBX').val();
			if(MCPCatalog._mcpIdSelect==mcpidCBX){
				$('#errMsgPopup3').html(msgTuyenErr3).show();
        		return false;
			}
			dataModel.mcpId = $('#mcpidCBX').val();
			MCPCatalog.saveCus(dataModel);
		},

		//ham init dialog them moi MCPID
		initEditMCP: function(isCreate) {
			$('#errMsgTree').html('').hide();
			MCPCatalog._mcpCodeSearch = null;
			MCPCatalog._mcpCodeSearch = $('#mcpSearchCode').val();
			//Mo dialog Them/Chinh sua MCPID
			$('#addNewMCPPopupDIV').css('visibility','visible');
//			$('#mcpCode').val(MCPCatalog._nextRoutingCode);
			if(isCreate != null && isCreate != undefined && isCreate == false){
				$('#mcpCode').attr('disabled',true);
			}else if(isCreate != null && isCreate != undefined && isCreate == true){
				$('#mcpCode').attr('disabled',false);
			}

			$('#mcpCode').val('');
			$('#mcpName').val('');
			$('#mcpCode').focus();
			var html = $('#addNewMCPPopup').html();
			$('#addNewMCPPopup').dialog({
		        closed: false,
		        cache: false,
		        modal: true,
		        position: 'middle',
		        center: true,
		        onOpen: function(){
		        	$('.easyui-dialog #saleStaffSelector').customStyle();
		        	var groupId = 0;
		        	if($('#chooseGroup').val() != "" && $('#chooseGroup').val().length > 0){
		        		groupId = $('#chooseGroup').val();
		        	}
		        	Utils.getJSON('/rest/catalog/sale-staff/'+ currentUser +'/'+ groupId +'/list.json', function(data){
		        		var arrHtml = new Array();
		        		for(var i=0;i<data.length;i++){
		        			arrHtml.push('<option value="'+ data[i].value +'">'+ Utils.XSSEncode(data[i].name) +'</option>');
		        		}
		        		$('#saleStaffSelector').html($('#saleStaffSelector').html()+arrHtml.join(""));
		        		$('#saleStaffSelector').change();
		        	});
		        	if(isCreate){
		        		$('#btnEditMCP').html(msgText2);
		        		MCPCatalog.flag = true;
		        		$('#errMsgMCPAddPopup').hide();
		        	}else{
		        		$('#btnEditMCP').html(msgText3);
		        		MCPCatalog.flag = false;
		        		var node = $('#tree').tree('getSelected');
						if(node!=null && node.id > 0){
							setTimeout(function(){
								Utils.getJSON('/rest/catalog/routing-info/'+ node.id +'.json', function(data){
									$('#mcpCode').val(data.content1);
									$('#mcpName').val(data.content2);
									if(data != null && data != undefined && data.content3 != undefined){
										$('#saleStaffSelector').val(parseInt(data.content3));
										$('#saleStaffSelector').change();
									}
								});
							},500);
						}
		        	}
		        },
		        onBeforeClose: function() {
		        },
		        onClose : function(){
		        	$('#addNewMCPPopup').html(html);
		        	$('#addNewMCPPopupDIV').css('visibility','hidden');
		        }
		    });
			return false;
		},

		//ham them moi MCPID
		editMCP: function() {
			$('#errMsgMCPAddPopup').html('').hide();
			var msg = "";
			msg = Utils.getMessageOfRequireCheck('mcpCode',msgTuyen4);
			if (msg.length == 0) {
				msg = Utils.getMessageOfSpecialCharactersValidate('mcpCode',msgTuyen4,Utils._CODE);
			}
			if (msg.length == 0) {
				msg = Utils.getMessageOfRequireCheck('mcpName',msgTuyen5);
			}
			if (msg.length == 0) {
				msg = Utils.getMessageOfSpecialCharactersValidate('mcpName',msgTuyen5, Utils._NAME);
			}
			if (msg.length == 0) {
				msg = Utils.getMessageOfRequireCheck('saleStaffSelector',msgTuyen6, true);
			}
			if (msg.length > 0) {
				$('#errMsgMCPAddPopup').html(msg).show();
				return false;
			}
			var dataModel = new Object();
			var mcpDom = $('#mcpCode');
			var mcpCode = '';
			if (mcpDom != undefined && mcpDom != null && mcpDom.val() != null){
				mcpCode = mcpDom.val().trim().toUpperCase();
			}
			dataModel.mcpCode = mcpCode;
			dataModel.mcpNewText = $('#mcpName').val().trim();
			dataModel.staffId = $('#saleStaffSelector').val();
			dataModel.shopId = $('#shopIdLogin').val();
			if(!MCPCatalog.flag){
				var node = $('#tree').tree('getSelected');
				if(node != null && node != undefined){
					dataModel.routingId = node.id;
				}
			}
			Utils.addOrSaveData(dataModel, "/catalog/mcp/editMCP", MCPCatalog._xhrSave,'errMsgMCPAddPopup', function(data){
				if (!data.error) {
					$('#addNewMCPPopup').dialog('close');
					MCPCatalog.loadAreaTree(0,null);
					$('#successMsgTree').html(msgCommon1).show();
					setTimeout(function(){
						$('#successMsgTree').html('').hide();
					},4000);
				} else {
					$('#errMsgMCPAddPopup').html(data.errMsg).show();
				}
			});
		},

		//ham load cay MCP
		loadTreeEx:function(idSearch){
			MCPCatalog.loadAreaTree(idSearch);
		},
		loadAreaTree:function(mcpId,shopCode){
			$('#errExcelMsg').html('').hide();
			if(mcpId==null){
				mcpId = 0;
			}
			if(shopCode!=undefined && shopCode!=null && shopCode!=""){//search đến MCP cần tìm
				MCPCatalog._shopCodeSearch=shopCode;
				MCPCatalog._mcpShopIdSearch = shopCode; //dung khi admin vua chon shop roi bam tim kiem ma khong click tren cay
			}
			var groupId = 0;
			if($('#chooseGroup').val() != "" && $('#chooseGroup').val().length > 0){
				groupId = $('#chooseGroup').val();
			}
			$('#tree').tree({
//        		url: "/rest/catalog/mcpid-tree/combotree/"+ mcpId+".json",
        		url: "/rest/catalog/mcpid-tree/combotree/"+ $('#shopIdLogin').val()+"/"+ groupId +".json",
        		lines:true,
        		formatter:function(node){
        			return Utils.XSSEncode(node.text);
        		},
        		onContextMenu:function(e, node){
    		    	e.preventDefault();
    		    	if($('#supervisorUser').val() == 'true'){
    		    		$('#tree').tree('select', node.target);
    		    		$('#contextMenu').menu('show', {
    		    			left : e.pageX-5,
    		    			top : e.pageY-5
    		    		});
    		    		$('#contextMenu').css('height', 'auto');
    		    	}
    			},
        		onBeforeLoad: function(n,p){
    		    	if(MCPCatalog._shopCodeSearch!=null && MCPCatalog._shopCodeSearch!=""){
    		    		p.shopCode=MCPCatalog._shopCodeSearch;
    		    		$('#divOverlay').show();
    		    	}
    		    },
        		onLoadSuccess:function(parent,data){
        			MCPCatalog._nextRoutingCode = null;
                	if(MCPCatalog._idSearch!=null){
    		    		try{
    		    			var id=MCPCatalog._idSearch;
    		    			var node = $('#tree').tree('find', id);
    			    		if(node!=null){
    			    			$('#tree').tree('select', node.target);
    			    		}
    		    		}catch(e){}
    		    		MCPCatalog._idSearch=null;
    		    		$('#divOverlay').hide();
    		    	} else if (MCPCatalog._shopCodeSearch!=null) {
    		    		try{
    		    			var shopCode=MCPCatalog._shopCodeSearch;
    		    			var node = $('#tree').tree('find', shopCode);
    			    		if(node!=null){
    			    			$('#tree').tree('select', node.target);
    			    		}
    		    		}catch(e){}
    		    		MCPCatalog._shopCodeSearch=null;
    		    		$('#divOverlay').hide();
    		    	}
                	if (data != null && data[0] != null && data[0].children != null && data[0].children[0] != undefined) {
                		MCPCatalog._nextRoutingCode = data[0].children[0].nextRoutingCode;
                	} else if (data != null && data[0] != undefined && data[0] != null){
                		MCPCatalog._nextRoutingCode = data[0].nextRoutingCode;
                	}
    	        },
    	        onClick:function(node) {
    	        	$('#errMsg').html('').hide();
    	        	if($('#grid').length==1 && node!=null && node.id!=null){

    	        		MCPCatalog._mapMutilSelect = new Map();
    	        		if (node.id == -2) {
    	        			MCPCatalog._mcpShopIdSearch = node.attributes.shop.shopCode;
    	        		}
    	        		MCPCatalog.search(node.id);
	        			MCPCatalog._mcpIdSelect = node.id;
    	        		$('#infoCustomer').html(msgTuyen2 + ' ' + node.text);
    				}
    	        }
			});
		},

		//----------------------PHUONGVM-----------------START------------------------------------------
		getGridCusUrl:function(cusCode, cusName, channelTypeId, address, areaId, mcpId){
			return WEB_CONTEXT_PATH + "/catalog/mcp/searchCus?customerCode=" + encodeChar(cusCode)
			+ "&customerName=" + encodeChar(cusName)
			+ "&channelTypeId=" + channelTypeId
			+ "&houseNumberOrStreet=" + address
			+ "&areaId=" + areaId
			+ "&mcpId=" + mcpId;
		},
		//Tim kiem KH tren dialog MCPID
		searchCus:function(){
			var customerCode = $('#cusCode').val().trim();
			var customerName = $('#cusName').val().trim();
//			var channelTypeId = $('#typeCus').combobox('getValue').trim();
			var houseNumberOrStreet = '';
			var areaId = '';
			var url = MCPCatalog.getGridCusUrl(customerCode, customerName, -1 , houseNumberOrStreet, areaId);
//			$("#gridCus").datagrid({url:url,pageNumber:1});
			MCPCatalog._mapMutilSelectSub = new Map();
			$("#gridCus").datagrid({
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
				            //here
				    {field: 'customerCode', title: catalog_customer_code, width: 70, sortable:false,resizable:false, align: 'left',
				    	formatter:function(data, row, index){
			    			return row.customerCode;
			    		}
				    },
					{field: 'customerName', title: catalog_customer_name, width: 130, sortable:false,resizable:false, align: 'left',
				    	formatter:function(data, row, index){
			    			return row.customerName;
			    		}
				    },
				    {field: 'address', title: SuperviseManageRouteCreate_customerAddress, width: 300, sortable:false,resizable:false, align: 'left',
				    	formatter:function(data, row, index){
			    			return row.address;
			    		}
				    },
//				    {field: 'type', title: 'Loại khách hàng', width: 200, sortable:false,resizable:false, align: 'left',
//				    	formatter:function(data, row, index){
//				    		if(row.channelType != null)
//				    			return row.channelType.channelTypeName;
//				    		}
//				    },
				    {field: 'id',title: '', checkbox:true, width:50,align:'center',sortable : false,resizable : false},
				  ]],
				  onSelect : function(rowIndex, rowData) {
				    	var selectedId = rowData['id'];
				    	MCPCatalog._mapMutilSelectSub.put(selectedId, rowData.id);
				    },
				    onUnselect : function(rowIndex, rowData) {
				    	var selectedId = rowData['id'];
				    	MCPCatalog._mapMutilSelectSub.remove(selectedId);
				    },
				    onSelectAll : function(rows) {
				    	if($.isArray(rows)) {
				    		for(var i = 0; i < rows.length; i++) {
				    			var row = rows[i].id;
				    			var selectedId = rows[i].id;
				    			MCPCatalog._mapMutilSelectSub.put(selectedId, row);
				    		}
				    	}
				    },
				    onUnselectAll : function(rows) {
				    	if($.isArray(rows)) {
				    		for(var i = 0; i < rows.length; i++) {
				    			var row = rows[i];
				    			var selectedId = row['id'];
				    			MCPCatalog._mapMutilSelectSub.remove(selectedId);
				    		}
				    	}
				    },
				   onLoadSuccess:function(){
				      	var easyDiv = '#gridCusContainer ';
				    	$(easyDiv+'.datagrid-header-rownumber').html(stt_label);
				    	var exitsAll = false;
			    		var runner = 0;
			    		$(easyDiv+'input:checkbox[name=id]').each(function() {
			    			var selectedId = this.value;
			    			if(MCPCatalog._mapMutilSelectSub.get(selectedId) != null || MCPCatalog._mapMutilSelectSub.get(selectedId) != undefined) {
			    				exitsAll = true;
			    				$('#gridCus').datagrid('selectRow',runner);
			    			}
			    			runner ++;
			    		});
			    		if (exitsAll==false){
			    			$(easyDiv+'td[field=id] .datagrid-header-check input:checkbox').attr('checked', false);
				    	}

			    		var tabindex = -1;
						$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
							if (this.type != 'hidden') {
								$(this).attr("tabindex", tabindex);
								tabindex -=1;
							}
						});
						tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		updateRownumWidthForDataGrid('#gridCus');
			    		$(window).resize();

				      }
			});
		},
		//Mo dialog Them KH vao MCPID
		openAddCusInMCPPopup:function(){
			$('#addCusInMCPPopupDIV').css('visibility','visible');
			$('.panel').css('top', '35px');

			$('#addCusInMCPPopup').dialog({
				onOpen : function() {
					SuperviseManageRouteCreate._isDialog = true;
				},
				onClose : function(){
					SuperviseManageRouteCreate._isDialog = false;
				}
			});
			$('#addCusInMCPPopup').dialog('open');
			$('#addCusInMCPPopup').css('top', '30px');
			$('#errMsgPopup1').hide();
			$('#errExcelMsg').html('').hide();
			MCPCatalog._mapMutilSelectSub = new Map();
			$('#customerInfo').val('');
			$('#customerAddr').val('');
			$('#outOfDate').attr('checked', false);
			$('#customerInfo').focus();
			$('#addCusInMCPPopup #customerInfo').unbind('keyup');
			$('#addCusInMCPPopup #customerInfo').bind('keyup', function(event) {
			      var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
			      if (keycode == 13) {
			    	  SuperviseManageRouteCreate.searchCusInCreateRouting();
			      }
			});
			$('#addCusInMCPPopup #customerAddr').unbind('keyup');
			$('#addCusInMCPPopup #customerAddr').bind('keyup', function(event) {
			      var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
			      if (keycode == 13) {
			    	  SuperviseManageRouteCreate.searchCusInCreateRouting();
			      }
			});
			SuperviseManageRouteCreate.searchCusInCreateRouting();
			var element = document.querySelectorAll('#addCusInMCPPopup .el-checkbox');
//			if(element != null && element.length > 0) {
//				[].forEach.call(element, function(el) {
//					el.classList.removeAttribute('tabindex');
//				});
//			}
//			for (var i=0; i<element.length; i++) {
//				element[i].removeAttribute('tabIndex');
//			}
			return false;
		},
		//Them KH vao MCPID
		saveCusInMCP:function(){
			$('#errMsgPopup1').html('').hide();
			if(MCPCatalog._mcpIdSelect<0){
				$('#errMsgPopup1').html(msgTuyenErr4).show();
        		return false;
			}
			if(MCPCatalog._mapMutilSelectSub == null || MCPCatalog._mapMutilSelectSub.size() <= 0) {
				$('#errMsgPopup1').html(msgTuyenErr2).show();
        		return false;
        	}
			var mapKey = MCPCatalog._mapMutilSelectSub.keyArray;
			var mapValue = MCPCatalog._mapMutilSelectSub.valArray;
			var dataModel = new Object();
			dataModel.lstCusId = mapValue;
			dataModel.mcpId = MCPCatalog._mcpIdSelect;
			MCPCatalog.saveCus(dataModel);
		},
		saveCus:function(dataModel){
			Utils.addOrSaveData(dataModel, "/catalog/mcp/save", null, 'errMsg',function(data){
				if(data.errMsg!=undefined && data.errMsg.length==0){
					$('#addCusInMCPPopup').dialog('close');
					$('#changeCusInMCPPopup').dialog('close');
					$('#successMsg').html(msgCommon1).show();
					setTimeout(function(){$('#successMsg').html('').hide();},1500);
					MCPCatalog._mapMutilSelect = new Map();
					$("#grid").datagrid("reload");
				}
			});
		},
		getGridCusMCPIDUrl:function(cusCode, cusId){
			var url= "/catalog/mcp/searchHisoryMCP?customerCode=" + cusCode;
			if ($('#routingId') != undefined && $('#routingId').val() != null){
				url += '&routingId=' + $('#routingId').val().trim();
			}
			if (cusId != null && cusId > 0){
				url += '&customerId=' + cusId;
			}
			return url;
		},
		//Mo dialog Xem lich su khach hang thuoc MCPID
		openViewHistoryCusInMCPPopup:function(customerId, customerCode, customerName, address, type){
			$('#viewHistoryCusInMCPPopupDIV').css('visibility','visible');
			$('#viewHistoryCusInMCPPopup').dialog('open');
			$('#errMsgPopup2').hide();
			if(customerCode == 'null' || customerCode == undefined){
				customerCode = '';
			}
			if(customerName == 'null' || customerName == undefined){
				customerName = '';
			}
			if(address == 'null' || address == undefined){
				address = '';
			}
			$('#cusCodeLabel').html(Utils.XSSEncode(customerCode));
			$('#cusNameLabel').html(Utils.XSSEncode(customerName));
			$('#addressLabel').html(Utils.XSSEncode(address));
			$('#typeLabel').html(type);
			var url = MCPCatalog.getGridCusMCPIDUrl(customerCode, customerId);
			$("#gridCusMCPID").datagrid({
				  url:url,
			  	  pageList  : [10,20,30],
				  width: 500,
				  pageSize : 10,
				  height:'auto',
				  scrollbarSize : 0,
				  pagination:true,
				  pageNumber:1,
				  fitColumns:true,
				  method : 'GET',
				  //rownumbers: true,
				  columns:[[
				    {field:'rownum', title: msgSTT, width: 40,align: 'center',formatter:function(value,row,index){	
					   var page = document.getElementsByClassName('pagination-num')[0].value;
					   return (page != 0 ? (page*10-10 +index +1) : index +1);	
					}},	
				    {field: 'routingCode', title: msgTuyen4, width: 200, sortable:false,resizable:false, align: 'left',
				    	formatter:function(data, row, index){
				    		if(row.routing != null)
				    			return Utils.XSSEncode(row.routing.routingCode);
				    		return '';
				    	}
				    },
					{field: 'fromDate', title: msgTuNgay, width: 150, sortable:false,resizable:false, align: 'left',
			        	  formatter:function(value, row, index) {
			        		  if(row.fromDate!=null){
			        			  return toDateString(new Date(row.fromDate));
			        		  }
				          }
				    },
				    {field: 'toDate', title: msgDenNgay, width: 150, sortable:false,resizable:false, align: 'left',
			        	  formatter:function(value, row, index) {
			        		  if(row.toDate!=null){
			        			  return toDateString(new Date(row.toDate));
			        		  }
				          }
				    },
				  ]],
				   onLoadSuccess:function(){
				      	var easyDiv = '#gridCusContainer ';
				    	$(easyDiv+'.datagrid-header-rownumber').html(stt_label);
			    		updateRownumWidthForDataGrid('#gridCus');
			    		$(window).resize();
				      }
			});
			return false;
		},
		upload : function(){ //upload trong fancybox
			$('#errExcelMsg').html('').hide();
			$('#errMsg').html('').hide();
			if ($('#excelFile').val() == '') {
				$('#errExcelMsg').html(msgCommon12).show();
				return false;
			}
			var params = new Object();
			params.token = $('#token').val().trim();
			var options = {
					beforeSubmit: MCPCatalog.beforeImportExcelEx,
					success:      MCPCatalog.afterImportExcelEx,
					type: "POST",
					dataType: 'html',
					data: params
			};
			$('#importFrm').ajaxForm(options);
			$.messager.confirm(msgXacNhan, SuperviseManageRouteCreate_exportExcel, function(r){
				if (r){
					var type = $('input[name="mcpType"]:checked').val();
					$('#typeExport').val(type);
					$('#divOverlay').show();
					$('#importFrm').submit();
				}
			});
			return false;
		},
		beforeImportExcelEx: function(){
			$('#errExcelMsg').html('').hide();
			return true;
		},
		afterImportExcelEx: function(responseText, statusText, xhr, $form){
			if (statusText == 'success') {
				$('#divOverlay').hide();
		    	$("#responseDiv").html(responseText);
		    	var responseToken = $('#responseToken').html().trim();
				if (responseToken != undefined && responseToken != null && responseToken != ''){
					$('#token').val(responseToken);
				}
				if ($('#errorExcelMsg').html().length > 0){
					$('#errExcelMsg').html($('#errorExcelMsg').html()).show();
				}else{
					var totalRow = parseInt($('#totalRow').html().trim());
		    		var numFail = parseInt($('#numFail').html().trim());
		    		var fileNameFail = $('#fileNameFail').html();
		    		var mes = format(msgErr_result_import_excel,(totalRow - numFail),numFail);
		    		if(totalRow<numFail){
	    				mes = format(MCPCatalog_confirmImport,numFail);
	    			}
		    		if(numFail > 0){
		    			mes+= ' <a href="'+ fileNameFail +'">"'+msgsXemChiTietLoi+'"</a>';
		    		}
		    		$('#errExcelMsg').html(mes).show();
				}
			}
		},
		beforeImportExcel: function(){
			if(!previewImportExcelFile(document.getElementById("excelFile"))){
				return false;
			}
//			showLoadingIcon();
			$('#errExcelMsg').html('').hide();
			$('#successMsg1').html('').hide();
			return true;
		},
		afterImportExcelUpdate: function(responseText, statusText, xhr, $form){
			$('#divOverlay').hide();
			if (statusText == 'success') {
//				hideLoadingIcon();
		    	$("#responseDiv").html(responseText);
		    	if($('#errorExcel').html().trim() == 'true' || $('#errorExcelMsg').html().trim().length > 0){
		    		$('#errExcelMsg').html($('#errorExcelMsg').html()).show();
		    	} else {
	    			var totalRow = parseInt($('#totalRow').html().trim());
	    			var numFail = parseInt($('#numFail').html().trim());
	    			var fileNameFail = $('#fileNameFail').html();
	    			var mes = format(msgErr_result_import_excel,(totalRow - numFail),numFail);
	    			if(totalRow<numFail){
	    				mes=format(MCPCatalog_rowsInvalide,numFail);
	    			}
	    			if(numFail > 0){
	    				mes+= ' <a href="'+ fileNameFail +'">"'+msgsXemChiTietLoi+'"</a>';
	    			}
	    			if($('#excelFile').length!=0 && $('#fakefilepc').length!=0){
	    				try{$('#excelFile').val('');$('#fakefilepc').val('');}catch(err){}
	    			}
	    			$('#errExcelMsg').html(mes).show();
	    			$("#grid").datagrid("reload");
		    	}
		    }
		},
		exportData : function(){
			var value = $('input[name="mcpType"]:checked').val();
			if(value == 'mcpCode'){
				MCPCatalog.exportMCPCode();
			}else{
				MCPCatalog.exportMCPCustomer();
			}
		},
		exportMCPCode:function(){
			if (MCPCatalog._shopCodeExcel  != null && MCPCatalog._shopCodeExcel  != undefined && MCPCatalog._shopCodeExcel  != ""){

			} else {
				$('#errMsg').html(MCPCatalog_selectUnit).show();
				return false;
			}
			$('#errExcelMsg').html('').hide();
			var shopCode = MCPCatalog._shopCodeExcel.trim();
			var params = new Object();
			params.shopCode = shopCode;
			params.mcpId = MCPCatalog._mcpIdSelect;
			var url = "/catalog/mcp/exportMCPCode";
			$.messager.confirm(msgXacNhan, SuperviseManageRouteCreate_exportExcel, function(r){
				if (r){
					CommonSearch.exportExcelData(params,url,'errExcelMsg');
				}
			});
		},
		exportMCPCustomer:function(){
			$('#errExcelMsg').html('').hide();
			var shopCode = MCPCatalog._mcpShopIdSearch;
			var customerCode = $('#customerCode').val().trim();
			var customerName = $('#customerName').val().trim();
			var status = $('#status').val();
			var houseNumberOrStreet = $('#houseNumberOrStreet').val().trim();
			var areaId = $('#areaId').val();
			var mcpId = MCPCatalog._mcpIdSelect;
			var params = new Object();
			params.shopCode = shopCode;
			params.customerCode = customerCode;
			params.customerName = customerName;
			params.status = status;
			params.houseNumberOrStreet = houseNumberOrStreet;
			params.areaId = areaId;
			params.mcpId = mcpId;
			var url = "/catalog/mcp/exportMCPCustomer";
			$.messager.confirm(msgXacNhan, SuperviseManageRouteCreate_exportExcel, function(r){
				if (r){
					CommonSearch.exportExcelData(params,url,'errExcelMsg');
				}
			});
		},
		removeRouting:function(){
			$.messager.confirm(msgXacNhan, msgTuyenErr5, function(r){
				if (r){
					var node = $('#tree').tree('getSelected');
						var dataModel = new Object();
						dataModel.routingId = node.id;
						Utils.addOrSaveData(dataModel, "/catalog/mcp/remove-routing", MCPCatalog._xhrSave, null,function(data){
							$('#tree').tree('reload');
							$('#grid').datagrid('reload');
						},null,null,true);
						return false;
					}
				}
			);
	 	}
//		changeTemplate:function(){
//			if($('input[name="mcpType"]:checked').val()=='mcpCode')
//				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/bieu_mau_mcp_code.xls');
//			else $('#downloadTemplate').attr('href',excel_template_path + 'catalog/bieu_mau_mcp_code.xls');
//		}
};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.mcp-catalog.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.unit-tree-catalog.js
 */
var UnitTreeCatalog = {
	_listObjectPop : null,
	_isShowDlg: false,
	_xhrSave : null,
	_basicMode: true,
	_listNodeTree:null,
	_idGroup:1,
	_lstGroupAdd:null,
	_lstGroupDelete:null,
	_lstGroupChange:null,
	_lstStaffAdd:null,
	_lstStaffDelete:null,
	_typeScreen: 0,
	_staffOwnerId: 0,
	_zoom : 18,
	_nodeSelect:null,
	_callBack:null,
	_idSearch:null,
	_idSearchStaff:null,
	_idGroupAddNewStaff:null,
	_idOrgAddNewStaff:null,
	_typeAddGroup:null,//khi thêm group vào đơn vị chưa expand thì nó sẽ expand trước rồi trong onExpand mới xử lý addGroup
	_reload:null,
	_itv:null,
	_staffId:null,
	_maxAdmin: 9999,
	_maxGDM: 1,
	_maxGSKV: 1,
	_maxGDBH: 1,
	_maxDDTM: 9999,
	NOLIMIT: 9999,
	ERROR: -1,
	Admin: 1,
	GDM: 2,
	GSKV: 3,
	GSBH1: 4,
	GSBH2: 5,
	GSBH: 45,
	DDTM: 6,
	NVBH1: 7,
	NVBH2: 8,
	NVBH: 78,
	CD: 1,
	MIEN: 2,
	KHUVUC: 3,
	NPP: 4,
	SHOP: 1,
	STAFF: 2,
	GROUP: 3,
	_tree: null,
	_oldNode: null,
	_lat:null,
	_lng:null,
	_isSaveOrUpdateStaffGroup:null,
	_isCreateNewManager: false,
	_widthCbx: null,
	_mapValueOfCbx: null,
	_mapSelectedStaff: null,
	_mapStaffOfGrid: null,
	_staffTreeVO: null,
	_objectChangeGroup: null,
	_htmlPopup: null,
	insertStaffSucess:null,
	_isDisplayPopAdd: false,
	_isDisplayPopupStaffGroup: false,
	hideAllContextMenu:function(){
		$('#cmTaoNhom').hide();
		$('#cmTaoMoiGSBH').hide();
		$('#cmThemNVBH').hide();
		$('#cmTaoMoiNVBH').hide();
		$('#cmThemGSBH').hide();
		$('#cmXoaNhom').hide();
		$('#cmXoaNV').hide();
		$('#cmTaoMoiNVQL').hide();
		$('#cmChuyenNhomNV').hide();
		try{
			$('#cmCreateAccountant').hide();
			$('#cmCreateAccountantCompany').hide();
			$('#cmCreateVansaleStaff').hide();
		}catch(e){}
	},
	/**
	 * download template for import
	 * @author haupv3
	 * @since 16 July 2014
	 * **/
	exportTemplateForImport:function(){
		var url='/catalog/unit-tree/export-template-for-import';

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
						window.location.href = data.view;
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
	showContextMenu:function(type, objectType, node, count, staffTreeVO){//objectType: 1-shop, 2-staff, 3-group
		var node = $('#tree').tree('getSelected');
		if (objectType == 1){
			$('#cmTaoNhom').show();
			$('#cmTaoMoiNVQL').show();
			try{
				$('#cmCreateAccountant').show();
				$('#cmCreateAccountantCompany').show();
			}catch(e){

			}
		} else if (objectType == 2){
			$('#cmXoaNV').show();
			if (staffTreeVO != null){
				if (staffTreeVO.staffType == 'NVBH'){
					$('#cmChuyenNhomNV').show();
					UnitTreeCatalog._staffTreeVO = staffTreeVO;
				}
			}
		} else if (objectType == 3){
			if(node.children!=null ){
				if(!UnitTreeCatalog.checkGSOnGroup(node)){
					$('#cmTaoMoiGSBH').show();
					$('#cmThemGSBH').show();
				}

			}else{
				$('#cmTaoMoiGSBH').show();
				$('#cmThemGSBH').show();
				$('#cmXoaNhom').show();
			}
			$('#cmThemNVBH').show();
			$('#cmTaoMoiNVBH').show();
			try{
				$('#cmCreateVansaleStaff').show();
			} catch(e){}
		}

		return true;
	},
	filterContextMenu:function(node, count){
		UnitTreeCatalog._isCreateNewManager = false;
		if(node.attributes==null)
			return false;
		UnitTreeCatalog.hideAllContextMenu();
		if (node.attributes != null && node.attributes.shopTreeVO != null){
			return UnitTreeCatalog.showContextMenu(node.attributes.shopTreeVO.shopTypeId, 1, node, count);
		} else if (node.attributes != null && node.attributes.staffTreeVO != null){
			return UnitTreeCatalog.showContextMenu(node.attributes.staffTreeVO.staffTypeId, 2, node, count, node.attributes.staffTreeVO);
		} else if (node.attributes != null && node.attributes.staffGroupVO != null){
			return UnitTreeCatalog.showContextMenu(node.attributes.staffGroupVO, 3, node, count);
		} else
			return false;
	},
	getParentNode: function(node, tree){
		if (tree.children == null)
			return null;
		for (var i=0; i < tree.children.length; i++){
			var n = tree.children[i];
			if ((n.id == node.id || (n.id.indexOf(node.id) != -1 && n.id.indexOf("g") != -1 )) && UnitTreeCatalog.isSameTypeNode(n, node))
				return tree;
			var pn = UnitTreeCatalog.getParentNode(node, n);
			if (pn != null)
				return pn;
		}
		return null;
	},
	isSameTypeNode: function(n1, n2){
		if (n1.attributes != null && n2.attributes != null){
			if ((	n1.attributes.staffTreeVO != null && n1.attributes.shopTreeVO == null && n1.attributes.staffGroupVO == null
					&& n2.attributes.staffTreeVO != null && n2.attributes.shopTreeVO == null && n2.attributes.staffGroupVO == null)
				|| (n1.attributes.staffTreeVO == null && n1.attributes.shopTreeVO != null && n1.attributes.staffGroupVO == null
					&& n2.attributes.staffTreeVO == null && n2.attributes.shopTreeVO != null && n2.attributes.staffGroupVO == null)
				|| (n1.attributes.staffTreeVO == null && n1.attributes.shopTreeVO == null && n1.attributes.staffGroupVO != null
					&& n2.attributes.staffTreeVO == null && n2.attributes.shopTreeVO == null && n2.attributes.staffGroupVO != null))
				return true;
		} else return false;
	},
	getNodeInTree: function(nid, tree, nodeType){	//1 : shop, 2 : staff, 3: group
		if (nid == UnitTreeCatalog._tree.id)
			return UnitTreeCatalog._tree;
		if (tree.children == null)
			return null;
		for (var i=0; i<tree.children.length; i++){
			var n = tree.children[i];
			if (n.id == nid){
				if (nodeType != undefined && nodeType != null){
					if ((nodeType == UnitTreeCatalog.SHOP && n.attributes.shopTreeVO != null) ||
							(nodeType == UnitTreeCatalog.STAFF && n.attributes.staffTreeVO != null) ||
							(nodeType == UnitTreeCatalog.GROUP && n.attributes.staffGroupVO != null))
						return n;
				} else
					return n;
			}
			var nn = UnitTreeCatalog.getNodeInTree(nid, n, nodeType);
			if (nn != null)
				return nn;
		}
		return null;
	},
	reloadUnitTree:function(){
		if(UnitTreeCatalog._idOrgAddNewStaff!=null){
			UnitTreeCatalog.loadUnitTree(UnitTreeCatalog._idOrgAddNewStaff);
		}else{
			var node = $('#tree').tree('getSelected');
			if(node!=null && node.attributes!=null){
				var attr=node.attributes;
				if(attr.org!=null) UnitTreeCatalog.loadUnitTree(attr.org.id);
				else if(attr.group!=null) UnitTreeCatalog.loadUnitTree(attr.group.org.id);
				else if(attr.staff!=null) UnitTreeCatalog.loadUnitTree(attr.staff.org.id);
				else UnitTreeCatalog.loadUnitTree();
			}else{
				UnitTreeCatalog.loadUnitTree();
			}
		}
	},
	loadUnitTree:function(idSearch,idSearchStaff, ownStaffId, openId){ // ownStaffId: cap nhat staffOwmer cho cac child staff
		UnitTreeCatalog._listNodeTree=new Map();
		UnitTreeCatalog._lstGroupAdd=new Map();
		UnitTreeCatalog._lstStaffAdd=new Map();
		UnitTreeCatalog._lstStaffDelete=new Map();
		UnitTreeCatalog._lstGroupChange=new Map();
		UnitTreeCatalog._lstGroupDelete=new Map();
		UnitTreeCatalog._idOrgAddNewStaff=null;
		if(idSearch!=undefined && idSearch!=null && idSearch!=0){//search đến org cần tìm
			UnitTreeCatalog._idSearch=idSearch;
			if(idSearchStaff!=undefined && idSearchStaff!=null && idSearchStaff!=0){
				UnitTreeCatalog._idSearchStaff=idSearchStaff;
			}
		}
		$('#divOverlay_Tree').show();
		$('#tree').tree({
		    url:'/catalog/unit-tree/get-unit-tree' ,
		    dnd:true,
		    lines:true,
		    singleSelect: false,
		    onBeforeLoad: function(n,p){
		    	if (p.id != undefined) return false;
		    	$('#divOverlay').show();
		    	if(UnitTreeCatalog._idSearch!=null && UnitTreeCatalog._idSearch!=0){
		    		p.idSearch=UnitTreeCatalog._idSearch;
		    		$('#divOverlay').show();
		    	}
		    },
		    onLoadSuccess:function(parent,data){
		    	UnitTreeCatalog._tree = data[0];
		    	if(UnitTreeCatalog._idSearch!=null){
		    		try{
		    			var id=UnitTreeCatalog._idSearch;
		    			if(UnitTreeCatalog._idSearchStaff!=null && UnitTreeCatalog._idSearchStaff!=0){
		    				id='s'+UnitTreeCatalog._idSearchStaff;
		    			}
		    			var node = $('#tree').tree('find', id);
			    		if(node!=null){
			    			$('#tree').tree('select', node.target);
			    		}
		    		}catch(e){}
		    		UnitTreeCatalog._idSearch=null;
		    	}
		    	if(UnitTreeCatalog._typeAddGroup!=null){
		    		UnitTreeCatalog.addNewGroup(UnitTreeCatalog._typeAddGroup);
		    	}
		    	UnitTreeCatalog.resize();
		    	if (openId != null && openId != -1)
		    		UnitTreeCatalog.expandToNode(openId);
		    	if (ownStaffId != undefined){
			    	if (ownStaffId.toString().indexOf("g") != -1)
			    		UnitTreeCatalog.updateStaffOwner(ownStaffId.substring(1), true);
			    	else UnitTreeCatalog.updateStaffOwner(ownStaffId, false);
		    	}
		    	// Display double srollbar
		    	UnitTreeCatalog.displayDoubleScrollBarForTree();
		    	$('#divOverlay_Tree').hide();
		    	
		    },
		    formatter:function(node){
		    	var supportText = '';
		    	if(node.role != null && node.role == 'GROUP'){
		    		supportText = formatTreeGroup;
		    	}else if (node.role != null && node.role == 'GS'){
		    		supportText = formatTreeGSNew;
		    	}else if (node.role != null && node.role == 'NV'){
		    		supportText = formatTreeNV;
		    	}else if (node.role != null && node.role == 'MANAGER' && node.id > 0){
		    		supportText = formatTreeQL;
		    	}
		    	return supportText + Utils.XSSEncode(node.text);
			},
		    onContextMenu:function(e, node){
		    	e.preventDefault();
				$('#tree').tree('select', node.target);
				if (UnitTreeCatalog.filterContextMenu(node)) {
					if($('#isManager').val() == 'false'){
						$('#contextMenu').menu('show', {
							left : e.pageX-5,
							top : e.pageY-5
						});
						$('#contextMenu').css('height', 'auto').css('width', 'auto').css('min-width', 150);
					}
				}
			},
			onCollapse:function(node){
				UnitTreeCatalog.resize();
				// Display double srollbar
		    	UnitTreeCatalog.displayDoubleScrollBarForTree();
			},
			onExpand :function(node) {
				UnitTreeCatalog.resize();
				// Display double srollbar
		    	UnitTreeCatalog.displayDoubleScrollBarForTree();
			},
	        onClick : function(node) {
				if ($('#searchStaffUnitTreeGrid').length == 1
						&& node != null
						&& node.attributes != null
						&& (node.attributes.staffGroupVO != null || node.attributes.shopTreeVO != null)) {
					UnitTreeCatalog.search(0);
				} else if (node != null
						&& node.attributes != null
						&& (node.attributes.staffGroupVO != null || node.attributes.shopTreeVO != null)) {
					UnitTreeCatalog.showSearchScreen();
				} else {//connv
					if(node.childrenId != null && node.childrenId != ''){
						UnitTreeCatalog.search(0);
					}
				}
				// Display double srollbar
		    	UnitTreeCatalog.displayDoubleScrollBarForTree();
			},
			onDblClick:function(node){
	        	if (node != null && node.attributes!=null){
	        		if (node.attributes.staffTreeVO != null){
	        			var pNode = UnitTreeCatalog.getParentNode(node, UnitTreeCatalog._tree);
	        			if (pNode != null){
	        				if (pNode.id.indexOf("g") != -1)
		        				pNode = UnitTreeCatalog.getParentNode(pNode, UnitTreeCatalog._tree);
		        			UnitTreeCatalog.showStaffEditScreen(node.attributes.staffTreeVO.staffId, 1,node.attributes.staffTreeVO.staffTypeId, pNode.id);
	        			}else if (node.attributes.isRoot){
	        				UnitTreeCatalog.showLastView();
	        			}
	        		}else if(node.attributes.staffGroupVO !=null){
	        			UnitTreeCatalog.dialogCreateStaffGroup(node.attributes.staffGroupVO);
	        		}else if(node.attributes.shopTreeVO !=null){
	        			UnitTreeCatalog.showLastView();
	        		}
	        	}
	        	// Display double srollbar
		    	UnitTreeCatalog.displayDoubleScrollBarForTree();
	        },
	        onBeforeEdit:function(nodeTarget){
	        },
	        onAfterEdit:function(nodeTarget){
	        	// Display double srollbar
		    	UnitTreeCatalog.displayDoubleScrollBarForTree();
	        },
			onBeforeDrag:function(node){
				if(!$('#cbChange').is(':checked')) return false;
				if(node.attributes != null && (node.attributes.shopTreeVO != null || node.attributes.staffGroupVO != null))
					return false;
				return true;
			},
			onStopDrag:function(node){
				// Display double srollbar
		    	UnitTreeCatalog.displayDoubleScrollBarForTree();
			},
			onBeforeDrop:function(target,source,point){
				if(point!=undefined) return false;
				var nodeTarget=$('#tree').tree('getNode', target);
				return UnitTreeCatalog.doDrop(source,nodeTarget);

			},
			onDrop:function(target,source,point){
				// Display double srollbar
		    	UnitTreeCatalog.displayDoubleScrollBarForTree();
			},
		});
	},
	displayDoubleScrollBarForTree:function(){
		// Get width of scrollbar on the bottom of tree
		var widthScrollBar = $('.ReportTreeSection')[0].scrollWidth;
		var widthTreeBar = $('.ReportTreeSection').width();
		// When the bottom scrollbar displayed => condition was true => need to adjust width of the top scrollbar
		if (widthScrollBar > (widthTreeBar + 11)) {
			// Initial double scrollbar
			$('.ReportTreeSection').doubleScroll({resetOnWindowResize: true, timeToWaitForResize: 30,  onlyIfScroll: true});
			setTimeout(function () {
				$('.doubleScroll-scroll-wrapper').show();
				$('.doubleScroll-scroll').width(widthScrollBar + 20);
			},100);
			
		} else {
			$('.doubleScroll-scroll-wrapper').hide();
		}
	},
	checkStaffOnTree:function(staffId){
		for(var i=0;i<UnitTreeCatalog._listNodeTree.valArray.length;i++){
			var temp = UnitTreeCatalog._listNodeTree.valArray[i];
			if(temp!=null && temp.attributes!=null && temp.attributes.staff!=null && temp.attributes.staff.id==staffId){
					return true;
			}
		}
		return false;
	},
	checkGSOnGroup:function(node){
		for(var i=0;i<node.children.length;i++){
			var temp =node.children[i];
			if(temp!=null && temp.attributes!=null && temp.attributes.staffTreeVO!=null && temp.attributes.staffTreeVO.staffType=="GS"){
					return true;
			}
		}
		return false;
	}
	,
	parseStaff:function(staff){
		var staffVO = new Object();
		staffVO.id=staff.id;
		staffVO.org=staff.organization;
		staffVO.staffCode=staff.staffCode;
		staffVO.staffName=staff.staffName;
		staffVO.staffType=staff.roleType;
		return staffVO;
	},
	//-------------------------------------------------------------------------------------------------------
	resize: function() {
		var hSidebar3=$('#tree').height();
		var hSidebar1=$('.Content3Section').height();

		if(hSidebar3> 650) {
			$('.ReportTree2Section').css('height', '750');
		} else {
			if(hSidebar3 <  hSidebar1) {
				if(hSidebar1 < 700) {
					$('.ReportTree2Section').height(750);
				} else {
					$('.ReportTree2Section').height(750);
				}
			} else {
				if(hSidebar3 < 300) {
					$('.ReportTree2Section').height(300);
				} else {
					$('.ReportTree2Section').css('height', '750');
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
	showSearchScreen: function(view){
		$('#divOverlay').show();
		var params = new Object();
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree/show-search',function(data) {
			$("#unitTreeContent").html(data).show();
			$('#divOverlay').hide();
			
			//anhhpt: Khi tao nhan vien thanh cong, hien thi thong bao password ngay duoi datagrid
			if(UnitTreeCatalog.insertStaffSucess ){
				$('#msgPasswordDefault').show();
				$('#msgPasswordDefault').html(msgImportStaffPass);
//				Utils.showMessage(msgImportStaffPass);//LamNH
			}else{
				$('#msgPasswordDefault').hide();
				$('#msgPasswordDefault').html('');
				Utils.hideMessage();//LamNH
			}

		}, null, 'POST');
		return false;
//		$('#divOverlay').show();
//		$.ajax({
//			type : 'GET',
//			url : '/catalog/unit-tree/show-search',			
//			dataType : "html",
//			success : function(data) {
//				$('#unitTreeContent').html(data).show();;
//				$('#divOverlay').hide();
//				if(UnitTreeCatalog.insertStaffSucess ){
//					$('#msgPasswordDefault').show();
//					$('#msgPasswordDefault').html(msgImportStaffPass);
//				}else{
//					$('#msgPasswordDefault').hide();
//					$('#msgPasswordDefault').html('');
//					Utils.hideMessage();
//				}
//			},
//			error:function(XMLHttpRequest, textStatus, errorThrown) {
//				$('#divOverlay').hide();
//			}
//		});
//		return false;
		
	},
	showSearchScreenSuper: function(view){
		var params = new Object();
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree-supervise/show-search',function(data) {
			$("#unitTreeContent").html(data).show();

			//anhhpt: Khi tao nhan vien thanh cong, hien thi thong bao password ngay duoi datagrid
			if(UnitTreeCatalog.insertStaffSucess ){
				$('#msgPasswordDefault').show();
				$('#msgPasswordDefault').html(msgImportStaffPass);
//				Utils.showMessage(msgImportStaffPass);//LamNH
			}else{
				$('#msgPasswordDefault').hide();
				$('#msgPasswordDefault').html('');
				Utils.hideMessage();//LamNH
			}

		}, null, 'POST');
		return false;
	},
	//staffId : id cua nhan vien
	//typeView : check xem la xem thong tin hay chinh sua thong tin, 0:xem, 1:sua, 2:tao moi
	showShopEditScreen: function(shopId,typeView){
		UnitTreeCatalog.expandToNode(shopId, UnitTreeCatalog.SHOP);
		var params = new Object();
		params.shopId = shopId;
		params.typeView = typeView;
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree/view-shop',function(data) {
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
			UnitTreeCatalog._typeScreen = -3;
		}, null, 'POST');
		return false;
	},
	searchStaff : function(){
		var staffCode = $('#staffCode').val().trim();
		var staffName = $('#staffName').val().trim();
		var shopId = $('#searchShopId').val().trim();
		var staffGroupId = $('#searchGroupId').val().trim();
		var status = $('#status').val();
		$('#searchStaffUnitGrid').datagrid('load',{staffCode: staffCode, staffName: staffName,shopId:shopId,staffGroupId:staffGroupId, status: status});
	},
	//ham load trang search danh sach nhan vien
	showStaffSearchScreen: function(){
		var params = new Object();
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree/manage-staff',function(data) {
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
		}, null, 'POST');
		return false;
	},

	//ham load trang search danh sach nhan vien cho NVGS
	showStaffForSuperviseSearchScreen: function(){
		var params = new Object();
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree-supervise/manage-staff',function(data) {
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
		}, null, 'POST');
		return false;
	},

	//ham load trang tao moi nhan vien ,
	//tham so :
	//staffCreateType - loai Nhan vien tao moi ,
	//staffGroupId - nhom nhan vien dc tao moi truyen tu cay don vi
	//orgId : id cua don vi
	//orgName: ten cua don vi
	// isFromList - check tao moi nhan vien tu cay don vi hay tu trang danh sach nhan vien
	showStaffCreateScreen: function(staffType,orgId,orgName,staffGroupId){
		// lay thong tin node duoc click tren cay don vi
		var node = $('#tree').tree('getSelected');
		var orgType = null;
		//id nhan vien quan ly truc tiep - default 0
		var staffOwnerId = 0;
		if (node == null) {
			$('#errMsg').html(loithemmoinv).show();
//			Utils.showMessage(loithemmoinv);//LamNH
			return false;
		} else {
			//chi thuc hien thao tac khi click vao node la don vi
			if (node.attributes.staff == null) {
				//node don vi RITA
				if (node.id == "1") {
					orgId = node.attributes.org.id;
					orgName = node.attributes.org.orgName;
					var nodeTmp = UnitTreeCatalog._listNodeTree.valArray[2];
					staffOwnerId = nodeTmp.attributes.staff.id;
					orgType = 0;
				}
				//group don vi RITA
				else if (node.id == "g1") {
					orgId = node.attributes.group.org.id;
					orgName = node.attributes.group.org.orgName;
					var nodeTmp = UnitTreeCatalog._listNodeTree.valArray[2];
					staffOwnerId = nodeTmp.attributes.staff.id;
					orgType = 0;
				} else {
					//neu node click vao la don vi
					if (node.attributes.org != null) {
						orgId = node.attributes.org.id;
						orgName = node.attributes.org.orgName;
						//loai don vi la Nganh
						if (node.attributes.org.type == "REGION") {
							orgType = 1;
						} else if (node.attributes.org.type == "AREA") {
							orgType = 2;
						} else if (node.attributes.org.type == "GROUP") {
							orgType = 3;
						}
					}
					// neu node click vao la nhom
					else if (node.attributes.group != null) {
						orgId = node.attributes.group.org.id;
						orgName = node.attributes.group.org.orgName;
						if (node.attributes.group.org!= null) {
							if (node.attributes.group.org.type == "REGION") {
								orgType = 1;
							} else if (node.attributes.group.org.type == "AREA") {
								orgType = 2;
							} else if (node.attributes.group.org.type == "GROUP") {
								orgType = 3;
							}
						}
					}
				}
				var params = new Object();
				params.staffType = staffType;
				params.orgId = orgId;
				params.orgName = orgName;
				params.orgType = orgType;
				params.staffGroupId = staffGroupId;
				Utils.getHtmlDataByAjax(params, '/unit-tree/view-staff',function(data) {
					$("#unitTreeContent").html(data).show();
					$('#errMsg').html('').hide();
					Utils.hideMessage();//LamNH
					UnitTreeCatalog.resize();
					UnitTreeCatalog._typeScreen = -3;
				}, null, 'POST');
			}
		}
		return false;
	},
	//ham load trang xem va chinh sua thong tin nhan vien
	//tham so :
	//staffId : id cua nhan vien
	//typeView : check xem la xem thong tin hay chinh sua thong tin, 0:xem, 1:sua, 2:tao moi
	showStaffEditScreen: function(staffId,typeView, staffType, staffGroupId){
//		var node = UnitTreeCatalog.getNodeInTree(staffId, UnitTreeCatalog._tree, 2);
		UnitTreeCatalog.expandToNode(staffId,UnitTreeCatalog.STAFF);
		var params = new Object();
		if (staffGroupId != null && staffGroupId != undefined
				&& staffType != StaffTypeObject.KE_TOAN
				&& staffType != StaffTypeObject.KE_TOAN_CONG_TY){
			params.staffGroupId = staffGroupId;
		}
		params.staffId = staffId;
		params.staffType = staffType;
		params.typeView = typeView;
		params.shopId = $('#shopId').val().trim();
//		params.staffInUnitTree = false;
//		if (node != null)
//			params.staffInUnitTree = true;
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree/view-staff',function(data) {
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
			UnitTreeCatalog._typeScreen = -3;
			UnitTreeCatalog.insertStaffSucess = false;
		}, null, 'POST');
		return false;
	},
	showStaffEditScreenSupervise: function(staffId,typeView, staffType, staffGroupId){
//		var node = UnitTreeCatalog.getNodeInTree(staffId, UnitTreeCatalog._tree, 2);
		var params = new Object();
		if (staffGroupId != null && staffGroupId != undefined
				&& staffType != StaffTypeObject.KE_TOAN
				&& staffType != StaffTypeObject.KE_TOAN_CONG_TY){	
			params.staffGroupId = staffGroupId;
		}
		params.staffId = staffId;
		params.staffType = staffType;
		params.typeView = typeView;
		params.shopId = $('#shopId').val().trim();
//		params.staffInUnitTree = false;
//		if (node != null)
//			params.staffInUnitTree = true;
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree-supervise/view-staff',function(data) {
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
			UnitTreeCatalog._typeScreen = -3;
			UnitTreeCatalog.insertStaffSucess = false;
		}, null, 'POST');
		return false;
	},
	showStaffEditScreen1: function(staffId,typeView){
		$('#divOverlay_New').show();
		var rows = $('#searchStaffUnitTreeGrid').datagrid("getRows");
		var row = null;
		for (var i=0; i<rows.length; i++){
			if (rows[i].id == staffId)
				row = rows[i];
		}
		var shopId = (row.shop == null ? 0 : row.shop.id);
		var staffType = row.staffType.objectType;
		UnitTreeCatalog.showStaffEditScreen(staffId,typeView, staffType, shopId);
	},
	showStaffEditScreenSupervise1: function(staffId,typeView){
		$('#divOverlay_New').show();
		var rows = $('#searchStaffUnitTreeGrid').datagrid("getRows");
		var row = null;
		for (var i=0; i<rows.length; i++){
			if (rows[i].id == staffId)
				row = rows[i];
		}
		var shopId = (row.shop == null ? 0 : row.shop.id);
		var staffType = row.staffType.objectType;
		UnitTreeCatalog.showStaffEditScreenSupervise(staffId,typeView, staffType, shopId);
	},
	getParamSearchStaff:function(){
		var param = new Object();
		var node = $('#tree').tree('getSelected');
		if($('#staffCodeSearch').val().trim()!='') param.staffCode=$('#staffCodeSearch').val().trim();
		if($('#staffNameSearch').val().trim()!='') param.staffName=$('#staffNameSearch').val().trim();
		if($('#staffInfoSearch').val().trim()!='') param.staffInfoSearch=$('#staffInfoSearch').val().trim();
		if($('#statusSearch').val() != null && $('#statusSearch').val().length > 0)
			param.status=$('#statusSearch').val();
		var listStaffTypeId = [];
		var listStaffTypeIdStr = '';
		if ($('#staffTypeCombobox').val() != null){
			listStaffTypeId = $('#staffTypeCombobox').val();
		}
		if (listStaffTypeId != null && listStaffTypeId.length > 0){
			for (var i=0, size = listStaffTypeId.length; i< size; i++){
				if (i ==0){
					listStaffTypeIdStr += listStaffTypeId[i];
				}else{
					listStaffTypeIdStr += ',' + listStaffTypeId[i];
				}
			}
		}
		param.listStaffTypeIdStr = listStaffTypeIdStr;

		if (node != null) {

			//connv
			if ($('#searchStaffUnitTreeGrid').length == 1
					&& node != null
					&& node.attributes != null
					&& (node.attributes.staffGroupVO != null || node.attributes.shopTreeVO != null)) {
				param.childrenIdStr = '';
			} else {
				param.childrenIdStr = node.childrenId;
			}

			if(node.attributes != null && node.attributes.staffGroupVO!=null) {
				param.staffGroupId= node.attributes.staffGroupVO.staffGroupId;
				$('#searchGroupId').val(node.attributes.staffGroupVO.staffGroupId);
				$('#searchShopId').val(node.attributes.staffGroupVO.shopId);
			}else{
//				node.attributes = new Object();


			}
		}

		/**
		 * Bo sung tim kiem theo thuoc tinh dong
		 * @author haupv3
		 * @since: 19/11/2014
		 * **/
		var arr1 = new Array();
		var arr2 = new Array();
		var arrMultiSize = new Array();
		if(UnitTreeCatalog._basicMode == false){
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

		param.lstAttIdArray = arr1.toString();
		param.lstAttValueArray = arr2.toString();
		param.lstMultiSizeArr = arrMultiSize.toString();

		return param;
	},

	loadkendoMultiselect: function(selector, dataSource, textField, valueField, formatStrAfterSelected, callBackSelectEvent){
		$(selector).kendoMultiSelect({
			dataSource: dataSource,
			filter: "contains",
			dataTextField: textField,
			dataValueField: valueField,
			itemTemplate: function(data, e, s, h, q) {
				return Utils.XSSEncode(data.staffCode)+' - '+Utils.XSSEncode(data.staffName);
			},
			tagTemplate:  formatStrAfterSelected,
			select: function(e) {
				if (callBackSelectEvent != null){
					callBackSelectEvent.call(this, e);
				}
			},
			change: function(e){
				var value = this.value();
				var html = "";
				if (value != null && value.length > 0){
					for (var i=0, size = value.length; i< size; i++){
						var tmp = UnitTreeCatalog._mapValueOfCbx.get(value[i]);
						if (tmp != null){
							if (i == 0){
								html += tmp.staffCode + " - " +tmp.staffName;
							}else{
								html += ", " + tmp.staffCode + " - " +tmp.staffName;
							}
						}
					}
				}
				$('#choosedStaffList').html(html);
			}
		});
	},


	//ham search thong tin cua nhan vien
	//tham so :
	//independentSearch : check xem co search theo node tren cay don vi hay khong
	search: function(){
		$('#errMsg').html('').hide();
		$('#msgPasswordDefault').hide();
		$('#msgPasswordDefault').html('');
		UnitTreeCatalog.insertStaffSucess = false;
		Utils.hideMessage();//LamNH
		var param = UnitTreeCatalog.getParamSearchStaff();
		$('#searchStaffUnitTreeGrid').datagrid('load',param);
		return false;
	},
	createStaff: function(staffType){
		$('#divOverlay_New').show();
		if (staffType == StaffTypeObject.NHAN_VIEN_QUAN_LY){/**stafftype = 6*/
			UnitTreeCatalog.showStaffEditScreen(-1, 2, staffType, null);
		}else if (staffType == StaffTypeObject.KE_TOAN || staffType == StaffTypeObject.KE_TOAN_CONG_TY){
			UnitTreeCatalog.showStaffEditScreen(-1, 2, staffType, null);
		}else{
			var node = $('#tree').tree('getSelected');
			UnitTreeCatalog.showStaffEditScreen(-1, 2, staffType, node.attributes.staffGroupVO.staffGroupId);
		}
	},
	dialogCreateStaffGroup: function(staffGroup){
		var dom = $('#errGroupMsg');
		if (dom != undefined && dom != null){
			dom.html('').hide();
		}
		$('#popupStaffGroup').dialog({
			closed : false,
			cache : false,
			modal : true,
			width : 600,
			/*height : 500,*/
			onOpen: function(){
				UnitTreeCatalog._isDisplayPopupStaffGroup = true;
				$('#staffGroupCode').val('');
				$('#staffGroupName').val('');
				setTimeout(function(){
					$("#staffGroupCode").focus();
				},100);
				$('#startTime').val('07:00');
				$('#endTime').val('08:30');
				$('#distance').val('300');
				$('#popupStaffGroup #successMsg').html('');
				$('#addressSearch').val('');
				$('#addressSearch').unbind('keyup');
				$("#addressSearch").bind("keyup", function(event) {
					if (event.keyCode == keyCodes.ENTER) {
						UnitTreeCatalog.searchLocation();
					}
				});
//				$('#searchLocation').bind('keyup',function(event){
//			 		if(event.keyCode == keyCodes.ENTER){
//			 			$('#searchLocation').click();
//			 		}
//			 	});
				$('#deleteLocation').bind('keyup',function(event){
			 		if(event.keyCode == keyCodes.ENTER){
			 			$('#deleteLocation').click();
			 		}
			 	});
				$('#closePopupContentMid2').bind('keyup',function(event){
			 		if(event.keyCode == keyCodes.ENTER){
			 			$('#closePopupContentMid2').click();
			 		}
			 	});
				$('#btnSearch').unbind('click');
				var lat=null;
				var lng=null;
				if(staffGroup!=null && staffGroup!=undefined){
					luu
//					$('#btnSaveStaffGroup').html(capnhat);
//					$('#createStaffGroup span').html(capnhat);
					$('#btnSaveStaffGroup').html(luu);
					$('#createStaffGroup span').html(luu);
					$('#staffGroupCode').val(staffGroup.staffGroupCode);
					$('#staffGroupName').val(staffGroup.staffGroupName);
					$('#startTime').val(staffGroup.startTime);
					$('#endTime').val(staffGroup.endTime);
					$('#distance').val(staffGroup.distance);
					lat=staffGroup.lat;
					lng=staffGroup.lng;
					UnitTreeCatalog._lat=lat;
	 				UnitTreeCatalog._lng=lng;
					UnitTreeCatalog._isSaveOrUpdateStaffGroup=1;
					$('#staffGroupCode').attr('disabled','disabled');
				}else{
					$('#staffGroupCode').removeAttr('disabled');
//					$('#btnSaveStaffGroup').html(themmoi);
//					$('#createStaffGroup span').html(themmoi);
					$('#btnSaveStaffGroup').html(luu);
					$('#createStaffGroup span').html(luu);
					UnitTreeCatalog._isSaveOrUpdateStaffGroup=0;
				}
				if($('#mapType').val() != null && parseInt($('#mapType').val()) == 0){
					setTimeout(function() {
						var zoom = 4;
						if(!ViettelMap.isValidLatLng(lat,lng)){
							zoom = 4;
						} else if(zoom == undefined || zoom == 0 || zoom == null){
							zoom = 4;
						} else{
							//default zoom 12. level township
							zoom = 12;
						}
						ViettelMap.loadMapResource(function(){
							ViettelMap.loadBigMap('bigMap',lat, lng, zoom,function(lat, lng){
								ViettelMap.clearOverlays();
								ViettelMap.addMarker(lat,lng);
								UnitTreeCatalog._lat=lat;
								UnitTreeCatalog._lng=lng;
							});
							$('#bigMap .olControlSelectFeatureActive').next().remove();
						});
					}, 500);
				}else{
					setTimeout(function() {
						var zoom = 5;
						if(!ViettelMap.isValidLatLng(lat,lng)){
							zoom = 5;
						} else if(zoom == undefined || zoom == 0 || zoom == null){
							zoom = 5;
						} else{
							// Zoom level township
							zoom = 12;
						}
						ViettelMap.loadBigMap('bigMap',lat, lng,zoom,function(lat, lng){
							ViettelMap.clearOverlays();
							ViettelMap.addMarker(lat,lng);
							UnitTreeCatalog._lat=lat;
							UnitTreeCatalog._lng=lng;
						});
					}, 500);
				}
			},
			onClose : function(){
				UnitTreeCatalog._isDisplayPopupStaffGroup = false;
				ViettelMap.clearOverlays();
				$('#bigMap').html('');
//				$('#btnSearch').bind('click');
			}
		});

	},
	changeGroupForStaff: function(){
		var params = UnitTreeCatalog._objectChangeGroup;
		if (params == null){
			params = {

			};
		}
		params.staffId = UnitTreeCatalog._staffTreeVO.staffId;
		var combobox = $("#chooseNewGroupCbx").combobox('getValue');
		if (combobox != undefined && combobox != null){
			params.staffGroupId = combobox;
			params.isMoveToNewRouting = $('#moveStaffCheck').is(':checked') == true? 1: 0;
			params.isKeepOldRouting = $('#keepRoutingCheck').is(':checked') == true? 1: 0;
			params.newRoutingCode = $('#newRoutingCode').val();
			params.newRoutingName = $('#newRoutingName').val();
			/**
			 * kiem tra dieu kien
			 */
			if (StringUtils.isNullOrEmpty(params.staffGroupId+'')){
				$('#errChangeGroupMsg').html(msgChonNhom).show();
				return;
			}
			if (params.isMoveToNewRouting == 1 && params.isKeepOldRouting == 0 && !$('#divMoveRouting').is(':hidden')){
				var msg = '';
				if(msg.length ==0){
					msg = Utils.getMessageOfRequireCheck('newRoutingCode',SuperviseManageRouteCreate_routingCode);
				}
				if(msg.length ==0){
					msg = Utils.getMessageOfSpecialCharactersValidate('newRoutingCode',SuperviseManageRouteCreate_routingCode, Utils._CODE);
				}
				if(msg.length ==0){
					msg = Utils.getMessageOfRequireCheck('newRoutingName',SuperviseManageRouteCreate_routingName);
				}
				if(msg.length ==0){
					msg = Utils.getMessageOfSpecialCharactersValidate('newRoutingName',SuperviseManageRouteCreate_routingName, Utils._NAME);
				}
				if (!StringUtils.isNullOrEmpty(msg)){
					$('#errChangeGroupMsg').html(msg).show();
					return;
				}
				if (StringUtils.isNullOrEmpty(params.newRoutingCode)){
					$('#errChangeGroupMsg').html(msgNhapMaTuyen).show();
					setTimeout(function(){
						$('#newRoutingCode').focus();
					}, 100);
					return;
				}
				if (StringUtils.isNullOrEmpty(params.newRoutingName)){
					$('#errChangeGroupMsg').html(msgNhapTenTuyen).show();
					setTimeout(function(){
						$('#newRoutingName').focus();
					}, 100);
					return;
				}
			}

			var url = '/catalog/unit-tree/changeGroupforStaff';
			Utils.addOrSaveData(params, url, UnitTreeCatalog._xhrSave, 'errChangeGroupMsg',function(data){
				if (data != null){
					if (data.error == true){

					}else if (data.error == false){
						setTimeout(function(){
							$('#popupChangeGroupForStaff').dialog('close');
						}, 300);
						$('#divOverlay_Tree').show();
						$('#tree').tree('reload');
					}
				}
			});
		}
	},
	bindOnCheckChangeGroup: function(checkboxSelector, div, flag){
		var dom = $(checkboxSelector);
		if (dom != undefined && dom != null){
//			dom.unbind('change');
			if (flag){
				dom.live('change', function(){
					if ($(this).is(':checked')){
						$(div).show();
					}else{
						$(div).hide();
						$(div + ' input').val('');
					}
				});
			}else{
				dom.live('change', function(){
					if (!$(this).is(':checked')){
						$(div).show();
					}else{
						$(div).hide();
						$(div + ' input').val('');
					}
				});
			}
		}
	},
	openDialogChangGroup: function(){
		$('#popupChangeGroupForStaff').dialog({
			closed : false,
			cache : false,
			modal : true,
			width : 600,
			/*height : 500,*/
			onOpen: function(){
				UnitTreeCatalog._htmlPopup = $('#popupChangeGroupForStaff .PopupContentMid2').html();
				$('#divKeepRouting, #divNewCodeRouting').hide();
				$('#divMoveRouting').show();
				$('#moveStaffCheck').attr('checked', false);
				$('#keepRoutingCheck').attr('checked', true);
				$('#cStaffName').html('');
				$('#cRoutingKeeping').html('');
				$('#newRoutingCode').val('');
				if (UnitTreeCatalog._staffTreeVO != null){
					var s = UnitTreeCatalog._staffTreeVO;
					$('#cStaffName').html(s.staffName);
					var params = {
						staffId: s.staffId
					};
					var url = '/catalog/unit-tree/loadChangeGroupPopupInfo';
					Utils.getJSONDataByAjaxNotOverlay(params, url, function(data){
						if (data != null && data.listStaffGroup != null){
							if (data.routing != null && !StringUtils.isNullOrEmpty(data.routing)){
								$('#cRoutingKeeping').html(Utils.XSSEncode(data.routing.routingCode + ' - ' +data.routing.routingName));
								UnitTreeCatalog._objectChangeGroup = {
										routingId: data.routing.id,
										routingCode: data.routing.routingCode
								};
							}else{
								$('#cRoutingKeeping').html('');
								$('#divMoveRouting').hide();
							}
							var combobox = $("#chooseNewGroupCbx").data("combobox");
							if (combobox != undefined || combobox != null){
//								combobox.destroy();
								$("#chooseNewGroupCbx").val('');
							}
//							$("#chooseNewGroupCbx").kendoComboBox({
//								  dataSource: data.listStaffGroup,
//								  dataTextField: "staffGroupCodeName",
//								  dataValueField: "id",
//								  autoBind: false,
//							      filter: "contains"
//
//								});
							$('#chooseNewGroupCbx').combobox({
								data: data.listStaffGroup,
								valueField: 'id',
								textField: 'staffGroupCodeName',
								filter: "contains",
								onLoadSuccess: function(){
									var row = $('#chooseNewGroupCbx').combobox('getData');
									if(row != null && row.length > 0){
				 						$('#chooseNewGroupCbx').combobox('select', row[0].saleGroupId);
				 					}else{
				 						$('#chooseNewGroupCbx').combobox('select', '');
				 					}
								}
								
							});
							
							
						}
					});
				}
			},
			onClose : function(){
				UnitTreeCatalog._staffTreeVO = null;
				UnitTreeCatalog._objectChangeGroup = null;
				$('#popupChangeGroupForStaff .PopupContentMid2').html(UnitTreeCatalog._htmlPopup);
				UnitTreeCatalog._htmlPopup = null;
			}
		});
	},
	searchLocation: function(){
		var address = $('#addressSearch').val();
		if (!StringUtils.isNullOrEmpty(address)){
			var url = 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodeChar(address)+'&sensor=true';
			Utils.getJSONDataByAjaxNotOverlay({}, url, function(data){
				if (data != null && data.results != null && data.results.length > 0){
					var f = data.results[0];
					var lat = f.geometry.location.lat;
					var lng = f.geometry.location.lng;
					ViettelMap.clearOverlays();
	 				ViettelMap.addMarker(lat, lng);
	 				UnitTreeCatalog._lat=lat;
					UnitTreeCatalog._lng=lng;
					try{
						ViettelMap._map.setZoom(18);
					}catch(e){}
					var latlng = ViettelMap.createLatLng(lat, lng);
					ViettelMap._map.setCenter(latlng);
				}else{
					/**
					 * Khong search ra vi tri
					 */
					$('#errGroupMsg').html(msgKhongTimRaViTri).show();
					UnitTreeCatalog.deleteLocation();
					setTimeout(function(){
						$('#errGroupMsg').html('').hide();
					}, 10000);
				}
			});
		}
	},
	deleteLocation: function(){
		try{
			ViettelMap.clearOverlays();
			ViettelMap._marker.setMap(null);
		}catch(e){

		}
		/*if (ViettelMap._marker != null){
			ViettelMap.clearOverlays();
			ViettelMap._marker.setMap(null);
		}*/
		UnitTreeCatalog._lat = null;
		UnitTreeCatalog._lng = null;
	},
	deleteParamsTimekeeping: function(){
		$('#distance, #startTime, #endTime').val('');
	},
	updateOrCreateStaff: function(){
		var staffTypeId = $('#staffTypeIdHidden').val();
		var staffTypeIdChange = null;
		var staffId = $('#staffId').val();
		if (!StringUtils.isNullOrEmpty(staffTypeId) && !StringUtils.isNullOrEmpty(staffId)){
			staffTypeIdChange = $('#existedStaffOffice').combobox('getValue');
		}
		if (staffTypeIdChange != null && staffTypeId != null && staffTypeIdChange != staffTypeId && staffId != null && staffId > 0){
			var title = msgXacNhan;
			var message = msgThayDoiChucVuConfirm;
			$.messager.confirm(title, message, function(r){
				if (r != null && r == true){
					UnitTreeCatalog.excuteUpdateOrCreateStaff(true);
				}
			});
		}else{
			 UnitTreeCatalog.excuteUpdateOrCreateStaff(false);
		}
	},
	excuteUpdateOrCreateStaff: function(isUpdateStaffType){
		setTimeout(function(){
			$('#errMsgStaff').html('').hide();
		}, 3000);
		UnitTreeCatalog.insertStaffSucess = false;
		var msg = '';
		$('#errMsg').html('').hide();
		$('#errMsgStaff').html('').hide();
		var params = ValidateUtils.validate("#errMsgStaff", "#staffUnitDetailContent");
		if (params.error) {
			return false;
		}
		var msg = ValidateUtils.getMessageOfSpecialCharactersValidate('staffCode', msgStaffCode , Utils._CODE);
		if(msg.length > 0){
			return false;
		}
		$('#divOverlay_New').show();
		var dataModel = new Object();
		if($('#staffGroupId').val()!=null && $('#staffGroupId').val() != '' && $('#staffGroupId').val() > 0){
			dataModel.staffGroupId = $('#staffGroupId').val().trim();
		}else{
			dataModel.staffGroupId='';
		}
		var lstAttributesId = [];
		var lstAttributeValues = [];
		var i=0;
		$('.attributeCls').each(function() {
			var objectId = '#' + $(this).attr('id');
			var idx = objectId.split('_')[1];
			if ($('#attH_' + idx).val() !== undefined) {
				lstAttributesId[i] = $('#attH_' + idx).val().trim();
				lstAttributeValues[i] = $(objectId).val();
				if (lstAttributeValues[i] == null || lstAttributeValues[i] == '-1') {
					lstAttributeValues[i] = '';
				}
				i++;
			}
			
		});

		var stPhone = $('#staffPhone').val().trim();
		var isVnServer = $('#isVnServer').val();

		if(!Utils.isEmpty(stPhone)){
			if(isVnServer == true || isVnServer == 'true'){
				if(!Utils.isValidPhoneNumber(stPhone)){
					msg += msgInvalidPhoneNumber;
				}
			}
		}
		$('#divOverlay_New').hide();
		if(msg.length >0){
			$('#errMsgStaff').html(msg).show();
			return false;
		}

		var typeView = $('#typeView').val();
		dataModel.shopId = $('#shopId').val().trim();
		dataModel.staffCode = $('#staffCode').val().trim();
		dataModel.staffName = $('#staffName').val().trim();
		dataModel.gender = $('#gender').combobox('getValue');
		dataModel.staffPhone = $('#staffPhone').val().trim();
		dataModel.address = $('#address').val().trim();
		dataModel.status = $('#status').combobox('getValue').toString().trim();
		if (isUpdateStaffType != null && isUpdateStaffType){
			/**
			 * change staff type
			 */
			dataModel.newStaffTypeId = $('#existedStaffOffice').combobox('getValue');
			dataModel.isChangeStaffType = true;
		}else{
			dataModel.isChangeStaffType = false;
		}

		/**
		 * edit staff type
		 */
		if (UnitTreeCatalog._isCreateNewManager != null && !UnitTreeCatalog._isCreateNewManager){
			/**Tao loai nhan vien da co sang*/
			dataModel.isCreateNewManager = false;
			dataModel.channelTypeId = $('#existedStaffOffice').combobox('getValue');
			var multiSelect = $('#chooseStaffListCbx').data("kendoMultiSelect");
			if (multiSelect != null){
				dataModel.listStaffChildSelected = multiSelect.value();
			}
		}else if (UnitTreeCatalog._isCreateNewManager != null && UnitTreeCatalog._isCreateNewManager){
			/**Tao loai nhan vien moi*/
			dataModel.isCreateNewManager = true;
			dataModel.channelTypeId = $('#newManagedOfficeCbx').combobox('getValue');
			var multiSelect = $('#newChooseStaffListCbx').data("kendoMultiSelect");
			if (multiSelect != null){
				dataModel.listStaffChildSelected = multiSelect.value();
			}
			dataModel.newStaffTypeCode = $('#newStaffOfficeCode').val();
			dataModel.newStaffTypeName = $('#newStaffOfficeName').val();
			if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeCode)){
				$('#errMsgStaff').html(format(msgErrIsEmpty, msgMaChucDanh)).show();
				return false;
			}
			if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeName)){
				$('#errMsgStaff').html(format(msgErrIsEmpty, msgTenChucDanh)).show();
				return false;
			}
		}

		dataModel.lstAttributeValues = lstAttributeValues;
		dataModel.lstAttributesId = lstAttributesId;
		dataModel.typeView = typeView;
		var url = "/catalog/unit-tree/save-staff";
		Utils.addOrSaveData(dataModel, url, null, 'errMsgStaff',function(data){
			Utils.updateTokenForJSON(data);
			var newStaffId = data.newStaffId;
			if (data.changeOffice != null && data.changeOffice == true){
				Utils.popupNotify(msgAfterChangeOffice, true);
			}
			UnitTreeCatalog.loadUnitTree(null, null,newStaffId, newStaffId);
			$('#divOverlay_New').hide();
			setTimeout(function(){
				$('#btnCancel').trigger("click");
			}, 1000);
			UnitTreeCatalog._isCreateNewManager = false;

			//anhhpt:neu la tao moi nhan vien thi xuat hien thong bao mat khau mac dinh
			if(!isNullOrEmpty($('#staffId').val().trim()) && $('#staffId').val().trim()=="-1"){
				UnitTreeCatalog.insertStaffSucess = true;
			}

		},null,null, null, null, function(data){
			var a=0;
			UnitTreeCatalog.insertStaffSucess = false;
		});
	},
	createChannelType: function() {
		/**Tao loai nhan vien moi*/
		var dataModel = new Object();
		dataModel.channelTypeId = $('#newManagedOfficeCbx').combobox('getValue');
		var multiSelect = $('#newChooseStaffListCbx').data("kendoMultiSelect");
		if (multiSelect != null){
			dataModel.listStaffChildSelected = multiSelect.value();
		}
		dataModel.newStaffTypeCode = $('#newStaffOfficeCode').val();
		dataModel.newStaffTypeName = $('#newStaffOfficeName').val();
		if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeCode)){
			$('#errMsgPopAdd').html(format(msgErrIsEmpty, msgMaChucDanh)).show();
//			alert(format(msgErrIsEmpty, msgMaChucDanh));
			return false;
		}
		if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeName)){
			$('#errMsgPopAdd').html(format(msgErrIsEmpty, msgTenChucDanh)).show();
//			alert(format(msgErrIsEmpty, msgTenChucDanh));
			return false;
		}
		var url = "/catalog/unit-tree/save-chanel";
		Utils.addOrSaveData(dataModel, url, null, 'errMsgPopAdd',function(data){
			Utils.updateTokenForJSON(data);
		   if (data.success = 'SUCCESS') {
			   $('#popAdd #successMsgPopAdd').html(msgNotifySuccess).show();
			   var tm = setTimeout(function(){
				   $('#popAdd').dialog('close');
				   UnitTreeCatalog._isDisplayPopAdd = false;
				   $('#btnCloseClickPopAdd').click();
					clearTimeout(tm);
				}, 1500);
		   }else{			  
			   $('#errMsgPopAdd').html(format(msgMaChucDanhTonTai)).show();
		   }

		},null,null, null, null, function(data){
			var a=0;
		});
	},
	updateOrCreateStaffSup: function(){
		var staffTypeId = $('#staffTypeIdHidden').val();
		var staffTypeIdChange = null;
		var staffId = $('#staffId').val();
		if (!StringUtils.isNullOrEmpty(staffTypeId) && !StringUtils.isNullOrEmpty(staffId)){
			staffTypeIdChange = $('#existedStaffOffice').combobox('getValue');
		}
		if (staffTypeIdChange != null && staffTypeId != null && staffTypeIdChange != staffTypeId && staffId != null && staffId > 0){
			/**
			 * show dialog confirm change staff type
			 */
			var title = msgXacNhan;
			var message = msgThayDoiChucVuConfirm;
			$.messager.confirm(title, message, function(r){
				if (r != null && r == true){
					UnitTreeCatalog.excuteUpdateOrCreateStaffSup(true);
				}
			});
		}else{
			 UnitTreeCatalog.excuteUpdateOrCreateStaffSup(false);
		}
	},
	excuteUpdateOrCreateStaffSup: function(isUpdateStaffType){
		/**giu nguyen*/
		setTimeout(function(){
			$('#errMsgStaff').html('').hide();
//			Utils.hideMessage();//LamNH
		}, 3000);
		UnitTreeCatalog.insertStaffSucess = false;
		var msg = '';
		$('#errMsg').html('').hide();
		$('#errMsgStaff').html('').hide();
//		Utils.hideMessage();//LamNH
		var params = ValidateUtils.validate("#errMsgStaff", "#staffUnitDetailContent");
		if (params.error) {
			return false;
		}
		var msg = ValidateUtils.getMessageOfSpecialCharactersValidate('staffCode', msgStaffCode , Utils._CODE);
		if(msg.length > 0){
			return false;
		}
		var dataModel = new Object();
		if($('#staffGroupId').val()!=null && $('#staffGroupId').val() != '' && $('#staffGroupId').val() > 0){
			dataModel.staffGroupId = $('#staffGroupId').val().trim();
		}else{
			dataModel.staffGroupId='';
		}
		var lstAttributesId = [];
		var lstAttributeValues = [];
		var i=0;
		$('.attributeCls').each(function() {
			var objectId = '#' + $(this).attr('id');
			var idx = objectId.split('_')[1];
			lstAttributesId[i] = $('#attH_' + idx).val().trim();
			lstAttributeValues[i] = $(objectId).val();
			if (lstAttributeValues[i] == null || lstAttributeValues[i] == '-1') {
				lstAttributeValues[i] = '';
			}
			i++;
		});


		var stPhone = $('#staffPhone').val().trim();
		var isVnServer = $('#isVnServer').val();

		if(!Utils.isEmpty(stPhone)){
			if(isVnServer == true || isVnServer == 'true'){
				if(!Utils.isValidPhoneNumber(stPhone)){
					msg += msgInvalidPhoneNumber;
				}
			}
		}

		if(msg.length >0){
			$('#errMsgStaff').html(msg).show();
			return false;
		}

		var typeView = $('#typeView').val();
		dataModel.shopId = $('#shopId').val().trim();
		dataModel.staffCode = $('#staffCode').val().trim();
		dataModel.staffName = $('#staffName').val().trim();
		dataModel.gender = $('#gender').combobox('getValue');
		dataModel.staffPhone = $('#staffPhone').val().trim();
		dataModel.address = $('#address').val().trim();
		dataModel.status = $('#status').combobox('getValue').toString().trim();
		if (isUpdateStaffType != null && isUpdateStaffType){
			dataModel.newStaffTypeId = $('#existedStaffOffice').combobox('getValue');
			dataModel.isChangeStaffType = true;
		}else{
			dataModel.isChangeStaffType = false;
		}

		/**
		 * edit staff type
		 */
		if (UnitTreeCatalog._isCreateNewManager != null && !UnitTreeCatalog._isCreateNewManager){
			/**Tao loai nhan vien da co sang*/
			dataModel.isCreateNewManager = false;
			dataModel.channelTypeId = $('#existedStaffOffice').combobox('getValue');
			var multiSelect = $('#chooseStaffListCbx').data("kendoMultiSelect");
			if (multiSelect != null){
				dataModel.listStaffChildSelected = multiSelect.value();
			}
		}else if (UnitTreeCatalog._isCreateNewManager != null && UnitTreeCatalog._isCreateNewManager){
			/**Tao loai nhan vien moi*/
			dataModel.isCreateNewManager = true;
			dataModel.channelTypeId = $('#newManagedOfficeCbx').combobox('getValue');
			var multiSelect = $('#newChooseStaffListCbx').data("kendoMultiSelect");
			if (multiSelect != null){
				dataModel.listStaffChildSelected = multiSelect.value();
			}
			dataModel.newStaffTypeCode = $('#newStaffOfficeCode').val();
			dataModel.newStaffTypeName = $('#newStaffOfficeName').val();
			if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeCode)){
				$('#errMsgStaff').html(format(msgErrIsEmpty, msgMaChucDanh)).show();
				return false;
			}
			if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeName)){
				$('#errMsgStaff').html(format(msgErrIsEmpty, msgTenChucDanh)).show();
				return false;
			}
		}

		dataModel.lstAttributeValues = lstAttributeValues;
		dataModel.lstAttributesId = lstAttributesId;
		dataModel.typeView = typeView;
		var url = "/catalog/unit-tree/save-staff";
		Utils.addOrSaveData(dataModel, url, null, 'errMsgStaff',function(data){
			Utils.updateTokenForJSON(data);
			var newStaffId = data.newStaffId;
			if (data.changeOffice != null && data.changeOffice == true){
				Utils.popupNotify(msgAfterChangeOffice, true);
			}
			UnitTreeCatalog.loadUnitTree(null, null,newStaffId, newStaffId);
			setTimeout(function(){
				$('#btnCancelSuper').trigger("click");
			}, 1000);
			UnitTreeCatalog._isCreateNewManager = false;

			//anhhpt:neu la tao moi nhan vien thi xuat hien thong bao mat khau mac dinh
			if(!isNullOrEmpty($('#staffId').val().trim()) && $('#staffId').val().trim()=="-1"){
				UnitTreeCatalog.insertStaffSucess = true;
			}

		},null,null, null, null, function(data){
			var a=0;
			UnitTreeCatalog.insertStaffSucess = false;
		});
	},
	expandToNode: function(id,type){

		//var htmlNode = $('#tree').tree('find', id);
		if(type != null){
			var root = $('#tree').tree('getRoot');
			if(root.children != null){
				var childNodes = $('#tree').tree('getChildren',root.target);
				var childSelect = null;
				for(var i=0;i<childNodes.length;i++){
					var childNode = childNodes[i];
					if(type == UnitTreeCatalog.SHOP || type == UnitTreeCatalog.GROUP){
						if(childNode.id == id){
							if(type == UnitTreeCatalog.SHOP){
								if(childNode.attributes != null && childNode.attributes.shopTreeVO !=null){
									$('#tree').tree("expandTo", childNode.target);
									$('#tree').tree("select", childNode.target);
								}
							}
							if(type == UnitTreeCatalog.GROUP){
								if(childNode.attributes != null && childNode.attributes.staffGroupVO !=null){
									$('#tree').tree("expandTo", childNode.target);
									$('#tree').tree("select", childNode.target);
								}
							}
						}
					}else{
						if(type == UnitTreeCatalog.STAFF){
							if(childNode.attributes != null && childNode.attributes.staffTreeVO !=null){
								if (id == childNode.attributes.staffTreeVO.staffId){
									if (childSelect == null){
										childSelect = childNode.target;
										$('#tree').tree("select", childNode.target);
									}
									$('#tree').tree("expandTo", childNode.target);
								}
							}
						}
					}
				}
			}
		}
	},
	/**
	 * Back to list staff when role is supervisor
	 * Else is manager #isManager
	 */
	showLastView: function(){
		$('#divOverlay_New').show();
		var lastView = $.data(document.body, "lastView");
		// Back to list staff when role is supervisor
		if( $('#supervisorUser').val() == 'true' ){
//			window.location.href = '/catalog/unit-tree-supervise/info';
			UnitTreeCatalog.showSearchScreenSuper(lastView);
		}
		//Else is manager #isManager
		else {
			$("#treeUnit").show();
			
			UnitTreeCatalog.showSearchScreen(lastView);
			//Check condition for redirect role supervise
			
		}
	},
	createStaffGroup:function(){
		var msg = '';
		$('#errGroupMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		var staffGroupName = $('#staffGroupName').val().trim();
		var staffGroupCode = $('#staffGroupCode').val().trim();
		var startTime = $('#startTime').val().trim();
		var endTime = $('#endTime').val().trim();

		if(Utils.compareHouse(startTime,endTime) > 0){
			var msg = format(msgComapareValue,msgTuGio.toLowerCase(),msgDenGio.toLowerCase());
			$('#errGroupMsg').html(msg).show();
//			Utils.showMessage(msg);//LamNH
			setTimeout(function(){
				$('#errGroupMsg').html('').hide();
//				Utils.hideMessage();//LamNH
			}, 10000);
			return false;
		}

		var distance = $('#distance').val().trim();
		var params = ValidateUtils.validate("#errGroupMsg", "#popupStaffGroup");
		if (params.error) {
			setTimeout(function(){
				$('#errGroupMsg').html('').hide();
//				Utils.hideMessage();//LamNH
			}, 10000);
			return;
		}
		if (StringUtils.isNullOrEmpty(startTime)
				){
			startTime = '';
		}
		if (StringUtils.isNullOrEmpty(endTime)
			){
			endTime = '';
		}
		if (StringUtils.isNullOrEmpty(distance)){
			distance = '';
		}
		var lat = UnitTreeCatalog._lat == null? '':UnitTreeCatalog._lat;
		var lng = UnitTreeCatalog._lng == null? '':UnitTreeCatalog._lng;
		if ((StringUtils.isNullOrEmpty(startTime)
				|| StringUtils.isNullOrEmpty(endTime)
				|| StringUtils.isNullOrEmpty(distance))
			&& (!StringUtils.isNullOrEmpty(startTime+endTime+distance))){
			/**
			 * 1/2 trong 3 bi null
			 */
			$('#errGroupMsg').html(msgRequireAllParam).show();
//			Utils.showMessage(msgRequireAllParam);//LamNH
			setTimeout(function(){
				$('#errGroupMsg').html('').hide();
//				Utils.hideMessage();//LamNH
			}, 10000);
			return;
		}else if ( (!StringUtils.isNullOrEmpty(startTime+endTime+distance)
					&& (StringUtils.isNullOrEmpty(lat) || StringUtils.isNullOrEmpty(lng)))
					|| (StringUtils.isNullOrEmpty(startTime+endTime+distance) && !StringUtils.isNullOrEmpty(lng+lat))){
			/**
			 * 3 tham so co du nhung thieu lat lng
			 */
			$('#errGroupMsg').html(msgRequireAllParam).show();
//			Utils.showMessage(msgRequireAllParam);//LamNH
			setTimeout(function(){
				$('#errGroupMsg').html('').hide();
//				Utils.hideMessage();//LamNH
			}, 10000);
			return;
		}
		var nodeSelect = $('#tree').tree('getSelected');
		if (nodeSelect == null)
			return;
		var dataModel = new Object();
		dataModel.staffGroupCode=staffGroupCode;
		dataModel.staffGroupName=staffGroupName;
		dataModel.staffGroupName=staffGroupName;
		dataModel.startTime = startTime;
		dataModel.endTime = endTime;
		dataModel.distance = distance;
		dataModel.isSaveOrUpdateStaffGroup=UnitTreeCatalog._isSaveOrUpdateStaffGroup;
		if(UnitTreeCatalog._lat!=null && UnitTreeCatalog._lng!=null){
			dataModel.lat=UnitTreeCatalog._lat;
			dataModel.lng=UnitTreeCatalog._lng;
		}
		Utils.addOrSaveData(dataModel, "/catalog/unit-tree/save-staff-group", UnitTreeCatalog._xhrSave, 'errGroupMsg',function(data){
			var tm = setTimeout(function(){
				$('#popupStaffGroup').dialog('close');
				$('#divOverlay_Tree').show();
				$('#tree').tree('reload');
				UnitTreeCatalog._lat=null;
				UnitTreeCatalog._lng=null;
				UnitTreeCatalog._isSaveOrUpdateStaffGroup=null;
				clearTimeout(tm);
			}, 1500);

		},null,'#popupStaffGroup');
	},
	dialogSearchStaff: function(staffType){
		var params = new Object();
		params.staffCode=$('#seachStyle2Code').val().trim();
		params.staffName=$('#seachStyle2Name').val().trim();
		params.shopId=$('#shopId').val().trim();
		var functionSupport = null;
		var functionHideHeader = null;
		if (staffType != null && staffType == StaffTypeObject.GIAM_SAT){
			functionSupport = UnitTreeCatalog.supportFunctionForGsOnGrid;
			functionHideHeader = UnitTreeCatalog.hideHeaderCheckboxOnGrid;
		}
		CommonSearchUnitTree.searchNVBHUnitTreeDialog(function(data) {
			if (data != null && data.length > 0) {
				var lstStaff='';
				for(var i = 0; i < data.length; i++){
					lstStaff=lstStaff+data[i].id+',';
				}
				lstStaff = lstStaff.substr(0, lstStaff.length-1);
				var node = $('#tree').tree('getSelected');
				if(node!=null && node.attributes!=null & node.attributes.staffGroupVO!=null){
					var dataModel = new Object();
					dataModel.staffGroupId = node.attributes.staffGroupVO.staffGroupId;
					dataModel.lstStaff = lstStaff;
					Utils.addOrSaveData(dataModel, "/catalog/unit-tree/add-staff-for-group", UnitTreeCatalog._xhrSave, 'errGroupMsg',function(data){
						$('#divOverlay_Tree').show();
						$('#tree').tree('reload');
					});
				};
			};
		}, params,'/catalog/unit-tree/search-all-staff-group?staffType='+staffType, functionSupport, functionHideHeader);
	},
	hideHeaderCheckboxOnGrid: function(){
		$('[field=id] .datagrid-header-check [type=checkbox]').hide();
		$('[field=id] .datagrid-header-check .el-checkbox').css("display", "none");
		$('[field=id] .datagrid-header-check .el-checkbox').hide();
	},
	supportFunctionForGsOnGrid: function(rowIndex, rowData){
		/**Callback select */
		var selectedId = rowData['id'];
		if (CommonSearchUnitTree._mapMutilSelect != null){
			var arrKey = CommonSearchUnitTree._mapMutilSelect.keyArray;
			if (arrKey != null && arrKey.length > 0){
				$('td[field=id] [value=' + arrKey[0] + "]").attr('checked', false);
				$('#searchStyle2EasyUIGrid').datagrid('unselectAll');
				$('#searchStyle2EasyUIGrid').datagrid('selectRow', rowIndex);
			}
		}
		CommonSearchUnitTree._mapMutilSelect = new Map();
    	CommonSearchUnitTree._mapMutilSelect.put(selectedId, rowData);
	},
	exportExcel:function(){
		UnitTreeCatalog.insertStaffSucess = false;
		$('#msgPasswordDefault').hide();
		$('#msgPasswordDefault').html('');
		$('#errExcelMsg').html('').hide();
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH

		$.messager.confirm(xacnhan, comuonexport, function(r){
			if (r){
				var params = UnitTreeCatalog.getParamSearchStaff();
				var url = "/catalog/unit-tree/export-excel";
				showLoadingIcon();
				ReportsUtils.exportExcel(params, url, 'errExcelMsg', true);
			}
		});
 		return false;
 	},
 	importExcel:function(){
 		UnitTreeCatalog.insertStaffSucess = false;
 		$('#msgPasswordDefault').hide();
 		$('#msgPasswordDefault').html('');

		$('#importFrm').attr("action","/catalog/unit-tree/import-excel");
		ReportsUtils.uploadExcel(function(){
			$("#searchStaffUnitTreeGrid").datagrid("reload");

			//anhhpt: Khi import nhan vien thanh cong, hien thi thong bao password ngay duoi datagrid
			var totalRow = Number($('#totalRow').html());
			var numFail = Number($('#numFail').html());

			if(totalRow > numFail){ // neu co dong import thanh cong
				$('#msgPasswordDefault').show();
				$('#msgPasswordDefault').html(msgImportStaffPass);
			}else{
				$('#msgPasswordDefault').hide();
				$('#msgPasswordDefault').html('');
			}

			$('#tree').tree('reload');
		}, ({token: $('#token').val().trim()}));
	},
	removeGroup:function(){
		var node = $('#tree').tree('getSelected');
		if(node!=null && node.attributes!=null & node.attributes.staffGroupVO!=null){
			var dataModel = new Object();
			dataModel.staffGroupId = node.attributes.staffGroupVO.staffGroupId;
			/*Utils.addOrSaveData(dataModel, "/catalog/unit-tree/remove-group", UnitTreeCatalog._xhrSave, 'errGroupMsg',function(data){
				$('#tree').tree('reload');
			});*/
			
			Utils.addOrSaveData(dataModel, "/catalog/unit-tree/remove-group", null, null,function(data){
				Utils.popupNotify(msgCommon3, true);
				$('#divOverlay_Tree').show();
				$('#tree').tree('reload');				 
			}, null, null, null, null, function(data){
				if (data != null && data.error != null && (data.error && !StringUtils.isNullOrEmpty(data.errMsg))){
					Utils.popupNotify(data.errMsg, false);
				}
			});			
			
			
			return false;
		}
 	},
 	removeStaff:function(){
		var node = $('#tree').tree('getSelected');
		if(node!=null && node.attributes!=null & node.attributes.staffTreeVO!=null){
			var dataModel = new Object();
			dataModel.staffId = node.attributes.staffTreeVO.staffId;
			try{
				if (node.role != "MANAGER"){
					dataModel.staffGroupId = node.attributes.staffTreeVO.staffGroupId;
				}
			}catch(e){}
			Utils.addOrSaveData(dataModel, "/catalog/unit-tree/remove-staff", null, null,function(data){
				Utils.popupNotify(msgCommon3, true);
				$('#divOverlay_Tree').show();
				$('#tree').tree('reload');
				UnitTreeCatalog.showSearchScreen();
			}, null, null, null, null, function(data){
				if (data != null && data.error != null && (data.error && !StringUtils.isNullOrEmpty(data.errMsg))){
					Utils.popupNotify(data.errMsg, false);
				}
			});
			return false;
		}
 	},
 	createNewManager: function(){
 		//$('.notAddOffice').hide();
 		//$('.addOffice').show();
 		/*UnitTreeCatalog._isCreateNewManager = true;
 		UnitTreeCatalog.loadDataForCbx('#newManagedOffi
 		ceCbx', '#newChooseStaffListCbx', null, '6', true);*/
 		$('#newStaffOfficeCode').val('');
 		$('#newStaffOfficeName').val('');
 		$('#errMsgPopAdd').val('').hide();
 		$('#successMsgPopAdd').val('').hide();
 		$('#popAdd').dialog({
			closed : false,
			cache : false,
			modal : true,
			  title : them_chuc_danh,
			  width : 600,
			  height : 250,
			  onOpen: function(){
				  $('#newStaffOfficeCode').focus();
				  $('#popAdd').show();
				  UnitTreeCatalog._isDisplayPopAdd = true;
				  $(window).bind('keypress',function(event){
						if (event.keyCode == keyCodes.ENTER ) {
							var closePopAdd = document.getElementById('closePopAdd');
							if(UnitTreeCatalog._isDisplayPopAdd && !(document.activeElement === closePopAdd)) {
									$('#btnSaveChanelPopAdd').click();
								}
								return false;
							}
						return true;
				   	});
				  $('#closePopAdd').bind('keyup',function(event){
				 		if(event.keyCode == keyCodes.ENTER){
				 			$('#closePopAdd').click();
				 		}
				 	});
			 		UnitTreeCatalog.loadDataForCbx('#newManagedOfficeCbx', '#newChooseStaffListCbx', null, '6', true);
			  },
			  onClose : function(){
				  UnitTreeCatalog._isDisplayPopAdd = false;
				}
 		})
 	},

 	editManager : function(rowId) {
 		$('#errorOnclick').html('').hide();
 		$('#errMsgPop1').html('').hide();
 		$('#successMsg1').html('').hide();
		setTextboxValue('editStaffOfficeCode','');
		setTextboxValue('editStaffOfficeCodeOl','');
		setTextboxValue('editStaffOfficeName','');
		setTextboxValue('channelTypeId','');
		setTextboxValue('parentId','');
//		disabled('editStaffOfficeCode');
//		setSelectBoxValue('editStaffOfficePosition', '');

		var rows = null;
		if(rowId!=undefined && rowId!=null && rowId>=0){
			rows = $('#searchStaffUnitTreeGridPop').datagrid('getRows')[rowId];
		}

		$('#popEdit').dialog({
			closed : false,
			cache : false,
			modal : true,
			width : 500,
			height : 350,
			top: 100,
			left: 300,
			title : sua_chuc_danh,
			onOpen: function(){
				$('#popEdit').show();

				if(rows!=null){

					setTextboxValue('channelTypeId',rows.idChannelType);
					setTextboxValue('parentId',rows.parentId);
					setTextboxValue('editStaffOfficeCode',rows.codeChannelType);
					setTextboxValue('editStaffOfficeCodeOl',rows.codeChannelType);
					setTextboxValue('editStaffOfficeName', Utils.XSSDeEncode(rows.nameChannelType));
//					if(rows.parentId!=null){
//						setSelectBoxValue('editStaffOfficePosition', Utils.XSSDeEncode(rows.parentId));
//					}
					$('#editStaffOfficePosition').hide();
					$('#labelPosition').hide();
					$('#divForManager').hide();
					$('#editStaffOfficeCode').focus();
				}

			},
		 	onBeforeClose: function() {
//		 		$('#editStaffOfficePosition').html('');
	        },
	        onClose : function(){
//	        	$('#editStaffOfficePosition').html('');
	        	enable('editStaffOfficeCode');
	        	enable('editStaffOfficeName');
	        	enable('editStaffOfficePosition');
	        	$('#editStaffOfficePosition').show();
	        	$('#labelPosition').show();
	        	$('#divForManager').show();
	        	UnitTreeCatalog.getLstCombo();

	        }
		});
	},

	addManager : function() {
		$('#errorOnclick').html('').hide();
 		$('#errMsgPop1').html('').hide();
 		$('#successMsg1').html('').hide();
		setTextboxValue('editStaffOfficeCode','');
		setTextboxValue('editStaffOfficeName','');
		setTextboxValue('channelTypeId','');
		setTextboxValue('parentId','');
		setSelectBoxValue('editStaffOfficePosition', '');
		$('#popEdit').dialog({
			closed : false,
			cache : false,
			modal : true,
			width : 500,
			height : 300,
			title:them_chuc_danh,
			onOpen: function(){
				$('#popEdit').show();
				$('#editStaffOfficeCode').focus();
			},
		 	onBeforeClose: function() {
	        },
	        onClose : function(){
	        	enable('editStaffOfficeCode');
	        	enable('editStaffOfficeName');
	        	enable('editStaffOfficePosition');
	        	UnitTreeCatalog.getLstCombo();
	        }
		});
	},

	getLstCombo:function(){
		$('#editStaffOfficePosition').html('');
//		var data = new Object();
//		data.channeltypeId = id;
//		var kData = $.param(data,true);
		$.ajax({
	       type: 'POST',
	       url:'/catalog/unit-tree/get-combo',
	       dataType: 'json',
//	       data : (kData),
	       success: function(data){
	             var arrHtml = new Array();
//	             	arrHtml.push('<option value=""></option>');
					for(var i=0;i<data.lstChannelType.length;i++){
						arrHtml.push('<option value="'+ data.lstChannelType[i].id +'">'+ Utils.XSSEncode(data.lstChannelType[i].channelTypeName) +'</option>');
					}
					$('#editStaffOfficePosition').html($('#editStaffOfficePosition').html()+arrHtml.join(""));
					$('#editStaffOfficePosition').change();
					$('#editStaffOfficePosition').prop('disabled', true);
	        }});
	},

	editChannelType: function() {
		/**Sua chuc danh*/
		var dataModel = new Object();
		dataModel.channelTypeId = $('#channelTypeId').val();
		dataModel.parentId = $('#parentId').val();
		dataModel.newStaffTypeCode = $('#editStaffOfficeCode').val().trim();
		dataModel.newStaffTypeCodeOl = $('#editStaffOfficeCodeOl').val().trim();
		dataModel.newStaffTypeName = $('#editStaffOfficeName').val().trim();
		dataModel.managerId = $('#editStaffOfficePosition').val().trim();

		if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeCode)){
			$('#errMsgPop1').html(format(msgErrIsEmpty, msgMaChucDanh)).show();
//			alert(format(msgErrIsEmpty, msgMaChucDanh));
			return false;
		}
		if (StringUtils.isNullOrEmpty(dataModel.newStaffTypeName)){
			$('#errMsgPop1').html(format(msgErrIsEmpty, msgTenChucDanh)).show();
//			alert(format(msgErrIsEmpty, msgTenChucDanh));
			return false;
		}

//		if (dataModel.newStaffTypeCode != null && dataModel.newStaffTypeCode != '' && dataModel.newStaffTypeCode == dataModel.managerId){
//			$('#errMsgPop1').html(format(msgMaChucDanhTonTai)).show();
////			alert(format(msgTrungChucDanh));
//			return false;
//		}

		var msg = '';
		if (msg.length == 0) {
			// jspCustomerAttributeCode = Mã thuộc tính
			msg = ValidateUtils.getMessageOfRequireCheck('editStaffOfficeCode', msgMaChucDanh);
		}
		if(msg.length ==0){
			// jspCustomerAttributeCode = Mã thuộc tính
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('editStaffOfficeCode', msgMaChucDanh,Utils._CODE);
		}
		if(msg.length ==0){
			if(dataModel.newStaffTypeName != null && dataModel.newStaffTypeName.length > 0){
				msg = Utils.getMessageOfSpecialCharactersValidateForValue(dataModel.newStaffTypeName, msgTenChucDanh , Utils._NAME);
			}
		}

		if(msg.length > 0){
			$('#errMsgPop1').html(msg).show();
//			alert(msg);
			return false;
		}


		var url = "/catalog/unit-tree/edit-chanel";
		var check = 0;
		Utils.addOrSaveData(dataModel, url, null, 'errMsgStaff',function(data){
//			Utils.updateTokenForJSON(data);
			if (data.success == 'SUCCESS') {
				check = 1;
				UnitTreeCatalog.loadUnitTree();
				$('#popEdit #successMsg1').html(msgNotifySuccess).show();
				var tm = setTimeout(function(){
					$('#popEdit').dialog('close');
					$("#searchStaffUnitTreeGridPop").datagrid("reload");
					clearTimeout(tm);
				}, 1500);
//				$('#popEdit').dialog('close');
////				var params = new Object();
//				Utils.getHtmlDataByAjax(params, '/catalog/unit-tree/edit-position',function(data) {
//					$("#unitTreeContent").html(data);
//					}, null, 'POST');
//				return false;
				
//				$('#divOverlay').show();
//				$.ajax({
//					type : 'GET',
//					url : '/catalog/unit-tree/edit-position',			
//					dataType : "html",
//					success : function(data) {
//						$("#unitTreeContent").html(data).show();
//						UnitTreeCatalog.resize();
//						UnitTreeCatalog._typeScreen = -3;
//						UnitTreeCatalog.insertStaffSucess = false;
//						$('#divOverlay').hide();
//					},
//					error:function(XMLHttpRequest, textStatus, errorThrown) {
//						$('#divOverlay').hide();
//					}
//				});
//				return false;
				
			}else{
				$('#errMsgPop1').html(format(msgMaChucDanhTonTai)).show();
			}

//		}, null, null, null, null, null);
		},null,'#popEdit',null,null,function(data){
			if(data.error != undefined  && data.error && data.errMsg != undefined){
				$('#errMsgPop1').html(data.errMsg).show();
			}
		});
		return false;
//		if(check = 1){
//			UnitTreeCatalog.loadUnitTree();
//		}


//			Utils.updateTokenForJSON(data);
//		   if (data.success = 'SUCCESS') {
//			   $('#popEdit').dialog('close');
//			   $('#btnCloseClick').click();
//		   }
//
//		},null,null, null, null, function(data){
//			var a=0;
//		});
	},

	onclickRow: function() {
		$('#errorOnclick').html(format(msgSuaChucDanh)).show();
	},

 	loadDataForCbx: function(cbxSelector, multiselectSelector, textFillSelector, staffType,
 			isCreateNewManager, isDisableCbx, staffTypeId, callBackSelect, callBackSuccess, listStaffChildId, isExistedManager){
 		$(cbxSelector).combobox({
 			url: '/catalog/unit-tree/getOfficeOfStaff',
 			valueField: "id",
 			textField: "channelTypeName",
 			panelWidth: UnitTreeCatalog._widthCbx,
 		    panelHeight: 'auto',
 		    width: UnitTreeCatalog._widthCbx,
 		   onBeforeLoad: function(params){
 			   if (params == null){
 				  params = {
 						 isCreateNewManager: isCreateNewManager,
 						objectTypeValue: staffType
 				  };
 			   }else{
 				  params.isCreateNewManager = isCreateNewManager;
 				  params.objectTypeValue = staffType;
 			   }
 			   var staffId = $('#staffId').val();
 			   var staffTypeId = $('#staffTypeIdHidden').val();
 			   if (!StringUtils.isNullOrEmpty(staffId) && !StringUtils.isNullOrEmpty(staffTypeId)){
 				   params.staffId = staffId;
 				   params.staffTypeId = staffTypeId;
 			   }
 		   },
 			onSelect: function(rec){
 				if (rec != null){
 					var params = {
 							objectTypeValue: rec.objectType,
 							channelTypeId: rec.id,
 							isCreateNewManager: isCreateNewManager
 					};
 					var staffId_ = $('#staffId').val();
 			 		if (!StringUtils.isNullOrEmpty(staffId_)){
 			 			if (parseInt(staffId_) > 0){
 			 				params.staffId = staffId_;
 			 			}
 			 		}
 					var url_ = "/catalog/unit-tree/fillInfoManagedStaff";
 					Utils.getJSONDataByAjaxNotOverlay(params, url_, function(data){
 						if (data != null){
 							if (textFillSelector != null && textFillSelector != undefined ){
 								$(textFillSelector).val(data.text);
 							}
 						}
 					});
 					if (rec.objectType == StaffTypeObject.NHAN_VIEN_QUAN_LY || (UnitTreeCatalog._isCreateNewManager != null && UnitTreeCatalog._isCreateNewManager)){
 						$('#divChoosedStaff').show();
 						$('#backupInputChooseStaffListCbx').show();
 						var url_2 = "/catalog/unit-tree/fillStaffToCbx";
 	 					Utils.getJSONDataByAjaxNotOverlay(params, url_2, function(data){
 	 						if (data != null){
 	 							if (data.listStaff != null && data.listStaff.length > 0){
 	 								UnitTreeCatalog._mapValueOfCbx = new Map();
 	 								for (var i=0, size = data.listStaff.length; i< size; i++){
 	 									UnitTreeCatalog._mapValueOfCbx.put(data.listStaff[i].id, data.listStaff[i]);
 	 								}
 	 							}else{
 	 								UnitTreeCatalog._mapValueOfCbx = null;
 	 							}
 	 							var multiSelect = $(multiselectSelector).data("kendoMultiSelect");
 	 							if (multiSelect != undefined && multiSelect != null){
 	 								var newDataSource = new kendo.data.DataSource({
 	 									  data: data.listStaff
 	 								});
 	 								multiSelect.setDataSource(newDataSource);
 	 								multiSelect.value([]);
 	 							}else{
 	 								UnitTreeCatalog.loadkendoMultiselect(multiselectSelector, data.listStaff, "staffCode", "id", '#: data.staffName #', function(e){
 	 									var html_ = $('#choosedStaffList').html();
 	 									if (!StringUtils.isNullOrEmpty(html_)){
 	 										html_ += ", " + e.item.text();
 	 									}else{
 	 										html_ += e.item.text();
 	 									}
 	 									$('#choosedStaffList').html(html_);
 	 								});
 	 							}
 	 							if (!StringUtils.isNullOrEmpty(listStaffChildId)){
 	 			 					var arrStaffChild = listStaffChildId.split(',');
 	 			 					setTimeout(function(){
 	 			 						var multiSelect = $(multiselectSelector).data("kendoMultiSelect");
 	 			 						if (multiSelect != undefined && multiSelect != null){
 	 										multiSelect.value(arrStaffChild);
 	 									}
 	 			 					}, 1000, arrStaffChild);
 	 			 				}
 	 						}
 	 					});
 					}else if (rec.objectType == StaffTypeObject.GIAM_SAT){
 						$('#divChoosedStaff').hide();
 						$('#backupInputChooseStaffListCbx').hide();
 						var multiSelect = $(multiselectSelector).data("kendoMultiSelect");
 						if (multiSelect != undefined && multiSelect != null){
							var newDataSource = new kendo.data.DataSource({
								  data: []
							});
							multiSelect.setDataSource(newDataSource);
							multiSelect.value([]);
						}
 						$('#backupInputChooseStaffListCbx').hide();
 					}else{
 						$('#divChoosedStaff').hide();
 						$('#backupInputChooseStaffListCbx').hide();
 					}
 				}
 			},
 			onLoadSuccess: function(){
 				if (staffTypeId != undefined && staffTypeId != null && staffTypeId != '' && staffTypeId > 0){
 					$(cbxSelector).combobox('select', staffTypeId);
 					/**
 					 * thay doi chuc vu
 					 */
 					/***/
 					var list = $(cbxSelector).combobox('getData');
 					if (list != null && list.length > 0){
 						for (var j =0, size = list.length; j< size; j++){
 							var e = list[j];
 							if (e != null && e.id == staffTypeId && e.objectType == StaffTypeObject.ADMIN){
 								disableCombo(cbxSelector);
 								break;
 							}
 						}
 					}
 				}else if (staffType != null && staffType != undefined){
 					var list = $(cbxSelector).combobox('getData');
 					var idselect = UnitTreeCatalog.getIdByStaffType(list, staffType);
 					if (idselect != null){
 						$(cbxSelector).combobox('select', idselect);
 					}
 					if (isDisableCbx){
						disableCombo(cbxSelector);
					}
 				}
 				if (isCreateNewManager){
 					disableCombo(cbxSelector);
 				}
 				if (callBackSuccess != null){
 					callBackSuccess.call(this);
 				}


 				if (staffType != undefined && staffType != null && staffType == StaffTypeObject.NHAN_VIEN_QUAN_LY){
 					$('#backupInputChooseStaffListCbx').show();
 				}else {
 					$('#backupInputChooseStaffListCbx').hide();
 				}
 			}
 		});
 	},
 	getManagerLead: function(listMag){
 		/**
 		 * list chi chua NVQL & GS
 		 */
 		if (listMag != null && listMag.length > 0){
 			for (var i=0, size = listMag.length; i< size; i++){
 				if (listMag[i] != null && listMag[i].type == ChannelTypeType.STAFF
 						&& (listMag[i].objectType == StaffTypeObject.NHAN_VIEN_QUAN_LY || listMag[i].objectType == StaffTypeObject.GIAM_SAT )
 						&& listMag[i].parentChannelType == null){
 					return listMag[i];
 				}
 			}
 		}
 		return null;
 	},
 	getIdByStaffType: function(listStaffType, staffType){
 		if (listStaffType != null && listStaffType.length > 0){
 			if (staffType != null && staffType != StaffTypeObject.NHAN_VIEN_QUAN_LY){
 				for (var i=0, size =listStaffType.length; i< size; i++){
 	 				var dom = listStaffType[i];
 	 				if (dom != null && staffType != StaffTypeObject.NHAN_VIEN_QUAN_LY){
 	 					if (dom.objectType == staffType){
 	 						return dom.id;
 	 					}
 	 				}
 	 			}
 			}else if (staffType != null && staffType == StaffTypeObject.NHAN_VIEN_QUAN_LY){
 				var managerLead =  UnitTreeCatalog.getManagerLead(listStaffType);
 				if (managerLead != null){
 					return managerLead.id;
 				}
 			}
 		}
 		return null;
 	},
 	resetPasswordForStaff: function(staffId){
 		var params = {
 				staffId: staffId
 		};
 		var url = "/catalog/unit-tree/resetPassword";
 		var staffCodeName = "";
 		var rows = $('#searchStaffUnitTreeGrid').datagrid('getRows');
 		UnitTreeCatalog._mapStaffOfGrid = new Map();
 		if (rows != null && rows.length > 0){
 			for (var i=0, size = rows.length; i< size; i++){
 				if (staffId == rows[i].id){
 					staffCodeName = rows[i].staffCode + ' - ' + rows[i].staffName;
 					break;
 				}
 			}
 		}
 		var msage = format(msgConfirmBanMuonResetMatkhau, staffCodeName);
 		Utils.addOrSaveData(params, url, null, 'errMsgResetPassword', function(data){
 			var msg =  Utils.XSSEncode(data.notify);
 			if (!StringUtils.isNullOrEmpty(msg)){
 				Utils.showMessageAlert(null, msg);
 			}
 		}, null, null, null, msage);
 	},
 	//connv
 	editPosition: function(){
 		$('#divOverlay_New').show();
//		UnitTreeCatalog.expandToNode(staffId,UnitTreeCatalog.STAFF);
		var params = new Object();
		params.shopId = $('#shopId').val().trim();
		Utils.getHtmlDataByAjax(params, '/catalog/unit-tree/edit-position',function(data) {
	 		$("#treeUnit").hide();
			$("#unitTreeContent").html(data).show();
			UnitTreeCatalog.resize();
			UnitTreeCatalog._typeScreen = -3;
			UnitTreeCatalog.insertStaffSucess = false;
		}, null, 'POST');
		return false;
//		$('#divOverlay').show();
//		$.ajax({
//			type : 'GET',
//			url : '/catalog/unit-tree/edit-position',			
//			dataType : "html",
//			success : function(data) {
//				$("#unitTreeContent").html(data).show();
//				UnitTreeCatalog.resize();
//				UnitTreeCatalog._typeScreen = -3;
//				UnitTreeCatalog.insertStaffSucess = false;
//				$('#divOverlay').hide();
//			},
//			error:function(XMLHttpRequest, textStatus, errorThrown) {
//				$('#divOverlay').hide();
//			}
//		});
//		return false;
	}


};
var StaffTypeCode = {
	ADMIN: "ADMIN",
	GIAM_SAT: "GIAM_SAT",
	NHAN_VIEN: "NHAN_VIEN"
};

/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.unit-tree-catalog.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.product-rival-catalog.js
 */
var ProductRivalCatalog = {
	_xhrSave:null,
	_xhrDel:null,
	getGridUrl: function(productCode,type){
		return WEB_CONTEXT_PATH + "/catalog/product-rival/search?productCode=" + encodeChar(productCode) + "&type=" + type;
	},
	search: function(){
		$('#errMsg').html('').hide();
		var productCode = $('#productCode').val().trim();
		var type = $('#type').val();
		var url = ProductRivalCatalog.getGridUrl(productCode,type);
		$("#grid").datagrid({url:url,pageNumber:1});
		return false;
	},
	editRow:function(target){
		var indexRow = ProductRivalCatalog.getRowIndex(target);
	    $('#grid').datagrid('beginEdit', indexRow);
	},
	updateActions:function(index){
	    $('#grid').datagrid('updateRow',{
	        index: index,
	        row:{}
	    });
	},
	getRowIndex:function(target){
	    var tr = $(target).closest('tr.datagrid-row');
	    return parseInt(tr.attr('datagrid-row-index'));
	},
	cancelRow:function (target){
		var indexRow = ProductRivalCatalog.getRowIndex(target);
	    $('#grid').datagrid('cancelEdit', indexRow);
	},
	deleteRow: function(productId){
		$('#errMsg').html('').hide();
		var dataModel = new Object();
		dataModel.productId = productId;
		Utils.deleteSelectRowOnGrid(dataModel, ProductRivalCatalog_name, "/catalog/product-rival/remove", ProductRivalCatalog._xhrDel, null, null);
		return false;
	},
	createRow: function(){
		var msg = '';
		$('#errMsgDlg').html('').hide();
		var name = $('#productCodeDlg').val();
		var note = $('#noteDlg').val();
		msg = Utils.getMessageOfRequireCheck('productCodeDlg',msgTenSanPham);

		if(name.length > 250){
			msg = format( ProductRivalCatalog_lenghtName,250);
		}
		if(note.length > 100){
			msg = format(ProductRivalCatalog_lenghtNote,100);
		}
		if (msg.length == 0) {
			if(!/^[^<|>|?|\\|\'|\"|&|~#|$|%|@|*|||^|`]+$/.test(name)){
				msg = format(msgErr_invalid_format_name,msgTenSanPham);
			}
		}
		if(msg.length > 0){
			$('#errMsgDlg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
		dataModel.productId = $('#productId').val();
		dataModel.productCode = $('#productCodeDlg').val();
		dataModel.note = $('#noteDlg').val().trim();
		dataModel.type = $('#type').val();
		Utils.addOrSaveData(dataModel, "/catalog/product-rival/save", ProductRivalCatalog._xhrSave, 'errMsgDlg',function(data){
			ProductRivalCatalog.search();
			$('#productDialog').dialog('close');

		});
		return false;
	},
	updateRow: function(target){
		var indexRow = ProductRivalCatalog.getRowIndex(target);
	    ProductRivalCatalog.indexedit = indexRow;
	    var rows = $('#grid').datagrid('getRows');
	    var row =  rows[indexRow];
		var msg = '';
		$('#errMsg').html('').hide();

		var productName = $('td[field=apParamName] .datagrid-editable-input').val();
		if(productName == ""){
			msg = format(ProductRivalCatalog_requiredField,msgTenSanPham);
			$('#errMsg').html(msg).show();
			$('td[field=apParamName] .datagrid-editable-input').focus();
			return false;
		}
		if(productName.length > 250 ){
			msg = format(ProductRivalCatalog_lenghtName,250);
			$('#errMsg').html(msg).show();
			$('td[field=apParamName] .datagrid-editable-input').focus();
			return false;
		}
		var productNote = $('td[field=description] .datagrid-editable-input').val();
		if(productNote.length > 100 ){
			msg = format(ProductRivalCatalog_lenghtNote,100);
			$('#errMsg').html(msg).show();
			$('td[field=description] .datagrid-editable-input').focus();
			return false;
		}
		$('#productCodeHidden').val(productName);

		var msgProductName = Utils.getMessageOfSpecialCharactersValidate('productCodeHidden',msgTenSanPham,Utils._NAME) ;
		if(msgProductName.length > 0){
			$('#errMsg').html(msgProductName).show();
			$('td[field=apParamName] .datagrid-editable-input').focus();
			return false;
		}
		$('#noteHidden').val(productNote);
		var msgProductNote = Utils.getMessageOfSpecialCharactersValidate('noteHidden',msgGhiChu,Utils._NAME) ;
		if(msgProductNote.length > 0)
		{
			$('#errMsg').html(msgProductNote).show();
			$('td[field=description] .datagrid-editable-input').focus();
			return false;
		}

		$('#productId').val($('#grid').datagrid('getRows')[this.indexedit].id);

		var dataModel = new Object();
		dataModel.productId = $('#productId').val();
		dataModel.productCode = $('#productCodeHidden').val();
		dataModel.note = $('#noteHidden').val().trim();
		dataModel.indexRow = indexRow;
		Utils.addOrSaveData(dataModel, "/catalog/product-rival/save", ProductRivalCatalog._xhrSave, null,function(data){
			ProductRivalCatalog.search();
		});
		return false;
	},
	showDialogProduct:function(){
		$('#errMsgDlg').html('').hide();
		$('#productId').val(0);
		$('#productCodeDlg').val('');
		$('#noteDlg').val('');
		$('#divDialog').css('visibility','visible');
		$('#productDialog').dialog({
		    title: ProductRivalCatalog_infosRival
		});
		$('#productDialog').dialog('open');
		$('#productCodeDlg').focus();
	}
};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.product-rival-catalog.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/images/jquery.images.js
 */

var Images = {//LocHp
	maxPopup:10,
	_isNVQL : false,
	lstCTTB : null,
	lstCTTB_temp : null,
	pagePopup:null,
	lstImages:null,
	indexCurrent:null,//id big image
	isEndImages:0,
	callBack:null,
	customerId:null,
	filterSearchAlbum: null,
	filterAlbum: null,
	filterImageOfAlbum: null,
	displayProgrameId:null,
	displayProgrameCode:null,
	isGroup: null,
	shop_type : null,
	_xhsave: null,
	_cusLat : null,
	_cusLng : null,
	step : 0,
	checkScrollImageOfAlbum: null,
	scrollGetImageForPopup:null,
	checkDeleteImage: null,
	isFirstLoad:true,
	langImageOfAlbumDetail:null,
	_albumType: null,
	_objectId: null,
	_albumTitle: null,
	_loadAlbumPage: null,
	_isEndOfAlbum: null,
	_allowLoadAlbumList: null,
	_allowCallAjax: null,
	_objectIdSelected: null,

	btnSearchClick:function(){
		var errMsg = "";
		var curFocus = '';
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		$('#imageContent').html('').show();
		if(errMsg.length == 0){
			errMsg = Utils.getMessageOfRequireCheck('fromDate',DMSI18N.jsp_upload_image_from_date);
			curFocus = 'fromDate';
		}
		if(errMsg.length == 0){
			errMsg = Utils.getMessageOfRequireCheck('toDate',DMSI18N.jsp_upload_image_to_date);
			curFocus = 'toDate';
		}
		var fromDate = $('#fromDate').val();
		if(errMsg.length == 0){
			errMsg = Utils.getMessageOfInvalidFormatDateEx('fromDate', DMSI18N.jsp_upload_image_from_date);
			curFocus = 'fromDate';
		}
		var toDate = $('#toDate').val();
		if (errMsg.length == 0){
			errMsg = Utils.getMessageOfInvalidFormatDateEx('toDate', DMSI18N.jsp_upload_image_to_date);
			curFocus = 'toDate';
		}
		if(!Utils.compareDate(fromDate, toDate) && errMsg.length==0){
			errMsg = msgErr_fromdate_greater_todate;
			curFocus = 'fromDate';
		}
		var currentTime = new Date(sysDateFromDB);
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var startDate = $('#fromDate').val().trim();
		var endDate = $('#toDate').val().trim();
		if(errMsg.length == 0){
			if(startDate != '' && endDate != ''){
				if(!Utils.compareDate(startDate, endDate)){
					errMsg = msgCommonErr7;
					$('#fromDate').focus();
				}
			}
		}
		if(errMsg.length == 0){
			if(endDate != ''){
				if(!Utils.compareDate(endDate,day + '/' + month + '/' + year)){
					errMsg = msgCommonErr8;
					$('#toDate').focus();
				}
			}
		}
		if(errMsg.length==0 && toDate!='' && fromDate!=''){
			var arrFromDate = fromDate.split('/');
			var arrToDate = toDate.split('/');
			var countMonthF=(parseInt(arrFromDate[2])*12)+parseInt(arrFromDate[1]);
			var countMonthT=(parseInt(arrToDate[2])*12)+parseInt(arrToDate[1]);
			if(countMonthT-countMonthF>3){
				errMsg =DMSI18N.jsp_upload_image_please_select_image_from_4_month;
				curFocus = 'fromDate';
			}
		}
		if(errMsg.length == 0){
			errMsg = Utils.getMessageOfSpecialCharactersValidate('customerCode',DMSI18N.jsp_upload_image_customer_code,Utils._CODE);
			curFocus = 'customerCode';
		}
		if(errMsg.length == 0){
			errMsg = Utils.getMessageOfSpecialCharactersValidate('customerAddress',DMSI18N.jsp_upload_image_name_or_address_2,Utils._NAME);
			curFocus = 'customerAddress';
		}
		if(errMsg.length > 0){
			$('#errMsg').html(errMsg).show();
//			Utils.showMessage(errMsg);//LamNH
			$('#'+ curFocus).focus();
			$('#imageContent').html('').show();
			return false;
		}
		Images.setParamRequest();
		$('.TabSection').show();
		if ($('#currentTab').val() != undefined && $('#currentTab').val()  != null && $('#currentTab').val().length == 1){
			$('#tab' + $('#currentTab').val().trim()).click();
		}else{
			$('#tab1').click();
		}
	},
	search:function(){
		Images.displayProgrameId=null;
		Images.setParamRequest();
		var dataModel = Images.getParamRequest();
		var url='/images/searchEx';
		if($('#tab4').hasClass('Active')){
			url='/images/search';
		}
		Utils.getHtmlDataByAjax(dataModel,url,function(html){
			$('#imageContent').html(html).show(); // show Album
			if($('#errMsgDate').val().trim().length >0) {
				$('#errMsg').html($('#errMsgDate').val()).show();
//				Utils.showMessage($('#errMsgDate').val());//LamNH
				$('#fromDate').focus();
			}
			$("#title").html(DMSI18N.jsp_upload_image_search_image).show();
		},null,null);
	},
	checkFromdateAndTodate: function(){
		var fDate = $('#fromDate').val().trim();
		var tDate = $('#toDate').val().trim();
		var msg = '';
		if(msg.length ==0){
			msg = Utils.getMessageOfRequireCheck('fromDate', jspfromDate);
		}
		if(msg.length ==0){
			msg = Utils.getMessageOfInvalidFormatDate('fromDate', jspfromDate);
		}
		var curDate = ReportsUtils.getCurrentDateString();
		if (msg.length == 0 && Utils.compareDate(fDate,curDate)==false) {
			msg = msgCommonErr5;
			$('#fromDate').focus();
		}
		if(msg.length ==0){
			msg = Utils.getMessageOfRequireCheck('toDate', jsptoDate);
		}
		if(msg.length ==0){
			msg = Utils.getMessageOfInvalidFormatDate('toDate', jsptoDate);
		}
		if (msg.length == 0 && Utils.compareDate(tDate,curDate)==false) {
			msg = msgCommonErr6;
			$('#toDate').focus();
		}
		if (msg.length == 0 && Utils.compareDate(fDate,tDate)==false) {
			msg = msgCommonErr3;
			$('#toDate').focus();
		}
		if (msg.length > 0) {
			$('#errMsg').html(msg).show();
//			Utils.showMessage(msg);//LamNH
			Images._allowCallAjax = false;
			return false;
		}else{
			Images._allowCallAjax = true;
			$('#errMsg').html('').hide();
//			Utils.hideMessage();//LamNH
			return false;
		}
	},
	setParamRequest:function(){
		Images.filterSearchAlbum = new Object();
		Images.filterAlbum = new Object();
		var multiShop = $("#shop").data("kendoMultiSelect");
		var lstShop = new Array();
		lstShop.push($('#shopIdLogin').val());
		Images.filterSearchAlbum.lstShop =lstShop;

		var staffGroups = $('#staffGroup').data("kendoMultiSelect").dataItems();
		if (staffGroups != null && staffGroups.length > 0) {
			var lstStaffGroup = new Array();
			for (var i = 0; i < staffGroups.length; i++) {
				lstStaffGroup.push(staffGroups[i].id);
			}
			Images.filterSearchAlbum.lstStaffGroup = lstStaffGroup;
		}

		var multiStaff = $("#staff").data("kendoMultiSelect");
		var dataStaff = multiStaff.dataItems();

		if(Images._isNVQL == true || Images._isNVQL == 'true'){
			if(dataStaff!=null && dataStaff.length>0){
				var lstStaff = new Array();
				for(var i=0;i<dataStaff.length;i++){
					lstStaff.push(dataStaff[i].id);
				}
				Images.filterSearchAlbum.lstStaffSearch = lstStaff;
			}
		}else{
			if(dataStaff!=null && dataStaff.length>0){
				var lstStaff = new Array();
				for(var i=0;i<dataStaff.length;i++){
					lstStaff.push(dataStaff[i].staffId);
				}
				Images.filterSearchAlbum.lstStaffSearch =lstStaff;
			}
		}

		Images.filterSearchAlbum.tuyen = $('#tuyen').val() ;
		Images.filterSearchAlbum.fromDate = $('#fromDate').val().trim();
		Images.filterSearchAlbum.toDate = $('#toDate').val().trim();
		Images.filterSearchAlbum.customerCode = $('#customerCode').val().trim();
		Images.filterSearchAlbum.customerNameOrAddress = $('#customerAddress').val().trim() ;
		var lstCt = '';
		if($('#customerType .ms-select-all.selected').length > 0){
			lstCt = '-1,';
		}
		
		var tmpLt = $('#listCustomerTypeId').val();
		if(!Utils.isEmpty(tmpLt)){
			for(var i=0; i<tmpLt.length; i++){
				lstCt += tmpLt[i];
				if(i<tmpLt.length -1){
					lstCt += ",";
				}
			}
		}
		Images.filterSearchAlbum.listCustomerTypeId = lstCt;

		var array = new Array();
		var data = $('#album').data("kendoMultiSelect").dataItems();
		if(data != null && data != undefined){
    		for(var i=0;i<data.length;i++){
        		array.push(data[i].id);
        	}
    	}
		Images.filterSearchAlbum.lstMediaAlbumId=array.toString();
		Images.lstCTTB = new Array();
		$('#ddcl-cttb-ddw input[type=checkbox]').each(function(){
		    if($(this).is(':checked')){
		        var valueTmp = Number($(this).val());
		        Images.lstCTTB.push(valueTmp);
		    }
		});
		if(Images.lstCTTB==null || Images.lstCTTB.length==0){
			Images.lstCTTB = new Array();
			Images.lstCTTB.push(-1);
		}
		Images.filterSearchAlbum.lstCTTB = Images.lstCTTB;
	},
	getParamRequest:function(){
		var params=new Object();
		if(Images.filterSearchAlbum!=null){
			if(Images.filterSearchAlbum.lstShop!=undefined && Images.filterSearchAlbum.lstShop!=null)
				params.lstShop = Images.filterSearchAlbum.lstShop;
			if(Images.filterSearchAlbum.lstStaffGroup != undefined && Images.filterSearchAlbum.lstStaffGroup != null)
				params.lstStaffGroup = Images.filterSearchAlbum.lstStaffGroup;
			if(Images.filterSearchAlbum.lstStaffSearch!=undefined && Images.filterSearchAlbum.lstStaffSearch!=null)
				params.lstStaffSearch  = Images.filterSearchAlbum.lstStaffSearch ;
			if(Images.filterSearchAlbum.tuyen!=undefined && Images.filterSearchAlbum.tuyen!=null)
				params.tuyen = Images.filterSearchAlbum.tuyen ;
			if(Images.filterSearchAlbum.fromDate!=undefined && Images.filterSearchAlbum.fromDate!=null)
				params.fromDate = Images.filterSearchAlbum.fromDate ;
			if(Images.filterSearchAlbum.toDate!=undefined && Images.filterSearchAlbum.toDate!=null)
				params.toDate = Images.filterSearchAlbum.toDate ;
			if(Images.filterSearchAlbum.customerCode!=undefined && Images.filterSearchAlbum.customerCode!=null)
				params.customerCode = Images.filterSearchAlbum.customerCode;
			if(Images.filterSearchAlbum.customerNameOrAddress!=undefined && Images.filterSearchAlbum.customerNameOrAddress!=null)
				params.customerNameOrAddress = Images.filterSearchAlbum.customerNameOrAddress ;
			if(	Images.filterSearchAlbum.lstMediaAlbumId!=undefined && 	Images.filterSearchAlbum.lstMediaAlbumId!=null)
				params.lstMediaAlbumId=Images.filterSearchAlbum.lstMediaAlbumId;
			if(	Images.filterSearchAlbum.listCustomerTypeId!=undefined && 	Images.filterSearchAlbum.listCustomerTypeId!=null)
				params.listCustomerTypeId=Images.filterSearchAlbum.listCustomerTypeId;

		}
		return params;
	},
	cbLastSeqChange:function(){
	},
	showAlbum :function(displayProgrameId) {
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		var params = Images.getParamRequest();
		params.max = Images.maxPopup;
		params.displayProgrameId = displayProgrameId;
		Utils.getHtmlDataByAjax(params, '/images/showAlbum',function(data) {
			$("#title").html(DMSI18N.jsp_upload_image_image_of_program).show();
			Images.filterAlbum = new Object();
			Images.filterAlbum.page = 0;
			Images.filterAlbum.isEndAlbum = false;

			Images.filterImageOfAlbum = new Object();
			Images.filterImageOfAlbum.page = 0;
			Images.filterImageOfAlbum.isEndImgOfAlbum = false;
			Images.isGroup = false;
			Images.displayProgrameId = displayProgrameId;
			$("#imageContent").html(data).show();
			Images.displayProgrameCode = $('#displayProgrameCodeHid').val();
			Images.showAlbumSelect(false);
		}, null, 'POST');
		return false;
	},
	exportAlbum :function() {
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		var params = Images.getParamRequest();
		params.objectId  =Images._objectId;
		params.albumType = Images._albumType;
		var msg= DMSI18N.jsp_upload_image_do_you_want_download_albumn_of_program + Images._albumTitle;
		$.messager.confirm(DMSI18N.jsp_upload_image_confirm, msg, function(r){
			if (r){
				$('#errMsg').html('').hide();
//				Utils.hideMessage();//LamNH
				$('#divOverlay_New').show();
				params.token = Utils.getToken();
				var kData = $.param(params, true);
				$.ajax({
					type : 'GET',
					url : '/images/exportAlbum',
					data :(kData),
					dataType : "json",
					success : function(data) {
						$('#divOverlay_New').hide();
						if(data.error && data.errMsg!= undefined){
							$('#errMsg').html(DMSI18N.jsp_upload_image_download_albumn_fail_err + ': ' + escapeSpecialChar(data.errMsg)).show();
//							Utils.showMessage(DMSI18N.jsp_upload_image_download_albumn_fail_err + ': ' + escapeSpecialChar(data.errMsg));//LamNH
						} else{
							if(data.hasData) {
								window.open(data.view, '_blank');
								setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
				                    CommonSearch.deleteFileExcelExport(data.view);
								}, 50000000);
							} else{
								$('#errMsg').html(DMSI18N.jsp_upload_image_no_data_to_download).show();
//								Utils.showMessage(DMSI18N.jsp_upload_image_no_data_to_download);//LamNH
							}
						}
					},
					error:function(XMLHttpRequest, textStatus, errorThrown) {
						$('#divOverlay_New').hide();
						$.ajax({
							type : "POST",
							url : WEB_CONTEXT_PATH + '/check-session',
							dataType : "json",
							success : function(data, textStatus, jqXHR) {
								var linkReload = window.location.href;
								if(linkReload.indexOf('?')>0){
									if(linkReload.indexOf('newToken') < 0){
										window.location.href = window.location.href + '&newToken=1';
									} else {
										window.location.reload(true);
									}
								} else {
									window.location.href = window.location.href + '?newToken=1';
								}
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								window.location.href = WEB_CONTEXT_PATH + '/home' ;
							}
						});
					}
				});
			}
		});
		return false;
	},
	resize : function(){
		heightContent = window.innerHeight - $('#header').height() - $('.BreadcrumbSection').height() - $('#footer').height();
		if($('.ContentSection').height() > heightContent ) {
			heightContent = $('.ContentSection').height();
		}
		$('.SidebarInSection').css({height:heightContent + 'px'});
		if($('.PhotoGroupSection').length) {
			$('.PhotoGroupSection').css({height:heightContent + 'px'});
		}
	},
	hideAllTab: function(){
		$('#tab1').removeClass('Active');
		$('#tab2').removeClass('Active');
		$('#tab3').removeClass('Active');
		$('#tab4').removeClass('Active');
	},
	showTab1:function(){
		Images.hideAllTab();
		$('#tab1').addClass('Active');
		$('#currentTab').val(1);
		$('#cttb').dropdownchecklist("disable");
		Images.showAlbumDetail();
	},
	showTab2:function(){
		Images.hideAllTab();
		$('#tab2').addClass('Active');
		$('#currentTab').val(2);
		$('#cttb').dropdownchecklist("disable");
		Images.showAlbumDetail();
	},
	showTab3:function(){
		Images.hideAllTab();
		$('#tab3').addClass('Active');
		$('#currentTab').val(3);
		$('#cttb').dropdownchecklist("disable");
		Images.showAlbumDetail();
	},
	showTab4:function(){
		Images.hideAllTab();
		$('#tab4').addClass('Active');
		$('#currentTab').val(4);
		$('#cttb').dropdownchecklist("enable");
		Images.search();
	},
	showAlbumDetail :function(displayProgrameId) {
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		Images.setParamRequest();
		if(displayProgrameId!=undefined && displayProgrameId!=null)
			Images.displayProgrameId = displayProgrameId;
		Images.filterImageOfAlbum = new Object();
		Images.filterImageOfAlbum.page=0;
		Images.filterImageOfAlbum.isEndImgOfAlbum = false;
		var params = Images.getParamRequest();
		params.page=0;
		params.max = Images.maxPopup;
		var url = '/images/searchEx';
		Utils.getHtmlDataByAjax(params,url ,function(data) {
			Images.isGroup = false;
			$("#imageContent").html(data).show();
			if($('#tab1').hasClass('Active')) {
				$('#titleAlbum').append(DMSI18N.jsp_upload_image_list_image_of_sale_unit);
			}else if($('#tab2').hasClass('Active')){
				$('#titleAlbum').append(DMSI18N.jsp_upload_image_list_image_of_closed_unit);
			}else if($('#tab3').hasClass('Active')){
				$('#titleAlbum').append(DMSI18N.jsp_upload_image_list_image_of_general_display);
			}else{
				$('#titleAlbum').html(DMSI18N.jsp_upload_image_list_image_display_of_program+$('#titleAlbum').html()+ '(' + $('#countCustomerHavePhoto').val() + '<s:text name="so.khach.hang.co.chup.anh"/>' + ')');
			}
			Images.displayProgrameCode = $('#displayProgrameCodeHid').val();
			Images.resize();
		}, null, 'POST');
		return false;
	},
	addListAlbumSelect :function(){
		Images.checkFromdateAndTodate();
		if (Images._allowCallAjax != null && !Images._allowCallAjax){
			return;
		}
		var params = Images.getParamRequest();
		if (Images.filterAlbum.page == undefined || Images.filterAlbum.page == null || Images.filterAlbum.page < 0){
			Images.filterAlbum.page = 0;
		}
		Images.filterAlbum.page= Images.filterAlbum.page + 1;
		params.typeGroup = $('#typeGroup').val();
		params.page = Images.filterAlbum.page;
		params.max = Images.maxPopup;
		params.objectId = Images._objectId;
		params.albumType = Images._albumType;

		Utils.getJSONDataByAjax(params, '/images/addListAlbumSelect',function(data) {

			Images.fillAlbum(data.lstAlbum);
			Images.lazyLoadImages(".ImageAlbum", "#content");
			Images.filterAlbum.checkScrollAlbum == 1;
		}, null,'POST');
		return false;
	},
	showAlbumSelect :function(objectId, albumType) {
		Images.checkFromdateAndTodate();
		if (Images._allowCallAjax != null && !Images._allowCallAjax){
			return;
		}
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		Images._allowLoadAlbumList = false;
		Images.setParamRequest();
		Images.filterImageOfAlbum = new Object();
		Images.filterImageOfAlbum.isEndImgOfAlbum = false;
		Images.filterImageOfAlbum.page=0;
		var params = Images.getParamRequest();
		if(albumType!=undefined && albumType!=null) {
			params.albumType = albumType;
		}
		if(objectId!=undefined && objectId!=null) {
			params.objectId = objectId;
			Images._objectIdSelected = objectId;
		}
		params.page = 0;
		params.max = Images.maxPopup;
		Images.filterAlbum = new Object();
		Images.filterAlbum.page = 0;
		Images.filterAlbum.isEndAlbum = false;
		Images._albumType = albumType;
		Images._objectId = objectId;
		Utils.getHtmlDataByAjax(params, '/images/showAlbumSelect',function(data) {
			$("#imageContent").html(data).show();
			$(".ImageOfAlbum").lazyload({
			    event: "scrollstop"
			});
		}, null,'POST');
		return false;
	},
	hideChangeAlbumWhenDongCua: function(mediaAlbum){
		if (Images._albumType != null && Images._albumType == AlbumType.MediaAlbum){
/*			if (mediaAlbum != undefined && mediaAlbum != null && !StringUtils.isNullOrEmpty(mediaAlbum.mediaAlbumCode) &&
					mediaAlbum.mediaAlbumCode == MediaAlbumCode.DONG_CUA){
				if ($('#albumContent #btnChangeAlbum') != undefined && $('#albumContent #btnChangeAlbum') != null){
					$('#albumContent #btnChangeAlbum').hide();
				}
				if ($('#albumContent #btnDeleteImages') != undefined && $('#albumContent #btnDeleteImages') != null){
					$('#albumContent #btnDeleteImages').hide();
				}
			}else{*/
				if ($('#albumContent #btnChangeAlbum') != undefined && $('#albumContent #btnChangeAlbum') != null){
					$('#albumContent #btnChangeAlbum').show();
				}
				if ($('#albumContent #btnDeleteImages') != undefined && $('#albumContent #btnDeleteImages') != null){
					$('#albumContent #btnDeleteImages').show();
				}
			//}
		}else{
			if ($('#albumContent #btnDeleteImages') != undefined && $('#albumContent #btnDeleteImages') != null){
				$('#albumContent #btnChangeAlbum').hide();
			}
		}
	},
	changeGroup: function(objectId, albumType){
		Images.checkFromdateAndTodate();
		if (Images._allowCallAjax != null && !Images._allowCallAjax){
			return;
		}
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		Images._allowLoadAlbumList = false;
		var params = Images.getParamRequest();
		Images.filterImageOfAlbum = new Object();
		Images.filterImageOfAlbum.page = 0;
		Images.filterImageOfAlbum.isEndImgOfAlbum = false;
		Images._objectId = objectId;
		Images._objectIdSelected = objectId;
		Images._albumType = albumType;
		params.page = 0;
		params.max = Images.maxPopup;
		params.objectId = objectId;
		params.albumType = albumType;
		$('#albumContentDetail').html('');
		$('p.albumListClass').removeClass('selectedImage');
		$('#pAlbum'+objectId).addClass('selectedImage');
		Utils.getJSONDataByAjax(params, '/images/addAlbumSelect',function(data) {
			Images.fillImagesOfAlbum(data.lstImage,Images.isGroup,true);
			$(".ImageOfAlbum").lazyload({
			    event: "scrollstop"
			});
			Images.checkScrollImageOfAlbum = 1;
			$('.ContentSection #titleName').html(StringUtils.getSubStringFromFirst(data.albumTitle, 30));
			$('.ContentSection #titleName').attr('title', data.albumTitle);
			Images._albumTitle = data.albumTitle;
			Images.hideChangeAlbumWhenDongCua(data.mediaAlbum);
		}, null,'POST');
		return false;
	},
	addImageOfAlbumSelect: function(typeGroup,id){
		Images.checkFromdateAndTodate();
		if (Images._allowCallAjax != null && !Images._allowCallAjax){
			return;
		}
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		Images.setParamRequest();
		var params = Images.getParamRequest();
		if(typeGroup!=undefined && typeGroup!=null) params.typeGroup = typeGroup;
		if(id!=undefined && id!=null) params.id=id;
		Images.filterImageOfAlbum.page ++;
		params.page = Images.filterImageOfAlbum.page ;
		params.max = Images.maxPopup;
		params.objectId = Images._objectId;
		params.albumType = Images._albumType;

		Utils.getJSONDataByAjax(params, '/images/addAlbumSelect',function(data) {
			Images.fillImagesOfAlbum(data.lstImage,Images.isGroup,true);
			$(".ImageOfAlbum").lazyload({
			    event: "scrollstop"
			});
			Images.checkScrollImageOfAlbum = 1;
		}, null,'POST');
		return false;
	},
	loadImageOfAlbumAfterDelete:function(){
		$('#errMsg').html('').hide();
//		Utils.hideMessage();//LamNH
		var params = Images.getParamRequest();
		params.isGroup = Images.isGroup;
		params.page = 0;
		if(Images.filterImageOfAlbum.page > 0){
			params.max = Images.maxPopup * (Images.filterImageOfAlbum.page+1);
		} else {
			params.max = Images.maxPopup;
		}
		Utils.getJSONDataByAjaxNotOverlay(params, '/images/showAlbumSelect',function(data) {
			Images.fillImagesOfAlbum(data.lstImage,Images.isGroup,false);
			Images.filterImageOfAlbum.page--;
			$(".ImageOfAlbum").lazyload({
			    event: "scrollstop"
			});
		}, null,'POST');
		return false;
	},
	fillAlbum: function(lstAlbum){
		var listImage = '';
		if(lstAlbum!=undefined && lstAlbum!=null && lstAlbum.length>0){
			for (var i = 0; i < lstAlbum.length; i++) {
				var r = lstAlbum[i];
				var currentMil = new Date(sysDateFromDB).getTime();
				listImage += '<li style="padding-bottom: 25px !important;">';


				//anhhpt
				if(!isNullOrEmpty(r.pictureQuantity)){
					listImage += '<a href="javascript:void(0)" class="PhotoThumbGroup" onclick="Images.changeGroup(\''+r.objectId+'\',\''+Utils.XSSEncode(r.albumType)+'\')">';
				}else{
					listImage += '<a href="javascript:void(0)" class="PhotoThumbGroup" onclick="">';

				}

				listImage += '        <span class="BoxFrame customWidth100">';
				listImage += '        	<span class="BoxMiddle">';
				if(!isNullOrEmpty(r.pictureQuantity)){
					listImage += '        	<img id="imagesOfAlbum_'+r.objectId+'" width="142" height="102" class="customStyleImage ImageAlbum ImageFrame2"  src="/dmslite_v2/resources/images/grey.jpg?s=1" data-original="'+imgDisplayPath+r.thumbUrl+'?v='+currentMil+'">';
				}else{
					listImage += '        	<img id="imagesOfAlbum_'+r.objectId+'" width="142" height="102" class="customStyleImage ImageAlbum ImageFrame2"  src="' + WEB_CONTEXT_PATH + '/resources/images/grey.jpg?s=1" data-original="' + WEB_CONTEXT_PATH + '/resources/images/grey.jpg?s=1">';
				}
				listImage += '       	</span>';
				listImage += '        </span>';
				listImage += '</a>';

				listImage += '<p id="pAlbum'+r.objectId+'" class="albumListClass"><a class="customTitleImage2" href="javascript:void(0)" onclick="">';


				if (r.albumType != 1){
					listImage += Utils.XSSEncode(r.objectCode)+' - ';
				}

				if(!isNullOrEmpty(r.pictureQuantity)){
					listImage += Utils.XSSEncode(r.objectName)+'</a>'+
					'<span class="customSpanImage">'+r.pictureQuantity+
					' <img style="padding-bottom: 3px" class = "refreshIcon" src="' + WEB_CONTEXT_PATH + '/resources/images/picture_black.svg" height = "15"/>'+
					
					'</span>'+
					'</p>';
				}else{
					listImage += Utils.XSSEncode(r.objectName)+'</a>'+
					'<span class="customSpanImage">0'+
					' <img style="padding-bottom: 3px" class = "refreshIcon" src="' + WEB_CONTEXT_PATH + '/resources/images/picture_black.svg" height = "15"/>'+
					'</span>'+
					'</p>';
				}

				listImage += '</li>';
			}
		} else {
			Images.filterAlbum.isEndAlbum = true;
		}
		$('#lstAlbumContent').append(listImage);
		Images.resize();
	},
	fillImagesOfAlbum: function(lstImage,isGroup,isAddImage){
		var listImage = '';
		if(lstImage!=undefined && lstImage!=null && lstImage.length>0){
			for (var i = 0; i < lstImage.length; i++) {
				listImage += '<li class="input-group paddingLiImage .marginUlImage">';
/*				if (lstImage[i].isAlbumDongCua != null && lstImage[i].isAlbumDongCua == 1){

				}else{*/
					listImage += '<span style="z-index: 99;float: left;position: absolute;">';
					listImage += '	<input id="'+lstImage[i].id+'" class="checkboxOfImage" type="checkbox" style="float: left;position: absolute;margin: 0px;">';
					listImage += '</span>';
				//}
				var currentMil = new Date(sysDateFromDB).getTime();
				listImage += '<a '+' title=\'' +Utils.XSSEncode(lstImage[i].objectCode)+' - '+Utils.XSSEncode(lstImage[i].objectName) +'\''
							+' href="javascript:void(0)" class="PhotoThumbGroup1" onclick="Images.showDialogFancy('
							+lstImage[i].id+','+lstImage[i].objectId+ ','+ lstImage[i].albumType+')">';
				listImage += '<span class="BoxFrame"><span class="BoxMiddle">';
				listImage += '<img  class="ImageOfAlbum ImageFrame3 customWidth100" src="/dmslite_v2/resources/images/grey.jpg?s=1" data-original="'
					+(imgDisplayPath+lstImage[i].thumbUrl+'?v='+currentMil)+'" width="201" height="144" />';
				listImage += '</span></span></a>';
				listImage += '<p class="customTextStyleImage noBorderMarginBottom"'+' title=\'' +Utils.XSSEncode(lstImage[i].objectCode)+' - '+Utils.XSSEncode(lstImage[i].objectName) +'\''
					+' style="font-size: 13px;"><a onclick="Images.showDialogFancy('+lstImage[i].id+','+lstImage[i].objectId+ ','+ lstImage[i].albumType
					+')" href="javascript:void(0)">'+StringUtils.getSubStringFromFirst(Utils.XSSEncode(lstImage[i].objectCode), 10)+' - '
					+StringUtils.getSubStringFromFirst(Utils.XSSEncode(lstImage[i].objectName), 18)+'</a></p>';
				listImage += '<p style="font-size: 13px;">'+lstImage[i].createDateStr+'</p>';
				listImage += '</li>';
			}
		} else {
			Images.filterImageOfAlbum.isEndImgOfAlbum = true;
		}
		if(isAddImage) {
			$('#albumContentDetail').append(listImage);
		} else {
			$('#albumContentDetail').html(listImage);
		}
		Images.resize();
	},

	onOffMap:function(i){
		if(i==0){
			$('.OffFucnStyle').hide();
			$('.OffFucnStyle').css('display','none');
			$('.OnFucnStyle').show();
			$('.OnFucnStyle').css('display','block');
			$('.fancybox-inner #divMapSection').removeClass('SmallMapSection');
			$('.fancybox-inner #divMapSection').addClass('LargeMapSection');
			$('.fancybox-inner #bigMap').css('width','488px');
			$('.fancybox-inner #bigMap').css('height','409px');
		}else{
			$('.OnFucnStyle').hide();
			$('.OnFucnStyle').css('display','none');
			$('.OffFucnStyle').show();
			$('.OffFucnStyle').css('display','block');
			$('.fancybox-inner #divMapSection').removeClass('LargeMapSection');
			$('.fancybox-inner #divMapSection').addClass('SmallMapSection');
			$('.fancybox-inner #bigMap').css('width','140px');
			$('.fancybox-inner #bigMap').css('height','120px');
		}
		//ViettelMap.clearOverlays();
		Images.openMapOnImage();
		ViettelMap.clearOverlays();

		if( ViettelMap.isValidLatLng(Images._cusLat, Images._cusLat) ){
			VTMapUtil.loadMapResource(function(){
				var id=Images.indexCurrent;
				var temp = Images.lstImages.get(id);

				var map = ViettelMap._map;
				var maptype = $('#mapType').val();
				var pt = null;
				if (maptype == 1){
					ViettelMap.addMarkerImages(null, null, temp.lat, temp.lng);
					pt = new google.maps.LatLng(Images._cusLat, Images._cusLng);
					marker = new google.maps.Marker({
						position : pt,
						icon:{
							url : WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png',
							size : {height : 20, width : 20},
							scaledSize : {height : 20, width : 20}
						},
						map : ViettelMap._map,
						labelClass : "MarkerLabel",
						labelContent : temp.customerCode,
						labelVisible : true,
						draggable : false,
						labelAnchor : new google.maps.Point(25, 0)
					});
				}else{
					ViettelMap.addMarkerImages(null, null, temp.lat, temp.lng);
					pt = new viettel.LatLng(Images._cusLat, Images._cusLng);
					marker = new viettel.LabelMarker({
													icon:{
														url :  WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png',
															size : {height : 20, width : 20},
															scaledSize : {height : 20, width : 20}
													},
													position : pt,
													map : map,
													labelClass : "MarkerLabel",
													labelContent : temp.customerCode,
													labelVisible : true,
													draggable : false,
													labelAnchor : new viettel.Point(25, 0)
												});
				}
				map.setCenter(pt);
				var lat1 = Number(Images._cusLat);
				var lon1 = Number(Images._cusLng);
				var lat2 = Number(temp.lat);
				var lon2 = Number(temp.lng);
				var R = 6371;
				  var a =
				     0.5 - Math.cos((lat2 - lat1) * Math.PI / 180)/2 +
				     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
				     (1 - Math.cos((lon2 - lon1) * Math.PI / 180))/2;
			    R * 2 * Math.asin(Math.sqrt(a));
				$('#khoangCach').html(( Math.round((R * 2 * Math.asin(Math.sqrt(a)))*1000)) + "(m)");
				$('#khoangCachBig').html(( Math.round((R * 2 * Math.asin(Math.sqrt(a)))*1000)) + "(m)");

			});

		}else{
			var id=Images.indexCurrent;
			var temp = Images.lstImages.get(id);
			ViettelMap.addMarkerImages(null, null, temp.lat, temp.lng);
			$('#khoangCach').html("");
			$('#khoangCachBig').html("");
		}

	},
	imageBigShow : function() {
		$('.fancybox-inner #loadingImages').hide();
		$('.fancybox-inner #bigImages').fadeIn(1000);
	},
	imageLoadingShow : function() {
		$('.fancybox-inner #bigImages').hide();
		$('.fancybox-inner #loadingImages').show();
	},
	lazyLoadImages:function(object,container){
		$(object).lazyload({
//			effect : "fadeIn",
			event: "scrollstop",
			container : $(container),
			effect: "fadeIn",
	        failurelimit: 1,
	        threshold: -20
		});
		$(object).each(function() {
		    $(this).attr("src", $(this).attr("data-original"));
		    $(this).removeAttr("data-original");
		});
	},
	getImagesForPopup:function(callBack,countPage){//countPage: load hình ảnh từ trang 0->countPage

		var data=Images.getParamRequest();
		data.objectId = Images._objectId;
		data.albumType = Images._albumType;
		if(countPage!=undefined && countPage!=null && countPage!=0){
			data.max=Images.maxPopup*(countPage+1);
			data.page=0;
			Images.pagePopup=countPage;
		}else{
			data.max=Images.maxPopup;
			data.page=Images.pagePopup;
		}
		if(data.page==0) scrollIntoViewPopup=1;
		if(callBack!=undefined && callBack!=null){
			Images.callBack=callBack;
		}
		$('.loadingPopup').show();
		var kData = $.param(data, true);
		$.ajax({
			type : 'POST',
			url : '/images/get-images-for-popup',
			data :(kData),
			dataType : "html",
			success : function(data) {
				Images.scrollGetImageForPopup=1;
				try {
					$('.loadingPopup').hide();
					var myData = JSON.parse(data);
					if(myData.error){

					}else{
						var lstImage = myData.lstImage;
						var listNew=new Map();
						if(lstImage!=undefined && lstImage!=null && lstImage.length>0){
							Images.pagePopup++;//nếu có dữ liệu thì + trang lên 1
							for(var i=0;i<lstImage.length;i++){
								var currentMil = new Date().getTime();
								lstImage[i].urlEx=lstImage[i].urlImage;
								lstImage[i].urlImage=imgDisplayPath+lstImage[i].urlImage+'?v='+currentMil;
								lstImage[i].urlThum=imgDisplayPath+lstImage[i].urlThum+'?v='+currentMil;
								if(lstImage[i].shopCode==undefined || lstImage[i].shopCode==null) lstImage[i].shopCode='';
								if(lstImage[i].shopName==undefined || lstImage[i].shopName==null) lstImage[i].shopName='';
								if(lstImage[i].staffCode==undefined || lstImage[i].staffCode==null) lstImage[i].staffCode='';
								if(lstImage[i].staffName==undefined || lstImage[i].staffName==null) lstImage[i].staffName='';
								if(Images.lstImages.get(lstImage[i].id)==null){
									listNew.put(lstImage[i].id,lstImage[i]);
								}
								Images.lstImages.put(lstImage[i].id,lstImage[i]);
							}
						}else{//het danh sach
							if(Images.pagePopup==0){//het hinh thi đóng fancybox
								$.fancybox.close();
							}
							Images.isEndImages=1;
							if(Images.indexCurrent==null){
								Images.indexCurrent=Images.lstImages.keyArray[Images.lstImages.keyArray.length-1];
							}
							if(Images.callBack!=undefined && Images.callBack!=null){
								Images.callBack.call();
							}
						}
						Images.fillThumbnails(listNew);

					}
				} catch (err) {
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				Images.scrollGetImageForPopup=1;
			}
		});
	},
	showDialogFancy:function(mediaItemId, objectId, albumType) {
		Images.checkFromdateAndTodate();
		if (Images._allowCallAjax != null && !Images._allowCallAjax){
			return;
		}
		if($('.OffFucnStyle').is(':visible')){
			$('.OffFucnStyle').hide();
			$('.OffFucnStyle').css('display','none');
		}else{
			if($('.OnFucnStyle').is(':visible')){
				$('.OnFucnStyle').hide();
				$('.OnFucnStyle').css('display','none');
			}
		}
		var nameId='popup-images';
		var title = '';
		if(Images.displayProgrameCode!=undefined && Images.displayProgrameCode!=null && Images.displayProgrameCode!=''){
			title=Images.displayProgrameCode;
			title +=' (<span id="titlePopup"></span>)';
		}else{
			title +='<span id="titlePopup"></span>';
		}
		title += '<img class="loadingPopup" src="' + WEB_CONTEXT_PATH + '/resources/images/loading.gif" width="16" height="16" alt="'+ DMSI18N.jsp_upload_image_downloading +'" class="LoadingStyle" />';
		if(objectId!=undefined && objectId!=null) {
			title += '<span id="maximizePopup" class="Maximize"><img onclick="Images.showDialogFancyFull('+mediaItemId+', '+objectId+', ' + albumType+ ')" src="' + WEB_CONTEXT_PATH + '/resources/images/dialog/maximize_icon.svg" width="15" height="15" alt="'+DMSI18N.jsp_upload_image_zoom_in+'" style="float: right; cursor: pointer; margin-right: 35px; margin-top: 5px;" /></span>';
		} else {
			title += '<span id="maximizePopup" class="Maximize"><img onclick="Images.showDialogFancyFull('+mediaItemId+', '+ Images._objectId + ', ' + Images._albumType+ ' )" src="' + WEB_CONTEXT_PATH + '/resources/images/dialog/maximize_icon.svg" width="15" height="15" alt="'+DMSI18N.jsp_upload_image_zoom_in+'" style="float: right; cursor: pointer; margin-right: 35px; margin-top: 5px;" /></span>';
		}
		var html = $('#' + nameId).html();
		if (albumType != undefined && albumType != null && parseInt(albumType) > 0){
			Images._albumType = albumType;
		}
		if(objectId != undefined && objectId != null && parseInt(objectId) > 0)
			Images._objectId = objectId;
		if(mediaItemId!=undefined && mediaItemId!=null)
			Images.indexCurrent=mediaItemId;
		$('#' + nameId).html('');
		Images.checkDeleteImage = null;

		$.fancybox(html, {
			'title' : title,
			'closeBtn' : true,
			width : '1300px',
			height : '900px',
			helpers : {
				title : {
					type : 'inside'
				}
			},
			'afterShow' : function() {
				$('.fancybox-wrap').css('z-index', '100003');
				$('#imagePopupDivOverLay').show();
				if(mediaItemId!=undefined && mediaItemId!=null)
					Images.indexCurrent=mediaItemId;
				if($('#tab4').hasClass('Active')){
					$('.fancybox-inner #result').show();
					$('.fancybox-inner #lblResult').show();
				}else{
					$('.fancybox-inner #lblResult').hide();
					$('.fancybox-inner #result').hide();
				}
				Images.pagePopup=0;
				Images.isEndImages=0;
				Images.lstImages=new Map();
				if(Images.filterImageOfAlbum.page!=undefined && Images.filterImageOfAlbum.page!=null && Images.filterImageOfAlbum.page>0)
					Images.getImagesForPopup(null,Images.filterImageOfAlbum.page);
				else
					Images.getImagesForPopup();
				Images.scrollGetImageForPopup=1;//chặn các request giống nhau khi scroll liên tục
				$('.fancybox-inner #listImage').scroll(function(){
				   if (Images.scrollGetImageForPopup==1 && Images.isEndImages==0 && $(this).outerHeight() > ($(this).get(0).scrollHeight - $(this).scrollTop()-2)){
					   Images.scrollGetImageForPopup=0;
					   Images.getImagesForPopup();
				   }
				});
				Images.openMapOnImage();
			},
			'afterClose' : function() {
				$('#' + nameId).html(html);
				Images.indexCurrent=null;
				Images.callBack=null;
				Images.customerId=null;
				$('#imagePopupDivOverLay').hide();
			},
			'beforeClose': function () {
				if(Images.checkDeleteImage != undefined && Images.checkDeleteImage != null && Images.checkDeleteImage == true) {
					Images.loadImageOfAlbumAfterDelete();
					Images.checkDeleteImage = null;
				}
			}
		});
		return false;
	},
	showDialogFancyFull:function(mediaItemId, objectId, albumType) {
		Images.checkFromdateAndTodate();
		if (Images._allowCallAjax != null && !Images._allowCallAjax){
			return;
		}
		if($('.OffFucnStyle').is(':visible')){
			$('.OffFucnStyle').hide();
			$('.OffFucnStyle').css('display','none');
		}else{
			if($('.OnFucnStyle').is(':visible')){
				$('.OnFucnStyle').hide();
				$('.OnFucnStyle').css('display','none');
			}
		}

		var nameId='popup-images-full';
		var title = '';
		if(Images.displayProgrameCode!=undefined && Images.displayProgrameCode!=null && Images.displayProgrameCode!=''){
			title=Images.displayProgrameCode;
			title +=' (<span id="titlePopup"></span>)';
		}else{
			title +='<span id="titlePopup"></span>';
		}
		title += '<img class="loadingPopup" src="' + WEB_CONTEXT_PATH + '/resources/images/loading.gif" width="16" height="16" alt="'+DMSI18N.jsp_upload_image_downloading+'" class="LoadingStyle" />';
		if(objectId!=undefined && objectId!=null) {
			title += '<span id="minimizePopup" class="Minimize"><img src="' + WEB_CONTEXT_PATH + '/resources/images/dialog/minimize_icon.svg" onclick="Images.showDialogFancy('+mediaItemId+', '+objectId + ', '+ albumType+')" width="15" height="15" alt="'+DMSI18N.jsp_upload_image_zoom_in+'" style="float: right; cursor: pointer; margin-right: 35px; margin-top: 5px;" /></span>';
		} else {
			title += '<span id="minimizePopup" class="Minimize"><img src="' + WEB_CONTEXT_PATH + '/resources/images/dialog/minimize_icon.svg" onclick="Images.showDialogFancy('+mediaItemId+', '+ Images._objectId + ', '+ Images._albumType+')" width="15" height="15" alt="'+DMSI18N.jsp_upload_image_zoom_in+'" style="float: right; cursor: pointer; margin-right: 35px; margin-top: 5px;" /></span>';
		}
		var html = $('#' + nameId).html();
		if (albumType != undefined && albumType != null){
			Images._albumType = albumType;
		}
		if(objectId !=undefined && objectId!=null)
			Images._objectId = objectId;
		if(mediaItemId!=undefined && mediaItemId!=null)
			Images.indexCurrent=mediaItemId;
		$('#' + nameId).html('');
		Images.checkDeleteImage = null;

		$.fancybox(html, {
			'title' : title,
			'closeBtn' : true,
			width : '1300px',
			height : '900px',
			helpers : {
				title : {
					type : 'inside'
				}
			},
			'afterShow' : function() {
				$('.fancybox-wrap').css('z-index', '100003');
				$('#imagePopupDivOverLay').show();
				if(mediaItemId!=undefined && mediaItemId!=null)
					Images.indexCurrent=mediaItemId;

				if($('#tab4').hasClass('Active')){
					$('.fancybox-inner #result').show();
					$('.fancybox-inner #lblResult').show();
				}else{
					$('.fancybox-inner #lblResult').hide();
					$('.fancybox-inner #result').hide();
				}
				//Images.pagePopup++;
				Images.isEndImages=0;
				Images.lstImages=new Map();
				if(Images.filterImageOfAlbum.page!=undefined && Images.filterImageOfAlbum.page!=null && Images.filterImageOfAlbum.page>0)
					Images.getImagesForPopup(null,Images.filterImageOfAlbum.page);
				else
					Images.getImagesForPopup(null, Images.pagePopup);
				Images.scrollGetImageForPopup=1;//chặn các request giống nhau khi scroll liên tục
				$('.fancybox-inner #listImage').scroll(function(){
				   if (Images.scrollGetImageForPopup==1 && Images.isEndImages==0 && $(this).outerHeight() > ($(this).get(0).scrollHeight - $(this).scrollTop()-2)){
					   Images.scrollGetImageForPopup=0;
					   Images.getImagesForPopup();
				   }
				});
				Images.openMapOnImage();
			},
			'afterClose' : function() {
				$('#imagePopupDivOverLay').hide();
				$('#' + nameId).html(html);
				Images.indexCurrent=null;
				Images.callBack=null;
				Images.customerId=null;
			},
			'beforeClose': function () {
				if(Images.checkDeleteImage != undefined && Images.checkDeleteImage != null && Images.checkDeleteImage == true) {
					Images.loadImageOfAlbumAfterDelete();
					Images.checkDeleteImage = null;
				}
			}
		});
		return false;
	},
	fillThumbnails:function(list){
		var listImage = '';
		for (var i = 0; i < list.keyArray.length; i++) {
			var temp = list.get(list.keyArray[i]);
			if(temp!=null){
				var currentMil = new Date().getTime();
				listImage += '<li id="li'+temp.id+'">';
				listImage +='<div class="PhotoThumbnails BoxMiddle customStyleDivLi"><span class="BoxFrame customWidth100" style="height: auto;"><span class="BoxMiddle"><img style="transform: scale(0.99); width: auto; overflow: hidden; display: block;" id="img'+temp.id+'" class="imageSelect ImageFrame2 customWidth100" src="' + WEB_CONTEXT_PATH + '/resources/images/grey.jpg?s=1"';
				listImage +=' data-original="'+(temp.urlThum+'?v='+currentMil)+'" width="142" height="102" value="'+temp.id+'" /></span></span></div>';
				listImage +='<p class="customTextStyleImage2 popupImageList p'+temp.id+'">'+temp.dmyDate+' – '+temp.hhmmDate+'</p>';
				listImage += "</li>";
			}
		}
		$('.fancybox-inner #listImageUL').append(listImage);
		Images.lazyLoadImages(".fancybox-inner .imageSelect",".fancybox-inner #listImage");
		$('.imageSelect').unbind('click');
		$('.imageSelect').click(Images.imageSelect);
		if(list.keyArray.length>0){
			if((Images.indexCurrent==undefined || Images.indexCurrent==null || Images.lstImages.get(Images.indexCurrent)==null)){
				Images.indexCurrent=list.keyArray[0];
			}
			setTimeout(function(){
				Images.showBigImagePopup(Images.indexCurrent);
				$('p.popupImageList').removeClass('selectedImage');
				$('p.p'+Images.indexCurrent).addClass('selectedImage');
			},1000);
		}
	},
	focusStyleThumbPopup:function(id){
		$('.fancybox-inner .FocusStyle').removeClass('FocusStyle');
		$('.fancybox-inner #li'+id).addClass('FocusStyle');
	},
	imageSelect:function() {
		var id=$(this).attr('value');
		if($('#minimizePopup').length != 0) {//dialog nho
			var func = $('#minimizePopup img').attr('onclick');
			if(func.indexOf('Full') != -1) {
				func = 'Images.showDialogFancyFull('+id+')';
			} else {
				func = 'Images.showDialogFancy('+id+')';
			}
			$('#minimizePopup img').attr('onclick', func);
		} else {//dialog lon
			var func = $('#maximizePopup img').attr('onclick');
			if(func.indexOf('Full') != -1) {
				func = 'Images.showDialogFancyFull('+id+')';
			} else {
				func = 'Images.showDialogFancy('+id+')';
			}
			$('#maximizePopup img').attr('onclick', func);
		}
		$('p.popupImageList').removeClass('selectedImage');
		$('p.p'+id).addClass('selectedImage');
		Images.showBigImagePopup(id);
	},
	selectedAffect: function(id){
		$('p.popupImageList').removeClass('selectedImage');
		$('p.p'+id).addClass('selectedImage');
	},
	showImageNextPre:function(type){//1 là next, 0 là pre
		var flag=0;
		for(var i=0;i<Images.lstImages.keyArray.length;i++){
			if(Images.lstImages.keyArray[i]==Images.indexCurrent){
				if(type==1 && i+1<Images.lstImages.keyArray.length){//next
					scrollIntoViewPopup=1;
					Images.showBigImagePopup(Images.lstImages.keyArray[i+1]);
					Images.selectedAffect(Images.lstImages.keyArray[i+1]);
					flag=1;
				}else if(type==0 && i>0){
					scrollIntoViewPopup=1;
					Images.showBigImagePopup(Images.lstImages.keyArray[i-1]);
					Images.selectedAffect(Images.lstImages.keyArray[i-1]);
				}
				break;
			}
		}
		if(type==1 && flag==0 && Images.isEndImages==0){//nếu bấm next mà trong ds hiện tại ko có thì request lấy thêm hình
			Images.indexCurrent=null;
			scrollIntoViewPopup=1;
			Images.getImagesForPopup();
		}
	},
	isScrolledIntoView:function(elem){
	    var docViewTop = $(window).scrollTop();
	    var docViewBottom = docViewTop + $(window).height();

	    var elemTop = $(elem).offset().top;
	    var elemBottom = elemTop + $(elem).height();

	    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	},
	getTypeImage:function(url){
		var type='.jpg';
		try{
		var s=url.split('.');
		if(s.length>0) type='.'+s[s.length-1];
		}catch(e){}
		return type;
	},
	showBigImagePopup:function(id){
		try {
			var temp=Images.lstImages.get(id);
			if(temp!=null){
				$('#titlePopup').html(temp.customerCode+' - '+temp.customerName);
				if(scrollIntoViewPopup!=undefined && scrollIntoViewPopup!=null && scrollIntoViewPopup==1){
					if(!Images.isScrolledIntoView('.fancybox-inner #li'+temp.id)){
						$('.fancybox-inner #li'+temp.id)[0].scrollIntoView(false);
					}
					scrollIntoViewPopup=null;
				}
				Images.indexCurrent=temp.id;
				Images.focusStyleThumbPopup(temp.id);
				Images.imageLoadingShow();
				Images.openMapOnImage();
				$('.fancybox-inner .DownloadPhotoLink').hide();
				$('.fancybox-inner #shopImage').html(Utils.XSSEncode(temp.saleGroupCode)+' - '+Utils.XSSEncode(temp.saleGroupName));
				$('.fancybox-inner #staffImage').html(Utils.XSSEncode(temp.staffCode)+' - '+Utils.XSSEncode(temp.staffName));
				$('.fancybox-inner #timeImage').html(temp.dmyDate+' - '+temp.hhmmDate);
				$('.fancybox-inner .DownloadPhotoLink').attr('href',temp.urlImage);
				//$('.fancybox-inner .DownloadPhotoLink').attr('download',temp.customerCode+Images.getTypeImage(temp.urlImage));
				$('.fancybox-inner .DownloadPhotoLink').attr('download',temp.urlEx.substring(temp.urlEx.lastIndexOf("/")+1));
				if($('#tab4').hasClass('Active')){
					$('.fancybox-inner #result').attr('value',temp.id);
					if(temp.result!=null && temp.result==1) $('.fancybox-inner #result').attr('checked','checked');
					else $('.fancybox-inner #result').removeAttr('checked');
				}
				Images.downloadFile(temp, false);//lay base64
				$('.DeletePhotoLink').attr('value',temp.id);
				var currentMil = new Date().getTime();
				var urlTmp = temp.urlImage;
				if(!StringUtils.isNullOrEmpty(urlTmp)){
					urlTmp = urlTmp+'?v='+currentMil;
				}
				if (urlTmp != null && urlTmp != '' && urlTmp != undefined) {
					if (document.images) {
						var img = new Image();
						img.src = urlTmp;
						img.onload = function() {
							$('.fancybox-inner #bigImages').attr('src',urlTmp);
							Images.imageBigShow();
						};
					}
				}
			}
		} catch (err) {
			return;
		}
	},
	updateResult:function(){
		var id=$('.fancybox-inner #result').attr('value');
		var result = 0;
		if(id!=''){
			if($('.fancybox-inner #result').is(':checked')){
				result = 1;
			}
			var data=new Object();
			data.id=id;
			data.resultImg=result;
			Utils.addOrSaveData(data, '/images/updateResult', null, 'errMsg123', function(data) {
				if(data.error){
					if(result==1) $('.fancybox-inner #result').removeAttr('checked');
					else $('.fancybox-inner #result').attr('checked','checked');
				}else{
					var temp=Images.lstImages.get(id);
					temp.result=result;
				}

			}, 'loading2',null,true);
		}
	},
	downloadFile:function(temp, ow){
			var url = temp.urlEx;
			var customerInfo = Images.displayProgrameCode + " (" + temp.customerCode+' - '+temp.customerName+' - '+temp.customerAddress + ")";
			var shopInfo = temp.shopCode+' - '+temp.shopName;
			var staffInfo = temp.staffCode+' - '+temp.staffName;
			var dateInfo = temp.dmyDate+' - '+temp.hhmmDate;
			var data=new Object();
			data.id = temp.id;
			data.urlImage=url;
			data.customerInfo=customerInfo;
			data.shopInfo=shopInfo;
			data.staffInfo=staffInfo;
			data.dateInfo=dateInfo;
			data.overwrite=true;
			if(temp.monthSeq!=undefined && temp.monthSeq!=null){
				data.monthSeqDownload=temp.monthSeq;
			}
			if($('#tab4').hasClass('Active') && Images.displayProgrameId!=undefined && Images.displayProgrameId!=null){
				data.displayProgrameId=Images.displayProgrameId;
			}
			$('.loadingPopup').show();
			$('.fancybox-inner .DownloadPhotoLink').hide();
			var kData = $.param(data, true);

			//haupv3: xu ly link down
			var outPutType = "jpg";
			var serverImg = temp.urlEx.substring(temp.urlEx.lastIndexOf("/")+1);
			outPutType = serverImg.substring(serverImg.lastIndexOf(".")+1).toLowerCase();
			var outPutName = temp.url;
			$.ajax({
				type : 'GET',
				url : '/images/download/image',
				data :(kData),
				dataType : "json",
				success : function(data) {
					if(data.note == undefined){
						data.note = '';
					}
					$('.loadingPopup').hide();
					$('.fancybox-inner .DownloadPhotoLink').show();
					if(!data.error && data.errMsg!= null && data.errMsg.length > 0){
						$('.fancybox-inner .DownloadPhotoLink').attr('href',data.errMsg);
						$('.fancybox-inner .DownloadPhotoLink').attr('download', outPutName +"."+outPutType);
					}else{
						$('.fancybox-inner .DownloadPhotoLink').attr('href',imgDisplayPath+url);
						$('.fancybox-inner .DownloadPhotoLink').attr('download', outPutName +"."+outPutType);
					}
				    $('#noteBig').html(Utils.XSSDeEncode(data.note));//anhhpt: them description cho hinh anh
				    $('#noteSmall').html(Utils.XSSDeEncode(data.note));//anhhpt: them description cho hinh anh

					//show cusMaker
					if( ViettelMap.isValidLatLng(data.cusLat, data.cusLng) ){
						Images._cusLat = data.cusLat;
						Images._cusLng = data.cusLng;
						ViettelMap.clearOverlays();
						//Images.openMapOnImage();
						var map = ViettelMap._map;
						var maptype = $('#mapType').val();
						var pt = null;
						if (maptype == 1){
							ViettelMap.addMarkerImages(null, null, temp.lat, temp.lng);
							pt = new google.maps.LatLng(data.cusLat, data.cusLng);
							marker = new google.maps.Marker({
								position : pt,
								icon:{
									url : WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png',
									size : {height : 20, width : 20},
									scaledSize : {height : 20, width : 20}
								},
								map : ViettelMap._map,
								labelClass : "MarkerLabel",
								labelContent : temp.customerCode,
								labelVisible : true,
								draggable : false,
								labelAnchor : new google.maps.Point(25, 0)
							});
						}else{
							ViettelMap.addMarkerImages(null, null, temp.lat, temp.lng);
							pt = new viettel.LatLng(data.cusLat, data.cusLng);
							marker = new viettel.LabelMarker({
															icon:{
																url :  WEB_CONTEXT_PATH + '/resources/images/Mappin/icon_circle_blue.png',
																	size : {height : 20, width : 20},
																	scaledSize : {height : 20, width : 20}
															},
															position : pt,
															map : map,
															labelClass : "MarkerLabel",
															labelContent : temp.customerCode,
															labelVisible : true,
															draggable : false,
															labelAnchor : new viettel.Point(25, 0)
														});
						}
						map.setCenter(pt);
						var lat1 = Number(data.cusLat);
						var lon1 = Number(data.cusLng);
						var lat2 = Number(temp.lat);
						var lon2 = Number(temp.lng);
						var R = 6371;
						  var a =
						     0.5 - Math.cos((lat2 - lat1) * Math.PI / 180)/2 +
						     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
						     (1 - Math.cos((lon2 - lon1) * Math.PI / 180))/2;
					    R * 2 * Math.asin(Math.sqrt(a));
						$('#khoangCach').html(( Math.round((R * 2 * Math.asin(Math.sqrt(a)))*1000)) + "(m)");
						$('#khoangCachBig').html(( Math.round((R * 2 * Math.asin(Math.sqrt(a)))*1000)) + "(m)");
					}else{
						Images._cusLat = "";
						Images._cusLng = "";

						ViettelMap.addMarkerImages(null, null, temp.lat, temp.lng);
						$('#khoangCach').html("");
						$('#khoangCachBig').html("");
					}

				},
			error:function(XMLHttpRequest, textStatus, errorThrown) {$('.loadingPopup').hide();}});

	},
	getListSelectedImages: function(params){
		if (params == null){
			params = {};
		}
		var list = [];
		var index = 0;
		$('.checkboxOfImage').each(function(){
			  if (this.checked != null && this.checked){
			    list[index++] = $(this).attr('id');
			  };
		});
		params.listImageId = list;
		return params;
	},
	openMapOnImage : function() {
		try{
			VTMapUtil.loadMapResource(function(){
				if (StringUtils.isNullOrEmpty(Images.indexCurrent)){
				}else{
					Images.indexCurrent += '';
					Images.indexCurrent = Images.indexCurrent.trim();
				}
				var temp = Images.lstImages.get(Number(Images.indexCurrent));
				if(temp!=null){
					if($('.OnFucnStyle').is(':visible')){
						$('.OffFucnStyle').hide();
						$('.OffFucnStyle').css('display','none');
						$('.OnFucnStyle').show();
						$('.OnFucnStyle').css('display','block');
						$('.fancybox-inner #divMapSection').removeClass('SmallMapSection');
						$('.fancybox-inner #divMapSection').addClass('LargeMapSection');
						$('.fancybox-inner #bigMap').css('width','488px');
						$('.fancybox-inner #bigMap').css('height','409px');
						ViettelMap.loadMapForImages('bigMap',temp.lat,temp.lng,15,1, Images._cusLat, Images._cusLng, true);
					}
					else {
						$('.OnFucnStyle').hide();
						$('.OnFucnStyle').css('display','none');
						$('.OffFucnStyle').show();
						$('.OffFucnStyle').css('display','block');
						$('.fancybox-inner #divMapSection').removeClass('LargeMapSection');
						$('.fancybox-inner #divMapSection').addClass('SmallMapSection');
						$('.fancybox-inner #bigMap').css('width','140px');
						$('.fancybox-inner #bigMap').css('height','116px');
						ViettelMap.loadMapForImages('bigMap',temp.lat,temp.lng,15,0, Images._cusLat, Images._cusLng, true);
					}

					$('.olAlphaImg').hide();
					$('.olButton').hide();
					$("[id^=mapTypeImg_]").parent().hide();
					$("[id^=mapTypeText_]").parent().hide();
					$('[id^=OL_Icon_]').show();
				}
			});
		}catch(e){}
	},
	deleteImage:function(t){
		var id=$(t).attr('value');
		var temp = Images.lstImages.get(id);
		if(temp!=null){
			var data = new Object();
			data.id=temp.id;
			$.messager.confirm(msgXacNhan, DMSI18N.jsp_upload_image_do_you_want_to_delete_image, function(r){
				if (r){
					Utils.addOrSaveData(data, '/images/delete-image', null, 'errMsgPopup', function(result) {
						if(!result.error){
							Images.checkDeleteImage = true;
							Images.calPageNumberForPopup();//tinh lai trang dang select khi delete thành công
							for(var i=0;i<Images.lstImages.keyArray.length;i++){
								if(Images.lstImages.keyArray[i]==Images.indexCurrent){
									if(i+1<Images.lstImages.keyArray.length){//next toi 1 hình
										Images.showImageNextPre(1);
									}else if(i > 0){//nếu là hình cuối trong list thì pre lại
										Images.showImageNextPre(0);
									}else{//nếu hết hình thì lấy trang khác
										Images.indexCurrent=null;
										Images.getImagesForPopup(function(){
											$.fancybox.close();
										});
									}
									break;
								}
							}
							$('#li'+temp.id).remove();
							Images.lstImages.remove(temp.id);
						}else{
							$('.fancybox-inner #errMsgPopup').html(result.errMsg).show();
							setTimeout(function(){$('.fancybox-inner #errMsgPopup').hide();},5000);
						}
					}, 'loading2',null,true,null,function(result){
						if(result.error){
							setTimeout(function(){$('.fancybox-inner #errMsgPopup').hide();},5000);
						}
					});
				}
			});
		}
	},
	refeshPicture: function(){
		$('img.ImageAlbum').each(function(){
			  var src = $(this).attr('src');
			  $(this).attr('src', src + '&s=1');
		});
		$('img.ImageOfAlbum').each(function(){
			  var src = $(this).attr('src');
			  $(this).attr('src', src + '&s=1');
		});
	},
	rotateImage:function(t){
		var id=Images.indexCurrent;
		var temp = Images.lstImages.get(id);
		if(temp!=null){
			var data = new Object();
			data.id=temp.id;
			kData = $.param(data, true);
			$('#divOverlay').show();
			$.ajax({
				type : "POST",
				url : '/images/rotate-image',
				data :(kData),
				dataType : "json",
				success : function(result) {
					Images.refeshPicture();
					$('#divOverlay').hide();
					if(!result.error){
						var currentMil = new Date(sysDateFromDB).getTime();
						var url = result.url + '?v=' + currentMil;
						var urlThumbnail = result.thumbnailUrl + '?v=' + currentMil;
						$('#img'+Images.indexCurrent).attr('data-original', urlThumbnail);
						$('#img'+Images.indexCurrent).attr('src', urlThumbnail);
						$('#imagesOfAlbum_'+Images.indexCurrent).attr('data-original', urlThumbnail);
						$('#imagesOfAlbum_'+Images.indexCurrent).attr('src', urlThumbnail);
						$('#imagesOfAlbulmDetail_'+Images.indexCurrent).attr('data-original', urlThumbnail);
						$('#imagesOfAlbulmDetail_'+Images.indexCurrent).attr('src', urlThumbnail);
						var image = url;
						if (image != null && image != '' && image != undefined) {
							if (document.images) {
								var img = new Image();
								img.src = image;
								img.onload = function() {
									$('.fancybox-inner #bigImages').attr('src',image);
									Images.imageBigShow();
								};
							}
						}
						Images.downloadFile(temp, true);
					}else{
						$('.fancybox-inner #errMsgPopup').html(DMSI18N.jsp_upload_image_system_err).show();
						setTimeout(function(){$('.fancybox-inner #errMsgPopup').hide();},5000);
					}
				}
			});

		}
	},
	calPageNumberForPopup:function(){
		if(Images.lstImages!=undefined && Images.lstImages!=null){
			Images.pagePopup=parseInt((Images.lstImages.keyArray.length-1)/Images.maxPopup);
		}else Images.pagePopup=0;
	},
	loadComboStaffGroup:function(url){
		$("#staffGroup").kendoMultiSelect({
			dataSource: {
				transport: {
	                read: {
	                    dataType: "json",
	                    url: url
	                }
	            }
			},
			filter: "contains",
	        dataTextField: "staffGroupCode",
	        dataValueField: "id",
			itemTemplate: function(data, e, s, h, q) {
				return Utils.XSSEncode(data.staffGroupCode)+' - '+Utils.XSSEncode(data.staffGroupName);
			},
	        tagTemplate:  '#: data.staffGroupCode #',
	        placeholder: placeHolderStaffGroup
	        
	    });

	    var staffGroupKendo = $("#staffGroup").data("kendoMultiSelect");
	    if (staffGroupKendo != null){
	    	staffGroupKendo.wrapper.attr("id", "group-wrapper");
	    	if (staffGroupKendo.dataSource != null && staffGroupKendo.dataSource._data != null && staffGroupKendo.dataSource._data.length == 1){
	    		staffGroupKendo.val(staffGroupKendo.dataSource._data[0].id);
	    	}
	    }
	},
	loadComboStaff:function(url){

		$("#staff").kendoMultiSelect({
			dataSource: {
				transport: {
	                read: {
	                    dataType: "json",
	                    url: url
	                }
	            }
			},
			filter: "contains",
	        dataTextField: "staffCodeName",
	        dataValueField: "staffId",
			itemTemplate: function(data, e, s, h, q) {
				return Utils.XSSEncode(data.staffCode)+' - '+Utils.XSSEncode(data.staffName);
			},
	        tagTemplate:  '#: data.staffCode #',
	        placeholder: placeHolderStaff
	    });

	    var staffKendo = $("#staff").data("kendoMultiSelect");
	    staffKendo.wrapper.attr("staffId", "staff-wrapper");
	},loadComboStaff_V2:function(url){

		$("#staff").kendoMultiSelect({
			dataSource: {
				transport: {
	                read: {
	                    dataType: "json",
	                    url: url
	                }
	            }
			},
			filter: "contains",
	        dataTextField: "staffCodeName",
	        dataValueField: "id",
			itemTemplate: function(data, e, s, h, q) {
				return Utils.XSSEncode(data.staffCode)+' - '+Utils.XSSEncode(data.staffName);
			},
	        tagTemplate:  '#: data.staffCode #',
	        placeholder: jspCustomerAttributeAll
	    });

	    var staffKendo = $("#staff").data("kendoMultiSelect");
	    staffKendo.wrapper.attr("id", "staff-wrapper");
	},
	loadComboCTTB:function(url){
		Utils.getJSON(url,function(list){
			$('#cttb').removeAttr('disabled');
			var html = '';
			if(list.length >= 2){
				html += '<option value="-1" selected>--'+DMSI18N.jsp_upload_image_all+'--</option>';
				for(var i=0; i < list.length; i++){
					Images.lstCTTB.push(Utils.XSSEncode(list[i].displayProgrameId));
					Images.lstCTTB_temp.push(Utils.XSSEncode(list[i].displayProgrameId));
					html += '<option value="'+ Utils.XSSEncode(list[i].displayProgrameId) +'">'+ Utils.XSSEncode(list[i].displayProgrameCode) +'</option>';
				}
				$('#cttb').html(html);
				setSelectBoxValue('cttb',-1);
				$('#ddcl-cttb').remove();
				$('#ddcl-cttb-ddw').remove();
				Images.lstCTTB_temp = Images.lstCTTB;
				$('#cttb').dropdownchecklist({
					forceMultiple: true,
					firstItemChecksAll: true,
					maxDropHeight: 350,
					onItemClick:function(checkbox, selector){
						var value = Number(checkbox.context.defaultValue);
						if (checkbox.context.checked) {
							if ( value == -1){
								Images.lstCTTB = new Array();
								$('#ddcl-cttb-ddw input[type=checkbox]').each(function(){
									var valueTmp = Number($(this).val());
									if(valueTmp != -1) Images.lstCTTB.push(valueTmp);
								});
							}else{
								var index = Images.lstCTTB.indexOf(value);
								if (index==-1) Images.lstCTTB.push(value);
							}
						}
						else{
							if (value == -1){
								Images.lstCTTB = new Array();
							}else{
								var index = Images.lstCTTB.indexOf(value);
								if (index!=-1) Images.lstCTTB.splice(index,1);
							}
						}
					}
				});
			}  else if(list.length ==1 ) {
				Images.lstCTTB.push(Utils.XSSEncode(list[0].displayProgrameId));
				html += '<option value="'+ Utils.XSSEncode(list[0].displayProgrameId) +'">'+ Utils.XSSEncode(list[0].displayProgrameCode) +'</option>';
				$('#cttb').html(html);
				setSelectBoxValue('cttb',Utils.XSSEncode(list[0].displayProgrameId));
			} else {
				html += '<option value="-2"></option>';
				$('#cttb').html(html);
				setSelectBoxValue('cttb',-2);
				$('#cttb').attr('disabled','disabled');
			}

			if($('#roleType').val() == 2) {
				Images.filterSearchAlbum = new Object();
				Images.filterSearchAlbum.shopId = $('#curShopId').val();
				Images.filterSearchAlbum.gsnppId = $('#staffId').val() ;
				//Images.filterSearchAlbum.nvbhId = $('#nvbh').combobox('getValue') ;
				Images.filterSearchAlbum.tuyen = -1 ;
				Images.filterSearchAlbum.fromDate = $('#fromDate').val().trim();
				Images.filterSearchAlbum.toDate = $('#toDate').val().trim();
				//Images.filterSearchAlbum.customerCode = $('#customerCode').val().trim();
				//Images.filterSearchAlbum.customerNameOrAddress = $('#customerAddress').val().trim() ;
				Images.filterSearchAlbum.lstCTTB = Images.lstCTTB;
			}

		});
	},
	openOrderImage:function(){
		$('#orderImagePopup').dialog({
	        title: DMSI18N.jsp_upload_image_download_image,
	        closed: false,
	        cache: false,
	        modal: true,
	        width : 616,
	        height :'auto',
	        onOpen: function(){

	        }
	    });
	},
	searchPictures: function(){

	},
	loadShowAlbum: function(albumType){
		Images.checkFromdateAndTodate();
		if (Images._allowCallAjax != null && !Images._allowCallAjax){
			return;
		}
		if (albumType == null && Images._albumType == null){
			Images._albumType = AlbumType.MediaAlbum;
		}else if (Images._albumType != null && albumType != null && Images._albumType != albumType){
			Images._albumType = albumType;
		}
		Images.setParamRequest();
		Images._loadAlbumPage = 0;
		var dataModel = Images.filterSearchAlbum;
		dataModel.albumType = Images._albumType;
		dataModel.page = Images._loadAlbumPage++;
		dataModel.max = Images.maxPopup;
		var url = '/images/loadAlbum';
		Utils.getHtmlDataByAjax(dataModel, url, function(data){
			$('#imageContent').html(data);
		});
	},
	addListAlbumScroll: function(){
		Images.checkFromdateAndTodate();
		if (Images._allowCallAjax != null && !Images._allowCallAjax){
			return;
		}
		Images._allowLoadAlbumList = false;
		$('#divOverlayAddAlbum').show();
		Images.setParamRequest();
		if (!(Images._loadAlbumPage > 0)){
			Images._loadAlbumPage = 0;
		}
		var dataModel = Images.filterSearchAlbum;
		dataModel.albumType = Images._albumType;
		dataModel.page = Images._loadAlbumPage++;
		dataModel.max = Images.maxPopup;
		var url = '/images/getAlbumList';
		Utils.getJSONDataByAjaxNotOverlay(dataModel, url, function(data){
			Images.fillLoadAlbumPage(data.listAlbum);
			Images._allowLoadAlbumList = true;
			$('#divOverlayAddAlbum').hide();
		});
	},
	fillLoadAlbumPage: function(list){
		if (list != null && list.length > 0){
			if (list.length < Images.maxPopup){
				Images._isEndOfAlbum = true;
			}
			var html = '';
			var currentMil = new Date().getTime();
			for (var i =0, size = list.length; i< size; i++){
				var r = list[i];
				html += '<li>';

				if(!isNullOrEmpty(r.pictureQuantity)){
					html += '<a onclick="Images.showAlbumSelect(\''+ r.objectId + '\', \''+r.albumType+'\')" href="javascript:void(0)" class="PhotoThumbGroup"> ';
				}else{
					html += '<a onclick="" href="javascript:void(0)" class="PhotoThumbGroup"> ';
				}


				html += '<span class="BoxFrame">';
				html += '<span class="BoxMiddle">';

				html += '<img id="imagesOfAlbulmDetail_'+r.objectId+'" class="ImageOfAlbum ImageFrame3" ';
				if(isNullOrEmpty(r.pictureQuantity) || r.pictureQuantity <= 0){
					html += 'src="'+imgDisplayPath+WEB_CONTEXT_PATH + '/resources/images/grey.jpg?s=1" data-original="' + WEB_CONTEXT_PATH + '/resources/images/grey.jpg?s=1"';
				}else{

					html += 'src="'+imgDisplayPath+r.thumbUrl+'?v='+currentMil+'"'+  ' data-original="'+imgDisplayPath+r.thumbUrl+'?v='+currentMil+'"';
				}

				html += ' width="201" height="144" />';



				html += '</span>';
				html += '</span>';
				html += '</a>';
				html += '<p class="Text1Style">';

				html += '<a href="javascript:void(0)">';

				if(!isNullOrEmpty(r.pictureQuantity)){
					html += '<a href="javascript:void(0)" onclick="Images.showAlbumSelect(\''+ r.objectId + '\', \''+r.albumType+'\')" >';
				}else{
					html += '<a href="javascript:void(0)">';
				}

				if (r.albumType != 1){
					html += r.objectCode;
					html += ' - ';
				}
				html += r.objectName;
				html += '</a>';

				html += '</p>';

				if(!isNullOrEmpty(r.pictureQuantity)){
					html += '<p class="Text2Style">' + r.pictureQuantity + ' '+ msgImageSearchResponse + '</P>';
				}else{
					html += '<p class="Text2Style">' + 0 + ' '+ msgImageSearchResponse + '</P>';
				}


				html += '</li>';
			}
			$('.PhotoListSection #albumContentDetail').append(html);
			$(".ImageOfAlbum").lazyload({
			    event: "scrollstop"
			});
		}else{
			Images._isEndOfAlbum = true;
		}
	},
	viewAlbumDetail: function(objectId, albumType){
		Images.setParamRequest();
		var dataModel = Images.filterSearchAlbum;
		dataModel.albumType = Images._albumType;
		dataModel.objectId = objectId;
		var url = '/images/viewAlbumDetail';
		Utils.getHtmlDataByAjax(dataModel, url, function(data){
			$('#imageContent').html(data);
		});
	},
	loadComboAlbum:function(url){
		$("#album").kendoMultiSelect({
			dataSource: {
				transport: {
	                read: {
	                    dataType: "json",
	                    url: url,
	                }
	            }
			},
			filter: "contains",
	        dataTextField: "mediaAlbumCode",
	        dataValueField: "id",
			itemTemplate: function(data, e, s, h, q) {
				return Utils.XSSEncode(data.mediaAlbumCode)+' - '+Utils.XSSEncode(data.mediaAlbumName);
			},
	        tagTemplate:  '#: data.mediaAlbumCode #',
	        placeholder: msgChooseAlbum
	    });

	    var staffKendo = $("#album").data("kendoMultiSelect");
	    staffKendo.wrapper.attr("id", "album-wrapper");
	},
	loadComboboxAlbum: function(url, selector){
		Paid._xhsave = $.ajax({
			type : "GET",
			url : url,
			dataType: "json",
			success : function(result) {
				$(selector).combobox({
					//width:145,
					data: result,
					valueField: 'id',
					textField: 'mediaAlbumName',
					formatter: function(row) {
						return '<span style="font-weight:bold">' + Utils.XSSEncode(row.mediaAlbumName) +'</span>';
					},
					filter: "contains",
	 				onLoadSuccess:function(){
	 					$(selector).combobox('select', '' );
	 				}
				});
			},
			error:function(XMLHttpRequest, textStatus, errorDivThrown) {
				Paid._xhrSave = null;
			}
		});
	},
//	loadComboboxAlbum: function(url, selector){
//		if (selector != null){
//			$(selector).combobox({
//				data: {
//					transport: {
//						read: {
//							dataType: "json",
//							url: url,
//						}
//					}
//				},
//				valueField: 'mediaAlbumCode',
//				textField: 'mediaAlbumName',
//				formatter: function(row) {
//					return '<span style="font-weight:bold">' + Utils.XSSEncode(row.name) +'</span>';
//				},
//				filter: "contains",
////				dataTextField: "mediaAlbumName",
////				dataValueField: "id",
//				itemTemplate: function(data, e, s, h, q) {
//					return Utils.XSSEncode(data.mediaAlbumCode)+' - '+Utils.XSSEncode(data.mediaAlbumName);
//				},
//				tagTemplate:  '#: mediaAlbumCode # - #: mediaAlbumName #'
//					
//			});
//		}
//	},
	
	deleteSelectedImages: function(){
		var url = '/images/deleteSelectedImages';
		var params = Images.getListSelectedImages(null);
		if (params != null && params.listImageId != null && params.listImageId.length > 0){
			Utils.addOrSaveData(params, url, null, null, function(data){
				if (data.error != null && data.error){

				}else if (data.error != null && !data.error){
					Images.popupNotify(msgDeleteImageSuccess, true);
					var objectId = Images._objectIdSelected;
					Images.showAlbumSelect(objectId == null? '': objectId, Images._albumType == null? AlbumType.MediaAlbum: Images._albumType);
				}
			}, null, null, null, msgDelecteImages);
		}else{
			$('#popupNotifyMessage').show();
			$('#popupNotifyMessage #popupMessageNotify').addClass('textColorRed');
			$('#popupNotifyMessage #popupMessageNotify').html(msgBanChuaChonHinhNao);
			setTimeout(function(){
				$('#popupNotifyMessage #popupMessageNotify').removeClass('textColorRed');
				$('#popupNotifyMessage').hide(2000);
				$('#popupNotifyMessage #popupMessageNotify').html('');
			}, 3000);
		}
	},
	popupChangeAlbum: function(){
		var params = Images.getListSelectedImages(null);
		if (params != null && params.listImageId != null && params.listImageId.length > 0){
			$('#popupNotifyMessage').hide();
			$('#popupNotifyMessage #popupMessageNotify').html('');
			var html = $('#popup-change-album').html();
			$('#popup-change-album').show();
			$('#popup-change-album').dialog({
				 title: msgDialogChooseAlbum,
				 width: 500,
				 height: 250,
				 closed: false,
				 cache: false,
				 modal: true,
				 onClose : function(){
					 $('#popup-change-album').hide();
					 $('#popup-change-album').html(html);
				 },
				 onOpen: function(){
					 Images.loadComboboxAlbum("/images/getListMediaAlbum?isExceptAlbumDongCua=true", '#popup-change-album #cbxAlbum');
					
				 }
			});
		}else{
			$('#popupNotifyMessage').show();
			$('#popupNotifyMessage #popupMessageNotify').addClass('textColorRed');
			$('#popupNotifyMessage #popupMessageNotify').html(msgBanChuaChonHinhNao);
			setTimeout(function(){
				$('#popupNotifyMessage #popupMessageNotify').removeClass('textColorRed');
				$('#popupNotifyMessage').hide(2000);
				$('#popupNotifyMessage #popupMessageNotify').html('');
			}, 3000);
		}
	},
	popupNotify: function(msg, isSuccess){
		$('#popupNotifyMessage').show(500);
		if (isSuccess != null && isSuccess){
			$('#popupNotifyMessage #popupMessageNotify').addClass('textColorBlue');
		}else{
			$('#popupNotifyMessage #popupMessageNotify').addClass('textColorRed');
		}
		$('#popupNotifyMessage #popupMessageNotify').html(msg);
		setTimeout(function(){
			$('#popupNotifyMessage').hide(2000);
			$('#popupNotifyMessage #popupMessageNotify').html('');
			$('#popupNotifyMessage #popupMessageNotify').removeClass('textColorRed');
			$('#popupNotifyMessage #popupMessageNotify').removeClass('textColorBlue');
		}, 3000);
	},
	changeAlbumOfImage: function(){
		var url = '/images/changeAlbumSelectedImages';
		var params = Images.getListSelectedImages(null);
		
		var combobox = $("#popup-change-album #cbxAlbum").combobox('getValue');
		params.mediaAlbumId = combobox;
		Utils.addOrSaveData(params, url, null, 'errMsgDialog', function(data){
			if (data.error != null && data.error){

			}else if (data.error != null && !data.error){
				Images.popupNotify(msgChangeAlbumSuccess, true);
				$('#popup-change-album').dialog('close');
//				if (Images._albumType == AlbumType.MediaAlbum){
					var objectId = Images._objectIdSelected;
					Images.showAlbumSelect(objectId == null? '': objectId, Images._albumType == null? AlbumType.MediaAlbum: Images._albumType);
//				}
			}
		}, 'popup-change-album', null, null, null);
	},
	exportAllAlbum :function() {
		$('#errMsg').html('').hide();
		Images.setParamRequest();
		var params = Images.getParamRequest();
//		params.objectId  =Images._objectId;
//		params.albumType = Images._albumType;
		var msg= allAlbum;
		$.messager.confirm(DMSI18N.jsp_upload_image_confirm, msg, function(r){
			if (r){
				$('#errMsg').html('').hide();
				$('#divOverlay_New').show();
				params.token = Utils.getToken();
				var kData = $.param(params, true);
				$.ajax({
					type : 'GET',
					url : '/images/exportAllAlbum',
					data :(kData),
					dataType : "json",
					success : function(data) {
						$('#divOverlay_New').hide();
						if(data.error && data.errMsg!= undefined){
							$('#errMsg').html(DMSI18N.jsp_upload_image_download_albumn_fail_err + ': ' + escapeSpecialChar(data.errMsg)).show();
						} else{
							if(data.hasData) {
								window.open(data.view, '_blank');
								setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
				                    CommonSearch.deleteFileExcelExport(data.view);
								}, 50000000);
							} else{
								$('#errMsg').html(DMSI18N.jsp_upload_image_no_data_to_download).show();
							}
						}
					},
					error:function(XMLHttpRequest, textStatus, errorThrown) {
						$.ajax({
							type : "POST",
							url : WEB_CONTEXT_PATH + '/check-session',
							dataType : "json",
							success : function(data, textStatus, jqXHR) {
								var linkReload = window.location.href;
								if(linkReload.indexOf('?')>0){
									if(linkReload.indexOf('newToken') < 0){
										window.location.href = window.location.href + '&newToken=1';
									} else {
										window.location.reload(true);
									}
								} else {
									window.location.href = window.location.href + '?newToken=1';
								}
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								window.location.href = WEB_CONTEXT_PATH + '/home' ;
							}
						});
					}
				});
			}
		});
		return false;
	}
};
var AlbumType = {
	MediaAlbum: 1,
	CustomerAlbum: 2,
	StaffAlbum: 3,
	AlbumLoi : 7
};
var MediaAlbumObjectType = {
	DONG_CUA: 0,
	TRUNG_BAY: 1,
	DIEM_BAN: 2,
	SAN_PHAM: 3,
	DAI_DIEN: 4,
	KHAO_SAT:5
};
var MediaAlbumCode = {
		DONG_CUA: 'DONGCUA',
		DIEM_BAN: 'DIEMBAN',
};

/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/images/jquery.images.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.kpi-manager.js
 */
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
		$('.ErrorMsgStyle').html('').hide();
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
			footer.staffCode = DMSI18N.jsp_common_total;
			footer.staffName = '';
			footer.stt= '';
			footer.month = '';
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
					obj.month = '';
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
            var columnsLeft = [
			            	{field:'stt', title:jspCustomerAttributeSTT, width:40, align: 'center',
						    	 formatter: function(value, row, index){
						    		 if(value<10 && value != null && value != ''){
						    			 return '0'+ Utils.XSSEncode(value);
						    		 }
						    		 return Utils.XSSEncode(value);
							     }},
        				     {field:'objectCode',title:isPlanStaff?DMSI18N.jsp_kpi_sale_staff_code:DMSI18N.jsp_common_route_code, width:160,
        				    		 formatter: function(value, row, index){
                				    	 if (row.footer != undefined && row.footer ){
                				    		return '<b id="tongCong">' + msgCommon14 + '</b>';
                				    	 }else{
                				    		 return Utils.XSSEncode(value);
                				    	 }
                				     }},
        				     
        				     {field:'objectName',title:isPlanStaff?DMSI18N.jsp_common_sale_staff_1:DMSI18N.jsp_common_route_name, width:160},
        				     {field:'month',rowspan:2, title: DMSI18N.jsp_common_month, width:80,align: 'center',
        				    	 formatter: function(value, row, index){
        				    		 return Utils.XSSEncode(value);
        				     }}
        				];
            columnsLeft= columnsLeft.concat(KPIManger.frozenColumns);
			$('#grid').datagrid({
				width : $('#widthGrid').width(),
				autoWidth: false,
				data : datasource,
				fitColumns : true,
				scrollbarSize: 20,
				autoRowHeight : true,
//				height: 400,
				showFooter : true,
//				view: bufferview,
//				view:scrollview,
				singleSelect : true,
				columns:[columnsLeft],
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
			setSearchResultTile($('#searchMonth').val().trim());

		});

	},
	mergeFooter: function(){
		setTimeout(function() {
			setSearchResultTile($('#searchMonth').val().trim());
			$('.datagrid-row:last-child td').css('border-bottom-style', 'hidden');
			$('.datagrid-row:last-child td[field=stt], .datagrid-row:last-child td[field=objectCode], .datagrid-row:last-child td[field=objectName]').css('border-color', 'white');
			$('.datagrid-row:last-child td').css('background-color', '#ffffff');
		}, 100);
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
		$('#divOverlay_New').show();
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
		$('#divOverlay_New').hide();
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
	    				KPIManger.initData();
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
		KPIManger.mergeFooter();
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
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.kpi-manager.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.promotion-catalog.js
 */
var PromotionCatalog = {//Lam
	_xhrSave : null,
	_xhrDel: null,
	_xhrReport: null,
	_mapShop:null,
	_listShopId:null,
	_listQuantity:null,
	_mapCheckCustomer: new Map(),
	_listCustomer:null,
	_listSize:null,
	_listCustomerSize:null,
	_flagAjaxTabAttribute:null,
	_listCustomerDialogSize:null,
	_hasCustomerType:false,
	_hasSaleLevel:false,
	lstType:new Array(),
	zvMap :new Map(),
	_isPromotionPage: null,

	//haupv add xu ly dialog
	_isCloseDialogWithoutChange : false,
	_mapProductCodeStr1 : new Map(),
	_mapProductCodeStr2 : new Map(),
	_mapNewDataSubGrid1 : new Map(),
	_mapNewDataSubGrid2 : new Map(),
	//end xu ly dialog
	getTrue_DataOrFalse_MessageOfAutoAttribute: function(objectId, nameAttribute,valueType){
		if(valueType=="CHARACTER"){
			var msg = '';
			var dataOfAutoAttribute = $('#'+objectId+'_CHARACTER').val();
			if(dataOfAutoAttribute==''){
				msg = PromotionCatalog_valueAttribute+nameAttribute;
				$('#'+objectId+'_CHARACTER').focus();
				return 'false_'+msg;
			}
			if(Utils.isEmpty($('#'+objectId+'_CHARACTER').val())){
				msg =   PromotionCatalog_Attribute+' ' + nameAttribute + ':' +PromotionCatalog_invalideEspace;
				$('#'+objectId+'_CHARACTER').focus();
				return 'false_'+msg;
			}
			msg = Utils.getMessageOfSpecialCharactersValidate(objectId+'_CHARACTER','',Utils._NAME);
			if(msg.length > 0){
				msg = PromotionCatalog_Attribute+nameAttribute+': '+ PromotionCatalog_specialCharacte +' [<>\~#&$%@*()^`\'"';
				return 'false_'+msg;
			}

			return 'true_'+dataOfAutoAttribute;
		}else if(valueType=="NUMBER"){
			var msg = '';
			var NUMBER_from = $('#'+objectId+'_NUMBER_from').val();
			var NUMBER_to = $('#'+objectId+'_NUMBER_to').val();
			if(NUMBER_from == ''){
				msg =  PromotionCatalog_valueAttribute+' '+nameAttribute;
				$('#'+objectId+'_NUMBER_from').focus();
				return 'false_'+msg;
			}
			if(NUMBER_to == ''){
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute;
				$('#'+objectId+'_NUMBER_to').focus();
				return 'false_'+msg;
			}
			NUMBER_from = parseInt(Utils.returnMoneyValue(NUMBER_from.trim()));
			NUMBER_to = parseInt(Utils.returnMoneyValue(NUMBER_to.trim()));
			var dataOfAutoAttribute = NUMBER_from +','+NUMBER_to;//Nếu ở trên không cắt dấu phẩy đi thì sẽ ảnh hưởng!

			/*msg = Utils.getMessageOfSpecialCharactersValidateEx(objectId+'_NUMBER_from','',Utils._TF_NUMBER_DOT);
			if(msg.length > 0){
				msg = 'Thuộc tính '+nameAttribute+': Giá trị "Từ" chỉ nằm trong các ký tự [0-9.].';
				return 'false_'+msg;
			}
			msg = Utils.getMessageOfSpecialCharactersValidateEx(objectId+'_NUMBER_to','',Utils._TF_NUMBER_DOT);
			if(msg.length > 0){
				msg = 'Thuộc tính '+nameAttribute+': Giá trị "Đến" chỉ nằm trong các ký tự [0-9.].';
				return 'false_'+msg;
			}*/
			if(NUMBER_from!='' &&  NUMBER_to!='' &&  NUMBER_from > NUMBER_to){
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute+': '+PromotionCatalog_valueFromTo;
				return 'false_'+msg;
			}
			return 'true_'+dataOfAutoAttribute;
		}else if(valueType=="DATE_TIME"){
			var msg = '';
			var DATETIME_from = $('#'+objectId+'_DATETIME_from').val();
			var DATETIME_to = $('#'+objectId+'_DATETIME_to').val();
			var dataOfAutoAttribute = DATETIME_from +','+DATETIME_to;
			if(DATETIME_from == '' && DATETIME_to == ''){
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute;
				$('#'+objectId+'_DATETIME_from').focus();
				return 'false_'+msg;
			}
			msg = Utils.getMessageOfInvalidFormatDate(objectId+'_DATETIME_from');
			if(msg.length > 0){
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute+': '+PromotionCatalog_invaliteValueFrom +'dd/mm/yyyy.';
				return 'false_'+msg;
			}
			msg = Utils.getMessageOfInvalidFormatDate(objectId+'_DATETIME_to');
			if(msg.length > 0){
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute+': '+ PromotionCatalog_invaliteValueTo+'dd/mm/yyyy.';
				return 'false_'+msg;
			}
			if(!Utils.compareDate(DATETIME_from, DATETIME_to)){
				msg = msgErr_fromdate_greater_todate;
				msg = PromotionCatalog_valueAttribute+' '+nameAttribute+': '+msg;
				return 'false_'+msg;
			}
			return 'true_'+dataOfAutoAttribute;
		}
	},
	saveCustomerAttribute: function(){
		var message = '';
		var messageSaleLevel = '';
		var messageCustomerType = '';
		$('#errMsgSave').html('').hide();
		var data = new Object();
		var listCustomerType= new Array();
		var listSaleLevelCatId= new Array();
		var listAttribute= new Array();
		var listAttributeDataInField=new Array();
		var nameAttr = '';
		$('.checkBoxAttribute').each(function(){
			var objectType = $(this).attr('objectType');
			var objectId = $(this).attr('objectId');
			var name = $(this).attr('name');

			if(objectType == 2){
				listAttribute.push(-2);//Loai kh cho id = -2 di. De ti nua if else tren action.
				listAttributeDataInField.push('CustomerType');
				messageCustomerType = 'noCheckCustomerType';
				listCustomerType= new Array();
				if( $('#customerType') != undefined && $('#customerType').val() != null ){
//					listCustomerType.push($('#customerType').val());
					listCustomerType = $('#customerType').val();
					messageCustomerType = 'haveCheckCustomerType';
				}
//				$('#ddcl-customerType-ddw input[type=checkbox]').each(function(){
//					if($(this).attr('checked')=='checked'){
//						listCustomerType.push($(this).val());
//						messageCustomerType = 'haveCheckCustomerType';
//					}
//				});
			}else if(objectType == 3){
				listAttribute.push(-3);//Muc doanh so cho id = -3 di. De ti nua if else tren action.
				listAttributeDataInField.push('SaleLevel');
				messageSaleLevel = 'noCheckSaleLevel';
				listSaleLevelCatId= new Array();
				$('#saleLevel input[type=checkbox]').each(function(){
					if($(this).attr('checked')=='checked'){
						listSaleLevelCatId.push(this.value);
//						listSaleLevelCatId.push($(this).attr('objectid'));
						//vào được đây tức là mức doanh số có ít nhất 1 combox được check.
						messageSaleLevel = 'haveCheckSaleLevel';
					}
				});
			}else if(objectType == 1){
				listAttribute.push(objectId);
				var valueType = $(this).attr('valueType');
				if(valueType=="CHARACTER" || valueType=="NUMBER" || valueType=="DATE_TIME"){
					var boolean = PromotionCatalog.getTrue_DataOrFalse_MessageOfAutoAttribute(objectId, name, valueType);
					var arr = boolean.split('_');
					if(arr[0]=='false'){
						message = arr[1];
						return false;
					}else{
						listAttributeDataInField.push(arr[1]);
					}
				}else if(valueType=="CHOICE" || valueType=="MULTI_CHOICE"){
					messageSaleLevel = 'noCheckOther';
					var dataOfAutoAttribute = '';
					//Giu dau phay de giu bussiness phia sau sample ["14144", "14145" ,]
					$('#' +objectId).next('.MySelectBoxClass').find('li.selected input').each(function(){
						if($(this).attr('checked')=='checked'){
							if( $.isNumeric($(this).val()) ) {
								dataOfAutoAttribute += $(this).val() +',';//Nhớ chú ý dấu phẩy cuối cùng
								messageSaleLevel = 'haveCheckOther';
							}
						}
					});
					
//					$('#ddcl-'+objectId+'-ddw input[type=checkbox]').each(function(){
//						if($(this).attr('checked')=='checked'){
//							dataOfAutoAttribute += $(this).val() +',';//Nhớ chú ý dấu phẩy cuối cùng
//							messageSaleLevel = 'haveCheckOther';
//						}
//					});
					nameAttr = name;
					listAttributeDataInField.push(dataOfAutoAttribute);
				}

			}

		});
		if(messageSaleLevel == 'noCheckSaleLevel'){
			message = PromotionCatalog_valueAtt1+' '+ PromotionCatalog_doanhSo;
		}
		if(messageCustomerType == 'noCheckCustomerType'){
			message = PromotionCatalog_valueAtt1+' ' +PromotionCatalog_typeClient;
		}
		if(messageSaleLevel == 'noCheckOther'){
			message = PromotionCatalog_valueAtt1+' '+nameAttr;
		}
		if(message.length > 0){
			$('#errMsgSave').html(message).show();
			return false;
		}
		data.listCustomerType = listCustomerType;
		data.listSaleLevelCatId = listSaleLevelCatId;
		data.listAttribute = listAttribute;
		data.listAttributeDataInField = listAttributeDataInField;
		data.promotionId=$('#promotionId').val();
		Utils.addOrSaveData(data, '/catalog/promotion/save-promotion-customer-attribute', PromotionCatalog._xhrSave, 'errMsgSave', null, 'loading2',
				'#customerAttributeMsg ');//Prefix để selector jquery mà truyền thiếu "khoảng trắng"
		//là có thể lỗi, không xuất ra câu thông báo lỗi, hay câu thông báo thành công đâu.
		return false;
		},

		/**
		 * Tai mau file import
		 * @author connv
		 * @since 13 June 2017
		 * **/
		downloadImportTemplate:function(){
			var url='/catalog/promotion/export-template-for-import';
			if(CommonSearch._xhrReport != null){
				CommonSearch._xhrReport.abort();
				CommonSearch._xhrReport = null;
			}

			var data = new Object();
			data.checkInOut = '1';
			var kData = $.param(data,true);

			CommonSearch._xhrReport = $.ajax({
				type : "POST",
				url : url,
				dataType: "json",
				data : (kData),
				success : function(data) {
					hideLoadingIcon();
					if(data.error && data.errMsg!= undefined){
						$('#'+ errMsg).html(Warehouse._xuatfileloi + escapeSpecialChar(data.errMsg)).show();
					} else{
						if(data.hasData!= undefined && !data.hasData) {
							$('#'+ errMsg).html(Warehouse._khongcodulieu).show();
						} else{
//							window.location.href = data.view;
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



	checkSaleLevelCatIdInList: function(idSaleCatLevel,listData3){
		if(listData3!=null && listData3.length > 0){
			for(var j=0;j<listData3.length;++j){
				if(listData3[j].idSaleCatLevel == idSaleCatLevel){
					return true;
				}
			}
		}else{
			return false;
		}
	},
	loadAppliedAttribute: function(promotionId){
		if(PromotionCatalog._flagAjaxTabAttribute == true){
			PromotionCatalog._flagAjaxTabAttribute = false;
			Utils.getJSON("/catalog/promotion/applied-attributes?promotionId="+promotionId,function(result){
				PromotionCatalog._flagAjaxTabAttribute = true;
				var promotionStatus = $('#promotionStatus').val();
				var list = result.list;
				if(list!=null){
					for(var k=0;k<list.length;++k){
						//đoạn này viết chung cho 1 attribute
						var objectType = list[k].objectType;
						var objectId = list[k].objectId;
						var name = Utils.XSSEncode(list[k].name);
						var html = '';
						//end đoạn viết chung.
						if(objectType==2){
							html+= '<div>';
							
							html+= '<li>';
							html+= '<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+= '<label class="LabelStyle Label4Style">'+name+'</label>';
							html+= '</li>';
							html+= '<div class="BoxSelect BoxSelect2">';
							html+= '<select id="customerType" style="width: 275px;" class="MySelectBoxClass " multiple="multiple">';
							var listData2 = list[k].listData;
							var arrHtml = new Array();
							if(listData2 != null){
								for(var i=0;i<listData2.length;++i){
									if(listData2[i].checked == 'true'){
										arrHtml.push('<option value="'+ listData2[i].idChannelType +'" selected="selected">'+Utils.XSSEncode(listData2[i].codeChannelType) +'-'+Utils.XSSEncode(listData2[i].nameChannelType)+'</option>');
									}else{
										arrHtml.push('<option value="'+ listData2[i].idChannelType +'">'+Utils.XSSEncode(listData2[i].codeChannelType) +'-'+Utils.XSSEncode(listData2[i].nameChannelType)+'</option>');
									}
								}
							}
							html+= arrHtml.join("");
							html+= '</select>';
							html+= '</div>';
							
							html+= '</div>';
							$('#right').append(html);
							$('#customerType').multipleSelect({
//							 selectAll: true,
					      	 width: '100%',
					      	 checkAll : false
					      	
					  });
//							$('#customerType').dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
//								var text = '';
//								$('#ddcl-customerType-ddw input[type=checkbox]').each(function(){
//									if($(this).attr('checked')=='checked'){
//										text += $(this).next().text().split('-')[0] + ', ';
//									}
//								});
//								if(text != ''){
//									text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
//								}
//								return text;
//							} });
//							$("#customerType").dropdownchecklist("disabled");
						}else if(objectType == 3){
							var listData3 = list[k].listData;
							var objectType = 3;
							var objectId = 0;
							var name = Utils.XSSEncode(PromotionCatalog_doanhSo);
							var html = '';
							//đoạn này hình như là giống nhau trong các trường hợp của objectType:
							html+= '<div id="saleLevel">';//Nhớ đặt id chỗ này để phân biệt, Ví dụ phân biệt: combobox(select)của mức doanh số, của loại khách hàng.
							//phân biệt checkbox của mức doanh số, hay checkbox của loại khách hàng. Sau này bên hàm loadAppliedAttribute mình cũng đặt id
							//chỗ objectType=3 giống thế này mới chạy được.
							
							html+= 	'<li>';
							html+=	'<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+=	'<label class="LabelStyle Label4Style">'+name+'</label>';
							html+=	'</li>';
							//end đoạn giống nhau
							/*for qua cái list, add những label ngành hàng vào. Các lable Ngành hàng thì mình đặt chung 1 class "cat", để sau này mình lặp each
							qua mỗi label, lấy catId(idProductInfoVO)của label đó, và lấy tất cả các mức mà người ta chọn, vậy cái combobox mức nên đặt id theo
							id của ngành hàng.*/
							var listProductInfoVO = list[k].listProductInfoVO;
							if(listProductInfoVO!=null){
								for(var i=0;i<listProductInfoVO.length;++i){
									if(i==0){// if else để canh chỉnh html cho thẳng hàng đó mà.
										//label ngành hàng nên đặt 1 thuộc tính là catId
										html+= '<label catId="'+listProductInfoVO[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label5Style cat">'+Utils.Utils.XSSEncode(listProductInfoVO[i].codeProductInfoVO)+'</label>';
										//add combobox mức vao label nganh hang, combobox nên đặt id theo ngành hàng.
										html+= '<div class="BoxSelect BoxSelect2">';
										html+= '<select id="'+listProductInfoVO[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
										var listSaleLevelCat = listProductInfoVO[i].listSaleCatLevelVO;
										var arrHtml = new Array();
										if(listSaleLevelCat!=null){
											for(var t=0;t<listSaleLevelCat.length;++t){
												var checked = PromotionCatalog.checkSaleLevelCatIdInList(listSaleLevelCat[t].idSaleCatLevel,listData3);
												if(checked == true){
													arrHtml.push('<option value="'+ Utils.XSSEncode(listSaleLevelCat[t].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[t].nameSaleCatLevel) +'</option>');
												}else{
													arrHtml.push('<option value="'+ listSaleLevelCat[t].idSaleCatLevel +'">'+ Utils.XSSEncode(listSaleLevelCat[t].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[t].nameSaleCatLevel) +'</option>');
												}
											}
										}
										html+= arrHtml.join("");
										html+= '</select>';
										html+= '</div>';
									}else{
										
										html+= '<label catId="'+listProductInfoVO[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label6Style">'+Utils.XSSEncode(listProductInfoVO[i].codeProductInfoVO)+'</label>';
										html+= '<div class="BoxSelect BoxSelect2">';
										html+= '<select id="'+listProductInfoVO[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
										var listSaleLevelCat = listProductInfoVO[i].listSaleCatLevelVO;
										var arrHtml = new Array();
										if(listSaleLevelCat!=null){
											for(var t=0;t<listSaleLevelCat.length;++t){
												var checked = PromotionCatalog.checkSaleLevelCatIdInList(listSaleLevelCat[t].idSaleCatLevel,listData3);
												if(checked == true){
													arrHtml.push('<option value="'+ listSaleLevelCat[t].idSaleCatLevel +'" selected="selected">'+ Utils.XSSEncode(listSaleLevelCat[t].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[t].nameSaleCatLevel) +'</option>');
												}else{
													arrHtml.push('<option value="'+ listSaleLevelCat[t].idSaleCatLevel +'">'+ Utils.XSSEncode(listSaleLevelCat[t].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[t].nameSaleCatLevel) +'</option>');
												}
											}
										}
										html+= arrHtml.join("");
										html+= '</select>';
										html+= '</div>';
									}
								}
							}
							
							html+= '</div>';
							$('#right').append(html);
							$('.saleLevelCat').each(function(){
								var id = $(this).attr('id');
								$('#'+id).multipleSelect({
//									 selectAll: true,
							      	 width: '100%',
							      	 checkAll : false
							      	
							  });
//								$('#'+id).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
//									var text = '';
//									$('#ddcl-'+id+'-ddw input[type=checkbox]').each(function(){
//										if($(this).attr('checked')=='checked'){
//											text += $(this).next().text().split('-')[0] + ', ';
//										}
//									});
//									if(text != ''){
//										text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
//									}
//									return text;
//								} });
							});

						}else if(objectType == 1){
							var valueType = list[k].valueType;
							var listData1 = list[k].listData;

							html+= '<div>';
							
							html+= '<li>';
							//thằng input của thuộc tính động cần bỏ valueType vào để sau này xử lý khi lưu.
							html+= '<input valueType="'+valueType+'"  name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+= '<label class="LabelStyle Label4Style">'+name+'</label>';
							html+= '</li>';

							if(listData1!=null){
								if(valueType=="CHARACTER"){
									//Nên đặt id html của text CHARACTER này theo attributeId cộng chuỗi CHARACTER  thì sẽ không bị conflict trong danh sách. Sau này muốn lưu thì
									//select theo attributeId để lấy ra dữ liệu.
									html+= '<input id="'+objectId+'_CHARACTER" type="text" style="width: 377px;" maxlength="250" value="'+Utils.XSSEncode(listData1[0])+'" class="InputTextStyle InputText1Style"/>';
								}else if(valueType=="NUMBER"){
									//Đặt id theo: attributeId_NUMBER_from và attributeId_NUMBER_to:
									var from = '';
									var to = '';
									if(listData1[0]!=null){
										from = listData1[0];
									}
									if(listData1[1]!=null){
										to = listData1[1];
									}
									html+= '<input id="'+objectId+'_NUMBER_from" style="width: 170px;" maxlength="11" type="text" value="'+formatCurrency(from)+'" class="InputTextStyle InputText5Style"/>';
									html+= '<label class="LabelStyle Label7Style">-</label>';
									html+= '<input id="'+objectId+'_NUMBER_to" style="width: 170px;" maxlength="11" type="text" value="'+formatCurrency(to)+'" class="InputTextStyle InputText5Style"/>';
								}else if(valueType=="DATE_TIME"){
									//Đặt id theo: attributeId_DATETIME_from và attributeId_DATETIME_to. Nhớ applyDateTimePicker applyDateTimePicker("#endDate");
									//Mình đặt chung bọn chúng 1 class rồi,applyDateTimePicker cho class đó được không nhỉ. Tí thử.
									var from = '';
									var to = '';
									if(listData1[0]!=null){
										from = listData1[0];
									}
									if(listData1[1]!=null){
										to = listData1[1];
									}
									html+= '<input id="'+objectId+'_DATETIME_from"  style="width: 146px;"  type="text" value="'+from+'" class="InputTextStyle InputText6Style"/>';
									html+= '<label class="LabelStyle Label7Style">-</label>';
									html+= '<input id="'+objectId+'_DATETIME_to" style="width: 146px;"  type="text" value="'+to+'" class="InputTextStyle InputText6Style"/>';
								}else if(valueType=="CHOICE" || valueType=="MULTI_CHOICE"){
									var arrHtml = new Array();
									html+= '<div class="BoxSelect BoxSelect2">';
									html+= '<select id="'+objectId+'" class="MySelectBoxClass" multiple="multiple">';
									for(var i=0;i<listData1.length;++i){
										if(listData1[i].checked == true || listData1[i].checked == 'true'){
											arrHtml.push('<option value="'+ listData1[i].attributeId +'" selected="selected">'+Utils.XSSEncode(listData1[i].code)+'-'+Utils.XSSEncode(listData1[i].name) +'</option>');
										}else{
											arrHtml.push('<option value="'+ listData1[i].attributeId +'">'+Utils.XSSEncode(listData1[i].code)+'-'+Utils.XSSEncode(listData1[i].name)+'</option>');
										}
									}
									html+= arrHtml.join("");
									html+= '</select>';
									html+= '</div>';
								}
							}
							
							html+= '</div>';
							$('#right').append(html);
							$('#'+objectId).multipleSelect({
//								 selectAll: true,
						      	 width: '100%',
						      	 checkAll : false
						      	
						  });
//							$('#'+objectId).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
//								var text = '';
//								$('#ddcl-'+objectId+'-ddw input[type=checkbox]').each(function(){
//									if($(this).attr('checked')=='checked'){
//										text += $(this).next().text().split('-')[0] + ', ';
//									}
//								});
//								if(text != ''){
//									text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
//								}
//								return text;
//							} });
							//dự thảo thì ko disable
							applyDateTimePicker('#'+objectId+'_DATETIME_from');
							applyDateTimePicker('#'+objectId+'_DATETIME_to');
							Utils.bindFormatOnTextfield(objectId+'_NUMBER_from',Utils._TF_NUMBER);
							Utils.formatCurrencyFor(objectId+'_NUMBER_from');
							Utils.bindFormatOnTextfield(objectId+'_NUMBER_to',Utils._TF_NUMBER);
							Utils.formatCurrencyFor(objectId+'_NUMBER_to');
						}
					}
				}
				//Update CSS co the sai sot khi thay doi cau truc cua left componant
				$('#left li input[type="checkbox"]').each(function() {
					$(this).parent().wrap('<div class="row marginBottom10"></div>');
					//add class col3 cho <li>
					$(this).parent().addClass('col-sm-12 noPaddingLeft');
					//Add col9 cho cac element tiep theo trong div $0
					$(this).next('label').andSelf().wrapAll('<label class="el-checkbox el-checkbox-lg"></label>');	
					$( this ).next('label').replaceWith( '<span class="el-checkbox-style el-lebel" tabindex="20" >' + $( this ).next('label').text() + "</span>" );
				});
				//Update css
//				$('#proCusAtt div li input[type="checkbox"]').each(function() {
				$('#proCusAtt #right div').has('li input[type="checkbox"] ').each(function() {
					$(this).children('li:first').addClass('atbRightColFirst col-sm-3 noPaddingLeft');
					//Add col9 cho cac element tiep theo trong div $0
					if( !$(this).children('li:first').next().is('.atbRightColSecond') ){
						$(this).children('li:first').nextAll().wrapAll('<div class="atbRightColSecond col-sm-9 columNoPadding" ></div>');
						
					}
				});
				$('#proCusAtt #right .atbRightColFirst').each(function() {
					$(this).parent().addClass('row marginBottom10');
				});
//				if( $('#proCusAtt #right .atbRightColFirst input[type="checkbox"] + label').next().is('label') ) {
				if( $('#proCusAtt #right .atbRightColFirst input[type="checkbox"] + label') ) {
					$('#proCusAtt #right .atbRightColFirst input[type="checkbox"] + label').each(function() {
						$(this).prev().andSelf().wrapAll('<label class="el-checkbox el-checkbox-lg"></label>'); 
						//span de hien thi checkbox blue
						$(this).replaceWith( '<span class="el-checkbox-style el-lebel" tabindex="20" >' + $(this ).text() + "</span>" );
					});
				}
			$('#proCusAtt #right .atbRightColSecond input[type="text"]').each(function() {
				$(this).removeClass().addClass('form-control');
			});
			
//			$('#proCusAtt #right .atbRightColSecond div').has(".hasDatepicker").each(function() { 
//				$(this).children('input[type="text"]').removeClass('InputTextStyle').addClass('form-control');
//			});
			$('#proCusAtt #right .atbRightColSecond div > select').each(function() {
				$(this).parent().addClass('input-group form-group customPulldow widthFull');
				$(this).next().addClass('form-control');
				$(this).next('span').children().addClass('InputFileStyle');
				if( $(this).parent().children('.input-group-addon').length == 0 ) {
					$(this).parent().append('<label class="input-group-addon"><label class="fa fa-angle-down"></label></label>' )
				}
			});
				//ko dự thảo thì disable.
				if(!AllowEditProPgram.isEditProPgramPer() || promotionStatus != 2){
//					$("#right .MySelectBoxClass").dropdownchecklist("disable");
					$("#right .MySelectBoxClass").multipleSelect("disable");
					$("#right :input").attr('disabled',true);
					$("#left :input").attr('disabled',true);
					$('#updateCustomerAttribute').hide();
					$('#right .CalendarLink').hide();
				}
			});
		}
	},
	toSelectAttributes: function(){
		var listObjectType= new Array();
		var listObjectId= new Array();
		$('#left :checkbox').each(function(){
			if($(this).is(':checked')){
				//remove ben left, show ben right
				$(this).closest(".row").remove();
				var objectType = $(this).attr('objectType');
				var objectId = $(this).attr('objectId');
				listObjectType.push(objectType);
				if(objectType == 2 || objectType == 3){
					listObjectId.push(0);
				}else{
					listObjectId.push(objectId);
				}
			}
		});
		var data = new Object();
		data.listObjectType = listObjectType;
		data.listObjectId = listObjectId;
		var kData = $.param(data, true);
		Utils.getJSON("/catalog/promotion/all-data-attributes",kData,function(result){
			var listOut = result.list;
			if(listOut!=null){
				for(var h=0;h<listOut.length;++h){
					var objectType = listOut[h].objectType;
					var objectId = listOut[h].objectId;
					var html = '';
					if(objectType == 2){
						var name = Utils.XSSEncode(PromotionCatalog_typeClient);
						html+= '<div>';
						
						html+= '<li>';
						html+= '<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
						html+= '<label class="LabelStyle Label4Style">'+name+'</label>';
						html+= '</li>';
						html+= '<div class="BoxSelect BoxSelect2">';
						html+= '<select id="customerType" style="width: 275px;" class="MySelectBoxClass" multiple="multiple">';
						var list = listOut[h].listData;
						var arrHtml = new Array();
						if(list!=null){
							for(var i=0;i<list.length;++i){
								arrHtml.push('<option value="'+ list[i].idChannelType +'">'+Utils.XSSEncode(list[i].codeChannelType)  +'-'+Utils.XSSEncode(list[i].nameChannelType)+'</option>');
							}
						}
						html+= arrHtml.join("");
						html+= '</select>';
						html+= '</div>';
//						
						html+= '</div>';
						$('#right').append(html);
						$('#customerType').multipleSelect({
//							 selectAll: true,
					      	 width: '100%',
					      	 checkAll : false
					      	
					  });
//						$('#customerType').dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
//							var text = '';
//							$('#ddcl-customerType-ddw input[type=checkbox]').each(function(){
//								if($(this).attr('checked')=='checked'){
//									text += $(this).next().text().split('-')[0] + ', ';
//								}
//							});
//							if(text != ''){
//								text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
//							}
//							return text;
//						} });
					}else if(objectType == 3){
						var name = Utils.XSSEncode(PromotionCatalog_doanhSo);
						html+= '<div id="saleLevel">';
						
						html+= 	'<li>';
						html+=	'<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
						html+=	'<label class="LabelStyle Label4Style">'+name+'</label>';
						html+=	'</li>';
						var list = listOut[h].listProductInfoVO;//result.list;
						if(list!=null){
							for(var i=0;i<list.length;++i){
								if(i==0){// if else để canh chỉnh html cho thẳng hàng đó mà.
									//label ngành hàng nên đặt 1 thuộc tính là catId
									html+= '<label catId="'+list[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label5Style cat">'+Utils.XSSEncode(list[i].codeProductInfoVO)+'</label>';
									//add combobox mức vao label nganh hang, combobox nên đặt id theo ngành hàng.
									html+= '<div class="BoxSelect BoxSelect2">';
									html+= '<select id="'+list[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
									var listSaleLevelCat = list[i].listSaleCatLevelVO;
									var arrHtml = new Array();
									if(listSaleLevelCat!=null){
										for(var k=0;k<listSaleLevelCat.length;++k){
											arrHtml.push('<option value="'+ listSaleLevelCat[k].idSaleCatLevel +'">'+ Utils.XSSEncode(listSaleLevelCat[k].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[k].nameSaleCatLevel) +'</option>');
										}
									}
									html+= arrHtml.join("");
									html+= '</select>';
									html+= '</div>';
								}else{
									
									html+= '<label catId="'+list[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label6Style" >'+Utils.XSSEncode(list[i].codeProductInfoVO)+'</label>';
									//add combobox mức vao label nganh hang, combobox nên đặt id theo ngành hàng.
									html+= '<div class="BoxSelect BoxSelect2">';
									html+= '<select id="'+list[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
									var listSaleLevelCat = list[i].listSaleCatLevelVO;
									var arrHtml = new Array();
									if(listSaleLevelCat!=null){
										for(var k=0;k<listSaleLevelCat.length;++k){
											arrHtml.push('<option value="'+ listSaleLevelCat[k].idSaleCatLevel +'">'+ Utils.XSSEncode(listSaleLevelCat[k].codeSaleCatLevel) +'-'+Utils.XSSEncode(listSaleLevelCat[k].nameSaleCatLevel) +'</option>');
										}
									}
									html+= arrHtml.join("");
									html+= '</select>';
									html+= '</div>';
								}
							}
						}
						
						html+= '</div>';
						$('#right').append(html);
						$('.saleLevelCat').each(function(){
							var id = $(this).attr('id');
							$('#'+id).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
								var text = '';
								$('#ddcl-'+id+'-ddw input[type=checkbox]').each(function(){
									if($(this).attr('checked')=='checked'){
										text += $(this).next().text().split('-')[0] + ', ';
									}
								});
								if(text != ''){
									text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
								}
								return text;
							} });
						});

					}else if(objectType == 1){
						var name = Utils.XSSEncode(listOut[h].name);
						var valueType = listOut[h].valueType;
						html+= '<div>';
						
						html+= 	'<li>';
						//thằng input của thuộc tính động cần bỏ valueType vào để sau này xử lý khi lưu.
						html+=	'<input valueType="'+valueType+'" name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
						html+=	'<label class="LabelStyle Label4Style">'+name+'</label>';
						html+=  '</li>';
						//Chia các trường hợp theo valueType của attributeId
						if(valueType=="CHARACTER"){
							//Nên đặt id html của text CHARACTER này theo attributeId cộng chuỗi CHARACTER  thì sẽ không bị conflict trong danh sách. Sau này muốn lưu thì
							//select theo attributeId để lấy ra dữ liệu.

							html+= '<input id="'+objectId+'_CHARACTER" type="text" style="width: 377px;" maxlength="250" class="InputTextStyle InputText1Style"/>';
						}else if(valueType=="NUMBER"){
							html+= '<input id="'+objectId+'_NUMBER_from" type="text" style="width: 170px;" maxlength="11" class="InputTextStyle InputText5Style"/>';
							html+= '<label class="LabelStyle Label7Style">-</label>';
							html+= '<input id="'+objectId+'_NUMBER_to" type="text" style="width: 170px;" maxlength="11" class="InputTextStyle InputText5Style"/>';
						}else if(valueType=="DATE_TIME"){
							html+= '<input id="'+objectId+'_DATETIME_from" style="width: 146px;" type="text" class="InputTextStyle InputText6Style "/>';
							html+= '<label class="LabelStyle Label7Style">-</label>';
							html+= '<input id="'+objectId+'_DATETIME_to" style="width: 146px;" type="text" class="InputTextStyle InputText6Style "/>';
						}else if(valueType=="CHOICE" || valueType=="MULTI_CHOICE"){
							var list = listOut[h].listData;
							var arrHtml = new Array();
							html+= '<div class="BoxSelect BoxSelect2">';
							html+= '<select id="'+objectId+'" class="MySelectBoxClass" multiple="multiple">';
							if(list!=null){
								for(var i=0;i<list.length;++i){
									arrHtml.push('<option value="'+ list[i].attributeId +'">'+Utils.XSSEncode(list[i].code)+'-'+Utils.XSSEncode(list[i].name)+'</option>');
								}
							}
							html+= arrHtml.join("");
							html+= '</select>';
							html+= '</div>';
						}
						
						html+= '</div>';
						$('#right').append(html);
						$('#'+objectId).multipleSelect({
//							 selectAll: true,
					      	 width: '100%',
					      	 checkAll : false
					      	
					  });
//						$('#'+objectId).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
//							var text = '';
//							$('#ddcl-'+objectId+'-ddw input[type=checkbox]').each(function(){
//								if($(this).attr('checked')=='checked'){
//									text += $(this).next().text().split('-')[0] + ', ';
//								}
//							});
//							if(text != ''){
//								text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
//							}
//							return text;
//						} });
						applyDateTimePicker('#'+objectId+'_DATETIME_from');
						applyDateTimePicker('#'+objectId+'_DATETIME_to');
						Utils.bindFormatOnTextfield(objectId+'_NUMBER_from',Utils._TF_NUMBER);
						Utils.formatCurrencyFor(objectId+'_NUMBER_from');
						Utils.bindFormatOnTextfield(objectId+'_NUMBER_to',Utils._TF_NUMBER);
						Utils.formatCurrencyFor(objectId+'_NUMBER_to');
//						Utils.bindFormatOnTextfield('valuePay',Utils._TF_NUMBER);
//						Utils.formatCurrencyFor('valuePay');
					}
				}
			}
			//Update css
//			$('#proCusAtt div li input[type="checkbox"]').each(function() {
			$('#proCusAtt #right div').has('li input[type="checkbox"] ').each(function() {
//				$(this).addClass('row marginBottom10');
				//add class col3 cho <li> atbRightCol1 de phan biet
				$(this).children('li:first').addClass('atbRightColFirst col-sm-3 noPaddingLeft');
				//Add col9 cho cac element tiep theo trong div $0
				if( !$(this).children('li:first').next().is('.atbRightColSecond') ){
					$(this).children('li:first').nextAll().wrapAll('<div class="atbRightColSecond col-sm-9 columNoPadding" ></div>');
					
				}
			});
			$('#proCusAtt #right .atbRightColFirst').each(function() {
				$(this).parent().addClass('row marginBottom10');
			});
//			if( $('#proCusAtt #right .atbRightColFirst input[type="checkbox"] + label').next().is('label') ) {
			if( $('#proCusAtt #right .atbRightColFirst input[type="checkbox"] + label') ) {
				$('#proCusAtt #right .atbRightColFirst input[type="checkbox"] + label').each(function() {
					$(this).prev().andSelf().wrapAll('<label class="el-checkbox el-checkbox-lg"></label>'); 
					//span de hien thi checkbox blue
					$(this).replaceWith( '<span class="el-checkbox-style el-lebel">' + $(this ).text() + "</span>" );
				});
			}
		$('#proCusAtt #right .atbRightColSecond input[type="text"]').each(function() {
			$(this).removeClass().addClass('form-control');
		});
		
//		$('#proCusAtt #right .atbRightColSecond div').has(".hasDatepicker").each(function() { 
//			$(this).children('input[type="text"]').removeClass('InputTextStyle').addClass('form-control');
//		});
		$('#proCusAtt #right .atbRightColSecond div > select').each(function() {
			$(this).parent().addClass('input-group form-group customPulldow widthFull');
			$(this).next().addClass('form-control');
			$(this).next('span').children().addClass('InputFileStyle');
			if( $(this).parent().children('.input-group-addon').length == 0 ) {
				$(this).parent().append('<label class="input-group-addon"><label class="fa fa-angle-down"></label></label>' )
			}
		});
			//End update css
		});
	},
	toSelectAttribute: function(){
		$('#left :checkbox').each(function(){
			if($(this).is(':checked')){
				//remove ben left, show ben right
				$(this).parent().remove();
				var objectType = $(this).attr('objectType');
				var objectId = $(this).attr('objectId');
				var name = $(this).attr('name');
				var html = '';
				if(objectType == 2){

					Utils.getJSON("/catalog/promotion/all-data-attribute?objectTypeOfAttribute="+objectType,function(result){
						if(result.error == false){
							/*
							Khi chọn 1 thuộc tính từ trái qua phải, ta sẽ add thêm vào container right 1 cấu trúc html như sau:
							<div>
								<div class="Clear"></div>
								<li><input name=name objectType=objectType objectId=objectId type="checkbox" class="InputCbxStyle checkBoxAttribute"/>
								<label class="LabelStyle Label3Style">name</label></li>
								<select class="MySelectBoxClass">
									<option value ...
									<option value ...
								</select>
								<div class="Clear"></div>
							</div>
							*/
							html+= '<div>';
							
							html+= '<li>';
							html+= '<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+= '<label class="LabelStyle Label4Style">'+name+'</label>';
							html+= '</li>';
							//Ứng với mỗi cái được check, mình load dữ liệu cho nó,
							//Nếu objectType=2 thì load danh sách cho combobox.
							html+= '<div class="BoxSelect BoxSelect2">';
							html+= '<select id="customerType" style="width: 275px;" class="MySelectBoxClass" multiple="multiple">';
							var list = result.list;
							var arrHtml = new Array();
							/*arrHtml.push('<option value="-2" selected="selected">---Chọn loại khách hàng---</option>');*/
							if(list!=null){
								for(var i=0;i<list.length;++i){
									arrHtml.push('<option value="'+ list[i].idChannelType +'">'+Utils.XSSEncode(list[i].codeChannelType)  +'-'+Utils.XSSEncode(list[i].nameChannelType)+'</option>');
								}
							}
							html+= arrHtml.join("");
							html+= '</select>';
							html+= '</div>';
							
							html+= '</div>';
							/*ta cần đặt id chỗ combobox để customStyle:
							Nếu objectType=2(loại khách hàng) thì nó tĩnh nên ta đặt id là customerType
							Nếu objectType=3(mức doanh số)thì nó có các combobox mức theo ngành, khi đó nên đặt bọn chúng chung 1 class là 'saleLevelCat'
							để customerStyle 1 lượt, và các combobox này ta nên đặt id theo ngành hàng để sau này biết đường lưu các mức theo ngành.
							Nếu objectType=1, valueType>3 thì mình cũng cần customeStyle, khi đó nên đặt id của combobox đó theo attributeId nhé.*/
							$('#right').append(html);
							$('#customerType').multipleSelect({
//								 selectAll: true,
						      	 width: '100%',
						      	 checkAll : false
						      	
						  });
//							$('#customerType').dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
//								var text = '';
//								$('#ddcl-customerType-ddw input[type=checkbox]').each(function(){
//									if($(this).attr('checked')=='checked'){
//										text += $(this).next().text().split('-')[0] + ', ';
//									}
//								});
//								if(text != ''){
//									text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
//								}
//								return text;
//							} });

						}
					});
				}else if(objectType == 3){
					Utils.getJSON("/catalog/promotion/all-data-attribute?objectTypeOfAttribute="+objectType,function(result){
						if(result.error == false){
							//đoạn này hình như là giống nhau trong các trường hợp của objectType:
							html+= '<div id="saleLevel">';//Nhớ đặt id chỗ này để phân biệt, Ví dụ phân biệt: combobox(select)của mức doanh số, của loại khách hàng.
							//phân biệt checkbox của mức doanh số, hay checkbox của loại khách hàng. Sau này bên hàm loadAppliedAttribute mình cũng đặt id
							//chỗ objectType=3 giống thế này mới chạy được.
							
							html+= 	'<li>';
							html+=	'<input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+=	'<label class="LabelStyle Label4Style">'+name+'</label>';
							html+=	'</li>';
							//end đoạn giống nhau
							var list = result.list;
							if(list!=null){
								for(var i=0;i<list.length;++i){
									if(i==0){// if else để canh chỉnh html cho thẳng hàng đó mà.
										//label ngành hàng nên đặt 1 thuộc tính là catId
										html+= '<label catId="'+list[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label5Style cat">'+list[i].codeProductInfoVO+'</label>';
										//add combobox mức vao label nganh hang, combobox nên đặt id theo ngành hàng.
										html+= '<div class="BoxSelect BoxSelect2">';
										html+= '<select id="'+list[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
										var listSaleLevelCat = result.list[i].listSaleCatLevelVO;
										var arrHtml = new Array();
										if(listSaleLevelCat!=null){
											for(var k=0;k<listSaleLevelCat.length;++k){
												arrHtml.push('<option value="'+ listSaleLevelCat[k].idSaleCatLevel +'">'+ listSaleLevelCat[k].codeSaleCatLevel +'-'+listSaleLevelCat[k].nameSaleCatLevel +'</option>');
											}
										}
										html+= arrHtml.join("");
										html+= '</select>';
										html+= '</div>';
									}else{
										
										html+= '<label catId="'+list[i].idProductInfoVO +'" style="width: 150px;" class="LabelStyle Label6Style" >'+list[i].codeProductInfoVO+'</label>';
										//add combobox mức vao label nganh hang, combobox nên đặt id theo ngành hàng.
										html+= '<div class="BoxSelect BoxSelect2">';
										html+= '<select id="'+list[i].idProductInfoVO +'" class="MySelectBoxClass saleLevelCat" multiple="multiple">';
										var listSaleLevelCat = result.list[i].listSaleCatLevelVO;
										var arrHtml = new Array();
										if(listSaleLevelCat!=null){
											for(var k=0;k<listSaleLevelCat.length;++k){
												arrHtml.push('<option value="'+ listSaleLevelCat[k].idSaleCatLevel +'">'+ listSaleLevelCat[k].codeSaleCatLevel +'-'+listSaleLevelCat[k].nameSaleCatLevel +'</option>');
											}
										}
										html+= arrHtml.join("");
										html+= '</select>';
										html+= '</div>';
									}
								}
							}
							
							html+= '</div>';
							$('#right').append(html);
							$('.saleLevelCat').each(function(){
								var id = $(this).attr('id');
								$('#'+id).multipleSelect({
//									 selectAll: true,
							      	 width: '100%',
							      	 checkAll : false
							      	
							  });
//								$('#'+id).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
//									var text = '';
//									$('#ddcl-'+id+'-ddw input[type=checkbox]').each(function(){
//										if($(this).attr('checked')=='checked'){
//											text += $(this).next().text().split('-')[0] + ', ';
//										}
//									});
//									if(text != ''){
//										text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
//									}
//									return text;
//								} });
							});
						}
					});
				}else if(objectType == 1){
					Utils.getJSON("/catalog/promotion/all-data-attribute?objectTypeOfAttribute="+objectType+"&attributeId=" +objectId,function(result){
						if(result.error == false){
							var valueType = result.valueType;
							//đoạn này hình như là giống nhau trong các trường hợp của objectType:
							html+= '<div>';
							
							html+= 	'<li>';
							//thằng input của thuộc tính động cần bỏ valueType vào để sau này xử lý khi lưu.
							html+=	'<input valueType="'+valueType+'" name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle checkBoxAttribute"/>';
							html+=	'<label class="LabelStyle Label4Style">'+name+'</label>';
							html+=  '</li>';
							//end đoạn giống nhau
							//Chia các trường hợp theo valueType của attributeId
							if(valueType=="CHARACTER"){
								//Nên đặt id html của text CHARACTER này theo attributeId cộng chuỗi CHARACTER  thì sẽ không bị conflict trong danh sách. Sau này muốn lưu thì
								//select theo attributeId để lấy ra dữ liệu.
								html+= '<input id="'+objectId+'_CHARACTER" type="text" style="width: 377px;" maxlength="250" class="InputTextStyle InputText1Style"/>';
							}else if(valueType=="NUMBER"){
								html+= '<input id="'+objectId+'_NUMBER_from" type="text" style="width: 170px;" maxlength="11" class="InputTextStyle InputText5Style"/>';
								html+= '<label class="LabelStyle Label7Style">-</label>';
								html+= '<input id="'+objectId+'_NUMBER_to" type="text" style="width: 170px;" maxlength="11" class="InputTextStyle InputText5Style"/>';
							}else if(valueType=="DATE_TIME"){
								html+= '<input id="'+objectId+'_DATETIME_from" style="width: 146px;" type="text" class="InputTextStyle InputText6Style "/>';
								html+= '<label class="LabelStyle Label7Style">-</label>';
								html+= '<input id="'+objectId+'_DATETIME_to" style="width: 146px;" type="text" class="InputTextStyle InputText6Style "/>';
							}else if(valueType=="CHOICE" || valueType=="MULTI_CHOICE"){
								var list = result.list;
								var arrHtml = new Array();
								html+= '<div class="BoxSelect BoxSelect2">';
								html+= '<select id="'+objectId+'" class="MySelectBoxClass" multiple="multiple">';
								if(list!=null){
									for(var i=0;i<list.length;++i){
										arrHtml.push('<option value="'+ list[i].attributeId +'">'+Utils.XSSEncode(list[i].code)+'-'+Utils.XSSEncode(list[i].name) +'</option>');
									}
								}
								html+= arrHtml.join("");
								html+= '</select>';
								html+= '</div>';
							}
							
							html+= '</div>';
							$('#right').append(html);
							$('#'+objectId).multipleSelect({
//								 selectAll: true,
						      	 width: '100%',
						      	 checkAll : false
						      	
						  });
//							$('#'+objectId).dropdownchecklist({ maxDropHeight: 150,width: 277, textFormatFunction: function(options){
//								var text = '';
//								$('#ddcl-'+objectId+'-ddw input[type=checkbox]').each(function(){
//									if($(this).attr('checked')=='checked'){
//										text += $(this).next().text().split('-')[0] + ', ';
//									}
//								});
//								if(text != ''){
//									text = text.substring(0, text.length-2);//bo dau ', ' cuoi cung.
//								}
//								return text;
//							} });
							applyDateTimePicker('#'+objectId+'_DATETIME_from');
							applyDateTimePicker('#'+objectId+'_DATETIME_to');
						}
					});
				}
			}
		});

	},
	toRemoveAttribute: function(){
		var html = '';//để bên ngoài vòng for là đúng. Còn bên hàm toSelectAttribute thì phải để bên trong do cuộc gọi bất đồng bộ
		$('#right .checkBoxAttribute').each(function(){
			if($(this).is(':checked')){
				//remove ben right, show ben left by row
//				$(this).parent().parent().remove();
				//
				$(this).closest(".row").remove();

				var objectType = $(this).attr('objectType');
				var objectId = $(this).attr('objectId');
				var name = $(this).attr('name');
				html+= '<div class="row marginBottom10"><li class="col-sm-12 noPaddingLeft"> <label class="el-checkbox el-checkbox-lg"><input name="'  + name + '" objectType="'+ objectType +'" objectId="'+objectId +'" type="checkbox"  class="InputCbxStyle "/><span class="el-checkbox-style el-lebel">'+name+'</span></label></li></div>';
				//Update CSS co the sai sot khi thay doi cau truc cua left componant
			}
		});
		$('#left').append(html);//để bên ngoài vòng for là đúng. Còn bên hàm toSelectAttribute thì phải để bên trong do cuộc gọi bất đồng bộ
	},
	//end me
	getGridUrl: function(promotionCode,typeCode,shopCode,promotionName,startDate,endDate,status,proType,expiry){
		if (status == undefined || status == null){
			status = 1;
		}
		return WEB_CONTEXT_PATH + "/catalog/promotion/search?promotionCode=" + encodeChar(promotionCode) + "&lstApParamId=" + typeCode + "&shopCode=" + encodeChar(shopCode) + "&promotionName=" + encodeChar(promotionName) + "&startDate=" + encodeChar(startDate) + "&endDate=" + encodeChar(endDate) + "&status=" + encodeChar(status) + "&proType=" + encodeChar(proType)+ "&expiry=" + encodeChar(expiry);
	},
	getProductGridUrl: function(promotionId,productCode,isCompel,amountBuy,totalBuyMoney,totalDiscountMoney,percentDiscountMoney,discountProduct,discountAmount){
		var param = '';
		if(isCompel != null && isCompel != undefined){
			param = "&isCompel=" + encodeChar(isCompel);
		}
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchproduct?promotionId="+ encodeChar(promotionId) + "&productCode=" + encodeChar(productCode) + param + "&amountBuy=" + encodeChar(amountBuy) + "&totalBuyMoney=" + encodeChar(totalBuyMoney) + "&totalDiscountMoney=" + encodeChar(totalDiscountMoney) + "&percentDiscountMoney=" + encodeChar(percentDiscountMoney) + "&discountProduct=" + encodeChar(discountProduct) + "&discountAmount=" + encodeChar(discountAmount);
	},
	getGridZV01Url: function(promotionId,apParamCode){//01-02-04-05
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV01?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV03Url: function(promotionId,apParamCode){//03-06
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV03?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV03DetailUrl: function(promotionId,productId,quantity,apParamCode){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV03Detail?promotionId="+ encodeChar(promotionId)+"&productId="+ encodeChar(productId)+"&quantityMax="+ encodeChar(quantity)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV07Url: function(promotionId,apParamCode){//07-08-10-11
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV07?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV07DetailUrl: function(promotionId,quantity,discountAmount,apParamCode){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV07Detail?promotionId="+ encodeChar(promotionId)+"&quantityMax="+ encodeChar(quantity)+"&discountAmount="+ encodeChar(discountAmount)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV09Url: function(promotionId,apParamCode){//09-12-15-18
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV09?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV09SaleDetailUrl: function(promotionId,quantity,apParamCode,codeString){
		var param = '';
		if(codeString != '' && codeString != null){
			param = "&productCode="+ encodeChar(codeString);
		}
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV09SaleDetail?promotionId="+ encodeChar(promotionId)+"&quantityMax="+ encodeChar(quantity)+"&apParamCode="+ encodeChar(apParamCode)+param;
	},
	getGridZV09FreeDetailUrl: function(promotionId,quantity,apParamCode,codeString){
		var param = '';
		if(codeString != '' && codeString != null){
			param = "&productCode="+ encodeChar(codeString);
		}
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV09FreeDetail?promotionId="+ encodeChar(promotionId)+"&quantityMax="+ encodeChar(quantity)+"&apParamCode="+ encodeChar(apParamCode)+param;
	},
	getGridZV13Url: function(promotionId,apParamCode){//13-14-16-17
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV13?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV13DetailUrl: function(promotionId,discountAmount,apParamCode){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV13Detail?promotionId="+ encodeChar(promotionId)+"&discountAmount="+ encodeChar(discountAmount)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV19Url: function(promotionId,apParamCode){//19-20
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV19?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV21Url: function(promotionId,apParamCode){//21
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV21?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV21DetailUrl: function(promotionId,discountAmount,apParamCode){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV21Detail?promotionId="+ encodeChar(promotionId)+"&discountAmount="+ encodeChar(discountAmount)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getGridZV22Url: function(promotionId,apParamCode){//22
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchZV22?promotionId="+ encodeChar(promotionId)+"&apParamCode="+ encodeChar(apParamCode);
	},
	getSearchProductGridUrl: function(promotionId,productCode,isCompel,amountBuy,totalBuyMoney,totalDiscountMoney,percentDiscountMoney,discountProduct,discountAmount){
		var param = '';
		if(isCompel != null && isCompel != undefined){
			param = "&isCompel=" + encodeChar(isCompel);
		}
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchproduct?promotionId="+ encodeChar(promotionId) + "&productCode=" + encodeChar(productCode) + param + "&amountBuyS=" + encodeChar(amountBuy) + "&totalBuyMoneyS=" + encodeChar(totalBuyMoney) + "&totalDiscountMoneyS=" + encodeChar(totalDiscountMoney) + "&percentDiscountMoneyS=" + encodeChar(percentDiscountMoney) + "&discountProductS=" + encodeChar(discountProduct) + "&discountAmountS=" + encodeChar(discountAmount);
	},
	getShopGridUrl: function(promotionId,shopCode,shopName,quantityMax,status){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchshop?promotionId="+ encodeChar(promotionId) + "&shopCode=" + encodeChar(shopCode) + "&shopName=" + encodeChar(shopName) + "&quantityMax=" + encodeChar(quantityMax) + "&status=" + status;
	},
	getSearchShopGridUrl: function(promotionId,shopCode,shopName,quantityMax){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchshop?promotionId="+ encodeChar(promotionId) + "&shopCode=" + encodeChar(shopCode) + "&shopName=" + encodeChar(shopName) + "&quantityMaxS=" + encodeChar(quantityMax);
	},
	getCustomerGridUrlDialog: function(promotionId,shopId,customerCode,customerName){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchcustomerdialog?promotionId="+ encodeChar(promotionId) + "&shopId=" + encodeChar(shopId) + "&customerCode=" + encodeChar(customerCode) + "&customerName=" + encodeChar(customerName);
	},
	getCustomerGridUrl: function(promotionId,shopId,customerCode,customerName,quantityMax,quantityReceive,status){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchcustomer?promotionId="+ encodeChar(promotionId)+ "&shopId=" + encodeChar(shopId) + "&customerCode=" + encodeChar(customerCode) + "&customerName=" + encodeChar(customerName)+ "&quantityMax=" + encodeChar(quantityMax) + "&quantityReceive=" + encodeChar(quantityReceive) + "&status=" + status;
	},
	getSearchCustomerGridUrl: function(promotionId,shopId,customerCode,customerName,quantityMax,quantityReceive,status){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchcustomer?promotionId="+ encodeChar(promotionId)+ "&shopId=" + encodeChar(shopId) + "&customerCode=" + encodeChar(customerCode) + "&customerName=" + encodeChar(customerName)+ "&quantityMaxS=" + encodeChar(quantityMax) + "&quantityReceiveS=" + encodeChar(quantityReceive) + "&statusS=" + status;
	},
	getCustomerTypeGridUrl: function(promotionId,shopId,customerTypeCode,customerTypeName,quantityMax,quantityReceive,status){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchcustomer?promotionId="+ encodeChar(promotionId) + "&shopId=" + encodeChar(shopId) + "&customerTypeCode=" + encodeChar(customerTypeCode) + "&customerTypeName=" + encodeChar(customerTypeName)+ "&quantityMax=" + encodeChar(quantityMax)+ "&quantityReceive=" + encodeChar(quantityReceive) + "&status=" + status;
	},
	getSearchCustomerTypeGridUrl: function(promotionId,shopId,customerTypeCode,customerTypeName,quantityMax,quantityReceive,status){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchcustomer?promotionId="+ encodeChar(promotionId) + "&shopId=" + encodeChar(shopId) + "&customerTypeCode=" + encodeChar(customerTypeCode) + "&customerTypeName=" + encodeChar(customerTypeName)+ "&quantityMaxS=" + encodeChar(quantityMax)+ "&quantityReceiveS=" + encodeChar(quantityReceive) + "&statusS=" + status;
	},
	getSearchChangeInfoGridUrl: function(promotionId,fromDate,toDate){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchchangeinfo?promotionId="+ encodeChar(promotionId) + "&fromDate=" + encodeChar(fromDate) + "&toDate=" + encodeChar(toDate);
	},
	getSearchActionGridUrl: function(actionId){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchaction?actionId="+ encodeChar(actionId);
	},
	search: function(){
		$('#errMsg').html('').hide();
		$('#errExcelMsg').html('').hide();
		$('#fakefilepc').val('');
		$('#excelFile').val('');
		var promotionCode = $('#promotionCode').val().trim();
		var lstApParamId = [];
		if($('#typeCode').val() == '' || $('#typeCode').val() == null){
			lstApParamId.push(-1);
		}else{
			var size = $('#typeCode').val().length;
			for(var i = 0;i<size;i++){
				lstApParamId.push($('#typeCode').val()[i]);
			}
		}
		var shopCode = '';
		var promotionName = $('#promotionName').val().trim();
		var startDate = $('#startDate').val().trim();
		var endDate = $('#endDate').val().trim();
		var status = 1;
		var expiry = 1;
		if($('#isAllowEditProPgram').val() == 'true' ){
			status = $('#status').val().trim();
			if(status == 3){
				status = 1;
				expiry = 0;
			}
		}
		var proType = $("#proType").val();
		var msg = '';
		if (startDate != '' && !Utils.isDate(startDate)) {
			msg = msgCommonErr1;
			$('#startDate').focus();
		}
		if(msg.length == 0){
			if(endDate != '' && !Utils.isDate(endDate)){
				msg = msgCommonErr2;
				$('#endDate').focus();
			}
		}
		if(msg.length == 0){
			if(startDate != '' && endDate != ''){
				if(!Utils.compareDate(startDate, endDate)){
					msg = msgCommonErr3;
				}
			}
		}
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			return false;
		}
		var tm = setTimeout(function() {
			$('#promotionCode').focus();
		}, 500);
		var url = PromotionCatalog.getGridUrl(promotionCode,lstApParamId,shopCode,promotionName,startDate,endDate,status,proType,expiry);
		$('#grid').datagrid({url: url,pageNumber : 1} );
		if($('#proType').val() == 1){
			$('.datagrid-header-row td[field="promotionProgramCode"] .datagrid-cell span').html(msgMaCKTM);
			$('.datagrid-header-row td[field="promotionProgramName"] .datagrid-cell span').html(msgTenCKTM);
			$('.datagrid-header-row td[field="type"] .datagrid-cell span').html(msgLoaiCKTM);
		}else{
			$('.datagrid-header-row td[field="promotionProgramCode"] .datagrid-cell span').html(msgMaCKHTTM);
			$('.datagrid-header-row td[field="promotionProgramName"] .datagrid-cell span').html(msgTenCKHTTM);
			$('.datagrid-header-row td[field="type"] .datagrid-cell span').html(msgLoaiCKHTTM);
		}
		$('.datagrid-header-row td[field="promotionProgramCode"] .datagrid-cell .datagrid-sort-icon').html('');
		$('.datagrid-header-row td[field="promotionProgramName"] .datagrid-cell .datagrid-sort-icon').html('');
		$('.datagrid-header-row td[field="type"] .datagrid-cell .datagrid-sort-icon').html('');
//		$("#grid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	searchProduct: function(){
		$('#errMsg').html('').hide();
		var promotionId = $('#promotionId').val().trim();
		var productCode = $('#productCode').val().trim();
		var isCompel = $('#isCompel').is(':checked');
		var amountBuy = $('#amountBuy').val().trim().replace(/,/g,'');
		var totalBuyMoney = $('#totalBuyMoney').val().trim().replace(/,/g,'');
		var totalDiscountMoney = $('#totalDiscountMoney').val().trim().replace(/,/g,'');
		var percentDiscountMoney = $('#percentDiscountMoney').val().trim();
		var discountProduct = $('#discountProduct').val().trim();
		var discountAmount = $('#discountAmount').val().trim().replace(/,/g,'');
		var url = PromotionCatalog.getSearchProductGridUrl(promotionId,productCode,isCompel,amountBuy,totalBuyMoney,totalDiscountMoney,percentDiscountMoney,discountProduct,discountAmount);
		$("#grid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		var isCheck = false;
		$('.InputTextStyle').each(function(){
		    if(!$(this).is(':hidden') && !$(this).is(':disabled') && !isCheck){
		        isCheck = true;
		        $(this).focus();
		    }
		});
		return false;
	},
	searchShop: function(){
		$('#errMsg').html('').hide();
		$('#errMsgShop').html("").hide();
		$('#errExcelMsg').html('').hide();
		var promotionId = $('#promotionId').val().trim();
		var shopCode = $('#shopCode').val().trim();
		var shopName = $('#shopName').val().trim();
		var quantityMax = $('#quantityMax').val().trim();
		var url = PromotionCatalog.getSearchShopGridUrl(promotionId,shopCode,shopName,quantityMax);
		$("#exGrid").treegrid({url:url});
		var isCheck = false;
		$('.InputTextStyle').each(function(){
		    if(!$(this).is(':hidden') && !$(this).is(':disabled') && !isCheck){
		        isCheck = true;
		        $(this).focus();
		    }
		});
		var textForcus = $('#shopCode').val();
		if(textForcus!=undefined && textForcus!= null && textForcus.trim().length > 0){
			$('#shopCode').focus();
		}else if(textForcus!=undefined){
			$('#shopCode').focus();
		}
		textForcus = $('#shopName').val();
		if(textForcus!=undefined && textForcus!= null && textForcus.trim().length > 0){
			$('#shopName').focus();
		}
		return false;
	},
	searchChangeInfo: function(){
		$('#errMsg').html('').hide();
		$('#errMsgSearch').html('').hide();
		var msg = Utils.getMessageOfInvalidFormatDate('fromDate',msgTuNgay);
		if(msg.length==0){
			msg = Utils.getMessageOfInvalidFormatDate('toDate',msgDenNgay);
		}
		if(msg.length==0 && !Utils.compareDate($('#fromDate').val(),$('#toDate').val())){
			msg = manageRouteAssignDetail_fromdate_is_not_greater_todate;
			$('#fromDate').focus();
		}
		if(msg.length>0){
			$('#errMsgSearch').html(msg).show();
			return;
		}
		var promotionId = $('#promotionId').val().trim();
		var fromDate = $('#fromDate').val().trim();
		var toDate = $('#toDate').val().trim();
		var url = PromotionCatalog.getSearchChangeInfoGridUrl(promotionId,fromDate,toDate);
		$("#grid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		var url = PromotionCatalog.getSearchActionGridUrl(0);
 		$("#gridAction").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	searchCustomer: function(){
		$('#errMsg').html('').hide();
		$('#errMsgQuantity').html('').hide();
		var promotionId = $('#promotionId').val().trim();
		var shopId = $('#shopId').val().trim();
		var customerName = $('#customerNameSearch').val().trim();
		var customerCode = $('#customerCodeSearch').val().trim();
		var quantityMax = $('#quantityMaxSearch').val().trim();
		var quantityReceive = $('#quantityReceiveSearch').val().trim();
		if(parseInt(quantityMax) > 2147483647){
			$('#errMsgQuantity').html(format(PromotionCatalog_overPass,2)).show();
			return false;
		}
		if(parseInt(quantityReceive) > 2147483647){
			$('#errMsgQuantity').html(format(PromotionCatalog_overPass1,2)).show();
			return false;
		}
		var status = $('#statusSearch').val().trim();
		var url = PromotionCatalog.getSearchCustomerGridUrl(promotionId,shopId,customerCode,customerName,quantityMax,quantityReceive,status);
		$("#detailGrid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	searchCustomerType: function(){
		$('#errMsg').html('').hide();
		var promotionId = $('#promotionId').val().trim();
		var shopId = $('#shopId').val().trim();
		var customerTypeName = $('#customerNameTypeSearch').val().trim();
		var customerTypeCode = $('#customerCodeTypeSearch').val().trim();
		var quantityMax = $('#quantityMaxTypeSearch').val().trim();
		var quantityReceive = $('#quantityReceiveTypeSearch').val().trim();
		var status = $('#statusTypeSearch').val().trim();
		var url = PromotionCatalog.getSearchCustomerTypeGridUrl(promotionId,shopId,customerTypeCode,customerTypeName,quantityMax,quantityReceive,status);
		$("#detailGridType").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	loadInfo:function(){
		var proType = $("#proType").val();
		if(proType != '' && proType == 1){
			$('#tabTitle').html(msgThongTinCTKM);
		}else{
			$('#tabTitle').html(msgThongTinCTHTTM);
		}
		PromotionCatalog.removeAllAndActiveClass('infoTab');
		var promotionId = $("#promotionId").val();
		var data = new Object();
		data.promotionId = promotionId;
		data.proType = proType;
		var kData = $.param(data, true);
		PromotionCatalog.loadCommonPage('divGeneral','/catalog/promotion/info',kData,0);
	},
	loadProduct:function(){
		$('#divDialogSearch').hide();
		PromotionCatalog.removeAllAndActiveClass('productTab');
		var promotionId = $("#promotionId").val();
		var data = new Object();
		data.promotionId = promotionId;
		var kData = $.param(data, true);
		PromotionCatalog.loadCommonPage('divDetailCommon','/catalog/promotion/product',kData,1);
	},
	loadShop:function(){
		$('#divDialogSearch').hide();
		PromotionCatalog.removeAllAndActiveClass('shopTab');
		var promotionId = $("#promotionId").val();
		$('#errExcelMsg').html('').hide();
		var data = new Object();
		data.promotionId = promotionId;
		var kData = $.param(data, true);
		PromotionCatalog.loadCommonPage('divDetailCommon','/catalog/promotion/distribution',kData,2);
	},
	loadCustomerAttributeTab:function(){
 		$('#divDialogSearch').hide();
 		PromotionCatalog.removeAllAndActiveClass('customerAttributeTab');
 		var promotionId = $("#promotionId").val();
		var data = new Object();
		data.promotionId = promotionId;
		var kData = $.param(data, true);
		PromotionCatalog.loadCommonPage('divDetailCommon','/catalog/promotion/customerattribute',kData,3);
		$('#left li input[type="checkbox"]').each(function() {
			$(this).parent().wrap('<div class="row marginBottom10"></div>');
			//add class col3 cho <li>
			$(this).parent().addClass('col-sm-12 noPaddingLeft');
			//Add col9 cho cac element tiep theo trong div $0
			$(this).next('label').andSelf().wrapAll('<label class="el-checkbox el-checkbox-lg"></label>');	
			$( this ).next('label').replaceWith( '<span class="el-checkbox-style el-lebel">' + $( this ).next('label').text() + "</span>" );
		});
		//Update css
//		$('#proCusAtt div li input[type="checkbox"]').each(function() {
		$('#proCusAtt #right div').has('li input[type="checkbox"] ').each(function() {
			$(this).children('li:first').addClass('atbRightColFirst col-sm-3 noPaddingLeft');
			//Add col9 cho cac element tiep theo trong div $0
			if( !$(this).children('li:first').next().is('.atbRightColSecond') ){
				$(this).children('li:first').nextAll().wrapAll('<div class="atbRightColSecond col-sm-9 columNoPadding" ></div>');
				
			}
		});
		$('#proCusAtt #right .atbRightColFirst').each(function() {
			$(this).parent().addClass('row marginBottom10');
		});
//		if( $('#proCusAtt #right .atbRightColFirst input[type="checkbox"] + label').next().is('label') ) {
		if( $('#proCusAtt #right .atbRightColFirst input[type="checkbox"] + label') ) {
			$('#proCusAtt #right .atbRightColFirst input[type="checkbox"] + label').each(function() {
				$(this).prev().andSelf().wrapAll('<label class="el-checkbox el-checkbox-lg"></label>'); 
				//span de hien thi checkbox blue
				$(this).replaceWith( '<span class="el-checkbox-style el-lebel">' + $(this ).text() + "</span>" );
			});
		}
	$('#proCusAtt #right .atbRightColSecond input[type="text"]').each(function() {
		$(this).removeClass().addClass('form-control');
	});
	
//	$('#proCusAtt #right .atbRightColSecond div').has(".hasDatepicker").each(function() { 
//		$(this).children('input[type="text"]').removeClass('InputTextStyle').addClass('form-control');
//	});
	$('#proCusAtt #right .atbRightColSecond div > select').each(function() {
		$(this).parent().addClass('input-group form-group customPulldow widthFull');
		$(this).next().addClass('form-control');
		$(this).next('span').children().addClass('InputFileStyle');
		if( $(this).parent().children('.input-group-addon').length == 0 ) {
			$(this).parent().append('<label class="input-group-addon"><label class="fa fa-angle-down"></label></label>' )
		}
	});
 		return false;
 	},
	loadCustomer:function(){
		PromotionCatalog.removeAllAndActiveClass('');
		var promotionId = $("#promotionId").val();
		var data = new Object();
		data.promotionId = promotionId;
		var kData = $.param(data, true);
		$.ajax({
			type : "POST",
			url : "/catalog/promotion/customer",
			data : (kData),
			dataType: "html",
			success : function(data) {
				$("#divGeneral").html(data).show();
				if($('#obType').val()  != '' && $('#obType').val() == 0){
					$('#divR').hide();
					$('#divB').show();
					$('#bR').attr('checked','checked');
					$('#customerTypeDiv').show();
					$('#customerInfoDiv').hide();
				}else{
					$('#divR').show();
					$('#divB').show();
					$('#aR').attr('checked','checked');
					$('#customerTypeDiv').hide();
					$('#customerInfoDiv').show();
				}
				$('#shopCode').focus();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH + '/check-session',
					dataType : "json",
					success : function(data) {
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href = WEB_CONTEXT_PATH + '/home' ;
					}
				});
			}
		});
		return false;
	},
	changePromotionInfo: function(){
		var msg = '';
		$('#errMsg').html('').hide();
		msg = Utils.getMessageOfRequireCheck('promotionCode',msgMaChuongTrinh);
		if(msg.length == 0){
			msg = Utils.getMessageOfSpecialCharactersValidate('promotionCode',msgMaChuongTrinh,Utils._CODE);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('promotionName',msgTenChuongTrinh);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfSpecialCharactersValidate('promotionName',msgTenChuongTrinh);
		}
		if(msg.length == 0){
			var proType = $('#proType').val();
			if(proType != null && proType == 1){
				msg = Utils.getMessageOfRequireCheck('typeCode',msgLoaiCKTM,true);
			}
			if(proType != null && proType == 2){
				msg = Utils.getMessageOfRequireCheck('typeCode',msgLoaiCKHTTM,true);
			}
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('startDate',msgTuNgay);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('status',msgTrangThai,true);
		}
		var startDate = $('#startDate').val().trim();
		var endDate = $('#endDate').val().trim();
		if($('#status').val().trim() == activeType.WAITING){
			if(msg.length == 0){
				if (startDate != '' && !Utils.isDate(startDate)) {
					msg = msgCommonErr1;
					$('#startDate').focus();
				}
			}
		}
		if(msg.length == 0){
			if(($('#stableToDate').val() != '') && ($('#stableToDate').val().trim() != $('#endDate').val().trim())){
				if(endDate != '' && !Utils.isDate(endDate)){
					msg = msgCommonErr2;
					$('#endDate').focus();
				}
			}
		}
		var currentTime = new Date(sysDateFromDB);
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		if(msg.length == 0){
			if(startDate != '' && endDate != ''){
				if(!Utils.compareDate(startDate, endDate)){
					msg = msgCommonErr7;
					$('#startDate').focus();
				}
			}
		}
		var promotionStatus = $('#promotionStatus').val();
		var status = $('#status').val();
		if(msg.length == 0){
			if(startDate != ''){
				if(promotionStatus == activeType.WAITING && status == activeType.WAITING){
					if(!Utils.compareDate(day + '/' + month + '/' + year,startDate)){
						msg = msgCommonErr20;
						$('#startDate').focus();
					}
				}
			}
		}
		if(msg.length == 0){
			if(($('#stableToDate').val() != '') && ($('#stableToDate').val().trim() != $('#endDate').val().trim())){
				if(endDate != ''){
					if(!Utils.compareDate(day + '/' + month + '/' + year,endDate)){
						msg = msgCommonErr6;
						$('#endDate').focus();
					}
				}
			}
		}
		var proType =$("#proType").val().trim();
		if($('#isAllowEditProPgram').val() == 'false'){
			if($('#status').val().trim() != '' && parseInt($('#status').val().trim()) != 2){
				msg = msgLoi31;
			}
		}

		var descrip = $("#description").val().trim();
		if(msg.length == 0){
			if(descrip != ''){
				msg = Utils.getMessageOfSpecialCharactersValidate('description', msgNoiDungCTKM , Utils._DEFAULT);
				$("#description").focus();
			}
		}
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
		dataModel.promotionId = $('#promotionId').val();
		dataModel.promotionCode = $('#promotionCode').val().trim();
		dataModel.promotionName = $('#promotionName').val().trim();
		if($('#promotionId').val() == '' || parseInt($('#promotionId').val()) == 0){
			dataModel.typeCode = $('#typeCode').val().trim();
		}
		dataModel.startDate = $('#startDate').val().trim();
		dataModel.endDate = $('#endDate').val().trim();
		dataModel.status = $('#status').val().trim();
		if(proType != '' && proType == 1){
			dataModel.isMulti = $('#multi').is(':checked');
			dataModel.isRecursive = $('#recursive').is(':checked');
			dataModel.related = $('input[name=related]:checked').val();
		}
		dataModel.proType = proType;
		dataModel.description = Utils.XSSEncode($('#description').val().trim());
//		if(!Utils.validateAttributeData(dataModel, '#errMsg')){
//			return false;
//		}
		$.ajaxSetup({contentType:"application/x-www-form-urlencoded; charset=utf-8"});
		Utils.addOrSaveData(dataModel, "/catalog/promotion/changepromotioninfo", PromotionCatalog._xhrSave, 'errMsg',function(data){
			$('#tabSectionDiv').show();
			$('#promotionId').val(data.promotionId);
			$('#apParamCode').val(data.apParamCode);
			$('#promotionStatus').val(data.promotionStatus);
			$('#successMsg1').html(msgCommon1).show();
			var tm = setTimeout(function(){
				$('#successMsg1').html('').hide();
				clearTimeout(tm);
			}, 3000);
//			window.location.href = '/catalog/promotion/viewdetail?promotionId='+data.promotionId+'&proType='+proType;
			var params = new Object();
			Utils.getHtmlDataByAjax(params, '/catalog/promotion/viewdetail?promotionId='+data.promotionId+'&proType='+proType,function(data) {
				$("#content").html(data).show();
			}, null, 'POST');
			return false;
			
			if(proType != '' && proType == 1){
				PromotionCatalog.loadProduct();
			}else if(proType != '' && proType == 2){
				PromotionCatalog.loadShop();
			}
		});
		return false;
	},
	getPromotionType:function(typeCode,obj){
		Utils.getJSON('/rest/catalog/promotion/name/' + typeCode + ".json",function(data){
			$(obj).val(data.name);
		});
	},
	getPromotionName:function(typeCode,obj){
		Utils.getJSON('/rest/catalog/promotion/code/' + typeCode + ".json",function(data){
			$(obj).val(data.name);
		});
	},
	getProductName:function(typeCode,obj){
		Utils.getJSON('/rest/catalog/product/getname/' + typeCode + ".json",function(data){
			$(obj).val(data.name);
		});
	},
	getShopName:function(typeCode,obj){
		if(typeCode == ""){
			typeCode = 'abcdefghijklmnopq';
		}
		Utils.getJSON('/rest/catalog/delivery-group/shop/' + typeCode + "/name.json",function(data){
			if(data != null && data.name != undefined){
				$(obj).val(data.name);
			}
		});
	},
	getCustomerName:function(typeCode,shopCode,obj){
		Utils.getJSON('/rest/catalog/delivery-group/customer/' + typeCode + '/'+ shopCode + "/name.json",function(data){
			$(obj).val(data.name);
		});
	},
	getSelectedProduct: function(id,productCode,productName,saleQty,saleAmt,discPer,discAmt,freeProductCode,freeQty,isCompel){
		PromotionCatalog.getChangedForm();
		if(id!= null && id!= 0 && id!=undefined){
			$('#productId').val(id);
		} else {
			$('#productId').val(0);
		}
		setTextboxValue('productCode',productCode);
		$('#productCode').attr('disabled','disabled');
		setTextboxValue('productName',productName);
		setTextboxValue('amountBuy',formatCurrency(saleQty));
		setTextboxValue('totalBuyMoney',formatCurrency(saleAmt));
		setTextboxValue('totalDiscountMoney',formatCurrency(discAmt));
		setTextboxValue('percentDiscountMoney',discPer);
		setTextboxValue('discountProduct',freeProductCode);
		setTextboxValue('discountAmount',formatCurrency(freeQty));
		if(isCompel == 1){
			$('#isCompel').attr('checked',true);
		}else{
			$('#isCompel').removeAttr('checked');
		}
		$('#btnSearch,#btnCreate').hide();
		$('#btnUpdate,#btnDismiss').show();
	},
	getSelectedShop: function(id,shopCode,shopName,quantityMax,status,objectValue){
		$('.RequireStyle').show();
		if(id!= null && id!= 0 && id!=undefined){
			$('#shopEditId').val(id);
		} else {
			$('#shopEditId').val(0);
		}
		setTextboxValue('shopCode',shopCode);
		setTextboxValue('shopName',shopName);
		setTextboxValue('quantityMax',quantityMax);
		setSelectBoxValue('status', status);
		setSelectBoxValue('objectApplyHidden', objectValue);
		$('#shopCodeLabel').html(msgMaDoiTuong);
		$('#shopCode').attr('disabled','disabled');
		$('#shopName').attr('disabled','disabled');
		$('#divObjectApply').show();
		setTitleUpdate();
		$('#btnSearch,#btnCreate').hide();
		$('#btnUpdate,#btnDismiss').show();
	},
	getSelectedCustomer: function(id,shopCode,shopName,customerCode,customerName,quantityMax,status){
		if(id!= null && id!= 0 && id!=undefined){
			$('#customerId').val(id);
		} else {
			$('#customerId').val(0);
		}
		setTextboxValue('shopCode',shopCode);
		$('#shopCode').attr('disabled','disabled');
		setTextboxValue('shopName',shopName);
		setTextboxValue('customerCode',customerCode);
		$('#customerCode').attr('disabled','disabled');
		setTextboxValue('customerName',customerName);
		setTextboxValue('quantityMax',quantityMax);
		setSelectBoxValue('status', status);
		$('#divR').hide();
		$('#divB').hide();
		$('#customerInfoDiv').show();
		$('#customerTypeDiv').hide();
		$('#btnSearch,#btnCreate').hide();
		$('#btnUpdate,#btnDismiss').show();
	},
	deleteProduct: function(productId){
		var dataModel = new Object();
		dataModel.productId = productId;
		Utils.deleteSelectRowOnGrid(dataModel, CreateSalePlan_lblProductNameGrid, "/catalog/promotion/removeproduct", PromotionCatalog._xhrDel, null,null, function(){
			PromotionCatalog.resetFormProduct();
		});
		return false;
	},
	deleteShop: function(shopId){
		var dataModel = new Object();
		dataModel.shopId = shopId;
		Utils.deleteSelectRowOnGrid(dataModel, msgDoiTuong , "/catalog/promotion/removeshop", PromotionCatalog._xhrDel, null,null, function(){
			PromotionCatalog.resetFormShop();
		});
		return false;
	},
	deleteCustomerType: function(customerTypeId){
		var dataModel = new Object();
		dataModel.customerId = customerTypeId;
		Utils.deleteSelectRowOnGrid(dataModel, PromotionCatalog_typeClientPromotion, "/catalog/promotion/removecustomer", PromotionCatalog._xhrDel, null,null, function(){
			PromotionCatalog.searchCustomerType();
		});
		return false;
	},
	changePromotionShop: function(){
		var msg = '';
		$('#errMsg').html('').hide();
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('quantityMax',msgSoSuatKM);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('status',msgTrangThai,true);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('objectApplyHidden',PromotionCatalog_htap,true);
		}
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
		dataModel.promotionId = $('#promotionId').val();
		dataModel.shopId = $('#shopEditId').val();
		dataModel.status = $('#status').val().trim();
		dataModel.quantityMax = $('#quantityMax').val().trim();
		dataModel.objectApply = $('#objectApplyHidden').val().trim();
		if(dataModel.quantityMax != null && dataModel.quantityMax.length > 0){
			Utils.addOrSaveRowOnGrid(dataModel, "/catalog/promotion/changepromotionshop", PromotionCatalog._xhrSave, null,null, function(){
				PromotionCatalog.loadShop();
				PromotionCatalog.resetFormShop();
			});
		}else{
			if($('#status').val().trim() != '' && $('#status').val().trim() == 1){
				$.messager.confirm(msgXacNhan, PromotionCatalog_selectSoSuatDonVi+','+SuperviseManageRouteCreate_confirmContinute+'? ', function(r){
					if (r == true){
						Utils.saveData(dataModel, "/catalog/promotion/changepromotionshop", PromotionCatalog._xhrSave, null, function(){
							PromotionCatalog.loadShop();
							PromotionCatalog.resetFormShop();
						});
					}
				});
			}else{
				Utils.addOrSaveRowOnGrid(dataModel, "/catalog/promotion/changepromotionshop", PromotionCatalog._xhrSave, null,null, function(){
					PromotionCatalog.loadShop();
					PromotionCatalog.resetFormShop();
				});
			}
		}
		return false;
	},
	changePromotionCustomer: function(){
		var msg = '';
		$('#errMsg').html('').hide();
		msg = Utils.getMessageOfRequireCheck('shopCode',jsp_sale_product_shop_code);
		if(msg.length == 0){
			msg = Utils.getMessageOfSpecialCharactersValidate('shopCode',jsp_sale_product_shop_code,Utils._CODE);
		}
		if($('input[name=customerRadio]:checked').val() == 0){
			if(msg.length == 0){
				msg = Utils.getMessageOfRequireCheck('customerCode',catalog_customer_code);
			}
			if(msg.length == 0){
				msg = Utils.getMessageOfSpecialCharactersValidate('customerCode',catalog_customer_code,Utils._CODE);
			}
		}else if($('input[name=customerRadio]:checked').val() == 1){
			if(msg.length == 0){
				msg = Utils.getMessageOfRequireCheck('customerType',PromotionCatalog_selectTypeCus);
			}
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('quantityMax',PromotionCatalog_selectTypeCus);
		}
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
		dataModel.promotionId = $('#promotionId').val();
		dataModel.customerId = $('#customerId').val().trim();
		dataModel.shopCode = $('#shopCode').val().trim();
		dataModel.status = $('#status').val().trim();
		if($('input[name=customerRadio]:checked').val() == 0){
			dataModel.customerCode = $('#customerCode').val().trim();
		}else if($('input[name=customerRadio]:checked').val() == 1){
			dataModel.typeCode = $('#customerType').val();
		}
		dataModel.customerRadio = $('input[name=customerRadio]:checked').val();
		dataModel.quantityMax = $('#quantityMax').val().trim();
		Utils.addOrSaveRowOnGrid(dataModel, "/catalog/promotion/changepromotioncustomer", PromotionCatalog._xhrSave, null,null, function(){
			PromotionCatalog.resetFormCustomer();
		});
		return false;
	},
	resetFormProduct: function(){
		$('#btnUpdate,#btnDismiss').hide();
		$('#btnCreate,#btnSearch').show();
		$('#productCode').val('');
		if($('#productBuyDisable').val() == 'true'){
			$('#productCode').removeAttr('disabled');
		}
		$('#productName').val('');
		$('#amountBuy').val('');
		$('#totalBuyMoney').val('');
		$('#totalDiscountMoney').val('');
		$('#percentDiscountMoney').val('');
		$('#discountProduct').val('');
		$('#discountAmount').val('');
		$('#isCompel').removeAttr('checked');
		$('#productId').val(0);
		$("#grid").trigger("reloadGrid");
		$('.RequireStyle').hide();
		return false;
	},
	resetFormShop: function(){
		$('#btnUpdate,#btnDismiss').hide();
		$('#btnCreate,#btnSearch').show();
		$('#shopCodeLabel').html('Mã đơn vị(F9)');
		$('#shopCode').removeAttr('disabled');
		$('#shopCode').val('');
		$('#shopName').removeAttr('disabled');
		$('#shopName').val('');
		$('#quantityMax').val('');
		$('#status').val(1);
		$('#status').change();
		$('#shopEditId').val(0);
		$('#divObjectApply').hide();
		$('.RequireStyle').hide();
		var url = PromotionCatalog.getShopGridUrl($('#promotionId').val(),'','','',1);
		$("#grid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		$('#title').html('Tìm kiếm đơn vị');
		return false;
	},
	resetFormCustomer: function(){
		$('#customerNameSearch').val('');
		$('#customerCodeSearch').val('');
		$('#quantityMaxSearch').val('');
		$('#quantityReceiveSearch').val('');
		$('#statusSearch').val(1);
		$('#statusSearch').change();
		var url = PromotionCatalog.getCustomerGridUrl($('#promotionId').val(),$('#shopId').val(),'','','','',1);
		$("#detailGrid").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	resetFormCustomerType: function(){
		$('#customerNameTypeSearch').val('');
		$('#customerCodeTypeSearch').val('');
		$('#quantityMaxTypeSearch').val('');
		$('#quantityReceiveTypeSearch').val('');
		$('#statusTypeSearch').val(1);
		$('#statusTypeSearch').change();
		var url = PromotionCatalog.getCustomerTypeGridUrl($('#promotionId').val(),$('#shopId').val(),'','','','',1);
		$("#detailGridType").setGridParam({url:url,page:1}).trigger("reloadGrid");
		return false;
	},
	getDetailGridUrl: function(shopId,objectValue,shopName,status){
		$('#objectApplyValue').val(objectValue);
		$('#shopNameHidden').val(shopName);
		$('#shopId').val(shopId);
		var promotionId = $('#promotionId').val().trim();
		$('#divDetail').show();
		if(objectValue == 3){
			if(status != '' && status == 1){
				$('#divBtnCreate').show();
				$('#btnCreateCustomer').bind('click',function(){
					PromotionCatalog.showDialogCustomer();
				});
			}else{
				$('#divBtnCreate').hide();
			}
			$('#titleCustomer').text(PromotionCatalog_infosCustomerKM+':'+shopName);
			$('#divCustomer').show();
			$('#divCustomerType').hide();
			$('#customerCodeSearch').focus();
			if($('#gbox_detailGrid').html() == null || $('#gbox_detailGrid').html() == ''){
				if(status != '' && status == 1){
					$("#detailGrid").jqGrid({
						url:"/catalog/promotion/searchcustomer?promotionId="+promotionId+"&shopId="+ shopId+"&status=1",
						colModel:[
						          {name:'customer.customerCode', label: catalog_customer_code, width: 100, sortable:false,resizable:false , align: 'left'},
						          {name:'customer.customerName', label: catalog_customer_name, width: 150, align: 'left', sortable:false,resizable:false },
						          {name:'quantityMax', label: PromotionCatalog_valuePromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'quantityReceived', label: PromotionCatalog_usedPromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'status', label: msgTrangThai, width: 80, align: 'center',sortable:false,resizable:false, formatter: GridFormatterUtils.statusCellIconFormatter },
						          {name:'edit', label: PromotionCatalog_update, width: 50, align: 'center',sortable:false,resizable:false, formatter: PromotionCatalogFormatter.editCustomerFormatter},
						          {name:'delete', label: msgText4, width: 50, align: 'center',sortable:false,resizable:false, formatter: PromotionCatalogFormatter.delCustomerFormatter},
						          ],
						          pager : '#detailPager',
						          height: 'auto',
						          rownumbers: true,
						          width: ($('#detailChangedGrid').width())
					})
					.navGrid('#detailPager', {edit:false,add:false,del:false, search: false});
				}else{
					$("#detailGrid").jqGrid({
						url:"/catalog/promotion/searchcustomer?promotionId="+promotionId+"&shopId="+ shopId+"&status=1",
						colModel:[
						          {name:'customer.customerCode', label: catalog_customer_code, width: 100, sortable:false,resizable:false , align: 'left'},
						          {name:'customer.customerName', label: catalog_customer_name, width: 150, align: 'left', sortable:false,resizable:false },
						          {name:'quantityMax', label: PromotionCatalog_valuePromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'quantityReceived', label: PromotionCatalog_usedPromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'status', label: msgTrangThai, width: 80, align: 'center',sortable:false,resizable:false, formatter: GridFormatterUtils.statusCellIconFormatter },
						          ],
						          pager : '#detailPager',
						          height: 'auto',
						          rownumbers: true,
						          width: ($('#detailChangedGrid').width())
					})
					.navGrid('#detailPager', {edit:false,add:false,del:false, search: false});
				}
				$('#jqgh_detailGrid_rn').prepend(stt_label);
			}else{
				var url = PromotionCatalog.viewDetailChanged(shopId);
				$("#detailGrid").setGridParam({url:url,page:1}).trigger("reloadGrid");
			}
		}else{
			if(status != '' && status == 1){
				$('#divBtnCreate1').show();
				$('#btnCreateCustomerType').bind('click',function(){
					PromotionCatalog.showDialogCustomerType();
				});
			}else{
				$('#divBtnCreate1').hide();
			}
			$('#titleCustomer').text(PromotionCatalog_infosTypePromotion+':'+shopName);
			$('#divCustomer').hide();
			$('#divCustomerType').show();
			$('#customerCodeTypeSearch').focus();
			$('#customerCodeTypeSearch,#customerNameTypeSearch,#quantityMaxTypeSearch,#quantityReceiveTypeSearch').bind('keyup',function(event){
				if(event.keyCode == keyCodes.ENTER){
					PromotionCatalog.searchCustomerType();
				}
			});
			if($('#gbox_detailGridType').html() == null || $('#gbox_detailGridType').html() == ''){
				if(status != '' && status == 1){
					$("#detailGridType").jqGrid({
						url:"/catalog/promotion/searchcustomer?promotionId="+promotionId+"&shopId="+ shopId+"&status=1",
						colModel:[
						          {name:'customerType.channelTypeCode', label: PromotionCatalog_codePromotion, width: 50, sortable:false,resizable:false , align: 'left'},
						          {name:'customerType.channelTypeName', label: PromotionCatalog_namePromotion, width: 200, align: 'left', sortable:false,resizable:false },
						          {name:'quantityMax', label: PromotionCatalog_valuePromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'quantityReceived', label: PromotionCatalog_usedPromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'status', label: msgTrangThai, width: 80, align: 'center',sortable:false,resizable:false, formatter: GridFormatterUtils.statusCellIconFormatter },
						          {name:'edit', label: PromotionCatalog_update, width: 50, align: 'center',sortable:false,resizable:false, formatter: PromotionCatalogFormatter.editCustomerFormatter},
						          {name:'delete', label: msgText4, width: 50, align: 'center',sortable:false,resizable:false, formatter: PromotionCatalogFormatter.delCustomerTypeFormatter},
						          ],
						          pager : '#detailPagerType',
						          height: 'auto',
						          rownumbers: true,
						          width: ($('#detailChangedGridType').width())
					})
					.navGrid('#detailPagerType', {edit:false,add:false,del:false, search: false});
				}else{
					$("#detailGridType").jqGrid({
						url:"/catalog/promotion/searchcustomer?promotionId="+promotionId+"&shopId="+ shopId+"&status=1",
						colModel:[
						          {name:'customerType.channelTypeCode', label: PromotionCatalog_codePromotion, width: 100, sortable:false,resizable:false , align: 'left'},
						          {name:'customerType.channelTypeName', label: PromotionCatalog_namePromotion, width: 150, align: 'left', sortable:false,resizable:false },
						          {name:'quantityMax', label: PromotionCatalog_valuePromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'quantityReceived', label: PromotionCatalog_usedPromotion, width: 80, align: 'right',sortable:false,resizable:false},
						          {name:'status', label: msgTrangThai, width: 80, align: 'center',sortable:false,resizable:false, formatter: GridFormatterUtils.statusCellIconFormatter },
						          ],
						          pager : '#detailPagerType',
						          height: 'auto',
						          rownumbers: true,
						          width: ($('#detailChangedGridType').width())
					})
					.navGrid('#detailPagerType', {edit:false,add:false,del:false, search: false});
				}
				$('#jqgh_detailGridType_rn').prepend(stt_label);
			}else{
				var url = PromotionCatalog.viewDetailChanged(shopId);
				$("#detailGridType").setGridParam({url:url,page:1}).trigger("reloadGrid");
			}
		}
	},
	viewDetailChanged:function(shopId){
		var promotionId = $('#promotionId').val().trim();
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchcustomer?promotionId="+promotionId+"&shopId="+ shopId+"&status=1";
	},
	showDialogShop: function(){
		$('#requiredId').show();
		var html = $('#shopTreeDialog').html();
		$.fancybox(html,
				{
					modal: true,
					title: PromotionCatalog_infosDV,
					afterShow: function(){
						Utils.bindAutoSearch();
						$('#shopTreeDialog').html('');
						$('#shopCodeDlg').focus();
						Utils.bindFormatOnTextfield('numberOfShop', Utils._TF_NUMBER);
						var promotionId = $('#promotionId').val().trim();
						var shopCodeHidden = $('#shopCodeHidden').val().trim();
						var shopCode = encodeURI('');
						var shopName = encodeURI('');
						PromotionCatalog.loadShopTreeOnDialog('/rest/catalog/promotion-program/shop/list.json?promotionId='+ promotionId +'&code='+shopCodeHidden+'&shopCode='+ shopCode +'&shopName='+ shopName,'shopTree');
						PromotionCatalog._mapShop = new Map();
						$('#shopTree').bind("loaded.jstree open_node.jstree close_node.jstree", function (event, data) {
							if($('#shopTreeContent').data('jsp') != undefined || $('#shopTreeContent').data('jsp') != null) {
								$('#shopTreeContent').data('jsp').destroy();
								setTimeout(function(){
									$('#shopTreeContent').jScrollPane();
								},500);
							} else {
								setTimeout(function(){
									$('#shopTreeContent').jScrollPane();
								},500);
							}
		    			});
						$.ajax({
							type : "POST",
							url : "/catalog/promotion/getobjecttypedialog",
							data : ({promotionId:promotionId}),
							dataType: "json",
							success : function(data) {
								var html = new Array();
				    			if(data!= null && data!= undefined && data.lstPromotionType!= null && data.lstPromotionType.length > 0){
				    				html.push("<option value='-1'>"+PromotionCatalog_selectApply+"</option>");
				    				for(var i=0;i<data.lstPromotionType.length;i++){
				    					var j = i+1;
				    					html.push("<option value='"+ j +"'>"+ Utils.XSSEncode(data.lstPromotionType[i].apParamName) +"</option>");
				    				}
				    			}else{
				    				html.push("<option value='-1'>"+PromotionCatalog_selectApply+"</option>");
				    			}
				    			$('#objectType').html(html.join(""));
				    			$('#objectType').addClass('MySelectBoxClass');
				    			$('#objectType').customStyle();
				    			$(window).resize();
				    			var tm = setTimeout(function(){
				    				$('#shopTreeContent').jScrollPane();
				    				$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('center',document.documentElement.scrollTop +  $(window).height()/2);
				    				window.scrollTo(0,0);
								}, 500);
							},
							error:function(XMLHttpRequest, textStatus, errorThrown) {
								$.ajax({
									type : "POST",
									url : WEB_CONTEXT_PATH + '/check-session',
									dataType : "json",
									success : function(data) {
									},
									error: function(XMLHttpRequest, textStatus, errorThrown) {
										window.location.href = WEB_CONTEXT_PATH + '/home' ;
									}
								});
							}
						});
					},
					afterClose: function(){
						$('#shopTreeDialog').html(html);
					}
				}
			);
		return false;
	},
	getCheckboxStateOfTreeEx:function(treeId,MAP,selector){
		for(var i=0;i<MAP.size();++i){
			var _obj = MAP.get(MAP.keyArray[i]);
			$('#' + selector).each(function(){
				var _id = $(this).attr('id');
				if(_id==_obj){
					$(this).removeClass('jstree-unchecked');
					$(this).addClass('jstree-checked');
				}
			});
		}
	},
	searchShopOnTree: function(){
		$('#shopTree li').each(function(){
			var _id = $(this).attr('id');
			if($(this).hasClass('jstree-checked')){
				PromotionCatalog._mapShop.put(_id,_id);
			}else {
				PromotionCatalog._mapShop.remove(_id);
			}
		});
		var promotionId = $('#promotionId').val().trim();
		var shopCodeHidden = $('#shopCodeHidden').val().trim();
		var shopCode = encodeChar($('#shopCodeDlg').val().trim());
		var shopName = encodeChar($('#shopNameDlg').val().trim());
		$('#shopTreeContent').data('jsp').destroy();
		PromotionCatalog.loadShopTreeOnDialog('/rest/catalog/promotion-program/shop/list.json?promotionId='+ promotionId +'&code='+shopCodeHidden+'&shopCode='+ shopCode +'&shopName='+ shopName,'shopTree');
	},
	selectListShop: function(){
		$('#errMsgProductDlg').html('').hide();
		var arrId = new Array();
		$('.jstree-checked').each(function(){
		    var _id= $(this).attr('id');
		    if($('#' + _id + ' ul li').length >0 && (!$(this).parent().parent().hasClass('jstree-checked'))){
		    	PromotionCatalog._mapShop.put(_id,_id);
		    }else if($('#' + _id ).length >0 && (!$(this).parent().parent().hasClass('jstree-checked'))){
		    	PromotionCatalog._mapShop.put(_id,_id);
			}else{
				PromotionCatalog._mapShop.remove(_id);
			}
		});
		for(var i=0;i<PromotionCatalog._mapShop.size();++i){
			var _obj = PromotionCatalog._mapShop.get(PromotionCatalog._mapShop.keyArray[i]);
			arrId.push(_obj);
		}
		var msg = '';
		if(arrId.length == 0){
			msg = format(msgErr_required_choose_format,PromotionCatalog_donvithamgia);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('numberOfShop', PromotionCatalog_soSuatDonVi);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('objectType', PromotionCatalog_htap,true);
		}
		if(msg.length > 0){
			$('#errMsgProductDlg').html(msg).show();
			$.fancybox.update();
			return false;
		}
		var quantityMax = $('#numberOfShop').val().trim();
		var promotionId = $('#promotionId').val();
		var objectApply = $('#objectType').val().trim();
		var dataModel = new Object();
		dataModel.lstShopId = arrId;
		dataModel.quantityMax = quantityMax;
		dataModel.promotionId = promotionId;
		dataModel.objectApply = objectApply;
		if(quantityMax != null && quantityMax.length > 0){
			Utils.addOrSaveData(dataModel, '/catalog/promotion/selectlistshop', PromotionCatalog._xhrSave, 'errMsgProductDlg', function(data){
				$('#successMsgProductDlg').html(msgCommon1).show();
				$('#shopCodeDlg').val('');
				$('#shopNameDlg').val('');
				$('#numberOfShop').val('');
				$('.RequireStyle').hide();
				PromotionCatalog.resetFormShop();
				$.fancybox.update();
				setTimeout(function(){$.fancybox.close();}, 1000);
			}, null, '.fancybox-inner', null, null);
		}else{
			if($('#status').val().trim() != '' && $('#status').val().trim() == 1){
				$.messager.confirm(msgXacNhan, PromotionCatalog_selectSoSuatDonVi+', '+SuperviseManageRouteCreate_confirmContinute+'?', function(r){
					if (r == true){
						Utils.saveData(dataModel, "/catalog/promotion/selectlistshop", PromotionCatalog._xhrSave, 'errMsgProductDlg', function(){
							$('#successMsgProductDlg').html(msgCommon1).show();
							$('#shopCodeDlg').val('');
							$('#shopNameDlg').val('');
							$('#numberOfShop').val('');
							$('.RequireStyle').hide();
							PromotionCatalog.resetFormShop();
							$.fancybox.update();
							setTimeout(function(){$.fancybox.close();}, 1000);
						},null,null,null,null,true);
					}
				});
			}else{
				Utils.saveData(dataModel, "/catalog/promotion/selectlistshop", PromotionCatalog._xhrSave, 'errMsgProductDlg', function(){
					$('#successMsgProductDlg').html(msgCommon1).show();
					$('#shopCodeDlg').val('');
					$('#shopNameDlg').val('');
					$('#numberOfShop').val('');
					$('.RequireStyle').hide();
					PromotionCatalog.resetFormShop();
					$.fancybox.update();
					setTimeout(function(){$.fancybox.close();}, 1000);
				},null,null,null,null,true);
			}
		}
		return false;
	},
	getChangedForm:function(){
		var amountDisable = $('#amountDisable').val().trim();
		var moneyDisable = $('#moneyDisable').val().trim();
		var moneyDiscountDisable = $('#moneyDiscountDisable').val().trim();
		var percentDisable = $('#percentDisable').val().trim();
		var productDisable = $('#productDisable').val().trim();
		var productBuyDisable = $('#productBuyDisable').val().trim();
		if(amountDisable == "true"){
			$('#amountBuyRequire').hide();
		}else{
			$('#amountBuyRequire').show();
		}
		if(moneyDisable == "true"){
			$('#totalBuyMoneyRequire').hide();
		}else{
			$('#totalBuyMoneyRequire').show();
		}
		if(moneyDiscountDisable == "true"){
			$('#totalDiscountMoneyRequire').hide();
		}else{
			$('#totalDiscountMoneyRequire').show();
		}
		if(percentDisable == "true"){
			$('#percentDiscountMoneyRequire').hide();
		}else{
			$('#percentDiscountMoneyRequire').show();
		}
		if(productDisable == "true"){
			$('#discountAmountRequire').hide();
			$('#discountProductRequire').hide();
		}else{
			$('#discountAmountRequire').show();
			$('#discountProductRequire').show();
		}
		if(productBuyDisable == "false"){
			$('#productBuyRequire').hide();
		}else{
			$('#productBuyRequire').show();
		}
		$('#btnSearch,#btnCreate').hide();
		$('#btnUpdate,#btnDismiss').show();
		$('#productCode').focus();
	},
	showDialogCustomer: function(){
		//$('.RequireStyle').show();
		var html = $('#customerDialog').html();
		var shopId = $('#shopId').val();
		var promotionId = $('#promotionId').val();
		PromotionCatalog._mapCheckCustomer = new Map();
		$.fancybox(html,
				{
					modal: true,
					title: PromotionCatalog_labelCustumer,
					afterShow: function(){
						$('#customerDialog').html('');
						$('#customerCodeDlg').focus();
						$("#gridCustomer").jqGrid({
							  url:PromotionCatalog.getCustomerGridUrlDialog(promotionId,shopId,'',''),
							  colModel:[
					            {name:'customerCode', label: catalog_customer_code, sortable:false,resizable:false , align: 'left'},
					    	    {name:'customerName', label: catalog_customer_name, width: 300, align: 'left', sortable:false,resizable:false },
					    	    {name: 'id',index:'id', hidden:true },
							  ],
							  pager : $('#pagerCustomer'),
							  height: 'auto',
							  multiselect: true,
							  recordpos: 'right',
							  rowNum: 10,
							  width: ($('#promotionCustomerGrid').width()),
							  beforeSelectRow: function (id, e) {
								  var _id = 'jqg_gridCustomer_' + id;
								  var isCheck = PromotionCatalog._mapCheckCustomer.get(_id);
								  if(isCheck || isCheck == 'true') {
									  //da co trong map roi->remove no di
									  PromotionCatalog._mapCheckCustomer.remove(_id);
									  var tm = setTimeout(function(){
										  $('#'+_id).removeAttr('checked');
										  $('#'+id).removeClass('ui-state-highlight');
									  }, 100);
								  } else {
									  //chua co trong map -> put vao
									  PromotionCatalog._mapCheckCustomer.put(_id, id);
									  var tm = setTimeout(function(){
										  $('#'+_id).attr('checked', 'checked');
										  $('#'+id).addClass('ui-state-highlight');
									  }, 100);
								  }
								  return true;
							  },
							  onSelectAll: function(aRowids, status) {
								  for(var i = 0; i < aRowids.length; i++) {
									  if(status) {
										  var _id = 'jqg_gridCustomer_' + aRowids[i];
										  //put vao map
										  PromotionCatalog._mapCheckCustomer.put(_id, aRowids[i]);
									  } else {
										  var _id = 'jqg_gridCustomer_' + aRowids[i];
										  PromotionCatalog._mapCheckCustomer.remove(_id);
									  }
								  }
							  },
							  gridComplete: function(){
								  $('.cbox').each(function() {
									 var isCheck = PromotionCatalog._mapCheckCustomer.get(this.id);
									 if(isCheck || isCheck == 'true') {
										 customerId = $('#gridCustomer').jqGrid('getCell',$(this).parent().parent().attr('id'),'id');
										 $(this).attr('checked', 'checked');
										 $('#'+customerId).addClass('ui-state-highlight');
									 }
								  });
								  $('#jqgh_gridCustomer_rn').html(stt_label);
								  $(window).resize();
								  var tm = setTimeout(function(){
										$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop);
									  //$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('center',document.documentElement.scrollTop +  $(window).height()/2);
									  //window.scrollTo(0,0);
									}, 500);
								  updateRownumWidthForJqGrid('.fancybox-inner');
							  }
							})
							.navGrid($('#pagerCustomer'), {edit:false,add:false,del:false, search: false});
						Utils.bindFormatOnTextfield('numberOfCustomer',Utils._TF_NUMBER);
						$('#objectTypeCustomer').addClass('MySelectBoxClass');
		    			$('#objectTypeCustomer').customStyle();
		    			Utils.bindAutoSearch();
						$('#btnDlgCustomer').bind('click',function(event){
							var code = $('#customerCodeDlg').val().trim();
							var name = $('#customerNameDlg').val().trim();
							var url = PromotionCatalog.getCustomerGridUrlDialog(promotionId,shopId,code,name);
							$("#gridCustomer").setGridParam({url:url,page:1}).trigger("reloadGrid");
						});

					},
					afterClose: function(){
						$('#customerDialog').html(html);
						PromotionCatalog._mapCheckCustomer = new Map();
					}
				}
			);
		return false;
	},
	selectListCustomer: function(){
		$('#errMsgCustomerDlg').html('').hide();
		var arrId = new Array();
		var shopId = $('#shopId').val();
		var customerId = '';
		var objectType = $('#objectTypeCustomer').val();
		var msg = '';
		if(objectType !=null && objectType == 1){
//			$('.fancybox-inner .ui-jqgrid-bdiv .cbox').each(function(){
//				if($(this).is(':checked')){
//					customerId = $("#gridCustomer").jqGrid('getCell',$(this).parent().parent().attr('id'),'id');
//					arrId.push(customerId);
//				}
//			});
			for(var i = 0; i < PromotionCatalog._mapCheckCustomer.keyArray.length; i++) {
				arrId.push(PromotionCatalog._mapCheckCustomer.get(PromotionCatalog._mapCheckCustomer.keyArray[i]));
			}
			if(arrId.length == 0){
				//msg = format(msgErr_required_field,'Thông tin khách hàng');
				msg = msgTuyenErr2;
			}
		}else{
			$('.fancybox-inner .ui-jqgrid-bdiv .cbox').each(function(){
				customerId = $("#gridCustomer").jqGrid('getCell',$(this).parent().parent().attr('id'),'id');
				arrId.push(customerId);
			});
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('numberOfCustomer', PromotionCatalog_soSuatClient);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('objectTypeCustomer', PromotionCatalog_typeApply,true);
		}
		if(msg.length > 0){
			$('#errMsgCustomerDlg').html(msg).show();
			return false;
		}
		var quantityMax = $('#numberOfCustomer').val().trim();
		var promotionId = $('#promotionId').val();
		var shopId = $('#shopId').val();
		var dataModel = new Object();
		dataModel.lstCustomerId = arrId;
		dataModel.quantityMax = quantityMax;
		dataModel.promotionId = promotionId;
		dataModel.shopId = shopId;
		dataModel.objectTypeValue = objectType;
		if(quantityMax != null && quantityMax.length > 0){
			Utils.addOrSaveData(dataModel, '/catalog/promotion/changepromotioncustomer', PromotionCatalog._xhrSave, 'errMsgCustomerDlg', function(data){
				$('#successMsgCustomerDlg').html(msgCommon1).show();
				$('#customerCodeDlg').val('');
				$('#customerNameDlg').val('');
				$('#numberOfCustomer').val('');
				$('.RequireStyle').hide();
				PromotionCatalog.resetFormCustomer();
				setTimeout(function(){$.fancybox.close();}, 1000);
			}, null, '.fancybox-inner', null, null);
		}else{
			if($('#status').val().trim() != '' && $('#status').val().trim() == 1){
				$.messager.confirm(msgXacNhan, PromotionCatalog_soSuatKhachHang+','+SuperviseManageRouteCreate_confirmContinute+' ?', function(r){
					if (r == true){
						Utils.saveData(dataModel, "/catalog/promotion/changepromotioncustomer", PromotionCatalog._xhrSave, null, function(){
							$('#successMsgCustomerDlg').html(msgCommon1).show();
							$('#customerCodeDlg').val('');
							$('#customerNameDlg').val('');
							$('#numberOfCustomer').val('');
							$('.RequireStyle').hide();
							PromotionCatalog.resetFormCustomer();
							setTimeout(function(){$.fancybox.close();}, 1000);
						},null,null,null,null,true);
					}
				});
			}else{
				Utils.saveData(dataModel, "/catalog/promotion/changepromotioncustomer", PromotionCatalog._xhrSave, null, function(){
					$('#successMsgCustomerDlg').html(msgCommon1).show();
					$('#customerCodeDlg').val('');
					$('#customerNameDlg').val('');
					$('#numberOfCustomer').val('');
					$('.RequireStyle').hide();
					PromotionCatalog.resetFormCustomer();
					setTimeout(function(){$.fancybox.close();}, 1000);
				},null,null,null,null,true);
			}
		}
		return false;
	},
	showDialogCustomerType: function(){
		//$('.RequireStyle').show();
		var html = $('#customerTypeDialog').html();
		var promotionId = $('#promotionId').val();
		var shopId = $('#shopId').val();
		$.fancybox(html,
				{
					modal: true,
					title: PromotionCatalog_infosClient,
					afterShow: function(){
						$('#customerTypeDialog').html('');
						$('#numberOfCustomerType').focus();
						$.ajax({
							type : "POST",
							url : "/catalog/promotion/getcustomertypedialog",
							data : ({promotionId:promotionId,shopId:shopId}),
							dataType: "html",
							success : function(data) {
								$('#customerTypeContent').html(data).show();
								$('#subCategory_0').focus();
								$(window).resize();
								var tm = setTimeout(function(){
									$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('center',document.documentElement.scrollTop +  $(window).height()/2);
									window.scrollTo(0,0);
								}, 500);
							},
							error:function(XMLHttpRequest, textStatus, errorThrown) {
								$.ajax({
									type : "POST",
									url : WEB_CONTEXT_PATH + '/check-session',
									dataType : "json",
									success : function(data) {
									},
									error: function(XMLHttpRequest, textStatus, errorThrown) {
										window.location.href = WEB_CONTEXT_PATH + '/home' ;
									}
								});
							}
						});
					},
					afterClose: function(){

						$.ajax({
							type : "POST",
							url : WEB_CONTEXT_PATH + '/check-session',
							dataType : "json",
							success : function(data) {
								$('#customerTypeDialog').html(html);
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								window.location.href = WEB_CONTEXT_PATH + '/home' ;
							}
						});
					}
				}
			);
		return false;
	},
	showDialogCustomerUpdate: function(customerId){
//		$('.RequireStyle').show();
		var title = '';
		if($('objectApplyValue').val() != '' && $('#objectApplyValue').val() == 2){//loai kh
			title = PromotionCatalog_updateTypeClient+':'+$('#shopNameHidden').val().trim();
		}else{
			title = PromotionCatalog_updateTypeClient+':'+$('#shopNameHidden').val().trim();
		}
		var html = $('#updateCustomerDialog').html();
		$.fancybox(html,
				{
					modal: true,
					title: title,
					afterShow: function(){
						$('#updateCustomerDialog').html('');
						$.ajax({
							type : "POST",
							url : "/catalog/promotion/getcustomerupdatedialog",
							data : ({customerId:customerId}),
							dataType: "html",
							success : function(data) {
								$('#updateCustomerContent').html(data).show();
							},
							error:function(XMLHttpRequest, textStatus, errorThrown) {
								$.ajax({
									type : "POST",
									url : WEB_CONTEXT_PATH + '/check-session',
									dataType : "json",
									success : function(data) {
									},
									error: function(XMLHttpRequest, textStatus, errorThrown) {
										window.location.href = WEB_CONTEXT_PATH + '/home' ;
									}
								});
							}
						});
						$(window).resize();
						var tm = setTimeout(function(){
							$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('center',document.documentElement.scrollTop +  $(window).height()/2);
							window.scrollTo(0,0);
						}, 500);
					},
					afterClose: function(){
						$.ajax({
							type : "POST",
							url : WEB_CONTEXT_PATH + '/check-session',
							dataType : "json",
							success : function(data) {
								$('#updateCustomerDialog').html(html);
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								window.location.href = WEB_CONTEXT_PATH + '/home';
							}
						});
					}
				}
			);
		return false;
	},
	selectListCustomerType: function(){
		$('#errMsgCustomerTypeDlg').html('').hide();
		var arrId = new Array();
		var lstSize = $('#lstSize').val();
		for(var i=0;i<lstSize;i++){
			if($('#isCheck_'+i).is(':checked')){
				arrId.push($('#channelTypeId_'+i).val());
			}
		}
		var msg = '';
		if(arrId.length == 0){
			msg = PromotionCatalog_selectTypeClient;
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('numberOfCustomerType', PromotionCatalog_soSuatLoaiKH);
		}
		if(msg.length > 0){
			$('#errMsgCustomerTypeDlg').html(msg).show();
			return false;
		}
		var quantityMax = $('#numberOfCustomerType').val().trim();
		var promotionId = $('#promotionId').val();
		var shopId = $('#shopId').val();
		var dataModel = new Object();
		dataModel.lstCustomerTypeId = arrId;
		dataModel.quantityMax = quantityMax;
		dataModel.promotionId = promotionId;
		dataModel.shopId = shopId;
		if(quantityMax != null && quantityMax.length > 0){
			Utils.addOrSaveData(dataModel, '/catalog/promotion/changepromotioncustomertype', PromotionCatalog._xhrSave, 'errMsgCustomerTypeDlg', function(data){
				$('#successMsgCustomerTypeDlg').html(msgCommon1).show();
				PromotionCatalog.resetFormCustomerType();
				setTimeout(function(){$.fancybox.close();}, 1000);
			}, null, '.fancybox-inner', null, null);
		}else{
			if($('#status').val().trim() != '' && $('#status').val().trim() == 1){
				$.messager.confirm(msgXacNhan, PromotionCatalog_selectSoSuatTypeClient+','+SuperviseManageRouteCreate_confirmContinute+'? ', function(r){
					if (r == true){
						Utils.saveData(dataModel, "/catalog/promotion/changepromotioncustomertype", PromotionCatalog._xhrSave, null, function(){
							$('#successMsgCustomerTypeDlg').html(msgCommon1).show();
							PromotionCatalog.resetFormCustomerType();
							setTimeout(function(){$.fancybox.close();}, 1000);
						},null,null,null,null,true);
					}
				});
			}else{
				Utils.saveData(dataModel, "/catalog/promotion/changepromotioncustomertype", PromotionCatalog._xhrSave, null, function(){
					$('#successMsgCustomerTypeDlg').html(msgCommon1).show();
					PromotionCatalog.resetFormCustomerType();
					setTimeout(function(){$.fancybox.close();}, 1000);
				},null,null,null,null,true);
			}
		}
		return false;
	},
	updateCustomerInfo:function(customerId){
		$('#divOverlay_New').show();
		$('#errMsgUpdateDlg').html('').hide();
		var msg = '';
		if(msg.length == 0){
			msg = Utils.getMessageOfRequireCheck('statusUpdate', msgTrangThai,true);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfNegativeNumberCheck('quantityMaxUpdate', PromotionCatalog_SoSuat);
		}
		if(msg.length == 0){
			msg = Utils.getMessageOfMaxlengthValidate('quantityMaxUpdate', PromotionCatalog_SoSuat,10);
		}
		if(msg.length > 0){
			$('#errMsgUpdateDlg').html(msg).show();
			$('#divOverlay_New').hide();
			return false;
		}
		var quantityMax = $('#quantityMaxUpdate').val().trim();
		var status = $('#statusUpdate').val();
		var dataModel = new Object();
		dataModel.quantityMax = quantityMax;
		dataModel.status = status;
		dataModel.customerId = customerId;
		if(quantityMax != null && quantityMax.length > 0){
			Utils.addOrSaveData(dataModel, '/catalog/promotion/updatecustomerinfo', PromotionCatalog._xhrSave, 'errMsgUpdateDlg', function(data){
				$('#successMsgUpdateDlg').html(msgCommon1).show();
				$('#divOverlay_New').hide();
				if($('objectApplyValue').val() != '' && $('#objectApplyValue').val() == 2){//loai kh
					PromotionCatalog.resetFormCustomerType();
				}else{
					PromotionCatalog.resetFormCustomer();
				}
				setTimeout(function(){$.fancybox.close();}, 1000);
			}, null, '.fancybox-inner', null, null);
		}else{
			if($('#statusUpdate').val() != '' && $('#statusUpdate').val() == 1){
				$.messager.confirm(msgXacNhan, PromotionCatalog_selectSoSuat+','+SuperviseManageRouteCreate_confirmContinute+'? ', function(r){
					if (r == true){
						Utils.saveData(dataModel, "/catalog/promotion/updatecustomerinfo", PromotionCatalog._xhrSave, null, function(){
							$('#successMsgUpdateDlg').html(msgCommon1).show();
							if($('objectApplyValue').val() != '' && $('#objectApplyValue').val() == 2){//loai kh
								PromotionCatalog.resetFormCustomerType();
							}else{
								PromotionCatalog.resetFormCustomer();
							}
							setTimeout(function(){$.fancybox.close();}, 1000);
						},null,null,null,null,true);
					}
				});
			}else{
				Utils.addOrSaveData(dataModel, '/catalog/promotion/updatecustomerinfo', PromotionCatalog._xhrSave, 'errMsgUpdateDlg', function(data){
					$('#successMsgUpdateDlg').html(msgCommon1).show();
					if($('objectApplyValue').val() != '' && $('#objectApplyValue').val() == 2){//loai kh
						PromotionCatalog.resetFormCustomerType();
					}else{
						PromotionCatalog.resetFormCustomer();
					}
					setTimeout(function(){$.fancybox.close();}, 1000);
				}, null, '.fancybox-inner', null, null);
			}
		}
		return false;
	},
	loadShopTreeOnDialog: function(url){
		Utils.getJSON(url, function(data){
			$('#shopTree').jstree({
		        "plugins": ["themes", "json_data","ui","checkbox"],
		        "themes": {
		            "theme": "classic",
		            "icons": false,
		            "dots": true
		        },
		        "json_data": {
		        	"data": data,
		        	"ajax" : {
		        		"method": "GET",
		                "url" : '/rest/catalog/promotion-program/sub-shop/list.json?promotionId=' +$('#promotionId').val(),
		                "data" : function (n) {
		                        return { id : n.attr ? n.attr("id") : 0 };
		                    }
		            },
		            'complete':function(){
		            	setTimeout(function(){
		    				$('#shopTreeContent').jScrollPane();
		    			},500);
		    			$('#shopTree').bind("loaded.jstree open_node.jstree close_node.jstree", function (event, data) {
		    				setTimeout(function(){
		    					$('#shopTreeContent').jScrollPane();
		    				},500);
		    			});
		            }
		        }
			});
			$('#shopTree').bind("loaded.jstree open_node.jstree close_node.jstree", function (event, data) {
				if($('#shopTreeContent').data('jsp') != undefined || $('#shopTreeContent').data('jsp') != null) {
					$('#shopTreeContent').data('jsp').destroy();
					setTimeout(function(){
						$('#shopTreeContent').jScrollPane();
					},500);
				} else {
					setTimeout(function(){
						$('#shopTreeContent').jScrollPane();
					},500);
				}
				PromotionCatalog.getCheckboxStateOfTreeEx('shopTree',PromotionCatalog._mapShop,'shopTree li');
			});
		});
	},
	exportPromotionProduct:function(){
		$('#divOverlay').addClass('Overlay');
		$('#imgOverlay').show();
		$('#errExcelMsg').html('').hide();
	    var promotionId = $('#promotionId').val().trim();
		var productCode = $('#productCode').val().trim();
		var isCompel = $('#isCompel').is(':checked');
		var amountBuy = $('#amountBuy').val().trim().replace(/,/g,'');
		var totalBuyMoney = $('#totalBuyMoney').val().trim().replace(/,/g,'');
		var totalDiscountMoney = $('#totalDiscountMoney').val().trim().replace(/,/g,'');
		var percentDiscountMoney = $('#percentDiscountMoney').val().trim();
		var discountProduct = $('#discountProduct').val().trim();
		var discountAmount = $('#discountAmount').val().trim().replace(/,/g,'');
		var data = new Object();
		data.promotionId = promotionId;
		data.productCode = productCode;
		data.amountBuy = amountBuy;
		data.totalBuyMoney = totalBuyMoney;
		data.totalDiscountMoney = totalDiscountMoney;
		data.percentDiscountMoney = percentDiscountMoney;
		data.discountProduct = discountProduct;
		data.discountAmount = discountAmount;
		data.isCompel = isCompel;
		var url = "/catalog/promotion/getlistproducttoexport";
		CommonSearch.exportExcelData(data,url);
     },
     exportPromotionProductExcel:function(){
  		$.messager.confirm(msgXacNhan,SuperviseManageRouteCreate_exportExcel,function(r){
			if(r){
				$('#divOverlay').addClass('Overlay');
    	 		$('#imgOverlay').show();
    	 		$('#errExcelMsg').html('').hide();
    	 		var promotionId = $('#promotionId').val().trim();

    	 		var data = new Object();
    	 		data.promotionId = promotionId;
    	 		var url = "/catalog/promotion/exportProductPromotionExcel";
    	 		CommonSearch.exportExcelData(data,url);
				}
		});
 		return false;
     },
    /* importExcel:function(){
 		$('#isView').val(0);
 		var options = {
				beforeSubmit: ProductLevelCatalog.beforeImportExcel,
		 		success:      ProductLevelCatalog.afterImportExcelUpdate,
		 		type: "POST",
		 		dataType: 'html',
		 		data:({excelType:$('#excelType').val(),proType:$('#proType').val()})
		 	};
		$('#importFrm').ajaxForm(options);
 		$('#importFrm').submit();
 		return false;
 	},*/
 	viewExcel:function(){
 		$('#isView').val(1);
 		var options = {
				beforeSubmit: ProductLevelCatalog.beforeImportExcel,
		 		success:      ProductLevelCatalog.afterImportExcelUpdate,
		 		type: "POST",
		 		dataType: 'html',
		 		data:({excelType:$('#excelType').val(),proType:$('#proType').val()})
		 	};
		$('#importFrm').ajaxForm(options);
		$('#importFrm').submit();
 		return false;
 	},
 	importExcelProduct:function(){
 		if(parseInt($('#excelType').val()) == -1){
 			$('#errExcelMsg').html(PromotionCatalog_selectTypeImport).show();
 		}else{
 			$('#isView').val(0);
 			//fix here
 			var options = {
 					beforeSubmit: Product.beforeImportExcel,
 					success:      Product.afterImportExcelUpdate,
 					type: "POST",
 					dataType: 'html',
 					data:({excelType:$('#excelType').val(),promotionId:$('#promotionId').val(),token:$('#token').val().trim()})
 			};
 			$('#importFrm').ajaxForm(options);
 			$('#importFrm').submit();
 		}
 		return false;
 	},
 	viewExcelProduct:function(){
 		if(parseInt($('#excelType').val()) == -1){
 			$('#errExcelMsg').html(PromotionCatalog_selectTypeImport).show();
 		}else{
	 		$('#isView').val(1);
	 		var options = {
					beforeSubmit: ProductLevelCatalog.beforeImportExcel,
			 		success:      ProductLevelCatalog.afterImportExcelUpdate,
			 		type: "POST",
			 		dataType: 'html',
			 		data:({excelType:$('#excelType').val(),promotionId:$('#promotionId').val()})
			 	};
			$('#importFrm').ajaxForm(options);
			$('#importFrm').submit();
 		}
 		return false;
 	},
 	getParams:function(){
 		var promotionCode = $('#promotionCode').val().trim();
		var typeCode = $('#typeCode').val().trim();
		var shopCode = $('#shopCode').val().trim();
		var customerType = $('#customerType').val().trim();
		var startDate = $('#startDate').val().trim();
		var endDate = $('#endDate').val().trim();
		var status = $('#status').val().trim();
		var proType = $("#proType").val();
		var excelType = $('#excelType').val();
		var msg = '';
		var data = new Object();
		if (startDate != '' && !Utils.isDate(startDate)) {
			msg = msgCommonErr1;
			$('#startDate').focus();
		}
		if(msg.length == 0){
			if(endDate != '' && !Utils.isDate(endDate)){
				msg = msgCommonErr2;
				$('#endDate').focus();
			}
		}
		if(msg.length == 0){
			if(startDate != '' && endDate != ''){
				if(!Utils.compareDate(startDate, endDate)){
					msg = msgCommonErr3;
				}
			}
		}
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			data.error = true;
			return data;
		}else{
			data.error = false;
		}
		var tm = setTimeout(function() {
			$('#promotionCode').focus();
		}, 500);
		if(promotionCode != ''){
			data.promotionCode = promotionCode;
		}
		if(typeCode != ''){
			data.typeCode = typeCode;
		}
		if(shopCode != ''){
			data.shopCode = shopCode;
		}
		if(customerType != ''){
			data.customerType = customerType;
		}
		if(startDate != ''){
			data.startDate = startDate;
		}
		if(endDate != ''){
			data.endDate = endDate;
		}
		if(status != ''){
			data.status = status;
		}
		if(proType != ''){
			data.proType = proType;
		}
		if(excelType != ''){
			data.excelType = excelType;
		}
		return data;
 	},
 	exportExcel:function(){
		var params = PromotionCatalog.getParams();
		if(params.error != undefined && params.error) return;
		Utils.addOrSaveData(params, '/catalog/promotion/getexport', null, 'errMsg', function(data) {
			window.location.href=data.view;
			setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
                CommonSearch.deleteFileExcelExport(data.view);
          },300000);
		}, 'loading', null, null, SuperviseManageRouteCreate_exportExcel);
		return false;
 	},
 	exportProductPromotionExcel:function(){
		var params = PromotionCatalog.getParams();
		if(params.error != undefined && params.error) return;
		Utils.addOrSaveData(params, '/catalog/promotion/exportProductPromotion', null, 'errMsg', function(data) {
			window.location.href=data.view;
			setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
                CommonSearch.deleteFileExcelExport(data.view);
          },300000);
		}, 'loading', null, null, SuperviseManageRouteCreate_exportExcel);
		return false;
 	},
 	excelTypeChanged:function(){
 		if($('#excelType').val() == 1){
 			if($('#proType').val() == 1){
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_CTKM_thongtinchung.xls');
 			}else{
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_HTTM_thongtinchung.xls');
 			}
 		}
 		else if($('#excelType').val() == 3){
 			if($('#proType').val() == 1){
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_CTKM_Donvi.xls');
 			}else{
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_HTTM_Donvi.xls');
 			}
 		}else if($('#excelType').val() == 4){
 			if($('#proType').val() == 1){
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_CTKM_KH.xls');
 			}else{
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_HTTM_KH.xls');
 			}
 		}else if($('#excelType').val() == 5){
 			if($('#proType').val() == 1){
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_CTKM_Loai_KH.xls');
 			}else{
 				$('#downloadTemplate').attr('href',excel_template_path + 'catalog/Bieu_mau_danh_muc_HTTM_Loai_KH.xls');
 			}
 		}
 		$('#excelFile').val('');
 		$('#fakefilepc').val('');
 	},
 	removeAllAndActiveClass:function(str){
 		$("#productTab").removeClass("Active");
		$("#infoTab").removeClass("Active");
		$("#shopTab").removeClass("Active");
		$("#customerAttributeTab").removeClass("Active");
		if(str!=undefined && str!=null && str!=''){
			$("#"+str).addClass("Active");
		}
		//update css by Jquery
		$('#boxBodyTable .datagrid-header-row td img').closest("td").remove();
		$('.panel-title').prepend("<img class = 'dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/danhmucquanly.svg' />");
 	},
 	viewActionAudit:function(actionId){
 		if(actionId== undefined || actionId==null){
 			var actionId=0;
 		}
 		var url = PromotionCatalog.getSearchActionGridUrl(actionId);
 		$("#gridAction").setGridParam({url:url,page:1}).trigger("reloadGrid");
 	},
 	exportActionLog: function(){
		var id = $('#promotionId').val();
		var fromDate = $('#fromDate').val().trim();
		var toDate = $('#toDate').val().trim();
		ExportActionLog.exportActionLog(id, ExportActionLog.PROMOTION_PROGRAM, fromDate, toDate,'errMsg');
	},
 	gotoTab: function(tabIndex){
		PromotionCatalog.deactiveAllMainTab();
		switch (tabIndex) {
		case 0:
			$('#tabContent1').show();
			$('#tab1 a').addClass('Active');
			break;
		case 1:
			$('#tabContent2').show();
			$('#tab2 a').addClass('Active');
			AttributesManager.getAttributesForm('tabContent2',AttributesManager.PROMOTION_PROGRAM);
			$('#typeAttribute').val(AttributesManager.PROMOTION_PROGRAM);
			break;
		default:
			$('#tabContent1').show();
			break;
		}
	},
	deactiveAllMainTab: function(){
		$('#tab1 a').removeClass('Active');
		$('#tab2 a').removeClass('Active');
		$('#tabContent1').hide();
		$('#tabContent2').hide();
	},
	loadCommonPage:function(divId,url,kData,type){
		if(url.startsWith("http") == false || url.startsWith("http") =='false'){		    		
	   		 if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
	   			 url = WEB_CONTEXT_PATH  + url;
			     }   	
			}
		
		$.ajax({
			type : "POST",
			url : url,
			data : (kData),
			dataType: "html",
			success : function(data) {
				$('#'+divId).html(data).show();
				if(type == 0){
					Utils.bindAutoSave();
					if($('#promotionId').val().trim() > 0) {
						$('#promotionName').focus();
					} else {
						$('#promotionCode').focus();
					}
					$('.InputTextStyle , button').each(function(){
						$(this).bind('focus',function(){
							$('#cur_focus').val($(this).attr('id'));
						});
					});
				}else if(type == 1){
//					$('#productCode').focus();
//					Utils.bindAutoSearch();
				}else if(type == 2){
					$('#shopCode').focus();
					Utils.bindAutoSearch();
					var permissionUser = $('#permissionUser').val();
					if(permissionUser != 'true'){
						$('#promotionCustomerGrid').removeAttr('style');
						$('#promotionCustomerExGrid').removeAttr('style');
					}
					$('.InputTextStyle , button').each(function(){
						$(this).bind('focus',function(){
							$('#cur_focus').val($(this).attr('id'));
						});
					});
				}else if(type == 3){

				}
				//Replace position of button add new
//				var onclickAttr = $('#'+divId +' .datagrid-header-row td img').closest("a").attr('onclick');
//				$('#'+divId +' .datagrid-header-row td img').closest('td').hide();
//				var htmlButtonAdd ='';
//				if(onclickAttr != undefined && onclickAttr != '' && !$('#btnAddNewPromotion').length ){
////				htmlButtonAdd += '<div class="row"><div class="col-sm-12"> ' ;
//					htmlButtonAdd += '<button type="button" id="btnAddNewPromotion" tabindex="103" onclick="' + onclickAttr +'" ';
//					htmlButtonAdd +=' class="btn btn-primary buttonSearch textAreaButtom"> '
//					htmlButtonAdd += ' <i><img style="padding-bottom: 3px" class="refreshIcon" src="' + WEB_CONTEXT_PATH + '/resources/images/plus-white.svg" height="16"></i> <span style="padding-left: 5px !important;"> ';
//					htmlButtonAdd += lblAddNew ;
//					htmlButtonAdd +=' </span></button>';
//					$('#'+divId+ ' .box-header-title:first').parent().prepend(htmlButtonAdd);
//				}
			},
			complete: function(){
				//update css by Jquery
//				$('.panel-title').prepend("<img class = 'dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/danhmucquanly.svg' />");
				//
//				$('#'+divId)
//				$('.datagrid-header-rownumber, .datagrid-cell-rownumber').width('39px');
//				$(' .datagrid-header-rownumber').closest(".datagrid-header").width("40px");
//				$('#'+divId +' .datagrid-header-rownumber').closest("td").width("40px");
//				$('#'+divId +' .datagrid-cell-rownumber').closest(".datagrid-body").width("40px");
//				$('.datagrid-cell-rownumber').closest("td").width("50px");
				
				//End
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH + '/check-session',
					dataType : "json",
					success : function(data) {
						$('#divOverlay').removeClass('Overlay');
						hideLoading(loading);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href = WEB_CONTEXT_PATH + '/home';
					}
				});
			}
		});
		return false;
	},
	openShopQuantityDialog:function(id){
		PromotionCatalog._isPromotionPage = true;
		$('#errExcelMsg').html('').hide();
		var promotionId = $('#promotionId').val();
		var quantity = $('#quantityMax').val();
		var arrParam = new Array();
 		var param = new Object();
 		param.name = 'shopId';
 		if(id != null && id != undefined){
 	 		param.value = id;
 		}
 		var param1 = new Object();
 		param1.name = 'promotionId';
 		param1.value = promotionId;
 		arrParam.push(param);
 		arrParam.push(param1);
 			CommonSearch.searchShopPromotionProgram(function(data){
 				//$('#promotionProgramCode').val(data.code);
 			},arrParam, function(data){

 			});
 			PromotionCatalog.bindFormat();
	},
	updateQuantity:function(shopId,promotionId,quantity,quantityKM){
		$('#errExcelMsg').html('').hide();
		var params = new Object();
		params.shopId = shopId;
		params.promotionId = promotionId;
		params.quantityMax = quantity;
 		if(Number(quantityKM) > Number(quantity)){
 			setTimeout(function(){
					$('#errMsgShop').html(PromotionCatalog_rangeSoSuat).show();
    		},1000);
 			return false;
 		}
		Utils.addOrSaveData(params, '/catalog/promotion/updatequantity', null, 'errMsgShop', function(data){
			if(data.error == null || data.error == undefined){
				$('#errMsgSearchShop').html("").hide();
				PromotionCatalog.searchShop();
				$('#errMsgShop').html("").hide();
			 	$('#txt'+shopId).attr('disabled','disabled');
			 	$('#successMsgShop').html(msgCommon1).show();
				var tm = setTimeout(function(){
					$('#successMsgShop').html('').hide();
					clearTimeout(tm);
				}, 3000);
			 	//$('#link'+shopId).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return edit('+shopId+',\''+data.shopCode+'\','+quantity+');">');
				//$('#linkesc'+shopId).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/search_den.svg" onclick="return PromotionCatalog.searchCustomerShopMap('+$('#promotionId').val()+','+shopId+',\''+data.shopCode+'\');">');

				$('#link'+shopId).attr('onclick','return edit('+shopId+',\''+data.shopCode+'\','+quantity+');');
				$('#linkesc'+shopId).attr('onclick','return PromotionCatalog.searchCustomerShopMap('+$('#promotionId').val()+','+shopId+',\''+data.shopCode+'\');').html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/search_den.svg"/>');
			}
		}, null, null, null, PromotionCatalog_confirmUpdateSoSuatKM+" ?", null);
	},
	deletePromotionShopMap:function(groupId,promotionGroupMapId){
		$('#errExcelMsg').html('').hide();
		var params = new Object();
		params.shopId = groupId;
		params.promotionGroupMapId = promotionGroupMapId;
		params.promotionId = $('#promotionId').val();
		Utils.addOrSaveData(params, '/catalog/promotion/deleteshopmap', null, 'errMsgShop', function(data){
			if(data.error == null || data.error == undefined){
				PromotionCatalog.searchShop();
				$('#labelListCustomer').attr('style','display:none;');
				$('#promotionCustomerGrid').attr('style','display:none;');
				$('#boxSearch1').attr('style','display:none;');
				$('#errMsgShop').html('').hide();
				$('#successMsgShop').html(man_cus_msg_del_suc).show();
				var tm = setTimeout(function(){
					$('#successMsgShop').html('').hide();
					clearTimeout(tm);
				}, 3000);
			}
		}, null, null, null, PromotionCatalog_confirmDeleteUnit+"?", null);
	},
	onCheckShop:function(id,type){
		 var isCheck = $('.easyui-dialog #check_'+id).is(':checked');
		    if(isCheck){
		    	/*var value = $('.easyui-dialog #txtQuantity_'+id).val();
				PromotionCatalog._listQuantity.push(value);*/
				PromotionCatalog._listShopId.push(id);
				PromotionCatalog.lstType.push(type);
				var classParent = $('.easyui-dialog #check_'+id).attr('class');
				var flag = true;
				var count = 0;
				$('.'+classParent).each(function(){
					if($(this).is(':checked')){
						flag = false;
						count++;
					}
				});
				if(type != 1){
					if(flag || count == 1){
						CommonSearch.recursionFindParentShopCheck(id,type);
					}
				}
			}else{
		    	/*var value = $('.easyui-dialog #txtQuantity'+id).val();*/
				var index = PromotionCatalog.removeArrayByValue(PromotionCatalog._listShopId,id, type);
				/*PromotionCatalog.removeArrayByValue(PromotionCatalog._listQuantity,value);*/
				if (index != -1){
//					PromotionCatalog.removeArrayByValue(PromotionCatalog.lstType,type);
					PromotionCatalog.lstType.splice(index,1);
				}
				var classParent = $('.easyui-dialog #check_'+id).attr('class');
				var flag = true;
				var count = 0;
				$('.'+classParent).each(function(){
					if($(this).is(':checked')){
						flag = false;
					}
				});
				if(flag || count == 1){
					CommonSearch.recursionFindParentShopUnCheck(id,type);
				}
				//CommonSearch.recursionFindParentShopUnCheck(id);
			}
	},
	removeArrayByValue:function(arr,val, type){
		for(var i=0; i<arr.length; i++) {
	        if(arr[i] == val){
	        	if (PromotionCatalog.lstType[i] == type){
	        		arr.splice(i, 1);
			        return i;
	        	}
	        }
	    }
		return -1;
	},
	bindFormat:function(){
			$('#searchStyleShopContainerGrid input[type=text]').each(function(){
 				Utils.bindFormatOnTextfieldEx1($(this).attr('id'),Utils._TF_NUMBER,null,'#errMsgDialog',msgLoi3);
 			});
	},
	createPromotionShopMap:function(){
		var params = new Object();
		params.listShopId = PromotionCatalog._listShopId;
		params.lstType = PromotionCatalog.lstType;
		/*var flag = true;*/
		/*if(PromotionCatalog._listShopId.length > 0){
			var listSize = PromotionCatalog._listShopId.length;
			var s = $('#errMsgDialog').html();
			for(var i=0;i<listSize;i++){
				var value = $('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val();
				if(s.length > 0){
					if(value != null && value != undefined){
						value = value.replace(',','').replace(',','');
						value = value * 1;
						if(isNaN(value)){
							$('#errMsgDialog').html(msgLoi3).show();
							flag = false;
							break;
						}
					}
				}else{
					if(value != null && value != undefined){
						value = value.replace(',','').replace(',','');
						value = value * 1;
						if(isNaN(value)){
							$('#errMsgDialog').html(msgLoi3).show();
							flag = false;
							break;
						}
					}
				}
			}
			if(flag == false){
				return false;
			}

			for(var i=0;i<listSize;i++){
				var value = $('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val();
				if(value != null && value != undefined){
					PromotionCatalog._listQuantity[i] = value;
				}
			}
		}*/

//		params.listQuantity = PromotionCatalog._listQuantity;
		params.promotionId = $('#promotionId').val();
		if(PromotionCatalog._listShopId.length<=0
//			|| PromotionCatalog._listQuantity.length <= 0
			){
			$('.easyui-dialog #errMsgDialog').html(PromotionCatalog_noSelectUnit).show();
			return false;
		}
		Utils.addOrSaveData(params, '/catalog/promotion/createshopmap', null, 'errMsgDialog', function(data){
			if(data.error == undefined && data.errMsg == undefined){
				PromotionCatalog.searchShop();
				PromotionCatalog._listShopId = new Array();
				PromotionCatalog._listQuantity = new Array();
				$('#searchStyleShop1').dialog('close');
				$('#errMsgDialog').html('').hide();
				$('#errMsgShop').html('').hide();
				$('#errExcelMsg').html('').hide();
				//$('#successMsg').html('').hide();
				$('#successMsgShop').html(msgCommon1).show();
				var tm = setTimeout(function(){
					$('#successMsgShop').html('').hide();
					clearTimeout(tm);
				}, 3000);
			}
		}, null, null, null, PromotionCatalog_confirmAddObject, null);
	},
	copyPromotionProgram:function(){
		var promotionId = $('#promotionId').val();
		var params = new Object();
		params.promotionId = promotionId;
		var title = PromotionCatalog_confirmSaveCTKM;
		var promotionType = $('#promotionType').val();
		if(promotionType == "CTKM"){
			title = PromotionCatalog_confirmSaveCTKM;
			params.proType = 1;
		}
		if(promotionType == "CTHTTM"){
			title = PromotionCatalog_confirmSaveCTHTTM;
			params.proType = 2;
		}
		Utils.addOrSaveData(params, '/catalog/promotion/copypromotionprogram', null, 'errMsg', function(data){
			//PromotionCatalog.loadShop();
			$('.easyui-dialog').dialog('close');
		}, null, null, null, title, null);
	},
	openCopyPromotionProgram:function(){
		var arrParams = new Array();
		arrParams.push("promotion");
		CommonSearch.openSearchStyle1EasyUICopyPromotionShop(PromotionCatalog_promotionCode+'<span class="RequireStyle" style="color:red">*</span>',
				PromotionCatalog_promotionName+'<span class="RequireStyle" style="color:red">*</span>', PromotionCatalog_saveCTKM,"promotionProgramCode",
				"promotionProgramName",'searchStyle1EasyUIDialogDiv',arrParams);
	},
	openCopyPromotionManualProgram:function(){
		var arrParams = new Array();
		arrParams.push("promotionManual");
		CommonSearch.openSearchStyle1EasyUICopyPromotionShop(msgMaCKHTTM+'<span class="RequireStyle" style="color:red">*</span>',
				msgTenCKHTTM+'<span class="RequireStyle" style="color:red">*</span>', PromotionCatalog_saveCTHTTM,"promotionProgramCode",
				"promotionProgramName",'searchStyle1EasyUIDialogDiv',arrParams);
	},
	getPopupCustomerShopMapGridUrl: function(promotionId,shopId,customerCode,customerName,address){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchcustomershoppopup?promotionId="+ encodeChar(promotionId) + "&shopId=" + encodeChar(shopId) + "&customerCode=" + encodeChar(customerCode) + "&customerName=" + encodeChar(customerName) + "&address=" + encodeChar(address);
	},
	getCustomerShopMapGridUrl: function(promotionId,shopId,customerCode,customerName,customerAddress){
		return WEB_CONTEXT_PATH + "/catalog/promotion/searchcustomershop?promotionId="+ encodeChar(promotionId) + "&shopId=" + encodeChar(shopId) + "&customerCode="+encodeChar(customerCode)+"&customerName="+encodeChar(customerName)+"&address="+encodeChar(customerAddress);
	},
	searchCustomerShopMap:function(promotionId,shopId,shopCode){
		$('#promotionShopMap').val(promotionId);
		$('#errExcelMsg').html('').hide();
		var statusPermission = $('#statusPermission').val();
		$('#shopMapId').val(shopId);
		$('#labelShop').html("("+shopCode+")");
		var value = $('#shopCodeHidden').val();
		if(value != null && value != undefined && shopCode != null && shopCode != undefined && value != shopCode){
			$('#customerCodeSearch').val('');
			$('#customerNameSearch').val('');
			$('#customerAddressSearch').val('');
		}
		$('#shopCodeHidden').val(shopCode);
		$('#errMsgCustomer').html("").hide();
		$('#promotionCustomerGrid').removeAttr('style');
		$('#promotionCustomerExGrid').show();
		$('#labelListCustomer').removeAttr('style');
		var customerCode = $('#customerCodeSearch').val().trim();
		var customerName = $('#customerNameSearch').val().trim();
		var customerAddress = $('#customerAddressSearch').val().trim();
		var value = $('#divWidth').width()-40;
		var shortCodeWidth = (value * 10)/100;
		var customerNameWidth = (value * 20)/100;
		var addressWidth = (value * 27)/100 -4;
		var quantityMaxWidth = (value * 15)/100;
		var deleteWidth = (value * 5)/100;
		var permissionUser = $('#permissionUser').val();
		var titleOpenDialogCustomer = "";
		if(statusPermission == 2 && $('#isAllowEditProPgram').val() == 'true'){
			titleOpenDialogCustomer = '<a href="javascript:void(0);" onclick="return PromotionCatalog.openCustomerShopQuantityDialog(\''+shopCode+'\');"><img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-add.png"></a>';
		}

		$("#promotionCustomerExGrid").datagrid({
			  url:PromotionCatalog.getCustomerShopMapGridUrl(promotionId,shopId,customerCode,customerName,customerAddress),
			  columns:[[
			    {field:'shortCodeShopMap', title: catalog_customer_code, width: shortCodeWidth, sortable:false,resizable:false , align: 'left',formatter:function(value,row,index){
			    	return Utils.XSSEncode(row.customer.customerCode);
			    }},
			    {field:'customerNameShopMap', title: catalog_customer_name, width:customerNameWidth, sortable:false,resizable:false , align: 'left',formatter:function(value,row,index){
			    	return Utils.XSSEncode(row.customer.customerName);
			    }},
			    {field:'addressShopMap', title: SuperviseManageRouteCreate_customerAddress, width: addressWidth, sortable:false,resizable:false , align: 'left',formatter:function(value,row,index){
			    	return Utils.XSSEncode(row.customer.address);
			    }},
			    {field:'quantityMax', title: PromotionCatalog_SoSuat, width: quantityMaxWidth,sortable:false,resizable:false , align: 'center',formatter:function(value,row,index){
			    	var value="";
			    	if((row.quantityMax != null && row.quantityMax != undefined && row.quantityMax != "" && row.quantityMax != "null") || row.quantityMax == 0){
		    			value = formatCurrency(row.quantityMax);
		    		}
			    	if(statusPermission == 1 || statusPermission == 2){

			    		return '<input type="text" id="txt_'+row.id+'" value="'+value+'" style="text-align:center;width='+(quantityMaxWidth-4)+'px;" class="soSuatKMCustomer" disabled="disabled" maxlength="9"/>';
			    	}else{
			    		return value;
			    	}
			    }},
			    {field:'quantityReceived', title: PromotionCatalog_soSuatDaKM, width: quantityMaxWidth,sortable:false,resizable:false , align: 'center',formatter:function(value,row,index){
			    	if(row.quantityReceived != null && row.quantityReceived != undefined && row.quantityReceived != "" && row.quantityReceived != 0){
		        		return formatCurrency(row.quantityReceived) + '<input type="hidden" id="txtqr_'+row.id+ '" value="'+row.quantityReceived+'"/>';
		        	}
			    	else{
		        		return '0' + '<input type="hidden" id="txtqr_'+row.id+ '" value="'+row.quantityReceived+'"/>';;
		        	}
//			    	return row.quantityReceived + '<input type="hidden" id="txtqr_'+row.id+ '" value="'+row.quantityReceived+'"/>';
			    }},
			    {field:'edit', title: msgCommonThaoTac, width: deleteWidth, align: 'center',sortable:false,resizable:false, formatter:
			    function(value,row,index){
			    	if($('#isAllowEditProPgram').val() == 'true'){
			    		if(statusPermission == 1 || statusPermission == 2){
				    		return '<a href="javascript:void(0);" id="link_'+row.id+'"><img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.edit('+row.id+','+row.shop.id+','+row.promotionShopMap.promotionProgram.id+','+row.quantityMax+');"></a>';
				    	}
			    	}else{
			    		return '';
			    	}


			    }},
			    {field:'delete', title: titleOpenDialogCustomer, width: deleteWidth, align: 'center',sortable:false,resizable:false, formatter: function(value,row,index){
			    	if($('#isAllowEditProPgram').val() == 'true'){
			    		if(statusPermission == 2){
				    		return '<a href="javascript:void(0);" id="linkdelete_'+row.id+'" ><img src="' + WEB_CONTEXT_PATH + '/resources/images/delete_black.svg" onclick="return PromotionCatalog.deleteCustomer('+row.id+','+row.shop.id+','+row.promotionShopMap.promotionProgram.id+');"></a>';
				    	}
				    	if(statusPermission == 1){
				    		return '<a href="javascript:void(0);" id="linkdelete_'+row.id+'" ></a>';
				    	}
			    	}else{
			    		return '';
			    	}
			    }},
			    {field:'id', hidden:true}
			  ]],
			  height: 'auto',
			  rownumbers: true,
			  pagination:true,
			  width: ($('#divWidth').width()-40),
			  onLoadSuccess :function(data){
			    	$('.datagrid-header-rownumber').html(stt_label);
			    	var originalSize = $('.datagrid-header-row td[field=shortCodeShopMap] div').width();
			    	if(originalSize != null && originalSize != undefined){
			    		PromotionCatalog._listCustomerSize.push(originalSize);
			    	}
			    	Utils.updateRownumWidthForJqGridEX1(null,'shortCodeShopMap',PromotionCatalog._listCustomerSize);
			    	$('.soSuatKMCustomer').each(function(){
			    		Utils.formatCurrencyFor($(this).attr('id'));
			    	});
			  }
			});
	},
	edit:function(id,shopId,promotionId,quantityMax){
		$('#errMsgCustomer').html("").hide();
		var statusPermission = $('#statusPermission').val();
		$('#txt_'+id).removeAttr('disabled');
		Utils.bindFormatOnTextfieldEx1('txt_'+id,Utils._TF_NUMBER,null,'#errMsgCustomer',msgLoi3);
		if(statusPermission == 2 || statusPermission ==1){
			$('#link_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.save('+id+','+shopId+','+promotionId+','+quantityMax+');">');
			$('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_esc.png" onclick="return PromotionCatalog.esc('+id+','+shopId+','+promotionId+','+quantityMax+');">');
		}
	},
	save:function(id,shopId,promotionId,quantityMax){
		var statusPermission = $('#statusPermission').val();
//		Utils.bindFormatOnTextfield('txt_'+id,Utils._TF_NUMBER,null);
//		if(statusPermission == 2 || statusPermission == 1){
//			$('#link_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.edit('+id+','+shopId+','+promotionId+','+quantityMax+');">');
//		}
		if(statusPermission == 2 || statusPermission == 1){
			var s = $('#errMsgCustomer').html();
			var s1 = $('#txtqr_'+id).val();
			if(s1 != null && s1 != undefined){
				s1 = s1.replace(',','').replace(',','');
			}
			if(s.length > 0){
				var value = $('#txt_'+id).val();
				if(value != null && value != undefined){
					value = value.replace(',',''.replace(',',''));
					value = value * 1;
					if(isNaN(value)){
						$('#errMsgCustomer').show();
						$('#txt_'+id).focus();
					}else{
						PromotionCatalog.updateCustomerQuantity(id,shopId,promotionId,$('#txt_'+id).val().replace(',','').replace(',',''),s1);
					}
				}
			}else{
				var value = $('#txt_'+id).val();
				if(value != null && value != undefined){
					value = value.replace(',','').replace(',','');
					value = value * 1;
					if(isNaN(value)){
						$('#errMsgCustomer').html(msgLoi3).show();
						$('#txt_'+id).focus();
					}else{
						PromotionCatalog.updateCustomerQuantity(id,shopId,promotionId,$('#txt_'+id).val().replace(',','').replace(',',''),s1);
					}
				}
				//PromotionCatalog.updateCustomerQuantity(id,shopId,promotionId,$('#txt_'+id).val(),s1);
				//$('#link_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.edit('+id+','+shopId+','+promotionId+','+quantityMax+');">');
				//$('#linkesc'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/search_den.svg" onclick="return PromotionCatalog.searchCustomerShopMap('+$('#promotionId').val()+','+id+',\''+shopCode+'\');">');
//				if(statusPermission == 2){
//					$('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-delete.png" onclick="return PromotionCatalog.deleteCustomer('+id+','+shopId+','+promotionId+');">');
//				}
//				if(statusPermission == 1){
//					$('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-delete.png">');
//				}
			}
		}
	},
	esc:function(id,shopId,promotionId,quantityMax){
		$('#errMsgCustomer').html("").hide();
		var row = $('#promotionCustomerExGrid').datagrid('getSelected');
		var statusPermission = $('#statusPermission').val();
//		   if (row){
			   $('#txt_'+id).val(formatCurrency(quantityMax));
			   if(statusPermission == 2 || statusPermission == 1){
				   $('#link_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.edit('+id+','+shopId+','+promotionId+','+quantityMax+');">');
			   }
			   if(statusPermission == 2){
				   $('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/delete_black.svg" onclick="return PromotionCatalog.deleteCustomer('+id+','+shopId+','+promotionId+');">');
			   }
			   if(statusPermission == 1){
				   $('#linkdelete_'+id).html('');
			   }
			   Utils.bindFormatOnTextfield('txt_'+id,Utils._TF_NUMBER,null);
			   $('#txt_'+id).attr('disabled','disabled');
//		   }
	},
	openCustomerShopQuantityDialog:function(shopCode){
		$('#errExcelMsg').html('').hide();
		var promotionShopMap = $('#promotionShopMap').val();
		var shopId = $('#shopMapId').val();
		var arrayParam = new Array();
		var param = new Object();
		param.name = 'promotionShopMapId';
		param.value = promotionShopMap;
		arrayParam.push(param);

		param = new Object();
		param.name = 'shopId';
		param.value = shopId;
		arrayParam.push(param);
		CommonSearch.openSearchStyleCustomerShopEasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label+"("+shopCode+")", "/catalog/promotion/searchcustomershoppopup", null,
				"customerCode", "customerName", arrayParam, null,SuperviseManageRouteCreate_customerAddress, 'address');
		return false;
	},
	updateCustomerQuantity:function(id,shopId,promotionId,quantity,quantityKM){
		$('#errExcelMsg').html('').hide();
		var params = new Object();
		params.id = id;
		params.quantityMax = quantity;
		var statusPermission = $('#statusPermission').val();
		if(quantity != null && quantity != undefined && quantity != ""){
			if(quantityKM > quantity){
	 			setTimeout(function(){
						$('#errMsgCustomer').html(PromotionCatalog_rangeSoSuat).show();
	    		},1000);
	 			return false;
	 		}
		}
		Utils.addOrSaveData(params, '/catalog/promotion/updatecustomershop', null, 'errMsgCustomer', function(data){
			if(data.error == null || data.error == undefined){
				PromotionCatalog.searchCustomerShopMap(promotionId,shopId,data.shopCode);
				$('#successMsg').html('').hide();
				$('#successMsgCustomer').html(msgCommon1).show();
				var tm = setTimeout(function(){
					$('#successMsgCustomer').html('').hide();
					clearTimeout(tm);
				}, 3000);
				$('#txt_'+shopId).attr('disabled','disabled');
				$('#link_'+shopId).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" onclick="return PromotionCatalog.edit('+id+','+shopId+','+promotionId+','+quantity+');">');
				//$('#linkesc'+shopId).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-view.png" onclick="return PromotionCatalog.searchCustomerShopMap('+promotionId+','+shopId+',\''+data.shopCode+'\');">');
				if(statusPermission == 2){
					$('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/delete_black.svg" onclick="return PromotionCatalog.deleteCustomer('+id+','+shopId+','+promotionId+');">');
				}
				if(statusPermission == 1){
					$('#linkdelete_'+id).html('<img src="' + WEB_CONTEXT_PATH + '/resources/images/delete_black.svg">');
				}
				$('#errMsgCustomer').html("").hide();
			}
		}, null, null, null, PromotionCatalog_confirmUpdateClient+" ?", null);
	},
	deleteCustomer:function(id,shopId,promotionId){
		$('#errExcelMsg').html('').hide();
		var params = new Object();
		params.id = id;
		Utils.addOrSaveData(params, '/catalog/promotion/deletecustomershop', null, 'errMsgCustomer', function(data){
			PromotionCatalog.searchCustomerShopMap(promotionId,shopId,data.shopCode);
			$('#errMsgCustomer').html("").hide();
			$('#successMsg').html('').hide();
			$('#successMsgCustomer').html(man_cus_msg_del_suc).show();
			var tm = setTimeout(function(){
				$('#successMsgCustomer').html('').hide();
				clearTimeout(tm);
			}, 3000);
		}, null, null, null, PromotionCatalog_confirmDeleteClient+" ?", null);
	},
	bindFormatQuantityCustomer:function(id){
		Utils.bindFormatOnTextfieldEx1($(id).attr('id'),Utils._TF_NUMBER,null,'#errMsgSearchCustomer',msgLoi3);
	},
	/*importExcel:function(){
		$('#isView').val(0);
		var options = {
				beforeSubmit: ProductLevelCatalog.beforeImportExcel,
		 		success:      ProductLevelCatalog.afterImportExcelUpdate,
		 		type: "POST",
		 		dataType: 'html',
		 		data:({importExcelType:$('#excelType').val(),id:$('#promotionId').val(),token:$('#token').val().trim()})
		 	};
		$('#importFrm').ajaxForm(options);
 		$('#importFrm').submit();
 		return false;
	},	*/
	exportPromotionShopMap:function(){
		$('#divOverlay').show();
		$('#errMsg').html('').hide();
		$('#errExcelMsg').html('').hide();
		var data = new Object();
		var code = $('#shopCode').val();
		var name = $('#shopName').val();
		var quantityMax = $('#quantityMax').val();

		data.id =$('#promotionId').val();
		data.shopCode = code;
		data.shopName = name;
		data.quantityMax = quantityMax;
		var url = "/catalog/promotion/exportPromotionShopMap";
		CommonSearch.exportExcelData(data,url);
	},
	importPromotionShopMap:function(){
 		$('#isView').val(0);
 		var options = {
				beforeSubmit: ProductLevelCatalog.beforeImportExcel,
		 		success:      ProductLevelCatalog.afterImportExcelUpdate,
		 		type: "POST",
		 		dataType: 'html',
		 		data:({excelType:2,proType:$('#proType').val(),id:$('#promotionId').val(),token:$('#token').val().trim()})
		 	};
		$('#importFrm').ajaxForm(options);
 		$('#importFrm').submit();
 		return false;
 	},
 	//promotioncatalog_Huy
 	afterImportExcelUpdate: function(responseText, statusText, xhr, $form){
		hideLoadingIcon();
		if (statusText == 'success') {
	    	$("#responseDiv").html(responseText);
	    	if ($('#responseToken').html().trim() != undefined && $('#responseToken').html().trim() != null && $('#responseToken').html().trim() != ''){
	    		$('#token').val($('#responseToken').html().trim());
	    	}
	    	if($('#errorExcel').html().trim() == 'true' || $('#errorExcelMsg').html().trim().length > 0){
	    		$('#errExcelMsg').html($('#errorExcelMsg').html()).show();
	    	} else {
	    		if($('#typeView').html().trim() == 'false'){
	    			var totalRow = parseInt($('#totalRow').html().trim());
	    			var numFail = parseInt($('#numFail').html().trim());
	    			var fileNameFail = $('#fileNameFail').html();
	    			var mes = format(msgErr_result_import_excel,(totalRow - numFail),numFail);
	    			//TODO
	    			if(numFail > 0){
//	    				mes+= ' <a href="'+ fileNameFail +'">Xem chi tiết lỗi</a>';
	    				mes=SuperviseManageRouteCreate_duplicateRows+'.'+ ' <a href="'+ fileNameFail +'">'+msgCommon5+'</a>';
	    			}
	    			if($('#excelFileBonus').length!=0 && $('#fakefilepcBonus').length!=0){//xóa link khi import
	    				try{$('#excelFileBonus').val('');$('#fakefilepcBonus').val('');}catch(err){}
	    			}
	    			$('#errExcelMsg').html(mes).show();
	    			if(ProductLevelCatalog._callBackAfterImport != null){
		    			ProductLevelCatalog._callBackAfterImport.call(this);
		    		}
	    		}
	    	}
	    }
	},
 	exportExcelTTCTKM:function(){
		$.messager.confirm(xacnhan, comuonexport, function(r){

			if (r){
				var promotionId = $('#promotionId').val();
//				var params = PromotionCatalog.getParams();
				var params = new Object();
				params.promotionId = promotionId;
				params.checkInOut = '2';
				var url = "/catalog/promotion/export-excel";
				showLoadingIcon();
				ReportsUtils.exportExcel(params, url, 'errExcelMsg', true);
			}
		});
 		return false;
 	},

	importExcel: function() {
		ReportsUtils.uploadExcel(function(){
			$('#searchStyleShopGrid').datagrid('reload');
		});
	}

};



/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.promotion-catalog.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.easy-ui.common.js
 */
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
		$('#grid').datagrid('resize');
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
                        read: WEB_CONTEXT_PATH+"/catalog/product/autocomplete?isExceptZCat=true"
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
	            			var ce = this.element.parent().parent().parent().parent().parent().parent().parent().parent().children().first().next().next().children().children().children().children().children().children();
	            			ce.val(pName);
	            			ce.attr('disabled','disabled');
            			} else {
            				var ccode = $("#grid").datagrid("getRows")[EasyUiCommon.editIndex].productCode;
            				this.element.val(ccode);
	            			var ce = this.element.parent().parent().parent().parent().parent().parent().parent().parent().children().first().next().next().children().children().children().children().children().children();
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
//		if(permission == 'true'){
//			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
//		}
		if(field3 != null && field3 != undefined && field4 != null && field4 != undefined ){
			$('#'+gridId).datagrid({
				url : url,
				pageList  : [10,20,30],
				width:$('#boxBodyTable').width(),
				height:'auto',
				scrollbarSize :10,
//				rownumbers:true,
				autoRowHeight: true,
				height:420,
				columns:[[
					{field:'rownum', title: msgSTT, width: 50, align: 'center',formatter:function(value,row,index){
							return (index+1);
					}},
			          {field: _field1,title: _title1, width:400,align:'left',sortable : false,resizable : false,
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
			          {field: 'remove',title:addRow, width:140,align:'center',sortable : false,resizable : false,
			        	  formatter: function(value,row,index){
			        		  if(permission == 'true'){
			        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/delete_black.svg'/></a>";
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
			        	  $(ed3.target).next().children().attr('maxlength','15');
			        	  $(ed4.target).next().children().attr('maxlength','15');
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
//		if(permission == 'true'){
//			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
//		}
		if(field3 != null && field3 != undefined && field4 != null && field4 != undefined ){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				scrollbarSize : 0,
				//rownumbers:true,
				height:420,
				autoRowHeight: true,
				columns:[[
				{field:'rownum', title: msgSTT, width: 50, align: 'center',formatter:function(value,row,index){
					return (index+1);
				}},	
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
						  return 'font-size:13;';
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
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/delete_black.svg'/></a>";
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
		        		  $(ed3.target).next().children().attr('maxlength','15');
		        	  }
		        	  if(ed4 != null && ed4 != undefined){
		        		  $(ed4.target).bind('focus',function(event){
		        			  EasyUiCommon.showGridDialog(index,'saleQty',msgSoLuong,'numberbox',false);
		        		  });
		        		  $(ed4.target).next().children().attr('maxlength','15');
		        	  }
	            	}
	            },
				method : 'GET',
	            onLoadSuccess:function(){
	            	//$('.datagrid-header-rownumber').html(SuperviseManageRouteCreate_STT);
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
//		if(permission == 'true'){
//			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
//		}
		if(field2 != null && field2 != undefined && field3 != null && field3 != undefined ){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width: $('.GridSection').width() -20,
				scrollbarSize : 0,
				//rownumbers:true,
				autoRowHeight: true,
				height:420,
				columns:[[
				{field:'rownum', title: msgSTT, width: 25, align: 'center',formatter:function(value,row,index){
					return (index+1);
				}},
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
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/delete_black.svg'/></a>";
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
			        	  $(ed2.target).next().children().attr('maxlength','15');
			        	  $(ed3.target).next().children().attr('maxlength','15');
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
	        		$('#'+gridId).datagrid('resize');
	            }
			});
		}
	},
	dataGrid0912 : function(gridId,url,field,title,urlComboGrid,type,permission){
		var addRow = '';
//		if(permission == 'true'){
//			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
//		}
		if(field != null && field != undefined){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				fitColumns:true,
				height:420,
				//rownumbers:true,
				scrollbarSize : 0,
				autoRowHeight: true,
				columns:[[
				{field:'rownum', title: msgSTT, width: 25, align: 'center',formatter:function(value,row,index){
					return (index+1);
				}},
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
		        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('"+index+"',true)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/delete_black.svg'/></a>";
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
	            		$(ed2.target).next().children().attr('maxlength','15');
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
	        		$('#'+gridId).datagrid('resize');

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
//		if(permission == 'true'){
//			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
//		}
		$('#'+gridId).datagrid({
			url : url,
			total:100,
			width: $('.GridSection').width() -20,
			scrollbarSize : 0,
			//rownumbers:true,
			autoRowHeight: true,
			height:420,
			columns:[[
			{field:'rownum', title: msgSTT, width: 25, align: 'center',formatter:function(value,row,index){
				return (index+1);
			}},
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
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/delete_black.svg'/></a>";
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
//		if(permission == 'true'){
//			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
//		}
		var _field1 = 'productCodeStr';
		var _title1 = msgSanPhamMua;
		if(field2 != null && field2 != undefined){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				scrollbarSize : 18,
				//rownumbers:true,
				autoRowHeight: true,
				height:420,
				columns:[[
				{field:'rownum', title: msgSTT, width: 25, align: 'center',formatter:function(value,row,index){
					return (index+1);
				}},
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
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/delete_black.svg'/></a>";
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
			        	  $(ed2.target).next().children().attr('maxlength','15');
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
//		if(permission == 'true'){
//			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
//		}
		if(field1 != null && field1 != undefined && field2 != null && field2 != undefined){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				//height:'auto',
				//rownumbers:true,
				scrollbarSize : 18,
				autoRowHeight: true,
				height:420,
				columns:[[
				{field:'rownum', title: msgSTT, width: 25, align: 'center',formatter:function(value,row,index){
					return (index+1);
				}},
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
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/delete_black.svg'/></a>";
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
			        	  $(ed.target).next().children().attr('maxlength','15');
			        	  $(ed2.target).next().children().attr('maxlength','15');
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
//		if(permission == 'true'){
//			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
//		}
		if(field1 != null && field1 != undefined && field2 != null && field2 != undefined){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				scrollbarSize : 18,
				//rownumbers:true,
				autoRowHeight: true,
				height:420,
				columns:[[
				{field:'rownum', title: msgSTT, width: 25, align: 'center',formatter:function(value,row,index){
					return (index+1);
				}},
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
	        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('" + index + "',false)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/delete_black.svg'/></a>";
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
//		if(permission == 'true'){
//			addRow = "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.appendRowOnGrid('grid')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-add.png'/></a>";
//		}
		if(field != null && field != undefined && fieldFree != null && fieldFree != undefined){
			$('#'+gridId).datagrid({
				url : url,
				total:100,
				width:$('.GridSection').width() -20,
				fitColumns:true,
				//rownumbers:true,
				scrollbarSize : 0,
				autoRowHeight: true,
				columns:[[
				{field:'rownum', title: msgSTT, width: 25, align: 'center',formatter:function(value,row,index){
					return (index+1);
				}},
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
		        			  return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnGrid('"+index+"',true)\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/delete_black.svg'/></a>";
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
			//autoRowHeight : false,
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
				//title = '<a href="javascript:void(0);" onclick="EasyUiCommon.showTreeGridDialog('+isPromotionProduct+');"><img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-add.png"></a>';
				$('#btnAddNew').attr('onclick','return EasyUiCommon.showTreeGridDialog('+isPromotionProduct+');'); 
			}else{
				$('#btnChange').hide();
				$('#btnAddNew').hide();
			}
		}else{
			$('#btnChange').hide();
			$('#btnAddNew').hide();
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
					//fitColumns:true,
					queryParams:{
				 	},
					width : ($('.easyui-dialog #gridDialogUpdate').width()+10),
				    columns:[[
				        {field:'productCode',title:msgMaSanPham,align:'left', width:200, sortable : false,resizable : false,fixed:true,
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
				        {field:'productName',title:msgTenSanPham,align:'left', width:250, sortable : false,resizable : false,fixed:true, formatter: function(value, rowData, rowIndex){
							return Utils.XSSEncode(value);
						}
				        },
				        {field: _comboGridField3,title: _comboGridTitle3, width:80,align:'center',sortable : false,resizable : false,fixed:true,
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
										return "<a href='javascript:void(0)' onclick=\"return EasyUiCommon.removeRowOnDialog('.easyui-dialog #searchGridUpdate','" + index + "','"+isTwoDetail+"')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/delete_black.svg'/></a>";
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
                    read:WEB_CONTEXT_PATH+ "/catalog/product/autocomplete?isExceptZCat="+EasyUiCommon.isExceptZ
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
		var idProductCodeCommon;
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
					idProductCodeCommon = $('#productCode_'+num).val();
					if(idProductCodeCommon != undefined && idProductCodeCommon != '' && idProductCodeCommon.length > 0 && $(this).parent().parent().parent().children().first().next().children().text() != ''){
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
					idProductCodeCommon = $('#productCode_'+num).val();
					if(idProductCodeCommon != undefined && idProductCodeCommon != '' && idProductCodeCommon.length > 0 && $(this).parent().parent().parent().children().first().next().children().text() != ''){
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
					idProductCodeCommon = $('#productCode_'+num).val();
					if(idProductCodeCommon != undefined && idProductCodeCommon != '' && idProductCodeCommon.length > 0 /*&& $(this).parent().parent().parent().children().first().next().children().text() != ''*/){
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
					idProductCodeCommon = $('#productCode_'+num).val();
					if(idProductCodeCommon != undefined && idProductCodeCommon != '' && idProductCodeCommon.length > 0 && $(this).parent().parent().parent().children().first().next().children().text() != ''){
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

								$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().first().next().children().html(lstProductCode);
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
						$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().first().next().children().html(lstProductCode);
					}else if(type == 'ZV13' || type == 'ZV16'){
						$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().first().next().children().html(lstProductCode);
					}else if(type == 'ZV14' || type == 'ZV17'){
						$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().first().next().children().html(lstProductCode);
					}else if(type == 'ZV21'){
						$(ed.target).parent().parent().parent().parent().parent().parent().parent().children().first().next().next().children().html(lstProductCode);
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
		        			  return '<input maxlength="15" style="width:140px" class="numberSecondDialog" id="quantity_'+row.id+'" onfocus="return Utils.bindFormatOnTextfield(\'quantity_'+row.id+'\',Utils._TF_NUMBER,null);" onkeypress="NextAndPrevTextField(event,this,\'numberSecondDialog\')"/>';
		        		  }else{
		        			  return '<input maxlength="15" style="width:140px" type="checkbox" class="checkSecondDialog" id="quantity_'+row.id+'" onkeypress="NextAndPrevTextField(event,this,\'checkSecondDialog\')"/>';
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
            onBeforeExpand:function(row){
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
            onExpand:function(row){
//            	var type = 0;
//            	if(row.attributes != undefined && row.attributes.productTreeVO != undefined){
//            		type = row.attributes.productTreeVO.type;
//            	}
//            	var param = '&code=&name=&typeObject=2&parentId='+row.id+'&type='+row.attributes.productTreeVO.type+'&isPromotionProduct='+isPromotionProduct;
//            	setTimeout(function(){
//            		Utils.getJSON('/rest/catalog/product/tree-grid/0.json?id='+$('#promotionId').val()+'&shopId='+$('#shopIdLogin').val() + param,function(data){
//	            		var isExist = false;
//	            		for(var i = 0; i < data.rows.length ; i++){
//	            			if(EasyUiCommon._lstProductExpand.indexOf(data.rows[i].id) > -1){
//	            				isExist = true;
//	            				break;
//	            			}else{
//	            				EasyUiCommon._lstProductExpand.push(data.rows[i].id);
//	            			}
//	            		}
//	            		if(!isExist){
//            				$('#treeGrid').treegrid('append',{
//            					parent: row.id,
//            					data: data.rows
//            				});
//	            		}
//	        		});
//            	},500);
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
			left = $('.datagrid-view .datagrid-view2').width() + 232;
//			img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,true)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,true)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			if(value != '' && value != null && value != undefined){
				return EasyUiCommon.cssForNumberBox(Utils.XSSEncode(value)) + img;
			}
		}else if(type == 'ZV07' || type == 'ZV08'|| type == 'ZV10'|| type == 'ZV11'){
			left = $('.datagrid-view .datagrid-view2').children().first().children().children().children().children().children().first().next().children().width() + 60;
//			img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','required',msgBatBuocMua,'checkbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','required',msgBatBuocMua,'checkbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
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
			img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','required',msgBatBuocMua,'checkbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
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
//				img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',true,true)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',true,true)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				if(value != '' && value != null && value != undefined){
					return EasyUiCommon.cssForNumberBox(Utils.XSSEncode(value)) + img;
				}
			}else{
				left = $('.datagrid-view .datagrid-view2').children().first().children().children().children().children().children().first().next().children().width() - 18;
//				img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','required',msgBatBuocMua,'checkbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','required',msgBatBuocMua,'checkbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
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
				img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',true,true)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
//				img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',true,true)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			}else{
				left = $('.datagrid-view .datagrid-view2').children().first().children().children().children().children().children().first().next().children().width() - 18;
				if(type == 'ZV15'){
//					img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
					img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				}else{
//					img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','amount',msgTongTienMua,'numberbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
					img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','amount',msgTongTienMua,'numberbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				}
			}
			if(value != '' && value != null && value != undefined){
				return EasyUiCommon.cssForNumberBox(value) + img;
			}
		}else if(type == 'ZV13' || type == 'ZV14'|| type == 'ZV16'|| type == 'ZV17'){
			left = $('.datagrid-view .datagrid-view2').children().first().children().children().children().children().children().first().next().children().width() - 18;
			if(type == 'ZV13' || type == 'ZV14'){
//				img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			}else{
//				img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','amount',msgTongTienMua,'numberbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','amount',msgTongTienMua,'numberbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			}
			if(value != '' && value != null && value != undefined){
				return EasyUiCommon.cssForNumberBox(Utils.XSSEncode(value)) + img;
			}
		}else if(type == 'ZV21'){
			left = $('.datagrid-view .datagrid-view2').width() - 178;
//			img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,true)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','saleQty',msgSoLuong,'numberbox',false,true)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
			if(value != '' && value != null && value != undefined){
				return EasyUiCommon.cssForNumberBox(Utils.XSSEncode(value)) + img;
			}
		}else if(type == 'ZV22'){
			if(isMulti != null && isMulti != undefined && isMulti){
				left = $('.datagrid-view .datagrid-view2').width() - 270;
				if($('#isAllowEditProPgram').val() == 'true'){
					if($('#promotionStatus').val() != '' && $('#promotionStatus').val().trim() == 2){
//						img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.openFreeProductDialog('" + index + "');\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
						img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.openFreeProductDialog('" + index + "');\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
					}
				}
				if(value != '' && value != null && value != undefined){
					return EasyUiCommon.cssForTextBoxForZV22(value) + img;
				}
			}else{
				left = $('.datagrid-view .datagrid-view2').children().first().children().children().children().children().children().first().children().width() - 18;
//				img = "<a style=\"position: sticky; left: "+left+"px;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','required',msgBatBuocMua,'checkbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
				img = "<a style=\"position: sticky; float: right;\" href='javascript:void(0)' onclick=\"return EasyUiCommon.showGridDialog('" + index + "','required',msgBatBuocMua,'checkbox',false,false)\"><img class='dialogHeaderIcon' src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
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
					html.first().children().first().next().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}else if(type == 'ZV15' || type == 'ZV18'){
					html.first().children().first().next().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}else if(type == 'ZV13' || type == 'ZV16'){
					html.first().children().first().next().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}else if(type == 'ZV14' || type == 'ZV17'){
					html.first().children().first().next().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}else if(type == 'ZV21'){
					html.first().children().first().next().next().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
				}else if(type == 'ZV22'){
					html.first().children().first().next().children().html(EasyUiCommon._mapProductCodeStr1.get(indexValue));
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
	},
	addButton : function (divId,eventOnClick) {
		var htmlButtonAdd ='';
		htmlButtonAdd += '<button type="button" id="btnAddNewPromotion" tabindex="103" onclick="return ' + eventOnClick +'" ';
		htmlButtonAdd +=' class="btn btn-primary buttonSearch textAreaButtom"> '
		htmlButtonAdd += ' <i><img style="padding-bottom: 3px" class="refreshIcon" src="' + WEB_CONTEXT_PATH + '/resources/images/plus-white.svg" height="16"></i> <span style="padding-left: 5px !important;"> ';
		htmlButtonAdd += lblAddNew ;
		htmlButtonAdd +=' </span></button>';
		$('#'+divId+ ' .box-header-title:first').parent().prepend(htmlButtonAdd);
	},
	loadButtonAddFromDataGird : function(type,permission){
		if(permission == 'true'){
			if(type == 'ZV01' || type == 'ZV02' || type == 'ZV04' || type == 'ZV05' || type == 'ZV03' || type == 'ZV06' || type == 'ZV10' || type == 'ZV09' || type == 'ZV19' || type == 'ZV20' || type == 'ZV22'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"EasyUiCommon.appendRowOnGrid('grid')");
			} else if(type == 'ZV07'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"PromotionZV07.appendRowOnGrid('grid')");
			} else if(type == 'ZV08'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"PromotionZV08.appendRowOnGrid('grid')");
			} else if(type == 'ZV11'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"PromotionZV11.appendRowOnGrid('grid')");
			} else if(type == 'ZV12'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"PromotionZV12.appendRowOnGrid('grid')");
			} else if(type == 'ZV15'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"PromotionZV15.appendRowOnGrid('grid')");
			} else if(type == 'ZV18'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"PromotionZV18.appendRowOnGrid('grid')");
			} else if(type == 'ZV13'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"PromotionZV13.appendRowOnGrid('grid')");
			} else if(type == 'ZV14'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"PromotionZV14.appendRowOnGrid('grid')");
			} else if(type == 'ZV16'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"PromotionZV16.appendRowOnGrid('grid')");
			} else if(type == 'ZV17'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"PromotionZV17.appendRowOnGrid('grid')");
			} else if(type == 'ZV21'){
				EasyUiCommon.addButton('divSearchPromotionProduct',"PromotionZV21.appendRowOnGrid('grid')");
			}
		} else {
			return true;
		}
	}
};

/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.easy-ui.common.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.sales-chart.js
 */
/*script biểu đồ bán hàng*/
/**
 * @author: lochp
 */
var SalesChart = {
	_page: 0,
	_max: 10,
	_totalPage: null,
	dsBanHangTemp : null,
	getParams: function(){
		var params = {};
		params.fromDateStr = $('#fromDateTKC').val();
		params.toDateStr = $('#toDateTKC').val();
		params.page = SalesChart._page;
		params.max = SalesChart._max;
		try{
			var kCbx = $('#chooseTypeSales').combobox('getValue');
			if (kCbx != undefined && kCbx != null){
				params.salesChartType = kCbx;
			}
		}catch(e){

		}
		return params;
	},
	loadSalesInfo: function(mode){
		$('#errMsgTKDS').hide();
		$('#chartErrMsgTKDS').hide();
		SalesChart._page = 0;
		var dataModel = SalesChart.getParams();
		var url = '/saleschart/getSalesInfo';
		
		var msg ='';
		var fDate = dataModel.fromDateStr;
		var tDate = dataModel.toDateStr;
		msg = Utils.getMessageOfRequireCheck('fromDateTKC',jspfromDate );

		if(msg.length ==0){
			msg = Utils.getMessageOfInvalidFormatDate('fromDateTKC', jspfromDate);
		}
		if(msg.length ==0){
			msg = Utils.getMessageOfRequireCheck('toDateTKC',jsptoDate );
		}
		if(msg.length ==0){
			msg = Utils.getMessageOfInvalidFormatDate('toDateTKC', jsptoDate);
		}
		
		var curDate = ReportsUtils.getCurrentDateString();
		
		if (msg.length == 0 && Utils.compareDate(fDate,curDate)==false) {
			msg = msgCommonErr5;
//			$('#fromDateTKC').focus();
			$('#fromDateTKC').val('');
		}
		
		if (msg.length == 0 && Utils.compareDate(tDate,curDate)==false) {
			msg = msgCommonErr6;
//			$('#toDateTKC').focus();
			$('#toDateTKC').val('');
		}
		
		if (msg.length == 0 && !Utils.compareDate(fDate, tDate)) {
			msg = msgErr_fromdate_greater_todate;		
//			$('#fromDateTKC').focus();
			$('#fromDateTKC').val('');
		}
		if (msg.length > 0) {
			$('#errMsgTKDS').html(msg).show();
			return false;
		}
//		if(mode == 1) {$('#divOverlay_TKDS').show();}
		$('#textfromdateTKC').text($('#fromDateTKC').val());
		$('#texttodateTKC').text($('#toDateTKC').val());
		$('#dropdonwTKDS').hide();
		$('#divOverlay_TKDS').show();
		
		$('#loaiTKDS').text($('#chooseTypeSales').data("combo").previousText); 
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
					$('#chartErrMsgTKDS').html(chartErrorNullData).show();
				}
			} else {
				$('#chartErrMsgTKDS').html(chartErrorNullData).show();
				$('#chartDivId').html('').show();
				$('#nextBackDivId').html('').show();
			}
			$('#divOverlay_TKDS').hide();
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
//				html += '<label class="labelDetailGroupClass">'+msgDoanhSoChart+'</label>';
				if(formatCurrency(data.sales).length > 11) {
					$('.info-box_charts-number').css('font-size', '18px');
				}
				$('#doanhsoBarChart').text(formatCurrency(data.sales));
				$('#sanluongBarChart').text(formatCurrency(data.quantity));
				
//				html += '<label class="labelValueGroupClass" style="">'+formatCurrency(data.sales) +'</label>';
//				html += '</p><p  class="pInfoSalesChartClass" >';
//				html += '<label class="labelDetailGroupClass">'+msgSanLuongChart+'</label>';
//				html += '<label class="labelValueGroupClass"  style="">'+formatCurrency(data.quantity)+'</label>';
				if (data.salesChartType != undefined && (data.salesChartType == 2 || data.salesChartType == 3
						|| data.salesChartType == 4 || data.salesChartType == 5 || data.salesChartType == 6)){

				}else{
					$('#sokhachhangBarChart').text(formatCurrency(data.customerCount));
//					html += '</p><p  class="pInfoSalesChartClass" >';
//					html += '<label class="labelDetailGroupClass">'+msgSoKhachHangChart+'</label>';
//					html += '<label class="labelValueGroupClass"  style="">'+formatCurrency(data.customerCount)+'</label>';
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
			if (_data != null && _data.chart != null && _data.chart.data.length > 1){
				var _chart = _data.chart;
				/*if (_chart.data != null && _chart.data.length > 0){
					for (var i=0, size = _chart.data.length; i< size; i++){

					}
				}*/
				var dataChart = google.visualization.arrayToDataTable(_chart.data);
				var options = {
						 colors: ['#1D88E5'],
						chartArea:{
							left:50,top:50, bottom : 60,
							width:"90%",
							height:"100%",
//							backgroundColor: {
//						        fill: 'rgb(29, 136, 229)',
//						        fillOpacity: 0.8
//						      },
						
						},
						width : "90%",
						height : 325,
//					    title : _chart.chartTitle,
						legend: { position: "none" },
					    vAxis: {/*title: _chart.vAxisTitle,*/
					    	viewWindow: {min: 0},
					    		/*textStyle: {color: "#0c886d"},*/ 
					    	minorGridlines:{color: "#0c886d"},
					    },
					    hAxis: {/*title: _chart.hAxisTitle,*/ /*textStyle: {color: "#0c886d"}, */
					    	minorGridlines: {color: "#0c886d"},
					    	textStyle:
				            {
				               fontStyle: "normal",
				               italic: false,
				               fontSize : '11px',
				               whiteSpace: 'normal',
				               color: '#333'
				            },
				            titleTextStyle:
				            {
				               fontStyle: "normal",
				               italic: false,
				               fontSize : '11px',
				               whiteSpace: 'normal',
				               color: '#333'
				            },
				            label:'Solds',    
				            type:'bars',
					    },
					    seriesType: "bars",
					    series: {5: {type: "line"}},
					    tooltip: {showColorCode: true, textStyle: {color: "#333", backgroundColor: '#ed3f80',}},
					    candlestick: {fallingColor: {fill: "#0c886d", stroke: "#0c886d"}},
//					    backgroundColor: {fill: "#333"}
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
			} else {
				$('#chartErrMsgTKDS').html(chartErrorNullData).show();
//				
				$('#chartDivId').html('').show();
				$('#nextBackDivId').html('').show();
			}
			$("#divOverlay_TKDS").hide();
		}, null, null, null, null, null, null, false);
		
	},
	
	loadChart: function(direct){
		
		if(direct != null && direct == DirectPage.NEXT){
			SalesChart._page++;
			var totalCurrentPage = $('#totalPage').html();
			if (totalCurrentPage != null && totalCurrentPage != '' && parseInt(totalCurrentPage) > SalesChart._page){
				$("#divOverlay_TKDS").show();
				SalesChart.fillInfoToChart();
				
			}else{
				SalesChart._page--;
			}
		}else if(direct != null && direct == DirectPage.BACK){
			SalesChart._page--;
			if (SalesChart._page >= 0){
				$("#divOverlay_TKDS").show();
				SalesChart.fillInfoToChart();
//				$("#divOverlay_TKDS").hide();
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
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.sales-chart.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.account.js
 */
var Account = {
	xhrTransaction:null,
	submitPrepaid : function() {
		$('#divOverlay_New').show();
		var msg ='';
		msg = Utils.getMessageOfRequireCheck('serial', msgAcc1);
		if(msg.length==0){
			msg = Utils.getMessageOfRequireCheck('viettelCardCode', msgAcc2);
		}
		if(msg.length==0){
			msg = Utils.getMessageOfRequireCheck('captchaId', msgAcc3);
		}
		if(msg.length>0){
			$('#msgError').html(msg).show();
			$('#divOverlay_New').hide();
			return false;
		}
		var data = new Object();
		data.serial = $('#serial').val().trim();
		data.viettelCardCode = $('#viettelCardCode').val().trim();
		data.captcha = $('#captchaId').val();
		Utils.addOrSaveData(data, '/account/submitPrepaidProcess', Account.xhrTransaction, 'msgError' , function(data){
			if(data.error){
				$('#msgError').html(data.errorMsg).show();
				Utils.refreshCapcha();
			}else{
				var text ='';
				text+= msgAcc4 + '<br/></p>';
				text+='<p class="TextStyleSoTien">'+ formatFloatValue(data.totalMoney,numFloat) + ' ' + moneyVND + '<br/></p>';
				$.messager.alert('',text,'info');
				setTimeout(function(){
					window.location.reload();
				},5000);
			}
			$('#divOverlay_New').hide();
		});
	},
	exportRechargeHistory: function(errMsg){
		if(errMsg==null || errMsg==undefined || errMsg==""){
			errMsg = 'errMsg';
		}
		var url = '/account/export-recharge-history';
		var dataModel = new Object();
		CommonBusiness.exportExcelData(dataModel,url,errMsg);
 		return false;
	}
};

/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.account.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.collaborator-manager.js
 */
/**
 * Quan ly Cong tac vien / Dai Ly / Nhan vien Ban hang
 * @author : haupv3
 * @since  : 25/11/2014
 */
var collaboratorManager = {

	_CTV : 1,
	_DAI_LY : 2,
	_NVBH : 3,
	isCTV : false,
	districtId : null,
	_isCreate : false,
	/**
	 * Tim kiem danh sach
	 * @author haupv3
	 * @since 25/11/2014
	 * **/
	 searchCollaborator : function(){
		 var params = new Object();
		 params.coName = $('#txtNamePhone').val();
		 params.coType = $('#cbStaffType').val();
		 params.coStatus = $('#cbStatus').val();

		 collaboratorManager.InitDatagrid(params);
	 },
	 /**
	  * Khoi tao datagrid
	  * @author haupv3
	  * @since 25/11/2014
	  * **/
	 InitDatagrid : function (params){


		 $('#grid').datagrid({
			 url : '/config/account/collaborator/search',
			 queryParams: params,
			 fitColumns : true,
			 pagination : true,
			 rownumbers : true,
			 autoRowHeight : false,
			 scrollbarSize:0,
			 columns : [[
			             {field: 'coCode', title :msgCollaGridMa, width: 150,
			            	 formatter : function(value, rowData) {
								if (rowData.coCode != undefined && rowData.coCode != null)
									return Utils.XSSEncode(rowData.coCode);
								else
									return '';
							}
			             },
			             {field: 'coName', title :msgCollaGridTen, width: 100,
			            	 	formatter : function(value, rowData) {
								if (rowData.coName != undefined && rowData.coName != null)
									return Utils.XSSEncode(rowData.coName);
								else
									return '';
							}
			             },
			             {field: 'colType', title:msgCollaStaffType, width: 60,
			            	 formatter : function(value, row, index){
			            		 if(row != null){
			            			 if(Number(row.coType) == collaboratorManager._NVBH){
			            				 return msgTuyen6; //NVBH
			            			 }else if(Number(row.coType) == collaboratorManager._CTV){
			            				 return msgCollaborator;//CTV
			            			 }else if(Number(row.coType) == collaboratorManager._DAI_LY){
			            				 return msgCollaKiot; //Dai Ly
			            			 }

			            			 return '';
			            		 }
			            	 }
			             },
			             {field: 'coPhone', title:routing_mobile_phone_number, width: 60, align:'right'},
			             {field: 'colStatus', title:msgCollaStatus, width: 60,
			            	 formatter : function(value, row, index){
			            		 if(Number(row.coStatus) == 1){
			            			 return activeStatusText;
			            		 }else if(Number(row.coStatus) == 0){
			            			 return stoppedStatusText;
			            		 }
			            		 return '';
			            	 }
			             },
			             {field: 'id', align:'center',title:'<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_add.png" style="cursor:pointer;" onclick="collaboratorManager.showDialogDetail()"/>',
			 		    	formatter : function(value, row, index){
					    		return '<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" style="cursor:pointer;" onclick="collaboratorManager.showDialogDetail('+ index +')"/>';
					    	}
			             }

			           ]]
		 });
	 },
	 /**
	  * Hien thi dialog them moi / Edit
	  * @author haupv3
	  * @since 25/11/2014
	  * **/
	 showDialogDetail : function(index){
		 var row = $('#grid').datagrid('getRows')[index];
		 $("#sucExcelMsg").html('');
		 $("#errMsg").html('');

		 $('#popMa').val('');
		 $('#popName').val('');
		 $('#popPhone').val('');
		 $('#popEmail').val('');
		 $('#popContact').val('');
		 $('#popAddess').val('');
		 if(Utils.isEmpty(row)){//tao moi
			 //bo option CTV
			 //$("#popCbStaffType option[value='1']").hide().change();
			 $("#popCbStaffType").val(2).change();

			 $('#popMa').removeAttr('disabled');
			 $('#btnLuu').show();
			 collaboratorManager._isCreate = true;
/*			 $('#popName').removeAttr('disabled');
			 $('#popEmail').removeAttr('disabled');
			 $('#popPhone').removeAttr('disabled');
			 $("#popProvince").combobox('enable');
			 $("#popDistrict").combobox('enable');
			 enableSelectbox('popCbStatus');
			 enableSelectbox('popCbStaffType');*/
		 }else{//edit
			 //them option CTV

			// $('#popMa').attr('disabled','disabled');
			 collaboratorManager._isCreate = false;

			 if(row != null){
				 $('#popMa').val(row.coCode);
				 $('#popName').val(row.coName);
				 $('#popPhone').val(row.coPhone);
				 $('#popEmail').val(row.coEmail);

				 $("#popCbStaffType").val(row.coType).change();
				 $('#popCbStatus').val(row.coStatus).change();
				 $('#popProvince').combobox('select', row.provinceId);
				 $('#popDistrict').combobox('select', row.districtId);

				 $('#popContact').val(row.contactName);
				 $('#popAddess').val(row.contactAddress);

				 collaboratorManager.districtId = row.districtId;
				 $('#oldCode').val(row.coCode);

				 $('#btnLuu').show();

/*				 if(Number(row.coType) == collaboratorManager._CTV){
					 collaboratorManager.isCTV = true;
					 $("#popCbStaffType option[value='1']").show().change();
					 $('#btnLuu').hide();
					 $('#popName').attr('disabled','disabled');
					 $('#popEmail').attr('disabled','disabled');
					 $('#popPhone').attr('disabled','disabled');
					 $("#popProvince").combobox('disable');
					 $("#popDistrict").combobox('disable');
					 disableSelectbox('popCbStatus');
					 disableSelectbox('popCbStaffType');
				 }else{
					 collaboratorManager.isCTV = false;
					 $("#popCbStaffType option[value='1']").hide().change();
					 $('#btnLuu').show();
					 $('#popName').removeAttr('disabled');
					 $('#popEmail').removeAttr('disabled');
					 $('#popPhone').removeAttr('disabled');
					 $("#popProvince").combobox('enable');
					 $("#popDistrict").combobox('enable');
					 enableSelectbox('popCbStatus');
					 enableSelectbox('popCbStaffType');
				 }*/
			 }
		 }

		 $('#collaEasyUIDialog').dialog('open');
	 },
	 /**
	  * Them moi hoac cap nhat
	  * @author haupv3
	  * @since 25/11/2014
	  * **/
	 addOrSaveData : function(){
		var data = new Object();
		var msg = '';
		var _coType = $('#popCbStaffType').val();
		var _coStatus = $('#popCbStatus').val();
		var _coName = $('#popName').val();
		var _coCode = $('#popMa').val();
		var _coEmail = $('#popEmail').val();
		var _coPhone = $('#popPhone').val();
		var _coProvince = $('#popProvince').combobox('getValue');
		var _coDistrict = $('#popDistrict').combobox('getValue');
		var _coContactName = $('#popContact').val();
		var _coAddress = $('#popAddess').val();
		var _oldCode = $('#oldCode').val();

		if(collaboratorManager._isCreate == true){
			_oldCode = "";
		}

		if(isNullOrEmpty(msg)){
			msg = ValidateUtils.getMessageOfRequireCheck('popMa',msgCollaMa,false,200);
		}
		if(isNullOrEmpty(msg)){
			msg = Utils.getMessageOfSpecialCharactersValidate('popMa', msgCollaMa ,Utils._CODE);
		}

		if(isNullOrEmpty(msg)){
			msg = ValidateUtils.getMessageOfRequireCheck('popName',msgCollaTen,false,250);
		}

		if(isNullOrEmpty(msg)){
			msg = ValidateUtils.getMessageOfInvalidEmailFormat('popEmail', 'Email');
		}

		if(!isNullOrEmpty(msg)){
			$('#collaEasyUIDialog #errMsg').html(msg).show();
			return false;
		}


		data.coCode = _coCode;
		data.coName = _coName;
		data.coType = _coType;
		data.coStatus = _coStatus;
		data.coProvinceId = _coProvince;
		data.coDistrictId = _coDistrict;
		data.coEmail = _coEmail;
		data.coPhone = _coPhone;
		data.coContactName = _coContactName;
		data.coContactAddress = _coAddress;
		data.isCreate = collaboratorManager._isCreate;
		data.oldCode = _oldCode;

		Utils.addOrSaveData(data, '/config/account/collaborator/createOrUpdate', null, 'errMsg',function(data1){
				//Utils.updateTokenForJSON(data);
				if(!isNullOrEmpty(data1.errMsg)){
					$('#successMsg').html('').hide();
					$('#collaEasyUIDialog #errMsg').html(data1.errMsg).show();
					//$('#errExcelMsg').html(data.errMsg).show();
					setTimeout(function(){$('#successMsg').html('').hide();}, 10);
					return false;
				}else{
					//$('#errExcelMsg').html('').hide();
					//$('#successMsg').html(CompanyConfig.langSaveSuccess).show();
					$('#collaEasyUIDialog').dialog('close');
					setTimeout(function(){$('#successMsg').html('').hide();}, 5000);
					setTimeout(function(){$('#sucExcelMsg').html('').hide();}, 5000);
					$('#grid').datagrid('reload');
				}
		},null,null, null, null, function(data2){
				if(!isNullOrEmpty(data2.errMsg)){
					$('#successMsg').html('').hide();
					$('#collaEasyUIDialog #errMsg').html(data2.errMsg).show();
					//$('#errExcelMsg').html(data.errMsg).show();
					return false;
				}
		});
	 }

};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.collaborator-manager.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/paid/jquery.paid.js
 */
/**
 * @author: Lochp
 */
var Paid = {
	_widthWindow: $(window).width()-100,
	_xhrSave : null,
	_mapSelectedStaff: null,
	_mapPrepaid: null,
	PrepaidType : {
		DUNG_THU: 1,
		TRA_PHI : 2,
		KICH_HOAT : 3,
		KICH_HOAT_3G : 4,
		KICH_HOAT_4G : 5
	},
	value1 : '',
	value2 : '',
	value3 : '',
	value4 : '',
	value5 : '',
	value6 : '',
	getParams: function(params){
		if (params == null){
			params = {};
		}
		if ($('#codeOrNameStaff').val() != null){
			params.codeOrNameStaff = $('#codeOrNameStaff').val().trim();
		}
		params.staffType = $('#staffType').val().trim();
		params.monthValue = $('#monthValue').val().trim();
		params.status = $('#status').val().trim();
		return params;
	},
	getParamsForSaveData: function(params){
		if (params == null){
			params = {};
		}
		var listStaffId = null;
		if (Paid._mapSelectedStaff != null){
			listStaffId = Paid._mapSelectedStaff.keyArray;
			if(parseInt($('#isActived').val()) == 1){
				if (listStaffId == null || listStaffId.length == 0){
					Utils.showErrorNotify(msgErrorBanChuaChonNhanVien);
					return null;
				}
			}
			params.listStaffId = listStaffId;
		}
		if ($("#cbxServiceType") != undefined && $("#cbxServiceType") != null){
			var cbxGetValue = $("#cbxServiceType").combobox('getValue');
			if (cbxGetValue == null || cbxGetValue == "" || cbxGetValue == undefined){
				Utils.showErrorNotify(msgErrorBanChuaChonGoiCuoc);
				return null;
			}
			params.prepaidPricingId = cbxGetValue;
			var idPrepaid = cbxGetValue;
			if (Paid._mapPrepaid != null){
				var prepaid = Paid._mapPrepaid.get(idPrepaid);
				if (prepaid != null && prepaid.limitNumUser != null && prepaid.limitNumUser > 0
						&& listStaffId != null && prepaid.limitNumUser < listStaffId.length){
					Utils.showErrorNotify(format(msgErrorVuotQuaSoUserDungThu, prepaid.name, prepaid.limitNumUser));
					return null;
				}
				if(prepaid.prepaidType != Paid.PrepaidType.KICH_HOAT){
					var flag = false;
					var isViettel = true;
					var staffPhoneNumberInvalid='';
					if (listStaffId == null || listStaffId.length == 0){
						Utils.showErrorNotify(msgErrorBanChuaChonNhanVien);
						return null;
					}else{
						if(prepaid.prepaidType == Paid.PrepaidType.KICH_HOAT_3G ||prepaid.prepaidType == Paid.PrepaidType.KICH_HOAT_4G){
							var lstPhoneNumber = new Array();
							for(var i = 0; i < listStaffId.length ; i++){
								if(Utils.isEmpty($('#mobilePhone3G_VAS_'+listStaffId[i]).val())){
									flag = true;
								}else{
									if(!Paid.isViettelPhoneNumber($('#mobilePhone3G_VAS_'+listStaffId[i]).val())){
										isViettel = false;
										try{
											staffPhoneNumberInvalid=Paid._mapSelectedStaff.valArray[i].staffFullCode;
											}catch(e){
												
											}
									}else{
										lstPhoneNumber.push($('#mobilePhone3G_VAS_'+listStaffId[i]).val().trim());
									}
								}
							}
							params.lstPhoneNumber = lstPhoneNumber;
						}
					}
					if(flag){
//							Utils.showErrorNotify(format('<s:text name="catalog.customer.null"/>',expiredDate3G));
							Utils.showErrorNotify(msgLoi3G);
							return null;
						}
						if(!isViettel){
							Utils.showErrorNotify("Vui lòng nhập số di động Viettel cho nhân viên " +staffPhoneNumberInvalid);
							return null;
						}
					}
					params.prepaidType = prepaid.prepaidType;
				}
			}
		
		return params;
	},
	loadCbxServiceAgain: function(){
		var cbx = $("#cbxServiceType").data('combobox');
		if (cbx != null){
			//cbx.destroy();
			$("#cbxServiceType").val('');
		}
		$('#cbxServiceType').val('');
		Utils.getJSONDataByAjaxNotOverlay({}, "/paid/loadCbxPrepaidPricing", function(data){
			Paid._mapPrepaid = new Map();
			var filteredData = new Array();
			if (data != null){
				for (var i=0, size = data.length; i< size; i++){
					//if(data[i].name.indexOf('4GDMS') < 0){
						Paid._mapPrepaid.put(data[i].id, data[i]);
						filteredData.push(data[i]);
					//}
				}
			}
//			$("#cbxServiceType").kendoComboBox({
//		        dataTextField: "name",
//		        dataValueField: "id",
//		        filter: "contains",
//		        dataSource: filteredData,
//		        placeholder: msgPleaseChoosePrepaid
//		    });
			
			$('#cbxServiceType').combobox({
				data: filteredData,
				valueField: 'id',
				textField: 'name',
				filter: "contains",
			});
			$("#cbxServiceType").combobox('textbox').prop('placeholder', msgPleaseChoosePrepaid);
		});
	},
	searchUser: function(){
		if (Paid._mapSelectedStaff != null){
			for(var i = 0; i < Paid._mapSelectedStaff.valArray.length ; i++){
				var staff=Paid._mapSelectedStaff.valArray[i];
				if(staff.mobilePhone4G == null || staff.mobilePhone4G == ''){					
					var edMobiphone3G=$('#mobilePhone3G_VAS_'+staff.staffId);
					if(edMobiphone3G!=null && edMobiphone3G.val() != undefined){
						staff.mobilePhone3G = edMobiphone3G.val();
					}
				}
			}
		}
		
		var params = Paid.getParams();
		$('#userGrid').datagrid('load', params);
	},
	loadUserGrid: function(){
		$('#userGrid').datagrid({
			url: '/paid/loadUserGrid',
			//scrollbarSize : 0,
			fitColumns : true,
			singleSelect : false,
			pagination : true,
//			rownumbers : true,
			selectOnCheck:true,
			queryParams : Paid.getParams(),
			checkOnSelect:false,
			width:$('#boxBodyTableDg').width() + 15,
			columns:[[
				{ field: "staffId", checkbox:true, width: Paid._widthWindow*4/100, align : 'center',},
				{field:'rownum', title: msgSTT, width: Paid._widthWindow*4/100, align: 'center',formatter:function(value,row,index){
					var page = document.getElementsByClassName('pagination-num')[0].value;
					return (page != 0 ? (page*10-10 +index +1) : index +1);
				}},
			  { field: "staffFullCode", title: titleUser, width: Paid._widthWindow*10/100, align : 'left',
				  formatter: function(value, row, index){
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }
			  },
			  {	field: "staffName", title: staffNameGrid, width: Paid._widthWindow*12/100, align : 'left',
				  formatter: function(value, row, inde){
					  /*return Utils.XSSEncode(value);*/
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }
			  },
			  { field: "staffType", title: staffTypeGrid, width: Paid._widthWindow*10/100, align : 'center',
				  formatter: function(value, row, inde){
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }},
			  { field: "serviceType", title: packageGrid, width: Paid._widthWindow*10/100, align : 'left',
				  formatter: function(value, row, inde){
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }
			  },
			  { field: "mobilePhone4G", title: msgDienThoai4G, width: 150, align : 'right',
				  formatter:function(value,row,index){
					  var idSelector = 'mobilePhone3G_VAS_'+row.staffId;
					  Utils.bindFormatOnTextfield(idSelector,Utils._TF_NUMBER_CONVFACT); // set type
					  var valueConvert = value === null ? "" : value;
					  return '<input id="'+ idSelector +'" title="Nhập số điện thoại di động Viettel" type="text" maxlength="20" style="text-align:right;margin: 0; margin: 0 2% 0 2% !important; width: 96% !important"  class="IssuedStock_AmountValue InputTextStyle InputText1Style" value="'+ Utils.XSSEncode(valueConvert)+'">';
				  }
			  },
			  { field: "expriDate4G", title: expriDate4G, width: Paid._widthWindow*11/100, align : 'center',
				  formatter: function(value, row, inde){
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }
			  },
			  { field: "expiredDate", title: expiredDate, width: Paid._widthWindow*11/100, align : 'center',
				  formatter: function(value, row, inde){
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }
			  },
			  /*{ field: "expiredDate3G", title: expiredDate3G, width: Paid._widthWindow*11/100, align : 'center',
				  formatter: function(value, row, index){
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }
			  },*/
			  { field: "status", title: msgTrangThai, width: Paid._widthWindow*8/100, align : 'center',
				  formatter:function(value,row,index){
					  var r = '';
					  var style = '';
					  var messageStatus = "";
					  if(value != null && value != undefined){
						  if(parseInt(value) == 1){
							  style = 'color: green';
							  messageStatus = msgHoatDong;
						  }else{
							  style = 'color: blue';
							  messageStatus = msgTamNgung;
						  }
					  }
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }
					  return r = '<b style="'+style+'">'+ messageStatus + '</b>';;
				  }
			  },
			  /*{ field: "mobilePhone3G", title: msgDienThoai3G, width: 150, align : 'right',
				  formatter:function(value,row,index){
					  var idSelector = 'mobilePhone3G_VAS_'+row.staffId;
					  Utils.bindFormatOnTextfield(idSelector,Utils._TF_NUMBER_CONVFACT); // set type
					  return '<input id="'+ idSelector +'" title="Nhập số điện thoại di động Viettel" type="text" maxlength="20" style="text-align:right;margin: 0; margin: 0 2% 0 2% !important; width: 96% !important"  class="IssuedStock_AmountValue InputTextStyle InputText1Style">';
				  }
			  },*/
			  { field: "swap", title: msgCommonThaoTac, width: Paid._widthWindow*4/100, align : 'center',
				  formatter: function(value, row, index){
					  if(row != null && row  != undefined){
						  if(row.isExpired != null && row.isExpired != 1){
							  return "<a href='javascript:void(0)' title=\'"+msgtitlepaid+"\' onclick=\"return Paid.openSwapDialog("+ row.staffId + ",\'"+ row.staffFullCode + "\',\'"+ row.staffName + "\'); \"><img width='15' height='16' src='" + WEB_CONTEXT_PATH + "/resources/images/refresh_blue.svg'></a>";
						  }
					  }
					  return "";
				  }
			  }
			]],
			onLoadSuccess : function(data) {
				var rows = $('#userGrid').datagrid('getRows');
//				for(var i = 0 ; i < rows.length ; i++){
//					var row = rows[i];
//					$(this).datagrid('beginEdit', i);
//					var ed = $('#userGrid').datagrid('getEditor', {index:i,field:'mobilePhone3G'});
//					$(ed.target).attr('maxlength',20); // set max length
//
//					var idSelector = 'mobilePhone3G_VAS_'+row.staffId;
//					$(ed.target).attr('title',"Nhập số điện thoại di động Viettel");
//					$(ed.target).attr('id',idSelector);
//					Utils.bindFormatOnTextfield(idSelector,Utils._TF_NUMBER_CONVFACT); // set type
//				}
				//$('#userGrid').datagrid('hideColumn','mobilePhone3G');
				$('td[field=staffId] .datagrid-header-check [type=checkbox]').attr('checked', false);
				if (Paid._mapSelectedStaff == null){
					Paid._mapSelectedStaff = new Map();
				}else{
					$('input[name="staffId"]').each(function(){
						 var temp = Paid._mapSelectedStaff.get($(this).val());
			 			 if(temp!=null){
			 				 $(this).attr('checked','checked');
			 				var ed=$('#mobilePhone3G_VAS_'+$(this).val());
			 				if(ed != undefined && (ed.val() === '' || ed.val() == null) && temp.mobilePhone4G !=null){
			 					ed.val(temp.mobilePhone3G);
			 				}
			 			 }
					});
				}
				
				
				$('.datagrid-cell-check input[type=checkbox]').each(function () {		
					$(this).wrap('<label class="el-checkbox el-checkbox-lg"></label>');	
					$(this).after('<span class="el-checkbox-style el-lebel"></span></label>');	
				  });		
				if($('.datagrid-header-check').find('label.el-checkbox').length == 0){		
					$('.datagrid-header-check input[type=checkbox]').each(function () {	
						$(this).wrap('<label class="el-checkbox el-checkbox-lg"></label>');
						$(this).after('<span class="el-checkbox-style el-lebel"></span></label>');
					  });	
				};	
				
				$("#_easyui_textbox_input1").blur(function(){
				    if($(this).next().val() != '' && Paid._mapPrepaid.get($(this).next().val()) != ''){
				    	if(parseInt(Paid._mapPrepaid.get($(this).next().val()).prepaidType) == Paid.PrepaidType.KICH_HOAT_3G
				    			|| parseInt(Paid._mapPrepaid.get($(this).next().val()).prepaidType) == Paid.PrepaidType.KICH_HOAT_4G){
				    		$('#userGrid').datagrid('showColumn','mobilePhone3G');
				    	}else{
				    		//$('#userGrid').datagrid('hideColumn','mobilePhone3G');
				    	}
				    }
				});
			},
			onCheck : function (rowIndex,rowData){
				Paid._mapSelectedStaff.put(rowData.staffId, rowData);
				$('#datagrid-row-r1-2-'+rowIndex+'').addClass('datagrid-row-selected-custom');
			},
			onUncheck : function (rowIndex,rowData){
				Paid._mapSelectedStaff.remove(rowData.staffId);
				  $('#datagrid-row-r1-2-'+rowIndex+'').removeClass('datagrid-row-selected-custom');
			},
			onCheckAll : function (rows){
				if($.isArray(rows)) {
					for (var i=0, size = rows.length; i< size; i++){
						var rowData = rows[i];
						Paid._mapSelectedStaff.put(rowData.staffId, rowData);
						$('#datagrid-row-r1-2-'+i+'').addClass('datagrid-row-selected-custom');
					}
				}
			},
			onUncheckAll : function (rows){
				if($.isArray(rows)) {
					for (var i=0, size = rows.length; i< size; i++){
						var rowData = rows[i];
						Paid._mapSelectedStaff.remove(rowData.staffId);
						$('#datagrid-row-r1-2-'+i+'').removeClass('datagrid-row-selected-custom');
					}
				}
			}
		});
	},
	loadUserGridForUnlock: function(){
		$('#userGrid').datagrid({
			url: '/paid/loadUserGrid',
			//scrollbarSize : 0,
			fitColumns : true,
			singleSelect : false,
			pagination : true,
			//rownumbers : true,
			selectOnCheck:true,
			queryParams : Paid.getParams(),
			checkOnSelect:true,
			columns:[[
				{field:'rownum', title: msgSTT, width: 50,align: 'center',formatter:function(value,row,index){
					var page = document.getElementsByClassName('pagination-num')[0].value;
					 return (page != 0 ? (page*10-10 +index +1) : index +1);
		        }},
			  { field: "staffFullCode", title: titleUser, width: Paid._widthWindow*15/100, align : 'left',
				  formatter: function(value, row, index){
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }
			  },
			  {	field: "staffName", title: staffNameGrid, width: Paid._widthWindow*20/100, align : 'left',
				  formatter: function(value, row, inde){
					  /*return Utils.XSSEncode(value);*/
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }
			  },
			  { field: "staffType", title: staffTypeGrid, width: Paid._widthWindow*10/100, align : 'center',
				  formatter: function(value, row, inde){
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }},
			  { field: "serviceType", title: packageGrid, width: Paid._widthWindow*13/100, align : 'left',
				  formatter: function(value, row, inde){
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }
			  },
			  { field: "expiredDate", title: expiredDate_DMS, width: Paid._widthWindow*10/100, align : 'center',
				  formatter: function(value, row, inde){
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  r = '<span style="'+style+'">'+ Utils.XSSEncode(value) + '</b>';
					  }
					  return r;
				  }
			  },

			  { field: "status", title: msgTrangThai, width: Paid._widthWindow*10/100, align : 'center',
				  formatter:function(value,row,index){
					  var r = '';
					  var style = '';
					  if (row.isExpired != null && row.isExpired == 1){
						  style = 'color: red';
					  }else{
						  style = '';
					  }
					  if(value != null && value != undefined){
						  if(parseInt(value) == 1){
							  if (style == '') style = 'color: green';
							  r = '<b style="'+style+'">'+ msgHoatDong + '</b>';
						  }else{
							  if (style == '') style = 'color: blue';
							  r = '<b style="'+style+'">'+ msgTamNgung + '</b>';
						  }
					  }
					  return r;
				  }
			  },
			  { field: "swap", title: titleSystemUnlock, width: Paid._widthWindow*10/100, align : 'center',
				  formatter: function(value, row, index){
					  if(row != null && row  != undefined){
							  return "<a href='javascript:void(0)' title='"+unlockOnOneDevice+"' onclick=\"return Paid.openUnlockAccountDialog(1,"+ row.staffId + ",\'"+ row.staffFullCode + "\',\'"+ row.staffName + "\'); \"><img width='15' height='16' src='" + WEB_CONTEXT_PATH + "/resources/images/unlockInventory .png'></a>";
					  }
					  return "";
				  }
			  }

			  ,
			  { field: "swap2", title: titleSystemUnlocks, width: Paid._widthWindow*10/100, align : 'center',
				  formatter: function(value, row, index){
					  if(row != null && row  != undefined){
							  return "<a href='javascript:void(0)' title='"+unlockOnMulDevice+"' onclick=\"return Paid.openUnlockAccountDialog(2,"+ row.staffId + ",\'"+ row.staffFullCode + "\',\'"+ row.staffName + "\'); \"><img width='15' height='16' src='" + WEB_CONTEXT_PATH + "/resources/images/unlockInventory .png'></a>";
					  }
					  return "";
				  }
			  }
			]],
			onLoadSuccess : function(data) {
				var rows = $('#userGrid').datagrid('getRows');
				for(var i = 0 ; i < rows.length ; i++){
					var row = rows[i];
					$(this).datagrid('beginEdit', i);
//					var ed = $('#userGrid').datagrid('getEditor', {index:i,field:'mobilePhone3G'});
//					$(ed.target).attr('maxlength',20); // set max length
//
//					var idSelector = 'mobilePhone3G_VAS_'+row.staffId;
//					$(ed.target).attr('title',"Nhập số điện thoại di động Viettel");
//					$(ed.target).attr('id',idSelector);
//					Utils.bindFormatOnTextfield(idSelector,Utils._TF_NUMBER_CONVFACT); // set type
				}
				//$('#userGrid').datagrid('hideColumn','mobilePhone3G');
				$('td[field=staffId] .datagrid-header-check [type=checkbox]').attr('checked', false);
				if (Paid._mapSelectedStaff == null){
					Paid._mapSelectedStaff = new Map();
				}else{
					$('input[name="staffId"]').each(function(){
						 var temp = Paid._mapSelectedStaff.get($(this).val());
			 			 if(temp!=null){
			 				 $(this).attr('checked','checked');
			 			 }
					});
				}
				$("#cbxServiceType").bind('change',function(){
				    if($(this).val() != '' && Paid._mapPrepaid.get($(this).val()) != ''){
				    	if(parseInt(Paid._mapPrepaid.get($(this).val()).prepaidType) == Paid.PrepaidType.KICH_HOAT_3G
				    			|| parseInt(Paid._mapPrepaid.get($(this).val()).prepaidType) == Paid.PrepaidType.KICH_HOAT_4G){
				    		$('#userGrid').datagrid('showColumn','mobilePhone4G');
				    	}else{
				    		//$('#userGrid').datagrid('hideColumn','mobilePhone3G');
				    	}
				    }
				});
			},
			onCheck : function (rowIndex,rowData){
				Paid._mapSelectedStaff.put(rowData.staffId, rowData);
			},
			onUncheck : function (rowIndex,rowData){
				Paid._mapSelectedStaff.remove(rowData.staffId);
			},
			onCheckAll : function (rows){
				if($.isArray(rows)) {
					for (var i=0, size = rows.length; i< size; i++){
						var rowData = rows[i];
						Paid._mapSelectedStaff.put(rowData.staffId, rowData);
					}
				}
			},
			onUncheckAll : function (rows){
				if($.isArray(rows)) {
					for (var i=0, size = rows.length; i< size; i++){
						var rowData = rows[i];
						Paid._mapSelectedStaff.remove(rowData.staffId);
					}
				}
			}
		});
	},
	onCheckAutoRenewal: function(){
		var dom = $('#autoRenewal');
		if (dom != undefined && dom != null){
			dom.bind('click', function(){
				var url = '/paid/autoRenewal';
				if (dom.is(':checked') != undefined && dom.is(':checked') != null && dom.is(':checked')){
					var params = {autoRenewService: 1};
					Utils.addOrSaveData(params, url);
				}else{
					var params = {autoRenewService: 0};
					Utils.addOrSaveData(params, url);
				}
			});
		}
	},
	paidForUser: function(){
		$('#errorMessage1').html('').hide();
		var params = Paid.getParamsForSaveData(null);
		if (params == null){
			return ;
		}
		if(params.prepaidType != null && (params.prepaidType == Paid.PrepaidType.KICH_HOAT_3G
				||params.prepaidType == Paid.PrepaidType.KICH_HOAT_4G)){
			if(Utils.isEmpty($('#numMonth').val())){
				$('#errorMessage1').html('Vui lòng nhập thời hạn đăng ký').show();
				return false;
			}else{
				if(parseInt($('#numMonth').val()) == 0){
					$('#errorMessage1').html('Vui lòng Thời hạn đăng ký lớn hơn 0').show();
					return false;
				}else{
					var remain = parseInt(Utils.returnMoneyValue($('#amountRemain').html()));
					if(remain == 'NaN' || remain < 0){
						$('#errorMessage1').html('Số tiền thanh toán đã vượt mức số dư tài khoản.Vui lòng nhập lại Thời gian đăng ký.').show();
						return false;
					}
				}
			}
			params.numMonth = $('#numMonth').val().trim();
			Paid.value5 = $('#numMonth').val().trim();
		}
		var url = '/paid/paidForUser';
		Utils.addOrSaveData(params, url, null, null, function(data){
			Paid._mapSelectedStaff = null;
			$('#isActived').val(data.isActived);
			$('#confirmPaymentDialog').dialog('close');
			$('#userGrid').datagrid('reload');
			Paid.loadCbxServiceAgain();
			$('#soDuTaiKhoan').html(formatCurrency(data.remainMoney));
			if(params.prepaidType != null && (params.prepaidType == Paid.PrepaidType.KICH_HOAT_3G
					|| params.prepaidType == Paid.PrepaidType.KICH_HOAT_4G)){
				var html = $('#resultDialog').html();
				$('#resultDialog').dialog({
					title: msgTitleConfirmPayment,
					closed: false,
			        cache: false,
			        modal: true,
			        position: 'middle',
			        center: true,
			        top: 30,
					onOpen: function(){
						$('#numberOfUserResult').html(Paid.value1);
						$('#prepaidResult').html(Paid.value2);
						$('#serviceFreeResult').html(Paid.value3);
						$('#numMonthResult').val(Paid.value5);
						$('#nameMonthResult').html(msgExpireType2);
						$('#amountPaymentResult').html(Paid.value4);
						$('#soTienDaThanhToan').html('<b>'+formatCurrency(data.service3GFee)+'</b>');
						$('#amountRemainResult').html('<b>'+formatCurrency(data.remainMoney)+'</b>');
						$('#titleSuccess').html(paidSuccess +' (<span style="color:red;">' + data.successUser + '</span>):' );
						$('#titleFail').html(paidFail + ' (<span style="color:red;">' + data.failUser + '</span>):' );
						var arrHtmlSuccess = new Array();
						for(var i = 0 ; i < data.lstSuccessUser.length ;i++){
							var code = data.lstSuccessUser[i];
							if( i == 0){
								arrHtmlSuccess.push(code);
							}else{
								arrHtmlSuccess.push(',' + code);
							}
						}
						$('#successResult').html(arrHtmlSuccess.join(""));
						var arrHtml = new Array();
						for(var i = 0 ; i < data.lstFailUser.length ;i++){
							var code = data.lstFailUser[i].code;
							var reason = data.lstFailUser[i].name;
							arrHtml.push('<ul>&diams;');
							arrHtml.push(code + ' : <span style="color:red;">' + reason);
							arrHtml.push('</span></ul>');
						}
						$('#failUserInfo').html(arrHtml.join(""));
						$('#txtNoteResult').html(paidNote);
					},
					onBeforeClose: function() {

					},
					onClose: function(){
						$('#resultDialog').html(html);
						$('#resultDiv').hide();
					}
				});
			}
		}, null, null, null, null, function(data){
			if(params.prepaidPricingId == 722 || params.prepaidPricingId == 723 || params.prepaidPricingId == 724
					|| params.prepaidPricingId == 732 || params.prepaidPricingId == 733 || params.prepaidPricingId == 734){
				$('#confirmPaymentDialog').dialog('close');
				$('#errMsg').html(data.errMsg);
			}
		});
	},
	paidForUserPopup: function(){
		$('#errorMessage1').html('').hide();
		$('#errorMessage2').html('').hide();
		var params = Paid.getParamsForSaveData(null);
		if (params == null){
			return ;
		}
		Utils.hideErrorNotify();
		var url = '/paid/getInfoBeforePayment';
		Utils.getJSONDataByAjax(params, url, function(data){
			$('.paidValue').html('');
			if (data != null){
				var html = $('#confirmPaymentDialog').html();
				$('#confirmPaymentDialog').dialog({
					title: msgTitleConfirmPayment,
					closed: false,
					cache: false,
					modal: true,
					top: 30,
					onOpen: function(){
						$('.window').css({position:"fixed"});
						if(data.prepaidType == Paid.PrepaidType.KICH_HOAT){
							$('#divDuyTri1').hide();
							$('#divDuyTri2').hide();
							$('#divDuyTri3').show();
							$('#divDuyTri4').hide();
							$('#div3G').hide();
							$('#prepaid').html((data.prepaid));
							$('#activedFree').html(formatCurrency(data.activedFee));
							$('#amountPayment').html(formatCurrency(data.amountPayment));
							$('#amountRemain').html(formatCurrency(data.amountRemain));
						}else if(data.prepaidType == Paid.PrepaidType.KICH_HOAT_3G
								|| data.prepaidType == Paid.PrepaidType.KICH_HOAT_4G){
							Utils.bindFormatOnTextfield('numMonth',Utils._TF_NUMBER_CONVFACT);
							$('#numMonth').val(1);
							$('#nameMonth').html(msgExpireType2);
							$('#divDuyTri1').show();
							$('#divDuyTri2').show();
							$('#divDuyTri3').hide();
							$('#divDuyTri4').hide();
							$('#div3G').show();
							Paid.value1 = formatCurrency(data.numberOfUser);
							Paid.value2 = data.prepaid;
							Paid.value3 = formatCurrency(data.serviceFee);
							Paid.value4 = formatCurrency(data.amountPayment);
							$('#numberOfUser').html(formatCurrency(data.numberOfUser));
							$('#numberOfInActivedUser').html(formatCurrency(data.numberOfInActiveUser));
							$('#prepaid').html((data.prepaid));
							$('#activedFree').html(formatCurrency(data.activedFee));
							$('#serviceFree').html(formatCurrency(data.serviceFee));
							$('#amountPayment').html(formatCurrency(data.amountPayment));
							$('#amountRemain').html(formatCurrency(data.amountRemain));
						}else{
							$('#divDuyTri1').show();
							$('#divDuyTri2').show();
							$('#divDuyTri3').hide();
							$('#divDuyTri4').hide();
							$('#div3G').hide();
							$('#numberOfUser').html(formatCurrency(data.numberOfUser));
							$('#numberOfInActivedUser').html(formatCurrency(data.numberOfInActiveUser));
							$('#prepaid').html((data.prepaid));
							$('#activedFree').html(formatCurrency(data.activedFee));
							$('#serviceFree').html(formatCurrency(data.serviceFee));
							$('#amountPayment').html(formatCurrency(data.amountPayment));
							$('#amountRemain').html(formatCurrency(data.amountRemain));
						}
						if (data.error != null && data.error){
							$('#errorMessage1').html(data.errMsg1).show();
							$('#errorMessage2').html(data.errMsg2).show();
							$('#confirmPaymentDialog #confirmPayment').hide();
							disabledSelector('#confirmPaymentDialog #confirmPayment');
						}else{
							enableSelector('#confirmPaymentDialog #confirmPayment');
							$('#confirmPaymentDialog #confirmPayment').show();
						}
					},
					onBeforeClose: function() {

					},
					onClose: function(){
						$('#confirmPaymentDialog').html(html);
						$('#confirmPaymentDiv').hide();
					}
				});
			}
		});
	},
	openSwapDialog : function(id,staffCode,staffName){
		$('#errMsgDlg').html('').hide();
		$('#divDialogSearch').show();
		var html = $('#staffEasyUIDialog').html();
		$('#staffEasyUIDialog').dialog({
	        closed: false,
	        cache: false,
	        modal: true,
	        position: 'middle',
	        center: true,
	        top: 30,
	        onOpen: function(){
	        	$('.window').css({position:"fixed"});
				$('#oldStaffId').val(id);
				$('#txtLabel').html(format(thanhtoanMsg1,staffCode,staffName));
				$('#txtNote').html(format(thanhtoanMsg2,staffCode,staffName));
//				$('.easyui-dialog #saleStaffDlg').customStyle();
//				Utils.getJSON('/rest/catalog/user-for-paid/'+ $('#shopIdLogin').val() +'/'+ id +'/list.json', function(data){
//					var arrHtml = new Array();
//					for(var i=0;i<data.length;i++){
//						arrHtml.push('<option value="'+ data[i].value +'">'+ Utils.XSSEncode(data[i].name) +'</option>');
//					}
//					$('#saleStaffDlg').html($('#saleStaffDlg').html()+arrHtml.join(""));
//					$('#saleStaffDlg').change();
//				});
				Paid.getSaleStaffByAjax(id);
				$('#loadingDialog').hide();
	        },
	        onBeforeClose: function() {
	        },
	        onClose : function(){
//	        	$('.BoxSelect2').html('<select class="form-control" id="saleStaffDlg"></select><span class="combo" style="width: 100%; height: 20px;"><input type="text" autocomplete="off" class="combo-text validatebox-text" style="width: 182px; height: 20px; line-height: 20px;"><span><span class="combo-arrow" style="height: 20px;"></span></span><input type="hidden" class="combo-value" value="-1"></span></div>');
//	        	$('#staffEasyUIDialog').html(html);
	        	$('#divDialogSearch').hide();
	        }
	    });
	},
	openUnlockAccountDialog : function(type,id,staffCode,staffName){
		$('#errMsgDlg').html('').hide();
		$('#unlockType').val(type);
		$('#divDialogSearch').show();
		var html = $('#staffEasyUIDialog').html();
		$('#staffEasyUIDialog').dialog({
	        closed: false,
	        cache: false,
	        modal: true,
	        position: 'middle',
	        center: true,
	        onOpen: function(){
				$('#oldStaffId').val(id);
				$('#txtLabel').html(format(msgUnlockDeviceStaff,staffCode));
				$('#loadingDialog').hide();
	        },
	        onBeforeClose: function() {
	        },
	        onClose : function(){
//	        	$('.BoxSelect2').html('<select class="easyui-combobox" id="saleStaffDlg" style="width:206px;"></select><span class="combo" style="width: 204px; height: 20px;"><input type="text" autocomplete="off" class="combo-text validatebox-text" style="width: 182px; height: 20px; line-height: 20px;"><span><span class="combo-arrow" style="height: 20px;"></span></span><input type="hidden" class="combo-value" value="-1"></span></div>');
//	        	$('#staffEasyUIDialog').html(html);
	        	$('#divDialogSearch').hide();
	        }
	    });
	},
	swapExpiredDate:function(){
		var msg = '';
		$('#errMsgDlg').html('').hide();
		var staffId = $('#saleStaffDlg').combobox('getValue');//$('#saleStaffDlg').val();
		if(msg.length == 0 && staffId <= 0) {
			msg = SuperviseManageRouteCreate_invalidateStaff;
			$('#saleStaffDlg').focus();
		}
		if(msg.length > 0){
			$('#errMsgDlg').html(msg).show();
			return false;
		}
		var dataModel = new Object();
		dataModel.oldStaffId = $('#oldStaffId').val();
		dataModel.newStaffId = staffId;
		Utils.addOrSaveData(dataModel, "/paid/swap-expired-date", Paid._xhrSave, 'errMsgDlg',function(data){
			$('#userGrid').datagrid('reload');
			$('#staffEasyUIDialog').dialog('close');
		});
		return false;
	},
	unlockAccount:function(){
		var msg = '';
		$('#errMsgDlg').html('').hide();

		var dataModel = new Object();
		dataModel.unlockStaffId = $('#oldStaffId').val();
		var unlockType=$('#unlockType').val();
		dataModel.unlockType=unlockType;

		Utils.addOrSaveData(dataModel, "/account/unlock-account", Paid._xhrSave, 'errMsgDlg',function(data){
			//$('#userGrid').datagrid('reload');
			$('#sucExcelMsg').html(unlockSucMsg).show();
			setTimeout(function(){
				$('#sucExcelMsg').html('').hide();
		}, 3000);
			$('#staffEasyUIDialog').dialog('close');
		});
		return false;
	},
	exportPaidHistory: function(errMsg){
		if(errMsg==null || errMsg==undefined || errMsg==""){
			errMsg = 'errMsg';
		}
		var url = '/paid/export-history';
		var dataModel = new Object();
		CommonBusiness.exportExcelData(dataModel,url,errMsg);
 		return false;
	},
	calcFee : function(value){
		if(value == '' || value == undefined){
			$('#amountPayment').html('0');
			$('#amountRemain').html($('#soDuTaiKhoan').html());
		}else{
			var numberOfUser = parseInt(Utils.returnMoneyValue($('#numberOfUser').html()));
			var serviceFee = parseInt(Utils.returnMoneyValue($('#serviceFree').html()));
			var amountPayment = numberOfUser*serviceFee*parseInt(value);
			var soDuTaiKhoan = parseInt(Utils.returnMoneyValue($('#soDuTaiKhoan').html()));
			var amountRemain = soDuTaiKhoan - amountPayment;
			Paid.value4 = formatCurrency(amountPayment);
			$('#amountPayment').html(formatCurrency(amountPayment));
			$('#amountRemain').html(formatCurrency(amountRemain));
		}
	},
	isViettelPhoneNumber: function(phoneNumber) {
        phoneNumber = phoneNumber.trim();
        if (phoneNumber == "") {
            return false;
        }
        try {
        	 return phoneNumber.match(/^((\+?84|0)(96|97|98|162|163|164|165|166|167|168|169|86|32|33|34|35|36|37|38|39)\d{7})$/);
        } catch (e) {
            return false;
        }
	},
	getSaleStaffByAjax : function(id){
		Paid._xhrSave = $.ajax({
			type : "GET",
			url : "/rest/catalog/user-for-paid/"+ $('#shopIdLogin').val() +"/"+ id +"/list.json",
			dataType: "json",
			success : function(result) {
				$('#.easyui-dialog #saleStaffDlg').combobox({
					//width:145,
					data:Paid.getDataComboboxForSaleStaff(result),
					valueField: 'value',
					textField: 'name',
					formatter: function(row) {
						return '<span style="font-weight:bold">' + Utils.XSSEncode(row.name) +'</span>';
					},
					filter: function(q, row){
						q = new String(q).toUpperCase();
						var opts = $(this).combobox('options');
						return row['searchText'].indexOf(unicodeToEnglish(q))>=0;
					},
	 				onLoadSuccess:function(){
	 					$('#.easyui-dialog #saleStaffDlg').combobox('select', '' );
	 				}
				});
			},
			error:function(XMLHttpRequest, textStatus, errorDivThrown) {
				Paid._xhrSave = null;
			}
		});
	},
	getDataComboboxForSaleStaff : function(lstSaleStaff){
		var data = new Array();
		$.each (lstSaleStaff, function (i) {
			var result = lstSaleStaff[i] ;
			var obj = new Object();
			obj.value = result.value;
			obj.name = result.name;
			obj.displayText = result.name;
			obj.searchText = unicodeToEnglish(result.name);
			obj.searchText = obj.searchText.toUpperCase();
			data.push(obj);
		});
		return data;
	},
	exportUser: function() {
		$('#errExcelMsg').html('').hide();
		$('#errMsg').html('').hide();
		$('#sucExcelMsg').html('').hide();
		$.messager.confirm(msgXacNhan, SuperviseManageRouteCreate_exportExcel, function(r){
			if (r){
				var params = Paid.getParams();
				var url = "/paid/export-excel";
				CommonBusiness.exportExcelData(params, url, 'errExcelMsg', true);
			}
		});
 		return false;
	}
};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/paid/jquery.paid.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.payment-manager.js
 */
/**
 * Quan ly goi cuoc
 * @author haupv3
 * @since 09/12/2014
 */

var PaymentManager = {

		_isCreate: false,
		_currentDate : null,
		_maxHistoryDate : null,
		_isFirstLoad : false,
		_titleRetail : null,
		 /**
		  * Khoi tao datagrid
		  * @author haupv3
		  * @since 09/12/2014
		  * **/
		 InitDatagrid : function (params){

			 $('#grid').datagrid({
				 url : '/payment/search',
				 queryParams: params,
				 fitColumns : true,
				 pagination : true,
				 rownumbers : true,
				 autoRowHeight : false,
				 scrollbarSize:0,
				 columns : [[
				             {field: 'payName', title :msgPaymentName, width: 150,
				            	 formatter : function(value, row, index) {
				            		 return row.payName;
								}
				             },
				             {field: 'payExpire', title :msgExpireType, width: 100,align:'center',
				            	 	formatter : function(value, row, index) {
				            	 		return row.payExpire + " "+msgDayExpire;
								}
				             },
				             {field: 'payInitPrice', title:msgInitPrice + '/user', width: 60,align:'right',
				            	 formatter : function(value, row, index){
				            		 if(!Utils.isEmpty(row.payFull)){
				            			 return formatCurrency(row.payInitPrice);
				            		 }else{
				            			 return "";
				            		 }
				            	 }
				             },
				             {field: 'payFull', title:msgPackagePrice + '/user', width: 60, align:'right',
				            	 formatter : function(value, row, index){
				            		 if(!Utils.isEmpty(row.payFull)){
				            			 return formatCurrency(row.payFull);
				            		 }else{
				            			 return "";
				            		 }
				            	 }
				             },

				             {field: 'payDate', title:msgTimeAble, width: 100, align:'center',
				            	 formatter : function(value, row, index){

				            		 var fDate = "";
				            		 var tDate = "";
				            		 if(!Utils.isEmpty(row.fromDate)){
				            			 fDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.fromDate)));
				            		 }
				            		 if(!Utils.isEmpty(row.toDate)){
				            			 tDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.toDate)));
				            		 }
				            		 return fDate + " - " + tDate;
				            	 }
				             },
				             {field: 'id', width:30, align:'center',title:'<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_add.png" style="cursor:pointer;" onclick="PaymentManager.showDialogDetail()"/>',
				 		    	formatter : function(value, row, index){
				 		    		var controlStr = '<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png" style="cursor:pointer;" onclick="PaymentManager.showDialogDetail('+ index +')"/>';
				 		    			controlStr += '<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_delete.png" style="cursor:pointer;" onclick="PaymentManager.deletePayment('+ index +')"/>';
						    		return controlStr;
						    	}
				             }

				           ]]
			 });
		 },
		 /**
		  * Hien thi dialog edit/tao moi
		  * @author haupv3
		  * @Since 09/12/2014
		  * **/
		 showDialogDetail : function(index){

			 var row = $('#grid').datagrid('getRows')[index];
			 $('#paymentEasyUIDialog #errMsg').html('').hide();
			 $('#paymentEasyUIDialog #sucExcelMsg').html('').hide();
			 //ReportsUtils.setCurrentDateForCalendar('popToDate');
			 ReportsUtils.setCurrentDateForCalendar('popFromDate');
			 //$('#retailCover').hide();

			 $('#popPayName').val('');
			 $('#popPayExpire').val('');
			 $('#popPayInit').val('');
			 $('#popPayFull').val('');
			 $('#paymentId').val('');
			 $('#popPayExpire').attr('disabled','disabled');

			 $('#historyCover').hide();
			 if(row != null){//edit
				 PaymentManager._isCreate = false;
				 PaymentManager._isFirstLoad = true;
				 PaymentManager._maxHistoryDate = "";
				 PaymentManager.loadHistoryCharge(row);

				 $('#popPayName').val(row.payName);
				 $('#popPayExpire').val(row.payExpire);
				 /*$('#popPayInit').val(row.payInitPrice);
				 $('#popPayFull').val(row.payFull);*/


				 var fDate = "";
				 var tDate = "";
        		 if(!Utils.isEmpty(row.fromDate)){
        			 fDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.fromDate)));
        		 }
        		 if(!Utils.isEmpty(row.toDate)){
        			 tDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.toDate)));
        		 }

        		 $('#retailCover').hide();

        		 PaymentManager._titleRetail =PaymentManager._titlePhiKT;
        		 if(Number(row.payType) == 1){
        			 $('#isRetail').attr('checked',true);
        			 $('#isRetail').attr('disabled',true);
        			 $('#retailCover').show();
      		    	$('#lblKhoiTao').html(PaymentManager._titleGioiHan);
     		    	$('#lblVND').hide();
        		 }else{
      		    	$('#lblKhoiTao').html(PaymentManager._titlePhiKT);
     		    	$('#lblVND').show();
        		 }

				 $('#popToDate').val('');
				 $('#popFromDate').val('');
				 $('#paymentId').val(row.paymentId);

			 }else{//create
				 $('#popLoading').hide();
				 PaymentManager._isCreate = true;
				 $('#retailCover').show();
    			 $('#isRetail').attr('checked',false);
      		     $('#lblKhoiTao').html(PaymentManager._titlePhiKT);
     		     $('#lblVND').show();
    			 $('#isRetail').removeAttr('disabled');
				 $('#popPayExpire').removeAttr('disabled');
				 $('#popToDate').val('');
				 ReportsUtils.setCurrentDateForCalendar('popFromDate');

		  		 $('#paymentEasyUIDialog').dialog({
						cache: false,
						modal: true
		  		 });

		  		  $('#paymentEasyUIDialog').dialog('open');
			 }

		 },
		 /**
		  * Xoa cuoc phi
		  * @author haupv3
		  * @since 09/12/2014
		  * **/
		 deletePayment : function(index){
			 var row = $('#grid').datagrid('getRows')[index];
			 if(row != null){
				 var params = new Object();
				 params.prepaidId = row.paymentId;

				setTimeout(function(){
						$('#successMsg').html('').hide();
						$('#errExcelMsg').html('').hide();
				}, 5000);

				Utils.addOrSaveData(params, '/payment/delete', null, 'errMsg',function(data1){
						if(!isNullOrEmpty(data1.errMsg)){
							$('#successMsg').html('').hide();
							$('#errExcelMsg').html(data1.errMsg).show();
							setTimeout(function(){$('#successMsg').html('').hide();}, 10);
							return false;
						}else{
							setTimeout(function(){$('#sucExcelMsg').html('').hide();}, 5000);
							$('#grid').datagrid('reload');
						}
					},null,null, true, msgCommon2, function(data2){
						if(!isNullOrEmpty(data2.errMsg)){
							$('#successMsg').html('').hide();
							$('#errExcelMsg').html(data2.errMsg).show();
							return false;
						}
				}, null, null, null);
			 }

		 },
		 /**
		  * Load lich su gia
		  * @author haupv3
		  * @since 09/12/2014
		  * **/
		 loadHistoryCharge : function(row){

			 var titleG = "";
			 var isTrial = false;
    		 if(Number(row.payType) == 1){
    			 titleG = PaymentManager._titleGioiHan;
    			 isTrial = true;
    		 }else{
    			 titleG = PaymentManager._titlePhiKT;
    		 }

			 var params = new Object();
			 params.prepaidId = row.paymentId;
			 $('#popLoading').show();
			 $('#historyGrid').datagrid({
				 url : '/payment/get-pay-history',
				 queryParams: params,
				 fitColumns : true,
				 pagination : true,
				 rownumbers : true,
				 autoRowHeight : true,
				 scrollbarSize:0,
				 columns : [[

				             {field: 'initialCost', title: titleG, width: 90,align:'right',
				            	 formatter : function(value, row, index){
				            			 if(isTrial == true){
				            				 return formatCurrency(row.numTrialUser);
				            			 }else{
				            				 return formatCurrency(row.initialCost);
				            			 }

				            			 return "";

				            	 }
				             },
				             {field: 'fullCost', title:msgPackagePrice + '/user', width: 90, align:'right',
				            	 formatter : function(value, row, index){
				            		 if(!Utils.isEmpty(row.fullCost)){
				            			 return formatCurrency(row.fullCost);
				            		 }else{
				            			 return "";
				            		 }
				            	 }
				             },

				             {field: 'payDate', title:msgTimeAble, width: 200, align:'center',
				            	 formatter : function(value, row, index){

				    				 var fDate = "";
				    				 var tDate = "";
				            		 if(!Utils.isEmpty(row.fromDate)){
				            			 fDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.fromDate)));
				            		 }
				            		 if(!Utils.isEmpty(row.toDate)){
				            			 tDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.toDate)));
				            		 }
				            		 return fDate + " - " + tDate;
				            	 }
				             },
				             {field: 'id', align:'center',title:msgCommonThaoTac,width:50,
				 		    	formatter : function(value, row, index){

				 		    		var controlStr = "";
				 		    		var rowDate = $.datepicker.formatDate('dd/mm/yy', new Date(Utils.XSSEncode(row.fromDate)));
				 		    		if(Utils.compareDate(rowDate,PaymentManager._currentDate)==false){
				 		    			controlStr = '<img src="' + WEB_CONTEXT_PATH + '/resources/images/icon_delete.png" style="cursor:pointer;" onclick="PaymentManager.deleteHistory('+ index +')"/>';
				 		    		}
						    		return controlStr;
						    	}
				             }

				           ]],
				           onLoadSuccess: function(data){

					  		   $('#paymentEasyUIDialog').dialog({
										cache: false,
										modal: true
							   });

							   $('#paymentEasyUIDialog').dialog('open');

				        	   $('#popLoading').hide();
				        	   if(data != null){
				        		   if(data.rows.length >0){
				        			   $('#historyCover').show();
				        			   if(PaymentManager._isFirstLoad == true){
				        				  //PaymentManager._maxHistoryDate = data.curCost.fromDate + "/"+ data.curCost.toDate;
				        				   $("#historyGrid").datagrid({pageNumber:1});
				        				   PaymentManager._isFirstLoad = false;
				        			   }
				        		   }
				        	   }

				           }
			 });
		 },
		 /**
		  * Xoa lich su thay doi gia
		  * @author haupv3
		  * @since 09/12/2014
		  * **/
		 deleteHistory : function(index){

			 var row = $('#historyGrid').datagrid('getRows')[index];
			 if(row != null){
				 var params = new Object();
				 params.prepaidId = row.id;

				setTimeout(function(){
						$('#paymentEasyUIDialog #successMsg').html('').hide();
						$('#paymentEasyUIDialog #errExcelMsg').html('').hide();
				}, 5000);

				Utils.addOrSaveData(params, '/payment/delete-history', null, 'errMsg',function(data1){
						if(!isNullOrEmpty(data1.errMsg)){
							$('#paymentEasyUIDialog #sucExcelMsg').html('').hide();
							$('#paymentEasyUIDialog #errMsg').html(data1.errMsg).show();
							setTimeout(function(){$('#paymentEasyUIDialog #sucExcelMsg').html('').hide();}, 10);
							return false;
						}else{
							setTimeout(function(){$('#paymentEasyUIDialog #sucExcelMsg').html('').hide();}, 5000);
							$('#historyGrid').datagrid('reload');
						}
					},null,null, true, msgCommon2, function(data2){
						if(!isNullOrEmpty(data2.errMsg)){
							$('#paymentEasyUIDialog #sucExcelMsg').html('').hide();
							$('#paymentEasyUIDialog #errMsg').html(data2.errMsg).show();
							return false;
						}
				}, null, null, null);
			 }

		 },
		 /**
		  * Tao moi hay cap nhat
		  * @author haupv3
		  * @since 09/12/2014
		  * **/
		 createOrUpdate : function(){
				var params = new Object();
				var msg = '';

				if(isNullOrEmpty(msg)){
					msg = ValidateUtils.getMessageOfRequireCheck('popPayName',msgPaymentName,false,200);
				}
				if(isNullOrEmpty(msg)){
					msg = ValidateUtils.getMessageOfRequireCheck('popPayExpire',msgExpireType,false,200);
				}
				if(isNullOrEmpty(msg)){
					msg = ValidateUtils.getMessageOfRequireCheck('popPayFull',msgPackagePrice,false,200);
				}
				if(isNullOrEmpty(msg)){
					msg = ValidateUtils.getMessageOfRequireCheck('popPayFull',popFromDate,false,200);
				}
				if(isNullOrEmpty(msg)){
					msg = ValidateUtils.getMessageOfRequireCheck('popFromDate',msgFromDate,false,10);
				}

				if(isNullOrEmpty(msg)){
					ValidateUtils.getMessageOfInvalidFormatDate('popFromDate',msgFromDate,Utils._DATE_MM_YYYY);
				}

				if(isNullOrEmpty(msg)){
					ValidateUtils.getMessageOfInvalidFormatDate('popToDate',msgToDate,Utils._DATE_MM_YYYY);
				}


				var fDate = $('#popFromDate').val().trim();
				var tDate = $('#popToDate').val().trim();
				if(!isNullOrEmpty(tDate)){
					if (isNullOrEmpty(msg) && ( Utils.compareDate_V2(fDate,tDate) == 1)) {
						msg = msgCommonErr3;
						$('#popFromDate').focus();
					}
				}

				if (isNullOrEmpty(msg) && (Utils.compareDate_V2(PaymentManager._currentDate,fDate) == 1) ) {
					msg = msgCommonErr20;
					$('#popFromDate').focus();
				}

				var params = new Object();

				if(PaymentManager._isCreate == false || PaymentManager._isCreate == 'false'){

					var rows = $('#historyGrid').datagrid('getRows');

					var fromDate = $('#popFromDate').val();
					var toDate = $('#popToDate').val();

					if(rows != null && rows.length >0){
					  for(var i=0; i<rows.length; i++){
					    var row = rows[i];
					    if(row != null && isNullOrEmpty(msg)){
					      var rowF = "";
					      var rowT = "";

					      if(!Utils.isEmpty(row.fromDate)){
					        rowF = $.datepicker.formatDate('dd/mm/yy', new Date(row.fromDate));
					      }
					      if(!Utils.isEmpty(row.toDate)){
					        rowT = $.datepicker.formatDate('dd/mm/yy', new Date(row.toDate));
					      }



					      if(!Utils.isEmpty(rowT)){// to date tren grid khong null
							     if( (Utils.compareDate_V2(fromDate, rowF) == 1 || Utils.compareDate_V2(fromDate, rowF) == 0)
							        && (Utils.compareDate_V2(fromDate, rowT) == -1 || Utils.compareDate_V2(fromDate, rowT) == 0) ){
							   	  	msg = msgCheckHist;
							     }
					    	 }else{//to date tren grid null
					    		 if( !Utils.isEmpty(toDate)){
								     if( (Utils.compareDate_V2(fromDate, rowF) == -1 || Utils.compareDate_V2(fromDate, rowF) == 0)
								    		 && (Utils.compareDate_V2(toDate, rowF) == 1 || Utils.compareDate_V2(toDate, rowF) == 0)){
										   msg = msgCheckHist;
									     }
					    		 }else{
								     if( (Utils.compareDate_V2(fromDate, rowF) == -1 || Utils.compareDate_V2(fromDate, rowF) == 0)){
										   msg = msgCheckHist;
									     }
					    		 }

				    	  }


					      if(!Utils.isEmpty(toDate)){
					    	  if(!Utils.isEmpty(rowT)){// to date tren grid khong null
							      if( (Utils.compareDate_V2(toDate, rowF) == 1 || Utils.compareDate_V2(toDate, rowF) == 0)
									         && (Utils.compareDate_V2(toDate, rowT) == -1 || Utils.compareDate_V2(toDate, rowT) == 0) ){
									        msg = msgCheckHist;
							      }
					    	  }else{
								     if( (Utils.compareDate_V2(fromDate, rowF) == -1 || Utils.compareDate_V2(fromDate, rowF) == 0)
								    		 && (Utils.compareDate_V2(toDate, rowF) == 1 || Utils.compareDate_V2(toDate, rowF) == 0)){
										   msg = msgCheckHist;
									     }
					    	  }
					      }

					    }//end if

					  }//end for

					}//end if rows !null

				}

				if(!isNullOrEmpty(msg)){
					$('#paymentEasyUIDialog #errMsg').html(msg).show();
					return false;
				}


				params.isCreate = PaymentManager._isCreate;
				if(PaymentManager._isCreate == false || PaymentManager._isCreate == 'false'){
					params.prepaidId = $('#paymentId').val();
				}

				params.isRetail = $("#isRetail").is(':checked');


				params.prepaidName = $('#popPayName').val();
				params.usageHistory = $('#popPayExpire').val();
				params.initPrice = $('#popPayInit').val();
				params.fullPrice = $('#popPayFull').val();
				params.fromDate = $('#popFromDate').val();
				params.toDate = $('#popToDate').val();


				Utils.addOrSaveData(params, '/payment/create-or-update', null, 'errMsg',function(data1){
					if(!isNullOrEmpty(data1.errMsg)){
						$('#successMsg').html('').hide();
						$('#paymentEasyUIDialog #errMsg').html(data1.errMsg).show();
						setTimeout(function(){$('#successMsg').html('').hide();}, 10);
						return false;
					}else{
						if(PaymentManager._isCreate == true){
							$('#paymentEasyUIDialog').dialog('close');
							$('#grid').datagrid('reload');
						}else{
							$('#paymentEasyUIDialog #sucExcelMsg').html(msgCommon1).show();
							$('#historyGrid').datagrid('reload');
						}
						$('#errExcelMsg').html(msgCommon1).show();
						setTimeout(function(){$('#successMsg').html('').hide();}, 5000);
						setTimeout(function(){$('#sucExcelMsg').html('').hide();}, 5000);
					}
				},null,null, null, null, function(data2){
					if(!isNullOrEmpty(data2.errMsg)){
						$('#successMsg').html('').hide();
						$('#paymentEasyUIDialog #errMsg').html(data2.errMsg).show();
						return false;
					}
				});
		 }
};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.payment-manager.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.staff-Unit-Tree-Manager.js
 */
/**
 * Quan ly cay nhan vien
 * @author haupv3
 * @since 14/03/2015
 */
var staffTree = {
	isInited : false,
	inObject : null,
	isLoaded : false,
	lstId : new Map(),
	isChoseAndClose : false,
	isOpen : false,

	initTree : function(inObject, isF9){
		if(isF9 == true){
		 	$('#'+inObject).bind('keyup',function(event){
		 		if(event.keyCode == keyCode_F9){
		 			staffTree.loadTreeData();
		 		}
		 		if(event.keyCode == keyCodes.BACK_SPACE || event.keyCode == keyCodes.DELETE || event.keyCode == 32){
		 			$('#'+outObject).val('');
		 		}
		 	});
		 	$('#'+inObject).bind('touchstart',function(event){
		 		staffTree.loadTreeData();
		 	});
		}else{
			staffTree.loadTreeData();
		}

	 	$('#dlStaffCode').bind('keyup',function(event){
	 		if(event.keyCode == keyCodes.ENTER){
	 			$('#dlBtStaffSearch').click();
	 		}
	 	});
	 	$('#dlStaffName').bind('keyup',function(event){
	 		if(event.keyCode == keyCodes.ENTER){
	 			$('#dlBtStaffSearch').click();
	 		}
	 	});
		staffTree.inObject = inObject;
	},
	loadTreeData : function(){
		$('#staffTreeEasyUIDialog').dialog('open');
		staffTree.isOpen=true;
		if(staffTree.isLoaded == false){
		$('#tree').tree({
			url:'/catalog/unit-tree/staff-tree/get-list-staff' ,
		    checkbox:true,
		    lines:true,
		    singleSelect: false,
		    cascadeCheck: false,
		    onBeforeLoad: function(n,p){
		    	$('#loading').show();
		    },
		    formatter:function(node){
		    	return Utils.XSSEncode(node.text);
		    },
		    onLoadSuccess:function(parent,data){
		    	staffTree.isLoaded = true;
		    	$('#loading').hide();
				$('#staffTreeEasyUIDialog').dialog({
					cache: false,
					modal: true
				});
				$('#staffTreeEasyUIDialog').dialog('open');
				$('.window').css({top:"50"});
		    },
		    onCheck : function(node,checked){
		    	var isLeaf = $('#tree').tree('isLeaf', node.target);
		    	$('#'+node.domId).removeClass('tree-node-selected');
		    	var nId = node.id.split('-')[0].trim();

		    	//Neu khong phai node la duoc check/uncheck
		    	//if(isLeaf == true || isLeaf == 'true'){
		    		if(checked == true){
		    			staffTree.lstId.put(nId, nId);
//		    			$('#'+node.domId).children('.tree-checkbox').removeClass("tree-checkbox0").addClass("tree-checkbox1" );
		    		}else{
		    			staffTree.lstId.remove(nId);
//		    			$('#'+node.domId).children('.tree-checkbox').removeClass("tree-checkbox1").addClass("tree-checkbox0" );
		    		}
		    	//}

		    		//Neu node dang o trang thai close => chi lay node
		    		if(node.state == 'closed' ){
		    			//Uncheck/Check toan bo con
		    			var childs = $('#tree').tree('getChildren', node.target);
		    			if(childs != null){
				    		for(var i=0; i<childs.length; i++){
//		    					if($('#tree').tree('isLeaf', childs[i].target) == true){
	    						var chId = childs[i].id.split('-')[0].trim();
	    						var prNode = $('#tree').tree('getParent', childs[i].target);
	    						var prChildText = $('#'+prNode.domId).children('.tree-checkbox');
	    						var childText =  $('#'+childs[i].domId).children('.tree-checkbox');
	    						if($('#isCheckAll').is(':checked') ){
	    							if(prChildText.hasClass('tree-checkbox1') == true
//	    								&& prNode.state == 'open' 
	    								){
	    								childText.removeClass("tree-checkbox0").addClass("tree-checkbox1");
	    								staffTree.lstId.put(chId, chId);
	    							}
	    							else {
	    								childText.removeClass("tree-checkbox1").addClass("tree-checkbox0");
	    								staffTree.lstId.remove(chId);
	    							}
	    						}
				    		}
		    			}

		    		//Neu node dang o trang thai open => lay toan bo con
		    		}else{
		    			if(isLeaf == false || isLeaf == 'false'){
			    			var childs = $('#tree').tree('getChildren', node.target);
			    			if(childs != null  ){
			    				for(var i=0; i<childs.length; i++){
//			    					if($('#tree').tree('isLeaf', childs[i].target) == true){
			    						var chId = childs[i].id.split('-')[0].trim();
			    						var prNode = $('#tree').tree('getParent', childs[i].target);
			    						var prChildText = $('#'+prNode.domId).children('.tree-checkbox');
			    						var childText =  $('#'+childs[i].domId).children('.tree-checkbox');
			    						if($('#isCheckAll').is(':checked') ){
			    							if(prChildText.hasClass('tree-checkbox1') == true
//			    								&& prNode.state == 'open' 
			    								){
			    								childText.removeClass("tree-checkbox0").addClass("tree-checkbox1");
			    								staffTree.lstId.put(chId, chId);
			    							}
			    							else {
			    								childText.removeClass("tree-checkbox1").addClass("tree-checkbox0");
			    								staffTree.lstId.remove(chId);
			    							}
			    						}

//			    			    		if(childText.hasClass('tree-checkbox1') == true && $('#isCheckAll').is(':checked')){
//			    			    			staffTree.lstId.put(chId, chId);
//			    			    		}else{
//			    			    			staffTree.lstId.remove(chId);
//			    			    		}

//			    					}//end if isLeaf
			    				}

			    			}
		    			}
		    		}

		    },
		    onClose : function(){
		    	$('#staffCode').val(staffTree.lstId.valArray.length + ' <s:text name="jsp.chart.staff.title"/>');
		    	$('#'+staffTree.inObject).val(staffTree.lstId.valArray.length);
		    	staffTree.isOpen=false;
		    }

		});
		}
	},
	changeState : function(node, isChecked, isCheckAll){
		var childs = null;
		if(node != null){
			childs = $('#tree').tree('getChildren');

				if(childs != null){
					for(var i=0; i<childs.length; i++){
	  					  var ch = childs[i];
						  var childText =  $('#'+ch.id).children('.tree-checkbox');
						  if(node.state == 'closed'){
							  if($('#isCheckAll').is(':checked') == false){//khong cho check all
								  childText.removeClass("tree-checkbox1").addClass("tree-checkbox0");
							  }else{
								  childText.removeClass("tree-checkbox0").addClass("tree-checkbox1");
							  }
						  }else{
							  childText.removeClass("tree-checkbox0").addClass("tree-checkbox1");
						  }

						  if($('#tree').tree('isLeaf', ch.target) == false){
							  var childsOfChild = $('#tree').tree('getChildren', ch.target);
							  if(childsOfChild != null && childsOfChild.length >0){
								  staffTree.changeState(ch, isChecked, isCheckAll);
							  }
						  }
					}
				}
		}
	},
	searchStaff : function(){
		var params = new Object();
		var url = "/catalog/unit-tree/staff-tree/search-staff";
		params.staffCode = $('#dlStaffCode').val();
		params.staffName = $('#dlStaffName').val();
		$('.tree-node').removeClass('tree-node-selected');
		$('.tree-title').removeClass('tree-node-selected');
		$('#loading').show();
		Utils.getJSONDataByAjaxNotOverlay(params, url, function(data){
			$('#loading').hide();
			if(Utils.isEmpty(data.errMsg) && data.errMsg != true){
				if(data.lstStaff.length > 0){
					for(var i=0; i<data.lstStaff.length; i++){
						var st = data.lstStaff[i];
						var node = $('#tree').tree('find', st.id);
						if(node != null){
							if(!Utils.isEmpty(params.staffCode) || !Utils.isEmpty(params.staffName)){
//								$('#'+node.id).addClass('tree-node-selected');
							   $("span:contains("+node.text+")").addClass('tree-node-selected');
							}

						}else{
							if(!Utils.isEmpty(params.staffCode) || !Utils.isEmpty(params.staffName)){
								$('[id^='+ st.id.split('-')[0].trim() + ']').addClass('tree-node-selected');
							}
						}
					}

					$('#tree').tree('expandAll');
					if(data.lstStaff.length > 0){
						var scrollStaff = $('#tree').tree('find',  data.lstStaff[0].id);
						if(data.lstStaff.length > 1){
							scrollStaff = $('#tree').tree('find',  data.lstStaff[data.lstStaff.length-1].id);
						}
						if(scrollStaff != null){

							$('#tree').tree('scrollTo',  scrollStaff.target);
						}
					}



				}
			}
		}, null, 'POST');
	},
	dialogClose : function(isSelected){
		if(isSelected == true){
			staffTree.isChoseAndClose = true;
			staffTree.isOpen=false;
		}else{
			staffTree.isChoseAndClose = false;
			staffTree.lstId.clear();
			staffTree.isOpen=false;
		}
		staffTree.isOpen=false;
		$('#staffTreeEasyUIDialog').dialog('close');
	}
};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.staff-Unit-Tree-Manager.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.share-product.js
 */
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
			obj.staffGroupCode = '';
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
						$('#staffGroup').combobox('select', rec.id);
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
		Utils.getJSONDataByAjax(params, url, function(data){
			$("#chooseSaleStaff").kendoMultiSelect({
				  dataSource: ShareProduct.getDataComboboxForSaleStaff(data.lstSaleStaff),
				  dataValueField: "id",
				  dataTextField: "displayText",
//				  itemTemplate: kendo.template('#: staffCode# - #: staffName#'),
				  filter: "contains"
			});
		});
	},
	initGrid: function(url){
		$('#divOverlay_New').hide();
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
			checkOnSelect :false,
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
				{ field: "productId", checkbox:true, width: 50, align : 'center'
				},
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
				}
		    ]],
		    onLoadSuccess :function(data){
//		    	setTimout(function(){
		    		if (ShareProduct.isClearAllChecked != null && ShareProduct.isClearAllChecked){
			    		ShareProduct.isClearAllChecked = false;
			    		$('td[field=productId] .datagrid-header-check [type=checkbox]').attr('checked', false);
				    	$('#productGrid').datagrid('clearChecked');
			    	}
		    		var id = 10;
		    		$('.datagrid-cell-check input[name="productId"]').each(function () {	
			    		$(this).wrap('<label class="el-checkbox el-checkbox-lg"></label>');
			    		$(this).after('<span class="el-checkbox-style el-lebel" tabindex="'+id+'"></span></label>');
			    		id ++ ;
			    	  });	
			    	if($('.datagrid-header-check').find('label.el-checkbox').length == 0){	
			    		$('.datagrid-header-check input[type=checkbox]').each(function () {
			    			$(this).wrap('<label class="el-checkbox el-checkbox-lg"></label>');
			    			$(this).after('<span class="el-checkbox-style el-lebel" tabindex="9"></span></label>');
			    		
			    		  });
			    	};	
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

			    	$('input[name="productId"]').attr('checked', false);
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
		    	$('#datagrid-row-r3-2-'+rowIndex+'').addClass('datagrid-row-selected-custom');
			},
			onUncheck : function (rowIndex,rowData){
				if (ShareProduct._mapSelectedProduct != null){
					ShareProduct._mapSelectedProduct.remove(rowData.productId);
		    	}
				  $('#datagrid-row-r3-2-'+rowIndex+'').removeClass('datagrid-row-selected-custom');
			},
			onCheckAll : function (rows){
				if (ShareProduct._mapSelectedProduct != null){
					if($.isArray(rows)) {
						for (var i=0, size = rows.length; i< size; i++){
							var rowData = rows[i];
							ShareProduct._mapSelectedProduct.put(rowData.productId, rowData);
							$('#datagrid-row-r3-2-'+i+'').addClass('datagrid-row-selected-custom');
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
							$('#datagrid-row-r3-2-'+i+'').removeClass('datagrid-row-selected-custom');
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
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.share-product.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.support.js
 */
var Support = {
	xhrCreate:null,
	showTab : function(type) {
		$('#tab1').hide();
		$('#tab2').hide();
		$('#tab3').hide();
		$('#tab4').hide();
		$('#tab5').hide();
		$('#tab6').hide();
		$('#tab7').hide();
		$('#tab' + type).show();
		if(type == 1){
			$('#title').html(lbGuideline + " " + lbGuideTitle1);
		}else if(type == 2){
			$('#title').html(lbGuideline + " " + lbGuideTitle2);
		}else if(type == 3){
			$('#title').html(lbGuideline + " " + lbGuideTitle3);
		}else if(type == 4){
			$('#title').html(lbGuideline + " " + lbGuideTitle4);
		}else if(type == 5){
			$('#title').html(lbGuideline + " " + lbGuideTitle5);
		}else if(type == 6){
			$('#title').html(lbGuideline + " " + lbGuideTitle6);
		}else if(type == 7){
			$('#title').html(lbGuideline + " " + lbGuideTitle7);
		}
	}
};

/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/business/catalog/jquery.support.js
 */

/*
 * JavaScript file created by Rockstarapps Concatenation
*/
