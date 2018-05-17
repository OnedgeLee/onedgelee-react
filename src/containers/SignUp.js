import React from "react";
import { Auth } from "../components/";
import { connect } from "react-redux";
import { signUpRequest } from "../actions";
import { informOpen } from "../actions";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  handleSignUp(userEmail, userPassword, userName) {
    return this.props
      .signUpRequest(userEmail, userPassword, userName)
      .then(() => {
        if (this.props.errCode === 0) {
          this.props.informOpen([
            this.props.userName + "님의 회원가입이 완료되었습니다"
          ]);
          this.props.history.push("/");
          return true;
        } else if (Math.trunc(this.props.errCode / 10) === -11) {
          const errorMessage = [
            "올바른 이메일 형식이 아닙니다",
            "비밀번호는 8~16자리 대문자,소문자,숫자,특수기호 1개이상 혼용하여야 합니다",
            "닉네임은 2~16자 영어, 한글만 가능합니다"
          ];
          this.props.informOpen([errorMessage[-(this.props.errCode + 111)]]);
          return false;
        } else if (Math.trunc(this.props.errCode / 10) === -21) {
          const errorMessage = [
            "중복된 이메일 주소입니다",
            "중복된 닉네임입니다"
          ];
          this.props.informOpen([errorMessage[-(this.props.errCode + 211)]]);
          return false;
        }
      });
  }
  render() {
    return (
      <div>
        <Auth mode={false} onSignUp={this.handleSignUp} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errCode: state.signUpReducer.signUp.errCode,
    userName: state.signUpReducer.signUp.userName
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signUpRequest: (userEmail, userPassword, userName) => {
      return dispatch(signUpRequest(userEmail, userPassword, userName));
    },
    informOpen: messages => {
      return dispatch(informOpen(messages));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
