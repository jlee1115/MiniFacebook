import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { BASEURL } from "../constants";
import { FaWindowClose } from "react-icons/fa";
axios.defaults.withCredentials = true;

export default class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
      user: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
  }
  componentDidMount() {
    axios
      .get(`${BASEURL}/getUser`, { params: { userID: this.props.userID } })
      .then(resp => {
        if (resp.data.error || !resp.data) {
          this.setState({ redirectHome: true });
          return;
        } else {
          let user = resp.data.user;

          this.setState({ user: user });
        }
      });
  }
  removeFriend(e) {
    e.preventDefault();
    let { userID } = this.props;
    console.log("USER ID", userID);
    axios.post(`${BASEURL}/removeFriend`, { userTo: userID }).then(resp => {
      console.log(resp.data);
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log("REDIR", this.props.userID);
    this.setState({ redirectTo: this.props.userID });
  }
  render() {
    if (this.state.redirectTo) {
      return (
        <Redirect
          to={{
            pathname: `/profile/${this.state.redirectTo}`
            // state: { userID: this.state.redirectTo }
          }}
        />
      );
    } else if (!this.state.user) {
      return <p>-</p>;
    }
    let { user } = this.state;
    return (
      <div>
        {this.props.isRec ? null : (
          <span>
            <FaWindowClose className="linker" onClick={this.removeFriend} />{" "}
          </span>
        )}

        <span onClick={this.handleClick} className="linker">
          {user.fname} {user.lname}
        </span>
      </div>
    );
  }
}
