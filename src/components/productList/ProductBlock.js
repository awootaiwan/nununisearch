import React from 'react'
import styled, { keyframes } from 'styled-components';
import beef from './beef.jpg';
import { tsConstructorType } from '@babel/types';

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

  a {
    text-decoration: none;
    cursor: pointer;
  }

  > div {
    margin: 5px;
    padding: 10px;
    height: 100%;
    background-color: white;
    box-shadow: 1px 1px 3px #ccc;
    border-radius: 5px;
  }

  .product__img {
    overflow: hidden;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  .product__price {
    margin-top: 14px;
    
    div {
      display: inline-block;
      height: 20px;
      width:50%;
      @media(max-width:1200px) {
        width: 100%;
      }
    }

    div:last-child {
      color: red;
      font-weight: bold;
      font-size: larger;
      letter-spacing: .1em;
      text-align: right;
  
      @media(max-width: 600px) {
        float: none;
        margin-top: 5px;
      }
    }
  
    @media(max-width: 350px) {
      span {
        display:block
      }
    }

    .onSale {
      text-decoration:line-through;
    }
  }
  .product__name {
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
  }
  &.barStyle {
    width: 100%;
    @media(max-width: 600px) {
      height: 120px;
    }
    > div {
      margin: 0;
      padding: 5px;
      box-shadow: none;
    }
    .product {
      &__img {
        display: inline-block;
        width: 10%;
        height: 100%;
        @media(max-width: 600px) {
          width: 30%;
        }
      }
      &__detail {
        width: 90%;
        height: 100%;
        display: inline-block;
        padding-left: 20px;
        vertical-align: baseline;
        box-sizing: border-box;
        @media(max-width: 600px) {
          width: 70%;
          vertical-align: top;
        }
      }
      &__price {
        margin-top: 24px;
      }
    }
  }
`

const OutofStock = styled.div`
 position: absolute;
 padding: 3px;
 width: 60px;
 border-radius: 5px;
 text-align: center;
 color: #fff;
 background-color: #ccc;
 z-index: 1;
`

const ProductBlock = ({product}) => {
  
  const outOfStock = '缺貨中';

  return (
    <ProductItem>
      <div>
        <a className="product__img" href={product.url}>
          {
            !product.productAvailability?
            <OutofStock>{outOfStock}</OutofStock>:
            null
          }
          <img src={product.productImageUrl}></img>
        </a>
        <div className="product__detail">
          <div className="product__name">{product.productName}</div>
          <div className="product__price">
            {
              product.productSalePrice ?
              <div className="onSale">{product.productPriceCurrency} {product.productPrice}</div>:
              <div >{product.productPriceCurrency} {product.productPrice}</div>
            }
            <div>{product.productSalePriceCurrency} {product.productSalePrice}</div>
          </div>
        </div>
      </div>
    </ProductItem>
  )
}

export default ProductBlock;