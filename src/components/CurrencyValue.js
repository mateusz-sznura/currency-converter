import React, { Component } from 'react';
import { Decimal } from 'decimal.js';

class CurrencyValue extends Component {

  calculateValue() {
    const { amount, baseCurrency, targetCurrency, exchangeRates } = this.props;
    const d_amount = new Decimal(amount || 0);
    const d_targetCurrencyRate = new Decimal(exchangeRates[targetCurrency]);
    const d_baseCurrencyRate = new Decimal(exchangeRates[baseCurrency]);
    return d_amount.mul(d_targetCurrencyRate.div(d_baseCurrencyRate)).toFixed(2);
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
