var io = require('socket.io').listen(8080);

var socketMap = {};

function getUserData(socketId)
{
	if (socketMap[socketId])
	{
		return {
			socketId: socketId,
			userId: socketMap[socketId].userId,
			connectedTime: socketMap[socketId].connectedTime
		};
	}
}

function getUserList()
{
	var users = [];
	for (var key in socketMap)
	{
		if (socketMap[key])
		{
			users.push(getUserData(key));
		}
	}
	return users;
}

function getUserSocket(userId)
{
	for (var key in socketMap)
	{
		if (socketMap[key] && socketMap[key].userId == userId)
		{
			return socketMap[key].socketInstance;
		}
	}
	return false;
}

io.sockets.on('connection', function (socket) {
	socketMap[socket.id] = {
		userId: 0,
		socketInstance: socket,
		connectedTime: new Date()
	};
	io.sockets.emit('connected', getUserData(socket.id));

	socket.on('setUserId', function(data) {
		socketMap[socket.id].userId = parseInt(data.userId);

		// not very efficient - we should just tell everyone what update happened really...
		io.sockets.emit('getConnectedUsersResponse', getUserList());
	});

	socket.on('getConnectedUsers', function(data) {
		socket.emit('getConnectedUsersResponse', getUserList());
	});

	socket.on('sendMessage', function(data) {
		var rcpt = getUserSocket(data.recipient);
		if (rcpt)
		{
			rcpt.emit('message', {from: socketMap[socket.id].userId, to: data.recipient, message: data.message});
		}
		else
		{
			console.log('message to user ' + data.recipient + ' failed...');
		}
	});

	socket.on('disconnect', function(data) {
		socketMap[socket.id] = null;
	});
});
