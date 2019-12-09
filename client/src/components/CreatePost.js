import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid-random";
axios.defaults.withCredentials = true;

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      to: null,
      from: null,
      date: null,
      id: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }
  componentDidMount() {
    let userTo = this.props.userTo;
    let userFrom = this.props.userFrom;
    this.setState({ to: userTo, from: userFrom });
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
      toUser: this.props.userTo,
      fromUser: this.props.userFrom,
      id: uuid()
    };
    // console.log("POST!", post);
    //makes the post
    axios.post(`${baseurl}/addPost`, { post: post }).then(resp => {
      //response
      if (resp.data.error) {
        //something went wrong
      } else {
        this.setState({ content: "" });
      }
      //   console.log(resp);
    });
  }
  render() {
    if (!this.state.to || !this.state.from) {
      return <h4>Loading...</h4>;
    }
    // console.log(this.state.to, this.state.from);
    return (
      <div style={createPost}>
        {this.state.to.email.replace("@", "") ===
        this.state.from.email.replace("@", "") ? (
          <span>
            <h4>What is on your mind? Create a post</h4>
          </span>
        ) : (
          <span>
            <h4>Post on {this.state.to.fname}'s timeline</h4>
          </span>
        )}

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
