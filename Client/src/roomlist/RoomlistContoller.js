'use strict';

chatApp.controller("RoomlistController", ["$scope", "$location", "socket", 
	function ($scope, $location, socket){
		/*$scope.roomlist = [ {
		name: "Spjall um Raudrofusafa",
		id: 1
	}, {
		name: "ANDRI",
		id: 2
	}];*/
		$scope.roomlist = socket.emit("rooms");
		console.log($scope.roomlist);
}]);