import React, { Component } from 'react';
import './App.css';
import AppConfig from './AppConfig';
import CurrencyConverter from './CurrencyConverter';
import { DEFAULT_API_KEY } from './constants';
import { today } from './dateUtils';

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
            'EUR',
          ],
          dates: [
            today(),
          ],
          exchangeRates: {
            [today()]: {
              'EUR': 1.0000,
            }
          }
        },
      }
      localStorage.setItem('state', JSON.stringify(this.state));
    }

    this.setAppConfig = this.setAppConfig.bind(this);
    this.restoreDefaultAppConfig = this.restoreDefaultAppConfig.bind(this);
    this.setAppState = this.setAppState.bind(this);
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
        />
      </div>
    );
  }
}

export default App;
