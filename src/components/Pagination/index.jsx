import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ value, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3} // в идеале надо получать с backend ответ о колл страниц, но тут тупо захардкожено, это как бы не оч
      previousLabel="<"
      forcePage={value - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;