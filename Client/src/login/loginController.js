"use strict";

chatApp.controller("LoginController", ["$scope", "$location", "socket", "LoggedIn",
	function ($scope, $location, socket, LoggedIn){
	console.log('Loggedin:', LoggedIn);
	$scope.user = "";
	$scope.errorMessage = "";

	$scope.onLogin = function onLogin(path){
		LoggedIn = $scope.user;
		console.log('Loggedin: ',LoggedIn);
		socket.emit("adduser", $scope.user, function(available, reason){
			console.log('adduser');
			if (available){
				console.log("rooms/" + $scope.user);
				$location.path("rooms/" + $scope.user);
			} else{
				alert('username ' + $scope.user + ' is taken, pick another');
			}
		});
	};
}]);
