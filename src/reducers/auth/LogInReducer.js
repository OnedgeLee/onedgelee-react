import * as authConstants from "../../constants/AuthConstants";
import update from "immutability-helper";

export function logInReducer(
  state = {
    logIn: {
      status: "INIT",
      errCode: 0,
      userName: ""
    }
  },
  action
) {
  switch (action.type) {
    case authConstants.AUTH_LOG_IN_DO:
      return update(state, {
        logIn: {
          status: { $set: "WAITING" }
        }
      });
    case authConstants.AUTH_LOG_IN_SUCCESS:
      return update(state, {
        logIn: {
          status: { $set: "SUCCESS" },
          errCode: { $set: action.data.errCode },
          userName: { $set: action.data.contents.userName }
        }
      });
    case authConstants.AUTH_LOG_IN_FAILURE:
      return update(state, {
        logIn: {
          status: { $set: "FAILURE" },
          errCode: { $set: action.data.errCode }
        }
      });
    default:
      return state;
  }
}
