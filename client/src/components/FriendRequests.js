import React, { Component } from "react";
import FriendReq from "./FriendReq";
import { BASEURL } from "../constants";
import axios from "axios";
import { Redirect } from "react-router";
axios.defaults.withCredentials = true;

export default class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: null,
      redirect: false
    };
  }
  componentDidMount() {
    axios.get(`${BASEURL}/getReqs`).then(resp => {
      if (resp.data.redirect) {
        this.setState({ redirect: true });
      } else if (!resp.data.error) {
        this.setState({ requests: resp.data.requests });
      }
    });
  }
  render() {
    if (!this.state.requests) {
      return <h5>Loading...</h5>;
    }
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="userDisplay">
        <h5>Friend Requests</h5>
        {this.state.requests.map(r => {
          return <FriendReq request={r} />;
        })}
      </div>
    );
  }
}
