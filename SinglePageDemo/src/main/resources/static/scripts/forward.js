// Code goes here

(function () {

    var app = angular.module('contentApp',['ngRoute']);
    
    app.config(function ($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'home.jsp'
            })
            .when('/service/channel',{
                templateUrl:'/WEB-INF/jsp/user/service/about.html'
            })
            .otherwise({ redirectTo:'/'});
    });
})();