import React, { Component } from "react";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  componentDidMount() {
    this.setState({ user: this.props.user });
  }
  render() {
    if (!this.state.user) {
      return (
        <div style={main}>
          <h3>LOADING...</h3>
        </div>
      );
    }
    let { user } = this.state;

    return (
      <div style={main}>
        <div style={profInfo}>
          <h3>User Profile</h3>
          <div>
            <p className="userInfo" style={{ fontWeight: "bold" }}>
              name
            </p>
            <p className="userInfo" style={{ fontWeight: 200 }}>
              {this.state.user.fname} {this.state.user.lname}
            </p>
          </div>
          <div>
            <p className="userInfo" style={{ fontWeight: "bold" }}>
              affiliation
            </p>
            <p className="userInfo" style={{ fontWeight: 200 }}>
              {this.state.user.affiliation}
            </p>
          </div>
          <div>
            <p className="userInfo" style={{ fontWeight: "bold" }}>
              interests
            </p>
            <div className="userInfo" style={{ fontWeight: 200 }}>
              {user.interests.map(a => (
                <p className="userInfo">{a}</p>
              ))}
            </div>
          </div>

          {/* <div style={friends}>FRIENDS!</div> */}
        </div>
      </div>
    );
  }
}
const main = {
  backgroundColor: "#c7e0de",
  marginRight: "10px",
  padding: "15px"
};
const profInfo = {};
const friends = {};
