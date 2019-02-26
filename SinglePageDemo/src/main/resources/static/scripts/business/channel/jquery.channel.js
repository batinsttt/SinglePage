/**
 * Processing user's service
 * @author IT_SOL
 * @sine 26/02/2019
 */
var Channel = {
	_countType: null,
	_isShowDlg: false,
	_loading: true,
	
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
		table.ajax.reload();
	},
	
	/**
	 * Execute channel detail
	 * @author IT_SOL
	 */
	channelDetail: function(rowId) {
		 // Case create
		   if(CommonUtils.isNullOrEmpty(rowId) || rowId == undefined) {
			   $('#requestCode').val('');
	           $('#requestName').val('');
	           $('#requestContent').val('');
	           
		   } else { // Case update
			   $.ajax({
		           type: 'POST',
		           
		           url: 'http://www.json-generator.com/api/json/get/cfKJmlyBWq',
		           dataType : "json",
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					data :(JSON.stringify(rowId)),
		           success: function(response) {
		               $('#requestCode').val(response.code);
		               $('#requestName').val(response.name);
		               $('#requestContent').val(response.content);
		           }
		       });
		   }
		   
	 	  $('#myModal').modal('show');
	},
	
};