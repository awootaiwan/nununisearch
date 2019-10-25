import React from 'react';
import styled from 'styled-components';

const PriceInput = styled.input`
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
`;

const PriceSubmitBtn = styled.button`
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
`;

function PriceInterval({ priceInterval, displayMode, sorting }) {
  return  (
    <React.Fragment>
      <span>價格區間</span>
      <PriceInput type='number' placeholder='$最低' />
      <span> - </span>
      <PriceInput type='number' placeholder='$最高' />
      <PriceSubmitBtn>搜尋</PriceSubmitBtn>
    </React.Fragment>
  );
}

export default PriceInterval;
