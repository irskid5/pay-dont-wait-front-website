import React from "react";
//import { Link } from "react-router-dom";

class PaymentSuccessful extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      monerisCheckoutTicket: this.props.location.state.ticket
    };
  }

  render() {
    return (
      <div>
        <div>Success!</div>
        <div>Ticket: {this.state.monerisCheckoutTicket}</div>
      </div>
    );
  }
}

export default PaymentSuccessful;
