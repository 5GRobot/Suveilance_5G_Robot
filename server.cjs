// const express = require ("express")
// const compression = require ("compression")
// require('dotenv').config();

// const path = require ("path")

// const app = express()

// app.use (compression())

// app.use(express.static(path.join(__dirname, "build")))
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"))
// })

// console.log(`${process.env.REACT_APP_PORT}`)
// const port = process.env.REACT_APP_PORT || 3000;

// app.listen(port, () => console.log('start server'))


const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;


app.use(express.static(path.resolve(__dirname, "dist")))
app.use(cors());
//  app.use(express.static(path.join(__dirname, "build")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"))
})
// Redirect to https
// app.get('*', (req, res, next) => {
//     // if (req.headers['x-forwarded-proto'] !== 'https' && env !== 'development') {
//     //     return res.redirect(['https://', req.get('Host'), req.url].join(''));
//     // }
//     res.sendFile(path.join(__dirname, "build", "index.html"))
//     next();
// });
const server = require('http').createServer(app);


/**
///
* Socket.io events
 */
console.log(process.env.CLIENT);
const io = socketIO(server
    , {
        cors: {
            origin: `*`,
            methods: ["GET", "POST"]
        }
    }
);
server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
io.sockets.on('connection', function (socket) {
    /**
     * Log actions to the client
     */
    function log() {
        const array = ['Server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    }

    /**
     * Handle message from a client
     * If toId is provided message will be sent ONLY to the client with that id
     * If toId is NOT provided and room IS provided message will be broadcast to that room
     * If NONE is provided message will be sent to all clients
     */
    socket.on('message', (message, toId = null, room = null) => {
        log('Client ' + socket.id + ' said: ', message);

        if (toId) {
            console.log('From ', socket.id, ' to ', toId, message.type);

            io.to(toId).emit('message', message, socket.id);
        } else if (room) {
            console.log('From ', socket.id, ' to room: ', room, message.type);

            socket.broadcast.to(room).emit('message', message, socket.id);
        } else {
            console.log('From ', socket.id, ' to everyone ', message.type);

            socket.broadcast.emit('message', message, socket.id);
        }
    });

    let roomAdmin; // save admins socket id (will get overwritten if new room gets created)

    /**
     * When room gets created or someone joins it
     */
    socket.on('create or join', (room) => {
        log('Create or Join room: ' + room);

        // Get number of clients in the room
        const clientsInRoom = io.sockets.adapter.rooms.get(room);
        let numClients = clientsInRoom ? clientsInRoom.size : 0;

        if (numClients === 0) {
            // Create room
            socket.join(room);
            roomAdmin = socket.id;
            socket.emit('created', room, socket.id);
        } else {
            log('Client ' + socket.id + ' joined room ' + room);

            // Join room
            io.sockets.in(room).emit('join', room); // Notify users in room
            socket.join(room);
            io.to(socket.id).emit('joined', room, socket.id); // Notify client that they joined a room
            io.sockets.in(room).emit('ready', socket.id); // Room is ready for creating connections
        }
    });

    /**
     * Kick participant from a call
     */
    socket.on('kickout', (socketId, room) => {
        if (socket.id === roomAdmin) {
            socket.broadcast.emit('kickout', socketId);
            io.sockets.sockets.get(socketId).leave(room);
        } else {
            console.log('not an admin');
        }
    });

    // participant leaves room
    socket.on('leave room', (room) => {
        socket.leave(room);
        socket.emit('left room', room);
        socket.broadcast.to(room).emit('message', { type: 'leave' }, socket.id);
    });

    /**
     * When participant leaves notify other participants
     */
    socket.on('disconnecting', () => {
        socket.rooms.forEach((room) => {
            if (room === socket.id) return;
            socket.broadcast
                .to(room)
                .emit('message', { type: 'leave' }, socket.id);
        });
    });
});
