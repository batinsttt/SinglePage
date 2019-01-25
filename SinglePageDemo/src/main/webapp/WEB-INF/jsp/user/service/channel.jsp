<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>

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
	<!-- /.box -->
	<div class="box">
		<div class="box-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<input type="text" class="form-control" id="address"
							placeholder="Địa chỉ">
					</div>
					<!-- /.form-group -->
				</div>
				<!-- /.col -->
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<input type="text" class="form-control" id="phone"
							placeholder="Điện thoại">
					</div>
					<!-- /.form-group -->
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<select class="form-control select2 select2-hidden-accessible"
							style="width: 100%;" aria-hidden="true">
							<option selected="selected">Hợp đồng</option>
							<option>Alaska</option>
							<option>Tennessee</option>
							<option>Texas</option>
							<option>Washington</option>
						</select>
					</div>
					<!-- /.form-group -->
				</div>
				<!-- /.col -->
			</div>
			<!-- /.row -->
		</div>
		<div class="box-footer">
			<button type="submit" class="btn btn-green pull-right" style="margin-left: 10px;"><i class="fa fa-plus"></i>Tạo yêu cầu mới</button>
            <button type="submit" class="btn btn-blue pull-right"><i class="fa fa-search"></i>Tìm kiếm</button>
		</div>
	</div>
	<!-- /.box -->
	<div class="box">
		<div class="portlet box green">
         	<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-cogs"></i>Responsive Flip Scroll Tables
				</div>
			<div class="tools">
				<a href="javascript:;" class="collapse" data-original-title=""
					title="Show or Hide table"> </a> <a href="javascript:;"
					class="reload" data-original-title="" title="Reload data"> </a>
			</div>
		</div>
		<div class="portlet-body flip-scroll" style="display: block;">
			<table id="example" class="table table-bordered table-striped table-condensed flip-content">
				<thead>
					<tr>
						<th></th>
						<th id="inputCol">Name</th>
						<th>Position</th>
						<th>Office</th>
						<th>Extn.</th>
						<th>Start date</th>
						<th>Salary</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>

</section>
<script type="text/javascript">
   $(document).ready(function() {
      var nEditing = null;
      var nNew = false;
      var countNew = 0;
      var countChecked = 1;
      var table = $('#example').DataTable({
         "pagingType": "full_numbers",
         "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
         "scrollY": 350,
         "scrollX": true,
         'ajax': 'http://www.json-generator.com/api/json/get/bUqxeTnTqW?indent=2',
         'drawCallback': function(){
            $('input[type="checkbox"]').iCheck({
               checkboxClass: 'icheckbox_flat-blue'
            });
         },

         'columnDefs': [
            {
               'targets': 0,
               'checkboxes': {
                  'selectRow': true,
                  'selectCallback': function(nodes, selected){
                     $('input[type="checkbox"]', nodes).iCheck('update');
                  },
                  'selectAllCallback': function(nodes, selected, indeterminate){
                     $('input[type="checkbox"]', nodes).iCheck('update');
                  }
                  
               }
            }
         ],
         'select': {
            'style': 'multi',
            'selector': 'td:first-child'
         },
         'order': [[1, 'asc']]
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
      $('#example tbody').on( 'click', '.edit', function () {
         var data = table.row( $(this).parents('tr') ).data();
         ($(this).parents('tr')).children().eq(1).html('<input type="text" class="form-control" value="' + data[1] + '">');
         ($(this).parents('tr')).children().eq(2).html('<input type="text" class="form-control" value="' + data[2] + '">');
         ($(this).parents('tr')).children().eq(3).html('<input type="text" class="form-control" value="' + data[3] + '">');
         ($(this).parents('tr')).children().eq(4).html('<input type="text" class="form-control" value="' + data[4] + '">');
         ($(this).parents('tr')).children().eq(5).html('<input type="text" class="form-control" value="' + data[5] + '">');
         ($(this).parents('tr')).children().eq(6).html('<input type="text" class="form-control" value="' + data[6] + '">');
         ($(this).parents('tr')).children().eq(8).html('<a class="cancel" href="javascript:;">Cancel</a>');
         ($(this).parents('tr')).children().eq(7).html('<a class="save" href="javascript:;">Save</a>');
      } );
      $('#example tbody').on( 'click', '.cancel', function () {
         if (countNew > 0) {
            $('#example').DataTable().row($(this).parents('tr')).remove().draw();
            countNew--;
         } else {
            var data = table.row( $(this).parents('tr') ).data();
            ($(this).parents('tr')).children().eq(1).html(data[1]);
            ($(this).parents('tr')).children().eq(2).html(data[2]);
            ($(this).parents('tr')).children().eq(3).html(data[3]);
            ($(this).parents('tr')).children().eq(4).html(data[4]);
            ($(this).parents('tr')).children().eq(5).html(data[5]);
            ($(this).parents('tr')).children().eq(6).html(data[6]);
            ($(this).parents('tr')).children().eq(7).html('<a class="edit" href="javascript:;">Edit</a>');
            ($(this).parents('tr')).children().eq(8).html('<a class="delete" href="javascript:;">Delete</a>');
         }
        
    } );
        
   });

</script>
