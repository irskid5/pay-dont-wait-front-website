import React from "react";
//import { Link } from "react-router-dom";

class PaymentSuccessful extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: this.props.location.state.success,
      receipt: this.props.location.state.data,
      ticket: this.props.location.state.ticket
    };
  }

  render() {
    return (
      <div>
        <div>Success!</div>
        <div>Ticket: {this.state.ticket}</div>
        <div>Data: {JSON.stringify(this.state.receipt)}</div>
      </div>
    );
  }
}

export default PaymentSuccessful;
