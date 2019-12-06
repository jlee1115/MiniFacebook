import React from "react";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import ProfilePage from "./views/ProfilePage";

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   let baseurl = "http://localhost:8000";
  //   axios.get(`${baseurl}/session`).then(resp => {
  //     console.log("APP DID MOUNT", resp.data);
  //     console.log(resp.data.email);
  //   });
  // });

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={ProfilePage} />
        {/* <Route
          path="/profile"
          exact
          // component={ProfilePage}
          render={props => <ProfilePage {...props} email={email} />}
        /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
