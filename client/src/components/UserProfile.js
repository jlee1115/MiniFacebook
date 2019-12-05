import React, { Component } from "react";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  componentDidMount() {
    this.setState({ user: this.props.user });
  }
  render() {
    if (!this.state.user) {
      return (
        <div style={main}>
          <h3>LOADING...</h3>
        </div>
      );
    }
    console.log("PROFI", this.state.user);

    return (
      <div style={main}>
        <div style={profInfo}>
          User Profile
          <div>
            {this.state.user.fname} {this.state.user.lname}
          </div>
          <div style={friends}>FRIENDS!</div>
        </div>
      </div>
    );
  }
}
const main = {
  backgroundColor: "#c7e0de",
  marginRight: "10px",
  padding: "15px"
};
const profInfo = {};
const friends = {};
