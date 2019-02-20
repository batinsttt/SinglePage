<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<script type="text/javascript" charset="utf8"
	src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
<section class="content">
	<div class="box box-danger">
		<div class="row">
			<div class="col-sm-3 cus-channel-header">
				<a href="#" style="text-align: center;"> <span><i
						class="fa fa-search"></i></span><br> <span>Tra cứu thông tin</span>
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
		<div style="width: 98%; margin-left: 15px;">
			<table id="example"
				class="table table-striped table-bordered display" cellspacing="0"
				width="100%">
				<thead>
					<tr>
						<th>Name</th>
						<th>Position</th>
						<th>Office</th>
						<th>Extn.</th>
						<th>Start date</th>
						<th>Salary</th>
						<th>Edit</th>
					</tr>
				</thead>

			</table>
		</div>
		<button id="addRow" style="margin-left: 15px;" class="btn btn-primary">Add
			new row</button>
		<button id="save" style="margin-left: 15px;" class="btn btn-primary">Save</button>
	</div>
	<!-- 	<div> -->
	<!-- 		<div class="ErrorMsg"> -->
	<!-- 			<p class="ErrorMsgPadding10">ABC</p> -->
	<!-- 			<p class="ErrorMsgPadding15">ABC</p> -->
	<!-- 			<p class="ErrorMsgPadding30">ABC</p> -->
	<!-- 		</div> -->
	<!-- 		<div class="SuccessMsg"> -->
	<!-- 			<p class="SuccessMsgPadding10">ABC</p> -->
	<!-- 			<p class="SuccessMsgPadding15">ABC</p> -->
	<!-- 			<p class="SuccessMsgPadding30">ABC</p> -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<script type="text/javascript">
   $(document).ready(function() {
 //     var countNew = 0;
 	var data = [{}];
 	var counter = 1;
 	var table = $('#example').DataTable();
    addRowTable(table,counter,true);
    counter++;
    $('#addRow').on( 'click', function () {
   	 	addRowTable(table,counter,false);
        counter++;
    } );
     
     $('#save').click( function() {
     	var data = table.$('input').serializeArray();
     	var results = convertArray(data,6,"-");
	 	var kData =  JSON.stringify(results);
		var url = 'http://10.30.176.198:9006/ITSolWebService/sales/view'
		var method = "POST";
		$.ajax({
			type : method,
			url : url,
			data :(kData),
			headers: {
	            'Content-Type': 'application/json'
	        },
			success : function(data) {				
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("ERROR");
			}
		});
		table.destroy();
		$('#example').DataTable({
			"ajax":{
				"url":'http://10.30.176.198:9006/ITSolWebService/sales/view',
			},
			"columns": [
				{ data: "name" },
				{ data: "position" },
				{ data: "office" },
				{ data: "extn" },
				{ data: "start" },
				{ data: "salary" },
				{ data: "edit" }
			]
		});
		$("#addRow").attr('disabled', 'disabled');
     });
	 function convertArray(field,MAX_SIZE,format){
		var index = 0;
		var sizeResult = 0;
		var obj = new Object();
		var result = [];
		for(var i = 0; i < field.length; i++){
			var nameField = field[i].name;
			var name = nameField.substring(nameField.lastIndexOf(format)+1,nameField.length);
			obj[name] = field[i].value;
			index++;
			if(index % MAX_SIZE === 0){
				result[sizeResult] = obj;
				sizeResult++;
				index == 0;
				var obj = new Object();
			}
		}
		return result;
	 }
	 function addRowTable(table,counter,flag){
		 table.row.add( [
			 '<input type="text" class="form-control" id="row-'+counter+'-name" name="row-'+counter+'-name">',
	         '<input type="text" class="form-control" id="row-'+counter+'-position" name="row-'+counter+'-position">',
	         '<input type="text" class="form-control" id="row-'+counter+'-office" name="row-'+counter+'-office">',
	         '<input type="text" class="form-control" id="row-'+counter+'-extn" name="row-'+counter+'-extn">',
	         '<input type="text" class="form-control" id="row-'+counter+'-start" name="row-'+counter+'-start">',
	         '<input type="text" class="form-control" id="row-'+counter+'-salary" name="row-'+counter+'-salary">',
	         '<a class="save" href="javascript:;">delete</a>'] ).draw(flag);
	 }
   });

</script>