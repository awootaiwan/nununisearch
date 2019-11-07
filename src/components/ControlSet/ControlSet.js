import React from 'react';
import styled from 'styled-components';
import PriceInterval from './PriceInterval';
import Sorting from './Sorting';
import DisplayMode from './DisplayMode';
import DisplayAmount from './DisplayAmount';

const Container = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 10px 0;

  @media(max-width: 991px) {
    display: initial;
  }

  @media(max-width: 600px) {
    font-size: 14px;
  }
`;

const LeftBlock = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  @media(max-width: 991px) {
    justify-content: flex-start;
    margin: 10px 0;
  }

  @media(max-width: 600px) {
    justify-content: center;
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

function ControlSet({ sorting, limit, setSearchCondition, setMinPrice, setMaxPrice, minPrice, maxPrice, setBarMode }) {
  return  (
    <Container>
      <LeftBlock>
        <PriceInterval
          setSearchCondition={setSearchCondition}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </LeftBlock>

      <RightBlock>
        <Sorting
          sorting={sorting} 
          setSearchCondition={setSearchCondition} 
        />
        <DisplayMode 
          setBarMode={setBarMode}
        />
        <DisplayAmount
          limit={limit} 
          setSearchCondition={setSearchCondition} 
        />
      </RightBlock>
    </Container>
  );
}

export default ControlSet;
