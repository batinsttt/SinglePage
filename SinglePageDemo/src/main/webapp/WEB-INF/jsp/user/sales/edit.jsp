<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<script type="text/javascript" charset="utf8"
	src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
<section class="content">
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
			<button type="submit" class="btn btn-green pull-right"
				style="margin-left: 10px;" id="add">
				<i class="fa fa-plus"></i>Tạo yêu cầu mới
			</button>
			<button type="submit" class="btn btn-blue pull-right" id="update">
				<i class="fa fa-search"></i>Update
			</button>
		</div>
	</div>
</section>
<script type="text/javascript">
	$(document).ready(function() {
		var url = 'http://10.30.176.198:9006/ITSolWebService/sales/edit'
		var method = "POST";
		var data = new Object;
		data.address = 'Đà Nẵng Test';
		data.phone = $("#phone").val();
		var kData =  JSON.stringify(data);
		$.ajax({
			type : method,
			url : '/service/call',
			dataType : "json",
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			},
			data :(kData),
			success : function(data) {
				$("#address").val(data.address);
				$("#phone").val(data.phone);
				var option = "";
				for (var i = 0; i < data.birthday.length; i++) {
					option = "<option>" + data.birthday[i] + "</option>";
					$("#birthday").append(option);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

			}
		});

// 		$("#add").click(function() {
// 			var data = new Object;
// 			data.address = $("#address").val();
// 			data.phone = $("#phone").val();
// 			var kData =  JSON.stringify(data);
// 			var url = 'http://10.30.176.198:9006/ITSolWebService/sales/edit'
// 			var method = "POST";
// 			$.ajax({
// 				type : method,
// 				url : url,
// 				data :(kData),
// 				headers: {
// 		            'Content-Type': 'application/json'
// 		        },
// 				success : function(data) {				
// 					console.log("OK");
// 				},
// 				error:function(XMLHttpRequest, textStatus, errorThrown) {
// 					console.log("ERROR");
// 				}
// 			});
// 		});
		
		$("#add").click(function() {
			var url = '/customerManager/enterpriseInfor'
			var method = "GET";
			$.ajax({
				type : method,
				url : url,
				dataType: "json",
				success : function(data) {
					console.log(data);
				},
				error:function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("ERROR");
				}
			});
		});
		
		$("#update").click(function() {
			var data = new Object;
			data.address = $("#address").val();
			data.phone = $("#phone").val();
			var kData =  JSON.stringify(data);
			var url = 'http://10.30.176.198:9006/ITSolWebService/sales/edit'
			var method = "PUT";
			$.ajax({
				type : method,
				url : url,
				data :(kData),
				headers: {
		            'Content-Type': 'application/json'
		        },
				success : function(data) {				
					console.log("OK");
				},
				error:function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("ERROR");
				}
			});
		});
	});
</script>
