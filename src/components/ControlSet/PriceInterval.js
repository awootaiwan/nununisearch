import React from 'react';
import styled from 'styled-components';

const PriceInput = styled.input`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 5px;
  width: 6em;
  height: 35px;
  border: 1px solid;
  border-radius: 4px;
  outline: none;

  &:placeholder-shown {
    color: ${props => props.theme.colorGrey};
  }
`;

const PriceSubmitBtn = styled.button`
  box-sizing: border-box;
  padding: 5px 11px;
  height: 35px;
  cursor: pointer;
  color: ${props => props.theme.colorWhite};
  background-color: ${props => props.theme.colorGrey};
  border: none;
  border-radius: 4px;
  outline: none;

  &:hover {
    color: ${props => props.theme.colorWhite};
    background-color: ${props => props.theme.colorBlack};
  }
`;

class PriceInterval extends React.Component {
  constructor({ interval }) {
    super();
    this.handleMinPriceChange = this.handleMinPriceChange.bind(this);
    this.handleMaxPriceChange = this.handleMaxPriceChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.getPrice = this.getPrice.bind(this);

    this.state = {
      minPrice: this.getPrice(interval).minPrice,
      maxPrice: this.getPrice(interval).maxPrice
    };
  }

  getPrice(interval) {
    const intervalStr = `${interval}-`.split('-'); // 確保空字串也能被解析

    return {
      minPrice: intervalStr[0],
      maxPrice: intervalStr[1]
    }
  }

  handleMinPriceChange(event) {
    this.setState({ minPrice: event.target.value });
  }

  handleMaxPriceChange(event) {
    this.setState({ maxPrice: event.target.value });
  }

  onSearch() {
    const url = new URL(window.location.href);
    const priceRange = `${this.state.minPrice}-${this.state.maxPrice}`

    url.searchParams.set('priceRange', priceRange);
    window.location = url.href;
  }

  render() {
    return  (
      <React.Fragment>
        <span>價格區間</span>
        <PriceInput type='number' placeholder='$最低' value={this.state.minPrice} onChange={this.handleMinPriceChange} />
        <span> - </span>
        <PriceInput type='number' placeholder='$最高' value={this.state.maxPrice} onChange={this.handleMaxPriceChange} />
        <PriceSubmitBtn onClick={this.onSearch}>搜尋</PriceSubmitBtn>
      </React.Fragment>
    );
  }
}

export default PriceInterval;
