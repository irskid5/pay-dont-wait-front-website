import React from "react";
//import { Link } from "react-router-dom";

class PaymentError extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: this.props.location.state.success,
      error: this.props.location.state.error,
      ticket: this.props.location.state.ticket
    };
  }

  render() {
    return (
      <div>
        <div>Error!</div>
        <div>Ticket: {this.state.ticket}</div>
        <div>Error: {this.state.error}</div>
      </div>
    );
  }
}

export default PaymentError;
