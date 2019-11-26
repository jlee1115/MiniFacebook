import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }
  render() {
    return (
      <div class="container">
        <h3>Login in PennBook</h3>
        <form onSubmit={this.handleSubmit}>
          <input class="form-control" type="text" name="" id="" placeholder="Username" />
          <input
            class="form-control"
            type="password"
            name=""
            id=""
            placeholder="Password"
          />
          <button class="btn btn-primary" type="submit" value="Login">
            Log in
          </button>
        </form>
      </div>
    );
  }
}
