import React, { Component } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
interface AcceptedProps {
  updateToken: (newToken: string) => void;
}
type ApprovedState = {
  email: string;
  password: string;
  signup: boolean;
};

class Login extends Component<AcceptedProps, ApprovedState> {
  constructor(props: AcceptedProps) {
    super(props);
    // handle initialization activities
    this.state = {
      email: "",
      password: "",
      signup: false,
    };
  }

  handleSubmitevents(event: React.FormEvent<HTMLFormElement>) {
    // handle submit events
    event.preventDefault();
    const url = "http://localhost:3000/user/login";

    const userSend = {
      user: {
        email: this.state.email,
        password: this.state.password,
      },
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(userSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message === "User successfully logged in!") {
          this.props.updateToken(json.sessionToken);
        }
      });
  }

  render() {
    return (
      <Container maxWidth="sm">
        <form onSubmit={this.handleSubmitevents.bind(this)}>
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
            value="Log In"
            data-test="submit"
          >
            Log In
          </Button>
        </form>
      </Container>
    );
  }
}

export default Login;
