import React from 'react';

const DisplayMode = (props) => {
  const changeToBarMode = () => {
    props.setBarMode('bar-style');
  }

  const changeToBlockMode = () => {
    props.setBarMode('');
  }
    return  (
      <div className={'nununi-display'}>
        <div className='nununi-display-icon' onClick={changeToBlockMode}>
          <span className="block"></span>
          <span className="block"></span>
          <span className="block"></span>
          <span className="block"></span>
        </div>
        <div className='nununi-display-icon' onClick={changeToBarMode}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    );
}

export default DisplayMode;
