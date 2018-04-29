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
	//io.emit('connected message');
	socket.on('disconnect', function(){
		console.log('user disconnected');
		//io.emit('disconnected message');
	});
});

/*

SENDING A MESSAGE

*/
io.on('connection', function(socket){
	var username = 'user';
  	var current_chat = 'Default';
  	var ourSocket = socket;

  	update_chats(ourSocket);

  	//handler for sending a message
	socket.on('chat message', function(msg){
		console.log(msg.name + " sent to " + msg.to)
		//push_to_chat(msg.to, msg);
		io.emit('chat message', msg);

	});

	//handler for joining a chat
	socket.on('join chat', function(name){

		current_chat = 'Default';
		username  = name;

		//display all old messages
		console.log("Send old messages.");
		for (var i = 0; i < chats[current_chat].log.length; i++){
			ourSocket.emit(chats[current_chat].log[i].type, chats[current_chat].log[i]);
		}

		chats['Default'].users.push(ourSocket);

		console.log(username + " joined main chat");

		push_to_chat(current_chat, {type: 'user event', to: current_chat, val: username + 'logged on.'})

	});

	socket.on('disconnect', function(){

		chats[current_chat].users.splice(chats[current_chat].users.indexOf(ourSocket), 1);

		push_to_chat(current_chat, {type: 'user event', to: current_chat, val: username + 'logged off.'})

	});

	socket.on('switch chat', function(new_room){



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






