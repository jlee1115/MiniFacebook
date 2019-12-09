import React, { Component } from "react";
import { BASEURL } from "../constants";
import axios from "axios";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }
  fileChangedHandler(e) {
    const file = e.target.files[0];
    this.setState({ selectedFile: file });
  }
  uploadHandler = () => {
    const formData = new FormData();
    //convert to json
    formData.append("file", this.state.selectedFile);
    // console.log("FORM DATA", formData);
    console.log("SELECTED", this.state.selectedFile);
    let profPic = JSON.stringify(this.state.selectedFile);
    console.log("Profile", profPic);
    axios.post(`${BASEURL}/uploadPicProfile`, this.state.selectedFile).then(resp => {
      console.log(resp);
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.uploadHandler}>
          <input type="file" onChange={this.fileChangedHandler}></input>
          <button className="btn btn-secondary btn-sm" type="submit" value="Upload">
            Upload
          </button>
        </form>
      </div>
    );
  }
}
