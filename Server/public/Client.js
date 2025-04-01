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
  li.textContent = `${data.sender}: ${data.text}`;
  li.classList.add('chat-message');
  messages.appendChild(li);
});

socket.on('systemMessage', (data) => {
  const li = document.createElement('li');
  li.textContent = data.text;
  
  if (data.type === 'connection') {
    li.classList.add('connection-message');
    li.style.color = 'green';
  } else if (data.type === 'disconnect') {
    li.classList.add('disconnect-message');
    li.style.color = 'red';
  } else if (data.type === 'server') {
    li.classList.add('server-message');
    li.style.color = 'blue';
  }
  
  messages.appendChild(li);
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});


