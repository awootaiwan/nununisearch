import React from 'react';
import ReactDOM from 'react-dom'
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
    <ProductBlock key={item.name} product={item}></ProductBlock>
    )
  return (
    <ProductWrapper>{productBlocks}</ProductWrapper>
  )
}

export default ProductList;