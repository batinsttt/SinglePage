/*
 * JavaScript file create by ITSOL_DN
*/
var CommonUtils = {
	VAR_NAME: "_varname_",
	_SAVE_TYPE_CREATE: 1,
	_SAVE_TYPE_UPDATE: 0,
	_saveType: 1,
	_DEFAULT: -1,
	_CODE: 1,
	_NAME: 2,
	_ADDRESS: 3,
	_AREA: 4,
	_SAFE:5,
	_CTRL_PRESS: false,
	_SHIFT_PRESS: false,
	_TF_A_Z: 1,
	_TF_NUMBER: 2,
	_TF_NUMBER_DOT: 3,
	_TF_NUMBER_COMMA: 4,
	_TF_NUMBER_SIGN: 5,
	_TF_BAN_CHAR: 6,
	_TF_NUMBER_CONVFACT: 7,
	_TF_NUMBER_COMMA_AND_DOT: 8,
	_DATE_DD_MM_YYYY: 9,
	_DATE_MM_YYYY:10,
	_TF_CAR_NUMBER: 11,	
	_NUMBER_TYPE:1,
	_STRING_TYPE:2,
	_DATE_TYPE:3,
	_PAYROLL:12,
	_HOUR_TYPE: 13,
	_STAFF_GROUP_NAME:14,
	
	/**
	 * Validate phone number
	 * Input : String
	 * Return : String 
	 * **/
	formatPhoneNumberVietNam:function(value){
		var result = '0';
		var pos = value.search("84");
		if(pos==0){
			value = value.slice(2);
			result += value;
			return result;
		}		
		
		return value;
	},
	
	/**
	 * Validate phone number
	 * Input : String
	 * Return : true if is phone 
	 * **/
    isValidPhoneNumber: function(phoneNumber) {
        phoneNumber = phoneNumber.trim();
        try {
       	 return phoneNumber.match(/^(((\+?84|0)(9|3|7|8|5)\d{8})|((\+?84|0)(1)\d{9})|(0[4|8][6|2]\d{7})|(0[2|3|5|6|7]\d{1,2}[6|2]\d{6}))$/);
        } catch (e) {
            return false;
        }
    },
    /**
     * Custom phone number
     * Input : String
	 * Return : String
     * **/
    getRealPhoneNumber : function(phoneNumber){
    	var countryCode = "84";
    	var countryCodePlus = "+84";
    	if(!Utils.isEmpty(phoneNumber )){
	    	if(phoneNumber.substring(0,2) == countryCode ){
	    		  return "0" + phoneNumber.substring(2, phoneNumber.length);
	    	}else if(phoneNumber.substring(0,3) == countryCodePlus){
	    		return "0" + phoneNumber.substring(3, phoneNumber.length);
	    	}
    	}
    	return phoneNumber;
    },
	
    /**
     * Check is null or blank
     * Input : String
     * Return : true if null or blank
     * **/
	isNullOrEmpty: function(stringInput){
		stringInput += "";
		var result = true;
		if (stringInput != undefined && stringInput != null && stringInput != '' && stringInput.trim().length > 0){
			result = false;
		}
		return result;
	},

	getMessageOfInvalidFormatDate: function(objectId, objectName){
		if($('#' + objectId).val().trim() == '__/__/____'){
			$('#' + objectId).val('');
			return '';
		}
		if($('#' + objectId).val().trim().length > 0 && !Utils.isDate($('#' + objectId).val().trim(), '/')){
			$('#' + objectId).focus();			
			return format(msgErr_invalid_format_date,objectName);
		}
		return '';
	},
	getDataComboboxStaff:function(objectId,prefix){
		var data = new Array();		
		var parent = '';
		if(prefix!=undefined && prefix!=null){
			parent = prefix;
		}
		$(parent + '#' + objectId +' option').each(function(){
			var obj = new Object();
			obj.staffCode = $(this).val().trim();
			obj.staffName = $(this).text().trim();
			obj.displayText = $(this).val().trim() + ' - ' + $(this).text().trim(); 
			obj.searchText = unicodeToEnglish($(this).val().trim()+ $(this).text().trim());
			obj.searchText = obj.searchText.toUpperCase();
			data.push(obj);
		});
		return data;
	},
	
	isIntegerNumber: function(value){
		if (value != null && value > 0){
			if (value % 1 == 0){
				return true;
			}
		}
		return false;
	},
	getMessageOfSpecialCharactersValidateEx1: function(objectId, objectName,type){
		var value = $(objectId).val().trim();
		if(type == null || type == undefined){
			type = Utils._NAME;
		}
		var errMsg = '';
		if(value.length > 0){
			switch (type) {
			case Utils._CODE:
				if(!/^[0-9a-zA-Z-_.]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_code,objectName);
				}
				break;
			case Utils._NAME:
				if(!/^[^<|>|?|\\|\'|\"|&|~#|$|%|@|*|(|)|^|`]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_name,objectName);
				}
				break;
			case Utils._ADDRESS:
				if(!/^[^<|>|?|\\|\'|\"|&|~]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_address,objectName);
				}
				break;
			case Utils._PAYROLL:
				value = value.substring(3);
				if(!/^[0-9a-zA-Z]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_payroll,objectName);
				}
				break;
			case Utils._TF_NUMBER_COMMA:
				if(!/^[0-9a-zA-Z_]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_tf_id_number,objectName);
				}
				break;
			case Utils._NAME_CUSTYPE:
				if(!/^[^<|>|?|\\|\'|\"|&|~#|$|%|@|*|^|`]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_name,objectName);
				}
				break;
			default:
				break;
			}
		}	
		if(errMsg.length !=0){
			$(objectId).focus();
		}
		return errMsg;
	},
	getMessageOfSpecialCharactersValidate: function(objectId, objectName,type){
		var value = $('#' + objectId).val().trim();
		if(type == null || type == undefined){
			type = Utils._DEFAULT;
		}
		var errMsg = '';
		if(value.length > 0){
			switch (type) {
			case Utils._DEFAULT:
				if(!/^[^<|>|\/]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_default,objectName);
				}
				break;
			case Utils._CODE:
				if(!/^[0-9a-zA-Z-_.]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_code,objectName);
				}
				break;
			case Utils._NAME:
				if(!/^[^<|>|?|\\|\'|\"|&|~#|$|%|@|*|^|`]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_name,objectName);
				}
				break;
			case Utils._ADDRESS:
				if(!/^[^<|>|?|\\|\'|\"|&|~]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_address,objectName);
				}
				break;
			case Utils._AREA:
				if(!/^[^<|>|?|\\|\'|\"|&|~]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_area,objectName);
				}
				break;
			case Utils._PAYROLL:
				value = value.substring(3);
				if(!/^[0-9a-zA-Z]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_payroll,objectName);
				}
				break;
			case Utils._TF_NUMBER_COMMA:
				if(!/^[0-9a-zA-Z_]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_tf_id_number,objectName);
				}
				break;
			case Utils._TF_NUMBER:			
				if(!/^[0-9]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_num,objectName);
				}
				break;
			default:
				break;
			}
		}	
		if(errMsg.length !=0){
			$('#' + objectId).focus();
		}
		return errMsg;
	},
	
	/**
	 * check for value, not element id
	 * @param objectId
	 * @param objectName
	 * @param type
	 * @returns {String}
	 */
	getMessageOfSpecialCharactersValidateForValue: function(value, objectName,type){
		if(type == null || type == undefined){
			type = Utils._NAME;
		}
		var errMsg = '';
		if(value.length > 0){
			switch (type) {
			case Utils._CODE:
				if(!/^[0-9a-zA-Z-_.]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_code,objectName);
				}
				break;
			case Utils._NAME:
				if(!/^[^<|>|?|\\|\'|\"|&|~#|$|%|@|*|^|`]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_name,objectName);
				}
				break;
			case Utils._ADDRESS:
				if(!/^[^<|>|?|\\|\'|\"|&|~]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_address,objectName);
				}
				break;
			case Utils._AREA:
				if(!/^[^<|>|?|\\|\'|\"|&|~]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_area,objectName);
				}
				break;
			case Utils._PAYROLL:
				value = value.substring(3);
				if(!/^[0-9a-zA-Z]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_payroll,objectName);
				}
				break;
			case Utils._TF_NUMBER_COMMA:
				if(!/^[0-9a-zA-Z_]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_tf_id_number,objectName);
				}
				break;
			case Utils._TF_NUMBER:			
				if(!/^[0-9]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_num,objectName);
				}
				break;
			case Utils._SAFE:	
				if(!/^[^<|>|\\|\'|\"]+$/.test(value)){
					errMsg = format(msgErr_invalid_format_safe,objectName);
				}
				break;	
			default:
				break;
			}
		}
		return errMsg;
	},
	getMessageOfRequireCheck: function(objectId, objectName,isSelectBox){
		if($('#' + objectId).val()!=undefined && $('#' + objectId).val() != null && $('#' + objectId).val().trim() == '__/__/____'){
			$('#' + objectId).val('');
		}
		if((isSelectBox!= undefined && isSelectBox && parseInt($('#' + objectId).val().trim()) < 0) || ((isSelectBox== undefined || !isSelectBox) && $('#' + objectId).val()!=undefined && $('#' + objectId).val() != null && $('#' + objectId).val().trim().length == 0)){
			$('#' + objectId).focus();
			if(!isSelectBox){
				return format(msgErr_required_field,objectName);
			}else{
				return format(msgErr_required_choose_format,objectName);
			}
			
		}
		var maxlength = $('#' + objectId).attr('maxlength');
		if(maxlength!= undefined && maxlength!= null && maxlength.length > 0){
			if($('#' + objectId).val().trim().length > maxlength){
				$('#' + objectId).focus();
				return format(msgErr_invalid_maxlength,objectName,maxlength);
			}
		}
		return '';
	},
	standardizedSequence: function(sequence){
		if(!Utils.isEmpty(sequence)){
			return sequence.trim();
		}
		return sequence;
	},
	isEmpty : function(val){
		if(val){
			return ((val===null) || val.length==0 || /^\s+$/.test(val));
		}else{
			return true;
		}
	},	
	XSSObject:function(obj){
        for (var i in obj) {
              if (obj.hasOwnProperty(i)) {
                    if(obj[i] instanceof Array || obj[i] instanceof Object){
                          obj[i]=Utils.XSSObject(obj[i]);
                    }else{
                          obj[i]=Utils.XSSEncode(obj[i]);
                    }
              }
        }
        return obj;
	},
	showEncode: function(s, en){
		if(!Utils.isEmpty(s)){
			s = s.toString();
			en = en || true;
			s = Utils.XSSDeEncode(s, en);
			if(en){
				s = s.replace(/</g,"&lt;");
				s = s.replace(/>/g,"&gt;");
			}else{
				s = s.replace(/</g,"&#60;");
				s = s.replace(/>/g,"&#62;");
			}
			return s;
		}else{
			return "";
		}
	},
	XSSEncode: function(s,en){
		if(!Utils.isEmpty(s)){
			s = s.toString();
			en = en || true;
			s = Utils.XSSDeEncode(s, en);
			s = s.replace(/&/g,"&amp;");
//			s = s.replace(/\//g, "&#x2F;");
			if(en){
				s = s.replace(/'/g,"&#39;"); //no HTML equivalent as &apos is not cross browser supported
				s = s.replace(/"/g,"&quot;");
				s = s.replace(/</g,"&lt;");
				s = s.replace(/>/g,"&gt;");
			}else{
				s = s.replace(/'/g,"&#39;"); //no HTML equivalent as &apos is not cross browser supported
				s = s.replace(/"/g,"&#34;");
				s = s.replace(/</g,"&#60;");
				s = s.replace(/>/g,"&#62;");
			}
			return s;
		}else{
			return s;
		}
	},	
	XSSDeEncode : function(s,en){//haupv3
		if(!Utils.isEmpty(s)){
			s = s.toString();
			en = en || true;
			s = s.replace(/&amp;/g, '&');
			s = s.replace(/&#x2F;/g, '/');
//			if(en){
				s = s.replace(/&#39;/gi, "'"); //no HTML equivalent as &apos is not cross browser supported
				s = s.replace(/&quot;/gi, '"');
				s = s.replace(/&lt;/gi,'<');
				s = s.replace(/&gt;/gi,'>');
//			}else{
				s = s.replace(/&#39;/gi, "'"); //no HTML equivalent as &apos is not cross browser supported
				s = s.replace(/&#34;/gi,'"');
				s = s.replace(/&#60;/gi, '<');
				s = s.replace(/&#62;/gi, '>');
//			}
			return s;
		}else{
			return s;
		}
	},
	updateTokenForJSON: function(data){
		$('#token').val(data.token);
	},
	getToken: function(){
		return $('#token').val();		
	},
	showMessageAlert: function(title, msg){
		if (title == null){
			title = msgThongBao;
		}
		$.messager.alert(title, msg);
	},
	showMessageConfirm: function(title, msg, callback){
		if (StringUtils.isNullOrEmpty(title)){
			title = msgXacNhan;
		}
		$.messager.confirm(title, msg, function(r){
			if (r != null && r){
				if (callback != null){
					callback.call(this);
				}
			}
		});
	},
	addOrSaveData: function(dataModel, url, xhrSave, errMsgId, callback,loading, prefix, isDelete, message, callBackFail, isShowConfirmation, isShowDivOverlay){
		if(url.startsWith("http") == false || url.startsWith("http") =='false'){		    		
	   		 if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
	   			 url = WEB_CONTEXT_PATH  + url;
			     }
		}
		
		$('.ErrorMsgStyle').html('').hide();
		Utils.hidePopupNotify();
		if(isDelete != undefined || isDelete != null || isDelete != false){
			var msg;
			if(message == null || message == '' || message == undefined) {
				msg = common_save_confirm;
				if (isShowConfirmation == undefined || isShowConfirmation == null){
					isShowConfirmation = false;
				}
			} else {
				msg = message;
				isShowConfirmation = true;
			}
			if (isShowConfirmation){
				$.messager.confirm(msgXacNhan, msg, function(r){
					if (r){
						if(dataModel.changeCus != undefined && dataModel.changeCus == 3){
							dataModel.changeCus = 1;
						}
						Utils.saveData(dataModel, url, xhrSave, errMsgId, callback,loading,prefix,isDelete,callBackFail, null, isShowDivOverlay);
					}else{
						$('.fancybox-inner #btnCreate').removeAttr("disabled");
						$('.fancybox-inner #btnClose').removeAttr("disabled");
					}
				});
			}else{
				if(dataModel.changeCus != undefined && dataModel.changeCus == 3){
					dataModel.changeCus = 1;
				}
				Utils.saveData(dataModel, url, xhrSave, errMsgId, callback,loading,prefix,isDelete,callBackFail, null, isShowDivOverlay);
			}
		} else {
			Utils.saveData(dataModel, url, xhrSave, errMsgId, callback,loading,prefix,isDelete,callBackFail, null, isShowDivOverlay);
		}
		return false;
	},
	addOrSaveDataWithTimeOut: function(dataModel, url, xhrSave, errMsgId, callback,loading, prefix, isDelete, message, callBackFail, isShowConfirmation, isShowDivOverlay){
		 
		$('.ErrorMsgStyle').html('').hide();
		Utils.hidePopupNotify();
		if(isDelete != undefined || isDelete != null || isDelete != false){
			var msg;
			if(message == null || message == '' || message == undefined) {
				msg = common_save_confirm;
				if (isShowConfirmation == undefined || isShowConfirmation == null){
					isShowConfirmation = false;
				}
			} else {
				msg = message;
				isShowConfirmation = true;
			}
			if (isShowConfirmation){
				$.messager.confirm(msgXacNhan, msg, function(r){
					if (r){
						if(dataModel.changeCus != undefined && dataModel.changeCus == 3){
							dataModel.changeCus = 1;
						}
						Utils.saveDataWithTimeOut(dataModel, url, xhrSave, errMsgId, callback,loading,prefix,isDelete,callBackFail, null, isShowDivOverlay);
					}else{
						$('.fancybox-inner #btnCreate').removeAttr("disabled");
						$('.fancybox-inner #btnClose').removeAttr("disabled");
					}
				});
			}else{
				if(dataModel.changeCus != undefined && dataModel.changeCus == 3){
					dataModel.changeCus = 1;
				}
				Utils.saveDataWithTimeOut(dataModel, url, xhrSave, errMsgId, callback,loading,prefix,isDelete,callBackFail, null, isShowDivOverlay);
			}
		} else {
			Utils.saveDataWithTimeOut(dataModel, url, xhrSave, errMsgId, callback,loading,prefix,isDelete,callBackFail, null, isShowDivOverlay);
		}
		return false;
	},
	addOrSaveRowOnGrid: function(dataModel,url,xhrSave,gridId,errMsgId,callback,loading){
		Utils.addOrSaveData(dataModel, url, xhrSave, errMsgId, function(data){
			if (gridId != null){
				$("#"+ gridId).datagrid('reload');
			}
			if(callback!= null && callback!= undefined){
				callback.call(this,data);
			}
		},loading);		
		return false;
	},
	/**
	 * use new data format
	 * @author tuannd20
	 * @param dataModel
	 * @param url
	 * @param xhrSave
	 * @param errMsgId
	 * @param callback
	 * @param loading
	 * @param prefix
	 * @param isDelete
	 * @param message
	 * @param callBackFail
	 * @date 21/06/2014
	 */
	addOrSaveDataEx: function(dataModel, url, xhrSave, errMsgId, callback,loading,prefix,isDelete,message,callBackFail){
		var data = getSimpleObject(dataModel);
		Utils.addOrSaveData(data, url, xhrSave, errMsgId, callback,loading,prefix,isDelete,message,callBackFail);
	},
	saveData: function(dataModel, url, xhrSave, errMsgId, callback,loading,prefix,isDelete,callBackFail,hideSuccessMsg, isShowDivOverlay){
		var errMsg = 'errMsg';
		if(errMsgId!= undefined && errMsgId!= null && errMsgId.length > 0){
			errMsg = errMsgId;
		}
		if(prefix!= undefined && prefix!= null && prefix.length > 0){
			if ($(prefix + ' #'+ errMsg) != undefined && $(prefix + ' #'+ errMsg) != null ){
				$(prefix + ' #'+ errMsg).html('').hide();
			}
		}else{
			if ($(prefix + ' #'+ errMsg) != undefined && $(prefix + ' #'+ errMsg) != null ){
				$('#'+ errMsg).html('').hide();
			}
		}
		if(prefix!= undefined && prefix!= null && prefix.length > 0){
			if ($(prefix + '#successMsg') != undefined && $(prefix + '#successMsg') != null){
				$(prefix + '#successMsg').html('').hide();
			}
		}else{
			if ($(prefix + '#successMsg') != undefined && $(prefix + '#successMsg') != null){
				$('#successMsg').html('').hide();
			}
		}	
		
		if(dataModel == null || dataModel == undefined){
			dataModel = new Object();
		}
		dataModel.token = Utils.getToken();
		//dataModel=Utils.XSSObject(dataModel);
		var kData = $.param(dataModel, true);
		if(xhrSave!=null){
			xhrSave.abort();
		}		
		if (isShowDivOverlay != null && isShowDivOverlay == false){
			/**No show*/
		}else{
			$('#divOverlay_New').show();
		}
		var errType = Until_Save;
		if(isDelete != undefined && isDelete != null && isDelete == true){
			errType = msgText4;
		}
		xhrSave = $.ajax({
			type : "POST",
			url : url,
			data :(kData),
			dataType : "json",
			
//			headers: {
//		        "Content-type":"application/x-www-form-urlencoded;charset=utf-8"
//		    },
			success : function(data) {				
				$('#divOverlay_New').hide();				
				Utils.updateTokenForJSON(data);				
				if(data.error && data.errMsg!= undefined){
					if(prefix!= undefined && prefix!= null && prefix.length > 0){
						$(prefix + ' #'+ errMsg).html(data.errMsg).show();
						/*var tmout = setTimeout(function(){
							$(prefix + ' #'+ errMsg).html('').hide();
						}, 7000);*/
					}else{
						if ($('#'+ errMsg) != undefined && $('#'+ errMsg) != null){
							$('#'+ errMsg).html(escapeSpecialChar(data.errMsg)).show();
						}
						/*var tmout = setTimeout(function(){
							$('#'+ errMsg).html('').hide();
						}, 7000);*/
					}
					if(callBackFail!=null && callBackFail!=undefined){
						callBackFail.call(this,data);
					}
				} else {					
					if(callback!= null && callback!= undefined){
						callback.call(this,data);
					}
					if(hideSuccessMsg == null || hideSuccessMsg == undefined || hideSuccessMsg == ""){
						if(prefix!= undefined && prefix!= null && prefix.length > 0){
							$(prefix + ' #successMsg').html( format(Until_saveSuccess,errType)).show();
						}else{
							if ($('#successMsg') != undefined && $('#successMsg') != null){
								$('#successMsg').html(format(Until_saveSuccess,errType) ).show();
							}
						}
						setTimeout(function(){
							if(prefix!= undefined && prefix!= null && prefix.length > 0){
								$(prefix + '#successMsg').html('').hide();
							}else{
								if ($('#successMsg') != undefined && $('#successMsg') != null){
									$('#successMsg').html('').hide();
								}
							}
						}, 7000);
					}
					var isFocus = false;
					$('.GeneralMilkInBox .InputTextStyle').each(function(){
					    if(!$(this).is(':hidden') && !isFocus){
					    	isFocus = true;
					        $(this).focus();
					    }
					});
				}
				xhrSave = null;				
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {				 
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH +'/check-session',
					dataType : "json",
					success : function(data) {
						ReportsUtils._xhrReport = null;
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href =WEB_CONTEXT_PATH +'/home';
					}
				});
			},
			statusCode: {
		        404: function() {
		        	$('#divOverlay_New').hide();	
		        },
		        500: function() {
		        	$('#divOverlay_New').hide();	
		        },
		        505: function() {
		        	$('#divOverlay_New').hide();	
		        }
		      }
		});
	},
	saveDataWithTimeOut: function(dataModel, url, xhrSave, errMsgId, callback,loading,prefix,isDelete,callBackFail,hideSuccessMsg, isShowDivOverlay){
		var errMsg = 'errMsg';
		if(errMsgId!= undefined && errMsgId!= null && errMsgId.length > 0){
			errMsg = errMsgId;
		}
		if(prefix!= undefined && prefix!= null && prefix.length > 0){
			if ($(prefix + ' #'+ errMsg) != undefined && $(prefix + ' #'+ errMsg) != null ){
				$(prefix + ' #'+ errMsg).html('').hide();
			}
		}else{
			if ($(prefix + ' #'+ errMsg) != undefined && $(prefix + ' #'+ errMsg) != null ){
				$('#'+ errMsg).html('').hide();
			}
		}
		if(prefix!= undefined && prefix!= null && prefix.length > 0){
			if ($(prefix + '#successMsg') != undefined && $(prefix + '#successMsg') != null){
				$(prefix + '#successMsg').html('').hide();
			}
		}else{
			if ($(prefix + '#successMsg') != undefined && $(prefix + '#successMsg') != null){
				$('#successMsg').html('').hide();
			}
		}	
		
		if(dataModel == null || dataModel == undefined){
			dataModel = new Object();
		}
		dataModel.token = Utils.getToken();
		//dataModel=Utils.XSSObject(dataModel);
		var kData = $.param(dataModel, true);
		if(xhrSave!=null){
			xhrSave.abort();
		}		
		if (isShowDivOverlay != null && isShowDivOverlay == false){
			/**No show*/
		}else{
			$('#divOverlay').show();
		}
		var errType = Until_Save;
		if(isDelete != undefined && isDelete != null && isDelete == true){
			errType = msgText4;
		}
		xhrSave = $.ajax({
			type : "POST",
			url : url,
			data :(kData),
			dataType : "json",
			timeout : 30000,
//			headers: {
//		        "Content-type":"application/x-www-form-urlencoded;charset=utf-8"
//		    },
			success : function(data) {				
				$('#divOverlay').hide();				
				Utils.updateTokenForJSON(data);				
				if(data.error && data.errMsg!= undefined){
					if(prefix!= undefined && prefix!= null && prefix.length > 0){
						$(prefix + ' #'+ errMsg).html(data.errMsg).show();
						/*var tmout = setTimeout(function(){
							$(prefix + ' #'+ errMsg).html('').hide();
						}, 7000);*/
					}else{
						if ($('#'+ errMsg) != undefined && $('#'+ errMsg) != null){
							$('#'+ errMsg).html(escapeSpecialChar(data.errMsg)).show();
						}
						/*var tmout = setTimeout(function(){
							$('#'+ errMsg).html('').hide();
						}, 7000);*/
					}
					if(callBackFail!=null && callBackFail!=undefined){
						callBackFail.call(this,data);
					}
				} else {					
					if(callback!= null && callback!= undefined){
						callback.call(this,data);
					}
					if(hideSuccessMsg == null || hideSuccessMsg == undefined || hideSuccessMsg == ""){
						if(prefix!= undefined && prefix!= null && prefix.length > 0){
							$(prefix + ' #successMsg').html( format(Until_saveSuccess,errType)).show();
						}else{
							if ($('#successMsg') != undefined && $('#successMsg') != null){
								$('#successMsg').html(format(Until_saveSuccess,errType) ).show();
							}
						}
						setTimeout(function(){
							if(prefix!= undefined && prefix!= null && prefix.length > 0){
								$(prefix + '#successMsg').html('').hide();
							}else{
								if ($('#successMsg') != undefined && $('#successMsg') != null){
									$('#successMsg').html('').hide();
								}
							}
						}, 7000);
					}
					var isFocus = false;
					$('.GeneralMilkInBox .InputTextStyle').each(function(){
					    if(!$(this).is(':hidden') && !isFocus){
					    	isFocus = true;
					        $(this).focus();
					    }
					});
				}
				xhrSave = null;				
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {	
				if(textStatus==="timeout") {     
					callBackFail.call(this,textStatus);
					$('#divOverlay').hide();
				}else{ 
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH+'/check-session',
					dataType : "json",
					success : function(data) {
						ReportsUtils._xhrReport = null;
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href =WEB_CONTEXT_PATH +'/home';
					}
				});				
				}
			},
			statusCode: {
		        404: function() {
		        	$('#divOverlay').hide();	
		        },
		        500: function() {
		        	$('#divOverlay').hide();	
		        },
		        505: function() {
		        	$('#divOverlay').hide();	
		        }
		      }
		});
	},
	/** Request Ajax HTML khong co bieu tuong loading */
	getHtmlDataByAjaxNotOverlay: function(params,url,callback,loading,requestType){
		if(url.startsWith("http") == false || url.startsWith("http") =='false'){
			if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
				url = WEB_CONTEXT_PATH  + url;
			}
    	}/*else if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
    		url = WEB_CONTEXT_PATH  + url;
    	}*/
		
		var rt = 'POST';
		var kData = $.param(params, true);
		if(requestType!= null && requestType!= undefined && requestType!=''){
			rt = requestType;
		}
		$.ajax({
			type : rt,
			url : url,
			data :(kData),
			dataType : "html",
			success : function(data) {
				if(callback!= null && callback!= undefined){
					callback.call(this,data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
			}
		});
		return false;
	},
	getJSON: function(url, dataOrCallback, callback){
		
		if(url.startsWith("http") == false || url.startsWith("http") =='false'){		    		
	   		 if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
	   			 url = WEB_CONTEXT_PATH  + url;
			     }
	   	
			}
		
		if (callback != undefined || callback != null){
			$.getJSON(url, dataOrCallback, function(data){
				if (data != null){
					data = Utils.XSSObject(data);
				}
				if (callback != undefined && callback != null){
					callback.call(this, data);
				}
			});
		}else{
			$.getJSON(url, function(data){
				if (data != null){
					data = Utils.XSSObject(data);
				}
				if (dataOrCallback != undefined && dataOrCallback != null){
					dataOrCallback.call(this, data);
				}
			});
		}
	},
	/** Request Ajax JSON khong co bieu tuong loading */
	getJSONDataByAjaxNotOverlay: function(params,url,callback,loading,requestType){
		if(url.startsWith("http") == false || url.startsWith("http") =='false'){
			if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
				url = WEB_CONTEXT_PATH  + url;
			}
    	}/*else if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
    		url = WEB_CONTEXT_PATH  + url;
    	}*/
		
		var rt = 'POST';
		var kData = $.param(params, true);
		if(requestType!= null && requestType!= undefined && requestType!=''){
			rt = requestType;
		}
		$.ajax({
			type : rt,
			url : url,
			data :(kData),
			dataType : "json",
//			headers: {
//		        "Content-type":"application/x-www-form-urlencoded;charset=utf-8"
//		    },
			success : function(data) {
				if(callback!= null && callback!= undefined){
					data=Utils.XSSObject(data);
					callback.call(this,data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
			}
		});
		return false;
	},
	/** Request Ajax HTML co bieu tuong loading */
	getHtmlDataByAjax: function(params,url,callback,loading,requestType){
		if(url.startsWith("http") == false || url.startsWith("http") =='false'){
			if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
				url = WEB_CONTEXT_PATH  + url;
			}
    	}/*else if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
    		url = WEB_CONTEXT_PATH  + url;
    	}*/
		
		
		var rt = 'POST';
		var kData = $.param(params, true);
		if(requestType!= null && requestType!= undefined && requestType!=''){
			rt = requestType;
		}
		$('#divOverlay_New').show();
		$.ajax({
			type : rt,
			url : url,
			data :(kData),
			dataType : "html",
			success : function(data) {
				$('#divOverlay_New').hide();
				if(callback!= null && callback!= undefined){
					callback.call(this,data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$('#divOverlay_New').hide();
				hideLoadingIcon(loading);
			}
		});
		return false;
	},
	/** Request Ajax JSON co bieu tuong loading */
	getJSONDataByAjax: function(params,url,callback,loading,requestType, hasDivOverlay){
		
		if(url.startsWith("http") == false || url.startsWith("http") =='false'){
			if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
				url = WEB_CONTEXT_PATH  + url;
			}
    	}/*else if(url.startsWith(WEB_CONTEXT_PATH) == false || url.startsWith(WEB_CONTEXT_PATH) =='false'){
    		url = WEB_CONTEXT_PATH  + url;
    	}*/
		
		var rt = 'POST';
		var kData = $.param(params, true);
		if(requestType!= null && requestType!= undefined && requestType!=''){
			rt = requestType;
		}
		if (hasDivOverlay != null && hasDivOverlay == false){
			
		}else{
			$('#divOverlay_New').show();
		}
		$.ajax({
			type : rt,
			url : url,
			data :(kData),
			dataType : "json",
//			headers: {
//		        "Content-type":"application/x-www-form-urlencoded;charset=utf-8"
//		    },
			success : function(data) {
				$('#divOverlay_New').hide();
				if(callback!= null && callback!= undefined){
					data=Utils.XSSObject(data);
					callback.call(this,data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$('#divOverlay_New').hide();
				hideLoading(loading);				
			}
		});
		return false;
	},
	checkIsJSON:function(object) {
		var stringConstructor = "test".constructor;
		var arrayConstructor = [].constructor;
		var objectConstructor = {}.constructor;
		if (object === null) {
	        return false;
	    }
	    else if (object === undefined) {
	        return false;
	    }
	    else if (object.constructor === stringConstructor) {
	        return false;
	    }
	    else if (object.constructor === arrayConstructor) {
	        return false;
	    }
	    else if (object.constructor === objectConstructor) {
	        return true;
	    }
	    else {
	        return false;
	    }
	},
	loadKendoUICbxFromDatasource: function(selector, dataTextField, dataValueField, datasource, 
			placeholder, template, cascadeFrom, changeEvent, selectEvent, closeEvent, openEvent){
		$(selector).kendoComboBox({
			dataTextField: dataTextField,
			dataValueField: dataValueField,
			dataSource: datasource,
			change: function(e){
				if (changeEvent != undefined && changeEvent != null){
					changeEvent.call(this, e);
				}
			},
			select: function(e){
				if (selectEvent != undefined && selectEvent != null){
					selectEvent.call(this, e);
				}
			},
			open: function(e){
				if (openEvent != undefined && openEvent != null){
					openEvent.call(this, e);
				}
			},
			close: function(e){
				if (closeEvent != undefined && closeEvent != null){
					closeEvent.call(this, e);
				}
			}
		});
	},
	loadKendoUICbxFromUrl: function(){
		
	},
	getStatusValue : function(status){
		if(status == 'DELETED'){
			return -1;
		} else if(status == 'STOPPED'){
			return 0;
		}
		return 1;
	},
	bindAutoCombineKey:function(){
		$('.GeneralMilkInBox .InputTextStyle ').each(function(){
	   		$(this).bind('keyup',function(event){
	   			if(event.ctrlKey && ($.inArray(event.keyCode,keyCombine) > -1)){
	   				$('.LabelStyle u').each(function(){
						if($(this).html() == String.fromCharCode(event.keyCode)){
							var div = $(this).parent().next().attr("id");
							if(div == undefined){
								div = $(this).parent().next().children().attr("id");
							}
							$('#'+div).focus();
							return false;
						}
					});
	   			}
	   		});    
		});
	},
	bindAutoSearch: function(){
		var check = false;
		if (!check){
			$('.easyui-window .InputTextStyle').each(function(){
			    if(!$(this).is(':hidden')){
			    	check=true;
			    	$(this).unbind('keyup');
			    	$(this).bind('keyup',function(event){
			   			if(event.keyCode == keyCodes.ENTER){		   				
			   				$('.easyui-window .BtnSearchOnDialog').each(function(){	   					
			   					if(!$(this).is(':hidden')){
			   						$(this).click();
			   					}
			   				});
			   			}
			   		});    
			    }	    
			});
		}
		if (!check){
			$('.easyui-dialog .panel .InputTextStyle').each(function(){
			    if(!$(this).is(':hidden')){
			    	check=true;
			    	$(this).unbind('keyup');
			   		$(this).bind('keyup',function(event){
			   			if(event.keyCode == keyCodes.ENTER){		   				
			   				$('.easyui-dialog .BtnSearchOnDialog').each(function(){	   					
			   					if(!$(this).is(':hidden')){
			   						$(this).click();
			   					}
			   				});
			   			}
			   		});    
			    }	    
			});
		}
		if (!check){
			$('.SearchSection .InputTextStyle ').each(function(){
			    if(!$(this).is(':hidden')){
			    	$(this).unbind('keyup');
			   		$(this).bind('keyup',function(event){
			   			if(event.keyCode == keyCodes.ENTER){		   				
			   				if($('#btnSearch')!= null && $('#btnSearch').html()!= null && $('#btnSearch').html().trim().length > 0 && !$('#btnSearch').is(':hidden')){
			   					$('#btnSearch').click();			   					
			   				}
			   				$('.BtnSearch').each(function(){	   					
			   					if(!$(this).is(':hidden')){
			   						$(this).click();
			   					}
			   				});
			   			}
			   		});    
			    }	    
			});
		}		
	},	
	bindingBanCharacter: function(){
		$('.InputTextStyle').each(function(){
			$(this).unbind('keypress');
			$(this).bind('keypress', function(e){
				var key;
				var keychar;
				if (window.event) {
				   key = window.event.keyCode;
				}else if (e) {
				   key = e.which;
				}else {
				   return true;
				}
				keychar = String.fromCharCode(key);
				if ((key==null) || (key==0) || (key== keyCodes.BACK_SPACE) ||  (key == keyCodes.TAB) || (key==keyCodes.ENTER) || (key==keyCodes.ESCAPE) ) {
					   return true;
					}else if ((("?#").indexOf(keychar) > -1)) {
						return false;
					}else{
					   return true;
					}
			});
			$(this).bind('paste', function(){
				var id = $(this).attr('id');
				setTimeout(function(){
					$('#' + id).val($('#' + id).val().replace(/\?/g,'').replace(/\#/g,''));
				},200);
			});
		});		
	},
	unbindFormatOnTextfield: function(id){
		$("#"+id).unbind("keyup");
		$("#"+id).unbind("keydown");
		$("#"+id).unbind("paste");
	},
	bindFormatOntextfieldCurrencyFor: function(input,formatType){
		Utils.formatCurrencyFor(input);
		Utils.bindFormatOnTextfield(input,formatType);
	},
	bindFormatOnTextfieldInputCss: function(nameClassCss, formatType,prefix){
		if(prefix == null || prefix == undefined){
			prefix = '';
		}
		$(prefix + ' ' + '.'+nameClassCss).each(function(){
			var objectId = $(this).attr('id');
			if(objectId!=null && objectId!=undefined && objectId.length>0){
				Utils.bindFormatOnTextfield(objectId, formatType, prefix);
			}			
		});
	},
	bindFormatCalenderOnTextfieldInputCss: function(nameClassCss){
		$('.'+nameClassCss).each(function(){
			var objectId = $(this).attr('id');
			if(objectId!=null && objectId!=undefined && objectId.length>0){
				applyDateTimePicker("#"+objectId);
			}			
		});
	},
	bindFormatOnTextfield: function(id, formatType,prefix){
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
		var prefixTmp ='';
		if(prefix != undefined && prefix!= null && prefix != ''){
			prefixTmp = prefix;
		}
		$(prefixTmp+'#' + id).bind('keyup', function(e){
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
		$(prefixTmp +'#' + id).bind('keydown', function(e){
			var code;
			if (!e) var e = window.event;
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = fromKeyCode(code).split(' ')[0];			
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
		$(prefixTmp+ '#' + id).bind('paste', function(){			
			var tmAZ = setTimeout(function(){
				$(prefixTmp+ '#' + id).val($(prefixTmp+ '#' + id).val().replace(regAll,''));
				clearTimeout(tmAZ);
			},200);
		});
	},
	compareCurrentDate:function(date) {		
		if(date.length == 0) {
			return false;
		}
		var now = new Date(sysDateFromServer);
		var cYear = now.getFullYear();
		var cMonth = now.getMonth() + 1;
		var cDate = now.getDate();
		var currentDate = cDate+'/'+cMonth+'/'+cYear;
		return Utils.compareDate(date, currentDate);
	},
	formatCurrencyFor: function(idInput) {
		$('#'+idInput).bind('keyup', function(e) {
			var valMoneyInput = $('#'+idInput).val();
			valMoneyInput = Utils.returnMoneyValue(valMoneyInput);
			if(isNaN(valMoneyInput) || valMoneyInput == "" || valMoneyInput == '') {
				return false;
			}
			var _valMoneyInput = formatCurrency(valMoneyInput);
			$('#'+idInput).val(_valMoneyInput);
		});
		$('#'+idInput).bind('paste', function(){
		    setTimeout(function(){
		    	var valMoneyInput = $('#'+idInput).val();
		        valMoneyInput = Utils.returnMoneyValue(valMoneyInput);
		        if(isNaN(valMoneyInput) || valMoneyInput == "" || valMoneyInput == '') {
		        	return false;
		        }
		        var _valMoneyInput = formatCurrency(valMoneyInput);
		        $('#'+idInput).val(_valMoneyInput); 
		    },200);
		});
	},
	formatCurrencyForInterger: function(idInput) {
		$('#'+idInput).bind('keyup', function(e) {
			var valMoneyInput = $('#'+idInput).val();
			valMoneyInput = Utils.returnMoneyValue(valMoneyInput);
			if(isNaN(valMoneyInput) || valMoneyInput == "" || valMoneyInput == '') {
				return false;
			}
			var _valMoneyInput = formatCurrencyInterger(Number(valMoneyInput));
			$('#'+idInput).val(_valMoneyInput);
		});
		$('#'+idInput).bind('paste', function(){
		    setTimeout(function(){
		    	var valMoneyInput = $('#'+idInput).val();
		        valMoneyInput = returnMoneyValue(valMoneyInput);
		        if(isNaN(valMoneyInput) || valMoneyInput == "" || valMoneyInput == '') {
		        	return false;
		        }
		        var _valMoneyInput = formatCurrencyInterger(Number(valMoneyInput));
		        $('#'+idInput).val(_valMoneyInput); 
		    },200);
		});
	},
	returnMoneyValue: function(valMoney) {
		var _valMoney = valMoney + '';
		var value = _valMoney.split(',').join('');
		var i=0;
		if (value != null && parseFloat(value) >= 0 && parseFloat(value) < 1){
			return parseFloat(value).toString();
		}
		for(i=0;i<value.length-1;i++){//Nếu tất cả từ 0 -> length-2 là 0 thì lấy số cuối 
			if(value[i]!='0'){
				break;
			}
		}
		return value.substring(i,value.length);
	},
	formatFloatValueWithTailZero: function(number){
		if (StringUtils.isNullOrEmpty(number) || isNaN(Utils.returnMoneyValue(number))){
			return parseFloat(0).toFixed(numFloat);
		}
		number = parseFloat(Utils.returnMoneyValue(number)).toFixed(numFloat);
		var arr = number.split('.');
		if (arr != null && arr.length == 2){
			number = formatFloatValue(arr[0])+'.'+arr[1];
		}else if (arr != null && arr.length == 1){
			number = formatFloatValue(arr[0]);
		}
		return number;
	},
	applyLiveUpdateImage:function (obj) {
		$(obj).addClass('liveUpdateImage');
		return false;
	},
	liveUpdateImage:function (object,mediaType,mediaItemId){
		$('#mediaItemId').val(mediaItemId);
		if(mediaType == 0){
			$('#player').html('').hide();
			$('#imageBox').show();			
			var orgSrc = object.attr('data');
			var source = imgServerPath +orgSrc;
			$('#imageBox').html('<img width="776" height="551" alt="" src="'+source+'" />');
			$('#imageBox').append('<a class="Sprite1 HideText DeleteLinkStyle" onclick="return ProductCatalog.deleteMediaItem();" href="javascript:void(0)">Xóa</a>');
		}else{
			$('#player').show();
			$('#imageBox').hide();
			var orgSrc = object.attr('data');
			var source = imgServerPath +orgSrc;
			if(orgSrc.substring(orgSrc.length - 3,orgSrc.length) == 'avi'){
				$('#player').html('<a class="media {width:780, height:551}" href="'+source+'"></a>');
				$('a.media').media();
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
						replayLabel: 'Xem lại'
					}
				});			
			}
		}
	},
	updateImageStatus:function (obj, timestamp){
		if(obj != null){
			obj.removeClass('liveUpdateImage');
			var orgSrc = obj.attr('data');
			if(orgSrc.indexOf("?") > -1){
				orgSrc =orgSrc.substring(0,orgSrc.indexOf("?"));
			}			
			$('#imageBox').attr('src',imgServerPath +orgSrc + '?' + timestamp);
		}
	},
	getMessageOfInvalidFormatDateEx: function(objectId, objectName,type){
		if($('#' + objectId).val().trim().length > 0 && !Utils.isDateEx($('#' + objectId).val().trim(), '/',type)){
			$('#' + objectId).focus();	
			if(type == null || type == undefined){
				type = Utils._DATE_DD_MM_YYYY;
			}
		    switch (type) {
				case Utils._DATE_DD_MM_YYYY:
					return format(msgErr_invalid_format_date,objectName);
					break;
				case Utils._DATE_MM_YYYY:
					return format(msgErr_invalid_format_month,objectName);
					break;
				default:
					break;
			}
		}
		return '';
	},
	isDateEx:function(txtDate, separator, type) {
	    var aoDate,           // needed for creating array and object
	        ms,               // date in milliseconds
	        isDate,			  // checkDate
	        month, day, year; // (integer) month, day and year
	    	
	    // if separator is not defined then set '/'
	    if (separator == undefined) {
	        separator = '/';
	    }
	    // split input date to month, day and year
	    aoDate = txtDate.split(separator);
	    // array length should be exactly 3 (no more no less)
	   
	    if(type == null || type == undefined){
			type = Utils._DATE_DD_MM_YYYY;
		}
	    switch (type) {
			case Utils._DATE_DD_MM_YYYY:
				if (aoDate.length !== 3) {
					return false;
				}
				 // define month, day and year from array (expected format is
					// m/d/yyyy)
			    // subtraction will cast variables to integer implicitly
			    day = aoDate[0] - 0; // because months in JS start from 0
			    month = aoDate[1] - 1;
			    year = aoDate[2] - 0;
				break;
			case Utils._DATE_MM_YYYY:
				if (aoDate.length !== 2) {
					return false;
				}
				day = 1;
			    month = aoDate[0]-1;
			    year = aoDate[1]-0;
				break;
			default:
				break;
		}
	   
	    // test year range
	    if (year < 1000 || year > 3000) {
	        return false;
	    }
	    // convert input date to milliseconds
	    ms = (new Date(year, month, day)).getTime();
	    // initialize Date() object from milliseconds (reuse aoDate variable)
	    aoDate = new Date();
	    aoDate.setTime(ms);
	    // compare input date and parts from Date() object
	    // if difference exists then input date is not valid
	    if (aoDate.getFullYear() !== year ||
	        aoDate.getMonth() !== month ||
	        aoDate.getDate() !== day) {
	        return false;
	    }
	    // date is OK, return true
	    return true;
	},
	/**
	 * @author anhhpt
	 * @date 06/08/2014
	 * @description : sort order 'asc' by key 
	 */
	sortMap:function(myObj){
		var resul = new Map();
		var keys = [];
	    var i, length = myObj.keyArray.length;	
		for(i = 0 ; i < length ;i++){
			keys.push(myObj.keyArray[i]);
		}
		keys.sort();
		for (i = 0; i < length; i++)
		{
		    key = keys[i];
		    resul.put(key,myObj.get(key));
		}
		return resul;  
	},
	/**
	 * @author anhhpt
	 * @date 06/08/2014
	 * @description : Client Side Pagination
	 * @exemple :  $('#dg').datagrid({loadFilter:Utils.pagerFilter});
	 */	
	pagerFilter:function(data){
			if (typeof data.length == 'number' && typeof data.splice == 'function') { // is array
				data = {
					total : data.length,
					rows : data
				};
			}
			var dg = $(this);
			var opts = dg.datagrid('options');
			var pager = dg.datagrid('getPager');
			pager.pagination({
				onSelectPage : function(pageNum, pageSize) {
					opts.pageNumber = pageNum;
					opts.pageSize = pageSize;
					pager.pagination('refresh', {
						pageNumber : pageNum,
						pageSize : pageSize
					});
					dg.datagrid('loadData', data);
				}
			});
			if (!data.originalRows) {
				data.originalRows = (data.rows);
			}
			var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
			var end = start + parseInt(opts.pageSize);
			data.rows = (data.originalRows.slice(start, end));
			return data;
	},
	/**
	 * @author anhhpt
	 * @date 06/08/2014
	 * @description : import file excel 
	 */	
	uploadExcel:function(callback,params,formId,tit,fileObject,prefix,errMsgId,pFakefilepc){
		var frm = 'importFrm';
		if(formId!=null && formId!=undefined){
			from = formId;
		}				
		var title = msgCommon4;
		if(tit!=null && tit!=undefined){
			title = tit;
		}
		var file = 'excelFile';
		var fakefilepc = 'fakefilepc'; 
		if(pFakefilepc!=null && pFakefilepc!=undefined){
			fakefilepc = pFakefilepc;
		}
		if(fileObject!=null && fileObject!=undefined){
			file = fileObject;
		}			
		if(!previewImportExcelFile(document.getElementById(file))){
			return false;
		}
		var objectErrorSelector = '#errExcelMsg';
		if(prefix!=null && prefix!=undefined && errMsgId!=null && errMsgId!=undefined){
			objectErrorSelector = prefix + " " + errMsgId;
		
		}else if(prefix!=null && prefix!=undefined && (errMsgId==null || errMsgId==undefined)){
			objectErrorSelector = prefix + " #errExcelMsg";
			
		}else if((prefix==null || prefix==undefined) && (errMsgId!=null && errMsgId!=undefined)){
			objectErrorSelector =  errMsgId;
		}		
		var options = {
				beforeSubmit : function(){					
					$('.ErrorMsgStyle').html('').hide();
					$('#divOverlay_New').show();
					return true;
				},				
				success : function(responseText, statusText, xhr, $form){
					$('#divOverlay_New').hide();
					if (statusText == 'success') {	
						$("#responseDiv").html(responseText);
						if($('#tokenValue').html().trim() !=null && $('#tokenValue').html().trim() !=undefined){
							$('#token').val($('#tokenValue').html().trim());
						}
						if($('#errorExcel').html().trim() == 'true' || $('#errorExcelMsg').html().trim().length > 0){
							$(objectErrorSelector).html($('#errorExcelMsg').html()).show();					
						} else {
							var obj = new Object();
			    			obj.totalRow = Number($('#totalRow').html().trim());
			    			obj.numFail = Number($('#numFail').html().trim());
			    			var fileNameFail = $('#fileNameFail').html();
			    			var message =format(msgErr_result_import_excel,(obj.totalRow - obj.numFail),obj.numFail);		    		
			    			if(obj.numFail > 0){
//			    				message+= ' <a href="'+ fileNameFail +'">'+msgCommon5+'</a>';
			    				message+= ' <a href="'+WEB_CONTEXT_PATH+'/commons/downloadFile?file='+ fileNameFail +'">'+msgCommon5+'</a>';
			    			}
			    			if(obj.totalRow==0 && obj.numFail==0){
			    				message=msgErr_result_import_excel_data_error;
			    			}
			    			if($('#'+file).length!=0 && $('#'+fakefilepc).length!=0){
			    				try{
			    					$('#'+file).val('');
			    					$('#'+fakefilepc).val('');
			    				}catch(err){
			    					
			    				}
			    			}			    
			    			$(objectErrorSelector).html(message).show();
			    			if(callback!= null && callback!= undefined){
								callback.call(this,obj);
							}
				    	}
					}
				},
				done : function(responseText, statusText, xhr, $form){
					$('#divOverlay_New').hide();
				},
				type : "POST",
				dataType : 'html',
				data : params
		};
		$('#'+frm).ajaxForm(options);
		$.messager.confirm(msgXacNhan, title, function(r){
			if (r){
				$('#'+frm).submit();
			}
		});
	},
	/**
	 * @author anhhpt
	 * @date 06/08/2014
	 * @description : export file excel 
	 */	
	exportExcel : function(dataModel,url,errMsg,msg){
		if(errMsg == null || errMsg == undefined){
			errMsg = 'errExcelMsg';
		}
		var kData = $.param(dataModel,true);
		if(ReportsUtils._xhrReport != null){
			ReportsUtils._xhrReport.abort();
			ReportsUtils._xhrReport = null;
		}
		ReportsUtils._xhrReport = $.ajax({
			type : "POST",
			url : url,
			data: (kData),
			dataType: "json",
//			headers: {
//		        "Content-type":"application/x-www-form-urlencoded;charset=utf-8"
//		    },
			success : function(data) {
				hideLoadingIcon();
				if(data.error && data.errMsg!= undefined){
					$('#'+ errMsg).html(msg + escapeSpecialChar(data.errMsg)).show();
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						$('#'+ errMsg).html(msg).show();
					} else{
//						window.location.href = data.view;
						//Begin anhdt10 - fix attt - dua ra acoutn dowload
						window.location.href =WEB_CONTEXT_PATH + "/commons/downloadFile?file="+data.view;
						//End anhdt10
						setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
	                        CommonSearch.deleteFileExcelExport(data.view);
						},500000);
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorDivThrown) {
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH +'/check-session',
					dataType : "json",
					success : function(data) {
						ReportsUtils._xhrReport = null;
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href =WEB_CONTEXT_PATH +'/home';
					}
				});
			}
		});
		return false;
	},
	/**
	 * @author anhhpt
	 * @date 06/08/2014
	 * @description : compare 2 house with format hh:mm
	 * @return :  
	 * 			-1 : fromHouse < toHouse
	 * 			 0 : fromHouse = toHouse
	 * 			 1 : fromHouse > toHouse
	 */	
	compareHouse:function(fromHouse,toHouse){
		
		if(isNullOrEmpty(fromHouse) && isNullOrEmpty(toHouse)){
			return 0;
		}else if (isNullOrEmpty(fromHouse) && !isNullOrEmpty(toHouse)){
			return -1;
		}else if(!isNullOrEmpty(fromHouse) && isNullOrEmpty(toHouse)){
			return 1;
		}
		
		
		var from_house = Number(fromHouse.trim().split(":")[0]);
		var to_house = Number(toHouse.trim().split(":")[0]);
		
		if(from_house > to_house){
			return 1;
		}else if(from_house < to_house){
			return -1;
		}else if(from_house == to_house){
			var from_minute = Number(fromHouse.trim().split(":")[1]);
			var to_minute = Number(toHouse.trim().split(":")[1]);
			
			if(from_minute > to_minute){
				return 1;
			}else if(from_minute < to_minute){
				return -1;
			}else if(from_minute == to_minute){
				return 0;
			}
		}
		
		return 0;
	},
	/**
	 * @author anhhpt
	 * @date 06/08/2014
	 * @return : khong cho nhap ki tu co dau va <,>,',/,\
	 */
	textOnly:function(e, id) {
		var key;
		var keychar;
		if (window.event) {
		   key = window.event.keyCode;
		}else if (e) {
		   key = e.which;
		}else {
		   return true;
		}
		keychar = String.fromCharCode(key);

		if ((key==null) || (key==0) || (key==8) ||  (key==9) || (key==13) || (key==27) ) {
			   return true;
		}else if (/<|>|\\|\'|\"+$/.test(keychar) || !/^[@|!|#|$|%|^|&|*|(|)|0-9a-zA-Z_]+$/.test(keychar)) {
			return false;
		}
		return true;
	}
	,
	/**
	 * @author anhhpt
	 * @date 06/08/2014
	 * @return : tra ve dang 1,645/2,000
	 */
	formatQuantityWithCurrency:function(amount,convfact){		
		if(isNullOrEmpty(amount)||amount==undefined){
			return "";
		}
		
		var quantity = StockValidateInput.formatStockQuantity(amount, convfact);		
		var quantityRetail = formatCurrency(quantity.split("/")[1]);
		var quantityPackage = formatCurrency(quantity.split("/")[0]);
		
		
		if(isNullOrEmpty(quantityPackage)){
			quantityPackage = "0";
		}
		
		if(isNullOrEmpty(quantityRetail)){
			quantityRetail = "0";
		}
		var result = quantityPackage + "/" + quantityRetail;		
		return result;
	},
	/**
	 * @author anhhpt
	 * @date 06/08/2014
	 * @params : 
	 * 	input : 1,645/2,000
	 * @return : 99999
	 */
	getQuantityWithCurrency:function(amount,convfact){
		
		if(isNullOrEmpty(amount)){
			return 0;
		}
		
		var quantityRetail = 0; //so luong le 
		var quantityPackage = 0; //so luong thung
		
		if(amount.toString().indexOf("/") >=0){
			quantityRetail = Utils.returnMoneyValue(amount.split("/")[1]);
			quantityPackage = Utils.returnMoneyValue(amount.split("/")[0]);	
		}else {
			quantityRetail = amount;
		}
		
			
		var result = quantityPackage + "/" + quantityRetail;			
		return StockValidateInput.getQuantity(result, convfact);
	},
	/**
	 * @author anhhpt
	 * @date 06/08/2014
	 * @params :  value: 1645, numDecimal:3
	 * @return : 1645.000
	 * @description : numDecimal co the dung numFloat la bien toan cuc lay theo cau hinh cua cty trong db roi 
	 */
	formatValueWithDecimal: function(value, numDecimal){
		value = Utils.XSSEncode(value);
		if (value != null && parseFloat(value) > 0){
			value = parseFloat(value).toFixed(numDecimal);
		}
		return value;
	},
	/**
	 * Tra ve text va hyperlink tu 1 chuoi
	 * @author trungtm6
	 * @date 24/03/2015
	 */
	getTextAndHyperLink: function(text){
		var textContent = "";
		if (!Utils.isEmpty(text)){
			var temp = text.trim();
			var temp1 = "";
			var linkInd = temp.indexOf("http");
			if (linkInd >= 0){
				temp1 = temp.substring(linkInd, temp.length).trim();
				var endLinkInd = temp1.indexOf("\n");
				if (endLinkInd < 0){
					endLinkInd = temp1.indexOf(" ");
				} 
				if (endLinkInd < 0){
					endLinkInd = temp1.length;
				}
				textContent = Utils.XSSEncode(temp.substring(0, linkInd)) + "<a href='" + temp1.substring(0, endLinkInd) + "'>" + temp1.substring(0, endLinkInd) + "</a>" + Utils.XSSDeEncode(temp1.substring(endLinkInd, temp1.length));
			} else {
				textContent = temp;
			}
		}
		return textContent;
	},
	/**
	 * Resize cho table khi dong mo menu bar
	 * @author quocpc
	 * @date 10/10/2018
	 */
	resizeTableForMenuBar: function(idParent, bonusWidth, minusWidth, callback){
		$('body').on('collapsed.pushMenu', function() {
			var parentWidth = $('#'+idParent).width();
			var widthResize = parentWidth + bonusWidth - 4;
			$('#'+ idParent + ' .datagrid-view:not(:hidden)').width(widthResize);	
			$('#'+ idParent + ' .datagrid-view2:not(:hidden)').width(widthResize);	
			$('#'+ idParent + ' .datagrid-header:not(:hidden)').width(widthResize);	
			$('#'+ idParent + ' .datagrid-body:not(:hidden)').width(widthResize);	
			$('#'+ idParent + ' .datagrid-footer:not(:hidden)').width(widthResize);
			$('#'+ idParent + ' .panel-body-noheader:not(:hidden)').width(widthResize + 2);
			$('#'+ idParent + ' .datagrid-btable:not(:hidden)').width(widthResize);
			$('#'+ idParent + ' .datagrid-htable:not(:hidden)').width(widthResize);
			$('#'+ idParent + ' .datagrid-ftable:not(:hidden)').width(widthResize);
			if (callback!= undefined && callback != null) {
				callback();
			}
			} );
		$('body').on('expanded.pushMenu', function() {
			var parentWidth = $('#'+idParent).width();
			var widthResize = parentWidth - minusWidth - 4;
			$('#'+ idParent + ' .datagrid-view:not(:hidden)').width(widthResize);	
			$('#'+ idParent + ' .datagrid-view2:not(:hidden)').width(widthResize);	
			$('#'+ idParent + ' .datagrid-header:not(:hidden)').width(widthResize);	
			$('#'+ idParent + ' .datagrid-body:not(:hidden)').width(widthResize);	
			$('#'+ idParent + ' .datagrid-footer:not(:hidden)').width(widthResize);
			$('#'+ idParent + ' .panel-body-noheader:not(:hidden)').width(widthResize + 2);
			$('#'+ idParent + ' .datagrid-btable:not(:hidden)').width(widthResize);
			$('#'+ idParent + ' .datagrid-htable:not(:hidden)').width(widthResize);
			$('#'+ idParent + ' .datagrid-ftable:not(:hidden)').width(widthResize);
			if (callback!= undefined && callback != null) {
				callback();
			}
			 
		});
			 
	},
	countLines: function(textLabel){
		var divHeight = textLabel.height();
  	  var lineHeight = parseInt(textLabel.css('line-height'), 10);
  	  var lines = divHeight / lineHeight;
  	  return lines;
	},
	changePaddingLabel: function(textLabel){
		$('.form-label').each(function(){
    		if (Utils.countLines($(this)) > 1) {
    			 $(this).addClass('noPaddingTop');
    			 $(this).css('cssText', 'padding-top: 0px !important');
    		}
    		else {
    			$(this).removeClass('noPaddingTop');
    			$(this).css('cssText', 'padding-top: 8px !important');
    		}
    	});
	}, 

	// Add new xoa dau tieng viet
		delete_CoDau: function(str){
			
			str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
			str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
			str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
			str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
			str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
			str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
			str = str.replace(/đ/g, "d");
			str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
			str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
			str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
			str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
			str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
			str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
			str = str.replace(/Đ/g, "D");
			
			return str;
		},
		// End
		
		//Add new xoa dau tieng viet
		searchLike_Map: function(data, keySearch){
			data = Utils.delete_CoDau(data);
			keySearch = Utils.delete_CoDau(keySearch);
			var re = new RegExp(keySearch, 'gi');
			if(data.match(re)){
				return true;
			} else {
				return false;
			}
		},
		// End
		genBreadCumb: function(...arrBrCb) {
			// Clean children of container div
		    $('#breadCumb').empty();
		    // Add element "Home"
		    var contentHTML = '<ul class="page-breadcrumb">' +
		        '<li><i class="fa fa-home"></i> <a href="#">Home</a> </li>';
		    // Add custom element
		    arrBrCb.forEach(function(brCb) {
		        // brCb[1] is URL, brCb[0] is text
		        var element = '<li><i class="fa fa-angle-right"></i><a href="' + brCb[1] + '">' + brCb[0] + '</a></li>';
		        contentHTML = contentHTML.concat(element);
		    });
		    contentHTML.concat('</ul>');

		    $('#breadCumb').append(contentHTML);
		},
};
function encodeChar(tst){
	var result = "";
	if(tst!=null && tst!= undefined){
		tst=tst.toString();
		var char="!@#$%^&*()_+-:;<>?|\'\"\/";
		for(var i=0;i<tst.length;i++){
			if(char.indexOf(tst[i])!=-1){
				if(escape(tst[i])==tst[i]){
					result += encodeURIComponent(tst[i]);			
				}else{
					result += escape(tst[i]);
				}
			}else{
				result += encodeURI(tst[i]);
			}
		}
	}
	return result;
}
function escapex(value){
	value=value+'';
	var reGT = />/gi;
	var reLT = /</gi;
	var reQUOT = /"/gi;
	var reAMP = /&/gi;
	var reAPOS = /'/gi;
	var strXML = value.replace(reAMP,"&amp;").replace(reQUOT,"&quot;").replace(reLT,"&lt;").replace(reGT, "&gt;").replace(reAPOS,"&apos;");
	return strXML;
} 
function Alert(title,msg,callback){
	$.messager.alert(title,msg,null,function(){
		if (callback!= undefined && callback != null) {
			callback.call(this, true);
		}
	});
	return false;
}

function isNullOrEmpty(value){
	if(value == undefined || value == null || value == 'null' || value == '' || value.toString().trim().length == 0){
		return true;
	}
	return false;
}
function setSelectBoxValue(objectId,defaultValue,prefix){
	var value = -2;
	var prefixTmp ='';
	if(defaultValue!= undefined && defaultValue!= null){
		value = defaultValue;
	}
	if(prefix != undefined && prefix!= null && prefix != ''){
		prefixTmp = prefix;
	}
	$(prefixTmp +'#' + objectId).val(value);
	$(prefixTmp +'#' + objectId).change();
}
function setTextboxValue(objectId,value,prefix){
	var vl = '';
	var prefixTmp ='';
	if(!isNullOrEmpty(value)){
		vl = value;
	}
	$(prefixTmp +'#' + objectId).val(value);
	$(prefixTmp +'#' + objectId).change();
	$('#' + objectId).val(vl);
}
function setCheckBoxValue(objectId,value){
	if(value==1){
		$('#' + objectId).attr('checked', 'checked');
	}
}
function focusFirstTextbox(){
	var isCheck = false;
	$('.InputTextStyle').each(function(){
	    if(!$(this).is(':hidden') && !$(this).is(':disabled') && !isCheck){
	        isCheck = true;
	        $(this).focus();
	    }
	});
}
var datepickerTriggerTimeout = null;
function applyMonthPicker(selector,prefix) {
	var uPrefix = '';
	if(prefix!=null && prefix!=undefined){
		uPrefix = prefix;
	}
	var date = new Date(sysDateFromServer);
	var cYear = date.getFullYear();
	var options = {
	    selectedYear: cYear,
	    startYear: cYear - 3,
	    finalYear: cYear + 7,
	    openOnFocus: true,
	    monthNames: [msgThang1, msgThang2, msgThang3, msgThang4, msgThang5, msgThang6, msgThang7, msgThang8, msgThang9, msgThang10, msgThang11, msgThang12]
	};
	
	var addHtml = '<a class="CalendarLink" ><img  src="' + WEB_CONTEXT_PATH + '/resources/images/calenda_blue.svg" width="15" height="16" /></a>';
	$(uPrefix + '#'+selector).after(addHtml);
	$(uPrefix + '#'+selector).monthpicker(options);
//	$(uPrefix + '#'+selector).monthpicker().bind('monthpicker-change-year', function (e, year) {
//	});
	$(uPrefix + '#'+selector).next().bind('click', function () {
		$(uPrefix + '#'+selector).monthpicker('show');
	});
}
function applyDateTimePicker(selector, dateFormat, hideYear, memuMonthShow, menuYearShow,yearRangeFlag, 
			showFocus, timeShow, yearRangeFuture,monthYearShow,onlyMonthCurrent,onSelected) {
	var format = "dd/mm/yy";
	if (dateFormat != null) {
		format = dateFormat;		
	}
	if(monthYearShow != null){
		MaskManager.maskMonth(selector);
	}else{
		MaskManager.maskDate(selector);
	}
	var menuMonth = false;
	if (memuMonthShow != null) {
		menuMonth = memuMonthShow;
	}
	var menuYear = false;
	if (menuYearShow != null) {
		menuYear = menuYearShow;
	}
	var minDate = null;
	var maxDate = null;
	if (hideYear != null && hideYear == true) {
		minDate = new Date(2012, 0, 1);
		maxDate = new Date(2012, 11, 31);
	}	
	var yearRange = null;
	if (yearRangeFlag != null && yearRangeFlag != undefined) {
		var now = new Date(sysDateFromServer);
		var t = now.getFullYear();
		var f = t -100;
		if(yearRangeFuture != null && yearRangeFuture != undefined){
			t = t + 100;
			yearRange = f+":"+t;
		}else{
			yearRange = f+":"+t;
		}
		
		
	}
	var showOn = 'button';
	if (showFocus != null && showFocus == true) {
		showOn = 'focus';
	}
	if (!timeShow)
	{
		$(selector).datepicker(
			{
				monthNames: [msgThang1, msgThang2, msgThang3, msgThang4, msgThang5, msgThang6, msgThang7, msgThang8, msgThang9, msgThang10, msgThang11, msgThang12],
				monthNamesShort: [msgThang1, msgThang2, msgThang3, msgThang4, msgThang5, msgThang6, msgThang7, msgThang8, msgThang9, msgThang10, msgThang11, msgThang12],
				dayNamesMin: [msgCN, msgThu2, msgThu3, msgThu4, msgThu5, msgThu6, msgThu7],
				showOn: showOn,
				dateFormat: format,
				buttonImage: WEB_CONTEXT_PATH + '/resources/images/calenda_blue.svg',
				buttonImageOnly: true,
				changeMonth: menuMonth,
				changeYear: menuYear,
				minDate: minDate,
				maxDate: maxDate,
				buttonText: '',
				useThisTheme: 'start',
				yearRange: yearRange,
				create: function(event, ui) {
				},
				onClose: function(dateText, inst) {
				},
				beforeShow: function(input, inst) {
					setTimeout(function() {
						$('.ui-datepicker-month').css('width', '60%');						
						$('#ui-datepicker-div').css('z-index', 1000000);
					}, 1);
					if ((hideYear != null && hideYear == true)||(onlyMonthCurrent != null && onlyMonthCurrent == true)) {
						setTimeout(function() {
							$('.ui-datepicker-next').hide();
							$('.ui-datepicker-prev').hide();
							$('.ui-datepicker-year').hide();
						}, 1);
					}
				},
				onChangeMonthYear: function(year, month, inst) {
					setTimeout(function() {
						$('.ui-datepicker-month').css('width', '60%');						
					}, 1);
					if ((hideYear != null && hideYear == true)||(onlyMonthCurrent != null && onlyMonthCurrent == true)) {
						setTimeout(function() {
							$('.ui-datepicker-next').hide();
							$('.ui-datepicker-prev').hide();
							$('.ui-datepicker-year').hide();
						}, 1);
					}
				}
			}
		);		
	}
}

function applyClockTimePicker(selector){
	$(selector).clockpicker({
	    placement: 'bottom',
	    align: 'left',
	    donetext: lbDoneTimePicker
	});
}

function showMonthAndYear(selector){
	$(selector).datepicker({
		dateFormat: 'mm/yy',
	    changeMonth: true,
	    changeYear: true,
	    showButtonPanel: true,
		monthNames: [msgThang1, msgThang2, msgThang3, msgThang4, msgThang5, msgThang6, msgThang7, msgThang8, msgThang9, msgThang10, msgThang11, msgThang12],
		monthNamesShort: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
		showOn: 'focus',
		buttonImage: WEB_CONTEXT_PATH + '/resources/images/icon-calendar.png',
		buttonImageOnly: true,
		buttonText: '',
		useThisTheme: 'start',
		create: function(event, ui) {
		},
		onClose: function(dateText, inst) {
	        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
	        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
	        $(this).val($.datepicker.formatDate('mm/yy', new Date(year, month, 1)));
	    }
	});
}
function setDateTimePicker(id, prefix, onlyMonthCurrent){
	// $('#' +id).attr('readonly','readonly');
	var prefixTmp ='';
	if(prefix != undefined && prefix!= null && prefix != ''){
		prefixTmp = prefix;
	}
	if(onlyMonthCurrent) {
		applyDateTimePicker(prefixTmp+'#' + id, null, null, null, null, null, null, null, null,null,true);
	} else{
		applyDateTimePicker(prefixTmp+'#' + id);
	}
	$(prefixTmp+'#' + id).keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == keyCodes.BACK_SPACE || keycode == keyCodes.DELETE) {
			$(this).val('');
			$(this).focus();
		}
	});
}
function removeDateTimePicker(id, prefix){
	// $('#' +id).attr('readonly','readonly');
	var prefixTmp ='';
	if(prefix != undefined && prefix!= null && prefix != ''){
		prefixTmp = prefix;
	}
	$(prefixTmp+'#' + id).datepicker( "destroy" );
	$(prefixTmp+'#' + id).removeClass("hasDatepicker");
}
function disableDateTimePicker(id, prefix){
	var prefixTmp ='';
	if(prefix != undefined && prefix!= null && prefix != ''){
		prefixTmp = prefix;
	}
	$(prefixTmp+'#' + id).datepicker( "disable");
}
function setAndDisableDateTimePicker(id,prefix){
	var prefixTmp ='';
	if(prefix != undefined && prefix!= null && prefix != ''){
		prefixTmp = prefix;
	}
	$(prefixTmp+'#' + id).attr('disabled',true);
	setDateTimePicker(id,prefix);
	disableDateTimePicker(id,prefix);
}
function enableDateTimePicker(id, prefix){
	var prefixTmp ='';
	if(prefix != undefined && prefix!= null && prefix != ''){
		prefixTmp = prefix;
	}
	$(prefixTmp+'#' + id).datepicker( "enable");
}
function updateRownumWidthForJqGridEX1(parentId,colReduceWidth,arraySize,dialog){
	var pId = '';
	if(parentId!= null && parentId!= undefined){
		pId = parentId + ' ';
	}
	var lastValue=$(pId + '.datagrid-cell-rownumber').last().text().trim().length;
	var widthSTT = $('.datagrid-cell-rownumber').width();
	var s = $('.datagrid-header-row td[field='+colReduceWidth+'] div').width();
	if(dialog != null && dialog != undefined){
		widthSTT = $('.easyui-dialog .datagrid-cell-rownumber').width();
		s = $('.easyui-dialog .datagrid-header-row td[field='+colReduceWidth+'] div').width();
	}
	if(arraySize != null && arraySize != undefined){ 
		s = arraySize[0];
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
		if(parentId!= null && parentId!= undefined){
			$(parentId + ' .datagrid-row').each(function(){
				$(parentId + ' .datagrid-header-row td[field='+colReduceWidth+'] div').width(s);
				$(parentId + ' .datagrid-row td[field='+colReduceWidth+'] div').width(s);
			});
		}else{
			$('.datagrid-row').each(function(){
				$('.datagrid-header-row td[field='+colReduceWidth+'] div').width(s-1);
				$('.datagrid-row td[field='+colReduceWidth+'] div').width(s-1);
			});
		}
	}
}
function updateRownumWidthForDataGrid(parentId){	
	var pId = '';
	if(parentId!= null && parentId!= undefined){
		pId = parentId + ' ';
	}
	var lastValue=$(pId + '.datagrid-cell-rownumber').last().text().trim().length;
	if(lastValue > 0){
		var extWidth = 25;
		if(lastValue > 2){
			extWidth += (lastValue - 2) * 9;
		}  
		$(pId + '.datagrid-cell-rownumber').css('width',extWidth);
		$(pId + '.datagrid-header-rownumber').css('width',extWidth);
	}
}

function updateRowNumWidthForDG(parentId, gridId){	
	var pId = '';
	if(parentId!= null && parentId!= undefined){
		pId = parentId + ' ';
	}
	var lastValue=$(pId + '.datagrid-cell-rownumber').last().text().trim().length;
	if(lastValue > 0){
		var extWidth = 25;
		if(lastValue > 2){
			extWidth += (lastValue - 2) * 9;
		}  
		$(pId + '.datagrid-cell-rownumber').css('width',extWidth);
		$(pId + '.datagrid-header-rownumber').css('width',extWidth);
		$(gridId).datagrid('resize');
	}
}

function checkNum(data) { 
	var valid = "0123456789.";
	var checktemp;
	for (var i=0; i<data.length; i++) {
		checktemp = "" + data.substring(i, i+1);
		if (valid.indexOf(checktemp) == "-1") return 0; 
	}
	return 1;
}
function showShopChoose(val){
	var html = $("#popupChooseShopDiv").html();
	if(val != 1){
		$("#closeChoiceGroup").hide();
	}
	$('#popupChooseShop').dialog({  
        title: '<i class="fa fa-fw fa-sign-in"></i>' + Until_selectUnitLogin,  
        closed: false,  
        cache: false,  
        modal: true,
        width : 616,
        closable:false,
        height :'auto',
        onClose: function() {
        	$('#popupChooseShop').dialog('destroy');
        	$("#popupChooseShopDiv").html(html);
        	if (val != undefined && val != null) {
        		$('#popupChooseShop #paramHd').val(val);
        	}
        }});
}
function formatCurrency(num, isInteger) {
		if(num == undefined || num == null) {
			return '';
		}
		num = num.toString();
		var sub = '-';
		var isLessZero = false;
//		if (num.contains('-')){
		if (num.indexOf('-') != -1){
			isLessZero = true;
			num = num.substring(1, num.length);
		}
		num = Utils.returnMoneyValue(num);
		num = num.toString().split('.');
		var ints = num[0].split('').reverse();
		for (var out=[],len=ints.length,i=0; i < len; i++) {
			if (i > 0 && (i % 3) === 0){
				out.push(',');	
			}
			out.push(ints[i]);
		}
	  out = out.reverse() && out.join('');
	  if (num.length === 2) out += '.' + num[1];
	  if(out[0] == '-'){
		  out = out.replace(',','');
	  }
	  if (isLessZero){
		  out = sub + out;
	  }
	  return out;	
}
function formatCurrencyInterger(value) {
	if(value < 0) {
		var valuetmp = Math.abs(value);
		var valuetest = '-'+ formatCurrency(valuetmp);
		return valuetest;
	}
	else {
		return formatCurrency(value);
	}
}
function formatCurrencyNegativeToInteger(value) {
	if(value < 0) {
		var valuetmp = Math.abs(value);
		var valuetest = formatCurrency(valuetmp);
		return valuetest;
	}
	else {
		return formatCurrency(value);
	}
}
function roundNumber(value,ext){
	var tmp=Math.pow(10, Math.round(ext));
	return (Math.round(Number(value)*tmp)/tmp);
}
function formatFloatValue(value,toF, flagRemoveZeroDec){
	if(value == null){
		value = 0;
	}
	var  fixed = toF;
	if(toF==null ||toF.length==0||toF == undefined){
		fixed = numFloat;
	}
	if (flagRemoveZeroDec != null && flagRemoveZeroDec){
		var result = parseFloat(value).toFixed(fixed);
		if (value != null && value > 0){
			result = formatCurrency(Utils.returnMoneyValue(result));
		}else{
			result = formatCurrency(result);
		}
		return result;
	}
	if(value.toString().indexOf('.')==-1){
		return formatCurrency(value);
	}	
	var result = parseFloat(value).toFixed(fixed);
	if(result.toString().indexOf('.')==-1){
		return formatCurrency(result);
	}else{
		var strResult = result.toString().split('.');
		if(strResult[1].length==0){
			return formatCurrency(strResult[0]);
		}
		var last = strResult[1].toString().substring(0,fixed);
		if(parseInt(last,10)==0){
			return formatCurrency(strResult[0]);
		}else{
//			last = last.replace('0','');
			return formatCurrency(strResult[0]) + '.' + last;
		}
		
	}
	
}
function hrefPost(URL, PARAMS) {
	var temp=document.createElement("form");
	temp.action=URL;
	temp.method="POST";
	temp.style.display="none";
	for(var x in PARAMS) {
		var opt=document.createElement("textarea");
		opt.name=x;
		opt.value=PARAMS[x];
		temp.appendChild(opt);
	}
	document.body.appendChild(temp);
	temp.submit();
	return temp;
}
function disabled(objId){
	if($('#' + objId).length!=0){
		$('#' + objId).attr('disabled','disabled');
		$('#' + objId).addClass('BtnGeneralDStyle');
	}
}
function enable(objId){
	if($('#' + objId).length!=0){
		$('#' + objId).removeAttr('disabled');
		$('#' + objId).removeClass('BtnGeneralDStyle');
	}
}
function disabledSelector(selector){
	if($(selector).length!=0){
		$(selector).attr('disabled','disabled');
		$(selector).addClass('BtnGeneralDStyle');
	}
}
function enableSelector(selector){
	if($(selector).length!=0){
		$(selector).removeAttr('disabled');
		$(selector).removeClass('BtnGeneralDStyle');
	}
}
function readonly(objId){
	$('#' + objId).attr('readonly','readonly');
}
String.format = function( text ){
    if ( arguments.length <= 1 ){return text;}
    var tokenCount = arguments.length - 2;
    for( var token = 0; token <= tokenCount; token++ ){
        text = text.replace( new RegExp( "\\{" + token + "\\}", "gi" ), arguments[ token + 1 ] );
    }
    return text;
};
String.prototype.endsWith = function (a) {
    return this.substr(this.length - a.length) === a;
};
String.prototype.startsWith = function (a) {
    return this.substr(0, a.length) === a;
};
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
};
String.prototype.count=function(s1) { 
    return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
};
String.prototype.bool = function() {
    return (/^true$/i).test(this);
};
function format(text){
	// check if there are two arguments in the arguments list
    if ( arguments.length <= 1 ){
        // if there are not 2 or more arguments there's nothing to replace
        // just return the original text
        return text;
    }
    // decrement to move to the second argument in the array
    var tokenCount = arguments.length - 2;
    for( var token = 0; token <= tokenCount; token++ ){
        // iterate through the tokens and replace their placeholders from the
		// original text in order
        text = text.replace( new RegExp( "\\{" + token + "\\}", "gi" ),arguments[ token + 1 ] );
    }
    return text;
};
function resetAllOptions(objId){
	$('#' + objId + ' option').show();
}
function hideOption(selId, optionValue){
	resetAllOptions(selId);
	$('#' + selId + ' option[value='+ optionValue +']').hide();
}

function resizeFancybox(){
	$('.fancybox-inner').css({'height':'auto'});
	$('#fancyData').css({'height':'auto'});
	$.fancybox.update();
}
function getShopCodeByShopCodeAndName(str){
	var value = str.trim().split("-");
	return value[0];
}
function NextAndPrevTextField(e,selector,clazz){	
	var index = $('input.'+clazz).index(selector);	
	var shiftKey = e.shiftKey && e.keyCode == keyCodes.TAB;	
	if((e.keyCode == keyCodes.ARROW_DOWN)){	
		++index;
		var nextSelector = $('input.'+clazz).eq(index);
		if($(nextSelector).hasClass(clazz)){				
			setTimeout(function(){
				$('input.'+clazz).eq(index).focus();
			}, 20);
		}
	}else if(e.keyCode == keyCodes.ARROW_UP || shiftKey){
		--index;
		var nextSelector = $('input.'+clazz).eq(index);
		if($(nextSelector).hasClass(clazz)){	
			setTimeout(function(){
				$('input.'+clazz).eq(index).focus();
			}, 20);
		}			
	}
}
function Map() {
    this.keyArray = new Array(); // Keys
    this.valArray = new Array(); // Values
    this.put = put;
    this.get = get;
    this.size = size;  
    this.clear = clear;
    this.keySet = keySet;
    this.valSet = valSet;
    this.showMe = showMe;   // returns a string with all keys and values in map.
    this.findIt = findIt;
    this.remove = remove;	
    this.findIt4Val = findIt4Val;
	function put(key, val) {
    	var elementIndex = this.findIt(key);
	    if(elementIndex == (-1)) {
	        this.keyArray.push(key);
	        this.valArray.push(val);
	    } else {
	        this.valArray[elementIndex] = val;
	    }
	}
	function get(key) {
	    var result = null;
	    var elementIndex = this.findIt(key);
	    if (elementIndex != (-1)) {
	        result = this.valArray[elementIndex];
	    }
	    return result;
	}	
	function remove(key) {
	    var elementIndex = this.findIt(key);
	    if(elementIndex != (-1)) {
	    	this.keyArray.splice(elementIndex,1);
	    	this.valArray.splice(elementIndex,1);
	    }  
	    return ;
	}
	function size() {
	    return (this.keyArray.length);
	}
	function clear() {
        this.keyArray = new Array();
		this.valArray = new Array();
	}
	function keySet() {
	    return (this.keyArray);
	}
	function valSet() {
	    return (this.valArray);
	}
	function showMe() {
	    var result = "";
	    for( var i = 0; i < this.keyArray.length; i++ ) {
	        result += "Key: " + this.keyArray[ i ] + "\tValues: " + this.valArray[ i ] + "\n";
	    }
	    return result;
	}
	function findIt(key) {
	    var result = (-1);
	    for(var i = 0; i < this.keyArray.length; i++) {
	        if(this.keyArray[ i ] == key) {
	            result = i;
	            break;
	        }
	    }
	    return result;
	}
	function findIt4Val(val){
		var result = (-1);
	    for(var i = 0; i < this.valArray.length; i++) {
	        if(this.valArray[ i ] == val) {
	            result = i;
	            break;
	        }
	    }
	    return result; 
	}
}

function gotoPage(link){
	window.location.href = link;
}

var loadedResources = new Array();
function loadResource(filename, filetype, callback){	
	var fileref = null;	
	if (filetype=="js"){ // if filename is a external JavaScript file
			fileref=document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", filename);
		}
		else if (filetype=="css"){ // if filename is an external CSS file
			fileref=document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
		}
		if (typeof fileref != "undefined"){
			if(callback != undefined){
				if(fileref.readyState){
					fileref.onreadystatechange = function (){
						if (fileref.readyState == 'loaded' || fileref.readyState == 'complete'){
							callback();
						}
					};
				} else {
					fileref.onload = callback;
				}
			}
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
		loadedResources.push(filename);	
}

function disableSelectbox(id){
	disabled(id);
	$('#' + id).change();
	$('#' + id).parent().addClass('BoxDisSelect');
}

function enableSelectbox(id){
	enable(id);
	$('#' + id).change();
	$('#' + id).parent().removeClass('BoxDisSelect');
}

function disableSelectboxWithoutChange(id){
	disabled(id);	
	$('#' + id).parent().addClass('BoxDisSelect');
}

function enableSelectboxWithoutChange(id){
	enable(id);	
	$('#' + id).parent().removeClass('BoxDisSelect');
}

function disableCombo(id){
	if (!StringUtils.isNullOrEmpty(id)){
		if (id.indexOf('#') > -1){
			$(id).combobox('disable');
			$(id).parent().addClass('BoxDisSelect');
		}else {
			$('#' + id).combobox('disable');
			$('#' + id).parent().addClass('BoxDisSelect');
		}
	}
}

function enableCombo(id){
	$('#' + id).combobox('enable');
	$('#' + id).parent().removeClass('BoxDisSelect');
}

function disableComboTree(id){
	$('#' + id).combotree('disable');  
	$('#' + id).parent().addClass('BoxDisSelect');
}

function enableComboTree(id){
	$('#' + id).combotree('enable');  
	$('#' + id).parent().removeClass('BoxDisSelect');
}

function showCodeAndName(code , name) {
	if(isNullOrEmpty(code)&&!isNullOrEmpty(name)) {
		return Utils.XSSEncode(name);
	}
	if(!isNullOrEmpty(code)&&isNullOrEmpty(name)) {
		return Utils.XSSEncode(code);
	}
	if(!isNullOrEmpty(code)&&!isNullOrEmpty(name)) {
		return Utils.XSSEncode(code) +  ' - ' + Utils.XSSEncode(name);
	}
	return '';
}

var characterVI = new Array();
var characterReplace = new Array("A","D","E","I","O","U","Y","a","d","e","i","o","u","y");
characterVI[0]=new Array("À","Á","Ả","Ã","Ạ","Â","Ấ","Ầ","Ẩ","Ẫ","Ậ","Ắ","Ằ","Ă");
characterVI[1]=new Array("Đ");
characterVI[2]=new Array("È","É","Ẻ","Ẽ","Ẹ","Ê","Ề","Ế","Ể","Ễ","Ệ");
characterVI[3]=new Array("Ì","Í","Ỉ","Ĩ","Ị");
characterVI[4]=new Array("Ò","Ó","Ỏ","Õ","Ọ","Ô","Ồ","Ố","Ổ","Ỗ","Ộ","Ơ","Ờ","Ớ","Ở","Ỡ","Ợ");
characterVI[5]=new Array("Ù","Ú","Ủ","Ũ","Ụ","Ư","Ừ","Ứ","Ử","Ữ","Ự");
characterVI[6]=new Array("Ỳ","Ý","Ỷ","Ỹ","Ỵ");
characterVI[7]=new Array("à","á","ả","ã","ạ","â","ấ","ầ","ẩ","ẫ","ậ","ắ","ằ","ă");
characterVI[8]=new Array("đ");
characterVI[9]=new Array("è","é","ẻ","ẽ","ẹ","ê","ề","ế","ể","ễ","ệ");
characterVI[10]=new Array("ì","í","ỉ","ĩ","ị");
characterVI[11]=new Array("ò","ó","ỏ","õ","ọ","ô","ồ","ố","ổ","ỗ","ộ","ơ","ờ","ớ","ở","ỡ","ợ");
characterVI[12]=new Array("ù","ú","ủ","ũ","ụ","ư","ừ","ứ","ử","ữ","ự");
characterVI[13]=new Array("ỳ","ý","ỷ","ỹ","ỵ");

function unicodeToEnglish(str){
	if(str == null){
		return "";
	}
	for (var i=0;i<=characterVI.length-1;i++){
		for (var i1=0;i1<=characterVI[i].length-1;i1++){
			str=str.replace(new RegExp(characterVI[i][i1],'g'),characterReplace[i]);
		}
	}
	return str;
}
function fitFancyboxAndWindow(){
	var tmBanChar=null;
	tmBanChar = setTimeout(function(){
		$('.fancybox-wrap').each(function(){
			if(!$(this).is(':hidden')){
				var fancyTop = ($(window).height() / 2) - ($(this).outerHeight() / 2);
				var fancyLeft = ($(window).width() / 2) - ($(this).outerWidth() / 2);
				if(Number(fancyTop)<0){
					fancyTop = 10;
				}
				$(this).css({ top: fancyTop, left: fancyLeft});
			}
		});
		$('.window').each(function(){
			if(!$(this).is(':hidden')){
				var top = ($(window).height() / 2) - ($(this).outerHeight() / 2);
				var left = ($(window).width() / 2) - ($(this).outerWidth() / 2);
				if(Number(top)<0){
					top = 10;
				}
				$(this).css({ top: top, left: left});
			}
		});	
		clearTimeout(tmBanChar);
	 },100); 
}
function fromKeyCode (n) {
	if( 47<=n && n<=90 ) return unescape('%'+(n).toString(16));
	if( 96<=n && n<=105) return 'NUM '+(n-96);
	if(112<=n && n<=135) return 'F'+(n-111);

	if(n==3)  return 'Cancel'; // DOM_VK_CANCEL
	if(n==6)  return 'Help';   // DOM_VK_HELP
	if(n==8)  return 'Backspace';
	if(n==9)  return 'Tab';
	if(n==12) return 'NUM 5';  // DOM_VK_CLEAR
	if(n==13) return 'Enter';
	if(n==16) return 'Shift';
	if(n==17) return 'Ctrl';
	if(n==18) return 'Alt';
	if(n==19) return 'Pause|Break';
	if(n==20) return 'CapsLock';
	if(n==27) return 'Esc';
	if(n==32) return 'Space';
	if(n==33) return 'PageUp';
	if(n==34) return 'PageDown';
	if(n==35) return 'End';
	if(n==36) return 'Home';
	if(n==37) return 'Left Arrow';
	if(n==38) return 'Up Arrow';
	if(n==39) return 'Right Arrow';
	if(n==40) return 'Down Arrow';
	if(n==42) return '*'; // Opera
	if(n==43) return '+'; // Opera
	if(n==44) return 'PrntScrn';
	if(n==45) return 'Insert';
	if(n==46) return 'Delete';

	if(n==91) return 'WIN Start';
	if(n==92) return 'WIN Start Right';
	if(n==93) return 'WIN Menu';
	if(n==106) return '*';
	if(n==107) return '+';
	if(n==108) return 'Separator'; // DOM_VK_SEPARATOR
	if(n==109) return '-';
	if(n==110) return '.';
	if(n==111) return '/';
	if(n==144) return 'NumLock';
	if(n==145) return 'ScrollLock';

	// Media buttons (Inspiron laptops)
	if(n==173) return 'Media Mute On|Off';
	if(n==174) return 'Media Volume Down';
	if(n==175) return 'Media Volume Up';
	if(n==176) return 'Media >>';
	if(n==177) return 'Media <<';
	if(n==178) return 'Media Stop';
	if(n==179) return 'Media Pause|Resume';

	if(n==182) return 'WIN My Computer';
	if(n==183) return 'WIN Calculator';
	if(n==186) return '; :';
	if(n==187) return '= +';
	if(n==188) return ', <';
	if(n==189) return '- _';
	if(n==190) return '. >';
	if(n==191) return '/ ?';
	if(n==192) return '\` ~';
	if(n==219) return '[ {';
	if(n==220) return '\\ |';
	if(n==221) return '] }';
	if(n==222) return '\' "';
	if(n==224) return 'META|Command';
	if(n==229) return 'WIN IME';

	if(n==255) return 'Device-specific'; 

	return null;
	}
function updateRownumWidthForJqGrid(parentId){	
	var pId = '';
	if(parentId!= null && parentId!= undefined){
		pId = parentId + ' ';
	}
	var lastValue=$(pId + '.datagrid-cell-rownumber').last().text().trim().length;
	if(lastValue > 0){
		var extWidth = 25;
		if(lastValue > 2){
			extWidth += (lastValue - 2) * 9;
		}  
		$(pId + '.datagrid-cell-rownumber').css('width',extWidth);
		$(pId + '.datagrid-header-rownumber').css('width',extWidth);
	}
}
function escapeSpecialChar(content){
	if(content!= ""){
		content += "";
		content = content.replace(/\'/g,"&apos;").replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/>/g,"&amp;");
	}
	return content;
}

function updateRownumWidthForEasyGrid(parentId){	
	var pId = '';
	if(parentId!= null && parentId!= undefined){
		pId = parentId + ' ';
	}
	if($(pId + ' .datagrid-header-rownumber').last()!= null){
		var lastValue = $(pId + ' .datagrid-header-rownumber').last().text().trim();		
		if(lastValue.length > 0){
			var extWidth = 35;
			if(lastValue.length > 2){
				extWidth += (lastValue.length - 2) * 9;
			}  
			$(pId +  ' .datagrid-header-row .datagrid-header-rownumber').first().css('width',extWidth);
			$(pId+' .datagrid-row').each(function(){
				$(pId + ' .datagrid-row .datagrid-td-rownumber').css('width',extWidth);
				$(pId + ' .datagrid-row .datagrid-cell-rownumber').css('width',extWidth);
			});
			
		}
	}
}
function replaceAll(strSource, strTarget,strSubString){
    var strText = strSource;
    var intIndexOfMatch = strText.indexOf( strTarget );
    while (intIndexOfMatch != -1){
        strText = strText.replace( strTarget, strSubString );
        intIndexOfMatch = strText.indexOf( strTarget );
    }
    return strText;
}
function showLoadingIcon(){
	$('#divOverlay').show();
}
function hideLoadingIcon(){
	$('#divOverlay').hide();
}

function getQuantity(amount,convfact){
	return StockValidateInput.getQuantity(amount, convfact);
}
function formatQuantity(amount,convfact){
	return StockValidateInput.formatStockQuantity(amount, convfact);
}
function formatQuantityEx(amount,convfact){		
	var quantity = Number(getQuantity(amount,convfact));
	if(quantity<0){
		quantity = quantity * (-1);
		var str = formatQuantity(quantity,convfact);
		if (str.split('/')[1] == 0){
			return '-' + (str.split('/')[0]) + '/' + (str.split('/')[1]);
		}
		return '-' + (str.split('/')[0]) + '/' + '-' + (str.split('/')[1]);
	}else{
		return formatQuantity(quantity, convfact);
	}
}

function formatQuantityEx_Possitive(amount,convfact){		
	var quantity = Number(getQuantity(amount,convfact));
	if(Number(quantity)<0){
		quantity = quantity * (-1);
		var str = formatQuantity(quantity,convfact);
		if (str.split('/')[1] == 0){
			return  (str.split('/')[0]) + '/' + (str.split('/')[1]);
		}
		return  (str.split('/')[0]) + '/' + (str.split('/')[1]);
	}else{
		return formatQuantity(quantity, convfact);
	}
}

function NextAndPrevTextField(e,selector,clazz){	
	var index = $('input.'+clazz).index(selector);	
	var shiftKey = e.shiftKey && e.keyCode == keyCodes.TAB;	
	//Co the them keyCodes.ENTER vo 
	if((e.keyCode == keyCodes.ARROW_DOWN)){	
		++index;
		var nextSelector = $('input.'+clazz).eq(index);
		if($(nextSelector).hasClass(clazz)){				
			var tm = setTimeout(function(){
				$('input.'+clazz).eq(index).focus();
				clearTimeout(tm);
			}, 20);
		}
	}else if(e.keyCode == keyCodes.ARROW_UP || shiftKey){
		--index;
		var nextSelector = $('input.'+clazz).eq(index);
		if($(nextSelector).hasClass(clazz)){	
			var tm = setTimeout(function(){
				$('input.'+clazz).eq(index).focus();
				clearTimeout(tm);
			}, 20);
		}			
	}
}

function numbersonly(e, id) {
	var key;
	var keychar;
	if (window.event) {
	   key = window.event.keyCode;
	}else if (e) {
	   key = e.which;
	}else {
	   return true;
	}
	keychar = String.fromCharCode(key);

	if ((key==null) || (key==0) || (key==8) ||  (key==9) || (key==13) || (key==27) ) {
	   return true;
	}else if ((("0123456789").indexOf(keychar) > -1)) {
		return true;
	}else{
	   return false;
	}
}

function loadDataForTree(url, treeId) {
	var tId = 'tree';
	if (treeId != null && treeId != undefined) {
		tId = treeId;
	}
	$('#' + tId).jstree({
		"plugins" : [ "themes", "json_data", "ui" ],
		"themes" : {
			"theme" : "classic",
			"icons" : false,
			"dots" : true
		},
		"json_data" : {
			"ajax" : {
				"url" : url,
				"data" : function(n) {
					return {
						id : n.attr ? n.attr("id") : 0
					};
				}
			}
		}
	});
}

function toDateString(d){
	var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+'/'+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+'/'+d.getFullYear();
	return dStr;
}
function showLoading(id){
	var objId = 'loading';
	if(id!= undefined && id!= null && id.length > 0){
		objId = id;
	}
	$('#' + objId).css('visibility','visible');
	return false;
}
function hideLoading(id){
	var objId = 'loading';
	if(id!= undefined && id!= null && id.length > 0){
		objId = id;
	}
	$('#' + objId).css('visibility','hidden');
	return false;
}
function formatDate(d){
	if(d != null || d != undefined){
		d = d.substring(0,10);
		d = d.split('-');
		d = d[2] + '/' + d[1] + '/' + d[0];
	}
	return d;
}
function previewImportExcelFile(fileObj,formId,inputText){
	$('#resultExcelMsg').html('').hide();
	var inputId = 'fakefilepc';
	if(inputText != null || inputText != undefined){
		inputId = inputText;
	}
	if (fileObj.value != '') {
		if (!/(\.xls|\.xlsx)$/i.test(fileObj.value)) {
			$('#errExcelMsg').html(msgErr_excel_file_invalid_type).show();
//			Utils.showMessage(msgErr_excel_file_invalid_type);//LamNH
			fileObj.value = '';
			fileObj.focus();
			document.getElementById(inputId).value ='';			
			return false;
		}else{
			$('#errExcelMsg').html('').hide();
			Utils.hideMessage();//LamNH
			var src = '';
			if ($.browser.msie){
			    var path = encodeURI(what.value);
			    path = path.replace("C:%5Cfakepath%5C","");
			    var path = decodeURI(path);
			    document.getElementById(inputId).value = path;
			}else{
				document.getElementById(inputId).value = fileObj.value;
			}	
		}
	}else{
		$('#errExcelMsg').html(msgCommon12).show();		
//		Utils.showMessage(msgCommon12);//LamNH
		return false;
	}
	return true;
}
function applyDateTimePickerWithCallback(selector, dateFormat, hideYear, memuMonthShow, menuYearShow, yearRangeFlag, showFocus, timeShow, yearRangeFuture,monthYearShow,onlyMonthCurrent, onSelectCallback) {
	var format = "dd/mm/yy";
	if (dateFormat != null) {
		format = dateFormat;		
	}
	if(monthYearShow != null){
		MaskManager.maskMonth(selector);
	}else{
		MaskManager.maskDate(selector);
	}
	var menuMonth = false;
	if (memuMonthShow != null) {
		menuMonth = memuMonthShow;
	}
	var menuYear = false;
	if (menuYearShow != null) {
		menuYear = menuYearShow;
	}
	var minDate = null;
	var maxDate = null;
	if (hideYear != null && hideYear == true) {
		minDate = new Date(2012, 0, 1);
		maxDate = new Date(2012, 11, 31);
	}
	var yearRange = null;
	if (yearRangeFlag != null && yearRangeFlag != undefined) {
		var now = new Date(sysDateFromServer);
		var t = now.getFullYear();
		var f = t -100;
		if(yearRangeFuture != null && yearRangeFuture != undefined){
			t = t + 100;
			yearRange = f+":"+t;
		}else{
			yearRange = f+":"+t;
		}
		
		
	}
	var showOn = 'button';
	if (showFocus != null && showFocus == true) {
		showOn = 'focus';
	}
	if (!timeShow)
	{
		$(selector).datepicker(
			{
				monthNames: [msgThang1, msgThang2, msgThang3, msgThang4, msgThang5, msgThang6, msgThang7, msgThang8, msgThang9, msgThang10, msgThang11, msgThang12],
				monthNamesShort: [msgThang1, msgThang2, msgThang3, msgThang4, msgThang5, msgThang6, msgThang7, msgThang8, msgThang9, msgThang10, msgThang11, msgThang12],
				dayNamesMin: [msgCN, msgThu2, msgThu3, msgThu4, msgThu5, msgThu6, msgThu7],
				showOn: showOn,
				dateFormat: format,
				buttonImage: WEB_CONTEXT_PATH + '/resources/images/calendar_icon.png',
				buttonImageOnly: true,
				changeMonth: menuMonth,
				changeYear: menuYear,
				minDate: minDate,
				maxDate: maxDate,
				buttonText: '',
				useThisTheme: 'start',
				yearRange: yearRange,
				create: function(event, ui) {
				},
				onClose: function(dateText, inst) {
				},
				beforeShow: function(input, inst) {
					setTimeout(function() {
						$('.ui-datepicker-month').css('width', '60%');
						$('#ui-datepicker-div').css('z-index', 1000000);
					}, 1);
					if ((hideYear != null && hideYear == true)||(onlyMonthCurrent != null && onlyMonthCurrent == true)) {
						setTimeout(function() {
							$('.ui-datepicker-next').hide();
							$('.ui-datepicker-prev').hide();
							$('.ui-datepicker-year').hide();
						}, 1);
					}
				},
				onChangeMonthYear: function(year, month, inst) {
					setTimeout(function() {
						$('.ui-datepicker-month').css('width', '60%');
					}, 1);
					if ((hideYear != null && hideYear == true)||(onlyMonthCurrent != null && onlyMonthCurrent == true)) {
						setTimeout(function() {
							$('.ui-datepicker-next').hide();
							$('.ui-datepicker-prev').hide();
							$('.ui-datepicker-year').hide();
						}, 1);
					}
				},
				onSelect: function(data){
					if (onSelectCallback != undefined && onSelectCallback != null){
						onSelectCallback.call(this, data);
					}					
				}
			}
		);
	}
}
function getCurrentDate(){
	var d=new Date(sysDateFromServer);
	var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+'/'+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+'/'+d.getFullYear();
	return dStr;
}
function getLastWeek(){
    var today = new Date(sysDateFromServer);
    var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+'/'+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+'/'+d.getFullYear();
	return dStr;
}
function getQuantity(amount,convfact){
	return StockValidateInput.getQuantity(amount, convfact);
}

/**
 * convert complex object to simple object, key-value only
 * @author tuannd20
 * @param out
 * @param obj
 * @param prefix
 * @date 19/06/2014
 */
function convertToSimpleObject(out, obj, prefix){
    if (obj instanceof Array){
        for (var index=0; index < obj.length; index++){
            var item = obj[index];
            var tmpPrefix = prefix + "[" + index + "]";
            if (item instanceof Array || item instanceof Object){
                arguments.callee(out, item, tmpPrefix);
            } else {
                out[tmpPrefix] = item;
            }
        }
    } else if (obj instanceof Object){
        for(var propName in obj){
			if (propName.toString() !== Utils.VAR_NAME){
				var tmpPrefix = prefix + "." + propName;
				if (!(obj[propName] instanceof Array || obj[propName] instanceof Object)){
					out[tmpPrefix] = obj[propName];
				} else {
					arguments.callee(out, obj[propName], tmpPrefix);
				}
			}
        }
    }
}

/**
 * get prefix to convert data
 * @author tuannd20
 * @param data
 * @returns
 * @date 19/06/2014
 */
function getPrefix(data){
	var prefix = null;
	try{
		data.hasOwnProperty(Utils.VAR_NAME);
	} catch(e){
		throw 'Please check your data or browser support.';
	}
	if (data.hasOwnProperty(Utils.VAR_NAME)){
		try{
			prefix = data[Utils.VAR_NAME];
			delete data[Utils.VAR_NAME];
		} catch(e){
		}
	} else {
		throw 'Missing "_varname_". Please check your data.';
	}
	if (prefix === null || prefix === undefined || prefix.toString().trim().length === 0){
		throw 'Missing "_varname_". Please check your data.';
	}
	return prefix;
}

/**
 * get converted object
 * @author tuannd20
 * @param data
 * @returns {___anonymous63762_63763}
 * @date 19/06/2014
 */
function getSimpleObject(data){
	var prefix = getPrefix(data);
	var out = {};
	convertToSimpleObject(out, data, prefix);
	return out;
}

var DmsVersion = {
		Basic: 1,
		Plus: 2,
		Advance: 3,
		isPlusVersion: function(){
			var value = dmsIntegerVersion;
			if( value != null && value != '' && parseInt(value) == 2){
				return true;
			}
			return false;
		},
		BASIC : 1,
		PLUS : 2,
		ADVANCE : 3,
		parseValue: function(value){
			if(value.trim() == 1){
				return DmsVersion.BASIC;
			} else if(value.trim() == 2){
				return DmsVersion.PLUS;
			} else if(value.trim() == 3){
				return DmsVersion.ADVANCE;
			}
			return -2;
		}
};
var StaffTypeObject = {
	ADMIN: 1,
	GIAM_SAT: 2, 
	NHAN_VIEN: 3,
	NHAN_VIEN_VANSALE: 4,
	KE_TOAN: 5,
	NHAN_VIEN_QUAN_LY: 6,
	KE_TOAN_CONG_TY: 7
};
var StringUtils = {
	getSubStringFromFirst: function(string, numChar){
		string += "";
		if (numChar != null && numChar > 0 && string != null && string.length > numChar){
			string = string.substring(0, numChar) + "...";
		}
		return string;
	},
	isNullOrEmpty: function(string){
		if (string == undefined || string == null){
			return true;
		}
		string += '';
		if (string == '' || string.trim() == ''){
			return true;
		}
		return false;
	}
};
var ChannelTypeType = {
	STAFF: "STAFF"	
};
var AllowEditProPgram = {
	isAdminPer: function(){
		var r = false;
		if($('#adminUser').val() == 'true'){
			r = true;
		}
		return r;
	},
	isSupervisorPer: function(){
		var r = false;
		if ($('#supervisorUser').val() == 'true' && allowSupvrEditProPgram == 'true'){
			r = true;
		}
		return r;
	},
	isManagerPer: function(){
		var r = false;
		if ($('#isManager').val() == 'true' && allowMangrEditProPgram == 'true'){
			r = true;
		}
		return r;
	},
	isEditProPgramPer: function(){
		if (AllowEditProPgram.isAdminPer() || AllowEditProPgram.isManagerPer() || AllowEditProPgram.isSupervisorPer()){
			return true;
		}
		return false;
	}
};


var KeyCodes = {
	BackSpace: 8,
	Tab: 9,
	Enter: 13,
	Shift: 16,
	Ctrl: 17,
	Alt: 18,
	CapsLock: 20,
	Escape: 27,
	LeftArrow: 37,
	UpArrow: 38,
	RightArrow: 39,
	DownArrow: 40,
	Insert: 45,
	Delete: 46
	
};

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.validate-utils.js
 */

var ValidateUtils = {
		binding : function(prefix,isCurrentDate,isCurrentMonth){
			$('label.Require').each(function(){
				$(this).html($(this).html() + '<span class="ReqiureStyle"> * </span>');
			});
			if(prefix==null || prefix==undefined){
				prefix = '';
			}			
			var arrSelector = $(prefix + ' input');
			for(var i = 0; i< arrSelector.length; ++ i){
				var selector = $(arrSelector[i]);
				var objectId = selector.attr('id');
				if(selector.is(':hidden')){
					continue;
				}
				selector.attr('autocomplete','off');				
				if(selector.hasClass('Integer')){
					selector.attr('maxlength',9);selector.css('text-align','right');					
				}
				if(selector.hasClass('BigDecimal') && msg.length > 0){
					selector.attr('maxlength',17);selector.css('text-align','right');
				}
				if(selector.hasClass('Code')){
					selector.attr('maxlength',50);
				}
				if(selector.hasClass('Name')){
					selector.attr('maxlength',250);
				}
				if(selector.hasClass('Address')){
					selector.attr('maxlength',250);
				}
				if(selector.hasClass('Phone')){
					selector.attr('maxlength',11);
				}
				if(selector.hasClass('Date')){
					applyDateTimePicker(prefix +' input#'+objectId);
					if(isCurrentDate){
						selector.val(DateUtils.getCurrentDate());
					}
				}
				if(selector.hasClass('Month')){
					applyMonthPicker(prefix +' input#'+objectId);
					if(isCurrentMonth){
						selector.val(DateUtils.getCurrentMonth());
					}
				}				
			}
			var arrSelector = $(prefix + ' select');
			for(var i = 0; i< arrSelector.length; ++ i){
				var selector = $(arrSelector[i]);
				var objectId = selector.attr('id');
				if(selector.is(':hidden')){
					continue;
				}
				if(selector.hasClass('MySelectBoxClass')){
					selector.customStyle();
				}
			}
		},
		validate : function(errMsgObject,prefix){			
			$('.ErrorMsgStyle').html('').hide();
//			Utils.hideMessage();//LamNH
			/** Validate Input */
			var params = new Object();	
			params.error = false;
			var msg = '';
			var arrSelector = $(prefix + ' input');
			for(var i = 0; i< arrSelector.length; ++ i){
				var selector = $(arrSelector[i]);
				var objectId = selector.attr('id');
				var objectName = selector.attr('name');
				var objectValue = selector.val().trim();
				params[objectId] = objectValue;
				//eval(format('params."{0}" = "{1}";',objectId,objectValue));
				if(selector.is(':hidden') && objectId != "shopName"){
					continue;
				}			
				if(selector.hasClass('Require')){
					msg = ValidateUtils.getMessageOfRequireCheck(objectId, objectName, false,true);
				}	
				if(selector.hasClass('Code') && msg.length == 0){
					msg = ValidateUtils.getMessageOfSpecialCharactersValidate(objectId, objectName, Utils._CODE);
				}
				if(selector.hasClass('Name')&& msg.length == 0){
					msg = ValidateUtils.getMessageOfSpecialCharactersValidate(objectId, objectName, Utils._NAME);
				}
				if(selector.hasClass('Address')&& msg.length == 0){
					msg = ValidateUtils.getMessageOfSpecialCharactersValidate(objectId, objectName, Utils._ADDRESS);
				}
				if(selector.hasClass('Email')&& msg.length == 0){
					msg = ValidateUtils.getMessageOfInvalidEmailFormat(objectId, objectName);
				}
				if(selector.hasClass('Date')&& msg.length == 0){
					msg = ValidateUtils.getMessageOfInvalidFormatDate(objectId, objectName,Utils._DATE_DD_MM_YYYY);
				}
				if(selector.hasClass('Month')&& msg.length == 0){
					msg = ValidateUtils.getMessageOfInvalidFormatDate(objectId, objectName,Utils._DATE_MM_YYYY);
				}
				if (selector.hasClass('NUMBER_WITHOUT_DOT') && msg.length == 0){
					msg = ValidateUtils.getMessageOfInvalidFormatNumberWithoutDot(objectId, objectName);
				}
				if (selector.hasClass('TIME') && msg.length == 0){
					msg = ValidateUtils.getMessageOfInvalidFormatTime(objectId, objectName);
				}
				if(selector.hasClass('STAFF_GROUP_NAME')&& msg.length == 0){
					msg = ValidateUtils.getMessageOfSpecialCharactersValidate(objectId, objectName, Utils._STAFF_GROUP_NAME);
				}
				if(selector.hasClass('FromDate')&& msg.length == 0){
					var isToDate = $(prefix + ' input.ToDate').length == 1;
					/** Validate FromDate , ToDate */
					var valueFromDate = selector.val().trim();
					if(isToDate){
						var valueToDate = $(prefix + ' input.ToDate').val();
						if(valueToDate!=null && valueToDate!='')
						{
							if(DateUtils.compareDate(valueFromDate, valueToDate)>0){
								msg = format('{0} '+jspValidate1+' {1}',objectName,$(prefix + ' input.ToDate').attr('name'));
								selector.focus();
							}
						}else{
							msg = ValidateUtils.getMessageOfRequireCheck(objectId, objectName, false,true);
						}
						
					}else{
						var currentTime = sysDateFromServer;
						var month = currentTime.getMonth() + 1;
						var day = currentTime.getDate();
						var year = currentTime.getFullYear();
						if(DateUtils.compareDate(valueFromDate,day + '/' + month + '/' + year) > 0){
							msg = format('{0} '+jspValidate2,objectName);
							selector.focus();
						}
					}
				}
				//hoatv13: Class CompareDate is a compare 2 date. 
				if(selector.hasClass('CompareDate') && msg.length == 0){
					var valueFromDate = selector.val().trim();
					if(valueFromDate!=null && valueFromDate!=''){
						var currentTime = sysDateFromServer;
						var month = currentTime.getMonth() + 1;
						var day = currentTime.getDate();
						var year = currentTime.getFullYear();
						if(DateUtils.compareDate(valueFromDate,day + '/' + month + '/' + year) > 0){
							msg = format('{0} '+jspValidate2,objectName);
							selector.focus();
						}
					}
				}
				if(msg.length>0){
					$(errMsgObject).html(msg).show();
//					Utils.showMessage(msg);//LamNH
					params.error = true;
					return params;
				}								
			}			
			/** Validate Select */
			var arrSelector = $(prefix + ' select');
			for(var i = 0, size = arrSelector.length; i< size; ++ i){
				var selector = $(arrSelector[i]);
				var objectId = selector.attr('id');
				var objectName = selector.attr('name');
				var objectValue = '';
				if(selector.hasClass('easyui-combobox')){
					objectValue = selector.combobox('getValue');
				
				}else if(!selector.hasClass('multiple')){
					objectValue = selector.val();
				}
				eval(format('params.{0} = "{1}";',objectId,objectValue));
				if(selector.is(':hidden')){
					continue;
				}
				if(selector.hasClass('Require')){
					msg = ValidateUtils.getMessageOfRequireCheck(objectId, objectName, true);
				}
				if(msg.length>0){
					$(errMsgObject).html(msg).show();
//					Utils.showMessage(msg);//LamNH
					params.error = true;
					return params;
				}
			}
			
			
			
			return params;
		},
		getMessageOfRequireCheck: function(objectId, objectName,isSelectBox,checkMaxLengh){
			if($('#' + objectId).val().trim() == '__/__/____'){
				$('#' + objectId).val('');
			}
			if(isSelectBox != undefined && isSelectBox && $('#' + objectId).hasClass('easyui-combobox') && $('#' + objectId).combobox('getValue').trim().length == 0) {
				$('#' + objectId).next().attr('id',objectId+'easyuicomboxId');
				$('#'+objectId+'easyuicomboxId input.combo-text').focus();
				return format(msgErr_required_field,objectName);
			} else if((isSelectBox!= undefined && isSelectBox && parseInt($('#' + objectId).val().trim()) < 0) || ((isSelectBox== undefined || !isSelectBox) && $('#' + objectId).val().trim().length == 0)){
				$('#' + objectId).focus();
				if(!isSelectBox){
					return format(msgErr_required_field,objectName);
				}else{
					return format(msgErr_required_choose_format,objectName);
				}					
			}
			if(checkMaxLengh==undefined || checkMaxLengh==null){
				var maxlength = $('#' + objectId).attr('maxlength');
				if(maxlength!= undefined && maxlength!= null && maxlength.length > 0){
					if($('#' + objectId).val().trim().length > maxlength){
						$('#' + objectId).focus();
						return format(msgErr_invalid_maxlength,objectName,maxlength);
					}
				}
			}		
			return '';
		},	
		getMessageOfSpecialCharactersValidate: function(objectId, objectName,type){
			var value = $('#' + objectId).val().trim();
			if(type == null || type == undefined){
				type = Utils._NAME;
			}
			var errMsg = '';
			if(value.length > 0){
				switch (type) {
				case Utils._CODE:
					if(!/^[0-9a-zA-Z-_.]+$/.test(value)){
						errMsg = format(msgErr_invalid_format_code,objectName);
					}
					break;
				case Utils._NAME:
					if(!/^[^<|>|?|\\|\'|\"|&|~#|$|%|@|*|^|`]+$/.test(value)){
						errMsg = format(msgErr_invalid_format_name,objectName);
					}
					break;
				case Utils._ADDRESS:
					if(!/^[^<|>|?|\\|\'|\"|&|~]+$/.test(value)){
						errMsg = format(msgErr_invalid_format_address,objectName);
					}
					break;
				case Utils._AREA:
					if(!/^[^<|>|?|\\|\'|\"|&|~]+$/.test(value)){
						errMsg = format(msgErr_invalid_format_area,objectName);
					}
					break;
				case Utils._TF_A_Z:	
					if(!/^[A-Za-z]+$/.test(value)){
						errMsg = format(msgErr_invalid_format_az,objectName);
					}
					break;
				case Utils._SAFE:	
					if(!/^[^<|>|\\|\'|\"]+$/.test(value)){
						errMsg = format(msgErr_invalid_format_safe,objectName);
					}
					break;	
				case Utils._STAFF_GROUP_NAME:
					if(!/^[^<|>|\\|\'|\"]+$/.test(value)){
						errMsg = format(msgChuaGiaTri,objectName);
					}
					break;
				default:
					break;
				}
			}	
			if(errMsg.length !=0){
				$('#' + objectId).focus();
			}
			return errMsg;
		},
		getMessageOfInvalidFormatDate: function(objectId, objectName,type){
			if(type == null || type == undefined){
				type = Utils._DATE_DD_MM_YYYY;
			}
			if($('#' + objectId).val().trim().length > 0 && !DateUtils.isDate($('#' + objectId).val().trim(), '/',type)){
				$('#' + objectId).focus();			
			    switch (type) {
					case Utils._DATE_DD_MM_YYYY:
						return format(msgErr_invalid_format_date,objectName);
						break;
					case Utils._DATE_MM_YYYY:
						return format(msgErr_invalid_format_month,objectName);
						break;
					default:
						break;
				}
			}
			return '';
		},
		
		getMessageOfInvalidEmailFormat: function(objectId, objectName){
			if($('#' + objectId).val().trim() != '' && !/^[a-zA-Z0-9._-]{1,64}@[A-Za-z0-9]{2,64}(\.[A-Za-z0-9]{2,64})*(\.[A-Za-z]{2,4})$/.test($('#' + objectId).val().trim())){
				$('#' + objectId).focus();
				return format(msgErr_invalid_format_email,objectName);			
			}
			return '';
		},
		
		getMessageOfInvalidFormatNumberWithoutDot: function(objectId, objectName){
			if ($('#' + objectId).val().trim() != '' && !/^[0-9]+$/.test($('#' + objectId).val().trim())){
				$('#' + objectId).focus();
				return format(msgErr_invalid_format_num,objectName);	
			}
			return '';
		},
		getMessageOfInvalidFormatTime: function(objectId, objectName){
			if ($('#' + objectId).val().trim() != '' && !DateUtils.isTime($('#' + objectId).val().trim())){
				$('#' + objectId).focus();
				return format(msgKhongPhaiKieuGio,objectName);	
			}
			return '';
		}
};

var DateUtils = {
		/**
	     * Compare two date "dd/mm/yyyy"
	     * Input : String
	     * Return : true if start < end
	     * **/
		compareDate: function(startDate, endDate){
			 
			if(startDate.length == 0 || endDate.length == 0){
				return true;			
			}
			var arrStartDate = startDate.split('/');
			var arrEndDate = endDate.split('/');
			var startDateObj = dates.convert(arrStartDate[1] + '/' + arrStartDate[0] + '/' + arrStartDate[2]);
			var endDateObj = dates.convert(arrEndDate[1] + '/' + arrEndDate[0] + '/' + arrEndDate[2]);
			if(dates.compare(startDateObj,endDateObj) > 0){
				return false;
			}
			return true;
		},	
		
		/**
	     * Day number between two date
	     * Input : String "dd/mm/yyyy"
	     * Return : Mumber [Day number]
	     * **/
		betweenTwoDate: function(startDate, endDate){
			 
			if(startDate.length == 0 || endDate.length == 0){
				return true;			
			}
			var oneDay = 24*60*60*1000; 
			var arrStartDate = startDate.split('/');
			var arrEndDate = endDate.split('/');
			var startDateObj = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
			var endDateObj = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0]);
			
			return Math.round(Math.abs((endDateObj.getTime() - startDateObj.getTime())/(oneDay)));;
		},
		
		/**
	     * Get current date from server side
	     * Input : 
	     * Return : Current date "dd/mm/yyyy"
	     * **/
		getCurrentDateServerString: function(){
			var currentTime = new Date(sysDateFromServer);
			var month = currentTime.getMonth() + 1;
			var day = currentTime.getDate();
			var year = currentTime.getFullYear();
			if(month < 10){
				month = '0' + month;
			}
			if(day < 10){
				day = '0' + day;
			}
			return day + '/' + month + '/' + year;
		},
		
		/**
	     * Get current month from server side
	     * Input : 
	     * Return : Current date "mm"
	     * **/
		getCurrentMonthServerString: function(){
			var currentTime = new Date(sysDateFromServer);
			var month = currentTime.getMonth() + 1;
			var year = currentTime.getFullYear();
			if(month < 10){
				month = '0' + month;
			}
			return month;
		},
		
		/**
	     * Get current year from server side
	     * Input : 
	     * Return : Current date "yyyy"
	     * **/
		getCurrentYearServerString: function(){
			var currentTime = new Date(sysDateFromServer);
			var year = currentTime.getFullYear();
			return year;
		},
		
		/**
	     * Get last day of week
	     * Input : 
	     * Return : Current date "dd/mm/yyyy"
	     * **/
		getLastWeek : function(){
			var d = new Date(sysDateFromServer);
			var previousWeek= new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000);
			var lastWeek= (previousWeek.getDate().toString().length>1?previousWeek.getDate():'0'+previousWeek.getDate())+'/'+((previousWeek.getMonth()+1).toString().length>1?(previousWeek.getMonth()+1):'0'+(previousWeek.getMonth()+1))+'/'+previousWeek.getFullYear();
			return lastWeek;
		},
		
		/** Compare two month
		 * @param startMonth,endMonth	 
		 * return -1 (startMonth < endMonth) : 0 (startMonth = endMonth): 1 (startMonth > endMonth)
		 */
		compareMonth: function(startMonth, endMonth){
			if(startMonth.length == 0 || endMonth.length == 0){
				return true;			
			}
			var arrStartMonth = startMonth.split('/');
			var arrEndMonth = endMonth.split('/');
			var startDateObj = dates.convert(arrStartMonth[0] + '/' + '01' + '/' + arrStartMonth[1]);
			var endDateObj = dates.convert(arrEndMonth[0] + '/' + arrEndMonth[0] + '/' + arrEndMonth[1]);
			return dates.compare(startDateObj,endDateObj);
		},
		
		/**
	     * Check is time mm:ss
	     * Input : 
	     * Return : true if is time
	     * **/
		isTime: function(timeStr){
			if (!StringUtils.isNullOrEmpty(timeStr)){
				var arr = timeStr.split(':');
				if (arr != null && arr.length == 2){
					if (/^[0-9]+$/.test(arr[0]) && /^[0-9]+$/.test(arr[1])
							&& (arr[0] >= 0 && arr[0] <= 24) && (arr[1] >= 0 && arr[1] <= 60)){
						return true;
					}
				}
			}
			return false;
		},
		
		/**
	     * Check date's format
	     * Input : 
	     * Return : true if format is correct
	     * **/
		isDate:function(txtDate, separator, type) {
		    var aoDate,           // needed for creating array and object
		        ms,               // date in milliseconds
		        isDate,			  // checkDate
		        month, day, year; // (integer) month, day and year
		    	
		    // if separator is not defined then set '/'
		    if (separator == undefined) {
		        separator = '/';
		    }
		    // split input date to month, day and year
		    aoDate = txtDate.split(separator);
		    // array length should be exactly 3 (no more no less)
		   
		    if(type == null || type == undefined){
				type = Utils._DATE_DD_MM_YYYY;
			}
		    switch (type) {
				case Utils._DATE_DD_MM_YYYY:
					if (aoDate.length !== 3) {
						return false;
					}
					 // define month, day and year from array (expected format is m/d/yyyy)
				    // subtraction will cast variables to integer implicitly
				    day = aoDate[0] - 0; // because months in JS start from 0
				    month = aoDate[1] - 1;
				    year = aoDate[2] - 0;
					break;
				case Utils._DATE_MM_YYYY:
					if (aoDate.length !== 2) {
						return false;
					}
					day = 1;
				    month = aoDate[0]-1;
				    year = aoDate[1]-0;
					break;
				default:
					break;
			}
		   
		    // test year range
		    if (year < 1000 || year > 3000) {
		        return false;
		    }
		    // convert input date to milliseconds
		    ms = (new Date(year, month, day)).getTime();
		    // initialize Date() object from milliseconds (reuse aoDate variable)
		    aoDate = new Date();
		    aoDate.setTime(ms);
		    // compare input date and parts from Date() object
		    // if difference exists then input date is not valid
		    if (aoDate.getFullYear() !== year ||
		        aoDate.getMonth() !== month ||
		        aoDate.getDate() !== day) {
		        return false;
		    }
		    // date is OK, return true
		    return true;
		},
		
		/**
	     * Convert string to date
	     * Input : 
	     * Return : date
	     * **/
		convertDate : function(txtDate, separator){
			// if separator is not defined then set '/'
		    if (separator == undefined) {
		        separator = '/';
		    }
		    // split input date to month, day and year
		    aoDate = txtDate.split(separator);
		    // array length should be exactly 3 (no more no less)
		    if (aoDate.length !== 3) {
		        return false;
		    }
		    // define month, day and year from array (expected format is m/d/yyyy)
		    // subtraction will cast variables to integer implicitly
		    day = aoDate[0] - 0; // because months in JS start from 0
		    month = aoDate[1] - 1;
		    year = aoDate[2] - 0;
		    // test year range
		    if (year < 1000 || year > 3000) {
		        return null;
		    }
		    // convert input date to milliseconds
		    ms = (new Date(year, month, day)).getTime();
		    // initialize Date() object from milliseconds (reuse aoDate variable)
		    aoDate = new Date();
		    aoDate.setTime(ms);
		    // compare input date and parts from Date() object
		    // if difference exists then input date is not valid
		    if (aoDate.getFullYear() !== year ||
		        aoDate.getMonth() !== month ||
		        aoDate.getDate() !== day) {
		        return null;
		    }
		    // date is OK, return true
		    return aoDate;
		},
		toDateStringDDMMYYYY: function(d){
			var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+d.getFullYear();
			return dStr;
		},
		toDateStringDDMMYY: function(d){
			var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+DateUtils.getBriefYear(d);
			return dStr;
		},
		getBriefYear: function(d){
			var d = new Date();
			var x = d.getFullYear() + '';
			return x.substring(2, 4);
		},
		/** convert date to string */
		toDateString : function(d){
			var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+'/'+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+'/'+d.getFullYear();
			return dStr;
		},	
		/** convert datetime to string */
		toTimeString : function(d){
			var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+d.getFullYear(); (d.getHours().toString().length>1?d.getHours():'0'+d.getHours())+':'+(d.getMinutes().toString().length>1?d.getMinutes():'0'+d.getMinutes());
			return dStr;
		},
		toDateTimeString : function(d){
			var dStr= d.getDate().toString() + (d.getMonth() + 1).toString() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds();
			return dStr;
		},
		/** So tuan cua nam */
		getWeekOfYear : function(d) {
			// Create a copy of this date object
			var target = new Date(d.valueOf());
			// ISO week date weeks start on monday
			// so correct the day number
			var dayNr = (d.getDay() + 6) % 7;		
			// Set the target to the thursday of this week so the
			// target date is in the right year
			target.setDate(target.getDate() - dayNr + 3);
			// ISO 8601 states that week 1 is the week
			// with january 4th in it
			var jan4 = new Date(target.getFullYear(), 0, 4);
			// Number of days between target date and january 4th
			var dayDiff = (target - jan4) / 86400000;
			// Calculate week number: Week 1 (january 4th) plus the
			// number of weeks between target date and january 4th
			var weekNr = 1 + Math.ceil(dayDiff / 7);
			return weekNr;
		},
		/** Ngay dau tien cua tuan */
		getFirstDayOfWeek : function(week,year){
			var dateTmp;
			if(week == null || week == undefined || week ==''){
				return '';
			}
			if(year == null || year == undefined || year == ''){
				var currentDate =new Date(sysDateFromServer);
				dateTmp = new Date (currentDate.getFullYear(),0,1);
			} else{
				dateTmp = new Date(year.toString(),0,1); // toString first so it parses correctly year numbers
			}
			var daysToFirstDay = (1 - dateTmp.getDay()); // Note that this can be also negative
			var firstDayOfFirstWeek = new Date(dateTmp.getTime() + daysToFirstDay * 86400000);
			var firstDate = new Date(firstDayOfFirstWeek.getTime() + (7 * (week - 1) * 86400000));
			return toDateString(firstDate);
		},
		/** Phep chia 2 ngay */
		dateDiff : function(idToDate, idFromDate) {
			var fDate = $('#'+idFromDate).val();
			var tDate = $('#'+idToDate).val();
			var arrFDate = fDate.split('/');
			var monthFTxt = arrFDate[0];
			var yearFTxt = arrFDate[1];
			var DateFTxt  = arrFDate[2];
			var arrTDate = tDate.split('/');
			var monthTTxt = arrTDate[0];
			var yearTTxt = arrTDate[1];
			var DateTTxt  = arrTDate[2];
			var d1 = new Date(yearFTxt+"/"+monthFTxt+"/"+DateFTxt);
			var d2 = new Date(yearTTxt+"/"+monthTTxt+"/"+DateTTxt);
			var datediff = d2.getTime() - d1.getTime();
		    return (datediff / (24*60*60*1000));   
		},
		/** Phep tru 2 ngay **/
		subDateForDay : function(){
			var fDate = $('#'+idDate).val();
			var arrFDate = fDate.split('/');
			var monthFTxt = arrFDate[0];
			var yearFTxt = arrFDate[1];
			var DateFTxt  = arrFDate[2];
			var d = new Date(yearFTxt+"/"+monthFTxt+"/"+DateFTxt);
			var b = new Date(d.getTime()-(24*60*60*1000*i));
			var kq = b.getDate()+'/'+ (b.getMonth()+1)+'/'+b.getFullYear();
			return kq;
		}
	};

