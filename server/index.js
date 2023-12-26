import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || 'development';

const PORT = process.env.PORT || 3500;

const app = express();

if (env != 'development') {
  app.use(helmet()); // Apply helmet middleware for enhanced security
}

app.use(express.static(path.join(__dirname, 'public')));

const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(httpServer);

//TODO - Create a message broker class to handle all the socket events

io.on('connection', (socket) => {
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
    console.log(data);
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  });

  // On activity
  socket.on('activity', (name) => {
    socket.broadcast.emit('activity', name);
  });

});

export { app };
 