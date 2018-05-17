import * as authConstants from "../../constants/AuthConstants";
import update from "immutability-helper";

export function signUpReducer(
  state = {
    signUp: {
      status: "INIT",
      errCode: 0,
      userName: ""
    }
  },
  action
) {
  switch (action.type) {
    case authConstants.AUTH_SIGN_UP_DO:
      return update(state, {
        signUp: {
          status: { $set: "WAITING" }
        }
      });
    case authConstants.AUTH_SIGN_UP_SUCCESS:
      return update(state, {
        signUp: {
          status: { $set: "SUCCESS" },
          errCode: { $set: action.data.errCode },
          userName: { $set: action.data.contents.userName }
        }
      });
    case authConstants.AUTH_SIGN_UP_FAILURE:
      return update(state, {
        signUp: {
          status: { $set: "FAILURE" },
          errCode: { $set: action.data.errCode }
        }
      });
    default:
      return state;
  }
}
