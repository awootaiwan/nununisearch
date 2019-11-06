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
          <div className="icon-block">
            <span className="block"></span>
            <span className="block"></span>
            <span className="block"></span>
            <span className="block"></span>
          </div>
        </div>
        <div className='nununi-display-icon' onClick={changeToBarMode}>
          <div className="icon-block">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </div>
    );
}

export default DisplayMode;
