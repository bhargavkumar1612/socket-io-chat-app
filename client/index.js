import {io} from "socket.io-client";
const socket = io("http://localhost:3000");

var room_id = ""
document.getElementById("room-id").addEventListener("change",(e)=>{
    room_id = e.target.value;
})
socket.on("connect", ()=>{
    document.getElementById('chat-id').textContent = `Connected to server with id: ${socket.id}`
    console.log(document.getElementById('chat-id').textContent)
})

socket.on("message-received", (message)=>{
    recieveMessage(message);
})

var sendMessage = function(userMsg){
    var userMsgElement = document.createElement('p');
    userMsgElement.innerText = userMsg;
    userMsgElement.classList.add('send-message');
    var userMsgContainer = document.createElement('div');
    var timeStamp = document.createElement('div');
    timeStamp.classList.add('time-stamp');
    timeStamp.innerText = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    userMsgContainer.appendChild(timeStamp);
    userMsgContainer.classList.add('send-message-container');
    userMsgContainer.appendChild(userMsgElement);
    msgContainer.appendChild(userMsgContainer);
    document.getElementById('userInput').value = '';
    jumpToPageBottom();
    socket.emit('send-message', userMsg, room_id);
}

var recieveMessage = function(recievedMessage){
    var recievedMessageElement = document.createElement('p');
    recievedMessageElement.innerText = recievedMessage;
    recievedMessageElement.classList.add('recieve-message');
    var recievedMessageContainer = document.createElement('div');
    var timeStamp = document.createElement('div');
    timeStamp.classList.add('time-stamp');
    timeStamp.innerText = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    recievedMessageContainer.appendChild(timeStamp);
    recievedMessageContainer.classList.add('recieve-message-container');
    recievedMessageContainer.appendChild(recievedMessageElement);
    msgContainer.appendChild(recievedMessageContainer);
    jumpToPageBottom();
}
var send = document.getElementById('sendMsgBtn');
var msgContainer = document.getElementById('chatContainer');
var sendMsg = function() {
    var userMsg = document.getElementById('userInput').value;
    if (userMsg !== '') {
        sendMessage(userMsg);
    }
};

function jumpToPageBottom() {
    window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
    document.getElementById('userInput').focus();
}
send.onclick = sendMsg;
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMsg();
    }
});

document.getElementById('join-room-btn').onclick = function() {
    socket.emit('join-room', room_id);
}
