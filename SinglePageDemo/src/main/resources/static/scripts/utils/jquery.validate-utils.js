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
				if(selector.is(':hidden')){
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
