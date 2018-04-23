//variable declaration
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//all chat rooms
var rooms = {'Default':{'users':[],'log':[]}, 'School':{'users':[],'log':[]}, 'Family':{'users':[],'log':[]}, 'Work':{'users':[],'log':[]}};

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//port to listen on
http.listen(3000, function(){
	console.log('listening on *:3000');
});

/*

CONNECTION/ DISCONNECTION

*/
io.on('connection', function(socket){
	console.log('user connected');     //needs to be fixed because currently we are connecting and disconnecting too many times
	console.log(socket.id);
	io.emit('connected message');
	socket.on('disconnect', function(){
		console.log('user disconnected');
		io.emit('disconnected message');
	});
});

/*

SENDING A MESSAGE

*/
io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});



/*

SUPPORT FOR NICKNAMES

*/



/*
MULTIPLE CHATS

*/

