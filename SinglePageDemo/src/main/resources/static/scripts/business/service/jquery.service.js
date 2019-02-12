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
	/**
	 * Search channel
	 * @author IT_SOL
	 */
	searchChannel: function() {
		console.log("============okkkkkkkkkkkkkkkkkkkkk=====================");
		var addressFm = $('#address').val().trim();
		var phoneFm = $('#phone').val().trim();
//		var contract= $('#valueType').val().trim();
		
		var params = new Object();
		params.address = addressFm;
		params.phone = phoneFm;
		
		
		 var table1 = $('#example').DataTable();
         table1.ajax.url("http://www.json-generator.com/api/json/get/cghrQawlbC?indent=2", params).load();
		
//		$('#example').DataTable( {
//	        "processing": true,
//	        "serverSide": true,
//	        "ajax": "http://10.30.176.198:9006/ITSolWebService/service/tracking",
//	        "deferLoading": 57
//	    } );
//		$('#example').DataTable( {
//	        "processing": true,
//	        "serverSide": true,
//	        "ajax": {
//	  		    "url": "http://10.30.176.198:9006/ITSolWebService/service/tracking",
//	  		    "contentType": "application/json",
//	  		    "type": "POST",
//	  		    "data": function () {
//	  		        return JSON.stringify(params);
//	  		      }
//	  		   
//	  		  },
//	        "deferLoading": 57
//	    } );
		
	},	
	
};