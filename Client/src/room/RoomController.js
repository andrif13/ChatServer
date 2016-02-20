'use strict';

chatApp.controller("RoomController", ["$scope", "$routeParams", "socket", "$location",
	function ($scope, $routeParams, socket, $location){
		$scope.currUser = $routeParams.user;
		$scope.roomname = $routeParams.id;
		$scope.isAdmin = false;
		$scope.displaySuccess = false;
		$scope.adminsInRoom = "";
		$scope.glued = true;
		$scope.isPrv = false;
		$scope.privmessage = "";
		$scope.GetPrv = false;


		var room_obj = {
			room: $scope.roomname,
		}

		socket.emit('hasjoined', room_obj);
		
		socket.on('updatechat', function(room, messages){
			//console.log("messages: " + messages);
			$scope.messageInRoom = messages;

		});


		socket.on('updateusers', function(room, user, admins){
			$scope.userlist = _.keys(user);
			$scope.adminsInRoom = admins;
			if(admins[$scope.currUser] === $scope.currUser){
				$scope.isAdmin = true;
				console.log($scope.currUser, " is Admin in this room");
			} else {
				$scope.isAdmin = false;
				console.log($scope.currUser, " is NOT Admin in this room");
			}
			console.log("OPS: ", $scope.adminsInRoom);
		});

		socket.on('kicked', function(room, userKicked, kicker){
			if($routeParams.user === userKicked && room === $scope.roomname && $routeParams.user !== kicker){
				$scope.displaySuccess = true;
				$scope.sucessMessage = "You have been kicked";
				$location.path("rooms/" + $scope.currUser);
			}
		});

		socket.on('banned', function(room, userBanned, banner){
			if($routeParams.user === userBanned && room === $scope.roomname && $routeParams.user !== banner){
				$location.path("rooms/" + $scope.currUser);
			}
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

		$scope.kickUser = function(user){
			//console.log('User i kickUser: ', user);
			var kickObj = {
				user: user,
				room: $scope.roomname
			};
			console.log('kickobj: v');
			console.log(kickObj.user);
			socket.emit('kick', kickObj, function(success){
				if(success){
					console.log(user, " was kicked!!");
				}
			});
		};

		$scope.banUser = function(user){
			var banObj = {
				user: user,
				room: $scope.roomname
			};
			socket.emit('ban', banObj, function(success){
				if(success){
					console.log(user, " was banned!!");
				}
			});
		};

		$scope.opUser = function(user){
			var opObj = {
				user: user,
				room: $scope.roomname
			};
			socket.emit('op', opObj, function(success){
				if(success){
					console.log(user, " was opped!!");
				}
			});
		};
		
		$scope.leaveRoom = function(){
			socket.emit('partroom', $scope.roomname);
			$location.path('rooms/' + $scope.currUser);
		};
}]);