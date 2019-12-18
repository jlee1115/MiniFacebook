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
          }}
        />
      );
    }
    let { user } = this.props;
    return (
      <div style={person}>
        <p style={userBlockName}>
          {user.fname} {user.lname}
        </p>
        <button onClick={this.handleClick}>view profile</button>
        {this.props.isFriend ? null : <AddFriend userTo={user} />}
      </div>
    );
  }
}
const userBlockName = {
  margin: "0",
  fontWeight: "500"
};
const person = {
  backgroundColor: "#b5c6cf",
  padding: "10px",
  margin: "10px"
};
