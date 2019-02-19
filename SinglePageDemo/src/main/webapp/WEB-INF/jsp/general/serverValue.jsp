<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<script type="text/javascript">
var sysDateFromServer = '${dates}';
if (sysDateFromServer == null){
	sysDateFromServer = new Date();
}
	console.log(sysDateFromServer);
</script>