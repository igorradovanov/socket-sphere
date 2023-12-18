const socket = io('ws://localhost:3500');

export function sendMessage(e){
    e.preventDefault();
    const input = document.querySelector('#message');
    if(input.value){
        socket.emit('message', input.value);
        input.value = '';
    };
    input.focus();
}

export function setupEventListener() {
    document.querySelector('form').addEventListener('submit', sendMessage);
  }

// Listen for messages 

socket.on('message', (data) => {
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
});

setupEventListener();