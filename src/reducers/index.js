import { combineReducers } from "redux";

import { logInReducer, signUpReducer, verifyReducer } from "./auth";
import { informReducer } from "./inform";
import { testReducer } from "./test";

export const rootReducer = combineReducers({
  logInReducer,
  signUpReducer,
  verifyReducer,
  informReducer,
  testReducer
});
