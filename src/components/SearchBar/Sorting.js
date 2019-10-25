import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const SortingContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;
  width: 100%;

  > span {
    margin: 0 10px 0 0;
  }
`;

const selectorStyle = {
  control: styles => ({ ...styles, width: '200px' })
}

const sortOptions = [
  { value: '1', label: '價格由低到高' },
  { value: '2', label: '價格由高到低' },
  { value: '3', label: '最新上架' }
]

function Sorting({ priceInterval, displayMode, sorting }) {
  return  (
    <SortingContainer>
      <span>排序</span>
      <Select
        options={sortOptions}
        defaultValue={sortOptions[0]}
        styles={selectorStyle}
      />
    </SortingContainer>
  );
}

export default Sorting;
