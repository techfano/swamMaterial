(function() {
  'use strict';
  angular.module('module.demo', [])
    .controller('demo.ctrl', demoCtrl); 

    function demoCtrl($scope) {
      $scope.getSignIn=function(user){
        console.info(user);
      }
    }
    
})();