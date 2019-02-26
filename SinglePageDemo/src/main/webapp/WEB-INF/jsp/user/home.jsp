<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
 <section class="content">
<!-- row -->
<div class="row">
	<div class="col-md-12">
		<div class="boxBaner">
			 <img src="<%=ConfigurationPath.getResourceServerPath("/images/banner.png")%>">
		</div>
		<!-- /.col -->
	</div>
</div>
<!-- /.row -->
<!-- row -->
<div class="row">
	<div class="col-md-12">
		<label class="box-tile-Content">Kênh truyền</label>
		<!-- /.col -->
	</div>
</div>
<!-- /.row -->
<div class="row cus-home-img">
	<div class="col-sm-4 marBottom5">
		<img class="" src="<%=ConfigurationPath.getResourceServerPath("/images/kt-dichvu.png")%>">
	</div>
	<div class="col-sm-4 marBottom5">
		<img class="" src="<%=ConfigurationPath.getResourceServerPath("/images/kt-mayao.png")%>">
	</div>
	<div class="col-sm-4">
		<img class="" src="<%=ConfigurationPath.getResourceServerPath("/images/kt-kenhthue.png")%>">
	</div>
</div>
<!-- /.row -->
<!-- row -->
<div class="row">
	<div class="col-md-12">
		<label class="box-tile-Content">Giải pháp công nghệ thông tin</label>
		<!-- /.col -->
	</div>
</div>
<!-- /.row -->
<div class="row cus-home-img">
	<div class="col-sm-4 marBottom5">
		<img class="" src="<%=ConfigurationPath.getResourceServerPath("/images/gp-mangao.png")%>">
	</div>
	<div class="col-sm-4 marBottom5">
		<img class="" src="<%=ConfigurationPath.getResourceServerPath("/images/gp-nhom.png")%>">
	</div>
</div>
<!-- /.row -->

</section>
<script type="text/javascript">
	$(document).ready(function() {
		 $('#breadCumb').empty();
		// Processing top bar
			var simplebar = new Nanobar();
			simplebar.go(100);
 });
</script>