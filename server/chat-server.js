var io = require('socket.io')(3000);

var express = require('express');
var app = express();
var http = require('http');
var port = 3001;
var httpServer = http.Server(app);

 httpServer.listen(port, function(){
    console.log('Express server listening on port ' + httpServer.address().port);

});

app.post('/confirm', function (req, res) {
console.log('djsflksjflksjdlkjlfsjldksjflksdjfldskfjdsl!')	
    });

io.on('connection', function(socket){

	socket.on('join:room', function(data){
		var room_name = data.room_name;
		socket.join(room_name);
		console.log(data);
		console.log("WORKED!");
	});


	socket.on('leave:room', function(msg){
		msg.text = msg.user + ' has left the room';
		socket.leave(msg.room);
		socket.in(msg.room).emit('message', msg);
				console.log("WORKED 2222!");

	});


	socket.on('send:message', function(msg){
		socket.in(msg.room).emit('message', msg);
				console.log("WORKED 33333!");

	});


});