import React, { Component } from "react";
import axios from "axios";
import { BASEURL } from "../../src/constants";
import Comment from "../components/Comment";
axios.defaults.withCredentials = true;

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null
      // intervalID: null
    };
    this.getComments = this.getComments.bind(this);
  }
  componentDidMount() {
    this.getComments();
    setInterval(this.getComments, 3000);
  }
  componentWillUnmount() {
    // clearInterval(this.state.intervalID);
  }
  getComments() {
    //get the comments
    let postID = this.props.post.id;
    axios.get(`${BASEURL}/getPostComments`, { params: { postID } }).then(resp => {
      if (resp.data.error) {
        console.log(resp.data.error);
        return;
      }
      this.setState({ comments: resp.data.comments });
    });
  }
  render() {
    if (!this.state.comments) {
      return <h6>Loading....</h6>;
    }
    if (!this.state.comments.length) {
      return (
        <div style={allComments}>
          <p>No comments available for this post</p>
        </div>
      );
    }
    return (
      <div style={commentsBlock}>
        <h5>Comments</h5>
        <div style={allComments}>
          {this.state.comments.map(c => {
            return <Comment comment={c} />;
          })}
        </div>
      </div>
    );
  }
}
const allComments = {
  margin: "10px",
  marginTop: "0px",
  padding: "10px",
  paddintTop: "0px"
};
const commentsBlock = {
  backgroundColor: "#d3d3d3",
  padding: "10px"
};
