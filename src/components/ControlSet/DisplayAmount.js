import React from 'react';
import Select from 'react-select';
import { withTranslation } from 'react-i18next';

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
      { value: '30', label: this.props.t('controlSet.sort30') },
      { value: '60', label: this.props.t('controlSet.sort60') },
      { value: '80', label: this.props.t('controlSet.sort80') }
    ]

    return  (
      <div className="nununi-amount">
        <span>{this.props.t('controlSet.display')}</span>
        <Select
          options={sortOptions}
          value={sortOptions.filter(option => option.value === this.props.limit.toString())}
          onChange={this.onChange}
          className="nununi-amount-select"
          classNamePrefix="nununi-amount-select"
        />
      </div>
    );
  }
}

export default withTranslation()(DisplayAmount);
