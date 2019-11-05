import React from 'react'
import styled from 'styled-components';
import ProductBlock from './ProductBlock';
import Pagination from "./Pagination";
import { withTranslation } from 'react-i18next';

const ProductWrapper = styled.div`
  position: relative;
  padding: 15px;

  @media(max-width: 480px) {
    padding: 15px 0;
  }
`

const ProductNoData = styled.div`
  padding-top: 30px;
  text-align: center;
`

const LoadingMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(35, 24, 21, .4);
`;

function ProductList({data, urlInfo, isLoading, t}) {
  const noData = (urlInfo.text !== '' && !isLoading) ? t('productList.noData') : '';
  const {items, paging, sorting} = data;
  const productBlocks = items.map(item =>
    <ProductBlock key={item.productId.toString()} product={item}></ProductBlock>
  )

  return (
    <React.Fragment>
      {
        (!items || items.length <= 0) ?
          <ProductNoData>{noData}</ProductNoData> :
          <ProductWrapper sorting={sorting}>
            {isLoading && <LoadingMask />}
            {productBlocks}
          </ProductWrapper>
      }
      {
        (items && items.length > 0 ? <Pagination products={items} paging={paging} urlInfo={urlInfo}/> : "")
      }
    </React.Fragment>
  )
}

export default withTranslation()(ProductList);
