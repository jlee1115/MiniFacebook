import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid-random";
import { BASEURL } from "../../src/constants";
import { checkContent } from "../constants";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
axios.defaults.withCredentials = true;

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      to: null,
      from: null,
      date: null,
      id: null,
      public: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.handlePublicClick = this.handlePublicClick.bind(this);
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
    e.preventDefault();
    //makes sure it's sad
    console.log(checkContent(this.state.content));
    if (checkContent(this.state.content).score > 0) {
      alert("This is too positive. Try again");
      return;
    }
    this.setState({ date: new Date() });
    let post = {
      date: new Date(),
      content: this.state.content,
      toUser: this.props.userTo,
      fromUser: this.props.userFrom,
      id: uuid(),
      public: this.state.public
    };
    //makes the post
    axios.post(`${BASEURL}/addPost`, { post: post }).then(resp => {
      //response
      if (resp.data.error) {
        //something went wrong
      } else {
        this.setState({ content: "" });
      }
      //   console.log(resp);
    });
  }
  handlePublicClick() {
    this.setState({ public: !this.state.public });
  }
  render() {
    if (!this.state.to || !this.state.from) {
      return <h4>Loading...</h4>;
    }
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
            <span onClick={this.handlePublicClick}>
              Public {this.state.public ? <FaToggleOn /> : <FaToggleOff />}
            </span>
            <button className="btn btn-secondary btn-sm" type="submit" value="Login">
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
