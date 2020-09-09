import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface AcceptedProps {
  token: string;
  setName: any;
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
      points: 0,
    };
  }

  handleSubmitevents(event: React.FormEvent<HTMLFormElement>) {
    // handle submit events
    event.preventDefault();
    const url = "http://localhost:3000/bountyhunter/create";

    const bhSend = {
      bountyhunter: {
        name: this.state.name,
        points: this.state.points,
      },
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(bhSend),
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.message === "Bounty Hunter created successfully!") {
          console.log("BOUNTY HAS BEEN MADE");
          this.props.setName(json.bountyhunter.name);
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    // const classes=useStyles();
    return (
      <div>
        <form onSubmit={this.handleSubmitevents.bind(this)}>
          <TextField
            label="Bounty Hunter Name"
            type="text"
            value={this.state.name}
            onChange={(e) =>
              this.setState({ ...this.state, name: e.target.value })
            }
          />

          <Button
            size="small"
            variant="outlined"
            type="submit"
            value="Create"
            data-test="submit"
          >
            Create
          </Button>
        </form>
      </div>
    );
  }
}

export default CreateBounty;
