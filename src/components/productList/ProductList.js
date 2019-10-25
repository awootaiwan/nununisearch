import React from 'react'
import styled, { keyframes } from 'styled-components';
import ProductBlock from './ProductBlock';

const ProductWrapper = styled.div`
  padding: 15px;

  @media(max-width: 480px) {
    padding: 15px 0;
  }
`

const ProductList = ({productList}) => {
  const productBlocks = productList.map(item => 
    <ProductBlock key={item.productId.toString()} product={item}></ProductBlock>
    )
  return (
    <ProductWrapper>{productBlocks}</ProductWrapper>
  )
}
 
export default ProductList;