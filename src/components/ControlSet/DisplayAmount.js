import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

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

class DisplayAmount extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = (option) => {
    this.props.setSearchCondition('limit', option.value);
  }

  render() {
    const sortOptions = [
      { value: '32', label: this.props.t('controlSet.sort32') },
      { value: '64', label: this.props.t('controlSet.sort64') },
      { value: '80', label: this.props.t('controlSet.sort80') }
    ]

    return  (
      <DisplayAmountContainer>
        <span>{this.props.t('controlSet.display')}</span>
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

export default withTranslation()(DisplayAmount);
