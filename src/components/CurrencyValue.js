import React, { Component } from 'react';

class CurrencyValue extends Component {

  calculateValue() {
    const { amount, baseCurrency, targetCurrency, exchangeRates } = this.props;
    return amount * (exchangeRates[targetCurrency] / exchangeRates[baseCurrency]);
  }

  render() {
    const { baseCurrency, targetCurrency, date, exchangeRates } = this.props;
    return (
      <div className="currency-value">
        {!targetCurrency || !date || !exchangeRates || !exchangeRates[targetCurrency] || !exchangeRates[baseCurrency]
          ? <span>?</span>
          : this.calculateValue()
        }
      </div>
    );
  }
}

export default CurrencyValue;
