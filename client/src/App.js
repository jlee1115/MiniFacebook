import React from "react";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        {/* <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signup-details" exact component={Signup2} /> */}
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
