"use strict";

var chatApp = angular.module("chatApp", ["ngRoute"])
.config(function ($routeProvider){
		$routeProvider.when("/", {
			templateUrl: "/src/login/login.html",
			controller: "LoginController"
		}).when("/rooms", {
			templateUrl: "/src/roomlist/roomlist.html",
			controller: "RoomlistController"
		}).when("/rooms/:id", {
			templateUrl: "/src/room/room.html",
			controller: "RoomController"
		});
	});