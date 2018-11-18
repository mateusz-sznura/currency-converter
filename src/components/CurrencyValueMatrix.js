import React, { Component } from 'react';
import { Table } from 'reactstrap';
import CurrencyValue from './CurrencyValue';
import CurrencyInput from './CurrencyInput';
import AddNewCurrency from './AddNewCurrency';
import DateInput from './DateInput';
import AddNewDate from './AddNewDate';
import './CurrencyValueMatrix.css';

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

  removeCurrency(idx) {
    const { appState, setAppState } = this.props;
    setAppState({
      ...appState,
      targetCurrencies: [ ...appState.targetCurrencies.slice(0, idx), ...appState.targetCurrencies.slice(idx + 1)],
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

  removeDate(idx) {
    const { appState, setAppState } = this.props;
    setAppState({
      ...appState,
      dates: [ ...appState.dates.slice(0, idx), ...appState.dates.slice(idx + 1)],
    });
  }

  render() {
    const { appState, availableCurrencies } = this.props;
    return (
      <Table className="currency-value-matrix" responsive={true}>
        <tbody>
          <tr>
            <td className="td-instruction">
              <div className="instruction">
                Select target currencies and dates
              </div>
            </td>
            {appState.dates.map((date, idx) =>
              <td className="td-input" key={idx}>
                <DateInput
                  date={date}
                  setDate={date => this.changeDate(idx, date)}
                  removeDate={() => this.removeDate(idx)}
                />
              </td>
            )}
            <td className="td-add-input td-last" rowSpan={appState.targetCurrencies.length + 2}>
              <AddNewDate addNewDate={this.addDate} />
            </td>
          </tr>
          {appState.targetCurrencies.map((targetCurrency, idx) =>
            <tr key={idx}>
              <td className="td-input">
                <CurrencyInput
                    availableCurrencies={availableCurrencies}
                    currency={targetCurrency}
                    setCurrency={currency => this.changeCurrency(idx, currency)}
                    removeCurrency={() => this.removeCurrency(idx)}
                />
              </td>
              {appState.dates.map((date, idx) =>
                <td className="td-value" key={idx}>
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
            <td className="td-add-input" colSpan={appState.dates.length + 1}>
              <AddNewCurrency addNewCurrency={this.addCurrency} />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default CurrencyValueMatrix;
