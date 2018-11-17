import React, { Component } from 'react';
import {
  Table
} from 'reactstrap';

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

class CurrencyValueMatrix extends Component {
  render() {
    const { appState, setAppState } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            <th></th>
            {appState.dates.map(date =>
              <th key={date}>{date}</th>
            )}
            <th>+</th>
          </tr>
        </thead>
        <tbody>
          {appState.targetCurrencies.map(targetCurrency =>
            <tr key={targetCurrency}>
              <th>{targetCurrency}</th>
              {appState.dates.map(date =>
                <td key={date}>
                  <CurrencyValue 
                    amount={appState.amount}
                    baseCurrency={appState.baseCurrency}
                    targetCurrency={targetCurrency}
                    exchangeRates={appState.exchangeRates[date]}
                  />
                </td> 
              )}  
            </tr> 
          )}
          <tr>
            <td colSpan="1">+</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

class CurrencyValue extends Component {

  calculateValue() {
    const { amount, baseCurrency, targetCurrency, exchangeRates } = this.props;
    return amount * (exchangeRates[targetCurrency] / exchangeRates[baseCurrency]);
  }

  render() {
    return (
      <div className="currency-value">
        {this.calculateValue()}
      </div>
    );
  }
}

export default CurrencyConverter;