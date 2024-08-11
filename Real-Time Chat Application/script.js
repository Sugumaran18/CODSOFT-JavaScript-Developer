// script.js
document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const authContainer = document.getElementById('auth-container');
    const chatContainer = document.getElementById('chat-container');
    const loginBtn = document.getElementById('login-btn');
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message-input');
    const messages = document.getElementById('messages');
    const rooms = document.getElementById('rooms');
    const roomName = document.getElementById('room-name');
    let currentRoom = 'general';

    loginBtn.addEventListener('click', () => {
        const username = document.getElementById('username').value.trim();
        if (username) {
            socket.emit('joinRoom', { username, room: currentRoom });
            authContainer.classList.add('hidden');
            chatContainer.classList.remove('hidden');
        }
    });

    rooms.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            currentRoom = e.target.getAttribute('data-room');
            roomName.textContent = `Room: ${currentRoom}`;
            socket.emit('joinRoom', { username: document.getElementById('username').value.trim(), room: currentRoom });
            messages.innerHTML = '';
        }
    });

    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            socket.emit('sendMessage', message);
            messageInput.value = '';
        }
    });

    socket.on('message', ({ user, text }) => {
        const div = document.createElement('div');
        div.textContent = `${user}: ${text}`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    });
});
