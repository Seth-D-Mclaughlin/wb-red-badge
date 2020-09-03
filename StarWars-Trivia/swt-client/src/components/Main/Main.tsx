import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

interface P {
  bhName: any;
}

type User = {
  username: string;
  bountyhunter: string;
  points: number;
};
class Main extends React.Component<P, User> {
  constructor(props: P) {
    super(props);

    this.state = {
      username: "",
      points: 0,
      bountyhunter: "",
    };
  }

  deleteBounty(){
      fetch('http://localhost:bountyhunter')
  }
takeToQuiz(){
    
}
  componentDidMount() {
    fetch("http://localhost:3000/user/myself", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token: ")!.toString(),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ username: json["0"].username });
      });

    fetch("http://localhost:3000/bountyhunter/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token: ")!.toString(),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          points: json["0"].points,
          bountyhunter: json["0"].name,
        });
      });
  }

  render() {
    return (
      <Container maxWidth="sm">
        <h1>Hello, {this.state.username}</h1>
        <Divider />
        <Card>
          <CardContent>
            <h3>Bounty Hunters</h3>
            <ListItem>
                  <ListItemText
                    primary={<Typography>{this.state.bountyhunter}</Typography>}
                    secondary={<Typography>Points: {this.state.points}</Typography>}
                   
                  />
                </ListItem>
            

            <CardActions>
              <Button size="small">Take a quiz!</Button>
              <Button size="small">Delete Bounty Hunter</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default Main;
