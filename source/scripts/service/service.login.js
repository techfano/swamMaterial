
(function() {
	'use strict';
	angular.module('module.service.login', [])

	.service('loginService', ['$resourceService', function ($resourceService) {

			this.signIn=function(query,fnSuccess,fnError){
				console.log($resourceService);

				var auth = $resourceService.request('auth');

				return auth.get(query,fnSuccess,fnError);

			};
			

	}]);

})();