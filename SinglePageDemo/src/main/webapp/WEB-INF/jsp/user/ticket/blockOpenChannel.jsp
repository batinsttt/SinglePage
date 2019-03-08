<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>

<script
	src="<%=ConfigurationPath.getResourceServerPath("/scripts/app.js")%>"></script>
<script
	src="<%=ConfigurationPath.getResourceServerPath("/scripts/business/ticket/jquery.ticket.js")%>"></script>
<section class="content">
	<!-- menu service -->
	<jsp:include page="/WEB-INF/jsp/user/service/menuService.jsp" />
	<!-- end menu -->
	<!-- /.box -->
	<div class="box">
		<div class="box-header-md">
			<label ><spring:message code="create.request.block.channel.title"/></label>
		</div>
		<div class="box-body">
			<form role="form" id="requestBlockChannelForm" class="clearfix" autocomplete="off">
				<fieldset class="scheduler-border">
					<legend class="scheduler-border"><spring:message code="create.request.block.channel.fieldset.subcriber.info"/></legend>
					<div class="portlet-body form">
						<div class="form-body">
							<div class="row">
								<div class="col-md-6 form_paddRightCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<div class="input-group">
											<div class="input-group-control">
												<input type="text" class="form-control" maxlength="100"
													name="accountSubscriber" id="accountSubscriber"> <label
													for="accountSubscriber"><spring:message code="create.request.block.channel.label.acount"/><span
													class="required">&nbsp;*</span>
												</label>
											</div>
											<span class="input-group-btn btn-right">
												<button type="button" id="pickSubscriber"
													data-toggle="modal" data-target="#myModal"
													onclick="return Ticket.displayPopupPickSubcriber();"
													class="btn btn-orange pull-right ladda-button margin-right-0">
													<i class="fa fa-location-arrow"></i><spring:message code="create.request.block.channel.button.pick.acount"/>
												</button>
											</span>
										</div>
									</div>
								</div>
								<div class="col-md-6 form_paddLeftCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" name="statusSubscriber" id="statusSubscriber" disabled>
										<label for="statusSubscriber"><spring:message code="RT01.lable.form.status"/></label>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 form_paddRightCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
					                  <select class="form-control " id="serviceSubscriber" name="serviceSubscriber" disabled>
					                     <option value="" selected ></option>
					                     <option value="1" >Hà nội</option>
					                     <option value="2">Option 2</option>
					                     <option value="3">Option 3</option>
					                     <option value="4">Option 4</option>
					                  </select>
					                  <label for="serviceSubscriber"><spring:message code="create.request.block.channel.label.service"/></label>
					               </div>
								</div>
								<div class="col-md-6 form_paddLeftCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" name="packageNameSubscriber" id="packageNameSubscriber" disabled>
										<label for="packageNameSubscriber"><spring:message code="create.request.block.channel.label.package"/></label>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 form_paddRightCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" name="speedSubscriber" id="speedSubscriber" disabled>
										<label for="speedSubscriber"><spring:message code="create.request.block.channel.label.speed"/></label>
									</div>
								</div>
								<div class="col-md-6 form_paddLeftCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" name="priceSubscriber" id="priceSubscriber" disabled>
										<label for="priceSubscriber"><spring:message code="create.request.block.channel.label.price"/></label>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 padding-top-20 padding-left-right-0">
									<div class="form-group margin-bottom-0 padding-left-right-15">
										<label class="control-label padding-left-0"><spring:message code="create.request.block.channel.label.setup.address"/></label>
									</div>
									<div class="form-group ">	
										<div class="col-md-4  form_paddRightCol4">
											<div class=" form-group form-md-line-input form-md-floating-label">
												<select class="form-control " id="installProvince" name="installProvince" disabled>
													<option value="" ></option>
													<option value="1" >Đà Nẵng</option>
													<option value="2">Option 2</option>
													<option value="3">Option 3</option>
													<option value="4">Option 4</option>
												</select>
												<label for=installProvince><spring:message code="create.request.block.channel.label.province"/></label>
											</div>
										</div>
										<div class="col-md-4  form_paddLeftRightCol4">
											<div class="form-group form-md-line-input form-md-floating-label">
												<select class="form-control " id="installDistrict" name="installDistrict" disabled>
													<option value="" selected></option>
													<option value="1" >Liên Chiểu</option>
													<option value="2">Option 2</option>
													<option value="3">Option 3</option>
													<option value="4">Option 4</option>
												</select>
												<label for="installDistrict"><spring:message code="create.request.block.channel.label.district"/></label>
											</div>
										</div>
										<div class="col-md-4 form_paddLeftCol4">
											<div class="form-group form-md-line-input form-md-floating-label">
												<select class="form-control " id="installWard" name="installWard" disabled>
													<option value="" selected></option>
													<option value="1" >Hoà Khánh Bắc</option>
													<option value="2">Option 2</option>
													<option value="3">Option 3</option>
													<option value="4">Option 4</option>
												</select>
												<label for="installWard"><spring:message code="create.request.block.channel.label.ward"/></label>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group form-md-line-input form-md-floating-label padding-top-0">
										<input type="text" maxlength="100" class="form-control" id="installStreet" name="installStreet" disabled>
										<label for="installStreet"></label>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 padding-top-20 padding-left-right-0">
									<div class="form-group margin-bottom-0 padding-left-right-15">
										<label class="control-label padding-left-0"><spring:message code="create.request.block.channel.label.contact.address"/></label>
									</div>
									<div class="form-group form-md-checkboxes">
										<div class="col-md-9 padding-left-right-15">
											<div class="md-checkbox-inline">
												<div class="md-checkbox">
												<input type="checkbox" id="isInstallationAddr" class="md-check">
												<label for="isInstallationAddr">
													<span></span> 
													<span class="check"></span>
													<span class="boxForm"></span><spring:message code="create.request.block.channel.label.is.setup.address"/>
												</label>
												</div>
											</div>
										</div>
									</div>
									<div class="form-group ">	
										<div class="col-md-4 form_paddRightCol4">
											<div class=" form-group form-md-line-input form-md-floating-label">
												<select class="form-control " id="contactProvince" name="contactProvince">
													<option value="" ></option>
													<option value="1" >Đà Nẵng</option>
													<option value="2">Option 2</option>
													<option value="3">Option 3</option>
													<option value="4">Option 4</option>
												</select>
												<label for="contactProvince"><spring:message code="create.request.block.channel.label.province"/></label>
											</div>
										</div>
										<div class="col-md-4 form_paddLeftRightCol4 ">
											<div class="form-group form-md-line-input form-md-floating-label">
												<select class="form-control " id="contactDistrict" name="contactDistrict">
													<option value="" selected></option>
													<option value="1" >Đà Nẵng</option>
													<option value="2">Option 2</option>
													<option value="3">Option 3</option>
													<option value="4">Option 4</option>
												</select>
												<label for="contactDistrict"><spring:message code="create.request.block.channel.label.district"/></label>
											</div>
										</div>
										<div class="col-md-4 form_paddLeftCol4">
											<div class="form-group form-md-line-input form-md-floating-label">
												<select class="form-control " id="contactWard" name="contactWard">
													<option value="" selected></option>
													<option value="1" >Đà Nẵng</option>
													<option value="2">Option 2</option>
													<option value="3">Option 3</option>
													<option value="4">Option 4</option>
												</select>
												<label for="contactWard"><spring:message code="create.request.block.channel.label.ward"/></label>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group form-md-line-input form-md-floating-label padding-top-0">
										<input type="text" maxlength="100" class="form-control" id="contactStreet" name="contactStreet">
										<label for="contactStreet"></label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset class="scheduler-border">
					<legend class="scheduler-border"><spring:message code="create.request.block.channel.fieldset.request.info"/></legend>
					<div class="portlet-body form">
						<div class="form-body">
							<div class="row">
								<div class="col-md-12 padding-top-20">
									<div class="form-group margin-bottom-0">
										<label class="control-label padding-left-0 padding-right-40 float-left"><spring:message code="create.request.block.channel.label.block.open.channel"/></label>
										<div class="float-left">
											<input class="tgl tgl-ios" id="contactName" name="contactName" type="checkbox" /> <label
												class="tgl-btn" for="contactName"></label>
										</div>
										<div class="clear-float"></div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 form_paddRightCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" maxlength="100" class="form-control" id="contactName" name="contactName" >
										<label for="contactName"><spring:message code="create.request.block.channel.label.contact.name"/><span class="required">&nbsp;*</span></label>
									</div>
								</div>
								<div class="col-md-6 form_paddLeftCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" maxlength="20" class="form-control" id="contactPhone" name="contactPhone" >
										<label for="contactPhone"><spring:message code="create.request.block.channel.label.phone"/></label>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" maxlength="500" class="form-control" name="contactNote" id="contactNote"  >
										<label for="contactNote"><spring:message code="RT01.lable.label.note"/></label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</fieldset>
				<button id="submitOrder" type="submit" class="btn btn-green pull-right ladda-button margin-right-0" ><i class="fa fa-location-arrow"></i><spring:message code="create.request.block.channel.button.send.request"/></button>
				<button id="backBtn" type="button" class="btn btn-blue pull-right ladda-button margin-left-10" ><i class="fa fa-mail-reply-all"></i><spring:message code="create.request.block.channel.button.back"/></button>
			</form>
		</div>
	</div>
</section>
<!-- Modal modal-sm modal-md modal-lg -->
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
	data-keyboard="false" data-backdrop="static"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="display: none;">
	<div class="modal-dialog" style="width: 800px;">
		<div class="modal-content" style="overflow: hidden;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h4 class="modal-title" id="myModalLabel">Chọn thuê bao</h4>
			</div>
			<div class="modal-body" style="max-height: 409px; overflow-y: auto;">
				<div class="row">
					<div class="col-md-12">
						<div class="form-group form-md-line-input form-md-floating-label">
							<div class="input-group">
								<div class="input-group-control">
									<input type="text" class="form-control" name="userName"
										id="keyword"> <label for="keyword">Nhập tài khoản hoặc địa chỉ</label>
								</div>
								<span class="input-group-btn btn-right">
									<button type="button" id="searchSubcriber"
										onclick="return Ticket.searchSubcriber();"
										class="btn btn-blue pull-right ladda-button margin-right-0" data-style="expand-right">
										<i class="fa fa-search"></i>Tìm kiếm
									</button>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="row ">
					<div class="portlet-body flip-scroll col-md-12" style="display: block;">
						<div class="table-responsive">
							<table id="subscriberList"
								class="table table-striped table-bordered display table-hover dt-responsive">
								<thead>
									<tr>
										<th></th>
										<th>STT</th>
										<th>Thuê bao</th>
										<th>Địa chỉ</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="searchChannel" type="submit"
					class="btn btn-green pull-right ladda-button margin-right-0">
					<i class="fa fa-location-arrow"></i>Đồng ý
				</button>
				<button id="backBtn" type="button" data-dismiss="modal"
					class="btn btn-default pull-right ladda-button margin-left-10">
					<i class="fa fa-close"></i>Đóng
				</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<!-- 	End modal -->
<script type = "text/javascript" >
	$(document).ready(function() {
		/* Initial proccessing */
		Ticket.initBlockOpenChannel();
	});
</script>