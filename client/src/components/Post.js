import React, { Component } from "react";
import { Redirect } from "react-router";
import Comments from "./Comments";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
      showCommentBox: false,
      redirectTo: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.toggleCommentBox = this.toggleCommentBox.bind(this);
    this.handleClickNameFrom = this.handleClickNameFrom.bind(this);
    this.handleClickNameTo = this.handleClickNameTo.bind(this);
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
  handleClickNameFrom() {
    this.setState({ redirectTo: this.props.post.fromUser });
  }
  handleClickNameTo() {
    this.setState({ redirectTo: this.props.post.toUser });
  }
  render() {
    // if (this.state.redirectTo) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: `/profile/${this.state.redirectTo.email.replace("@", "")}`,
    //         state: { userID: this.state.redirectTo.email.replace("@", "") }
    //       }}
    //     />
    //   );
    //   //   return <Redirect to={`/profile/${this.state.redirectTo.email.replace("@", "")}`} />;
    // }
    let post = this.props.post;
    return (
      <div style={postStyle}>
        {post.fromUser.email.replace("@", "") === post.toUser.email.replace("@", "") ? (
          <p className="postText">
            {" "}
            <span onClick={this.handleClickNameFrom}>
              {post.fromUser.fname} {post.fromUser.lname}
            </span>
          </p>
        ) : (
          <p className="postText">
            <span onClick={this.handleClickNameFrom}>
              {post.fromUser.fname + " " + post.fromUser.lname}
            </span>{" "}
            to{" "}
            <span onClick={this.handleClickNameTo}>
              {post.toUser.fname + " " + post.toUser.lname}
            </span>
          </p>
        )}
        <p className="postText postDate">{new Date(post.date).toUTCString()}</p>
        <p style={contentBox} className="postContent">
          {post.content}
        </p>
        {this.state.showCommentBox ? (
          <div>
            <Comments id={post.id} />
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
          <button style={btnSm} onClick={this.toggleCommentBox}>
            Add a comment
          </button>
        )}
      </div>
    );
  }
}
const postStyle = {
  backgroundColor: "#b5c6cf",
  padding: "10px",
  marginTop: "10px"
};
const commentBox = {
  margin: "0px",
  padding: "0px"
  //   dislay: "flex",
  //   flexDirection: "row"
};
const btnSm = {
  fontSize: "10px"
};
const contentBox = {
  backgroundColor: "white",
  padding: "10px"
};
