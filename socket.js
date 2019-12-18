const io = require('./index.js').io

const { USER_CONNECTED, GROUP_CHAT, MESSAGE_RECIEVED, 
    MESSAGE_SENT, PRIVATE_MESSAGE} = require('./client/src/Events');

const { createUser, createMessage, createChat } = require('./client/src/Functions');
let onlineUsers = {};
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

    //Get the group chat of everyone
    socket.on(GROUP_CHAT, function (callback) {
        callback(groupChat);
    });

    socket.on(MESSAGE_SENT, ({chatId, message}) => {
        sendFromUser(chatId, message);
    })

    socket.on(PRIVATE_MESSAGE, ({receiver, sender, activeChat})=>{
        console.log("hi.", receiver, sender);
        console.log("the onlineUsers", onlineUsers);
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