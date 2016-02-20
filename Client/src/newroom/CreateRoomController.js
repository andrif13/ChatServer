'use strict';

chatApp.controller("CreateRoomController", ["$scope", "$routeParams", "socket", "$window", "$location",	
	function ($scope, $routeParams, socket, $window, $location){
		$scope.newRoomName = "";
		$scope.newRoomPassword = "";
		$scope.newtopic = "";
		$scope.user = $routeParams.user;
		$scope.create = function(){
			/*console.log('create');
			console.log($scope.newtopic);
			console.log($scope.newroompassword);
			console.log($scope.newroomname);
			console.log($scope.user);*/

			var newRoom = {room: $scope.newRoomName, pass: $scope.newRoomPassword};
			//console.log(newRoom);
			socket.emit('joinroom', newRoom, function (available, error){
				console.log('inni socket.emit');
				if(available){
					console.log('sucessfully created a new room');
					$location.path("/rooms/" + $scope.user + "/" + $scope.newRoomName);
				} else {
					console.log('unsucessfully created a new room :( :( :(');
				}
			});
		};
}]);