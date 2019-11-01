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

const getProducts = (id, productsApiVer, text, priceRange, sort, page, limit) => {
  return getSiteSearchApiData(
    id,
    productsApiVer,
    {
      text,
      priceRange,
      sort,
      page,
      limit
    }
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

  // 修改 urlInfo 內的搜尋條件
  const setSearchCondition = (key, value) => {
    const conditions = {
      ...urlInfo,
      [key]: value
    };
    setUrlInfo(conditions);
  }

  // 監聽值改變時重新抓取商品
  useEffect(() => {
    (async () => {
      const res = await getProducts(
        thisId,
        thisApiVer,
        urlInfo.text,
        urlInfo.priceRange,
        urlInfo.sort,
        urlInfo.page,
        urlInfo.limit
      );
      
      setResponse(res);
    })();
  }, [thisId, thisApiVer, urlInfo]); // 監聽值

  return (
    <App errcode={response.errcode} errmsg={response.errmsg}>
      <ControlSet
        priceInterval={props.initCondition.priceRange}
        sorting={props.initCondition.sort}
        limit={props.initCondition.limit}
        setSearchCondition={setSearchCondition}
      />
      <ProductList data={response.result} urlInfo={urlInfo}/>
    </App>
  );
}

export default ProductListWrapper;
