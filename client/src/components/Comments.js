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
    console.log("ITEMS", items);
    this.setState({ comments: items });
  }
  render() {
    if (!this.state.comments) {
      return <h5>Loading....</h5>;
    }
    return (
      <div>
        <h5>Comments</h5>
        {this.state.comments.map(c => {
          return <Comment comment={c} />;
        })}
      </div>
    );
  }
}
