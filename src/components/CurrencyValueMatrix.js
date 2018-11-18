import React, { Component } from 'react';
import { Table } from 'reactstrap';
import CurrencyValue from './CurrencyValue';

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
