//variable declaration
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(_dirname + '/index.html');
});

//port to listen on
http.listen(3000, function(){
  console.log('listening on *:3000');
});
