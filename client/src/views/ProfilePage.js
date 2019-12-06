import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Header from "../components/Header";
import CreatPost from "../components/CreatePost";
import UserProfile from "../components/UserProfile";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      redirectHome: false,
      user: null
    };
  }
  componentDidMount() {
    if (!this.props.location.state) {
      this.setState({ redirectHome: true });
    }
    let email = this.props.location.state.email;
    console.log("PROPS", email);
    //if no user passed in, then sucks
    if (!email) {
      console.log("h");
      this.setState({ redirectHome: true });
    }

    let baseurl = "http://localhost:8000";
    axios.get(`${baseurl}/session`, { params: { email: email } }).then(resp => {
      if (resp.data.error || !resp.data) {
        this.setState({ redirectHome: true });
        return;
      } else {
        console.log("PROFILE DID MOUNT", resp.data);
        let user = resp.data.user;
        console.log(user);
        // let fname = user.fname;
        this.setState({ user: user });
        // console.log(resp.data.email);
        //do something with the response
        if (resp.data.email) {
          this.setState({ email: resp.data.email });
        }
      }
    });
  }

  render() {
    if (!this.state.user) {
      return <div>LOADING</div>;
    }
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
    // if (!this.state.name) {
    //   return <Redirect to="/" />;
    // }
    //yay!! the props passed
    console.log(this.props.email);
    //this gets the email
    console.log(this.props.location.state.email);
    return (
      <div style={container}>
        <Header email={this.state.email} />
        <div style={innerContainer}>
          {/* {console.log(this.state.user)} */}
          {/* <div>{this.state.user.fname + " " + this.state.user.lname}</div>
          <div>{this.state.user.affiliation}</div> */}
          <div>
            <UserProfile user={this.state.user} />
          </div>
          <div>
            <CreatPost />
          </div>
        </div>
      </div>
    );
  }
}
const container = {
  // display: "grid"
};
const innerContainer = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  margin: "20px"
};
