import React, { Component } from 'react';
import {
  Input,
} from 'reactstrap';

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
    const { availableCurrencies, currency } = this.props;
    return (
      <div className="currency-input">
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
