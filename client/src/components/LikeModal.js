import React, { Component } from "react";

export default class LikeModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="modalMain">
        <span style={head}>
          <h6>Likes</h6>{" "}
          <h6 onClick={this.props.handleX} className="linker">
            X
          </h6>
        </span>

        {!this.props.likes.length ? (
          <p> No likes </p>
        ) : (
          this.props.likes.map(like => {
            return <div>{`${like.fname} ${like.lname}`}</div>;
          })
        )}
      </div>
    );
  }
}
const head = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around"
};
