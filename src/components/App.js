import React, { Component } from 'react';
import './App.css';
import AppConfig from './AppConfig';
import CurrencyConverter from './CurrencyConverter';
import { DEFAULT_API_KEY } from '../config';
import { today } from '../utils/dateUtils';
import { getExchangeRates, getCurrencyCodes } from '../api/exchangeRatesProvider';

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
          amount: 1,
          baseCurrency: 'EUR',
          targetCurrencies: [
            'USD',
          ],
          dates: [
            today(),
          ],
          exchangeRates: {
          },
          isLoading: true,
        },
        availableCurrencies: [],
      }
      localStorage.setItem('state', JSON.stringify(this.state));
    }

    this.setAppConfig = this.setAppConfig.bind(this);
    this.restoreDefaultAppConfig = this.restoreDefaultAppConfig.bind(this);
    this.setAppState = this.setAppState.bind(this);
    this.getExchangeRates = this.getExchangeRates.bind(this);
 }

  componentDidMount() {
    const { apiKey } = this.state.appConfig;
    if (this.state.availableCurrencies.length === 0) {
      getCurrencyCodes({ apiKey }).then(availableCurrencies => {
        this.setState({
          availableCurrencies,
        });
      });
    }

    if (this.state.appState.isLoading) {
      this.getExchangeRates();
    }
  }

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));

    if (this.state.appState.isLoading) {
      this.getExchangeRates();
    }
  }

  getExchangeRates() {
    const { apiKey } = this.state.appConfig;
    const { targetCurrencies, baseCurrency } = this.state.appState;
    const currencies = targetCurrencies.includes(baseCurrency)
      ? targetCurrencies.filter(currency => currency !== '')
      : [...targetCurrencies, baseCurrency].filter(currency => currency !== '');
    const dates = this.state.appState.dates.filter(date => date !== '');
    getExchangeRates({ apiKey, dates, targetCurrencies: currencies }).then(exchangeRates => {
      this.setState(state => ({
        appState: {
          ...state.appState,
          exchangeRates,
          isLoading: false,
        }
      }));
    });
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

  render() {
    const { appConfig, appState } = this.state;
    return (
      <div className="app">
        <AppHeader />
        <div className="app-body">
          <CurrencyConverter
            appConfig={appConfig}
            appState={appState}
            setAppState={this.setAppState}
            availableCurrencies={this.state.availableCurrencies}
          />
          <AppConfig 
            appConfig={appConfig}
            setAppConfig={this.setAppConfig}
            restoreDefaultAppConfig={this.restoreDefaultAppConfig}
          />
        </div>
        <AppFooter />
      </div>
    );
  }
}

const AppHeader = () => (
  <div className="app-header">
    <h1>Currency Converter</h1>
    <h2>Convert and compare currencies</h2>
  </div>
);

const AppFooter = () => (
  <div className="app-footer">
    <p>by Mateusz Sznura</p>
  </div>
);

export default App;
