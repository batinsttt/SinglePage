// Code goes here

(function () {

    var app = angular.module('contentApp',['ngRoute']);
    
    app.config(function ($routeProvider){
        $routeProvider
            .when('/home',{
                templateUrl:'/home'
            })
            .when('/service/channel',{
                templateUrl:'/service/channel'
            })
            .otherwise({ redirectTo:'/home'});
    });
})();