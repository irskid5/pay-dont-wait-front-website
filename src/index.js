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
import Receipt from "./components/Receipt";
import Checkout from "./components/Checkout";
import PaymentSuccessful from "./components/PaymentSuccessful";
import PaymentCancelled from "./components/PaymentCancelled";
import PaymentError from "./components/PaymentError";
import NoMatchPage from "./components/NoMatchPage";

const routing = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/receipt" component={Receipt} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/success" component={PaymentSuccessful} />
      <Route exact path="/cancelled" component={PaymentCancelled} />
      <Route exact path="/paymentError" component={PaymentError} />
      <Route path="/error" component={NoMatchPage} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
