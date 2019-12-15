import React, { Component } from "react";

export default class LikeModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="modalMain">
        <h6>Likes</h6>
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
