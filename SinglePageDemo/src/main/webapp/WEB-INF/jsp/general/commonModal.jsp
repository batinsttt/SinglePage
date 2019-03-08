<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
	
	<div class="alert alert-danger display-hide" id="errorAPI" style="display: none;">
    	<button class="close" data-close="alert"><i class="fa fa-close"></i></button>
    	<p id="messageErrorAPI"></p>
    </div>
    
    <div class="alert alert-success display-hide" id="successAPI" style="display: none;">
    	<button class="close" data-close="alert"><i class="fa fa-close"></i></button>
    	<p id="messageSuccessAPI"></p>
    </div>
	
	
	
	<div class="modal fade" id="confirm-modal" data-keyboard="false" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;" >
	    <div class="modal-dialog modal-sm">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	          <h4 class="modal-title" id="myModaltitle"></h4>
	        </div>
	        <div class="modal-body">
	          <p id="myModalmsg"></p>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
	          <a class="btn btn-primary" id="btn-confirm-delete">Delete</a>
	        </div>
	      </div>
	    </div>
	  </div>
	  
	  <div class="modal fade" id="notification-modal" data-keyboard="false" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;" >
	    <div class="modal-dialog modal-sm">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	          <h4 class="modal-title">
	              <spring:message code="notification.title" text="default text" />
	          </h4>
	        </div>
	        <div class="modal-body">
	          <p id="notificationMsg"></p>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">
	              <spring:message code="notification.close.button.title" text="default text" />
	          </button>
	        </div>
	      </div>
	    </div>
	  </div>
	  
<!-- Modal modal-sm modal-md modal-lg -->
	 <!-- Modal -->
	  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	    <div class="modal-dialog">
	      <div class="modal-content" style="overflow: hidden;">
	        <div class="modal-header">
	          <h4 class="modal-title" id="myModalLabel">
	              <spring:message code="login.title" text="default text" />
	          </h4>
	        </div>
	        <div class="modal-body login-modal-body">
	        	<div class="formLogin">
				<form role="form" id="validationFormLogin">
			   		<div class="portlet-body form">
						<div class="form-body">
							<div class="col-md-12">
								<div class="form-group form-md-line-input form-md-floating-label input-group right-addon">
									<input autocomplete="off" type="text" class="form-control" id="username" name="username">
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
									<input autocomplete="off" type="password" class="form-control" id="password" name="password">
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
									<div class="captcha-position"><a onclick="createCaptcha()"><i class="fa fa-refresh"></i></a></div>
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
					<span id="loginError" class="help-block help-block-error display-none"></span>
					<button class="btn btn-green btnLogin" type="button" id="buttonSubmit"><i class="fa fa-angle-right btnLogin-padding"></i></button>
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
	        </div>
	      </div>
	      <!-- /.modal-content -->
	    </div>
	    <!-- /.modal-dialog -->
	  </div>
	  <!-- /.modal -->
	<!-- 	End modal -->

<script type="text/javascript">

/* Check session timeout */
    sessionTimeOut = getSessionTimeOut();
    countTimeout = new Timer(function() {
		sessionTimeOut = sessionTimeOut - 1;
	    if (sessionTimeOut == 0 && !$('#loginModal').is(":visible")) {
	    	countTimeout.stop();
	        $("#maXacNhan").val("");
	        $("#capchaBlock").css({ display: "none" });
	        $('#loginModal').modal('show');
	     }
	}, 1000);

	$('#buttonSubmit').click(function() {
		Account.documentReady();
		$( "#validationFormLogin" ).submit();
	});

	$(document).ready(function() {
	    $(document).ajaxSend(function(evt, req, set){
	    	countTimeout.stop();
	    	sessionTimeOut = getSessionTimeOut();
	    	countTimeout.start();
	    });
	});
/* End */
</script>
