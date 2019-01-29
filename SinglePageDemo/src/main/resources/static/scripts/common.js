/*
 * JavaScript file create by ITSOL_DN
*/
var Utils = {
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
	
	isDate:function(txtDate, separator) {
	    var aoDate,           // needed for creating array and object
	        ms,               // date in milliseconds
	        month, day, year; // (integer) month, day and year
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
	    if (year < 1000 || year > 9999) {
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
	bindComboboxStaffEasyUI:function(objectId,prefix){
		var parent = '';
		if(prefix!=undefined && prefix!=null){
			parent = prefix;
		}			
		$(parent + '#'+objectId).combobox({			
			valueField : 'staffCode',
			textField : 'staffName',
			data : Utils.getDataComboboxStaff(objectId,prefix),
			width:120,
			formatter: function(row) {
				return '<span style="font-weight:bold">' + Utils.XSSEncode(row.staffCode) + '</span><br/>' + '<span >' + Utils.XSSEncode(row.staffName) + '</span>';
			},
			filter: function(q, row){
				q = new String(q).toUpperCase();
				var opts = $(this).combobox('options');
				return row['searchText'].indexOf(unicodeToEnglish(q))>=0;
			},			
			onChange:function(newvalue,oldvalue){		    	
				$('.combo-panel').each(function(){if(!$(this).is(':hidden')){$(this).parent().css('width','250px');$(this).css('width','248px');}});
			},
			onSelect: function(){
				$(parent + '#'+objectId).change();
			}
		});
		$('.combo-arrow').unbind('click');
//		$('.combo-arrow').live('click',function(){$('.combo-panel').each(function(){if(!$(this).is(':hidden')){$(this).parent().css('width','250px');$(this).css('width','248px');}});});
	},
	getDataComboboxCustomer:function(objectId,prefix){
		var data = new Array();		
		var parent = '';
		if(prefix!=undefined && prefix!=null){
			parent = prefix;
		}
		$(parent + '#' + objectId +' option').each(function(){
			var obj = new Object();
			obj.customerCode = $(this).val().trim();
			obj.customerName = $(this).text().trim();
			obj.displayText = $(this).val().trim() + ' - ' + $(this).text().trim(); 
			obj.searchText = unicodeToEnglish($(this).val().trim()+ $(this).text().trim());
			obj.searchText = obj.searchText.toUpperCase();
			data.push(obj);
		});
		return data;
	},
	bindComboboxCustomerEasyUI:function(objectId,prefix){
		var parent = '';
		if(prefix!=undefined && prefix!=null){
			parent = prefix;
		}			
		$(parent + '#'+objectId).combobox({			
			valueField : 'customerCode',
			textField : 'customerName',
			data : Utils.getDataComboboxCustomer(objectId,prefix),
			width:250,
			formatter: function(row) {
				return '<span style="font-weight:bold">' + Utils.XSSEncode(row.customerCode) + '</span><br/>' + '<span >' + Utils.XSSEncode(row.customerName) + '</span>';
			},
			filter: function(q, row){
				q = new String(q).toUpperCase();
				var opts = $(this).combobox('options');
				return row['searchText'].indexOf(unicodeToEnglish(q))>=0;
			},			
			onChange:function(newvalue,oldvalue){		    	
				$('.combo-panel').each(function(){if(!$(this).is(':hidden')){$(this).parent().css('width','250px');$(this).css('width','248px');}});
			},
			onSelect: function(){
				$(parent + '#'+objectId).change();
			}
		});
		$('.combo-arrow').unbind('click');
		$('.combo-arrow').live('click',function(){$('.combo-panel').each(function(){if(!$(this).is(':hidden')){$(this).parent().css('width','250px');$(this).css('width','248px');}});});
	},
	bindQuicklyAutoSearch:function(){
		$('.ContentSection .InputTextStyle ').each(function(){
		    if(!$(this).is(':hidden')){
		   		$(this).bind('keyup',function(event){
		   			if(event.keyCode == keyCodes.ENTER){		   				
		   				if($('#btnSearch')!= null && $('#btnSearch').html()!= null && $('#btnSearch').html().trim().length > 0 && !$('#btnSearch').is(':hidden')){
		   					$('#btnSearch').click();		   					
		   				}		   				
		   			}
		   		});    
		    }	    
		});
	},
	bindAutoSearchEx: function(parentDiv){
		$(parentDiv+' .InputTextStyle ').each(function(){
		    if(!$(this).is(':hidden')){
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
	},
	bindAutoSearchExNew: function(parentDiv){
		$(parentDiv+' .InputText ').each(function(){
		    if(!$(this).is(':hidden')){
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
	},
	bindAutoButtonEx: function(parentDiv, idButton){
		var flag = false;
		$(parentDiv+' .InputTextStyle ').each(function(){
			if(!flag){
				if(!$(this).is(':hidden')){
					$(this).unbind('keyup');
					$(this).bind('keyup',function(event){
						if(event.keyCode == keyCodes.ENTER){		   				
							if($('#' +idButton)!= null && $('#' +idButton).html()!= null && $('#' +idButton).html().trim().length > 0 && !$('#' +idButton).is(':hidden')){
								$('#' +idButton).click();
								flag = true;
							}
						}
					});    
				}	    
			}
		});	
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
	bindAutoSearchUpdateBoxSelect: function(){
		$('.BoxSelect2, .BoxSelect3').each(function(){
			if(!$(this).is(':hidden') && !$(this).is(':disabled')){
				$(this).bind('keyup',function(event){
					if(event.keyCode == keyCodes.ENTER){
						if($('#btnUpdate').length > 0 && !$('#btnUpdate').is(':hidden') && !$('btnUpdate').is(':disabled')){
							$('#btnUpdate').click();
						}else{
							if($('#btnSearch').length > 0 && !$('#btnSearch').is(':hidden') && !$('btnSearch').is(':disabled')){
								$('#btnSearch').click();
							}
						}
					}
				});
			}
		});
	},
	/**
	 * check for value, not element id
	 * @author tuannd20
	 * @param objectId
	 * @param objectName
	 * @param type
	 * @returns {String}
	 * @date 21/06/2014
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
		var now = new Date(sysDateFromDB);
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
	var date = new Date(sysDateFromDB);
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
		var now = new Date(sysDateFromDB);
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
var dates = {
	    convert:function(d) {
	        // Converts the date in d to a date-object. The input can be:
	        // a date object: returned without modification
	        // an array : Interpreted as [year,month,day]. NOTE: month is 0-11.
	        // a number : Interpreted as number of milliseconds
	        // since 1 Jan 1970 (a timestamp)
	        // a string : Any format supported by the javascript engine, like
	        // "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
	        // an object : Interpreted as an object with year, month and date
	        // attributes. **NOTE** month is 0-11.
	        return (
	            d.constructor === Date ? d :
	            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
	            d.constructor === Number ? new Date(d) :
	            d.constructor === String ? new Date(d) :
	            typeof d === "object" ? new Date(d.year,d.month,d.date) :
	            NaN
	        );
	    },
	    compare:function(a,b) {
	        // Compare two dates (could be of any type supported by the convert
	        // function above) and returns:
	        // -1 : if a < b
	        // 0 : if a = b
	        // 1 : if a > b
	        // NaN : if a or b is an illegal date
	        // NOTE: The code inside isFinite does an assignment (=).
	        return (
	            isFinite(a=this.convert(a).valueOf()) &&
	            isFinite(b=this.convert(b).valueOf()) ?
	            (a>b)-(a<b) :
	            NaN
	        );
	    },
	    inRange:function(d,start,end) {
	        // Checks if date in d is between dates in start and end.
	        // Returns a boolean or NaN:
	        // true : if d is between start and end (inclusive)
	        // false : if d is before start or after end
	        // NaN : if one or more of the dates is illegal.
	        // NOTE: The code inside isFinite does an assignment (=).
	       return (
	            isFinite(d=this.convert(d).valueOf()) &&
	            isFinite(start=this.convert(start).valueOf()) &&
	            isFinite(end=this.convert(end).valueOf()) ?
	            start <= d && d <= end :
	            NaN
	        );
	    },
	    addDays:function(n){
	    	var curdate = new Date(sysDateFromDB);
	    	var time = curdate.getTime();
	        var changedDate = new Date(time + (n * 24 * 60 * 60 * 1000));
	        curdate.setTime(changedDate.getTime());	        
	        return $.datepicker.formatDate('dd/mm/yy', curdate);
	    }
	};
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
		var now = new Date(sysDateFromDB);
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
	var d=new Date(sysDateFromDB);
	var dStr= (d.getDate().toString().length>1?d.getDate():'0'+d.getDate())+'/'+((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+'/'+d.getFullYear();
	return dStr;
}
function getLastWeek(){
    var today = new Date(sysDateFromDB);
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
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.utils.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.business-utils.js
 */
/**
   Search Commons va DialogCommon
 * @author tientv11
 * @sine 05/05/2014
 */
var CommonBusiness = {
		/** Dialog search CODE - NAME - CHỌN */
		_currentSearchCallback: null,
		_arrParams: null,
		_xhrReport:null,
	openSearchStyle1EasyUIDialog : function(){
		
	},
	getSearchStyle1GridShopKAUrl : function(url, code, name, arrParam) {
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
		searchUrl += "&customerCode="+code+"&nameOrAddress="+name;
		return searchUrl;
	},
	exportExcelData:function(dataModel,url,errMsg,typeErr){
		var kData = $.param(dataModel,true);
		if(CommonBusiness._xhrReport != null){
			CommonBusiness._xhrReport.abort();
			CommonBusiness._xhrReport = null;
		}
		$('.VinamilkTheme #divOverlay').show();
		$('#divOverlay_New').show();
		CommonBusiness._xhrReport = $.ajax({
			type : "POST",
			url : url,
			data: (kData),
			dataType: "json",
			success : function(data) {
				$('.VinamilkTheme #divOverlay').hide();
				$('#divOverlay_New').hide();
				if(data.error && data.errMsg!= undefined){
					$('#'+ errMsg).html(escapeSpecialChar(data.errMsg)).show();
//					Utils.showMessage(escapeSpecialChar(data.errMsg));//LamNH
					setTimeout(function(){
						$('#'+ errMsg).hide();
//						$('#commonMessage').hide();//LamNH
					},10000);
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						if(typeErr!=undefined && typeErr){
							$('#'+ errMsg).html(msgCommon7).show();
//							Utils.showMessage(msgCommon7);//LamNH
						}else{
							$('#'+ errMsg).html(msgCommon7).show();
//							Utils.showMessage(msgCommon7);//LamNH
						}
					} else{
						//Begin anhdt10 - fix attt - dua ra acoutn dowload
						window.location.href =WEB_CONTEXT_PATH + "/commons/downloadFile?file="+data.view;
						//End anhdt10
						setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
		                    CommonSearch.deleteFileExcelExport(data.view);
						}, 50000000);
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorDivThrown) {
				$('.VinamilkTheme #divOverlay').hide();
				$('#divOverlay_New').hide();
				$.ajax({
					type : "POST",
					url :WEB_CONTEXT_PATH + '/check-session',
					dataType : "json",
					success : function(data) {
						CommonBusiness._xhrReport = null;
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						window.location.href =WEB_CONTEXT_PATH +'/home';
					}
				});
			}
		});
		return false;
	},
	deleteFileExcelExport:function(excelFileName){
        $.ajax({
              type : "POST",
              url : "/commons/deleteFile",
              data : ({
                    excelFileName: excelFileName
              }),
              dataType : "json",
              success : function(data) {
            	  Utils.updateTokenForJSON(data);
              },
              error : function(XMLHttpRequest, textStatus, errorDivThrown) {
              }
        });
	}
};
var CommonSearchEasyUI = {
		_currentSearchCallback : null,
		_arrParams : null,
		_mapMutilSelect : null,
		_isOpenDialog : null,
		fitEasyDialog:function(objectId){
			if(objectId!=undefined && objectId!=null && objectId!=''){ objectId="#"+objectId;
			}else objectId=".easyui-dialog";
			$(objectId).each(function(){
				try{
					if($(this).parent().css('display')!='none'){
						var hDialog=parseInt($(this).parent().height());
						var hWindow=parseInt($(window).height());
						if(hDialog>=hWindow){
							$(this).parent().css('top',0);
						}else{
							var distant=hWindow-hDialog;
							distant=distant/2+document.documentElement.scrollTop;
							$(this).parent().css('top',distant);
						}
					}
				}catch(e){}
			});
		},
		hiddenTabIndex : function() {
			var tabindex = -1;
			$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
				if (this.type != 'hidden') {
					$(this).attr("tabindex", tabindex);
					tabindex -=1;
				}
			});
		},
		showTabIndex : function (parentDiv) {
			var parentId = '';
			if(parentDiv!= null && parentDiv!= undefined){
				parentId = parentDiv;
			}
			var tabindex = 1;
			var tabindexObject = parentId +' .InputTextStyle';
			tabindexObject += parentId +' select';
			tabindexObject += parentId +' input';
			tabindexObject += parentId +' button';
			$(tabindexObject).each(function () {
				if (this.type != 'hidden') {
					$(this).attr("tabindex", tabindex);
				}
				tabindex ++;
			});	
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
		getResultSearchStyle2EasyUIDialog : function(rowIndex) {
			var grid = $('#searchStyle2EasyUIGrid');
			grid.datagrid('unselectAll');
			grid.datagrid('selectRow',rowIndex);
			var row = grid.datagrid('getSelected');		
			if (CommonSearchEasyUI._currentSearchCallback != null) {
				CommonSearchEasyUI._currentSearchCallback.call(this, row);
				$('#searchStyle2EasyUIDialog').dialog('close');
			}
			return false;
		},
		openSearchStyle2EasyUIDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam) {
			CommonSearchEasyUI._arrParams = null;
			CommonSearchEasyUI._currentSearchCallback = null;
			var html = $('#searchStyle2EasyUIDialogDiv').html();
			$('#searchStyle2EasyUIDialog').dialog({  
		        title: title,  
		        closed: false,  
		        cache: false,  
		        modal: true,
		        width : 616,
		        height :'auto',
		        onOpen: function(){
		        	CommonSearchEasyUI.hiddenTabIndex();
					$('#searchStyle2EasyUICode').focus();
					$('#searchStyle2EasyUIUrl').val(url);
					$('#searchStyle2EasyUICodeText').val(codeFieldText);
					$('#searchStyle2EasyUINameText').val(nameFieldText);
					CommonSearchEasyUI._currentSearchCallback = callback;
					CommonSearchEasyUI._arrParams = arrParam;
					CommonSearchEasyUI._isOpenDialog = true;
					
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
					$('#searchStyle2EasyUIGrid').show();
					$('#searchStyle2EasyUIGrid').datagrid({
						url : CommonSearchEasyUI.getSearchStyleEasyUIGridUrl(url, arrParam),
						autoRowHeight : true,
						rownumbers : true, 
						checkOnSelect :true,
						pagination:true,
						rowNum : 10,
						scrollbarSize : 0,
						fitColumns:true,
						pageList  : [10,20,30],
						width : ($('#searchStyle2EasyUIContainerGrid').width()),
					    columns:[[  
					        {field:codeField,title:codeText,align:'left', width:150, sortable : false,resizable : false, formatter: function(value, row, index){
					        	return Utils.XSSEncode(value);
					        }},  
					        {field:nameField,title:nameText,align:'left', width:400, sortable : false,resizable : false, formatter: function(value, row, index){
					        	return Utils.XSSEncode(value);
					        }},  
					        {field:'select', align:'center',sortable : false,resizable : false,formatter : CommonSearchEasyUIFormatter.selectSearchStyle2EasyUIDialog},
					        {field:'id',hidden : true},
					    ]],
					    onLoadSuccess :function(){
					    	var easyDiv = '#searchStyle2EasyUIContainerGrid ';
					    	$(easyDiv+'.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				    		CommonSearchEasyUI.showTabIndex('#searchStyle2EasyUIDialog');
				    		updateRownumWidthForDataGrid('#searchStyle2EasyUIContainerGrid');
				    		setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog('searchStyle2EasyUIDialog');
				    		},1000);
					    }
					});  
					$('#btnSearchStyle2EasyUI').bind('click',function(event) {
						var code = $('#searchStyle2EasyUICode').val().trim();
						var name = $('#searchStyle2EasyUIName').val().trim();
						$('#searchStyle2EasyUIGrid').datagrid('load',{code :code, name: name});
						$('#searchStyle2EasyUICode').focus();
					});
					$('#btnSearchStyle2EasyUIUpdate').hide();
					$('#btnSearchStyle2EasyUIClose').show();
		        },
		        onClose : function(){
		        	$('#searchStyle2EasyUIDialog').dialog('destroy');
		        },
		        onDestroy :function() {
		        	CommonSearchEasyUI.showTabIndex();
					CommonSearchEasyUI._currentSearchCallback = null;
					var curIdFocus = $('#cur_focus').val();
					$('#'+ curIdFocus).focus();			
		        	$('#searchStyle2EasyUIDialogDiv').html(html);
		        	CommonSearchEasyUI._isOpenDialog = false;
		        }
		    });
			return false;
		},
		openSearchStyle2EasyUIMutilSelectDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam) {
			CommonSearchEasyUI._arrParams = null;
			CommonSearchEasyUI._currentSearchCallback = null;
			CommonSearchEasyUI._mapMutilSelect = new Map();
			var html = $('#searchStyle2EasyUIDialogDiv').html();
			$('#searchStyle2EasyUIDialog').dialog({  
		        title: title,  
		        closed: false,  
		        cache: false,  
		        modal: true,
		        width : 616,
		        height :'auto',
		        onOpen: function(){
		        	CommonSearchEasyUI.hiddenTabIndex();
					$('#searchStyle2EasyUICode').focus();
					$('#searchStyle2EasyUIUrl').val(url);
					$('#searchStyle2EasyUICodeText').val(codeFieldText);
					$('#searchStyle2EasyUINameText').val(nameFieldText);
					CommonSearchEasyUI._currentSearchCallback = callback;
					CommonSearchEasyUI._arrParams = arrParam;
					CommonSearchEasyUI._isOpenDialog = true;
					
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
					$('#searchStyle2EasyUIGrid').show();
					$('#searchStyle2EasyUIGrid').datagrid({
						url : CommonSearchEasyUI.getSearchStyleEasyUIGridUrl(url, arrParam),
						autoRowHeight : true,
						rownumbers : true, 
						checkOnSelect :true,
						pagination:true,
						rowNum : 10,
						scrollbarSize : 0,
						fitColumns:true,
						pageList  : [10,20,30],
						width : ($('#searchStyle2EasyUIContainerGrid').width()),
					    columns:[[  
					        {field:codeField,title:codeText,align:'left', width:150, sortable : false,resizable : false, formatter: function(value, row, index){
					        	return Utils.XSSEncode(value);
					        }},  
					        {field:nameField,title:nameText,align:'left', width:400, sortable : false,resizable : false, formatter: function(value, row, index){
					        	return Utils.XSSEncode(value);
					        }},  
					        {field:'id',checkbox:true, align:'center',sortable : false,resizable : false},
					    ]],
					    onSelect : function(rowIndex, rowData) {
					    	var selectedId = rowData['id'];
					    	CommonSearchEasyUI._mapMutilSelect.put(selectedId, rowData);
					    },
					    onUnselect : function(rowIndex, rowData) {
					    	var selectedId = rowData['id'];
					    	CommonSearchEasyUI._mapMutilSelect.remove(selectedId);
					    },
					    onSelectAll : function(rows) {
					    	if($.isArray(rows)) {
					    		for(var i = 0; i < rows.length; i++) {
					    			var row = rows[i];
					    			var selectedId = row['id'];
							    	CommonSearchEasyUI._mapMutilSelect.put(selectedId, row);
					    		}
					    	}
					    },
					    onUnselectAll : function(rows) {
					    	if($.isArray(rows)) {
					    		for(var i = 0; i < rows.length; i++) {
					    			var row = rows[i];
					    			var selectedId = row['id'];
							    	CommonSearchEasyUI._mapMutilSelect.remove(selectedId);
					    		}
					    	}
					    },
					    onLoadSuccess :function(){
					    	var easyDiv = '#searchStyle2EasyUIContainerGrid ';
					    	$(easyDiv+'.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
					    	var exitsAll = false;
				    		var runner = 0;
				    		$(easyDiv+'input:checkbox[name=id]').each(function() {
				    			var selectedId = this.value;
				    			if(CommonSearchEasyUI._mapMutilSelect.get(selectedId) != null || CommonSearchEasyUI._mapMutilSelect.get(selectedId) != undefined) {
				    				exitsAll = true;
				    				$('#searchStyle2EasyUIGrid').datagrid('selectRow',runner);
				    			} 
				    			runner ++; 
				    		});
				    		if (exitsAll==false){
				    			$(easyDiv+'td[field=id] .datagrid-header-check input:checkbox').attr('checked', false);
					    	}
				    		CommonSearchEasyUI.showTabIndex('#searchStyle2EasyUIDialog');
				    		updateRownumWidthForDataGrid('#searchStyle2EasyUIContainerGrid');
				    		setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog('searchStyle2EasyUIDialog');
				    		},1000);
					    }
					});  
					$('#btnSearchStyle2EasyUI').bind('click',function(event) {
						var code = $('#searchStyle2EasyUICode').val().trim();
						var name = $('#searchStyle2EasyUIName').val().trim();
						$('#searchStyle2EasyUIGrid').datagrid('load',{code :code, name: name});
						$('#searchStyle2EasyUICode').focus();
					});
					$('#btnSearchStyle2EasyUIUpdate').show();
					$('#btnSearchStyle2EasyUIClose').hide();
					$('#btnSearchStyle2EasyUIUpdate').bind('click', function(event) {
						$('#errMsgSearchStyle2EasyUI').html('').hide();
	        			if(CommonSearchEasyUI._mapMutilSelect == null || CommonSearchEasyUI._mapMutilSelect.size() <= 0) {
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
	    	        	if (CommonSearchEasyUI._currentSearchCallback != null) {
	    	        		CommonSearchEasyUI._currentSearchCallback.call(this, CommonSearchEasyUI._mapMutilSelect.valArray);
	    	    			$('#searchStyle2EasyUIDialog').dialog('close');
	    	    		}
					});
		        },
		        onClose : function(){
		        	$('#searchStyle2EasyUIDialog').dialog('destroy');
		        },
		        onDestroy :function() {
		        	CommonSearchEasyUI.showTabIndex();
					CommonSearchEasyUI._currentSearchCallback = null;
					var curIdFocus = $('#cur_focus').val();
					$('#'+ curIdFocus).focus();			
		        	$('#searchStyle2EasyUIDialogDiv').html(html);
		        }
		    });
			return false;
		},
		openSearchStaffDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam) {
			CommonSearchEasyUI._arrParams = null;
			CommonSearchEasyUI._currentSearchCallback = null;
			var html = $('#searchStyle2EasyUIDialogDiv').html();
			$('#searchStyle2EasyUIDialog').dialog({
		        title: title,  
		        closed: false,  
		        cache: false,  
		        modal: true,
		        width : 616,
		        height :'auto',
		        onOpen: function(){
					$('#searchStyle2EasyUICode').focus();
					$('#searchStyle2EasyUIUrl').val(url);
					$('#searchStyle2EasyUICode').val('');
					$('#searchStyle2EasyUIName').val('');
					$('#searchStyle2EasyUICodeLabel').val(codeFieldText);
					$('#searchStyle2EasyUINameLabel').val(nameFieldText);
					CommonSearchEasyUI._currentSearchCallback = callback;
					CommonSearchEasyUI._arrParams = arrParam;
					CommonSearchEasyUI._isOpenDialog = true;
					
					var codeField = 'code';
					var nameField = 'name';
					if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
						codeField = codeFieldText;
					}
					if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
						nameField = nameFieldText;
					}
					$('#errMsgSearchStyle2EasyUI').html('').hide();
					$('#searchStyle2EasyUICodeLabel').html(codeText);
					$('#searchStyle2EasyUINameLabel').html(nameText);					
					$('#searchStyle2EasyUIGrid').show();
					$('#searchStyle2EasyUIGrid').datagrid({
						url : CommonSearchEasyUI.getSearchStyleEasyUIGridUrl(url, arrParam),
						autoRowHeight : true,
						//rownumbers : true, 
						checkOnSelect :true,
						pagination:true,
						rowNum : 10,
						scrollbarSize : 0,
						singleSelect:true,
						fitColumns:true,
						pageList  : [10,20,30],
						queryParams:{page:1},
						width : ($('#searchStyle2EasyUIContainerGrid').width()),
					    columns:[[  
							{field:'rownum', title: msgSTT, width: 70,align: 'center',formatter:function(value,row,index){
					            var page = $('#searchStyle2EasyUIContainerGrid .pagination-num')[0].value;
					            return (page != 0 ? (page*10-10 +index +1) : index +1);	
					        }},
					        {field:codeField,title:codeText, width:150, formatter: function(value){
					        	return Utils.XSSEncode(value);
					        }},  
					        {field:nameField,title:nameText, width:400, formatter: function(value){
					        	return Utils.XSSEncode(value);
					        }},
					        {field:'select', align:'center', width:100,formatter : AttributeCustomerCatalogFormatter.selectSearchStyle2EasyUIDialog},
					        {field:'id',hidden : true},
					    ]],
					    onLoadSuccess :function(){
					    	var easyDiv = '#searchStyle2EasyUIContainerGrid ';
					    	$(easyDiv+'.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				    		updateRownumWidthForDataGrid('#searchStyle2EasyUIContainerGrid');
				    		setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog('searchStyle2EasyUIDialog');
				    		},1000);
					    }
					});  
					$('#btnSearchStyle2EasyUI').bind('click',function(event) {
						var code = $('#searchStyle2EasyUICode').val().trim();
						var name = $('#searchStyle2EasyUIName').val().trim();
						$('#searchStyle2EasyUIGrid').datagrid('load',{staffCode :code, staffName: name});
						$('#searchStyle2EasyUICode').focus();
					});
					$('#searchStyle2EasyUICode,#searchStyle2EasyUIName,#btnSearchStyle2EasyUI').bind('keyup', function(event){
						if(event.keyCode == keyCodes.ENTER){
							var code = $('#searchStyle2EasyUICode').val().trim();
							var name = $('#searchStyle2EasyUIName').val().trim();
							$('#searchStyle2EasyUIGrid').datagrid('load',{staffCode :code, staffName: name});
							$('#searchStyle2EasyUICode').focus();
						}
					});
					$('#btnSearchStyle2EasyUIUpdate').hide();
					$('#btnSearchStyle2EasyUIClose').show();
					$('.datagrid-body').css('overflow', 'hidden');
		        },
		        onClose : function(){
		        	CommonSearchEasyUI._currentSearchCallback = null;
		        	var curIdFocus = $('#cur_focus').val();
		        	$('#'+ curIdFocus).focus();
		        	CommonSearchEasyUI._isOpenDialog = false;
		        	$('#searchStyle2EasyUIGrid').datagrid('load',{page:1});
		        }
		    });
			return false;
		}
	};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.business-utils.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.validate-utils.js
 */
/**
   ValidateUtils
 * @author tientv11
 * @sine 05/05/2014
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
						var currentTime = sysDateFromDB;
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
						var currentTime = sysDateFromDB;
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

/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.validate-utils.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.gridFormatter.js
 */
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
				var result='';
                var style = '';
				if(rowObject.status=="DELETED" ){
					 result =  msgTamNgung;
                     style = 'statusTamNgung';
				}else{
					 result =  msgHoatDong;
                     style = 'statusHoatDong';
				}
			}else{
				 result =  'Từ chối';
                 style = 'statusKhongHoatDong';
			}
			return '<b class="'+style+'">'+ Utils.XSSEncode(result) + '</b>';
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
			return "<a href='javascript:void(0)' onclick='viewdetailPromotions("+row.id+",1)'><span style='cursor:pointer'><img src='" + WEB_CONTEXT_PATH + "/resources/images/edit.svg' title = '"+msgXemChiTiet+"' /></span></a>";
		}else{
			proId = row.id+ '&proType=2';
			return "<a href='javascript:void(0)' onclick='viewdetailPromotions("+row.id+",2)'><span style='cursor:pointer'><img src='" + WEB_CONTEXT_PATH + "/resources/images/edit.svg' title = '"+msgXemChiTiet+"' /></span></a>";
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
			return "<a href='javascript:void(0)' onclick=\"return PromotionCatalog.getDetailGridUrl('"+ row.shop.id +"','"+value+"','"+ row.shop.shopName +"','"+status+"');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
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
		return "<a href='javascript:void(0)' onclick='return PromotionCatalog.viewActionAudit("+actionId+")'><img src='" + WEB_CONTEXT_PATH + "/resources/images/search_den.svg'/></a>";
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
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.gridFormatter.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.report-utils.js
 */
/**
   APIs Report
 * @author tientv11, tulv2
 * @sine 05/05/2014
 */
var ReportsUtils = {
		_xhrReport:null,
		versionDMS : {
			BASIC : 1,
			PLUS:2,
			AVANDANCE:3
		},
		_hasSalesChart: null,
		versionDMSLogin:null,
		reportName : '',
	/** Import excel */
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
			if(!ReportsUtils.previewImportExcelFile(document.getElementById(file))){
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
//						Utils.hideMessage();//LamNH
						$('#divOverlay_New').show();
						return true;
					},				
					success : function(responseText, statusText, xhr, $form){
						$('#divOverlay_New').hide();
						if (statusText == 'success') {	
							$("#responseDiv").html(responseText);
							if($('#tokenValue').html() !=null && $('#tokenValue').html() !=undefined){
								$('#token').val($('#tokenValue').html().trim());
							}
							if(($('#errorExcel').html() != null && $('#errorExcel').html().trim() == 'true') || ($('#errorExcelMsg').html() != null && $('#errorExcelMsg').html().trim().length > 0)){
								$(objectErrorSelector).html($('#errorExcelMsg').html()).show();
//								Utils.showMessage($('#errorExcelMsg').html());//LamNH
								var tmAZ = setTimeout(function(){
									$(objectErrorSelector).html($('#errorExcelMsg').html()).hide();
//									Utils.hideMessage();//LamNH
									clearTimeout(tmAZ);
								}, 20000);
							} else {
								$('#divOverlay_New').hide();
								var obj = new Object();
				    			obj.totalRow = Number($('#totalRow').html().trim());
				    			obj.numFail = Number($('#numFail').html().trim());
				    			var fileNameFail = $('#fileNameFail').html();
				    			var message =format(msgErr_result_import_excel,(obj.totalRow - obj.numFail),obj.numFail);		    		
				    			if(obj.numFail > 0){
				    				message+= ' <a href="'+WEB_CONTEXT_PATH+'/commons/downloadFile?file='+ fileNameFail +'">'+msgCommon5+'</a>';
				    			}
				    			if(obj.totalRow==0 && obj.numFail==0){
				    				message=msgErr_result_import_excel_null;
				    			}
				    			if($('#'+file).length!=0 && $('#'+fakefilepc).length!=0){
				    				try{
				    					$('#'+file).val('');
				    					$('#'+fakefilepc).val('');
				    				}catch(err){
				    					
				    				}
				    			}			    
				    			$(objectErrorSelector).html(message).show();
//				    			Utils.showMessage(message);//LamNH
				    			var tmAZ = setTimeout(function(){
				    				$(objectErrorSelector).html(message).hide();
//				    				Utils.hideMessage();//LamNH
				    				clearTimeout(tmAZ);
				    			}, 20000);
				    			if(callback!= null && callback!= undefined){
									callback.call(this,obj);
								}
					    	}
						}
					},
					type : "POST",
					dataType : 'html',
					data : params
			};
			$('#divOverlay_New').hide();
		$('#'+frm).ajaxForm(options);
		$.messager.confirm(msgXacNhan, title, function(r){
			if (r){
				$('#'+frm).submit();
			}
		});
	},
	
	/** Export Excel */
	exportExcel : function(dataModel,url,errMsg){

		if(errMsg == null || errMsg == undefined){
			errMsg = 'errExcelMsg';
		}
		var kData = $.param(dataModel,true);
		if(ReportsUtils._xhrReport != null){
			ReportsUtils._xhrReport.abort();
			ReportsUtils._xhrReport = null;
		}
		$('#divOverlay_New').show();
		ReportsUtils._xhrReport = $.ajax({
			type : "POST",
			url : url,
			data: (kData),
			dataType: "json",
			success : function(data) {
				$('#divOverlay_New').hide();
				hideLoadingIcon();
				if(data.error && data.errMsg!= undefined){
					$('#'+ errMsg).html(msgCommon6 + escapeSpecialChar(data.errMsg)).show();
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						$('#'+ errMsg).html(msgCommon7).show();
					} else{
						hideLoadingIcon();
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
				$.ajax({
					type : "POST",
					url :WEB_CONTEXT_PATH + '/check-session',
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
	
	/** Cay bao cao */
	loadTreeReport : function(url){
		/**
		 * (A) add parameter: url
		 * @author tuannd20
		 * @date 13/07/2014
		 */
		if (url != null && url != undefined && url.toString().trim().length !== 0){
			loadDataForTree(url);
		} else {
			loadDataForTree('/rest/report/tree.json');
		}
		$('#tree').bind("loaded.jstree", function(event, data){
			$('#tree').jstree('select_node', '#' + $('#tree ul li ul li')[0].id);
		});
		$('#tree').bind("select_node.jstree", function (event, data) {			
			var id = data.rslt.obj.attr("id");
			if(id!= null && id!= undefined && id.length > 0){
				ReportsUtils.showReportForm(id);
			}
	    });
		$('#tree').bind("open_node.jstree", function (event, data) {
	    });
	},
	setCurrentDateForCalendar: function(objId,firstDay){
		var currentTime = new Date(sysDateFromDB);
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		if(month < 10){
			month = '0' + month;
		}
		if(day < 10){
			day = '0' + day;
		}
		if(firstDay != undefined && firstDay != null ){
			day = firstDay;
		}
		$('#' + objId).val(day + '/' + month + '/' + year);
	},
	setCurrentMonthForCalendar: function(objId){
		var currentTime = new Date(sysDateFromDB);
		var month = currentTime.getMonth() + 1;
		var year = currentTime.getFullYear();
		if(month < 10){
			month = '0' + month;
		}
		$('#' + objId).val(month + '/' + year);
	},
	getCurrentDateString: function(){
		var currentTime = new Date(sysDateFromDB);
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
	getCurrentMonthString: function(){
		var currentTime = new Date(sysDateFromDB);
		var month = currentTime.getMonth() + 1;
		var year = currentTime.getFullYear();
		if(month < 10){
			month = '0' + month;
		}
		return month + '/' + year;
	},
	showReportForm: function(id){
		var url = '';
		var text = '';
		var shopType = $('#shopTypeId').val();
		if (shopType != null && shopType != undefined){
			shopType = shopType.trim();
		}
		if (id == 'BCTGGTKH'){
			url = '/report/bctggtkh/info';
			text = msgCommon8;			
		} else if (id == 'BCLTCTNVBH'){
			url = '/report/bcltctnvbh/info';
			text = msgCommon9;
		}else if (id == 'BCDSSL'){
			url = '/report/bcdssl/info';
			text = msgCommon10;
		}else if(id == 'BCDSSLNVBH'){ // author :anhhpt
			url = '/report/bcdsslnvbh/info?typeReport=14';
			text = msgCommon15;
		}else if(id == 'BCTLCTKPI'){
			url = '/report/bcdsslnvbh/info?typeReport=15';
			text = msgCommon16;
		}else if(id == 'BCDSSLKH'){ // author :anhhpt
			url = '/report/bcdsslkh/info?isBcDsSlKh=true';//haupv3: bo sung filter theo thuoc tinh kh
			text = msgReportTitle16;
		}else if (id == 'BCKHTT'){
			url= '/report/bckhtt/info';
			text = msgCommon17;
		}else if (id == 'BCXNT'){ //author:anhhpt
			url= '/report/bcxnt/info';
			text = msgCommon18;
		}else if (id == 'BCXNTCT'){ //author:anhhpt
			url= '/report/bcxntct/info';
			text = msgCommon19;
		}else if (id == 'BCDSDH'){ //author:anhhpt
			url= '/report/bcdsdh/info';
			text = msgCommon20;
		}else if (id == 'BCKM'){ //author:haupv3
			url= '/report/bckm/info';
			text = msgBcKM;
		}else if (id == 'BCBDTK'){
			url= '/report/chart/sales-chart';
			text = msgThongKeChung;
		}else if (id == 'BCCC'){//author: haupv3
			url= '/report/bccc/info';
			text = msgChamCong;
		}else if (id == 'BCTDKP'){//author:haupv3
			url= '/report/bctdkp/info';
			text = msgBaoCaoDSVD;
		}else if (id == 'BCTKDL'){//author:haupv3
			url= '/report/bctkdl/info';
			text = msgTonKhoDiemLe;
		}else if (id == 'BCKQDT'){//author:haupv3
			url= '/report/bckqdt/info';
			text = msgKetQuaDiTuyen;
		}else if (id == 'BCMMKH'){//author:anhhpt
			url= '/report/bcmmkh/info';
			text = msgBaocCaoMoMoiKhachHang;
		}else if (id == 'BCKGTKH'){//author:lochp
			url= '/report/bckgtkh/info';
			text = msgKhongGheThamKH;
		}else if (id == 'BCKHPSDS'){
			url= '/report/bckhpsds/info?bcpsds=1';
			text = msgKhachHangPSDS;
		}else if (id == 'BCCBKHT'){
			url= '/report/bccbkht/info';//author: haupv3
			text = msgCanhBaoKHTrung;
		}else if (id == 'BCTTT'){
			url= '/report/bcttt/info';//author: haupv3
			text = msgThongTinTuyen;
		}else if (id == 'BCCTDHXB'){
			url= '/report/bcctdhxb/info';//author: LamNH
			text = msgChiTietDonHangXuatBan;
		}else if (id == 'BCTHSDDMS'){
			url= '/report/bcthsdDMS/info';//author: LamNH
			text = msgTinhHinhSuDungDMS;
		}else if (id == 'BCTDTG'){
			url= '/report/bctdtg/info';//author: Lochp
			text = msgBCTDTG;
		}
		//anhdt10
		else if (id == 'BC41CTTT'){
			url = '/report/bc41cttt/info';
			text = msgBCChiTietThanhToan;
		}else if (id == 'BC4_4'){
			url = '/report/4_4/info';
			text = msgBC4_4;
		}else if (id == 'BCQDDC'){
			url = '/report/bcqddc/info';
			text = msgBCQuangDuongDiChuyen;
		}
		else if (id == 'BCPMH'){
			url = '/report/bcdspmh/info';
			text = msgBCPMH;
		}
		//
		$('#divOverlay').show();
		$.ajax({
			type : 'GET',
			url : url,			
			dataType : "html",
			success : function(data) {
				$('#title2').html(text);
				$('#reportContainer').html(data);
				$('#divOverlay').hide();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				$('#divOverlay').hide();
			}
		});
	},
	previewImportExcelFile : function (fileObj,formId,inputText){
		if($('.ErrorMsgStyle').length>0){
			$('.ErrorMsgStyle').html('').hide();
//			Utils.hideMessage();//LamNH
		}
		var inputId = 'fakefilepc';
		if(inputText != null || inputText != undefined){
			inputId = inputText;
		}
		var fileTypes=["xls","xslx"];
		if (fileObj.value != '') {
			if (!/(\.xls|\.xlsx)$/i.test(fileObj.value)) {
				$('#errExcelMsg').html(msgErr_excel_file_invalid_type).show();
//				Utils.showMessage(msgErr_excel_file_invalid_type);//LamNH
				fileObj.value = '';
				fileObj.focus();
				document.getElementById(inputId).value ='';			
				return false;
			} else {
				$('#errExcelMsg').html('').hide();
//				Utils.hideMessage();//LamNH
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
			if($('#excelFile')[0].files[0].size > 10485760){
	        	$('#errExcelMsg').html(msgCommon11).show();
//	        	Utils.showMessage(msgCommon11);//LamNH
	        	return false;
	        }
		}else{
			$('#errExcelMsg').html(msgCommon12).show();	
//			Utils.showMessage(msgCommon12);//LamNH
			return false;
		}
		return true;
	}
};

/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.report-utils.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.date.utils.js
 */
var DateUtils = {
	DATE_FORMAT_STR: "dd/MM/yyyy",
	/** So sanh 2 ngay 
	 * @param startDate,toDate	 
	 * return -1 (startDate < endDate) : 0 (startDate = endDate): 1 (startDate > endDate)
	 */
	compareDate : function(startDate, endDate){
		if(startDate.length == 0 || endDate.length == 0){
			return true;			
		}
		var arrStartDate = startDate.split('/');
		var arrEndDate = endDate.split('/');
		var startDateObj = dates.convert(arrStartDate[1] + '/' + arrStartDate[0] + '/' + arrStartDate[2]);
		var endDateObj = dates.convert(arrEndDate[1] + '/' + arrEndDate[0] + '/' + arrEndDate[2]);
		return dates.compare(startDateObj,endDateObj);
	},
	/** Lay ngay/thang/nam hien tai */
	getCurrentDate : function(){
		var now = new Date(sysDateFromDB);
		var cYear = now.getFullYear();
		var cMonth = now.getMonth() + 1;
		var cDate = now.getDate();
		var currentDate = cDate+'/'+cMonth+'/'+cYear;
		return currentDate;
	},	
	/** Lay thang/nam hien tai */
	getCurrentMonth: function(){
		var d=new Date(sysDateFromDB);
		var dStr= ((d.getMonth()+1).toString().length>1?(d.getMonth()+1):'0'+(d.getMonth()+1))+'/'+d.getFullYear();
		return dStr;
	},
	/** Lay nam hien tai */
	getCurrentYear : function(){
		var d=new Date(sysDateFromDB);
		return d.getFullYear();
	},
	/** Lay ngay cuoi tuan */
	getLastWeek : function(){
		var d = new Date(sysDateFromDB);
		var previousWeek= new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000);
		var lastWeek= (previousWeek.getDate().toString().length>1?previousWeek.getDate():'0'+previousWeek.getDate())+'/'+((previousWeek.getMonth()+1).toString().length>1?(previousWeek.getMonth()+1):'0'+(previousWeek.getMonth()+1))+'/'+previousWeek.getFullYear();
		return lastWeek;
	},
	/** Chuyen dinh dang thoi gian */
	formatDate: function(d){
		if(d != null || d != undefined){
			d = d.substring(0,10);
			d = d.split('-');
			d = d[2] + '/' + d[1] + '/' + d[0];
		}
		return d;
	},
	/** Chuyen dinh dang thoi gian */
	formatDateTime : function(d){
		if(d != null || d != undefined){
			var d1 = d.substring(0,10);
			var d2 = d.substring(11, 19);
			var arr = d1.split('-');
			d = arr[2] + '/' + arr[1] + '/' + arr[0] + ' ' + d2;
		}
		return d;
	},
	/** Chuyen dinh dang thoi gian */
	formatMonth: function(d){
		if(d != null || d != undefined){
			d = d.substring(0,10);
			d = d.split('-');
			d = d[1] + '/' + d[0];
		}
		return d;
	},
	/** So sanh 2 thang 
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
	/** Kiem tra gia tri co phai la dinh dang ngay theo format	  */
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
	/** Chuyen string to date */
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
			var currentDate =new Date(sysDateFromDB);
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
var MaskManager= {
	maskDate: function(selector){
		$(selector).mask("99/99/9999");
	},
	maskMonth: function(selector){
		$(selector).mask("99/9999");
	},
	maskPrice: function(selector){
		$(selector).mask("999999/99999");
	}
};

/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.date.utils.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.tree-utils.js
 */
/**
 * 
 */
var TreeUtils = {
	/*****************************	COMBO TREE ****************************************/
	/**
	 * @see COMBO CAY DON VI
	*/
		
	loadComboTreeShop: function(controlId, storeCode,defaultValue,callback,params,returnCode,isTitle){		 
		var _url= '/rest/catalog/shop/combotree/0/1/0.json';
		if(isTitle!=undefined && isTitle!=null && isTitle == true){
			_url= '/rest/catalog/shop/combotree/1/1/0.json';
		}
		$('#' + controlId).combotree({url: _url,
			onChange: function(newValue,oldValue){
				if(params != null && params.length >0){
					for(var i=0;i<params.length;i++){
						$('#'+params[i]).val('');
					}
				}
			}
		});
		var t = $('#'+ controlId).combotree('tree');
		t.tree('options').url = '';
		t.tree({			
			onSelect:function(node){
				var data = new Object();
				if(node.attributes != null) {
					data = node.attributes.shop;
				} else {
					data.id= node.id;
				}
				if(callback!=undefined && callback!=null){
					callback.call(this, data);
				}
				if(returnCode) {
					$('#'+storeCode).val(data.shopCode);
				} else {
					$('#'+storeCode).val(node.id);	
				}	
				$('#'+controlId).combotree('setValue',data.shopCode);
			},
			onBeforeExpand:function(result){	            					
				var nodes = t.tree('getChildren',result.target);
				for(var i=0;i<nodes.length;++i){
					t.tree('remove',nodes[i].target);
				}
				var ___jaxurl = '/rest/catalog/shop/combotree/0/2/';
				$.ajax({
					type : "POST",
					url : ___jaxurl + result.id +'.json',					
					dataType : "json",
					success : function(r) {						
						$(r).each(function(i,e){
							e.text = Utils.XSSEncode(e.text);
						});
						t.tree('append',{
							parent:result.target,
							data:r
						});
						var node=t.tree('getNode',result.target);
						$(node.target).next().css('display','block');
					}
				});
			},
			onExpand: function(result){	
			}
		});
		if(defaultValue == undefined || defaultValue == null){
			$('#' + controlId).combotree('setValue',activeType.ALL);
		} else {
			$('#' + controlId).combotree('setValue',defaultValue);
		}
	},
	loadComboTreeShopHasTitle: function(controlId, storeCode,callback, returnCode){
		TreeUtils.loadComboTreeShop(controlId, storeCode, null, callback, null, returnCode, true);
	},
	
	/**
	 * @see CAY DIA BAN
	*/
	loadComboTreeArea: function(controlId, storeCode,defaultValue,callback,params,isTitle){		 
		var _url= '/rest/catalog/area/combotree/0/0.json';
		if(isTitle!=undefined && isTitle!=null && isTitle == true){
			_url= '/rest/catalog/area/combotree/1/0.json';
		}
		$('#' + controlId).combotree({url: _url,
			onChange: function(newValue,oldValue){
				if(params != null && params.length >0){
					for(var i=0;i<params.length;i++){
						$('#'+params[i]).val('');
					}
				}
			}
		});
		var t = $('#'+ controlId).combotree('tree');	
		t.tree('options').url = '';
		t.tree({			
			onSelect:function(node){
				var data = new Object();
				if(node.attributes != null) {
					data = node.attributes.area;
				} else {
					data.id= node.id;
				}
				if(callback!=undefined && callback!=null){
					callback.call(this, data);
				}
				$('#'+storeCode).val(node.id);				
			},	            				
			onBeforeExpand:function(result){	            					
				var nodes = t.tree('getChildren',result.target);
				for(var i=0;i<nodes.length;++i){
					t.tree('remove',nodes[i].target);
				}
				var ___jaxurl = '/rest/catalog/area/combotree/0/';
				$.ajax({
					type : "POST",
					url : ___jaxurl + result.id +'.json',					
					dataType : "json",
					success : function(r) {						
						t.tree('append',{
							parent:result.target,
							data:r
						});
						var node=t.tree('getNode',result.target);
						$(node.target).next().css('display','block');
					}
				});
			},
			onExpand: function(result){	
			}
		});
		if(defaultValue == undefined || defaultValue == null){
			$('#' + controlId).combotree('setValue',activeType.ALL);
		} else {
			$('#' + controlId).combotree('setValue',defaultValue);
		}
	},
	loadComboTreeAreaHasTitle: function(controlId, storeCode,defaultValue,callback){
		TreeUtils.loadComboTreeArea(controlId, storeCode, defaultValue, callback, null, true);
	},
	loadComboTreeAreaForUnitTree: function(controlId, storeCode,defaultValue,callback,params,isTitle,callbackSuccess,isTreeLoading){	
		var _urlLstAreaId ='';
		if(defaultValue == undefined || defaultValue == null){
			_urlLstAreaId = '/rest/catalog/area/combotree/0/list.json';
		} else {
			_urlLstAreaId =  '/rest/catalog/area/combotree/'+ defaultValue +'/list.json';
		}
		Utils.getJSON(_urlLstAreaId, function(lstAreaId){
			TreeUtils._lstAreaId = new Array();
			if(lstAreaId.length > 0){
				for(var i = 0; i<lstAreaId.length; ++i) {
					TreeUtils._lstAreaId.push(lstAreaId[i]);
				}
			}
			var _url= '/rest/catalog/area/combotree/0/0.json';
			if(isTitle!=undefined && isTitle!=null && isTitle == true){
				_url= '/rest/catalog/area/combotree/1/0.json';
			}
			$('#' + controlId).combotree({url: _url,
				onChange: function(newValue,oldValue){
					if(params != null && params.length >0){
						for(var i=0;i<params.length;i++){
							$('#'+params[i]).val('');
						}
					}
				}
			});
			var t = $('#'+ controlId).combotree('tree');	
			t.tree('options').url = '';
			t.tree({
				onSelect:function(node){
					var data = new Object();
					if(node.attributes != null) {
						data = node.attributes.area;
					} else {
						data.id= node.id;
					}
					if(callback!=undefined && callback!=null){
						callback.call(this, data);
					}
					$('#'+storeCode).val(node.id);				
				},	            				
				onBeforeExpand:function(result){
					if(isTreeLoading != null && isTreeLoading != undefined){
						$('#treeLoading').show();
					}
					var nodes = t.tree('getChildren',result.target);
					for(var i=0;i<nodes.length;++i){
						t.tree('remove',nodes[i].target);
					}
					var ___jaxurl = '/rest/catalog/area/combotree/0/';
					$.ajax({
						type : "POST",
						url : ___jaxurl + result.id +'.json',					
						dataType : "json",
						success : function(r) {						
							t.tree('append',{
								parent:result.target,
								data:r
							});
							var node=t.tree('getNode',result.target);
							$(node.target).next().css('display','block');
						}
					});
				},
				onLoadSuccess : function(node,data) {
					if(TreeUtils._lstAreaId.length> 1) {
						var node = t.tree('find', TreeUtils._lstAreaId.pop());
			    		t.tree('expand',node.target);
					} else if (TreeUtils._lstAreaId.length== 1){
						$('#' + controlId).combotree('setValue',defaultValue);
						if(callbackSuccess!=undefined && callbackSuccess!=null){
							callbackSuccess.call(this);
						}
					} else {
						$('#' + controlId).combotree('setValue',activeType.ALL);
						if(callbackSuccess!=undefined && callbackSuccess!=null){
							callbackSuccess.call(this);
						}
					}
					$('#treeLoading').hide();
				},
				onExpand: function(result){	
					
				}
			});
			
		});
	},
	loadComboTreeAreaForUnitTreeHasTitle: function(controlId, storeCode,defaultValue,callback,callbackSuccess,isTreeLoading){
		TreeUtils.loadComboTreeAreaForUnitTree(controlId, storeCode, defaultValue, callback, null, true,callbackSuccess,isTreeLoading);
	},
	
	/**
	 * @see CAY TUYEN
	*/
	isLoad :null,
	loadRoutingTree: function(controlId,storeCode, shopId, defaultValue,callback){
		var groupId = 0;
		if($('#chooseGroup').val() != "" && $('#chooseGroup').val().length > 0){
			groupId = $('#chooseGroup').val();
		}
		var url = "";
		if(Utils.isEmpty(shopId)) {
			url = '/rest/catalog/routing-tree/supervisor/.json'; 
		} else {
			url = '/rest/catalog/routing-tree/supervisor/' + shopId + '/' + groupId + '.json'; 
		}
		$('#'+ controlId).tree({ 
			url: url,
			lines: true,
			onSelect:function(node){
				if(TreeUtils.isLoad == null) {
					if(callback!=undefined && callback!=null && node != null){
						callback.call(this, node.id);
					}
					if(storeCode != undefined  && storeCode != null && node != null) {
						$('#'+storeCode).val(node.id);				
					}
				} else {
					if(storeCode != undefined  && storeCode != null && node != null) {
						$('#'+storeCode).val(node.id);				
					}
					TreeUtils.isLoad = null;
				}
				var dom = $('#createRoutingPage');
				if (dom != undefined && dom != null && dom.val() == 1){
					SuperviseManageRouteCreate.resetCheckAll();
				}
			},	 
			onLoadSuccess:function(node,data){
				if(defaultValue != undefined  && defaultValue != null) {
					var node = $('#'+ controlId).tree('find', defaultValue);
					TreeUtils.isLoad = 1;
		    		if(node!=null){
		    			 $('#'+ controlId).tree('select', node.target);
		    		}
				}
			},
			onContextMenu:function(e, node){
				var dom = $('#createRoutingPage');
				if (dom != undefined && dom != null && dom.val() == 1){
					e.preventDefault();
//					if($('#supervisorUser').val() == 'true'){
						e.preventDefault();
						$('#routingTree').tree('select', node.target);
						$('#contextMenu').menu('show', {
							left : e.pageX-5,
							top : e.pageY-5
						});
						$('#contextMenu').css('height', 'auto');
//					}
				}
			},
			formatter: function(node){
				return Utils.XSSEncode(node.text);
			}
		}); 
	}
};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.tree-utils.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.superviseshopGridFormatter.js
 */
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
		return "<a href='javascript:void(0)' onclick=\"return SuperviseManageRouteCreate.viewSelecetNodeTree("+rowObject.routingId+")\"><img width='16' height='16' src='" + WEB_CONTEXT_PATH + "/resources/images/edit.svg' title = '"+msgXemChiTiet+"' /></a>";
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
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.superviseshopGridFormatter.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.common.js
 */
var CommonSearchUnitTree = {
	_currentSearchCallback : null,
	params : null,
	_mapCheckProduct:new Map(),
	_xhrReport:null,
	_listCustomer:null,
	_isCheckAll: false,
	_isDisplaySearchStyle2EasyUIDialog: false,
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
	        	CommonSearchUnitTree._isDisplaySearchStyle2EasyUIDialog = true;

	        	// Event when press Enter
	        	$(window).bind('keypress',function(event){
		    		if (event.keyCode == keyCodes.ENTER ) {
		    			if(CommonSearchUnitTree._isDisplaySearchStyle2EasyUIDialog) {
		     				var focusedElement = $(':focus');
		     				if( focusedElement.length == 0 || focusedElement.attr('id') == 'btnSearchStyle2EasyUI'
		     					|| focusedElement.attr('id') == 'searchStyle2EasyUICode' || focusedElement.attr('id') == 'searchStyle2EasyUIName') {
		     					$('#btnSearchStyle2EasyUI').click();
		     				}
		     			return false;
		    			}
		     		}
		    		return true;
		       	});
	        	$('#btnSearchStyle2EasyUI').bind('keyup',function(event){
	    	 		if(event.keyCode == keyCodes.ENTER){
	    	 			$('#btnSearchStyle2EasyUI').click();
	    	 		}
	    	 	});
	        	$('#btnSearchStyle2EasyUIClose1').bind('keyup',function(event){
	    	 		if(event.keyCode == keyCodes.ENTER){
	    	 			$('#btnSearchStyle2EasyUIClose1').click();
	    	 		}
	    	 	});
	        	$('#btnSearchStyle2EasyUIUpdate').bind('keyup',function(event){
	    	 		if(event.keyCode == keyCodes.ENTER){
	    	 			$('#btnSearchStyle2EasyUIUpdate').click();
	    	 		}
	    	 	});
	        	
	        	$('#searchStyle2EasyUICode').val('');
				$('#searchStyle2EasyUIName').val('');
				
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
//						rownumbers : true, 
						checkOnSelect :false,
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
							 {field:'id',checkbox:true, align:'center',sortable : false,resizable : false},
							{field:'rownum', title: msgSTT, width: Paid._widthWindow*4/100, align: 'center',formatter:function(value,row,index){
								var page = $('#searchStyle2EasyUIContainerGrid .pagination-num')[0].value;
	                            return (page != 0 ? (page*10-10 +index +1) : index +1);
							}},
					        {field:codeField,title:codeText,align:'left', width:150, sortable : false,resizable : false, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},  
					        {field:nameField,title:nameText,align:'left', width:400, sortable : false,resizable : false, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }} ,
					    ]],
					    onSelect : function(rowIndex, rowData) {
					    	$('#datagrid-row-r20-2-'+rowIndex+'').addClass('datagrid-row-selected-custom');
					    	if (callbackSelect != null){
					    		callbackSelect.call(this, rowIndex, rowData);
					    	}else{
					    		var selectedId = rowData['id'];
						    	CommonSearchUnitTree._mapMutilSelect.put(selectedId, rowData);
					    	}
					    },
					    onUnselect : function(rowIndex, rowData) {
					    	$('#datagrid-row-r20-2-'+rowIndex+'').removeClass('datagrid-row-selected-custom');
					    	var selectedId = rowData['id'];
					    	CommonSearchUnitTree._mapMutilSelect.remove(selectedId);
					    },
					    onSelectAll : function(rows) {
					    	CommonSearchUnitTree._isCheckAll = true;
					    	if($.isArray(rows)) {
					    		for(var i = 0; i < rows.length; i++) {
					    			$('#datagrid-row-r20-2-'+i+'').addClass('datagrid-row-selected-custom');
					    			var row = rows[i];
					    			var selectedId = row['id'];
							    	CommonSearchUnitTree._mapMutilSelect.put(selectedId, row);
					    		}
					    	}
					    },
					    onUnselectAll : function(rows) {
					    	CommonSearchUnitTree._isCheckAll = false;
					    	if($.isArray(rows)) {
					    		for(var i = 0; i < rows.length; i++) {
					    			$('#datagrid-row-r20-2-'+i+'').removeClass('datagrid-row-selected-custom');
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
				    		var id = 110;	
				    		$('.datagrid-cell-check input[name="id"]').each(function () {
								$(this).wrap('<label class="el-checkbox el-checkbox-lg"></label>');
								$(this).after('<span class="el-checkbox-style el-lebel" tabindex="'+id+'"></span></label>');
				    		});
							if($('.datagrid-header-check').find('label.el-checkbox').length == 0){
								$('.datagrid-header-check input[type=checkbox]').each(function () {
									$(this).wrap('<label class="el-checkbox el-checkbox-lg"></label>');
									$(this).after('<span class="el-checkbox-style el-lebel" tabindex="109"></span></label>');
							  });
							};
							
							// Set event keypress space for checkbox				
							$('#searchStyle2EasyUIContainerGrid label').keypress(function(event) {	
							    var keycode = (event.keyCode ? event.keyCode : event.which);			
							    if (keycode == 32) {
							    	$(this).click();
							    	if ($(this).children('input').attr('name') != 'id') {
							    		if (CommonSearchUnitTree._isCheckAll == false) {
							    			$('#searchStyle2EasyUIGrid').datagrid('checkAll');
							    		}
							    		else {
							    			$('#searchStyle2EasyUIGrid').datagrid('uncheckAll');
							    		}
							    	}
								    }
							    return false;
								});
							
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
//				    		// Add tabindex for footer table				
							if($('#searchStyle2EasyUIContainerGrid .datagrid-pager').find('a.l-btn').length > 0){
									$('#searchStyle2EasyUICode').attr('tabindex',1);
						        	$('#searchStyle2EasyUIName').attr('tabindex',2);
						        	$('#btnSearchStyle2EasyUI').attr('tabindex',3);
						        	
									$('#searchStyle2EasyUIContainerGrid .datagrid-pager').find('a.l-btn').eq(0).attr('tabindex',1910);
									$('#searchStyle2EasyUIContainerGrid .datagrid-pager').find('a.l-btn').eq(1).attr('tabindex',1911);
									$('#searchStyle2EasyUIContainerGrid .datagrid-pager').find('input.pagination-num').attr('tabindex',1912);
									$('#searchStyle2EasyUIContainerGrid .datagrid-pager').find('a.l-btn').eq(2).attr('tabindex',1913);
									$('#searchStyle2EasyUIContainerGrid .datagrid-pager').find('a.l-btn').eq(3).attr('tabindex',1914);
									$('#searchStyle2EasyUIContainerGrid .datagrid-pager').find('a.l-btn').eq(4).attr('tabindex',1915);
									$('#btnSearchStyle2EasyUIClose1').attr('tabindex',1916);
						        	$('#btnSearchStyle2EasyUIUpdate').attr('tabindex',1917);
								
							}
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
	        	CommonSearchUnitTree._isDisplaySearchStyle2EasyUIDialog = false;
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
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.common.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.common.business.js
 */
var CommonSearch = {
	_currentSearchCallback : null,
	_arrParams : null,
	_mapCheckProduct:new Map(),
	_xhrReport:null,
	_listCustomer:null,
	divId : null,
	getResultSeachStyle1EasyUIDialog : function(rowIndex,divId) {
		var grid = $('.easyui-dialog #searchStyle1Grid');
		grid.datagrid('unselectAll');
		grid.datagrid('selectRow',rowIndex);
		var row = grid.datagrid('getSelected');		
		var obj = {};
		obj.code = row[$('.easyui-dialog #searchStyle1CodeText').val()];
		obj.name = row[$('.easyui-dialog #searchStyle1NameText').val()];
		obj.id = row[$('.easyui-dialog #searchStyle1IdText').val()];
		if (CommonSearch._currentSearchCallback != null) {
			//$('.easyui-dialog').dialog('close');
			//	tuannd20
			var dialog = $('.easyui-dialog:has(:parent:visible)');
			if(divId != null && divId != undefined){
				dialog = divId;
			}
			if ($(dialog).length != 0){
				$(dialog).dialog('close');
			} else {
				$('.easyui-dialog').dialog('close');
			}
			//			
			CommonSearch._currentSearchCallback.call(this, obj);
		}
		return false;
	},
	openSearchStyle1Dialog : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, addressText, addressFieldText) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				isFromBKPTHNVGH = false;//lampv

				$('#searchStyle1').html('');
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.fancybox-inner #searchStyle1AddressText').val(addressFieldText);
					$('.fancybox-inner #seachStyle1AddressLabel').show();
					$('.fancybox-inner #seachStyle1Address').show();
					$('.fancybox-inner #btnSearchStyle1').css('margin-left', 45);
				}
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var addressField = 'address';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					addressField = addressFieldText;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				$('.fancybox-inner #seachStyle1AddressLabel').html(addressText);
				
				Utils.bindAutoSearch();
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam, ''),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
				          			}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : addressField,index : addressField,label : addressText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatter},
						            {name : 'id',index : 'id',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$(".fancybox-overlay").scrollTop(0);
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
										
										
										var fancyHeight = $('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('height');
										fancyHeight = parseInt(fancyHeight);
										var wWidth = window.innerWidth;
										wWidth = parseInt(wWidth);
										var wHeight = window.innerHeight;
										wHeight = parseInt(wHeight);
										var distant = wHeight - fancyHeight;
										distant = distant / 2;
										
										setTimeout(function(){
											$(".fancybox-overlay").scrollTop(0);
										}, 500);
										/*if(wHeight > fancyHeight) {
											var tm = setTimeout(function() {
												//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
												$(window).resize();
												$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop +  distant}, 50);
											}, 10);				
										} else {
											var tm = setTimeout(function() {
												//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
												$(window).resize();
												$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop}, 50);
											}, 10);	
										}*/
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				} else {
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
									}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatter},
						            {name : 'id',index : 'id',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				}
				$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle1Code').val().trim();
					var name = $('.fancybox-inner #seachStyle1Name').val().trim();
					var address = $('.fancybox-inner #seachStyle1Address').val().trim();
					var url = '';
					if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams,address);
					} else {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
					}
					$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle1Code').focus();
				});
				//$.fancybox.update();
			},
			afterClose : function() {
				isFromBKPTHNVGH = true;//lampv
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle1').html(html);
			}
		});
		return false;
	},
	openSearchStyle1EasyUIDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam,idFieldText,addressText, addressFieldText) {
		$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyle1EasyUIDialogDiv').show();
		var html = $('#searchStyle1EasyUIDialogDiv').html();
		$('#searchStyle1EasyUIDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        position: 'top',
	    	height:500,
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyle1Code').focus();
				$('.easyui-dialog #searchStyle1Url').val(url);
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				$('.easyui-dialog #searchStyle1IdText').val(idFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.easyui-dialog #searchStyle1AddressText').val(addressFieldText);
					$('.easyui-dialog #seachStyle1AddressLabel').show();
					$('.easyui-dialog #seachStyle1Address').show();					
				}
				$('.easyui-dialog #btnSearchStyle1').css('margin-left', 270);
				$('.easyui-dialog #btnSearchStyle1').css('margin-top', 5);				
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var idField = 'id';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if (idFieldText != null&& idFieldText != undefined && idFieldText.length > 0) {
					idField = idFieldText;
				}
				Utils.bindAutoSearch();
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
//				Utils.bindAutoSearch();
				$('.easyui-dialog #searchStyle1Grid').show();
				$('.easyui-dialog #searchStyle1Grid').datagrid({
					url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :true,
					pagination:true,
					pageSize : 10,
					pageList: [10,20,30,40,50],
					scrollbarSize : 0,
					singleSelect:true,
					pageNumber:1,
					fitColumns:true,
					queryParams:{
						page:1
					},
					width : ($('#searchStyle1EasyUIDialog').width() - 40),
				    columns:[[  
				        {field:codeField,title:codeText,align:'left', width:110, sortable : false,resizable : false,
				        	formatter:function(val, row) {
				        		return Utils.XSSEncode(val);
				        	}
				        },  
				        {field:nameField,title:nameText,align:'left', width:$('#searchStyle1EasyUIDialog').width() - 25 - 110 - 80, sortable : false,resizable : false,
				        	formatter:function(val, row) {
				        		return Utils.XSSEncode(val);
				        	}
				        },				        
				        {field:'select', title:CreateSalePlan_chon, width:80, align:'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterEasyUIDialog},
				        {field :idField,hidden : true},
				    ]],
				    onLoadSuccess :function(){
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);	
			    		 updateRownumWidthForJqGrid('.easyui-dialog');
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
//			    		 $(window).resize();
//			    		 var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height() + 600;
//			        	    $('.window-mask').css("height",height);
			        	setTimeout(function() {
			        		var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height()+500;
				        	    $('.window-mask').css("height",height);
			        		}, 1000);
				    }
				});
				/*$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :'', name: '',address:''});*/
				$('.easyui-dialog #btnSearchStyle1').bind('click',function(event) {
					if(!$(this).is(':hidden')){
						var code = $('.easyui-dialog #seachStyle1Code').val().trim();
						var name = $('.easyui-dialog #seachStyle1Name').val().trim();
						var address = $('.easyui-dialog #seachStyle1Address').val().trim();
						$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :code, name: name,address:address});						
						$('.easyui-dialog #seachStyle1Code').focus();
					}					
				});
				$('.easyui-dialog #btnClose').bind('click',function(event) {
					$('#searchStyle1EasyUIDialogDiv').css("visibility", "hidden");
					$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{pageNumber:1});
					$('.easyui-dialog').dialog('close');
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
				$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{	
					pageSize: 10
				});
	        },
	        onClose : function(){
	        	$('#searchStyle1EasyUIDialogDiv').html(html);
	        	$('#searchStyle1EasyUIDialogDiv').hide();
	        	$('#searchStyle1ContainerGrid').html('<table id="searchStyle1Grid" class="easyui-datagrid" style="width: 520px;"></table><div id="searchStyle1Pager"></div>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');	        	
	        }
	    });
		return false;
	},
	openSearchProductOnDialog1 : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam,idFieldText,addressText, addressFieldText) {
		$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyle1EasyUIDialogDiv').show();
		var html = $('#searchStyle1EasyUIDialogDiv').html();
		$('#searchStyle1EasyUIDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyle1Code').focus();
				$('.easyui-dialog #searchStyle1Url').val(url);
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				$('.easyui-dialog #searchStyle1IdText').val(idFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.easyui-dialog #searchStyle1AddressText').val(addressFieldText);
					$('.easyui-dialog #seachStyle1AddressLabel').show();
					$('.easyui-dialog #seachStyle1Address').show();					
				}
				$('.easyui-dialog #btnSearchStyle1').css('margin-left', 270);
				$('.easyui-dialog #btnSearchStyle1').css('margin-top', 5);				
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var idField = 'id';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if (idFieldText != null&& idFieldText != undefined && idFieldText.length > 0) {
					idField = idFieldText;
				}
				Utils.bindAutoSearch();
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
//				Utils.bindAutoSearch();
				$('.easyui-dialog #searchStyle1Grid').show();
				$('.easyui-dialog #searchStyle1Grid').datagrid({
					url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :true,
					pagination:true,
					pageSize : 10,
					pageList: [10,20,30,40,50],
					scrollbarSize : 0,
					singleSelect:true,
					pageNumber:1,
					fitColumns:true,
					queryParams:{
						page:1
					},
					width : ($('#searchStyle1EasyUIDialog').width() - 40),
				    columns:[[  
				        {field:'categoryCode',title:'Ngành',align:'left', width:110, sortable : false,resizable : false,
				        	formatter:function(val, row) {
				        		return Utils.XSSEncode(val);
				        	}
				        },
				        {field:codeField,title:codeText,align:'left', width:110, sortable : false,resizable : false,
				        	formatter:function(val, row) {
				        		return Utils.XSSEncode(val);
				        	}
				        },  
				        {field:nameField,title:nameText,align:'left', width:$('#searchStyle1EasyUIDialog').width() - 25 - 110 - 80, sortable : false,resizable : false,
				        	formatter:function(val, row) {
				        		return Utils.XSSEncode(val);
				        	}
				        },				        
				        {field:'select', title:CreateSalePlan_chon, width:80, align:'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterEasyUIDialog},
				        {field :idField,hidden : true},
				    ]],
				    onLoadSuccess :function(){
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);	
			    		 updateRownumWidthForJqGrid('.easyui-dialog');
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
//			    		 $(window).resize();
//			    		 var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height() + 600;
//			        	    $('.window-mask').css("height",height);
			        	setTimeout(function() {
			        		var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height()+500;
				        	    $('.window-mask').css("height",height);
			        		}, 1000);
				    }
				});
				/*$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :'', name: '',address:''});*/
				$('.easyui-dialog #btnSearchStyle1').bind('click',function(event) {
					if(!$(this).is(':hidden')){
						var code = $('.easyui-dialog #seachStyle1Code').val().trim();
						var name = $('.easyui-dialog #seachStyle1Name').val().trim();
						var address = $('.easyui-dialog #seachStyle1Address').val().trim();
						$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :code, name: name,address:address});						
						$('.easyui-dialog #seachStyle1Code').focus();
					}					
				});
				$('.easyui-dialog #btnClose').bind('click',function(event) {
					$('#searchStyle1EasyUIDialogDiv').css("visibility", "hidden");
					$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{pageNumber:1});
					$('.easyui-dialog').dialog('close');
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
				$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{	
					pageSize: 10
				});
	        },
	        onClose : function(){
	        	$('#searchStyle1EasyUIDialogDiv').html(html);
	        	$('#searchStyle1EasyUIDialogDiv').hide();
	        	$('#searchStyle1ContainerGrid').html('<table id="searchStyle1Grid" class="easyui-datagrid" style="width: 520px;"></table><div id="searchStyle1Pager"></div>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');	        	
	        }
	    });
		return false;
	},
	openSearchStyle1DialogForStaff : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, objectStaff) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('#searchStyle1').html('');
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(objectStaff!=undefined && objectStaff!=null){
					DebitPayReport._objectStaff = objectStaff;
				}else{
					DebitPayReport._objectStaff = null;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				
				Utils.bindAutoSearch();
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
									}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForStaff},
						            {name : 'staffCode',index : 'staffCode',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle1Code').val().trim();
					var name = $('.fancybox-inner #seachStyle1Name').val().trim();
					var address = $('.fancybox-inner #seachStyle1Address').val().trim();
					var url = '';
					url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
					$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle1Code').focus();
				});
								//$.fancybox.update();
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle1').html(html);
			}
		});
		return false;
	},
	openSearchStyle1DialogForSupervisorStaff : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, addressText, addressFieldText) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('#searchStyle1').html('');
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.fancybox-inner #searchStyle1AddressText').val(addressFieldText);
					$('.fancybox-inner #seachStyle1AddressLabel').show();
					$('.fancybox-inner #seachStyle1Address').show();
					$('.fancybox-inner #btnSearchStyle1').css('margin-left', 45);
				}
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var addressField = 'address';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					addressField = addressFieldText;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				$('.fancybox-inner #seachStyle1AddressLabel').html(addressText);
				
				Utils.bindAutoSearch();
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
				          			}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForSupervisorStaff},
						            {name : 'staffCode',index : 'staffCode',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle1Code').val().trim();
					var name = $('.fancybox-inner #seachStyle1Name').val().trim();
					var address = $('.fancybox-inner #seachStyle1Address').val().trim();
					var url = '';
					if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams,address);
					} else {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
					}
					$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle1Code').focus();
				});
								//$.fancybox.update();
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle1').html(html);
			}
		});
		return false;
	},
	openSearchStyle1DialogForCustomer : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, addressText, addressFieldText) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('#searchStyle1').html('');
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.fancybox-inner #searchStyle1AddressText').val(addressFieldText);
					$('.fancybox-inner #seachStyle1AddressLabel').show();
					$('.fancybox-inner #seachStyle1Address').show();
					$('.fancybox-inner #btnSearchStyle1').css('margin-left', 45);
				}
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var addressField = 'address';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					addressField = addressFieldText;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				$('.fancybox-inner #seachStyle1AddressLabel').html(addressText);
				
				Utils.bindAutoSearch();
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam, ''),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
				          			}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : addressField,index : addressField,label : addressText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForCustomer},
						            {name : 'shortCode',index : 'shortCode',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
										
										var fancyHeight = $('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('height');
										fancyHeight = parseInt(fancyHeight);
										var wWidth = window.innerWidth;
										wWidth = parseInt(wWidth);
										var wHeight = window.innerHeight;
										wHeight = parseInt(wHeight);
										var distant = wHeight - fancyHeight;
										distant = distant / 2;
										if(wHeight > fancyHeight) {
											var tm = setTimeout(function() {
												//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
												$(window).resize();
												$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop +  distant}, 50);
											}, 10);				
										} else {
											var tm = setTimeout(function() {
												//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
												$(window).resize();
												$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop}, 50);
											}, 10);	
										}
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle1Code').val().trim();
					var name = $('.fancybox-inner #seachStyle1Name').val().trim();
					var address = $('.fancybox-inner #seachStyle1Address').val().trim();
					var url = '';
					if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams,address);
					} else {
						url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
					}
					$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle1Code').focus();
				});
								//$.fancybox.update();
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle1').html(html);
			}
		});
		return false;
	},
	openSearchStyle1DialogForProduct : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, objectProduct) {
		var html = $('#searchProduct').html();
		$(window).unbind('keyup');
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('#searchProduct').html('');
				$('.fancybox-inner #searchProductCode').focus();
				$('.fancybox-inner #searchProductUrl').val(url);
				
				$('.fancybox-inner #searchProductCodeText').val(codeFieldText);
				$('.fancybox-inner #searchProductNameText').val(nameFieldText);
				$('.fancybox-inner #productSelect').bind('click',function(){
					var stR = "";
					if(CRMReportDSPPTNH._listProductCode.length > 0){
						for (var i=0; i< CRMReportDSPPTNH._listProductCode.length; i ++){
							stR += CRMReportDSPPTNH._listProductCode[i];
							if (i != CRMReportDSPPTNH._listProductCode.length-1) stR +=";";
						}
						$('#productCode').val(stR);
						$.fancybox.close();
					}else{
						$('#errProDiaMsg').html('Vui lòng chọn sản phẩm').show();
					}
				});
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(objectProduct!=undefined && objectProduct!=null){
					DebitPayReport._objectProduct = objectProduct;
				}else{
					DebitPayReport._objectProduct = null;
				}
				$('.fancybox-inner #searchProductCodeLabel').html(codeText);
				$('.fancybox-inner #searchProductNameLabel').html(nameText);
				
				Utils.bindAutoSearch();
					$(".fancybox-inner #searchProductGrid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
				          			}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForProduct},
						            {name : 'productCode',index : 'productCode',hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchProductPager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchProductContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchProductGrid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchProductPager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchProductPager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
									}												
								}).navGrid($('.fancybox-inner #searchProductPager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchProduct').bind('click',function(event) {
					$('#errProDiaMsg').html('').hide();
					var code = $('.fancybox-inner #searchProductCode').val().trim();
					var name = $('.fancybox-inner #searchProductName').val().trim();
					var address = $('.fancybox-inner #searchProductAddress').val().trim();
					var url = '';
					url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchProductUrl').val().trim(),code,name,CommonSearch._arrParams);
					$(".fancybox-inner #searchProductGrid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #searchProductCode').focus();
				});
								//$.fancybox.update();
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchProduct').html(html);
				ReportUtils.bindEnterOnWindow();
			}
		});
		return false;
	},
	openSearchStyle1DialogForSubCat : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, objectSubCat) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('#searchStyle1').html('');
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if(objectSubCat!=undefined && objectSubCat!=null){
					DebitPayReport._objectSubCat = objectSubCat;
				}else{
					DebitPayReport._objectSubCat = null;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				
				Utils.bindAutoSearch();
					$(".fancybox-inner #searchStyle1Grid").jqGrid({
						url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
						colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  			return Utils.XSSEncode(cellvalue);
				          			}},
						            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
						            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForSubCat},
						            {name : codeFieldText,index : codeFieldText,hidden : true}
						            ],
						            pager : $('.fancybox-inner #searchStyle1Pager'),
									height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
									gridComplete : function() {
										$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
										$('#pg_searchStyle1Pager').css('padding-right','20px');																	
										tabindex = 1;
										$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
											if (this.type != 'hidden') {
											$(this).attr("tabindex", '');
											tabindex++;
											}
										});
										updateRownumWidthForJqGrid('.fancybox-inner');
										$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
										
										//$.fancybox.update();
										$(window).resize();
									}												
								}).navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle1Code').val().trim();
					var name = $('.fancybox-inner #seachStyle1Name').val().trim();
					var address = $('.fancybox-inner #seachStyle1Address').val().trim();
					var url = '';
					url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
					$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle1Code').focus();
				});
								//$.fancybox.update();
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle1').html(html);
			}
		});
		return false;
	},
	openSearchStyle1DialogForDisplay : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam) {
		var html = $('#searchStyle1').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				ProgrammeDisplayCatalog._mapCheckSubCat = new Map();// danh sach check box nganh hang con
				Utils.bindAutoSearch();
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				
				//end <reset tabindex>
				$('.fancybox-inner .BoxDialogBtm .ButtonSection').html("<button class='BtnGeneralStyle BtnGeneralCStyle BtnGeneralMStyle Sprite2' onclick='return CommonSearch.getResultSeachStyle1ForDisplay()'><span class='Sprite2'>Lưu</span></button> "+$('.fancybox-inner .BoxDialogBtm .ButtonSection').html());
				$('.fancybox-inner .BoxDialogBtm').html("<p id='errMsgFancybox' class='ErrorMsgStyle Sprite1' style='display: none'></p> "+$('.fancybox-inner .BoxDialogBtm').html());
				$('#searchStyle1').html('');
				if(codeText == 'Mã ngành hàng con'){
					$('.fancybox-inner #seachStyle1Code').attr('style','width:90px;');
					$('.fancybox-inner #seachStyle1Name').attr('style','width:90px;');
					
					$('.fancybox-inner #seachStyle1CodeLabel').attr('style','width:120px;');
					$('.fancybox-inner #seachStyle1NameLabel').attr('style','width:120px;');
				}
				$('.fancybox-inner #seachStyle1Code').focus();
				$('.fancybox-inner #searchStyle1Url').val(url);
				$('.fancybox-inner #searchStyle1CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle1NameText').val(nameFieldText);
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				$('.fancybox-inner #seachStyle1CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle1NameLabel').html(nameText);
				$(".fancybox-inner #searchStyle1Grid").jqGrid({
					url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
					colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
			        	  			return Utils.XSSEncode(cellvalue);
			          			}},
					            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
						        	  return Utils.XSSEncode(cellvalue);
						          }},
					            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterForDisplay},
					            {name : 'id',index : 'id',hidden : true}
					            ],
					            pager : $('.fancybox-inner #searchStyle1Pager'),
								height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle1ContainerGrid').width()),
								gridComplete : function() {
									$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
									$('#pg_searchStyle1Pager').css('padding-right','20px');
									var tm = setTimeout(function() {
										$(window).resize();
										$.fancybox.update();
										clearTimeout(tm);
									}, 50);
									tabindex = 1;
									$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
										if (this.type != 'hidden') {
										$(this).attr("tabindex", '');
										tabindex++;
										}
									});
									updateRownumWidthForJqGrid('.fancybox-inner');
									$('#searchStyle1Pager_right').css('width','180px');//@LamNH:fix bug 0003172
								}												})
								.navGrid($('.fancybox-inner #searchStyle1Pager'),{edit : false,add : false,del : false,search : false});
								$('.fancybox-inner #btnSearchStyle1').bind('click',function(event) {
									var code = $('.fancybox-inner #seachStyle1Code').val().trim();
									var name = $('.fancybox-inner #seachStyle1Name').val().trim();
									var url = CommonSearch.getSearchStyle1GridUrl($('.fancybox-inner #searchStyle1Url').val().trim(),code,name,CommonSearch._arrParams);
									$(".fancybox-inner #searchStyle1Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
									$('.fancybox-inner #seachStyle1Code').focus();
								});
							},
							afterClose : function() {
								var tabindex = 1;
								$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
									if (this.type != 'hidden') {
										$(this).attr("tabindex", '');
									}
									tabindex ++;
								});	
								var curIdFocus = $('#cur_focus').val();
								$('#'+ curIdFocus).focus();
								CommonSearch._currentSearchCallback = null;
								ProgrammeDisplayCatalog._mapCheckSubCat = new Map();// danh sach check box nganh hang con
								$('#searchStyle1').html(html);
							}
						});
		return false;
	},
	openSearchStyle1EasyUI : function(codeText, nameText, title, url, callback,
			codeFieldText, nameFieldText, arrParam, searchDiv) {
		
		
		$(".easyui-window #searchStyle5Grid").jqGrid('GridUnload');
		$('#' + searchDiv).show();
		$('#' + searchDiv).window({title : title});
		$('#' + searchDiv).window('open');
		
		CommonSearch._arrParams = null;
		Utils.bindAutoSearchForEasyUI();
		$('.easyui-window #searchStyle1Url').val(url);
		$('.easyui-window #searchStyle1CodeText').val(codeFieldText);
		$('.easyui-window #searchStyle1NameText').val(nameFieldText);
		CommonSearch._currentSearchCallback = callback;
		CommonSearch._arrParams = arrParam;
		var codeField = 'code';
		var nameField = 'name';
		if (codeFieldText != null && codeFieldText != undefined
				&& codeFieldText.length > 0) {
			codeField = codeFieldText;
		}
		if (nameFieldText != null && nameFieldText != undefined
				&& nameFieldText.length > 0) {
			nameField = nameFieldText;
		}
		$('.easyui-window #seachStyle1CodeLabel').html(codeText);
		$('.easyui-window #seachStyle1NameLabel').html(nameText);
		$('.easyui-window #seachStyle1Code').val('');
		$('.easyui-window #seachStyle1Name').val('');
		$('.easyui-window #seachStyle4Address').val('');
		$(".easyui-window #searchStyle5Grid")
				.jqGrid(
						{
							url : CommonSearch.getSearchStyle1GridUrl(url, '','', arrParam),
							colModel : [
									{name: codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : function(cellvalue, options, rowObject) {
											return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultSeachEasyUI1(" + options.rowId + ", '" + searchDiv + "');\">Chọn</a>";
										}
									}, {name : 'id',index : 'id',hidden : true}, ],
							pager : $('.easyui-window #searchStyle5Pager'),
							rowNum : 10,
							width : ($('.easyui-window #searchStyle1ContainerGrid')
									.width()),
							gridComplete : function() {
								$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
								/*$('.easyui-window #searchStyle1ScrollBody')
										.jScrollPane();*/
								/*$('.easyui-window #searchStyle1ScrollBody .jspContainer').css('width', '476px');*/
								$('.easyui-window #seachStyle1Code').bind('keypress',Utils.unitCharactersAz094Code);
								$('.easyui-window #seachStyle1Name').bind('keypress',Utils.unitCharactersAz094Name);
								$('.easyui-window #seachStyle1Code').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('seachStyle1Code','',Utils._CODE);
										if (msg.length > 0) {$('#seachStyle1Code').val('');}
										clearTimeout(tm);
									}, 50);});
								$('.easyui-window #seachStyle1Name').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('seachStyle1Name','',Utils._NAME);
										if (msg.length > 0) {$('#seachStyle1Name').val('');}
										clearTimeout(tm);
									}, 50);});
								updateRownumWidthForJqGrid();
								var tm = setTimeout(function(){
									$('.panel').css('top', document.documentElement.scrollTop + 100);
									$('.window-shadow').css('top', document.documentElement.scrollTop + 100);
									clearTimeout(tm);
								}, 500);
							}
						}).navGrid($('.easyui-window #searchStyle5Pager'), {
					edit : false,
					add : false,
					del : false,
					search : false
				});
		$('.easyui-window #btnSearchStyle1').bind('click',function(event) {
			var code = $('.easyui-window #seachStyle1Code').val()
					.trim();
			var name = $('.easyui-window #seachStyle1Name').val()
					.trim();
			var url = CommonSearch.getSearchStyle1GridUrl($(
					'.easyui-window #searchStyle1Url').val().trim(),
					code, name, CommonSearch._arrParams);
			$(".easyui-window #searchStyle5Grid").setGridParam({
				url : url,
				page : 1
			}).trigger("reloadGrid");});
		var needReloadGrid = $('.easyui-window #needReloadGrid').val();
		if(needReloadGrid == true || needReloadGrid == 'true') {
			$(".easyui-window #searchStyle5Grid").trigger("reloadGrid");
		} else {
			$('.easyui-window #needReloadGrid').val(true);
		}
	},
	openSearchStyle1EasyUIForCustomer : function(codeText, nameText, title, url, callback,
			codeFieldText, nameFieldText, arrParam, searchDiv, addressText, addressFieldText) {
		$(".easyui-window #searchStyle5Grid").jqGrid('GridUnload');
		$('#' + searchDiv).show();
		$('#' + searchDiv).window({title : title});
		$('#' + searchDiv).window('open');
		
		CommonSearch._arrParams = null;
		Utils.bindAutoSearchForEasyUI();
		$('.easyui-window #searchStyle1Url').val(url);
		$('.easyui-window #searchStyle1CodeText').val(codeFieldText);
		$('.easyui-window #searchStyle1NameText').val(nameFieldText);
		if(addressText!=null && addressText!=undefined && addressText.length > 0
				&& addressFieldText!=null && addressFieldText != undefined && addressFieldText.length > 0){
			$('.easyui-window #searchStyle1AddressText').val(addressFieldText);
			$('.easyui-window #seachStyle1Address').show();
		}
		CommonSearch._currentSearchCallback = callback;
		CommonSearch._arrParams = arrParam;
		var codeField = 'code';
		var nameField = 'name';
		var addressField='address';
		if (codeFieldText != null && codeFieldText != undefined
				&& codeFieldText.length > 0) {
			codeField = codeFieldText;
		}
		if (nameFieldText != null && nameFieldText != undefined
				&& nameFieldText.length > 0) {
			nameField = nameFieldText;
		}
		if(addressFieldText != null && addressFieldText != undefined && addressFieldText.length > 0){
			$('.easyui-window #seachStyle1AddressLabel').show();
			addressField = addressFieldText;
		}
		$('.easyui-window #seachStyle1CodeLabel').html(codeText);
		$('.easyui-window #seachStyle1NameLabel').html(nameText);
		$(".easyui-window #searchStyle5Grid")
				.jqGrid(
						{
							url : CommonSearch.getSearchStyle1GridUrl(url, '','', arrParam),
							colModel : [
									{name: codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : addressField,index : addressField,label : addressText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : function(cellvalue, options, rowObject) {
											return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultSeachEasyUI1(" + options.rowId + ", '" + searchDiv + "');\">Chọn</a>";
										}
									}, {name : 'id',index : 'id',hidden : true}, ],
							pager : $('.easyui-window #searchStyle5Pager'),
							rowNum : 10,
							width : ($('.easyui-window #searchStyle1ContainerGrid')
									.width()),
							gridComplete : function() {
								$('#jqgh_searchStyle1Grid_rn').html(jspCustomerAttributeSTT);
								/*$('.easyui-window #searchStyle1ScrollBody')
										.jScrollPane();*/
								/*$('.easyui-window #searchStyle1ScrollBody .jspContainer').css('width', '476px');*/
								$('.easyui-window #seachStyle1Code').bind('keypress',Utils.unitCharactersAz094Code);
								$('.easyui-window #seachStyle1Name').bind('keypress',Utils.unitCharactersAz094Name);
								$('.easyui-window #seachStyle1Code').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('seachStyle1Code','',Utils._CODE);
										if (msg.length > 0) {$('#seachStyle1Code').val('');}
										clearTimeout(tm);
									}, 50);});
								$('.easyui-window #seachStyle1Name').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('seachStyle1Name','',Utils._NAME);
										if (msg.length > 0) {$('#seachStyle1Name').val('');}
										clearTimeout(tm);
									}, 50);});
								updateRownumWidthForJqGrid();
								var tm = setTimeout(function(){
									$('.panel').css('top', document.documentElement.scrollTop + 100);
									$('.window-shadow').css('top', document.documentElement.scrollTop + 100);
									clearTimeout(tm);
								}, 500);
							}
						}).navGrid($('.easyui-window #searchStyle5Pager'), {
					edit : false,
					add : false,
					del : false,
					search : false
				});
		$('.easyui-window #btnSearchStyle1').bind('click',function(event) {
			var code = $('.easyui-window #seachStyle1Code').val().trim();
			var name = $('.easyui-window #seachStyle1Name').val().trim();
			var address = '';
			if(addressText!=null && addressText!=undefined && addressText.length > 0
					&& addressFieldText!=null && addressFieldText != undefined && addressFieldText.length > 0){
				address = $('.easyui-window #seachStyle1Address').val().trim();
			}
			
			var url = CommonSearch.getSearchStyle1GridUrl($(
					'.easyui-window #searchStyle1Url').val().trim(),
					code, name, CommonSearch._arrParams,address);
			$(".easyui-window #searchStyle5Grid").setGridParam({
				url : url,
				page : 1
			}).trigger("reloadGrid");});
		var needReloadGrid = $('.easyui-window #needReloadGrid').val();
		if(needReloadGrid == true || needReloadGrid == 'true') {
			$(".easyui-window #searchStyle5Grid").trigger("reloadGrid");
		} else {
			$('.easyui-window #needReloadGrid').val(true);
		}
	},
	getSearchStyle1GridUrl : function(url, code, name, arrParam, address) {		
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '?curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		return searchUrl;
	},
	getResultSeachStyle1 : function(rowId) {
		var code = $(".fancybox-inner #searchStyle1Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle1CodeText').val());
		var name = $(".fancybox-inner #searchStyle1Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle1NameText').val());
		var id = $(".fancybox-inner #searchStyle1Grid").jqGrid('getCell',rowId, 'id');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.id = id;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$.fancybox.close();
		}
		return false;
	},
	getResultSeachStyle1ForDisplay : function() {
		var selected =new Array();
		var customerMapKey = ProgrammeDisplayCatalog._mapCheckSubCat.keyArray;
		var customerMapValue = ProgrammeDisplayCatalog._mapCheckSubCat.valArray;
		if(customerMapKey.length>0){
			for( i = 0,n=customerMapKey.length ; i < n;) {				
				selected.push(customerMapValue[i]);
				i++;
			}
			if (CommonSearch._currentSearchCallback != null) {
				CommonSearch._currentSearchCallback.call(this, selected);
			}
		}else{
			$('#errMsgFancybox').html('Bạn chưa chọn ngành hàng con nào.').show();
			var tm = setTimeout(function(){
				$('#errMsgFancybox').html('').hide();
				clearTimeout(tm);					
			}, 5000);
		}
		return false;
	},
	getResultPayrollSeachEasyUI : function(rowId, searchDiv) {
		var code = $(".easyui-window #easyTGrid").jqGrid('getCell',
				rowId, $('.easyui-window #payrollTableCodeEasy').val());
		var name = $(".easyui-window #easyTGrid").jqGrid('getCell',
				rowId, $('.easyui-window #payrollTableNameEasy').val());
		var id = $(".easyui-window #easyTGrid").jqGrid('getCell', rowId,
				'payrollId');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.id = id;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$('#' + searchDiv).window('close');
		}
		return false;
	},
	getResultSeachEasyUI1 : function(rowId, searchDiv) {
		var code = $(".easyui-window #searchStyle5Grid").jqGrid('getCell',
				rowId, $('.easyui-window #searchStyle1CodeText').val());
		var name = $(".easyui-window #searchStyle5Grid").jqGrid('getCell',
				rowId, $('.easyui-window #searchStyle1NameText').val());
		var id = $(".easyui-window #searchStyle5Grid").jqGrid('getCell', rowId,
				'id');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.id = id;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$('#' + searchDiv).window('close');
		}
		return false;
	},
	searchRouteOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã tuyến BH", "Tên tuyến BH",
				"Tìm kiếm tuyến bán hàng", WEB_CONTEXT_PATH + "/commons/route/search", callback,
				"routingCode", "routingName", arrParam);
		return false;
	},
	searchStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchStaffBCNVKBMOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/staff/search-staff-nvkbm", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},	
	searchNVBHOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên bán hàng", WEB_CONTEXT_PATH + "/commons/nvbh/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},//PhuT : search nvbh
	searchNVGSOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên giám sát", WEB_CONTEXT_PATH + "/commons/nvgs/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},//PhuT : search nvgs
	searchNVGSOnDialog2 : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên giám sát", WEB_CONTEXT_PATH + "/commons/nvgs/search2", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},//SangTN : search nvgs
	//CuongND : search GSNPP - TBHV . 
	searchGSNPPOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã GSNPP", "Tên GSNPP",
				"Tìm kiếm GSNPP", "/superviseshop/manage-trainingplanTBHV/getlistGS", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	//end: search GSNPP - TBHV
	searchPromotionOnDialog : function(callback,appParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTKM", "Tên CTKM",
				"Tìm kiếm CTKM", WEB_CONTEXT_PATH + "/commons/promotion/search", callback,
				"promotionProgramCode", "promotionProgramName",appParam);
		return false;
	},
	searchPromotionSupportOnDialog : function(callback,appParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTHTTM", "Tên CTHTTM",
				"Tìm kiếm CTHTTM", WEB_CONTEXT_PATH + "/commons/promotion/search", callback,
				"promotionProgramCode", "promotionProgramName",appParam);
		return false;
	},
	searchPayrollTemplateOnDialog: function(callback, appParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã bảng lương", "Tên bảng lương",
				"Tìm kiếm bảng lương mẫu", WEB_CONTEXT_PATH + "/commons/payroll-table/search", callback,
				"payrollTCode", "payrollTName",appParam);
	},
	searchProductOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", WEB_CONTEXT_PATH + "/commons/product/search", callback,
				"productCode", "productName", arrParam);
		return false;
	},
	searchProductInCatZOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", WEB_CONTEXT_PATH + "/commons/product-cat-z/search", callback,
				"productCode", "productName", arrParam);
		return false;
	},
	searchProductWithPriceOnDialog : function(callback, arrParam) {
		/*CommonSearch.openSearchStyle1EasyUIDialog("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", WEB_CONTEXT_PATH + "/commons/product/search-product-with-valid-price", callback,
				"productCode", "productName", arrParam);*/
		CommonSearch.openSearchProductOnDialog1("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", WEB_CONTEXT_PATH + "/commons/product/search-product-with-valid-price", callback,
				"productCode", "productName", arrParam);
		return false;
	},
	//liemtpt: Lay danh sach san pham con hieu luc co phat sinh doanh so
	searchProductHasSaleOrderOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", WEB_CONTEXT_PATH + "/commons/product/search-product-has-sale-order", callback,
				"productCode", "productName", arrParam);
		return false;
	},
	searchProductOnDialogCheckbox : function(callback, arrParam, objectProduct) {
		CommonSearch.openSearchStyle1DialogForProduct("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", WEB_CONTEXT_PATH + "/commons/product/search", callback,
				"productCode", "productName", arrParam,objectProduct);
		return false;
	},
	searchDeviceOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã thiết bị", "Tên thiết bị",
				"Tìm kiếm thiết bị", WEB_CONTEXT_PATH + "/commons/device/search", callback,
				"productCode", "productName", arrParam);
		return false;
	},
	searchShopOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", WEB_CONTEXT_PATH + "/commons/shop/search", callback, "shopCode",
				"shopName", arrParam);
		return false;
	},
	searchShopOnDialogByChannelType : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", WEB_CONTEXT_PATH + "/commons/shop/search1", callback, "shopCode",
				"shopName", arrParam);
		return false;
	},
	searchOnlyShopOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", WEB_CONTEXT_PATH + "/commons/only-shop/search", callback, "shopCode",
				"shopName", arrParam);
		return false;
	},
	searchShopOfSupervisorOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", WEB_CONTEXT_PATH + "/commons/shop-of-supervisor/search", callback, "shopCode",
				"shopName", arrParam);
		return false;
	},
	searchIncentiveProgramOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTKT", "Tên CTKT",
				"Tìm kiếm CTKT", WEB_CONTEXT_PATH + "/commons/incentive-program/search", callback, "incentiveCode",
				"incentiveName", arrParam);
		return false;
	},
	searchShopOnDialogOfStock : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", "/stock/update/search-shop", callback, "shopCode",
				"shopName", arrParam);
		return false;
	},
	searchCustomerOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, WEB_CONTEXT_PATH + "/commons/customer/search", callback,
				"shortCode", "customerName", arrParam);
		return false;
	},
	searchCustomerByShopOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, WEB_CONTEXT_PATH + "/commons/customer-in-shop/search", callback,
				"shortCode", "customerName", arrParam);
		return false;
	},
	searchCustomerByShopOnDialogEx2 : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, "/report/customer/search/customer-shop", callback,
				"shortCode", "customerName", arrParam);
		return false;
	},
	searchCustomerWithAddressOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, WEB_CONTEXT_PATH + "/commons/customer/search", callback,
				"shortCode", "customerName", arrParam, msgTuyen3, 'address');
		return false;
	},	
	searchCustomerWithAddressByShopOnDialog : function(callback, arrParam,divId, successGridCallback) {
		CommonSearch.openSearchStyle1EasyUIDialogCustomerSO(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, WEB_CONTEXT_PATH + "/commons/customer-in-shop/search", callback,
				"customerCode", "customerName", arrParam, null,msgTuyen3, 'address',divId, successGridCallback);
		return false;
	},
	//Anhdt10 them
	searchCustomerWithAddressByShopOnDialog4report : function(callback, arrParam,divId, successGridCallback) {
		CommonSearch.openSearchStyle1EasyUIDialogCustomerSO(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, WEB_CONTEXT_PATH + "/commons/customer-in-shop-report/search", callback,
				"customerCode", "customerName", arrParam, null,msgTuyen3, 'address',divId, successGridCallback);
		return false;
	},
	//
	searchCustomerWithAddressByShopOnDialogCheckbox : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialogForCustomer(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, WEB_CONTEXT_PATH + "/commons/customer-of-shop/search", callback,
				"shortCode", "customerName", arrParam, msgTuyen3, 'address');
		return false;
	},
	searchCustomerOnEasyUI : function(callback, arrParam, searchDiv) {
		CommonSearch.openSearchStyle1EasyUIForCustomer(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, WEB_CONTEXT_PATH + "/commons/customer/search", callback,
				"shortCode", "customerName", arrParam, searchDiv,msgTuyen3,"address");
	},
	searchStaffOnEasyUI : function(callback, arrParam, searchDiv) {
		CommonSearch.openSearchStyle1EasyUI("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/sale-staff/search", callback,
				"staffCode", "staffName", arrParam, searchDiv);
	},
	searchProductOnEasyUI : function(callback, arrParam, searchDiv) {
		CommonSearch.openSearchStyle1EasyUI("Mã SP", "Tên SP",
				"Tìm kiếm sản phẩm", WEB_CONTEXT_PATH + "/commons/product/search", callback,
				"productCode", "productName", arrParam, searchDiv);
	},
	searchShopOnEasyUI : function(callback, arrParam, searchDiv) {
		CommonSearch.openSearchStyle1EasyUI("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm đơn vị", WEB_CONTEXT_PATH + "/commons/shop/search", callback,
				"shopCode", "shopName", arrParam, searchDiv);
	},
	searchPayrollTableOnEasyUI : function(callback, arrParam, searchDiv) {
		CommonSearch.openSearchStyle1EasyUI("Mã bảng lương mẫu", "Tên bảng lương mẫu",
				"Tìm kiếm bảng lương mẫu", WEB_CONTEXT_PATH + "/commons/payroll-table/search", callback,
				"payrollTCode", "payrollTName", arrParam, searchDiv);
	},
	searchCategoryOnDialog : function(callback) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã ngành hàng", "Tên ngành hàng",
				"Tìm kiếm ngành hàng", WEB_CONTEXT_PATH + "/commons/category/search", callback,
				"productInfoCode", "productInfoName");
		return false;
	},
	searchSubCategoryOnDialog : function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã ngành hàng con",
				"Tên ngành hàng con", "Tìm kiếm ngành hàng con",
				"/commons/sub-category/search", callback, "productInfoCode",
				"productInfoName",arrParam);
		return false;
	},
	searchSubCategoryOnDialogCheckbox : function(callback,arrParam,objectSubCat) {
		CommonSearch.openSearchStyle1EasyUIDialogForSubCat("Mã nhãn hàng",
				"Tên nhãn hàng", "Tìm kiếm nhãn hàng",
				"/commons/sub-category/search", callback, "productInfoCode",
				"productInfoName",arrParam,objectSubCat);
		return false;
	},
	searchSubCategoryByDisplayOnDialog : function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhãn hàng",
				"Tên nhãn hàng", "Tìm kiếm nhãn hàng",
				"/commons/sub-category-by-display/search", callback, "productInfoCode",
				"productInfoName",arrParam);
		return false;
	},
	searchDisplayProgramOnDialog:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTTB",
				"Tên CTTB", "Tìm kiếm CTTB",
				"/catalog/programme-display/program/search", callback, "displayProgramCode",
				"displayProgramName",arrParam);
		return false;
	},
	searchDisplayProgramOnDialogCommons:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTTB",
				"Tên CTTB", "Tìm kiếm CTTB",
				"/commons/display-program/search", callback, "displayProgramCode",
				"displayProgramName",arrParam);
		return false;
	},	
	searchSubCategoryOnDialogDisplay : function(callback,arrParam) {
		CommonSearch.openSearchStyle1DialogForDisplay("Mã ngành hàng con",
				"Tên ngành hàng con", "Tìm kiếm ngành hàng con",
				"/commons/sub-category/search", callback, "productInfoCode",
				"productInfoName",arrParam);
		return false;
	},
	searchProvinceOnDialog : function(callback) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã tỉnh/TP", "Tên tỉnh/TP",
				"Tìm kiếm", WEB_CONTEXT_PATH + "/commons/province/search", callback, "areaCode",
				"areaName");
		return false;
	},
	searchDistrictOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã quận/huyện", "Tên quận/huyện",
				"Tìm kiếm", WEB_CONTEXT_PATH + "/commons/district/search", callback, "areaCode",
				"areaName", arrParam);
		return false;
	},
	searchWardOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã phường/xã", "Tên phường/xã",
				"Tìm kiếm", WEB_CONTEXT_PATH + "/commons/ward/search", callback, "areaCode",
				"areaName", arrParam);
		return false;
	},
	searchStaffTypeOnDialog : function(callback) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã loại nhân viên",
				"Tên loại nhân viên", "Tìm kiếm loại nhân viên",
				"/commons/staff-type/search", callback, "channelTypeCode",
				"channelTypeName");
		return false;
	},
	searchCustomerTypeOnDialog : function(callback) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã loại KH", "Tên loại KH",
				"Tìm kiếm", WEB_CONTEXT_PATH + "/commons/customer-type/search", callback,
				"channelTypeCode", "channelTypeName");
		return false;
	},
	searchPromotionCustomerMapOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã đơn vị", "Tên đơn vị",
				"Tìm kiếm", WEB_CONTEXT_PATH + "/commons/promotion-shop-map/search", callback,
				"shopCode", "shopName", arrParam);
		return false;
	},
	searchCycleCountOnDialog : function(callback, arrParam, typeInventory, shopCodeAndName) {
		CommonSearch.openSearchStyle2Dialog("Mã kiểm kê", "Mô tả",
				"Trạng thái", "Ngày kiểm kê", "Tìm kiếm mã kiểm kê",
				"/commons/cycle-count/search", callback, "cycleCountCode",
				"name", "description", "status", "startDate",
				"cycleCountType", "sortByType", "firstNumber", arrParam, typeInventory,shopCodeAndName);
		return false;
	},
	searchSupervisorStaffOnDialog : function(callback, arrParam,typeInventory) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/supervisor-staff/search",
				callback, "staffCode", "staffName", arrParam, typeInventory);
		return false;
	},
	searchSupervisorStaffUnderOnDialog : function(callback, arrParam,typeInventory) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/supervisor-staff/searchunder",
				callback, "staffCode", "staffName", arrParam, typeInventory);
		return false;
	},
	searchToolOnDialog : function(callback, arrParam,typeInventory) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã tủ", "Tên tủ",
				"Tìm kiếm tủ", WEB_CONTEXT_PATH + "/commons/tool/search",
				callback, "productCode", "productName", arrParam);
		return false;
	},
	searchCustomerByStaffRoutingOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, WEB_CONTEXT_PATH + "/commons/customer-in-staff-routing/search", callback,
				"shortCode", "customerName", arrParam);
		return false;
	},
	openSearchStyle2Dialog : function(codeText, descriptionText, statusText,
			dateText, title, url, callback, codeFieldText, nameFieldText,
			desFieldText, statusFieldText, dateFieldText,
			cycleCountTypeFieldText, sortByFieldText, firstNumberFieldText,
			arrParam, typeInventory,shopCodeAndName) {
		var html = $('#searchStyle2').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
							modal : true,
							autoResize: false,
							title : title,
							afterShow : function() {
								//@CuongND : my try Code <reset tabindex>
								var tabindex = -1;
								$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
									if (this.type != 'hidden') {
										$(this).attr("tabindex", tabindex);
										tabindex -=1;
									}
								});
								Utils.bindAutoSearch();
								//end <reset tabindex>
								$('#searchStyle2').html('');
								if(typeInventory == 1){
									//NHAP KIEM KHO
									var html = new Array();
									html.push('<select id="seachStyle2Status" class="MySelectBoxClass" disabled="disabled">');
									html.push('<option value="0">Đang thực hiện</option>');
									html.push('</select>');
									$('.fancybox-inner #cycleCountTypeDiv').html(html.join(""));
									$('.fancybox-inner #typeInventory').val(typeInventory);
								}else if(typeInventory == 2){
									//DUYET KIEM KHO
									var html = new Array();
									html.push('<select id="seachStyle2Status" class="MySelectBoxClass">');
									html.push('<option value="0">Đang thực hiện</option>');
									html.push('<option value="1">Hoàn thành</option>');
									html.push('</select>');
									$('.fancybox-inner #cycleCountTypeDiv').html(html.join(""));
									$('.fancybox-inner #typeInventory').val(typeInventory);
								} else {
									$('.fancybox-inner #typeInventory').val(0);
								}
								$('.fancybox-inner #seachStyle2Code').focus();
								$('.fancybox-inner #seachStyle2Shop').val(shopCodeAndName);
								$('.fancybox-inner #searchStyle2Url').val(url);
								$('.fancybox-inner #searchStyle2CodeText').val(codeFieldText);
								$('.fancybox-inner #searchStyle2NameText').val(nameFieldText);
								$('.fancybox-inner #searchStyle2StartDateText').val(dateFieldText);
								$('.fancybox-inner #searchStyle2DesText').val(desFieldText);
								$('.fancybox-inner #searchStyle2TypeText').val(cycleCountTypeFieldText);
								$('.fancybox-inner #searchStyle2SortText').val(sortByFieldText);
								$('.fancybox-inner #searchStyle2FirstNumberText').val(firstNumberFieldText);
								CommonSearch._currentSearchCallback = callback;
								CommonSearch._arrParams = arrParam;
								$('.fancybox-inner #seachStyle2Status').customStyle();

								if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
									codeField = codeFieldText;
								}
								if (nameFieldText != null && nameFieldText != undefined && nameFieldText.length > 0) {
									nameField = nameFieldText;
								}
								if (desFieldText != null && desFieldText != undefined && desFieldText.length > 0) {
									desField = desFieldText;
								}
								if (statusFieldText != null && statusFieldText != undefined && statusFieldText.length > 0) {
									statusField = statusFieldText;
								}
								if (dateFieldText != null && dateFieldText != undefined && dateFieldText.length > 0) {
									dateField = dateFieldText;
								}
								if (cycleCountTypeFieldText != null && cycleCountTypeFieldText != undefined && cycleCountTypeFieldText.length > 0) {
									typeField = cycleCountTypeFieldText;
								}
								if (sortByFieldText != null && sortByFieldText != undefined && sortByFieldText.length > 0) {
									sortbyField = sortByFieldText;
								}
								if (firstNumberFieldText != null && firstNumberFieldText != undefined && firstNumberFieldText.length > 0) {
									firstnumberField = firstNumberFieldText;
								}

								$(".fancybox-inner #searchStyle2Grid").jqGrid({
													url : CommonSearch.getSearchStyle2GridUrl(url,'','','','','','',CommonSearch._arrParams,typeInventory),
													colModel : [
																	{name : codeField, index : codeField,label : codeText, width : 100, align : 'left', sortable : false, resizable : false, formatter:function(cellvalue, options, rowObject){
															        	  return Utils.XSSEncode(cellvalue);
															          } },
																	{name : desField, index : desField, label : descriptionText, width : 150, sortable : false, resizable : false, align : 'left', formatter:function(cellvalue, options, rowObject){
															        	  return Utils.XSSEncode(cellvalue);
															          } },
																	{name : statusField, index : statusField, label : statusText, width : 100, sortable : false, resizable : false,align : 'left', formatter : CountingFormatter.statusFormat2 },
																	{name : dateField, index : dateField, label : dateText, sortable : false, resizable : false, width : 100, align : 'center', formatter : 'date', formatoptions : { srcformat : 'Y-m-d H:i:s', newformat : 'd/m/Y' } },
																	{name : '', label : CreateSalePlan_chon, width : 50, align : 'center', sortable : false, resizable : false, formatter : CommonSearchFormatter.selectCell },
																	{name : typeField, index : typeField, hidden : true },
																	{name : sortbyField, index : sortbyField, hidden : true },
																	{name : firstnumberField, index : firstnumberField, hidden : true }, 
																	{name : 'id', index : 'id', hidden : true }, 
																],
													pager : $('.fancybox-inner #searchStyle2Pager'),
													height : 'auto',
													rowNum : 10,
													width : ($('.fancybox-inner #searchStyle2ContainerGrid').width()),
													gridComplete : function() {
														$('#jqgh_searchStyle2Grid_rn').html(jspCustomerAttributeSTT);
														//$('.fancybox-inner #fbScrollBody').jScrollPane();
														var tm = setTimeout(function() {
															$(window).resize();
															$.fancybox.update();
															clearTimeout(tm);
														}, 50);
														tabindex = 1;
														$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
															if (this.type != 'hidden') {
															$(this).attr("tabindex", '');
															tabindex++;
															}
														});
														updateRownumWidthForJqGrid('.fancybox-inner');
														$('#searchStyle2Pager_right').css('width','180px');//@LamNH:fix bug 0003172
														applyDateTimePicker('.fancybox-inner #seachStyle2From');														
														applyDateTimePicker('.fancybox-inner #seachStyle2To');
													}
												})
										.navGrid($('.fancybox-inner #searchStyle2Pager'),{edit : false, add : false, del : false, search : false});
								$('.fancybox-inner #btnSearchStyle2').bind('click',function(event) {
									$('#errMsgSearchStyle2').html('').hide();
									var msg = Utils.getMessageOfInvalidFormatDateEx('seachStyle2From',msgTuNgay, Utils._DATE_DD_MM_YYYY);
									if(msg.length ==0){
										msg = Utils.getMessageOfInvalidFormatDateEx('seachStyle2To',msgDenNgay, Utils._DATE_DD_MM_YYYY);
									}
									if(msg.length > 0){
										$('#errMsgSearchStyle2').html(msg).show();
										return false;
									}
									var code = $('.fancybox-inner #seachStyle2Code').val().trim();
									var status = $('.fancybox-inner #seachStyle2Status').val().trim();
									var des = $('.fancybox-inner #seachStyle2Des').val().trim();
									var from = $('.fancybox-inner #seachStyle2From').val().trim();
									var to = $('.fancybox-inner #seachStyle2To').val().trim();
									var shop = $('.fancybox-inner #seachStyle2Shop').val().trim();
									var typeInventory = $('.fancybox-inner #typeInventory').val();
													
									var url = CommonSearch.getSearchStyle2GridUrl($('.fancybox-inner #searchStyle2Url').val().trim(), code, status, des, shop, from, to, CommonSearch._arrParams, typeInventory);
									$(".fancybox-inner #searchStyle2Grid").setGridParam({url : url, page : 1 }) .trigger( "reloadGrid");
									});
								// setDateTimePicker('.fancybox-inner
								// #seachStyle2From');
								// setDateTimePicker('.fancybox-inner
								// #seachStyle2To');
							},
							afterClose : function() {
								var tabindex = 1;
								$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
									if (this.type != 'hidden') {
										$(this).attr("tabindex", '');
									}
									tabindex ++;
								});	
								var curIdFocus = $('#cur_focus').val();
								$('#'+ curIdFocus).focus();
								CommonSearch._currentSearchCallback = null;
								$('#searchStyle2').html(html);
							}
						});

		return false;
	},
	openSearchStyle1EasyUIDialogCustomerSO : function(codeText, nameText, title, url, callback, codeFieldText, 
			nameFieldText, arrParam,idFieldText,addressText, addressFieldText,divId, successGridCallback) {
		if(divId != null && divId != undefined){
			CommonSearch.divId = divId;
		}
		$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyle1EasyUIDialogDivSO').show();
		var html = $('#searchStyle1EasyUIDialogDiv').html();
		$('#searchStyle1EasyUIDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width: '50%',
//	        width:750,
	        top: 30,
	        onOpen: function(){
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyle1Code').focus();
				$('.easyui-dialog #searchStyle1Url').val(url);
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				$('.easyui-dialog #searchStyle1IdText').val(idFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.easyui-dialog #searchStyle1AddressText').val(addressFieldText);
					$('.easyui-dialog #seachStyle1AddressLabel').show();
					$('.easyui-dialog #seachStyle1Address').show();					
				}
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var idField = 'id';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if (idFieldText != null&& idFieldText != undefined && idFieldText.length > 0) {
					idField = idFieldText;
				}
				Utils.bindAutoSearch();
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
				$('.easyui-dialog #searchStyle1Grid').show();
				$('.easyui-dialog #searchStyle1Grid').datagrid({
					url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
					autoRowHeight : true,
					// rownumbers : true,
					checkOnSelect :true,
					pagination:true,
					pageSize : 10,
					pageList: [10,20,30,40,50],
					scrollbarSize : 16,
					singleSelect:true,
					pageNumber:1,
					fitColumns:true,
					queryParams:{
						page:1
					},
					width :($('#searchStyle1EasyUIDialog').width()-35),
//					width :850,
				    columns:[[
                        {field:'rownum', title: msgSTT, width: 50,align: 'center',formatter:function(value,row,index){
                        	var page = $('#searchStyle1EasyUIDialog .pagination-num')[0].value;
							return (page != 0 ? (page*10-10 +index +1) : index +1);	
                            }},
				        {field:codeField,title:codeText,align:'left', width:100, sortable : false,resizable : false,
				        	formatter: function(val, row) {
				        		if (val != undefined && val != null) {
				        			return Utils.XSSEncode(val);
				        		}
				        		return '';
				        	}
				        },  
				        {field:nameField,title:nameText,align:'left', width:200, sortable : false,resizable : false,
				        	formatter: function(val, row) {
				        		if (val != undefined && val != null) {
				        			return Utils.XSSEncode(val);
				        		}
				        		return '';
				        	}
				        },	
				        {field:'address',title:msgTuyen3,align:'left', width:400, sortable : false,resizable : false},
				        {field:'select', title:CreateSalePlan_chon, width:80, align:'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterEasyUIDialog},
				        {field :idField,hidden : true},
				    ]],
				    onLoadSuccess :function(){
				    	$('#divOverlay').hide();
				    	// Hide horizontal scrollbar
				    	$('#searchStyle1EasyUIDialog .datagrid-body').css('cssText','overflow-x: hidden !important');
				    	if (successGridCallback != null){
				    		successGridCallback.call(this);
				    	}
				    	successGridCallback = null;
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);	
			    		 updateRownumWidthForJqGrid('.easyui-dialog');
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1200);
			        	setTimeout(function() {
//			        		var height = $('#searchStyle1EasyUIDialogCustomerSO').parent().height() + $('#searchStyle1ContainerGrid').height()+500;
			        		var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height()+500;
				        	    $('.window-mask').css("height",height);
			        		}, 1000);
				    }
				});
				$('.easyui-dialog #btnSearchStyle1').bind('click',function(event) {
					if(!$(this).is(':hidden')){
						var code = $('.easyui-dialog #seachStyle1Code').val().trim();
						var name = $('.easyui-dialog #seachStyle1Name').val().trim();
//						var address = $('.easyui-dialog #seachStyle1Address').val().trim();
						var address = '';
						$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :code, name: name,address:address});						
						$('.easyui-dialog #seachStyle1Code').focus();
					}					
				});
				$('.easyui-dialog #btnClose').bind('click',function(event) {
					$('#searchStyle1EasyUIDialogDivSO').css("visibility", "hidden");
					$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{pageNumber:1});
					$('.easyui-dialog').dialog('close');
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
				/*$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{	
					pageSize: 10
				});*/
	        },
	        onClose : function(){
	        	$('#searchStyle1EasyUIDialogDiv').html(html);
	        	$('#searchStyle1EasyUIDialogDiv').hide();
	        	$('#searchStyle1ContainerGrid').html('<table id="searchStyle1Grid" class="easyui-datagrid" style="width: 520px;"></table><div id="searchStyle1Pager"></div>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');	        	
	        }
	    });
		return false;
	},
	getSearchStyleDistrictGridUrl : function(url, code, name, arrParam) {
		var searchUrl = url + '?code=' + encodeChar(code) + "&name=" + encodeChar(name);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '&curTime=' + encodeChar(curTime);
		return searchUrl;
	},
	getResultSeachStyleDistrict : function(rowId) {
		var code = $(".fancybox-inner #searchStyleDistrictGrid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyleDistrictCodeText').val());
		var name = $(".fancybox-inner #searchStyleDistrictGrid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyleDistrictNameText').val());
		var id = $(".fancybox-inner #searchStyleDistrictGrid").jqGrid('getCell',rowId, 'id');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.id = id;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$.fancybox.close();
		}
		return false;
	},
	openSearchStyleForDistrictDialog : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam) {
		var html = $('#searchStyleDistrict').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				Utils.bindAutoSearch();
				$('#searchStyleDistrict').html('');
				$('.fancybox-inner #seachStyleDistrictCode').focus();
				$('.fancybox-inner #searchStyleDistrictUrl').val(url);
				
				$('.fancybox-inner #searchStyleDistrictCodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyleDistrictNameText').val(nameFieldText);
				
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				$('.fancybox-inner #seachStyleDistrictCodeLabel').html(codeText);
				$('.fancybox-inner #seachStyleDistrictNameLabel').html(nameText);
				$(".fancybox-inner #searchStyleDistrictGrid").jqGrid({
					url : CommonSearch.getSearchStyleDistrictGridUrl(url, '', '', arrParam),
					colModel : [{name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
						        	  return Utils.XSSEncode(cellvalue);
						          }},
					            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
						        	  return Utils.XSSEncode(cellvalue);
						          }},
					            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellDistrictIconFormatter},
					            {name : 'id',index : 'id',hidden : true}
					            ],
					            pager : $('.fancybox-inner #searchStyleDistrictPager'),
								height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyleDistrictContainerGrid').width()),
								gridComplete : function() {
									$('#jqgh_searchStyleDistrictGrid_rn').html(jspCustomerAttributeSTT);
									$(window).resize();
									$.fancybox.update();
									updateRownumWidthForJqGrid('.fancybox-inner');
									$(window).resize();
									
								}												})
								.navGrid($('.fancybox-inner #searchStyleDistrictPager'),{edit : false,add : false,del : false,search : false});
								$('.fancybox-inner #btnSearchStyleDistrict').bind('click',function(event) {
									var code = $('.fancybox-inner #seachStyleDistrictCode').val().trim();
									var name = $('.fancybox-inner #seachStyleDistrictName').val().trim();
									var url = CommonSearch.getSearchStyleDistrictGridUrl($('.fancybox-inner #searchStyleDistrictUrl').val().trim(),code,name,CommonSearch._arrParams);
									$(".fancybox-inner #searchStyleDistrictGrid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
									$(".fancybox-inner #seachStyleDistrictCode").focus();
								});
							},
							afterClose : function() {
								CommonSearch._currentSearchCallback = null;
								$('#searchStyleDistrict').html(html);
							}
						});
		return false;
	},
	getSearchStyle2GridUrl : function(url, code, status, des, shop, from, to,arrParam,typeInventory) {
		var searchUrl = url + '?cycleCountCode=' + encodeChar(code) + "&cycleCountStatus="
				+ encodeChar(status) + '&description=' + encodeChar(des) + "&startDate=" + encodeChar(from)
				+ '&endDate=' + encodeChar(to);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		} else {
			searchUrl += "&shopCode=" + encodeChar(shop);
		}
		if(typeInventory !=null && typeInventory != undefined){
			searchUrl += "&typeInventory=" + encodeChar(typeInventory);
		}
		return searchUrl;
	},
	getResultSeachStyle2 : function(rowId) {
		var code = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle2CodeText').val());
		var name = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle2NameText').val());
		var type = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle2TypeText').val());
		var sortby = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle2SortText').val());
		var des = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle2DesText').val());
		var startdate = $(".fancybox-inner #searchStyle2Grid").jqGrid(
				'getCell', rowId,
				$('.fancybox-inner #searchStyle2StartDateText').val());
		var firstnumber = $(".fancybox-inner #searchStyle2Grid").jqGrid(
				'getCell', rowId,
				$('.fancybox-inner #searchStyle2FirstNumberText').val());
		var id = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, 'id');
		var status = $(".fancybox-inner #searchStyle2Grid").jqGrid('getCell',
				rowId, 'status');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.type = type;
		obj.sortby = sortby;
		obj.des = des;
		obj.startdate = startdate;
		obj.firstnumber = firstnumber;
		obj.id = id;
		obj.status = status;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$.fancybox.close();
		}
		return false;
	},
	searchSaleStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/sale-staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	//cuongND
	searchBCBHOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/sale-staff/bc/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchSaleStaffOnDialogCheckbox : function(callback, arrParam) {
		CommonSearch.openSearchStyle1DialogForStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/sale-staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchSupervisorStaffOnDialogCheckbox : function(callback, arrParam) {
		CommonSearch.openSearchStyle1DialogForSupervisorStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/supervisor-staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchPreAndValStaffOnDialogCheckbox : function(callback, arrParam,objectStaff) {
		CommonSearch.openSearchStyle1DialogForStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/pv-staff/search", callback,
				"staffCode", "staffName", arrParam,objectStaff);
		return false;
	},
	searchPreAndValStaffHasChildOnDialogCheckbox : function(callback, arrParam,objectStaff) {
		CommonSearch.openSearchStyle1DialogForStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/pv-staff-child/search", callback,
				"staffCode", "staffName", arrParam,objectStaff);
		return false;
	},
	searchTBHVOnDialogCheckbox : function(callback, arrParam,objectStaff) {
		CommonSearch.openSearchStyle1DialogForStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/tbhv/search", callback,
				"staffCode", "staffName", arrParam,objectStaff);
		return false;
	},
	searchGSNPPOnDialogCheckbox : function(callback, arrParam,objectStaff) {
		CommonSearch.openSearchStyle1DialogForStaff("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/gsnpp/search", callback,
				"staffCode", "staffName", arrParam,objectStaff);
		return false;
	},
	searchPreAndValStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/pv-staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchPreSaleStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/preSale-staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchSaleStaffOnDialogForSuperviseManage : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/superviseshop/manage-trainingplan/search-staff", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchSaleStaffVansaleOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/staff/search-vansale",
				callback, "staffCode", "staffName", arrParam);
		return false;
	},
	searchCashierStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/cashier-staff/search",
				callback, "staffCode", "staffName", arrParam);
		return false;
	},
	searchTransferStaffOnDialog : function(callback, arrParam) {
//		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
//				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/transfer-staff/search",
//				callback, "staffCode", "staffName", arrParam);
		//SangTN
		CommonSearch.openSearchStyle1EasyUIDialog("Mã NVGH", "Tên NVGH",
				"Tìm kiếm nhân viên giao hàng", WEB_CONTEXT_PATH + "/commons/transfer-staff/search",
				callback, "staffCode", "staffName", arrParam);
		return false;
	},
	getResultCSSearch : function(index) {
		var rows = $('.easyui-dialog #listCommercialSupport').datagrid('getRows');
		var code = rows[index].code;
		var name = rows[index].name;
		var type = rows[index].type;
		var promotionType = rows[index].promotionType;
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.type = type;
		if(promotionType==null)
			promotionType = '';
		obj.promotionType = promotionType;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$('#searchStyle4CS').dialog('close');
		}
		return false;
	},
	searchCommercialSupportOnDialog : function(callback, arrParam) {
		$('#searchStyle4CSContainer').show();
		var html = $('#searchStyle4CS').html();
		CommonSearch._currentSearchCallback = callback;
		CommonSearch._arrParams = arrParam;
		$('#searchStyle4CS').dialog({
	        closed: false,  
	        modal: true,
	        onOpen: function(){
	        	$('.easyui-dialog #listCommercialSupport').datagrid({
	        		url:CommonSearch.getCommercialSupportUrl(arrParam),
	        		method:'GET',
	        		pagination:true,
	        		rownumbers:false,
	        		fitColumns:true,
	    	        scrollbarSize:0,
	    	        singleSelect:true,
	        		width: $('#searchStyle4CS').width() - 25,
	        		columns:[[  
	        		          {field:'code',title:'Mã CT',width:150, align:'left', sortable:false, resizable:false, formatter:function(value, row, index) {
	        		        	  return Utils.XSSEncode(value);
	        		          }},
	        		          {field:'name',title:'Tên CT',width:350, align:'left', sortable:false, resizable:false, formatter:function(value, row, index) {
	        		        	  return Utils.XSSEncode(value);
	        		          }},
	        		          {field:'type',title:CreateSalePlan_chon,width:$('#searchStyle4CS').width() - 25 - 150 - 350,align:'center', sortable:false, resizable:false, formatter: function(value,row,index) {
	        		        	  return "<a href='javascript:void(0)' class='getCommercialSupport' onclick=\"return CommonSearch.getResultCSSearch(" + index + ");\">Chọn</a>";
	        		          }}
	        		      ]]
	        	}); 
	        },
	        onBeforeClose: function() {
	        	$('#searchStyle4CS').html(html);
	        	$('#searchStyle4CSContainer').hide();
	        }
		});
		return false;
	},
	searchStaffVansaleOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", "/catalog/delivery-group/staff/search", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	// ////LamNH,tientv
	openSearchStyle3Dialog : function(callback, arrParam) {
		var html = $('#searchStyle3').html();
		var url1 = '/sale-plan/create/search-product';
		CommonSearch._arrParams = null;
		$.fancybox(html,{
							modal : true,
							title : 'Chọn SKU',
							afterShow : function() {
								$('#searchStyle3').html('');
								CommonSearch._currentSearchCallback = callback;
								CommonSearch._arrParams = arrParam;
								$(".fancybox-inner #searchStyle3Grid").jqGrid({url : CommonSearch.getSearchStyle3GridUrl(url1, '','','','',arrParam),
													colModel : [
															{ name : 'productCode', index : 'productCode', align : 'left', label : 'Mã SP', width : 100, sortable : false, resizable : false, formatter:function(cellvalue, options, rowObject){
													        	  return Utils.XSSEncode(cellvalue);
													          } },
															{ name : 'productName', index : 'productName', label : 'Tên SP', sortable : false, resizable : false, align : 'left', formatter:function(cellvalue, options, rowObject){
													        	  return Utils.XSSEncode(cellvalue);
													          } },
															{ name : 'staffQuantity', index : 'staffQuantity', label : 'Số lượng', width : 100, align : 'right', sortable : false, resizable : false, formatter:function(cellvalue, options, rowObject){		
																return '<input type="text" onkeypress="return NextAndPrevTextField(event, this,\'cls_quantity_vos\');" size="12" class="cls_quantity_vos InputTextStyle InputText1Style AlignRight" id="'+options.rowId+'_staffQuantity" value="'+cellvalue+'" name="staffQuantity" style="text-align:right; width:100%" role="textbox" maxlength="10"/>';
															}},
															{ name : 'id', index : 'id', hidden : true },
															{ name : 'productId', index : 'productId', hidden : true },
															{ name : 'staffCode', index : 'staffCode', hidden : true },
															{ name : 'month', index : 'month', hidden : true },
															{ name : 'year', index : 'year', hidden : true },
															{ name : 'price', index : 'price', hidden : true },
															{ name : 'amount', index : 'amount', hidden : true },
															{ name : 'shopQuantityAssign', index : 'shopQuantityAssign', hidden : true },
															{ name : 'shopQuantity', index : 'shopQuantity', hidden : true },
															{ name : 'shopLeftQuantity', index : 'shopLeftQuantity', hidden : true },
															{ name : 'shopCode', index : 'shopCode', hidden : true },
															],
													pager : $('.fancybox-inner #searchStyle3Pager'),
													height : 'auto',
													multiselect : true,
													recordpos : 'right',
													rowNum : 10,
													forceFit : true,
													cellEdit : true,
													cellsubmit : 'clientArray',
													afterSaveCell : function( rowid, name, val, iRow, iCol) {
														if (name == 'staffQuantity') {
															var taxval = $(".fancybox-inner #searchStyle3Grid") .jqGrid( 'getCell', rowid, iCol + 1);
															$(".fancybox-inner #searchStyle3Grid").jqGrid('setRowData',rowid,{total : parseInt(val)+ parseInt(taxval)});
														}
													},
													beforeSelectRow: function (id, e) {
														  var _id = 'jqg_searchStyle3Grid_' + id;
														  var isCheck = CommonSearch._mapCheckProduct.get(_id);
														  var object = {};
														  if(isCheck || isCheck == 'true') {
															  //da co trong map roi->remove no di
															  CommonSearch._mapCheckProduct.remove(_id);
															  var tm = setTimeout(function(){
																  $('#'+_id).removeAttr('checked');
																  $('#'+id).removeClass('ui-state-highlight');
															  }, 100);
														  } else {
															  object.shopCode = $("#searchStyle3Grid").jqGrid ('getCell', id, 'shopCode');
															  object.staffCode = $("#searchStyle3Grid").jqGrid ('getCell', id, 'staffCode');
															  object.productCode = $("#searchStyle3Grid").jqGrid ('getCell', id, 'productCode');
															  object.productName = $("#searchStyle3Grid").jqGrid ('getCell', id, 'productName');
															  object.month = $("#searchStyle3Grid").jqGrid ('getCell', id, 'month');
															  object.year = $("#searchStyle3Grid").jqGrid ('getCell', id, 'year');
															  object.price = $("#searchStyle3Grid").jqGrid ('getCell', id, 'price');
															  object.shopQuantityAssign = $("#searchStyle3Grid").jqGrid ('getCell', id, 'shopQuantityAssign');
															  object.shopQuantity = $("#searchStyle3Grid").jqGrid ('getCell', id, 'shopQuantity');
															  object.shopLeftQuantity = $("#searchStyle3Grid").jqGrid ('getCell', id, 'shopLeftQuantity');
															  object.amount = $("#searchStyle3Grid").jqGrid ('getCell', id, 'amount');
															  object.productId = id;
															  object.staffQuantity = $('#'+id+'_staffQuantity').val().trim();
//															  object.staffQuantity = $("#searchStyle3Grid").jqGrid ('getCell', id, id+'_staffQuantity');
															  //chua co trong map -> put vao
															  CommonSearch._mapCheckProduct.put(_id, object);
															  var tm = setTimeout(function(){
																  $('#'+_id).attr('checked', 'checked');
																  $('#'+id).addClass('ui-state-highlight');
															  }, 100);
														  }
														  return true;
													  },
											      onSelectAll: function(aRowids, status) {
														  for(var i = 0; i < aRowids.length; i++) {
															  var object = {};
															  if(status) {
																  var _id = 'jqg_searchStyle3Grid_' + aRowids[i];
																  object.shopCode = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'shopCode');
																  object.staffCode = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'staffCode');
																  object.productCode = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'productCode');
																  object.productName = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'productName');
																  object.month = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'month');
																  object.year = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'year');
																  object.price = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'price');
																  object.shopQuantityAssign = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'shopQuantityAssign');
																  object.shopQuantity = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'shopQuantity');
																  object.shopLeftQuantity = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'shopLeftQuantity');
																  object.amount = $("#searchStyle3Grid").jqGrid ('getCell', aRowids[i], 'amount');
																  object.productId = aRowids[i];
																  object.staffQuantity = $('#'+aRowids[i]+'_staffQuantity').val().trim();
																  //put vao map
																  CommonSearch._mapCheckProduct.put(_id, object);
															  } else {
																  var _id = 'jqg_searchStyle3Grid_' + aRowids[i];
																  CommonSearch._mapCheckProduct.remove(_id);
															  }
														  }
													  },
													width : ($('.fancybox-inner #searchStyle3ContainerGrid').width()),
													gridComplete : function() {
														$('.fancybox-inner #searchStyle3Code').focus();
														Utils.bindAutoSearch();
														$('#jqgh_searchStyle3Grid_rn').html(jspCustomerAttributeSTT);
														$(window).resize();
														$.fancybox.update();
														updateRownumWidthForJqGrid('.fancybox-inner');
														$('.ui-jqgrid-bdiv .cbox').each(function() {
															 var isCheck = CommonSearch._mapCheckProduct.get(this.id);
															 if(isCheck || isCheck == 'true') {
																 productId = $("#searchStyle3Grid").jqGrid('getCell',$(this).parent().parent().attr('id'),'id');
																 $(this).attr('checked', 'checked');										 
																 $('#'+productId).addClass('ui-state-highlight');
															 }
															 $(this).parent().css('padding', '3px 3px');	
														  });
														$('.cls_quantity_vos').each(function(){
															var SELECTOR =  $(this).attr('id');
															Utils.bindFormatOnTextfield(SELECTOR, Utils._TF_NUMBER_CONVFACT);															
														});
													}
												})
										.navGrid($('.fancybox-inner #searchStyle3Pager'),{edit : false,add : false,del : false,search : false});
								$('.fancybox-inner #btnSearchStyle3').bind('click',function(event) {
													$('#errDialogMsg').hide();
													$('#errMsgUpdateDiv').hide();
													var code = $('.fancybox-inner #searchStyle3Code').val().trim();
													var name = $('.fancybox-inner #searchStyle3Name').val().trim();
													var fromQuantity = $('.fancybox-inner #searchStyle3From').val().trim();
													var toQuantity = $('.fancybox-inner #searchStyle3To').val().trim();
													if(fromQuantity != '' && toQuantity != ''){
														if(parseInt(fromQuantity) > parseInt(toQuantity)){
															$('#errDialogMsg').html('Giá trị Từ phải nhỏ hơn giá trị Đến').show();
															$('.fancybox-inner #searchStyle3From').focus();
															return false;
														}
													}
													var url = CommonSearch.getSearchStyle3GridUrl(url1,code,name,fromQuantity,toQuantity,CommonSearch._arrParams);
													$(".fancybox-inner #searchStyle3Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
												});
								$('.fancybox-inner #btnProductAdd').bind('click', function(event) {
														CreateSalePlan.addRow();});
								$(".fancybox-inner #searchStyle3From").bind("paste",function(){
								    return false;
								});
								$(".fancybox-inner #searchStyle3To").bind("paste",function(){
								    return false;
								});
							},
							afterClose : function() {
								$('#searchStyle3').html(html);
								CommonSearch._currentSearchCallback = null;
								CommonSearch._mapCheckProduct = new Map();
							}
						});
		return false;
	},
	getSearchStyle3GridUrl : function(url, code, name,fromQuantity,toQuantity, arrParam) {
		var searchUrl = url + '?code=' + encodeChar(code) + "&name=" + encodeChar(name) + '&fromQty=' + encodeChar(fromQuantity) + "&toQty=" + encodeChar(toQuantity);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		return searchUrl;
	},
	searchProductSalePlanOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle3Dialog(callback, arrParam);
		return false;
	},
	getCommercialSupportUrl : function(arrParams) {
		var searchUrl = '/commons/commercial-support/search';
		if (arrParams != null && arrParams != undefined && arrParams.length > 0) {
			for ( var i = 0; i < arrParams.length; i++) {
				if (i == 0) {
					searchUrl = searchUrl + '?' + arrParams[i].name + '='
							+ arrParams[i].value;
				} else {
					searchUrl = searchUrl + '&' + arrParams[i].name + '='
							+ arrParams[i].value;
				}
			}
		}
		return searchUrl;
	},
	showDialogProductCancel : function(productCode, productName, totalCancel,
			shopCode) {
		var params = new Object();
		params.productCodeCancel = productCode;
		params.productNameCancel = productName;
		params.totalCancel1Cancel = totalCancel;
		params.shopCodeCancel = shopCode;

		var url = '/sale-product/create-order/product-cancel-info';		
		Utils.getHtmlDataByAjax(params, url, function(data) {
			if (data != null || data != undefined || data != '') {
				$.fancybox(data, {
					modal : true,
					title : 'Nhập lô hủy',
					afterShow : function() {
						$('#listLotProductCancel').jScrollPane();
					},
					afterClose : function() {
					}
				});
			}
		}, null, 'GET');
	},
	getListProductLotUrl : function(productCode) {
		var url = '/commons/product/list-product-lot?code=' + encodeChar(productCode);
		return url;
	},
	showProductInfo : function(productCode, productName, convfactNumber,
			stockNumber,pricePackage, priceValue, total, promotionProgram) {
		$('#showProductInfoContainer').show();
		$('#showProductInfo').dialog({
	        closed: false,  
	        cache: false,  
	        modal: true,
	        onOpen: function(){
	        	if (stockNumber == '0/0') {
	        		stockNumber = "";
	        	}
	        	if (total == '0') {
	        		total = "";
	        	}
				$('#productCode').text(productCode);
				$('#productName').text(Utils.XSSDeEncode(productName));
				$('#convfactNumber').text(convfactNumber);
				$('#stockNumber').text(stockNumber);
				$('#pricePackage').text(formatFloatValue(Utils.returnMoneyValue(pricePackage),numFloat));
				$('#priceValue').text(formatFloatValue(Utils.returnMoneyValue(priceValue),numFloat));
				$('#totalDialog').text(total);
				if (configAutoPromo) {
					if (promotionProgram == null || promotionProgram == undefined || promotionProgram.length == 0) {
						$('#promotionProgram').text('');
					} else {
						$('#promotionProgram').text(promotionProgram);
					}
				} else {
					$('#promotionProgram').hide();
					$('#promotionLabel').hide();
				}
								
	        },
	        onClose:function() {
	        	$('#showProductInfoContainer').hide();
	        }
		});
	},	
	showCustomerInfoEasyUI : function(customerId) {
		$('#easyui-showCustomerInfo #info-listCustomerOrderEasyUI').jqGrid('GridUnload');
		var getCustomerInfoUrl = '/commons/customer/get-info?customerId='+ customerId;
		Utils.getJSON(getCustomerInfoUrl, function(data) {
			$('#easyui-showCustomerInfoContainer').show();
			$('#easyui-showCustomerInfo').dialog({
				closed: false,  
		        cache: false,  
		        modal: true,
		        onOpen: function(){
		        	$('#easyui-showCustomerInfo #info-customerCodeEasyUI').text(data.customerShortCode);
					$('#easyui-showCustomerInfo #info-customerNameEasyUI').text(data.customerName);
					$('#easyui-showCustomerInfo #info-addressEasyUI').text(data.address);
					$('#easyui-showCustomerInfo #info-phoneEasyUI').text(data.phone);
					$('#easyui-showCustomerInfo #info-mobiphoneEasyUI').text(data.mobiphone);
					$('#easyui-showCustomerInfo #info-shopTypeNameEasyUI').text(data.shopTypeName);
					$('#easyui-showCustomerInfo #info-loyaltyEasyUI').text(data.loyalty);
					$('#easyui-showCustomerInfo #info-contactNameEasyUI').text(data.contactName);
					$('#easyui-showCustomerInfo #info-totalInDateEasyUI').text(formatCurrency(data.totalInDate));
					$('#easyui-showCustomerInfo #info-numSkuInDateEasyUI').text(data.numSkuInDate);
					$('#easyui-showCustomerInfo #info-numOrderInMonthEasyUI').text(data.numOrderInMonth);
					$('#easyui-showCustomerInfo #info-avgTotalInLastTwoMonthEasyUI').text(formatCurrency(data.avgTotalInLastTwoMonth));
					$('#easyui-showCustomerInfo #info-totalInMonthEasyUI').text(formatCurrency(data.totalInMonth));
					
					var getListOrderUrl = '/commons/customer/get-sale-order?customerId='+ customerId;
					
					$('#easyui-showCustomerInfo #info-listCustomerOrderEasyUI').datagrid({
						url : '/commons/customer/get-sale-order',
						queryParams:{customerId : customerId},
						pagination:true,
						rownumbers:true,
						width:$('#easyui-showCustomerInfo').width() - 25,
						columns:[[  
						    {field:'orderDate',title:'Ngày',width:80, align:'center', sortable:false, resizable:false, formatter:function(value,row,index) {
						    	var date = new Date(row.orderDate);
								return $.datepicker.formatDate('dd/mm/yy',date);
						    }},  
						    {field:'orderNumber',title:'Số hóa đơn', align:'left',width:150, sortable:false,resizable:false, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},  
						    {field:'amount',title:'Thành tiền',width:100,align:'right', formatter:function(value,row,index) {
						    	return formatCurrency(row.amount);
						    }}  
						]]
					});
		        },
		        onClose:function() {
		        	$('#easyui-showCustomerInfoContainer').hide();
		        }
			});
		});
	},	
	searchPromotionProduct : function(arrParams) {
		var searchUrl = '/commons/promotion-product/get';
		if (arrParams != null && arrParams != undefined && arrParams.length > 0) {
			for ( var i = 0; i < arrParams.length; i++) {
				if (i == 0) {
					searchUrl = searchUrl + '?' + encodeChar(arrParams[i].name) + '='
							+ encodeChar(arrParams[i].value);
				} else {
					searchUrl = searchUrl + '&' + encodeChar(arrParams[i].name) + '='
							+ encodeChar(arrParams[i].value);
				}
			}
		}
		return searchUrl;
	},
	fillShopNameByShopCode : function(tfShopCode, tfShopName,callback) {
		$('#' + tfShopCode).bind('blur',function() {
			if ($('#' + tfShopCode).val().trim().length > 0) {
				Utils.getJSON('/rest/catalog/delivery-group/shop/'+ $('#' + tfShopCode).val().trim()+ '/name.json', function(data) {
					if (data != null && data.name != null && data.name != undefined) {
						$('#' + tfShopName).val(data.name);
					}
					if(callback!= null && callback!= undefined){
						callback.call(this,data);
					}
				});
			} else {
				$('#' + tfShopName).val('');
			}
		});
		return false;
	},
	fillObjectCodeByObjectId : function(tfObjectId, tfObjectCode, tfObjectType,callback) {
		if ($('#' + tfObjectId).val().trim().length > 0) {
			Utils.getJSON('/rest/catalog/object/'+ $('#' + tfObjectId).val()+ '/'+tfObjectType+'/code.json', function(data) {
				if (data != null && data.name != null && data.name != undefined) {
					$('#' + tfObjectCode).val(data.name);
					if (callback!= undefined && callback != null) {
						callback.call(this, true);
					}
				}
			});
		} else {
			$('#' + tfObjectCode).val('');
		}
		return false;
	},
	fillCustomerNameByShortCode : function(shopCode,shortCode, customerName) {
		$('#' + shortCode).bind('blur',function() {
			if ($('#' + shortCode).val().trim().length > 0) {
				Utils.getJSON('/rest/catalog/customer/' + $('#' + shopCode).val().trim()
						+ '/'+ $('#' + shortCode).val().trim()
						+ '/name.json', function(data) {
					if (data != null && data.name != null && data.name != undefined) {
						$('#' + customerName).val(data.name);
					}
				});
			} else {
				$('#' + customerName).val('');
			}
		});
		return false;
	},
	fillShopCodeAndNameByShopCode : function(shopCodeAndNameId, callback) {
		CommonSearch._currentSearchCallback = callback;
		$('#' + shopCodeAndNameId).bind(
				'blur',
				function() {
					if ($('#' + shopCodeAndNameId).val().trim().length > 0) {
						Utils.getJSON('/rest/catalog/delivery-group/shop/'
								+ $('#' + shopCodeAndNameId).val().trim()
								+ '/name.json', function(data) {
							if (data != null && data.name != null
									&& data.name != undefined) {
								$('#' + shopCodeAndNameId).val(
										data.code + ' - ' + data.name);
								if (callback != null && callback != undefined) {
									CommonSearch._currentSearchCallback.call(
											this, data);
								}
							}
						});
					}
				});
	},
	searchPO : function() {		
		var html = $('#searchPO').html();
		$.fancybox(html, {
			modal : true,
			autoResize: false,
			title : 'Tìm kiếm đơn hàng',
			afterShow : function() {
				//('.fancybox-inner #ordernumber').focus();
				$('.fancybox-inner #fDate').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('fancybox-inner #tDate').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #ordernumber').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #shortcode').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #customername').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #staffid').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #deliveryid').bind('keyup',function(event){
					if(event.keyCode == 13){
						SPReturnOrder.searchSaleOrder();
					}
				});
				$('.fancybox-inner #fDate').attr('id', 'fromDate');
				$('.fancybox-inner #tDate').attr('id', 'toDate');
				$('.fancybox-inner #ordernumber').attr('id', 'orderNumber');
				$('.fancybox-inner #shortcode').attr('id', 'shortCode');
				$('.fancybox-inner #customername').attr('id', 'customerName');
				$('.fancybox-inner #staffid').attr('id', 'staffCode');
				$('.fancybox-inner #deliveryid').attr('id', 'deliveryCode');
				setDateTimePicker('fromDate');
				setDateTimePicker('toDate');
				SPReturnOrder.searchSaleOrder();
				
			},
			afterClose : function() {

			}
		});
	},
	showPromotionProgramInfo : function(ppCode, ppName, ppType, ppFormat,
			fromDate, toDate, ppDescription) {
		var html = $('#showPromotionProgramInfo').html();
		$.fancybox(html, {
			modal : true,
			autoResize: false,
			title : 'Thông tin CT HTTM',
			afterShow : function() {
				$('#showPromotionProgramInfo').html('');
				$('#programCode').text(ppCode);
				$('#programName').text(ppName);
				$('#programType').text(ppType);
				$('#programFormat').text(ppFormat);
				$('#fromDate1').text(fromDate);
				$('#toDate1').text(toDate);
				$('#programDescription').text(ppDescription);
				var tm = setTimeout(function(){
					$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop + 210);
					clearTimeout(tm);
				}, 500);
			},
			afterClose : function() {
				$('#showPromotionProgramInfo').html(html);
			}
		});
	},
	/** Tao don hang : Lo san pham huy */
	viewDetailLot : function(callback, arrParam,title) {
		CommonSearch._currentSearchCallback = callback;
		var html = $('#adjustOrderLotDialog').html();
		$('#adjustOrderLotDialogContainer').show();
		var url = '/sale-product/create-order/list-product-lot';
		url = CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam);		
		$('#adjustOrderLotDialog').dialog({
			title:title,
			closed: false, 
			cache: false,
			modal: true,
			onOpen: function() {
				Utils.getJSON(url, function(data) {					
					if(SPCreateOrder._isSave) {
						$('.fancybox-inner #saleProductLotLot').attr('disabled', 'disabled');
						$('.fancybox-inner #saleProductLotQuantity').attr('disabled', 'disabled');
						$('.fancybox-inner #btnCloseProductLot').removeAttr('onclick');
					}
					if (callback != null && callback != undefined) {
						CommonSearch._currentSearchCallback.call(this, data);
					}
				});
			},
			onClose : function(){
				$('#adjustOrderLotDialog').html(html);
				$('#adjustOrderLotDialogContainer').hide();
			}
		});
	},
	/** Tao don hang : Lo san pham ban,doi,tra, km tay */
	viewDetailSaleLot : function(callback, arrParam) {
		CommonSearch._currentSearchCallback = callback;
		var html = $('#adjustSaleOrderLotDialog').html();
		$('#adjustSaleOrderLotDialogContainer').show();
		var url = '/sale-product/create-order/list-product-lot?productCode=' + arrParam[0].value;
		if(arrParam.length>1){
			url+='&orderId='+arrParam[1].value;
		}
		$('#adjustSaleOrderLotDialog').dialog({
			closed: false, 
			cache: false,
			modal: true,
			onOpen: function() {
				Utils.getJSON(url, function(data) {
					$('#adjustSaleOrderLotDialog.easyui-dialog #saleProductLotCode').html(Utils.XSSEncode(data.productCode));
					$('#adjustSaleOrderLotDialog.easyui-dialog #saleProductLotName').html(Utils.XSSEncode(data.productName));
					if (callback != null && callback != undefined) {
						CommonSearch._currentSearchCallback.call(this, data);
					}
				});
			},
			onClose : function(){
				$('#adjustSaleOrderLotDialog').html(html);
				$('#adjustSaleOrderLotDialogContainer').hide();
			}
		});
	},
	viewDetailPromotionSaleLot : function(callback, arrParam) {
		CommonSearch._currentSearchCallback = callback;
		var html = $('#adjustPromotionSaleOrderLotDialog').html();
		$('#adjustPromotionSaleOrderLotDialogContainer').show();
		
		var url = CommonSearch.getSearchStyle1GridUrl('/sale-product/create-order/list-product-lot', '', '', arrParam, '');
		$('#adjustPromotionSaleOrderLotDialog').dialog({
			closed: false, 
			cache: false,
			modal: true,
			onOpen: function() {
				Utils.getJSON(url, function(data) {
					$('.easyui-dialog #saleProductLotCode').html(Utils.XSSEncode(data.productCode));
					$('.easyui-dialog #saleProductLotName').html(Utils.XSSEncode(data.productName));
					if (callback != null && callback != undefined) {
						CommonSearch._currentSearchCallback.call(this, data);
					}
				});
			},			
			onClose : function(){			
				$('#adjustPromotionSaleOrderLotDialog').html(html);
				$('.easyui-dialog tbody').html("");
				$('#adjustPromotionSaleOrderLotDialogContainer').hide();
			}
		});
	},
	viewCustomerImageInfo : function(arrParam,callback) {
		CommonSearch._currentSearchCallback = callback;
		var html = $('#customerImageDetail').html();
		var title='Hình ảnh khách hàng';
		if(arrParam.objectType==0){
			title='Hình ảnh đóng cửa';
		}else if(arrParam.objectType==1){
			title='Hình ảnh trưng bày';
		}else{
			title='Hình ảnh điểm bán';
		}
		$.fancybox(html, {
			modal : true,
			autoResize: false,
			'title' : title,
			'afterShow' : function() {	
				$('#customerImageDetail').html('');
				Utils.getHtmlDataByAjax(arrParam, '/catalog/customer/view-image-detail',
					function(data) {
						try {
							var myData = JSON.parse(data);
							if (callback != null && callback != undefined) {
								CommonSearch._currentSearchCallback.call(this, myData);
							}
						} catch (err) {
							var myData=new Object();
							myData.error=true;
							myData.errMsg='Lỗi. Xin liên hệ quản trị hệ thống để biết thêm chi tiết.';
							return;
						}
				}, 'customerImageLoading', 'POST');
			},
			'afterClose' : function() {
				CommonSearch._currentSearchCallback = null;
				$('#customerImageDetail').html(html);
			}
		});
	},
	viewBigMap : function(arrParam) {
		var html = $('#viewBigMap').html();
		
		$('#viewBigMap').dialog({
			closed: false,  
	        cache: false,  
	        modal: true,
	        onOpen: function(){
	        	var tm = setTimeout(function(){//chuyen ban do toi vi tri man hinh
					//load map
					var lat = arrParam.lat;
					var lng = arrParam.lng;
					var zoom=null;
					if(lat!='' && lng!=''){ 
						zoom=16;
					}
					MapUtil.loadMapResource(function(){
//						Vietbando.loadBigMap('bigMapContainer',lat,lng,zoom, function(point){
//							$('#lat').val(point.latitude);
//							$('#lng').val(point.longitude);
//						});	
						ViettelMap.loadBigMap('bigMapChange',lat, lng, zoom, function(lat, lng){
								$('#lat').val(lat);
								$('#lng').val(lng);
						});
					});
					clearTimeout(tm);
				}, 500);
	        },
	        onClose:function() {
	        	var lat = $('#lat').val();
				var lng = $('#lng').val();
				var zoom=15;
				var showmarker=false;
				if(lat!='' && lng!=''){
					zoom=18;
					showmarker=true;
				}
				Vietbando._map=null;
				Vietbando._marker=null;
				MapUtil.loadMapResource(function(){
					Vietbando.loadMap('mapContainer',lat,lng,zoom, function(point){
						$('#lat').val(point.latitude);
						$('#lng').val(point.longitude);
					},showmarker);	
				});
	        	$('#viewBigMap').html(html);
	        }
		});
		
		return false;
	},
	deleteFileExcelExport:function(excelFileName){
        $.ajax({
              type : "POST",
              url : "/commons/deleteFile",
              data : ({
                    excelFileName: excelFileName
              }),
              dataType : "json",
              success : function(data) {
            	  Utils.updateTokenForJSON(data);
              },
              error : function(XMLHttpRequest, textStatus, errorDivThrown) {
              }
        });
	},
	exportExcelData:function(dataModel,url,errMsg){
		if(errMsg == null || errMsg == undefined){
			errMsg = 'errExcelMsg';
		}
		var kData = $.param(dataModel,true);
		if(CommonSearch._xhrReport != null){
			CommonSearch._xhrReport.abort();
			CommonSearch._xhrReport = null;
		}
		$('#divOverlay_New').show();
		CommonSearch._xhrReport = $.ajax({
			type : "POST",
			url : url,
			data: (kData),
			dataType: "json",
			success : function(data) {
				hideLoadingIcon();
				if(data.error && data.errMsg!= undefined){
					$('#'+ errMsg).html(msgCommon6 + escapeSpecialChar(data.errMsg)).show();
				} else{
					if(data.hasData!= undefined && !data.hasData) {
						$('#'+ errMsg).html(msgCommon7).show();
					} else{
//						window.location.href = data.view;			
						//Begin anhdt10 - fix attt - dua ra acoutn dowload
						window.location.href =WEB_CONTEXT_PATH + "/commons/downloadFile?file="+data.view;
						//End anhdt10
						setTimeout(function(){ //Set timeout để đảm bảo file load lên hoàn tất
		                    CommonSearch.deleteFileExcelExport(data.view);
						}, 50000000);
					}
				}
				$('#divOverlay_New').hide();
			},
			error:function(XMLHttpRequest, textStatus, errorDivThrown) {
				$.ajax({
					type : "POST",
					url : WEB_CONTEXT_PATH +'/check-session',
					dataType : "json",
					success : function(data) {
						CommonSearch._xhrReport = null;
						$('#divOverlay_New').hide();
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						$('#divOverlay_New').hide();
						window.location.href =WEB_CONTEXT_PATH +'/home';
					}
				});
			}
		});
		return false;
	},
	openPayrollTableEasyUI : function(arrParam) {
		$(".easyui-window #easyTGrid").jqGrid('GridUnload');
		$('#payrollTableEasyUIDiv').show();
		$('#payrollTableEasyUIDiv').window({title : 'Tìm kiếm bảng lương'});
		$('#payrollTableEasyUIDiv').window('open');
		CommonSearch._arrParams = arrParam;
		applyDateTimePicker("#dateSearchEasy", "mm/yy",null,null,null,null,null,null,null,true);
		var url = '/commons/payroll/search';
		Utils.bindAutoSearchForEasyUI();
		$(".easyui-window #easyTGrid").jqGrid(
						{
							url : CommonSearch.getSearchStyle1GridUrl(url, '','', CommonSearch._arrParams),
							colModel : [
									{name :'payrollCode',index : 'payrollCode',align : 'left',label :'Mã bảng lương',width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name :'payrollName',index : 'payrollName',label : 'Tên bảng lương',sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name :'periodPrCode',index : 'periodPrCode',label : 'Kỳ lương',sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
							        	  return Utils.XSSEncode(cellvalue);
							          }},
									{name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : function(cellvalue, options, rowObject) {
											return "<a href='javascript:void(0)' onclick=\"return CommonSearch.getResultPayrollSeachEasyUI(" + options.rowId + ", 'payrollTableEasyUIDiv');\">Chọn</a>";
										}
									}, 
									{name : 'payrollId',index : 'payrollId',hidden : true}, ],
							pager : $('.easyui-window #easyTPager'),
							rowNum : 10,
							width : ($('.easyui-window #payrollTableEasyGrid').width()),
							gridComplete : function() {
								$('#jqgh_easyTGrid_rn').html(jspCustomerAttributeSTT);
								$('.easyui-window #payrollTableCodeEasy').bind('keypress',Utils.unitCharactersAz094Code);
								$('.easyui-window #payrollTableNameEasy').bind('keypress',Utils.unitCharactersAz094Name);
								$('.easyui-window #payrollTableCodeEasy').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('payrollTableCodeEasy','',Utils._CODE);
										if (msg.length > 0) {$('#payrollTableCodeEasy').val('');}
										clearTimeout(tm);
									}, 50);});
								$('.easyui-window #payrollTableNameEasy').bind('paste',function(e) {
									var tm = setTimeout(function() {
										var msg = Utils.getMessageOfSpecialCharactersValidate('payrollTableNameEasy','',Utils._NAME);
										if (msg.length > 0) {$('#payrollTableNameEasy').val('');}
										clearTimeout(tm);
									}, 50);});
								updateRownumWidthForJqGrid();
								var tm = setTimeout(function(){
									$('.panel').css('top', document.documentElement.scrollTop + 100);
									$('.window-shadow').css('top', document.documentElement.scrollTop + 100);
									clearTimeout(tm);
								}, 500);
							}
						}).navGrid($('.easyui-window #easyTPager'), {
					edit : false,
					add : false,
					del : false,
					search : false
				});
		$('.easyui-window #btnPayrollSearch').bind('click',function(event) {
			var code = $('.easyui-window #payrollTableCodeEasy').val().trim();
			var name = $('.easyui-window #payrollTableNameEasy').val().trim();
			var url = '/commons/payroll/search';
			var url = CommonSearch.getSearchStyle1GridUrl(url,code, name, CommonSearch._arrParams);
			$(".easyui-window #easyTGrid").setGridParam({
				url : url,
				page : 1
			}).trigger("reloadGrid");});
		var needReloadGrid = $('.easyui-window #tReloadGrid').val();
		if(needReloadGrid == true || needReloadGrid == 'true') {
			$(".easyui-window #easyTGrid").trigger("reloadGrid");
		} else {
			$('.easyui-window #tReloadGrid').val(true);
		}
	},
	openSearchStyle4Dialog : function(codeText, nameText, title, url, callback,	codeFieldText, nameFieldText, arrParam, shopCode,shopName) {
		var html = $('#searchStyle4').html();
		CommonSearch._arrParams = null;
		$.fancybox(html,{
			modal : true,
			title : title,						
			autoResize: false,
			afterShow : function() {
				//@CuongND : my try Code <reset tabindex>
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});
				//end <reset tabindex>
				$('#searchStyle4').html('');
				$('.fancybox-inner #seachStyle4Code').focus();
				$('.fancybox-inner #searchStyle4Url').val(url);
				$('.fancybox-inner #searchStyle4CodeText').val(codeFieldText);
				$('.fancybox-inner #searchStyle4NameText').val(nameFieldText);
				$('.fancybox-inner #seachStyle4ShopCode').val(shopCode);
				$('.fancybox-inner #seachStyle4ShopName').val(shopName);
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				$('.fancybox-inner #seachStyle4CodeLabel').html(codeText);
				$('.fancybox-inner #seachStyle4NameLabel').html(nameText);
				Utils.bindAutoSearch();
				$(".fancybox-inner #searchStyle4Grid").jqGrid({
					url : CommonSearch.getSearchStyle4GridUrl(url, '', '', arrParam),
					colModel : [
			            {name : codeField,index : codeField,align : 'left',label : codeText,width : 100,sortable : false,resizable : false, formatter:function(cellvalue, options, rowObject){
				        	  return Utils.XSSEncode(cellvalue);
				          }},
			            {name : nameField,index : nameField,label : nameText,sortable : false,resizable : false,align : 'left', formatter:function(cellvalue, options, rowObject){
				        	  return Utils.XSSEncode(cellvalue);
				          }},
			            {name : 'select',label : CreateSalePlan_chon,width : 50,align : 'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatter4},
			            {name : 'id',index : 'id',hidden : true}
		            ],
		            pager : $('.fancybox-inner #searchStyle4Pager'),
					height : 'auto',rowNum : 10,width : ($('.fancybox-inner #searchStyle4ContainerGrid').width()),
					gridComplete : function() {
						$('#jqgh_searchStyle4Grid_rn').html(jspCustomerAttributeSTT);
						$('#pg_searchStyle4Pager').css('padding-right','20px');																	
						tabindex = 1;
						$('.fancybox-inner input,.fancybox-inner select,.fancybox-inner button').each(function () {
							if (this.type != 'hidden') {
							$(this).attr("tabindex", '');
							tabindex++;
							}
						});
						updateRownumWidthForJqGrid('.fancybox-inner');
						$('#searchStyle4Pager_right').css('width','180px');//@LamNH:fix bug 0003172
						
						//$.fancybox.update();
						$(window).resize();
						var fancyHeight = $('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('height');
						fancyHeight = parseInt(fancyHeight);
						var wWidth = window.innerWidth;
						wWidth = parseInt(wWidth);
						var wHeight = window.innerHeight;
						wHeight = parseInt(wHeight);
						var distant = wHeight - fancyHeight;
						distant = distant / 2;
						if(wHeight > fancyHeight) {
							var tm = setTimeout(function() {
								//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
								$(window).resize();
								$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop +  distant}, 50);
							}, 10);				
						} else {
							var tm = setTimeout(function() {
								//$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').css('top', document.documentElement.scrollTop +  distant);
								$(window).resize();
								$('.fancybox-wrap.fancybox-desktop.fancybox-type-html.fancybox-opened').animate({'top': document.documentElement.scrollTop}, 50);
							}, 10);	
						}
					}
				}).navGrid($('.fancybox-inner #searchStyle4Pager'),{edit : false,add : false,del : false,search : false});
				$('.fancybox-inner #btnSearchStyle4').bind('click',function(event) {
					var code = $('.fancybox-inner #seachStyle4Code').val().trim();
					var name = $('.fancybox-inner #seachStyle4Name').val().trim();
					var url = CommonSearch.getSearchStyle4GridUrl($('.fancybox-inner #searchStyle4Url').val().trim(),code,name,CommonSearch._arrParams);
					$(".fancybox-inner #searchStyle4Grid").setGridParam({url : url,page : 1}).trigger("reloadGrid");
					$('.fancybox-inner #seachStyle4Code').focus();
				});
			},
			afterClose : function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
				CommonSearch._currentSearchCallback = null;
				$('#searchStyle4').html(html);
			}
		});
		return false;
	},
	getResultSeachStyle4 : function(rowId) {
		var code = $(".fancybox-inner #searchStyle4Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle4CodeText').val());
		var name = $(".fancybox-inner #searchStyle4Grid").jqGrid('getCell',
				rowId, $('.fancybox-inner #searchStyle4NameText').val());
		var id = $(".fancybox-inner #searchStyle4Grid").jqGrid('getCell',rowId, 'id');
		var obj = {};
		obj.code = code;
		obj.name = name;
		obj.id = id;
		if (CommonSearch._currentSearchCallback != null) {
			CommonSearch._currentSearchCallback.call(this, obj);
			$.fancybox.close();
		}
		return false;
	},
	getSearchStyle4GridUrl : function(url, code, name, arrParam) {
		var searchUrl = '';
		searchUrl = url + '?code=' + encodeChar(code) + "&name=" + encodeChar(name);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '&curTime=' + encodeChar(curTime);
		return searchUrl;
	},
	searchCustomerEquipmentOnDialog : function(callback, arrParam,shopCode,shopName) {
		CommonSearch.openSearchStyle4Dialog(catalog_customer_code, catalog_customer_name,
				ss_customer_search_label, WEB_CONTEXT_PATH + "/commons/customer/search", callback,
				"shortCode", "customerName", arrParam,shopCode,shopName);
		return false;
	},
	searchStaffEquipmentOnDialog : function(callback, arrParam,shopCode,shopName) {
		CommonSearch.openSearchStyle4Dialog(msgFormatter9, msgFormatter10,
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/staff/search-vansale", callback,
				"staffCode", "staffName", arrParam, shopCode, shopName);
		return false;
	},
	searchPayrollOnDialog: function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã bảng lương", "Tên bảng lương",
				"Tìm kiếm bảng lương", WEB_CONTEXT_PATH + "/commons/payroll/search", callback,
				"payrollCode", "payrollName", arrParam);
		return false;
	},
	searchSuperviseStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã NVGS", "Tên NVGS",
				"Tìm kiếm NVGS", WEB_CONTEXT_PATH + "/commons/report/searchSuperviseStaff", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchSuperviseSaleStaffOnDialog : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã NVBH", "Tên NVBH",
				"Tìm kiếm NVBH", WEB_CONTEXT_PATH + "/commons/report/searchSuperviseSaleStaff", callback,
				"staffCode", "staffName", arrParam);
		return false;
	},
	searchDisplayProgramRunningOnDialog:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialog("Mã CTTB",
				"Tên CTTB", "Tìm kiếm CTTB",
				"/commons/report/searchDisplayProgramRunning", callback, "displayProgramCode",
				"displayProgramName",arrParam);
		return false;
	},
	searchShopPromotionProgram:function(callback,arrParam, successCallback) {
		CommonSearch.openSearchStyle1EasyUIPromotionShop(msgMaDoiTuong,
				msgTenDoiTuong, jspKhuyenMai1,
				WEB_CONTEXT_PATH+ "/commons/promotion/searchShopAndQuantity", callback, "promotionProgramCode",
				"promotionProgramName",arrParam,'searchStyleShop','searchStyleShop1','promotion',successCallback);
		return false;
	},
	searchShopFocusProgram:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIPromotionShop("Mã đơn vị",
				"Tên đơn vị", "Chọn đơn vị",
				"/commons/bary-centric-programme/searchShopDialog", callback, "promotionProgramCode",
				"promotionProgramName",arrParam,'searchStyleShopFocus','searchStyleShopFocus1','focus');
		return false;
	},
	searchShopIncentiveProgram:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIPromotionShop("Mã đơn vị",
				"Tên đơn vị", "Chọn đơn vị",
				"/commons/bary-centric-programme/searchShopDialog", callback, "promotionProgramCode",
				"promotionProgramName",arrParam,'searchStyleShopIncentive','searchStyleShopIncentive1','incentive');
		return false;
	},
	searchShopDisplayProgram:function(callback,arrParam) {
		CommonSearch.openSearchStyle1EasyUIPromotionShop("Mã đơn vị",
				"Tên đơn vị", "Chọn đơn vị",
				"/commons/display-programme/searchShopDialog", callback, "promotionProgramCode",
				"promotionProgramName",arrParam,'searchStyleShopDisplay','searchStyleShopDisplay1','display');
		return false;
	},
	openSearchStyle1EasyUICopyPromotionShop : function(codeText, nameText, title, codeFieldText, nameFieldText, searchDiv,arrParam) {
		CommonSearchEasyUI._arrParams = null;
		CommonSearchEasyUI._currentSearchCallback = null;
		$('#searchStyle1EasyUIDialogDivEx').css("visibility", "visible");
		var html = $('#searchStyle1EasyUIDialogDivEx').html();
		$('#searchStyle1EasyUIDialogEx').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 616,
	        height :'auto',
	        onOpen: function(){
	        	//@CuongND : my try Code <reset tabindex>
	        	$('.easyui-dialog #__btnSaveIncentiveProgram').unbind('click');
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
				//end <reset tabindex>
				$('.easyui-dialog #seachStyle1Code').focus();
				$('.easyui-dialog #errMsgSearch').html("").hide();
				$('.easyui-dialog #successMsgInfo').html("").hide();
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
				
				$('.easyui-dialog #__btnSave').bind('click',function(event) {
					var code = $('.easyui-dialog #seachStyle1Code').val().trim();
					var name = $('.easyui-dialog #seachStyle1Name').val().trim();
					if(code == "" || code == undefined || code == null){
						if(arrParam != null && arrParam != undefined){
							if(arrParam[0] == "promotion"){
								$('.easyui-dialog #errMsgSearch').html(msgBanChuaNhapMaCTKM).show();
							}
							if(arrParam[0] == "promotionManual"){
								$('.easyui-dialog #errMsgSearch').html(msgBanChuaNhapMaCTHTTM).show();
							}
						}
						
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					var msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', msgMaCTKMCopy,Utils._CODE);
					if(arrParam[0] == "promotionManual"){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', msgMaCTHTTMCopy,Utils._CODE);
					}
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					if(name == "" || name == undefined || name == null){
						if(arrParam[0] == "promotion"){
							$('.easyui-dialog #errMsgSearch').html(msgErrBanChuaNhapGiaTriTenCTKM).show();
						}
						if(arrParam[0] == "promotionManual"){
							$('.easyui-dialog #errMsgSearch').html(msgErrBanChuaNhapGiaTriTenCTHTTM).show();
						}
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', msgTenCTKMCopy);
					if(arrParam[0] == "promotionManual"){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', msgTenCTHTTMCopy);
					}
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					var promotionId = $('#promotionId').val();
					var params = new Object();
					params.promotionId = promotionId;
					params.promotionProgramCode = code;
					params.promotionProgramName = name;
					var title = msgBanCoMuonSaoChepCTKM;
					var promotionType = $('#promotionType').val();
					if(promotionType == "CTKM"){
						params.proType = 1;
						title = msgBanCoMuonSaoChepCTKM;
					}
					if(promotionType == "CTHTTM"){
						params.proType = 2;
						title = msgBanCoMuonSaoChepCTHTTM;
					}
					params.promotionType = promotionType;
					$.ajaxSetup({contentType:"application/x-www-form-urlencoded; charset=utf-8"});
					Utils.addOrSaveData(params, '/catalog/promotion/copypromotionprogram', null, 'errMsgSearch', function(data){
						//PromotionCatalog.loadShop();
						$('.easyui-dialog #successMsgInfo').html(msgSaoChepThanhCong).show();
						$('#searchStyle1EasyUIDialogEx').dialog('close');
						//$('#promotionId').val(data.promotionId);
						var proType = $('#proType').val();
//						window.location.href = '/catalog/promotion/viewdetail?promotionId='+encodeChar(data.promotionId)+'&proType='+encodeChar(proType);
						var params = new Object();
						Utils.getHtmlDataByAjax(params, '/catalog/promotion/viewdetail?promotionId='+encodeChar(data.promotionId)+'&proType='+encodeChar(proType),function(data) {
									$("#content").html(data).show();
								}, null, 'POST');
								return false;
					}, null, null, null, title, null);
				});
				$('.easyui-dialog #__btnSaveFocusProgram').bind('click',function(event){
					var code = $('.easyui-dialog #seachStyle1Code').val().trim();
					var name = $('.easyui-dialog #seachStyle1Name').val().trim();
					if(code == "" || code == undefined || code == null){
						$('.easyui-dialog #errMsgSearch').html("Bạn chưa nhập giá trị trường Mã CTTT.").show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					var msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', 'Mã CTTT',Utils._CODE);
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					if(name == "" || name == undefined || name == null){
						$('.easyui-dialog #errMsgSearch').html("Bạn chưa nhập giá trị trường Tên CTTT.").show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', 'Tên CTTT');
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					var focusId = $('#progId').val();
					var params = new Object();
					params.id = focusId;
					params.code = code;
					params.name = name;
					Utils.addOrSaveData(params, '/catalog/bary-centric-programme/copyfocusprogram', null, 'errMsgSearch', function(data){
						//PromotionCatalog.loadShop();
						$('.easyui-dialog #successMsgInfo').html("Sao chép dữ liệu thành công.").show();
						$('#searchStyle1EasyUIDialogEx').dialog('close');
						//$('#promotionId').val(data.promotionId);
						window.location.href =WEB_CONTEXT_PATH + '/catalog/bary-centric-programme/change?id='+encodeChar(data.focusId);
					}, null, null, null, "Bạn có muốn sao chép CTTT này ?", null);
				});
				$('.easyui-dialog #__btnSaveIncentiveProgram').bind('click',function(event){
					var code = $('.easyui-dialog #seachStyle1Code').val().trim();
					var name = $('.easyui-dialog #seachStyle1Name').val().trim();
					if(code == "" || code == undefined || code == null){
						msg = "Bạn chưa nhập giá trị trường Mã CTKT.";
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					var msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', 'Mã CTKT',Utils._CODE);
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					if(name == "" || name == undefined || name == null){
						$('.easyui-dialog #errMsgSearch').html("Bạn chưa nhập giá trị trường Tên CTKT.").show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', 'Tên CTKT');
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					var id = $('#id').val();
					var params = new Object();
					params.id = id;
					params.code = code;
					params.name = name;
					Utils.addOrSaveData(params, '/catalog/intensive-program/copyincentiveprogram', null, 'errMsgSearch', function(data){
						//PromotionCatalog.loadShop();
						$('.easyui-dialog #successMsgInfo').html("Sao chép dữ liệu thành công.").show();
						$('#searchStyle1EasyUIDialogEx').dialog('close');
						window.location.href =WEB_CONTEXT_PATH + '/catalog/intensive-program/view?id='+encodeChar(data.incentiveId);
					}, null, null, null, "Bạn có muốn sao chép CTKT này ?", null);
				});
				$('.easyui-dialog #__btnSaveDisplayProgram').bind('click',function(event){
					var code = $('.easyui-dialog #seachStyle1Code').val().trim();
					var name = $('.easyui-dialog #seachStyle1Name').val().trim();
					if(code == "" || code == undefined || code == null){
						msg = "Bạn chưa nhập giá trị trường Mã CTTB.";
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					var msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', 'Mã CTTB',Utils._CODE);
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					if(name == "" || name == undefined || name == null){
						$('.easyui-dialog #errMsgSearch').html("Bạn chưa nhập giá trị trường Tên CTTB.").show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', 'Tên CTTB');
					if(msg.length >0){
						$('.easyui-dialog #errMsgSearch').html(msg).show();
						$('.easyui-dialog #seachStyle1Name').focus();
						return false;
					}
					var id = $('#selId').val();
					var params = new Object();
					params.id = id;
					params.code = code;
					params.name = name;
					Utils.addOrSaveData(params, '/catalog/programme-display/copydisplayprogram', null, 'errMsgSearch', function(data){
						//PromotionCatalog.loadShop();
						$('.easyui-dialog #successMsgInfo').html("Sao chép dữ liệu thành công.").show();
						$('#searchStyle1EasyUIDialogEx').dialog('close');
						window.location.href =WEB_CONTEXT_PATH + '/catalog/programme-display/change?id='+encodeChar(data.displayProgramId);
					}, null, null, null, "Bạn có muốn sao chép CTTB này ?", null);
				});
	        },	       
	        onClose : function(){
	        	var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
	        	$('#searchStyle1EasyUIDialogDivEx').html(html);
	        	$('#searchStyle1EasyUIDialogDivEx').css("visibility", "hidden");
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #__btnSaveFocusProgram').unbind('click');
	        	$('.easyui-dialog #__btnSave').unbind('click');
	        }
	    });
		return false;
	},
	openSearchStyle1EasyUIPromotionShop : function(codeText, nameText, title, url, 
			callback, codeFieldText, nameFieldText, arrParam,searchDiv,searchDialog,program, successCallback) {
		CommonSearchEasyUI._arrParams = null;
		CommonSearchEasyUI._currentSearchCallback = null;
		var html = $('#'+searchDiv).html();
		$('#'+searchDialog).dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 616,
	        height :'auto',
	        onOpen: function(){
				$('.easyui-dialog #seachStyleShopCode').focus();
				$('.easyui-dialog #searchStyleShopUrl').val(url);
				$('.easyui-dialog #searchStyleShopCodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyleShopNameText').val(nameFieldText);
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				
				$('.easyui-dialog #seachStyleShopCodeLabel').html(codeText);
				$('.easyui-dialog #seachStyleShopNameLabel').html(nameText);
				if(program != null && program != undefined && program == "promotion"){
					$('.easyui-dialog #searchStyleShopGrid').show();
					$('.easyui-dialog #searchStyleShopGrid').treegrid({  
					    url:  CommonSearch.getSearchStyleShopGridUrl(url, '','', arrParam),
					    width:($('#searchStyleShopContainerGrid').width()-20),  
				        height:400,  
				        idField: 'id',  
				        treeField: 'data',
					    columns:[[  
					        {field:'data',title:jsSaleSuperviseTreeGridColumnHeader2nd,resizable:false,width:500, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},
//					        {field:'editSoSuat',title:'Số suất',width:140,align:'center',resizable:false,formatter:function(value,row,index){
//					        	if(row.isJoin == 1){
//					        		return '<input type ="text"  disabled="disabled" maxlength="9" size="13" style="text-align:right;" class="soSuatKMDialogShop" onkeypress="return numbersonly(event, this);" onfocus="PromotionCatalog.bindFormat();">';
//					        	}
//					        	if(row.isShop == 1){
//					        		return '<input type ="text" id="txtQuantity_'+row.id+'" maxlength="9" size="13" style="text-align:right;" class="soSuatKMDialogShop" onkeypress="return numbersonly(event, this);" onfocus="PromotionCatalog.bindFormat();">';
//					        	}
//					        }},
					        {field:'edit',title:'',width:65,align:'center',resizable:false,formatter:function(value,row,index){
					        	if(row.isJoin >= 1){
					        		return '<input type ="checkbox" disabled="disabled">';
					        	}
					        	var classParent = "";
					        	if(row.parentId != null && row.parentId != undefined){
					        		classParent = "class_"+row.parentId;
					        	}
					        	var type = 1;
					        	if(row.type != undefined && row.type != null){
					        		type = row.type;
					        	}
					        	if (PromotionCatalog._isPromotionPage != null && PromotionCatalog._isPromotionPage == true){
					        		if (row != null && (row.type == 1 || row.type == 2)){
						        		if ($('#adminUser').val() == 'true'){
						        			return '<input type ="checkbox" class="'+classParent+'" value="'+row.id+'" id="check_'+row.id+'" onclick="return PromotionCatalog.onCheckShop('+row.id+','+type+');">';
							        	}
						        		return '';
						        	}
					        	}
					        	return '<input type ="checkbox" class="'+classParent+'" value="'+row.id+'" id="check_'+row.id+'" onclick="return PromotionCatalog.onCheckShop('+row.id+','+type+');">';
					        }}
					    ]],
					    onLoadSuccess:function(row,data){
					    	$(window).resize();
					    	//var row = $('.easyui-dialog .treegrid-tr-tree .datagrid-row');
					    	var length = parseInt(data.solg);
					    	$('#solg').val(length);
					    	var s = $('#width').val();
					    	if(s == null || s == "" || s == undefined){
					    		s = $('.datagrid-header-row td[field=editSoSuat] div').width();
					    		$('#width').val(s);
					    	}
					    	$('.soSuatKMDialogShop').each(function(){
					    		Utils.formatCurrencyFor($(this).attr('id'));
					    	});
					    	if(PromotionCatalog._listShopId != null && PromotionCatalog._listShopId.length > 0){
					    		var listSize = PromotionCatalog._listShopId.length;
					    		for(var i=0;i<listSize;i++){
					    			var value = PromotionCatalog._listQuantity[i];
					    			$('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val(value);
					    			$('.easyui-dialog #check_'+PromotionCatalog._listShopId[i]).attr('checked','checked');
								} 
					    	}
					    	$('input[type=checkbox]').each(function(){
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
					    	if(length > 15){
//					    		var s = $('.datagrid-header-row td[field=editSoSuat] div').width();
//					    		$('#width').val(s);
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=editSoSuat] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=editSoSuat] div').width(s-17);
					    	}
					    	setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
					    	if (successCallback != null){
					    		successCallback.call(this, data);
					    	}
					    },
					    onExpand:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value + countNode;
					    	$('#solg').val(value);
					    	if(value > 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=editSoSuat] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=editSoSuat] div').width(s-17);
					    	}
					    },
					    onCollapse:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value - countNode;
					    	$('#solg').val(value);
					    	if(value < 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=editSoSuat] div').width(s);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=editSoSuat] div').width(s);
					    	}
					    }
					});
				}
				if(program != null && program != undefined && program == "focus"){
					$('.easyui-dialog #searchStyleShopGrid').show();
					$('.easyui-dialog #searchStyleShopGrid').treegrid({  
					    url:  CommonSearch.getSearchStyleShopGridUrl(url, '','', arrParam),
					    width:($('#searchStyleShopContainerGrid').width()-20),  
				        height:400,  
				        idField: 'id',  
				        treeField: 'data',
					    columns:[[  
					        {field:'data',title:'Đơn vị',resizable:false,width:516, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},
					        {field:'edit',title:'',width:50,align:'center',resizable:false,formatter:function(value,row,index){
					        	if(row.isJoin >= 1){
					        		return '<input type ="checkbox" disabled="disabled">';
					        	}
					        	var classParent = "";
					        	if(row.parentId != null && row.parentId != undefined){
					        		classParent = "class_"+row.parentId;
					        	}
					        	return '<input type ="checkbox" class="'+classParent+'" value="'+row.id+'" id="check_'+row.id+'" onclick="return BaryCentricProgrammeCatalog.onCheckShop('+row.id+');">';
					        }}
					    ]],
					    onLoadSuccess:function(row,data){
					    	$(window).resize();
					    	if(data.rows != null && data.rows != undefined){
						    	var length = parseInt(data.solg);
						    	$('#solg').val(length);
						    	var s = $('#width').val();
						    	if(s == null || s == "" || s == undefined){
						    		s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
						    		$('#width').val(s);
						    	}
						    	if(length > 15){
//						    		var s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
//						    		$('#width').val(s);
						    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
					    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
						    	}
					    	}
					    	setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
					    },
					    onExpand:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value + countNode;
					    	$('#solg').val(value);
					    	if(value > 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
					    	}
					    },
					    onCollapse:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value - countNode;
					    	$('#solg').val(value);
					    	if(value < 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s);
					    	}
					    }
					});
				}
				if(program != null && program != undefined && program == "incentive"){
					$('.easyui-dialog #searchStyleShopGrid').show();
					$('.easyui-dialog #searchStyleShopGrid').treegrid({  
					    url:  CommonSearch.getSearchStyleShopGridUrl(url, '','', arrParam),
					    width:($('#searchStyleShopContainerGrid').width()-20),  
				        height:400,  
				        idField: 'id',  
				        treeField: 'data',
					    columns:[[  
					        {field:'data',title:'Đơn vị',resizable:false,width:516, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},
					        {field:'edit',title:'',width:50,align:'center',resizable:false,formatter:function(value,row,index){
					        	if(row.isJoin >= 1){
					        		return '<input type ="checkbox" disabled="disabled">';
					        	}
					        	var classParent = "";
					        	if(row.parentId != null && row.parentId != undefined){
					        		classParent = "class_"+row.parentId;
					        	}
					        	return '<input type ="checkbox" class="'+classParent+'" value="'+row.id+'" id="check_'+row.id+'" onclick="return IncentiveProgramCatalog.onCheckShop('+row.id+');">';
					        }}
					    ]],
					    onLoadSuccess:function(row,data){
					    	$(window).resize();
					    	var length = parseInt(data.solg);
					    	$('#solg').val(length);
					    	var s = $('#width').val();
					    	if(s == null || s == "" || s == undefined){
					    		s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
					    		$('#width').val(s);
					    	}
					    	if(length > 15){
//					    		var s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
//					    		$('#width').val(s);
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
					    	}
					    	setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
					    },
					    onExpand:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value + countNode;
					    	$('#solg').val(value);
					    	if(value > 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
					    	}
					    },
					    onCollapse:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value - countNode;
					    	$('#solg').val(value);
					    	if(value < 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s);
					    	}
					    }
					});
				}
				if(program != null && program != undefined && program == "display"){
					$('.easyui-dialog #searchStyleShopGrid').show();
					$('.easyui-dialog #searchStyleShopGrid').treegrid({  
					    url:  CommonSearch.getSearchStyleShopGridUrl(url, '','', arrParam),
					    width:($('#searchStyleShopContainerGrid').width()-20),  
				        height:400,  
				        idField: 'id',  
				        treeField: 'data',
					    columns:[[  
					        {field:'data',title:'Đơn vị',resizable:false,width:516, formatter:function(value, row, index) {
					        	  return Utils.XSSEncode(value);
					          }},
					        {field:'edit',title:'',width:50,align:'center',resizable:false,formatter:function(value,row,index){
					        	if(row.isJoin >= 1){
					        		return '<input type ="checkbox" disabled="disabled">';
					        	}
					        	var classParent = "";
					        	if(row.parentId != null && row.parentId != undefined){
					        		classParent = "class_"+row.parentId;
					        	}
					        	return '<input type ="checkbox" class="'+classParent+'" value="'+row.id+'" id="check_'+row.id+'" onclick="return ProgrammeDisplayCatalog.onCheckShop('+row.id+');">';
					        }}
					    ]],
					    onLoadSuccess:function(row,data){
					    	$(window).resize();
					    	var length = parseInt(data.solg);
					    	$('#solg').val(length);
					    	var s = $('#width').val();
					    	if(s == null || s == "" || s == undefined){
					    		s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
					    		$('#width').val(s);
					    	}
					    	if(length > 15){
//					    		var s = $('.easyui-dialog .datagrid-header-row td[field=data] div').width();
//					    		$('#width').val(s);
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
					    	}
					    	setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
					    },
					    onExpand:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value + countNode;
					    	$('#solg').val(value);
					    	if(value > 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s-17);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s-17);
					    	}
					    },
					    onCollapse:function(row){
					    	var value = parseInt($('#solg').val());
					    	var width = parseInt($('#width').val());
					    	var countNode = parseInt(row.countNode);
					    	value = value - countNode;
					    	$('#solg').val(value);
					    	if(value < 15){
					    		var s = width;
					    		$('#searchStyleShopContainerGrid .datagrid-header-row td[field=data] div').width(s);
				    			$('#searchStyleShopContainerGrid .datagrid-row td[field=data] div').width(s);
					    	}
					    }
					});
				}
				$('.easyui-dialog #btnSearchStyleShop').bind('click',function(event) {
					$('.easyui-dialog #errMsgDialog').html('').hide();
					var code = $('.easyui-dialog #seachStyleShopCode').val().trim();
					var name = $('.easyui-dialog #seachStyleShopName').val().trim();
					var url = CommonSearch.getSearchStyleShopGridUrl($('.easyui-dialog #searchStyleShopUrl').val().trim(),code, name, CommonSearch._arrParams);
					if(PromotionCatalog._listShopId != null && PromotionCatalog._listShopId != undefined && PromotionCatalog._listShopId.length > 0){
						var listSize = PromotionCatalog._listShopId.length;
						for(var i=0;i<listSize;i++){
							var value = $('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val();
							if(value != null && value != undefined){
								PromotionCatalog._listQuantity[i] = value;	
							}
						}
					}
					$('.easyui-dialog #searchStyleShopGrid').treegrid({url:url});
				});
				$('.easyui-dialog #seachStyleShopCode').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgDialog').html('').hide();
						var code = $('.easyui-dialog #seachStyleShopCode').val().trim();
						var name = $('.easyui-dialog #seachStyleShopName').val().trim();
						var url = CommonSearch.getSearchStyleShopGridUrl($('.easyui-dialog #searchStyleShopUrl').val().trim(),code, name, CommonSearch._arrParams);
						if(PromotionCatalog._listShopId != null && PromotionCatalog._listShopId != undefined && PromotionCatalog._listShopId.length > 0){
							var listSize = PromotionCatalog._listShopId.length;
							for(var i=0;i<listSize;i++){
								var value = $('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val();
								if(value != null && value != undefined){
									PromotionCatalog._listQuantity[i] = value;	
								}
							}
						}
						$('.easyui-dialog #searchStyleShopGrid').treegrid({url:url});
					}
				});
				$('.easyui-dialog #seachStyleShopName').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgDialog').html('').hide();
						var code = $('.easyui-dialog #seachStyleShopCode').val().trim();
						var name = $('.easyui-dialog #seachStyleShopName').val().trim();
						var url = CommonSearch.getSearchStyleShopGridUrl($('.easyui-dialog #searchStyleShopUrl').val().trim(),code, name, CommonSearch._arrParams);
						if(PromotionCatalog._listShopId != null && PromotionCatalog._listShopId != undefined && PromotionCatalog._listShopId.length > 0){
							var listSize = PromotionCatalog._listShopId.length;
							for(var i=0;i<listSize;i++){
								var value = $('.easyui-dialog #txtQuantity_'+PromotionCatalog._listShopId[i]).val();
								if(value != null && value != undefined){
									PromotionCatalog._listQuantity[i] = value;	
								}
							}
						}
						$('.easyui-dialog #searchStyleShopGrid').treegrid({url:url});
					}
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
	        },
	        onClose : function(){
	        	$('#'+searchDiv).html(html);
	        	//$('#searchStyleShopContainerGrid').html('<table id="searchStyleShopGrid" class="easyui-treegrid"></table>');
	        	$('.easyui-dialog #seachStyleShopCode').val('');
	        	$('.easyui-dialog #seachStyleShopName').val('');
	        	$('.easyui-dialog #errMsgDialog').html('').hide();
	        	PromotionCatalog._listShopId = new Array();
	        	PromotionCatalog._listQuantity = new Array();
	        	PromotionCatalog.lstType = new Array();
//	        	IncentiveProgramCatalog._listShopId = new Array();
//	        	BaryCentricProgrammeCatalog._listShopId = new Array();
	        }
	    });
		return false;
	},
	getSearchStyleShopGridUrl : function(url, code, name, arrParam) {		
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '?curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + arrParam[i].name + "=";
				if(arrParam[i].value != null && arrParam[i].value != undefined){
					searchUrl = searchUrl + arrParam[i].value;
				}
			}
		}
		searchUrl+= "&promotionProgramCode=" + encodeChar(code) + "&promotionProgramName=" + encodeChar(name);
		return searchUrl;
	},
	openSearchStyleCustomerShopEasyUIDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam,idFieldText,addressText, addressFieldText) {
		//$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyleCustomerDialogDiv').css("visibility", "visible");
		var html = $('#searchStyleCustomerDialog').html();
		$('#searchStyleCustomerDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 600,
	        height : 'auto',
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyleCustomerCode').focus();
				$('.easyui-dialog #searchStyleCustomerUrl').val(url);
				$('.easyui-dialog #errMsgSearchCustomer').html("").hide();
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				$('.easyui-dialog #searchStyle1IdText').val(idFieldText);
				Utils.bindFormatOnTextfield('searchStyleQuantity',Utils._TF_NUMBER,null);
		    	Utils.formatCurrencyFor('searchStyleQuantity');
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.easyui-dialog #searchStyle1AddressText').val(addressFieldText);
					$('.easyui-dialog #seachStyle1AddressLabel').show();
					$('.easyui-dialog #seachStyleCustomerAddress').show();					
				}
//				$('.easyui-dialog #btnSearchStyle1').css('margin-left', 270);
//				$('.easyui-dialog #btnSearchStyle1').css('margin-top', 5);				
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var idField = 'id';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if (idFieldText != null&& idFieldText != undefined && idFieldText.length > 0) {
					idField = idFieldText;
				}
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
				$('#searchStyleCustomerGrid').show();
				$('#searchStyleCustomerGrid').datagrid({
					url : CommonSearch.getSearchStyleCustomerMapGridUrl(url, '', '','', arrParam),
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :true,
					pagination:true,
					rowNum : 10,
					pageNumber: 1,
					scrollbarSize : 0,
					fitColumns:true,
					pageList  : [10,20,30],
					width : ($('#searchStyleCustomerContainerGrid').width()),
				    columns:[[  
				        {field:'shortCode',title:codeText,align:'left', width:120, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.shortCode);
				        }},  
				        {field:'customerName',title:nameText,align:'left', width:170, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.customerName);
				        }},  
				        {field:'address', title:addressText,width:250, align:'left',sortable : false,resizable : false,formatter : function(value,row,index){
				        	return Utils.XSSEncode(row.address);
				        }},
				        {field: 'id', checkbox:true, align:'center', width:80,sortable : false,resizable : false}
				    ]],
				    onLoadSuccess :function(data){
				    	
				    	 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 if(data.rows.length == 0){
			    			 $('.datagrid-header-check input').removeAttr('checked');
			    		 }
//							setTimeout(function(){
//								$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
//								$('.datagrid-header-check input').removeAttr('checked');
//				    		},500);
					    	var originalSize = $('.easyui-dialog .datagrid-header-row td[field=shortCode] div').width();
					    	if(originalSize != null && originalSize != undefined){
					    		PromotionCatalog._listCustomerDialogSize.push(originalSize);
					    	}
					    	Utils.updateRownumWidthForJqGridEX1('.easyui-dialog ','shortCode',PromotionCatalog._listCustomerDialogSize,true);
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
			    		 $('input[name="id"]').each(function(){
			 				var temp = PromotionCatalog._listCustomer.get($(this).val());
			 				if(temp!=null) $(this).attr('checked','checked');
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
				    },
				    onCheck:function(i,r){
				    	PromotionCatalog._listCustomer.put(r.id,r);
				    },
				    onUncheck:function(i,r){
				    	PromotionCatalog._listCustomer.remove(r.id);
				    },
				    onCheckAll:function(r){
				    	for(i=0;i<r.length;i++){
				    		PromotionCatalog._listCustomer.put(r[i].id,r[i]);
				    	}
				    },
				    onUncheckAll:function(r){
				    	for(i=0;i<r.length;i++){
				    		PromotionCatalog._listCustomer.remove(r[i].id);
				    	}
				    }
				}); 
				$('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				$('.easyui-dialog #btnSearchStyleCustomer').bind('click',function(event) {
					
						$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
						var code = $('.easyui-dialog #seachStyleCustomerCode').val().trim();
						var name = $('.easyui-dialog #seachStyleCustomerName').val().trim();
						var address = $('.easyui-dialog #seachStyleCustomerAddress').val().trim();
						var url = CommonSearch.getSearchStyleCustomerMapGridUrl($('.easyui-dialog #searchStyleCustomerUrl').val(), code, name,address, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleCustomerGrid').datagrid({url:url,pageNumber:1});						
						$('.easyui-dialog #seachStyleCustomerCode').focus();
						setTimeout(function(){
							$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
			    		},500);
				});
				
				$('.easyui-dialog #btnSaveCustomer').bind('click',function(event) {
					//hoatv13 update 26/03/2014
					var allRowsRouting=$('#promotionRoutingExGrid').datagrid('getRows');
					var quantityMaxRouting=0;
					for(var i=0;i<allRowsRouting.length;i++){//Danh sách số suất KM cho tuyến đã có.
						if(arrParam[1].value==allRowsRouting[i].routingId){
							if(allRowsRouting[i].quantityMax!=null){
								quantityMaxRouting =quantityMaxRouting+parseInt(allRowsRouting[i].quantityMax);
							}else{
								quantityMaxRouting=null;
							}
						}
						
					}
					var allRowsCustomer=$('#promotionCustomerExGrid').datagrid('getRows');
					var flag=0;
					var quantityMaxCustomer=0;
					for(var i=0;i<allRowsCustomer.length;i++){//Danh sách số suất KM cho khách hàng đã có.
						if(allRowsCustomer[i].quantityMax !=null){
							quantityMaxCustomer =quantityMaxCustomer+parseInt(allRowsCustomer[i].quantityMax);
						}else{
							flag=1;
						}
						
					}
					var quantityMax = $('.easyui-dialog #seachStyleQuantity').val();
					if(quantityMax.length > 0 && (quantityMax * 1) <= 0){
						$('#errMsgSearchCustomer').html('Số suất phải là số nguyên dương.').show();
						return false;
					}
					var lstIdCustomer = new Array();
					for(i=0;i<PromotionCatalog._listCustomer.keyArray.length;i++){
						var temp = PromotionCatalog._listCustomer.get(PromotionCatalog._listCustomer.keyArray[i]);
						if(temp!=null){
							lstIdCustomer.push(temp.id);
							if(quantityMax !='' && quantityMax!=undefined){
								quantityMaxCustomer=quantityMaxCustomer+parseInt(quantityMax);
							}else{
								flag=1;
							}
						}
					}
					if( quantityMaxRouting!=null && quantityMaxRouting!=undefined && flag!=0){
						$('#errMsgSearchCustomer').html('Tuyến đã phân bổ số suất, không thêm khách hàng về dạng không quan tâm số suất được.').show();
						return false;
					}
					if( quantityMaxRouting!=null && quantityMaxRouting!=undefined && quantityMaxRouting<quantityMaxCustomer){
						$('#errMsgSearchCustomer').html('Số suất khuyến mãi của Khách hàng không được lớn hơn suất khuyến mãi của Tuyến.').show();
						return false;
					}
					//end
					var s = $('#errMsgSearchCustomer').html();
					var flag = true;
					if(s.length > 0){
						var value = quantityMax;
						if(value != null && value != undefined){
							value = value * 1;
							if(isNaN(value)){
								$('#errMsgSearchCustomer').show();
								return false;
							}
						}
					}else{
						var value = quantityMax;
						if(value != null && value != undefined){
							value = value * 1;
							if(isNaN(value)){
								$('#errMsgSearchCustomer').show();
								return false;
							}
						}
					}
					var params = new Object();
					params.quantityMax = quantityMax;
					params.listCustomerId =lstIdCustomer;
					params.shopId = $('#shopMapId').val();
					params.routingId = $('#routingId').val();
					params.promotionId = $('#promotionShopMap').val();
					if(lstIdCustomer == undefined || lstIdCustomer == null || lstIdCustomer.length <=0){
						$('.easyui-dialog #errMsgSearchCustomer').html("Bạn chưa chọn KH để cập nhật số suất.").show();
						return false;
					}
					$('#errMsgSearchCustomer').html('').hide();
					Utils.addOrSaveData(params, '/catalog/promotion/createcustomermap', null, 'errMsgSearchCustomer', function(data){
						if(data != null && data.error == undefined && data.errMsg == undefined){
							var routingCodeHidden = $('#routingCodeHidden').val();
							var routingIdHidden = $('#routingId').val();
							PromotionCatalog.searchCustomerShopMap($('#promotionShopMap').val(),$('#shopMapId').val(),routingCodeHidden, routingIdHidden);
							PromotionCatalog._listCustomer = new Map();
							$('#errMsgSearchCustomer').html("").hide();
							$('#searchStyleCustomerDialog').dialog('close');
							$('#errMsgCustomer').html("").hide();
							$('#successMsgCustomer').html(msgCommon1).show();
							var tm = setTimeout(function(){
								$('#successMsgCustomer').html('').hide();
								clearTimeout(tm); 
							}, 3000);
						}
					}, null, null, null, "Bạn có muốn thêm khách hàng không ?", null);
					//$('.easyui-dialog').dialog('close');
				});
				$('.easyui-dialog #seachStyleCustomerCode').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
						var code = $('.easyui-dialog #seachStyleCustomerCode').val().trim();
						var name = $('.easyui-dialog #seachStyleCustomerName').val().trim();
						var address = $('.easyui-dialog #seachStyleCustomerAddress').val().trim();
						var url = CommonSearch.getSearchStyleCustomerMapGridUrl($('.easyui-dialog #searchStyleCustomerUrl').val(), code, name,address, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleCustomerGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleCustomerCode').focus();
						setTimeout(function(){
							$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
			    		},500);
					}
				});
				$('.easyui-dialog #seachStyleCustomerName').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
						var code = $('.easyui-dialog #seachStyleCustomerCode').val().trim();
						var name = $('.easyui-dialog #seachStyleCustomerName').val().trim();
						var address = $('.easyui-dialog #seachStyleCustomerAddress').val().trim();
						var url = CommonSearch.getSearchStyleCustomerMapGridUrl($('.easyui-dialog #searchStyleCustomerUrl').val(), code, name,address, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleCustomerGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleCustomerCode').focus();
						setTimeout(function(){
							$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
			    		},500);
					}
				});
				$('.easyui-dialog #seachStyleCustomerAddress').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
						var code = $('.easyui-dialog #seachStyleCustomerCode').val().trim();
						var name = $('.easyui-dialog #seachStyleCustomerName').val().trim();
						var address = $('.easyui-dialog #seachStyleCustomerAddress').val().trim();
						var url = CommonSearch.getSearchStyleCustomerMapGridUrl($('.easyui-dialog #searchStyleCustomerUrl').val(), code, name,address, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleCustomerGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleCustomerCode').focus();
						setTimeout(function(){
							$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
			    		},500);
					}
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
	        },
	        onClose : function(){
	        	$('#searchStyleCustomerDialog').html(html);
	        	$('#searchStyleCustomerDialogDiv').hide();
	        	//$('#searchStyleCustomerContainerGrid').html('<table id="searchStyleCustomerGrid" class="easyui-datagrid" style="width: 520px;"></table>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');
	        	$('.easyui-dialog #btnSaveCustomer').unbind('click');
	        	$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
	        	PromotionCatalog._listCustomer = new Map();
	        }
	    });
		return false;
	},
	//LocTT1 - 
	openSearchStyleRoutingShopEasyUIDialog : function(shopId, promotionShopMapId) {
		//$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyleRoutingDialogDiv').css("visibility", "visible");
		var html = $('#searchStyleCustomerDialog').html();
		$('#searchStyleRoutingDialog').dialog({  
	        title: 'Thông tin tuyến',  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 800,
//	        height : 'auto',
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});	
				var url = '/catalog/promotion/searchroutingshoppopup?shopId='+shopId+'&promotionShopMapId='+promotionShopMapId;
				$('.easyui-dialog #seachStyleRoutingCode').focus();
				$('.easyui-dialog #searchStyleRoutingUrl').val(url);
				$('.easyui-dialog #errMsgSearchRouting').html("").hide();
				
				$('#searchStyleRoutingGrid').show();
				$('#searchStyleRoutingGrid').datagrid({
					url : url,
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :false,
//					view: bufferview,
					pagination:true,
					rowNum : 10,
					pageNumber: 1,
					scrollbarSize : 0,
					fitColumns:true,
					pageList  : [10,20,30],
					width : ($('#searchStyleRoutingContainerGrid').width()),
				    columns:[[  
				        {field:'routingCode',title:'Mã tuyến',align:'left', width:160, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.routingCode);
				        }},  
				        {field:'routingName',title:'Tên tuyến',align:'left', width:250, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.routingName);
				        }},
				        {field:'fromDate',title:msgTuNgay,align:'left', width:120, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.fromDate);
				        }},  
				        {field:'toDate',title:msgDenNgay,align:'left', width:120, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.toDate);
				        }},
				        {field:'staffName',title:'NVBH',align:'left', width:270, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.staffName);
				        }},
				        {field:'quantityMax', title:'Số suất',width:250, align:'left',sortable : false,resizable : false,formatter : function(value,row,index){
				        	if(value != undefined && value != null){
				        		return '<input type="text" index="'+index+'" id="txt_'+row.id+'" value="'+value+'" style="text-align:center; width:140px;" class="soSuatKMRouting" maxlength="9" onkeypress="return numbersonly(event, this);"/>';
				        	}
				        	else
				        		return '<input type="text" index="'+index+'" id="txt_'+row.id+'" style="text-align:center; width:140px;" class="soSuatKMRouting" maxlength="9" onkeypress="return numbersonly(event, this);"/>';
				        	
				        }},
				        {field: 'id', checkbox:true, align:'center', width:80,sortable : false,resizable : false}
				    ]],
				    onLoadSuccess :function(data){
				    	 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 $('.soSuatKMRouting').each(function(){
								var objectId = $(this).attr('id');
								if(objectId!=null && objectId!=undefined && objectId.length>0){
									Utils.bindFormatOntextfieldCurrencyFor(objectId, Utils._TF_NUMBER);
								}			
							});
				    	var originalSize = $('.easyui-dialog .datagrid-header-row td[field=routingCode] div').width();
				    	if(originalSize != null && originalSize != undefined){
				    		PromotionCatalog._listCustomerDialogSize.push(originalSize);
				    	}
				    	Utils.updateRownumWidthForJqGridEX1('.easyui-dialog ','routingCode',PromotionCatalog._listCustomerDialogSize,true);
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1500);
			    		 $('#searchStyleRoutingContainerGrid .datagrid-pager').html('').hide();
				    }
				}); 
				$('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				$('.easyui-dialog #btnSearchStyleRouting').bind('click',function(event) {
						$('.easyui-dialog #errMsgSearchRouting').html('').hide();
						var code = $('.easyui-dialog #seachStyleRoutingCode').val().trim();
						var name = $('.easyui-dialog #seachStyleRoutingName').val().trim();
						var url = CommonSearch.getSearchStyleRoutingMapGridUrl($('.easyui-dialog #searchStyleRoutingUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleRoutingGrid').datagrid({url:url,pageNumber:1});						
						$('.easyui-dialog #seachStyleRoutingCode').focus();
				});
				$('.easyui-dialog #btnSaveRoutingShopMap').bind('click',function(event) {
					
					$('#errMsgSearchRouting').html('').hide();
					var listRoutingId = new Array();
					var listQuantityMax = new Array();
					var allRows = $('#searchStyleRoutingGrid').datagrid('getRows');
					for(var i=0;i<allRows.length;i++){
						if($('#searchStyleRoutingContainerGrid input:checkbox[name=id]:eq('+ i +')').is(':checked')){
							var quantityMax = ($("input.soSuatKMRouting[index="+i+"]")).val().trim();
							if(quantityMax != null && quantityMax.length > 0){
								if((quantityMax * 1) <= 0){
									$('#errMsgSearchRouting').html('Số suất ở dòng ' + (i + 1) + ' phải là số nguyên dương.').show();
									return false;
								}
								listRoutingId.push(allRows[i].routingId);
								listQuantityMax.push(quantityMax);
							}
							else{
								listRoutingId.push(allRows[i].routingId);
								listQuantityMax.push(-1);
							}
						}
					}
					//hoatv13 update 25/03/2014
					var allRowsRouting=$('#promotionRoutingExGrid').datagrid('getRows');
					var quantityMaxRouting=0;
					var flag=false;
					for(var i=0;i<allRowsRouting.length;i++){//Danh sách số suất KM cho tuyến đã có.
						if(allRowsRouting[i].quantityMax !=null){
							quantityMaxRouting =quantityMaxRouting+parseInt(allRowsRouting[i].quantityMax);
						}
						else{
							flag=true;
						}
					}
					for(var i=0;i<listQuantityMax.length;i++){//Danh sách số suất KM cho tuyến cần thêm.
						if(listQuantityMax[i] !=-1){
							quantityMaxRouting=quantityMaxRouting+parseInt(Utils.returnMoneyValue(listQuantityMax[i]));
						}
						else{
							flag=true;
						}
					}
					var quantityMaxNPP=$('#exGrid').treegrid('find',shopId).soXuatKM;
					
					if(listRoutingId.length== 0){
						$('#errMsgSearchRouting').html('Bạn chưa chọn tuyến nào để phân bổ').show();
						return;
					}
					if(quantityMaxNPP !=null && flag==true)
					{
						$('#errMsgSearchRouting').html('Đơn vị đã phân bổ số suất, không thêm tuyến về dạng không quan tâm số suất được.').show();
						return;
						
					}
					if(quantityMaxRouting!=null && quantityMaxRouting !=undefined && quantityMaxNPP!=null && parseInt(quantityMaxRouting)> parseInt(quantityMaxNPP) && flag!=true){
						$('#errMsgSearchRouting').html('Số suất khuyến mãi của Tuyến không được lớn hơn số suất khuyến mãi của Đơn vị').show();
						return;
					}
					//end
//					var lstIdCustomer = new Array();
//					for(var i=0;i<PromotionCatalog._listCustomer.keyArray.length;i++){
//						var temp = PromotionCatalog._listCustomer.get(PromotionCatalog._listCustomer.keyArray[i]);
//						if(temp!=null){
//							lstIdCustomer.push(temp.id);
//						}
//					}
//					var s = $('#errMsgSearchCustomer').html();
//					var flag = true;
//					if(s.length > 0){
//						var value = quantityMax;
//						if(value != null && value != undefined){
//							value = value * 1;
//							if(isNaN(value)){
//								$('#errMsgSearchCustomer').show();
//								return false;
//							}
//						}
//					}else{
//						var value = quantityMax;
//						if(value != null && value != undefined){
//							value = value * 1;
//							if(isNaN(value)){
//								$('#errMsgSearchCustomer').show();
//								return false;
//							}
//						}
//					}
					var params = new Object();
					params.listRoutingId = listRoutingId;
					params.listQuantityMax = listQuantityMax;
//					params.quantityMax = quantityMax;
//					params.listCustomerId =lstIdCustomer;
					params.shopId = $('#shopMapId').val();
					params.promotionId = $('#promotionShopMap').val();
//					if(lstIdCustomer == undefined || lstIdCustomer == null || lstIdCustomer.length <=0){
//						$('.easyui-dialog #errMsgSearchCustomer').html("Bạn chưa chọn KH để cập nhật số suất.").show();
//						return false;
//					}
					Utils.addOrSaveData(params, '/catalog/promotion/saveroutingshopmap', null, 'errMsgSearchRouting', function(data){
						if(data != null && data.error == undefined && data.errMsg == undefined){
							PromotionCatalog.searchRoutingShopMap($('#promotionShopMap').val(),$('#shopMapId').val(),data.shopCode);
							PromotionCatalog._listCustomer = new Map();
							$('#errMsgSearchCustomer').html("").hide();
							$('#searchStyleRoutingDialog').dialog('close');
							$('#errMsgCustomer').html("").hide();
							$('#successMsgCustomer').html(msgCommon1).show();
							var tm = setTimeout(function(){
								$('#successMsgCustomer').html('').hide();
								clearTimeout(tm); 
							}, 3000);
						}
					}, null, null, null, "Bạn có muốn thêm tuyến không ?", null);
					//$('.easyui-dialog').dialog('close');
				});
				$('.easyui-dialog #seachStyleRoutingCode').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
						var code = $('.easyui-dialog #seachStyleRoutingCode').val().trim();
						var name = $('.easyui-dialog #seachStyleRoutingName').val().trim();
						var url = CommonSearch.getSearchStyleRoutingMapGridUrl($('.easyui-dialog #searchStyleRoutingUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleRoutingGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleRoutingCode').focus();
//						setTimeout(function(){
//							$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
//			    		},500);
					}
				});
				$('.easyui-dialog #seachStyleRoutingName').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchRouting').html('').hide();
						var code = $('.easyui-dialog #seachStyleRoutingCode').val().trim();
						var name = $('.easyui-dialog #seachStyleRoutingName').val().trim();
						var url = CommonSearch.getSearchStyleRoutingMapGridUrl($('.easyui-dialog #searchStyleRoutingUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleRoutingGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleRoutingName').focus();
					}
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
	        },
	        onClose : function(){
	        	$('#searchStyleCustomerDialog').html(html);
	        	$('#searchStyleCustomerDialogDiv').hide();
	        	//$('#searchStyleCustomerContainerGrid').html('<table id="searchStyleCustomerGrid" class="easyui-datagrid" style="width: 520px;"></table>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');
	        	$('.easyui-dialog #btnSaveRoutingShopMap').unbind('click');
	        	$('.easyui-dialog #errMsgSearchCustomer').html('').hide();
	        	PromotionCatalog._listCustomer = new Map();
	        }
	    });
		return false;
	},
	openSearchStyle1EasyUICreateUpdateGroupPOAuto : function(codeText, nameText, title, codeFieldText, nameFieldText, searchDialog,searchDiv,arrayParam) {
		CommonSearchEasyUI._arrParams = null;
		CommonSearchEasyUI._currentSearchCallback = null;
		$('#'+searchDiv).css("visibility", "visible");
		var html = $('#'+searchDiv).html();
		$('#'+searchDialog).dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 616,
	        height :'auto',
	        onOpen: function(){
	        	//@CuongND : my try Code <reset tabindex>
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
				//end <reset tabindex>
				//$('.easyui-dialog #searchStyle1Code').focus();
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				
//				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
//				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
				
				if(arrayParam != null && arrayParam[0] == 1){
					var code = arrayParam[2];
					var name = arrayParam[3];
					var status = arrayParam[4];
					$('.easyui-dialog #seachStyle1Code').attr('disabled','disabled');
					$('.easyui-dialog #seachStyle1Code').val(code);
					$('.easyui-dialog #seachStyle1Name').val(name);
					$('.easyui-dialog #seachStyle1Name').focus();
					$('.easyui-dialog #statusDialogUpdate option[value='+status+']').attr('selected','selected');
					var value = $('.easyui-dialog #statusDialogUpdate option[value='+status+']').html();
					$('.easyui-dialog .CustomStyleSelectBoxInner').html(value);
				}
				if(arrayParam != null && arrayParam[0] == 0){
					var value = $('.easyui-dialog #statusDialog option[selected=selected]').html();
					$('.easyui-dialog .CustomStyleSelectBoxInner').html(value);
					$('.easyui-dialog #seachStyle1Code').removeAttr('disabled').focus();
				}
			
				$('.easyui-dialog #__btnSave').bind('click',function(event) {
					var s = -1;
					var code = $('.easyui-dialog #seachStyle1Code').val().trim();
					var name = $('.easyui-dialog #seachStyle1Name').val().trim();
					var msg = "";
					if(code == undefined || code == "" || code == null){
						msg = "Bạn chưa nhập giá trị cho trường Mã nhóm.";
						$('.easyui-dialog #errMsgSearchCreate').html(msg).show();
						$('.easyui-dialog #seachStyle1Code').focus();
						return false;
					}
					if(msg.length == 0){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Code', 'Mã nhóm', Utils._CODE, null);
						if(msg.length >0){
							$('.easyui-dialog #errMsgSearchCreate').html(msg).show();
							$('.easyui-dialog #seachStyle1Code').focus();
							return false;
						}
					}
					if(msg.length == 0){
						if(name == undefined || name == "" || name == null){
							msg = "Bạn chưa nhập giá trị cho trường Tên nhóm.";
							$('.easyui-dialog #errMsgSearchCreate').html(msg).show();
							$('.easyui-dialog #seachStyle1Name').focus();
							return false;
						}
					}
					if(msg.length == 0){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('.easyui-dialog #seachStyle1Name', jspKho_TenNhom, Utils._NAME, null);
						if(msg.length >0){
							$('.easyui-dialog #errMsgSearchCreate').html(msg).show();
							$('.easyui-dialog #seachStyle1Name').focus();
							return false;
						}
					}
					if(arrayParam != null){
						s = arrayParam[0];
					}
					if(s == 0){
						var params = new Object();
						params.groupCode = code;
						params.groupName = name;
						params.statusValue = $('.easyui-dialog #statusDialog').val();
						Utils.addOrSaveData(params, '/catalog/group-po/creategrouppo', null, 'errMsgSearchCreate', function(data){
							$('#'+searchDialog).dialog('close'); 
							GroupPOAuto.search();
						}, null, null, null, "Bạn có muốn thêm nhóm mới không ?", null);
					}
					
				});
				$('.easyui-dialog #__btnSave1').bind('click',function(event) {
					var s = -1;
					var code = $('#searchStyle1EasyUIDialogUpdate #seachStyle1Code').val().trim();
					var name = $('#searchStyle1EasyUIDialogUpdate #seachStyle1Name').val().trim();
					var msg = "";
					if(code == undefined || code == "" || code == null){
						msg = "Bạn chưa nhập giá trị cho trường Mã nhóm.";
						$('.easyui-dialog #errMsgSearchUpdate').html(msg).show();
						$('#searchStyle1EasyUIDialogUpdate #seachStyle1Code').focus();
						return false;
					}
					if(msg.length == 0){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('#searchStyle1EasyUIDialogUpdate #seachStyle1Code', 'Mã nhóm', Utils._CODE, null);
						if(msg.length >0){
							$('.easyui-dialog #errMsgSearchUpdate').html(msg).show();
							$('#searchStyle1EasyUIDialogUpdate #seachStyle1Code').focus();
							return false;
						}
					}
					if(msg.length == 0){
						if(name == undefined || name == "" || name == null){
							msg = "Bạn chưa nhập giá trị cho trường Tên nhóm.";
							$('.easyui-dialog #errMsgSearchUpdate').html(msg).show();
							$('#searchStyle1EasyUIDialogUpdate #seachStyle1Name').focus();
							return false;
						}
					}
					if(msg.length == 0){
						msg = Utils.getMessageOfSpecialCharactersValidateEx1('#searchStyle1EasyUIDialogUpdate #seachStyle1Name', jspKho_TenNhom, Utils._NAME, null);
						if(msg.length >0){
							$('.easyui-dialog #errMsgSearchUpdate').html(msg).show();
							$('#searchStyle1EasyUIDialogUpdate #seachStyle1Name').focus();
							return false;
						}
					}
					if(arrayParam != null){
						s = arrayParam[0];
					}
					if(s == 1){
						var params = new Object();
						params.id = arrayParam[1];
						var name = $('#searchStyle1EasyUIDialogUpdate #seachStyle1Name').val().trim();
						params.groupName = name;
						params.statusValue = $('.easyui-dialog #statusDialogUpdate').val();
						Utils.addOrSaveData(params, '/catalog/group-po/updategrouppo', null, 'errMsgSearchUpdate', function(data){
							$('#'+searchDialog).dialog('close'); 
							GroupPOAuto.search();
						}, null, null, null, "Bạn có muốn cập nhật thông tin nhóm không ?", null);
					}
					
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();
	        },
	        onClose : function(){
	        	$('#'+searchDiv).html(html);
	        	$('#'+searchDiv).css("visibility", "hidden");
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #__btnSave').unbind('click');
	        	$('.easyui-dialog #__btnSave1').unbind('click');
	        	$('.easyui-dialog #errMsgSearchCreate').html('').hide();
	        	$('.easyui-dialog #errMsgSearchUpdate').html('').hide();	
	        }
	    });
		return false;
	},
	getSearchStyleCustomerMapGridUrl : function(url, code, name,address, arrParam) {		
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '?curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		searchUrl+= "&customerCode=" + encodeChar(code) + "&customerName=" + encodeChar(name) + "&address=" + encodeChar(address);
		return searchUrl;
	},
	getSearchStyleExclusionMapGridUrl : function(url, code, name, arrParam) {		
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '?curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + arrParam[i].name + "=" + arrParam[i].value;
			}
		}
		searchUrl+= "&code=" + encodeChar(code) + "&name=" + encodeChar(name); 
		return searchUrl;
	},
	recursionFindParentShopCheck:function(id,type){
		if(id == null || id == undefined){
			return;
		}
    	$.ajax({
    		type : "POST",
			url : WEB_CONTEXT_PATH +'/commons/shopMap/getParentShop',
			data: ({shopId:id,type : type}),
			dataType: "json",
			success : function(data) {
				if(data != null && data != undefined && data.parentShopId != null && data.parentShopId != undefined){
					$('#check_'+data.parentShopId).attr('disabled','disabled').removeAttr('checked');
					if (data != null && data.type > 0){
						var i = PromotionCatalog.removeArrayByValue(PromotionCatalog._listShopId,data.parentShopId, data.type); 
						if (i != -1){
//							PromotionCatalog.removeArrayByValue(PromotionCatalog.lstType,data.type);
							PromotionCatalog.lstType.splice(i, 1);
						}
					}
					CommonSearch.recursionFindParentShopCheck(data.parentShopId,data.type);
				}
			}
    	});
	},
	recursionFindParentShopUnCheck:function(id,type){
		if(id == null || id == undefined){
			return;
		}
		$.ajax({
    		type : "POST",
			url : WEB_CONTEXT_PATH +'/commons/shopMap/getParentShop',
			data: ({shopId:id,type : type}),
			dataType: "json",
			success : function(data) {
				if(data != null && data != undefined && data.parentShopId != null && data.parentShopId != undefined){
					var flag = true;
					$('.class_'+data.parentShopId).each(function(){
						if($(this).is(':checked') || $(this).is(':disabled')){
							flag = false;
						}
					});
					var isCheck = false;
					if(data.type == 1){
						$('.easyui-dialog input[type=checkbox]').each(function(){
						    if($(this).is(":checked")){
						        isCheck = true;
						    }
						});
					}
					if(!isCheck){
						if(flag){
							$('#check_'+data.parentShopId).removeAttr('checked').removeAttr('disabled');
							CommonSearch.recursionFindParentShopUnCheck(data.parentShopId,data.type);
						}
						else{
							CommonSearch.recursionFindParentShopUnCheck();
						}
					}
				}
			}
    	});
	},
	recursionFindParentShopUnCheckCTTT:function(id){
		if(id == null || id == undefined){
			return;
		}
		$.ajax({
    		type : "POST",
			url : WEB_CONTEXT_PATH +'/commons/shopMap/getParentShop',
			data: ({shopId:id}),
			dataType: "json",
			success : function(data) {
				if(data != null && data != undefined && data.parentShopId != null && data.parentShopId != undefined){
					var flag = true;
					$('.class_'+data.parentShopId).each(function(){
						if($(this).is(':checked') || $(this).is(':disabled')){
							flag = false;
						}
					});
					if(flag){
						$('#check_'+data.parentShopId).removeAttr('checked').removeAttr('disabled');
						PromotionCatalog.removeArrayByValue(BaryCentricProgrammeCatalog._listShopId,data.parentShopId);
						CommonSearch.recursionFindParentShopUnCheckCTTT(data.parentShopId);
					}
//					else{
//						CommonSearch.recursionFindParentShopUnCheckCTTT();
//					}
				}
			}
    	});
	},
	openSearchStyleExclusionProgramEasyUIDialog : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam) {
		//$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyleExclusionDialogDiv').css("visibility", "visible");
		var html = $('#searchStyleExclusionDialogDiv').html();
		$('#searchStyleExclusionDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        width : 600,
	        height : 'auto',
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyleExclusionCode').focus();
				$('.easyui-dialog #searchStyleExclusionUrl').val(url);
				$('.easyui-dialog #errMsgSearchExclusion').html("").hide();
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);			
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}

				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
				$('#searchStyleExclusionGrid').show();
				$('#searchStyleExclusionGrid').datagrid({
					url : CommonSearch.getSearchStyleExclusionMapGridUrl(url, '', '', arrParam),
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :true,
					pagination:true,
					rowNum : 10,
					pageNumber: 1,
					scrollbarSize : 0,
					fitColumns:true,
					pageList  : [10,20,30],
					width : ($('#searchStyleExclusionContainerGrid').width()),
				    columns:[[  
				        {field:'displayProgramCode',title:codeText,align:'left', width:170, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.displayProgramCode);
				        }},  
				        {field:'displayProgramName',title:nameText,align:'left', width:370, sortable : false,resizable : false,formatter:function(value,row,index){
				        	return Utils.XSSEncode(row.displayProgramName);
				        }},  
				        {field: 'id', checkbox:true, align:'center', width:80,sortable : false,resizable : false}
				    ]],
				    onLoadSuccess :function(data){
				    	 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 if(data.rows.length == 0){
			    			 $('.datagrid-header-check input').removeAttr('checked');
			    		 }
//							setTimeout(function(){
//								$('.easyui-dialog #searchStyleCustomerGrid').datagrid('uncheckAll');
//								$('.datagrid-header-check input').removeAttr('checked');
//				    		},500);
					    	var originalSize = $('.easyui-dialog .datagrid-header-row td[field=displayProgramCode] div').width();
					    	if(originalSize != null && originalSize != undefined){
					    		ProgrammeDisplayCatalog._listExclusionDialogSize.push(originalSize);
					    	}
					    	Utils.updateRownumWidthForJqGridEX1('.easyui-dialog ','displayProgramCode',ProgrammeDisplayCatalog._listExclusionDialogSize,true);
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
			    		 $('input[name="id"]').each(function(){
			 				var temp = ProgrammeDisplayCatalog._listExclusion.get($(this).val());
			 				if(temp!=null) $(this).attr('checked','checked');
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
				    },
				    onCheck:function(i,r){
				    	ProgrammeDisplayCatalog._listExclusion.put(r.id,r);
				    },
				    onUncheck:function(i,r){
				    	ProgrammeDisplayCatalog._listExclusion.remove(r.id);
				    },
				    onCheckAll:function(r){
				    	for(i=0;i<r.length;i++){
				    		ProgrammeDisplayCatalog._listExclusion.put(r[i].id,r[i]);
				    	}
				    },
				    onUncheckAll:function(r){
				    	for(i=0;i<r.length;i++){
				    		ProgrammeDisplayCatalog._listExclusion.remove(r[i].id);
				    	}
				    }
				}); 
				$('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);
				$('.easyui-dialog #btnSearchStyleExclusion').bind('click',function(event) {
						$('.easyui-dialog #errMsgSearchExclusion').html('').hide();
						var code = encodeChar($('.easyui-dialog #seachStyleExclusionCode').val().trim());
						var name = encodeChar($('.easyui-dialog #seachStyleExclusionName').val().trim());
						var url = CommonSearch.getSearchStyleExclusionMapGridUrl($('.easyui-dialog #searchStyleExclusionUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleExclusionGrid').datagrid({url:url,pageNumber:1});						
						$('.easyui-dialog #seachStyleExclusionCode').focus();
//						setTimeout(function(){
//							$('.easyui-dialog #searchStyleExclusionGrid').datagrid('uncheckAll');
//			    		},500);
				});
				$('.easyui-dialog #btnSaveExclusion').bind('click',function(event) {
					var lstIdCustomer = new Array();
					for(i=0;i<ProgrammeDisplayCatalog._listExclusion.keyArray.length;i++){
						var temp = ProgrammeDisplayCatalog._listExclusion.get(ProgrammeDisplayCatalog._listExclusion.keyArray[i]);
						if(temp!=null){
							lstIdCustomer.push(temp.id);
						}
					}

					var params = new Object();
					params.listExclusionId =lstIdCustomer;
					params.id = $('#selId').val();
					if(lstIdCustomer == undefined || lstIdCustomer == null || lstIdCustomer.length <=0){
						$('.easyui-dialog #errMsgSearchExclusion').html("Bạn chưa chọn CTTB để loại trừ.").show();
						return false;
					}
					Utils.addOrSaveData(params, '/catalog/programme-display/createExclusionProgram', null, 'errMsgExclusion', function(data){
						if(data != null && data.error == undefined && data.errMsg == undefined){
							ProgrammeDisplayCatalog.searchExclusionProgram();
							ProgrammeDisplayCatalog._listExclusion = new Map();
							$('#errMsgSearchExclusion').html("").hide();
							$('#searchStyleExclusionDialog').dialog('close');
							$('#errMsgExclusion').html("").hide();
							$('#successMsgExclusion').html(msgCommon1).show();
							var tm = setTimeout(function(){
								$('#successMsgExclusion').html('').hide();
								clearTimeout(tm); 
							}, 3000);
						}
					}, null, null, null, "Bạn có muốn thêm CTTB không ?", function(data){
						$('#errMsgSearchExclusion').html(data.errMsg).show();
						var tm = setTimeout(function(){
							$('#successMsgExclusion').html('').hide();
							clearTimeout(tm); 
						}, 3000);
					});
					//$('.easyui-dialog').dialog('close');
				});
				$('.easyui-dialog #seachStyleExclusionCode').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchExclusion').html('').hide();
						var code = $('.easyui-dialog #seachStyleExclusionCode').val().trim();
						var name = $('.easyui-dialog #seachStyleExclusionName').val().trim();
						var url = CommonSearch.getSearchStyleExclusionMapGridUrl($('.easyui-dialog #searchStyleExclusionUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleExclusionGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleExclusionCode').focus();
//						setTimeout(function(){
//							$('.easyui-dialog #searchStyleExclusionGrid').datagrid('uncheckAll');
//			    		},500);
					}
				});
				$('.easyui-dialog #seachStyleExclusionName').bind('keyup',function(event){
					if(event.keyCode == 13){
						$('.easyui-dialog #errMsgSearchExclusion').html('').hide();
						var code = $('.easyui-dialog #seachStyleExclusionCode').val().trim();
						var name = $('.easyui-dialog #seachStyleExclusionName').val().trim();
						var url = CommonSearch.getSearchStyleExclusionMapGridUrl($('.easyui-dialog #searchStyleExclusionUrl').val(), code, name, CommonSearch._arrParams);
						$('.easyui-dialog #searchStyleExclusionGrid').datagrid({url:url,pageNumber:1});
						$('.easyui-dialog #seachStyleExclusionCode').focus();
//						setTimeout(function(){
//							$('.easyui-dialog #searchStyleExclusionGrid').datagrid('uncheckAll');
//			    		},500);
					}
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
	        },
	        onClose : function(){
	        	$('#searchStyleExclusionDialogDiv').html(html);
	        	$('#searchStyleExclusionDialogDiv').hide();
	        	//$('#searchStyleCustomerContainerGrid').html('<table id="searchStyleCustomerGrid" class="easyui-datagrid" style="width: 520px;"></table>');
	        	$('.easyui-dialog #seachStyleExclusionCode').val('');
	        	$('.easyui-dialog #seachStyleExclusionName').val('');
	        	$('.easyui-dialog #btnSaveExclusion').unbind('click');
	        	$('.easyui-dialog #errMsgSearchExclusion').html('').hide();
	        	ProgrammeDisplayCatalog._listExclusion = new Map(); 
	        }
	    });
		return false;
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
		},
	searchTransferStaffOnDialogForTransact : function(callback, arrParam) {
		CommonSearch.openSearchStyle1EasyUIDialogForTransact("Mã nhân viên", "Tên nhân viên",
				"Tìm kiếm nhân viên", WEB_CONTEXT_PATH + "/commons/staff/search-vansale-transact",
				callback, "staffCode", "staffName", arrParam);
		return false;
	},
	openSearchStyle1EasyUIDialogForTransact : function(codeText, nameText, title, url, callback, codeFieldText, nameFieldText, arrParam,idFieldText,addressText, addressFieldText) {
		$('.easyui-dialog #btnSearchStyle1').unbind('click');		
		CommonSearch._arrParams = null;
		CommonSearch._currentSearchCallback = null;
		$('#searchStyle1EasyUIDialogDiv').show();
		var html = $('#searchStyle1EasyUIDialogDiv').html();
		$('#searchStyle1EasyUIDialog').dialog({  
	        title: title,  
	        closed: false,  
	        cache: false,  
	        modal: true,
	        onOpen: function(){	        	
				var tabindex = -1;
				$('.InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", tabindex);
						tabindex -=1;
					}
				});								
				$('.easyui-dialog #seachStyle1Code').focus();
				$('.easyui-dialog #searchStyle1Url').val(url);
				
				$('.easyui-dialog #searchStyle1CodeText').val(codeFieldText);
				$('.easyui-dialog #searchStyle1NameText').val(nameFieldText);
				$('.easyui-dialog #searchStyle1IdText').val(idFieldText);
				if(addressText != null && addressText != undefined && addressFieldText != null && addressFieldText != undefined) {
					$('.easyui-dialog #searchStyle1AddressText').val(addressFieldText);
					$('.easyui-dialog #seachStyle1AddressLabel').show();
					$('.easyui-dialog #seachStyle1Address').show();					
				}
				$('.easyui-dialog #btnSearchStyle1').css('margin-left', 270);
				$('.easyui-dialog #btnSearchStyle1').css('margin-top', 5);				
				CommonSearch._currentSearchCallback = callback;
				CommonSearch._arrParams = arrParam;
				var codeField = 'code';
				var nameField = 'name';
				var idField = 'id';
				if (codeFieldText != null && codeFieldText != undefined && codeFieldText.length > 0) {
					codeField = codeFieldText;
				}
				if (nameFieldText != null&& nameFieldText != undefined && nameFieldText.length > 0) {
					nameField = nameFieldText;
				}
				if (idFieldText != null&& idFieldText != undefined && idFieldText.length > 0) {
					idField = idFieldText;
				}
				Utils.bindAutoSearch();
				$('.easyui-dialog #seachStyle1CodeLabel').html(codeText);
				$('.easyui-dialog #seachStyle1NameLabel').html(nameText);
//				Utils.bindAutoSearch();
				$('.easyui-dialog #searchStyle1Grid').show();
				$('.easyui-dialog #searchStyle1Grid').datagrid({
					url : CommonSearch.getSearchStyle1GridUrl(url, '', '', arrParam),
					autoRowHeight : true,
					rownumbers : true, 
					checkOnSelect :true,
					pagination:true,
					pageSize : 10,
					pageList: [10,20,30,40,50],
					scrollbarSize : 0,
					singleSelect:true,
					pageNumber:1,
					fitColumns:true,
					queryParams:{
						page:1
					},
					width : ($('#searchStyle1EasyUIDialog').width() - 40),
				    columns:[[  
				        {field:codeField,title:codeText,align:'left', width:110, sortable : false,resizable : false, formatter:function(value, row, index) {
				        	  return Utils.XSSEncode(value);
				          }},
				        {field:nameField,title:nameText,align:'left', width:$('#searchStyle1EasyUIDialog').width() - 25 - 110 - 80, sortable : false,resizable : false, formatter:function(value, row, index) {
				        	  return Utils.XSSEncode(value);
				          }},				        
				        {field:'select', title:CreateSalePlan_chon, width:80, align:'center',sortable : false,resizable : false,formatter : CommonSearchFormatter.selectCellIconFormatterEasyUIDialog},
				        {field :idField,hidden : true},
				    ]],
				    onLoadSuccess :function(){
				    	 tabindex = 1;
			    		 $('.easyui-dialog input,.easyui-dialog select,.easyui-dialog button').each(function () {
				    		 if (this.type != 'hidden') {
					    	     $(this).attr("tabindex", '');
								 tabindex++;
				    		 }
						 });
			    		 $('.datagrid-header-rownumber').html(jspCustomerAttributeSTT);	
			    		 updateRownumWidthForJqGrid('.easyui-dialog');
			    		 setTimeout(function(){
				    			CommonSearchEasyUI.fitEasyDialog();
				    		},1000);
//			    		 $(window).resize();
//			    		 var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height() + 600;
//			        	    $('.window-mask').css("height",height);
			        	setTimeout(function() {
			        		var height = $('#searchStyle1EasyUIDialog').parent().height() + $('#searchStyle1ContainerGrid').height()+500;
				        	    $('.window-mask').css("height",height);
			        		}, 1000);
				    }
				});
				/*$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :'', name: '',address:''});*/
				$('.easyui-dialog #btnSearchStyle1').bind('click',function(event) {


					
					if(!$(this).is(':hidden')){

						var code = $('.easyui-dialog #seachStyle1Code').val().trim();
						var name = $('.easyui-dialog #seachStyle1Name').val().trim();
						var address = $('.easyui-dialog #seachStyle1Address').val().trim();
						$('.easyui-dialog #searchStyle1Grid').datagrid('load',{code :code, name: name,address:address});						
						$('.easyui-dialog #seachStyle1Code').focus();
					}					
				});
				$('.easyui-dialog #btnClose').bind('click',function(event) {
					$('#searchStyle1EasyUIDialogDiv').css("visibility", "hidden");
					$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{pageNumber:1});
					$('.easyui-dialog').dialog('close');
				});
	        },
	        onBeforeClose: function() {
				var tabindex = 1;
				$(' .InputTextStyle, select, input, button , li , tr, td, th, label, ul, a, img').each(function () {
					if (this.type != 'hidden') {
						$(this).attr("tabindex", '');
					}
					tabindex ++;
				});	
				var curIdFocus = $('#cur_focus').val();
				$('#'+ curIdFocus).focus();				
				$('.easyui-dialog #searchStyle1Grid').datagrid('reload',{	
					pageSize: 10
				});
	        },
	        onClose : function(){
	        	$('#searchStyle1EasyUIDialogDiv').html(html);
	        	$('#searchStyle1EasyUIDialogDiv').hide();
	        	$('#searchStyle1ContainerGrid').html('<table id="searchStyle1Grid" class="easyui-datagrid" style="width: 520px;"></table><div id="searchStyle1Pager"></div>');
	        	$('.easyui-dialog #seachStyle1Code').val('');
	        	$('.easyui-dialog #seachStyle1Name').val('');
	        	$('.easyui-dialog #seachStyle1Address').val('');	        	
	        }
	    });
		return false;
	},
	//LocTT1 - Feb08, 2014
	getSearchStyleRoutingMapGridUrl : function(url, code, name, arrParam) {		
		var searchUrl = '';
		searchUrl = url;
		var curDate = new Date();
		var curTime = curDate.getTime();
		searchUrl+= '&curTime=' + encodeChar(curTime);
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += "&" + encodeChar(arrParam[i].name) + "=" + encodeChar(arrParam[i].value);
			}
		}
		searchUrl+= "&routingCode=" + encodeChar(code) + "&routingName=" + encodeChar(name);
		return searchUrl;
	}
};
var ExportActionLog = {
	CUSTOMER : 0,
	STAFF: 1,
	SHOP: 2,
	PRODUCT: 3,
	CUSTOMERCATLEVEL:4,
	STAFFCATLEVEL: 5,
	PROMOTION_PROGRAM: 6,
    INCENTIVE_PROGRAM: 7,
    FOCUS_PROGRAM: 8,
	DISPLAY_PROGRAM: 9,
	
	exportActionLog :function(objectId, type, fDate, tDate, errMsgId){
		var params = new Object();
		params.objectIdActionLog = objectId;
		params.fromDateActionLog = fDate;
		params.toDateActionLog = tDate;
		params.typeActionLog = type;
		$('#'+errMsgId).html('').hide();
		var msg = 'Bạn có muốn xuất file xem thông tin thay đổi?';
		Utils.addOrSaveData(params, '/commons/export/actionlog',null, errMsgId, function(data) {
			window.location.href = data.view;
		}, null, null, null, msg);
		return false;
	}
};

/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.common.business.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.stockGridFormatter.js
 */
var IssuedStockGridFormatter = {
	instockCellFormatter: function(cellvalue, rowObject,options){
		var bigUnit = 0;
		var smallUnit = 0;
		var convfact = 1;
		if(rowObject.convfact!= null && rowObject.convfact!= undefined){
			convfact = rowObject.convfact;
		}
		bigUnit = parseInt(rowObject.availableQuantity/convfact);
		smallUnit = rowObject.availableQuantity%convfact;
		return bigUnit + '/' + smallUnit;	
	},
	instockCellFormatterNew: function(cellvalue, rowObject,options){
		var bigUnit = 0;
		var smallUnit = 0;
		var convfact = 1;
		if(rowObject.convfact!= null && rowObject.convfact!= undefined){
			convfact = rowObject.convfact;
		}
		bigUnit = parseInt(rowObject.quantity/convfact);
		smallUnit = rowObject.quantity%convfact;
		return bigUnit + '/' + smallUnit;	
	},
	amountCellFormatter: function(value, row, index){		
		return '<input index='+index+' row-id="'+row.id+'" id="productRow_'+ row.id +'" size="5" type="text" maxlength="8" style="text-align:right;margin: 0;width:77px;" onkeypress="return NextAndPrevTextField(event, this,\'SelProduct\');" class="IssuedStock_AmountValue InputTextStyle InputText1Style SelProduct" onblur="StockIssued.amountBlured('+ index +');" onchange="StockIssued.amountChanged('+ index +');">';
	}
};
var UpdateStockGridFormatter = {
	amountCellFormatter: function(value, row, index){		
		return '<input index='+index+' row-id="'+row.id+'" id="productRow_'+ row.id +'" size="5" type="text" maxlength="8" style="text-align:right;margin: 0;width:77px;" onkeypress="return NextAndPrevTextField(event, this,\'SelProduct\');" class="IssuedStock_AmountValue InputTextStyle InputText1Style SelProduct" onblur="StockUpdate.qtyChanged('+ index +');" onchange="StockUpdate.qtyChanged('+ index +');">';
	},
	instockCellFormatter: function(cellvalue, rowObject,options){	
		var convfact = 1;
		if(rowObject.convfact!= null && rowObject.convfact!= undefined){
			convfact = rowObject.convfact;
		}
		var amount = formatQuantity(rowObject.availableQuantity,convfact);
		if(amount.length==0 || amount=='0/0' || amount=='0'){
			return '';
		}
		return amount;	
	}
};
var ManageTransFormatter = {
	viewDetail:function(cellValue, rowObject,options){
		var stockTransType = "";
		if(rowObject.fromOwnerType == 1 && rowObject.toOwnerType == 2){
			stockTransType =  "XUAT_KHO_NHAN_VIEN";
		}else if(rowObject.fromOwnerType == 2 && rowObject.toOwnerType == 1){
			stockTransType = "NHAP_KHO_NHAN_VIEN";
		}else if(rowObject.fromOwnerType == 1 && rowObject.toOwnerType == null){
			stockTransType =   "XUAT_KHO_DIEU_CHINH";
		}else if(rowObject.fromOwnerType == null && rowObject.toOwnerType == 1){
			stockTransType =   "NHAP_KHO_DIEU_CHINH";
		}
		return "<span style='cursor:pointer' onclick=\"return StockManageTrans.viewDetail('"+ rowObject.stockTransCode +"','"+rowObject.fromStockCode+"','"+rowObject.toStockCode+"','"+rowObject.stockTransDateStr+"','"+stockTransType+"');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-view.png'/></span>";
	},
	transTypeFormat:function(cellvalue, rowObject,options){
		if(rowObject.fromOwnerType == 1 && rowObject.toOwnerType == 2){
			return msgFormatter1;
		}else if(rowObject.fromOwnerType == 2 && rowObject.toOwnerType == 1){
			return msgFormatter2;
		}else if(rowObject.fromOwnerType == 1 && rowObject.toOwnerType == null){
			return msgFormatter3;
		}else if(rowObject.fromOwnerType == null && rowObject.toOwnerType == 1){
			return msgFormatter4;
		}else{
			return "";
		}
	},
	amountFormat:function(cellValue, options, rowObject){
		return formatCurrency(cellValue);
	}
};
var ReceivedStockFormatter = {
		amountCellFormatter: function(cellvalue, options, rowObject){		
			return '<input product-id="'+options.rowId+'" id="productRow_'+ rowObject.productId +'" size="12" type="text" style="text-align:right" onkeypress="return NextAndPrevTextField(event, this,\'SelProduct\');" class="IssuedStock_AmountValue InputTextStyle InputText1Style SelProduct" onblur="StockIssued.amountBlured('+ rowObject.productId +');" onchange="StockIssued.amountChanged('+ rowObject.productId +');">';
		}	
};
var CountingFormatter = {
	viewDetail:function(cellvalue, rowObject,options){
		return "<a href='javascript:void(0);'><span style='cursor:pointer' onclick=\"return StockCounting.viewDetail('"+ rowObject.id +"');\">"+rowObject.cycleCountCode+"</span></a>";
	},
	editFormat:function(cellvalue, rowObject,options){
		if(rowObject.status != null && rowObject.status == '1'|| rowObject.status == 1){
			return "";
		}
		if(rowObject.status != null && rowObject.status == '2'|| rowObject.status == 2){
			return "";
		}
		if(rowObject.status != null && rowObject.status == '0'|| rowObject.status == 0){
			if(rowObject.canUpdate == '1' || rowObject.canUpdate == 1){
				return '<span style="cursor:pointer" onclick="window.location.href=\' ' + WEB_CONTEXT_PATH+ '/stock/counting/changed?cycleCountId='+rowObject.id+'\'"><img src="' + WEB_CONTEXT_PATH + '/resources/images/icon-edit.png"/></span>';
			}
		}
		return "";
	},
	deleteFormat:function(cellvalue, rowObject,options){
		if(rowObject.status != null && rowObject.status == '1'|| rowObject.status == 1){
			return "";
		}
		if(rowObject.status != null && rowObject.status == '2'|| rowObject.status == 2){
			return "<span style='cursor:pointer' onclick=\"return StockCounting.deleteRow('"+ rowObject.id +"');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></span>";
		}
		if(rowObject.status != null && rowObject.status == '0'|| rowObject.status == 0){
			if(rowObject.canUpdate == '1' || rowObject.canUpdate == 1){
				return "<span style='cursor:pointer' onclick=\"return StockCounting.deleteRow('"+ rowObject.id +"');\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></span>";
			}
		}
		return "";
	},
	statusFormat:function(cellvalue, rowObject,options){		
		if(rowObject.status != null && rowObject.status == '0'|| rowObject.status == 0){
			return msgFormatter5;
		}else if(rowObject.status != null && rowObject.status == '1'|| rowObject.status == 1){
			return msgFormatter6;
		}else if(rowObject.status != null && rowObject.status == '2'|| rowObject.status == 2){
			return msgFormatter7;
		}else{
			return rowObject.status;
		}
	},
	statusFormat2:function(cellvalue, rowObject,options){		
		if(rowObject.status == 'ONGOING'){
			return msgFormatter5;
		}else if(rowObject.status == 'COMPLETED'){
			return msgFormatter6;
		}else if(rowObject.status == 'CANCELLED'){
			return msgFormatter7;
		}else{
			return rowObject.status;
		}
	},
	quantityConvert:function(cellvalue, rowObject,options ){
		return formatQuantityEx(rowObject.quantity,rowObject.convfact);
	}
};
var StockCategoryFormatter = {
	delProductFormatter: function(cellvalue, options, rowObject){
		return "<span style='cursor:pointer' onclick=\"return StockCategory.delSelectedRow('"+ rowObject.id +"')\"><img src='" + WEB_CONTEXT_PATH + "/resources/images/icon-delete.png'/></span>";
	},
	chooseCellFormatter: function(cellvalue, options, rowObject){		
		return '<input id="productRow_'+ options.rowId +'" type="checkbox" style="text-align:right" class="InputTextStyle InputText1Style SelProduct selectProduct" value="'+options.rowId +'" >';
	}
};
var StockValidateInput = {
		getQuantity: function(amount, convfact){
			if(amount==undefined || amount==null){
				return 0;
			}
			if(convfact != undefined && convfact == 0){
				convfact = 1;
			}			
			var bigUnit = 0;
			var smallUnit = 0;	
			amount = new String(amount);
			if(amount.indexOf('/') == -1){			
				smallUnit = Number(amount);
			}else{
				var arrCount = amount.split('/');
				if(arrCount.length > 0){
					if(arrCount[0].trim().length==0){
						bigUnit = 0;
					}else{
						bigUnit = parseInt(arrCount[0].trim());
					}
					if(arrCount[1].trim().length==0){
						smallUnit = 0;
					}else{
						smallUnit = parseInt(arrCount[1].trim());
						if(smallUnit>=convfact){
							var addBig = parseInt(smallUnit/convfact,10);
							var mod = smallUnit%convfact;
							bigUnit = bigUnit + addBig;
							smallUnit = mod;
						}	
					}					
				}
			}		
			return bigUnit*convfact + smallUnit;
		},
		formatStockQuantity:function(amount,convfact){
			if(amount==null || amount==undefined || amount.toString().length==0){
				return '';
			}
			if(convfact==null || convfact==undefined || convfact.toString().length==0){
				return '';
			}
			amount = amount.toString();
			if(amount.indexOf('/')>=0){
				var arrCount = amount.split('/');
				if(arrCount.length>=3){
					return '';
				}else{
					if(amount.split('/').length <= 1){
						return parseInt(amount,10) + '/0';						
					}
					if(amount.split('/')[0].length==0 || isNaN(amount.split('/')[0])){
						return '0' + '/' + parseInt(amount.split('/')[1],10);
					}
					if(amount.split('/')[1].length==0 || isNaN(amount.split('/')[1])){
						return parseInt(amount.split('/')[0],10) + '/0';
					}
					if(isNaN(amount.split('/')[0]) || isNaN(amount.split('/')[1])){
						return '0/0';
					}
					if(amount.split('/')[1]>=convfact && parseInt(convfact) != 1){
						var amount_temp = parseInt(amount.split('/')[0],10) + parseInt(amount.split('/')[1]/convfact);
						return amount_temp + '/' + parseInt(amount.split('/')[1])%convfact;
					}					
					return parseInt(amount.split('/')[0],10) + '/' + parseInt(amount.split('/')[1],10);	
				}
			}else{	
				if(isNaN(amount)){
					return '0/0';
				}
				if(parseInt(amount)>=convfact){
					var amount_temp = parseInt(amount/convfact,10);
					var amount_mod = amount%convfact;
					amount = (parseInt(amount_temp,10)) + '/' + (parseInt(amount_mod,10));	
				}else{
					amount = '0/' + parseInt(amount,10);		
				}				
			}	
			return amount;
		},
		formatStockQuantityEx:function(amount,convfact){
			if(amount==null || amount==undefined || amount.toString().length==0){
				return '';
			}
			if(convfact==null || convfact==undefined || convfact.toString().length==0){
				return '';
			}
			amount = amount.toString();
			if(amount.indexOf('/')>=0){
				var arrCount = amount.split('/');
				if(arrCount.length>=3){
					return '';
				}else{
					if(amount.split('/').length <= 1){
						return parseInt(amount,10) + '/0';						
					}
					if(amount.split('/')[0].length==0 || isNaN(amount.split('/')[0])){
						return '0' + '/' + parseInt(amount.split('/')[1],10);
					}
					if(amount.split('/')[1].length==0 || isNaN(amount.split('/')[1])){
						return parseInt(amount.split('/')[0],10) + '/0';
					}
					if(isNaN(amount.split('/')[0]) || isNaN(amount.split('/')[1])){
						return '0/0';
					}
					if(amount.split('/')[1]>=convfact){
						var amount_temp = parseInt(amount.split('/')[0],10) + parseInt(amount.split('/')[1]/convfact);
						return amount_temp + '/' + parseInt(amount.split('/')[1])%convfact;
					}					
					return parseInt(amount.split('/')[0],10) + '/' + parseInt(amount.split('/')[1],10);	
				}
			}else{	
				if(isNaN(amount)){
					return '0/0';
				}
				if(parseInt(amount)>=convfact){
					var amount_temp = parseInt(amount/convfact,10);
					var amount_mod = amount%convfact;
					amount = parseInt(amount_temp,10) + '/' + parseInt(amount_mod,10);	
				}else{
					amount = '0/' + parseInt(amount,10);		
				}				
			}	
			return amount;
		}
};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/utils/jquery.stockGridFormatter.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/viewmodel/jquery.viewmodel.common.js
 */
/**
 * define common view model
 * @author tuannd20
 * @date 20/06/2014
 */
var CommonVM = {
	/**
	 * group view model, basic properties
	 * @author tuannd20
	 * @date 20/06/2014
	 */
	shopVM: function(shop){
		this.shopId = shop.id;
		this.shopCode = shop.shopCode;
		this.shopName = shop.shopName;
	},
	/**
	 * group view model, basic properties
	 * @author tuannd20
	 * @date 20/06/2014
	 */
	groupVM: function(group){
		this.groupId = group.id;
		this.groupCode = group.groupCode;
		this.groupName = group.groupName;
	},
	/**
	 * staff view model, basic properties
	 * @author tuannd20
	 * @date 20/06/2014
	 */
	staffVM: function(staff){
		this.staffId = staff.id;
		this.staffCode = staff.staffCode;
		this.staffName = staff.staffName;
		this.supervisorId = staff.supervisorId;
		this.staffRoleType = staff.staffRoleType;
	},
	/**
	 * @author lochp
	 */
	statusVM: function(status){
		this.value = status.value;
		this.text = status.text;
	}
};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/viewmodel/jquery.viewmodel.common.js
 */

/*
 * START OF FILE - /webapp.dms.lite.web/web/resources/scripts/viewmodel/jquery.viewmodel.sale-supervise.js
 */
/**
 * define view model
 * @author tuannd20
 * @date 26/06/2014
 */
/**
 * View model for module sale supervise, use to rebinding
 * @author tuannd20
 * @date 26/06/2014
 */
var SaleSuperviseViewModel = {
	markerSalerVM: ko.observable(),
	markerSupervisorVM: ko.observable(),
	
	dialogDaySaleSupervisorVM: ko.observable(),
	dialogDaySaleSalerVM: ko.observable(),
	
	dialogMonthAccumulateVM: ko.observable(),
	
	dlgDaySaleQuantitySupervisorVM: ko.observable(),
	dlgMonthQuantityAccumulateVM: ko.observable()
};

/**
 * define model for module sale supervise: saler marker
 * @author tuannd20
 * @date 26/06/2014
 */
function SaleSuperviseSubVM_markerSaler(){
	var self = this;
	self.showData = ko.observable(false);
	self.staff = ko.observable({});
	self.staffCodeName = ko.computed(function(){
		return self.staff().staffCode + ' - ' + self.staff().staffName;
	}, self);
	
	self.shop = ko.observable({});
	/*	self.shopCodeName = ko.computed(function(){
		return self.shop().shopCode + ' - ' + self.shop().shopName;
	}, self);*/
	
	self.shopCodeName = ko.observable('');
	
	self.updateTime = ko.observable('');
	self.accuracy = ko.observable('');
	self.accuracyText = ko.computed(function(){
		return self.accuracy() + ' (m)';
	});
	self.visitingCustomer = ko.observable('');
	self.visitingCustomerAddress = ko.observable('');
	self.visitingCustomerText = ko.computed(function(){
		if (self.visitingCustomerAddress().toString().trim().length !== 0){
			return self.visitingCustomer() + ', ' + self.visitingCustomerAddress();
		} else if (self.visitingCustomer().toString().trim() !== 0){
			return self.visitingCustomer();
		} else {
			return '';
		}
	});
	self.standardProgress = ko.observable('');
	
	self.dayAmountPlan = ko.observable('');
	self.dayQuantityPlan = ko.observable('');
	self.dayAmount = ko.observable('');
	self.dayQuantity = ko.observable('');
	self.dayAmountProgress = ko.observable('');
	self.dayAmountProgressText = ko.computed(function(){
		if (isNullOrEmpty(self.dayAmountProgress().toString()) || self.dayAmountPlan() === SuperviseSales.NA || self.dayAmount() === SuperviseSales.NA){
			return SuperviseSales.NA;
		}
		return formatCurrency(self.dayAmountProgress()) + '%';
	});
	self.dayQuantityProgress = ko.observable('');
	self.dayQuantityProgressText = ko.computed(function(){
		if (isNullOrEmpty(self.dayQuantityProgress().toString()) || self.dayQuantity() === SuperviseSales.NA || self.dayQuantityPlan() === SuperviseSales.NA){
			return SuperviseSales.NA;
		}
		return formatCurrency(self.dayQuantityProgress()) + '%';
	});
	
	self.monthAmountPlan = ko.observable('');
	self.monthAmountPlanText = ko.computed(function(){
		return formatFloatValue(self.monthAmountPlan(),numFloat);
	});
	self.monthQuantityPlan = ko.observable();
	self.monthAmount = ko.observable();
	self.monthAmountText = ko.computed(function(){
		return formatFloatValue(self.monthAmount(),numFloat);
	});
	self.monthQuantity = ko.observable('');
	self.monthAmountProgress = ko.observable('');
	self.monthAmountProgressText = ko.computed(function(){
		if (isNullOrEmpty(self.monthAmountProgress().toString()) || self.monthAmount() === SuperviseSales.NA || self.monthAmountPlan() === SuperviseSales.NA){
			return SuperviseSales.NA;
		}
		return formatCurrency(self.monthAmountProgress()) + '%';
	});
	self.monthQuantityProgress = ko.observable('');
	self.monthQuantityProgressText = ko.computed(function(){
		if (isNullOrEmpty(self.monthQuantityProgress().toString()) || self.monthQuantity() === SuperviseSales.NA || self.monthQuantityPlan() === SuperviseSales.NA){
			return SuperviseSales.NA;
		}
		return formatCurrency(self.monthQuantityProgress()) + '%';
	});
	
	self.daySaleUrl = ko.computed(function(){
		//var url = 'SuperviseSales.showDialogDaySale(this, ' + self.staff().staffId + ')';
		var url = '';
		return url;
	});
	self.showListCustomerUrl = ko.computed(function(){
		var url = 'SuperviseSales.showListCustomerByVisitPlan(' + self.staff().staffId + ',\"' + self.staff().staffCode + '-' + self.staff().staffName + '\")';
		return url;
	});
};

/**
 * define model for module sale supervise: supervisor marker
 * @author tuannd20
 * @date 26/06/2014
 */
function SaleSuperviseSubVM_markerSupervisor(){
	var self = this;
	self.showData = ko.observable(false);
	self.staff = ko.observable({});
	self.staffCodeName = ko.computed(function(){
		return self.staff().staffCode + ' - ' + self.staff().staffName;
	}, self);
	
	self.shop = ko.observable({});
	self.shopCodeName = ko.computed(function(){
		return self.shop().shopCode + ' - ' + self.shop().shopName;
	}, self);
	
	self.lstGroup = ko.observableArray([]);
	self.selectedGroup = ko.observable({});
	
	self.updateTime = ko.observable('');
	self.accuracy = ko.observable('');
	self.accuracyText = ko.computed(function(){
		return self.accuracy() + ' (m)';
	});
	self.standardProgress = ko.observable('');
	
	self.dayAmountPlan = ko.observable('');
	self.dayQuantityPlan = ko.observable('');
	self.dayAmount = ko.observable('');
	self.dayQuantity = ko.observable('');
	self.dayAmountProgress = ko.observable('');
	self.dayAmountProgressText = ko.computed(function(){
		if (isNullOrEmpty(self.dayAmountProgress().toString()) || self.dayAmount() === SuperviseSales.NA || self.dayAmountPlan() === SuperviseSales.NA){
			return SuperviseSales.NA;
		}
		return formatCurrency(self.dayAmountProgress()) + '%';
	});
	self.dayQuantityProgress = ko.observable('');
	self.dayQuantityProgressText = ko.computed(function(){
		if (isNullOrEmpty(self.dayQuantityProgress().toString()) || self.dayQuantity() === SuperviseSales.NA || self.dayQuantityPlan() === SuperviseSales.NA){
			return SuperviseSales.NA;
		}
		return formatCurrency(self.dayQuantityProgress()) + '%';
	});
	
	self.monthAmountPlan = ko.observable('');
	self.monthAmountPlanText = ko.computed(function(){
		return formatFloatValue(self.monthAmountPlan(),numFloat);
	});
	self.monthQuantityPlan = ko.observable();
	self.monthAmount = ko.observable();
	self.monthAmountText = ko.computed(function(){
		return formatFloatValue(self.monthAmount(),numFloat);
	});
	self.monthQuantity = ko.observable('');
	self.monthAmountProgress = ko.observable('');
	self.monthAmountProgressText = ko.computed(function(){
		if (isNullOrEmpty(self.monthAmountProgress().toString()) || self.monthAmount() === SuperviseSales.NA || self.monthAmountPlan() === SuperviseSales.NA){
			return SuperviseSales.NA; 
		}
		return formatCurrency(self.monthAmountProgress()) + '%';
	});
	self.monthQuantityProgress = ko.observable('');
	self.monthQuantityProgressText = ko.computed(function(){
		if (isNullOrEmpty(self.monthQuantityProgress().toString()) || self.monthQuantity() === SuperviseSales.NA || self.monthQuantityPlan() === SuperviseSales.NA){
			return SuperviseSales.NA;
		}
		return formatCurrency(self.monthQuantityProgress()) + '%';
	});

	self.daySaleUrl = ko.computed(function(){
		var url = 'SuperviseSales.showDialogDaySale(this, ' + self.staff().staffId + ')';
		return url;
	});
	self.monthAccumulateUrl = ko.computed(function(){
		var url = 'SuperviseSales.showDialogMonthAccumulate(this,' + self.staff().staffId + ')';
		return url;
	});
	
	self.showListCustomerUrl = ko.computed(function(){
		var url = 'SuperviseSales.showListCustomerByVisitPlan(' + self.staff().staffId + ',\"' + self.staff().staffCode + '-' + self.staff().staffName + '\")';
		return url;
	});
};

/**
 * define model for module sale supervise: supervisor's dialog day sale
 * @author tuannd20
 * @date 26/06/2014
 */
function SaleSuperviseSubVM_dialogDaySaleSupervisor(){
	var self = this;
	self.rows = ko.observableArray([]);
	self.totalQuantity = ko.observable();
	self.totalQuantityPlan = ko.observable();
	self.totalQuantityRemain = ko.computed(function(){
		var totalRemain = self.totalQuantityPlan() > self.totalQuantity() ? self.totalQuantityPlan() - self.totalQuantity() : 0;
		return Number.isNaN(totalRemain) ? '' : totalRemain;
	});
	self.totalQuantityProgress = ko.computed(function(){
		if (self.totalQuantityPlan() === 0){
			return 0;
		}
		if (self.totalQuantity() >= self.totalQuantityPlan()){
			return 100;
		}
		var progress = Math.floor((self.totalQuantity() * 10000 / self.totalQuantityPlan()) / 100);
		return progress;
	});
	self.totalQuantityProgressText = ko.computed(function(){
		return self.totalQuantityProgress() + '%';
	});	
	
	self.totalAmount = ko.observable();
	self.totalAmountPlan = ko.observable();
	self.totalRemainAmount = ko.computed(function(){
		var totalRemain = self.totalAmountPlan() > self.totalAmount() ? self.totalAmountPlan() - self.totalAmount() : 0;
		return Number.isNaN(totalRemain) ? '' : totalRemain;
	});
	self.totalAmountProgress = ko.computed(function(){
		if (self.totalAmountPlan() === 0){
			return 0;
		}
		if (self.totalAmount() >= self.totalAmountPlan()){
			return 100;
		}
		var progress = Math.floor((self.totalAmount() * 10000 / self.totalAmountPlan()) / 100);
		return progress;
	});
	self.totalAmountProgressText = ko.computed(function(){
		return self.totalAmountProgress() + '%';
	});
	
	/**
	 * OTHERS
	 */
	self.header1 = ko.computed(function(){
		if (SuperviseSales.CAL_AMT_BY !== null){
			if (SuperviseSales.CAL_AMT_BY === SuperviseSales.STAFF){
				return SuperviseSales.STAFF_CODE_TEXT;
			} else  if (SuperviseSales.CAL_AMT_BY === SuperviseSales.ROUTE){
				return SuperviseSales.ROUTE_CODE_TEXT;
			}
		}
	});
};

/**
 * define model for module sale supervise: saler's dialog day sale
 * @author tuannd20
 * @date 26/06/2014
 */
function SaleSuperviseSubVM_dialogDaySaleSaler(){
	var self = this;
	self.rows = ko.observableArray([]);
	self.totalAmount = ko.observable();
	self.totalAmountPlan = ko.observable();
};

/**
 * define model for module sale supervise: dialog month accumulate (for channel chief, supervisor)
 * @author tuannd20
 * @date 26/06/2014
 */
function SaleSuperviseSubVM_dialogMonthAccumulate(){
	var self = this;
	/**
	 * day sale count region
	 */
	self.numSaleDayPlan = ko.observable();
	self.numSaleDay = ko.observable();
	self.standardProgress = ko.computed(function(){
		if (self.numSaleDayPlan() === 0){
			return 0;
		}
		if (self.numSaleDay() >= self.numSaleDayPlan()){
			return 100;
		}
		return Math.round((self.numSaleDay() * 10000 / self.numSaleDayPlan()) / 100);
	});
	self.standardProgressText = ko.computed(function(){
		return isNaN(self.standardProgress()) ? '0%' : self.standardProgress() + '%';
	});
	
	/**
	 * table data region
	 */
	self.rows = ko.observable();
	
	/**
	 * sum table data region
	 */
	self.totalMonthQuantityPlan = ko.observable();
	self.totalMonthQuantity = ko.observable();
	self.totalMonthQuantityRemain = ko.computed(function(){
		var totalMonthQuantityRemain = self.totalMonthQuantityPlan() > self.totalMonthQuantity() ? self.totalMonthQuantityPlan() - self.totalMonthQuantity() : 0;
		return Number.isNaN(totalMonthQuantityRemain) ? 0 : totalMonthQuantityRemain;
	});
	self.totalMonthQuantityProgress = ko.computed(function(){
		var totalMonthQuantityPlan = Number.isNaN(self.totalMonthQuantityPlan()) ? 0 : Number(self.totalMonthQuantityPlan()),
			totalMonthQuantity = Number.isNaN(self.totalMonthQuantity()) ? 0 : Number(self.totalMonthQuantity());
		if (totalMonthQuantityPlan === 0){
			if (totalMonthQuantity !== 0){
				return 100;
			} else {
				return 0;
			}
		}
		if (totalMonthQuantity >= totalMonthQuantityPlan){
			return 100;
		}
		return Math.floor((totalMonthQuantity * 10000 / totalMonthQuantityPlan) / 100);
	});
	self.totalMonthQuantityProgressText = ko.computed(function(){
		return isNaN(self.totalMonthQuantityProgress()) ? '0%' : self.totalMonthQuantityProgress() + '%';
	});
	
	self.totalMonthAmountPlan = ko.observable();
	self.totalMonthAmount = ko.observable();
	self.totalMonthAmountRemain = ko.computed(function(){
		var totalMonthAmountRemain = self.totalMonthAmountPlan() > self.totalMonthAmount() ? self.totalMonthAmountPlan() - self.totalMonthAmount() : 0;
		return Number.isNaN(totalMonthAmountRemain) ? 0 : totalMonthAmountRemain;
	});
	self.totalMonthAmountProgress = ko.computed(function(){
		var totalMonthAmountPlan = Number.isNaN(self.totalMonthAmountPlan()) ? 0 : Number(self.totalMonthAmountPlan()),
			totalMonthAmount = Number.isNaN(self.totalMonthAmount()) ? 0 : Number(self.totalMonthAmount());
		if (totalMonthAmountPlan === 0){
			if (totalMonthAmount !== 0){
				return 100;
			} else {
				return 0;
			}
		}
		if (totalMonthAmount >= totalMonthAmountPlan){
			return 100;
		}
		return Math.floor((totalMonthAmount * 10000 / totalMonthAmountPlan) / 100);
	});
	self.totalMonthAmountProgressText = ko.computed(function(){
		return isNaN(self.totalMonthAmountProgress()) ? '0%' : self.totalMonthAmountProgress() + '%';
	});
	
	/**
	 * anchor data
	 */
	self.staff = ko.observable({});
	
	/**
	 * OTHERS
	 */
	self.header1 = ko.computed(function(){
		if (SuperviseSales.CAL_AMT_BY !== null){
			if (SuperviseSales.CAL_AMT_BY === SuperviseSales.STAFF){
				return SuperviseSales.STAFF_CODE_TEXT;
			} else  if (SuperviseSales.CAL_AMT_BY === SuperviseSales.ROUTE){
				return SuperviseSales.ROUTE_CODE_TEXT;
			}
		}
	});
};

/**
 * define model for module sale supervise: supervisor's dialog day sale quantity
 * @author tuannd20
 * @date 27/06/2014
 */
function SaleSuperviseSubVM_dialogDayQuantitySupervisor(){
	var self = this;
	self.rows = ko.observableArray([]);
	self.totalQuantity = ko.observable();
	self.totalQuantityPlan = ko.observable();
	self.totalQuantityRemain = ko.computed(function(){
		return self.totalQuantityPlan() - self.totalQuantity();
	});
	self.totalProgress = ko.computed(function(){
		var totalQuantityPlan = Number.isNaN(self.totalQuantityPlan()) ? 0 : Number(self.totalQuantityPlan()),
				totalQuantity = Number.isNaN(self.totalQuantity()) ? 0 : Number(self.totalQuantity());
		if (totalQuantityPlan === 0){
			if (totalQuantity !== 0){
				return 100;
			} else {
				return 0;
			}
		}
		return Math.round((totalQuantity * 10000 / totalQuantityPlan) / 100);
	});
	self.totalProgressText = ko.computed(function(){
		return self.totalProgress() + '%';
	});
};

/**
 * define model for module sale supervise: dialog month quantity accumulate (supervisor)
 * @author tuannd20
 * @date 27/06/2014
 */
function SaleSuperviseSubVM_dialogMonthQuantityAccumulate(){
	var self = this;
	/**
	 * day sale count region
	 */
	self.numSaleDayPlan = ko.observable();
	self.numSaleDay = ko.observable();
	self.standardProgress = ko.computed(function(){
		if (self.numSaleDayPlan() === 0 || self.numSaleDayPlan() === null){
			return 0;
		}
		return Math.round((self.numSaleDay() * 10000 / self.numSaleDayPlan()) / 100);
	});
	self.standardProgressText = ko.computed(function(){
		return self.standardProgress() + '%';
	});
	
	/**
	 * table data region
	 */
	self.rows = ko.observable();
	
	/**
	 * sum table data region
	 */
	self.totalMonthQuantityPlan = ko.observable();
	self.totalMonthQuantity = ko.observable();
	self.totalMonthQuantityRemain = ko.computed(function(){
		var totalMonthQuantityRemain = self.totalMonthQuantityPlan() > self.totalMonthQuantity() ? self.totalMonthQuantityPlan() - self.totalMonthQuantity() : 0;
		return Number.isNaN(totalMonthQuantityRemain) ? 0 : totalMonthQuantityRemain;
	});
	self.totalProgress = ko.computed(function(){
		var totalMonthQuantityPlan = Number.isNaN(self.totalMonthQuantityPlan()) ? 0 : Number(self.totalMonthQuantityPlan()),
				totalMonthQuantity = Number.isNaN(self.totalMonthQuantity()) ? 0 : Number(self.totalMonthQuantity());
		if (totalMonthQuantityPlan === 0){
			if (totalMonthQuantity !== 0){
				return 100;
			} else {
				return 0;
			}
		}
		return Math.round((totalMonthQuantity * 10000 / totalMonthQuantityPlan) / 100);
	});
	self.totalProgressText = ko.computed(function(){
		return self.totalProgress() + '%';
	});
};
/*
 * END OF FILE - /webapp.dms.lite.web/web/resources/scripts/viewmodel/jquery.viewmodel.sale-supervise.js
 */

/*
 * JavaScript file created by Rockstarapps Concatenation
*/
