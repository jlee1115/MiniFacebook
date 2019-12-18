import React, { Component } from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";
import { BASEURL } from "../constants";
import axios from "axios";
axios.defaults.withCredentials = true;

export default class Home extends Component {
  componentDidMount() {
    axios.get(`${BASEURL}/configHome`);
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
