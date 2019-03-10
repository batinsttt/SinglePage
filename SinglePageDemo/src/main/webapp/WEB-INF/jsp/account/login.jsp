<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<html>
	<head>
		<jsp:include page="/WEB-INF/jsp/general/multiLanguage.jsp" />
		<jsp:include page="/WEB-INF/jsp/general/commonLibrary.jsp" />
		<!-- Particlecs js -->
	
	</head>
	<body id="PageLogin" class="hold-transition skin-blue sidebar-mini">

		<div class="wrapper loginBG">
		
		 <!-- Left side column. contains the logo and sidebar -->
		 <aside class="main-sidebar loginBG">
		   	<!-- sidebar: style can be found in sidebar.less -->
		   	<section class="sidebar">
				<header class="main-header">   
				    <!-- Logo -->
				    <a id="logoId" class="logo">
				      <!-- mini logo for sidebar mini 50x50 pixels -->
				      <span class="logo-mini">
				      </span>
				      <img class="custom_Logo" src="<%=ConfigurationPath.getResourceServerPath("/images/viettel_Logo_Login.png")%>"  alt="Viettel Solution">
				      
				    </a>
				</header>
		     	<!-- sidebar menu: : style can be found in sidebar.less -->
		     	<ul class="sidebar-menu" ng-controller="HeaderController" data-widget="tree">
		    		<li id="dangNhap" class="active oneLevel">
		         		<a>
		          	 		<i class="fa fa-user login-title"></i></br>
		          	 		<span>
		          	 			<spring:message code="login.title" text="default text" />
		          	 		</span>
		        		</a>
		       		</li>
					<li id="giaiPhap" class="oneLevel">
				  		<a>
				   	 		<i class="fa fa-gear custom-menu-fa"></i></br>
				   	 		<span>
				   	 			<spring:message code="solution.button.title" text="default text" />
				   	 		</span>
				 		</a>
					</li>
		     	</ul>
		   </section>
		   <!-- /.sidebar -->
		  	<div id="particles-js" class="sideLogin rotateDown" style="max-height: 500px !important"> 
		  		<canvas class="particles-js-canvas-el" width="450" height="500" style="width: 100%; height: 100%;"></canvas>
		  		<div class="loginTextBox">
		  			 <span>
			       			<spring:message code="login.tab.content1" text="default text" />
			   		</span></br>
			   		<span class="loginHeadTitle">
			   			<spring:message code="login.tab.content2" text="default text" />
			  		 </span></br>
					   <i class="fa fa-quote-left"></i>
					   <span id="changeContent1">
					       <spring:message code="login.tab.content3" text="default text" />
					   </span></br>
					   <span id="changeContent2" class="sideLoginFooter rotateDown">
					       <spring:message code="login.tab.content4" text="default text" />
					   </span><i class="fa fa-quote-right"></i></br>
					   <div class="sideLoginBot">
						   <i class="fa fa-facebook"></i>
						   <i class="fa fa-instagram"></i>
						   <i class="fa fa-twitter"></i>
						   <i class="fa fa-linkedin"></i></br>
						   <span>
						       <spring:message code="login.tab.content5" text="default text" />
						   </span>
					   </div>
		  		</div>
			</div>
<!-- 			<div id="side2" class="sideLogin display-none">    -->
<!-- 			   <span> -->
<%-- 			       <spring:message code="login.tab.content1" text="default text" /> --%>
<!-- 			   </span> -->
<!-- 			   <span> -->
<%-- 			       <spring:message code="solution.tab.content1" text="default text" /> --%>
<!-- 			   </span> -->
<!-- 			   <span> -->
<!-- 			       <h3> -->
<%-- 			           <spring:message code="login.tab.content2" text="default text" /> --%>
<!-- 			       </h3> -->
<!-- 			   </span> -->
<!-- 			</div> -->
			<div class="formLogin">
				<form role="form" id="validationFormLogin">
			   		<span>
			   		    <h3 class="textCenter">
			   		        <spring:message code="login.title" text="default text" />
			   		    </h3>
			   		</span>
			   		<div class="portlet-body form">
						<div class="form-body">
							<div class="col-md-12">
								<div class="form-group form-md-line-input form-md-floating-label input-group right-addon">
									<input type="text" class="form-control" id="username" name="username">
									<a href="#" class="input-group-addon">
									    <spring:message code="login.form.forgot.account" text="default text" />
									</a>
									<label for="form_control_1">
									    <spring:message code="login.form.username" text="default text" />
									    <span class="required">
									        <spring:message code="label.star" text="default text" />
									    </span>
									</label>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group form-md-line-input form-md-floating-label input-group right-addon">
									<input type="password" class="form-control" id="password" name="password">
									<a href="#" class="input-group-addon">
									    <spring:message code="login.form.forgot.password" text="default text" />
									</a>
									<label for="form_control_1">
									    <spring:message code="login.form.password" text="default text" />
									    <span class="required">
									        <spring:message code="label.star" text="default text" />
									    </span>
									</label>
								</div>
							</div>
							<div id="capchaBlock" class="col-md-12 display-none">
								<div id="captchaBlockChild" class="form-group form-md-line-input form-md-floating-label input-group right-addon">
									<input type="text" class="form-control" id="maXacNhan" name="maXacNhan">
									<div class="input-group-addon">
										<img src="" id="captcha">
									</div>
									<div class="captcha-position"><a onclick="return Account.createCaptcha()"><i class="fa fa-refresh"></i></a></div>
									<label for="form_control_1">
									    <spring:message code="login.form.captcha" text="default text" />
									    <span class="required">
									        <spring:message code="label.star" text="default text" />
									    </span>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<span id="loginError" class="help-block help-block-error has-error display-none"></span>
					</div>
					<div class="loginButton">
						<button id="loginSubmit" class="btn btn-green btnLogin mt-ladda-btn ladda-button" data-style="slide-up" type="submit"><i class="fa fa-angle-right btnLogin-padding"></i></button>
						
					</div>
					<div class="paddingTopBot">
						<span>
						    <spring:message code="login.form.create.account.label" text="default text" />
						</span>
						<span class="colorMenu">
						    <spring:message code="login.form.contact.number" text="default text" />
						</span>
					</div>
				</form>
			</div>
		 </aside>
		 <!-- /.content-wrapper -->
		</div>
	</body>
		<script src="<%=ConfigurationPath.getResourceServerPath("/scripts/particles.js")%>"></script>
		<script src="<%=ConfigurationPath.getResourceServerPath("/scripts/particles-app.js")%>"></script>
	<script type="text/javascript">
        $(document).ready(function() {
        	Account.documentReady();
    	});
    </script>
</html>