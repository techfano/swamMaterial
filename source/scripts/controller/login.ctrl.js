(function() {
  'use strict';
  angular.module('module.controller.login', [])
    .controller('controller.login', controllerLogin); 

    controllerLogin.$inject=[
    	'$scope',
    	'$resourceService',
      '$state',
      'loginService'
    ];

    function controllerLogin($scope,$resourceService,$state,loginService) {

      $scope.getSignIn=function(user){
        
        $scope.loading=true;

      	loginService.login(user,function(){
        
          $state.go('dashboard');
      	
        },function(){
        
          $scope.loading=false;
        
        });

      };
      
    }
    
})();