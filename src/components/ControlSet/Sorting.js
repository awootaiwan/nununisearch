import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

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

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(option) {
    this.props.setSearchCondition('sort', option.value);
  }

  render() {

    const sortOptions = [
      { value: '1', label: this.props.t('controlSet.sortPriceToHigh') },
      { value: '2', label: this.props.t('controlSet.sortPriceToLow') },
      { value: '11', label: this.props.t('controlSet.sortNew') }
    ]

    return  (
      <SortingContainer>
        <span>{this.props.t('controlSet.sort')}</span>
        <Select
          options={sortOptions}
          value={sortOptions.filter(option => option.value === this.props.sorting.toString())}
          onChange={this.onChange}
          styles={selectorStyle}
        />
      </SortingContainer>
    );
  }
}

export default withTranslation()(Sorting);
