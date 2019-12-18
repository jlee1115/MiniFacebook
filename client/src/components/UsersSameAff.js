import React, { Component } from "react";
import axios from "axios";
import { BASEURL } from "../constants";
import ActiveUser from "./ActiveUser";
axios.defaults.withCredentials = true;

export default class UsersSameAff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }
  componentDidMount() {
    //
    axios
      .get(`${BASEURL}/usersWithAff`, {
        params: { aff: this.props.userLoggedIn.affiliation }
      })
      .then(resp => {
        this.setState({ users: resp.data.users });
      });
  }
  render() {
    if (!this.state.users) {
      return <div>Loading...</div>;
    }
    return (
      <div className="userDisplay">
        <h5>Other users with the Affiliation: {this.props.userLoggedIn.affiliation}</h5>
        {this.state.users.map(u => {
          return <ActiveUser user={u} />;
        })}
      </div>
    );
  }
}
