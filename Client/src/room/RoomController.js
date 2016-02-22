'use strict';

chatApp.controller("RoomController", ["$scope", "$routeParams", "socket", "$location", "$timeout",
	function ($scope, $routeParams, socket, $location, $timeout){
		$scope.currUser = $routeParams.user;
		$scope.roomname = $routeParams.id;
		$scope.isAdmin = false;
		$scope.displaySuccess = false;
		$scope.adminsInRoom = "";
		$scope.glued = true;
		$scope.show = false;
		$scope.unbanshow = false;
		$scope.newTopic = "";
		$scope.topic = "";
		$scope.roomPassword = "";
		var counter = 1;
		$scope.isPrv = false;
		$scope.privmessage = "";
		$scope.GetPrv = false;
		$scope.ServMessage = "";
		var bannedList = [];
		$scope.showError = false;
		$scope.doFade = false;


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
				$scope.sucessMessage = "You have been kicked from the room!";
				$scope.showError = false;
				$scope.doFade = false;
				$scope.showError = true;
				$timeout(function(){
					$scope.doFade = true;
					$location.path("rooms/" + $scope.currUser);
				}, 2500);
			}
		});

		socket.on('banned', function(room, userBanned, banner){
			if($routeParams.user === userBanned && room === $scope.roomname && $routeParams.user !== banner){
				$scope.sucessMessage = "You have been banned from the room!";
				$scope.showError = false;
				$scope.doFade = false;
				$scope.showError = true;
				$timeout(function(){
					$scope.doFade = true;
					$location.path("rooms/" + $scope.currUser);
				}, 2500);
			}
		});
		socket.on('servermessage', function(servMessage, room, servUser){
			if(room == $scope.roomname){
				if(servMessage == "part"){
					$scope.ServMessage = servUser + " has left " + room;
				}
				if(servMessage == "quit"){
					$scope.ServMessage = servUser + " has disconnected";
				}
				if(servMessage == "join"){
					$scope.ServMessage = servUser + " has joined " + room;
				}
				if(servMessage == "kick"){
					$scope.ServMessage = servUser + " has been kicked from " + room;
				}
				if(servMessage == "op"){
					$scope.ServMessage = servUser + " has been made op of " + room;
				}
				if(servMessage == "deop"){
					$scope.ServMessage = servUser + " is no longer op " + room;
				}
				if(servMessage == "ban"){
					$scope.ServMessage = servUser + " has been banned from " + room;
				}
				if(servMessage == "unban"){
					$scope.ServMessage = servUser + " has been unbanned from " + room;
				}

			}
		});
		
		socket.on('updatetopic', function (room, topic, user) {
			$scope.topic = topic;
			console.log("UpdateTopic");
			console.log('Room: ',room);
			console.log('Topic: ', topic);
			console.log('User: ', user);
		});

		$scope.$on("$destroy", function() {
			console.log('destroy og roomname er: ', $scope.roomname);
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
		$scope.roomSettings = function(){
			counter++;
			if(counter%2===0){
				$scope.show = true;
			} else {
				$scope.show = false;
			}
		}


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
			bannedList.push(banObj);
			console.log("Banned list: ", bannedList);
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
		$scope.unban = function(){
			console.log("Unbannn");
			counter++;
			if(counter%2===0){
				$scope.unbanshow = true;
			} else {
				$scope.unbanshow = false;
			}
			$scope.bannedUserList = _(bannedList).filter(c => c.room = $scope.roomname).map(c => c.user).value();
			console.log("User list yfir banned user í þessu roomi : ", $scope.bannedUserList);
		};
		$scope.unbanUser = function(user){
			var unbanObj ={
				user: user,
				room: $scope.roomname
			}
			for(var i = 0; i < bannedList.length; i++){
				if(bannedList[i].user === user && bannedList[i].room === $scope.roomname){
					bannedList.splice(i,1);
				}

			};
			console.log("Hvað er eftir í bannedList",bannedList);
			socket.emit('unban', unbanObj, function(success){
				if(success){
					console.log(user, "was unbanned");
				}
			});
		};

		$scope.deopUser = function(user){
			var deopObj = {
				user : user,
				room : $scope.roomname
			};
			socket.emit('deop', deopObj)
		};
		$scope.leaveRoom = function(){
			socket.emit('partroom', $scope.roomname);
			$location.path('rooms/' + $scope.currUser);
		};

		$scope.submit = function(){
			console.log("Topic: ", $scope.newTopic);
			console.log("Password: ", $scope.roomPassword);
			if($scope.newTopic === ""){
				console.log('roomtopic has to have string');
			} else {
				var topicObj = {
					room: $scope.roomname,
					topic: $scope.newTopic
				};
				socket.emit('settopic', topicObj, function(success){
					if(success){
						console.log('Successfully changed topic');
						$scope.newTopic = "";
					} else {
						console.log('Unsuccessfully changed topic');

					}
				});
			}
			if($scope.roomPassword === ""){
				console.log("password is empty");
			} else {
				var passObj = {
					room: $scope.roomname,
					password: $scope.roomPassword
				};
				console.log('PASSWORD OBJECT');
				console.log(passObj);
				socket.emit('setpassword', passObj, function(sucess){
					if(sucess){
						console.log('Successfully changed password');
						$scope.roomPassword = "";
					} else {
						console.log('Unsuccessfully changed password');
					}
				})
			}
		};

		$scope.removePassword = function (){
			var removePasswordObj = {
				room: $scope.roomname
			};
			socket.emit('removepassword', removePasswordObj, function(success){
				if(success){
					console.log('Successfully removed password');
				} else {
					console.log('Unsuccessfully removed password');
				}
			})
		};
}]);