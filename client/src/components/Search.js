import React, { Component } from "react";
import { BASEURL } from "../constants";
import axios from "axios";
import SearchResults from "./SearchResults";
axios.defaults.withCredentials = true;
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      suggestions: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ input: e.target.value });
    if (this.state.input !== "") {
      axios.get(`${BASEURL}/searchUsers/${this.state.input}`).then(resp => {
        // console.log(resp.data.users);
        // console.log(resp.data);
        this.setState({ suggestions: resp.data.users.slice(0, 10) });
      });
    } else {
      this.setState({ suggestions: [] });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <form style={formStyle} onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name=""
            id=""
            value={this.state.input}
            placeholder="Search for someone"
          />
          <input type="submit" value="search!" />
        </form>
        {this.state.suggestions.length ? (
          <SearchResults style={searchStyle} users={this.state.suggestions} />
        ) : null}
      </div>
    );
  }
}
const formStyle = {
  display: "flex",
  flexDirection: "row"
};
const searchStyle = {
  position: "relative"
};
