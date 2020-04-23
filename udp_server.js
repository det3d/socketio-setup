var PORT = 5000;
var HOST = '255.255.255.255';

var io = require('socket.io').listen(8081);
var dgram = require('dgram');
var server = dgram.createSocket('udp4');

io.sockets.on('connection', function (socket) {
  console.log('socket.io connected');

  //when clients disconnect
  socket.on('disconnect', function () {
    console.log('socket.io disconnected');
  });

  socket.on('syncUDP', function (data) {
    console.log('emitting syncUDP');
    //		io.sockets.emit('udpStatus', 1);
  });

  server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + message);
    if (String(message) == 'syncUDP') {
      console.log('recieved message syncUDP - in socket');
      io.sockets.emit('udpStatus', 1);
    }
    if (String(message) == 'syncYo') {
      console.log('received message syncYo - in socket');
    }
  });
});

server.on('listening', function () {
  var address = server.address();
  console.log(
    'UDP Server listening on ' + address.address + ':' + address.port
  );
});

server.on('message', function (message, remote) {
  console.log(remote.address + ':' + remote.port + ' - ' + message);
  if (String(message) == 'syncUDP') {
    console.log('recieved message syncUDP');
  }
  if (String(message) == 'syncYo') {
    console.log('received message syncYo');
  }
});

server.bind(PORT, HOST);
