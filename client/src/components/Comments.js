import React, { Component } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export default class Comments extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { id } = this.props;
    let baseurl = "http://localhost:8000";
  }
  render() {
    return <div>This is a comment</div>;
  }
}
