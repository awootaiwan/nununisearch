import React from "react";
import ReactPaginate from 'react-paginate';

function Pagination ({ paging, setSearchCondition }) {
  const onPageChange = ({ selected }) => {
    setSearchCondition('page', selected + 1);
  }

  return (
    <ReactPaginate
      pageCount={paging.totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      previousLabel={'<'}
      nextLabel={'>'}
      onPageChange={onPageChange}
      forcePage={paging.currentPage - 1}
      containerClassName={'nununi-pagination-container'}
      pageClassName={'nununi-pagination-page'}
      previousClassName={'nununi-pagination-page previous'}
      nextClassName={'nununi-pagination-page next'}
      breakClassName={'nununi-pagination-page break'}
      pageLinkClassName={'nununi-pagination-link'}
      previousLinkClassName={'nununi-pagination-link'}
      nextLinkClassName={'nununi-pagination-link'}
      breakLinkClassName={'nununi-pagination-link breakLink'}
      disabledClassName={'disabledPage'}
    />
  )
}

export default Pagination;
