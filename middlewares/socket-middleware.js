module.exports = function(socketIO){
	socketIO.on('connection', (socket)=>{
		socket.emit('welcome_event', socket.id);

		socket.on('fileSave', (data)=>{
			socket.join(data.clientID);
			socketIO.sockets.in(data.clientID).emit('fileSaveServer','File Save Success!');
		});

		socket.on('fileCreate', (data)=>{
			socket.join(data.clientID);
			socketIO.sockets.in(data.clientID).emit('fileCreateServer','File Create Success!');
		});

		socket.on('fileDelete', (data)=>{
			socket.join(data.clientID);
			socketIO.sockets.in(data.clientID).emit('fileDeleteServer','File Delete Success!');
		});

		socket.on('fileShare', (data)=>{
			socket.join(data.clientID);
			socketIO.sockets.in(data.clientID).emit('fileShareServer','File Share Success!');
		});

		socket.on('folderCreate', (data)=>{
			socket.join(data.clientID);
			socketIO.sockets.in(data.clientID).emit('folderCreateServer','Folder Create Success!');
		});

		socket.on('projectCreate', (data)=>{
			socket.join(data.clientID);
			socketIO.sockets.in(data.clientID).emit('projectCreateServer','Project Create Success!');
		});

		socket.on('projectSave', (data)=>{
			socket.join(data.clientID);
			socketIO.sockets.in(data.clientID).emit('projectSaveServer','Project Save Success!');
		});

		socket.on('join', (data)=>{
			socket.join(data.room);
			socket.emit('joined', 'unido a: ' + data.room);
		});

		socket.on('realTime', (data)=>{
			socket.broadcast.to(data.room).emit('updateRealTime', data);
		});
	});
}