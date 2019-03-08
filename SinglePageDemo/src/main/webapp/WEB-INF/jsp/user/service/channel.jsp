
			
		
<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<section class="content">
   <!-- menu service -->
   <jsp:include page="/WEB-INF/jsp/user/channel/menuService.jsp" />
   <!-- end menu -->
   <!-- /.box -->
   <div class="box">
      <div class="box-body">
         <div class="portlet-body form">
            <form role="form">
               <div class="form-body">
                  <div class="row">
                     <div class="col-md-12">
                        <div class="form-group form-md-line-input form-md-floating-label">
                           <input type="text" class="form-control" name="address" id="address">
                           <label for="form_control_1">Địa chỉ </label>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-md-6 form_paddRightCol6">
                        <div class="form-group form-md-line-input form-md-floating-label">
                           <input type="text" class="form-control" name="account" id="account">
                           <label for="form_control_1">Tài khoản </label>
                        </div>
                     </div>
                     <div class="col-md-6 form_paddLeftCol6">
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
                   <div class="row">
                     <div class="col-md-4 form_paddRightCol4">
                        <div class="form-group form-md-line-input form-md-floating-label">
                           <input type="text" class="form-control" name="account" id="account">
                           <label for="form_control_1">Tài khoản </label>
                        </div>
                     </div>
                     <div class="col-md-4" style="padding: 20px;">
                     	<div class="md-radio-inline">
							<div class="md-radio">
								<input type="radio" tabindex="0" id="radio53" name="radio1" class="md-radiobtn"> 
									<label for="radio53" > 
									<span></span>
									<span class="check"></span> 
									<span class="boxForm"></span>
									<span class="radioFocus" tabindex="0"></span>
									Option 1
								</label>
							</div>
							<div class="md-radio">
								<input type="radio" id="radio54" name="radio1"
									class="md-radiobtn"> <label for="radio54"> 
									<span></span>
									<span class="check"></span> <span class="boxForm"></span>
									<span class="radioFocus" tabindex="0"></span>
									Option 2
								</label>
							</div>
						</div>
						</div>
						<div class="col-md-4">
									<div class="form-group form-md-checkboxes paddingtop15">
										<div class="md-checkbox-inline">
											<div class="md-checkbox">
												<input type="checkbox" id="checkbox14" class="md-check">
												<label for="checkbox14"> 
												<span></span>
												<span class="check"></span> 
												<span class="boxForm"></span>
												<span class="checkboxFocus" tabindex="0"></span>
													 Địa chỉ lắp đặt
												</label>
											</div>
										</div>
									</div>
								</div>
                     
                   </div>
                     <div class="row">
                    	 <div class="col-md-6">
							<div class="form-group form-md-line-input form-md-floating-label">
								<div class="input-icon right date">
                                     <input type="text" class="form-control" name="fromdate" id="fromdate">
                                     <label for="fromdate">Thời gian</label>
                                     <i class="fa fa-calendar"></i>
                                 </div>
							</div>
							
						 </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
      <div class="box-footer">
         <button class="btn btn-green pull-right" id="showError" style="margin-left: 10px;">
         <i class="fa fa-plus"></i>Show error message from API
         </button>
         <button class="btn btn-green pull-right" id="showSuccess" style="margin-left: 10px;">
         <i class="fa fa-plus"></i>Show success API
         </button>
         <button id="searchChannel" class="btn btn-blue pull-right mt-ladda-btn ladda-button"
            onclick="return Channel.searchChannel();" data-style="expand-right">
         <i class="fa fa-search"></i>Tìm kiếm
         </button>
      </div>
      <div class="box-footer" style="margin-top: 30px;">
      		<button class="btn btn-green pull-right ladda-button margin-left-10" data-toggle="modal" data-target="#myModal"><i class="fa fa-plus"></i>Tạo yêu cầu mới</button>
            <button id="searchChannel" class="btn btn-blue pull-right ladda-button margin-left-10" onclick="return Service.searchChannel();"><i class="fa fa-search"></i>Tìm kiếm</button>
            <button id="searchChannel" class="btn btn-green pull-right ladda-button margin-left-10" ><i class="fa fa-location-arrow"></i>Gửi đánh giá</button>
		    <button id="searchChannel" class="btn btn-blue pull-right ladda-button margin-left-10" ><i class="fa fa-mail-reply-all"></i>Quay lại</button>
		    <button id="searchChannel" class="btn btn-orange pull-right ladda-button margin-left-10" ><i class="fa fa-warning"></i>Danh sách cảnh báo</button>
		    <button id="searchChannel" class="btn btn-green pull-right ladda-button margin-left-10" ><span class="glyphicon glyphicon-download-alt"></span>Tạo bảng kê theo mã số thuế</button>
			<button id="searchChannel" class="btn btn-orange pull-right ladda-button margin-left-10" ><i class="fa fa-warning"></i>Danh sách cảnh báo</button>
      </div>
   <!-- /.box -->
   <div class="box">
      <div class="portlet-body flip-scroll" style="display: block;">
         <div class="table-responsive">
            <table id="channelList" class="table table-striped table-bordered display table-hover width100">
               <thead>
                  <tr>
                     <th>STT</th>
                     <th>Tài khoản</th>
                     <th>Địa chỉ</th>
                     <th>Tài khoản</th>
                     <th>Địa chỉ</th>
                     <th>Tài khoản</th>
                     <th>Địa chỉ</th>
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

		$(window).bind('keypress',function(event){
			if (event.keyCode == 13 && $('#myModal').is(':hidden') && !($("button").is(":focus")) && !($("a").is(":focus"))) {
	 			$('#showSuccess').click();
	 		}
	   	});
		
		$('#fromdate').daterangepicker({ 
	    	timePicker: true, 
	    	timePickerIncrement: 30,
// 	    	autoUpdateInput: false,
	    	timePicker24Hour: true,
			locale: {
			      format: 'DD/MM/YYYY H:mm'
			    }
	    });
		$('#fromdate').val('');
		$('#fromdate').on('apply.daterangepicker', function(ev, picker) {
		      $(this).addClass('edited');
		  });
		
		// Processing top bar -> Drag modal -> active menu
		CommonUtils.pageLoadInit("tctt");
		
		//Generate breadCumb
// 		var breadCumb_1 = [ 'Dịch vụ đang sử dụng', false ];
// 		var breadCumb_2 = [ 'Kênh truyền', '#/channel' ];

		var breadCumb_1 = new Object();
		breadCumb_1.key = 'Dịch vụ đang sử dụng';
		breadCumb_1.value = false;
		
		var breadCumb_2 = new Object();
		breadCumb_2.key = 'Kênh truyền';
		breadCumb_2.value = '#/channel';
		
		var breadArr = new Array();
		breadArr.push(breadCumb_1);
		breadArr.push(breadCumb_2);
		
		CommonUtils.genBreadCumb(breadArr);

		$(window).resize(function() {
			setTimeout(function() {
				$('#channelList').DataTable().columns.adjust();
			 }, 500);
		});
		
		var page = 1;
		var STT = 1;
		var draw = 1;
		var table = $('#channelList').DataTable({
			"serverSide": true,
			"pageLength": 10,
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
						"data": null,"sortable": false, 
				        render: function (data, type, row, meta) {
				                 return meta.row + meta.settings._iDisplayStart + 1;
				                },
				        className : 'textCenter'
				    },
					{
// 						"data" : "account"
						"data": null,
				         render: function (data) {
				                 return CommonUtils.XSSEncode(data.account);
				                }
					},
					{
// 						"data" : "address"
						"data": null,
							render: function (data) {
				                 return CommonUtils.XSSEncode(data.address);
				                }
					},
					{
// 						"data" : "account"
						"data": null,
				         render: function (data) {
				                 return CommonUtils.XSSEncode(data.account);
				                }
					},
					{
// 						"data" : "address"
						"data": null,
							render: function (data) {
				                 return CommonUtils.XSSEncode(data.address);
				                }
					},
					{
// 						"data" : "account"
						"data": null,
				         render: function (data) {
				                 return CommonUtils.XSSEncode(data.account);
				                }
					},
					{
// 						"data" : "address"
						"data": null,
							render: function (data) {
				                 return CommonUtils.XSSEncode(data.address);
				                }
					},
					{
// 						"data" : "account"
						"data": null,
				         render: function (data) {
				                 return CommonUtils.XSSEncode(data.account);
				                }
					},
					{
// 						"data" : "address"
						"data": null,
							render: function (data) {
				                 return CommonUtils.XSSEncode(data.address);
				                }
					},
					{
						data : null,
						render : function(data,
								type, row) {
							return '<a class="iconSize18 margin-right-10" href="javascript:void(0)" onclick="return Channel.channelDetail('+data.account+')"><i class="fa fa-edit"></i></a>';
						},
						className : 'textCenter',
						orderable : false
					}
			
			],

		});

		
		$('#channelList').on('page.dt', function() {
			page = table.page.info().page + 1;
			draw = draw + 1;
		});
		
		$('#showError').click(function() {
			CommonUtils.showAPIErrorMessage("You have some form errors! ");
		
		});
		
		$('#showSuccess').click(function() {
			CommonUtils.showAPISuccessMessage("You have create request successfully ");
	
	});
		
		
		
		
		

	});

</script>
		