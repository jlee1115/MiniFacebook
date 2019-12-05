import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      errMessage: null,
      redirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    let baseurl = "http://localhost:8000";
    e.preventDefault();
    if (this.state.ID === "" || this.state.password === "") {
      alert("Need a email and password");
      return;
    }
    const user = {
      email: this.state.email,
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
        <Redirect to={{ pathname: "/profile", state: { email: this.state.email } }} />
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
            placeholder="email"
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
          <button class="btn btn-secondary btn-sm" type="submit" value="Login">
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
