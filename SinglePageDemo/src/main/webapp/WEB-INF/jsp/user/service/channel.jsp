<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<!-- menu service -->
	<jsp:include page="/WEB-INF/jsp/user/service/menuService.jsp" />
	<!-- end menu -->
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
			<button class="btn btn-green pull-right" data-toggle="modal" data-target="#myModal" style="margin-left: 10px;"><i class="fa fa-plus"></i>Tạo yêu cầu mới</button>
            <button id="searchChannel" class="btn btn-blue pull-right" onclick="return Service.searchChannel();"><i class="fa fa-search"></i>Tìm kiếm</button>
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
		 <div class="table-responsive"> 
			<table id="example" class="table table-striped table-bordered display table-hover dt-responsive">
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
</div>

</section>
	<!-- Modal modal-sm modal-md modal-lg -->
	 <!-- Modal -->
	  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	    <div class="modal-dialog">
	      <div class="modal-content" style="overflow: hidden;">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	          <h4 class="modal-title" id="myModalLabel">Modal title</h4>
	        </div>
	        <div class="modal-body" style="max-height: 409px; overflow-y: auto;">
	        	<div class="form-group row">
				    <label for="inputEmail3" class="col-sm-3 col-form-label">Mã yêu cầu</label>
				    <div class="col-sm-9">
				      <input type="email" class="form-control" placeholder="Mã yêu cầu">
				    </div>
				  </div>
				  <div class="form-group row">
				    <label for="inputPassword3" class="col-sm-3 col-form-label">Tên yên cầu</label>
				    <div class="col-sm-9">
				      <input type="password" class="form-control" placeholder="Tên yêu cầu">
				    </div>
				 </div>
				 <div class="form-group row">
				    <label for="inputPassword3" class="col-sm-3 col-form-label">Nội dung</label>
				    <div class="col-sm-9">
				      <textarea class="form-control" rows="3" placeholder="Nội dung yêu cầu"></textarea>
				    </div>
				 </div>	
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          <button type="button" class="btn btn-primary">Save changes</button>
	        </div>
	      </div>
	      <!-- /.modal-content -->
	    </div>
	    <!-- /.modal-dialog -->
	  </div>
	  <!-- /.modal -->
	<!-- 	End modal -->
	
<script type="text/javascript">
   $(document).ready(function() {
	   
	   //Generate breadCumb
	   var breadCumb_1 = ['DV đang sử dụng1', '#/service/channel'];
	   var breadCumb_2 = ['DV đang sử dụng2', '#/service/tracking'];
	   var breadCumb_3 = ['DV đang sử dụng3', '#/sales/edit'];
	   CommonUtils.genBreadCumb(breadCumb_1, breadCumb_2, breadCumb_3);
		
	   $('.modal-content').resizable({
			minHeight: 300,
			minWidth: 300
		});
		$('.modal-dialog').draggable();
		
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
	  var table = $('#example').DataTable();
//       var table = $('#example').DataTable({;
// //     	  "autoWidth":true,
// //     	  "pagingType": "full_numbers",
// //     	  "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
// //     	  "scrollY": true,
// //           "scrollX": true,
// //           "processing":true,
// //           "ajax": {
// //   		    "url": "http://10.30.176.198:9006/ITSolWebService/service/tracking",
// //   		    "contentType": "application/json",
// //   		    "type": "POST",
// //   		    "data": function () {
// //   		        return JSON.stringify(obj);
// //   		      }
  		   
// //   		  },
// //           "columns": [
// //               { "data": "id" },
// //               { "data": "name" },
// //               { "data": "position" },
// //               { "data": "office" },
// //               { "data": "extn" },
// //               { "data": "start_date" },
// //               { "data": "salary" },
// //               {
// //                   data: null,
// //                   defaultContent: '<a class="edit1" href="javascript:;"> Edit </a>',
// //                   className: '',
// //                   orderable: false
// //               },
// //               {
// //                   data: null,
// // //                   defaultContent: '<a class="delete" href="javascript:;" onclick="deleteModal()"> Delete </a>',
// //                   render: function ( data, type, row ) {
// //                 	  return  '<a class="edit1" href="javascript:void(0)" onclick="deleteModal('+data.id+')"><i class="fa fa-trash-o"></i></a>';
// //                    },
// //                   className: '',
// //                   orderable: false
// //               },
// //           ],
// //           "drawCallback": function(){
// //               $('input[type="checkbox"]').iCheck({
// //                  "checkboxClass": 'icheckbox_flat-blue'
// //               });
// //            },
// //            "columnDefs": [
// //                {
// //                   "targets": 0,
// //                   "checkboxes": {
// //                      "selectRow": true,
// //                      "selectCallback": function(nodes, selected){
// //                         $('input[type="checkbox"]', nodes).iCheck('update');
// //                      },
// //                      "selectAllCallback": function(nodes, selected, indeterminate){
// //                         $('input[type="checkbox"]', nodes).iCheck('update');
// //                      }
                     
// //                   }
// //                }
// //             ],
// //             "select": {
// //                "style": 'multi',
// //                "selector": 'td:first-child'
// //             },
// //             "order": [[1, 'asc']]
//       });
// //       table.columns.adjust().draw();
//       // Handle iCheck change event for "select all" control
//       $(table.table().container()).on('ifChanged', '.dt-checkboxes-select-all input[type="checkbox"]', function(event){
//          var col = table.column($(this).closest('th'));
//          col.checkboxes.select(this.checked);
//       });

//       // Handle iCheck change event for checkboxes in table body
//       $(table.table().container()).on('ifChanged', '.dt-checkboxes', function(event){
//          var cell = table.cell($(this).closest('td'));
//          cell.checkboxes.select(this.checked);
//       });

//       $('#addRow').on( 'click', function () {
//          $('#example').DataTable().row.add( [
//             '',
//             '<input type="text" class="form-control">',
//             '<input type="text" class="form-control">',
//             '<input type="text" class="form-control">',
//             '<input type="text" class="form-control">',
//             '<input type="text" class="form-control">',
//             '<input type="text" class="form-control">',
//             '<a class="save" href="javascript:;">Save</a>',
//             '<a class="cancel" href="javascript:;">Cancel</a>'
//          ] ).draw( false );
//          countNew++;
//       } );
//       $('#example tbody').on( 'click', '.edit1', function () {
//          var data = table.row( $(this).parents('tr') ).data();
//          ($(this).parents('tr')).children().eq(1).html('<input type="text" style="width: '+($('thead th').eq(1).width()+23)+'px;" class="form-control form-control-sm" value="' + data['name'] + '">');
//          ($(this).parents('tr')).children().eq(2).html('<input type="text" style="width: '+($('thead th').eq(2).width()+23)+'px;" class="form-control form-control-sm" value="' + data['position'] + '">');
//          ($(this).parents('tr')).children().eq(3).html('<input type="text" style="width: '+($('thead th').eq(3).width()+23)+'px;" class="form-control form-control-sm" value="' + data['office'] + '">');
//          ($(this).parents('tr')).children().eq(4).html('<input type="text" style="width: '+($('thead th').eq(4).width()+23)+'px;" class="form-control form-control-sm" value="' + data['extn'] + '">');
//          ($(this).parents('tr')).children().eq(5).html('<input type="text" style="width: '+($('thead th').eq(5).width()+23)+'px;" class="form-control form-control-sm" value="' + data['start_date'] + '">');
//          ($(this).parents('tr')).children().eq(6).html('<input type="text" style="width: '+($('thead th').eq(6).width()+23)+'px;" class="form-control form-control-sm" value="' + data['salary'] + '">');
//          ($(this).parents('tr')).children().eq(8).html('<a class="cancel" href="javascript:;">Cancel</a>');
//          ($(this).parents('tr')).children().eq(7).html('<a class="save" href="javascript:;">Save</a>');
//       } );
//       $('#example tbody').on( 'click', '.cancel', function () {
//          if (countNew > 0) {
//             $('#example').DataTable().row($(this).parents('tr')).remove().draw();
//             countNew--;
//          } else {
//             var data = table.row( $(this).parents('tr') ).data();
//             ($(this).parents('tr')).children().eq(1).html(data['name']);
//             ($(this).parents('tr')).children().eq(2).html(data['position']);
//             ($(this).parents('tr')).children().eq(3).html(data['office']);
//             ($(this).parents('tr')).children().eq(4).html(data['extn']);
//             ($(this).parents('tr')).children().eq(5).html(data['start_date']);
//             ($(this).parents('tr')).children().eq(6).html(data['salary']);
//             ($(this).parents('tr')).children().eq(7).html('<a class="edit1" href="javascript:;">Edit</a>');
//             ($(this).parents('tr')).children().eq(8).html('<a class="delete" href="javascript:;">Delete</a>');
//          }
        
//     } );
        
   });
   
   function deleteModal(rowId){    
	   $('#confirm-modal').modal('show');
	   $('#btn-confirm-delete').attr('href', "#/home");
	   $('#btn-confirm-delete').on( 'click', function () {
		   	
	         $('#confirm-modal').modal('hide');
	      } );
       
   }
 
</script>
