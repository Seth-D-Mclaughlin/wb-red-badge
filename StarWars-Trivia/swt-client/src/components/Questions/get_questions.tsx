import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";



type Question = {
  questions: string;
  // choice_1: string,
  // choice_2: string,
  // choice_3: string,
  // correct: string
};
interface S {
  questions: Question[];
  correct: number;
}

class GetQuestions extends React.Component<{}, S> {
  constructor(props: S) {
    super(props);

    this.state = {
      questions: [],
      correct: 0,
    };
  }

  increment() {
    this.setState({
      correct: this.state.correct + 1,
    });
  }

  displayResults(){
      
    return alert(`${this.state.correct} / 10`);
  }
  componentDidMount() {
    fetch("http://localhost:3000/question/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ questions: json });
      });
  }

  render() {
    console.log(this.state.correct);
    let display: any = [];
    if (this.state.questions.length > 0) {
      for (let i = 0; i < this.state.questions.length; i++) {
        display.push(
          <div>
            <Card style={{backgroundColor: "rgb(143, 168, 194)", minWidth: 275, margin: 12, fontSize: 14, fontWeight: "bold"}}>
              <CardContent>
                <Typography color="textPrimary" gutterBottom>
                  {this.state.questions[i]["questions"][1]}
                </Typography>
              </CardContent>
              <CardActions>
                <Button type="submit" onClick={this.increment.bind(this)}>
                  {this.state.questions[i]["questions"][2]}
                </Button>
                <Button type="submit">
                  {this.state.questions[i]["questions"][2] === "true"
                    ? "false"
                    : "true"}
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      }
    }
    return (
      <div style={{backgroundColor: "rgb(59, 76, 89)"}}>
        <h1 style={{color: "#E06C75"}}>Quiz time!</h1>
        {display}
        <Button onClick={this.displayResults.bind(this)}>See Results</Button>
      </div>
    );
  }
}

export default GetQuestions;
