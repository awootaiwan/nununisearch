import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import SearchBar from './components/SearchBar/SearchBar';
import ProductList from '/components/ProductList/ProductList';
import ControlSet from '/components/ControlSet/ControlSet';


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

  _getUrlParms() {
    const url = new URL(window.location.href);
    const text = url.searchParams.get('text');
    let priceRange = url.searchParams.get('priceRange');
    let page = url.searchParams.get('page');
    let sort = url.searchParams.get('sort');
    let limit = url.searchParams.get('limit');

    if (page === null) {
      page = 1;
    }
    if (sort === null || sort === '') {
      sort = 0;
    }
    if (limit === null) {
      limit = this.limit;
    }
    return {
      text,
      priceRange,
      page,
      limit,
      sort
    };
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
    const target = document.getElementById('nununi-searchbar');
    if (!target || target.length < 1) {
      throw new Error('請先加入 <div id="nununi-searchbar"></div> HTML標籤');
    }

    /* 得到資料後，帶入
    const data = await this.getSuggestion();
    const { result, errcode, errmsg } = data;
    */
    ReactDOM.render(
      <App errcode={0}>
        <SearchBar />
      </App>,
      target
    );
  }

  renderProductList() {
    const target = document.getElementById('nununi-productlist');
    if (!target || target.length < 1) {
      throw new Error('請先加入 <div id="nununi-productlist"></div> HTML標籤');
    }

    const data = {
      "errcode": 0,
      "errmsg": "ACK",
      "result": {
        "items": [
          {
            "productId": "G400003950205",
            "productName": "GENQUO 率性翻領雙排釦風衣外套",
            "url": "https://www.genquo.com/detail/G400003950205",
            "productImageUrl": "https://image.genquo.tw/product/G4000039502/G40000395-11.jpg",
            "productPrice": 1680,
            "productPriceCurrency": "TWD",
            "productAvailability": true,
            "productSalePrice": 1480,
            "productSalePriceCurrency": "TWD"
          },
          {
            "productId": "G400004560102",
            "productName": "GENQUO 時髦短版厚實鋪棉外套-女",
            "url": "https://www.genquo.com/detail/G400004560102",
            "productImageUrl": "https://image.genquo.tw/product/G4000045601/G40000456-21.jpg",
            "productPrice": 1590,
            "productPriceCurrency": "TWD",
            "productAvailability": true,
            "productSalePrice": null,
            "productSalePriceCurrency": null
          },
          {
            "productId": "G402022250205",
            "productName": "GENQUO 率性翻領雙排釦風衣外套",
            "url": "https://www.genquo.com/detail/G400003950205",
            "productImageUrl": "https://image.genquo.tw/product/G4000039502/G40000395-11.jpg",
            "productPrice": 10680,
            "productPriceCurrency": "TWD",
            "productAvailability": false,
            "productSalePrice": 10080,
            "productSalePriceCurrency": "TWD"
          },
          {
            "productId": "G100004560102",
            "productName": "GENQUO 時髦短版厚實鋪棉外套-女",
            "url": "https://www.genquo.com/detail/G400004560102",
            "productImageUrl": "https://image.genquo.tw/product/G4000045601/G40000456-21.jpg",
            "productPrice": 1590,
            "productPriceCurrency": "TWD",
            "productAvailability": true,
            "productSalePrice": 550,
            "productSalePriceCurrency": "TWD"
          },
          {
            "productId": "G400004060102",
            "productName": "GENQUO 時髦短版厚實鋪棉外套-女",
            "url": "https://www.genquo.com/detail/G400004560102",
            "productImageUrl": "https://image.genquo.tw/product/G4000045601/G40000456-21.jpg",
            "productPrice": 1590,
            "productPriceCurrency": "TWD",
            "productAvailability": false,
            "productSalePrice": null,
            "productSalePriceCurrency": null
          },
          {
            "productId": "G4000040102",
            "productName": "GENQUO 時髦短版厚實鋪棉外套-女",
            "url": "https://www.genquo.com/detail/G400004560102",
            "productImageUrl": "https://image.genquo.tw/product/G4000045601/G40000456-21.jpg",
            "productPrice": 1590,
            "productPriceCurrency": "TWD",
            "productAvailability": true,
            "productSalePrice": null,
            "productSalePriceCurrency": null
          },
          {
            "productId": "G4020303950205",
            "productName": "GENQUO 率性翻領雙排釦風衣外套",
            "url": "https://www.genquo.com/detail/G400003950205",
            "productImageUrl": "https://image.genquo.tw/product/G4000039502/G40000395-11.jpg",
            "productPrice": 7680,
            "productPriceCurrency": "TWD",
            "productAvailability": false,
            "productSalePrice": 1080,
            "productSalePriceCurrency": "TWD"
          },
          {
            "productId": "G49000040102",
            "productName": "GENQUO 時髦短版厚實鋪棉外套-女",
            "url": "https://www.genquo.com/detail/G400004560102",
            "productImageUrl": "https://image.genquo.tw/product/G4000045601/G40000456-21.jpg",
            "productPrice": 990,
            "productPriceCurrency": "TWD",
            "productAvailability": true,
            "productSalePrice": null,
            "productSalePriceCurrency": null
          },
          {
            "productId": "G4402003950205",
            "productName": "GENQUO 率性翻領雙排釦風衣外套",
            "url": "https://www.genquo.com/detail/G400003950205",
            "productImageUrl": "https://image.genquo.tw/product/G4000039502/G40000395-11.jpg",
            "productPrice": 680,
            "productPriceCurrency": "TWD",
            "productAvailability": false,
            "productSalePrice": 580,
            "productSalePriceCurrency": "TWD"
          },
          {
            "productId": "G40000401032",
            "productName": "GENQUO 時髦短版厚實鋪棉外套-女",
            "url": "https://www.genquo.com/detail/G400004560102",
            "productImageUrl": "https://image.genquo.tw/product/G4000045601/G40000456-21.jpg",
            "productPrice": 590,
            "productPriceCurrency": "TWD",
            "productAvailability": true,
            "productSalePrice": null,
            "productSalePriceCurrency": null
          },
          {
            "productId": "G4020039504205",
            "productName": "GENQUO 率性翻領雙排釦風衣外套",
            "url": "https://www.genquo.com/detail/G400003950205",
            "productImageUrl": "https://image.genquo.tw/product/G4000039502/G40000395-11.jpg",
            "productPrice": 10680,
            "productPriceCurrency": "TWD",
            "productAvailability": false,
            "productSalePrice": 10080,
            "productSalePriceCurrency": "TWD"
          },
        ],
        "paging": {
          "limit": 5,
          "currentPage": 1,
          "totalPages": 3,
          "first": "http://minerva.chase.awoo.org/search/v1/1177060613/products?text=外套&priceRange=0-5000&sort=0&page=1&limit=20",
          "previous": null,
          "next": "http://minerva.chase.awoo.org/search/v1/1177060613/products?text=外套&priceRange=0-5000&sort=0&page=2&limit=20",
          "last": "http://minerva.chase.awoo.org/search/v1/1177060613/products?text=外套&priceRange=0-5000&sort=0&page=5&limit=20"
        },
        "sorting": {
          "currentType": "0",
          "availableTypes": ["0", "1", "2"]
        }
      }
    };

    // const NununiProductList = (
    //   <App errcode={0}>
    //     <ProductList productList={data} />
    //   </App>
    // );
    // ReactDOM.render( NununiProductList, target);
    const urlInfo = this._getUrlParms();

    const { errcode, errmsg, result } = data;

    ReactDOM.render(
    <App errcode={errcode} errmsg={errmsg}>
      <ControlSet sorting={result.sorting}></ControlSet>
      <ProductList data={result} urlInfo={urlInfo}/>
    </App>, target);
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
