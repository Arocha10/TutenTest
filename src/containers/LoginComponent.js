import React, { Component } from "react";
import BaseInput from "../base/html5/input";
import "../App.css";

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      },
      token: "",
      books: []
    };
  }

  componentDidMount() {
  }

  updateRecipient = (value, name) => {
    let payload = null;
    let newState = { ...this.state };
    console.log("will change", this.props);
    switch (name) {
      case "email":
        console.log("email", value);
        newState.user = { ...this.state.user, ...{ email: value } };
        break;
      case "password":
        console.log("password", value);
        newState.user = { ...this.state.user, ...{ password: value } };
        break;
      default:
        console.log("default", value, name);
        break;
    }
    this.setState({ ...newState });
    console.log("payload", payload);
  };
  render() {
    const books = this.state.books.map(this.renderWeeks);
    return (
        <div id="sign-in-form">
          <div className="username-container control">
            <label>Email</label>
            <BaseInput
              type="text"
              name="email"
              className=""
              placeholder=""
              onChange={e => {
                this.updateRecipient(e.target.value, e.target.name);
              }}
            />
          </div>
          <div className="password-container control">
            <label>Password</label>
            <BaseInput
              type="password"
              name="password"
              className=""
              placeholder=""
              onChange={e => {
                this.updateRecipient(e.target.value, e.target.name);
              }}
            />
          </div>
          <button onClick={() => {this.props.onSubmit(this.state.user)}}  className="button">
            Login
          </button>
        </div>
    );
  }
}