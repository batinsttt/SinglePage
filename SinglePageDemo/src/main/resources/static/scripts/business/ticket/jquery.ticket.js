/**
 * Processing user's service
 * @author IT_SOL
 * @sine 26/02/2019
 */
var Ticket = {
    _countType: null,
    _isShowDlg: false,
    _loading: true,
    _isInitialSubscriberTable: false,
    /**
     * Initial for block/open channel
     * @author IT_SOL
     */
    initBlockOpenChannel: function() {
        /* Active menu */
        CommonUtils.pageLoadInit("qlyc");
        /* Generate breadCumb */
        Ticket.generateBreadCumb();
        /* Focus button open pop-up */
        $('#pickSubscriber').focus();
        /* Auto fill contact Address */
        Ticket.autoFillContactAddress();
    },
    /**
     * generate BreadCumbs
     * @author IT_SOL
     */
    generateBreadCumb: function() {
        /* Generate breadCumb*/
        var breadCumb_1 = ['DV đang sử dụng', false];
        var breadCumb_2 = ['Kênh truyền', '#/service/channel'];
        var breadCumb_3 = ['Quản lý yêu cầu',
            '#/ticket/create'
        ];
        CommonUtils.genBreadCumb(breadCumb_1, breadCumb_2,
            breadCumb_3);
        /*  end */
    },
    /**
     * Get installation address and fill it into contact address
     * @author IT_SOL
     */
    autoFillContactAddress: function() {
        /* Auto fill contact Address*/
        $('#isInstallationAddr').change(function() {
            if ($(this).is(':checked')) {
                // Get install address
                var installProvince = $('#installProvince').val();
                var installDistrict = $('#installDistrict').val();
                var installWard = $('#installWard').val();
                var installStreet = $('#installStreet').val().trim();
                // Set contact address
                $('#contactProvince').val(installProvince);
                $('#contactDistrict').val(installDistrict);
                $('#contactWard').val(installWard);
                $('#contactStreet').val(installStreet);
                CommonUtils.autoAddStyleEdited('#contactProvince', '#contactDistrict', '#contactWard', '#contactStreet');
            }
        });
        /*  end */
    },
    /**
     * Validate screen block/open channel
     * @author IT_SOL
     */
    validateBlockOpenChannel: function() {
    	//  Select form
	    var form = $("#requestBlockChannelForm");
	 // Validation
	    var validator = form.validate({
	        errorElement: "span",
	        errorClass: "help-block help-block-error",
	        focusInvalid: true,
	        rules: {
	            // userName is name of input tag
	            // simple rule, converted to {required:true}
	            userName: "required",
	            phone: "isValidPhoneNumber",
	            email: {
	                email: true
	            },
	            password: {
	                required: true,
	                minlength: 8
	            },
	            confirmPass: {
	                required: true,
	                minlength: 8,
	                equalTo: "#password" // #password is name of input tag
	            }
	        },
	        messages: {
	            userName: {
	                required: jQuery.validator.format(requiredNameErr),
	            },
	            email: {
	                email: jQuery.validator.format(formatMailErr),
	            },
	            password: {
	                required: jQuery.validator.format("Vui lòng nhập mật khẩu."),
	                minlength: jQuery.validator.format("Mật khẩu có độ dài tối thiểu là 8 ký tự.")
	            },
	            confirmPass: {
	                required: jQuery.validator.format("Vui lòng nhập mật khẩu xác nhận."),
	                minlength: jQuery.validator.format("Mật khẩu có độ dài tối thiểu là 8 ký tự."),
	                equalTo: jQuery.validator.format("Vui lòng nhập ký tự giống mật khẩu.")
	            }
	        },
	        invalidHandler: function(event, validator) {},
	        submitHandler: function(form) {
	            getAjax();
	        },
	        highlight: function(e) {
	            $(e).closest(".form-group").addClass("has-error")
	        },
	        unhighlight: function(e) {
	            $(e).closest(".form-group").removeClass("has-error")
	        }
	    });
    },
    /**
     * Get param from form of Subcriber Modal
     * @author IT_SOL
     */
    displayPopupPickSubcriber: function(page) {
        var url = "/ticket/blockAccountList";
        var page = 1;
        var STT = 1;
        var draw = 1;
        if (Ticket._isInitialSubscriberTable) {
        	// Reload table
            var table = $('#subscriberList').DataTable();
            table.ajax.reload();
        } else {
            setTimeout(function() {
            	// Initial table
                var table = $('#subscriberList').DataTable({
                    "serverSide": true,
                    "processing": true,
                    "bLengthChange": false,
                    "searching": false,
                    "bSort": false,
                    "responsive": true,
                    "autoWidth": true,
                    "pagingType": "full_numbers",
                    "scrollY": true,
                    "scrollX": true,
                    "initComplete": function() {
                        Ticket._isInitialSubscriberTable = true;
                    },
                    "ajax": {
                        "url": url + "?draw=" + draw + "",
                        "type": "POST",
                        "dataType": "json",
                        "contentType": 'application/json; charset=utf-8',
                        "dataSrc": "listAccount",
                        "data": function() {
                            return JSON.stringify(Ticket.getParamSearchSubcriber(page));
                        }
                    },
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
        }
    },
    /**
     * Get param from form of Subcriber Modal
     * @author IT_SOL
     */
    getParamSearchSubcriber: function(page) {

        var keyword = $('#keyword').val().trim();
        var params = new Object();

        params.keyword = keyword;
        params.pageSize = 10;
        params.page = page;

        return params;
    },
    /**
     * Search subcriber follow acount or address
     * @author IT_SOL
     */
    searchSubcriber: function() {
    	// Display spinner button
        var l = Ladda.create(document.querySelector('#searchSubcriber'));
        l.start();
        // Reload table
        var table = $('#subscriberList').DataTable();
        table.ajax.reload();
        // Hide spinner button
        setTimeout(function() {
            l.stop();
        }, 300);
    },
    getPramSearchTicket: function(page) {
		var params = new Object();
		params.ticketType = $('#typerequest').val().trim();
		params.ticketCode = $('#coderequest').val().trim();
		params.status = $('#status').val().trim();
		params.pageSize = 10;
		params.page = page;
		return params;
	}
};