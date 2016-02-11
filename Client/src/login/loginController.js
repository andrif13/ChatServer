"use strict";

chatApp.controller("LoginController", ["$scope", "$location", "socket", 
	function ($scope, $location, socket){

	$scope.user = "";
	$scope.errorMessage = "";

	$scope.onLogin = function onLogin(path){
		socket.emit("adduser", $scope.user, function(available, reason){
			if (available){
				$location.path(path)
			} else{
				alert('username ' + $scope.user + ' is taken, pick another');
			}
		});
	};
}]);