import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faThLarge } from "@fortawesome/free-solid-svg-icons";

const SearchConditionContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;

  @media(max-width: 600px) {
    display: initial;
  }
`;

const IconWrapper = styled.div`
  margin: 0 10px;
  opacity: .4;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  .svg-inline--fa {
    width: 2em;
    height: 2em;
  }

  @media(max-width: 600px) {
    .svg-inline--fa {
      width: 1.5em;
      height: 1.5em;
    }
  }
`;

const LeftBlock = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;

  @media(max-width: 600px) {
    justify-content: space-between;
    margin: 10px 0;
  }
`;
const PriceInput = styled.input`
  margin: 0 10px;
  width: 5em;
  border: 1px solid;
  outline: none;

  &:placeholder-shown {
    color: #999;
  }
`;
const PriceSubmitBtn = styled.button`
  padding: 3px 7px;
  cursor: pointer;
  color: #999;
  background-color: transparent;
  border-radius: 3px;
  border-color: #999;
  outline: none;

  &:hover {
    color: #000;
    border-color: #000;
  }
`;

const RightBlock = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;

  @media(max-width: 600px) {
    justify-content: space-between;
    margin: 10px 0;
  }
`;
const DisplayMode = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
`;
const Sorting = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

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

const SearchCondition = ({ priceInterval, displayMode, sorting }) => {
  return  (
    <SearchConditionContainer>
      <LeftBlock>
        <span>價格區間</span>
        <PriceInput type='number' placeholder='$最低' />
        <span> - </span>
        <PriceInput type='number' placeholder='$最高' />
        <PriceSubmitBtn>搜尋</PriceSubmitBtn>
      </LeftBlock>

      <RightBlock>
        <DisplayMode>
          <IconWrapper>
            <FontAwesomeIcon icon={faBars} />
          </IconWrapper>
          <IconWrapper>
            <FontAwesomeIcon icon={faThLarge} />
          </IconWrapper>
        </DisplayMode>

        <Sorting>
          <span>排序</span>
          <Select
            options={sortOptions}
            defaultValue={sortOptions[0]}
            styles={selectorStyle}
          />
        </Sorting>
      </RightBlock>
    </SearchConditionContainer>
  );
}

export default SearchCondition;
