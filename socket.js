const io = require('./index.js').io

const { USER_CONNECTED, GROUP_CHAT, MESSAGE_RECIEVED, 
    MESSAGE_SENT, PRIVATE_MESSAGE, LOAD_MESSAGE} = require('./client/src/Events');

const { createUser, createMessage, createChat } = require('./client/src/Functions');
let onlineUsers = {};
let chats = {};
let groupChat = createChat()

module.exports = function(socket) {
    console.log("Socket Id" + socket.id);

    let sendFromUser;

    socket.on(USER_CONNECTED, (user) => {
        user.socketId = socket.id
        console.log("here is the user", user);
        onlineUsers = addUser(onlineUsers, user);
        socket.user = user;
        sendFromUser = sendMessageToChat(user.fname);
        console.log("here are the online users");
        console.log(onlineUsers);
        io.emit(USER_CONNECTED, onlineUsers);
    });

    socket.on(LOAD_MESSAGE, (chat) => {
        chats = chat;
        console.log("the chat", chat);
        var i = 0;
        do {
          console.log("here is one chat", chat[i]);
          let from = chat[i].from;
          let to = chat[i].to;
          const receiverSocket = onlineUsers[from].socketId;
          const newChat = createChat({ name:`${from} and ${to}`, users:[from, to] });
          socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChat);
          socket.emit(PRIVATE_MESSAGE, newChat);
        }
        while (i < chat.length);

    });

    //Get the group chat of everyone
    socket.on(GROUP_CHAT, function (callback) {
        callback(groupChat);
    });

    socket.on(MESSAGE_SENT, ({chatId, message}) => {
        console.log("THE CHAT ID IS", chatId);
        sendFromUser(chatId, message);
    })

    socket.on(PRIVATE_MESSAGE, ({receiver, sender, activeChat})=>{
        console.log("WHAT ABOUT NOW????");
		if(receiver in onlineUsers){
            const receiverSocket = onlineUsers[receiver].socketId;
            if (activeChat === null || activeChat.id === groupChat.id) {
                console.log("THE SENDER IS", sender);
                const newChat = createChat({ name:`${receiver} and ${sender}`, users:[receiver, sender] });
                socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChat);
                socket.emit(PRIVATE_MESSAGE, newChat);
            } else {
                socket.to(receiverSocket).emit(PRIVATE_MESSAGE, activeChat);
            }
		}
	})
}

function addUser(list, user){
	let output = Object.assign({}, list);
	output[user.fname] = user;
	return output;
}

function sendMessageToChat(sender) {
    return (chatId, message) => {
        io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}));
    }
}