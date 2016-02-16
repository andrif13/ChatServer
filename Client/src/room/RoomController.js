'use strict';

chatApp.controller("RoomController", ["$scope", "$routeParams",
	function ($scope, $routeParams, $Location){
	
	var id = $routeParams.id;
	var queryString = $Location.search();
	var status = queryString["status"];

	if(status == "available") {
		
	}


}]);