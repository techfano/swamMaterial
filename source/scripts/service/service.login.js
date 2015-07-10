
(function() {
	'use strict';
	angular.module('module.service.login', [])

	.service('loginService', ['$resourceService', function ($resourceService) {

			this.login=function(query,fnSuccess,fnError){
				
				var auth = $resourceService.request('auth');

				return auth.get(query,fnSuccess,fnError);

			};
			

	}]);

})();