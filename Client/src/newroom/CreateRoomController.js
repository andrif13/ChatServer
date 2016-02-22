'use strict';

chatApp.controller("CreateRoomController", ["$scope", "$routeParams", "socket", "$window", "$location",	"$timeout",
	function ($scope, $routeParams, socket, $window, $location, $timeout){
		$scope.newRoomName = "";
		$scope.newRoomPassword = "";
		$scope.newTopic = "";
		$scope.user = $routeParams.user;
		$scope.showError = false;
		$scope.doFade = false;
		socket.emit("rooms");
		var roomList = "";
		socket.on("roomlist", function(roomlist){
			console.log("rooms ", _.keys(roomlist));
			roomList = _.keys(roomlist);
		});
		$scope.create = function(){
			$scope.showError = false;
			$scope.doFade = false;
			$scope.showError = true;
			var found = $.inArray($scope.newRoomName, roomList);
			if($scope.newRoomName === ""){
				$scope.errorMessage = "You have to put in some name of the room!!";
				$timeout(function(){
					$scope.doFade = true;
				}, 2500);
			} else if (found !== -1){
				$scope.errorMessage = "There is room already named that!!";
				$timeout(function(){
					$scope.doFade = true;
				}, 2500);
			}
			else {
				var newRoom = {room: $scope.newRoomName, pass: $scope.newRoomPassword};
				socket.emit('joinroom', newRoom, function (available, error){
					if(available){
						if($scope.newRoomPassword !== ""){
							var passObj = {
								room: $scope.newRoomName,
								password: $scope.newRoomPassword
							};
							socket.emit('setpassword', passObj, function(sucess){
								if(sucess){
									$scope.newRoomPassword = "";
								} else {
								}
							});
						}
						if($scope.newTopic !== ""){
							var topicObj = {
								room: $scope.newRoomName,
								topic: $scope.newTopic
							};
							socket.emit('settopic', topicObj, function(success){
								if(success){
									$scope.newTopic = "";
								} else {
								}
							});
						}
						$location.path("/rooms/" + $scope.user + "/" + $scope.newRoomName);
					} else {
						$scope.errorMessage = "Something went wrong!!";
						$timeout(function(){
							$scope.doFade = true;
						}, 2500);
					}
				});
			}
		};
}]);