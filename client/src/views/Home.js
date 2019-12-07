import React, { Component } from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";
import { Redirect } from "react-router";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Signup />
      </div>
    );
  }
}
