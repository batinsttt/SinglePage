<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<!-- <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script> -->

<html>
	<head>
		<jsp:include page="/WEB-INF/jsp/general/commonLibrary.jsp" />
		<jsp:include page="/WEB-INF/jsp/general/serverValue.jsp" />
		<jsp:include page="/WEB-INF/jsp/general/commonModal.jsp" />
		<jsp:include page="/WEB-INF/jsp/general/multiLanguage.jsp" />
	</head>
	<body id="PageLogin" class="hold-transition skin-blue sidebar-mini" onload="createCaptcha()">
	
	<!-- <form action="/login/auth" method="post">
		<input type = "text" name="username" id ="username"/>
		<input type = "password" name="password" id ="password"/>
		<input type="submit" value="Submit">
	</form> -->
	
		<div class="wrapper" style="background-color: #ffffff;">
		
		 <!-- Left side column. contains the logo and sidebar -->
		 <aside class="main-sidebar">
		   	<!-- sidebar: style can be found in sidebar.less -->
		   	<section class="sidebar">
				<header class="main-header">   
				    <!-- Logo -->
				    <a class="logo">
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
		          	 		<i class="fa fa-home" style="font-size: 18px;"></i></br>
		          	 		<span>Đăng nhập</span>
		        		</a>
		       		</li>
					<li id="giaiPhap" class="oneLevel">
				  		<a>
				   	 		<i class="fa fa-gear custom-menu-fa"></i></br>
				   	 		<span>Giải pháp</span>
				 		</a>
					</li>
		      
		     	</ul>
		   </section>
		   <!-- /.sidebar -->
		  	<div id="side1" class="sideLogin">   
			   <span>Chào mừng tới</span>
			   <span><h3>My Viettel Enterpise</h3></span>
			   <i class="fa fa-quote-left"></i><span> Chi tiêu thông minh</span></br>
			   <span style="padding-left: 50px;">Dễ dàng sử dụng </span><i class="fa fa-quote-right"></i></br>
			   <div class="sideLoginBot">
				   <i class="fa fa-facebook"></i>
				   <i class="fa fa-instagram"></i>
				   <i class="fa fa-twitter"></i>
				   <i class="fa fa-linkedin"></i></br>
				   <span>Hotline: 1900.1868</span>
			   </div>
			</div>
			<div id="side2" class="sideLogin" style="display: none;">   
			   <span>Chào mừng tới</span>
			   <span> giải pháp của</span>
			   <span><h3>My Viettel Enterpise</h3></span>
			</div>
			<div class="formLogin">   
				<form role="form" id="validationFormLogin" onsubmit="validateCaptcha()">
			   		<span><h3 style="text-align: center;">Đăng nhập</h3></span>
			   		<div class="portlet-body form">
						<div class="form-body">
							<div class="col-md-12">
								<div class="form-group form-md-line-input form-md-floating-label input-group right-addon">
									<input type="text" class="form-control" id="userName" name="userName">
									<a href="#" class="input-group-addon">Quên tài khoản?</a>
									<label for="form_control_1">Tên đăng nhập <span class="required">*</span></label>
								</div>
							</div>
							<div class="col-md-12	">
								<div class="form-group form-md-line-input form-md-floating-label input-group right-addon">
									<input type="text" class="form-control" id="password" name="password">
									<a href="#" class="input-group-addon">Quên mật khẩu?</a>
									<label for="form_control_1">Mật khẩu <span class="required">*</span></label>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group form-md-line-input form-md-floating-label input-group right-addon">
									<input type="text" class="form-control" id="maXacNhan" name="maXacNhan">
									<div class="input-group-addon" id="captcha"></div>
									<div style="position: absolute;"><a onclick="createCaptcha()"><i class="fa fa-refresh"></i></a></div>
									<label for="form_control_1">Mã xác nhận <span class="required">*</span></label>
								</div>
							</div>
						</div>
					</div>
					<button class="btn btn-green btnLogin" type="submit"><i style="padding: 0px 12px;" class="fa fa-angle-right"></i></button>
					<div class="paddingTopBot">
						<span>Bạn chưa có tài khoản? liên hệ:</span>
						<span style="color: #00918c;">1900.1686</span>
					</div>
				</form>
			</div>
		 </aside>
		 <!-- /.content-wrapper -->
		</div>
	</body>
	<script type="text/javascript">
	    //Create Captcha
	    var code;
	    function createCaptcha() {
			//clear the contents of captcha div first 
			document.getElementById('captcha').innerHTML = "";
			var charsArray =
			"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
			var lengthOtp = 6;
			var captcha = [];
			for (var i = 0; i < lengthOtp; i++) {
			  	//below code will not allow Repetition of Characters
			  	var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
			  	if (captcha.indexOf(charsArray[index]) == -1)
			    	captcha.push(charsArray[index]);
			  	else i--;
			}
			var canv = document.createElement("canvas");
			canv.id = "captcha";
			canv.width = 100;
			canv.height = 40;
			var ctx = canv.getContext("2d");
			ctx.font = "25px Georgia";
			ctx.strokeText(captcha.join(""), 0, 30);
			//storing captcha so that can validate you can save it somewhere else according to your specific requirements
			code = captcha.join("");
			document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
	    }
	    function validateCaptcha() {
			/* event.preventDefault();
			debugger
			if (document.getElementById("maXacNhan").value == code) {
			  	alert("Valid Captcha")
			}else{
			  	alert("Invalid Captcha. try Again");
			  	createCaptcha();
			} */
			var e = $("#validationFormLogin");
			e.validate({
	            errorElement: "span",
	            errorClass: "help-block help-block-error",
	            focusInvalid: !1,
	            rules: {
	            	// userName is name of input tag
	                // simple rule, converted to {required:true}
	                userName: "required",
	                password: {
	                	required: true,
	                	minlength: 8
	                },
	                maXacNhan: {
	                	required: true,
	                	minlength: 8,
	                	equalTo: code // #password is name of input tag
	                }
	            },
	            messages: {
	            	userName: {
	            		required: jQuery.validator.format("Vui lòng nhập tài khoản"),
	                },
	                password: {
	                	required: jQuery.validator.format("Vui lòng nhập mật khẩu."),
	                	minlength: jQuery.validator.format("Mật khẩu có độ dài tối thiểu là 8 ký tự.")
	                },
	                maXacNhan: 
	                {
	                	required: jQuery.validator.format("Vui lòng nhập mã xác nhận."),
	                	equalTo: jQuery.validator.format("Mã xác nhận không đúng.")
	                }
	            },
	            invalidHandler: function(event, validator) {},
	            submitHandler: function(form) {
	                getAjax();
	            },
	            highlight: function(e) {
	                $(e).closest(".form-group").addClass("has-error")
	            },
	            unhighlight: function(e) {
	                $(e).closest(".form-group").removeClass("has-error")
	            }
	        });
	    }
    	$(document).ready(function() {
    		$("ul li a").click(function() {
    			if($("ul #dangNhap").hasClass('active')){
        			$("#side1").css("display","block");
        			$("#side2").css("display","none");
        		}
        		if($("ul #giaiPhap").hasClass('active')){
        			$("#side1").css("display","none");
        			$("#side2").css("display","block");
        		}
    	    });
    		/* $("#login").click(function() {
    			var data = new Object;
    			data.username = $("#username").val();
    			data.password = $("#password").val();
    			var kData =  JSON.stringify(data);
    			var url = '/login/auth'
    			var method = "POST";
    			$.ajax({
    				type : method,
    				url : url,
    				data :(kData),
    				headers: {
    		            'Content-Type': 'application/json'
    		        },
    				success : function(data) {				
    					data.errorCode==200?console.log("OK"):console.log("ERROR")
    				},
    				error:function(XMLHttpRequest, textStatus, errorThrown) {
    					console.log("ERROR");
    				}
    			});
    		}); */
    		var e = $("#validationFormLogin"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);

	        e.validate({
	            errorElement: "span",
	            errorClass: "help-block help-block-error",
	            focusInvalid: !1,
	            rules: {
	            	// userName is name of input tag
	                // simple rule, converted to {required:true}
	                userName: "required",
	                password: {
	                	required: true,
	                	minlength: 8
	                },
	                maXacNhan: {
	                	required: true,
	                	minlength: 8,
	                	equalTo: code // #password is name of input tag
	                }
	            },
	            messages: {
	            	userName: {
	            		required: jQuery.validator.format("Vui lòng nhập tài khoản"),
	                },
	                password: {
	                	required: jQuery.validator.format("Vui lòng nhập mật khẩu."),
	                	minlength: jQuery.validator.format("Mật khẩu có độ dài tối thiểu là 8 ký tự.")
	                },
	                maXacNhan: 
	                {
	                	required: jQuery.validator.format("Vui lòng nhập mã xác nhận."),
	                	equalTo: jQuery.validator.format("Mã xác nhận không đúng.")
	                }
	            },
	            invalidHandler: function(event, validator) {},
	            submitHandler: function(form) {
	                getAjax();
	            },
	            highlight: function(e) {
	                $(e).closest(".form-group").addClass("has-error")
	            },
	            unhighlight: function(e) {
	                $(e).closest(".form-group").removeClass("has-error")
	            }
	        });
	        

    	});

    	</script>
</html>