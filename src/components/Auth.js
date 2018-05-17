import React from "react";
import { Link } from "react-router-dom";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      userName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  handleLogIn() {
    let userEmail = this.state.userEmail;
    let userPassword = this.state.userPassword;
    this.props.onLogIn(userEmail, userPassword).then(success => {
      // if (!success) {
      //   this.setState({
      //     userPassword: ""
      //   });
      // }
    });
  }
  handleSignUp() {
    let userEmail = this.state.userEmail;
    let userPassword = this.state.userPassword;
    let userName = this.state.userName;

    this.props.onSignUp(userEmail, userPassword, userName).then(result => {
      // if (!result) {
      //   this.setState({
      //     userEmail: "",
      //     userPassword: "",
      //     userName: ""
      //   });
      // }
    });
  }
  render() {
    const inputBoxes = (
      <div>
        <div className="input-field col s12 userEmail">
          <input
            name="userEmail"
            type="email"
            className="validate"
            onChange={this.handleChange}
            value={this.state.userEmail}
            placeholder="Email"
          />
        </div>
        <div className="input-field col s12">
          <input
            name="userPassword"
            type="password"
            className="validate"
            onChange={this.handleChange}
            value={this.state.userPassword}
            placeholder="Password"
          />
        </div>
      </div>
    );
    const logInView = (
      <div>
        <div className="card-content">
          <div className="row">
            {inputBoxes}
            <a
              className="waves-effect waves-light btn"
              onClick={this.handleLogIn}
            >
              SUBMIT
            </a>
          </div>
        </div>

        <div id="gSignInWrapper">
          <span className="label">Sign in with:</span>
          <div id="customBtn" className="customGPlusSignIn">
            <span className="icon" />
            <span className="buttonText">Google</span>
          </div>
        </div>

        <div className="footer">
          <div className="card-content">
            <div className="right">
              New Here? <Link to="/signup">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    );

    const signUpView = (
      <div className="card-content">
        <div className="row">
          {inputBoxes}
          <div className="input-field col s12">
            <input
              name="userName"
              type="text"
              className="validate"
              onChange={this.handleChange}
              value={this.state.userName}
              placeholder="Name"
            />
          </div>
          <a
            className="waves-effect waves-light btn"
            onClick={this.handleSignUp}
          >
            CREATE
          </a>
        </div>
      </div>
    );
    return (
      <div className="container auth">
        <div className="card">
          <div className="header blue white-text center">
            <div className="card-content">
              {this.props.mode ? "LOG IN" : "SIGN UP"}
            </div>
          </div>
          {this.props.mode ? logInView : signUpView}
        </div>
      </div>
    );
  }
}

Auth.defaultProps = {
  mode: true,
  onLogIn: (userEmail, userPassword) => {
    console.error("logIn function not defined");
  },
  onSignUp: (userEmail, userPassword, userName) => {
    console.error("signUp function not defined");
  }
};
export default Auth;
