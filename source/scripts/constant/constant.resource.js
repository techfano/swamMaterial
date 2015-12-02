(function() {
  'use strict';

  	angular.module('module.constant.resource', [])

	.constant('resourceServiceConfig',{

        user:{
       		url:'api/user',
       		params:{
       		},
       		actions:{
       			'get':   {method:'GET',isArray:true}
       		}
       	},

        author:{
          url:'api/author',
          params:{
          },
          actions:{
            'get':   {method:'GET',isArray:true}
          }
        }
       
    });

})();