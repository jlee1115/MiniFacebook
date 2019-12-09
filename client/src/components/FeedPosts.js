import React, { Component } from "react";
import axios from "axios";
import PostDisplay from "./PostDisplay";
import Post from "./Post";
import { BASEURL } from "../../src/constants";
axios.defaults.withCredentials = true;

//takes in posts
export default class FeedPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
    this.getPosts = this.getPosts.bind(this);
  }
  componentDidMount() {
    //make an api req
    this.getPosts();
    setInterval(this.getPosts, 3000);
  }
  getPosts() {
    // console.log("Props", this.props);
    let user = this.props.userID;
    // console.log(user);
    if (user) {
      axios.get(`${BASEURL}/userPosts`, { params: { user: user } }).then(resp => {
        this.setState({ posts: resp.data.posts });
        // console.log(resp.data);
      });
    } else {
      axios.get(`${BASEURL}/allPosts`).then(resp => {
        // console.log(resp.data);
        this.setState({ posts: resp.data.posts });
      });
    }
  }
  render() {
    if (!this.state.posts) {
      return <h3>Loading...</h3>;
    }
    let posts = this.state.posts;
    // console.log(posts);
    return (
      <PostDisplay posts={posts} userLoggedIn={this.props.userLoggedIn} />
      //   <div>
      //     {posts.map(p => (
      //       <Post post={p} />
      //     ))}
      //   </div>
    );
  }
}
