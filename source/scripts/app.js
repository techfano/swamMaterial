(function() {

    var app = angular.module('app', [
        'ngRoute',
        'ngResource',
        'ngMaterial',
        'ui.router',
        'application.controller',
        'application.factory',
        'application.service',
        'application.constant'
    ]);


    app.config(function ($stateProvider, $urlRouterProvider,$httpProvider,$mdThemingProvider,$mdIconProvider) {

        $stateProvider.state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            controller: "dashboardCtrl"
        })
        .state('default', {
            abstract: true,
            templateUrl: "views/default.html",
            controller: "defaultCtrl"
        })
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: "loginCtrl"
        })
        .state('user', {
            parent:'default',
            url: "/user",
            templateUrl: "views/user.html",
            controller: "userController",
            controllerAs: "ul"
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
                      .defaultIconSet("assets/svg/avatars.svg", 128)
                      .icon("menu"       , "assets/svg/menu.svg"        , 24)
                      .icon("share"      , "assets/svg/share.svg"       , 24)
                      .icon("google_plus", "assets/svg/google_plus.svg" , 512)
                      .icon("hangouts"   , "assets/svg/hangouts.svg"    , 512)
                      .icon("twitter"    , "assets/svg/twitter.svg"     , 512)
                      .icon("phone"      , "assets/svg/phone.svg"       , 512);

                      $mdThemingProvider.theme('default')
                          .primaryPalette('blue')
                          .accentPalette('red');
        
    });

    app.run( function( $rootScope ,$resource, $state) {


        var checkingSession = function(){

            var token=localStorage.getItem('token');

            var verify = $resource('http://localhost:4000/api/auth/verify/'+token);

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
            
            //checkingSession();
           
        });

    });


})();