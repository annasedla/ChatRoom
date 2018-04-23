//variable declaration
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//all chat rooms
//al users get initally directed to a lobby
var chats = {'Default':{'users':[],'log':[]}, 'School':{'users':[],'log':[]}, 'Family':{'users':[],'log':[]}, 'Work':{'users':[],'log':[]}};

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
	console.log('user connected');     //TODO, needs to be fixed because currently we are connecting and disconnecting too many times
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

		//TODO, add support for multiple chat rooms
	});
});


/*

DIFFERENT CHAT FUNCTIONS

*/
function push_to_chat(room, msg){
  chats[chat].log.push(msg);
  for(var i=0; i < chats[chat].users.length; i++){
    chats[chat].users[i].emit(msg.type, msg);
  }
}

//updates a list of chats to display in the front end buttons
function update_chats(usr){
  var chat_names = [];
  for(var chat in chats){
    chat_names.push(chat);
  }
  usr.emit('update chats', chat_names);
}

/*

MULTIPLE CHATS

*/

 io.on('switch room', function(new_room){
 	//TODO, this will handle switching chat rooms 

});

/*

SUPPORT FOR NICKNAMES

*/





