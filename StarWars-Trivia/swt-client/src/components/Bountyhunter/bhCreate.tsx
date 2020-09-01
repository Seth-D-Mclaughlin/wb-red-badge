import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface AcceptedProps{
  token: string
}
type BountyHunter = {
  name: string;
  points: number;
};

class CreateBounty extends React.Component<AcceptedProps, BountyHunter> {
  constructor(props: AcceptedProps) {
    super(props);

    this.state = {
      name: "",
      points: 0
    };
  }

  handleSubmitevents(event: React.FormEvent<HTMLFormElement>) {
    // handle submit events
    event.preventDefault( );
  const url = 
  'http://localhost:3000/bountyhunter/create'

  const bhSend = {
      bountyhunter: {
          name: this.state.name,
          points: this.state.points
         
      }
  }

  fetch(url, {
      method: 'POST',
      body: JSON.stringify(bhSend),
      headers: {
          'Content-Type' : 'application/json',
          'Authorization': this.props.token
      }
  })
  .then(res => res.json())
  .then(json => {
      console.log(json)
        if(json.message === "Bounty Hunter created successfully!"){
           console.log("BOUNTY HAS BEEN MADE");
       }
  })
  .catch(err => console.log(err))


    }

    render(){

        
      // const classes=useStyles();
        return(
            <div>
            <form onSubmit={this.handleSubmitevents.bind(this)}>
    {
    //handle error condition
    }
    <label>Name</label>
    <input type="text" value={this.state.name}  onChange={(e)=> this.setState({...this.state,name: e.target.value})}/>
    <input type="number" value={this.state.points}  onChange={(e)=> this.setState({...this.state,points: Number(e.target.value)})}/>
    <input type="submit" value="Create" data-test="submit" />
    </form>
            
              
    </div>
        )
    }
}

export default CreateBounty;