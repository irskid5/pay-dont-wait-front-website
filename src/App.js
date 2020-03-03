import React from "react";
import { HoverMorphIcon } from "react-svg-buttons";
import qs from "qs";
import assert from "assert";

import "./App.css";
import { findByLabelText } from "@testing-library/react";

function isPositiveInteger(n) {
  return n >>> 0 === parseFloat(n);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    var prefixed = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    console.log(prefixed);

    var table_id;
    try {
      if (isPositiveInteger(prefixed.table_id)) {
        table_id = parseInt(prefixed.table_id);
      }
    } catch (e) {
      console.log(e);
    }

    this.state = {
      table_id: table_id
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="AppContainer">
        <div className="App">
          <div className="iconContainer">
            <HoverMorphIcon
              baseType="arrowRight"
              hoverType="fwd"
              size={90}
              thickness={2}
              color="#dd6e78"
            />
          </div>
          <span style={{ alignSelf: "center" }}>Table ID = {this.state.table_id}</span>
        </div>
      </div>
    );
  }
}

export default App;
