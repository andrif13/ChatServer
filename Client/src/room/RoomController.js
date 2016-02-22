'use strict';

chatApp.controller("RoomController", ["$scope", "$routeParams", "socket", "$location", "$timeout",
	function ($scope, $routeParams, socket, $location, $timeout){
		var currUser = $routeParams.user;
		$scope.roomname = $routeParams.id;
		var roomname = $scope.roomname;
		$scope.isAdmin = false;
		$scope.displaySuccess = false;
		$scope.adminsInRoom = "";
		$scope.glued = true;
		$scope.show = false;
		$scope.unbanshow = false;
		var newTopic = "";
		$scope.roomPassword = "";
		var counter = 1;
		var count = 1;
		$scope.isPrv = false;
		var privmessage = "";
		$scope.GetPrv = false;
		var ServMessage = "";
		var bannedList = [];
		$scope.showError = false;
		$scope.doFade = false;


		var room_obj = {
			room: roomname,
		};


		socket.emit('hasjoined', room_obj);
		
		socket.on('updatechat', function(room, messages){
			if(room === roomname){
				$scope.messageInRoom = messages;
			}
		});

		socket.on('updateusers', function(room, user, admins){
			if(room === roomname){
				$scope.userlist = _.keys(user);
				$scope.adminsInRoom = admins;
				if(admins[currUser] === currUser){
					$scope.isAdmin = true;
					console.log(currUser, " is Admin in this room");
				} else {
					$scope.isAdmin = false;
					console.log(currUser, " is NOT Admin in this room");
				}
			}
		});

		socket.on('kicked', function(room, userKicked, kicker){
			if($routeParams.user === userKicked && room === roomname && $routeParams.user !== kicker){
				$scope.sucessMessage = "You have been kicked from the room!";
				$scope.showError = false;
				$scope.doFade = false;
				$scope.showError = true;
				$timeout(function(){
					$scope.doFade = true;
					$location.path("rooms/" + currUser);
				}, 2500);
			}
		});

		socket.on('banned', function(room, userBanned, banner){
			if($routeParams.user === userBanned && room === roomname && $routeParams.user !== banner){
				$scope.sucessMessage = "You have been banned from the room!";
				$scope.showError = false;
				$scope.doFade = false;
				$scope.showError = true;
				$timeout(function(){
					$scope.doFade = true;
					$location.path("rooms/" + currUser);
				}, 2500);
			}
		});
		socket.on('servermessage', function(servMessage, room, servUser){
			if(room == roomname){
				if(servMessage == "part"){
					ServMessage = servUser + " has left " + room;
				}
				if(servMessage == "quit"){
					ServMessage = servUser + " has disconnected";
				}
				if(servMessage == "join"){
					ServMessage = servUser + " has joined " + room;
				}
				if(servMessage == "kick"){
					ServMessage = servUser + " has been kicked from " + room;
				}
				if(servMessage == "op"){
					ServMessage = servUser + " has been made op of " + room;
				}
				if(servMessage == "deop"){
					ServMessage = servUser + " is no longer op " + room;
				}
				if(servMessage == "ban"){
					ServMessage = servUser + " has been banned from " + room;
				}
				if(servMessage == "unban"){
					ServMessage = servUser + " has been unbanned from " + room;
				}
				$scope.ServMessage = ServMessage;
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
			if($scope.newmessage === ""){
			} else {
				console.log('sendMessage');	
				var data = {
					msg: $scope.newmessage,
					roomName: roomname
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
			if(rUser == currUser){
			}
			else{
				console.log("inní drasli");
				$scope.isPrv = true;
				$scope.sendPrvMessage = function(){
					privmessage = $scope.privmessage;
					if(privmessage === ""){
						console.log("auttt");
					}
					else{
						console.log("hello");
							var data = {
								nick : rUser,
								message : privmessage
							};
							console.log(data);
							socket.emit('privatemsg', data);
							$scope.isPrv = false;
					}
				};
				
			}
		};
		$scope.kickUser = function(user){
			if(user === currUser){
			}
			else{//console.log('User i kickUser: ', user);
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
			}
		};

		$scope.banUser = function(user){
			if(user === currUser){
			}
			else{
				var banObj = {
					user: user,
					room: roomname
				};
				bannedList.push(banObj);
				console.log("Banned list: ", bannedList);
				socket.emit('ban', banObj, function(success){
					if(success){
						console.log(user, " was banned!!");
					}
				});
			}
		};

		$scope.opUser = function(user){
			var opObj = {
				user: user,
				room: roomname
			};
			socket.emit('op', opObj, function(success){
				if(success){
					console.log(user, " was opped!!");
				}
			});
		};
		$scope.unban = function(){
			console.log("Unbannn");
			count++;
			if(count%2===0){
				$scope.unbanshow = true;
			} else {
				$scope.unbanshow = false;
			}
			//$scope.bannedUserList = _(bannedList).filter(c => c.room = roomname).map(c => c.user).value();
			var bannedUserList = [];
			for(var i = 0; i<bannedList.length; i++){
				if(bannedList[i].room == roomname){
					bannedUserList.push(bannedList[i].user);
				}
			}
			$scope.bannedUserList = bannedUserList;
			console.log("User list yfir banned user í þessu roomi : ", bannedUserList);
		};
		$scope.unbanUser = function(user){
			var unbanObj ={
				user: user,
				room: roomname
			};

			for(var i = 0; i < bannedList.length; i++){
				if(bannedList[i].user === user && bannedList[i].room === roomname){
					bannedList.splice(i,1);
				}

			}
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
				room : roomname
			};
			socket.emit('deop', deopObj);
		};
		$scope.leaveRoom = function(){
			socket.emit('partroom', roomname);
			$location.path('rooms/' + currUser);
		};

		$scope.submit = function(){
			console.log("Topic: ", newTopic);
			console.log("Password: ", $scope.roomPassword);
			newTopic = $scope.newTopic;
			if(newTopic === ""){
				console.log('roomtopic has to have string');
			} else {
				var topicObj = {
					room: roomname,
					topic: newTopic
				};
				socket.emit('settopic', topicObj, function(success){
					if(success){
						console.log('Successfully changed topic');
						newTopic = "";
					} else {
						console.log('Unsuccessfully changed topic');
					}
				});
			}
			if($scope.roomPassword === ""){
				console.log("password is empty");
			} else {
				var passObj = {
					room: roomname,
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
				});
			}
		};

		$scope.removePassword = function (){
			var removePasswordObj = {
				room: roomname
			};
			socket.emit('removepassword', removePasswordObj, function(success){
				if(success){
					console.log('Successfully removed password');
				} else {
					console.log('Unsuccessfully removed password');
				}
			});
		};
}]);