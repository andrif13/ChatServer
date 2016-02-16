"use strict";

chatApp.controller("LoginController", ["$scope", "$location", "socket", 
	function ($scope, $location, socket){

	$scope.user = "";
	$scope.errorMessage = "";

	$scope.onLogin = function onLogin(path){
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