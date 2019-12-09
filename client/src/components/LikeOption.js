import React, { Component } from "react";
import { BASEURL } from "../../src/constants";
import axios from "axios";
axios.defaults.withCredentials = true;

export default class LikeOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      allLikes: []
    };
    this.checkIfLiked = this.checkIfLiked.bind(this);
    this.addLike = this.addLike.bind(this);
    this.getAllLikes = this.getAllLikes.bind(this);
  }
  componentDidMount() {
    this.checkIfLiked();
    this.getAllLikes();
    setInterval(this.getAllLikes(), 3000);
  }
  checkIfLiked() {
    axios
      .get(`${BASEURL}/checkIfLiked`, {
        params: {
          user: this.props.userLoggedIn,
          postID: this.props.post.id
        }
      })
      .then(resp => {
        //do something
        console.log(resp);
        if (!resp.data.err) {
          let likedOrNot = resp.data.liked;
          console.log(resp.data);
          this.setState({ liked: likedOrNot });
          //   console.log(resp.data);
        }
      });
  }
  addLike() {
    console.log("ADDING LIKE");
    // let obj = {
    //   user: this.props.userLoggedIn,
    //   postID: this.props.post.id
    // };
    axios
      .post(`${BASEURL}/likePost`, {
        user: this.props.userLoggedIn,
        postID: this.props.post.id
      })
      .then(resp => {
        console.log(resp.data);
      });
    this.setState({ liked: !this.state.liked });
  }
  getAllLikes() {
    axios
      .get(`${BASEURL}/addLikesOfPost`, {
        params: {
          user: this.props.userLoggedIn,
          postID: this.props.post.id
        }
      })
      .then(resp => {
        if (!resp.data.err) {
          this.setState({ allLikes: resp.data.likes });
        }
        console.log(resp.data);
      });
  }
  removeLike() {}
  render() {
    return (
      <div style={likeBlock}>
        <div>
          {this.state.liked ? (
            <p className="postText">Unlike</p>
          ) : (
            <button className="buttonostText" onClick={this.addLike}>
              Like
            </button>
          )}
        </div>
        <p>{this.state.allLikes.length} Likes</p>
      </div>
    );
  }
}
const likeBlock = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  margin: "0px 10px"
};
