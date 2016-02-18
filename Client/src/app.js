 	"use strict";

var chatApp = angular.module("chatApp", ["ngRoute"])
.config(function ($routeProvider){
		$routeProvider.when("/", {
			templateUrl: "/src/login/login.html",
			controller: "LoginController"
		}).when("/rooms/:user", {
			templateUrl: "/src/roomlist/roomlist.html",
			controller: "RoomlistController"
		}).when("/rooms/:user/:id", {
			templateUrl: "/src/room/room.html",
			controller: "RoomController"
		}).when("/createroom/:user",{
			templateUrl: "/src/newroom/createroom.html",
			controller: "CreateRoomController"
		});
});