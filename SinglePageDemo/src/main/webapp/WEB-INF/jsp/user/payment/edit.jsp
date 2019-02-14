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
						<script>
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
						                { name: "Alberta", abbreviation: 'AB' }
						            ]
						        });
						
						        $("#filter").kendoDropDownList({
						            change: filterTypeOnChanged
						        });
						
						        var multiSelect = $("#movies").data("kendoMultiSelect"),
						            setValue = function(e) {
						                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
						                    multiSelect.dataSource.filter({}); //clear applied filter before setting value
						
						                    multiSelect.value($("#value").val().split(","));
						                }
						            },
						            setSearch = function (e) {
						                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
						                    multiSelect.search($("#word").val());
						                }
						            };
						        function filterTypeOnChanged() {
						            multiSelect.options.filter = $("#filter").val();
						        }
					    	});
					    </script>
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
						<script type="text/javascript">
						    $(document).ready(function() {
						    	var dropdown = $('#multiCheckbox');
							    const url = 'http://10.30.176.198:9006/ITSolWebService/payment/combobox';
							    $.getJSON(url, function (data) {
							        $.each(data, function (key, entry) {
							            dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
							        })
							        $('#multiCheckbox option[value=AB]').attr('selected','selected');
							        $('#multiCheckbox option[value=BC]').attr('selected','selected');
							        $('#multiCheckbox option[value=MB]').attr('selected','selected');
						        	$('#multiCheckbox').multiselect({
					                    includeSelectAllOption: true,
					                    buttonWidth: '100%'
					                });
							    }); 
						    });
						</script>
					</div>
					<!-- /.form-group -->
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<select id="normalComboBox" class="form-control select2 select2-hidden-accessible"
							style="width: 100%;" aria-hidden="true">
							<option selected="selected">Combobox thường</option>
						</select>
					   	<script type="text/javascript">
					      var dropdown = $('#normalComboBox');
					      const url = 'http://10.30.176.198:9006/ITSolWebService/payment/combobox';
					      $.getJSON(url, function (data) {
					         $.each(data, function (key, entry) {
					            dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
					         })
						     $('#normalComboBox option[value=AB]').attr('selected','selected');
					      }); 
					   	</script>
					</div>
					<!-- /.form-group -->
				</div>
				<!-- /.col -->
			</div>
			<!-- /.row -->
		</div>
		
		<div class="box-footer">
			<button type="submit" class="btn btn-green pull-right" style="margin-left: 10px;"><i class="fa fa-plus"></i>Tạo yêu cầu mới</button>
            <button type="submit" class="btn btn-blue pull-right"><i class="fa fa-search"></i>Update</button>
		</div>
</div>
</section>
