import io from 'socket.io-client';

// connet to server, got socket object
//const socket = io('ws://localhost:4000');
const socket = io('wss://renego.live:4000', {
  transports: ['websocket'],
  rejectUnauthorized: false
});

// bind 'receiveMessage' monitor, use to receive msg from server
socket.on('receiveMsg', function (data) {
  console.log('Client received:', data);
});

// send msg to server
socket.emit('sendMsg', { name: 'Mary', date: Date.now() });
console.log('Client send msg to server:', { name: 'Mary', date: Date.now() });
