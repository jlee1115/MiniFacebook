import React, { Component, useRef } from "react";
import axios from "axios";
import PostDisplay from "./PostDisplay";
import Post from "./Post";
import { BASEURL } from "../../src/constants";
import InfiniteScroll from "react-infinite-scroller";
axios.defaults.withCredentials = true;

//takes in posts
export default class FeedPosts extends Component {
  constructor(props) {
    super(props);
    // this.observer = React.createRef();
    this.state = {
      posts: null,
      pageNumber: 0,
      loading: false,
      hasMore: true
    };
    this.getPosts = this.getPosts.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.showItems = this.showItems.bind(this);
  }
  componentDidMount() {
    //make an api req
    this.setState({ loading: true });
    this.getPosts();
    setInterval(this.getPosts, 3000);
  }
  getPosts() {
    // console.log("Props", this.props);
    let { pageNumber } = this.state;
    let user = this.props.userID;
    // console.log(user);
    if (user) {
      axios
        .get(`${BASEURL}/userPosts`, { params: { user: user, page: pageNumber } })
        .then(resp => {
          this.setState({ posts: resp.data.posts });
          // this.setState({posts: [...this.state.posts, ...resp.data.posts]})
          // this.setState({hasMore: false})
          // console.log(resp.data);
        });
    } else {
      axios.get(`${BASEURL}/allPosts`, { params: { page: pageNumber } }).then(resp => {
        // console.log(resp.data);
        this.setState({ posts: resp.data.items, hasMore: resp.data.hasMore });
      });
    }
  }
  loadMore() {
    if (this.state.hasMore) {
      setTimeout(() => {
        this.setState({ pageNumber: this.state.pageNumber + 1 }, 2000);
      });
    }
  }
  showItems() {
    let items = [];
    for (let i = 0; i < this.state.posts.length; i++) {
      items.push(
        <Post post={this.state.posts[i]} userLoggedIn={this.props.userLoggedIn} />
      );
    }
    return items;
  }
  render() {
    if (!this.state.posts) {
      return <h3>Loading...</h3>;
    }
    let posts = this.state.posts;
    // console.log(posts);
    return <PostDisplay posts={posts} userLoggedIn={this.props.userLoggedIn} />;
  }
}
