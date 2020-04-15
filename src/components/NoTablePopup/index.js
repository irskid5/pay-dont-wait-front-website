import React from "react";

import "./index.css";

class NoTablePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  render() {
    return <div className="popup">This Table No longer Has A Receipt</div>;
  }
}

export default NoTablePopup;
