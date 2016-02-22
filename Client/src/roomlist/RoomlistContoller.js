'use strict';

chatApp.controller("RoomlistController", ["$scope", "$location", "socket", "$routeParams",
	function ($scope, $location, socket, $routeParams){
		var pass, a = "";
		socket.emit("users");

		socket.on('userlist', function(userlist){
			//console.log('UserList: ' + userlist);
			$scope.users = userlist;
		});

		socket.emit("rooms");
		
		$scope.roomlist = [];
		$scope.user = $routeParams.user;


		$scope.joinRoom = function(roomname){
			console.log('HEeeeeeeeeeeeeeeeeeer');
			var array = [];
			array.push(a);
			console.log(array);
			var result = array.map(_.property(roomname)) // => [1, 3]
			console.log(result);
			if(result.indexOf("") !== 0){
				
			}
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


		var functionToBeCalledWhenRoomListChanges = function(roomlist){
			console.log('-----------------------------');
			console.log(roomlist);
			a = _.mapValues(roomlist, 'password');
			console.log('A: ', a);
			$scope.roomlist = roomlist;
			$scope.roomname = _.keys(roomlist);
			console.log($scope.roomname);
		}
		socket.on("roomlist", functionToBeCalledWhenRoomListChanges);
}]);