import React, { Component } from "react";
import { BASEURL } from "../constants";
import axios from "axios";
axios.defaults.withCredentials = true;

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }
  fileChangedHandler(e) {
    const file = e.target.files[0];
    this.setState({ selectedFile: file });
  }
  uploadHandler(e) {
    e.preventDefault();
    //convert to json
    if (this.state.selectedFile) {
      const formData = new FormData();
      console.log(this.state.selectedFile);
      formData.append("image", this.state.selectedFile);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      let profPic = JSON.stringify(this.state.selectedFile);
      for (const key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }
      console.log("Profile", profPic);
      axios.post(`${BASEURL}/uploadPicProfile`, this.state.selectedFile).then(resp => {
        console.log(resp);
      });
    } else {
      alert("Please choose a picture!");
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.uploadHandler}>
          <input name="image" type="file" onChange={this.fileChangedHandler}></input>
          <button className="btn btn-secondary btn-sm" type="submit" value="Upload">
            Upload
          </button>
        </form>
      </div>
    );
  }
}
