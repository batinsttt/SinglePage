<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
<html>
<head>
<body>
   <hr><br>
   <div style="width: 98%; margin-left: 15px;">
      <table id="example" class="table table-striped table-bordered display" cellspacing="0" width="100%">
         <thead>
            <tr>
               <th id="inputCol">Name</th>
               <th>Position</th>
               <th>Office</th>
               <th>Extn.</th>
               <th>Start date</th>
               <th>Salary</th>
               <th>Edit</th>
            </tr>
          </thead>
          
      </table>
   </div>
   <button id="addRow" style="margin-left: 15px;" class="btn btn-primary">Add new row</button>
   <button id="save" style="margin-left: 15px;" class="btn btn-primary">Save</button>
   <hr>
</body>


<script type="text/javascript">
   $(document).ready(function() {
      var d;
      var nEditing = null;
      var nNew = false;
      var counter = 0;
      var countChecked = 1;
      var table = $('#example').DataTable();

      // Add new row when click button
      $('#addRow').on( 'click', function () {
    	  table.row.add( [
	            '<input type="text" class="form-control" name="name-'+counter+'">',
	            '<input type="text" class="form-control" name="position-'+counter+'">',
	            '<input type="text" class="form-control" name="office-'+counter+'">',
	            '<input type="text" class="form-control" name="extn-'+counter+'">',
	            '<input type="text" class="form-control" name="startDate-'+counter+'">',
	            '<input type="text" class="form-control" name="salary-'+counter+'">',
	            '<a class="save" href="javascript:;">Delete</a>',
	         ] ).draw( false );
	         counter++;
      } );
      
      // Add new row when enter key press
      $(document).on("keypress", "input", function(e){
    	    if(e.which == 13 && $(this).closest("tr").is(":last-child")){
    	    	table.row.add( [
    	            '<input type="text" class="form-control" name="name-'+counter+'">',
    	            '<input type="text" class="form-control" name="position-'+counter+'">',
    	            '<input type="text" class="form-control" name="office-'+counter+'">',
    	            '<input type="text" class="form-control" name="extn-'+counter+'">',
    	            '<input type="text" class="form-control" name="startDate-'+counter+'">',
    	            '<input type="text" class="form-control" name="salary-'+counter+'">',
    	            '<a class="save" href="javascript:;">Delete</a>',
    	         ] ).draw( false );
    	         counter++;
    	    }
    	});

      // Click save button
      $('#save').on( 'click', function () {
    	  var data = table.$('input').serializeArray();
    	  var userObject = new Object();
    	  var userArray = new Array();
    	  var index = 0;
    	  $.each(data, function( key, value ) {
    		  var name = value.name.substring(0, value.name.indexOf("-"));
    		  userObject[name] = value.value;
    		  index++;
    		  
    		  if (index % 6 == 0) {
    			  userArray.push(userObject);
    			  index = 0;
    			  userObject = new Object();
    		  }
    		});
    	  $.ajax({
  		    type: "POST",
  		    url: "http://10.30.176.198:9006/ITSolWebService/service/addNewUser",
  		    // The key needs to match your method's input parameter (case-sensitive).
  		    data: JSON.stringify({ data: userArray }),
  		    contentType: "application/json; charset=utf-8",
  		    dataType: "json",
  		    success: function(data){alert(data);},
  		    failure: function(errMsg) {
  		        alert(errMsg);
  		    }
  		  });
      });
   });
</script>
</html>
