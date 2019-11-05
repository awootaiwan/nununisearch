import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import SearchBar from './components/SearchBar/SearchBar';
import ProductListWrapper from './components/ProductList/ProductListWrapper';
import { getSiteSearchApiData, getSuggestionApiData } from '/api/base';
import i18next from 'i18next';
import './i18n';

import theme from './theme/colors';

const App = props => (
  <ThemeProvider theme={theme}>
    {props.errcode === 0 ? (
      props.children
    ) : (
      <ErrorAlert errmsg={props.errmsg} />
    )}
  </ThemeProvider>
);

class nununiSDK {
  constructor(id = process.env.NUNUNI_ID) {
    if (!id || id.length < 1) {
      throw new Error(i18next.t('nununiError.id'));
    }
    this.id = id;
    this.productsApiVer = 'latest'; // could be set
    this.suggestionApiVer = 'latest'; // could be set

    this.text = '';
    this.priceRange = '';
    this.page = 1;
    this.limit = 32; // could be set
    this.sort = 1; // could be set
  }

  setProductsAPIVersion(apiVer) {
    this.productsApiVer = apiVer;
  }
  setSuggestionAPIVersion(apiVer) {
    this.suggestionApiVer = apiVer;
  }

  setLimit(limit) {
    if (typeof limit != 'number') {
      throw Error(i18next.t('nununiError.limitNotNumber'));
    }

    if (limit < 1) {
      throw Error(i18next.t('nununiError.limitTooSmall'));
    }
    this.limit = limit;
  }

  setSort(sort) {
    if (typeof sort != 'number') {
      throw Error(i18next.t('nununiError.sortNotNumber'));
    }

    if (sort !== 1 && sort !== 2 && sort !== 11) {
      throw Error(i18next.t('nununiError.sortTypeErr'));
    }
    this.sort = sort;
  }

  _getUrlParms() {
    const url = new URL(window.location.href);
    const text = url.searchParams.get('text') || this.text;
    const keyword = url.searchParams.get('keyword') || this.keyword;
    const priceRange = url.searchParams.get('priceRange') || this.priceRange;
    const page = url.searchParams.get('page') || 1;
    const limit = url.searchParams.get('limit') || this.limit;
    const sort = url.searchParams.get('sort') || this.sort;

    return {
      text,
      keyword,
      priceRange,
      page,
      limit,
      sort
    };
  }

  getSuggestions = (keyword) => {
    return getSuggestionApiData(
      this.id,
      this.suggestionApiVer,
      {keyword}
    );
  }

  async renderSearchBar() {
    const target = document.getElementById('nununi-searchbar');
    if (!target || target.length < 1) {
      throw new Error(i18next.t('nununiError.searchBarTag'));
    }

    ReactDOM.render(
      <App errcode={0} errmsg={0}>
        <SearchBar
          getSuggestion={this.getSuggestions}
          version={this.suggestionApiVer}
        />
      </App>,
      target
    );
  }

  getProducts = (urlInfo) => {
    return getSiteSearchApiData(
      this.id,
      this.productsApiVer,
      urlInfo
    );
  }

  async renderProductList() {
    const target = document.getElementById('nununi-productlist');
    if (!target || target.length < 1) {
      throw new Error(i18next.t('nununiError.productListTag'));
    }

    const urlInfo = this._getUrlParms();
    const initCondition = {
      id: this.id,
      productsApiVer: this.productsApiVer,
      text: urlInfo.text,
      priceRange: urlInfo.priceRange,
      limit: urlInfo.limit,
      sort: urlInfo.sort,
      page: urlInfo.page,
    }

    ReactDOM.render(
      <ProductListWrapper initCondition={initCondition} getProducts={this.getProducts} />,
      target
    );
  }
}

/** Detect free variable `global` from Node.js. */
const freeGlobal =
  typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
const freeSelf =
  typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
const root = freeGlobal || freeSelf || Function('return this')();

module.exports = root.nununiSDK = nununiSDK;  
