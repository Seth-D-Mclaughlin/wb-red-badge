import React from "react";
import Login from "./components/Auth/Login";
//Components

type MainState = {
  token: string;
};

const App: React.FunctionComponent = () => {
  const [token, setToken] = React.useState("");
  const protectedView = () => {
    return token !== undefined ? <Login updateToken ={updateToken}/> : null ;
  };

  const updateToken = (newToken: string) => {
    localStorage.setItem("token: ", newToken);
    setToken(newToken);
  };

  return (
    <div className="App">
      <h1>StarWars Quiz</h1>
      {protectedView()}
    </div>
  );
}

export default App;
