import React, { Component } from "react";

export default class Comment extends Component {
  render() {
    let { comment } = this.props;
    return (
      <div style={commentStyle}>
        <p class="postText commentName">{`${comment.user.fname} ${comment.user.lname} `}</p>
        <p style={{ fontSize: "8px" }} className="commentDate postText">
          {new Date(comment.date).toUTCString()}
        </p>
        <p class="postText commentContent">{comment.content}</p>
      </div>
    );
  }
}
const commentStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  margin: "10px",
  borderRadius: "20px",
  padding: "10px"
};
