<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<section class="content">
   <!-- /.box -->
   <div class="box">
      <div class="box-body box-changePass-padding">
         <div class="portlet-body form">
            <form role="form" id="validationFormChangePass">
               <div class="form-body">
                  <div class="row">
                     <div class="form_paddRightCol6">
                        <div class="form-group form-md-line-input form-md-floating-label">
                            <input type="password" class="form-control" name="oldPass" id="oldPass">
                            <label for="form_control_1">
						        <spring:message code="changePass.form.oldPass" text="default text" />
							    <span class="required">
									<spring:message code="label.star" text="default text" />
								</span>
						    </label>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="form_paddRightCol6">
                        <div class="form-group form-md-line-input form-md-floating-label">
                            <input type="password" class="form-control" name="newPass" id="newPass">
                            <label for="form_control_1">
						        <spring:message code="changePass.form.newPass" text="default text" />
							    <span class="required">
									<spring:message code="label.star" text="default text" />
								</span>
						    </label>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="form_paddRightCol6">
                        <div class="form-group form-md-line-input form-md-floating-label">
                            <input type="password" class="form-control" name="repeatPass" id="repeatPass">
                            <label for="form_control_1">
						        <spring:message code="changePass.form.repeatPass" text="default text" />
							    <span class="required">
									<spring:message code="label.star" text="default text" />
								</span>
						    </label>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                      <div id="capchaBlockChangePass" class="form_paddRightCol6">
				          <div id="capchaBlockChangePassChild" class="form-group form-md-line-input form-md-floating-label input-group right-addon">
						      <input type="text" class="form-control" id="captchaChangePass" name="captchaChangePass">
							  <div class="input-group-addon">
							      <img src="" id="captchaImgChangePass">
							  </div>
							  <div class="captcha-position">
							      <a onclick="return CommonUtils.createCaptcha('captchaImgChangePass', 'changePass')"><i class="fa fa-refresh"></i></a>
							  </div>
							  <label for="form_control_1">
							      <spring:message code="login.form.captcha" text="default text" />
								  <span class="required">
								      <spring:message code="label.star" text="default text" />
								  </span>
							  </label>
					      </div>
				      </div>
                  </div>
                  <div class="row">
                      <div class="form_paddRightCol6 col-md-11 text-center">
                          <button id="changePassButton" class="btn btn-blue mt-ladda-btn ladda-button" type="submit" data-style="expand-right">
                              <spring:message code="changePass.button.title" text="default text" />
                          </button>
                      </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <!-- /.box -->
</section>

<script type="text/javascript">
        $(document).ready(function() {
        	Account.documentReadyChangePass();
    	});
</script>
