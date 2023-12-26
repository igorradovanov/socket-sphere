import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import { chatSocket } from './sockets/chatSocket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || 'development';

const PORT = process.env.PORT || 3500;
const ADMIN = "Admin";

const app = express();

if (env != 'development') {
  app.use(helmet()); // Apply helmet middleware for enhanced security
}

app.use(express.static(path.join(__dirname, 'public')));

const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// State / Temporary  storage
// TODO: Replace with database

const userstState = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};


const io = new Server(httpServer);

chatSocket(io);

export { app };
