import React, { Component } from "react";
import ActiveUser from "./ActiveUser";
import { BASEURL } from "../constants";
import axios from "axios";
import { Redirect } from "react-router";
axios.defaults.withCredentials = true;

export default class ActiveUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      redirect: false
      // intervalID: null
    };
    this.getUsers = this.getUsers.bind(this);
  }
  componentDidMount() {
    this.getUsers();
    setInterval(this.getUsers, 1500);
  }
  // componentWillUnmount() {
  //   // clearInterval(this.state.intervalID);
  // }
  getUsers() {
    axios.get(`${BASEURL}/usersOnServer`).then(resp => {
      if (resp.data.error || resp.data.redirect) {
        this.setState({ redirect: true });
      }
      this.setState({ users: resp.data.users });
    });
  }
  render() {
    if (!this.state.users) {
      return (
        <div>
          <h5>Loading users</h5>
        </div>
      );
    }
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="userDisplay">
        Other Active Users rn
        {this.state.users.map(u => {
          return <ActiveUser user={u} />;
        })}
      </div>
    );
  }
}
