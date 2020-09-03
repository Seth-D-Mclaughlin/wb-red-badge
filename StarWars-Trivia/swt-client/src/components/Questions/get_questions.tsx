import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { threadId } from "worker_threads";



type Question = {
  questions: string;
  // choice_1: string,
  // choice_2: string,
  // choice_3: string,
  // correct: string
};
interface S {
  questions: Question[];
  correct: any;
}

class GetQuestions extends React.Component<{}, S> {
  constructor(props: S) {
    super(props);

    this.state = {
      questions: [],
      correct: {},
    };
  }

  increment(event: any, question: String) {
    let key = question[0];
    const newAns = {...this.state.correct, [key]:event.target.innerText}
    this.setState({...this.state, correct: newAns})
    console.log(this.state.correct);
  }

  displayResults(){
    let count = 0;
    if (this.state.correct.length < this.state.questions.length) {alert("answer all questions biatch"); return;}
    for(let i in this.state.questions){
      console.log(this.state.questions[i]["questions"][0])
      if(this.state.correct[this.state.questions[i]["questions"][0]].toLowerCase() === this.state.questions[i]["questions"][2].toLowerCase()){
        count += 1
      }
    }
    fetch("http://localhost:3000/bountyhunter/update",{
      method: "PUT",
      body: JSON.stringify({
        points: count
      }),
      headers:{
        'Content-Type' : 'application/json',
        'Authorization': localStorage.getItem("token: ")!.toString()
      }
    })
    .then((res) => res.json())
    .then(json => {console.log(json)})

    return alert(`${count}/10`)
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
    let display: any = [];
    if (this.state.questions.length > 0) {
      for (let i = 0; i < this.state.questions.length; i++) {
        display.push(
          <div key={this.state.questions[i]["questions"][0]}>
            <Card style={{backgroundColor: "rgb(143, 168, 194)", minWidth: 275, margin: 12, fontSize: 14, fontWeight: "bold"}}>
              <CardContent>
                <Typography color="textPrimary" gutterBottom>
                  {this.state.questions[i]["questions"][1]}
                </Typography>
              </CardContent>
              <CardActions>
                <Button disabled = {this.state.correct[this.state.questions[i]["questions"][0]] ? true: false} type="submit" value= "true" onClick={(e) => this.increment(e, this.state.questions[i]["questions"])}>
                  true
                </Button>
                <Button disabled = {this.state.correct[this.state.questions[i]["questions"][0]] ? true: false} type="submit" onClick={(e) => this.increment(e, this.state.questions[i]["questions"])}>
                    false
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
