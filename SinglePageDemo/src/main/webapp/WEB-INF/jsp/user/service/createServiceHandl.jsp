<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>

<script src="<%=ConfigurationPath.getResourceServerPath("/scripts/app.js")%>"></script>
<script src="<%=ConfigurationPath.getResourceServerPath("/scripts/business/service/jquery.service.js")%>"></script>
<script src="<%=ConfigurationPath.getResourceServerPath("/scripts/business/channel/jquery.channel.js")%>"></script>
<section class="content">
	<!-- menu service -->
	<jsp:include page="/WEB-INF/jsp/user/service/menuService.jsp" />
	<!-- end menu -->
	<!-- /.box -->
	<div class="box">
		<div class="box-header-md">
			<label ><spring:message code="CSH01.lable.title.main"/></label>
		</div>
		<div class="box-body">
			<form role="form" id="createServiceError" class="clearfix" autocomplete="off">
					<div class="portlet-body form">
						<div class="form-body">
							<div class="row">
								<div class="col-md-6 form_paddRightCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" maxlength="100" name="personContact" id="personContact" value="${fullName}">
										<label for="personContact"><spring:message code="CSH01.lable.form.personcontact"/>
											<span class="required">&nbsp;*</span>
										</label>
									</div>
								</div>
								
								<div class="col-md-6 form_paddLeftCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<div class="input-group">
											<div class="input-group-control">
												<input type="text" class="form-control" maxlength="100" name="requestSubscription" id="requestSubscription">
												<label for="requestSubscription"><spring:message code="CSH01.lable.form.text.requestsubscription"/>
													<span class="required">&nbsp;*</span>
												</label>
											</div>
											<span class="input-group-btn btn-right">
												<button type="button" id="pickSubscriber" data-toggle="modal" data-target="#myModal" onclick="return Channel.displayPopupPickSubcriber();" class="btn btn-orange pull-right ladda-button margin-right-0">
													<i class="fa fa-location-arrow"></i><spring:message code="create.request.block.channel.button.pick.acount"/>
												</button>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 form_paddRightCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" maxlength="100" name="phone" id="phone" value="${phone}">
										<label for="phone"><spring:message code="CSH01.lable.form.phone"/>
											<span class="required">&nbsp;*</span>
										</label>
									</div>
									
								</div>
								<div class="col-md-6 form_paddLeftCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" maxlength="100" name="address" id="address">
										<label for="address"><spring:message code="CSH01.lable.form.text.address"/>
											<span class="required">&nbsp;*</span>
										</label>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div class="col-md-6 form_paddRightCol6">
									<div class=" form-group form-md-line-input form-md-floating-label">
									</div>
								</div>
								<div class="col-md-6 form_paddLeftCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<label><spring:message code="CSH01.lable.lable.information"/></label>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div class="col-md-6 form_paddRightCol6">
									<div class=" form-group form-md-line-input form-md-floating-label">
										<select class="form-control " id="service" name="service">
											<option value="" ><spring:message code="CSH01.lable.form.combobox.service.choose"/></option>
											<option value="1" ><spring:message code="CSH01.lable.form.combobox.service.leased"/></option>
											<option value="2"><spring:message code="CSH01.lable.form.combobox.service.whitechannel"/></option>
											<option value="3"><spring:message code="CSH01.lable.form.combobox.service.office"/></option>
											<option value="4"><spring:message code="CSH01.lable.form.combobox.service.metro"/></option>
											<option value="5"><spring:message code="CSH01.lable.form.combobox.service.trunks"/></option>
										</select>
										<label for="service"><spring:message code="CSH01.lable.form.combobox.service"/></label>
									</div>
								</div>
								<div class="col-md-6 form_paddLeftCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" maxlength="100" name="dateCreate" id="dateCreate"/>
										<label for="dateCreate"><spring:message code="CSH01.lable.form.text.time"/>
											<span class="required">&nbsp;*</span>
										</label>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div class="col-md-6 form_paddRightCol6">
									<div class=" form-group form-md-line-input form-md-floating-label">
										<select class="form-control " id="phenomena" name="phenomena">
											<option value="" ><spring:message code="CSH01.lable.form.combobox.service.choose"/></option>
										</select>
										<label for="phenomena"><spring:message code="CSH01.lable.form.combobox.phenomena"/></label>
									</div>
								</div>
								<div class="col-md-6 form_paddLeftCol6">
									<div class="col-md-6">
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" maxlength="100" name="hourStart" id="hourStart"/>
											<label for="hour"><spring:message code="CSH01.lable.form.text.hour"/>
												<span class="required">&nbsp;*</span>
											</label>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" maxlength="100" name="hourEnd" id="hourEnd"/>
										</div>
									</div>
									
								</div>
							</div>
							
							<div class="row">
								<div class="col-md-6 form_paddRightCol6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<textarea class="form-control" rows="5" name="deflectiondetails" id="deflectiondetails"></textarea>
										<label for="deflectiondetails"><spring:message code="CSH01.lable.form.textarea.deflectiondetails"/>
										</label>
									</div>
								</div>
								<div class="col-md-6 form_paddLeftCol6">
									<div class="row">
										<div class="col-md-6 form_paddRightCol6">
											<div class="form-group form-md-line-input form-md-floating-label">
												<label><spring:message code="CSH01.lable.form.table.attachments.title"/></label>
											</div>
										</div>
										<div class="col-md-6 form_paddLeftCol6 form-group form-md-line-input form-md-floating-label">
											<label class="btn btn-green pull-right ladda-button margin-right-0">
											   <spring:message code="CSH01.lable.form.button.addtemp"/>
											   <input type="file" style="display: none;" name="addAttachments" id="addAttachments" onchange="Service.makeFile();" multiple>
											</label>
										</div>
									</div>
									<div class="row">
										<div class="col-md-12 form-group form-md-line-input form-md-floating-label">
										      <div class="portlet-body flip-scroll">
										         <div class="table-responsive">
										            <table id="attachments" class="table table-striped table-bordered display table-hover dt-responsive">
										               <thead>
										                  <tr>
										                     <th><spring:message code="CSH01.lable.form.table.attachments.column.index"/></th>
										                     <th><spring:message code="CSH01.lable.form.table.attachments.column.attachments"/></th>
										                     <th><spring:message code="CSH01.lable.form.table.attachments.column.manipulation"/></th>
										                  </tr>
										               </thead>
										            </table>
										         </div>
										      </div>
  										 </div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
					    <div class="col-md-3 col-md-offset-4">
						    <button id="sendrequest" type="submit" class="btn btn-green pull-right ladda-button margin-right-0" ><i class="fa fa-location-arrow"></i><spring:message code="CSH01.lable.form.button.sendrequest"/></button>
					    	<button id="backrequest" type="button" class="btn btn-blue pull-right ladda-button margin-left-10" ><i class="fa fa-mail-reply-all"></i><spring:message code="CSH01.lable.form.button.comeback"/></button>
					    </div>
					</div>
			</form>
		</div>
	</div>
</section>
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
									<button type="button" id="searchSubcriber" onclick="return Ticket.searchSubcriber();" class="btn btn-blue pull-right ladda-button margin-right-0" data-style="expand-right">
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
<script type = "text/javascript" >
	$(document).ready(function() {
		var difirentOne = '<spring:message code="CSH01.lable.form.combobox.phenomena.difirent.one"/>';
		var difirentTwo = '<spring:message code="CSH01.lable.form.combobox.phenomena.difirent.two"/>';
		var difirentTreer = '<spring:message code="CSH01.lable.form.combobox.phenomena.difirent.treer"/>';
		var difirentFout = '<spring:message code="CSH01.lable.form.combobox.phenomena.difirent.fout"/>';
		
		var trunksOne = '<spring:message code="CSH01.lable.form.combobox.phenomena.trunks.one"/>';
		var trunksTwo = '<spring:message code="CSH01.lable.form.combobox.phenomena.trunks.two"/>';
		var trunksTreer = '<spring:message code="CSH01.lable.form.combobox.phenomena.trunks.treer"/>';
		var trunksFout = '<spring:message code="CSH01.lable.form.combobox.phenomena.trunks.fout"/>';
		var flagChangeService = true;
		$('#service').change(function(){
			if($(this).val() == 5){
				flagChangerService = false;
				$('#phenomena').empty();
				$('#phenomena').append('<option value="1" >' +trunksOne+ '</option>');
				$('#phenomena').append('<option value="2" >' +trunksTwo+ '</option>');
				$('#phenomena').append('<option value="3" >' +trunksTreer+ '</option>');
				$('#phenomena').append('<option value="4" >' +trunksFout+ '</option>');
			} else {
				if(!flagChangeService){
					flagChangerService = true;
					$('#phenomena').empty();
					$('#phenomena').append('<option value="1" >' +difirentOne+ '</option>');
					$('#phenomena').append('<option value="2" >' +difirentTwo+ '</option>');
					$('#phenomena').append('<option value="3" >' +difirentTreer+ '</option>');
					$('#phenomena').append('<option value="4" >' +difirentFout+ '</option>');
				} else{
					flagChangerService = false;
					$('#phenomena').empty();
					$('#phenomena').append('<option value="1" >' +difirentOne+ '</option>');
					$('#phenomena').append('<option value="2" >' +difirentTwo+ '</option>');
					$('#phenomena').append('<option value="3" >' +difirentTreer+ '</option>');
					$('#phenomena').append('<option value="4" >' +difirentFout+ '</option>');
				}
			}
		});
		 
		var table = $('#attachments').DataTable({
			"bLengthChange" : false,
			"searching" : false,
			"bSort" : false,
			"responsive" : true,
			"autoWidth" : true,
			"scrollY" : true,
			"scrollX" : true,
			"paging": false,
            data: [],
            columns: [
                { data: 'stt' },
                { data: 'filename' },
                {
                    data: null,
                    render: function (data, type, row) {
                    	console.log(data.stt);
                        return '<a class="iconSize18 margin-right-10" href="javascript:void(0)" onclick="Service.deleteFileUpload('+""+data.stt+');"><i class="fa fa-edit"></i></a>'
                    }
                }
            ]
        });
		
		$('#dateCreate').daterangepicker({
		    "singleDatePicker": true,
		});
		
		$('#hourStart').datetimepicker({
			 format: 'hh:mm'
        });
		$('#hourEnd').datetimepicker({
			 format: 'hh:mm'
        });
	});
</script>