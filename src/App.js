import React, { Component } from 'react';
import './App.css';
import AppConfig from './AppConfig';
import { DEFAULT_API_KEY } from './constants';

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
        appState: {},
      }
      localStorage.setItem('state', JSON.stringify(this.state));
    }

    this.setAppConfig = this.setAppConfig.bind(this);
    this.restoreDefaultAppConfig = this.restoreDefaultAppConfig.bind(this);
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

  render() {
    const { appConfig, appState } = this.state;
    return (
      <AppConfig appConfig={appConfig} setAppConfig={this.setAppConfig} restoreDefaultAppConfig={this.restoreDefaultAppConfig} />
    );
  }
}

export default App;
