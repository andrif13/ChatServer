'use strict';

chatApp.controller("RoomController", ["$scope", "$routeParams", "socket", "$location",
	function ($scope, $routeParams, socket, $location){
		$scope.currUser = $routeParams.user;
		$scope.roomname = $routeParams.id;

		var room_obj = {
			room: $scope.roomname,
		}

		socket.emit('hasjoined', room_obj);
		socket.on('updatechat', function(room, messages){
			console.log("messages: " + messages);
			$scope.messageInRoom = messages;
		});
		socket.on('updateusers', function(room, user, admin){
			$scope.userlist = _.keys(user);
			console.log($scope.userlist);
		});

		
		$scope.sendMessage = function(){
			if($scope.newmessage == ""){
			} else {
				console.log('sendMessage');	
				var data = {
					msg: $scope.newmessage,
					roomName: $scope.roomname
				};
				socket.emit('sendmsg', data);
				$scope.newmessage = "";
			}
		};


}]);