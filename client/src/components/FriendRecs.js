import React, { Component } from "react";
import Friend from "./Friend";
import axios from "axios";
import { BASEURL } from "../constants";
axios.defaults.withCredentials = true;

export default class FriendRecs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: null
    };
  }
  componentDidMount() {
    axios.get(`${BASEURL}/friendReqs`).then(resp => {
      if (!resp.data.error) {
        this.setState({ friends: resp.data.recs });
      }
      console.log("RECS!!", resp.data.recs);
    });
  }
  render() {
    if (!this.state.friends) {
      return (
        <div>
          <h5>Loading users</h5>
        </div>
      );
    }
    return (
      <div className="userDisplay">
        <h4>Friend Recommendations</h4>
        {!this.state.friends.length ? (
          <p>No friends</p>
        ) : (
          this.state.friends.map(f => <Friend userID={f} isRec={true} />)
        )}
        {/* {this.state.friends.map(f => (
          <Friend userID={f} isRec={true} />
        ))} */}
      </div>
    );
  }
}
