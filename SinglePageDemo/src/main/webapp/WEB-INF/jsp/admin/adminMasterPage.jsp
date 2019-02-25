<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@page import="com.sttt.ruby.config.ConfigurationPath"%>

<html ng-app='contentAdmin'>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=10" />
<meta name="description" content="Tem" />
<link rel="icon" type="image/x-icon" href="<%=ConfigurationPath.getResourceServerPath("/images/viettel.jpg")%>">
<%--  <link rel="stylesheet" href="<%=ConfigurationPath.getResourceServerPath("/css/bootstrap.min.css")%>"> --%>
<jsp:include page="/WEB-INF/jsp/general/commonLibrary.jsp" />
<jsp:include page="/WEB-INF/jsp/general/serverValue.jsp" />
<jsp:include page="/WEB-INF/jsp/general/commonModal.jsp" />
<jsp:include page="/WEB-INF/jsp/general/multiLanguage.jsp" />

<script src="<%=ConfigurationPath.getResourceServerPath("/scripts/forwardAdminPage.js")%>"></script>
<script src="<%=ConfigurationPath.getResourceServerPath("/scripts/headerControllerAdmin.js")%>"></script>

</head>

<body class="personal_body">
   <section class="section-01 ex">
      <div class="header-wrapper2">
         <div class="container hidden-xs">
            <div class="header-top-text2">
               <div class="logo-mobile">
                  <a href="https://viettel.vn/">
                  <img class="logo" src="./Admin_files/logo viettel_mobile.svg"></a>
               </div>
               <div class="hotline-mobile">
                  <i class="fa fa-phone img-circle"></i><span class="big">1800 8168</span>
               </div>
               <div class="logo_text">
                  <a href="https://viettel.vn/">
                       <img class="custom_Logo-admin" src="<%=ConfigurationPath.getResourceServerPath("/images/logo_viettel2.png")%>"  alt="Viettel Solution">
                  </a>
               </div>
               <div class="navbar-left">
                  <div class="item-change-user"></div>
                  <div class="item-change-user"></div>
               </div>
               <div class="navbar-right">
                  <div class="menu-shoping">
                     <div class="item-shoping">
                        <a style="" href="https://viettel.vn/doanh-nghiep" class="">
                        <i class="fa fa-user-o"></i>
                        <span class="des hvr-underline-from-left">Admin</span></a>
                     </div>
                  </div>
               </div>
<!-- 					<div class="navbar-custom-menu" style="float: right;"> -->
<!-- 						<ul class="nav navbar-nav"> -->
<!-- 							User Account: style can be found in dropdown.less -->
<!-- 							<li class="dropdown user user-menu cusDR"> -->
<!-- 								<a href="#" class="dropdown-toggle" data-toggle="dropdown" style="margin: 0px 5px 0px 0px;"> -->
<%-- 									<img src="<%=ConfigurationPath.getResourceServerPath("/images/avatar_No_Image.png")%>" class="user-image" alt="User Image"> --%>
<!-- 									<span class="userMenuA">Admin</span> -->
<!-- 									 <i class="fa fa-angle-down userMenuA"></i> -->
<!-- 								</a> -->
<!-- 								<ul class="dropdown-menu" style="border: 0;"> -->
<!-- 									Menu Footer -->
<!-- 									<li class="BoxEditStateBottom" style="top: -18%;transform: rotate(-180deg); border-top-color: #fff;"></li> -->
<!-- 									<li class="user-login"> -->
<!-- 										<a href="http://dmsone.vn/account/change-pass" class="btn-flat"> -->
<!-- 											<span class="glyphicon glyphicon-lock" style ="color:#2DA5DA !important"></span> -->
<!-- 											Đổi mật khẩu</a> -->
<!-- 									</li> -->
<!-- 									<li class="user-out"> -->
<!-- 										<a id = "btnLogout" href="#" class="btn-flat"> -->
<!-- 											<span class="glyphicon glyphicon-log-out" style ="color:#2DA5DA !important"></span> -->
<!-- 											Đăng xuất</a> -->
<!-- 									</li> -->
<!-- 								</ul> -->
<!-- 							</li> -->
<!-- 						</ul> -->
<!-- 					</div> -->
			   </div>
            <div class="clearfix"></div>
         </div>
         <div class="header-menu-main2" id="menutop-fixed" style="background-color:#00918d">
            <div class="container menu_bg" style="background-image:url(&#39;/img/menu_bg3.png&#39;)">
               <div class="navbar-header">
                  <button class="navbar-toggle collapsed" type="button" tabindex="1" accesskey="m" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
                  <span class="sr-only">toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  </button>
                  
                  <div class="mobile_nav_logo_div hide_on_large">
                     <a href="https://viettel.vn/">
                     <img src="./Admin_files/logo viettel_mobile.svg" style="height: 40px">
                     </a>
                  </div>
               </div>
               <div class="hide_on_large">
                  <nav id="mobile_nav_dropdown" class="collapse navbar-collapse">
                     <div><a href="https://viettel.vn/doanh-nghiep">Admin</a></div>
                  </nav>
               </div>
               <nav id="bs-navbar" class="collapse navbar-collapse">
                  <ul class="nav navbar-nav navbar-left">
                     <li class="dropdown laptop">
                        <a href="https://viettel.vn/di-dong" class="dropdown-toggle disabled" data-toggle="dropdown">Quản lý tài khoản</a>
                     </li>
                     <li class="dropdown laptop">
                        <a href="https://viettel.vn/di-dong" class="dropdown-toggle disabled" data-toggle="dropdown">Quản lý sản phẩm dịch vụ</a>
                     </li>
                     <li class="dropdown laptop">
                        <a href="https://viettel.vn/di-dong" class="dropdown-toggle disabled" data-toggle="dropdown">Quản lý yêu cầu dịch vụ</a>
                     </li>
                     <li class="dropdown laptop">
                        <a href="https://viettel.vn/di-dong" class="dropdown-toggle disabled" data-toggle="dropdown">Quản lý sản khác</a>
                        <div class="dropdown-menu">
                           <ul class="col-md-12">
                              <li>
                                 <a href="https://viettel.vn/di-dong/tra-truoc"> Quản lý log đăng nhập</a>
                              </li>
                              <li>
                                 <a href="https://viettel.vn/di-dong/tra-truoc"> Quản lý thông báo</a>
                              </li>
                              <li>
                                 <a href="https://viettel.vn/di-dong/tra-truoc"> Quản lý Câu hỏi thường gặp</a>
                              </li>
                              <li>
                                 <a href="https://viettel.vn/di-dong/tra-truoc"> Quản lý danh mục</a>
                              </li>
                           </ul>
                        </div>
                     </li>
                  </ul>
<!--                   <ul class="nav navbar-nav navbar-right"> -->
<!-- 			            <div class="viettel_account"> -->
<!-- 			              <i style="color:#fff" class="fa fa-user-circle"></i> -->
<!-- 			            </div> -->
<!-- 			            <div class="account_option_div"> -->
<!-- 			                              <a href="https://vietteltelecom.vn/dang-nhap">Đăng nhập</a><br> -->
<!-- 			                <a href="https://vietteltelecom.vn/dang-ky">Đăng ký</a> -->
<!-- 			             </div> -->
<!-- 			   </ul> -->
               </nav>
            </div>
         </div>
      </div>
    <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper-admin">
    <!-- Main content -->
    <div ng-app="contentAdmin">
    	<ng-view></ng-view>
    </div>
  </div>
    
  <footer class="main-footer-admin" style="text-align: center;">
    	<small>© Phát triển bởi tập đoàn Quân đội Viettel</small>
  </footer>
   </section>
</body>


