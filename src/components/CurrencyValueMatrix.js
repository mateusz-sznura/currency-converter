import React, { Component } from 'react';
import { Table } from 'reactstrap';
import CurrencyValue from './CurrencyValue';
import CurrencyInput from './CurrencyInput';

class CurrencyValueMatrix extends Component {

  changeCurrency(idx, newCurrency) {
    const { appState, setAppState } = this.props;
    setAppState({
      ...appState,
      targetCurrencies: [ ...appState.targetCurrencies.slice(0, idx), newCurrency, ...appState.targetCurrencies.slice(idx + 1)],
    });
  }

  addCurrency() {

  }

  render() {
    const { appState, availableCurrencies } = this.props;
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
          {appState.targetCurrencies.map((targetCurrency, idx) =>
            <tr key={idx}>
              <th>
                <CurrencyInput
                    availableCurrencies={availableCurrencies}
                    currency={targetCurrency}
                    setCurrency={currency => this.changeCurrency(idx, currency)}
                />
              </th>
              {appState.dates.map(date =>
                <td key={date}>
                  <CurrencyValue 
                    amount={appState.amount}
                    baseCurrency={appState.baseCurrency}
                    targetCurrency={targetCurrency}
                    date={date}
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

export default CurrencyValueMatrix;
