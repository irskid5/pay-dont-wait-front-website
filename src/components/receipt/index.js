import React from "react";
import { Button, InputGroup, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const tax = 0.13;

class Receipt extends React.Component {
  constructor(props) {
    super(props);

    // calculate new receipt total
    var endTotal = 0;
    Object.keys(this.props.location.state.receipt.items).forEach((item) => {
      endTotal += this.props.location.state.receipt.items[item].total;
    });

    this.props.location.state.receipt.total = endTotal;

    this.state = {
      receipt: this.props.location.state.receipt,
      items: this.props.location.state.receipt.items,
      subtotal: this.props.location.state.receipt.total,
      tax: this.props.location.state.receipt.total * tax,
      tip: this.props.location.state.receipt.total * (1 + tax) * 0.15,
      total: this.props.location.state.receipt.total * (1 + tax) * 1.15,
      tipPercent: 0.15
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleTipChange = this.handleTipChange.bind(this);

    console.log(this.state);
  }

  handleIncrement(e) {
    var itemsCopy = { ...this.state.items };
    var itemCopy = { ...this.state.items[e.target.name] };

    if (itemCopy.number + 1 >= itemCopy.maxNumber) {
      itemCopy.number = itemCopy.maxNumber;
    } else {
      itemCopy.number += 1;
    }
    itemCopy.total = itemCopy.cost * itemCopy.number;
    itemsCopy[e.target.name] = { ...itemCopy };

    // calculate new receipt total
    var endTotal = 0;
    Object.keys(itemsCopy).forEach((item) => {
      endTotal += itemsCopy[item].total;
    });

    this.setState({
      items: itemsCopy,
      subtotal: endTotal,
      tax: endTotal * tax,
      tip: endTotal * (1 + tax) * this.state.tipPercent,
      total: endTotal * (1 + tax) * (1 + this.state.tipPercent)
    });
    console.log(this.state);
  }

  handleDecrement(e) {
    var itemsCopy = { ...this.state.items };
    var itemCopy = { ...this.state.items[e.target.name] };

    if (itemCopy.number - 1 <= 0) {
      itemCopy.number = 0;
    } else {
      itemCopy.number -= 1;
    }

    itemCopy.total = itemCopy.cost * itemCopy.number;
    itemsCopy[e.target.name] = { ...itemCopy };

    // calculate new receipt total
    var endTotal = 0;
    Object.keys(itemsCopy).forEach((item) => {
      endTotal += itemsCopy[item].total;
    });

    this.setState({
      items: itemsCopy,
      subtotal: endTotal,
      tax: endTotal * tax,
      tip: endTotal * (1 + tax) * this.state.tipPercent,
      total: endTotal * (1 + tax) * (1 + this.state.tipPercent)
    });
    console.log(this.state);
  }

  handleTipChange() {}

  handleFormSubmit(e) {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      return;
    }

    let userData = {
      eventId: this.state.event.event_id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress: this.state.emailAddress,
      office: this.state.office,
      options: this.state.event.eto
    };

    // fetch("http://172.23.164.154:4000/submitForm", {
    fetch("http://172.23.164.154:4000/submitForm", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {}
    }).then((response) => {
      response.json().then((data) => {
        if (data.success === "true") {
          console.log(data);
          this.props.history.push({
            pathname: "/checkout",
            state: { ticket: data.ticket, office: this.state.office }
          });
        } else {
          // push to 404 or something
        }
      });
    });
  }

  render() {
    return (
      <div className="ReceiptContainer">
        <div className="Receipt">
          <Form onSubmit={this.handleFormSubmit}>
            <div className="receiptItems">
              {Object.keys(this.state.items).map((item, idx) => (
                <div className="item" key={idx}>
                  <div className="itemName">{item}</div>
                  <div className="itemNumberContainer">
                    <Button
                      name={item}
                      variant="outline-primary"
                      size="sm"
                      onClick={this.handleDecrement}
                    >
                      -
                    </Button>
                    <div className="itemNumber">{this.state.items[item].number}</div>
                    <Button
                      name={item}
                      variant="outline-primary"
                      size="sm"
                      onClick={this.handleIncrement}
                    >
                      +
                    </Button>
                  </div>
                  <div className="itemTotal">${this.state.items[item].total.toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="receiptFinals">
              <div className="finalItem">
                <div className="subFinalItem"></div>
                <div className="subFinalItem">
                  <div className="subFinalItem">SubTotal:</div>
                  <div className="subFinalItem" style={{ justifyContent: "flex-end" }}>
                    ${this.state.subtotal.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="finalItem">
                <div className="subFinalItem"></div>
                <div className="subFinalItem">
                  <div className="subFinalItem">Tax:</div>
                  <div className="subFinalItem" style={{ justifyContent: "flex-end" }}>
                    ${this.state.tax.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="finalItem">
                <div className="subFinalItem"></div>
                <div className="subFinalItem">
                  <div className="subFinalItem">Tip:</div>
                  <div className="subFinalItem" style={{ justifyContent: "flex-end" }}>
                    ${this.state.tip.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="finalItem">
                <div className="subFinalItem"></div>
                <div className="subFinalItem">
                  <div className="subFinalItem">Total:</div>
                  <div className="subFinalItem" style={{ justifyContent: "flex-end" }}>
                    ${this.state.total.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Receipt;
