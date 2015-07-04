(function() {
  'use strict';
  angular.module('module.demo', [])
    .controller('demo.ctrl', function($scope) {
      $scope.isOpen = false;
      $scope.demo = {
        isOpen: false,
        count: 0,
        selectedAlignment: 'md-left'
      };
    });
})();