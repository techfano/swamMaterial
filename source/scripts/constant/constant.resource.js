(function() {
  'use strict';

  	angular.module('module.constant.resource', [])

	.constant('resourceServiceConfig',{

		baseUrl:'http://www.prodesign.pe/',

        auth:{
       		url:'api/auth/login/:name/:password',
       		params:{
       			name:'@name',
       			password:'@password'
       		},
       		actions:{
       			'get':   {method:'GET',}
       		}
       	},
        create:{
          url:'api/user/create',
          actions:{
            'save':   {method:'POST',}
          }
        }
    });

})();