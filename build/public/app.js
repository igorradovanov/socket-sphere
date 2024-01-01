var socket = io('ws://localhost:3500');
// LEGACY MOCK UI, DO NOT USE
var msgInput = document.querySelector('#message');
var nameInput = document.querySelector('#name');
var chatRoom = document.querySelector('#room');
var activity = document.querySelector('#activity');
var usersList = document.querySelector('#user-list');
var roomList = document.querySelector('#room-list');
var chatDisplay = document.querySelector('#chat-display');
export function sendMessage(e) {
    e.preventDefault();
    if (msgInput.value && nameInput.value && chatRoom.value) {
        socket.emit('message', {
            name: nameInput.value,
            text: msgInput.value,
        });
        msgInput.value = '';
    }
    ;
    msgInput.focus();
}
function enterRoom(e) {
    e.preventDefault();
    if (nameInput.value && chatRoom.value) {
        socket.emit('enterRoom', {
            name: nameInput.value,
            room: chatRoom.value,
        });
    }
    ;
}
export function setupEventListener() {
    document.querySelector('.form-msg').addEventListener('submit', sendMessage);
    document.querySelector('.form-join').addEventListener('submit', enterRoom);
}
// Listen for actvity
msgInput.addEventListener('keypress', function () {
    socket.emit('activity', nameInput.value);
});
// Listen for user list
socket.on('userList', function (_a) {
    var users = _a.users;
    showUsers(users);
});
// Listen for room list
socket.on('roomList', function (_a) {
    var rooms = _a.rooms;
    showRooms(rooms);
});
// Listen for messages 
socket.on('message', function (data) {
    activity.textContent = '';
    var name = data.name, text = data.text, time = data.time;
    var li = document.createElement('li');
    li.className = 'post';
    if (name === nameInput.value)
        li.className = 'post post--left';
    if (name != nameInput.value && name != 'Admin')
        li.className = 'post post--right';
    if (name !== 'Admin') {
        li.innerHTML = "\n        <div class=\"post__header ".concat(name === nameInput.value ? 'post__header--user' : 'post__header--reply', "\">\n        <span class=\"post__header--name\">").concat(name, "</span>\n        <span class=\"post__header--time\">").concat(time, "</span>\n        </div>\n        <div class=\"post__text\">").concat(text, "</div>\n        ");
    }
    else {
        li.innerHTML = "<div class=\"post__text\">".concat(text, "</div>");
    }
    document.querySelector('.chat-display').appendChild(li);
});
var activityTimeout;
socket.on('activity', function (name) {
    activity.textContent = "".concat(name, " is typing...");
    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(function () {
        activity.textContent = '';
    }, 1000);
});
function showUsers(users) {
    usersList.textContent = '';
    if (users) {
        usersList.innerHTML = "<em>Users in room:</em>";
        users.forEach(function (currentUser, i) {
            console.log(users);
            usersList.textContent += " ".concat(currentUser.name);
            if (users.length > 1 && i !== users.length - 1) {
                usersList.textContent += ',';
            }
        });
    }
}
function showRooms(rooms) {
    roomList.textContent = '';
    if (rooms) {
        roomList.innerHTML = '<em>Active Rooms:</em>';
        rooms.forEach(function (currentRoom, i) {
            roomList.textContent += " ".concat(currentRoom);
            if (rooms.length > 1 && i !== rooms.length - 1) {
                roomList.textContent += ',';
            }
        });
    }
}
setupEventListener();
