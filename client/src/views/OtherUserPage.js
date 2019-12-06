import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Header from "../components/Header";
import CreatPost from "../components/CreatePost";
import UserProfile from "../components/UserProfile";

export default class OtherUserPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //fetch the person's info
  }
  render() {
    return (
      <div style={container}>
        <Header email={this.state.email} />
        <div style={innerContainer}>
          {/* {console.log(this.state.user)} */}
          {/* <div>{this.state.user.fname + " " + this.state.user.lname}</div>
          <div>{this.state.user.affiliation}</div> */}
          <div>
            <UserProfile user={this.state.user} />
          </div>
          <div>
            <CreatPost />
          </div>
        </div>
      </div>
    );
  }
}
const container = {
  // display: "grid"
};
const innerContainer = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  margin: "20px"
};
