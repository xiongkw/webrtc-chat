var P2P = require('socket.io-p2p');
var io = require('socket.io-client');
var socket = io();

var p2p = new P2P(socket, null, function(){
	
  p2p.usePeerConnection = true;
  p2p.emit('peer-obj', { peerId: p2p.peerId });
  
  p2p.on('upgrade', function(username){
	var msg = {username: document.getElementById("user").value,text: 'Entered!'};
	onmessage(msg);
	disableUser();
	console.log(msg);
	p2p.emit('msg', msg);
  });

  p2p.on("msg", function(msg){
	console.log(msg);
	onmessage(msg);
  });

});

function disableUser(){
	document.getElementById('user').disabled = true;
	document.getElementById('room').disabled = true;
	document.getElementById('btn_enter').disabled = true;
}

function onmessage(msg){
	document.getElementById("messages").value += msg.username +": "+ msg.text + "\n";
}


document.getElementById("btn_enter").addEventListener('click', function(){
	p2p.emit('room', {username: document.getElementById("user").value, room: document.getElementById("room").value});
});

document.getElementById("btn_send").addEventListener('click', function(){
	var msg = {username: document.getElementById("user").value,text: document.getElementById("msg").value};
	onmessage(msg);
	p2p.emit("msg", msg);
	document.getElementById("msg").value  = '';
});
