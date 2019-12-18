import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { BASEURL } from "../constants";
axios.defaults.withCredentials = true;

export default class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isFriend: false,
      added: false,
      addedMe: false,
      meAddedThem: false
    };
    this.getInfo = this.getInfo.bind(this);
    this.handleFriendClick = this.handleFriendClick.bind(this);
  }
  componentDidMount() {
    this.getInfo();
    setInterval(this.getInfo(), 2000);
    // let { userTo } = this.props;
    // axios
    //   .get(`${BASEURL}/checkIfFriend`, {
    //     params: { user: userTo.email.replace("@", "") }
    //   })
    //   .then(resp => {
    //     console.log(resp.data);
    //     if (!resp.data.error) {
    //       let ans = resp.data.isFriends;
    //       this.setState({ isFriend: ans });
    //     }
    //   });
    // axios
    //   .get(`${BASEURL}/friendReqSent`, {
    //     params: { user: userTo.email.replace("@", "") }
    //   })
    //   .then(resp => {
    //     if (!resp.data.error) {
    //       if (resp.data.reqSentFrom) {
    //         this.setState({ meAddedThem: true });
    //       } else if (resp.data.reqSentTo) {
    //         this.setState({
    //           addedMe: true
    //         });
    //       }
    //     }
    //   });
  }
  getInfo() {
    let { userTo } = this.props;
    axios
      .get(`${BASEURL}/checkIfFriend`, {
        params: { user: userTo.email.replace("@", "") }
      })
      .then(resp => {
        console.log(resp.data);
        if (!resp.data.error) {
          let ans = resp.data.isFriends;
          this.setState({ isFriend: ans });
        }
      });
    axios
      .get(`${BASEURL}/friendReqSent`, {
        params: { user: userTo.email.replace("@", "") }
      })
      .then(resp => {
        if (!resp.data.error) {
          if (resp.data.reqSentFrom) {
            this.setState({ meAddedThem: true });
          } else if (resp.data.reqSentTo) {
            this.setState({
              addedMe: true
            });
          }
        }
      });
  }
  handleFriendClick(e) {
    e.preventDefault();

    let { userTo } = this.props;
    axios.post(`${BASEURL}/sendReq`, { userTo }).then(resp => {
      console.log(resp.data);
      if (resp.data.redirect) {
        this.setState({ redirect: true });
      } else if (!resp.data.error) {
        this.setState({ added: true });
      }
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {this.state.isFriend ? (
          <p className="mutedTxt">Already Friends</p>
        ) : this.state.added || this.state.meAddedThem ? (
          <p className="mutedTxt">Added</p>
        ) : this.state.addedMe ? (
          <p className="mutedTxt">They sent you a request</p>
        ) : (
          <button onClick={this.handleFriendClick}>add friend</button>
        )}{" "}
      </div>
    );
  }
}
