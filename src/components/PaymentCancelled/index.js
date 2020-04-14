import React from "react";
//import { Link } from "react-router-dom";

class PaymentCancelled extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      monerisCheckoutTicket: this.props.location.state.ticket
    };
  }

  render() {
    return (
      <div>
        <div>Cancelled!</div>
        <div>Ticket: {this.state.monerisCheckoutTicket}</div>
      </div>
    );
  }
}

export default PaymentCancelled;
