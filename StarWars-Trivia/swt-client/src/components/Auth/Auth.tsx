// TODO: Rename File to Register

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import User from "../../types/User";
import { TextField, Container, Button } from "@material-ui/core";

interface AcceptedProps {
  token: string;
  updateToken: (token: string) => void;
}

interface AuthState extends User {}

interface ServerResponseData {
  message: string;
  user: string;
  sessionToken: string;
}

class SignUpForm extends Component<AcceptedProps, AuthState> {
  constructor(props: AcceptedProps) {
    super(props);
    // handle initialization activities
    this.state = {
      username: "",
      email: "",
      password: "",
    };

    this.handleSubmitevents = this.handleSubmitevents.bind(this);
  }

  handleSubmitevents(event: React.FormEvent<HTMLFormElement>) {
    // handle submit events
    event.preventDefault();
    const url = "http://localhost:3000/user/create";

    const userSend = {
      user: this.state,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(userSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json: ServerResponseData) => {
        console.log(json);
        if (json.message === "User successfully created!") {
          this.props.updateToken(json.sessionToken);
        }
      });
  }

  render() {
    return (
      <Container maxWidth="sm">
        <form onSubmit={this.handleSubmitevents}>
          <TextField
            label="Username"
            type="text"
            value={this.state.username}
            onChange={(e) =>
              this.setState({ ...this.state, username: e.target.value })
            }
          />
          <br></br>
          <TextField
            label="Email"
            type="email"
            value={this.state.email}
            onChange={(e) =>
              this.setState({ ...this.state, email: e.target.value })
            }
          />
          <br></br>

          <TextField
            label="Password"
            type="password"
            value={this.state.password}
            onChange={(e) =>
              this.setState({ ...this.state, password: e.target.value })
            }
          />
          <br></br>

          <Button
            size="small"
            variant="outlined"
            type="submit"
            value="Sign Up"
            data-test="submit"
          >
            Sign up
          </Button>
        </form>
        {this.props.token ? <Redirect to="/" /> : <></>}
      </Container>
    );
  }
}

export default SignUpForm;
