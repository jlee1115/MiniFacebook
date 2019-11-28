import React, { Component } from "react";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //make a request and get the user
  }
  render() {
    return (
      <div className="columns">
        <div className="columns-is-4"> first column</div>
        <div className="columns-is-8">second </div>
      </div>
    );
  }
}
