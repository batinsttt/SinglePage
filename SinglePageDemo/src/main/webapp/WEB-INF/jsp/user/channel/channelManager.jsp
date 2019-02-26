<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<section class="content">
   <!-- menu service -->
   <jsp:include page="/WEB-INF/jsp/user/service/menuService.jsp" />
   <!-- end menu -->
   <!-- /.box -->
   <div class="box">
      <div class="box-body">
         <div class="portlet-body form">
            <form role="form">
               <div class="form-body">
                  <div class="row">
                     <div class="col-md-6">
                        <div class="form-group form-md-line-input form-md-floating-label">
                           <input type="text" class="form-control" name="address" id="address">
                           <label for="form_control_1">Địa chỉ </label>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-md-6">
                        <div class="form-group form-md-line-input form-md-floating-label">
                           <input type="text" class="form-control" name="account" id="account">
                           <label for="form_control_1">Tài khoản </label>
                        </div>
                     </div>
                     <div class="col-md-6">
                        <div class="form-group form-md-line-input form-md-floating-label">
                           <select class="form-control" name="contract" id="contract">
                              <option value=""></option>
                              <option value="2">Option 1</option>
                              <option value="3">Option 2</option>
                              <option value="4">Option 3</option>
                           </select>
                           <label for="form_control_1">Hợp đồng </label>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
      <div class="box-footer">
         <button class="btn btn-green pull-right" data-toggle="modal"
            data-target="#myModal" style="margin-left: 10px;">
         <i class="fa fa-plus"></i>Tạo yêu cầu mới
         </button>
         <button id="searchChannel" class="btn btn-blue pull-right mt-ladda-btn ladda-button"
            onclick="return Channel.searchChannel();" data-style="expand-right">
         <i class="fa fa-search"></i>Tìm kiếm
         </button>
      </div>
   </div>
   <!-- /.box -->
   <div class="box">
      <div class="portlet-body flip-scroll" style="display: block;">
         <div class="table-responsive">
            <table id="channelList"
               class="table table-striped table-bordered display table-hover dt-responsive">
               <thead>
                  <tr>
                     <th>STT</th>
                     <th>Tài khoản</th>
                     <th>Địa chỉ</th>
                     <th>Thao tác</th>
                  </tr>
               </thead>
            </table>
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
	$(document).ready( function() {

		// Processing top bar
		var simplebar = new Nanobar();
		simplebar.go(100);
		
		// Active menu 
		$('.menu-service .tctt').addClass("active");

		//Generate breadCumb
		var breadCumb_1 = [ 'Dịch vụ đang sử dụng', false ];
		var breadCumb_2 = [ 'Kênh truyền', '#/channel' ];
		CommonUtils.genBreadCumb(breadCumb_1, breadCumb_2);

		$('.modal-content').resizable({
			minHeight : 300,
			minWidth : 300
		});
		$('.modal-dialog').draggable();

		var page = 1;
		var STT = 1;
		var draw = 1;
		var table = $('#channelList').DataTable({
			"serverSide": true,
			"processing" : true,
			"bLengthChange" : false,
			"searching" : false,
			"bSort" : false,
			"responsive" : true,
			"autoWidth" : true,
			"pagingType" : "full_numbers",
			"scrollY" : true,
			"scrollX" : true,
			"ajax" : {
				"url" : "/channel/getListChannel?draw="+draw+"",
				"type" : "POST",
				"dataType" : "json",
			    "contentType": 'application/json; charset=utf-8',
			    "dataSrc": "listData",
			    "data": function () {
			  		return JSON.stringify(Channel.getPramSearchChannel(page));
			  	}
			},
			"columns" : [
					{
						data : null,
						defaultContent : "1",
						className : 'textCenter',
						orderable : false
					},
					{
						"data" : "account"
					},
					{
						"data" : "address"
					},
					{
						data : null,
						render : function(data,
								type, row) {
							return '<a class="iconSize18 margin-right-10" href="javascript:void(0)" onclick="return Channel.channelDetail('+data.account+')"><i class="fa fa-edit"></i></a>'
									+ '<a class="iconSize18 margin-right-10" href="javascript:void(0)" onclick="detail("'+data.account+'")"><i class="fa fa-edit"></i></a>'
									+ '<a class="iconSize18" href="javascript:void(0)" onclick="detail("'+data.account+'")"><i class="fa fa-edit"></i></a>';
						},
						className : 'textCenter',
						orderable : false
					}
			
			],

		});

// 		table.on('order.dt search.dt', function() {
// 			table.column(0, {
// 				search : 'applied',
// 				order : 'applied'
// 			}).nodes().each(function(cell, i) {
// 				cell.innerHTML = i + 1;
// 			});
// 		}).draw();

		$('#channelList').on('page.dt', function() {
			page = table.page.info().page + 1;
			draw = draw + 1;
// 			STT = 10 * page - 10 + 1;
		});

	});

</script>
