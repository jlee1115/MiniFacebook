import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { BASEURL } from "../constants";
axios.defaults.withCredentials = true;

export default class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
      user: null
    };
    this.handleClick = this.handleClick.bind(this);
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
          // if (!user) {
          //   this.setState({ redirectHome: true });
          //   return;
          // }

          this.setState({ user: user });
        }
      });
  }
  handleClick(e) {
    e.preventDefault();
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
      <div onClick={this.handleClick} className="linker">
        {user.fname} {user.lname}
      </div>
    );
  }
}
