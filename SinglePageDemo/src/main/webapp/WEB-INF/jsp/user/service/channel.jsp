<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- /.row -->
<!-- <div class="row"> -->
<!-- 	<div class="box"> -->
<!-- 		<div class="col-sm-3 cus-channel-header"> -->
<!-- 			 <a href="#" style="text-align: center;" > -->
<%-- 	              <span><i class="fa fa-bell-o"></i></span><br> --%>
<%-- 	              <span >Tra cứu thông tin</span> --%>
<!-- 	         </a> -->
<!-- 		</div> -->
<!-- 		<div class="col-sm-3 cus-channel-header"> -->
<!-- 			<a href="#" > -->
<%-- 	               <span><i class="fa fa-bell-o"></i></span><br> --%>
<%-- 	              <span>Báo lỗi dịch vụ</span> --%>
<!-- 	         </a> -->
<!-- 		</div> -->
<!-- 		<div class="col-sm-3 cus-channel-header"> -->
<!-- 			<a href="#" > -->
<%-- 	              <span><i class="fa fa-bell-o"></i></span><br> --%>
<%-- 	              <span>Quản lý yêu cầu</span> --%>
<!-- 	         </a> -->
<!-- 		</div> -->
<!-- 		<div class="col-sm-3 cus-channel-header"> -->
<!-- 			<a href="#" > -->
<%-- 	              <span><i class="fa fa-bell-o"></i></span><br> --%>
<%-- 	              <span>Hóa đơn điện tử</span> --%>
<!-- 	         </a> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- </div> -->
<!-- /.row -->


 <div class="row">
       <table id="example" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Extn.</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
        </thead>
    </table>
</div>
<!-- row -->
<script>
$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": "E:\jsonDemo\datatables.json",
        "columns": [
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "extn" },
            { "data": "start_date" },
            { "data": "salary" }
        ]
    } );
} );
</script>
