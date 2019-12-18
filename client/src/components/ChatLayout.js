import React, {Component} from 'react';
import io from 'socket.io-client'
import axios from "axios";
import { USER_CONNECTED, LOGOUT } from '../Events';
import { BASEURL } from "../constants";
import ChatContainer from './ChatContainer';
axios.defaults.withCredentials = true;


const socketURL = "http://localhost:8000"
export default class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            socket:null,
            user:null
        };
    }
    componentWillMount() {
        this.initSocket()

        axios.get(`${BASEURL}/session`).then(resp => {
            if (resp.data.error || !resp.data) {
              return;
            } else {
              let user = resp.data.user;
              console.log(user);
              this.setState({ user: user});

              const {socket} = this.state;
              socket.emit(USER_CONNECTED, user);
            }
          });
    }

    initSocket = () => {
        const socket = io(socketURL);
        this.setState({socket})
    }

    logout = () => {
        const {socket} = this.state;
        socket.emit(LOGOUT);
        this.setState({user:null});
    }
    render() {
        const { title } = this.props
        const { socket, user } = this.state
        return (
            <div className = "container">
                { 
                    <ChatContainer socket = {socket} user = {user} />
                }
            </div>
        );
  }
}
