import React, { Component, Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Box from "@material-ui/core/Box";
//Components
import Navbar from "./components/Navbar/Navbar";
import CreateBounty from "./components/Bountyhunter/bhCreate";
import GetQuestions from "./components/Questions/get_questions";
import BhParent from "./components/Bountyhunter/bhParent";
import Main from "./components/Main/Main";
import Signup from "./components/Auth/Auth";

// type AppState = {
//   token: string;
// };

// class App extends Component<{}, AppState> {
//   // TODO: Method that will update the token on Login/Register
//   state = {
//     token: "",
//   };

//   constructor(props: {}) {
//     super(props);
//     this.updateToken = this.updateToken.bind(this);
//   }

//   componentDidMount() {
//     let mytoken = window.localStorage.getItem("token");
//     if (mytoken) {
//       this.setState({
//         token: mytoken,
//       });
//     }
//   }

//   updateToken(token?: string) {
//     window.localStorage.setItem("token", token ? token : "");
//     this.setState({
//       token: token ? token : "",
//     });
//   }

//   render() {
//     return (
//       <Fragment>
//         {/* Router */}
//         <Router>
//           <Navbar />
//           <Login updateToken={this.updateToken} />
//           <Main/>
//           <Switch>
//             <Route path="/login" exact></Route>
//           </Switch>
//         </Router>
//       </Fragment>
//     );
//   }
// }

const App: React.FunctionComponent = () => {
  const [token, setToken] = React.useState(localStorage.getItem("token: "));
  const [name, setName] = React.useState("");

  const [signup, setSignup] = React.useState(false);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3000/bountyhunter/1", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setName(data[0]);
        });
    }
  }, [token]);

  const updateToken = (newToken: string) => {
    localStorage.setItem("token: ", newToken);
    setToken(newToken);
  };

  return (
    <main>
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact>
              <Login updateToken={updateToken} />
            </Route>
            <Route path="/signup" exact>
              {/*<Signup />*/}
            </Route>
            <Route path="/main" exact>
              {/* <Main bhName={name} /> */}
            </Route>
            <Route path="/quiz" exact>
              <GetQuestions bhName={name} />
            </Route>
          </Switch>
        </BrowserRouter>

        <Box component="span" m={1}>
          {/* {token ? <BhParent token ={token} bhName={name} setName={setName} /> : <Login updateToken ={updateToken}/>} */}
          {token ? (
            <BhParent token={token} setName={setName} bhName={name} />
          ) : signup ? (
            <Signup token={""} updateToken={updateToken} />
          ) : (
            <>
              <Login updateToken={updateToken} />
            </>
          )}
          {token ? (
            <br></br>
          ) : signup ? (
            <button
              onClick={() => {
                setSignup(!signup);
              }}
            >
              Log in
            </button>
          ) : (
            <button
              onClick={() => {
                setSignup(!signup);
              }}
            >
              Sign up
            </button>
          )}
        </Box>
        {/* <button
          onClick={() => {
            setSignup(!signup);
          }}
        >
          Signup
        </button> */}
      </div>
    </main>
  );
};

export default App;
