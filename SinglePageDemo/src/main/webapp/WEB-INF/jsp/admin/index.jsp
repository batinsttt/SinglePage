<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@page import="tem.project.web.helper.Configuration"%>
<html ng-app='contentApp'>

<head>
    <script data-require="angular.js@1.4.x" src="<%=Configuration.getCssServerPath("/resources/scripts/angular.js")%>" data-semver="1.4.9"></script>
    <script data-require="angular.js@1.4.x" src="<%=Configuration.getCssServerPath("/resources/scripts/angular-route.js")%>" data-semver="1.4.9"></script>
    <script src="<%=Configuration.getCssServerPath("/resources/scripts/script.js")%>"></script>
    <script src="<%=Configuration.getCssServerPath("/resources/scripts/headerController.js")%>"></script>
</head>

<body>

  <header>
    <nav class="navbar navbar-default" ng-controller="HeaderController">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Sample App</a>
        </div>
        <ul class="nav navbar-nav">
          <li ng-class="{ active: isActive('/')}"><a href="#/">Home</a></li>
          <li ng-class="{ active: isActive('/about')}"><a href="#/about">About</a></li>
        </ul>
      </div>
    </nav>
  </header>
   <div ng-app="contentApp">
		<ng-view></ng-view>
	  </div>
</body>
</html>