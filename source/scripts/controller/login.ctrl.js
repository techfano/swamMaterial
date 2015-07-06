(function() {
  'use strict';
  angular.module('module.controller.login', [])
    .controller('controller.login', controllerLogin); 

    controllerLogin.$inject=[
    	'$scope',
    	'$resourceService',
      '$state'
    ];

    function controllerLogin($scope,$resourceService,$state) {

    	var auth = $resourceService.request('auth');

      $scope.getSignIn=function(user){
        $scope.loading=true;
      	auth.get(user,function(){
          $state.go('dashboard');
      	},function(){
          $scope.loading=false;
        });

      };
    }
    
})();