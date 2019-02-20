<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<section class="content">
	<div class="box box-default no-padding">
		<div class="padding-15 box-header with-border ">
			<h3 class="box-title" style="font-weight: 500;">Đăng ký thành
				viên Vip</h3>
		</div>
		<!-- /.box-header -->
		<div class="box-body padding-15 padding-top-10 padding-bottom-10">
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label class="label-bold">Họ và tên</label>
						<input type="text" id="userName" class="form-control"
							maxlength="50" placeholder="<spring:message code="placeholder.name"/>"/>
							<span class = "mess-error"></span>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label class="label-bold">Số điện thoại</label> <input
							type="text" id="phoneNumber" class="form-control"
							placeholder="<spring:message code="placeholder.phone"/>"/>
							<span class = "mess-error"></span>
					</div>
				</div>
			</div>
			<!-- /.row -->
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label class="label-bold">Năm sinh</label>
						<div class="input-group date">
							<input type="text" id="birthDate" class="form-control"
								maxlength="10" placeholder="<spring:message code="placeholder.date"/>" />
								<label for="birthDate" class="input-group-addon"><i class="fa fa-calendar"></i></label>
						</div>
						<span class="mess-error"></span>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label class="label-bold">Mail</label> <input type="email"
							id="userMail" class="form-control"
							placeholder="<spring:message code="placeholder.mail"/>" /> <span
							class="mess-error"></span>
					</div>
				</div>
			</div>
			<!-- /.row -->
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label class="label-bold">Mật khẩu</label>
						<input type="password" id="password" class="form-control "
								maxlength="50" placeholder="<spring:message code="placeholder.password"/>" />
						<span class="mess-error"></span>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label class="label-bold">Xác nhận Mật khẩu</label> <input type="password"
							id="confirmPassword" class="form-control" maxlength="50"
							placeholder="<spring:message code="placeholder.confirmPassword"/>" /> <span
							class="mess-error"></span>
					</div>
				</div>
			</div>
			<!-- /.row -->
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label class="label-bold">Từ ngày</label>
						<div class="input-group date">
							<input type="text" id="fromDate" class="form-control"
								maxlength="10"
								placeholder="<spring:message code="placeholder.date"/>" /> <label
								for="fromDate" class="input-group-addon"><i
								class="fa fa-calendar"></i></label>
						</div>

						<span class="mess-error"></span>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label class="label-bold">Đến ngày</label>
						<div class="input-group date">
							<input type="text" id="toDate" class="form-control"
								maxlength="10"
								placeholder="<spring:message code="placeholder.date"/>" /> <label
								for="toDate" class="input-group-addon"><i
								class="fa fa-calendar"></i></label>
						</div>
						<span class="mess-error"></span>
					</div>
				</div>
			</div>
			<!-- /.row -->
			<div class="row">
				<div class="col-md-12">
					<button id="registerMember" type="button"
						class="btn btn-success pull-right">
						<i class="fa fa-credit-card"></i> Đăng ký
					</button>
					<button id="refill" type="button"
						class="btn btn-primary pull-right" style="margin-right: 5px;">
						<i class="fa fa-repeat"></i> Làm lại
					</button>
				</div>
			</div>
			<!-- /.row -->
		</div>
		<!-- /.box-body -->
		<div class="box-footer padding-15 padding-top-10 padding-bottom-10">
			<i class="fa fa-globe"></i> Cơ hội lớn để trúng 5 tỷ đồng. Mọi chi
			tiết xin liên hệ <a target="blank"
				href="https://www.google.com/search?q=trúng+5+tỷ">Ông <span
				style="color: #4285F4">G</span><span style="color: #EA4335">o</span><span
				style="color: #FCCD45">o</span><span style="color: #4285F4">g</span><span
				style="color: #34A853">l</span><span style="color: #F5ABA5">e</span>
			</a> để biết thêm chi tiết. Ông <span style="color: #4285F4">G</span><span
				style="color: #EA4335">o</span><span style="color: #FCCD45">o</span><span
				style="color: #4285F4">g</span><span style="color: #34A853">l</span><span
				style="color: #F5ABA5">e</span> luôn luôn lắng nghe, luôn luôn thấu
			hiểu.
		</div>
		<!-- /.box-footer -->
	</div>

</section>
<script type="text/javascript">
	$(document).ready(function() {
		//Generate BreadCumb
		var breadCumb_1 = [ "Menu of Quoc", "#/quocDemo" ];
		var breadCumb_2 = [ "Screen of Quoc", "#/quocDemo" ];
		CommonUtils.genBreadCumb(breadCumb_1, breadCumb_2);
		
		// Add Datapicker
		$('#birthDate').datepicker({format: 'dd/mm/yyyy'});
		$('#fromDate').datepicker({format: 'dd/mm/yyyy'});
		$('#toDate').datepicker({format: 'dd/mm/yyyy'});
		
		// Evente press Enter
		$(window).bind('keypress',function(event){
    		if (event.keyCode == 13 ) {
    			console.log('abc');
     				$('#registerMember').click();
     			return false;
     		}
    		return true;
       	});
		
		//Click Dang ky
		$('#registerMember').click(function() {
			$('#userName').next(".mess-error").empty();
			$('#phoneNumber').next(".mess-error").empty();
			//Clear mess-error message
			$('.mess-error').each(function() {
				$(this).empty();
				$(this).animate({height:0},200);
			});
			// Get value from form
			var userName = $('#userName').val().trim();
			var phoneNumber = $('#phoneNumber').val().trim();
			phoneNumber = CommonUtils.getRealPhoneNumber(phoneNumber);
			$('#phoneNumber').val(phoneNumber);
			var birthDate = $('#birthDate').val().trim();
			var userMail = $('#userMail').val().trim();
			var fromDate = $('#fromDate').val().trim();
			var toDate = $('#toDate').val().trim();
			
			var isValidFromDate = true;
			var isValidToDate = true;
			//Validate to date
			if (!CommonUtils.isNullOrEmpty(toDate) && !DateCommonUtils.isValidDate(toDate)) {
				$('#toDate').focus();
				$('#toDate').parent().next(".mess-error").text(formatDateErr);
				$('#toDate').parent().next(".mess-error").animate({height:10},200);
				
			}
			
			//Validate from date
			if (!CommonUtils.isNullOrEmpty(fromDate) && !DateCommonUtils.isValidDate(fromDate)) {
				$('#fromDate').focus();
				$('#fromDate').parent().next(".mess-error").text(formatDateErr);
				$('#fromDate').parent().next(".mess-error").animate({height:10},200);
			}
			
			//Validate from date
			if (!CommonUtils.isNullOrEmpty(fromDate) && !DateCommonUtils.isValidDate(fromDate)) {
				$('#fromDate').focus();
				$('#fromDate').parent().next(".mess-error").text(formatDateErr);
				$('#fromDate').parent().next(".mess-error").animate({height:10},200);
			}
			
			//Validate mail
			if (!CommonUtils.isNullOrEmpty(userMail) && !CommonUtils.isValidMail(userMail)) {
				$('#userMail').focus();
				$('#userMail').next(".mess-error").text(formatMailErr);
				$('#userMail').next(".mess-error").animate({height:10},200);
			}
			
			//Validate birthDate
			if (!CommonUtils.isNullOrEmpty(birthDate) && !DateCommonUtils.isValidDate(birthDate)) {
				$('#birthDate').focus();
				$('#birthDate').parent().next(".mess-error").text(formatDateErr);
				$('#birthDate').parent().next(".mess-error").animate({height:10},200);
			}
			
			//Validate phone number
			if (!CommonUtils.isNullOrEmpty(phoneNumber) && !CommonUtils.isValidPhoneNumber(phoneNumber)) {
				$('#phoneNumber').focus();
				$('#phoneNumber').next(".mess-error").text(formatPhoneErr);
				$('#phoneNumber').next(".mess-error").animate({height:10},200);
			}
			
			//Validate Name
			if (CommonUtils.isNullOrEmpty(userName)) {
				$('#userName').focus();
				$('#userName').next(".mess-error").text(requiredNameErr);
				$('#userName').next(".mess-error").animate({height:10},200);
			}
			if (userName.length > 50) {
				$('#userName').focus();
				$('#userName').next(".mess-error").text(lengthNameErr);
				$('#userName').next(".mess-error").animate({height:10},200);
			}
		});
		
		//Click Reset
		$('#refill').click(function() {
			//Clear mess-error message
			$('.mess-error').each(function() {
				$(this).animate({height:0},200);
			});
			$('#userName').val('');
			$('#phoneNumber').val('');
			$('#birthDate').val('');
			$('#userMail').val('');
		});
	});
	function clearStyleError() {
		
	}
</script>
