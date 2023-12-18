import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const app = express();

app.use(helmet()); // Apply helmet middleware for enhanced security
app.use(express.static(path.join(__dirname, 'public')));

const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
  // Initial
  console.log(`User connected: ${socket.id}`);

  // On disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  // On message received
  socket.on('message', (data) => {
    console.log(data);
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  });
});

export { app };
