
chatApp.factory('chatService', function()
{
	var Service = function () {
		var self = this;

		self.socket = null;

		var serverMessageHandler = function(data)
		{
			//debugger
		}
		self.connect = function()
		{
			if(self.socket == null)
			{
				self.socket = io.connect('http://localhost:8333');
				self.onServerMessage(serverMessageHandler);
			}
		}

		self.addUser = function(username, callback)
		{
			self.connect();
			self.socket.emit("adduser", usernae, callback);
		}
	}
});


