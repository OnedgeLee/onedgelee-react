import * as authConstants from "../../constants/AuthConstants";
import axios from "axios";
import jwt from "jsonwebtoken";

/* LOG IN */
export function logInRequest(userEmail, userPassword) {
  return dispatch => {
    dispatch(logIn());
    return axios
      .post("http://127.0.0.1:8099/auth/login", { userEmail, userPassword })
      .then(response => {
        dispatch(logInSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          // response with status code that falls out of the range of 2xx
          dispatch(logInFailure(error.response.data));
        } else if (error.request) {
          // request was but no response was received
        } else {
          // Something happened in setting up the request that triggered an Error
        }
      });
  };
}

export function logIn() {
  return {
    type: authConstants.AUTH_LOG_IN_DO
  };
}

export function logInSuccess(data) {
  localStorage.setItem("token", data.contents.token);
  localStorage.setItem("userRefreshToken", data.contents.userRefreshToken);
  data.contents.userName = jwt.decode(data.contents.token).userName;
  return {
    type: authConstants.AUTH_LOG_IN_SUCCESS,
    data
  };
}

export function logInFailure(data) {
  return {
    type: authConstants.AUTH_LOG_IN_FAILURE,
    data
  };
}