import React, { Component } from "react";
import axios from "axios";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      to: null,
      from: null,
      date: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }
  handleChange(e) {
    this.setState({ content: e.target.value });
  }
  submitPost(e) {
    let baseurl = "http://localhost:8000";
    e.preventDefault();
    this.setState({ date: new Date() });
    let post = {
      date: new Date(),
      content: this.state.content
    };
    axios.post(`${baseurl}/login`, { post: post }).then(resp => {
      //response
    });
  }
  render() {
    return (
      <div style={createPost}>
        What's on your mind? Create a post
        <form action="/makePost" method="post">
          <textarea
            className="postBox"
            placeholder="I'm hungry..."
            onChange={this.handleChange}
          />
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
