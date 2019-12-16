import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { BASEURL } from "../constants";
axios.defaults.withCredentials = true;

export default class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isFriend: false,
      added: false
    };
    this.handleFriendClick = this.handleFriendClick.bind(this);
  }
  componentDidMount() {
    let { userTo } = this.props;
    console.log("USER TO IN AFF FRIEND", userTo);
    axios
      .get(`${BASEURL}/checkIfFriend`, {
        params: { user: userTo.email.replace("@", "") }
      })
      .then(resp => {
        console.log(resp.data);
        if (!resp.data.error) {
          let ans = resp.data.isFriends;
          this.setState({ isFriend: ans });
        }
      });
  }
  handleFriendClick(e) {
    e.preventDefault();

    let { userTo } = this.props;
    axios.post(`${BASEURL}/sendReq`, { userTo }).then(resp => {
      console.log(resp.data);
      if (resp.data.redirect) {
        this.setState({ redirect: true });
      } else if (!resp.data.error) {
        this.setState({ added: true });
      }
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {this.state.isFriend ? (
          <p>Already Friends</p>
        ) : this.state.added ? (
          <p>Added</p>
        ) : (
          <button onClick={this.handleFriendClick}>add friend</button>
        )}{" "}
      </div>
    );
  }
}
