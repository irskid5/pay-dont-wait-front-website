import React from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const tax = 0.13;

class Receipt extends React.Component {
  constructor(props) {
    super(props);

    // calculate new receipt total
    // var endTotal = 0;
    // Object.keys(this.props.location.state.receipt.items).forEach((item) => {
    //   endTotal += this.props.location.state.receipt.items[item].total;
    // });

    // this.props.location.state.receipt.total = endTotal;

    this.state = {
      receipt: this.props.location.state.receipt,
      items: this.props.location.state.receipt.items,
      table_id: this.props.location.state.receipt.table_id,
      subtotal: this.props.location.state.receipt.total,
      tax: this.props.location.state.receipt.total * tax,
      tip: this.props.location.state.receipt.total * (1 + tax) * 0.15,
      total: this.props.location.state.receipt.total * (1 + tax) * 1.15,
      tipPercent: 15
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
      tip: (endTotal * (1 + tax) * this.state.tipPercent) / 100,
      total: endTotal * (1 + tax) * (1 + this.state.tipPercent / 100)
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
      tip: (endTotal * (1 + tax) * this.state.tipPercent) / 100,
      total: endTotal * (1 + tax) * (1 + this.state.tipPercent / 100)
    });
    console.log(this.state);
  }

  handleTipChange(e) {
    this.setState({
      tipPercent: e.target.value !== "" ? Math.ceil(parseInt(e.target.value)) : 0,
      tip:
        e.target.value !== ""
          ? (this.state.subtotal * (1 + tax) * Math.ceil(parseInt(e.target.value))) / 100
          : 0,
      total:
        e.target.value !== ""
          ? this.state.subtotal * (1 + tax) * (1 + Math.ceil(parseInt(e.target.value)) / 100)
          : this.state.subtotal * (1 + tax)
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    fetch("https://821hh4s1ti.execute-api.us-east-2.amazonaws.com/dev/initiateCheckout", {
      method: "POST",
      body: JSON.stringify({ ...this.state }),
      headers: {}
    }).then((response) => {
      response.json().then((data) => {
        if (data.success === true) {
          console.log(data);
          this.props.history.push({
            pathname: "/checkout",
            state: { ticket: data.ticket, table_id: this.state.table_id }
          });
        } else {
          // push to 404 or something
          console.log(data);
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
                      style={{ width: "2.4em", height: "2.4em" }}
                    >
                      -
                    </Button>
                    <div className="itemNumber">{this.state.items[item].number}</div>
                    <Button
                      name={item}
                      variant="outline-primary"
                      size="sm"
                      onClick={this.handleIncrement}
                      style={{ width: "2.4em", height: "2.4em" }}
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
                  <div className="subFinalItem">Tip (%):</div>
                  <div className="subFinalItem" style={{ justifyContent: "flex-end" }}>
                    <InputGroup size="sm" className="tipInput">
                      <FormControl
                        as="input"
                        size="sm"
                        value={parseInt(this.state.tipPercent)}
                        min={0}
                        max={100}
                        type="number"
                        step="1"
                        onChange={this.handleTipChange}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                </div>
              </div>
              <div className="finalItem">
                <div className="subFinalItem"></div>
                <div className="subFinalItem">
                  <div className="subFinalItem">Tip ($):</div>
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
            <br></br>
            <br></br>
            <div className="submitContainer">
              <Button variant="primary" type="submit">
                Pay
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Receipt;
