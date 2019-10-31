import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import SearchBar from './components/SearchBar/SearchBar';
import ProductList from '/components/ProductList/ProductList';
import ControlSet from '/components/ControlSet/ControlSet';

import { getSiteSearchApiData } from '/api/base';


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

    this.text = '';
    this.priceRange = '';
    this.limit = 32; // could be set
    this.sort = 1; // could be set
  }

  setProductsAPIVersion(apiVer) {
    this.productsApiVer = apiVer;
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
    const priceRange = url.searchParams.get('priceRange') || this.priceRange;
    const page = url.searchParams.get('page') || 1;
    const limit = url.searchParams.get('limit') || this.limit;
    const sort = url.searchParams.get('sort') || this.sort;

    return {
      text,
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

  async renderSearchBar() {
    const target = document.getElementById('nununi-searchbar');
    if (!target || target.length < 1) {
      throw new Error('請先加入 <div id="nununi-searchbar"></div> HTML標籤');
    }

    const data = {
      "errcode": 0,
      "errmsg": "ACK",
      "result": {
        "suggest": [
            "浴室",
            "浴室噴劑",
            "浴室地板",
            "浴室拖",
            "浴室拖鞋",
            "浴室排水口強效清洗劑",
            "浴室架",
            "浴室清潔劑",
            "浴室用強效清潔劑",
            "浴室窗台矽利康強效型除霉劑",
            "浴室 置物架",
            "浴室 收納",
            "浴室 防滑墊",
            "浴室 防水",
            "浴室 除黴",
            "浴室 防潑水",
            "浴室 止滑",
            "浴室 清潔劑",
            "浴室 除霉",
            "浴室 拖鞋"
        ]
      }
    };
    const { errcode, errmsg, result } = data;

    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        <SearchBar data={result.suggest} />
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
