import React, { Component } from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Signup />
      </div>
    );
  }
}
