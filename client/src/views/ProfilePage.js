import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null
    };
  }
  componentDidMount() {
    //get the user if any
    let baseurl = "http://localhost:8000";
    axios.get(`${baseurl}/session`).then(resp => {
      console.log(resp.data.user);
      //do something with the response
      if (resp.data.user) {
        this.setState({ name: resp.data.user, email: resp.data.email });
      }
    });
  }
  render() {
    // if (!this.state.name) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div className="columns">
        <div className="columns-is-4"> first column</div>
        <div className="columns-is-8">second </div>
      </div>
    );
  }
}
