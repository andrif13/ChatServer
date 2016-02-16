'use strict';

chatApp.controller("RoomlistController", 
	["$scope", "$location", "socket", 
	function RoomlistController($scope, $location, socket){
 
		socket.emit("rooms");

		var functionToBeCalledWhenRoomlistChanges = function(roomlist){
			console.log(roomlist);
			$scope.$apply(function() {
				$scope.roomlist = roomlist;
			});

		}

		socket.on("roomlist", functionToBeCalledWhenRoomlistChanges);
}]);