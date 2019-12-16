import React, { Component } from "react";
import axios from "axios";
import { BASEURL } from "../../src/constants";
axios.defaults.withCredentials = true;

export default class FriendReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      takenCareOf: false
    };
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }
  handleAccept(e) {
    console.log("HELLLLL");
    e.preventDefault();
    axios
      .post(`${BASEURL}/respondToReq`, {
        whetherAccept: true,
        userFrom: this.props.request
      })
      .then(resp => {
        console.log("HELLLLL2");
        console.log("ACCEPT", resp.data);
        if (!resp.data.error) {
          this.setState({ takenCareOf: true });
        }
      });
  }
  handleReject(e) {
    e.preventDefault();
    axios
      .post(`${BASEURL}/respondToReq`, {
        whetherAccept: false,
        userFrom: this.props.request
      })
      .then(resp => {
        console.log("REJECT", resp.data);
        if (!resp.data.error) {
          this.setState({ takenCareOf: true });
        }
      });
  }
  render() {
    //   This is the name
    let req = this.props.request;
    return (
      <div>
        {req}
        {this.state.takenCareOf ? (
          <p>Responded!</p>
        ) : (
          <div style={decision}>
            <button onClick={this.handleAccept}>Accept</button>
            <button onClick={this.handleReject}>Deny</button>
          </div>
        )}
      </div>
    );
  }
}
const decision = {
  display: "flex",
  flexDirection: "row"
};
