'use strict';

chatApp.controller("RoomlistController", ["$scope", "$location", "socket", "$routeParams",
	function ($scope, $location, socket, $routeParams){
		
		socket.emit("rooms");
		
		$scope.roomlist = [];
		$scope.user = $routeParams.user;

		var functionToBeCalledWhenRoomListChanges = function(roomlist){
			$scope.roomlist = roomlist;

		}
		socket.on("roomlist", functionToBeCalledWhenRoomListChanges);
}]);