import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
//import { Link } from "react-router-dom";
import { HoverMorphIcon } from "react-svg-buttons";
import qs from "qs";
import NoTablePopup from "./components/NoTablePopup";

import "./App.css";

function isPositiveInteger(n) {
  return n >>> 0 === parseFloat(n);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // Grab query string and check if table_id is an int
    var prefixed = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    console.log(prefixed);

    var table_id;
    try {
      if (Object.keys(prefixed).length === 1) {
        if (isPositiveInteger(prefixed.table_id)) {
          table_id = parseInt(prefixed.table_id);
        }
      }
    } catch (e) {
      console.log(e);
    }

    this.state = {
      table_id: table_id,
      NoTablePopup: null
    };

    this.formulateReceipt = this.formulateReceipt.bind(this);
  }

  formulateReceipt() {
    if (isPositiveInteger(this.state.table_id)) {
      const url =
        "https://821hh4s1ti.execute-api.us-east-2.amazonaws.com/dev/getReceipt/?table_id=" +
        this.state.table_id.toString();
      fetch(url, {
        method: "get"
      }).then((response) => {
        response.json().then((r) => {
          if (r.success) {
            this.props.history.push({
              pathname: "/receipt",
              state: { receipt: r }
            });
          } else {
            if (r.table_id != null) {
              this.setState({
                NoTablePopup: <NoTablePopup />
              });
              setTimeout(() => {
                this.setState({
                  NoTablePopup: null
                });
              }, 3000);
            } else {
              this.props.history.push({
                pathname: "/error"
              });
            }
          }
        });
      });
    } else {
      this.props.history.push({
        pathname: "/error"
      });
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className="AppContainer">
        <div className="App">
          <div className="popupContainer">
            <CSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {this.state.NoTablePopup}
            </CSSTransitionGroup>
          </div>
          <div className="iconContainer">
            <HoverMorphIcon
              baseType="arrowRight"
              hoverType="fwd"
              size={90}
              thickness={2}
              color="#dd6e78"
              onClick={this.formulateReceipt}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// <span style={{ alignSelf: "center" }}>
//             Table ID = {this.state.table_id == null ? "NOT FOUND" : this.state.table_id}
//           </span>
