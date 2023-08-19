const socket = io();
let nam;
let textarea = document.querySelector('#messageinp')
let messagearea = document.querySelector('.container')

do {
    nam = prompt("Enter your name");
} while (!nam);

socket.emit('join', nam);

function joined(name) {
    let maindiv = document.createElement('div');

    let nam = `
        <h4 style="text-align: center;">
            ${name} joined the chat!!
        </h4>
    `;
    
    maindiv.innerHTML = nam;
    messagearea.appendChild(maindiv);
}

textarea.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        sendmessage(e.target.value);
    }
});

function sendmessage(mess) {
    let msg = {
        user: nam,
        message: mess
    };

    appendmessage(msg, 'right');
    textarea.value = '';
    socket.emit('message', msg);
}

function appendmessage(msg, type) {
    let maindiv = document.createElement('div');
    let classname = type;
    maindiv.classList.add(classname, 'message');

    maindiv.style.padding = '10px';
    maindiv.style.borderRadius = '5px';
    maindiv.style.width = '60px';

    let namemessage = `
        <h4>
            <img src="chatting.png" alt="" srcset="" height="20px" width="25px">
            ${msg.user}
        </h4>
        <p>${msg.message}</p>
    `;

    maindiv.innerHTML = namemessage;
    messagearea.appendChild(maindiv);
}

socket.on('joined', (name) => {
    joined(name);
});

socket.on('message', (msg) => {
    console.log(msg);
    appendmessage(msg, 'left');
});
