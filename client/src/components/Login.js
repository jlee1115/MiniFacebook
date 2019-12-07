import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";
axios.defaults.withCredentials = true;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      password: null,
      errMessage: null,
      redirect: false,
      email: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    let baseurl = "http://localhost:8000";
    e.preventDefault();
    if (
      !this.state.email ||
      this.state.email === "" ||
      !this.state.password ||
      this.state.password === ""
    ) {
      alert("Need a userID and password");
      return;
    }
    this.setState({
      userID: this.state.email.replace("@", "")
    });
    const user = {
      userID: this.state.email.replace("@", ""),
      password: this.state.password
    };
    axios.post(`${baseurl}/login`, { user: user }).then(resp => {
      //awesome!! this sends back data
      console.log(resp.data);
      if (resp.data.error) {
        //some error occurred
        alert(resp.data.error);
        return;
      } else {
        // console.log("YAY!");
        this.setState({ redirect: true });
      }
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    if (this.state.redirect) {
      return (
        // <Redirect to="/profile"/>
        <Redirect
          to={{
            pathname: `/profile/${this.state.userID}`,
            state: { userID: this.state.userID }
          }}
        />
      );
    }
    return (
      <div>
        {/* <h6>Login </h6> */}
        <form style={formStyle} onSubmit={this.handleSubmit}>
          <input
            // class="form-control"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={this.handleChange}
          />
          <input
            // class="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button className="btn btn-secondary btn-sm" type="submit" value="Login">
            Log in
          </button>
        </form>
        {/* Already have an account? <Link to="/signup">Signup</Link> */}
      </div>
    );
  }
}
const formStyle = {
  display: "flex",
  flexDirection: "column"
};
