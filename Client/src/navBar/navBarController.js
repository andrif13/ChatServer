'use strict';

chatApp.controller("navBarController", ["$scope", "$location", "socket", "$routeParams",
	function ($scope, $location, socket, $routeParams){
		$scope.logOutServer = function(){
			socket.emit("dis",$routeParams.user);
			console.log("logOutServer" + $routeParams.user);
			$location.path("/");
		};

		$scope.homeButton = function(){
			console.log("HOMEBUTTON");
			$location.path("/rooms/" + $routeParams.user);

		}

}]);