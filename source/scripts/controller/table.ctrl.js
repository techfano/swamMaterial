(function() {
  'use strict';
  angular.module('module.controller.uiTable', [])
    .controller('controller.uiTable', controllerPost); 

    controllerPost.$inject=[
    	'$scope',
    	'$resourceService',
      '$state',
      'loginService',
      'serviceStorage'
    ];

    function controllerPost($scope,$resourceService,$state) {


      $scope.list=[
        {"1":"1","2":"A","3":"9","4":"Z"},
        {"1":"2","2":"B","3":"8","4":"Y"},
        {"1":"3","2":"C","3":"7","4":"X"},
        {"1":"4","2":"D","3":"6","4":"W"},
        {"1":"5","2":"E","3":"5","4":"V"}
      ];

      
      var userConf = {

        parameters:{
          headerDefine:[]//review
        }

      };

      var users =  $resourceService.request('user');

      /*$scope.gotoArticle = function(url){
        $state.search('article',{url:url});
      };*/
      
    }
    
})();