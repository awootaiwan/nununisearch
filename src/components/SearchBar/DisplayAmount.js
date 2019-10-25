import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const DisplayAmountContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  > span {
    margin: 0 10px 0 0;
  }
`;

const selectorStyle = {
  control: styles => ({
    ...styles,
    boxSizing: 'border-box',
    width: '180px',
    height: '35px',
    borderRadius: '4px'
  })
}

const sortOptions = [
  { value: '1', label: '一頁32個商品' },
  { value: '2', label: '一頁64個商品' },
  { value: '3', label: '一頁80個商品' }
]

function DisplayAmount({ priceInterval, displayMode, sorting }) {
  return  (
    <DisplayAmountContainer>
      <span>顯示</span>
      <Select
        options={sortOptions}
        defaultValue={sortOptions[0]}
        styles={selectorStyle}
      />
    </DisplayAmountContainer>
  );
}

export default DisplayAmount;
