"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSocket = void 0;
var users_js_1 = require("../helpers/users.js");
var messages_js_1 = require("../helpers/messages.js");
/**
 * Initializes the chat socket functionality.
 *
 * @param {SocketIO.Server} io - The Socket.IO server instance.
 */
var chatSocket = function (io) {
    /**
     * Represents the state of users.
     * @type {Object}
     * @property {Array} users - The array of users.
     * @property {Function} setUsers - Sets the users array.
     */
    var userState = {
        users: [],
        setUsers: function (newUsersArray) {
            this.users = newUsersArray;
        },
    };
    // Initialize User instance
    var user;
    io.on('connection', function (socket) {
        // Initial
        console.log("User connected: ".concat(socket.id));
        // On connection to user
        socket.emit('message', (0, messages_js_1.buildMsg)('Admin', 'Welcome to the Sphere Chat! 💬'));
        socket.on('enterRoom', function (_a) {
            // Leave previous room
            var _b;
            var name = _a.name, room = _a.room;
            user = new users_js_1.User(socket.id, name, room, userState);
            var prevRoom = (_b = user.getUser()) === null || _b === void 0 ? void 0 : _b.room;
            if (prevRoom) {
                socket.leave(prevRoom);
                io.to(prevRoom).emit('message', (0, messages_js_1.buildMsg)('Admin', "".concat(name, " has left the chat")));
            }
            user.activateUser();
            // Cannot updated previous room users list until after the state is updated
            if (prevRoom) {
                io.to(prevRoom).emit('userList', {
                    users: user.getUsersInRoom(prevRoom),
                });
            }
            // Join new room
            socket.join(user.room);
            // To user who joined
            socket.emit('message', (0, messages_js_1.buildMsg)('Admin', "Welcome to the ".concat(user.room, " room, ").concat(user.name, "!")));
            // To all users in room
            socket.broadcast.to(user.room).emit('message', (0, messages_js_1.buildMsg)('Admin', "".concat(user.name, " has joined the chat room")));
            // Update user list for room
            io.to(user.room).emit('userList', {
                users: user.getUsersInRoom(user.room),
            });
            //Update room list for everyone
            io.emit('roomList', {
                rooms: user.getAllActiveRooms(),
            });
        });
        // On user disconnect
        socket.on('disconnect', function () {
            if (user) {
                io.to(user.room).emit('message', (0, messages_js_1.buildMsg)('Admin', "".concat(user.name, " has left the room")));
                io.to(user.room).emit('userList', {
                    users: user.getUsersInRoom(user.room),
                });
                io.emit('roomList', {
                    rooms: user.getAllActiveRooms(),
                });
                console.log("User disconnected: ".concat(socket.id));
            }
        });
        // On message received
        socket.on('message', function (_a) {
            var _b;
            var name = _a.name, text = _a.text;
            var room = (_b = user.getUser()) === null || _b === void 0 ? void 0 : _b.room;
            if (room) {
                io.to(room).emit('message', (0, messages_js_1.buildMsg)(name, text));
            }
        });
        // On activity detected
        socket.on('activity', function (name) {
            var _a;
            var room = (_a = user.getUser()) === null || _a === void 0 ? void 0 : _a.room;
            if (room) {
                socket.broadcast.to(room).emit('activity', name);
            }
        });
    });
};
exports.chatSocket = chatSocket;
