(function() {
  'use strict';

  	angular.module('module.constant.resource', [])

	.constant('resourceServiceConfig',{

        auth:{
       		url:'api/auth/login/:name/:password',
       		params:{
       			name:'@name',
       			password:'@password'
       		},
       		actions:{
       			'get':   {method:'GET'}
       		}
       	},

        paragraphAll:{
          url:'api/paragraph/get/all',
          params:{
          },
          actions:{
            'get':   {method:'GET', isArray:true}
          }
        },

        paragraphUrl:{
          url:'api/paragraph/get/url/:url',
          params:{
            url:'@url'
          },
          actions:{
            'get':   {method:'GET', isArray:true}
          }
        },

        postAll:{
          url:'api/post/get/all',
          params:{
          },
          actions:{
            'get':   {method:'GET', isArray:true}
          }
        },

        postUrl:{
          url:'api/post/get/url/:url',
          params:{
            url:'@url'
          },
          actions:{
            'get':   {method:'GET', isArray:true}
          }
        },

        create:{
          url:'api/user/create',
          actions:{
            'save':   {method:'POST'}
          }
        },

        verify:{
          url:'api/auth/verify',
          actions:{
            'get':   {method:'GET'}
          }
        }
    });

})();