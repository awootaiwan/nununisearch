import React from 'react';
import styled from 'styled-components';

const PriceInput = styled.input`
  margin: 0 10px;
  width: 5em;
  border: 1px solid;
  outline: none;

  &:placeholder-shown {
    color: ${props => props.theme.colorGrey};
  }
`;

const PriceSubmitBtn = styled.button`
  padding: 3px 7px;
  cursor: pointer;
  color: ${props => props.theme.colorGrey};
  background-color: transparent;
  border-radius: 3px;
  border-color: ${props => props.theme.colorGrey};
  outline: none;

  &:hover {
    color: ${props => props.theme.colorBlack};
    border-color: ${props => props.theme.colorBlack};
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
