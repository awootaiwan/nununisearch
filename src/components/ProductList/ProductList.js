import React from 'react'
import styled from 'styled-components';
import ProductTotalText from './ProductTotalText';
import ProductBlock from './ProductBlock';
import Pagination from "./Pagination";
import { withTranslation } from 'react-i18next';

const ProductWrapper = styled.div`
  position: relative;
  padding: 15px;

  @media(max-width: 480px) {
    padding: 15px 0;
  }

  .nununi-productblock {
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

    .preOrder {
      position: absolute;
      padding: 3px;
      width: 60px;
      border-radius: 5px;
      text-align: center;
      color: ${props => props.theme.colorBadgeText};
      background-color: ${props => props.theme.colorBadgeBg};
      z-index: 1;
    }

    &-href {
      display: block;
      margin: 5px;
      padding: 10px;
      box-shadow: 1px 1px 3px ${props => props.theme.colorBlockShadow};
      border-radius: 5px;
      cursor: pointer;
      color: ${props => props.theme.colorBlockText};
    }

    &-img {
      padding-bottom: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #fff;
      background-size: 100%;
    }

    &-price {
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

      .origin-price {
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
    }

    &-name {
      margin-top: 12px;
      display: inline-block;
      overflow: hidden;
      height: 32px;
      line-height: 16px;
      letter-spacing: .05em;
      text-overflow: ellipsis;

      &:hover {
        text-decoration: underline;
      }

      @media(max-width: 600px) {
        height: 48px;
        text-overflow: ellipsis;
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

      .nununi-productblock {
        &-href {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          box-shadow: none;
        }

        &-img {
          display: inline-block;
          padding-bottom: 0;
          padding-right: 5%;
          width: 80px;
          height: 100%;
        }

        &-detail {
          position: relative;
          display: inline-block;
          width: calc(100% - 150px);
          height: 100%;
          padding-left: 20px;
          vertical-align: top;
          box-sizing: border-box;

          @media(max-width: 450px) {
            width:60%;
          }
        }

        &-price {
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
    }
  }
`;

const ProductNoData = styled.div`
  padding-top: 30px;
  text-align: center;
`;

const LoadingMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(35, 24, 21, .4);
`;

const PaginationWrapper = styled.div`
  .nununi-pagination {
    &-container {
      display: flex;
      justify-content: center;
      list-style: none;
    }

    &-page {
      width: 36px;
      height: 38px;
      text-align: center;
      line-height: 38px;
      font-size: 13px;

      &.selected {
        > a {
          background: ${props => props.theme.colorPaginationBg_active};
          border-color: ${props => props.theme.colorPaginationBg_active};
          color: ${props => props.theme.colorPaginationActiveText};

          &:hover {
            color: ${props => props.theme.colorPaginationText_active};
          }
        }
      }

      &.disabledPage {
        display: none;
      }
    }

    &-link {
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 100%;
      border-width: 1px;
      border-style: solid;
      cursor: pointer;
      background-color: ${props => props.theme.colorPaginationBg};
      color: ${props => props.theme.colorPaginationText};
      border-color: ${props => props.theme.colorPaginationBorder};
      outline: none;

      &.breakLink {
        pointer-events: none;
        border-bottom: none;
        border-top: none;
      }

      &:hover {
        color: ${props => props.theme.colorPaginationText_hover};
      }
    }
  }
`;

function ProductList({data, urlInfo, isLoading, setSearchCondition, dataIsBack, barMode, t}) {
  const noData = (dataIsBack && urlInfo.text !== '' && !isLoading) ? t('productList.noData') : '';
  const {items, paging, sorting} = data;
  const productBlocks = items.map(item =>
    <ProductBlock
      key={item.productId.toString()}
      product={item}
      barMode={barMode}
    />
  );

  return (
    <>
      {
        (!items || items.length <= 0) ?
          <ProductNoData className="nununi-noproduct">{noData}</ProductNoData> :
          <ProductWrapper className="nununi-listwrapper" sorting={sorting}>
            {isLoading && <LoadingMask className="nununi-listwrapper-loadingmask" />}
            <ProductTotalText paging={paging}></ProductTotalText>
            {productBlocks}
          </ProductWrapper>
      }
      {
        (items && items.length > 0 ?
          <PaginationWrapper className="nununi-pagination">
            <Pagination paging={paging} setSearchCondition={setSearchCondition} />
          </PaginationWrapper> :
          ''
        )
      }
    </>
  )
}

export default withTranslation()(ProductList);
