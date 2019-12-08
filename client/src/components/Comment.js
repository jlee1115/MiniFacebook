import React, { Component } from "react";

export default class Comment extends Component {
  render() {
    let { comment } = this.props;
    return (
      <div>
        {`${comment.user.fname} ${comment.user.lname}: `}
        {comment.content}
      </div>
    );
  }
}
