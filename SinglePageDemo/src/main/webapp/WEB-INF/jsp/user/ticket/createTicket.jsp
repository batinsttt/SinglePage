<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<script
	src="<%=ConfigurationPath.getResourceServerPath("/scripts/app.js")%>"></script>
<section class="content">
	<!-- menu service -->
	<jsp:include page="/WEB-INF/jsp/user/service/menuService.jsp" />
	<!-- end menu -->
	<!-- /.box -->
	<div class="box">
		<div class="box-header-md">
			<label >Tạo yêu cầu triển khai mới</label>
		</div>
		<div class="box-body">
			<fieldset class="scheduler-border">
				<legend class="scheduler-border">Thông tin dịch vụ</legend>
				<div class="form-group form-md-line-input cusNew-form-md">
					<label class="col-md-2 control-label" for="form_control_1">Dịch	vụ <span class="required">*</span>
					</label>
					<div class="col-md-10">
						<div class="md-radio-inline">
							<div class="md-radio col-md-3">
								<input type="radio" id="radio53" name="radio1"
									class="md-radiobtn"> <label for="radio53"> <span></span>
									<span class="check"></span> <span class="boxForm"></span>
									Option 1
								</label>
							</div>
							<div class="md-radio col-md-3">
								<input type="radio" id="radio54" name="radio1"
									class="md-radiobtn"> <label for="radio54"> <span></span>
									<span class="check"></span> <span class="boxForm"></span>
									Option 2
								</label>
							</div>
							<div class="md-radio col-md-3">
								<input type="radio" id="radio55" name="radio1"
									class="md-radiobtn"> <label for="radio55"> <span></span>
									<span class="check"></span> <span class="boxForm"></span>
									Option 3
								</label>
							</div>
						</div>
					</div>
				</div>
			</fieldset>
		</div>
		<div class="box-body">
			<fieldset class="scheduler-border">
				<legend class="scheduler-border">Thông tin mạng</legend>
				<div class="form-group form-md-line-input cusNew-form-md">
					<label class="col-md-2 control-label" for="form_control_1">Dịch
						vụ <span class="required">*</span>
					</label>
					<div class="col-md-10">
						<div class="md-radio-inline">
							<div class="md-radio col-md-3">
								<input type="radio" id="radio53" name="radio2"
									class="md-radiobtn"> <label for="radio20"> <span></span>
									<span class="check"></span> <span class="boxForm"></span> Kết
									nội mạng mới
								</label>
							</div>
							<div class="md-radio col-md-3">
								<input type="radio" id="radio54" name="radio2"
									class="md-radiobtn"> <label for="radio21"> <span></span>
									<span class="check"></span> <span class="boxForm"></span> Kết
									nối mạng cũ
								</label>
							</div>
						</div>
					</div>
				</div>
			</fieldset>
		</div>
		<div class="box-body">
			<fieldset class="scheduler-border">
				<legend class="scheduler-border">Thông tin khảo sát</legend>
				<div class="portlet-body form">
					<form role="form">
						<div class="form-body">
							<div class="row">
								<div class="col-md-4">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" id="form_control_1">
										<label for="form_control_1">Tên người liên hệ <span class="required">*</span></label>
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" id="form_control_1">
										<label for="form_control_1">Số điện thoại <span class="required">*</span></label>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div class="col-md-4">
									<div class="form-group form-md-line-input form-md-floating-label">
					                  <select class="form-control edited" id="form_control_1">
					                     <option value=""></option>
					                     <option value="1" selected>Hà nội</option>
					                     <option value="2">Option 2</option>
					                     <option value="3">Option 3</option>
					                     <option value="4">Option 4</option>
					                  </select>
					                  <label for="form_control_1">Tỉnh/Thành phố <span class="required">*</span></label>
					               </div>
								</div>
								<div class="col-md-4">
									<div class="form-group form-md-line-input form-md-floating-label">
					                  <select class="form-control edited" id="form_control_1">
					                     <option value=""></option>
					                     <option value="1" selected>Option 1</option>
					                     <option value="2">Option 2</option>
					                     <option value="3">Option 3</option>
					                     <option value="4">Option 4</option>
					                  </select>
					                  <label for="form_control_1">Quận/Huyện <span class="required">*</span></label>
					               </div>
								</div>
								<div class="col-md-4">
									<div class="form-group form-md-line-input form-md-floating-label">
					                  <select class="form-control edited" id="form_control_1">
					                     <option value=""></option>
					                     <option value="1" selected>Option 1</option>
					                     <option value="2">Option 2</option>
					                     <option value="3">Option 3</option>
					                     <option value="4">Option 4</option>
					                  </select>
					                  <label for="form_control_1">Xã/Phường <span class="required">*</span></label>
					               </div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" id="form_control_1">
										<label for="form_control_1">Địa chỉ lắp đặt chi tiết <span class="required">*</span></label>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div class="col-md-4">
									<div class="form-group form-md-line-input form-md-floating-label">
					                  <select class="form-control edited" id="form_control_1">
					                     <option value=""></option>
					                     <option value="1" selected>Hà nội</option>
					                     <option value="2">Option 2</option>
					                     <option value="3">Option 3</option>
					                     <option value="4">Option 4</option>
					                  </select>
					                  <label for="form_control_1">Gói cước <span class="required">*</span></label>
					               </div>
								</div>
								<div class="col-md-4">
									<div class="form-group form-md-line-input form-md-floating-label">
					                  <select class="form-control edited" id="form_control_1">
					                     <option value=""></option>
					                     <option value="1" selected>Liên tỉnh nội vùng</option>
					                     <option value="2">Option 2</option>
					                     <option value="3">Option 3</option>
					                     <option value="4">Option 4</option>
					                  </select>
					                  <label for="form_control_1">Tốc độ </label>
					               </div>
								</div>
							</div>
							
						</div>
					</form>
				</div>

			</fieldset>
		</div>
		
		<div class="box-body">
			<fieldset class="scheduler-border">
				<legend class="scheduler-border">Thông tin khảo sát</legend>
				<div class="portlet-body form">
					<form role="form">
						<div class="form-body">
							<div class="row">
								<div class="col-md-4">
									<div class="form-group form-md-checkboxes paddingtop15">
										<div class="md-checkbox-inline">
											<div class="md-checkbox">
												<input type="checkbox" id="checkbox14" class="md-check">
												<label for="checkbox14"> <span></span> <span
													class="check"></span> <span class="boxForm"></span> Địa chỉ lắp đặt
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div class="col-md-4">
									<div class="form-group form-md-line-input form-md-floating-label">
					                  <select class="form-control edited" id="form_control_1">
					                     <option value=""></option>
					                     <option value="1" selected>Hà nội</option>
					                     <option value="2">Option 2</option>
					                     <option value="3">Option 3</option>
					                     <option value="4">Option 4</option>
					                  </select>
					                  <label for="form_control_1">Tỉnh/Thành phố <span class="required">*</span></label>
					               </div>
								</div>
								<div class="col-md-4">
									<div class="form-group form-md-line-input form-md-floating-label">
					                  <select class="form-control edited" id="form_control_1">
					                     <option value=""></option>
					                     <option value="1" selected>Option 1</option>
					                     <option value="2">Option 2</option>
					                     <option value="3">Option 3</option>
					                     <option value="4">Option 4</option>
					                  </select>
					                  <label for="form_control_1">Quận/Huyện <span class="required">*</span></label>
					               </div>
								</div>
								<div class="col-md-4">
									<div class="form-group form-md-line-input form-md-floating-label">
					                  <select class="form-control edited" id="form_control_1">
					                     <option value=""></option>
					                     <option value="1" selected>Option 1</option>
					                     <option value="2">Option 2</option>
					                     <option value="3">Option 3</option>
					                     <option value="4">Option 4</option>
					                  </select>
					                  <label for="form_control_1">Xã/Phường <span class="required">*</span></label>
					               </div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" id="form_control_1">
										<label for="form_control_1">Địa chỉ lắp đặt chi tiết <span class="required">*</span></label>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>

			</fieldset>
		</div>
		
	</div>
</section>
<script type="text/javascript">
	$(document).ready(function() {
		$('.menu-service .qlyc').addClass("active");

		/* Generate breadCumb*/
		var breadCumb_1 = [ 'DV đang sử dụng', false ];
		var breadCumb_2 = [ 'Kênh truyền', '#/service/channel' ];
		var breadCumb_3 = [ 'Quản lý yêu cầu', '#/ticket/create' ];
		CommonUtils.genBreadCumb(breadCumb_1, breadCumb_2, breadCumb_3);
		/*  end */

	});
</script>