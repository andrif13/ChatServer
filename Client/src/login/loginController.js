"use strict";

chatApp.controller("LoginController", ["$scope", "$location", "socket", "LoggedIn", "$timeout",
	function ($scope, $location, socket, LoggedIn, $timeout){
	console.log('Loggedin:', LoggedIn);
	$scope.user = "";
	$scope.errorMessage = "";
	$scope.taken = "";
	$scope.showError = false;
	$scope.doFade = false;

	$scope.onLogin = function onLogin(path){
		LoggedIn = $scope.user;
		//console.log('Loggedin: ',LoggedIn);
		$scope.showError = false;
		$scope.doFade = false;
		$scope.showError = true;
		$scope.errorMessage = "You have to put some name in the field";
		if($scope.user === "") {
			$timeout(function(){
				$scope.doFade = true;
			}, 2500);
		}else {
			socket.emit("adduser", $scope.user, function(available, reason){
				if (available){
					$location.path("rooms/" + $scope.user);
				} else{
					$scope.errorMessage = "This User is already taken choose another one !";
					$timeout(function(){
						$scope.doFade = true;
					}, 2500);
				}
			});
		}
	};
}]);
