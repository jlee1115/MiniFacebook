import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div className="container">
        <h3>Signup</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            class="form-control"
            type="text"
            name="fname"
            id=""
            placeholder="First Name"
          />
          <input
            class="form-control"
            type="text"
            name="lname"
            id=""
            placeholder="Last Name"
          />
          <input
            class="form-control"
            type="text"
            name="affiliation"
            id=""
            placeholder="Affiliation"
          />
          <input
            class="form-control"
            type="email"
            name="email"
            id=""
            placeholder="Email"
          />
          <p>Birthday</p>
          <input class="form-control" type="date" name="" id="" placeholder="Birthday" />
          <br />
          <button class="btn btn-primary" type="submit" value="Signup">
            Signup
          </button>
        </form>
      </div>
    );
  }
}
