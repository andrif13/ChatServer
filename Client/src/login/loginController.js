"use strict";

chatApp.controller("LoginController", ["$scope", "$location", "socket", "LoggedIn",
	function ($scope, $location, socket, LoggedIn){
	console.log('Loggedin:', LoggedIn);
	$scope.user = "";
	$scope.errorMessage = "";
	$scope.taken = ""

	$scope.onLogin = function onLogin(path){
		LoggedIn = $scope.user;
		console.log('Loggedin: ',LoggedIn);
		if($scope.user === "") {
			$scope.errorMessage = "You have to put some name in the field";
		}else {
			socket.emit("adduser", $scope.user, function(available, reason){
			console.log('adduser');
			if (available){
				console.log("rooms/" + $scope.user);
				$location.path("rooms/" + $scope.user);
			} else{
				$scope.errorMessage = "This User is already taken choose another one !"
			}
		});

		}
		
	};
}]);
