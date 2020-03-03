import React from "react";
import { HoverMorphIcon } from "react-svg-buttons";

import "./App.css";

class App extends React.Component {
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
        </div>
      </div>
    );
  }
}

export default App;
