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
  control: styles => ({
    ...styles,
    boxSizing: 'border-box',
    width: '180px',
    height: '35px',
    borderRadius: '4px'
  })
}

const sortOptions = [
  { value: '1', label: '價格由低到高' },
  { value: '2', label: '價格由高到低' },
  { value: '11', label: '最新上架' }
]

class Sorting extends React.Component {
  constructor({ sorting }) {
    super();
    this.onChange = this.onChange.bind(this);

    this.sorting = sorting;
  }

  onChange(option) {
    const url = new URL(window.location.href);

    url.searchParams.set('sort', option.value);
    window.location = url.href;
  }

  render() {
    return  (
      <SortingContainer>
        <span>排序</span>
        <Select
          options={sortOptions}
          defaultValue={sortOptions.filter(option => option.value === this.sorting.toString())}
          onChange={this.onChange}
          styles={selectorStyle}
        />
      </SortingContainer>
    );
  }
}

export default Sorting;
