/**
 * Processing user's service
 * @author IT_SOL
 * @sine 12/02/2019
 */
var Service = {
	_countType: null,
	_isShowDlg: false,
	_loading: true,
	statusType:{ // defined bien enum cho combobox
		RUNNING:1,
		INACTIVE:0,
		DRAFT:2,
		REJECT:3
	},
	_WAITING : "WAITING",
	_REJECT : "REJECT",
	
/*--------------------Business service ------------------------------------*/
	
	/*Start Search channel*/
	/**
	 * Search channel
	 * @author IT_SOL
	 */
	getPramSearchChannel: function() {
		var params = new Object();
		
		var addressFm = $('#address').val().trim();
		var phoneFm = $('#phone').val().trim();
		
		params.address = addressFm;
		params.phone = phoneFm;
		
		return params;
	},
	
	searchChannel: function() {
		var table1 = $('#example').DataTable();
		table1.ajax.url("http://10.30.176.198:9006/ITSolWebService/service/trackingSearch").load();
	},	

	
	/*End Search channel*/
	
	getUrlParam : function(url, arrParam) {
		var searchUrl = url;
		var char = "?";
		if (arrParam != null && arrParam != undefined) {
			for ( var i = 0; i < arrParam.length; i++) {
				searchUrl += char + arrParam[i].name + "=" + arrParam[i].value.trim();
				char = "&";
			}
		}
		return searchUrl;
	},
	
	validate : function() {
		$('#errMsg').html('').hide();
		var msg = '';
		if (msg.length == 0) {
			msg = ValidateUtils.getMessageOfRequireCheck('address', jspCustomerAttributeCode);
		}
		if(msg.length ==0){
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('address', jspCustomerAttributeCode,Utils._CODE);
		}
		if(!Utils.isValidPhoneNumber(stPhone)){
			msg += msgInvalidPhoneNumber;
		}
		
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			return false;
		}
	}
};