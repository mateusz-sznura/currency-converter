import React, { Component } from 'react';
import './App.css';
import AppConfig from './AppConfig';
import { DEFAULT_API_KEY } from './constants';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appConfig: {
        apiKey: DEFAULT_API_KEY,
      },
      appState: {},
    }
    this.setAppConfig = this.setAppConfig.bind(this);
  }

  setAppConfig(appConfig) {
    console.log(appConfig.apiKey)
    this.setState({
      appConfig,
    });
  }

  render() {
    const { appConfig, appState } = this.state;
    return (
      <AppConfig appConfig={appConfig} setAppConfig={this.setAppConfig} />
    );
  }
}

export default App;
