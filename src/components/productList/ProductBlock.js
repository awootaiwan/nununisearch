import React from 'react';
import styled, { keyframes } from 'styled-components';
import beef from './beef.jpg';

const ProductItem = styled.div`
  position: relative;
  width: 20%;
  display: inline-block;
  letter-spacing: .05em;
  vertical-align: top;

  @media(max-width:1200px) {
    width: 25%;
  }

  @media(max-width: 992px) {
    width: 33%;
  }

  @media(max-width: 600px) {
    width: 50%;
  }

  > div {
    margin: 5px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 2px 2px #ccc;
    border-radius: 5px;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`
const ProductName = styled.div`
  margin-top: 8px;
  display: inline-block;
  overflow: hidden;
  width: 100%;
  height: 32px;
  line-height: 16px;
  text-overflow: ellipsis;

  @media(max-width: 600px) {
    height: 48px;
    word-wrap: nowrap;
    text-overflow: ellipsis;
  }
`

const ProductPrice = styled.div`
  margin-top: 14px;

  span:first-child {
    text-decoration:line-through;
  }
  span:last-child {
    float:right;
    color: red;
    font-weight: bold;
    font-size: larger;
    letter-spacing: .1em;

    @media(max-width: 350px) {
      float: none;
    }
  }

  @media(max-width: 350px) {
    span {
      display:block
    }
  }
`

const ProductBlock = ({product}) => {
  return (
    <ProductItem>
      <div>
        <a href={product.link}>
          <img src={beef}></img>
        </a>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>
          <span>{product.price}</span>
          <span>{product.specialPrice}</span>
        </ProductPrice>
      </div>
    </ProductItem>
  )
}

export default ProductBlock;