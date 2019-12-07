import React, { Component } from "react";
import Post from "./Post";

export default class PostDisplay extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //do something
  }
  render() {
    let { posts } = this.props;
    console.log(posts);
    return (
      <div style={allPosts}>
        {posts.map(p => (
          <Post post={p} />
        ))}
      </div>
    );
  }
}
const allPosts = {
  marginTop: "20px"
};
