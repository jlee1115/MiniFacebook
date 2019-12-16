import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import AddFriend from "./AddFriend";
axios.defaults.withCredentials = true;

export default class ActiveUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.setState({ redirectTo: this.props.user.email.replace("@", "") });
  }

  render() {
    if (this.state.redirectTo) {
      return (
        <Redirect
          to={{
            pathname: `/profile/${this.state.redirectTo}`
            // state: { userID: this.state.redirectTo }
          }}
        />
      );
    }
    let { user } = this.props;
    return (
      <div>
        <p>
          {user.fname} {user.lname}
        </p>
        <button onClick={this.handleClick}>view profile</button>
        <AddFriend userTo={user} />
        {/* <button onClick={this.handleFriendClick}>add friend</button> */}
      </div>
    );
  }
}
