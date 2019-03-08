<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script
	src="<%=ConfigurationPath.getResourceServerPath("/scripts/app.js")%>"></script>
<section class="content">
	<!-- menu service -->
	<jsp:include page="/WEB-INF/jsp/user/channel/menuService.jsp" />
	<!-- end menu -->
	<!-- /.box -->
	<div class="box" onload="createCaptcha()">
		<div class="box-header-md" >
			<label><spring:message code="create.request.change.other.page.name"/></label>
		</div>
		<div class="box-body">
			<form role="form" id="validationFormRequestChangeOtherDetail" class="clearfix" onsubmit="">
				<fieldset class="scheduler-border nav-tabs-fieldset">
					<legend class="scheduler-border nav-tabs-lengend">
						<button class="tablink btn btn-default" onclick="openPage('Home', this, '#00918c')" id="defaultOpen">Home</button>
						<button class="tablink btn btn-default" onclick="openPage('News', this, '#00918c')">News</button>
						<button class="tablink btn btn-default" onclick="openPage('Contact', this, '#00918c')">Contact</button>
						<button class="tablink btn btn-default" onclick="openPage('About', this, '#00918c')">About</button>
					</legend>
					<div class="portlet-body form">
						<div class="form-body">
							<div id="Home" class="tabcontent">
							  <h3>Home</h3>
							  <p>Home is where the heart is..</p>
							</div>
							
							<div id="News" class="tabcontent">
							  <h3>News</h3>
							  <p>Some news this fine day!</p> 
							</div>
							
							<div id="Contact" class="tabcontent">
							  <h3>Contact</h3>
							  <p>Get in touch, or swing by for a cup of coffee.</p>
							</div>
							
							<div id="About" class="tabcontent">
							  <h3>About</h3>
							  <p>Who we are and what we do.</p>
							</div>
							
							<script>
								function openPage(pageName,elmnt,color) {
								  var i, tabcontent, tablinks;
								  tabcontent = document.getElementsByClassName("tabcontent");
								  for (i = 0; i < tabcontent.length; i++) {
								    tabcontent[i].style.display = "none";
								  }
								  tablinks = document.getElementsByClassName("tablink");
								  for (i = 0; i < tablinks.length; i++) {
									$(tablinks[i]).removeClass('btn-green');
									$(tablinks[i]).addClass('btn-default');
								  }
								  document.getElementById(pageName).style.display = "block";
									$(tablinks[i]).removeClass('btn-default');
								  $(elmnt).addClass('btn-green');
								}
								document.getElementById("defaultOpen").click();	
							</script>
						</div>
					</div>
					
				</fieldset>
				<div class="row" style="text-align: center;">
					<button type="submit" id="submitBtn" onclick="" class="btn btn-green mt-ladda-btn ladda-button" 
						data-style="expand-right">
						<span class="ladda-label"><spring:message code="create.request.change.other.btn.sent.request"/></span>
					</button>
					<button type="reset" id="resetBtn" class="btn default">
						<span class="ladda-label"><spring:message code="create.request.change.other.btn.back"/></span>
					</button>
				</div>
			</form>
		</div>
	</div>
</section>
<script type = "text/javascript" >
	
	$(document).ready(function() {	
	    $('.menu-service .qlyc').addClass("active");
	    /* Generate breadCumb*/
	    var breadCumb_1 = ['DV đang sử dụng', false];
	    var breadCumb_2 = ['Kênh truyền', '#/service/channel'];
	    var breadCumb_3 = ['Quản lý yêu cầu', '#/ticket/create'];
	    CommonUtils.genBreadCumb(breadCumb_1, breadCumb_2, breadCumb_3);
	    /*  end */
	    // Select form
	    var form = $("#validationFormRequestChangeOtherDetail");
	    // Validation
	   
	    //Click Reset
	    $('#resetBtn').click(function() {
	        validator.resetForm();
	    });
	}); 
</script>