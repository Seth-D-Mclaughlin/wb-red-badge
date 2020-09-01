import React from 'react';


type Question ={
    questions: string,
    // choice_1: string,
    // choice_2: string,
    // choice_3: string,
    // correct: string
}
interface S {
    questions:Question[]
}

class GetQuestions extends React.Component<{}, S>{
    constructor(props:S){
        super(props);

        this.state={
            questions:[],
        }
    }


    componentDidMount(){
        fetch('http://localhost:3000/question/',{
            method: 'GET',
            
        })
        .then(res =>res.json())
        .then(json => {this.setState({questions: json})})
    }
    
    render(){
        
        let display: any = [];
        if(this.state.questions.length > 0){
            for (let i = 0; i < this.state.questions.length; i++) {
                console.log(this.state.questions[i])
                console.log(this.state.questions[i]["questions"])
                display.push(
                <div>
                    <br/>
                    {this.state.questions[i]["questions"][0]}
                    <br/>
                    {this.state.questions[i]["questions"][1]}
                    <br/>
                    <button type="submit">{this.state.questions[i]["questions"][2]}</button>
                    <br/>
                </div>
                )
            }
        }
        return(
            <>
            <h1>GET questions</h1>
            {display}
            </>
        )
    }
}

export default GetQuestions;