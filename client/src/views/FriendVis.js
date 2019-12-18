import React, { Component } from "react";
import { BASEURL } from "../../src/constants";
import axios from "axios";
axios.defaults.withCredentials = true;

export default class FriendVis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    //get the data for visualizer
  }
  render() {
    return <div></div>;
  }
}
