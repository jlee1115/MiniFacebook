import React, { Component } from "react";
import "../index.css";

export default class Header extends Component {
  render() {
    return (
      <nav style={header}>
        <div style={headerText}>*Insert name here</div>
      </nav>
    );
  }
}
const header = {
  height: "50px",
  background: "#ffb6c1",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  marginBottom: "20px"
};
const headerText = {
  size: "12px",
  color: "white"
};
