import React from "react";
import styled from 'styled-components'
import ReactPaginate from 'react-paginate';

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
        box-sizing: border-box;
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
        outline: none;

        &.breakLink {
          pointer-events: none;
          border-bottom: none;
          border-top: none;
        }

        &:hover {
          color: ${props => props.theme.colorPaginationText_hover};
        }
      }

      &.selected {
        > a {
          background: ${props => props.theme.colorPaginationBg_active};
          border-color: ${props => props.theme.colorPaginationBg_active};
          color: ${props => props.theme.colorPaginationActiveText};

          &:hover {
            color: ${props => props.theme.colorPaginationText_active};

          }
        }
      }

      &.disabledBtn {
        display: none;
      }
    }
  }
`;

function Pagination ({ paging, setSearchCondition }) {
  const onPageChange = ({ selected }) => {
    setSearchCondition('page', selected + 1);
  }

  return (
    <BodyPagination>
      <ReactPaginate
        pageCount={paging.totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel={'<'}
        nextLabel={'>'}
        onPageChange={onPageChange}
        forcePage={paging.currentPage - 1}
        containerClassName={'nununi-pagination'}
        disabledClassName={'disabledBtn'}
        breakLinkClassName={'breakLink'}
      />
    </BodyPagination>
  )
}

export default Pagination;
