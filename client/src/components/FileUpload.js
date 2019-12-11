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
    //convert to json
    if (this.state.selectedFile) {
      const formData = new FormData();
      formData.append("file", this.state.selectedFile, this.state.selectedFile.name);
      console.log("FORM DATA", formData);
      //   console.log("SELECTED", this.state.selectedFile, typeof this.state.selectedFile);
      let profPic = JSON.stringify(this.state.selectedFile);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }
      console.log("Profile", profPic);
      axios.post(`${BASEURL}/uploadPicProfile`, formData).then(resp => {
        console.log(resp);
      });
    }
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
