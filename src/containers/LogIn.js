/* global gapi */

import React from "react";
import { Auth } from "../components";
import { connect } from "react-redux";
import { logInRequest, verifyRequest, gVerifyRequest } from "../actions/auth";
import { informOpen } from "../actions/inform";
import { sourceAppender } from "../helpers";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.afterGLogIn = this.afterGLogIn.bind(this);
  }
  componentDidMount() {
    // sourceAppender(
    //   document,
    //   "script",
    //   "google-api1",
    //   "https://apis.google.com/js/platform.js",
    //   () => {
    // console.log(this.props)
    // this.props.onGLogIn()
    //   })
    // sourceAppender(
    //   document,
    //   "script",
    //   "google-api1",
    //   "https://apis.google.com/js/platform.js",
    //   () => {
    window.gapi.load("auth2", () => {
      // let auth2 = window.gapi.auth2.getAuthInstance();
      let auth2 = window.gapi.auth2.init({
        client_id:
          "81459934336-5om0irnvrnuult3t863d8sahkbj5o7ps.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin"
      });
      const gVerifyRequest = this.props.gVerifyRequest;
      const afterGLogIn = this.afterGLogIn;
      auth2.attachClickHandler(
        document.getElementById("customBtn"),
        {},
        async function(googleUser) {
          await gVerifyRequest(googleUser.getAuthResponse().id_token);
          afterGLogIn();
        },
        function(error) {
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    });
    //   }
    // );
  }
  afterGLogIn() {
    this.props.informOpen([
      this.props.status.currentName + "님 로그인에 성공하셨습니다"
    ]);
    this.props.history.push("/");
  }
  handleLogIn(userEmail, userPassword) {
    return this.props.logInRequest(userEmail, userPassword).then(() => {
      if (this.props.errCode === 0) {
        this.props.informOpen([
          this.props.userName + "님 로그인에 성공하셨습니다"
        ]);

        this.props.history.push("/");
        this.props.verifyRequest();
        return true;
      } else if (Math.trunc(this.props.errCode / 10) === -11) {
        const errorMessage = [
          "올바른 이메일 형식이 아닙니다",
          "비밀번호는 8~16자리 대문자,소문자,숫자,특수기호 1개이상 혼용하여야 합니다"
        ];
        this.props.informOpen([errorMessage[-(this.props.errCode + 111)]]);
        return false;
      } else if (Math.trunc(this.props.errCode / 10) === -22) {
        const errorMessage = [
          "등록되지 않은 이메일입니다",
          "잘못된 비밀번호입니다",
          "인증받지 않은 이메일입니다",
          "로그인할 수 없습니다",
          "로그인할 수 없습니다"
        ];
        this.props.informOpen([errorMessage[-(this.props.errCode + 221)]]);
        return false;
      }
    });
  }
  handleGVerify(gToken) {
    console.log(this.props);
    return this.props.gVerifyRequest(gToken);
  }
  render() {
    return (
      <div>
        <Auth mode={true} onLogIn={this.handleLogIn} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errCode: state.logInReducer.logIn.errCode,
    userName: state.logInReducer.logIn.userName,
    status: state.verifyReducer.status
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logInRequest: (userEmail, userPassword) => {
      return dispatch(logInRequest(userEmail, userPassword));
    },
    gVerifyRequest: gToken => {
      return dispatch(gVerifyRequest(gToken));
    },
    verifyRequest: () => {
      return dispatch(verifyRequest());
    },
    informOpen: messages => {
      return dispatch(informOpen(messages));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
