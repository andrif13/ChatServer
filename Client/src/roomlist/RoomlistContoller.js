'use strict';

chatApp.controller("RoomlistController", ["$scope", "$location", "socket", "$routeParams", "$timeout",
	function ($scope, $location, socket, $routeParams, $timeout){
		var pass, a = "";
		socket.emit("users");
		var needPassword = false;
		var chosenRoom = "";
		var roomObj = "";
		$scope.enteredPassword = "";
		$scope.showError = false;
		$scope.doFade = false;

		socket.on('userlist', function(userlist){
			$scope.users = userlist;
		});

		socket.emit("rooms");
		
		$scope.roomlist = [];
		$scope.user = $routeParams.user;

		$scope.chosenRoom = function(roomname){
			chosenRoom = roomname;
		};

		$scope.joinRoom = function(){
			var roomname = chosenRoom;
			var array = [];
			array.push(a);
			console.log(array);
			var result = array.map(_.property(chosenRoom));
			if(result[0] !== 0){
				roomObj = {
					room: chosenRoom,
					pass: $scope.enteredPassword
				};
			} else {
				roomObj = {
					room: chosenRoom,
					pass: ""
				};
			}
			socket.emit('joinroom', roomObj, function(success, errorMessage){
				if(success){
					console.log('sucessfully joined a room');
					$location.path("rooms/" + $scope.user + "/" + roomname);
				}
				else{
					$scope.showError = false;
					$scope.doFade = false;
					$scope.showError = true;
					if(errorMessage === 'banned'){
						$scope.errorMessage = "you are banned from the room";
						$timeout(function(){
							$scope.doFade = true;
						}, 2500);
					} else if(errorMessage === 'wrong password'){
						$scope.errorMessage = "wrong password";
						$timeout(function(){
							$scope.doFade = true;
						}, 2500);
					}
					console.log('could not connect');
				}
			});
		};

		$scope.createNewRoom = function(){
			//console.log('createNewRoom');
			$location.path("createroom/" + $scope.user);
		};


		var functionToBeCalledWhenRoomListChanges = function(roomlist){
			console.log('-----------------------------');
			console.log(roomlist);
			a = _.mapValues(roomlist, 'password');
			console.log('A: ', a);
			$scope.roomlist = roomlist;
			$scope.roomname = _.keys(roomlist);
			console.log($scope.roomname);
		};
			//console.log("Roomnames:");
			//console.log($scope.roomname);
		socket.on("roomlist", functionToBeCalledWhenRoomListChanges);
}]);