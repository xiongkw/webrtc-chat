var ecstatic = require('ecstatic')
var server = require('http').createServer(
  ecstatic({ root: __dirname, handleError: false })
)

var io = require('socket.io')(server);
var p2p = require('socket.io-p2p-server').Server;
server.listen(3030);
console.log('Listening on 3030');

io.on('connection', function(socket){
  
  socket.on('room', function(data){
	console.log(data.username + ' entering: ' + data.room)
	socket.join(data.room);
	
	p2p(socket, null);
  });
  
});