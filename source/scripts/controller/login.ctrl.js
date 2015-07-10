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

      var create = $resourceService.request('create');

      $scope.getSignIn=function(user){
        $scope.loading=true;
      	auth.get(user,function(){
          $state.go('dashboard');
      	},function(){
          $scope.loading=false;
        });

      };

      $scope.create = function(){

          var user = {
          "username":"techfano",
          "password": "Estef4n0",
          "email": "mixc21@gmail.com",
          "name": "Estefano Castañeda",
          "admin": true,
          "root": true,
          "lastName": "Castañeda Bello",
          "birthDay": "1984-04-09",
          "location": "PERU",
          "created_at": "2015-07-10"
        };

        create.save(user,function(){
          $state.go('dashboard');
        },function(){
          $scope.loading=false;
        });

      };
      
    }
    
})();