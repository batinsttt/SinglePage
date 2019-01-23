var Account = {
	xhrTransaction:null,
	submitPrepaid : function() { 
		$('#divOverlay').show();
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
			$('#divOverlay').hide();
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
				text+='<p class="Text3Style">'+ formatFloatValue(data.totalMoney,numFloat) + ' VNĐ<br/></p>';
				$.messager.alert('',text,'info');
				setTimeout(function(){
					window.location.reload();
				},5000);
			}
			$('#divOverlay').hide();
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
