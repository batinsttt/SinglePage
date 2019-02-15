<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
<section class="content">
	<div class="box box-danger">
		<div class="row">
			<div class="col-sm-3 cus-channel-header">
				<a href="#" style="text-align: center;"> 
					<span><i class="fa fa-search"></i></span><br> <span>Tra cứu thông tin</span>
				</a>
			</div>
			<div class="col-sm-3 cus-channel-header">
				<a href="#"> <span><i class="fa fa-exclamation-triangle"></i></span><br>
					<span>Báo lỗi dịch vụ</span>
				</a>
			</div>
			<div class="col-sm-3 cus-channel-header">
				<a href="#"> <span><i class="fa fa-list"></i></span><br> <span>Quản
						lý yêu cầu</span>
				</a>
			</div>
			<div class="col-sm-3 cus-channel-header">
				<a href="#"> <span><i class="fa fa-newspaper-o"></i></span><br>
					<span>Hóa đơn điện tử</span>
				</a>
			</div>
		</div>
	</div>
	<div>
		<div class="ErrorMsg">
			<p class="ErrorMsgPadding10">ABC</p>
			<p class="ErrorMsgPadding15">ABC</p>
			<p class="ErrorMsgPadding30">ABC</p>
		</div>
		<div class="SuccessMsg">
			<p class="SuccessMsgPadding10">ABC</p>
			<p class="SuccessMsgPadding15">ABC</p>
			<p class="SuccessMsgPadding30">ABC</p>
		</div>
	</div>
<script type="text/javascript">
   $(document).ready(function() {
	   $('.modal-content').resizable({
			//alsoResize: ".modal-dialog",
			minHeight: 300,
			minWidth: 300
		});
		$('.modal-dialog').draggable();

		$('#myModal').on('show.bs.modal', function () {
			$(this).find('.modal-body').css({
				'max-height':'100%'
			});
		});
		
		
		
      var nEditing = null;
      var nNew = false;
      var countNew = 0;
      var countChecked = 1;
      var list = [
  	    { date: '12/1/2011', reading: 3, id: 20055 },
  	    { date: '13/1/2011', reading: 5, id: 20053 },
  	    { date: '14/1/2011', reading: 6, id: 45652 }
  		];
	  var obj = {name: "Test 1", id: 10000, list};
	  var jsonParam = JSON.stringify(obj);
      var table = $('#example').DataTable({
    	  "pagingType": "full_numbers",
    	  "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    	  "scrollY": 'auto',
          "scrollX": true,
          "ajax": {
  		    "url": "http://10.30.176.198:9006/ITSolWebService/service/tracking",
  		    "contentType": "application/json",
  		    "type": "POST",
  		    "data": function () {
  		        return JSON.stringify(obj);
  		      }
  		   
  		  },
          "columns": [
              { "data": "id" },
              { "data": "name" },
              { "data": "position" },
              { "data": "office" },
              { "data": "extn" },
              { "data": "start_date" },
              { "data": "salary" },
              {
                  data: null,
                  defaultContent: '<a class="edit1" href="javascript:;"> Edit </a>',
                  className: '',
                  orderable: false
              },
              {
                  data: null,
                  defaultContent: '<a class="delete" href="javascript:;"> Delete </a>',
                  className: '',
                  orderable: false
              },
          ],
          "drawCallback": function(){
              $('input[type="checkbox"]').iCheck({
                 "checkboxClass": 'icheckbox_flat-blue'
              });
           },
           "columnDefs": [
               {
                  "targets": 0,
                  "checkboxes": {
                     "selectRow": true,
                     "selectCallback": function(nodes, selected){
                        $('input[type="checkbox"]', nodes).iCheck('update');
                     },
                     "selectAllCallback": function(nodes, selected, indeterminate){
                        $('input[type="checkbox"]', nodes).iCheck('update');
                     }
                     
                  }
               }
            ],
            "select": {
               "style": 'multi',
               "selector": 'td:first-child'
            },
            "order": [[1, 'asc']]
      });
      // Handle iCheck change event for "select all" control
      $(table.table().container()).on('ifChanged', '.dt-checkboxes-select-all input[type="checkbox"]', function(event){
         var col = table.column($(this).closest('th'));
         col.checkboxes.select(this.checked);
      });

      // Handle iCheck change event for checkboxes in table body
      $(table.table().container()).on('ifChanged', '.dt-checkboxes', function(event){
         var cell = table.cell($(this).closest('td'));
         cell.checkboxes.select(this.checked);
      });

      $('#addRow').on( 'click', function () {
         $('#example').DataTable().row.add( [
            '',
            '<input type="text" class="form-control">',
            '<input type="text" class="form-control">',
            '<input type="text" class="form-control">',
            '<input type="text" class="form-control">',
            '<input type="text" class="form-control">',
            '<input type="text" class="form-control">',
            '<a class="save" href="javascript:;">Save</a>',
            '<a class="cancel" href="javascript:;">Cancel</a>'
         ] ).draw( false );
         countNew++;
      } );
      $('#example tbody').on( 'click', '.edit1', function () {
         var data = table.row( $(this).parents('tr') ).data();
         ($(this).parents('tr')).children().eq(1).html('<input type="text" style="width: '+($('thead th').eq(1).width()+23)+'px;" class="form-control form-control-sm" value="' + data['name'] + '">');
         ($(this).parents('tr')).children().eq(2).html('<input type="text" style="width: '+($('thead th').eq(2).width()+23)+'px;" class="form-control form-control-sm" value="' + data['position'] + '">');
         ($(this).parents('tr')).children().eq(3).html('<input type="text" style="width: '+($('thead th').eq(3).width()+23)+'px;" class="form-control form-control-sm" value="' + data['office'] + '">');
         ($(this).parents('tr')).children().eq(4).html('<input type="text" style="width: '+($('thead th').eq(4).width()+23)+'px;" class="form-control form-control-sm" value="' + data['extn'] + '">');
         ($(this).parents('tr')).children().eq(5).html('<input type="text" style="width: '+($('thead th').eq(5).width()+23)+'px;" class="form-control form-control-sm" value="' + data['start_date'] + '">');
         ($(this).parents('tr')).children().eq(6).html('<input type="text" style="width: '+($('thead th').eq(6).width()+23)+'px;" class="form-control form-control-sm" value="' + data['salary'] + '">');
         ($(this).parents('tr')).children().eq(8).html('<a class="cancel" href="javascript:;">Cancel</a>');
         ($(this).parents('tr')).children().eq(7).html('<a class="save" href="javascript:;">Save</a>');
      } );
      $('#example tbody').on( 'click', '.cancel', function () {
         if (countNew > 0) {
            $('#example').DataTable().row($(this).parents('tr')).remove().draw();
            countNew--;
         } else {
            var data = table.row( $(this).parents('tr') ).data();
            ($(this).parents('tr')).children().eq(1).html(data['name']);
            ($(this).parents('tr')).children().eq(2).html(data['position']);
            ($(this).parents('tr')).children().eq(3).html(data['office']);
            ($(this).parents('tr')).children().eq(4).html(data['extn']);
            ($(this).parents('tr')).children().eq(5).html(data['start_date']);
            ($(this).parents('tr')).children().eq(6).html(data['salary']);
            ($(this).parents('tr')).children().eq(7).html('<a class="edit1" href="javascript:;">Edit</a>');
            ($(this).parents('tr')).children().eq(8).html('<a class="delete" href="javascript:;">Delete</a>');
         }
        
    } );
        
   });

</script>
