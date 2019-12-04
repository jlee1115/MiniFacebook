import React, { Component } from "react";

export default class LogoutButton extends Component {
  render() {
    return (
      <div>
        <p style={logoutBtn}>Logout</p>
      </div>
    );
  }
}
const logoutBtn = {
  margin: "20px",
  borderRadius: "10px",
  color: "white",
  backgroundColor: "#c7e0de"
};
