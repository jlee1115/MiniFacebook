import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PostPagination(query, pageNumber, user) {
  useEffect(() => {
    if (user) {
      axios
        .get(`${BASEURL}/userPosts`, { params: { user: user, page: pageNumber } })
        .then(resp => {
          this.setState({ posts: resp.data.posts });
          // console.log(resp.data);
        });
    } else {
      axios.get(`${BASEURL}/allPosts`, { params: { page: pageNumber } }).then(resp => {
        // console.log(resp.data);
        this.setState({ posts: resp.data.posts });
      });
    }
  }, [query, pageNumer]);
  return <div></div>;
}
