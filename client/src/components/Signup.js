import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";
import FileUpload from "../components/FileUpload";
axios.defaults.withCredentials = true;

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: null,
      lname: null,
      affiliation: null,
      email: null,
      birthday: null,
      password: null,
      changePage: false,
      errMessage: null,
      interests: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    let baseurl = "http://localhost:8000";
    e.preventDefault();
    if (
      !this.state.fname ||
      !this.state.lname ||
      !this.state.affiliation ||
      !this.state.email ||
      !this.state.password ||
      !this.state.birthday ||
      !this.state.password
    ) {
      this.setState({ errMessage: "All fields must be filled" });
      return;
    }

    const user = {
      fname: this.state.fname,
      lname: this.state.lname,
      affiliation: this.state.affiliation,
      email: this.state.email,
      birthday: this.state.birthday,
      interests: this.state.interests.split(",").map(i => i.trim()),
      password: this.state.password
    };
    axios.post(`${baseurl}/signup`, { user: user }).then(resp => {
      console.log("R", resp.data);
      if (resp.data.error) {
        this.setState({ errMessage: resp.data.error });
      } else {
        this.setState({ changePage: true });
      }
      //awesome!! this sends back data
      console.log("post in signup" + resp.data);
    });
  }
  render() {
    if (this.state.changePage) {
      let userID = this.state.email.replace("@", "");
      return (
        <Redirect
          to={{
            pathname: `/profile/${userID}`,
            state: { email: this.state.email.replace("@", "") }
          }}
        />
      );
    }
    return (
      <div className="container">
        <FileUpload />
        <h3>Signup</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            type="text"
            name="fname"
            id=""
            placeholder="First Name"
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="text"
            name="lname"
            id=""
            placeholder="Last Name"
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="text"
            name="affiliation"
            id=""
            placeholder="Affiliation"
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="email"
            name="email"
            id=""
            placeholder="Email"
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="text"
            name="interests"
            placeholder="Interests, separated by commas"
            onChange={this.handleChange}
          />
          <p>Birthday</p>
          <input
            className="form-control"
            type="date"
            name="birthday"
            id=""
            placeholder="Birthday"
            onChange={this.handleChange}
          />

          <br />
          <button className="btn btn-primary" type="submit" value="Signup">
            Signup
          </button>
        </form>
        {this.state.errMessage ? (
          <p style={{ color: "red" }}>{this.state.errMessage}</p>
        ) : null}
      </div>
    );
  }
}
