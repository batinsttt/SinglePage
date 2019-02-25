// Code goes here

(function () {

    var app = angular.module('contentApp',['ngRoute']);
    
    app.config(function ($routeProvider){
        $routeProvider
            .when('/home',{
                templateUrl:'/home'
            })
            .when('/ticket/create',{
                templateUrl:'/ticket/create'
            })
            
            
            .when('/service/channel',{
                templateUrl:'/service/channel'
            })
             .when('/service/tracking',{
                templateUrl:'/service/tracking'
            })
            .when('/sales/edit',{
                templateUrl:'/sales/edit'
            })
            .when('/sales/view',{
                templateUrl:'/sales/view'
            })
            .when('/payment/view',{
                templateUrl:'/payment/view'
            })
            .when('/payment/eidt',{
                templateUrl:'/payment/eidt'
            })
            .when('/service/noticeError',{
                templateUrl:'/service/noticeError'
            })
            .when('/service/addNewUser',{
                templateUrl:'/service/addNewUser'
            })
            .when('/demo/validate',{
                templateUrl:'/demo/validate'
            })
            .when('/demo/form',{
                templateUrl:'/demo/form'
            })

//            .otherwise({ redirectTo:'/home'});
    });
})();