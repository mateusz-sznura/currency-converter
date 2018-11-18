import React, { Component } from 'react';
import { Table } from 'reactstrap';
import CurrencyValue from './CurrencyValue';
import CurrencyInput from './CurrencyInput';
import AddNewCurrency from './AddNewCurrency';
import DateInput from './DateInput';
import AddNewDate from './AddNewDate';

class CurrencyValueMatrix extends Component {

  constructor(props) {
    super(props);

    this.addCurrency = this.addCurrency.bind(this);
    this.addDate = this.addDate.bind(this);
  }

  changeCurrency(idx, newCurrency) {
    const { appState, setAppState } = this.props;
    setAppState({
      ...appState,
      targetCurrencies: [ ...appState.targetCurrencies.slice(0, idx), newCurrency, ...appState.targetCurrencies.slice(idx + 1)],
    });
  }

  addCurrency() {
    const { appState, setAppState } = this.props;
    setAppState({
      ...appState,
      targetCurrencies: [ ...appState.targetCurrencies, ''],
    });
  }

  changeDate(idx, newDate) {
    const { appState, setAppState } = this.props;
    setAppState({
      ...appState,
      dates: [ ...appState.dates.slice(0, idx), newDate, ...appState.dates.slice(idx + 1)],
      isLoading: true,
    });
  }

  addDate() {
    const { appState, setAppState } = this.props;
    setAppState({
      ...appState,
      dates: [ ...appState.dates, ''],
    });
  }

  render() {
    const { appState, availableCurrencies } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            <th></th>
            {appState.dates.map((date, idx) =>
              <th key={idx}>
                <DateInput date={date} setDate={date => this.changeDate(idx, date)} />
              </th>
            )}
            <th>
              <AddNewDate addNewDate={this.addDate} />
            </th>
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
              {appState.dates.map((date, idx) =>
                <td key={idx}>
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
            <td colSpan="1">
              <AddNewCurrency addNewCurrency={this.addCurrency} />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default CurrencyValueMatrix;
