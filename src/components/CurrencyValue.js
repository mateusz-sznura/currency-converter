import React, { Component } from 'react';
import { Decimal } from 'decimal.js';
import {PRECISION } from '../config';

class CurrencyValue extends Component {

  // exchangeRates: {
  //   'EUR': 1.0000,
  //   'USD': 1.1400,
  //   'SEK': 10.2700,
  // },
  //
  // All rates are kept as relative to EUR, so above means:
  // 1 EUR = 1.1400 USD (EUR is base, USD is target)
  // 1 EUR = 10.2700 SEK (EUR is base, SEK is target)
  //
  // How much USD is 1 SEK then?
  // Solve 1 SEK = x USD (SEK is base, USD is target) using EUR as transitive currency (because rates are relative to it)
  //
  // 1 SEK = 1 EUR / 10.27 = 1.14 USD / 10.27 = 1.14 / 10.27 USD = 0.11 USD
  //
  // So generic equation is (BC - base currenct, TC - target currency):
  // 1 BC = <TC rate> / <BC rate> TC
  calculateValue() {
    const { amount, baseCurrency, targetCurrency, exchangeRates } = this.props;
    const d_amount = new Decimal(amount || 0);
    const d_targetCurrencyRate = new Decimal(exchangeRates[targetCurrency]);
    const d_baseCurrencyRate = new Decimal(exchangeRates[baseCurrency]);
    return d_amount.mul(d_targetCurrencyRate.div(d_baseCurrencyRate)).toFixed(PRECISION);
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
