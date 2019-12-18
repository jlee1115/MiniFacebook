import React, { Component } from 'react';
import { FaChevronDown, FaSearch}  from 'react-icons/fa';
import { IoIosMenu } from 'react-icons/io';
import Messages from "./Messages"

export default class SideBar extends Component{
		
	constructor(props) {
		super(props);
		this.state = {
			receiver:""
		}
	}
	
	handleSubmit = (e) => {
		e.preventDefault()
		const { receiver } = this.state
		console.log("The receiver is", receiver);
		const { sendPrivateMessage } = this.props;

		sendPrivateMessage(receiver);
		this.setState({receiver:""});
	}

	render(){
        const { chats, 
                activeChat, 
                user, 
				setActiveChat,
            } = this.props;
	    const {receiver } = this.state;
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">SadBook Chatroom <FaChevronDown /></div>
						<div className="menu">
							<IoIosMenu />
						</div>
					</div>
					<form onSubmit = {this.handleSubmit} className="search">
						<i className="search-icon"><FaSearch /></i>
						<input 
							placeholder="Search" 
							type="text"
							value = {receiver}
							onChange = {(e) => {this.setState({receiver: e.target.value}) }}/>
						<div className="plus"></div>
					</form>
					<div 
						className="users" 
						ref='users' 
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						{
						chats.map((chat)=>{
                            console.log(chat.name);

							if(chat.name){
								const lastMessage = chat.messages[chat.messages.length - 1];
								const chatSideName = chat.name;
								//chat.users.find((name)=>{
								//	return chat.name
								//}) || "Group" 
								const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
								
								return(
								<div 
									key={chat.id} 
									className={`user ${classNames}`}
									onClick={ ()=>{ setActiveChat(chat) } }
									>
									<div className="user-photo">{chatSideName[0].toUpperCase()}</div>
									<div className="user-info">
										<div className="name">{chatSideName}</div>
										{lastMessage && <div className="last-message">{lastMessage.message}</div>}
									</div>
									
								</div>
							)
							}

							return null
						})	
						}
						
					</div>
			</div>
		);
	
	}
}