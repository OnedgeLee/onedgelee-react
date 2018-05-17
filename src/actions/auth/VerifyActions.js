import * as authConstants from "../../constants/AuthConstants";
import axios from "axios";
import { setToken } from "../../helpers/SetToken";

/* VERIFY */
export function verifyRequest() {
  return dispatch => {
    setToken(localStorage.getItem("token"));
    dispatch(verify());
    return axios
      .get("http://127.0.0.1:8099/auth/verify")
      .then(response => {
        dispatch(verifySuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.data.errCode) {
            case -120:
              dispatch(refreshTokenRequest());
              break;
            default:
              dispatch(verifyFailure(error.response.data));
          }
        } else if (error.request) {
        } else {
        }
      });
  };
}
export function verify() {
  return {
    type: authConstants.AUTH_VERIFY_DO
  };
}
export function verifySuccess(data) {
  return {
    type: authConstants.AUTH_VERIFY_SUCCESS,
    data
  };
}
export function verifyFailure(data) {
  // localStorage.removeItem("token");
  // localStorage.removeItem("refreshToken");
  return {
    type: authConstants.AUTH_VERIFY_FAILURE,
    data
  };
}

export function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRefreshToken");
  return {
    type: authConstants.AUTH_LOG_OUT
  };
}

/* REFRESH TOKEN */
export function refreshTokenRequest() {
  return dispatch => {
    setToken(localStorage.getItem("token"));
    dispatch(refreshToken());
    return axios
      .post("http://127.0.0.1:8099/auth/refreshToken", {
        userRefreshToken: localStorage.getItem("userRefreshToken")
      })
      .then(response => {
        localStorage.setItem("token", response.data.contents.token);
        localStorage.setItem(
          "userRefreshToken",
          response.data.contents.userRefreshToken
        );
        dispatch(verifyRequest());
      })
      .catch(error => {
        if (error.response) {
          dispatch(verifyFailure(error.response.data));
        } else if (error.request) {
        } else {
        }
      });
  };
}
export function refreshToken() {
  return {
    type: authConstants.AUTH_REFRESH_TOKEN_DO
  };
}

/* GOOGLE VERIFY */
export function gVerifyRequest(gToken) {
  return dispatch => {
    setToken(gToken);
    dispatch(gVerify());
    return axios
      .get("http://127.0.0.1:8099/auth/gVerify")
      .then(response => {
        dispatch(gVerifySuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(gVerifyFailure(error.response.data));
        } else if (error.request) {
        } else {
        }
      });
  };
}
export function gVerify() {
  return {
    type: authConstants.AUTH_G_VERIFY_DO
  };
}
export function gVerifySuccess(data) {
  return {
    type: authConstants.AUTH_G_VERIFY_SUCCESS,
    data
  };
}
export function gVerifyFailure(data) {
  return {
    type: authConstants.AUTH_G_VERIFY_FAILURE,
    data
  };
}
