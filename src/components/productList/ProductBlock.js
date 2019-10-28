import React from 'react'
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

const ProductItem = styled.div`
  position: relative;
  width: 20%;
  display: inline-block;
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
    color: ${props => props.theme.colorBlockBg};
    box-shadow: 1px 1px 3px ${props => props.theme.colorBlockShadow};
    border-radius: 5px;
  }

  .product {

    &__img {
      overflow: hidden;
      position: relative;
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }

    &__price {
      div {
        display: inline-block;
        height: 16px;
        width:50%;
        color: ${props => props.theme.colorPrice};
        font-size: 14px;
        @media(max-width:1200px) {
          width: 100%;
        }
      }
  
      div:last-child {
        color: ${props => props.theme.colorSalePrice};
        font-weight: bold;
        font-size: 16px;
        text-align: right;
    
        @media(max-width: 600px) {
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

    &__name {
      margin-top: 12px;
      display: inline-block;
      overflow: hidden;
      width: 100%;
      height: 32px;
      line-height: 16px;
      letter-spacing: .05em;
      text-overflow: ellipsis;
       a {
        color: ${props => props.theme.colorBlockText};
        :hover {
          text-decoration: underline;
        }
       }
    
      @media(max-width: 600px) {
        height: 48px;
        word-wrap: nowrap;
        text-overflow: ellipsis;
      }
    }


  }
  &.bar-style {
    width: 100%;
    height: 120px;
    overflow: hidden;
    padding: 5px 0;
    border-top: 1px solid #ccc;
    border-radius: 0;

    > div {
      margin: 0;
      padding: 0;
      box-shadow: none;
    }
    .product {
      &__img {
        display: inline-block;
        width: auto;
        height: 100%;

        img {
          width: auto;
          height: 100%;
        }
      }
      &__detail {
        height: 100%;
        display: inline-block;
        padding-left: 20px;
        vertical-align: top;
        box-sizing: border-box;

        @media(max-width: 400px) {
          width:60%;
        }
      }

      &__price {
        box-sizing: border-box;
        padding-bottom: 10px;
        div {
          width: 100%;
        }
        div:last-child {
          text-align: left;
        }
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
  color: ${props => props.theme.colorBadgeText};
  background-color: ${props => props.theme.colorBadgeBg};
  z-index: 1;
`

function ProductBlock({product}){
  
  const outOfStock = '缺貨中';

  return (
    <ProductItem className={"bar-style"}>
      <div>
        <a className="product__img" href={product.url} title={product.productName}>
          {
            !product.productAvailability?
            <OutofStock>{outOfStock}</OutofStock>:
            null
          }
          <LazyLoad height={200} offset={100}>
            <img src={product.productImageUrl} alt={product.productName}></img>
          </LazyLoad>
        </a>
        <div className="product__detail">
          <div className="product__name">
            <a href={product.url} title={product.productName}>
              {product.productName}
            </a>
          </div>
          <div className="product__price">
            {
              product.productSalePrice ?
              <div className="onSale">{product.productPriceCurrency} {product.productPrice.toLocaleString('en-US')}</div>:
              <div >{product.productPriceCurrency} {product.productPrice.toLocaleString('en-US')}</div>
            }
            {
              product.productSalePrice ?
              <div>{product.productSalePriceCurrency} {product.productSalePrice.toLocaleString('en-US')}</div>:
              <div></div>
            }
          </div>
        </div>
      </div>
    </ProductItem>
  )
}

export default ProductBlock;