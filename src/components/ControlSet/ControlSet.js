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

function ControlSet({ priceInterval, displayMode, sorting, limit }) {
  return  (
    <Container>
      <LeftBlock>
        <PriceInterval interval={priceInterval} />
      </LeftBlock>

      <RightBlock>
        <Sorting sorting={sorting} />
        <DisplayMode />
        <DisplayAmount limit={limit} />
      </RightBlock>
    </Container>
  );
}

export default ControlSet;
