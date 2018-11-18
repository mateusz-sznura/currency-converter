import React, { Component } from 'react';
import {
  Input,
  Label,
} from 'reactstrap';

class BaseCurrencyInput extends Component {

  constructor(props) {
    super(props);

    this.setAmount = this.setAmount.bind(this);
    this.setBaseCurrency = this.setBaseCurrency.bind(this);
  }

  setAmount(event) {
    const { setAmount } = this.props; 
    setAmount(event.target.value);
  }

  setBaseCurrency(event) {
    const { setBaseCurrency } = this.props;
    setBaseCurrency(event.target.value);
  }

  render() {
    const { amount, baseCurrency, availableCurrencies } = this.props;
    return (
      <div className="base-currency-input">
        <Label for="amount-input">Amount</Label>
        <Input type="number" id="amount-input" value={amount} onChange={this.setAmount} />
        <Label for="base-currency-input">Base Currency</Label>
        <Input type="select" id="base-currency-input" value={baseCurrency} onChange={this.setBaseCurrency}>
          {availableCurrencies.map(currency => 
            <option key={currency}>{currency}</option>
          )}
        </Input>
      </div>
    );
  }

}

export default BaseCurrencyInput;
