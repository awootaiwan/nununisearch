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
  { value: '32', label: '一頁32個商品' },
  { value: '64', label: '一頁64個商品' },
  { value: '80', label: '一頁80個商品' }
]

class DisplayAmount extends React.Component {
  constructor({ limit }) {
    super();
    this.limit = limit;
  }

  onChange = (option) => {
    const url = new URL(window.location.href);

    url.searchParams.set('limit', option.value);
    window.location = url.href;
  }

  render() {
    return  (
      <DisplayAmountContainer>
        <span>顯示</span>
        <Select
          options={sortOptions}
          defaultValue={sortOptions.filter(option => option.value === this.limit.toString())}
          onChange={this.onChange}
          styles={selectorStyle}
        />
      </DisplayAmountContainer>
    );
  }
}

export default DisplayAmount;
