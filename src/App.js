import React from 'react';
import ReactDOM from 'react-dom';
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import SearchBar from './components/SearchBar/SearchBar';

const App = props => (
  <React.Fragment>
    {props.errcode === 0 ? (
      props.children
    ) : (
      <ErrorAlert errmsg={props.errmsg} />
    )}
  </React.Fragment>
);

// for demo test
/*const App = props => (
  ReactDOM.render(
    <App errcode={1} errmsg={'test err msg'}>
      <h1>hihi</h1>
    </App>,
    document.getElementById('siteSearch')
  )
);*/

class nununiSDK {
  // constructor(id = process.env.NUNUNI_ID) {
  //   if (!id || id.length < 1) {
  //     throw new Error('nununi id is not setting');
  //   }
  //   this.id = id;
  //   this.contentApiVer = 'latest';
  //   this.productsApiVer = 'latest';
  //   this.limit = 10;
  // }

  setContentAPIVersion(apiVer) {
    this.contentApiVer = apiVer;
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
/* 參考用
  getClassify(productIdArray) {
    if (productIdArray.length < 1) {
      throw new Error('傳入商品id陣列為空陣列');
    }
    return getClassifyApiData(this.id, this.productsApiVer, {
      productIds: productIdArray
    });
  }*/

/* 參考用
  async renderClassify(productId) {
    const CupidClassify = document.getElementById('cupid-classify');
    if (!CupidClassify || CupidClassify.length < 1) {
      throw new Error('請先加入 <div id="cupid-classify"></div> HTML標籤');
    }

    if (productId === undefined) {
      const idDom = [
        ...document.querySelectorAll(
          'div[data-cupid-product-id], a[data-cupid-product-id], span[data-cupid-product-id]'
        )
      ];
      if (!idDom) {
        throw new Error(
          '請在div或a或span標籤內增加data-cupid-product-id屬性，並指定商品id'
        );
      }
      let productIdArray = idDom.map(item => {
        return item.dataset.cupidProductId;
      });
      productId = productIdArray;
    }

    const data = await this.getClassify(productId);

    const { result, errcode, errmsg } = data;
    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        <ProductTag ProductTag={result.tags} />
      </App>,
      CupidClassify
    );
  }*/

  async renderSearchBar() {
    const root = document.getElementById('nununi-searchbar');
    if (!root || root.length < 1) {
      throw new Error('請先加入 <div id="nununi-searchbar"></div> HTML標籤');
    }
    const NununiSiteSearchBar = (
      <App errcode={0}>
        <SearchBar/>
      </App>
    );
    ReactDOM.render( NununiSiteSearchBar, root);
    /* 得到資料後，帶入
    const data = await this.getSuggestion();
    const { result, errcode, errmsg } = data;
    */
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

