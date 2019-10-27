import React from "react";
import styled from 'styled-components'

const BodyPagination = styled.div`
  flex-grow: 1;
  margin-top: 10px;
  text-align: center;

  > ul {
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    list-style: none;
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: stretch;

    > li {
      margin: 0;
      padding: 0;
      cursor: default;
      text-align: center;
      width: 36px;
      line-height: 38px;
      height: 38px;
      font-size: 13px;
      > a {
        text-decoration: none;
        transition: 0.3s;
        background: #fff;
        color: #383838;
        border-color: #ccc;
        display: block;
        width: 100%;
        height: 100%;
        border-width: 1px;
        border-style: solid;
        cursor: pointer;
      }
  
      > a:hover {
        color: #f63577;
      }
  
      .disabled {
        cursor: default;
        background: #f63577;
        border-color: #f63577;
        color: #fff;
      }
  
      .disabled:hover {
        color: #fff;
      }
    }
  }
`;

const querystring = require('querystring');
let totalPages;
let currentPage;

const setPageList = (products, pageAmount, limit) => {
  const total = products.length;
  const pageList = [];
  const pageNumber = [];
  const pageCount = 3;
  for (let i = 1; pageNumber.length < pageCount; i++) {
    
    if (parseInt(currentPage) + i < pageAmount) {
      pageNumber.push(parseInt(currentPage) + i);
    }

    if (parseInt(currentPage) - i > 1) {
      pageNumber.push(parseInt(currentPage) - i);
    }

    if (pageNumber.indexOf(currentPage) < 0) {
      pageNumber.push(currentPage)
    }

    if (pageAmount <= pageCount + 1) {
      break;
    }
 
  }
  pageNumber.sort(function (a, b) {
    return a - b
  });

  pageList.push(1);

  pageNumber.map(function (value, index) {
    if (parseInt(value) != 1 && parseInt(value) != pageAmount) {
      if (index + 1 == 1 && parseInt(value) - 1 != 1) {
        pageList.push('..');
      }
      pageList.push(value);
      if (index + 1 == pageCount && parseInt(value) + 1 != pageAmount) {
        pageList.push('...');
      }
    }

  });
  if (pageAmount != 1) {
    pageList.push(pageAmount);
  }
  return (
    pageList
  )
}

const Pagination = ({ products, paging, urlInfo }) => {
  currentPage = paging.currentPage;
  const { totalPages } = paging;
  const { limit } = paging || 10;

  const urlInfoData = {...urlInfo};

	if (urlInfoData.page) {
		delete urlInfoData.page;
  }

	const urlParams = querystring.stringify(urlInfoData);
  const baseUrl = `${location.protocol}//${location.host}${location.pathname}?${urlParams}`;

  return (
    <BodyPagination>
      <ul>
        {
          (currentPage != 1) ? 
        <li>
          <a href={paging.previous}>
            {'<'}
          </a>
        </li> :
        ''
        }
        {
          setPageList(products, limit).map((list) => {
            return <li key={list}>
              {!isNaN(list) ? <a className={currentPage == list ? 'disabled' : ""}
                href={currentPage != list ? `${baseUrl}&page=${list}` : "#"}>{list}</a> : list}
            </li>
          })
        }
        {(currentPage != totalPages) ? <li><a href={ paging.next }>{'>'}</a></li> : ""}
      </ul>
    </BodyPagination>
  )
}

export default Pagination;