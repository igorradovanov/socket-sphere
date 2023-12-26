import { User } from "../helpers/users.js";
import { buildMsg } from "../helpers/messages.js";

/**
 * Initializes the chat socket functionality.
 * 
 * @param {SocketIO.Server} io - The Socket.IO server instance.
 */
const chatSocket = io => {
    io.on('connection', socket => {
        // Initial
        console.log(`User connected: ${socket.id}`);

        // Initialize the user

        const user = new User()

        // On connection to user
        socket.emit('message', buildMsg('Admin', 'Welcome to the Sphere Chat! 💬'));

        // On connnection to all users

        socket.on('enterRoom', ({ name, room }) => {

            // Leave previous room

            const prevRoom = user.getUser(socket.id)?.room;

            if (prevRoom) {
                socket.leave(prevRoom);
                io.to(prevRoom).emit('message', buildMsg('Admin', `${name} has left the chat`));
            }

            const user = user.activateUser(socket.id, name, room);

            // Cannot updated previous room users list until after the state is updated

            if (prevRoom) {
                io.to(prevRoom).emit('userList', {
                    users: user.getUsersInRoom(prevRoom),
                });
            }

            // Join new room

            socket.join(user.room);

            // To user who joined

            socket.emit('message', buildMsg('Admin', `Welcome to the ${user.room} room, ${user.name}!`));

            // To all users in room

            socket.broadcast.to(user.room).emit('message', buildMsg('Admin', `${user.name} has joined the chat room`));

            // Update user list for room

            io.to(user.room).emit('userList', {
                users: user.getUsersInRoom(user.room),
            });

            //Update room list for everyone

            io.emit('roomList', {
                rooms: user.getAllActiveRooms(),
            });
        })

        // On disconnect
        socket.on('disconnect', () => {
            user.getUser(socket.id);

            if (user) {
                io.to(user.room).emit('message', buildMsg('Admin', `${user.name} has left the room`));
            }

            io.to(user.room).emit('userList', {
                users: user.getUsersInRoom(user.room),
            })

            io.emit('roomList', {
                rooms: user.getAllActiveRooms(),
            })

            console.log(`User disconnected: ${socket.id}`)
        });

        // On message received
        socket.on('message', (data) => {
            io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
        });

        // On activity
        socket.on('activity', (name) => {
            socket.broadcast.emit('activity', name);
        });
    });
}

export { chatSocket };