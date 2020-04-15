import React from "react";
//import { Link } from "react-router-dom";

import "./index.css";

class PaymentSuccessful extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: this.props.location.state.success,
      data: this.props.location.state.data
    };
  }

  render() {
    return (
      <div className="ConfirmContainer">
        <div className="Confirm">
          <div className="checkmarkContainer">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <div>So you didn't have to wait!</div>
          <div>Congrats!</div>
          <div>Below is your receipt</div>
          <div style={{ fontWeight: "200", fontSize: "10pt" }}>
            Please keep it for your records!
          </div>
          <div className="receiptItems">
            <div className="item" style={{ fontWeight: "500", paddingBottom: "12px" }}>
              <div className="itemName" style={{ borderBottom: "2px solid #f0eee4" }}>
                Menu Item
              </div>
              <div
                className="itemNumberContainer"
                style={{ borderBottom: "2px solid #f0eee4", justifyContent: "center" }}
              >
                <div className="itemNumber">Quantity</div>
              </div>
              <div className="itemTotal" style={{ borderBottom: "2px solid #f0eee4" }}>
                Item Total
              </div>
            </div>
            {this.state.data.request.cart.items.map((item, idx) =>
              item.product_code === "tip" ? (
                <div style={{ display: "none" }}></div>
              ) : (
                <div
                  className="item"
                  key={idx}
                  style={{
                    fontWeight: "400",
                    paddingTop: "0px",
                    paddingBottom: "12px",
                    paddingLeft: "10px",
                    paddingRight: "10px"
                  }}
                >
                  <div className="itemName">{item.description}</div>
                  <div className="itemNumberContainer" style={{ justifyContent: "center" }}>
                    <div className="itemNumber">{item.quantity}</div>
                  </div>
                  <div className="itemTotal">
                    ${(parseFloat(item.quantity) * parseFloat(item.unit_cost)).toFixed(2)}
                  </div>
                </div>
              )
            )}
            <div
              className="item"
              style={{
                paddingTop: "0px",
                paddingBottom: "7px",
                paddingLeft: "10px",
                paddingRight: "10px"
              }}
            >
              <div
                className="itemName"
                style={{
                  borderTop: "2px solid #f0eee4",
                  alignSelf: "flex-start",
                  paddingTop: "10px"
                }}
              ></div>
              <div
                className="itemNumberContainer"
                style={{
                  borderTop: "2px solid #f0eee4",
                  justifyContent: "center",
                  fontWeight: "500",
                  paddingTop: "10px"
                }}
              >
                <div className="itemNumber">SubTotal</div>
              </div>
              <div
                className="itemTotal"
                style={{ borderTop: "2px solid #f0eee4", fontWeight: "400", paddingTop: "10px" }}
              >
                ${parseFloat(this.state.data.request.cart.subtotal).toFixed(2)}
              </div>
            </div>
            <div
              className="item"
              style={{
                paddingTop: "0px",
                paddingBottom: "7px",
                paddingLeft: "10px",
                paddingRight: "10px"
              }}
            >
              <div
                className="itemName"
                style={{
                  alignSelf: "flex-start"
                }}
              ></div>
              <div
                className="itemNumberContainer"
                style={{
                  justifyContent: "center",
                  fontWeight: "500"
                }}
              >
                <div className="itemNumber">{this.state.data.request.cart.tax.description}</div>
              </div>
              <div className="itemTotal" style={{ fontWeight: "400" }}>
                ${parseFloat(this.state.data.request.cart.tax.amount).toFixed(2)}
              </div>
            </div>
            <div
              className="item"
              style={{
                paddingTop: "0px",
                paddingBottom: "7px",
                paddingLeft: "10px",
                paddingRight: "10px"
              }}
            >
              <div
                className="itemName"
                style={{
                  alignSelf: "flex-start"
                }}
              ></div>
              <div
                className="itemNumberContainer"
                style={{
                  justifyContent: "center",
                  fontWeight: "500"
                }}
              >
                <div className="itemNumber">Tip</div>
              </div>
              <div className="itemTotal" style={{ fontWeight: "400" }}>
                $
                {parseFloat(
                  this.state.data.request.cart.items.filter((obj) => {
                    return obj.product_code === "tip";
                  })[0].unit_cost
                ).toFixed(2)}
              </div>
            </div>
            <div
              className="item"
              style={{
                paddingTop: "0px",
                paddingBottom: "10px",
                paddingLeft: "10px",
                paddingRight: "10px"
              }}
            >
              <div
                className="itemName"
                style={{
                  alignSelf: "flex-start"
                }}
              ></div>
              <div
                className="itemNumberContainer"
                style={{
                  justifyContent: "center",
                  fontWeight: "500"
                }}
              >
                <div className="itemNumber">Total</div>
              </div>
              <div className="itemTotal" style={{ fontWeight: "400" }}>
                ${parseFloat(this.state.data.receipt.cc.amount).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentSuccessful;
