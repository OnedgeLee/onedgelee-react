import * as authConstants from "../../constants/AuthConstants";
import axios from "axios";

/* SIGNUP */

// thunk action creator
export function signUpRequest(userEmail, userPassword, userName) {
  // thunk middleware가 dispatch 메서드를 함수에 인수로 보내서 함수가 직접 action을 보낼 수 있도록 함
  // inner function이 parameter로 store method인 dispatch와 getState를 받음
  return dispatch => {
    // 첫번째 dispatch : 앱 상태를 갱신해서 API 호출이 시작됨을 알림
    dispatch(signUp());
    // thunk middleware가 호출하는 함수는 값을 반환할 수 있고, 이 값이 dispatch메서드의 반환값이 됨
    return axios
      .post("http://127.0.0.1:8099/auth/signup", {
        userEmail,
        userPassword,
        userName
      })
      .then(response => {
        //  dispatch는 여러번 가능 API 호출의 결과로 로그인 성공 진입
        dispatch(signUpSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          // response with status code that falls out of the range of 2xx
          dispatch(signUpFailure(error.response.data));
        } else if (error.request) {
          // request was but no response was received
        } else {
          // Something happened in setting up the request that triggered an Error
        }
      });
  };
}
export function signUp() {
  return {
    type: authConstants.AUTH_SIGN_UP_DO
  };
}
export function signUpSuccess(data) {
  return {
    type: authConstants.AUTH_SIGN_UP_SUCCESS,
    data
  };
}
export function signUpFailure(data) {
  return {
    type: authConstants.AUTH_SIGN_UP_FAILURE,
    data
  };
}
