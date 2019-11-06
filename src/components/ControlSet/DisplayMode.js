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
    .icon-b {
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

class DisplayMode extends React.Component {
  constructor(props) {
    super(props);
  }
  changeToBarMode = () => {
    this.props.setBarMode(' bar-style');
  }
  changeToBlockMode = () => {
    this.props.setBarMode('');
  }
  render() {
    return  (
      <DisplayModeContainer>
        <div className='icon-wrapper' onClick={this.changeToBlockMode}>
          <div class="icon-b">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </div>
        </div>
        <div className='icon-wrapper' onClick={this.changeToBarMode}>
          <div class="icon-b">
            <span class="block"></span>
            <span class="block"></span>
            <span class="block"></span>
            <span class="block"></span>
          </div>
        </div>
      </DisplayModeContainer>
    );
  }
}

export default DisplayMode;
