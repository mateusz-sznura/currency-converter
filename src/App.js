import React, { Component } from 'react';
import './App.css';
import AppConfig from './AppConfig';
import CurrencyConverter from './CurrencyConverter';
import { DEFAULT_API_KEY } from './constants';
import { today } from './dateUtils';
import { getExchangeRates, getCurrencyCodes } from './exchangeRatesProvider';

class App extends Component {

  constructor(props) {
    super(props);

    const persistedState = localStorage.getItem('state');
    if (persistedState) {
      this.state = JSON.parse(persistedState);
    }
    else {
      this.state = {
        appConfig: {
          apiKey: DEFAULT_API_KEY,
        },
        appState: {
          amount: 200,
          baseCurrency: 'SEK',
          targetCurrencies: [
            'USD',
            '',
          ],
          dates: [
            '2014-02-24',
            today(),
            '',
          ],
          exchangeRates: {
            [today()]: {
              'EUR': 1.0000,
              'USD': 1.1400, // 1 EUR = 1.1400 USD
              'SEK': 10.2700, // 1 EUR = 10.2700 SEK
            }
          }
        },
      }
      localStorage.setItem('state', JSON.stringify(this.state));
    }

    this.setAppConfig = this.setAppConfig.bind(this);
    this.restoreDefaultAppConfig = this.restoreDefaultAppConfig.bind(this);
    this.setAppState = this.setAppState.bind(this);
    this.getExchangeRates = this.getExchangeRates.bind(this);
    this.getCurrencyCodes = this.getCurrencyCodes.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  setAppConfig(appConfig) {
    this.setState({
      appConfig,
    });
  }

  restoreDefaultAppConfig() {
    this.setState({
      appConfig: {
        apiKey: DEFAULT_API_KEY,
      }
    });
  }

  setAppState(appState) {
    this.setState({
      appState,
    });
  }

  getExchangeRates({ targetCurrencies, dates }) {
    return getExchangeRates({ apiKey: this.state.appConfig.apiKey, targetCurrencies, dates });
  }

  getCurrencyCodes() {
    return getCurrencyCodes({ apiKey: this.state.appConfig.apiKey });
  }

  render() {
    const { appConfig, appState } = this.state;
    return (
      <div className="app">
        <AppConfig 
          appConfig={appConfig}
          setAppConfig={this.setAppConfig}
          restoreDefaultAppConfig={this.restoreDefaultAppConfig}
        />
        <CurrencyConverter
          appConfig={appConfig}
          appState={appState}
          setAppState={this.setAppState}
          getExchangeRates={this.getExchangeRates}
          getCurrencyCodes={this.getCurrencyCodes}
        />
      </div>
    );
  }
}

export default App;
