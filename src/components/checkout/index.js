import React from "react";
//import { Link } from "react-router-dom";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monerisCheckoutTicket: this.props.location.state.ticket,
      table_id: this.props.location.state.table_id,
      mode: "qa",
      request_url: "https://gatewayt.moneris.com/chkt/display/index.php",
      checkout_div: "moneris-checkout",
      fullscreen: "T",
      callbacks: {
        page_loaded: "",
        address_change: "",
        cancel_transaction: "",
        payment_receipt: "",
        payment_complete: "",
        error_event: ""
      },
      toRender: null
    };
    this.monerisCheckout = this.monerisCheckout.bind(this);
    this.logConfig = this.logConfig.bind(this);
    this.setCheckoutDiv = this.setCheckoutDiv.bind(this);
    this.setMode = this.setMode.bind(this);
    this.setCallback = this.setCallback.bind(this);
    this.startCheckout = this.startCheckout.bind(this);
    this.startCheckoutHandler = this.startCheckoutHandler.bind(this);
    this.closeCheckout = this.closeCheckout.bind(this);
    this.sendPostMessage = this.sendPostMessage.bind(this);
    this.receivePostMessage = this.receivePostMessage.bind(this);
    this.setNewShippingRates = this.setNewShippingRates.bind(this);
    this.handlePaymentComplete = this.handlePaymentComplete.bind(this);
    this.handleErrorEvent = this.handleErrorEvent.bind(this);
    this.handleCancelTransaction = this.handleCancelTransaction.bind(this);
  }

  monerisCheckout() {
    var me = this;
    window.addEventListener("message", function (e) {
      console.log("setting receive message");
      me.receivePostMessage(e);
    });
  }

  logConfig() {
    console.log("callbacks: " + JSON.stringify(this.state.callbacks));
    console.log("request_url: " + this.state.request_url);
    console.log("checkout_div: " + this.state.checkout_div);
  }

  setCheckoutDiv(name) {
    this.setState({ checkout_div: name });
  }

  setMode(setmode) {
    this.setState({ mode: setmode });
    if (this.state.mode === "dev") {
      this.setState({ request_url: "https://gatewaydev.moneris.com/chkt/display/index.php" });
    } else if (this.state.mode === "qa") {
      this.setState({ request_url: "https://gatewayt.moneris.com/chkt/display/index.php" });
    } else {
      this.setState({ request_url: "https://gateway.moneris.com/chkt/display/index.php" });
    }
  }

  setCallback(name, func) {
    if (name in this.state.callbacks) {
      var callbacksCopy = this.state.callbacks;
      callbacksCopy[name] = func;
      this.setState({ callbacks: callbacksCopy });
    } else {
      console.log("setCallback - Invalid callback defined: " + name);
    }
  }

  startCheckout(ticket) {
    this.setState({ fullscreen: ticket.slice(-1) });

    console.log("fullscreen is : " + this.state.fullscreen);

    var chkt_target_style = {};
    var chkt_iframe_style = {};
    var chkt_target = null;
    var chkt_iframe = null;

    var checkoutUrl = this.state.request_url + "?tck=" + ticket;

    if (window.navigator.userAgent.match("/(iPod|iPhone|iPad)/")) {
      if (this.state.fullscreen === "T") {
        chkt_target_style.position = "absolute";
        chkt_target_style.left = "0";
        chkt_target_style.top = "0";
      }

      chkt_target_style.border = "none";
      chkt_target_style.background = "#FAFAFA";
      chkt_target_style.zindex = "100000";
      chkt_target_style.minWidth = "100%";
      chkt_target_style.width = "100%";
      chkt_target_style.minHeight = "100%";
      chkt_target_style.height = "100%";

      chkt_iframe_style = {};

      chkt_iframe_style.width = "100%";
      chkt_iframe_style.height = "100%";
      chkt_iframe_style.border = "none";

      chkt_iframe = (
        <iframe
          title={this.state.checkout_div + "-Frame"}
          id={this.state.checkout_div + "-Frame"}
          src={checkoutUrl}
          allowpaymentrequest="true"
          style={chkt_iframe_style}
        />
      );

      chkt_target = (
        <div id={this.state.checkout_div} style={chkt_target_style}>
          {chkt_iframe}
        </div>
      );
    } else {
      if (this.state.fullscreen === "T") {
        chkt_target_style.position = "fixed";
        chkt_target_style.left = "0";
        chkt_target_style.top = "0";
      }

      chkt_target_style.border = "none";
      chkt_target_style.background = "#FAFAFA";
      chkt_target_style.zindex = "100000";
      chkt_target_style.minWidth = "100%";
      chkt_target_style.width = "100%";
      chkt_target_style.minHeight = "100%";
      chkt_target_style.height = "100%";

      chkt_iframe_style = {};

      chkt_iframe_style.width = "100%";
      chkt_iframe_style.height = "100%";
      chkt_iframe_style.border = "none";

      chkt_iframe = (
        <iframe
          title={this.state.checkout_div + "-Frame"}
          id={this.state.checkout_div + "-Frame"}
          src={checkoutUrl}
          allowpaymentrequest="true"
          style={chkt_iframe_style}
        />
      );

      chkt_target = (
        <div id={this.state.checkout_div} style={chkt_target_style}>
          {chkt_iframe}
        </div>
      );
    }

    return chkt_target;
  }

  startCheckoutHandler(response) {
    if (response.success === "true") {
      console.log(response.url);
      //insert iframe into div #moneris-checkout
    } else {
      this.state.callbacks.error_event(response.error);
    }
  }

  closeCheckout() {
    document.body.classList.remove("checkoutHtmlStyleFromiFrame");
  }

  sendPostMessage(request) {
    var frameRef = document.getElementById(this.state.checkout_div + "-Frame").contentWindow;
    frameRef.postMessage(request, this.state.request_url + "chktdev/display/request.php");
    return false;
  }

  receivePostMessage(resp) {
    console.log(resp);
    try {
      var response_json = resp.data;
      var respObj = JSON.parse(response_json);

      if (respObj.rev_action === "height_change") {
        console.log("this is new height:" + respObj.outerHeight);

        document.getElementById(this.state.checkout_div + "-Frame").style.height =
          respObj.outerHeight + "px";

        //	$("#"+checkout_div+"-Frame").css({"height":  respObj.outerHeight + "px"});
        //	$("#"+checkout_div).css({"height":  respObj.outerHeight + "px"});
      } else {
        var callback = this.state.callbacks[respObj["handler"]];

        if (typeof callback === "function") {
          callback(response_json);
        }
      }
    } catch (e) {
      console.log("got a non standard post message");
    }
  }

  setNewShippingRates(json) {
    this.sendPostMessage(json);
  }

  handlePaymentComplete(resp) {
    console.log("In handlePaymentComplete handler currently");
    fetch("https://821hh4s1ti.execute-api.us-east-2.amazonaws.com/dev/processPayment", {
      method: "POST",
      body: JSON.stringify({
        ticket: this.state.monerisCheckoutTicket,
        table_id: this.state.table_id
      }),
      headers: {}
    })
      .then((response) => {
        response
          .json()
          .then((r) => {
            if (!r.success) {
              this.props.history.push({
                pathname: "/paymentError",
                state: {
                  success: r.success,
                  ticket: this.state.monerisCheckoutTicket,
                  error: r.error
                }
              });
            } else {
              console.log(r);
              this.props.history.push({
                pathname: "/success",
                state: {
                  success: r.success,
                  ticket: this.state.monerisCheckoutTicket,
                  data: r.receipt
                }
              });
            }
          })
          .catch((error) => {
            this.props.history.push({
              pathname: "/paymentError",
              state: {
                success: "false",
                ticket: this.state.monerisCheckoutTicket,
                error: "Pushing error - " + error.toString()
              }
            });
          });
      })
      .catch((error) => {
        this.props.history.push({
          pathname: "/paymentError",
          state: {
            success: "false",
            ticket: this.state.monerisCheckoutTicket,
            error: "Fetch error - " + error.toString()
          }
        });
      });
  }

  handleCancelTransaction(resp) {
    console.log("In handleCancelTransaction handler currently");
    this.props.history.push({
      pathname: "/cancelled",
      state: { ticket: this.state.monerisCheckoutTicket }
    });
    // this.setState({ toRender: <Link to="/cancelTransaction" /> });
  }

  handleErrorEvent(resp) {
    console.log("In handleErrorEvent handler currently");
    this.props.history.push({
      pathname: "/paymentError",
      state: {
        success: "false",
        ticket: this.state.monerisCheckoutTicket,
        error: "Error Event"
      }
    });
    // this.setState({ toRender: <Link to="/cancelTransaction" /> });
  }

  componentDidMount() {
    this.monerisCheckout();
    this.setCallback("payment_complete", this.handlePaymentComplete);
    this.setCallback("error_event", this.handleErrorEvent);
    this.setCallback("cancel_transaction", this.handleCancelTransaction);
    this.setState({ toRender: this.startCheckout(this.state.monerisCheckoutTicket) });
  }

  render() {
    return this.state.toRender;
  }
}

export default Checkout;
