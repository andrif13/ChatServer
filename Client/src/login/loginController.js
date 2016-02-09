"use strict";

chatApp.controller("LoginController", ["$scope", function ($scope){
		alert("loading login controller");

		$scope.user = "";
		$scope.pass = "";
		$scope.errorMessage = "";

		$scope.onLogin = function onLogin(){
			chatResource.login($scope.user, $scope.pass, function(success){
				if(!success){
					$scope.errorMessage = "Innskraning mistokst"

				} else {
					$location("#/roomlist");
					//TODO senda notandann a herbergjalistann

				}
			})

		};
		

	}]);