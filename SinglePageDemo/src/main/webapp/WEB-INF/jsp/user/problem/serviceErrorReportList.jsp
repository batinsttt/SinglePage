<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>

<script
	src="<%=ConfigurationPath.getResourceServerPath("/scripts/app.js")%>"></script>
<script
	src="<%=ConfigurationPath.getResourceServerPath("/scripts/business/problem/jquery.problem.js")%>"></script>
<section class="content">
	<!-- menu service -->
	<jsp:include page="/WEB-INF/jsp/user/service/menuService.jsp" />
	<!-- end menu -->
	<!-- /.box -->
	<div class="box">
		<div class="box-body">
			<form role="form" id="requestBlockChannelForm" class="clearfix" autocomplete="off">
				<div class="portlet-body form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-6 form_paddRightCol6">
								<div class="form-group form-md-line-input form-md-floating-label">
									<input type="text" class="form-control"
										name="problemCode" id="problemCode"> <label
										for="problemCode"><spring:message code="report.error.service.label.request.code"/>
									</label>
								</div>
							</div>
							<div class="col-md-6 form_paddLeftCol6">
								<div class="form-group form-md-line-input form-md-floating-label">
				                  <select class="form-control " id="statusProlem" name="statusProlem">
				                     <option value="" selected ></option>
				                     <option value="1" >Tất cả</option>
				                     <option value="2">Đã tiếp nhận</option>
				                     <option value="3">Đang xử lý</option>
				                     <option value="4">Hoàn thành</option>
				                  </select>
				                  <label for="serviceSubscriber"><spring:message code="RT01.lable.form.status"/></label>
				               </div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 form_paddRightCol6">
								<div class="form-group form-md-line-input form-md-floating-label">
									<input type="text" class="form-control"
										name="time" id="time"/><label
										for="time"><spring:message code="report.error.service.label.time"/>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button id="createProblem" type="button" class="btn btn-green pull-right ladda-button margin-right-0"  onclick="return Problem.showProblemList();"><i class="fa fa-plus"></i><spring:message code="report.error.service.button.create.request"/></button>
				<button id="searchProblem" type="submit" class="btn btn-blue pull-right ladda-button margin-left-10" onclick="return Problem.showProblemList();"><i class="fa fa-search"></i><spring:message code="RT01.lable.button.search"/></button>
			</form>
		</div>
	</div>
	<div class="box">
      <div class="portlet-body flip-scroll" style="display: block;">
         <div class="table-responsive">
            <table id="problemList" class="table table-striped table-bordered display table-hover dt-responsive width100">
               <thead>
                  <tr>
                     <th>STT</th>
                     <th>Ngày tạo</th>
                     <th>Mã yêu cầu</th>
                     <th>Cách thức</th>
                     <th>Nội dung</th>
                     <th>Trạng thái</th>
                     <th>Thao tác</th>
                  </tr>
               </thead>
            </table>
         </div>
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
		Problem.initServiceErrorReport();
	});
</script>