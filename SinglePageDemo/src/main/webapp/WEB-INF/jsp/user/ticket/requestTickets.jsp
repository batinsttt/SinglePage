<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<script
	src="<%=ConfigurationPath.getResourceServerPath("/scripts/app.js")%>"></script>
<section class="content">
	<!-- menu service -->
	<jsp:include page="/WEB-INF/jsp/user/channel/menuService.jsp" />
	<!-- end menu -->
	<!-- /.box -->
	<div class="box">
		<div class="box-header-md">
			<label><spring:message code="RT01.title.label.content"/></label>
		</div>
		<div class="box-body">
			<div class="row">
				<div class="col-md-6">
					<div class="form-group form-md-line-input form-md-floating-label">
						<input type="text" class="form-control" id="coderequest" name="coderequest">
						<label for="form_control_1"><spring:message code="RT01.lable.form.coderequest"/></label>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group form-md-line-input form-md-floating-label">
	                  <select class="form-control edited" id="typerequest">
	                     <option value="" selected><spring:message code="RT01.lable.form.combobox.choose"/></option>
	                     <option value="1"><spring:message code="RT01.lable.form.combobox.typerequired.new"/></option>
	                     <option value="2"><spring:message code="RT01.lable.form.combobox.typerequired.change.bandwidth"/></option>
	                     <option value="3"><spring:message code="RT01.lable.form.combobox.typerequired.blockopen"/></option>
	                     <option value="4"><spring:message code="RT01.lable.form.combobox.typerequired.change.info.contract"/></option>
	                     <option value="5"><spring:message code="RT01.lable.form.combobox.typerequired.change.info.cumstomer"/></option>
	                     <option value="6"><spring:message code="RT01.lable.form.combobox.typerequired.change.info.address"/></option>
	                     <option value="7"><spring:message code="RT01.lable.form.combobox.typerequired.other"/></option>
	                  </select>
	                  <label for="typerequest"><spring:message code="RT01.lable.form.typerequired"/></label>
	               </div>
				</div>
			</div>
			
			<div class="row">
				<div class="col-md-6">
					<div class="form-group form-md-line-input form-md-floating-label">
						<input type="text" class="form-control edited" name="fromtodate" id="fromtodate">
						<label for="fromdate" class="active"><spring:message code="RT01.lable.form.fromdate"/></label>
					</div>
				</div>
				
				<div class="col-md-6">
					<div class="form-group form-md-line-input form-md-floating-label">
	                  <select class="form-control edited" id="status">
	                  	 <option value="" selected><spring:message code="RT01.lable.form.combobox.choose"/></option>
	                     <option value="1"><spring:message code="RT01.lable.form.combobox.status.received"/></option>
	                     <option value="2"><spring:message code="RT01.lable.form.combobox.status.processing"/></option>
	                     <option value="3"><spring:message code="RT01.lable.form.combobox.status.accomplished"/></option>
	                  </select>
	                  <label for="status"><spring:message code="RT01.lable.form.status"/></label>
	               </div>
				</div>
			</div>
			<div class="row">
		   		<p id="successTicket"></p>
		   		<p id="errorTicket"></p>
			</div>
		</div>
		<div class="box-footer">
			<button class="btn btn-green pull-right defaultborder" id="search"><i class="fa fa-search"></i>
				<spring:message code="RT01.lable.button.search"/>
			</button>
			<button class="btn btn-blue pull-right marginrigh20 defaultborder" data-toggle="modal" data-target="#popupCreateRequest" id="create"><i class="fa fa-plus"></i>
				<spring:message code="RT01.lable.button.createrequest"/>
			</button>
		</div>
	</div>
	<div class="box">
      <div class="portlet-body flip-scroll">
         <div class="table-responsive">
            <table id="listrequest" class="table table-striped table-bordered display table-hover dt-responsive">
               <thead>
                  <tr>
                     <th><spring:message code="RT01.lable.table.columns.stt"/></th>
                     <th><spring:message code="RT01.lable.table.columns.createdate"/></th>
                     <th><spring:message code="RT01.lable.table.columns.coderequest"/></th>
                     <th><spring:message code="RT01.lable.table.columns.typerequest"/></th>
                     <th><spring:message code="RT01.lable.table.columns.content"/></th>
                     <th><spring:message code="RT01.lable.table.columns.status"/></th>
                     <th><spring:message code="RT01.lable.table.columns.manipulation"/></th>
                  </tr>
               </thead>
            </table>
         </div>
      </div>
   </div>
</section>
<!-- popup evaluation -->
<div class="modal fade ng-scope" id="popupEvaluation" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog ui-draggable ui-draggable-handle">
		<div class="modal-content ui-resizable">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4 class="modal-title" id="myModalLabel"><spring:message code="CM01.lable.button.evaluation"/></h4>
			</div>
			<div class="modal-body">
				<div class="titleEvaluation">
					<h5 id="information"></h5>
				</div>
				<div class="starEvaluation">
                    <fieldset class="rating1">
					   <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Rocks!">5 stars</label>
					   <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label>
					   <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label>
					   <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Kinda bad">2 stars</label>
					   <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Sucks big time">1 star</label>
					</fieldset>
              	 </div>
			   <div class="inptutEvaluation">
			   		<div class="form-group form-md-line-input form-md-floating-label">
						<textarea rows="4" cols="50" type="text" class="form-control" name="note" id="note"></textarea>
						<label for="note"><spring:message code="RT01.lable.label.note"/></label>
					</div>
			   </div>
			    <div class="">
			   		<p id="successEvaluation"></p>
			   		<p id="errorEvaluation"></p>
			   </div>
			</div>
			<div class="modal-footer">
				<button id="sendEvaluation" class="btn btn-green ladda-button margin-left-10"><i class="fa fa-location-arrow"></i><spring:message code="CM01.lable.button.sendevaluation"/></button>
				<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-close"></i><spring:message code="RT01.lable.button.close"/></button>
			</div>
		</div>
	</div>
</div>

<!-- popup create request -->
<div class="modal fade ng-scope" id="popupCreateRequest" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true"
	style="display: none;">
	<div class="modal-dialog ui-draggable ui-draggable-handle">
		<div class="modal-content ui-resizable">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4 class="modal-title" id="myModalLabel"><spring:message code="RT01.lable.button.createrequest"/></h4>
			</div>
			<div class="modal-body">
				<div class="list-group">
				  <a href="#" class="list-group-item list-group-item-action" data-dismiss="modal"><spring:message code="RT01.lable.form.combobox.typerequired.new"/></a>
				  <a href="#" class="list-group-item list-group-item-action" data-dismiss="modal"><spring:message code="RT01.lable.form.combobox.typerequired.change.bandwidth"/></a>
				  <a href="#/ticket/blockOpenChannel" class="list-group-item list-group-item-action" data-dismiss="modal"><spring:message code="RT01.lable.form.combobox.typerequired.blockopen"/></a>
				  <a href="#" class="list-group-item list-group-item-action" data-dismiss="modal"><spring:message code="RT01.lable.form.combobox.typerequired.change.info.contract"/></a>
				  <a href="#" class="list-group-item list-group-item-action" data-dismiss="modal"><spring:message code="RT01.lable.form.combobox.typerequired.change.info.cumstomer"/></a>
				  <a href="#" class="list-group-item list-group-item-action" data-dismiss="modal"><spring:message code="RT01.lable.form.combobox.typerequired.change.info.address"/></a>
				  <a href="#" class="list-group-item list-group-item-action" data-dismiss="modal"><spring:message code="RT01.lable.form.combobox.typerequired.other"/></a>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-close"></i><spring:message code="RT01.lable.button.close"/></button>
			</div>
		</div>
	</div>
</div>
<script type = "text/javascript" >
	$(document).ready(function() {
		// Processing top bar
		var simplebar = new Nanobar();
		simplebar.go(100);
		
		// Active menu 
		$('.menu-service .qlyc').addClass("active");
		
		var page = 1;
		var STT = 1;
		var draw = 1;
		var ruby = 1;
		var table = $('#listrequest')
				.DataTable(
						{
							"serverSide": true,
							"processing" : true,
							"bLengthChange" : false,
							"searching" : false,
							"bSort" : false,
							"responsive" : true,
							"autoWidth" : true,
							"pagingType" : "full_numbers",
							"scrollY" : true,
							"scrollX" : true,
							"ajax" : {
								"url" : "/ticket/listTickets?draw="+draw+"",
								"type" : "POST",
								"dataType" : "json",
								"contentType" : 'application/json; charset=utf-8',
								"dataSrc" : "listData",
								"data": function () {
							  		return JSON.stringify(Ticket.getPramSearchTicket(page));
							  	}
							},
							"columns" : [
									{
										"data": null,"sortable": false, 
								        render: function (data, type, row, meta) {
								                 return meta.row + meta.settings._iDisplayStart + 1;
								                },
								        className : 'textCenter'
									},
									{
										"data" : "ticketCode"
									},
									{
										"data" : "createDate"
									},
									{
										"data" : "ticketType"
									},
									{
										"data" : "content"
									},
									{
										"data" : "status"
									},
									{
										data : null,
										render : function(data,
												type, row) {
											if (data.status == 3 && data.point == 0) {
												return '<button id="evaluation_'+ruby+ '" class="btn btn-green ladda-button" onclick=" return CommonUtils.showDialogEvaluation(\''+data.ticketCode+'\');" >'
														+ evaluationRequest
														+ '</button>';
											} else if (data.status == 3 && data.pointEvaluation != 0) {
												return data.pointEvaluation
											} else {
												return "";
											}
											ruby++;
										},
										className : 'textCenter',
										orderable : false
									}
							],

						});
						$('#listrequest').on('page.dt', function() {
							page = table.page.info().page + 1;
							draw = draw + 1;
						});
						$('#fromtodate').daterangepicker({ 
					    	//timePicker: true, 
					    	initialText : "",
					    	//timePickerIncrement: 30, 
					    	format: 'MM/DD/YYYY h:mm A'
					    });
						
					});
</script>