import React from "react";
//import { Link } from "react-router-dom";

class PaymentSuccessful extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table_id: this.props.location.state.table_id
    };
  }

  render() {
    return (
      <div>
        <div>No Active Receipt for this Table ID: {this.state.table_id}</div>
      </div>
    );
  }
}

export default PaymentSuccessful;
