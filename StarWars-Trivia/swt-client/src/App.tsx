import React from "react";
import Login from "./components/Auth/Login";
import Box from '@material-ui/core/Box';
//Components
import ButtonAppBar from "./components/NavBar/Navbar"
import CreateBounty from "./components/Bountyhunter/bhCreate"
import GetQuestions from "./components/Questions/get_questions"

type MainState = {
  token: string;
};

const App: React.FunctionComponent = () => {
  const [token, setToken] = React.useState();

  const updateToken = (newToken: string) => {
    localStorage.setItem("token: ", newToken);
    setToken(newToken);
  };

  console.log(token)

  return (
    <div className="App">
      <ButtonAppBar/>
      <Box component="span" m={1}>
      {token ? <GetQuestions/> : <Login updateToken ={updateToken}/>}

      </Box>

    </div>
  );
}

export default App;
