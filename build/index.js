import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import { chatSocket } from './sockets/chatSocket.js';
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var env = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 3500;
var app = express();
if (env != 'development') {
    app.use(helmet()); // Apply helmet middleware for enhanced security
}
app.use(express.static(path.join(__dirname, 'public')));
var httpServer = app.listen(PORT, function () {
    console.log("Listening on port ".concat(PORT));
});
var io = new Server(httpServer);
chatSocket(io);
export { app };
