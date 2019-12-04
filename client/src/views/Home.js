import React, { Component } from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";
import Signup2 from "../components/Signup2";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null
    };
  }
  //   componentDidMount() {
  //     //get the user if any
  //     let baseurl = "http://localhost:8000";
  //     axios.get(`${baseurl}/session`).then(resp => {
  //       console.log(resp.data.user);
  //       //do something with the response
  //       if (resp.data.user) {
  //         this.setState({ name: resp.data.user, name: resp.data.email });
  //       }
  //     });
  //   }
  render() {
    return (
      <div>
        <Header name={this.state.name} />
        <Signup />
      </div>
    );
  }
}
