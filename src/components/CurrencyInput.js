import React, { Component } from 'react';
import {
  Button,
  Input,
} from 'reactstrap';
import './CurrencyInput.css';

class CurrencyInput extends Component {

  constructor(props) {
    super(props);
    
    this.setCurrency = this.setCurrency.bind(this);
  }

  setCurrency(event) {
    const { setCurrency } = this.props;
    setCurrency(event.target.value);
  }

  render() {
    const { availableCurrencies, currency, removeCurrency } = this.props;
    return (
      <div className="currency-input d-flex">
        <Button className="remove-currency" onClick={removeCurrency}>
          {'-'}
        </Button>
        <Input type="select" value={currency} onChange={this.setCurrency} >
          <option>{''}</option>
          {availableCurrencies.map(currency =>
            <option key={currency}>{currency}</option>
          )}
        </Input>
      </div>
    );
  }

}

export default CurrencyInput;
