<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=10" />
<script src="<%=ConfigurationPath.getResourceServerPath("/bower_components/jquery/dist/jquery.min.js")%>"></script>

<html>

<script type="text/javascript">
	$(document).ready(function() {
		window.location.href = "/account/login";
	});
</script>
</html>