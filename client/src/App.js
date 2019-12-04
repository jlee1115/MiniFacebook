import React from "react";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import ProfilePage from "./views/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={ProfilePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
