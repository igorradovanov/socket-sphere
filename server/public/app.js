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

// Listen for messages 

socket.on('message', (data) => {
    activity.textContent = '';
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
});

let activityTimeout;

socket.on('activity', (name) => {
    activity.textContent = `${name} is typing...`;
    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(() => {
        activity.textContent = '';
    }, 1000);
});

setupEventListener();