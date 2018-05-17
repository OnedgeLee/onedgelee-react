import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

// Container Components
import { App } from "./containers";

// Redux
import { store } from "./helpers";
import { Provider } from "react-redux";

// STORE
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
