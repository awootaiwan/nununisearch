import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faThLarge } from "@fortawesome/free-solid-svg-icons";

const DisplayModeContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;

  .icon-wrapper {
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
  }
`;



function DisplayMode() {


  function changeToBarMode(){
    const itemBlock = document.querySelector('.default-style');
    const itemBlockAll = document.querySelectorAll('.default-style');  
    if (!itemBlock.classList.contains('bar-style')){
      itemBlockAll.forEach(item=>item.classList.add('bar-style'));
    }
  }

  function changeToBlockMode(){
    const itemBlock = document.querySelector('.default-style');
    const itemBlockAll = document.querySelectorAll('.default-style');
  
    if (itemBlock.classList.contains('bar-style')){
      itemBlockAll.forEach(item=>item.classList.remove('bar-style'));
    }
  }

  return  (
    <DisplayModeContainer>
      <div className='icon-wrapper' onClick={changeToBlockMode}>
        <FontAwesomeIcon icon={faThLarge} />
      </div>
      <div className='icon-wrapper' onClick={changeToBarMode}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </DisplayModeContainer>
  );
}

export default DisplayMode;
