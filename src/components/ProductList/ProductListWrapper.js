import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import ProductList from './ProductList';
import ControlSet from '../ControlSet/ControlSet';
import { getSiteSearchApiData } from '../../api/base';

import theme from '../../theme/colors';
const App = props => (
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
    })();
  }, [thisId, thisApiVer, urlInfo]); // 監聽值

  window.onpopstate = (e) => {
    if (e.state) {
      const url = new URL(window.location.href);
      Object.keys(e.state).forEach((key) => {
        url.searchParams.set(`${key}`, e.state[key]);
      })
      window.location.href = url.href;

      // setUrlInfo(e.state);
      // setLoadingState(true);
    }
  }

  return (
    <App errcode={response.errcode} errmsg={response.errmsg}>
      <ControlSet
        priceInterval={urlInfo.priceRange}
        sorting={urlInfo.sort}
        limit={urlInfo.limit}
        setSearchCondition={setSearchCondition}
      />
      <ProductList data={response.result} urlInfo={urlInfo} isLoading={isLoading} />
    </App>
  );
}

export default ProductListWrapper;
