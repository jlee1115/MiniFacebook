import React from "react";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import ProfilePage from "./views/ProfilePage";
import Feed from "./views/Feed";
<<<<<<< HEAD
import Chat from "./views/ChatPage";
=======
import FriendVis from "./views/FriendVis";
>>>>>>> edc2ac3cc9cca0c28921bfb9301846b71c186632

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/profile/:userID" exact component={ProfilePage} />
        <Route path="/feed" exact component={Feed} />
<<<<<<< HEAD
        <Route path="/chat" exact component={Chat} />
=======
        <Route path="/friendVis" exact component={FriendVis} />
>>>>>>> edc2ac3cc9cca0c28921bfb9301846b71c186632
      </Switch>
    </BrowserRouter>
  );
}

export default App;
