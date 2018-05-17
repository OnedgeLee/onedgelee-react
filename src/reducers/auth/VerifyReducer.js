import * as authConstants from "../../constants/AuthConstants";
import update from "immutability-helper";

export function verifyReducer(
  state = {
    status: {
      status: "INIT",
      errCode: 0,
      isLoggedIn: false,
      currentEmail: "",
      currentName: "",
      verifiedBy: "omija.com"
    }
  },
  action
) {
  switch (action.type) {
    case authConstants.AUTH_VERIFY_DO:
      return update(state, {
        status: {
          status: { $set: "WAITING" }
        }
      });
    case authConstants.AUTH_VERIFY_SUCCESS:
      return update(state, {
        status: {
          status: { $set: "SUCCESS" },
          errCode: { $set: action.data.errCode },
          isLoggedIn: { $set: true },
          currentEmail: { $set: action.data.contents.userEmail },
          currentName: { $set: action.data.contents.userName },
          verifiedBy: { $set: "omija.com" }
        }
      });
    case authConstants.AUTH_VERIFY_FAILURE:
      return update(state, {
        status: {
          status: { $set: "FAILURE" },
          errCode: { $set: action.data.errCode },
          
        }
      });
    case authConstants.AUTH_G_VERIFY_DO:
      return update(state, {
        status: {
          status: { $set: "WAITING" }
        }
      });
    case authConstants.AUTH_G_VERIFY_SUCCESS:
      return update(state, {
        status: {
          status: { $set: "SUCCESS" },
          errCode: { $set: action.data.errCode },
          isLoggedIn: { $set: true },
          currentEmail: { $set: action.data.contents.gUserGmail },
          currentName: { $set: action.data.contents.gUserName },
          verifiedBy: { $set: "google.com" }
        }
      });
    case authConstants.AUTH_G_VERIFY_FAILURE:
      return update(state, {
        status: {
          status: { $set: "FAILURE" },
          errCode: { $set: action.data.errCode },
          
        }
      });
    case authConstants.AUTH_LOG_OUT:
      return update(state, {
        status: {
          status: { $set: "INIT" },
          isLoggedIn: { $set: false },
          currentEmail: { $set: "" },
          currentName: { $set: "" },
          verifiedBy: { $set: "omija.com" }
        }
      });
    case authConstants.AUTH_REFRESH_TOKEN_DO:
      return update(state, {
        status: {
          status: { $set: "REFRESH" },
          isLoggedIn: { $set: false },
          currentEmail: { $set: "" },
          currentName: { $set: "" }
        }
      });
    default:
      return state;
  }
}
