import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    //this is correct
    console.log(this.state);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div class="container">
        <h3>Login in PennBook</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            class="form-control"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <input
            class="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button class="btn btn-primary" type="submit" value="Login">
            Log in
          </button>
        </form>
      </div>
    );
  }
}
