import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    const logInBtn = (
      
        <Link to="/login">Login</Link>
      
    );
    const logOutBtn = (
      
        <a onClick={this.props.onLogOut}>Logout</a>
      
    );
    
    return (
      <nav>
        <div className="nav-wrapper blue darken-1 row">
          <div className="col s1">
            <Link to="/">Home</Link>
          </div>
          <div className="col s1">
          {this.props.isLoggedIn ? logOutBtn : logInBtn}
          </div>
          <div className="col s1">
            <Link to="/test">Test</Link>
          </div>
          <div>{this.props.currentName}</div>
        </div>
      </nav>
    );
  }
}
Header.defaultProps = {
  isLoggedIn: false,
  onLogOut: () => {
    console.error("logout function not defined");
  }
};

export default Header;
