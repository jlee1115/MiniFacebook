import React, { Component } from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";
import Signup2 from "../components/Signup2";

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
