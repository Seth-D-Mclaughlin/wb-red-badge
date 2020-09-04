import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Box from "@material-ui/core/Box";
//Components
import Navbar from "./components/Navbar/Navbar";
import CreateBounty from "./components/Bountyhunter/bhCreate";
import GetQuestions from "./components/Questions/get_questions";
import BhParent from "./components/Bountyhunter/bhParent";
import Main from "./components/Main/Main";

type AppState = {
  token: string;
};

class App extends Component<{}, AppState> {
  // TODO: Method that will update the token on Login/Register
  state = {
    token: "",
  };

  constructor(props: {}) {
    super(props);
    this.updateToken = this.updateToken.bind(this);
  }

  componentDidMount() {
    let mytoken = window.localStorage.getItem("token");
    if (mytoken) {
      this.setState({
        token: mytoken,
      });
    }
  }

  updateToken(token?: string) {
    window.localStorage.setItem("token", token ? token : "");
    this.setState({
      token: token ? token : "",
    });
  }

  render() {
    return (
      <Fragment>
        {/* Router */}
        <Router>
          <Navbar />
          <Switch>
            <Route path="/login" exact>
              <Login updateToken={this.updateToken} />
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

// const App: React.FunctionComponent = () => {
//   const [token, setToken] = React.useState(localStorage.getItem("token: "));
//   const [name, setName] = React.useState('');

//   useEffect(() => {
//     if (token) {
//       fetch("http://localhost:3000/bountyhunter/1", {
//           method: "GET",
//           headers:{
//               'Authorization' : token
//           }
//       })
//       .then(res => res.json())
//       .then(data => {
//           setName(data[0]);
//       })
//   }
// }, [token])

//   const updateToken = (newToken: string) => {
//     localStorage.setItem("token: ", newToken);
//     setToken(newToken);
//   };

//   return (
//     <main>

//     <div className="App">
//       <ButtonAppBar/>
//       <Box component="span" m={1}>
//       {/* {token ? <BhParent token ={token} bhName={name} setName={setName} /> : <Login updateToken ={updateToken}/>} */}
//        {token ? <Main bhName={name}/>: <Login updateToken ={updateToken}/>}

//       </Box>

//     </div>
//     </main>
//   );
// }

export default App;
