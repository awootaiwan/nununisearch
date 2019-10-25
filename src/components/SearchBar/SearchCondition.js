import React from 'react';
import styled from 'styled-components';

import Sorting from './Sorting';
import PriceInterval from './PriceInterval';
import DisplayMode from './DisplayMode';
import DisplayAmount from './DisplayAmount';

const SearchConditionContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 10px 0;

  @media(max-width: 600px) {
    display: initial;
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

const RightBlock = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;

  @media(max-width: 600px) {
    justify-content: space-between;
    margin: 10px 0;
  }
`;

function SearchCondition({ priceInterval, displayMode, sorting }) {
  return  (
    <SearchConditionContainer>
      <LeftBlock>
        <PriceInterval></PriceInterval>
      </LeftBlock>

      <RightBlock>
        <Sorting></Sorting>
        <DisplayMode></DisplayMode>
        <DisplayAmount></DisplayAmount>
      </RightBlock>
    </SearchConditionContainer>
  );
}

export default SearchCondition;
