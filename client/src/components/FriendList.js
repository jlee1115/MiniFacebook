import React, { Component } from "react";
import ActiveUser from "./ActiveUser";
import { BASEURL } from "../constants";
import axios from "axios";
import Friend from "./Friend";
axios.defaults.withCredentials = true;
// PLEASE NOTE THIS IS ACTUALLY THEIR FRIENDS.

export default class ActiveUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
      // intervalID: null
    };
    this.getFriends = this.getFriends.bind(this);
  }
  componentDidMount() {
    this.getFriends();
    setInterval(this.getFriends, 1000);
  }
  getFriends() {
    axios.get(`${BASEURL}/allFriends`).then(resp => {
      if (!resp.data.error) {
        this.setState({ users: resp.data.users });
      }
    });
  }
  componentWillUnmount() {
    // clearInterval(this.state.intervalID);
  }
  render() {
    if (!this.state.users) {
      return (
        <div>
          <h5>Loading users</h5>
        </div>
      );
    }
    return (
      <div className="userDisplay">
        <h5>Friends</h5>
        {this.state.users.map(u => {
          return <Friend userID={u} />;
          //   return <ActiveUser user={u} isFriend={true} />;
        })}
      </div>
    );
  }
}
