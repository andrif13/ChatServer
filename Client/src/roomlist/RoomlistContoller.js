'use strict';

chatApp.controller("RoomlistController", ["$scope", "$location", "socket", "$routeParams",
	function ($scope, $location, socket, $routeParams){
		var pass = "";
		socket.emit("users");

		socket.on('userlist', function(userlist){
			//console.log('UserList: ' + userlist);
			$scope.users = userlist;
		});

		socket.emit("rooms");
		
		$scope.roomlist = [];
		$scope.user = $routeParams.user;


		$scope.joinRoom = function(roomname){
			var pass = prompt("Enter room password");
			console.log(pass);
			socket.emit('joinroom', { room: roomname, pass: pass}, function(success, errorMessage){
				if(success){
					console.log('sucessfully joined a room');
					$location.path("rooms/" + $scope.user + "/" + roomname);
				}
				else{
					if(errorMessage === 'banned'){
						console.log('you are banned from the room');
					} else if(errorMessage === 'wrong password'){
						console.log('wrong password');
					}
					console.log('could not connect');
				}					
			});
		};

		$scope.createNewRoom = function(){
			//console.log('createNewRoom');
			$location.path("createroom/" + $scope.user);
		};

		$scope.logOutServer = function(){
			console.log("logOutServer");
			socket.emit('disconnect');
			$location.path("/");
		};

		var functionToBeCalledWhenRoomListChanges = function(roomlist){
			console.log('-----------------------------');
			console.log(roomlist);
			$scope.roomlist = roomlist;
			//console.log("Roomlist:");
			//console.log($scope.roomlist);
			$scope.roomname = _.keys(roomlist);
			console.log($scope.roomname);
			//console.log("Roomnames:");
			//console.log($scope.roomname);
		}
		socket.on("roomlist", functionToBeCalledWhenRoomListChanges);
}]);