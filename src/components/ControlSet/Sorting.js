import React from 'react';
import Select from 'react-select';
import { withTranslation } from 'react-i18next';

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
      <div className={'nununi-sorting'}>
        <span>{this.props.t('controlSet.sort')}</span>
        <Select
          options={sortOptions}
          value={sortOptions.filter(option => option.value === this.props.sorting.toString())}
          onChange={this.onChange}
          className={'nununi-sorting-select'}
          classNamePrefix={'nununi-sorting-select'}
        />
      </div>
    );
  }
}

export default withTranslation()(Sorting);
