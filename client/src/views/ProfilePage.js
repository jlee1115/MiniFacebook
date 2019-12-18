import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
import UserProfile from "../components/UserProfile";
import FeedPosts from "../components/FeedPosts";
import { BASEURL } from "../constants";
import AddFriend from "../components/AddFriend";
import FriendRecs from "../components/FriendRecs";
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
  //get the user logged in and the user of the page
  componentDidMount() {
    let { userID } = this.props.match.params;
    //user ID of page
    this.setState({ userIDOfPage: userID });
    //get the user logged in
    axios.get(`${BASEURL}/session`).then(resp => {
      if (resp.data.error || !resp.data || resp.data.redirect) {
        this.setState({ redirectHome: true, userLoggedIn: false });
        return;
      } else {
        let user = resp.data.user;
        if (!user) {
          this.setState({ redirectHome: true });
          return;
        }
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
          this.setState({ redirectHome: true });
          return;
        }
        this.setState({ userOfPage: user });
      }
    });
  }
  handleHomeClick() {
    this.setState({ redirectFeed: true });
  }
  componentWillUnmount() {
    console.log("unmounted");
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
            {this.state.userIDOfLoggedIn ===
            this.state.userOfPage.email.replace("@", "") ? null : ( // <FriendRecs />
              // <p>me</p>
              <AddFriend userTo={this.state.userOfPage} />
            )}
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
          {/* <div>
            <ActiveUsers />
          </div> */}
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
