import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import SearchBar from './components/SearchBar/SearchBar';
import ProductList from '/components/ProductList/ProductList';
import ControlSet from '/components/ControlSet/ControlSet';
import { getSiteSearchApiData, getSuggestionApiData } from '/api/base';
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
      throw new Error('nununi id is not setting');
    }
    this.id = id;
    this.productsApiVer = 'latest'; // could be set
    this.suggestionApiVer = 'latest'; // could be set

    this.text = '';
    this.priceRange = '';
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
      throw Error('setLimit is not number.');
    }

    if (limit < 1) {
      throw Error('limit need to be greater than 0.');
    }
    this.limit = limit;
  }

  setSort(sort) {
    if (typeof sort != 'number') {
      throw Error('setSort is not number.');
    }

    if (sort !== 1 && sort !== 2 && sort !== 11) {
      throw Error('Sort type is not in [1, 2, 11].');
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

  getProducts(text, priceRange, sort, page, limit) {
    return getSiteSearchApiData(
      this.id,
      this.productsApiVer,
      {
        text,
        priceRange,
        sort,
        page,
        limit
      }
    );
  }

  getSuggestions(version, keyword){
    return getSuggestionApiData(
      this.id,
      version,
      {keyword}
    );
  }

  renderSuggestions = async () => {
    const url = new URL(window.location.href);
    const keyword = url.searchParams.get('keyword');
    const { errmsg, result } = await this.getSuggestions(keyword);
    return result;
  }

  async renderSearchBar() {
    const target = document.getElementById('nununi-searchbar');
    if (!target || target.length < 1) {
      throw new Error('請先加入 <div id="nununi-searchbar"></div> HTML標籤');
    }

    ReactDOM.render(
      <App errcode={0} errmsg={0}>
        <SearchBar
          renderSuggestions={this.renderSuggestions} 
          getSuggestion={this.getSuggestions} 
          version={this.suggestionApiVer}
        />
      </App>,
      target
    );
  }

  async renderProductList() {
    const target = document.getElementById('nununi-productlist');
    if (!target || target.length < 1) {
      throw new Error('請先加入 <div id="nununi-productlist"></div> HTML標籤');
    }

    const urlInfo = this._getUrlParms();
    const { errcode, errmsg, result } = await this.getProducts(
      urlInfo.text,
      urlInfo.priceRange,
      urlInfo.sort,
      urlInfo.page,
      urlInfo.limit
    );

    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        <ControlSet
          priceInterval={urlInfo.priceRange}
          sorting={urlInfo.sort}
          limit={urlInfo.limit}
        />
        <ProductList data={result} urlInfo={urlInfo}/>
      </App>,
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
