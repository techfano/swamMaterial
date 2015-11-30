(function() {
  'use strict';
  angular.module('module.controller.uiWizard', [])
    .config(function($stateProvider){
      $stateProvider.state('uiWizard', {
          parent: 'root',
          url: "/uiWizard",
          templateUrl: "views/uiWizard.view.html",
          controller: "controller.uiWizard"
      });
    })
    .controller('controller.uiWizard', controllerPost); 

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

      
      $scope.userConf1 = {

        parameters:{
          
        },

        headerDefine:[
          {obj: "name", title: "Names"},
          {obj: "lastName", title: "Last names"},
          {obj: "username", title: "User name"}
        ],

        request: $resourceService.request('user')

      };

      $scope.userConf2 = {

        parameters:{
          
        },
        sorting:true,
        headerDefine:[
          {obj: "name", title: "Names"},
          {obj: "lastName", title: "Last names"},
          {obj: "username", title: "User name"}
        ],

        request: $resourceService.request('user')

      };
      
    }
    
})();