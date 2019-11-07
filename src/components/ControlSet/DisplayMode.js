import React from 'react';
import styled from 'styled-components';

const DisplayModeContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;

  .icon-wrapper {
    width: 40px;
    height: 40px;
    margin: 0 8px;
    opacity: .4;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
    .icon-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-item: center;
      align-content: center;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      span {
        display: block;
        border-radius: 2px;
        background-color: ${props => props.theme.colorBlack};
      }
    }
    .line {
      width: 35px;
      height: 5px;
      margin: 3px auto;
    }
    .block {
      width: 13px;
      height: 13px;
      margin: 2px;
    }
  }
`;

const DisplayMode = (props) => {

  const changeToBarMode = () => {
    props.setBarMode(' bar-style');
  }
  const changeToBlockMode = () => {
    props.setBarMode('');
  }
    return  (
      <DisplayModeContainer>
        <div className='icon-wrapper' onClick={changeToBlockMode}>
          <div className="icon-block">
            <span className="block"></span>
            <span className="block"></span>
            <span className="block"></span>
            <span className="block"></span>
          </div>
        </div>
        <div className='icon-wrapper' onClick={changeToBarMode}>
          <div className="icon-block">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </DisplayModeContainer>
    );
}

export default DisplayMode;
