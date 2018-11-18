import React, { Component } from 'react';
import CurrencyValueMatrix from './CurrencyValueMatrix';

class CurrencyConverter extends Component {
  render() {
    const { appState, setAppState } = this.props;
    return (
      <div className="currency-converter">
        <h1>Currency Converter</h1>
        <CurrencyValueMatrix
          appState={appState}
          setAppState={setAppState}  
        />
      </div>
    );
  }
}

export default CurrencyConverter;