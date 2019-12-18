import React, { Component } from "react";
import axios from "axios";
import Post from "./Post";
import { BASEURL, DEFAULTNUMPOSTS } from "../../src/constants";
import InfiniteScroll from "react-infinite-scroller";
axios.defaults.withCredentials = true;

//takes in posts
export default class FeedPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      loading: false,
      hasMore: true,
      numItems: DEFAULTNUMPOSTS,
      intervalID: null
    };
    this.getPosts = this.getPosts.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.showItems = this.showItems.bind(this);
  }
  componentDidMount() {
    //make an api req
    this.setState({ loading: true });
    this.getPosts();
    this.intervalID = setInterval(this.getPosts, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }
  getPosts() {
    let user = this.props.userID;
    if (user) {
      axios.get(`${BASEURL}/userPosts`, { params: { user: user } }).then(resp => {
        this.setState({ posts: resp.data.posts });
      });
    } else {
      axios.get(`${BASEURL}/allPosts`).then(resp => {
        this.setState({ posts: resp.data.items });
      });
    }
  }
  loadMore() {
    if (this.state.posts.length <= this.state.numItems) {
      this.setState({ hasMore: false });
    } else if (this.state.hasMore) {
      setTimeout(() => {
        this.setState({ numItems: this.state.numItems + DEFAULTNUMPOSTS });
      }, 2000);
    }
  }

  showItems() {
    let items = [];
    let { posts, numItems } = this.state;
    let upperBound = posts.length < numItems ? posts.length : numItems;
    for (let i = 0; i < upperBound; i++) {
      // console.log("POST", this.state.posts[i]);
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
    // return <PostDisplay posts={posts} userLoggedIn={this.props.userLoggedIn} />;
    return (
      <div>
        <InfiniteScroll
          loadMore={this.loadMore.bind(this)}
          hasMore={this.state.hasMore}
          loader={
            <div className="loader" key={0}>
              Loading...
            </div>
          }
        >
          {this.showItems()}{" "}
        </InfiniteScroll>{" "}
      </div>
    );
  }
}
