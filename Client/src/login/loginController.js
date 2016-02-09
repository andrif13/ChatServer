"use strict";

chatApp.controller("LoginController", ["$scope", "$location", "chatResource", "socket", function ($scope, $location, chatResource, socket){

	$scope.user = "";
	$scope.pass = "";
	$scope.errorMessage = "";

	$scope.onLogin = function onLogin(){
		console.log('hear', $scope.user);
		socket.emit("adduser", $scope.user, function(available, reason){
		    if (available){
		        console.log('available');
		    }
		    console.log('not available: ', reason);
		});
	};
}]);