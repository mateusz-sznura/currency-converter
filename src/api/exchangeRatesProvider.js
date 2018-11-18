import fromPairs from 'lodash/fromPairs';
import { today } from '../utils/dateUtils';

const BASE_URL = 'http://data.fixer.io/api';

class ExchangeRatesProvider {

  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  
  _buildSymbolsUrl() {
    return `${BASE_URL}/symbols?access_key=${this.apiKey}`;
  }

  async getSymbols() {
    const persistedSymbols = localStorage.getItem('symbols'); 
    if (persistedSymbols) {
      return JSON.parse(persistedSymbols);
    }
    const response = await fetch(this._buildSymbolsUrl());
    const symbols = Object.keys((await response.json()).symbols);
    localStorage.setItem('symbols', JSON.stringify(symbols));
    return symbols; 
  }

  async _buildExchangeRatesUrl(date) {
    const endpoint = date === today() ? 'latest' : date;
    const symbols = (await this.getSymbols()).join(',');
    return `${BASE_URL}/${endpoint}?access_key=${this.apiKey}&symbols=${symbols}`;
  }

  // TODO: DON'T SAVE LATEST (TODAY) RATES TO LOCAL STORAGE, BECAUSE THEY CAN CHANGE
  async getExchangeRates({ targetCurrencies, dates }) {
    const persistedExchangeRates = JSON.parse(localStorage.getItem('exchangeRates')) || {};
    const exchangeRates = fromPairs(await Promise.all(dates.map(async date => {
      if (persistedExchangeRates[date]) {
        return [ date, persistedExchangeRates[date] ];
      }
      const response = await fetch(await this._buildExchangeRatesUrl(date));
      return [ date, (await response.json()).rates ];
    })));
    const mergedExchangeRates = {
      ...persistedExchangeRates,
      ...exchangeRates,
    };
    localStorage.setItem('exchangeRates', JSON.stringify(mergedExchangeRates));
    // return Object.entries(exchangeRates).reduce((trimmedExchangeRates, [date, rates]) => {
    //   trimmedExchangeRates[date] = 
    // }, {}); 
    return exchangeRates;
  }

}

const getExchangeRates = async ({ apiKey, targetCurrencies, dates }) => {
  const exchangeRatesProvider = new ExchangeRatesProvider(apiKey);
  return await exchangeRatesProvider.getExchangeRates({ targetCurrencies, dates });
};

const getCurrencyCodes = async ({ apiKey }) => {
  const exchangeRatesProvider = new ExchangeRatesProvider(apiKey);
  return await exchangeRatesProvider.getSymbols();
};

export {
  getExchangeRates,
  getCurrencyCodes,
}; 
