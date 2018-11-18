import React, { Component } from 'react';
import CurrencyValueMatrix from './CurrencyValueMatrix';
import BaseCurrencyInput from './BaseCurrencyInput';

class CurrencyConverter extends Component {

  constructor(props) {
    super(props);

    this.setAmount = this.setAmount.bind(this);
    this.setBaseCurrency = this.setBaseCurrency.bind(this);
  }

  setAmount(amount) {
    const { appState, setAppState } = this.props;
    setAppState({
      ...appState,
      amount,
    });
  }

  setBaseCurrency(baseCurrency) {
    const { appState, setAppState } = this.props;
    setAppState({
      ...appState,
      baseCurrency,
    });
  }

  render() {
    const { appState, setAppState, availableCurrencies } = this.props;
    return (
      <div className="currency-converter">
        <h1>Currency Converter</h1>
        <BaseCurrencyInput
          amount={appState.amount}
          baseCurrency={appState.baseCurrency}
          setAmount={this.setAmount}
          setBaseCurrency={this.setBaseCurrency}
          availableCurrencies={availableCurrencies}
        />
        <CurrencyValueMatrix
          appState={appState}
          setAppState={setAppState}  
        />
      </div>
    );
  }
}

export default CurrencyConverter;