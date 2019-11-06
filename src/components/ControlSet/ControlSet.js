import React from 'react';
import styled from 'styled-components';
import PriceInterval from './PriceInterval';
import Sorting from './Sorting';
import DisplayMode from './DisplayMode';
import DisplayAmount from './DisplayAmount';

const Container = styled.div`
  display: flex;
  flex-flow: row;
  align-items: flex-end;

  @media(max-width: 991px) {
    display: initial;
  }

  @media(max-width: 600px) {
    font-size: 14px;
  }

  .nununi-controlset {
    &-leftblock {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      @media(max-width: 600px) {
        justify-content: center;
      }
    }

    &-rightblock {
      flex-grow: 1;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-end;
      align-items: center;

      @media(max-width: 600px) {
        justify-content: space-between;
      }
    }
  }

  .nununi {
    &-priceinput {
      box-sizing: border-box;
      margin: 0 10px;
      padding: 5px;
      width: 6em;
      height: 35px;
      border: 1px solid;
      border-radius: 4px;
      outline: none;

      &:placeholder-shown {
        color: ${props => props.theme.colorGrey};
      }
    }

    &-pricesubmit {
      box-sizing: border-box;
      padding: 5px 11px;
      height: 35px;
      cursor: pointer;
      color: ${props => props.theme.colorWhite};
      background-color: ${props => props.theme.colorGrey};
      border: none;
      border-radius: 4px;
      outline: none;

      &:hover {
        color: ${props => props.theme.colorWhite};
        background-color: ${props => props.theme.colorBlack};
      }
    }

    &-sorting,
    &-amount {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      margin: 5px 0;

      > span {
        margin: 0 10px 0 0;
      }

      &-select {
        &__control {
          width: 180px;
          height: 35px;
        }
      }
    }

    &-sorting {
      width: 100%;
    }

    &-display {
      display: flex;

      &-icon {
        margin: 0 10px;
        width: 40px;
        height: 40px;
        opacity: .4;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }

        .icon-block {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-item: center;
          align-content: center;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          span {
            display: block;
            border-radius: 2px;
            background-color: ${props => props.theme.colorBlack};
          }
        }

        .line {
          width: 35px;
          height: 5px;
          margin: 3px auto;
        }

        .block {
          width: 13px;
          height: 13px;
          margin: 2px;
        }
      }
    }
  }
`;

function ControlSet({ sorting, limit, setSearchCondition, setMinPrice, setMaxPrice, minPrice, maxPrice, setBarMode }) {
  return  (
    <Container className={'nununi-controlset'}>
      <div className={'nununi-controlset-leftblock'}>
        <PriceInterval
          setSearchCondition={setSearchCondition}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>

      <div className={'nununi-controlset-rightblock'}>
        <Sorting
          sorting={sorting}
          setSearchCondition={setSearchCondition}
        />
        <DisplayMode
          setBarMode={setBarMode}
        />
        <DisplayAmount
          limit={limit}
          setSearchCondition={setSearchCondition}
        />
      </div>
    </Container>
  );
}

export default ControlSet;
