<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<section class="content">
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
			<button class="btn btn-green pull-right" onclick="showModal()" style="margin-left: 10px;"><i class="fa fa-plus"></i>Tạo yêu cầu mới</button>
            <button id="searchChannel"  onclick="return Service.searchChannel();" class="btn btn-blue pull-right"><i class="fa fa-search"></i>Tìm kiếm</button>
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
						<th>STT</th>
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
	          <h4 class="modal-title" id="myModalLabel">Thông tin yêu cầu</h4>
	        </div>
	        <div class="modal-body" style="max-height: 409px; overflow-y: auto;">
	        	<div class="form-group row">
				    <label class="col-sm-3 col-form-label">Mã yêu cầu</label>
				    <div class="col-sm-9">
				      <input type="text" class="form-control" id="requestCode" placeholder="Mã yêu cầu">
				    </div>
				</div>
				<div class="form-group row">
				    <label  class="col-sm-3 col-form-label">Tên yên cầu</label>
				    <div class="col-sm-9">
				      <input type="text" class="form-control" id="requestName" placeholder="Tên yêu cầu">
				    </div>
				</div>
				<div class="form-group row">
				    <label class="col-sm-3 col-form-label">Nội dung</label>
				    <div class="col-sm-9">
				      <textarea class="form-control" rows="3" id="requestContent" placeholder="Nội dung yêu cầu"></textarea>
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
	   var nEditing = null;
	      var nNew = false;
	      var countNew = 0;
	      var countChecked = 1;
	      var table = $('#example').DataTable({
	    	  "processing":true,
	    	   "responsive": true,
	    	  "autoWidth":true,
	    	  "pagingType": "full_numbers",
	    	  "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
	    	  "scrollY": true,
	          "scrollX": true,
	          "ajax": {
	  		    "url": "http://10.30.176.198:9006/ITSolWebService/service/tracking",
	  		    "type": "GET",
				"data": function ( d ) {
				        return Service.getPramSearchChannel();
				    }
	  		  },
	          "columns": [
	        	  {
	                  data: null,
	                  defaultContent: 0,
	                  className: 'textCenter',
	                  orderable: false
	              },
	              { "data": "name" },
	              { "data": "position" },
	              { "data": "office" },
	              { "data": "extn" },
	              { "data": "start_date" },
	              { "data": "salary" },
	              {
	                  data: null,
					  render: function ( data, type, row ) {
                    	return  '<a class="iconSize18" href="javascript:void(0)" onclick="showModal('+data.id+')"><i class="fa fa-edit"></i></a>';
                	  },
	                  className: 'textCenter',
	                  orderable: true
	              },
	              {
	                  data: null,
	                  render: function ( data, type, row ) {
	                	  return  '<a class="iconSize18" href="javascript:void(0)" onclick="deleteModal('+data.id+')"><i class="fa fa-trash-o"></i></a>';
	                   },
	                  className: 'textCenter',
	                  orderable: false
	              },
	          ],
	           
	           "order": [[1, 'asc']]
	      });
	      
	      table.on( 'order.dt search.dt', function () {
	    	  table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
	              cell.innerHTML = i+1;
	          } );
	      } ).draw();
	      
   });
   
   function deleteModal(rowId){    
	   CommonUtils.confimModalDisplay(confirmModalTitle, confirmModalMessage);
	   $('#btn-confirm-delete').on( 'click', function () {
	         $('#confirm-modal').modal('hide');
	      } );
   }
   
   function showModal(rowId){
	   
	   // Case create
	   if(CommonUtils.isNullOrEmpty(rowId) || rowId == undefined) {
		   $('#requestCode').val('');
           $('#requestName').val('');
           $('#requestContent').val('');
           
	   } else { // Case update
		   $.ajax({
	           type: 'GET',
	           url: 'http://www.json-generator.com/api/json/get/cfKJmlyBWq?id="'+rowId+'"',
	           success: function(response) {
	               $('#requestCode').val(response.code);
	               $('#requestName').val(response.name);
	               $('#requestContent').val(response.content);
	           }
	       });
	   }
	   
 	  $('#myModal').modal('show');
   }

</script>
