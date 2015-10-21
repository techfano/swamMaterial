(function() {
  'use strict';
  angular.module('module.controller.paragraph', [])
    .controller('controller.paragraph', controllerParagraph); 

    controllerParagraph.$inject=[
    	'$scope',
    	'$resourceService',
      '$stateParams',
      '$sce',
      '$state'
    ];

    function controllerParagraph($scope,$resourceService,$stateParams,$sce,$state) {

      var paragraphUrl =  $resourceService.request('paragraphUrl');
      var postUrl =  $resourceService.request('postUrl');

      postUrl.get({url:$stateParams.url},function(data){
        $scope.post = data[0];
      });

      paragraphUrl.get({url:$stateParams.url},function(data){
        $scope.articles = data;
      });

      $scope.trustHtml = function(data){
        return $sce.trustAsHtml(data);
      };
      
    }
    
})();