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
      content: this.state.content,
      toUser: this.props.userTo.email.replace("@", ""),
      fromUser: this.props.userFrom.email.replace("@", "")
    };
    console.log("POST!", post);
    //makes the post
    axios.post(`${baseurl}/addPost`, { post: post }).then(resp => {
      //response
      if (resp.data.error) {
        //something went wrong
      } else {
        this.setState({ content: "" });
      }
      console.log(resp);
    });
  }
  render() {
    return (
      <div style={createPost}>
        What's on your mind? Create a post
        <form onSubmit={this.submitPost}>
          <textarea
            ref="postBox"
            className="postBox"
            placeholder="I'm hungry..."
            onChange={this.handleChange}
            value={this.state.content}
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
