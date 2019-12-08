import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
import UserProfile from "../components/UserProfile";
import FeedPosts from "../components/FeedPosts";
axios.defaults.withCredentials = true;

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectHome: false,
      userIDOfLoggedIn: null,
      userLoggedIn: null,
      userIDOfPage: null,
      userOfPage: null
    };
  }
  componentDidMount() {
    let { userID } = this.props.match.params;
    console.log(this.props.match);
    //user ID of page
    console.log("USER", userID);
    this.setState({ userIDOfPage: userID });
    let baseurl = "http://localhost:8000";
    //get the user logged in
    axios.get(`${baseurl}/session`).then(resp => {
      if (resp.data.error || !resp.data) {
        this.setState({ redirectHome: true, userLoggedIn: false });
        return;
      } else {
        console.log("PROFILE DID MOUNT", resp.data);
        let user = resp.data.user;
        if (!user) {
          this.setState({ redirectHome: true });
          return;
        }
        console.log(user); //what do i do if this is null though
        // let fname = user.fname;
        this.setState({ userLoggedIn: user, userIDOfLoggedIn: resp.data.userID });
      }
    });
    axios.get(`${baseurl}/getUser`, { params: { userID: userID } }).then(resp => {
      if (resp.data.error || !resp.data) {
        this.setState({ redirectHome: true });
        return;
      } else {
        let user = resp.data.user;
        if (!user) {
          //why does this not redirect fml
          this.setState({ redirectHome: true });
          return;
        }
        console.log(user); //if this is null - should redirect??
        // let fname = user.fname;
        this.setState({ userOfPage: user });
      }
    });
  }

  render() {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
    if (!this.state.userLoggedIn || !this.state.userOfPage) {
      return <div>LOADING</div>;
    }

    return (
      <div style={container}>
        <Header user={this.state.userLoggedIn} />
        <div style={innerContainer}>
          {/* {console.log(this.state.user)} */}
          {/* <div>{this.state.user.fname + " " + this.state.user.lname}</div>
          <div>{this.state.user.affiliation}</div> */}
          <div>
            <UserProfile user={this.state.userOfPage} />
          </div>
          <div>
            <CreatePost
              userTo={this.state.userOfPage}
              userFrom={this.state.userLoggedIn}
            />
            <FeedPosts
              user={this.state.userOfPage}
              userID={this.state.userIDOfPage}
              userLoggedIn={this.state.userLoggedIn}
            />
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
