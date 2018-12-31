import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./login.jsx";
import App from "./App.jsx";
import store from "./reducers";
import "./index.css";
// import * as serviceWorker from './serviceWorker';
console.log("store", store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/bingo/game" component={App} />
        <Route exact path="/bingo/" component={Login} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
