<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<html>
	<head>
		
	</head>
	<body>
		<form action="/login/auth" method="post">
			<input type = "text" name="username" id ="username"/>
			<input type = "password" name="password" id ="password"/>
			<input type="submit" value="Submit">
		</form>
		<script src="<%=ConfigurationPath.getResourceServerPath("/bower_components/jquery/dist/jquery.min.js")%>"></script>
    	<script type="text/javascript">
    	$(document).ready(function() {
    		$("#login").click(function() {
    			var data = new Object;
    			data.username = $("#username").val();
    			data.password = $("#password").val();
    			var kData =  JSON.stringify(data);
    			var url = '/login/auth'
    			var method = "POST";
    			$.ajax({
    				type : method,
    				url : url,
    				data :(kData),
    				headers: {
    		            'Content-Type': 'application/json'
    		        },
    				success : function(data) {				
    					data.errorCode==200?console.log("OK"):console.log("ERROR")
    				},
    				error:function(XMLHttpRequest, textStatus, errorThrown) {
    					console.log("ERROR");
    				}
    			});
    		});
    	});

    	</script>
	</body>
</html>