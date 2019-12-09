import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import UserProfile from "../components/UserProfile";
import Header from "../components/Header";
import PostDisplay from "../components/PostDisplay";
import CreatePost from "../components/CreatePost";
import { BASEURL } from "../constants";
axios.defaults.withCredentials = true;

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      redirectHome: false,
      posts: null
    };
    this.getPosts = this.getPosts.bind(this);
  }
  componentDidMount() {
    //get the user if any
    //gets user
    axios.get(`${BASEURL}/session`).then(resp => {
      //   console.log(resp.data.user);
      //do something with the response
      let user = resp.data.user;
      if (!user) {
        this.setState({ redirectHome: true });
      } else {
        this.setState({ user: user });
      }
    });
    this.getPosts();
    setInterval(this.getPosts, 3000);
  }
  getPosts() {
    axios.get(`${BASEURL}/allPosts`).then(resp => {
      console.log(resp.data.items);
      if (resp.data.err) {
        this.setState({ redirectHome: true });
      } else {
        this.setState({ posts: resp.data.items });
      }
    });
  }
  render() {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
    if (!this.state.user || !this.state.posts) {
      return <h3>Loading...</h3>;
    }
    return (
      <div>
        <Header user={this.state.user} />
        <div style={innerContainer}>
          <div>
            <UserProfile user={this.state.user} />
          </div>
          <div>
            <CreatePost userTo={this.state.user} userFrom={this.state.user} />
            <PostDisplay posts={this.state.posts} userLoggedIn={this.state.user} />
          </div>
          <div>insert friend recs here</div>
        </div>
      </div>
    );
  }
}
const innerContainer = {
  display: "grid",
  gridTemplateColumns: "1fr 4fr 1fr",
  margin: "20px"
};
