import React from "react";
//import { Link } from "react-router-dom";

class PaymentError extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      monerisCheckoutTicket: this.props.location.state.ticket
    };
  }

  render() {
    return (
      <div>
        <div>Error!</div>
        <div>Ticket: {this.state.monerisCheckoutTicket}</div>
      </div>
    );
  }
}

export default PaymentError;
