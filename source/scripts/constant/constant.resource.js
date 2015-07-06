(function() {
  'use strict';

  	angular.module('module.constant.resource', [])

	.constant('resourceServiceConfig',{

		baseUrl:'http://localhost:4000/',

        auth:{
       		url:'api/auth/login/:name/:password',
       		params:{
       			name:'@name',
       			password:'@password'
       		},
       		actions:{
       			'get':   {method:'GET'}
       		}
       	}
    });

})();