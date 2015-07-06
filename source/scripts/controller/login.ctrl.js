(function() {
  'use strict';
  angular.module('module.controller.login', [])
    .controller('controller.login', controllerLogin); 

    controllerLogin.$inject=[
    	'$scope',
    	'$resourceService'
    ];

    function controllerLogin($scope,$resourceService) {
    console.log($resourceService);
    	var auth = $resourceService.request('auth');
      $scope.getSignIn=function(user){
        
      	auth.get(user,function(){

      	});

      };
    }
    
})();