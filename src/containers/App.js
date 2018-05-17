/* global gapi */

import React from "react";
import { Header, Inform, Confirmed } from "../components";
import { Home, LogIn, SignUp, Test } from "./";
import { connect } from "react-redux";
import { verifyRequest, gVerifyRequest, logOut, informOpen } from "../actions";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { sourceAppender } from "../helpers";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
    // this.handleGLogIn = this.handleGLogIn.bind(this);
  }
  componentDidMount() {
    // sourceAppender(
    //   document,
    //   "script",
    //   "google-api1",
    //   "https://apis.google.com/js/platform.js",
    //   () => {
        window.gapi.load("auth2", () => {
          window.gapi.auth2
            .init({
              client_id:
                "81459934336-5om0irnvrnuult3t863d8sahkbj5o7ps.apps.googleusercontent.com",
              cookiepolicy: "single_host_origin"
            })
            .then(
              onInit => {
                let googleUser = onInit.currentUser.get();
                this.props.gVerifyRequest(
                  googleUser.getAuthResponse().id_token
                );
                // this.props.gVerifyRequest();
              },
              onError => {}
            );
        });

        this.props.verifyRequest();
      // }
    // );
  }
  // handleGLogIn() {
  //   let auth2 = gapi.auth2.getAuthInstance();
  //   auth2.attachClickHandler(
  //     document.getElementById("customBtn"),
  //     {},
  //     function(googleUser) {
  //       console.log(googleUser);
  //       console.log(googleUser.getAuthResponse().id_token);
  //       this.props.gVerifyRequest(googleUser.getAuthResponse().id_token);
  //     },
  //     function(error) {
  //       alert(JSON.stringify(error, undefined, 2));
  //     }
  //   );
  // }
  handleLogOut() {
    if (this.props.status.verifiedBy === "google.com") {
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut();
    }
    this.props.logOut();
    if (!localStorage.getItem("token")) {
      this.props.informOpen(["로그아웃 성공"]);
    }
  }
  render() {
    /* Check whether current route is login or register using regex */
    let re = /(login|signup)/;
    let isAuth = re.test(this.props.history);
    return (
      <BrowserRouter>
        <div>
          {isAuth ? (
            undefined
          ) : (
            <Header
              isLoggedIn={this.props.status.isLoggedIn}
              onLogOut={this.handleLogOut}
              currentName={this.props.status.currentName}
            />
          )}
          {this.props.children}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              component={LogIn/* () => <LogIn onGLogIn={this.handleGLogIn} /> */}
            />
            <Route path="/signup" component={SignUp} />
            <Route path="/test" component={Test} />
            <Route path="/confirmed" component={Confirmed} />
          </Switch>
          <Inform />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.verifyReducer.status
  };
};
const mapDispatchToProps = dispatch => {
  return {
    verifyRequest: () => {
      return dispatch(verifyRequest());
    },
    gVerifyRequest: gToken => {
      return dispatch(gVerifyRequest(gToken));
    },
    logOut: () => {
      return dispatch(logOut());
    },
    informOpen: messages => {
      return dispatch(informOpen(messages));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
