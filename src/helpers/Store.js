import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import { createLogger } from 'redux-logger';
import { rootReducer } from "../reducers";

// const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,composeEnhancers(
  applyMiddleware(thunk /* , logger */))
);


// Thunk middleware : action이 아닌 function을 return하는 action creator 작성할 수 있게 함
// action의 dispatch를 지연시키거나, 특정 컨디션에서만 dispatch시키는 용도