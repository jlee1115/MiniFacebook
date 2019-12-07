import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
      showCommentBox: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.toggleCommentBox = this.toggleCommentBox.bind(this);
  }
  handleChange(e) {
    this.setState({ comment: e.target.value });
  }
  handleCommentSubmit() {
    //make a post req
  }
  toggleCommentBox() {
    this.setState({ showCommentBox: !this.state.showCommentBox });
  }
  render() {
    let post = this.props.post;
    return (
      <div style={postStyle}>
        {post.fromUser === post.toUser ? (
          <p className="postText"> {post.fromUser}</p>
        ) : (
          <p className="postText">
            {post.fromUser} to {post.toUser}
          </p>
        )}
        <p className="postText postDate">{new Date(post.date).toUTCString()}</p>
        <p className="postContent">{post.content}</p>
        {this.state.showCommentBox ? (
          <div>
            <form style={commentBox} onSubmit={this.handleCommentSubmit}>
              <input
                // className="postBox"
                placeholder="Add a comment"
                onChange={this.handleChange}
              ></input>
              <button type="submit">Post</button>
            </form>
            <p className="pBtn" onClick={this.toggleCommentBox}>
              Hide comment box
            </p>
          </div>
        ) : (
          <button onClick={this.toggleCommentBox}>Add a comment</button>
        )}
      </div>
    );
  }
}
const postStyle = {
  backgroundColor: "#b5c6cf",
  padding: "20px",
  marginTop: "10px"
};
const commentBox = {
  margin: "0px",
  padding: "0px"
  //   dislay: "flex",
  //   flexDirection: "row"
};
