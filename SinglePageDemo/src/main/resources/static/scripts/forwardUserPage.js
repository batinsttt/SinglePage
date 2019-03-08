// Code goes here

(function () {

    var app = angular.module('contentApp',['ngRoute']);
    
    app.config(function ($routeProvider){
        $routeProvider
            .when('/home',{
                templateUrl:'/home'
            })
            .when('/channel',{
                templateUrl:'/channelManager'
            })
             .when('/channel/detail',{
                templateUrl:'/channel/detail'
            })
            .when('/ticket/tickets',{
                //templateUrl:'/ticket/create',
                templateUrl:'/ticket/tickets'
            })
            
            .when('/ticket/blockOpenChannel',{
                //templateUrl:'/ticket/create',
                templateUrl:'/ticket/blockOpenChannel'
            })
            .when('/ticket/createRequestChangeOther',{
                templateUrl:'/ticket/createRequestChangeOther'
            })
            .when('/ticket/createRequestChangeOtherDetail',{
                templateUrl:'/ticket/createRequestChangeOtherDetail'
            })
            // =============== area for service error report =============================
            .when('/problem',{
                templateUrl:'/problem'
            })
//            =============== area demo =============================
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
            .when('/service/createservicehandl',{
                templateUrl:'/service/createservicehandl'
            })
            .when('/demo/validate',{
                templateUrl:'/demo/validate'
            })
            .when('/demo/form',{
                templateUrl:'/demo/form'
            })
            .when('/account/changePass',{
                templateUrl:'/account/changePass'
            })
//            .otherwise({ redirectTo:'/home'});
    });
})();