import React from 'react';
import { withTranslation } from 'react-i18next';

class PriceInterval extends React.Component {
  constructor(props) {
    super(props);
    this.handleMinPriceChange = this.handleMinPriceChange.bind(this);
    this.handleMaxPriceChange = this.handleMaxPriceChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  handleMinPriceChange = (event) => {
    this.props.setMinPrice(event.target.value);
  }

  handleMaxPriceChange = (event) => {
    this.props.setMaxPrice(event.target.value);
  }

  onSearch = () => {
    this.props.setSearchCondition('priceRange', `${this.props.minPrice}-${this.props.maxPrice}`);
  }

  render() {
    return  (
      <>
        <span>{this.props.t('controlSet.priceRange')}</span>
        <input
          type='number'
          className="nununi-priceinput"
          placeholder={this.props.t('controlSet.lowest')}
          value={this.props.minPrice}
          onChange={this.handleMinPriceChange}
        />
        <span> - </span>
        <input
          type='number'
          className="nununi-priceinput"
          placeholder={this.props.t('controlSet.highest')}
          value={this.props.maxPrice}
          onChange={this.handleMaxPriceChange}
        />
        <button className="nununi-pricesubmit" onClick={this.onSearch}>{this.props.t('controlSet.search')}</button>
      </>
    );
  }
}

export default withTranslation()(PriceInterval);
