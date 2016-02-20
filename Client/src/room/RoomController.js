'use strict';

chatApp.controller("RoomController", ["$scope", "$routeParams", "socket", "$location",
	function ($scope, $routeParams, socket, $location){
		$scope.currUser = $routeParams.user;
		$scope.roomname = $routeParams.id;
		$scope.isAdmin = false;
		$scope.displaySuccess = false;
		$scope.adminsInRoom = "";
		$scope.glued = true;
		$scope.show = false;
		$scope.newTopic = "";
		$scope.topic = "";
		$scope.roomPassword = "";
		var counter = 1;

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
		})

		socket.on('banned', function(room, userBanned, banner){
			if($routeParams.user === userBanned && room === $scope.roomname && $routeParams.user !== banner){
				$location.path("rooms/" + $scope.currUser);
			}
		});
		
		socket.on('updatetopic', function (room, topic, user) {
			$scope.topic = topic;
			console.log("UpdateTopic");
			console.log('Room: ',room);
			console.log('Topic: ', topic);
			console.log('User: ', user);
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
			})
		}
		
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