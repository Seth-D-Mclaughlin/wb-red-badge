// TODO: Rename File to Register

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import User from "../../types/User";

interface AcceptedProps {
  token: string;
  updateToken: (token?: string) => void;
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
      <div className=" TestLoginForm ">
        <form onSubmit={this.handleSubmitevents}>
          <label>User Name</label>
          <input
            type="text"
            value={this.state.username}
            onChange={(e) =>
              this.setState({ ...this.state, username: e.target.value })
            }
          />
          <label>Email</label>
          <input
            type="email"
            value={this.state.email}
            onChange={(e) =>
              this.setState({ ...this.state, email: e.target.value })
            }
          />
          <label>Password</label>
          <input
            type="password"
            value={this.state.password}
            onChange={(e) =>
              this.setState({ ...this.state, password: e.target.value })
            }
          />
          <input type="submit" value="Log In" data-test="submit" />
        </form>
        {this.props.token ? <Redirect to="/" /> : <></>}
      </div>
    );
  }
}

export default SignUpForm;
