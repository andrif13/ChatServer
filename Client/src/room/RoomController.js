'use strict';

chatApp.controller("RoomController", ["$scope", "$routeParams", "socket","$location",
	function ($scope, $routeParams, socket, $location){
		$scope.currUser = $routeParams.user;
		$scope.roomname = $routeParams.id;
		$scope.isPrv = false;
		$scope.privmessage = "";
		$scope.GetPrv = false;

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
		socket.on('recv_privatemsg', function (sender, rMessage){
		$scope.GetPrv = true;
		$scope.recvMessage = rMessage;
		$scope.fromUser = sender;
		console.log("RECIVEDMESSAGE", rMessage);
		});
		
		$scope.dismiss = function(){
			$scope.GetPrv = false;
		};
		
		$scope.privateMessage = function(rUser){
			$scope.GetPrv = false;
			$scope.recvUser = rUser;
			console.log(rUser + "   Senda private");
			if(rUser == $scope.currUser){
			}
			else{
				console.log("inní drasli");
				$scope.isPrv = true;
				$scope.sendPrvMessage = function(){
					if($scope.privmessage == ""){
						console.log("auttt");
					}
					else{
						console.log("hello");
							var data = {
								nick : rUser,
								message : $scope.privmessage
							};
							console.log(data);
							socket.emit('privatemsg', data)
							$scope.isPrv = false;
					}
				}
				
			}
		};

}]);