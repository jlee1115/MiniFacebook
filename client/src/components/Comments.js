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
    };
  }
  componentDidMount() {
    let { id, items } = this.props;
    console.log("rendering the fucking comments", items);
    // console.log("ITEMS", items);
    this.setState({ comments: items });
  }
  render() {
    if (!this.state.comments) {
      return <h6>Loading....</h6>;
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
