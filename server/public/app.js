const socket = io('ws://localhost:3500');

// LEGACY MOCK UI, DO NOT USE

const msgInput = document.querySelector('#message');
const nameInput = document.querySelector('#name');
const chatRoom = document.querySelector('#room');
const activity = document.querySelector('#activity');
const usersList = document.querySelector('#user-list');
const roomList = document.querySelector('#room-list');
const chatDisplay = document.querySelector('#chat-display');

export function sendMessage(e) {
    e.preventDefault();
    console.log('sending message')
    if (msgInput.value && nameInput.value && chatRoom.value) {
        socket.emit('message', {
            name: nameInput.value,
            text: msgInput.value,
        });
        msgInput.value = '';
    };
    msgInput.focus();
}

function enterRoom(e) {
    e.preventDefault();
    if (nameInput.value && chatRoom.value) {
        socket.emit('enterRoom', {
            name: nameInput.value,
            room: chatRoom.value,
        });
    };
}

export function setupEventListener() {
    document.querySelector('.form-msg').addEventListener('submit', sendMessage);
    document.querySelector('.form-join').addEventListener('submit', enterRoom);
}

// Listen for actvity

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', nameInput.value);
});

// Listen for user list

socket.on('userList', ({ users }) => { showUsers(users) });

// Listen for room list

socket.on('roomList', ({ rooms }) => { showRooms(rooms) });

// Listen for messages 

socket.on('message', (data) => {
    activity.textContent = '';
    const { name, text, time } = data;
    const li = document.createElement('li');
    li.className = 'post';
    if (name === nameInput.value) li.className = 'post post--left';
    if (name != nameInput.value && name != 'Admin') li.className = 'post post--right';
    if (name !== 'Admin') {
        li.innerHTML = `
        <div class="post__header ${name === nameInput.value ? 'post__header--user' : 'post__header--reply'}">
        <span class="post__header--name">${name}</span>
        <span class="post__header--time">${time}</span>
        </div>
        <div class="post__text">${text}</div>
        `;
    } else {
        li.innerHTML = `<div class="post__text">${text}</div>`;
    }
    document.querySelector('.chat-display').appendChild(li);
});

let activityTimeout;

socket.on('activity', (name) => {
    activity.textContent = `${name} is typing...`;
    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(() => {
        activity.textContent = '';
    }, 1000);
});


function showUsers(users) {
    console.log('showing users')
    console.log(users)
    usersList.textContent = '';
    if (users) {
        usersList.innerHTML = `<em>Users in room: ${chatRoom.value}</em>`;
        users.forEach((currentUser, i) => {
            console.log(currentUser)
            usersList.textContent += ` ${currentUser.name}`;
            if (users.length > 1 && i !== users.length - 1) {
                usersList.textContent += ',';
            }
        });
    }
}

function showRooms(rooms) {
    roomList.textContent = '';
    console.log('roomList', rooms)
    if (rooms) {
        roomList.innerHTML = '<em>Active Rooms:</em>';
        rooms.forEach((currentRoom, i) => {
            console.log('currentRoom', currentRoom, rooms)
            roomList.textContent += ` ${currentRoom}`;
            if (rooms.length > 1 && i !== rooms.length - 1) {
                roomList.textContent += ',';
            }
        });
    }
}


setupEventListener();