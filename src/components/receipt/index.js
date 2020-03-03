import React from "react";

import "./index.css";

class Receipt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.location.state.items
    };

    console.log(this.state);
  }

  render() {
    return (
      <div className="ReceiptContainer">
        <div className="Receipt">{JSON.stringify(this.state)}</div>
      </div>
    );
  }
}

export default Receipt;
