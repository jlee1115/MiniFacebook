import React from "react";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import ProfilePage from "./views/ProfilePage";

// class App extends Component() {
//   constructor() {
//     super();
//     this.state = {
//       email: null
//     };
//   }
//   componentDidMount() {
//     //get the user if any
//     let baseurl = "http://localhost:8000";
//     axios.get(`${baseurl}/session`).then(resp => {
//       console.log("APP DID MOUNT", resp.data);
//       console.log(resp.data.email);
//       //do something with the response
//       if (resp.data.email) {
//         this.setState({ email: resp.data.email });
//       }
//     });
//   }
//   render() {
//     let email = "hello";
//     return (
//       <BrowserRouter>
//         <Switch>
//           <Route path="/" exact component={Home} />
//           <Route
//             path="/profile"
//             exact
//             // component={ProfilePage}
//             render={props => <ProfilePage {...props} email={email} />}
//           />
//         </Switch>
//       </BrowserRouter>
//     );
//   }
// }

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
