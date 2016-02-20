"use strict";

var chatApp = angular.module("chatApp", ["ngRoute" ,'ui.bootstrap'])
.config(['$routeProvider',
	function ($routeProvider){
		$routeProvider.when("/", {
			templateUrl: "/src/login/login.html",
			controller: "LoginController",
		}).when("/rooms/:user", {
			templateUrl: "/src/roomlist/roomlist.html",
			controller: "RoomlistController",
		}).when("/rooms/:user/:id", {
			templateUrl: "/src/room/room.html",
			controller: "RoomController",
		}).when("/createroom/:user",{
			templateUrl: "/src/newroom/createroom.html",
			controller: "CreateRoomController"
		});
	}]);
chatApp.value('LoggedIn');

var checkAuthOfUser = function($q, LoggedIn, $location){
	console.log('Loggedin_cjel: ', LoggedIn);
	var deferred = $q.defer();
	if(LoggedIn === undefined){
		deferred.reject();
		$location.path("/");
	} else {
		deferred.resolve(true);
	}
	return deferred.promise;
};