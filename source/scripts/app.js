(function() {

    var app = angular.module('app', [
        'ngRoute',
        'ngResource',
        'ngMaterial',
        'ui.router',
        'module.controller',
        'module.service',
        'module.constant'
    ]);


    app.config(function ($stateProvider, $urlRouterProvider,$httpProvider,$mdThemingProvider,$mdIconProvider) {

        $stateProvider.state('init', {
            abstract: true,
            views: {
              'content@': {
                template: '<ui-view />', // NEW line, with a target for a child
              }
            }
        }).state('root', {
            abstract: true,
            views: {
              '@': {
                template: '<ui-view />', // NEW line, with a target for a child
              },
              'header@': {
                templateUrl: 'views/header.view.html',
                controller: 'controllerHeader'
              },
              'content@': {
                templateUrl: 'views/leftSide.view.html',
                controller: 'controller.leftSide',
              }
            }
        }).state('login', {
            parent:'init',
            url: "/login",
            templateUrl: "views/login.view.html",
            controller: "controller.login"
        }).state('dashboard', {
            parent: 'root',
            url: "/dashboard",
            templateUrl: "views/dashboard.view.html"
        });

        $urlRouterProvider.otherwise("/login");
        
        $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
            return {
                    'request': function (config) {
                        config.headers = config.headers || {};
                        if (localStorage.getItem("token")) {
                            config.headers.Authorization = localStorage.getItem("token");
                        }
                        return config;
                    },
                    'responseError': function(response) {

                        if(response.status === 401 || 
                           response.status === 403 || 
                           response.status === 500 || 
                           response.status===0) {

                            //$location.path('/login');
                        
                        }
                        return $q.reject(response);
                    }
            };
        }]);

        $mdIconProvider
                      .defaultIconSet("svg/avatars.svg", 128)
                      .icon("menu"       , "svg/menu.svg"        , 24)
                      .icon("share"      , "svg/share.svg"       , 24)
                      .icon("google_plus", "svg/google_plus.svg" , 512)
                      .icon("hangouts"   , "svg/hangouts.svg"    , 512)
                      .icon("twitter"    , "svg/twitter.svg"     , 512)
                      .icon("phone"      , "svg/phone.svg"       , 512);

                      $mdThemingProvider.theme('default')
                          .primaryPalette('blue')
                          .accentPalette('red');
        
    });

    app.run( function( $rootScope ,$resource, $state) {


        var checkingSession = function(){

            var verify = $resourceService.request('verify');

            if(token){

              verify.get(function(verify){
                  $state.go('dashboard');
              },function(error){
                  $state.go('login');
              });              

            }else{
              $state.go('login');
            }

        };
        
        $rootScope.$on('$stateChangeStart',function(obj,data){
            
            checkingSession();
           
        });

    });


})();