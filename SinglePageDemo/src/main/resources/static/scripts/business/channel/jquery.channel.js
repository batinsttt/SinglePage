/**
 * Processing user's service
 * @author IT_SOL
 * @sine 26/02/2019
 */
var Channel = {
	_countType: null,
	_isShowDlg: false,
	_loading: true,
	_isInitialSubcriberTable:false,
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
		/**
	     * Get param from form of Subcriber Modal
	     * @author IT_SOL
	     */
	    displayPopupPickSubcriber: function(page) {
	        var url = "/channel/listSubcribers";
	        var page = 1;
	        var STT = 1;
	        var draw = 1;
	        var data = new Array();
	        var dataTemp1 = new Object();
	        dataTemp1.account="Ruby";
	        dataTemp1.address="ruby";
	        data[0]=dataTemp1;
	        
	        var dataTemp2 = new Object();
	        dataTemp2.account="sttt";
	        dataTemp2.address="sttt";
	        data[1]=dataTemp2;
	        
	        if (Channel._isInitialSubcriberTable) {
	        	// Reload table
	            var table = $('#subscriberList').DataTable();
	            table.ajax.reload();
	        } else {
	            setTimeout(function() {
	            	// Initial table
	                var table = $('#subscriberList').DataTable({
//	                    "serverSide": true,
//	                    "processing": true,
	                    "bLengthChange": false,
	                    "searching": false,
	                    "bSort": false,
	                    "responsive": true,
	                    "autoWidth": true,
	                    "pagingType": "full_numbers",
	                    "scrollY": true,
	                    "scrollX": true,
	                    "initComplete": function() {
	                        Ticket._isInitialSubcriberTable = true;
	                    },
	                    data:data,
//	                    "ajax": {
//	                        "url": url + "?draw=" + draw + "",
//	                        "type": "POST",
//	                        "dataType": "json",
//	                        "contentType": 'application/json; charset=utf-8',
//	                        "dataSrc": "listData",
//	                        "data": function() {
//	                            return JSON.stringify(Channel.getParamSearchSubcriber(page));
//	                        }
//	                    },
	                    "columns": [{
	                            data: null,
	                            render: function(data,
	                                type,
	                                row, meta) {
	                                return '<div class="md-radio">' +
	                                    '<input type="radio" id="radio_' +
	                                    meta.row +
	                                    '"' +
	                                    ' name="subcriber" ' +
	                                    ' value="' +
	                                    row.account +
	                                    '" class="md-radiobtn">' +
	                                    '<label for="radio_' +
	                                    meta.row +
	                                    '">' +
	                                    '<span></span><span class="check"></span> <span class="boxForm"></span></label>' +
	                                    '</div>';
	                            },
	                            className: 'textCenter',
	                            orderable: false
	                        },
	                        {
	                            "data": null,
	                            "sortable": false,
	                            render: function(data, type, row, meta) {
	                                return meta.row + meta.settings._iDisplayStart + 1;
	                            },
	                            className: 'textCenter'
	                        },
	                        {
	                            "data": "account"
	                        },
	                        {
	                            "data": "address"
	                        }
	                    ],
	                });
	            }, 100);
	            // Paging
	            $('#subscriberList').on('page.dt', function() {
	                page = table.page.info().page + 1;
	                draw = draw + 1;
	            });
	            
	            $('#searchChannel').click(function(){
	              	$("#requestSubscription").val($("input[name='subcriber']:checked").parent().parent().next().next().text());
	              	$("#address").val($("input[name='subcriber']:checked").parent().parent().next().next().next().text());
	              	$('#pickSubscriber').html('<i class="fa fa-location-arrow"></i>'+labelChooseBack);
	              	$('#myModal').modal('toggle');
	            });
	        }
	    },
	    /**
	     * Get param from form of Subcriber Modal
	     * @author IT_SOL
	     */
	    getParamSearchSubcriber: function(page) {

	        var keyword = $('#keyword').val().trim();
	        var params = new Object();

	        params.searchText = keyword;
	        params.pageSize = 10;
	        params.page = page;

	        return params;
	    },
};