'use strict';

chatApp.controller("RoomController", ["$scope", "$routeParams", "socket",
	function ($scope, $routeParams, socket){
		$scope.currUser = $routeParams.user;
		console.log('her i RoomController');
		$scope.roomname = $routeParams.id;
		console.log($scope.roomname);
		socket.emit('hasjoined', $scope.roomname);

		socket.on('updateusers', function(room, user, admin){
			$scope.userlist = _.keys(user);
		});

}]);