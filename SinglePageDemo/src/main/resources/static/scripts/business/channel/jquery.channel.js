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
	getPramSearchChannel: function(page) {
		var params = new Object();
		
		var address = $('#address').val().trim();
		var account = $('#account').val().trim();
		var contract = $('#contract').val().trim();
		
		params.searchAddress = address;
		params.searchAccount = account;
		params.searchContract = contract;
		
		params.pageSize = 10;
		params.page = page;
		
		return params;
	},
	
	/**
	 * Execute search channel
	 * @author IT_SOL
	 */
	searchChannel: function() {
		var table = $('#channelList').DataTable();
		table.ajax.reload();
	},
	
	/**
	 * Execute channel detail
	 * @author IT_SOL
	 */
	channelDetail: function(account) {
		// Case create
		   if(CommonUtils.isNullOrEmpty(account) || account == undefined) {
			   $('#requestCode').val('');
	           $('#requestName').val('');
	           $('#requestContent').val('');
	           
		   } else { // Case update
			   var subAccount = account;
			   $.ajax({
		          type: 'POST',
		          url: '/channel/detail',
		          dataType : "json",
		          headers : {
					'Content-Type' : 'application/json; charset=utf-8'
		          },
		          data :(JSON.stringify({subAccount: account})),
		          success: function(response) {
		       	   // Check resultCode
		              $('#requestCode').val(response.subcriber.account);
		              $('#requestName').val(response.subcriber.customerName);
		           // add
		           },
//		          error:function(XMLHttpRequest, textStatus, errorThrown) {
//					// Spec
//		          }
				
		      });
		   }
		   $('#myModal').modal('show');	   
		},
	
};