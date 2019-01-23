<%@page import="tem.project.web.helper.Configuration"%>

 <!-- style.css -->
 <link rel="stylesheet" href="<%=Configuration.getCssServerPath("/resources/styles/style.min.css")%>">

 <!-- Bootstrap 3.3.7 -->
 <link rel="stylesheet" href="<%=Configuration.getCssServerPath("/resources/bower_components/bootstrap/dist/css/bootstrap.min.css")%>">
 <!-- Font Awesome -->
 <link rel="stylesheet" href="<%=Configuration.getCssServerPath("/resources/bower_components/font-awesome/css/font-awesome.min.css")%>">
 <!-- Ionicons -->
 <link rel="stylesheet" href="<%=Configuration.getCssServerPath("/resources/bower_components/Ionicons/css/ionicons.min.css")%>">
 <!-- Theme style -->
 <link rel="stylesheet" href="<%=Configuration.getCssServerPath("/resources/styles/AdminLTE.min.css")%>">
 <!-- AdminLTE Skins -->
 <link rel="stylesheet" href="<%=Configuration.getCssServerPath("/resources/styles/skins/_all-skins.min.css")%>">
 <!-- Morris chart -->
 <link rel="stylesheet" href="<%=Configuration.getCssServerPath("/resources/bower_components/morris.js/morris.css")%>">
 <!-- jvectormap -->
 <link rel="stylesheet" href="<%=Configuration.getCssServerPath("/resources/bower_components/jvectormap/jquery-jvectormap.css")%>">
 <!-- Date Picker -->
 <link rel="stylesheet" href="<%=Configuration.getCssServerPath("/resources/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css")%>">
 <!-- Daterange picker -->
 <link rel="stylesheet" href="<%=Configuration.getCssServerPath("/resources/bower_components/bootstrap-daterangepicker/daterangepicker.css")%>">
 <!-- bootstrap wysihtml5 - text editor -->
 <link rel="stylesheet" href="<%=Configuration.getCssServerPath("/resources/scripts/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css")%>">

 <!---------------------------------------- Scripts ------------------------------->
 <!-- jQuery 3 -->
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/jquery/dist/jquery.min.js")%>"></script>
<!-- jQuery UI 1.11.4 -->
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/jquery-ui/jquery-ui.min.js")%>"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>

<!-- Bootstrap 3.3.7 -->
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/bootstrap/dist/js/bootstrap.min.js")%>"></script>
<!-- Morris.js charts -->
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/raphael/raphael.min.js")%>"></script>
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/morris.js/morris.min.js")%>"></script>
<!-- Sparkline -->
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js")%>"></script>
<!-- jvectormap -->
<%-- <script src="<%=Configuration.getCssServerPath("/resources/bower_components/jvectormap/jquery-jvectormap-1.2.2.min.js")%>"></script> --%>
<%-- <script src="<%=Configuration.getCssServerPath("/resources/bower_components/jvectormap/jquery-jvectormap-world-mill-en.js")%>"></script> --%>
<!-- jQuery Knob Chart -->
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/jquery-knob/dist/jquery.knob.min.js")%>"></script>
<!-- daterangepicker -->
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/moment/min/moment.min.js")%>"></script>
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/bootstrap-daterangepicker/daterangepicker.js")%>"></script>
<!-- datepicker -->
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js")%>"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="<%=Configuration.getCssServerPath("/resources/scripts/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js")%>"></script>
<!-- Slimscroll -->
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/jquery-slimscroll/jquery.slimscroll.min.js")%>"></script>
<!-- FastClick -->
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/fastclick/lib/fastclick.js")%>"></script>
<!-- AdminLTE App -->
<script src="<%=Configuration.getCssServerPath("/resources/scripts/adminlte.min.js")%>"></script>

<script src="<%=Configuration.getCssServerPath("/resources/bower_components/datatables/jquery.dataTables.min.js")%>"></script>
<script src="<%=Configuration.getCssServerPath("/resources/bower_components/datatables/dataTables.bootstrap4.min.js")%>"></script>

<script type="text/javascript">
$.ajaxSetup({'cache':true});
</script>