const socket = io();
const input = document.getElementById('messageInput');
const messages = document.getElementById('messages');

function sendMessage() {
  if (input.value.trim() === '') return;
  socket.emit('chatMessage', input.value);
  input.value = '';
}

socket.on('message', (data) => {
  const li = document.createElement('li');
  li.textContent = data.text;

  if (data.sender === 'server') {
    li.style.color = 'red';
    li.textContent = `[Сервер] ${data.text}`;
  } else {
    li.style.color = 'blue';
    li.textContent = `[Клиент] ${data.text}`;
  }

  messages.appendChild(li);
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});