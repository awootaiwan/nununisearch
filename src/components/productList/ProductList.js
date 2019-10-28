import React from 'react'
import styled from 'styled-components';
import ProductBlock from './ProductBlock';
import Pagination from "./Pagination"

const ProductWrapper = styled.div`
  padding: 15px;

  @media(max-width: 480px) {
    padding: 15px 0;
  }
`

const ProductNoData = styled.div`
  padding-top: 30px;
  text-align: center;
`

const ProductList = ({data, urlInfo}) => {
  const noData = '查無資料';
  const {items, paging, sorting} = data;
  const productBlocks = items.map(item =>
    <ProductBlock key={item.productId.toString()} product={item}></ProductBlock>
    )
  return (
    <React.Fragment>
      {
        (!items || items.length <= 0)?<ProductNoData>{noData}</ProductNoData>:<ProductWrapper sorting={sorting}>{productBlocks}</ProductWrapper>
      }
      {
        (items && items.length > 0 ? <Pagination products={items} paging={paging} urlInfo={urlInfo}/> : "")
      }
    </React.Fragment>
  )
}
 
export default ProductList;