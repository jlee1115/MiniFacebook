import React, { Component } from "react";

export default class CreatePost extends Component {
  render() {
    return (
      <div style={createPost}>
        What's on your mind? Create a post
        <form action="/makePost" method="post">
          <textarea className="postBox" placeholder="I'm hungry..." />
          <div>
            <button class="btn btn-secondary btn-sm" type="submit" value="Login">
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const createPost = {
  position: "sticky",
  backgroundColor: "#c7e0de",
  textAlign: "center",
  padding: "15px"
};
