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
	_FORM_DATA : null,
	
/*=========================== Business service ===========================*/
	
	/*-----Start Search channel-----*/
	/**
	 * Get parameter for search channel
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
	
	/**
	 * Execute search channel
	 * @author IT_SOL
	 */
	searchChannel: function() {
		var table1 = $('#example').DataTable();
		table1.ajax.url("http://10.30.176.198:9006/ITSolWebService/service/trackingSearch").load();
	},
	
	/**
	 * Get parameter for search notice error
	 * @author IT_SOL
	 */
	getPramSearchNoticeError: function() {
		var params = new Object();
		
		var idNamePhone = $('#idNamePhone').val().trim();
		var customerId = $('#customerId').val().trim();
		var namePhone = $('#namePhone').val().trim();
		var address = $('#address').val().trim();
		var movies = $('#movies').val();
		var multiCheckbox = $('#multiCheckbox').val();
		
		params.idNamePhone = idNamePhone;
		params.customerId = customerId;
		params.namePhone = namePhone;
		params.address = address;
		params.movies = movies;
		params.multiCheckbox = multiCheckbox;
		
		return params;
	},
	
	/**
	 * Execute search notice error
	 * @author IT_SOL
	 */
	searchNoticeError: function() {
		var table1 = $('#example').DataTable();
		table1.ajax.url("http://10.30.176.198:9006/ITSolWebService/service/noticeErrorSearch").load();
	},

	/*-----End Search channel-----*/
	
	
	
/*=========================== Business service End ===========================*/
/*=========================== Template Validate ===========================*/
	
	/**
	 * Validate template
	 * @author IT_SOL
	 */
	validate : function() {
		$('#errMsg').html('').hide();
		var msg = '';
		if (msg.length == 0) {
			// Check require
			msg = ValidateUtils.getMessageOfRequireCheck('address', jspCustomerAttributeCode);
		}
		if(msg.length ==0){
			// Check Special Characters
			msg = ValidateUtils.getMessageOfSpecialCharactersValidate('address', jspCustomerAttributeCode,Utils._CODE);
		}
		// Check phone number
		if(msg.length ==0 && !CommonUtils.isValidPhoneNumber(stPhone)){
			msg += msgInvalidPhoneNumber;
		}
		
		if(msg.length > 0){
			$('#errMsg').html(msg).show();
			return false;
		}
	},
	
/*=========================== End Template Validate ===========================*/
	
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
	deleteFileUpload : function(key){
		_FORM_DATA.delete(key);
		var data = new Array();
		var index = 0;
		var array = 0;
		var dataTemp;
		for (var value of _FORM_DATA.values()) {
		   console.log(value.name);
		   dataTemp = new Object();
		   dataTemp.stt =""+(++index);
		   dataTemp.filename = value.name;
		   data[array++] = dataTemp;
		}
		var table = $('#attachments').DataTable();
		table.clear();

		// Add updated data
		table.rows.add(data);

		// Redraw table
		table.draw();
	},
	makeFile : function(){
		var input = document.getElementById("addAttachments");
		_FORM_DATA = new FormData();
		var data = new Array();
		var index = 0;
		var array = 0;
		var dataTemp;
		for (var i = 0; i < input.files.length; i++) {
		    console.log(input.files[i].name);
		   _FORM_DATA.set(''+(i+1), input.files[i]);
		   dataTemp = new Object();
		   dataTemp.stt =""+(++index);
		   dataTemp.filename = input.files[i].name;
		   data[array++] = dataTemp;
		}
//		for (var value of _FORM_DATA.values()) {
//			   dataTemp = new Object();
//			   dataTemp.stt =""+(index++);
//			   dataTemp.filename = value.name;
//			   dataMain[array++] = dataTemp;
//			}
		var table = $('#attachments').DataTable();
		table.clear();

		// Add updated data
		table.rows.add(data);

		// Redraw table
		table.draw();
//		var table = $('#attachments').DataTable({
//			"bLengthChange" : false,
//			"searching" : false,
//			"bSort" : false,
//			"responsive" : true,
//			"autoWidth" : true,
//			"pagingType" : "full_numbers",
//			"scrollY" : true,
//			"scrollX" : true,
//            data: data,
//            columns: [
//                { data: 'stt' },
//                { data: 'filename' },
//                {
//                    data: null,
//                    render: function (data, type, row) {
//                    	console.log(data.stt);
//                        return '<button type="button" class="btn btn-blue pull-right ladda-button margin-left-10" onclick="Service.deleteFileUpload('+""+data.stt+');"><i class="fa fa-mail-reply-all"></i>Xoa</button>';
//                    }
//                }
//            ]
//        });
	}
};