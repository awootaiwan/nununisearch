import React from 'react';
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components';
import beefPic from './beef.jpg'

const ProductBlock = () => {
  return (
    <div>
      <img src={beefPic}></img>
      <div>product name</div>
      <div>
        <span>$12345</span>
        <span>$999</span>
      </div>
    </div>
  )
}

export default ProductBlock;