import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import ProductList from './ProductList';
import ControlSet from '../ControlSet/ControlSet';
import { getSiteSearchApiData } from '../../api/base';


import theme from '../../theme/colors';
const WrapperApp = props => (
  <ThemeProvider theme={theme}>
    {props.errcode === 0 ? (
      props.children
    ) : (
      <ErrorAlert errmsg={props.errmsg} />
    )}
  </ThemeProvider>
);

const getProducts = (id, productsApiVer, urlInfo) => {
  return getSiteSearchApiData(
    id,
    productsApiVer,
    urlInfo,
  );
}

const getPrice = (interval) => {
  const intervalStr = `${interval}-`.split('-'); // 確保空字串也能被解析

  return {
    minPrice: intervalStr[0],
    maxPrice: intervalStr[1]
  }
}

const ProductListWrapper = (props) => {
  const thisId = props.initCondition.id;
  const thisApiVer = props.initCondition.productsApiVer;

  /* 初始化 state */
  const [urlInfo, setUrlInfo] = useState({
    text: props.initCondition.text,
    priceRange: props.initCondition.priceRange,
    page: props.initCondition.page,
    limit: props.initCondition.limit,
    sort: props.initCondition.sort,
  });
  const [minPrice, setMinPrice] = useState(getPrice(props.initCondition.priceRange).minPrice); // for 價格區間input 顯示
  const [maxPrice, setMaxPrice] = useState(getPrice(props.initCondition.priceRange).maxPrice);
  const [response, setResponse] = useState({
    errcode: 0,
    errmsg: 'ACK',
    result: {
      items: [],
      paging: {},
      sorting: {}
    }
  });
  const [isLoading, setLoadingState] = useState(false);

  // 修改 urlInfo 內的搜尋條件
  const setSearchCondition = (key, value) => {
    const conditions = {
      ...urlInfo,
      [key]: value
    };
    setUrlInfo(conditions);
    setLoadingState(true);

    const url = new URL(window.location.href);
    url.searchParams.set(`${key}`, value);
    window.history.pushState(conditions, null, url.search);
  }

  // 監聽值改變時重新抓取商品
  useEffect(() => {
    (async () => {
      const res = await getProducts(
        thisId,
        thisApiVer,
        urlInfo,
      );

      setResponse(res);
      setLoadingState(false);

      // for 價格區間input 顯示
      setMinPrice(getPrice(urlInfo.priceRange).minPrice);
      setMaxPrice(getPrice(urlInfo.priceRange).maxPrice);
    })();
  }, [thisId, thisApiVer, urlInfo]); // 監聽值

  window.onpopstate = (e) => {
    if (e.state) {
      setUrlInfo(e.state);
      setLoadingState(true);

      // for 價格區間input 顯示
      setMinPrice(getPrice(e.state.priceRange).minPrice);
      setMaxPrice(getPrice(e.state.priceRange).maxPrice);
    }
  }

  return (
    <WrapperApp errcode={response.errcode} errmsg={response.errmsg}>
      <ControlSet
        sorting={urlInfo.sort}
        limit={urlInfo.limit}
        setSearchCondition={setSearchCondition}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <ProductList data={response.result} urlInfo={urlInfo} isLoading={isLoading} />
    </WrapperApp>
  );
}

export default ProductListWrapper;
