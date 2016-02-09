angular.module("chatApp").controller("RoomlistController",
	function RoomlistController() {
		$scope.roomlist = [ {
			name: "Spjall um Raudrofusafa",
			id: 1
		}, {
			name: "ANDRI",
			id: 2
		}];
	})