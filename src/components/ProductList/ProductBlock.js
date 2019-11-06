import React from 'react'
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import { withTranslation } from 'react-i18next';

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

  > div {
    margin: 5px;
    padding: 10px;
    height: 100%;
    background-color: ${props => props.theme.colorBlockBg};
    box-shadow: 1px 1px 3px ${props => props.theme.colorBlockShadow};
    border-radius: 5px;
  }

  .product {

    &__href {
      text-decoration: none;
      cursor: pointer;
      color: ${props => props.theme.colorBlockText};
    }

    &__img {
      display: block;
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      cursor: pointer;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #fff;
      background-size: 100%;
    }

    &__price {
      min-height: 50px;
      div {
        display: inline-block;
        width:50%;
        color: ${props => props.theme.colorPrice};
        font-size: 14px;
        @media(max-width:1200px) {
          width: 100%;
        }
      }

      .on-sale {
        text-decoration: line-through;
      }

      .sale-price {
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
        &:hover {
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
    height: 130px;
    overflow: hidden;
    padding: 5px 0;
    border-top: 1px solid #ccc;
    border-radius: 0;

    &:last-child {
      border-bottom: 1px solid #ccc;
    }

    > a {
      display: block;
      width: 100%;
      height: 100%;
    }

    > div {
      margin: 0;
      padding: 0;
      box-shadow: none;
    }
    .product {
      &__img {
        display: inline-block;
        padding-bottom: 0;
        padding-right: 5%;
        width: 80px;
        height: 100%;

        img {
          width: auto;
          height: 100%;
        }
      }
      &__detail {
        position: relative;
        display: inline-block;
        height: 100%;
        padding-left: 20px;
        vertical-align: top;
        box-sizing: border-box;

        @media(max-width: 450px) {
          width:60%;
        }
      }

      &__price {
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        div {
          width: 100%;
        }
        div:last-child {
          text-align: left;
        }
      }
    }
    .outofStock {
      position: absolute;
      padding: 3px;
      width: 60px;
      border-radius: 5px;
      text-align: center;
      color: ${props => props.theme.colorBadgeText};
      background-color: ${props => props.theme.colorBadgeBg};
      z-index: 1;
    }
  }
`

function ProductBlock({product, t}){
  const outOfStock = t('productBlock.outofStock');
  const backgroundProductImg = {
    backgroundImage: `url('${product.productImageUrl}')`
  }

  return (
    <ProductItem className='default-style' imageUrl={product.productImageUrl}>
      <div>
        <a className="product__href" href={product.url} title={product.productName} data-cupid-product-id={product.productId}>
        <LazyLoad height={200} offset={100}>

          <div className="product__img" style={backgroundProductImg}>
            {
              !product.productAvailability?
              <div className='outofStock'>{outOfStock}</div>:
              null
            }
          </div>
          </LazyLoad>
          <div className="product__detail">
            <div className="product__name">
              <div>
                {product.productName}
              </div>
            </div>
            <div className="product__price">
              {
                product.productSalePrice ?
                <div className="on-sale">{product.productPriceCurrency} {product.productPrice.toLocaleString('en-US')}</div>:
                <div >{product.productPriceCurrency} {product.productPrice.toLocaleString('en-US')}</div>
              }
              {
                product.productSalePrice ?
                <div className="sale-price">{product.productSalePriceCurrency} {product.productSalePrice.toLocaleString('en-US')}</div>:
                ''
              }
            </div>
          </div>
        </a>
      </div>
    </ProductItem>
  )
}

export default withTranslation()(ProductBlock);
