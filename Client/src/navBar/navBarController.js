'use strict';

chatApp.controller("navBarController", ["$scope", "$location", "socket", "$routeParams",
	function ($scope, $location, socket, $routeParams){

		$scope.logOutServer = function(){
			console.log("logOutServer");
			socket.emit('disconnect');
			$location.path("/");
		};

}]);