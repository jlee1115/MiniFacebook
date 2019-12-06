import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
axios.defaults.withCredentials = true;

export default class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    console.log("yay clicked");
    let baseurl = "http://localhost:8000";
    axios.post(`${baseurl}/logout`).then(resp => {
      if (!resp.data.error) {
        this.setState({ success: true });
      }
    });
  }
  render() {
    if (this.state.success) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <p style={logoutBtn} className="logoutBtn" onClick={this.handleClick}>
          Logout
        </p>
      </div>
    );
  }
}
const logoutBtn = {
  margin: "20px",
  borderRadius: "8px",
  color: "white",
  backgroundColor: "#c7e0de",
  padding: "10px"
};
