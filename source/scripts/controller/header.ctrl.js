(function() {
  'use strict';
  angular.module('module.controller.header', [])
    .controller('controllerHeader', controllerHeader); 

    controllerHeader.$inject=[
    	'$scope',
    	'$mdSidenav',
      '$mdUtil',
      '$log',
      '$state'
    ];

    function controllerHeader($scope,$mdSidenav,$mdUtil,$log,$state) {
      
      
      $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');
      $scope.state = $state;

      $scope.goBack = function(){
        $state.go('today');
      };

      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
              $mdSidenav(navID)
                .toggle()
                .then(function () {
                  $log.debug("toggle " + navID + " is done");
                });
            },300);
        return debounceFn;
      }
    	
    }
    
})();