<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script
	src="<%=ConfigurationPath.getResourceServerPath("/scripts/app.js")%>"></script>
<section class="content">
	<!-- menu service -->
	<jsp:include page="/WEB-INF/jsp/user/channel/menuService.jsp" />
	<!-- end menu -->
	<!-- /.box -->
	<div class="box" onload="createCaptcha()">
		<div class="box-header-md" >
			<label><spring:message code="create.request.change.other.page.name"/></label>
		</div>
		<div class="box-body">
			<form role="form" id="validationFormRequestChangeOther" class="clearfix" onsubmit="validateCaptcha()">
				<fieldset class="scheduler-border">
					<legend class="scheduler-border"><spring:message code="create.request.change.other.header"/></legend>
					<div class="portlet-body form">
						<div class="form-body">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group form-md-line-input form-md-floating-label">
										<div class="input-group right-addon">
											<input type="text" class="form-control" name="thueBao" id="thueBao" readonly>
											<label for="userName">
												<spring:message code="create.request.change.other.acc"/>
												<span class="required">&nbsp;*</span>
											</label>
	                                        <span class="input-group-addon">
	                                        	<button class="btn btn-orange mt-ladda-btn ladda-button" 
	                                            type="button" onclick="showModal()"><i class="fa fa-location-arrow"></i>
	                                            <spring:message code="create.request.change.other.btn.acc"/></button>
	                                        </span>
	                                     </div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" name="tenNguoiLienHe" id="tenNguoiLienHe">
										<label for="userName">
											<spring:message code="create.request.change.other.name"/>
											<span class="required">&nbsp;*</span>
										</label>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" name="sdt" id="sdt">
										<label for="phone">
											<spring:message code="create.request.change.other.phone"/>
											<span class="required">&nbsp;*</span>
										</label>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group form-md-line-input form-md-floating-label">
										<textarea class="form-control" rows="5" id="noiDung" name="noiDung"></textarea>
										<label for="form_control_1">
											<spring:message code="create.request.change.other.content"/>
											<span class="required">&nbsp;*</span>
										</label>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12" id="success-message"></div>
						</div>
					</div>
				</fieldset>
				<div class="row" style="text-align: center;">
					<div class="col-md-6">
						<div class="form-group form-md-line-input form-md-floating-label">
							<div class="input-group right-addon">
								<input type="text" class="form-control" id="maXacNhan" name="maXacNhan">
								<div class="input-group-addon" id="captcha"></div>
								<div style="position: absolute;"><a onclick="createCaptcha()"><i class="fa fa-refresh"></i></a></div>
								<label for="form_control_1">
									<spring:message code="create.request.change.other.confirm.code"/>
									<span class="required">&nbsp;*</span>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="row" style="text-align: center;">
					<button type="submit" id="submitBtn" onclick="validateCaptcha()" class="btn btn-green mt-ladda-btn ladda-button" 
						data-style="expand-right">
						<span class="ladda-label"><spring:message code="create.request.change.other.btn.sent.request"/></span>
					</button>
					<button type="reset" id="resetBtn" class="btn default">
						<span class="ladda-label"><spring:message code="create.request.change.other.btn.back"/></span>
					</button>
				</div>
			</form>
		</div>
	</div>
</section>
<!-- Modal modal-sm modal-md modal-lg -->
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content" style="overflow: hidden;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title" id="myModalLabel"><spring:message code="create.request.change.other.modal.header"/></h4>
      </div>
      <div class="modal-body" style="max-height: 409px; overflow-y: auto;">
      	<div class="form-group row">
			<div class="col-md-9">
				<div class="form-group form-md-line-input form-md-floating-label">
					<input type="text" class="form-control" name="userName" id="userName">
					<label for="userName"><spring:message code="create.request.change.other.modal.user.address"/></label>
				</div>
			</div>
			<div class="col-md-3">
				<div class="form-group form-md-line-input">
					<button class="btn btn-green mt-ladda-btn ladda-button" 
               	 	type="button" onclick="showModal()"><spring:message code="create.request.change.other.modal.btn.find"/></button>
               	</div>
			</div>
		</div>
		<div class="form-group row">
			<div class="col-md-12">
			    <div class="portlet-body flip-scroll" style="display: block;">
				 <div class="table-responsive"> 
					<table id="tableCRCO" class="table table-striped table-bordered display table-hover dt-responsive">
						<thead>
							<tr>
								<th></th>
								<th><spring:message code="create.request.change.other.modal.table.stt"/></th>
								<th id="inputCol"><spring:message code="create.request.change.other.modal.table.acc"/></th>
								<th><spring:message code="create.request.change.other.modal.table.address"/></th>
							</tr>
						</thead>
					</table>
					</div>
				</div>
			</div>
		</div>	
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><spring:message code="create.request.change.other.modal.close"/></button>
        <button type="button" class="btn btn-primary"><spring:message code="create.request.change.other.modal.ok"/></button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<!-- 	End modal -->
<script type = "text/javascript" >
	function showModal(rowId){
		// Case create
		if(CommonUtils.isNullOrEmpty(rowId) || rowId == undefined) {
			$('#requestCode').val('');
			$('#requestName').val('');
			$('#requestContent').val('');
			      
		} else { // Case update
			$.ajax({
				type: 'GET',
	          	url: 'http://www.json-generator.com/api/json/get/cfKJmlyBWq?id="'+rowId+'"',
	          	success: function(response) {
					$('#requestCode').val(response.code);
	              	$('#requestName').val(response.name);
	              	$('#requestContent').val(response.content);
	          	}
	      	});
		}  
		$('#myModal').modal('show');
		
	}
	function getModal(rowId){
		// Case create
		if(CommonUtils.isNullOrEmpty(rowId) || rowId == undefined) {
			$('#thueBao').val('');
			      
		} else { // Case update
			$.ajax({
				type: 'GET',
	          	url: 'http://www.json-generator.com/api/json/get/cfKJmlyBWq?id="'+rowId+'"',
	          	success: function(response) {
					$('#thueBao').val(response.thueBao);
	          	}
	      	});
		}  
		$('#myModal').modal('show');
		
	}
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
		canv.height = 37;
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
		var e = $("#validationFormRequestChangeOther");
		e.validate({
	        errorElement: "span",
	        errorClass: "help-block help-block-error",
	        focusInvalid: !1,
	        rules: {
	            maXacNhan: {
	            	required: true,
	            	equalTo: code 
	            }
	        },
	        messages: {
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
    function getAjax() {
        var l = Ladda.create(document.querySelector('#submitBtn'));
        l.start();
        var url = 'http://10.30.176.198:9006/ITSolWebService/service/tracking';
        var submit = $('#submitBtn');
        $.ajax({
            url: url,
            success: function(result) {
                var data = JSON.stringify(result);
                $("#success-message").text(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $("#success-message").text('Không kết nối được server.');
            }
        }).always(function(dataOrjqXHR, textStatus, jqXHRorErrorThrown) {
            setTimeout(function() {
                l.stop();
            }, 300);
        });
    }
	$(document).ready(function() {
		createCaptcha();
		setTimeout(function() {
			var table = $('#tableCRCO').DataTable({
				  	"processing":true,
		    	  	"autoWidth":true,
		    	  	"pagingType": "full_numbers",
		    	  	"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
		    	  	"scrollY": true,
		          	"scrollX": true,
		          	"ajax": {
		  		    	"url": "http://10.30.176.198:9006/ITSolWebService/ticket/listAccount",
		  		    	"type": "GET",
			  		  	/* "url": "/service/call",		
						"type": "POST",		
						"dataType" : "json",		
						"contentType": "application/json; charset=utf-8",		
						"dataSrc": "invoices",		
						"data": function (  ) {		
							params.searchType = "1";	
						  	params.doccumentNo = "601838862/KHDN_AM_HCM/02102017";	
						  	params.fromDate = "2019-02-01";	
						  	params.toDate = "2019-10-01";	
						  	params.page = page;	
							params.pageSize = "1";	
						  	return JSON.stringify(params);	 
						}*/
		  		  },
		          "columns": [
		              {
		                  data: null,		
		                  render: function ( data, type, row ) {		
		         			return  '<div class="md-radio">'
										+'<input type="radio" id="'+data.id+'" name="radio1" class="md-radiobtn"> '
		         							+'<label for="'+data.id+'"> <span></span>'
											+'<span class="check"></span> <span class="boxForm"></span>'
										+'</label>'
									+'</div>';	
		                  },		
		                  className: 'textCenter',		
		                  orderable: true		
	
		              },
		        	  {
		                  data: null,
		                  defaultContent: 0,
		                  className: 'textCenter',
		                  orderable: false
		              },
		              { "data": "name" },
		              { "data": "address" }
		          ],
		          "order": [[1, 'asc']]
		    });
		
			table.on( 'order.dt search.dt', function () {
	    	  	table.column(1, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
	              	cell.innerHTML = i+1;
	          	} );
	      	} ).draw();
			$('#tableCRCO_wrapper .row').eq(0).remove()
		}, 100);
		
		// Processing top bar
		var simplebar = new Nanobar();
		simplebar.go(100);
		
		// Active menu
	    $('.menu-service .qlyc').addClass("active");
	
	    /* Generate breadCumb*/
	    var breadCumb_1 = ['DV đang sử dụng', false];
	    var breadCumb_2 = ['Kênh truyền', '#/service/channel'];
	    var breadCumb_3 = ['Quản lý yêu cầu', '#/ticket/create'];
	    CommonUtils.genBreadCumb(breadCumb_1, breadCumb_2, breadCumb_3);
	    /*  end */
	    // Select form
	    var form = $("#validationFormRequestChangeOther");
	    // Validation
	    var validator = form.validate({
	        errorElement: "span",
	        errorClass: "help-block help-block-error",
	        focusInvalid: true,
	        rules: {
	            // userName is name of input tag
	            // simple rule, converted to {required:true}
	            thueBao: "required",
	            sdt: {
	            	required: true,
	            	isValidPhoneNumber: true
	            },
	            tenNguoiLienHe: {
	            	required: true
	            },
	            noiDung: {
	                required: true
	            },
	        },
	        messages: {
	        	thueBao: {
	                required: jQuery.validator.format(requestChangeOtherErrAcc),
	            },
	            sdt: {
	            	required: jQuery.validator.format(requestChangeOtherErrPhone),
	            },
	            tenNguoiLienHe: {
	            	required: jQuery.validator.format(requestChangeOtherErrName),
	            },
	            noiDung: {
	                required: jQuery.validator.format(requestChangeOtherErrContent),
	            },
	            maXacNhan: {
	                required: jQuery.validator.format("Vui lòng nhập mã xác nhận."),
	                equalTo: jQuery.validator.format("Vui lòng nhập ký tự giống hình.")
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
	    //Click Reset
	    $('#resetBtn').click(function() {
	        validator.resetForm();
	    });
	}); 
</script>