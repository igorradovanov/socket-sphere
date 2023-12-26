const socket = io('ws://localhost:3500');

const activity = document.querySelector('#activity');
const msgInput = document.querySelector('#message');

export function sendMessage(e){
    e.preventDefault();
    if(msgInput.value){
        socket.emit('message', msgInput.value);
        msgInput.value = '';
    };
    msgInput.focus();
}

export function setupEventListener() {
    document.querySelector('form').addEventListener('submit', sendMessage);
  }

// Listen for messages 

socket.on('message', (data) => {
    activity.textContent = '';
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
});

// Listen for activity

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', socket.id.substring(0, 5));
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