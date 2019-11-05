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
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = (option) => {
    this.props.setSearchCondition('limit', option.value);
  }

  render() {
    return  (
      <DisplayAmountContainer>
        <span>顯示</span>
        <Select
          options={sortOptions}
          value={sortOptions.filter(option => option.value === this.props.limit.toString())}
          onChange={this.onChange}
          styles={selectorStyle}
        />
      </DisplayAmountContainer>
    );
  }
}

export default DisplayAmount;
