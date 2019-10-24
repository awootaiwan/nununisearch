import React from 'react';
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components';
import ProductBlock from './ProductBlock';

const ProductList = (props) => {
  const numbers = props.numbers;
  const productBlocks = numbers.map(number => 
    <ProductBlock key={number}></ProductBlock>
    )
  return (
    {productBlocks}
  )
}

export default ProductList;