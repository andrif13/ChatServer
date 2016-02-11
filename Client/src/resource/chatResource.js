"use strict";

chatApp.factory("chatResource", 
	function chatResource() {
		return {
			login: function login(user,pass,callback){
				if(user === 'andri' && pass === 'typpahaus'){
					console.log('Andri er typpahaus');
				}
				else {
					console.log('Oli er typpahaus');
				}
			},
			getRoomList: function getRoomList(callback){
				//TODO
			},
		}
	});