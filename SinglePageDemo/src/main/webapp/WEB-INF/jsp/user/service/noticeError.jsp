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
	<!-- /.box -->
	<div class="box">
		<div class="box-body">
			<div class="row">
				<!-- <div class="col-md-4">
					<div class="form-group">
						<select class="form-control select2 select2-hidden-accessible"
							style="width: 100%;" aria-hidden="true">
							<option selected="selected">Tất cả</option>
							<option>Alaska</option>
							<option>Tennessee</option>
							<option>Texas</option>
							<option>Washington</option>
						</select>
					</div>
					/.form-group
				</div> -->
				<div class="col-md-4">
					<div class="form-group">
						<select id="movies" data-placeholder="Select movie..."></select>
						<script>
					        $(document).ready(function() {
						        $("#movies").kendoMultiSelect({
						        	autoClose: false,
						            dataTextField: "name",
						            dataValueField: "abbreviation",
						            dataSource: {
						                transport: {
						                    read: {
						                        url: "http://10.30.176.198:9006/ITSolWebService/payment/combobox",
						                    }
						                }
						            },
						            /* value: [
						                { name: "Alberta", abbreviation: 'AB' }
						            ] */
						        });
						
						        $("#filter").kendoDropDownList({
						            change: filterTypeOnChanged
						        });
						
						        var multiSelect = $("#movies").data("kendoMultiSelect"),
						            setValue = function(e) {
						                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
						                    multiSelect.dataSource.filter({}); //clear applied filter before setting value
						
						                    multiSelect.value($("#value").val().split(","));
						                }
						            },
						            setSearch = function (e) {
						                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
						                    multiSelect.search($("#word").val());
						                }
						            };
						        function filterTypeOnChanged() {
						            multiSelect.options.filter = $("#filter").val();
						        }
					    	});
					    </script>
					</div>
					<!-- /.form-group -->
				</div>
				<!-- <div class="col-md-4">
					<div class="form-group">
						<select class="form-control select2 select2-hidden-accessible"
							style="width: 100%;" aria-hidden="true">
							<option selected="selected">Hoạt động</option>
							<option>Alaska</option>
							<option>Tennessee</option>
							<option>Texas</option>
							<option>Washington</option>
						</select>
					</div>
					/.form-group
				</div> -->
				<div class="col-md-4">
					<div class="form-group">
						<!-- <input type="text" class="form-control" id="phone"
							placeholder="Combobox multiple checkbox"> -->
						<select id="multiCheckbox" class="form-control" multiple="multiple">
						</select>
						<script type="text/javascript">
						    $(document).ready(function() {
						    	var dropdown = $('#multiCheckbox');
							    const url = 'http://10.30.176.198:9006/ITSolWebService/payment/combobox';
							    $.getJSON(url, function (data) {
							        $.each(data, function (key, entry) {
							            dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
							        })
						        	$('#multiCheckbox').multiselect({
					                    includeSelectAllOption: true,
					                    buttonWidth: '100%'
					                });
							    }); 
						    });
						</script>
					</div>
					<!-- /.form-group -->
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<input type="text" class="form-control" id="idNamePhone"
							placeholder="Mã, Tên, Số điện thoại">
					</div>
					<!-- /.form-group -->
				</div>
				<!-- /.col -->
			</div>
			<div class="row">
				<div class="col-md-4">
					<div class="form-group">
						<input type="text" class="form-control" id="customerId"
							placeholder="Mã KH">
					</div>
					<!-- /.form-group -->
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<input type="text" class="form-control" id="namePhone"
							placeholder="Tên/SĐT">
					</div>
					<!-- /.form-group -->
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<input type="text" class="form-control" id="address"
							placeholder="Địa chỉ">
					</div>
					<!-- /.form-group -->
				</div>
				<!-- /.col -->
			</div>
			<!-- /.row -->
			<div class="row">
				<div class="col-md-4">
					<div class="form-group">
						<select class="form-control select2 select2-hidden-accessible"
							style="width: 100%;" aria-hidden="true">
							<option selected="selected"></option>
							<option>Alaska</option>
							<option>Tennessee</option>
							<option>Texas</option>
							<option>Washington</option>
						</select>
					</div>
					<!-- /.form-group -->
				</div>
			</div>
			<!-- /.row -->
		</div>
		<div class="box-footer">
			<!-- <button class="btn btn-green pull-right" data-toggle="modal" data-target="#myModal" style="margin-left: 10px;"><i class="fa fa-plus"></i>Tạo yêu cầu mới</button> -->
            <button id="searchNoticeError"  onclick="return Service.searchNoticeError();" class="btn btn-blue pull-right"><i class="fa fa-search"></i>Tìm kiếm</button>
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
								<th>Tài Khoản</th>
								<th>Địa chỉ</th>
								<th>Thao tác</th>
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
				    <label for="inputEmail3" class="col-sm-3 col-form-label">Tài khoản</label>
				    <div class="col-sm-9">
				      <input type="text" name="account" class="form-control" placeholder="Tài khoản">
				    </div>
				  </div>
				  <div class="form-group row">
				    <label for="inputPassword3" class="col-sm-3 col-form-label">Địa chỉ</label>
				    <div class="col-sm-9">
				      <input type="text" name="address" class="form-control" placeholder="Địa chỉ">
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
	    var table = $('#example').DataTable({
	    	  "processing":true,
	    	  responsive: true,
	    	  "autoWidth":true,
	    	  "pagingType": "full_numbers",
	    	  "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
	    	  "scrollY": 380,
	    	  "sScrollY": "auto",
	          "scrollX": true,
	          "ajax": {
	  		    "url": "http://10.30.176.198:9006/ITSolWebService/service/noticeError",
	  		    "type": "GET",
	  		    "data": function ( d ) {
			        return Service.getPramSearchNoticeError();
			    }
	  		  },
	          "columns": [
	        	  { "data": null },
	              { "data": "account" },
	              { "data": "address" },
	              {
	                  data: null,
	                  render: function ( data, type, row ) {
	                	  return  '<a class="edit1" href="javascript:void(0)" onclick="showModal('+data.id+')"><i class="fa fa-edit"></i></a>';
	                   },
	                  className: '',
	                  orderable: false
	              }
	          ],
	          "columnDefs": [ {
	              "searchable": false,
	              "orderable": false,
	              "targets": 0
	          } ],
	          "order": [[ 1, 'asc' ]]
	      });

	    table.on('order.dt search.dt', function () {
            table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
   });

   function showModal(rowId){     
       $.ajax({
           type: 'GET',
           url: 'http://10.30.176.198:9006/ITSolWebService/service/noticeError',
           success: function(response) {
               var dataJson = response.data;
               var res = dataJson.filter(function(row) {
                   return row.id == rowId;
                 }).pop();
               $('input[name="account"]').val(res.account);
               $('input[name="address"]').val(res.address);
           }
       });
       
 	  $('#myModal').modal('show');
   }

</script>
