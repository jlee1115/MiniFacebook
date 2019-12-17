import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import AddFriend from "./AddFriend";
axios.defaults.withCredentials = true;

export default class SearchResultUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToProfile: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    //redirect to profile
    e.preventDefault();
    this.setState({ redirectToProfile: this.props.user.email.replace("@", "") });
  }
  render() {
    let { user } = this.props;
    if (this.state.redirectToProfile) {
      return (
        <Redirect
          to={{
            pathname: `/profile/${this.state.redirectToProfile}`
          }}
        />
      );
    }
    return (
      <div onClick={this.handleClick}>
        {user.fname} {user.lname}
      </div>
    );
  }
}
