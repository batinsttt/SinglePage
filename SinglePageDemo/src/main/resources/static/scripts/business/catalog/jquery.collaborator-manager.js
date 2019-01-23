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