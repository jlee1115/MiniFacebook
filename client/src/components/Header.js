import React, { Component } from "react";
import "../index.css";
import Login from "./Login";

export default class Header extends Component {
  render() {
    return (
      <nav style={header}>
        <div> Welcome!</div>
        <div style={headerText}>SadBook</div>
        <Login style={login} />
      </nav>
    );
  }
}
const header = {
  height: "100px",
  background: "#adb6c2",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  marginBottom: "20px"
};
const headerText = {
  fontSize: "32px",
  color: "white"
};
const login = {
  maxHeight: "100%"
};
