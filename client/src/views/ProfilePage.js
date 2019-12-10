import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
import UserProfile from "../components/UserProfile";
import FeedPosts from "../components/FeedPosts";
import { BASEURL } from "../constants";
axios.defaults.withCredentials = true;

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectHome: false,
      userIDOfLoggedIn: null,
      userLoggedIn: null,
      userIDOfPage: null,
      userOfPage: null,
      redirectFeed: false
    };
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }
  componentDidMount() {
    let { userID } = this.props.match.params;
    console.log(this.props.match);
    //user ID of page
    console.log("USER", userID);
    this.setState({ userIDOfPage: userID });
    //get the user logged in
    axios.get(`${BASEURL}/session`).then(resp => {
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
    axios.get(`${BASEURL}/getUser`, { params: { userID: userID } }).then(resp => {
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
  handleHomeClick() {
    this.setState({ redirectFeed: true });
  }

  render() {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
    if (!this.state.userLoggedIn || !this.state.userOfPage) {
      return <div>LOADING</div>;
    }
    if (this.state.redirectFeed) {
      return <Redirect to="/feed" />;
    }

    return (
      <div style={container}>
        <Header
          user={this.state.userLoggedIn}
          redirect={this.handleHomeClick}
          isProf={true}
        />
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
