const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const readline = require('readline');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 3000;
let i = 0;

app.use(express.static('public'));

io.on('connection', (socket) => {
  i++;
  console.log(`Пользователь ${i} подключен!`);

  socket.on('chatMessage', (msg) => {
    io.emit('message', {
        text: msg,
        sender: 'client'
    }); 
  });
});


const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

r1.on('line', (input) => {
  io.emit('message', {
    text: `${input}`,
    sender: 'server'
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});