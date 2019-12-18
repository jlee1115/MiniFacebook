import React, { Component } from "react";
import SearchResultUser from "./SearchResultUser";

export default class SearchResults extends Component {
  render() {
    let { users } = this.props;
    return (
      <div style={userSearch}>
        {users.map(u => (
          <SearchResultUser user={u} />
        ))}
      </div>
    );
  }
}
const userSearch = {
  display: "flex",
  flexDirection: "column"
};
