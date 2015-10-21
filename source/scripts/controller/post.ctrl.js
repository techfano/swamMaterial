(function() {
  'use strict';
  angular.module('module.controller.post', [])
    .controller('controller.post', controllerPost); 

    controllerPost.$inject=[
    	'$scope',
    	'$resourceService',
      '$state',
      'loginService',
      'serviceStorage'
    ];

    function controllerPost($scope,$resourceService) {

      var postAll =  $resourceService.request('postAll');

      postAll.get(function(data){
        $scope.publications = data;
      });
      
    }
    
})();