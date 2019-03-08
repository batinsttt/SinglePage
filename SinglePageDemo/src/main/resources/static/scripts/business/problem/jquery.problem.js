/**
 * Processing user's service
 * @author IT_SOL
 * @sine 26/02/2019
 */
var Problem = {
    _countType: null,
    _isShowDlg: false,
    _loading: true,
    _isInitialProblemTable: false,
    /**
     * Initial for service error report
     * @author IT_SOL
     */
    initServiceErrorReport: function() {
        /* Active menu */
        CommonUtils.pageLoadInit("bldv");
        /* Generate breadCumb */
        Problem.generateBreadCumb();
        /* Focus button open pop-up */
        Problem.generateDatePicker('#time');
        /* Focus button open pop-up */
        $('#problemCode').focus();
        /* Init table */
        Problem.showProblemList();
    },
    /**
     * Generate Date Picker
     * @author IT_SOL
     */
    generateDatePicker: function(selector) {
        // var labelFor = 'label[for='+selector+']';
        // selector = '#' + selector;
        $(selector).daterangepicker({
                opens: 'right',
                autoUpdateInput: false,
            },
            function(start, end, label) {
                $(selector).val(
                    start.format('MM/DD/YYYY') + ' - ' +
                    start.format('MM/DD/YYYY'));
                CommonUtils.autoAddStyleEdited(selector);
            });
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
     * Get param from form of Problem
     * @author IT_SOL
     */
    getParamSearchProblem: function(page) {

        /* Get searching condition from form*/
        var problemCode = $('#problemCode').val().trim();
        var statusProlem = $('#statusProlem').val().trim();
        var fromDate = "01/02/2018";
        var toDate = "01/03/2018";
        var time = $('#time').val().split(' - ');
        if (time.length === 2) {
            fromDate = time[0].trim();
            toDate = time[1].trim();
        }

        var params = new Object();

        params.problemCode = '22';
        params.statusProlem = 0;
        params.fromDate = fromDate;
        params.toDate = toDate;

        params.pageSize = 10;
        params.page = page;

        return params;
    },
    /**
     * Show problem list in table
     * @author IT_SOL
     */
    showProblemList: function() {
    	var url ="/problem/searchProblem";
    	var page = 1;
        var STT = 1;
        var draw = 1;
        if (Problem._isInitialProblemTable) {
            // Reload table
            var table = $('#problemList').DataTable();
            table.ajax.reload();
        } else {
            setTimeout(function() {
                // Initial table
                var table = $('#problemList').DataTable({
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
                        Problem._isInitialProblemTable = true;
                    },
                    "ajax": {
                        "url": url + "?draw=" + draw + "",
                        "type": "POST",
                        "dataType": "json",
                        "contentType": 'application/json; charset=utf-8',
                        "dataSrc": "listData",
                        "data": function() {
                            return JSON.stringify(Problem.getParamSearchProblem(page));
                        }
                    },
                    "columns": [{
                            "data": null,
                            "sortable": false,
                            render: function(data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            },
                            className: 'textCenter'
                        },
                        {
                            "data": "strCreateDate"
                        },
                        {
                            "data": "problemCode"
                        },
                        {
                            "data": "chanelAcceptProblem"
                        },
                        {
                            "data": "problemContent"
                        },
                        {
                            "data": "status"
                        },
                        {
                            "point": null
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
};