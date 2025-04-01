const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const readline = require('readline');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 3000;

app.use(express.static('public'));

const users = new Map();

io.on('connection', (socket) => {
  const userId = `Пользователь ${users.size + 1}`;
  users.set(socket.id, userId);
  console.log(`Пользователь: ${users.size} подключился`)
  
  io.emit('systemMessage', {
    text: `${userId} подключился`,
    type: 'connection'
  });

  socket.on('chatMessage', (msg) => {
    const user = users.get(socket.id);
    io.emit('message', {
      text: msg,
      sender: user,
      type: 'chat'
    });
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    users.delete(socket.id);
    io.emit('systemMessage', {
      text: `${user} вышел из чата`,
      type: 'disconnect'
    });
  });
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  io.emit('systemMessage', {
    text: `Сервер: ${input}`,
    type: 'server'
  });
});
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
