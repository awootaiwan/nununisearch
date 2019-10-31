import React from "react";
import styled from 'styled-components'

const BodyPagination = styled.div`
  flex-grow: 1;
  margin-top: 10px;
  text-align: center;

  > ul {
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    list-style-type: disc;
    list-style: none;
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: stretch;

    > li {
      margin: 0;
      padding: 0;
      width: 36px;
      height: 38px;
      cursor: default;
      text-align: center;
      line-height: 38px;
      font-size: 13px;
      > a {
        display: block;
        width: 100%;
        height: 100%;
        border-width: 1px;
        border-style: solid;
        cursor: pointer;
        background-color: ${props => props.theme.colorPaginationBg};
        color: ${props => props.theme.colorPaginationText};
        border-color: ${props => props.theme.colorPaginationBorder};
        text-decoration: none;
        transition: 0.3s;
      }
  
      > a:hover {
        color: ${props => props.theme.colorPaginationText_hover};
      }
  
      .active {
        cursor: default;
        background: ${props => props.theme.colorPaginationBg_active};
        border-color: ${props => props.theme.colorPaginationBg_active};
        color: ${props => props.theme.colorPaginationActiveText};
      }
  
      .active:hover {
        color: ${props => props.theme.colorPaginationActiveText};
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

  pageNumber.forEach(function (value, index) {
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

function Pagination ({ products, paging, urlInfo }){
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
              {!isNaN(list) ? <a className={currentPage == list ? 'active' : ""}
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