'use strict';

chatApp.controller("RoomlistController", ["$scope", "$location", "socket", "$routeParams",
	function ($scope, $location, socket, $routeParams){


		$scope.user === $routeParams.users;

		$scope.logOutServer = function(){
			console.log("logOutServer");
			socket.emit('disconnect');
			$location.path("/");
		};



}]);