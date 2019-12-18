import React, { Component } from "react";
import { BASEURL } from "../../src/constants";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";
import LikeModal from "./LikeModal";
axios.defaults.withCredentials = true;

export default class LikeOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      allLikes: [],
      showLikes: false
    };
    this.checkIfLiked = this.checkIfLiked.bind(this);
    this.addLike = this.addLike.bind(this);
    this.getAllLikes = this.getAllLikes.bind(this);
    this.removeLike = this.removeLike.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentDidMount() {
    this.checkIfLiked();
    this.getAllLikes();
    setInterval(this.getAllLikes, 1500);
    setInterval(this.checkIfLiked, 1500);
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
        if (!resp.data.err) {
          let likedOrNot = resp.data.liked;
          this.setState({ liked: likedOrNot });
        }
      });
  }
  addLike() {
    axios
      .post(`${BASEURL}/likePost`, {
        user: this.props.userLoggedIn,
        postID: this.props.post.id
      })
      .then(resp => {
        if (!resp.data.err) {
          this.setState({ liked: !this.state.liked });
        }
      });
  }
  handleCloseModal() {
    console.log("closed");
    this.setState({ showLikes: false });
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
        }
        this.setState({ allLikes: resp.data.likes });
        // console.log("GET ALL LIKES", resp.data);
      });
  }
  removeLike() {
    axios
      .post(`${BASEURL}/unlikePost`, {
        user: this.props.userLoggedIn,
        postID: this.props.post.id
      })
      .then(resp => {
        // console.log(resp.data);
        if (!resp.data.err) {
          this.setState({ liked: false });
        }
      });
  }
  showModal() {
    this.setState({ showLikes: !this.state.showLikes });
  }
  render() {
    if (!this.state.allLikes) {
      return <h6>Loading...</h6>;
    }
    return (
      <div style={likeBlock}>
        <div>
          {this.state.liked ? (
            <button className="postText" onClick={this.removeLike}>
              Unlike
            </button>
          ) : (
            <p className="buttonostText" onClick={this.addLike}>
              <FaThumbsUp className="linker" />
            </p>
          )}
        </div>
        <p className="linker" onClick={this.showModal}>
          {this.state.allLikes.length} Like(s)
        </p>
        {this.state.showLikes ? (
          <LikeModal
            likes={this.state.allLikes}
            handleX={this.handleCloseModal.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}
const likeBlock = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  margin: "0px 10px"
};
