import React, { Component } from "react";
import "../index.css";
import Login from "./Login";
import LogoutButton from "./LogoutButton";
import { Redirect } from "react-router";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToFeed: false,
      redirectToProfile: false
    };
    this.goToHome = this.goToHome.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }
  goToHome(e) {
    this.setState({ redirectToFeed: true });
  }
  goToProfile(e) {
    this.setState({ redirectToProfile: true });
  }
  render() {
    if (this.state.redirectToFeed) {
      return <Redirect to="/feed" />;
    }
    if (this.state.redirectToProfile) {
      let id = this.props.user.email.replace("@", "");
      return (
        <Redirect
          to={{
            pathname: `/profile/${id}`,
            state: { userID: id }
          }}
        />
      );
    }
    console.log("PROPS", this.props);
    return (
      <nav style={header}>
        <div>
          {" "}
          Welcome{" "}
          {this.props.user ? (
            <span className="headerProfileLink" onClick={this.goToProfile}>
              {this.props.user.fname}{" "}
            </span>
          ) : (
            ""
          )}
          !
        </div>
        {this.props.user ? (
          <div className="headerHomeLink" style={headerText} onClick={this.goToHome}>
            SadBook
          </div>
        ) : (
          <div style={headerText}>SadBook</div>
        )}

        {this.props.user ? <LogoutButton /> : <Login style={login} />}
      </nav>
    );
  }
}
const header = {
  height: "100px",
  background: "#adb6c2",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  marginBottom: "20px"
};
const headerText = {
  fontSize: "32px",
  color: "white"
};
const login = {
  maxHeight: "100%"
};
