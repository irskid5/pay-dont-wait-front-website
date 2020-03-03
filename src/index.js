import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
// import FormPage from "./components/formPage/index";
// import Checkout from "./components/checkout/index";
// import CancelTransaction from "./components/cancelTransaction/index";
// import OrderConfirmation from "./components/orderConfirmation/index";
// import CompleteButError from "./components/completeButError/index";

import "./index.css";
import Receipt from "./components/receipt";
import NoMatchPage from "./components/NoMatchPage";

const routing = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/receipt" component={Receipt} />
      <Route path="/error" component={NoMatchPage} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
