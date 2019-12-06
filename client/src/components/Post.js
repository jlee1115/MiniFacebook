import React, { Component } from "react";

export default class Post extends Component {
  render() {
    let post = this.props.post;
    return (
      <div>
        {post.fromUser === post.toUser ? (
          <p>{post.fromUser}</p>
        ) : (
          <p>
            {post.toUser} to {post.fromUser}
          </p>
        )}
        <p>{post.content}</p>
      </div>
    );
  }
}
