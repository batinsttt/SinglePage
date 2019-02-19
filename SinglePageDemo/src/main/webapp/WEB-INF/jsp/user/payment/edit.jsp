<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
<section class="content">
	<!-- /.box -->
	<div class="box">
		<div class="box-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<select id="movies" data-placeholder="Select movie..."></select>
					</div>
					<!-- /.form-group -->
				</div>
				<!-- /.col -->
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<!-- <input type="text" class="form-control" id="phone"
							placeholder="Combobox multiple checkbox"> -->
						<select id="multiCheckbox" class="form-control" multiple="multiple">
						</select>
					</div>
					<!-- /.form-group -->
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<select id="normalComboBox" class="form-control select2 select2-hidden-accessible"
							style="width: 100%;max-height: 60px;" aria-hidden="true">
							<option selected="selected">Combobox thường</option>
						</select>
					</div>
					<!-- /.form-group -->
				</div>
				<!-- /.col -->
			</div>
			<!-- /.row -->
		</div>
		<script type="text/javascript">
			$(document).ready(function() {
		        $("#movies").kendoMultiSelect({
		            dataTextField: "name",
		            dataValueField: "abbreviation",
		            dataSource: {
		                transport: {
		                    read: {
		                        url: "http://10.30.176.198:9006/ITSolWebService/payment/combobox",
		                    }
		                }
		            },
		            value: [
		                { abbreviation: 'AB' },
		                { abbreviation: 'BC' }
		            ], 
		            autoClose: false,
		        });
	            
				const url = 'http://10.30.176.198:9006/ITSolWebService/payment/combobox';
				$.getJSON(url, function (data) {
				    $.each(data, function (key, entry) {
				    	$('#multiCheckbox').append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
				    })
				   	$('#multiCheckbox').multiselect({
						includeSelectAllOption: true,
						buttonWidth: '100%',
						maxHeight: 200,
						//buttonClass: 'form-control select2 select2-hidden-accessible',
						numberDisplayed: 1000,
					});

				    $('#multiCheckbox').multiselect('select', ['AB','BC','MB']);
				});
			    
				const url2 = 'http://10.30.176.198:9006/ITSolWebService/payment/combobox';
				$.getJSON(url2, function (data) {
				   $.each(data, function (key, entry) {
					   $('#normalComboBox').append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
				   })
					$('#normalComboBox').val("MB");
				}); 
	    	});
		</script>
		
		<div class="box-footer">
			<button type="submit" class="btn btn-green pull-right" style="margin-left: 10px;"><i class="fa fa-plus"></i>Tạo yêu cầu mới</button>
            <button type="submit" class="btn btn-blue pull-right"><i class="fa fa-search"></i>Update</button>
		</div>
</div>
</section>
