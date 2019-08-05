import React, { Component } from "react";
import { connect } from "react-redux";
import { simpleAction } from "./actions/loginAction";
import BaseInput from "./base/html5/input";
import axios from "axios";
import LoginComponent from "./containers/LoginComponent";
import "./App.css";
class App extends Component {
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

  submit = (user) => {
    console.log("user", user);
    let config = {
      headers: {
        Accept: "application/json",
        password: user.password,
        app: "APP_BCK"
      }
    };
    axios
      .put(
        "https://dev.tuten.cl:443/TutenREST/rest/user/" + user.email,
        {},
        config
      )
      .then(resp => {
        console.log("Response", resp, resp.data.sessionTokenBck);
        if (resp.data) {
          let payload = { token: resp.data.sessionTokenBck };
          const conf = {
            headers: {
              Accept: "application/json",
              adminemail: "testapis@tuten.cl",
              token: resp.data.sessionTokenBck,
              app: "APP_BCK"
            }
          };
          this.setState({ ...this.state, ...payload });
          axios
            .get(
              "https://dev.tuten.cl:443/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true",
              conf
            )
            .then(resp => {
              console.log("Response", resp);
              payload = { books: resp.data };
              this.setState({ ...this.state, ...payload });
            })
            .catch(error => console.log("Error", error));
        }
      })
      .catch(error => console.log("Error", error));
  };

  renderWeeks = dy => {
    console.log(
      "cuadra",
      dy.tutenUserProfessional.tutenUser1,
      dy.tutenUserProfessional.tutenUser1.firstName
    );
    return (
      <div key={`${dy.firstName}-monthDay`} className="dayBox dayMonth">
        <div className="day">
          {"Client:"}
          {dy.tutenUserProfessional.tutenUser1.firstName}
          {dy.tutenUserProfessional.tutenUser1.lastName}
        </div>
      </div>
    );
  };

  simpleAction = event => {
    this.props.simpleAction();
  };
  render() {
    const books = this.state.books.map(this.renderWeeks);
    return (
      <div className="signInContainer">
        <LoginComponent onSubmit={this.submit}/>
        <div className="container ">{books}</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
