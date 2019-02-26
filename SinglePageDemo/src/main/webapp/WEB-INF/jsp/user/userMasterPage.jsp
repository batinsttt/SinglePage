<%-- <%@page contentType="text/html" pageEncoding="UTF-8"%> --%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>
<html ng-app='contentApp'>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=10" />
<meta name="description" content="Tem" />
<link rel="icon" type="image/x-icon" href="<%=ConfigurationPath.getResourceServerPath("/images/viettel.jpg")%>">

<jsp:include page="/WEB-INF/jsp/general/multiLanguage.jsp" />
<jsp:include page="/WEB-INF/jsp/general/serverValue.jsp" />
<jsp:include page="/WEB-INF/jsp/general/commonModal.jsp" />
<jsp:include page="/WEB-INF/jsp/general/commonLibrary.jsp" />

<script src="<%=ConfigurationPath.getResourceServerPath("/scripts/forwardUserPage.js")%>"></script>
<script src="<%=ConfigurationPath.getResourceServerPath("/scripts/headerController.js")%>"></script>


</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper" style="background-color: #f7f7f7;">

  <header class="main-header">   
    <!-- Logo -->
    <a href="" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini">
      </span>
      <img class="custom_Logo" src="<%=ConfigurationPath.getResourceServerPath("/images/viettel_Logo.png")%>"  alt="Viettel Solution">
      
    </a>
     <a href="" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
     <div class="tile-Content">
     	 <spring:message code="user.menu.searchService" text="default text" />
     </div>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Notifications: style can be found in dropdown.less -->
          <li class="dropdown notifications-menu">
            <a href="" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning" id="number"></span>
            </a>
            <ul class="dropdown-menu" id="menuNotify">
<!--               <li class="header"><i class="fa fa-bell-o"></i> You have 10 notifications</li> -->
              		<li>
<!--                 inner menu: contains the actual data -->
                <ul class="menu" id="subMenu">
<!--                   <li> -->
<!--                     <a href="#"> -->
<!--                       <i class="fa fa-users text-aqua"></i> 5 new members joined today -->
<!--                     </a> -->
<!--                   </li> -->
<!--                   <li> -->
<!--                     <a href="#"> -->
<!--                       <i class="fa fa-warning text-yellow"></i> Very long description here that may not fit into the -->
<!--                       page and may cause design problems -->
<!--                     </a> -->
<!--                   </li> -->
<!--                   <li> -->
<!--                     <a href="#"> -->
<!--                       <i class="fa fa-users text-red"></i> 5 new members joined -->
<!--                     </a> -->
<!--                   </li> -->
<!--                   <li> -->
<!--                     <a href="#"> -->
<!--                       <i class="fa fa-shopping-cart text-green"></i> 25 sales made -->
<!--                     </a> -->
<!--                   </li> -->
                </ul>
              </li>
<!--               <li class="footer"><a href="#">View All Notifications <i class="fa fa-angle-right"></i></a></li> -->
            </ul>
          </li>
          <!-- Tasks: style can be found in dropdown.less -->
          <li class="dropdown tasks-menu">
            <a href="" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-flag-o"></i>
              <span class="label label-danger">9</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header"><i class="fa fa-bell-o"></i> You have 9 tasks</li>
              <li>
                <!-- inner menu: contains the actual data -->
                <ul class="menu">
                  <li><!-- Task item -->
                    <a href="#">
                      <h3>
                        Design some buttons
                        <small class="pull-right">20%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar"
                             aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <!-- end task item -->
                  <li><!-- Task item -->
                    <a href="#">
                      <h3>
                        Create a nice theme
                        <small class="pull-right">40%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-green" style="width: 40%" role="progressbar"
                             aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">40% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <!-- end task item -->
                  <li><!-- Task item -->
                    <a href="#">
                      <h3>
                        Some task I need to do
                        <small class="pull-right">60%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-red" style="width: 60%" role="progressbar"
                             aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">60% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <!-- end task item -->
                  <li><!-- Task item -->
                    <a href="#">
                      <h3>
                        Make beautiful transitions
                        <small class="pull-right">80%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-yellow" style="width: 80%" role="progressbar"
                             aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">80% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <!-- end task item -->
                </ul>
              </li>
              <li class="footer">
                <a href="#">View all tasks <i class="fa fa-angle-right"></i></a>
              </li>
            </ul>
          </li>
          <!-- User Account: style can be found in dropdown.less custon_Profile-->
          <li class="dropdown user user-menu">
            <a href="" class="dropdown-toggle " data-toggle="dropdown">
              <img src="<%=ConfigurationPath.getResourceServerPath("/images/user2-160x160.jpg")%>" class="user-image" alt="User Image">
              <span class="hidden-xs">Nguyễn Hoàng Tùng</span>
<%--               <br/><small>Admin</small> --%>
              <i class="fa fa-angle-down"></i>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="<%=ConfigurationPath.getResourceServerPath("/images/user2-160x160.jpg")%>" class="img-circle" alt="User Image">

                <p>
                  Alexander Pierce - Web Developer
                  <small>Member since Nov. 2012</small>
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
                <!-- /.row -->
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
<!--           <li> -->
<!--             <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a> -->
<!--           </li> -->
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
     <!-- search form -->
      <div class="sidebar-form">
        <div class="input-group">
          	<span class="input-group-btn">
                <a href="" id="search-btn" class="btn btn-flat"><i class="fa fa-search paddTop3"></i></a>
                <a href="" id="remove-btn" class="btn btn-flat"><i class="fa fa-remove custom-icon-S"></i></a>
                <a href="" id="search-icon" class="btn btn-flat"><i class="fa fa-search paddTop3"></i></a>
             </span>
              <input type="text" name="q" class="form-control" placeholder="Tìm kiếm danh mục">
              <span class="input-group-btn cus-item-search">
                <a href="" id="search-btn2" class="btn btn-flat"><i class="fa fa-search paddTop3"></i></a>
             </span>
        </div>
      </div>
      
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" ng-controller="HeaderController" data-widget="tree">
     	 <li class="active oneLevel">
          	<a href="#/home">
           	 	<i class="fa fa-home" style="font-size: 18px;"></i> <span>Trang chủ</span>
         	</a>
        </li>
        <li class="treeview">
          <a href="">
            <i class="fa fa-drivers-license"></i> <span>Dịch vụ đang sử dụng</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-down pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#/channel"><i class="fa fa-circle-o"></i> Kênh truyền</a></li>
            <li><a href="#/service/tracking"><i class="fa fa-circle-o"></i> Vtracking</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="">
            <i class="fa fa-drivers-license"></i> <span>Màn hình demo</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-down pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#/service/channel"><i class="fa fa-circle-o"></i> Kênh truyền</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="">
            <i class="fa fa-tags"></i> <span>Menu Tin Edit</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-down pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#/sales/edit"><i class="fa fa-circle-o"></i> Edit page</a></li>
            <li><a href="#/sales/view"><i class="fa fa-circle-o"></i> View page</a></li>
            <li><a href="#/sales/demo"><i class="fa fa-circle-o"></i> Demo</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="">
            <i class="fa fa-credit-card"></i> <span>Menu Ân</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-down pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#/payment/view"><i class="fa fa-circle-o"></i> Data page</a></li>
            <li><a href="#/payment/eidt"><i class="fa fa-circle-o"></i> edit page</a></li>
          </ul>
        </li>
<!--         <li class="oneLevel"> -->
<!--           	<a href="#payment"> -->
<!--            	 	<i class="fa fa-credit-card"></i> <span>Menu Ân</span> -->
<!--          	</a> -->
<!--         </li> -->
        <li class="treeview">
          <a href="">
            <i class="fa fa-credit-card"></i> <span>Menu Tiến</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-down pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#/service/noticeError"><i class="fa fa-circle-o"></i> Notice error</a></li>
            <li><a href="#/service/addNewUser"><i class="fa fa-circle-o"></i> Add new User</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="">
            <i class="fa fa-drivers-license"></i> <span>Menu Quốc</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-down pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#/demo/validate"><i class="fa fa-circle-o"></i>Validate Demo</a></li>
            <li><a href="#/demo/form"><i class="fa fa-circle-o"></i>Validate version 2</a></li>
          </ul>
        </li>
       
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
  <!-- /.content-wrapper -->
  
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="page-bar" id="breadCumb"></div>
    <!-- Main content -->
    <div ng-app="contentApp">
    	<ng-view></ng-view>
    </div>
    
  </div>

  <footer class="main-footer" style="text-align: center;">
    	<small>© Phát triển bởi tập đoàn Quân đội Viettel</small>
  </footer>
  <!-- Add  after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<script type="text/javascript">
$(document).ready(function() {
	var url = 'http://10.30.176.198:9006/ITSolWebService/notify/show';
	var method = "GET";
	$.ajax({
		type : method,
		url : url,
		dataType : "json",
		headers : {
			'Content-Type' : 'application/json; charset=utf-8'
		},
		success : function(data) {
			console.log(data);
			$("#number").text(data[0].number);
			for(var i = 0; i < data[0].number; i++){
				if(i == 0){
					$("#menuNotify").prepend("<li class='header'><i class='fa fa-bell-o'></i>"+data[0].notify[i].error+"</li>");
				} else {
					$("#subMenu").append("<li><a href='/error?id="+data[0].id+"'><i class='fa fa-users text-aqua'></i>"+data[0].notify[i].error+"</a></li>");
				}
				
			}
			$("#menuNotify").append("<li class='footer'><a href='#'>View All Notifications<i class='fa fa-angle-right'></i></a></li>");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

		}
	});
});
</script>
</html>