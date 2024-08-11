// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let users = {};

io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        users[socket.id] = { username, room };

        socket.emit('message', { user: 'Admin', text: `Welcome to the ${room} room, ${username}` });
        socket.broadcast.to(room).emit('message', { user: 'Admin', text: `${username} has joined the room` });
    });

    socket.on('sendMessage', (message) => {
        const user = users[socket.id];
        if (user) {
            io.to(user.room).emit('message', { user: user.username, text: message });
        }
    });

    socket.on('disconnect', () => {
        const user = users[socket.id];
        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.username} has left the room` });
            delete users[socket.id];
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
