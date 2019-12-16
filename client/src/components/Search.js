import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }
  render() {
    return (
      <div>
        <input type="text" name="" id="" placeholder="Search for something" />
      </div>
    );
  }
}
