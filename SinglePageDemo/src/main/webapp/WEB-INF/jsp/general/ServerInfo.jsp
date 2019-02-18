<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<script type="text/javascript">
var sysDateFromDB = '${dates}';
if (sysDateFromDB == null){
	sysDateFromDB = new Date();
}
	console.log(sysDateFromDB);
</script>