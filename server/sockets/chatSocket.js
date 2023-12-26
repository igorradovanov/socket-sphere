/**
 * Initializes the chat socket functionality.
 * 
 * @param {SocketIO.Server} io - The Socket.IO server instance.
 */
const chatSocket = io => {
    io.on('connection', socket => {
        // Initial
        console.log(`User connected: ${socket.id}`);

        // On connection to user
        socket.emit('message', 'Welcome to the Sphere Chat! 💬');

        // On connnection to all users

        socket.broadcast.emit('message', `${socket.id.substring(0, 5)} has joined the chat`);

        // On disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });

        // On disconnect to all users

        socket.on('disconnect', () => {
            socket.broadcast.emit('message', `${socket.id.substring(0, 5)} has left the chat`);
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